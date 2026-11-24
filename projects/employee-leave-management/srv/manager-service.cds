using { sap.btp.leave as my } from '../db/schema';

service ManagerService @(path: '/odata/v4/manager', requires: 'LeaveManager') {
    @readonly
    entity DirectReports as projection on my.Employees;

    @readonly
    entity TeamBalances as projection on my.LeaveBalances;

    entity LeaveRequests as projection on my.LeaveRequests actions {
        action approveRequest(comments: String) returns LeaveRequests;
        action rejectRequest(comments: String) returns LeaveRequests;
    };

    @readonly
    entity ApprovalLogs as projection on my.ApprovalLogs;
}
