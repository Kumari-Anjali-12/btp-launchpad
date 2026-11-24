using { LeaveService } from '../../srv/leave-service';

annotate LeaveService.LeaveRequests with @(
    UI.HeaderInfo: {
        TypeName: 'Leave Request',
        TypeNamePlural: 'Leave Requests',
        Title: {
            $Type: 'UI.DataField',
            Value: requestNumber
        },
        Description: {
            $Type: 'UI.DataField',
            Value: reason
        }
    },
    UI.SelectionFields: [
        leaveType_code,
        status,
        startDate,
        endDate
    ],
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: requestNumber,
            Label: 'Request Number'
        },
        {
            $Type: 'UI.DataField',
            Value: leaveType_code,
            Label: 'Leave Type'
        },
        {
            $Type: 'UI.DataField',
            Value: startDate,
            Label: 'Start Date'
        },
        {
            $Type: 'UI.DataField',
            Value: endDate,
            Label: 'End Date'
        },
        {
            $Type: 'UI.DataField',
            Value: totalDays,
            Label: 'Total Days'
        },
        {
            $Type: 'UI.DataField',
            Value: status,
            Label: 'Status',
            Criticality: (
                status = 'Approved' ? 3 :
                status = 'Pending'  ? 2 :
                status = 'Rejected' ? 1 : 0
            )
        }
    ],
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'GeneralInfoFacet',
            Label: 'General Information',
            Target: '@UI.FieldGroup#GeneralInfo'
        },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'ApprovalHistoryFacet',
            Label: 'Approval History',
            Target: 'approvalLogs/@UI.LineItem'
        }
    ],
    UI.FieldGroup #GeneralInfo: {
        Data: [
            { $Type: 'UI.DataField', Value: requestNumber, Label: 'Request Number' },
            { $Type: 'UI.DataField', Value: employee_ID, Label: 'Employee' },
            { $Type: 'UI.DataField', Value: leaveType_code, Label: 'Leave Type' },
            { $Type: 'UI.DataField', Value: startDate, Label: 'Start Date' },
            { $Type: 'UI.DataField', Value: endDate, Label: 'End Date' },
            { $Type: 'UI.DataField', Value: totalDays, Label: 'Total Days' },
            { $Type: 'UI.DataField', Value: isHalfDay, Label: 'Half Day' },
            { $Type: 'UI.DataField', Value: status, Label: 'Status' },
            { $Type: 'UI.DataField', Value: reason, Label: 'Reason' }
        ]
    }
);

annotate LeaveService.ApprovalLogs with @(
    UI.LineItem: [
        { $Type: 'UI.DataField', Value: action, Label: 'Action' },
        { $Type: 'UI.DataField', Value: actionDate, Label: 'Date' },
        { $Type: 'UI.DataField', Value: approver_ID, Label: 'Actor' },
        { $Type: 'UI.DataField', Value: comments, Label: 'Comments' }
    ]
);
