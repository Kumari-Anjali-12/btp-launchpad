import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CapstoneSimulationBanner } from './CapstoneSimulationBanner';

const DEFAULT_SNIPPET = `namespace sap.btp.leave;

using { cuid, managed } from '@sap/cds/common';

entity LeaveRequests : cuid, managed {
    requestNumber : Integer @assert.unique;
    employee      : Association to Employees not null;
    leaveType     : Association to LeaveTypes not null;
    startDate     : Date not null;
    endDate       : Date not null;
    totalDays     : Decimal(4, 1) not null;
    reason        : String(500);
    status        : String(20) default 'Pending';
}`;

export const SimulatedCdsEditor: React.FC = () => {
  const [cdsCode, setCdsCode] = useState(DEFAULT_SNIPPET);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'success' | 'warning' | 'error';
    message: string;
    details?: string[];
  }>({
    status: 'idle',
    message: 'Click "Simulate Compilation" to validate the schema syntax and enterprise best practices.',
  });

  const handleSimulateCompile = () => {
    const details: string[] = [];

    // Basic AST heuristic checks
    const hasNamespace = cdsCode.includes('namespace sap.btp.leave;');
    const hasCuid = cdsCode.includes('cuid');
    const hasManaged = cdsCode.includes('managed');
    const hasDates = cdsCode.includes('startDate') && cdsCode.includes('endDate');
    const hasTotalDays = cdsCode.includes('totalDays');

    if (!hasNamespace) {
      details.push('Missing required enterprise namespace: "namespace sap.btp.leave;".');
    }
    if (!hasCuid) {
      details.push('Missing "cuid" aspect for automatic UUID primary key generation.');
    }
    if (!hasManaged) {
      details.push('Missing "managed" aspect for automatic audit timestamps (createdAt, createdBy).');
    }
    if (!hasDates) {
      details.push('Entity must define both startDate and endDate of type Date.');
    }
    if (!hasTotalDays) {
      details.push('Consider adding totalDays : Decimal(4,1) to track duration.');
    }

    if (details.length === 0) {
      setFeedback({
        status: 'success',
        message: 'Compilation Succeeded! (Simulated CSN Generated)',
        details: [
          'All enterprise aspects (cuid, managed) verified.',
          'Database DDL generated for SQLite & SAP HANA HDI.',
          'OData V4 metadata entity container mapped cleanly.',
        ],
      });
    } else {
      setFeedback({
        status: 'warning',
        message: `Schema compiled with ${details.length} structural notice(s):`,
        details,
      });
    }
  };

  const loadExample = (type: 'halfDay' | 'policy') => {
    if (type === 'halfDay') {
      setCdsCode(`namespace sap.btp.leave;

using { cuid, managed } from '@sap/cds/common';

entity LeaveRequests : cuid, managed {
    requestNumber : Integer @assert.unique;
    employee      : Association to Employees not null;
    leaveType     : Association to LeaveTypes not null;
    startDate     : Date not null;
    endDate       : Date not null;
    isHalfDay     : Boolean default false;
    totalDays     : Decimal(4, 1) not null;
    reason        : String(500);
    status        : String(20) default 'Pending';
}`);
    } else {
      setCdsCode(`namespace sap.btp.leave;

using { cuid, managed } from '@sap/cds/common';

entity LeavePolicies : cuid, managed {
    country              : String(10) not null;
    maxConsecutiveDays   : Integer default 15;
    minAdvanceNoticeDays : Integer default 2;
    encashmentAllowed    : Boolean default false;
}`);
    }
  };

  return (
    <div className="space-y-4">
      <CapstoneSimulationBanner sourceFilePath="projects/employee-leave-management/db/schema.cds" />

      <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4 dark:border-stone-800">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Interactive CDS Schema Simulator
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Experiment with Core Data Services syntax and inspect compiler verification rules in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadExample('halfDay')}
              className="rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              Add Half-Day Field
            </button>
            <button
              onClick={() => loadExample('policy')}
              className="rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              Load Policy Model
            </button>
            <button
              onClick={() => setCdsCode(DEFAULT_SNIPPET)}
              className="flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              title="Reset"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="mt-4">
          <label htmlFor="simulated-cds-input" className="sr-only">
            Simulated CDS Editor
          </label>
          <textarea
            id="simulated-cds-input"
            value={cdsCode}
            onChange={(e) => setCdsCode(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-stone-200 bg-stone-950 p-4 font-mono text-xs leading-relaxed text-indigo-300 focus:border-indigo-500 focus:outline-none dark:border-stone-800"
            spellCheck={false}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            Targeting: <code className="font-mono text-stone-600 dark:text-stone-300">@sap/cds v8.x CSN compiler</code>
          </span>
          <button
            onClick={handleSimulateCompile}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Simulate Compilation</span>
          </button>
        </div>

        {/* Compiler Feedback */}
        {feedback.status !== 'idle' && (
          <div
            className={`mt-4 rounded-xl border p-4 text-xs ${
              feedback.status === 'success'
                ? 'border-emerald-200 bg-emerald-50/90 text-emerald-900 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-200'
                : 'border-amber-200 bg-amber-50/90 text-amber-900 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {feedback.status === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              )}
              <span>{feedback.message}</span>
            </div>
            {feedback.details && feedback.details.length > 0 && (
              <ul className="mt-2 space-y-1 pl-6 list-disc">
                {feedback.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
