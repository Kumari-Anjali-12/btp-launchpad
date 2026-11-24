using { sap.btp.leave as my } from '../db/schema';

service LeaveService @(path: '/odata/v4/leave', requires: 'authenticated-user') {
    @readonly
    entity LeaveTypes as projection on my.LeaveTypes;

    @readonly
    entity LeaveBalances as projection on my.LeaveBalances;

    entity LeaveRequests as projection on my.LeaveRequests actions {
        action submitRequest() returns LeaveRequests;
        action cancelRequest(reason: String) returns LeaveRequests;
    };

    @readonly
    entity ApprovalLogs as projection on my.ApprovalLogs;
}
