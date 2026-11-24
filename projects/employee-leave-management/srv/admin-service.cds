using { sap.btp.leave as my } from '../db/schema';

service AdminService @(path: '/odata/v4/admin', requires: 'LeaveAdmin') {
    entity Employees as projection on my.Employees;
    entity LeaveTypes as projection on my.LeaveTypes;
    entity LeaveBalances as projection on my.LeaveBalances;
    entity LeaveRequests as projection on my.LeaveRequests;
    entity LeavePolicies as projection on my.LeavePolicies;

    action runAnnualAccrual(year: Integer) returns String;
}
