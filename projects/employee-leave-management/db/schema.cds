namespace sap.btp.leave;

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
}

entity ApprovalLogs : cuid, managed {
    leaveRequest        : Association to LeaveRequests not null;
    approver            : Association to Employees not null;
    action              : String(20) not null; // SUBMITTED, APPROVED, REJECTED, CANCELLED
    actionDate          : Timestamp not null;
    comments            : String(500);
}

entity LeavePolicies : cuid, managed {
    country             : String(10) not null;
    maxConsecutiveDays  : Integer default 15;
    minAdvanceNoticeDays: Integer default 2;
    encashmentAllowed   : Boolean default false;
}
