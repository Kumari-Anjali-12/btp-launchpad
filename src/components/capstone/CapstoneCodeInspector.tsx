import React, { useState } from 'react';
import { Copy, Check, FileCode, Folder } from 'lucide-react';

interface CodeFileItem {
  id: string;
  name: string;
  path: string;
  language: string;
  description: string;
  code: string;
}

const PROJECT_FILES: CodeFileItem[] = [
  {
    id: 'db-schema',
    name: 'schema.cds',
    path: 'projects/employee-leave-management/db/schema.cds',
    language: 'cds',
    description: 'Core Data Services domain model: Employees, LeaveTypes, Balances, Requests, and Policies.',
    code: `namespace sap.btp.leave;

using { cuid, managed } from '@sap/cds/common';

type LeaveStatus : String enum {
    Draft      = 'Draft';
    Pending    = 'Pending';
    Approved   = 'Approved';
    Rejected   = 'Rejected';
    Cancelled  = 'Cancelled';
}

entity Employees : cuid, managed {
    employeeNumber      : String(10) @assert.unique;
    firstName           : String(50) not null;
    lastName            : String(50) not null;
    email               : String(100) not null @assert.unique;
    department          : String(50);
    manager             : Association to Employees;
    leaveBalances       : Composition of many LeaveBalances on leaveBalances.employee = $self;
    leaveRequests       : Association to many LeaveRequests on leaveRequests.employee = $self;
}

entity LeaveTypes : managed {
    key code            : String(10);
    name                : String(50) not null;
    description         : String(255);
    maxDaysPerYear      : Integer default 25;
    requiresApproval    : Boolean default true;
    allowHalfDays       : Boolean default true;
}

entity LeaveBalances : cuid, managed {
    employee            : Association to Employees not null;
    leaveType           : Association to LeaveTypes not null;
    year                : Integer not null;
    totalEntitlement    : Decimal(4, 1) not null;
    usedDays            : Decimal(4, 1) default 0.0 not null;
    pendingDays         : Decimal(4, 1) default 0.0 not null;
    availableDays       : Decimal(4, 1) not null;
}

entity LeaveRequests : cuid, managed {
    requestNumber       : Integer @assert.unique;
    employee            : Association to Employees not null;
    leaveType           : Association to LeaveTypes not null;
    startDate           : Date not null;
    endDate             : Date not null;
    isHalfDay           : Boolean default false;
    totalDays           : Decimal(4, 1) not null;
    reason              : String(500);
    status              : LeaveStatus default 'Pending' not null;
    approvalLogs        : Composition of many ApprovalLogs on approvalLogs.leaveRequest = $self;
}`,
  },
  {
    id: 'srv-leave-cds',
    name: 'leave-service.cds',
    path: 'projects/employee-leave-management/srv/leave-service.cds',
    language: 'cds',
    description: 'Employee self-service OData V4 projection and submit/cancel action signatures.',
    code: `using { sap.btp.leave as my } from '../db/schema';

service LeaveService @(path: '/odata/v4/leave', requires: 'authenticated-user') {
    @readonly
    entity LeaveTypes as projection on my.LeaveTypes;

    @readonly
    entity LeaveBalances as projection on my.LeaveBalances;

    @odata.draft.enabled
    entity LeaveRequests as projection on my.LeaveRequests actions {
        action submitRequest() returns LeaveRequests;
        action cancelRequest(reason: String) returns LeaveRequests;
    };

    @readonly
    entity ApprovalLogs as projection on my.ApprovalLogs;
}`,
  },
  {
    id: 'srv-leave-js',
    name: 'leave-service.js',
    path: 'projects/employee-leave-management/srv/leave-service.js',
    language: 'javascript',
    description: 'Canonical business validation handlers: date chronology, overlap detection, balance checks.',
    code: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { LeaveRequests, LeaveBalances, ApprovalLogs } = this.entities;

    // Validation before CREATE
    this.before('CREATE', 'LeaveRequests', async (req) => {
        const data = req.data;

        // 1. Validate Date Chronology
        if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
            return req.error(400, 'Start date cannot be after end date.', 'in/startDate');
        }

        // 2. Overlap Check for active requests
        if (data.employee_ID && data.startDate && data.endDate) {
            const existing = await SELECT.from(LeaveRequests).where({
                employee_ID: data.employee_ID,
                status: { in: ['Pending', 'Approved'] }
            });
            const hasOverlap = existing.some(r => r.ID !== data.ID && data.startDate <= r.endDate && data.endDate >= r.startDate);
            if (hasOverlap) {
                return req.error(409, 'A leave request already exists covering this date range.', 'in/startDate');
            }
        }

        // 3. Balance Sufficiency Check
        if (data.employee_ID && data.leaveType_code && data.startDate) {
            const reqYear = new Date(data.startDate).getFullYear();
            const balance = await SELECT.one.from(LeaveBalances).where({
                employee_ID: data.employee_ID,
                leaveType_code: data.leaveType_code,
                year: reqYear
            });
            if (!balance) return req.error(404, \`No leave balance allocated for year \${reqYear}.\`);
            const available = Number(balance.totalEntitlement) - (Number(balance.usedDays) + Number(balance.pendingDays));
            if (Number(data.totalDays) > available) {
                return req.error(400, \`Insufficient leave balance. Requested: \${data.totalDays}, Available: \${available}.\`);
            }
        }
    });

    // Custom Action: submitRequest
    this.on('submitRequest', 'LeaveRequests', async (req) => {
        const id = req.params[0]?.ID || req.params[0];
        return await cds.tx(req).run(async (tx) => {
            const request = await tx.read(LeaveRequests).where({ ID: id });
            if (!request) return req.error(404, 'Leave request not found.');
            await tx.update(LeaveRequests).set({ status: 'Pending' }).where({ ID: id });
            // Increment pendingDays on balance...
            return await tx.read(LeaveRequests).where({ ID: id });
        });
    });
});`,
  },
  {
    id: 'srv-manager-js',
    name: 'manager-service.js',
    path: 'projects/employee-leave-management/srv/manager-service.js',
    language: 'javascript',
    description: 'Manager approval/rejection actions executing within ACID transactions (cds.tx).',
    code: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { LeaveRequests, LeaveBalances, ApprovalLogs } = this.entities;

    this.on('approveRequest', 'LeaveRequests', async (req) => {
        const id = req.params[0]?.ID || req.params[0];
        const { comments } = req.data || {};

        return await cds.tx(req).run(async (tx) => {
            const request = await tx.read(LeaveRequests).where({ ID: id });
            if (!request) return req.error(404, 'Leave request not found.');
            if (request.status !== 'Pending') {
                return req.error(400, 'Only Pending requests can be approved.');
            }

            // 1. Update status
            await tx.update(LeaveRequests).set({ status: 'Approved' }).where({ ID: id });

            // 2. Transactionally update LeaveBalances
            const reqYear = new Date(request.startDate).getFullYear();
            const balance = await tx.read(LeaveBalances).where({
                employee_ID: request.employee_ID,
                leaveType_code: request.leaveType_code,
                year: reqYear
            });

            if (balance) {
                const newPending = Math.max(0, Number(balance.pendingDays) - Number(request.totalDays));
                const newUsed = Number(balance.usedDays) + Number(request.totalDays);
                const newAvailable = Number(balance.totalEntitlement) - (newUsed + newPending);

                await tx.update(LeaveBalances).set({
                    pendingDays: newPending,
                    usedDays: newUsed,
                    availableDays: newAvailable
                }).where({ ID: balance.ID });
            }

            // 3. Write immutable audit log
            await tx.create(ApprovalLogs).entries({
                leaveRequest_ID: id,
                approver_ID: req.user?.id || 'MANAGER',
                action: 'APPROVED',
                actionDate: new Date().toISOString(),
                comments: comments || 'Approved by Manager.'
            });

            return await tx.read(LeaveRequests).where({ ID: id });
        });
    });
});`,
  },
  {
    id: 'fiori-annotations',
    name: 'annotations.cds',
    path: 'projects/employee-leave-management/app/leave-requests/annotations.cds',
    language: 'cds',
    description: 'SAP Fiori Elements UI annotations: LineItem, HeaderInfo, SelectionFields, and Criticality.',
    code: `using { LeaveService } from '../../srv/leave-service';

annotate LeaveService.LeaveRequests with @(
    UI.HeaderInfo: {
        TypeName: 'Leave Request',
        TypeNamePlural: 'Leave Requests',
        Title: { $Type: 'UI.DataField', Value: requestNumber },
        Description: { $Type: 'UI.DataField', Value: reason }
    },
    UI.SelectionFields: [ leaveType_code, status, startDate, endDate ],
    UI.LineItem: [
        { $Type: 'UI.DataField', Value: requestNumber, Label: 'Request Number' },
        { $Type: 'UI.DataField', Value: leaveType_code, Label: 'Leave Type' },
        { $Type: 'UI.DataField', Value: startDate, Label: 'Start Date' },
        { $Type: 'UI.DataField', Value: endDate, Label: 'End Date' },
        { $Type: 'UI.DataField', Value: totalDays, Label: 'Total Days' },
        {
            $Type: 'UI.DataField',
            Value: status,
            Label: 'Status',
            Criticality: (status = 'Approved' ? 3 : status = 'Pending' ? 2 : status = 'Rejected' ? 1 : 0)
        }
    ]
);`,
  },
  {
    id: 'mta-descriptor',
    name: 'mta.yaml',
    path: 'projects/employee-leave-management/mta.yaml',
    language: 'yaml',
    description: 'Cloud MTA descriptor declaring Node.js srv, HANA DB deployer, and App Router modules.',
    code: `_schema-version: '3.1.0'
ID: employee-leave-management
version: 1.0.0
description: "Enterprise Employee Leave Management System on SAP BTP"
parameters:
  enable-parallel-deployments: true

modules:
  - name: employee-leave-srv
    type: nodejs
    path: gen/srv
    requires:
      - name: employee-leave-db
      - name: employee-leave-auth
    provides:
      - name: srv-api
        properties:
          srv-url: \${default-url}

  - name: employee-leave-db-deployer
    type: hdb
    path: gen/db
    requires:
      - name: employee-leave-db

  - name: employee-leave-approuter
    type: approuter.nodejs
    path: app/approuter
    requires:
      - name: employee-leave-auth
      - name: srv-api
        group: destinations
        properties:
          name: srv-api
          url: ~{srv-url}
          forwardAuthToken: true

resources:
  - name: employee-leave-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared

  - name: employee-leave-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json`,
  },
];

interface CapstoneCodeInspectorProps {
  initialFileId?: string;
}

export const CapstoneCodeInspector: React.FC<CapstoneCodeInspectorProps> = ({
  initialFileId = 'db-schema',
}) => {
  const [selectedFileId, setSelectedFileId] = useState(initialFileId);
  const [copied, setCopied] = useState(false);

  const activeFile: CodeFileItem = PROJECT_FILES.find((f) => f.id === selectedFileId) || PROJECT_FILES[0]!;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-900 text-stone-100 shadow-lg dark:border-stone-800">
      {/* File Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-stone-800 bg-stone-950 px-4 py-3 gap-2">
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Real SAP CAP Codebase Inspector
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-800/80 px-2.5 py-1 text-xs font-medium text-stone-300 transition-colors hover:bg-stone-700"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* File Tabs */}
      <div className="flex overflow-x-auto border-b border-stone-800 bg-stone-900/80 px-2 pt-2 scrollbar-thin">
        {PROJECT_FILES.map((file) => {
          const isSelected = file.id === activeFile.id;
          return (
            <button
              key={file.id}
              onClick={() => setSelectedFileId(file.id)}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-medium transition-all ${
                isSelected
                  ? 'border-indigo-400 bg-stone-800/60 text-white'
                  : 'border-transparent text-stone-400 hover:bg-stone-800/30 hover:text-stone-200'
              }`}
            >
              <FileCode className="h-3.5 w-3.5 text-indigo-400" />
              <span>{file.name}</span>
            </button>
          );
        })}
      </div>

      {/* Description Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 bg-stone-900 px-4 py-2 text-xs text-stone-400">
        <div>{activeFile.description}</div>
        <div className="font-mono text-stone-400">{activeFile.path}</div>
      </div>

      {/* Code Viewer */}
      <div className="max-h-[460px] overflow-auto p-4 text-xs font-mono leading-relaxed bg-[#111214]">
        <pre className="text-stone-200 whitespace-pre">
          <code>{activeFile.code}</code>
        </pre>
      </div>
    </div>
  );
};
