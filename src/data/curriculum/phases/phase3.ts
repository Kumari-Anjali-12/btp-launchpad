import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_3: SyllabusPhase = {
  id: 'phase-3',
  number: 3,
  title: 'CAP Development',
  tagline: 'Phase 3 · Weeks 7-10 · ~40 Hours',
  description:
    'Master backend cloud development using the SAP Cloud Application Programming (CAP) Model. Model enterprise domain entities in Core Data Services (CDS), implement custom business logic and event handlers in Node.js, manage parent-child compositions, and deploy to SAP HANA Cloud.',
  coreObjective:
    'Build production-grade full-stack backend services adhering to the SAP Golden Path. Design normalized schemas using CDS aspects (cuid, managed), expose secured OData v4 projections, implement before/on/after event handlers with transactional rollback, and manage HANA Deployment Infrastructure (HDI) containers.',
  estimatedHours: 40,
  suggestedWeeks: 'Weeks 7-10',
  badgeCategory: 'core',
  capstone: PHASE_CAPSTONES[3]!,
  modules: [
    {
      id: 'mod-3-1',
      code: '3.1',
      phaseId: 'phase-3',
      title: 'CAP Fundamentals',
      tagline: 'The Golden Path, Core Data Services (CDS), and Domain Entity Modeling',
      summary:
        'Discover the SAP Cloud Application Programming (CAP) Model: an opinionated, open-source-friendly framework. Master Core Data Services (CDS) domain modeling, primitive types, reusable aspects (cuid, managed), and the standardized 3-tier architecture.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'The CAP philosophy: An opinionated, golden-path framework that lets developers focus purely on business logic rather than plumbing.',
        'Standard 3-tier project anatomy: db/ (domain data models and schema), srv/ (service projections and handlers), app/ (Fiori UIs).',
        'Core Data Services (CDS): Declarative modeling language for data schemas, service APIs, and user interfaces.',
        'Entity definition syntax: Keys, primitive types (String, Integer, Decimal, Boolean, DateTime, UUID), and custom type aliases.',
        'Reusable built-in aspects: cuid (automatic UUID primary key) and managed (createdAt, createdBy, modifiedAt, modifiedBy audit fields).',
        'Contexts and Namespaces: Preventing naming collisions across modular enterprise enterprise domain models.',
      ],
      practicalImplementation:
        'Author an enterprise `db/schema.cds` file defining Products, Categories, and Orders. Utilize the `cuid` and `managed` aspects, compile to SQL DDL using `cds compile db/schema.cds --to sql`, and inspect generated database schemas.',
      masteryCheck:
        'Design a complete CDS data model for an employee expense portal with proper aspects and data types. Explain why CAP separates domain schemas (db/) from exposed services (srv/).',
      learningObjectives: [
        'Explain the core architecture and value proposition of the SAP CAP framework.',
        'Structure a project into db/, srv/, and app/ directories according to the Golden Path.',
        'Declare normalized database entities in Core Data Services (CDS).',
        'Use built-in aspects (cuid, managed) to automate audit logging and UUID key generation.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The CAP Philosophy: Focus on Business Logic',
          subtitle: 'Why CAP eliminates 80% of boilerplate cloud code',
          explanation:
            'When building enterprise cloud services with generic frameworks like Express or Spring Boot, developers spend 80% of their time writing repetitive plumbing: writing SQL create-table scripts, formatting OData v4 JSON structures, parsing query parameters (`$filter`, `$select`), handling database connection pools, and implementing audit logging. The SAP Cloud Application Programming (CAP) Model is an opinionated framework: you declare your business domain model in Core Data Services (CDS), and CAP handles all the database tables, OData endpoints, CRUD queries, and transactions automatically out-of-the-box. Developers only write custom code where unique business logic is required.',
          keyIdea:
            'CAP provides automated enterprise plumbing (CRUD, OData, persistence) so developers write only business domain logic.',
          taskInstruction: 'Review the CAP 3-tier architectural diagram below.',
          hint: 'CAP is available in both Node.js (JavaScript/TypeScript) and Java.',
        },
        {
          stepNumber: 2,
          title: 'The 3-Tier Project Anatomy: db/, srv/, and app/',
          subtitle: 'The universal folder structure of all CAP applications',
          explanation:
            'Every standard CAP application is partitioned into three strict directories: 1) `db/`: The Data Layer. Contains domain entity models, database configurations, and initial CSV seed data (`db/schema.cds`, `db/data/`). 2) `srv/`: The Service Layer. Contains exposed OData/REST service definitions and custom event handlers in Node.js (`srv/service.cds`, `srv/service.js`). 3) `app/`: The Presentation Layer. Contains SAP Fiori Elements apps, UI5 views, or custom React/web components.',
          keyIdea:
            'Clean separation of concerns: db/ models the persistence reality; srv/ models the consumer service view; app/ delivers the user interface.',
          taskInstruction: 'Inspect the generated folder layout in the code example below.',
          hint: 'Never expose raw database entities directly to clients; always create service projections in srv/.',
        },
        {
          stepNumber: 3,
          title: 'Modeling Domain Entities in CDS',
          subtitle: 'Declarative data modeling for enterprise databases',
          explanation:
            'In CAP, database tables are defined declaratively in `db/schema.cds`. An entity consists of a name, one or more primary `key` definitions, and typed properties. CAP supports rich data types: `String(100)`, `Integer`, `Decimal(15,2)` for financial currency amounts, `Boolean`, `Date`, `Timestamp`, and `UUID`. For example: `entity Products { key ID : UUID; title : String(100); price : Decimal(9,2); stock : Integer; }`. When compiled, CAP translates this declarative definition into optimized DDL for SQLite or SAP HANA Cloud automatically.',
          keyIdea:
            'You write CDS once; CAP translates it into optimized SQL tables for any target database engine.',
          taskInstruction: 'Examine the CDS schema definition in the technical example below.',
          warning: 'Always use Decimal for money and currency; never use floating-point numbers due to rounding inaccuracies.',
        },
        {
          stepNumber: 4,
          title: 'Automating Auditing: cuid and managed Aspects',
          subtitle: 'Reusable enterprise traits from @sap/cds/common',
          explanation:
            'Enterprise compliance requires two things for almost every table: 1) A globally unique identifier (UUID) as the primary key. 2) A strict audit trail tracking who created or changed the record and when. Writing these fields manually on 50 tables is error-prone. CAP provides `@sap/cds/common` with reusable "Aspects": 1) `cuid`: Automatically injects `key ID : UUID;` into your entity. 2) `managed`: Automatically injects four timestamp and user audit fields: `createdAt : Timestamp`, `createdBy : User`, `modifiedAt : Timestamp`, and `modifiedBy : User`. CAP populates these audit fields automatically at runtime.',
          keyIdea:
            'Using `entity Orders : cuid, managed { ... }` gives your entity an automatic UUID primary key and a 100% compliant audit log in 2 words.',
          taskInstruction: 'Observe how aspects are imported from `@sap/cds/common` in the code snippet.',
          hint: 'Aspects are mixed into entities using the colon `:` syntax.',
        },
        {
          stepNumber: 5,
          title: 'Namespaces and Contexts: Preventing Collisions',
          subtitle: 'Organizing enterprise models across large teams',
          explanation:
            'In large corporations with dozens of development teams, naming collisions occur: Team A builds an `Orders` entity for sales, while Team B builds an `Orders` entity for factory manufacturing. CAP prevents collisions using `namespace`: declaring `namespace sap.cap.logistics;` at the top of a file prefixes all generated database tables (e.g., `SAP_CAP_LOGISTICS_ORDERS`). Alternatively, developers can group entities using `context`: `context Sales { entity Orders { ... } }`.',
          keyIdea:
            'Namespaces ensure your database tables remain unique when merged with other corporate packages and ERP systems.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Always define a reverse-domain namespace (e.g., `com.company.project`) for production schemas.',
        },
      ],
      diagramType: 'cap-architecture',
      analogy: {
        concept: 'CAP Framework and Core Data Services (CDS)',
        analogy: 'The City Zoning Code and Prefabricated Modular Architecture',
        explanation:
          'Building a traditional enterprise backend with custom SQL and Express is like building a house by cutting down trees in the forest, hand-carving every brick, and digging raw trenches for plumbing: it takes a year, and every house has leaking pipes in different places. The SAP Cloud Application Programming Model is modern prefabricated modular construction: the City Architectural Board publishes a strict building code (CDS schema). You simply select pre-certified modular wall units, pre-wired electrical panels, and standardized plumbing fixtures (built-in aspects like `cuid` and `managed`). The assembly crane drops them into place in 3 hours, and every connection is pre-tested and guaranteed to meet code.',
        transition:
          'Where modular construction guarantees code compliance, CAP guarantees enterprise-grade security, OData compliance, and database integrity with minimal custom code.',
      },
      conceptExplanation: {
        whatItIs:
          'The SAP Cloud Application Programming (CAP) Model is a framework of languages, libraries, and design guidelines for building enterprise-grade cloud services and applications on SAP BTP.',
        whyItExists:
          'Developing enterprise cloud services requires complex non-functional requirements (OData standards, multi-tenancy, authentication, localized audit logging, pagination, and relational mapping). Building these from scratch takes months and introduces security vulnerabilities.',
        problemSolved:
          'Eliminates boilerplate infrastructure code, provides database-agnostic domain modeling via Core Data Services (CDS), auto-generates OData v4 and REST endpoints, and provides seamless integration with SAP HANA and SAP Fiori.',
        howItWorks:
          'Developers define domain data models in `db/schema.cds` and service projections in `srv/service.cds`. The CAP runtime compiles these models, serves live OData v4 endpoints, automatically handles database queries and transactions, and executes custom Node.js event handlers for custom business logic.',
        btpFit:
          'CAP is SAP\'s official recommended golden path for building transactional backend applications and extensions on SAP BTP.',
      },
      jargonTerms: [
        {
          term: 'Core Data Services (CDS)',
          simpleMeaning: 'SAP\'s universal domain-specific language for defining data models, service interfaces, and UI annotations.',
          familiarEquivalent: 'A universal blueprint language for databases and web APIs combined.',
        },
        {
          term: 'Aspect',
          simpleMeaning: 'A reusable group of fields (like ID or audit timestamps) that can be mixed into any entity definition.',
          familiarEquivalent: 'A rubber stamp that imprints standard legal disclaimers onto multiple contracts.',
        },
        {
          term: 'Golden Path',
          simpleMeaning: 'SAP\'s official recommended, supported, and optimized architectural blueprint for building software.',
          familiarEquivalent: 'The paved highway through a national park: smooth, well-lit, and guaranteed to reach the destination.',
        },
        {
          term: 'cuid / managed',
          simpleMeaning: 'Built-in CAP aspects that provide UUID primary keys and automated audit timestamps.',
          familiarEquivalent: 'A notary public\'s official seal and timestamp on a document.',
        },
      ],
      technicalExample: {
        title: 'Production Core Data Services (CDS) Domain Schema with Aspects',
        language: 'sql',
        code: `// db/schema.cds - Enterprise Procurement Domain Model
namespace sap.btp.procurement;

using { cuid, managed } from '@sap/cds/common';

// Reusable Custom Type Definition
type CurrencyCode : String(3);
type OrderStatus : String(20) enum {
  Draft;
  PendingApproval;
  Approved;
  Rejected;
  Cancelled;
}

// Purchase Orders Entity utilizing built-in enterprise aspects
entity PurchaseOrders : cuid, managed {
  orderNumber     : String(10) @mandatory;
  description     : localized String(255);
  status          : OrderStatus default 'Draft';
  totalNetAmount  : Decimal(15,2);
  currency        : CurrencyCode default 'EUR';
  to_Items        : Composition of many PurchaseOrderItems on to_Items.parent = $self;
}

// Child Line Items with cascade lifecycle
entity PurchaseOrderItems : cuid {
  parent          : Association to PurchaseOrders;
  itemNumber      : Integer;
  materialCode    : String(40);
  quantity        : Decimal(13,3);
  unitPrice       : Decimal(15,2);
}`,
        purpose:
          'Demonstrates professional CDS modeling: namespace isolation, importing cuid and managed from @sap/cds/common, custom type aliases with enums, and a parent-child composition.',
        lineExplanations: [
          { lines: '2', explanation: 'namespace: Scopes database tables with SAP_BTP_PROCUREMENT prefix to avoid naming collisions.' },
          { lines: '4', explanation: 'using { cuid, managed }: Imports reusable UUID key and audit timestamp aspects from standard library.' },
          { lines: '8-14', explanation: 'type OrderStatus: Enforces strict enumerated state transitions (Draft, PendingApproval, etc.).' },
          { lines: '17', explanation: 'entity PurchaseOrders : cuid, managed: Automatically gains key ID : UUID and createdAt/createdBy audit fields.' },
          { lines: '23', explanation: 'Composition of many: Enforces that items are owned by the order and deleted automatically if the order is deleted.' },
        ],
        expectedOutput:
          'Compiles to clean SQL DDL generating normalized tables with foreign keys and index constraints in SQLite or HANA.',
        commonMistakes: [
          'Forgetting to import cuid and managed from "@sap/cds/common".',
          'Using Association instead of Composition for line items, leading to orphaned database records when an order is deleted.',
        ],
      },
      businessScenario: {
        title: 'Corporate Expense Management Data Layer Architecture',
        context:
          'A multi-national bank requires a zero-defect expense approval application compliant with corporate auditing and data residency laws.',
        workflowSteps: [
          'Developer creates `db/schema.cds` declaring `ExpenseReports` entity utilizing `cuid` and `managed`.',
          'Declares nested child entity `ExpenseItems` using `Composition of many`.',
          'CAP runtime auto-generates tables and automatically records the logged-in employee email into `createdBy` upon submission.',
          'When an expense report is approved or rejected, `modifiedBy` and `modifiedAt` update automatically with sub-millisecond precision.',
        ],
        businessImpact:
          'Eliminates 1,200 lines of manual SQL and audit-logging code, delivering 100% regulatory compliance for financial audit trails.',
      },
      practicalActivity:
        'Launch Practice Drill "Define Your First CDS Entity" (/practice?tab=drills&id=cds-basic-entity) and "Using Built-in Aspects" (/practice?tab=drills&id=cds-built-in-aspects).',
      keyTakeaways: [
        'CAP is an opinionated framework that eliminates enterprise boilerplate code.',
        'db/ holds the data schema; srv/ holds the exposed service APIs; app/ holds the user interface.',
        'Use the cuid aspect for automated UUID keys and managed for automatic audit logging.',
      ],
      quizQuestions: [
        {
          id: 'mod-3-1-q1',
          question:
            'What automatic functionality is added to a CDS entity when it inherits from the built-in "managed" aspect from "@sap/cds/common"?',
          options: [
            {
              id: 'a',
              text: 'It automatically adds four audit fields: createdAt, createdBy, modifiedAt, and modifiedBy, which are populated automatically by the CAP runtime whenever records are created or updated.',
              isCorrect: true,
              explanation:
                'Correct. The managed aspect standardizes compliance audit logging across all enterprise entities with zero manual coding.',
            },
            {
              id: 'b',
              text: 'It automatically uploads your database to the public internet.',
              isCorrect: false,
              explanation:
                'Incorrect. Aspects have zero to do with public internet uploading.',
            },
            {
              id: 'c',
              text: 'It converts your database into a Microsoft Excel spreadsheet.',
              isCorrect: false,
              explanation:
                'Incorrect. Aspects are database columns, not spreadsheet files.',
            },
            {
              id: 'd',
              text: 'It deletes all records older than 30 days automatically.',
              isCorrect: false,
              explanation:
                'Incorrect. Managed provides audit timestamps; it does not delete records.',
            },
          ],
        },
        {
          id: 'mod-3-1-q2',
          question:
            'Why does the standard SAP CAP Golden Path recommend keeping raw domain entities in "db/schema.cds" separate from service definitions in "srv/service.cds"?',
          options: [
            {
              id: 'a',
              text: 'Because database models represent the complete internal persistence reality, while service definitions expose tailored, secure projections containing only the specific entities and fields needed by a particular client application.',
              isCorrect: true,
              explanation:
                'Correct. Separation of concerns prevents exposing sensitive internal database columns directly to frontend clients.',
            },
            {
              id: 'b',
              text: 'Because CDS compilers cannot read files that contain more than 10 lines of code.',
              isCorrect: false,
              explanation:
                'Incorrect. CDS files can contain thousands of lines of code.',
            },
            {
              id: 'c',
              text: 'Because the srv/ folder can only be written in Python.',
              isCorrect: false,
              explanation:
                'Incorrect. Service definitions in srv/ are written in CDS and Node.js or Java.',
            },
            {
              id: 'd',
              text: 'Because files in db/ are permanently deleted every time the server restarts.',
              isCorrect: false,
              explanation:
                'Incorrect. Files in db/ are permanent source code artifacts.',
            },
          ],
        },
        {
          id: 'mod-3-1-q3',
          question:
            'Which CDS primitive type should always be used to store financial transaction amounts and currency totals to avoid floating-point rounding errors?',
          options: [
            {
              id: 'a',
              text: 'Decimal (e.g., Decimal(15,2))',
              isCorrect: true,
              explanation:
                'Correct. Decimal uses exact fixed-point numerical representation, eliminating floating-point rounding discrepancies.',
            },
            {
              id: 'b',
              text: 'Double',
              isCorrect: false,
              explanation:
                'Incorrect. Double is a binary floating-point representation that can introduce rounding errors in accounting calculations.',
            },
            {
              id: 'c',
              text: 'String',
              isCorrect: false,
              explanation:
                'Incorrect. String stores characters, preventing mathematical SQL sum and aggregation operations.',
            },
            {
              id: 'd',
              text: 'Boolean',
              isCorrect: false,
              explanation:
                'Incorrect. Boolean only stores true or false.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-3-2',
      code: '3.2',
      phaseId: 'phase-3',
      title: 'Service Implementation',
      tagline: 'Service Projections, Node.js Event Handlers, and Business Logic',
      summary:
        'Master the business logic engine of SAP CAP. Learn how to define service projections in CDS, register custom before/on/after event handlers in Node.js, validate input, throw clean HTTP errors, and execute atomic transactions.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Exposing services in srv/service.cds: Projections (`as projection on`), `@readonly`, `@insertonly`, and calculated virtual fields.',
        'Custom event handler architecture: How CAP dispatches events through `before`, `on`, and `after` execution phases.',
        'The three handler phases: 1) `srv.before`: Validation and sanitization, 2) `srv.on`: Core execution or custom persistence replacement, 3) `srv.after`: Side effects and post-processing.',
        'The request context (`req`): `req.data`, `req.user`, `req.reject()`, `req.error()`, `req.notify()`, and tenant context.',
        'Event types: Standard CRUD events (READ, CREATE, UPDATE, DELETE) and custom bound/unbound Actions and Functions.',
        'Error handling: Enforcing business rules, preventing invalid state transitions, and returning localized error messages with correct HTTP status codes.',
      ],
      practicalImplementation:
        'Implement an asynchronous Node.js event handler in `srv/service.js` that intercepts order creation: validate available inventory, reject orders exceeding credit limits with `req.reject(400)`, and send an email confirmation in `after` creation.',
      masteryCheck:
        'Explain the exact execution order of before, on, and after handlers during a CREATE operation. Implement an action that transitions an order from "Pending" to "Approved" with user permission verification.',
      learningObjectives: [
        'Expose secure, tailored OData v4 projections in srv/service.cds.',
        'Implement custom business logic using Node.js event handlers.',
        'Differentiate between before (validation), on (execution), and after (enrichment) handlers.',
        'Use req.reject() to abort invalid operations cleanly with professional HTTP error codes.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Exposing Service Projections in CDS',
          subtitle: 'Tailoring the API for specific frontend applications',
          explanation:
            'In CAP, clients never access database tables directly; they access Services defined in `srv/service.cds`. A service exposes entities using projections: `service CatalogService { entity Books as projection on my.bookshop.Books; }`. Projections allow: 1) Renaming fields for consumer convenience, 2) Hiding confidential internal fields (e.g., hiding `profitMargin` from public catalog users), 3) Adding declarative annotations like `@readonly` or `@insertonly`, and 4) Adding virtual calculated fields computed at runtime.',
          keyIdea:
            'Projections act as security and architectural view filters between your database and the external web API.',
          taskInstruction: 'Review the service definition in srv/cat-service.cds in the code example.',
          hint: 'You can create multiple distinct services (e.g., AdminService vs CustomerService) projecting off the exact same underlying database schema.',
        },
        {
          stepNumber: 2,
          title: 'The CAP Event-Driven Handler Pipeline',
          subtitle: 'How CAP processes every incoming HTTP request',
          explanation:
            'Every operation in CAP—whether an OData GET, a POST, or a custom action—is treated as an Event. When a request arrives, CAP passes it through an automated 3-phase handler pipeline: 1) `srv.before`: Executes validation and security checks before data touches the database. 2) `srv.on`: Executes the primary operation. By default, CAP provides built-in handlers that run optimized SQL against SQLite or HANA. You only implement `on` if you need to replace default persistence (e.g., calling an external ERP API instead of a local table). 3) `srv.after`: Executes after data has been committed to the database, ideal for sending emails, triggering event mesh notifications, or formatting UI response values.',
          keyIdea:
            'Use "before" for input validation; use default "on" for automated database saving; use "after" for side effects like notifications.',
          taskInstruction: 'Trace the event handler pipeline in the interactive event-handlers diagram below.',
          hint: 'If a "before" handler rejects the request, the database transaction aborts immediately and "after" never runs.',
        },
        {
          stepNumber: 3,
          title: 'The Request Object: req.data, req.user, and req.reject',
          subtitle: 'The developer\'s interface to the active transaction',
          explanation:
            'Every CAP handler function receives a Request object (`req`) containing the complete transaction context: 1) `req.data`: The validated payload body or query parameters submitted by the client. 2) `req.user`: The authenticated user identity, containing `req.user.id` and `req.user.is(\'RoleName\')`. 3) `req.reject(code, message)`: Immediately aborts the transaction, rolls back any pending database writes, and returns an HTTP error code (e.g., `req.reject(400, "Order quantity cannot be negative")`). 4) `req.error()`: Collects multiple validation errors into a batch so the frontend can highlight all invalid fields at once.',
          keyIdea:
            'Always use `req.reject(statusCode, message)` to report business rule violations cleanly to frontend clients.',
          taskInstruction: 'Inspect how req.reject() is used in the technical code example below.',
          warning: 'Do not use raw JavaScript `throw new Error()`; always use `req.reject()` for clean, localized OData error formatting.',
        },
        {
          stepNumber: 4,
          title: 'Custom Actions and Functions',
          subtitle: 'Extending CRUD with explicit business operations',
          explanation:
            'Standard REST and OData provide CRUD (Create, Read, Update, Delete). However, real business processes are not just CRUD: they involve explicit business actions like "ApproveOrder", "CancelSubscription", or "RecalculateTaxes". CAP allows defining custom operations directly in CDS: 1) `action`: State-modifying operations called via HTTP POST (e.g., `action approveOrder() returns Boolean;`). 2) `function`: Non-state-modifying calculation queries called via HTTP GET (e.g., `function calculateDiscount(customerId: UUID) returns Decimal;`). Custom actions are implemented in Node.js using `this.on(\'approveOrder\', async (req) => { ... })`.',
          keyIdea:
            'Use custom Actions for state-changing business commands (Approve, Reject, Submit) rather than generic PATCH updates.',
          taskInstruction: 'Review the custom action definition in the code example.',
          hint: 'Actions can be bound to a specific entity instance or unbound at the service level.',
        },
        {
          stepNumber: 5,
          title: 'Asynchronous Programming and Transactions in Handlers',
          subtitle: 'Ensuring atomic database consistency',
          explanation:
            'CAP handlers are asynchronous (`async (req) => { ... }`). All database operations executed inside a handler share the active database transaction automatically. If your handler updates an order status in table A, decreases stock in table B, and then throws an error because payment verification failed, CAP automatically executes an atomic `ROLLBACK`. Both table A and table B revert to their original states with zero partial data corruption.',
          keyIdea:
            'CAP wraps every request in an automatic database transaction: if any step fails, all database changes roll back automatically.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Use `await cds.tx(req).run(...)` if you need fine-grained programmatic transaction control.',
        },
      ],
      diagramType: 'event-handlers',
      analogy: {
        concept: 'The CAP Event Handler Pipeline (before, on, after)',
        analogy: 'Airport Security Checkpoint, Flight Boarding, and Baggage Claim',
        explanation:
          'Think of an airline passenger boarding a flight. 1) `before` Handler (Security Checkpoint): The officer inspects your boarding pass, weighs your luggage, and checks for prohibited items. If your bag is overweight or your ticket is expired, you are immediately rejected (`req.reject(400)`): you never reach the airplane, and your ticket is not punched. 2) `on` Handler (The Flight): The aircraft takes off and lands at your destination. By default, the commercial airline flies the standard route (CAP\'s automated SQL execution). 3) `after` Handler (Baggage Claim & Hotel Arrival): You have arrived safely. Now, secondary side effects occur: the airline updates your frequent flyer miles balance, sends an automated text to your phone, and the airport shuttle picks you up.',
        transition:
          'Where airport security rejects invalid passengers before boarding, CAP "before" handlers reject invalid data before it ever touches your database.',
      },
      conceptExplanation: {
        whatItIs:
          'Service Implementation in SAP CAP refers to the programmatic layer where developers define tailored API projections in CDS and write custom business logic, validations, and event handlers in Node.js or Java.',
        whyItExists:
          'Every enterprise has unique business rules (e.g., orders over €10,000 require VP approval; items out of stock cannot be ordered; employees cannot approve their own expense reports). Automated CRUD cannot guess these rules.',
        problemSolved:
          'Enforces business integrity, validates input data, prevents unauthorized state transitions, coordinates multi-system workflows, and maintains atomic transactional consistency.',
        howItWorks:
          'Developers create a `.js` or `.ts` file sharing the exact same name as the `.cds` service file (e.g., `srv/service.cds` and `srv/service.js`). The CAP runtime loads the file automatically and registers event handlers for CRUD operations and custom actions.',
        btpFit:
          'All business logic in SAP BTP extension applications is implemented within these CAP service handlers.',
      },
      jargonTerms: [
        {
          term: 'Event Handler',
          simpleMeaning: 'A function that executes automatically when a specific event (like CREATE, READ, or an Action) occurs.',
          familiarEquivalent: 'A motion sensor light that turns on automatically when someone walks into the room.',
        },
        {
          term: 'before / on / after',
          simpleMeaning: 'The 3 execution phases: before validates; on executes database writes; after performs side effects.',
          familiarEquivalent: 'Pre-flight safety check (before), the actual flight (on), and baggage claim arrival (after).',
        },
        {
          term: 'req.reject()',
          simpleMeaning: 'A CAP method that halts execution, rolls back database changes, and returns an HTTP error code.',
          familiarEquivalent: 'Pulling the emergency brake on a train to stop immediately.',
        },
        {
          term: 'Action vs Function',
          simpleMeaning: 'Action modifies state (HTTP POST); Function queries and calculates data without modifying state (HTTP GET).',
          familiarEquivalent: 'Pressing "Submit Payment" (Action) vs checking your account balance (Function).',
        },
      ],
      technicalExample: {
        title: 'Production CAP Service Definition and Node.js Event Handlers',
        language: 'javascript',
        code: `// 1. SERVICE DEFINITION: srv/order-service.cds
/*
using { sap.btp.procurement as my } from '../db/schema';

service OrderService {
  @readonly entity Products as projection on my.Products;
  entity PurchaseOrders as projection on my.PurchaseOrders actions {
    action approveOrder() returns PurchaseOrders;
  };
}
*/

// 2. BUSINESS LOGIC HANDLERS: srv/order-service.js
import cds from '@sap/cds';

export class OrderService extends cds.ApplicationService {
  async init() {
    const { PurchaseOrders, Products } = this.entities;

    // VALIDATION (before CREATE): Verify budget and inventory
    this.before('CREATE', 'PurchaseOrders', async (req) => {
      const order = req.data;

      if (!order.totalNetAmount || order.totalNetAmount <= 0) {
        return req.reject(400, 'Order totalNetAmount must be greater than zero.');
      }

      // Check manager approval threshold
      if (order.totalNetAmount > 100000 && !req.user.is('Approver')) {
        return req.reject(403, 'Orders exceeding €100,000 require executive Approver scope.');
      }
    });

    // CUSTOM ACTION: Approve Order
    this.on('approveOrder', 'PurchaseOrders', async (req) => {
      const orderId = req.params[0]?.ID || req.params[0];
      const tx = cds.tx(req);

      const order = await tx.run(SELECT.one.from(PurchaseOrders).where({ ID: orderId }));
      if (!order) return req.reject(404, 'Order not found');

      if (order.status !== 'PendingApproval') {
        return req.reject(409, \`Cannot approve order in current state '\${order.status}'\`);
      }

      await tx.run(
        UPDATE(PurchaseOrders).set({ status: 'Approved' }).where({ ID: orderId })
      );

      return tx.run(SELECT.one.from(PurchaseOrders).where({ ID: orderId }));
    });

    // SIDE EFFECTS (after CREATE): Emit notification
    this.after('CREATE', 'PurchaseOrders', async (order, req) => {
      console.log(\`[Audit Log] Purchase Order '\${order.ID}' created by '\${req.user.id}'.\`);
      // Here an enterprise app emits a topic to SAP Event Mesh
    });

    await super.init();
  }
}`,
        purpose:
          'Demonstrates professional CAP service implementation: validating order totals in before, executing a custom state-transition action with concurrency protection in on, and logging audit side-effects in after.',
        lineExplanations: [
          { lines: '16', explanation: 'this.before("CREATE"): Intercepts order creation before any SQL is written to the database.' },
          { lines: '20', explanation: 'req.reject(400): Aborts the request cleanly if total amount is zero or negative.' },
          { lines: '29', explanation: 'this.on("approveOrder"): Implements custom state transition action called via POST .../approveOrder.' },
          { lines: '37', explanation: 'State validation: Rejects with 409 Conflict if order is not in PendingApproval state.' },
          { lines: '48', explanation: 'this.after("CREATE"): Executes after database commit; ideal for asynchronous audit logging.' },
        ],
        expectedOutput:
          'Valid orders persist and log audits; invalid orders or unauthorized users receive clean, localized HTTP error responses.',
        commonMistakes: [
          'Forgetting "await" before database calls (SELECT, UPDATE), leading to race conditions.',
          'Not calling "await super.init()" at the end of custom ApplicationService classes, breaking built-in CAP handlers.',
        ],
      },
      businessScenario: {
        title: 'Enterprise Capital Expenditure (CapEx) Multi-Stage Approval',
        context:
          'A manufacturing corporation requires strict financial validation before purchase orders exceeding €100,000 can be committed to the ERP system.',
        workflowSteps: [
          'Purchasing agent submits a €150,000 equipment order via SAP Fiori.',
          'CAP `before` handler inspects payload: detects total > €100,000 and automatically sets status to "PendingApproval".',
          'Department VP opens Fiori Approval Inbox and clicks "Approve Order".',
          'CAP `on(\'approveOrder\')` action validates VP security scopes, updates order status to "Approved", and triggers S/4HANA sync.',
          'CAP `after` handler emits an SAP Event Mesh notification alerting the supplier to begin fabrication.',
        ],
        businessImpact:
          'Enforces 100% financial segregation of duties and eliminates unauthorized procurement spend across global factories.',
      },
      practicalActivity:
        'Launch Practice Drill "Debugging CAP Handlers" (/practice?tab=drills&id=debug-cap-handler) to test your event handler coding skills.',
      keyTakeaways: [
        'Projections in srv/ customize and secure what entities and fields are exposed to web clients.',
        'The handler pipeline is: before (validation) &rarr; on (execution) &rarr; after (side effects).',
        'Always use req.reject(code, message) to enforce business validation rules cleanly.',
      ],
      quizQuestions: [
        {
          id: 'mod-3-2-q1',
          question:
            'What happens if a developer calls "req.reject(400, \'Invalid discount code\')" inside an "srv.before(\'CREATE\', \'Orders\')" handler?',
          options: [
            {
              id: 'a',
              text: 'The request is aborted immediately, the active database transaction rolls back, and the client receives an HTTP 400 Bad Request response with the error message.',
              isCorrect: true,
              explanation:
                'Correct. Calling req.reject() inside a before handler halts the pipeline and rolls back any pending database writes.',
            },
            {
              id: 'b',
              text: 'The order is saved to the database anyway, but marked with an exclamation point.',
              isCorrect: false,
              explanation:
                'Incorrect. req.reject() completely prevents database writes.',
            },
            {
              id: 'c',
              text: 'The Node.js server crashes and must be restarted via the command line.',
              isCorrect: false,
              explanation:
                'Incorrect. req.reject() is graceful error handling, not an unhandled crash.',
            },
            {
              id: 'd',
              text: 'The error is ignored unless the user is an administrator.',
              isCorrect: false,
              explanation:
                'Incorrect. req.reject() enforces rules for all users regardless of role.',
            },
          ],
        },
        {
          id: 'mod-3-2-q2',
          question:
            'Which execution phase in the CAP handler pipeline is intended for side-effects like sending confirmation emails or publishing topics to SAP Event Mesh after data is saved?',
          options: [
            {
              id: 'a',
              text: 'after',
              isCorrect: true,
              explanation:
                'Correct. The "after" handler runs only after the database transaction has successfully committed, ensuring you never send emails for failed transactions.',
            },
            {
              id: 'b',
              text: 'before',
              isCorrect: false,
              explanation:
                'Incorrect. Running side effects in "before" could send emails even if the database insert later fails.',
            },
            {
              id: 'c',
              text: 'finally',
              isCorrect: false,
              explanation:
                'Incorrect. CAP provides before, on, and after handlers.',
            },
            {
              id: 'd',
              text: 'catch',
              isCorrect: false,
              explanation:
                'Incorrect. catch handles errors, not successful post-commit side effects.',
            },
          ],
        },
        {
          id: 'mod-3-2-q3',
          question:
            'In SAP CAP, what is the key difference between a custom "action" and a custom "function"?',
          options: [
            {
              id: 'a',
              text: 'An action is state-modifying and invoked via HTTP POST, whereas a function is read-only and invoked via HTTP GET.',
              isCorrect: true,
              explanation:
                'Correct. Actions modify server state; functions perform calculations or queries without side effects.',
            },
            {
              id: 'b',
              text: 'An action can only be written in Java; functions can only be written in Python.',
              isCorrect: false,
              explanation:
                'Incorrect. Both actions and functions are written in Node.js or Java in CAP.',
            },
            {
              id: 'c',
              text: 'Actions are completely deprecated in modern SAP BTP.',
              isCorrect: false,
              explanation:
                'Incorrect. Actions are heavily used across all modern CAP applications.',
            },
            {
              id: 'd',
              text: 'Functions can only return strings; actions can only return numbers.',
              isCorrect: false,
              explanation:
                'Incorrect. Both actions and functions can return any primitive, entity, or complex type.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-3-3',
      code: '3.3',
      phaseId: 'phase-3',
      title: 'Data and Persistence',
      tagline: 'Associations, Compositions, and the CDS Query Language (CQL)',
      summary:
        'Master enterprise relational data modeling and database querying in SAP CAP. Understand the critical distinction between loose Associations and tight Compositions, execute fluent queries using CDS Query Language (CQL), and manage transactions.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Relationships in Core Data Services: Managed Associations vs Compositions.',
        'Associations (Association to): Loose references between independent business objects (e.g., an Order points to a Customer).',
        'Compositions (Composition of one / many): Tight parent-child lifecycle ownership with automatic cascade deletion and deep insert (e.g., an Order owns its OrderItems).',
        'The CDS Query Language (CQL): A database-agnostic query language that enhances standard SQL with path expressions and deep inserts.',
        'Programmatic queries using cds.ql: SELECT.from(), INSERT.into(), UPDATE(), and DELETE().',
        'Transactional execution: Managing explicit ACID transactions using `cds.tx()` and automatic rollbacks.',
        'Mock data seeding: Using CSV files in `db/data/` for automated database testing.',
      ],
      practicalImplementation:
        'Design a parent-child relationship using `Composition of many` in CDS. Write a programmatic CQL query in Node.js that joins across associations using path expressions (e.g., `SELECT.from(Orders).columns(\'orderNumber\', \'customer.name\')`).',
      masteryCheck:
        'Explain what happens to line items when a parent order is deleted under an Association versus a Composition. Write a programmatic deep insert creating an order and 3 line items in a single atomic transaction.',
      learningObjectives: [
        'Differentiate between an Association (loose reference) and a Composition (strict lifecycle ownership).',
        'Explain why Compositions are required for parent-child document structures to ensure cascade delete.',
        'Write programmatic queries using the fluent CDS Query Language (CQL) API.',
        'Load and manage mock data using CSV files during local prototyping.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Associations vs Compositions: The Crucial Architectural Choice',
          subtitle: 'Why getting this wrong causes database corruption',
          explanation:
            'In standard SQL, everything is a Foreign Key. In SAP CAP, we distinguish between two fundamentally different types of relationships: 1) Association (`Association to`): A loose reference between two independent entities that have their own lifecycles. For example, a `PurchaseOrder` points to a `Supplier`. If the Purchase Order is deleted, the Supplier must NOT be deleted! 2) Composition (`Composition of one` / `many`): A tight parent-child ownership relationship. The child entity cannot exist without the parent. For example, an `OrderItem` belongs strictly to its parent `Order`. If the Order is deleted, all its OrderItems must be deleted automatically (cascade delete).',
          keyIdea:
            'Use Association for independent entities (Orders &rarr; Customer); use Composition for document parts that cannot exist alone (Order &rarr; OrderItems).',
          taskInstruction: 'Review the automobile analogy below to visualize Association vs Composition.',
          hint: 'Compositions also enable "Deep Inserts", creating a parent order and all child items in a single JSON payload.',
        },
        {
          stepNumber: 2,
          title: 'Compositions in Action: Cascade Delete and Deep Inserts',
          subtitle: 'Automating multi-table database operations',
          explanation:
            'When you declare `items : Composition of many OrderItems on items.parent = $self;`, CAP unlocks powerful automated behaviors: 1) Cascade Delete: Deleting the parent order automatically issues SQL to delete all associated child items in the database. 2) Deep Insert: A frontend application can send a single HTTP POST request containing an order object with an array of items. CAP automatically generates UUID primary keys for all items, assigns the foreign key to the parent, and inserts all records in one atomic transaction.',
          keyIdea:
            'Compositions eliminate manual foreign key stitching: CAP manages child keys and cascade deletes automatically.',
          taskInstruction: 'Inspect the Composition syntax in the technical example below.',
          warning: 'Never use Association for invoice line items; doing so leaves orphaned rows in your database when invoices are deleted.',
        },
        {
          stepNumber: 3,
          title: 'CDS Query Language (CQL): Beyond Standard SQL',
          subtitle: 'Writing database-agnostic queries in Node.js',
          explanation:
            'In Node.js handlers, we query the database using the CDS Query Language (CQL) via the fluent JavaScript API: 1) `SELECT`: `await SELECT.from(Orders).where({ status: \'Open\' })`. 2) Path Expressions: Instead of writing complex SQL `JOIN` clauses, CQL allows traversing relationships using dot notation: `await SELECT.from(Orders).columns(\'orderNumber\', \'customer.email\', \'customer.company.name\')`. CAP translates these path expressions into optimized SQL `LEFT OUTER JOIN` statements on the target database automatically.',
          keyIdea:
            'CQL path expressions (`customer.company.name`) let you traverse complex database relationships without writing tedious manual SQL JOINs.',
          taskInstruction: 'Examine the fluent query examples in the code snippet.',
          hint: 'CQL queries work identically whether running on local SQLite or cloud SAP HANA.',
        },
        {
          stepNumber: 4,
          title: 'Programmatic Transactions with cds.tx',
          subtitle: 'Controlling ACID boundaries across multiple services',
          explanation:
            'While CAP handlers run inside an automated transaction by default, complex enterprise workflows sometimes require coordinating transactions across multiple services or explicit rollbacks. In Node.js, we use `cds.tx()`: 1) `const tx = cds.tx(req);`: Connects to the active request transaction. 2) Any query executed via `tx.run(...)` participates in that transaction. 3) If an error is thrown or `req.reject()` is called, all changes across all tables are rolled back automatically, guaranteeing ACID database compliance.',
          keyIdea:
            'Transactions guarantee that financial balances and inventory allocations never end up in a half-updated corrupted state.',
          taskInstruction: 'Review how cds.tx(req) is used in the custom action example.',
          hint: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.',
        },
        {
          stepNumber: 5,
          title: 'Mock Data Seeding with CSV Files',
          subtitle: 'Instant test data without writing manual INSERT scripts',
          explanation:
            'During development, testing an application with an empty database is frustrating. CAP provides automated mock data loading via CSV files: 1) Create a folder `db/data/`. 2) Create a CSV file matching your entity name: `sap.btp.procurement-Products.csv`. 3) The first row contains column names matching entity properties; subsequent rows contain test data. 4) When `cds watch` boots up, it automatically loads the CSV files into your in-memory SQLite database in milliseconds.',
          keyIdea:
            'Placing CSV files in `db/data/` pre-populates your test database automatically every time the server restarts.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Use standard comma-separated values and ISO date formats (`YYYY-MM-DD`) in your CSV files.',
        },
      ],
      diagramType: 'cap-architecture',
      analogy: {
        concept: 'Associations vs Compositions in Data Modeling',
        analogy: 'The Automobile Engine (Association) vs Car Doors (Composition)',
        explanation:
          'Think of an automobile. 1) Association (Loose Reference): The car has a registered driver (Driver). The driver has their own life: they get into the car, drive it, and get out. If the car is sent to a metal recycling crusher and compacted into a cube of scrap metal, the driver is NOT crushed! The driver walks away and buys another car. The link between Car and Driver is an Association. 2) Composition (Tight Parent-Child Ownership): The car has 4 passenger doors (Doors). The doors are physical parts of the car. If the car is compacted in the metal crusher, the doors are crushed along with it! You cannot have an orphaned car door driving down the highway by itself. The link between Car and Doors is a Composition.',
        transition:
          'Where the car crusher destroys doors but spares the driver, deleting an SAP Order deletes its line items (Composition) but preserves the Customer master record (Association).',
      },
      conceptExplanation: {
        whatItIs:
          'Data and Persistence in SAP CAP refers to the relational modeling of entity associations and compositions in CDS, combined with the execution of programmatic database queries using the CDS Query Language (CQL).',
        whyItExists:
          'Enterprise business objects are highly relational: invoices have items, employees belong to departments, and contracts reference business partners. Managing foreign keys, cascade deletes, and relational queries manually leads to orphaned data and severe bugs.',
        problemSolved:
          'Automates relational mapping, eliminates manual SQL JOIN syntax through declarative path expressions, guarantees cascade deletion for parent-child structures, and ensures database portability across SQLite, PostgreSQL, and SAP HANA Cloud.',
        howItWorks:
          'Developers declare Associations or Compositions in `db/schema.cds`. In backend logic, developers use the `cds.ql` fluent API (`SELECT`, `INSERT`, `UPDATE`, `DELETE`). The CAP database adapter compiles CQL into target SQL dialect statements and manages transactional commits and rollbacks.',
        btpFit:
          'Persistence modeling in CAP is the universal foundation for all data storage in SAP HANA Cloud and local development environments.',
      },
      jargonTerms: [
        {
          term: 'Association (Association to)',
          simpleMeaning: 'A loose relationship between two independent entities with separate lifecycles.',
          familiarEquivalent: 'A student enrolling in a university course: dropping the course does not expel the student.',
        },
        {
          term: 'Composition (Composition of)',
          simpleMeaning: 'A strict parent-child ownership relationship where children are deleted if the parent is deleted.',
          familiarEquivalent: 'A book and its chapters: if you burn the book, all its chapters are destroyed.',
        },
        {
          term: 'Cascade Delete',
          simpleMeaning: 'Automatically deleting all child records in the database when their parent record is deleted.',
          familiarEquivalent: 'Deleting a folder on your computer automatically deleting all files inside it.',
        },
        {
          term: 'Deep Insert',
          simpleMeaning: 'Inserting a parent entity and all its child items in a single HTTP request and database transaction.',
          familiarEquivalent: 'Submitting a complete multi-page tax filing in a single envelope.',
        },
        {
          term: 'CQL (CDS Query Language)',
          simpleMeaning: 'An enhanced, database-independent version of SQL tailored for Core Data Services.',
          familiarEquivalent: 'A universal translator that converts your queries into whatever database language is needed.',
        },
      ],
      technicalExample: {
        title: 'Complete Relational CDS Model and Fluent CQL Programmatic Queries',
        language: 'javascript',
        code: `// 1. DATA MODEL DEFINITIONS: db/schema.cds
/*
entity Customers : cuid, managed {
  name        : String(100);
  email       : String(100);
  orders      : Association to many Orders on orders.customer = $self;
}

entity Orders : cuid, managed {
  orderNumber : String(20);
  customer    : Association to Customers;
  items       : Composition of many OrderItems on items.parent = $self;
}

entity OrderItems : cuid {
  parent      : Association to Orders;
  material    : String(50);
  quantity    : Integer;
  netPrice    : Decimal(10,2);
}
*/

// 2. PROGRAMMATIC CQL QUERIES IN NODE.JS
import cds from '@sap/cds';

export async function processCustomerOrders(customerId) {
  const { Orders, OrderItems } = cds.entities('sap.btp.procurement');

  // Query 1: Path Expression (Traverse association without manual SQL JOIN)
  const customerOrders = await SELECT.from(Orders)
    .columns(
      'orderNumber',
      'customer.name as customerName',
      'customer.email as customerEmail'
    )
    .where({ 'customer.ID': customerId });

  // Query 2: Deep Read (Expand composition items)
  const orderWithItems = await SELECT.one.from(Orders)
    .where({ orderNumber: 'ORD-2026-001' })
    .columns((o) => {
      o.orderNumber,
      o.items((i) => {
        i.material, i.quantity, i.netPrice
      })
    });

  // Query 3: Atomic Deep Insert (Parent Order + Child Items in 1 step!)
  await INSERT.into(Orders).entries({
    orderNumber: 'ORD-2026-999',
    customer_ID: customerId,
    items: [
      { material: 'CHIP-M1', quantity: 10, netPrice: 450.00 },
      { material: 'CHIP-M2', quantity: 5,  netPrice: 750.00 }
    ]
  });
}`,
        purpose:
          'Demonstrates professional relational CAP programming: modeling loose Associations vs tight Compositions, querying with path expressions, deep reads with projections, and atomic deep inserts.',
        lineExplanations: [
          { lines: '5', explanation: 'orders : Association to many: Loose relationship; deleting a customer does not automatically destroy historic orders.' },
          { lines: '11', explanation: 'items : Composition of many: Strict ownership; items are deleted if parent order is deleted.' },
          { lines: '29-33', explanation: 'customer.name path expression: Automatically generates optimized SQL LEFT OUTER JOIN.' },
          { lines: '44-51', explanation: 'Atomic Deep Insert: Inserts order and automatically stitches UUIDs and foreign keys for both items.' },
        ],
        expectedOutput:
          'Executes clean, optimized SQL transactions on SQLite or SAP HANA Cloud with zero orphaned rows.',
        commonMistakes: [
          'Using Association instead of Composition for OrderItems, requiring 4 separate INSERT statements and manual foreign key assignment.',
          'Not wrapping multi-step queries in cds.tx(req), risking partial database writes on unhandled errors.',
        ],
      },
      businessScenario: {
        title: 'Global Telecommunications Customer Order Lifecycle',
        context:
          'A mobile telecommunications operator processes 50,000 smartphone orders daily with multiple accessories and service plan subscriptions.',
        workflowSteps: [
          'Customer purchases smartphone, phone case, and 5G data plan online.',
          'Frontend submits a single JSON Deep Insert payload containing order details and 3 child items.',
          'CAP Composition handler assigns UUIDs and commits all 4 database records in an atomic transaction.',
          'Customer cancels the order 10 minutes later.',
          'Customer service clicks "Cancel Order": CAP executes cascade delete, purging the order and all 3 items while preserving the customer account.',
        ],
        businessImpact:
          'Guarantees zero database orphan records, reduces API payload roundtrips by 66%, and maintains 100% database referential integrity.',
      },
      practicalActivity:
        'Launch Practice Drill "Entity Associations" (/practice?tab=drills&id=cds-associations) and "Entity Compositions" (/practice?tab=drills&id=cds-compositions).',
      keyTakeaways: [
        'Associations are loose references between independent entities; Compositions are tight parent-child ownership.',
        'Compositions provide automatic cascade delete and atomic deep inserts.',
        'The CDS Query Language (CQL) path expressions let you query related data without writing manual SQL JOINs.',
      ],
      quizQuestions: [
        {
          id: 'mod-3-3-q1',
          question:
            'What happens to child line items when a parent order is deleted if the relationship is modeled as a "Composition of many" in CDS?',
          options: [
            {
              id: 'a',
              text: 'All child line items are automatically deleted from the database in the same transaction (Cascade Delete).',
              isCorrect: true,
              explanation:
                'Correct. Compositions represent strict ownership: child entities cannot exist without their parent and are cascade-deleted automatically.',
            },
            {
              id: 'b',
              text: 'The child items remain in the database forever with an empty parent ID (orphaned records).',
              isCorrect: false,
              explanation:
                'Incorrect. Leaving orphaned records occurs with unmanaged Associations, not Compositions.',
            },
            {
              id: 'c',
              text: 'The database throws a fatal error and refuses to delete the order.',
              isCorrect: false,
              explanation:
                'Incorrect. Compositions handle cascade deletion automatically without error.',
            },
            {
              id: 'd',
              text: 'The line items are emailed to the database administrator as a CSV file.',
              isCorrect: false,
              explanation:
                'Incorrect. Database engines perform deletion, not email dispatch.',
            },
          ],
        },
        {
          id: 'mod-3-3-q2',
          question:
            'How do CQL path expressions (such as "customer.company.name") benefit developers compared to standard raw SQL?',
          options: [
            {
              id: 'a',
              text: 'They allow developers to traverse entity relationships using intuitive dot-notation without writing tedious and error-prone SQL JOIN clauses manually.',
              isCorrect: true,
              explanation:
                'Correct. Path expressions abstract foreign key joins, allowing developers to query relational graphs naturally.',
            },
            {
              id: 'b',
              text: 'They allow web browsers to execute SQL queries without a backend server.',
              isCorrect: false,
              explanation:
                'Incorrect. Queries always execute on the backend database adapter.',
            },
            {
              id: 'c',
              text: 'They encrypt the database using blockchain technology.',
              isCorrect: false,
              explanation:
                'Incorrect. Path expressions are query syntax, not blockchain encryption.',
            },
            {
              id: 'd',
              text: 'They only work on Apple computers and fail on Windows.',
              isCorrect: false,
              explanation:
                'Incorrect. CQL is completely operating-system and database agnostic.',
            },
          ],
        },
        {
          id: 'mod-3-3-q3',
          question:
            'Where should mock CSV test data files be placed in a standard CAP project so that "cds watch" loads them automatically on startup?',
          options: [
            {
              id: 'a',
              text: 'In the "db/data/" directory, with filenames matching the fully-qualified entity name (e.g., db/data/sap.btp.procurement-Products.csv).',
              isCorrect: true,
              explanation:
                'Correct. CAP looks in db/data/ and automatically seeds matching entities on startup.',
            },
            {
              id: 'b',
              text: 'In your desktop computer Downloads folder.',
              isCorrect: false,
              explanation:
                'Incorrect. CAP only scans within the project directory tree.',
            },
            {
              id: 'c',
              text: 'Inside the node_modules folder.',
              isCorrect: false,
              explanation:
                'Incorrect. Never put project data inside node_modules.',
            },
            {
              id: 'd',
              text: 'Mock data cannot be loaded via CSV files in CAP.',
              isCorrect: false,
              explanation:
                'Incorrect. CSV data loading is a core feature of the CAP development kit.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-3-4',
      code: '3.4',
      phaseId: 'phase-3',
      title: 'SAP HANA Cloud',
      tagline: 'In-Memory Computing, Column-Oriented Storage, and HDI Containers',
      summary:
        'Master the enterprise database engine of the SAP Intelligent Enterprise. Understand SAP HANA in-memory architecture, column-store vs row-store physics, calculation views, and how HANA Deployment Infrastructure (HDI) containers manage database schemas safely.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'SAP HANA architecture: In-memory computing, keeping all data in RAM, persistence logging, and sub-second analytical processing.',
        'Column-oriented vs Row-oriented storage: Why column stores provide 10x-100x compression and instantaneous aggregations (SUM, AVG) across millions of rows.',
        'HANA Deployment Infrastructure (HDI): Declarative container-based database management, isolated schemas, and technical users.',
        'The HDI container lifecycle: Design-time artifacts (.hdiconfig, .hdbtable, .hdbview) vs Run-time database catalog objects.',
        'Deploying CAP to HANA: `cds deploy --to hana`, `@sap/hana-client`, `@sap/hdbext`, and binding credentials.',
        'Hybrid local testing: Connecting local desktop code to a live cloud HANA database using `cds bind --to <hana-instance>`.',
      ],
      practicalImplementation:
        'Compile a CAP project for SAP HANA using `cds build --production`. Inspect the generated `.hdiconfig` and `.hdbtable` files in `gen/db/src/`, and test hybrid execution using `cds bind`.',
      masteryCheck:
        'Explain why column-store databases excel at enterprise analytical reporting compared to row-store databases. Describe how HDI containers prevent developers from accidentally modifying shared database schemas.',
      learningObjectives: [
        'Explain the architectural principles of in-memory column-oriented database computing in SAP HANA.',
        'Differentiate between column-store tables (analytics/reporting) and row-store tables (single-record lookups).',
        'Describe the role and security boundaries of HANA Deployment Infrastructure (HDI) containers.',
        'Deploy and bind CAP applications to SAP HANA Cloud instances using the cf and cds CLIs.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The In-Memory Revolution: Why SAP Built HANA',
          subtitle: 'Eliminating the disk I/O bottleneck',
          explanation:
            'For 40 years, relational databases (Oracle, DB2, Microsoft SQL) were engineered around a fundamental constraint: physical spinning hard disks are painfully slow. To make systems usable, architects spent millions building complex secondary indexes, batch materialization jobs, and separate analytical data warehouses (OLAP) separate from transactional systems (OLTP). In 2011, SAP unveiled SAP HANA: an in-memory database where all active data is held permanently in high-speed RAM. Reading from RAM is over 100,000 times faster than reading from spinning disk. Aggregating 100,000,000 sales records takes milliseconds rather than hours.',
          keyIdea:
            'SAP HANA holds all data in RAM, unifying transactional processing (OLTP) and analytical reporting (OLAP) in a single database.',
          taskInstruction: 'Review the filing cabinet analogy below to understand in-memory speed.',
          hint: 'Data is still persisted to non-volatile disk/SSD storage asynchronously to ensure durability against power outages.',
        },
        {
          stepNumber: 2,
          title: 'Column-Store vs Row-Store Physics',
          subtitle: 'Why column-orientation accelerates enterprise queries',
          explanation:
            'Traditional databases store tables row-by-row on disk (Row Store: Row 1 [ID, Name, Country, Sales], then Row 2, etc.). Row stores are fast when reading all fields of a single record (e.g., loading user profile #104). However, enterprise reports ask aggregate questions: "What was the total revenue across all European stores last year?" A row store must scan every single byte of every column of every row just to read the "Sales" field. SAP HANA defaults to Column Store: all values of the "Country" column are stored contiguously in memory, and all values of "Sales" are stored contiguously. A query summing revenue scans only the "Sales" memory block, skipping billions of irrelevant bytes.',
          keyIdea:
            'Column stores allow instant aggregation queries and achieve 5x to 10x data compression because identical column values compress efficiently.',
          taskInstruction: 'Examine the column-store storage layout in the concept explanation.',
          hint: 'In a table with 100 columns, a query for 2 columns reads only 2% of the memory footprint.',
        },
        {
          stepNumber: 3,
          title: 'HANA Deployment Infrastructure (HDI) Containers',
          subtitle: 'The modern declarative schema isolation model',
          explanation:
            'In legacy databases, developers logged in as database administrators and executed raw `CREATE TABLE` and `ALTER TABLE` commands directly in the database catalog. When multiple teams deployed custom code, they collided, overwrote tables, and left orphaned schemas that no one dared delete. SAP introduced HDI (HANA Deployment Infrastructure): 1) An HDI Container is an isolated database schema governed by a dedicated technical user. 2) Design-Time Artifacts: Developers never write direct database catalog commands; they write declarative design-time files (`.hdbtable`, `.hdbview`, or compiled CDS). 3) The HDI Deployer tool inspects the container, compares the design-time files against the database catalog, and executes non-destructive schema migrations automatically.',
          keyIdea:
            'HDI containers isolate application schemas and automate database migrations through declarative design-time files.',
          taskInstruction: 'Inspect the HDI container resource in the technical example below.',
          hint: 'Applications cannot access another HDI container\'s tables unless granted explicit cross-container synonyms.',
        },
        {
          stepNumber: 4,
          title: 'Deploying CAP to SAP HANA Cloud',
          subtitle: 'From local prototype to production cloud database',
          explanation:
            'Deploying a CAP application to SAP HANA Cloud is automated via the CLI: 1) Run `cds add hana`: Updates your `package.json` to include `@sap/hana-client` and `@sap/hdbext`. 2) Run `cds build --production`: Compiles your CDS data models into native HANA design-time artifacts inside `gen/db/src/`. 3) Run `cds deploy --to hana`: Provisions an HDI container in your targeted Cloud Foundry space and deploys all tables, views, and initial CSV data into SAP HANA Cloud.',
          keyIdea:
            'CAP compiles CDS models directly into native HANA HDI artifacts with a single command.',
          taskInstruction: 'Review the CLI deployment commands in the code example.',
          warning: 'Ensure your BTP subaccount has an active SAP HANA Cloud service entitlement before running cds deploy.',
        },
        {
          stepNumber: 5,
          title: 'Hybrid Local Testing: cds bind',
          subtitle: 'Running local code against a live cloud database',
          explanation:
            'Sometimes, you need to test your local JavaScript code against live SAP HANA features (such as calculation views or HANA Vector search) that SQLite does not support. Instead of redeploying the entire app to Cloud Foundry on every code change, CAP provides "Hybrid Testing": 1) Run `cds bind --to <hana-service-instance>`. 2) CAP generates a temporary `.cdsrc-private.json` containing secure tunnel credentials to the live cloud database. 3) Run `cds watch --profile hybrid`. Your Node.js code runs locally on your laptop with instant live-reload, but queries execute against the real live SAP HANA Cloud database.',
          keyIdea:
            'Hybrid testing gives you the best of both worlds: local instant live-reloading coupled with real cloud SAP HANA execution.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Always add `.cdsrc-private.json` to your `.gitignore` to prevent leaking cloud database passwords.',
        },
      ],
      diagramType: 'cap-architecture',
      analogy: {
        concept: 'SAP HANA In-Memory Column Store',
        analogy: 'The Dusty Library Basement vs The Digital Executive Tablet',
        explanation:
          'A traditional disk-based database is like a 19th-century municipal library. When the mayor asks: "How many babies were born in 1982?", a clerk must take a flashlight, walk down 4 flights of stairs into a damp basement, locate 50 massive paper ledger volumes, blow off the dust, and turn thousands of yellowed paper pages by hand (disk I/O read). It takes 4 hours. SAP HANA is like giving the mayor a digital executive tablet with the entire city census loaded into high-speed memory: the mayor types the question, and the tablet searches the memory array and displays the answer in 0.002 seconds. The clerk never walks down the stairs, and the mayor gets answers during live press conferences.',
        transition:
          'Where the digital tablet delivers instant answers from memory, SAP HANA delivers instant business insights from in-memory RAM across enterprise corporations.',
      },
      conceptExplanation: {
        whatItIs:
          'SAP HANA Cloud is a modern, fully managed cloud-native in-memory database service that unifies transactional (OLTP) and analytical (OLAP) processing, relational data, document stores, spatial data, graph algorithms, and vector search in a single database engine.',
        whyItExists:
          'Traditional enterprise databases separate transactional ERP from analytical data warehouses, causing synchronization delays, data duplication, and slow query performance.',
        problemSolved:
          'Eliminates batch ETL synchronization delays, provides sub-second analytics on live transactional data, drastically reduces storage footprint through columnar compression, and powers advanced AI vector embeddings.',
        howItWorks:
          'Data is stored in-memory in columnar format. ACID compliance is guaranteed through write-ahead redo logs persisted to non-volatile storage. Applications connect using secure TLS connections managed through HDI containers.',
        btpFit:
          'SAP HANA Cloud is the central database foundation for the entire SAP BTP ecosystem and modern SAP S/4HANA Cloud systems.',
      },
      jargonTerms: [
        {
          term: 'In-Memory Database',
          simpleMeaning: 'A database that stores all data primarily in computer RAM rather than on spinning hard disks.',
          familiarEquivalent: 'Keeping active documents on your desk instead of walking to a storage warehouse down the street.',
        },
        {
          term: 'Column Store',
          simpleMeaning: 'Storing database tables column-by-column rather than row-by-row to accelerate search and aggregation.',
          familiarEquivalent: 'Sorting clothes in your closet by color rather than in random mixed laundry bags.',
        },
        {
          term: 'HDI Container',
          simpleMeaning: 'An isolated database schema in SAP HANA governed by automated declarative deployment tools.',
          familiarEquivalent: 'A secure safe-deposit box inside a master bank vault.',
        },
        {
          term: 'Hybrid Profile',
          simpleMeaning: 'Running application code locally on your laptop while connecting to a live cloud database on BTP.',
          familiarEquivalent: 'Working from home on your laptop while connected to the office network via secure VPN.',
        },
      ],
      technicalExample: {
        title: 'Production HANA HDI Container Resource and Hybrid Bind Configuration',
        language: 'yaml',
        code: `# 1. MTA RESOURCE DEFINITION FOR SAP HANA CLOUD HDI CONTAINER
# mta.yaml
resources:
  - name: my-procurement-db-hdi
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
    properties:
      hdi-container-name: \${service-name}

# 2. TERMINAL COMMANDS: COMPILE, DEPLOY & HYBRID BIND
# Step A: Build production artifacts (generates gen/db/src/.hdiconfig and .hdbtable)
cds build --production

# Step B: Deploy schema to SAP HANA Cloud instance
cds deploy --to hana:my-procurement-db-hdi

# Step C: Bind local desktop environment to cloud database for Hybrid Testing
cds bind --to my-procurement-db-hdi

# Step D: Run local server connected to live cloud HANA database!
cds watch --profile hybrid`,
        purpose:
          'Demonstrates the complete SAP HANA Cloud workflow: defining an HDI container resource in mta.yaml, building production artifacts, deploying schema to the cloud, and running hybrid local tests.',
        lineExplanations: [
          { lines: '4', explanation: 'type: com.sap.xs.hdi-container: Standard BTP resource type for provisioning an isolated HANA schema.' },
          { lines: '7', explanation: 'service-plan: hdi-shared: Standard multi-tenant shared container plan on SAP HANA Cloud.' },
          { lines: '13', explanation: 'cds build --production: Compiles CDS entities into native HANA .hdbtable and .hdbview files.' },
          { lines: '19', explanation: 'cds bind: Generates local credentials (.cdsrc-private.json) pointing to the cloud HDI instance.' },
          { lines: '22', explanation: 'cds watch --profile hybrid: Launches local server executing against live cloud HANA.' },
        ],
        expectedOutput:
          'Live cloud tables created in HANA Cloud; local development server executes queries against live HANA in < 45ms.',
        commonMistakes: [
          'Committing .cdsrc-private.json to Git, which exposes live cloud database credentials.',
          'Running cds deploy without having the Cloud Foundry CLI targeted to an active space.',
        ],
      },
      businessScenario: {
        title: 'Real-Time Financial Fraud Detection on SAP HANA Cloud',
        context:
          'A multinational credit card payment processor handles 10,000 transactions per second and must evaluate fraud risk algorithms within 100 milliseconds.',
        workflowSteps: [
          'Transaction arrives at payment gateway.',
          'HANA Cloud columnar store aggregates the customer\'s last 50 transactions across 12 countries in 4 milliseconds.',
          'HANA calculates distance vectors and spending velocity in-memory without disk I/O lag.',
          'Fraud probability score evaluates as safe (< 0.05); transaction commits.',
          'Customer receives point-of-sale receipt confirmation in under 80 milliseconds.',
        ],
        businessImpact:
          'Prevents €24,000,000 in fraudulent card transactions annually while maintaining sub-100ms checkout times for legitimate shoppers.',
      },
      practicalActivity:
        'Run `cds compile db/schema.cds --to sql` in your terminal to inspect how CAP translates CDS entities into standard SQL DDL.',
      keyTakeaways: [
        'SAP HANA stores all data in-memory (RAM) for sub-second analytical and transactional performance.',
        'Column-store tables excel at instant aggregation and achieve 5x-10x data compression.',
        'HDI containers isolate schemas and automate migrations through declarative design-time files.',
        'Use hybrid testing (`cds bind`) to run local code against live cloud HANA databases.',
      ],
      quizQuestions: [
        {
          id: 'mod-3-4-q1',
          question:
            'Why does SAP HANA default to storing tables in a Column-Oriented (Column Store) format rather than a traditional Row Store format?',
          options: [
            {
              id: 'a',
              text: 'Because column stores allow lightning-fast aggregation queries (SUM, AVG, MIN) by reading only the relevant columns in memory, while achieving massive 5x to 10x data compression.',
              isCorrect: true,
              explanation:
                'Correct. Column stores scan only the required columns and compress repetitive data with high efficiency.',
            },
            {
              id: 'b',
              text: 'Because column stores require zero RAM and run completely without memory.',
              isCorrect: false,
              explanation:
                'Incorrect. HANA is an in-memory database that relies extensively on RAM.',
            },
            {
              id: 'c',
              text: 'Because row stores are legally prohibited in European cloud data centers.',
              isCorrect: false,
              explanation:
                'Incorrect. Storage format has nothing to do with international law.',
            },
            {
              id: 'd',
              text: 'Because column stores can only store images and cannot store numbers.',
              isCorrect: false,
              explanation:
                'Incorrect. Column stores store all structured enterprise data types.',
            },
          ],
        },
        {
          id: 'mod-3-4-q2',
          question:
            'What is the primary role of a SAP HANA Deployment Infrastructure (HDI) Container?',
          options: [
            {
              id: 'a',
              text: 'It provides an isolated database schema governed by a dedicated technical user, automating non-destructive schema migrations based on declarative design-time files.',
              isCorrect: true,
              explanation:
                'Correct. HDI containers isolate schemas and ensure database objects match declared design-time specifications.',
            },
            {
              id: 'b',
              text: 'It is a physical steel box installed in your company basement.',
              isCorrect: false,
              explanation:
                'Incorrect. HDI containers are software abstractions inside the cloud database.',
            },
            {
              id: 'c',
              text: 'It is a tool used to download music and videos to your mobile phone.',
              isCorrect: false,
              explanation:
                'Incorrect. HDI is an enterprise database administration framework.',
            },
            {
              id: 'd',
              text: 'It replaces all JavaScript code with Python scripts.',
              isCorrect: false,
              explanation:
                'Incorrect. HDI manages database tables and views, not application runtimes.',
            },
          ],
        },
        {
          id: 'mod-3-4-q3',
          question:
            'What is the purpose of the "Hybrid Profile" (`cds watch --profile hybrid`) in SAP CAP development?',
          options: [
            {
              id: 'a',
              text: 'It allows developers to run application code locally on their laptop with instant live-reloading while executing queries against a real live SAP HANA Cloud database on BTP.',
              isCorrect: true,
              explanation:
                'Correct. Hybrid testing pairs local sub-second code editing with live cloud database capabilities.',
            },
            {
              id: 'b',
              text: 'It allows your computer to run on both electricity and gasoline.',
              isCorrect: false,
              explanation:
                'Incorrect. Hybrid profile is a software testing mode, not automobile mechanics.',
            },
            {
              id: 'c',
              text: 'It permanently deletes your cloud database every 5 minutes.',
              isCorrect: false,
              explanation:
                'Incorrect. Hybrid profile tests against persistent cloud instances safely.',
            },
            {
              id: 'd',
              text: 'It forces all users to log in using fingerprint scanners.',
              isCorrect: false,
              explanation:
                'Incorrect. Hybrid profile governs database connectivity, not biometric hardware.',
            },
          ],
        },
      ],
    },
  ],
};
