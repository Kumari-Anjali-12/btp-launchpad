import { PracticeDrill } from '../../types/practice';

export const PRACTICE_DRILLS: PracticeDrill[] = [
  // ==========================================
  // CATEGORY 1: CDS MODELER DRILLS
  // ==========================================
  {
    id: 'cds-basic-entity',
    title: 'Define Your First CDS Entity',
    category: 'cds',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    summary: 'Define a Core Data Services entity for Products with a primary key and typed attributes.',
    instructions: [
      'Set the namespace to sap.launchpad;',
      'Create an entity named Products.',
      'Define a primary key ID of type UUID.',
      'Add a title field of type String(100).',
      'Add a price field of type Decimal(10, 2).',
      'Add an inStock field of type Integer.',
    ],
    concepts: ['entity', 'key', 'UUID', 'String', 'Decimal', 'Integer', 'namespace'],
    starterCode: `namespace sap.launchpad;

// Task: Define the Products entity below
entity Products {
  // Add key and fields here
}
`,
    solutionCode: `namespace sap.launchpad;

entity Products {
  key ID      : UUID;
  title       : String(100);
  price       : Decimal(10, 2);
  inStock     : Integer;
}
`,
    hints: [
      'In CDS, keys are declared with the key keyword before the field name: "key ID : UUID;".',
      'Remember to terminate each field definition with a semicolon (;).',
      'Type names in SAP CDS are case-sensitive: use UUID, String(100), Decimal(10, 2), and Integer.',
    ],
    validationRules: [
      {
        id: 'has-namespace',
        description: "Declares namespace 'sap.launchpad;'",
        test: (code) => /namespace\s+sap\.launchpad\s*;/i.test(code),
      },
      {
        id: 'has-entity-products',
        description: "Declares entity 'Products'",
        test: (code) => /entity\s+Products\s*\{/i.test(code),
      },
      {
        id: 'has-key-id',
        description: "Includes primary key 'ID' of type UUID",
        test: (code) => /key\s+ID\s*:\s*UUID\s*;/i.test(code),
      },
      {
        id: 'has-title-price-stock',
        description: 'Includes title (String), price (Decimal), and inStock (Integer)',
        test: (code) =>
          /title\s*:\s*String\(\d+\)\s*;/i.test(code) &&
          /price\s*:\s*Decimal\(\d+,\s*\d+\)\s*;/i.test(code) &&
          /inStock\s*:\s*Integer\s*;/i.test(code),
      },
    ],
    explanation:
      'In SAP Cloud Application Programming Model (CAP), CDS is the single source of truth for both the database schema (compiled to SAP HANA tables) and the OData service layer.',
  },
  {
    id: 'cds-managed-aspects',
    title: 'Utilize Built-In CDS Aspects (cuid, managed)',
    category: 'cds',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    summary: 'Leverage SAP CAP common aspects to automatically inherit UUID keys and audit timestamps.',
    instructions: [
      'Define an entity named CustomerInquiries.',
      'Extend the built-in aspects cuid and managed using the colon syntax: "entity CustomerInquiries : cuid, managed { ... }".',
      'Notice that you do NOT need to declare "key ID : UUID" because cuid provides it automatically.',
      'Add a subject field of type String(150).',
      'Add a message field of type String(1000).',
      'Add a status field of type String(20).',
    ],
    concepts: ['cuid', 'managed', 'Aspects', 'Audit Fields', 'Inheritance'],
    starterCode: `namespace sap.launchpad;

// Extend cuid and managed aspects
entity CustomerInquiries {
  subject : String(150);
}
`,
    solutionCode: `namespace sap.launchpad;

entity CustomerInquiries : cuid, managed {
  subject : String(150);
  message : String(1000);
  status  : String(20);
}
`,
    hints: [
      'Aspects are appended right after the entity name separated by commas: "entity Name : cuid, managed {"',
      'The cuid aspect automatically creates a "key ID : UUID" column.',
      'The managed aspect automatically creates createdAt, createdBy, modifiedAt, and modifiedBy audit columns.',
    ],
    validationRules: [
      {
        id: 'uses-aspects',
        description: "Extends both 'cuid' and 'managed' aspects",
        test: (code) => /entity\s+CustomerInquiries\s*:\s*([a-zA-Z0-9_,\s]+)\{/i.test(code) &&
          /cuid/i.test(code) &&
          /managed/i.test(code),
      },
      {
        id: 'has-subject-message-status',
        description: 'Includes subject, message, and status strings',
        test: (code) =>
          /subject\s*:\s*String\(\d+\)\s*;/i.test(code) &&
          /message\s*:\s*String\(\d+\)\s*;/i.test(code) &&
          /status\s*:\s*String\(\d+\)\s*;/i.test(code),
      },
    ],
    explanation:
      'In enterprise applications, standardizing primary keys and audit metadata is crucial. CAP aspects ensure zero-boilerplate schema reuse.',
  },
  {
    id: 'cds-associations',
    title: 'Model Entity Relationships with Associations',
    category: 'cds',
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    summary: 'Define a loose foreign-key relationship between Orders and Customers using CDS Associations.',
    instructions: [
      'Inspect the existing Customers entity.',
      'Define an entity named Orders with key ID : UUID.',
      'Add orderNumber : String(30);',
      'Add totalAmount : Decimal(12, 2);',
      'Define customer as an Association to Customers.',
    ],
    concepts: ['Association', 'Foreign Key', 'Relational Modeling'],
    starterCode: `namespace sap.launchpad;

entity Customers : cuid {
  name  : String(100);
  email : String(100);
}

entity Orders {
  // Define Orders with key ID, orderNumber, totalAmount, and Association to Customers
}
`,
    solutionCode: `namespace sap.launchpad;

entity Customers : cuid {
  name  : String(100);
  email : String(100);
}

entity Orders {
  key ID      : UUID;
  orderNumber : String(30);
  totalAmount : Decimal(12, 2);
  customer    : Association to Customers;
}
`,
    hints: [
      'Associations in CDS use the syntax: "<name> : Association to <TargetEntity>;"',
      'When compiled to SAP HANA DDL, an Association produces a foreign-key column named "customer_ID".',
    ],
    validationRules: [
      {
        id: 'has-orders-entity',
        description: "Defines entity 'Orders' with key ID",
        test: (code) => /entity\s+Orders\s*\{[\s\S]*key\s+ID\s*:\s*UUID\s*;/i.test(code),
      },
      {
        id: 'has-association',
        description: "Includes 'customer : Association to Customers;'",
        test: (code) => /customer\s*:\s*Association\s+to\s+Customers\s*;/i.test(code),
      },
    ],
    explanation:
      'Unlike standard SQL FOREIGN KEY constraints, CDS Associations capture intent and enable automatic OData navigation property routing without manual SQL JOIN writing.',
  },
  {
    id: 'cds-composition',
    title: 'Model Deep Aggregations with Compositions',
    category: 'cds',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    summary: 'Build parent-child document structures where child line items are lifecycle-bound to the parent header.',
    instructions: [
      'Model an PurchaseOrders header entity with key ID : UUID and poNumber : String(20);',
      'In PurchaseOrders, add: "items : Composition of many OrderItems on items.order = $self;"',
      'Model the child entity OrderItems with key ID : UUID, itemNumber : Integer, product : String(50), quantity : Integer, and order : Association to PurchaseOrders;',
    ],
    concepts: ['Composition', 'Parent-Child', 'Deep Insert', 'Cascading Delete'],
    starterCode: `namespace sap.launchpad;

entity PurchaseOrders {
  key ID   : UUID;
  poNumber : String(20);
  // Add items composition here
}

entity OrderItems {
  key ID     : UUID;
  itemNumber : Integer;
  product    : String(50);
  quantity   : Integer;
  // Add parent order association here
}
`,
    solutionCode: `namespace sap.launchpad;

entity PurchaseOrders {
  key ID   : UUID;
  poNumber : String(20);
  items    : Composition of many OrderItems on items.order = $self;
}

entity OrderItems {
  key ID     : UUID;
  itemNumber : Integer;
  product    : String(50);
  quantity   : Integer;
  order      : Association to PurchaseOrders;
}
`,
    hints: [
      'Compositions are the foundation of deep inserts in SAP OData. When a Purchase Order is deleted, all its OrderItems are automatically cascade deleted.',
      'Notice the "$self" keyword, which refers back to the current parent instance.',
    ],
    validationRules: [
      {
        id: 'has-composition',
        description: "Includes 'items : Composition of many OrderItems on items.order = $self;'",
        test: (code) => /items\s*:\s*Composition\s+of\s+many\s+OrderItems/i.test(code),
      },
      {
        id: 'has-parent-association',
        description: "Includes 'order : Association to PurchaseOrders;' on OrderItems",
        test: (code) => /order\s*:\s*Association\s+to\s+PurchaseOrders\s*;/i.test(code),
      },
    ],
    explanation:
      'Compositions represent document aggregates (like an Invoice and its Line Items). When consumed via OData v4, the frontend can submit both header and lines in a single atomic POST.',
  },

  // ==========================================
  // CATEGORY 2: ODATA EXPLORER DRILLS
  // ==========================================
  {
    id: 'odata-select-filter',
    title: 'Querying Data with $select and $filter',
    category: 'odata',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    summary: 'Craft an OData v4 query to project specific fields and filter active employees in Cloud Engineering.',
    instructions: [
      'In the OData Query Explorer, set the HTTP Method to GET.',
      'Target the path: /odata/v4/catalog/Employees',
      'Filter for employees where department equals "Cloud Engineering".',
      'Project only the name, role, and salary fields using $select.',
      'Execute the query and observe the minimal JSON payload returned.',
    ],
    concepts: ['$select', '$filter', 'Projection', 'OData v4 URL conventions'],
    starterCode: `GET /odata/v4/catalog/Employees`,
    solutionCode: `GET /odata/v4/catalog/Employees?$select=name,role,salary&$filter=department eq 'Cloud Engineering'`,
    hints: [
      "In OData v4, string literals in $filter MUST be enclosed in single quotes: department eq 'Cloud Engineering'.",
      'Use commas without spaces in $select: $select=name,role,salary.',
      'Separate query parameters with the ampersand (&) symbol.',
    ],
    validationRules: [
      {
        id: 'targets-employees',
        description: 'Targets the /odata/v4/catalog/Employees endpoint',
        test: (query) => /catalog\/Employees/i.test(query),
      },
      {
        id: 'has-filter',
        description: "Contains $filter=department eq 'Cloud Engineering'",
        test: (query) => /\$filter=department\s+eq\s+['"]Cloud Engineering['"]/i.test(query),
      },
      {
        id: 'has-select',
        description: 'Contains $select with name, role, and salary',
        test: (query) => /\$select=.*name.*role.*salary/i.test(query),
      },
    ],
    explanation:
      'Filtering at the protocol layer with $filter pushes the WHERE clause down to SAP HANA, avoiding unnecessary network transfer and memory overhead.',
  },
  {
    id: 'odata-expand-relation',
    title: 'Navigating Relationships with $expand',
    category: 'odata',
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    summary: 'Perform a single-roundtrip deep query to fetch LeaveRequests together with employee details.',
    instructions: [
      'Set the HTTP method to GET.',
      'Target path: /odata/v4/catalog/LeaveRequests',
      'Use $expand=employee to fetch the associated employee details inside each leave request.',
      'Filter for only Pending requests: $filter=status eq \'Pending\'.',
      'Execute the query and inspect the nested "employee" JSON object.',
    ],
    concepts: ['$expand', 'Navigation Properties', 'Network Efficiency'],
    starterCode: `GET /odata/v4/catalog/LeaveRequests`,
    solutionCode: `GET /odata/v4/catalog/LeaveRequests?$expand=employee&$filter=status eq 'Pending'`,
    hints: [
      'The navigation property on LeaveRequests is named "employee".',
      'Combining $expand and $filter allows you to fetch related entities in a single HTTP roundtrip.',
    ],
    validationRules: [
      {
        id: 'has-expand',
        description: 'Includes $expand=employee',
        test: (query) => /\$expand=employee/i.test(query),
      },
      {
        id: 'has-status-pending',
        description: "Includes $filter=status eq 'Pending'",
        test: (query) => /\$filter=status\s+eq\s+['"]Pending['"]/i.test(query),
      },
    ],
    explanation:
      'Without $expand, a client would suffer the "N+1 query problem", firing one request for the list and N separate requests for each employee.',
  },
  {
    id: 'odata-create-entity',
    title: 'Creating Records with OData POST',
    category: 'odata',
    difficulty: 'intermediate',
    estimatedMinutes: 7,
    summary: 'Submit a new LeaveRequest record via HTTP POST and inspect the 201 Created response.',
    instructions: [
      'Set the HTTP method to POST.',
      'Path: /odata/v4/catalog/LeaveRequests',
      'Provide a JSON payload with employee_ID ("e101"), startDate ("2027-02-01"), endDate ("2027-02-05"), leaveType ("Vacation"), days (4), status ("Pending"), and comments ("Sprint rest").',
      'Observe the 201 Created status and the returned generated ID.',
    ],
    concepts: ['POST', '201 Created', 'Payload Validation', 'Location Header'],
    starterCode: `POST /odata/v4/catalog/LeaveRequests
Content-Type: application/json

{
  "employee_ID": "e101",
  "startDate": "2027-02-01",
  "endDate": "2027-02-05",
  "leaveType": "Vacation",
  "days": 4,
  "status": "Pending",
  "comments": "Sprint rest"
}`,
    solutionCode: `POST /odata/v4/catalog/LeaveRequests
Content-Type: application/json

{
  "employee_ID": "e101",
  "startDate": "2027-02-01",
  "endDate": "2027-02-05",
  "leaveType": "Vacation",
  "days": 4,
  "status": "Pending",
  "comments": "Sprint rest"
}`,
    hints: [
      'Ensure the JSON body is well-formed with matching braces and double quotes around property names.',
      'Status 201 Created indicates successful resource persistence.',
    ],
    validationRules: [
      {
        id: 'valid-json-payload',
        description: 'Contains valid JSON with employee_ID and status',
        test: (code) => /employee_ID/i.test(code) && /status/i.test(code) && /leaveType/i.test(code),
      },
    ],
    explanation:
      'In OData v4, POST creates a new entity in the collection. The CAP framework automatically executes validation handlers and persists changes in SAP HANA within an ACID transaction.',
  },
  {
    id: 'odata-update-delete',
    title: 'Modifying and Deleting Records (PATCH & DELETE)',
    category: 'odata',
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    summary: 'Update leave request status to Approved via PATCH and remove outdated records via DELETE.',
    instructions: [
      'To update an existing entity, use PATCH with the entity key: /odata/v4/catalog/LeaveRequests(\'lr-502\').',
      'Provide a JSON payload with {"status": "Approved"}.',
      'Notice that PATCH only updates the supplied fields (delta update) rather than overwriting the whole entity.',
      'To delete, use DELETE /odata/v4/catalog/LeaveRequests(\'lr-502\') which returns 204 No Content.',
    ],
    concepts: ['PATCH', 'DELETE', '204 No Content', 'Idempotency'],
    starterCode: `PATCH /odata/v4/catalog/LeaveRequests('lr-502')
Content-Type: application/json

{
  "status": "Approved"
}`,
    solutionCode: `PATCH /odata/v4/catalog/LeaveRequests('lr-502')
Content-Type: application/json

{
  "status": "Approved"
}`,
    hints: [
      'Always specify the target key in parentheses in the URL: LeaveRequests(\'lr-502\').',
      'In OData v4, PATCH is preferred over PUT because it does not require resending unmodified attributes.',
    ],
    validationRules: [
      {
        id: 'has-patch-format',
        description: "Uses key-specific path and updates status",
        test: (code) => /LeaveRequests\(['"]?lr-502['"]?\)/i.test(code) && /"status"\s*:\s*"Approved"/i.test(code),
      },
    ],
    explanation:
      'SAP Fiori applications rely heavily on OData PATCH requests during object page edits to maintain high responsiveness with minimal network traffic.',
  },

  // ==========================================
  // CATEGORY 3: SECURITY EXERCISES
  // ==========================================
  {
    id: 'sec-authn-authz',
    title: 'Authentication (401) vs Authorization (403)',
    category: 'security',
    difficulty: 'beginner',
    estimatedMinutes: 6,
    summary: 'Learn to accurately diagnose whether an API failure is due to missing identity or insufficient privileges.',
    instructions: [
      'Examine the two simulated HTTP error scenarios below.',
      'Scenario A receives: HTTP 401 Unauthorized with header "WWW-Authenticate: Bearer error=\\"invalid_token\\"".',
      'Scenario B receives: HTTP 403 Forbidden with payload: "Access denied. Required scope: LeaveRequest.Admin".',
      'Answer the diagnostic question: In which scenario has the user successfully logged in but lacks the necessary role collection?',
      'Type "Scenario B" or "403" in the solution workspace to proceed.',
    ],
    concepts: ['401 Unauthorized', '403 Forbidden', 'Authentication', 'Authorization', 'Scopes'],
    starterCode: `// Enter your diagnostic conclusion:
// Which HTTP status code represents: "User identity verified, but missing required business permission"?
const correctStatus = "";
`,
    solutionCode: `// Enter your diagnostic conclusion:
// Which HTTP status code represents: "User identity verified, but missing required business permission"?
const correctStatus = "403";
`,
    hints: [
      '401 Unauthorized actually means "Unauthenticated": the system has no idea who you are (missing/expired token).',
      '403 Forbidden means "Unauthorized/Forbidden": the system knows exactly who you are, but you do not have permission to perform this action.',
    ],
    validationRules: [
      {
        id: 'identifies-403',
        description: 'Accurately identifies HTTP 403 / Scenario B as the authorization failure',
        test: (code) => /403|scenario\s*b/i.test(code),
      },
    ],
    explanation:
      'Confusing 401 and 403 is one of the most common mistakes junior developers make on SAP BTP. 401 means fix the OAuth token; 403 means assign the user a Role Collection in BTP Cockpit.',
  },
  {
    id: 'sec-jwt-xsuaa',
    title: 'Decoding XSUAA JSON Web Tokens (JWT)',
    category: 'security',
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    summary: 'Inspect a decoded SAP BTP XSUAA token and identify user identity, tenant subdomain, and granted scopes.',
    instructions: [
      'Inspect the decoded JWT payload in the workspace.',
      'Locate the "scope" array, "user_name", and "zid" (tenant zone ID).',
      'Update the code to check if the user possesses the required scope: "LeaveRequest.Approver".',
      'Implement the hasScope helper function to return true if the scope exists in token.scope.',
    ],
    concepts: ['JWT', 'XSUAA', 'Scopes', 'Role Collections', 'Subdomain Isolation'],
    starterCode: `const sampleXsuaaToken = {
  user_name: "j.doe@enterprise.corp",
  email: "j.doe@enterprise.corp",
  zid: "subaccount-tenant-9941",
  scope: [
    "openid",
    "LeaveRequest.Viewer",
    "LeaveRequest.Approver"
  ],
  exp: 1774396800
};

function hasScope(token, requiredScope) {
  // Return true if token.scope includes requiredScope
  return false;
}
`,
    solutionCode: `const sampleXsuaaToken = {
  user_name: "j.doe@enterprise.corp",
  email: "j.doe@enterprise.corp",
  zid: "subaccount-tenant-9941",
  scope: [
    "openid",
    "LeaveRequest.Viewer",
    "LeaveRequest.Approver"
  ],
  exp: 1774396800
};

function hasScope(token, requiredScope) {
  return token.scope.includes(requiredScope);
}
`,
    hints: [
      'In JavaScript, check array membership using token.scope.includes(requiredScope).',
      'In SAP CAP, @(requires: "admin") checks this exact scope array under the hood.',
    ],
    validationRules: [
      {
        id: 'implements-scope-check',
        description: 'Implements scope verification using includes or indexOf',
        test: (code) => /token\.scope\.(includes|indexOf)/.test(code),
      },
    ],
    explanation:
      'When an AppRouter forwards requests to a CAP backend, it sends an Authorization: Bearer <JWT> header containing the scopes granted to the user in the SAP BTP Cockpit.',
  },
  {
    id: 'sec-route-protection',
    title: 'AppRouter Security Configuration (xs-app.json)',
    category: 'security',
    difficulty: 'intermediate',
    estimatedMinutes: 7,
    summary: 'Configure routing security rules in xs-app.json to protect backend OData endpoints.',
    instructions: [
      'Configure the route for "^/odata/v4/(.*)$".',
      'Set target destination to "srv-api".',
      'Set authenticationMethod to "route".',
      'Set scope to ["$XSAPPNAME.Admin", "$XSAPPNAME.User"].',
      'Set csrfProtection to true to protect against CSRF attacks.',
    ],
    concepts: ['AppRouter', 'xs-app.json', 'CSRF Protection', 'Route Authentication'],
    starterCode: `{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^/odata/v4/(.*)$",
      "target": "$1",
      "destination": "srv-api",
      "authenticationMethod": "none",
      "csrfProtection": false
    }
  ]
}`,
    solutionCode: `{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^/odata/v4/(.*)$",
      "target": "$1",
      "destination": "srv-api",
      "authenticationMethod": "route",
      "scope": ["$XSAPPNAME.Admin", "$XSAPPNAME.User"],
      "csrfProtection": true
    }
  ]
}`,
    hints: [
      'Change "authenticationMethod": "none" to "route" to enforce XSUAA login.',
      'Enable "csrfProtection": true to ensure safe mutating requests.',
      '$XSAPPNAME is dynamically replaced with the actual XSUAA application identifier at runtime.',
    ],
    validationRules: [
      {
        id: 'auth-route',
        description: 'Sets authenticationMethod to route',
        test: (code) => /"authenticationMethod"\s*:\s*"route"/i.test(code),
      },
      {
        id: 'csrf-enabled',
        description: 'Sets csrfProtection to true',
        test: (code) => /"csrfProtection"\s*:\s*true/i.test(code),
      },
      {
        id: 'has-scope-array',
        description: 'Includes scope requirement array',
        test: (code) => /"scope"\s*:\s*\[[\s\S]*\$XSAPPNAME/i.test(code),
      },
    ],
    explanation:
      'The SAP BTP AppRouter acts as the reverse proxy gateway. Setting authenticationMethod: route ensures unauthenticated visitors are automatically redirected to SAP Cloud Identity Services.',
  },

  // ==========================================
  // CATEGORY 4: DEBUGGING DRILLS
  // ==========================================
  {
    id: 'debug-cds-syntax',
    title: 'Fixing Broken CDS Model Syntax',
    category: 'debugging',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    summary: 'Diagnose and fix syntax bugs in a broken CDS model file.',
    instructions: [
      'The provided CDS model fails compilation with 3 separate errors.',
      'Bug 1: Missing semicolon on the title property.',
      'Bug 2: Invalid type "Strng" instead of "String(100)".',
      'Bug 3: Missing primary key definition on the entity.',
      'Fix all three errors and verify that the parser generates clean SQL and OData previews.',
    ],
    concepts: ['Syntax Error Diagnostics', 'Type Safety', 'Key Constraints'],
    starterCode: `namespace sap.launchpad;

entity Articles {
  ID    : UUID
  title : Strng
  views : Integer;
}
`,
    solutionCode: `namespace sap.launchpad;

entity Articles {
  key ID : UUID;
  title  : String(100);
  views  : Integer;
}
`,
    hints: [
      'Remember every property definition must end with a semicolon.',
      'The primary key is declared with "key ID : UUID;".',
      'The string type is "String(100)".',
    ],
    validationRules: [
      {
        id: 'fixed-key',
        description: 'Adds key keyword to ID',
        test: (code) => /key\s+ID\s*:\s*UUID\s*;/i.test(code),
      },
      {
        id: 'fixed-string',
        description: 'Corrects Strng typo to String',
        test: (code) => /title\s*:\s*String(?:\(\d+\))?\s*;/i.test(code),
      },
      {
        id: 'all-semicolons',
        description: 'All field definitions end with semicolons',
        test: (code) => !/[A-Za-z0-9_]\s*:\s*[A-Za-z0-9_()]+\s*\n\s*[A-Za-z0-9_]/m.test(code),
      },
    ],
    explanation:
      'CDS compilers are strict about semicolons and built-in type capitalization to prevent ambiguous database table column generation.',
  },
  {
    id: 'debug-cap-handler',
    title: 'Debugging CAP Event Handler Logic',
    category: 'debugging',
    difficulty: 'intermediate',
    estimatedMinutes: 7,
    summary: 'Fix a flawed CAP event handler that crashes on negative values and misses async handling.',
    instructions: [
      'In a CAP service handler, validation errors should be reported using req.reject(400, message).',
      'The junior developer used a raw throw new Error() which crashes the server with a 500 error.',
      'The handler also forgets to await an asynchronous stock lookup.',
      'Correct the code to reject gracefully with status 400 when quantity is <= 0.',
      'Add the missing async/await keyword so the database query resolves properly.',
    ],
    concepts: ['req.reject', 'CAP Handlers', 'Async / Await', 'HTTP 400 vs 500'],
    starterCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('CREATE', 'OrderItems', (req) => {
    const { quantity } = req.data;

    // BUG 1: Raw throw crashes server with 500 instead of clean 400
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    // BUG 2: Missing await on database query
    const item = SELECT.one.from('Products').where({ ID: req.data.product_ID });
    if (!item) {
      req.reject(404, "Product not found.");
    }
  });
});
`,
    solutionCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(function() {
  this.before('CREATE', 'OrderItems', async (req) => {
    const { quantity } = req.data;

    if (quantity <= 0) {
      req.reject(400, "Quantity must be greater than zero.");
    }

    const item = await SELECT.one.from('Products').where({ ID: req.data.product_ID });
    if (!item) {
      req.reject(404, "Product not found.");
    }
  });
});
`,
    hints: [
      'Replace "throw new Error(...)" with "req.reject(400, ...)" so CAP serializes a proper OData v4 error JSON response.',
      'Add "async (req) =>" and "await SELECT.one...".',
    ],
    validationRules: [
      {
        id: 'uses-req-reject',
        description: 'Uses req.reject(400, ...) instead of raw throw',
        test: (code) => /req\.reject\s*\(\s*400/i.test(code) && !/throw\s+new\s+Error/i.test(code),
      },
      {
        id: 'uses-async-await',
        description: 'Uses async handler and awaits SELECT.one',
        test: (code) => /async\s*\(req\)/i.test(code) && /await\s+SELECT\.one/i.test(code),
      },
    ],
    explanation:
      'In SAP CAP, throw new Error() is treated as an unhandled internal exception, logging a stack trace and returning HTTP 500. For business validation rules, always use req.reject(400, msg).',
  },
  {
    id: 'debug-odata-url',
    title: 'Fixing Broken OData v4 URL Syntax',
    category: 'debugging',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    summary: 'Correct query syntax mistakes in a broken OData v4 URL.',
    instructions: [
      'A frontend Fiori developer wrote an invalid OData v4 query: /odata/v4/catalog/Employees?filter=department="Cloud Engineering"&$select=name, salary',
      'Bug 1: OData query options must start with "$" (use $filter instead of filter).',
      'Bug 2: String literals in $filter must use single quotes (\'...\') and the eq operator (not "=").',
      'Bug 3: Remove spaces after commas in $select.',
      'Correct the query URL.',
    ],
    concepts: ['$filter', '$select', 'OData v4 URL conventions', 'Equality Operator'],
    starterCode: `GET /odata/v4/catalog/Employees?filter=department="Cloud Engineering"&$select=name, salary`,
    solutionCode: `GET /odata/v4/catalog/Employees?$filter=department eq 'Cloud Engineering'&$select=name,salary`,
    hints: [
      'In OData v4, the equality comparison is "eq", not "=".',
      'String values are enclosed in single quotes: \'Cloud Engineering\'.',
      'All system query options require the "$" prefix: $filter, $select, $expand.',
    ],
    validationRules: [
      {
        id: 'has-dollar-filter',
        description: "Uses $filter with eq operator and single quotes: $filter=department eq 'Cloud Engineering'",
        test: (code) => /\$filter=department\s+eq\s+['"]Cloud Engineering['"]/i.test(code),
      },
      {
        id: 'has-clean-select',
        description: 'Uses $select=name,salary without spaces',
        test: (code) => /\$select=name,salary/i.test(code),
      },
    ],
    explanation:
      'Unlike regular REST APIs, OData v4 query options are governed by OASIS standards. $filter requires standard comparison operators (eq, ne, gt, ge, lt, le) and strict single-quote string wrapping.',
  },
  {
    id: 'debug-destination-connectivity',
    title: 'Troubleshooting Destination Service Failures',
    category: 'debugging',
    difficulty: 'advanced',
    estimatedMinutes: 8,
    summary: 'Diagnose why an outbound S/4HANA connectivity call returns HTTP 502 Bad Gateway.',
    instructions: [
      'An enterprise developer configured a destination to an on-premise S/4HANA system.',
      'Review the destination JSON snippet.',
      'Identify the 2 critical misconfigurations: ProxyType and URL protocol mismatch.',
      'For on-premise systems accessed via Cloud Connector, ProxyType must be "OnPremise" (not "Internet").',
      'The virtual host name defined in Cloud Connector should NOT use public IP addresses or localhost.',
      'Correct the destination configuration.',
    ],
    concepts: ['SAP Destination Service', 'Cloud Connector', 'ProxyType: OnPremise', 'HTTP 502'],
    starterCode: `{
  "Name": "S4HANA_BUSINESS_PARTNER",
  "Type": "HTTP",
  "URL": "http://192.168.1.50:44300",
  "Authentication": "BasicAuthentication",
  "ProxyType": "Internet",
  "User": "BTP_RFC_USER"
}`,
    solutionCode: `{
  "Name": "S4HANA_BUSINESS_PARTNER",
  "Type": "HTTP",
  "URL": "http://s4hana-virtual-host.corp:44300",
  "Authentication": "BasicAuthentication",
  "ProxyType": "OnPremise",
  "User": "BTP_RFC_USER"
}`,
    hints: [
      'On-premise connections routed through SAP Cloud Connector MUST use "ProxyType": "OnPremise".',
      'The URL must use the virtual host mapped in the Cloud Connector access control table, not a raw internal private IP.',
    ],
    validationRules: [
      {
        id: 'proxy-onpremise',
        description: 'Sets "ProxyType": "OnPremise"',
        test: (code) => /"ProxyType"\s*:\s*"OnPremise"/i.test(code),
      },
      {
        id: 'virtual-url',
        description: 'Uses a virtual hostname rather than private IP 192.168.*',
        test: (code) => !/192\.168\./.test(code) && /"URL"\s*:\s*"http:\/\/[a-zA-Z0-9_.-]+:\d+"/i.test(code),
      },
    ],
    explanation:
      'Setting ProxyType: Internet causes SAP BTP to route the HTTP request over the public internet, where on-premise private addresses (192.168.x.x, 10.x.x.x) are unroutable, causing an immediate 502/504 Bad Gateway.',
  },
];
