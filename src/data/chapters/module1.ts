import { Chapter } from '../../types/curriculum';

export const MODULE_1_CHAPTERS: Chapter[] = [
  {
    id: 'ch-1-1',
    moduleId: 'module-1',
    order: 1,
    number: '1.1',
    title: 'CAP Architecture & Core Data Services (CDS)',
    subtitle: 'Building domain-driven models that compile to tables and APIs simultaneously',
    estimatedMinutes: 9,
    summary:
      'Explore the SAP Cloud Application Programming Model (CAP). Learn how Core Data Services (CDS) acts as a universal declarative modeling language that creates database schemas and OData services.',
    learningObjectives: [
      'Understand why SAP created CAP and how it contrasts with low-level raw frameworks.',
      'Master CDS syntax: entities, elements, keys, and data types.',
      'Differentiate between Associations (loose references) and Compositions (parent-child documents).',
    ],
    analogy: {
      concept: 'CDS Modeling vs Manual Coding',
      analogy: 'Architectural Blueprints vs Hand-Laying Every Brick',
      explanation:
        'If an architect draws a 3D CAD blueprint, the software can automatically calculate the foundation strength, generate 2D floor plans, order the exact number of steel beams, and print electrical diagrams. Without blueprints, builders must guess where pipes go. CDS is the CAD blueprint: you describe your business entities once, and CAP automatically generates the SQL tables, REST endpoints, and security masks.',
      transition:
        'Instead of writing SQL DDL, Express.js routes, Swagger docs, and validation logic separately in 4 different files, CDS expresses everything in one clean, declarative file.',
    },
    conceptExplanation: {
      whatItIs:
        'The SAP Cloud Application Programming Model (CAP) is an opinionated framework of languages, libraries, and tools for building enterprise-grade backend services. Core Data Services (CDS) is the universal modeling language at the heart of CAP.',
      whyItExists:
        'Enterprise developers spent 70% of their time writing repetitive boilerplate (CRUD SQL queries, pagination, JSON serialization, auth filters). CAP automates this boilerplate so teams focus 100% on domain business logic.',
      problemSolved:
        'Eliminates code duplication and schema drift between database definitions, backend APIs, and frontend UI expectations.',
      howItWorks:
        'A standard CAP project is organized into three clean folders: 1) `db/` holds domain data models in `schema.cds`; 2) `srv/` holds exposed service projections in `service.cds` and business logic in `service.js`; 3) `app/` holds Fiori and HTML5 UI components and annotations. The CAP compiler (`@sap/cds-dk`) automatically generates relational tables in SQLite/HANA and exposes REST/OData v4 endpoints.',
      btpFit:
        'CAP is SAP’s premier recommended programming model for building side-by-side cloud extensions and microservices on SAP BTP.',
    },
    diagramType: 'cap-architecture',
    jargonTerms: [
      {
        term: 'CAP',
        simpleMeaning: 'SAP Cloud Application Programming Model — a full-stack framework for Node.js and Java.',
        familiarEquivalent: 'NestJS or Express.js combined with Prisma ORM and auto-generated APIs.',
      },
      {
        term: 'CDS',
        simpleMeaning: 'Core Data Services — declarative language for defining entities and service APIs.',
        familiarEquivalent: 'A Prisma schema file (`schema.prisma`) or TypeScript interface declarations.',
      },
      {
        term: 'Composition',
        simpleMeaning: 'A strict parent-child relationship where the child cannot exist without the parent (e.g. Order Items).',
        familiarEquivalent: 'Cascading delete in SQL: if the Order is deleted, all line items are deleted automatically.',
      },
      {
        term: 'Association',
        simpleMeaning: 'A loose foreign key link to an independent entity (e.g. Order linked to a Customer).',
        familiarEquivalent: 'A standard SQL foreign key: deleting the order does not delete the customer.',
      },
    ],
    technicalExample: {
      title: 'Employee Leave Request Domain Model in CDS (`db/schema.cds`)',
      language: 'cds',
      code: `namespace sap.launchpad.leave;

using { cuid, managed } from '@sap/cds/common';

entity Employees : managed {
  key email       : String(100);
  name            : String(100);
  department      : String(50);
  leaveBalance    : Integer default 20;
  // Association: Loose reference to employee's manager
  manager         : Association to Employees;
  // Composition: Strict parent-child document relationship
  leaveRequests   : Composition of many LeaveRequests on leaveRequests.employee = $self;
}

entity LeaveRequests : cuid, managed {
  startDate       : Date;
  endDate         : Date;
  daysCount       : Integer;
  reason          : String(255);
  status          : String(20) default 'PENDING';
  employee        : Association to Employees;
}`,
      purpose:
        'Demonstrates an enterprise employee leave management data model using CDS aspects (`cuid`, `managed`), associations, and compositions.',
      lineExplanations: [
        { lines: '3', explanation: 'Imports standard reusable aspects: `cuid` (auto UUID) and `managed` (auto createdAt/modifiedBy).' },
        { lines: '11', explanation: 'Association: An employee references a manager who is also an Employee.' },
        { lines: '13', explanation: 'Composition: If an Employee is purged, their leave requests are cleaned up as a composite unit.' },
      ],
      expectedOutput:
        'Compiles to two relational tables (`SAP_LAUNCHPAD_LEAVE_EMPLOYEES` and `LEAVEREQUESTS`) with foreign keys and automatic audit timestamps.',
      commonMistakes: [
        'Using Composition when an entity should exist independently (e.g., composing Customers inside Orders).',
        'Forgetting to import standard aspects like `cuid` and `managed`, requiring manual timestamp column management.',
      ],
    },
    businessScenario: {
      title: 'HR Employee Leave Management System',
      context:
        'An enterprise with 20,000 employees needs a mobile portal to request vacation days and track manager approvals.',
      workflowSteps: [
        'Developer declares the `Employees` and `LeaveRequests` entities in `db/schema.cds`.',
        'CAP compiler generates relational schema in SAP HANA Cloud in 1 second.',
        'CAP automatically enforces foreign key constraints and prevents orphan leave records.',
      ],
      businessImpact:
        'Backend schema and OData API ready in 15 minutes instead of 3 days of boilerplate SQL and Express route writing.',
    },
    quizQuestions: [
      {
        id: 'q-1-1-1',
        question: 'What is the key difference between an "Association" and a "Composition" in SAP CDS?',
        options: [
          {
            id: 'opt-a',
            text: 'Associations are written in JavaScript, while Compositions are written in Python.',
            isCorrect: false,
            explanation: 'Both are native declarations in CDS syntax.',
          },
          {
            id: 'opt-b',
            text: 'A Composition represents a strict parent-child relationship (child cannot exist without parent); an Association is a loose reference.',
            isCorrect: true,
            explanation: 'Correct! In a Composition (like Order -> Items), children are part of the parent document and deleted with it.',
          },
          {
            id: 'opt-c',
            text: 'Compositions can only store image files.',
            isCorrect: false,
            explanation: 'Compositions manage relational document structures, not just media files.',
          },
          {
            id: 'opt-d',
            text: 'Associations are only allowed on weekends.',
            isCorrect: false,
            explanation: 'Associations are foundational relational model concepts.',
          },
        ],
      },
      {
        id: 'q-1-1-2',
        question: 'What does the standard CDS aspect `managed` automatically provide to your entity?',
        options: [
          {
            id: 'opt-a',
            text: 'A free subscription to streaming services.',
            isCorrect: false,
            explanation: 'The aspect manages database audit metadata.',
          },
          {
            id: 'opt-b',
            text: 'Audit timestamp fields: `createdAt`, `createdBy`, `modifiedAt`, and `modifiedBy`.',
            isCorrect: true,
            explanation: 'Correct! Using `managed` frees developers from manually tracking row creation and update timestamps.',
          },
          {
            id: 'opt-c',
            text: 'It automatically pays your cloud hosting bill.',
            isCorrect: false,
            explanation: 'Aspects provide schema columns, not financial billing.',
          },
          {
            id: 'opt-d',
            text: 'It locks the database so no updates can be made.',
            isCorrect: false,
            explanation: 'Managed entities are fully updatable.',
          },
        ],
      },
      {
        id: 'q-1-1-3',
        question: 'Why does CAP advocate separating the database model (`db/schema.cds`) from the service definition (`srv/service.cds`)?',
        options: [
          {
            id: 'opt-a',
            text: 'Because CDS files cannot exceed 10 lines of code.',
            isCorrect: false,
            explanation: 'CDS files have no arbitrary line limits.',
          },
          {
            id: 'opt-b',
            text: 'To avoid exposing the raw, internal database directly to the public; services expose tailored, secure projections.',
            isCorrect: true,
            explanation: 'Correct! A service should only expose specific entities and columns needed by a given client role.',
          },
          {
            id: 'opt-c',
            text: 'Because Node.js cannot read database files directly.',
            isCorrect: false,
            explanation: 'Node.js can read any file; the separation is a clean architectural principle.',
          },
          {
            id: 'opt-d',
            text: 'To make the project look more complicated.',
            isCorrect: false,
            explanation: 'It promotes the principle of least privilege and domain encapsulation.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'CAP minimizes boilerplate by auto-generating databases, APIs, and validations from CDS.',
      'Compositions represent deep parent-child documents; Associations are loose links.',
      'Separating `db/` and `srv/` protects your internal database from direct public exposure.',
    ],
    practicalActivity:
      'Write a CDS model for an e-commerce shopping cart with Customers, Carts, and CartItems using associations and compositions.',
  },
  {
    id: 'ch-1-2',
    moduleId: 'module-1',
    order: 2,
    number: '1.2',
    title: 'Exposing Services & OData v4 Fundamentals',
    subtitle: 'Why enterprise frontends demand standardized OData over simple REST',
    estimatedMinutes: 8,
    summary:
      'Learn how CAP exposes services in `srv/service.cds`, understand the difference between basic REST and OData v4, and master powerful query capabilities like `$select`, `$filter`, and `$expand`.',
    learningObjectives: [
      'Understand how to declare exposed service APIs using CDS projections.',
      'Compare standard REST with the OData v4 enterprise protocol.',
      'Construct queries using `$select`, `$filter`, `$expand`, and `$top`.',
    ],
    analogy: {
      concept: 'REST vs OData v4',
      analogy: 'Fixed Fast-Food Menu vs Custom Subway Sandwich Counter',
      explanation:
        'A rigid REST endpoint is like ordering "Combo #3": you get a burger, fries, and cola even if you only wanted a diet drink. If you want dessert, you must stand in a second line (another API call). OData v4 is a custom sandwich counter: you tell the server exactly which bread you want (`$select`), ask for extra pickles only on spicy sandwiches (`$filter`), and ask for a side salad packed in the same bag in one trip (`$expand`).',
      transition:
        'In enterprise apps with thousands of table records, OData eliminates over-fetching (wasted mobile bandwidth) and under-fetching (making 50 separate HTTP calls for related data).',
    },
    conceptExplanation: {
      whatItIs:
        'OData (Open Data Protocol) is an OASIS standard that defines a set of best practices for building and consuming RESTful APIs. It provides standardized URL query parameters and formal metadata (`$metadata`).',
      whyItExists:
        'In classic REST, every developer invents their own query conventions (e.g. `?search=`, `?q=`, `?filter=`, `?page=`). Enterprise frontends like SAP Fiori need a predictable standard so UI components can filter, sort, and paginate automatically.',
      problemSolved:
        'Solves the N+1 API query problem and enables metadata-driven frontends that build UI tables automatically from API schemas.',
      howItWorks:
        'When a client sends an OData query with `$filter=price gt 100`, CAP’s query engine parses the request and translates it into an optimized SQL query executed directly in the database.',
      btpFit:
        'Every CAP service natively exposes OData v4 by default, allowing SAP Fiori Elements frontends to connect with zero glue code.',
    },
    diagramType: 'odata-flow',
    jargonTerms: [
      {
        term: 'OData v4',
        simpleMeaning: 'A standardized enterprise dialect of REST with built-in filtering, sorting, and metadata.',
        familiarEquivalent: 'GraphQL query capabilities built directly on top of standard REST URLs.',
      },
      {
        term: '$expand',
        simpleMeaning: 'An OData parameter that joins and returns related entities in a single HTTP response.',
        familiarEquivalent: 'A SQL `JOIN` or Prisma `include: { items: true }` executed via URL query.',
      },
      {
        term: '$metadata',
        simpleMeaning: 'An XML endpoint describing every entity, property type, and relationship in the API.',
        familiarEquivalent: 'An automated OpenAPI / Swagger specification that frontend tools parse.',
      },
    ],
    technicalExample: {
      title: 'Declaring a CAP Service and Querying via OData v4',
      language: 'cds',
      code: `// srv/leave-service.cds
using { sap.launchpad.leave as my } from '../db/schema';

service LeaveService {
  // Expose Employees with restricted projection (hide internal notes)
  @readonly entity Employees as projection on my.Employees {
    email, name, department, leaveBalance
  };

  // Full CRUD access for Leave Requests
  entity LeaveRequests as projection on my.LeaveRequests;
}

/* EXAMPLE ODATA v4 QUERY URL:
   GET /odata/v4/leave/LeaveRequests
       ?$select=startDate,endDate,daysCount,status
       &$filter=status eq 'PENDING' and daysCount gt 3
       &$expand=employee($select=name,email)
       &$orderby=startDate asc
*/`,
      purpose:
        'Shows how to project domain entities into clean external APIs and query them with compound filters and relationship expansion in one HTTP request.',
      lineExplanations: [
        { lines: '5', explanation: '@readonly annotation prevents external clients from modifying employee records via this service.' },
        { lines: '6-8', explanation: 'Projection: Only exposes 4 safe public fields, hiding internal employee details.' },
        { lines: '14-19', explanation: 'Demonstrates a single HTTP GET that fetches filtered leave requests and nested employee names.' },
      ],
      expectedOutput:
        `{\n  "@odata.context": "$metadata#LeaveRequests(employee(name,email))",\n  "value": [\n    {\n      "startDate": "2026-12-01",\n      "endDate": "2026-12-05",\n      "daysCount": 4,\n      "status": "PENDING",\n      "employee": { "name": "Jane Doe", "email": "jane@corp.com" }\n    }\n  ]\n}`,
      commonMistakes: [
        'Writing manual SQL queries inside Express routes instead of letting CAP’s OData query engine handle filtering.',
        'Over-fetching complete entities with 80 columns when the frontend table only displays 3 columns.',
      ],
    },
    businessScenario: {
      title: 'Manager Approval Dashboard Query',
      context:
        'A department manager opens their mobile portal to review all pending vacation requests across their 15-person team.',
    workflowSteps: [
        'Fiori frontend requests `/odata/v4/leave/LeaveRequests?$filter=status eq \'PENDING\'&$expand=employee`.',
        'CAP executes a single SQL JOIN in HANA Cloud in 4 milliseconds.',
        'Manager views all pending requests with employee names and days requested in one screen without lag.',
      ],
      businessImpact:
        'Reduces network requests by 90% and eliminates mobile battery drain compared to unoptimized REST loops.',
    },
    quizQuestions: [
      {
        id: 'q-1-2-1',
        question: 'Which OData v4 query parameter allows you to include related child or associated entities in a single HTTP response?',
        options: [
          {
            id: 'opt-a',
            text: '$expand',
            isCorrect: true,
            explanation: 'Correct! `$expand` instructs the server to perform an inner join and return related entities in the same payload.',
          },
          {
            id: 'opt-b',
            text: '$select',
            isCorrect: false,
            explanation: '`$select` chooses which specific columns/properties of the current entity to return.',
          },
          {
            id: 'opt-c',
            text: '$delete',
            isCorrect: false,
            explanation: '`$delete` is not a standard OData query parameter (HTTP DELETE verb is used instead).',
          },
          {
            id: 'opt-d',
            text: '$orderby',
            isCorrect: false,
            explanation: '`$orderby` sorts the returned records ascending or descending.',
          },
        ],
      },
      {
        id: 'q-1-2-2',
        question: 'Why does an enterprise UI framework like SAP Fiori prefer OData over arbitrary custom REST APIs?',
        options: [
          {
            id: 'opt-a',
            text: 'Because OData runs on satellite radio instead of the internet.',
            isCorrect: false,
            explanation: 'OData is built on standard HTTP and HTTPS.',
          },
          {
            id: 'opt-b',
            text: 'OData standardizes filtering, pagination, sorting, and schema metadata so generic UI controls can work with any backend automatically.',
            isCorrect: true,
            explanation: 'Correct! Because every OData service adheres to the same standard, Fiori tables and search bars work out of the box.',
          },
          {
            id: 'opt-c',
            text: 'Because custom REST APIs cannot return JSON.',
            isCorrect: false,
            explanation: 'Custom REST APIs commonly return JSON, but lack standardized query and metadata conventions.',
          },
          {
            id: 'opt-d',
            text: 'OData eliminates the need for computer monitors.',
            isCorrect: false,
            explanation: 'OData is a data exchange protocol.',
          },
        ],
      },
      {
        id: 'q-1-2-3',
        question: 'What is the purpose of `@readonly` in a CAP service declaration?',
        options: [
          {
            id: 'opt-a',
            text: 'It marks the code so only developers who wear reading glasses can edit it.',
            isCorrect: false,
            explanation: '`@readonly` is a security annotation.',
          },
          {
            id: 'opt-b',
            text: 'It restricts the entity so clients can only execute HTTP GET requests, blocking POST, PUT, and DELETE operations.',
            isCorrect: true,
            explanation: 'Correct! Annotations like `@readonly` enforce access restrictions declaratively.',
          },
          {
            id: 'opt-c',
            text: 'It deletes the entity from the database after 24 hours.',
            isCorrect: false,
            explanation: 'It controls HTTP access permissions, not database lifecycle.',
          },
          {
            id: 'opt-d',
            text: 'It converts the database from SQL to plain text.',
            isCorrect: false,
            explanation: 'It has no effect on database storage engine.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'CAP services are defined as declarative projections in `srv/service.cds`.',
      'OData v4 standardizes enterprise querying with `$select`, `$filter`, and `$expand`.',
      'Standardized metadata allows frontends like Fiori to generate interactive UIs automatically.',
    ],
    practicalActivity:
      'Construct an OData URL that selects employee names and email addresses who belong to the "Engineering" department, ordered alphabetically.',
  },
  {
    id: 'ch-1-3',
    moduleId: 'module-1',
    order: 3,
    number: '1.3',
    title: 'Node.js Business Logic & HANA Cloud',
    subtitle: 'Enforcing enterprise validations and deploying to SAP’s in-memory engine',
    estimatedMinutes: 9,
    summary:
      'Learn how to write custom event handlers in Node.js using CAP’s event lifecycle (`before`, `on`, `after`), validate business rules, and connect to SAP HANA Cloud.',
    learningObjectives: [
      'Master the CAP event lifecycle: `srv.before`, `srv.on`, and `srv.after`.',
      'Implement business validation logic in Node.js (e.g. checking leave balance).',
      'Understand how SAP HANA Cloud stores data in-memory for microsecond responsiveness.',
    ],
    analogy: {
      concept: 'CAP Event Lifecycle',
      analogy: 'Airport Boarding Gate Checkpoints',
      explanation:
        '1. BEFORE: The gate agent checks your passport and ticket validity. If invalid, you are rejected immediately before boarding. 2. ON: You walk down the jet bridge and take your assigned seat on the plane (the actual core action). 3. AFTER: Once the plane lands, flight attendants hand out arrival customs cards and send flight mile points to your account.',
      transition:
        'In CAP, `before` validates user input before touching the database; `on` executes the database insert; and `after` enriches the response or triggers downstream emails.',
    },
    conceptExplanation: {
      whatItIs:
        'While CDS handles declarative data definitions, custom business logic is authored in standard JavaScript / TypeScript handlers matching the service name (e.g. `srv/service.js`).',
      whyItExists:
        'Enterprise apps require complex validations that cannot be expressed in pure SQL (e.g., verifying an employee has sufficient vacation balance before approving leave).',
      problemSolved:
        'Provides a clean, modular structure where business rules are separated from transport protocols and database dialects.',
      howItWorks:
        'CAP intercepts incoming HTTP requests, matches them against registered event handlers (`CREATE`, `READ`, `UPDATE`, `DELETE`), and executes handlers within transactional boundaries.',
      btpFit:
        'In development, CAP runs against lightweight local SQLite. In production on SAP BTP, the same CAP code connects to SAP HANA Cloud without rewriting a single line of JavaScript.',
    },
    diagramType: 'event-handlers',
    jargonTerms: [
      {
        term: 'Event Handler',
        simpleMeaning: 'A JavaScript function that runs when a specific action (like creating a record) occurs.',
        familiarEquivalent: 'An Express middleware or database trigger like `router.post()` or Mongoose pre-save hook.',
      },
      {
        term: 'HANA Cloud',
        simpleMeaning: 'SAP’s high-performance cloud database that stores and processes data in RAM.',
        familiarEquivalent: 'PostgreSQL or MySQL running entirely in memory like Redis, but with full ACID SQL.',
      },
      {
        term: 'cds.tx()',
        simpleMeaning: 'A transactional boundary ensuring all operations succeed together or roll back.',
        familiarEquivalent: 'A SQL `BEGIN TRANSACTION` and `COMMIT / ROLLBACK` block.',
      },
    ],
    technicalExample: {
      title: 'Leave Request Validation Handler in Node.js (`srv/leave-service.js`)',
      language: 'javascript',
      code: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const { Employees, LeaveRequests } = this.entities;

  // BEFORE handler: Validate input before inserting into HANA DB
  this.before('CREATE', 'LeaveRequests', async (req) => {
    const { employee_email, daysCount, startDate, endDate } = req.data;

    // 1. Basic validation
    if (daysCount <= 0) {
      return req.error(400, 'Leave duration must be at least 1 day.');
    }

    // 2. Query employee record from database using CAP CQL
    const employee = await SELECT.one.from(Employees).where({ email: employee_email });
    if (!employee) {
      return req.error(404, \`Employee \${employee_email} does not exist.\`);
    }

    // 3. Business rule: Verify sufficient leave balance
    if (employee.leaveBalance < daysCount) {
      return req.error(409, \`Insufficient balance: Requested \${daysCount} days, but only \${employee.leaveBalance} remaining.\`);
    }
  });

  // AFTER handler: Deduct balance after successful creation
  this.after('CREATE', 'LeaveRequests', async (data) => {
    await UPDATE(Employees)
      .set({ leaveBalance: { '-=': data.daysCount } })
      .where({ email: data.employee_email });
  });
});`,
      purpose:
        'Demonstrates an end-to-end business rule: checking employee vacation balance in `before` and decrementing the balance in `after`.',
      lineExplanations: [
        { lines: '7', explanation: 'Registers a `before` hook intercepting any HTTP POST to create a LeaveRequest.' },
        { lines: '11', explanation: 'Returns HTTP 400 error immediately if days count is non-positive.' },
        { lines: '21', explanation: 'Rejects request with HTTP 409 if employee lacks sufficient vacation quota.' },
        { lines: '26-29', explanation: 'Runs atomically inside the same transaction to decrement the employee’s remaining balance.' },
      ],
      expectedOutput:
        'If balance is sufficient: returns HTTP 201 Created and decrements balance. If balance is exceeded: rejects with HTTP 409 Conflict.',
      commonMistakes: [
        'Putting business validation in `after` hooks; by that time, the invalid data has already been saved to the database!',
        'Hardcoding database-specific SQL dialect instead of using CAP’s universal CQL (`SELECT`, `UPDATE`, `INSERT`).',
      ],
    },
    businessScenario: {
      title: 'Preventing Negative Leave Balance Violations',
      context:
        'An employee with 3 remaining vacation days attempts to book a 10-day beach holiday.',
      workflowSteps: [
        'Employee fills out 10-day leave form and clicks Submit.',
        'CAP `before` handler inspects the employee’s live record in HANA Cloud.',
        'Handler detects 3 < 10, rejects the transaction, and returns a clean, user-friendly error message.',
        'Database remains uncorrupted with zero negative balance entries.',
      ],
      businessImpact:
        'Automated enterprise rule enforcement prevents payroll discrepancies and unearned vacation payouts.',
    },
    quizQuestions: [
      {
        id: 'q-1-3-1',
        question: 'When should input validation logic (such as checking if stock is available) be executed in a CAP service?',
        options: [
          {
            id: 'opt-a',
            text: 'In a `before` event handler, before the database insert occurs.',
            isCorrect: true,
            explanation: 'Correct! `before` handlers are designed specifically for sanitization and validation before committing to storage.',
          },
          {
            id: 'opt-b',
            text: 'In an `after` handler, once the record has already been committed to the database.',
            isCorrect: false,
            explanation: 'Validating in `after` is too late because invalid data is already written.',
          },
          {
            id: 'opt-c',
            text: 'Never; enterprise applications never validate user input.',
            isCorrect: false,
            explanation: 'Validation is critical to enterprise security and business integrity.',
          },
          {
            id: 'opt-d',
            text: 'In the computer monitor’s firmware.',
            isCorrect: false,
            explanation: 'Hardware firmware does not handle application business rules.',
          },
        ],
      },
      {
        id: 'q-1-3-2',
        question: 'What is a primary architectural feature of SAP HANA Cloud?',
        options: [
          {
            id: 'opt-a',
            text: 'It stores all data on magnetic cassette tapes.',
            isCorrect: false,
            explanation: 'HANA is modern high-speed in-memory cloud technology, not legacy tape storage.',
          },
          {
            id: 'opt-b',
            text: 'It is an in-memory, column-oriented database that processes transactions and analytics simultaneously at microsecond speed.',
            isCorrect: true,
            explanation: 'Correct! By storing data in RAM in columnar format, HANA delivers instantaneous query performance.',
          },
          {
            id: 'opt-c',
            text: 'It can only store 5 rows of data.',
            isCorrect: false,
            explanation: 'HANA Cloud scales to petabytes of enterprise data.',
          },
          {
            id: 'opt-d',
            text: 'It cannot be used with JavaScript or Node.js.',
            isCorrect: false,
            explanation: 'Node.js and CAP seamlessly connect to HANA Cloud using standard client drivers.',
          },
        ],
      },
      {
        id: 'q-1-3-3',
        question: 'How does CAP enable developers to develop locally without an expensive SAP HANA cloud license?',
        options: [
          {
            id: 'opt-a',
            text: 'By requiring developers to memorize database tables on paper.',
            isCorrect: false,
            explanation: 'CAP provides automated tooling.',
          },
          {
            id: 'opt-b',
            text: 'By running the exact same CDS code against a local SQLite database during development, and deploying to HANA Cloud in production without code changes.',
            isCorrect: true,
            explanation: 'Correct! CAP abstracts database dialects, allowing instant local testing on SQLite.',
          },
          {
            id: 'opt-c',
            text: 'By disabling all databases and saving data into browser history.',
            isCorrect: false,
            explanation: 'CAP uses real relational databases locally (SQLite).',
          },
          {
            id: 'opt-d',
            text: 'Local development is strictly forbidden in SAP software.',
            isCorrect: false,
            explanation: 'CAP is specifically designed for local developer happiness and speed.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'Use `srv.before` for validations, `srv.on` for core actions, and `srv.after` for notifications.',
      'CAP CQL (`SELECT`, `INSERT`, `UPDATE`) runs identically on local SQLite and SAP HANA Cloud.',
      'SAP HANA Cloud processes enterprise transactions in RAM with column-store acceleration.',
    ],
    practicalActivity:
      'Write a Node.js `before` handler that checks if a requested leave duration is greater than 14 days and requires a senior manager’s email.',
  },
];
