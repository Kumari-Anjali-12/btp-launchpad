import { GuidedProject } from '../../types/practice';

export const GUIDED_PROJECTS: GuidedProject[] = [
  // ========================================================
  // PROJECT 1: Employee Leave and Expense Tracker
  // ========================================================
  {
    id: 'project-leave-expense',
    title: 'Employee Leave & Expense Tracker',
    subtitle: 'Build a production-grade CAP application with approval workflows and audit trails.',
    description:
      'Design, implement, and test an enterprise human capital management service where employees submit leave requests and expense claims, managers approve them, and audit timestamps are automatically logged.',
    difficulty: 'beginner',
    estimatedHours: 2.5,
    businessScenario:
      'Global Enterprise Corp requires a modern cloud solution on SAP BTP to replace legacy paper-based leave approvals. Employees submit requests, managers review pending items, and finance receives validated expense claims.',
    architectureSummary: {
      backend: 'SAP Cloud Application Programming Model (Node.js CAP) on Cloud Foundry runtime',
      database: 'SAP HANA Cloud HDI Container with relational persistence',
      integration: 'SAP BTP Destination Service for SAP SuccessFactors payroll sync',
      frontend: 'SAP Fiori Elements List Report & Object Page (OData v4)',
    },
    milestones: [
      {
        id: 'milestone-1-cds-schema',
        stepNumber: 1,
        title: 'Define the Multi-Entity CDS Schema',
        description: 'Model the core domain entities for Employees, LeaveRequests, and ExpenseItems.',
        instructions: [
          'Declare namespace sap.launchpad.hcm;',
          'Define entity Employees with key ID : UUID, empNumber : String(20), name : String(100), and email : String(100);',
          'Define entity LeaveRequests with cuid and managed aspects.',
          'In LeaveRequests, add days : Integer, leaveType : String(30), status : String(20), and employee : Association to Employees;',
          'Define entity ExpenseItems with cuid, amount : Decimal(10, 2), currency : String(3), and employee : Association to Employees;',
        ],
        type: 'cds',
        starterCode: `namespace sap.launchpad.hcm;

// Milestone 1: Define Employees, LeaveRequests, and ExpenseItems
entity Employees {
  key ID : UUID;
  empNumber : String(20);
  name : String(100);
  email : String(100);
}

entity LeaveRequests : cuid, managed {
  // Add fields and Association to Employees
}

entity ExpenseItems : cuid {
  // Add fields and Association to Employees
}
`,
        solutionCode: `namespace sap.launchpad.hcm;

entity Employees {
  key ID    : UUID;
  empNumber : String(20);
  name      : String(100);
  email     : String(100);
}

entity LeaveRequests : cuid, managed {
  days      : Integer;
  leaveType : String(30);
  status    : String(20);
  employee  : Association to Employees;
}

entity ExpenseItems : cuid {
  amount    : Decimal(10, 2);
  currency  : String(3);
  employee  : Association to Employees;
}
`,
        hints: [
          'Remember to extend cuid, managed on LeaveRequests to automatically inherit ID, createdAt, createdBy, modifiedAt, and modifiedBy.',
          'Associations link the child entities back to Employees.',
        ],
        validationRules: [
          {
            id: 'has-employees',
            description: "Declares entity 'Employees' with key ID",
            test: (code) => /entity\s+Employees\s*\{[\s\S]*key\s+ID\s*:\s*UUID/i.test(code),
          },
          {
            id: 'has-leaverequests-managed',
            description: "Declares 'LeaveRequests' extending cuid and managed",
            test: (code) => /entity\s+LeaveRequests\s*:\s*[a-zA-Z0-9_,\s]*cuid[a-zA-Z0-9_,\s]*managed/i.test(code),
          },
          {
            id: 'has-expenseitems',
            description: "Declares 'ExpenseItems' with amount and currency",
            test: (code) => /entity\s+ExpenseItems/i.test(code) && /amount\s*:\s*Decimal/i.test(code),
          },
        ],
        explanation:
          'In SAP CAP, domain models cleanly separate master data (Employees) from transactional records (LeaveRequests, ExpenseItems), forming the foundation for OData exposure.',
      },
      {
        id: 'milestone-2-service-logic',
        stepNumber: 2,
        title: 'Implement CAP Validation & Approval Handlers',
        description: 'Enforce business rules so leave days must be positive and non-negative expense amounts are required.',
        instructions: [
          'Create a custom CAP event handler on LeaveRequests before CREATE.',
          'Validate that req.data.days > 0. If not, call req.reject(400, "Leave days must be greater than zero.").',
          'Default req.data.status = "Pending" for new submissions.',
          'Validate that ExpenseItems amount is greater than 0.',
        ],
        type: 'handler',
        starterCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('CREATE', 'LeaveRequests', async (req) => {
    // Validate days > 0 and set default status
  });

  this.before('CREATE', 'ExpenseItems', async (req) => {
    // Validate amount > 0
  });
});
`,
        solutionCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('CREATE', 'LeaveRequests', async (req) => {
    if (!req.data.days || req.data.days <= 0) {
      req.reject(400, "Leave days must be greater than zero.");
    }
    req.data.status = 'Pending';
  });

  this.before('CREATE', 'ExpenseItems', async (req) => {
    if (!req.data.amount || req.data.amount <= 0) {
      req.reject(400, "Expense amount must be positive.");
    }
  });
});
`,
        hints: [
          'Always use req.reject(400, "message") in CAP to return a proper OData v4 error JSON structure.',
          'Setting req.data.status = "Pending" guarantees that clients cannot sneak an "Approved" status on creation.',
        ],
        validationRules: [
          {
            id: 'checks-days',
            description: 'Validates days > 0 with req.reject(400, ...)',
            test: (code) => /days.*<=.*0/i.test(code) && /req\.reject\s*\(\s*400/i.test(code),
          },
          {
            id: 'defaults-pending',
            description: "Sets default status to 'Pending'",
            test: (code) => /status\s*=\s*['"]Pending['"]/i.test(code),
          },
        ],
        explanation:
          'Service handlers intercept OData lifecycle events. By placing validation in this.before("CREATE"), bad requests are terminated before hitting the database.',
      },
      {
        id: 'milestone-3-odata-queries',
        stepNumber: 3,
        title: 'Query and Approve via OData v4',
        description: 'Simulate querying pending requests and approving a specific leave record using PATCH.',
        instructions: [
          'Formulate an OData query to retrieve all pending leave requests with employee details: GET /odata/v4/catalog/LeaveRequests?$filter=status eq \'Pending\'&$expand=employee',
          'Execute a PATCH request to /odata/v4/catalog/LeaveRequests(\'lr-502\') with body {"status": "Approved"} to approve it.',
          'Verify that the response returns HTTP 200 with status "Approved".',
        ],
        type: 'odata',
        starterCode: `GET /odata/v4/catalog/LeaveRequests?$filter=status eq 'Pending'&$expand=employee`,
        solutionCode: `GET /odata/v4/catalog/LeaveRequests?$filter=status eq 'Pending'&$expand=employee`,
        hints: [
          'Use $filter=status eq \'Pending\' combined with $expand=employee to fetch relational data.',
          'PATCH modifies existing entities without altering unmentioned properties.',
        ],
        validationRules: [
          {
            id: 'filter-expand-query',
            description: "Includes $filter=status eq 'Pending' and $expand=employee",
            test: (code) => /status\s+eq\s+['"]Pending['"]/i.test(code) && /\$expand=employee/i.test(code),
          },
        ],
        explanation:
          'Enterprise SAP Fiori elements Object Pages issue this exact combination of $expand and PATCH when managers open the approval inbox and click the Approve button.',
      },
      {
        id: 'milestone-4-architecture',
        stepNumber: 4,
        title: 'Project Architecture Verification',
        description: 'Review the end-to-end cloud deployment architecture for the HCM application.',
        instructions: [
          'Verify how the MTA (Multi-Target Application) packages the Node.js backend, HANA database deployer, and AppRouter.',
          'Ensure the XSUAA configuration defines scopes: LeaveRequest.Employee and LeaveRequest.Manager.',
          'Confirm that all 4 milestones are complete to certify your practical project submission.',
        ],
        type: 'config',
        starterCode: `// Architecture checklist:
// 1. CDS Domain Schema: Verified
// 2. Business Validation Handler: Verified
// 3. OData v4 Query and Action: Verified
const projectStatus = "READY_FOR_DEPLOYMENT";
`,
        solutionCode: `const projectStatus = "READY_FOR_DEPLOYMENT";`,
        hints: ['This milestone confirms your understanding of the complete enterprise lifecycle.'],
        validationRules: [
          {
            id: 'project-ready',
            description: 'Confirms project deployment readiness',
            test: (code) => /READY_FOR_DEPLOYMENT/i.test(code),
          },
        ],
        explanation:
          'Congratulations! You have completed the architecture and implementation for an enterprise HCM leave and expense service on SAP BTP.',
      },
    ],
  },

  // ========================================================
  // PROJECT 2: Vendor Registration & Approval Portal
  // ========================================================
  {
    id: 'project-vendor-portal',
    title: 'Vendor Registration & Approval Portal',
    subtitle: 'Manage supplier onboarding, tax validations, and strict role-based access control.',
    description:
      'Build a secure supplier onboarding portal where external vendors submit registration applications, compliance officers verify tax identifiers, and role-based access control (RBAC) isolates sensitive company documents.',
    difficulty: 'intermediate',
    estimatedHours: 3.0,
    businessScenario:
      'Global Manufacturing AG needs a compliance-first BTP portal to verify prospective vendors against international tax registries before issuing vendor IDs and allowing purchase orders.',
    architectureSummary: {
      backend: 'SAP CAP (Node.js) with custom validation and state-machine transitions',
      database: 'SAP HANA Cloud with columnar encryption for tax IDs',
      integration: 'External VAT/Tax verification REST API via SAP Destination Service',
      frontend: 'SAP Fiori Elements Worklist & Object Page',
    },
    milestones: [
      {
        id: 'milestone-1-vendor-schema',
        stepNumber: 1,
        title: 'Define the Vendor Data Model',
        description: 'Create the Vendors and ComplianceDocuments CDS entities with aspects.',
        instructions: [
          'Declare namespace sap.launchpad.procurement;',
          'Define entity Vendors with cuid and managed aspects.',
          'Add companyName : String(120);, taxId : String(30);, country : String(3);, status : String(20);, and rating : Decimal(3, 2);',
          'Add documents : Composition of many ComplianceDocuments on documents.vendor = $self;',
          'Define entity ComplianceDocuments with cuid, docType : String(50), fileUrl : String(255), and vendor : Association to Vendors;',
        ],
        type: 'cds',
        starterCode: `namespace sap.launchpad.procurement;

entity Vendors : cuid, managed {
  companyName : String(120);
  taxId       : String(30);
  country     : String(3);
  status      : String(20);
  // Add documents composition
}

entity ComplianceDocuments : cuid {
  // Add docType, fileUrl, and vendor association
}
`,
        solutionCode: `namespace sap.launchpad.procurement;

entity Vendors : cuid, managed {
  companyName : String(120);
  taxId       : String(30);
  country     : String(3);
  status      : String(20);
  rating      : Decimal(3, 2);
  documents   : Composition of many ComplianceDocuments on documents.vendor = $self;
}

entity ComplianceDocuments : cuid {
  docType     : String(50);
  fileUrl     : String(255);
  vendor      : Association to Vendors;
}
`,
        hints: [
          'Use Composition of many ComplianceDocuments to bind compliance files directly to the vendor lifecycle.',
        ],
        validationRules: [
          {
            id: 'has-vendor-composition',
            description: 'Includes Composition of many ComplianceDocuments',
            test: (code) => /documents\s*:\s*Composition\s+of\s+many\s+ComplianceDocuments/i.test(code),
          },
          {
            id: 'has-compliance-docs',
            description: 'Defines ComplianceDocuments with vendor Association',
            test: (code) => /entity\s+ComplianceDocuments/i.test(code) && /vendor\s*:\s*Association\s+to\s+Vendors/i.test(code),
          },
        ],
        explanation:
          'Compositions ensure that if a rejected vendor registration is purged from the database, all associated compliance documents are deleted atomically.',
      },
      {
        id: 'milestone-2-state-transition',
        stepNumber: 2,
        title: 'Enforce Status Transition Business Rules',
        description: 'Implement a state-machine guard in CAP preventing invalid vendor status updates.',
        instructions: [
          'In the vendor service implementation, intercept UPDATE on Vendors.',
          'Rule 1: If current status is "Blocked", the vendor CANNOT be changed directly to "Active" without going through "Under Review".',
          'If this invalid transition is attempted, call req.reject(400, "Blocked vendors must undergo review before activation.").',
        ],
        type: 'handler',
        starterCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('UPDATE', 'Vendors', async (req) => {
    // Implement status transition check
  });
});
`,
        solutionCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('UPDATE', 'Vendors', async (req) => {
    if (req.data.status === 'Active') {
      const existing = await SELECT.one.from('Vendors').where({ ID: req.data.ID });
      if (existing && existing.status === 'Blocked') {
        req.reject(400, "Blocked vendors must undergo review before activation.");
      }
    }
  });
});
`,
        hints: [
          'Fetch the current entity state from the database using SELECT.one.from("Vendors").where({ ID: req.data.ID }).',
          'Reject invalid transitions using req.reject(400, ...).',
        ],
        validationRules: [
          {
            id: 'checks-blocked-transition',
            description: 'Checks if previous status was Blocked and rejects activation with 400',
            test: (code) => /Blocked/i.test(code) && /Active/i.test(code) && /req\.reject\s*\(\s*400/i.test(code),
          },
        ],
        explanation:
          'State transition rules protect enterprise integrity. CAP before handlers allow programmatic inspection of previous vs proposed states.',
      },
      {
        id: 'milestone-3-security-roles',
        stepNumber: 3,
        title: 'Define XSUAA Scopes and Role Templates',
        description: 'Configure xs-security.json to create Vendor.Viewer and Vendor.Manager scopes.',
        instructions: [
          'Define two scopes: "$XSAPPNAME.VendorViewer" with description "View vendor profiles".',
          'Define "$XSAPPNAME.VendorManager" with description "Approve and manage vendor status".',
          'Define role templates matching these scopes for assignment in BTP Cockpit.',
        ],
        type: 'config',
        starterCode: `{
  "xsappname": "vendor-portal",
  "scopes": [
    // Define VendorViewer and VendorManager scopes
  ],
  "role-templates": []
}`,
        solutionCode: `{
  "xsappname": "vendor-portal",
  "scopes": [
    {
      "name": "$XSAPPNAME.VendorViewer",
      "description": "View vendor profiles"
    },
    {
      "name": "$XSAPPNAME.VendorManager",
      "description": "Approve and manage vendor status"
    }
  ],
  "role-templates": [
    {
      "name": "VendorManagerRole",
      "description": "Administrator for vendor approval",
      "scope-references": ["$XSAPPNAME.VendorManager"]
    }
  ]
}`,
        hints: [
          'Scopes in xs-security.json must begin with "$XSAPPNAME." so they are namespaced to your cloud application instance.',
        ],
        validationRules: [
          {
            id: 'has-both-scopes',
            description: 'Defines VendorViewer and VendorManager scopes',
            test: (code) => /VendorViewer/i.test(code) && /VendorManager/i.test(code),
          },
        ],
        explanation:
          'XSUAA role-templates are translated into Role Collections in the SAP BTP Cockpit, allowing enterprise administrators to assign permissions via corporate Identity Providers (IdP).',
      },
      {
        id: 'milestone-4-architecture',
        stepNumber: 4,
        title: 'Procurement Architecture Sign-Off',
        description: 'Review compliance with SAP BTP security guidelines and data privacy regulations.',
        instructions: [
          'Verify that sensitive compliance documents are stored in SAP Document Management Service (DMS).',
          'Confirm that vendor tax IDs are encrypted at rest in SAP HANA Cloud.',
          'Submit the final milestone.',
        ],
        type: 'config',
        starterCode: `const portalVerified = true;`,
        solutionCode: `const portalVerified = true;`,
        hints: ['Project 2 verification is complete.'],
        validationRules: [
          {
            id: 'verified',
            description: 'Marks portal architecture verified',
            test: (code) => /portalVerified\s*=\s*true/i.test(code),
          },
        ],
        explanation:
          'You have completed the Vendor Registration & Approval Portal project covering CDS modeling, state-machine validation, and XSUAA security configuration.',
      },
    ],
  },

  // ========================================================
  // PROJECT 3: Currency & Order Synchronization Engine
  // ========================================================
  {
    id: 'project-order-sync',
    title: 'Currency & Order Synchronization Engine',
    subtitle: 'Integrate external REST APIs via SAP Destination Service with resilience and retry flows.',
    description:
      'Build an integration service that synchronizes international sales orders, calls an external exchange rate API via BTP Destination Service, and handles transient network failures gracefully.',
    difficulty: 'advanced',
    estimatedHours: 3.5,
    businessScenario:
      'An enterprise e-commerce platform processes global orders in USD, JPY, and GBP. It needs a backend service on SAP BTP to convert all sales transactions into EUR in real-time for corporate financial reporting.',
    architectureSummary: {
      backend: 'SAP CAP with SAP Cloud SDK for Destination lookup and HTTP execution',
      database: 'SAP HANA Cloud table storage with converted currency aggregates',
      integration: 'SAP BTP Destination Service + SAP Connectivity Service (Cloud Connector)',
      frontend: 'SAP Fiori Overview Page displaying currency-adjusted revenue charts',
    },
    milestones: [
      {
        id: 'milestone-1-sales-schema',
        stepNumber: 1,
        title: 'Model Multi-Currency Sales Orders',
        description: 'Create the SalesOrders and CurrencyRates CDS entities.',
        instructions: [
          'Declare namespace sap.launchpad.sales;',
          'Define entity SalesOrders with key ID : UUID, orderNumber : String(30), originalAmount : Decimal(12, 2), originalCurrency : String(3), exchangeRate : Decimal(10, 4), and convertedEUR : Decimal(12, 2);',
          'Define entity CurrencyRates with key currencyCode : String(3), rateToEUR : Decimal(10, 4), and lastUpdated : Timestamp;',
        ],
        type: 'cds',
        starterCode: `namespace sap.launchpad.sales;

// Milestone 1: Define SalesOrders and CurrencyRates
entity SalesOrders {
  // Add fields here
}

entity CurrencyRates {
  // Add fields here
}
`,
        solutionCode: `namespace sap.launchpad.sales;

entity SalesOrders {
  key ID           : UUID;
  orderNumber      : String(30);
  originalAmount   : Decimal(12, 2);
  originalCurrency : String(3);
  exchangeRate     : Decimal(10, 4);
  convertedEUR     : Decimal(12, 2);
}

entity CurrencyRates {
  key currencyCode : String(3);
  rateToEUR        : Decimal(10, 4);
  lastUpdated      : Timestamp;
}
`,
        hints: [
          'Ensure primary keys are specified: "key ID : UUID;" and "key currencyCode : String(3);".',
        ],
        validationRules: [
          {
            id: 'has-salesorders',
            description: 'Defines SalesOrders with originalAmount, originalCurrency, and convertedEUR',
            test: (code) =>
              /entity\s+SalesOrders/i.test(code) &&
              /originalAmount\s*:\s*Decimal/i.test(code) &&
              /convertedEUR\s*:\s*Decimal/i.test(code),
          },
          {
            id: 'has-currencyrates',
            description: 'Defines CurrencyRates with currencyCode and rateToEUR',
            test: (code) =>
              /entity\s+CurrencyRates/i.test(code) &&
              /rateToEUR\s*:\s*Decimal/i.test(code),
          },
        ],
        explanation:
          'Separating the order header from cached exchange rates allows fast local joins without calling the external rate API for every individual line item.',
      },
      {
        id: 'milestone-2-destination-config',
        stepNumber: 2,
        title: 'Configure SAP BTP Destination Service',
        description: 'Define the external exchange rate destination configuration in JSON format.',
        instructions: [
          'Configure a destination named "EXCHANGE_RATE_API".',
          'Type must be "HTTP".',
          'URL: "https://api.exchangerate-enterprise.io/v1".',
          'Authentication: "NoAuthentication" or "BasicAuthentication".',
          'ProxyType: "Internet".',
          'Add property "URL.headers.apikey": "mock-api-key-safe".',
        ],
        type: 'config',
        starterCode: `{
  "Name": "EXCHANGE_RATE_API",
  "Type": "HTTP",
  "URL": "https://api.exchangerate-enterprise.io/v1",
  "Authentication": "NoAuthentication",
  "ProxyType": "Internet"
}`,
        solutionCode: `{
  "Name": "EXCHANGE_RATE_API",
  "Type": "HTTP",
  "URL": "https://api.exchangerate-enterprise.io/v1",
  "Authentication": "NoAuthentication",
  "ProxyType": "Internet"
}`,
        hints: [
          'The Destination Service decouples target host credentials from application code, making environment promotion (dev -> test -> prod) seamless.',
        ],
        validationRules: [
          {
            id: 'valid-destination-json',
            description: 'Specifies EXCHANGE_RATE_API with ProxyType Internet and HTTP Type',
            test: (code) => /EXCHANGE_RATE_API/i.test(code) && /"ProxyType"\s*:\s*"Internet"/i.test(code),
          },
        ],
        explanation:
          'By using SAP Destination Service, application code queries destinations by symbolic name without hardcoding IP addresses or credentials.',
      },
      {
        id: 'milestone-3-conversion-handler',
        stepNumber: 3,
        title: 'Implement Currency Conversion with Fallback',
        description: 'Implement CAP service logic to calculate convertedEUR before persisting the order.',
        instructions: [
          'In this.before("CREATE", "SalesOrders", async (req) => { ... }), calculate convertedEUR.',
          'If originalCurrency is "EUR", exchangeRate is 1.0 and convertedEUR equals originalAmount.',
          'Otherwise, look up rate from CurrencyRates or calculate convertedEUR = originalAmount * exchangeRate.',
          'If exchange rate is missing or <= 0, call req.reject(400, "Invalid exchange rate for currency.").',
        ],
        type: 'handler',
        starterCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('CREATE', 'SalesOrders', async (req) => {
    const { originalAmount, originalCurrency, exchangeRate } = req.data;

    // Handle EUR and calculate convertedEUR
  });
});
`,
        solutionCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('CREATE', 'SalesOrders', async (req) => {
    const { originalAmount, originalCurrency, exchangeRate } = req.data;

    if (originalCurrency === 'EUR') {
      req.data.exchangeRate = 1.0;
      req.data.convertedEUR = originalAmount;
      return;
    }

    if (!exchangeRate || exchangeRate <= 0) {
      req.reject(400, "Invalid exchange rate for currency.");
      return;
    }

    req.data.convertedEUR = Number((originalAmount * exchangeRate).toFixed(2));
  });
});
`,
        hints: [
          'Remember to check for originalCurrency === "EUR" to bypass external conversion overhead.',
        ],
        validationRules: [
          {
            id: 'handles-eur',
            description: 'Handles originalCurrency === "EUR" gracefully',
            test: (code) => /originalCurrency\s*===\s*['"]EUR['"]/i.test(code),
          },
          {
            id: 'calculates-converted',
            description: 'Calculates convertedEUR and validates exchangeRate > 0',
            test: (code) => /convertedEUR/i.test(code) && /req\.reject\s*\(\s*400/i.test(code),
          },
        ],
        explanation:
          'Calculating converted currency at insert time guarantees consistent historical auditing even when future exchange rates fluctuate.',
      },
      {
        id: 'milestone-4-architecture',
        stepNumber: 4,
        title: 'Project Synchronization Sign-Off',
        description: 'Verify integration resilience and audit compliance.',
        instructions: [
          'Confirm that the integration handles rate changes and logs discrepancies.',
          'Submit the final verification statement to finish Project 3.',
        ],
        type: 'config',
        starterCode: `const integrationEngineVerified = true;`,
        solutionCode: `const integrationEngineVerified = true;`,
        hints: ['Project 3 verification is complete.'],
        validationRules: [
          {
            id: 'sync-verified',
            description: 'Confirms synchronization engine readiness',
            test: (code) => /integrationEngineVerified\s*=\s*true/i.test(code),
          },
        ],
        explanation:
          'You have completed the Currency & Order Synchronization Engine mini-project, incorporating external APIs, destinations, and robust data persistence.',
      },
    ],
  },
];
