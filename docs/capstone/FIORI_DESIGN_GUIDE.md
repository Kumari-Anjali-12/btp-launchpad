# SAP Fiori Elements & UX Architecture Guide
## Metadata-Driven User Interfaces for Employee Leave Management

This guide documents the design principles, UI annotations, and architecture of SAP Fiori Elements in the Employee Leave Management System.

---

## 1. What is SAP Fiori Elements?

SAP Fiori Elements is a UX framework that generates standard enterprise web applications directly from **OData metadata and CDS UI annotations**. Rather than writing custom React or HTML views for standard tables, forms, and search bars, developers annotate the data model.

### Key Advantages:
- **100% Consistent SAP Fiori Design:** Complies automatically with SAP Fiori UX standards.
- **Responsive & Accessible:** Fully compatible with mobile, tablet, and widescreen viewports out of the box.
- **Draft Handling:** Built-in support for editing drafts without data corruption.

---

## 2. Key Annotations in `annotations.cds`

### A. Header Information (`UI.HeaderInfo`)
Defines how the entity appears in titles, object pages, and breadcrumbs:
```cds
UI.HeaderInfo: {
    TypeName: 'Leave Request',
    TypeNamePlural: 'Leave Requests',
    Title: { $Type: 'UI.DataField', Value: requestNumber },
    Description: { $Type: 'UI.DataField', Value: reason }
}
```

### B. List Report Columns (`UI.LineItem`)
Specifies which columns appear in the main overview table:
```cds
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
        Criticality: (
            status = 'Approved' ? 3 :
            status = 'Pending'  ? 2 :
            status = 'Rejected' ? 1 : 0
        )
    }
]
```

### C. Semantic Status Highlighting (Criticality Codes)
SAP Fiori standardizes visual status indicators across all enterprise products:

| Criticality Code | Meaning | Visual Presentation | Applied To |
| :--- | :--- | :--- | :--- |
| **3** | Positive | Green pill / text | `Approved` |
| **2** | Critical / Warning | Orange/Amber pill | `Pending` (Manager review needed) |
| **1** | Negative / Error | Red pill | `Rejected` |
| **0** | Neutral | Grey pill | `Draft` / `Cancelled` |

---

## 3. Application Router Architecture (`xs-app.json`)

The SAP Application Router (@sap/approuter) acts as the single reverse proxy for all frontend assets and backend API calls:

```json
{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^/odata/v4/(.*)$",
      "target": "/odata/v4/$1",
      "destination": "srv-api",
      "authenticationType": "xsuaa",
      "csrfProtection": true
    },
    {
      "source": "^/(.*)$",
      "target": "$1",
      "localDir": "../",
      "authenticationType": "xsuaa"
    }
  ]
}
```

- **CORS Prevention:** Frontend assets and OData endpoints share the exact same domain origin.
- **CSRF Token Handling:** Automatically issues and validates anti-CSRF tokens for mutating requests.
- **XSUAA Token Forwarding:** Intercepts user requests, obtains OAuth2 JWT tokens from XSUAA, and forwards them as `Authorization: Bearer <jwt>` to the backend CAP server.
