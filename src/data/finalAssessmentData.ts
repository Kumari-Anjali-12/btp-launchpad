import { FinalAssessmentQuestion } from '../types/capstone';

export const FINAL_ASSESSMENT_PASSING_THRESHOLD = 75;
export const FINAL_ASSESSMENT_TOTAL_POINTS = 100;

export const FINAL_ASSESSMENT_QUESTIONS: FinalAssessmentQuestion[] = [
  // SECTION 1: TECHNICAL QUESTIONS (6 questions * 5 pts = 30 pts)
  {
    id: 'cds-assoc-comp',
    section: 'technical',
    sectionTitle: 'Section 1: Core Technical Foundations',
    title: 'CDS Associations vs Compositions',
    question: 'In SAP Cloud Application Programming Model (CAP) Core Data Services, what is the architectural difference between an Association and a Composition of many?',
    options: [
      'An Association creates a parent-child lifecycle ownership where child records are automatically deleted when the parent is deleted; a Composition is merely a loose unmanaged pointer.',
      'A Composition defines an existential document-part relationship with managed lifecycle and deep insert/delete semantics; an Association defines an independent relationship without lifecycle ownership.',
      'Associations are only supported on SAP HANA Cloud, whereas Compositions only work with SQLite in-memory databases.',
      'Compositions only allow 1-to-1 mappings, whereas Associations require manual SQL join tables for all cardinalities.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'In CAP CDS, a Composition signifies an existential parent-child ownership relationship (e.g., LeaveRequest with deep ApprovalLogs). Deleting or inserting the root document deep-cascades to the composition. An Association is a loosely coupled relationship to an independent target entity (like LeaveType or Employee).'
  },
  {
    id: 'cds-aspects',
    section: 'technical',
    sectionTitle: 'Section 1: Core Technical Foundations',
    title: 'Managed Aspects in CDS',
    question: 'When an entity definition extends the standard aspect `cuid` and `managed` from `@sap/cds/common`, what capabilities and fields are automatically provided?',
    options: [
      'Only an integer primary key named `ID` with auto-increment sequence.',
      'A UUID primary key `ID` plus four audit columns (`createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`) populated automatically by the CAP runtime.',
      'A database trigger that writes all updates directly to SAP Cloud Logging.',
      'A required foreign key relationship to the SAP SuccessFactors user directory.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'The `cuid` aspect provides a universal UUID primary key (`ID : UUID`), and `managed` automatically injects `createdAt`, `createdBy`, `modifiedAt`, and `modifiedBy` timestamps and user strings populated from request authentication context.'
  },
  {
    id: 'cds-handlers',
    section: 'technical',
    sectionTitle: 'Section 1: Core Technical Foundations',
    title: 'CAP Node.js Event Handler Phases',
    question: 'In a custom CAP Node.js service implementation, what is the key behavioral difference between registering a handler with `srv.before(...)` versus `srv.on(...)`?',
    options: [
      '`srv.before` executes validation and enrichment before the default persistence execution runs; `srv.on` replaces or provides the primary execution handler for the event unless `return next()` is explicitly invoked.',
      '`srv.before` runs asynchronously after the database commit, while `srv.on` runs before the HTTP request header is parsed.',
      '`srv.before` can only be used with OData V2, whereas `srv.on` is exclusive to OData V4.',
      '`srv.before` handles database rollbacks, whereas `srv.on` handles user session timeouts.'
    ],
    correctIndex: 0,
    points: 5,
    explanation: 'CAP handlers follow three lifecycle phases: `before` (pre-validation, data enrichment, permission pre-checks), `on` (the core worker/persistence provider; replacing default behavior unless `next()` is called), and `after` (post-processing, filtering, or formatting results).'
  },
  {
    id: 'cds-odata-draft',
    section: 'technical',
    sectionTitle: 'Section 1: Core Technical Foundations',
    title: 'OData Draft Specification Mechanics',
    question: 'When `@odata.draft.enabled` is applied to an entity projection in CAP, how does the runtime isolate in-progress user edits from active production data?',
    options: [
      'It creates an entirely separate physical database instance for each browser tab session.',
      'It creates twin draft tables (e.g., `_drafts`) where uncommitted edits reside with an `IsActiveEntity=false` flag until explicitly saved via the `activate` draft action.',
      'It stores all edits strictly in the browser local storage without contacting the server until final submission.',
      'It locks the entire database table preventing all other employees from viewing leave requests.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'CAP Draft choreography generates shadow draft tables with draft administrative data. Edits are saved on the server in draft state without affecting the active record or violating strict active entity constraints, enabling asynchronous editing, server-side validation, and cross-device continuation before activation.'
  },
  {
    id: 'cds-annotations',
    section: 'technical',
    sectionTitle: 'Section 1: Core Technical Foundations',
    title: 'Fiori Elements Vocabulary & UI Annotations',
    question: 'Which standard OData UI annotation is configured in `annotations.cds` to define the visible table columns in an SAP Fiori Elements List Report?',
    options: [
      '`UI.HeaderInfo`',
      '`UI.LineItem`',
      '`UI.Identification`',
      '`UI.SelectionFields`'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'The `UI.LineItem` annotation collection defines the columns and actions for list report tables in Fiori Elements. `UI.SelectionFields` defines filter bar fields, and `UI.HeaderInfo` defines the entity title and header presentation.'
  },
  {
    id: 'cds-odata-query',
    section: 'technical',
    sectionTitle: 'Section 1: Core Technical Foundations',
    title: 'OData V4 Server-Side Pagination & Sorting',
    question: 'Which combination of OData V4 query parameters is dispatched by SAP Fiori Elements to execute server-side pagination, sorting, and total count without fetching entire datasets?',
    options: [
      '`$limit`, `$offset`, and `$total`',
      '`$top`, `$skip`, `$orderby`, and `$count=true`',
      '`$page`, `$size`, and `$sort`',
      '`$cursor`, `$next`, and `$records`'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'Standard OData V4 uses `$top` (page size), `$skip` (offset), `$orderby` (column and direction), and `$count=true` (inline count of total matching records) for efficient database-level pagination.'
  },

  // SECTION 2: ARCHITECTURE EXPLANATION (5 questions * 5 pts = 25 pts)
  {
    id: 'arch-approuter',
    section: 'architecture',
    sectionTitle: 'Section 2: Enterprise Cloud Architecture',
    title: 'App Router Reverse Proxy Architecture',
    question: 'Why does an SAP BTP multi-target application place the `@sap/approuter` as the public single entry point instead of exposing the CAP Node.js service directly to the internet?',
    options: [
      'App Router is required solely to compress static CSS files and cannot handle dynamic routing.',
      'App Router serves as a central reverse proxy that enforces user authentication (XSUAA OAuth2 login flow), handles CSRF token protection, and prevents cross-origin resource sharing (CORS) issues by routing frontend and backend under the same origin.',
      'Direct internet exposure of CAP services requires special SAP licensing that App Router bypasses.',
      'CAP services cannot run on HTTP ports; App Router converts raw TCP sockets into HTTP requests.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'App Router is the standard SAP BTP microservice gateway: it terminates external SSL, initiates the OAuth2 redirect flow with XSUAA, holds the user session cookie, generates and validates CSRF tokens, and proxies backend calls with forwarded Bearer JWTs under a single origin.'
  },
  {
    id: 'arch-xsuaa-jwt',
    section: 'architecture',
    sectionTitle: 'Section 2: Enterprise Cloud Architecture',
    title: 'XSUAA JWT Validation Mechanics',
    question: 'When a request reaches the CAP service via the App Router, how does the CAP backend verify the authenticity and permissions of the caller?',
    options: [
      'By querying the user password from the SQLite database on each HTTP call.',
      'By cryptographically validating the digital signature of the incoming JWT against the public keys of the bound XSUAA instance and matching token scopes against `@requires` annotations.',
      'By calling an external LDAP server synchronously on every OData request.',
      'By checking the client IP address against a whitelist in `default-env.json`.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'The CAP runtime uses `@sap/xssec` / `@cap-js/jwt` to verify the RSA signature and expiration of the Bearer JWT using public keys published by the tenant XSUAA authentication broker, mapping JWT `xs.system.attributes` and scopes to CAP roles.'
  },
  {
    id: 'arch-hdi-deploy',
    section: 'architecture',
    sectionTitle: 'Section 2: Enterprise Cloud Architecture',
    title: 'SAP HANA HDI Container Deployment',
    question: 'What is the role of the `@sap/hdi-deploy` tool when deploying the database module of a CAP application to SAP HANA Cloud?',
    options: [
      'It formats the hard drive of the Cloud Foundry virtual machine.',
      'It acts as the HANA Deployment Infrastructure (HDI) client, comparing local catalog artifacts (.hdbtable, .hdbview, synonyms) against the target HDI container catalog and executing transactional, delta-based schema migrations.',
      'It converts SAP HANA database tables into MongoDB collections for backup purposes.',
      'It generates mock mockdata in SQLite for test automation.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: '@sap/hdi-deploy is the Node.js application deployed in the db module. It communicates with the HDI container service broker to automatically generate and adjust database tables, views, and schemas using declarative delta computation without dropping production data.'
  },
  {
    id: 'arch-mta-deployment',
    section: 'architecture',
    sectionTitle: 'Section 2: Enterprise Cloud Architecture',
    title: 'Multi-Target Application (MTA) Dependency Resolution',
    question: 'In an `mta.yaml` deployment descriptor, what is the functional significance of the `requires` stanza declared on an application module?',
    options: [
      'It lists the third-party npm packages that must be downloaded from npmjs.org during build.',
      'It declares structural dependencies on backing service resources (such as XSUAA, HDI, or Destination service) that Cloud Foundry must bind to the module container during deployment.',
      'It specifies the minimum CPU clock speed required on the physical host machine.',
      'It locks the Git repository branch so no other developer can commit code.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'In MTA descriptors, `modules` require `resources`. During Cloud Foundry deployment via `cf deploy`, the MultiApps deployer ensures that all required services exist, binds their credentials into the module’s `VCAP_SERVICES` environment, and provides injected routing parameters.'
  },
  {
    id: 'arch-service-layering',
    section: 'architecture',
    sectionTitle: 'Section 2: Enterprise Cloud Architecture',
    title: 'CAP Architectural Layering & Service Projections',
    question: 'Why does an enterprise CAP solution separate database entities in `db/` from service projections in `srv/` (e.g., LeaveService, ManagerService, AdminService)?',
    options: [
      'Because CAP cannot compile `.cds` files if they are in the same directory.',
      'To enforce the principle of least privilege, encapsulation, and role-tailored domain boundaries, exposing only the exact fields and operations relevant to a specific user persona without exposing internal schema structures.',
      'To force the frontend to execute separate HTTP requests for every individual database table.',
      'Because Node.js only supports a single OData entity per JavaScript file.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'Separating domain persistence (`db/schema.cds`) from specialized projections (`srv/*.cds`) is a core CAP pattern. It allows granular role-based authorization, prevents accidental exposure of sensitive employee attributes, and enables specialized actions per persona.'
  },

  // SECTION 3: DEBUGGING TASK (5 questions * 5 pts = 25 pts)
  {
    id: 'debug-auth-gate',
    section: 'debugging',
    sectionTitle: 'Section 3: Practical Debugging & Security Analysis',
    title: 'CRITICAL SECURITY GATE: Broken Object-Level Authorization (BOLA)',
    question: 'CRITICAL SECURITY GATE: A security audit discovers that an employee with the `LeaveEmployee` role can submit an HTTP POST directly to `/odata/v4/manager/approveRequest` and successfully approve their peer’s leave request. What architectural deficiency permitted this exploit, and what is the mandatory fix?',
    options: [
      'The App Router had a broken CSS route; the fix is to reinstall `@sap/approuter`.',
      'The service definition lacked `@requires: \'LeaveManager\'` authorization restriction and the Node.js action handler failed to verify user role authorization; the mandatory fix is applying `@requires: \'LeaveManager\'` on `ManagerService` and verifying role/team boundaries in the handler.',
      'The SQLite in-memory database had corrupted indexes; the fix is running `cds deploy --to sqlite`.',
      'The employee had an outdated web browser cache; the fix is performing a hard browser refresh.'
    ],
    correctIndex: 1,
    points: 5,
    isCriticalGate: true,
    gateDescription: 'Critical Security Gate 1: Role-Based Access Control and Authorization Enforcement. In enterprise software, failing to enforce RBAC allows horizontal and vertical privilege escalation, causing severe data security breaches.',
    explanation: 'This is Broken Object-Level Authorization (OWASP API 1). Enterprise CAP services must enforce declarative security annotations (`@(requires: \'LeaveManager\')`) at the CDS service/entity level, backed by imperative verification in Node.js event handlers ensuring caller identity and managerial scope.'
  },
  {
    id: 'debug-sqlite-hana',
    section: 'debugging',
    sectionTitle: 'Section 3: Practical Debugging & Security Analysis',
    title: 'Database Portability: SQLite vs SAP HANA',
    question: 'A CAP developer writes custom SQL inside a handler: `SELECT DATE(\'now\') - DATE(startDate)`. It passes in local SQLite testing, but crashes immediately with a syntax error when deployed to SAP HANA Cloud. What is the cause?',
    options: [
      'SAP HANA Cloud does not support dates or timestamps.',
      'SQLite-specific date syntax was used instead of portable CDS Query Language (CQL) constructs or standard HANA SQL functions (such as `DAYS_BETWEEN(startDate, CURRENT_DATE)`).',
      'The HANA HDI container was created in a read-only datacenter region.',
      'Node.js cannot send SQL strings to SAP HANA.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'Writing dialect-specific raw SQL breaks database portability. CAP applications must use portable CDS Query Language (CQL) or runtime-agnostic helpers, or use database-specific dialect functions like `DAYS_BETWEEN` for HANA.'
  },
  {
    id: 'debug-async-exceptions',
    section: 'debugging',
    sectionTitle: 'Section 3: Practical Debugging & Security Analysis',
    title: 'Asynchronous Error Propagation in Event Handlers',
    question: 'In a CAP handler, a developer performs an asynchronous database check: `req.on(\'CREATE\', async (req) => { setTimeout(() => { if (invalid) req.error(400, \'Error\'); }, 100); });`. What defect does this introduce?',
    options: [
      'It causes the server CPU to overheat.',
      'The asynchronous timer fires after the handler execution stack has already returned and closed the response, resulting in unhandled exceptions and silent failure of the validation check.',
      'It forces SQLite to convert all numbers to floating points.',
      'It automatically converts the request into an OData V2 call.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'CAP request lifecycles are asynchronous and promise-driven. Code detached from the request promise chain (e.g. unawaited callbacks or `setTimeout`) will not pause the execution pipeline, causing the default handler to complete and persist invalid records.'
  },
  {
    id: 'debug-draft-activation',
    section: 'debugging',
    sectionTitle: 'Section 3: Practical Debugging & Security Analysis',
    title: 'Draft Activation Conflict (HTTP 409 / 412)',
    question: 'If user Alice opens a leave request draft and holds it open for 20 minutes, while user Bob updates and saves the active record directly in the backend, what occurs when Alice clicks \'Save\' (Activate)?',
    options: [
      'Bob’s changes are silently overwritten without warning.',
      'CAP draft choreography detects an optimistic locking conflict via ETag / modifiedAt timestamps and returns an HTTP 412 Precondition Failed or HTTP 409 Conflict error, preventing silent overwrites.',
      'The entire database resets to the state from 20 minutes ago.',
      'Alice’s draft is emailed to Bob as a PDF attachment.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'Draft entities automatically track ETag version hashes and `modifiedAt` timestamps. If the active entity changes while a draft is open, CAP draft activation rejects the stale draft to prevent dirty writes.'
  },
  {
    id: 'debug-event-emitter',
    section: 'debugging',
    sectionTitle: 'Section 3: Practical Debugging & Security Analysis',
    title: 'Node.js Memory Leak Prevention in Handlers',
    question: 'Why is it an anti-pattern to call `srv.on(...)` or `cds.on(...)` inside an individual request handler closure (e.g., inside another `srv.before(\'READ\', ...)` callback)?',
    options: [
      'Because JavaScript does not allow nested function declarations.',
      'Because each incoming request would register a new permanent event listener on the service singleton, resulting in exponential handler execution duplication and progressive Node.js heap memory exhaustion.',
      'Because SAP BTP automatically restarts any container with nested callbacks.',
      'Because the browser console will display an HTTP 404 error.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'Service handlers are singletons in CAP. Registering listeners inside request callbacks causes a listener leak: every request accumulates more listeners, leading to `MaxListenersExceededWarning`, memory leaks, and duplicate execution.'
  },

  // SECTION 4: PRACTICAL BUSINESS WORKFLOW (4 questions * 5 pts = 20 pts)
  {
    id: 'wf-acid-gate',
    section: 'workflow',
    sectionTitle: 'Section 4: Enterprise Workflow & Data Integrity',
    title: 'CRITICAL DATA-INTEGRITY GATE: ACID Transaction Safety & Rollback',
    question: 'CRITICAL DATA-INTEGRITY GATE: A manager approves an employee’s 10-day vacation request. The service deducts 10 days from `LeaveBalances`, but immediately after, writing the audit entry to `ApprovalLogs` fails due to a database constraint violation. How must the CAP backend execute these operations to prevent corrupted leave balances?',
    options: [
      'Leave the 10 days deducted and print an error message in the console.',
      'Execute both the balance deduction and the audit log insertion inside a single atomic database transaction (`cds.tx(req)`), ensuring that any failure automatically rolls back the entire transaction, restoring the original balance without side-effects.',
      'Write the remaining days into a temporary text file on the local file system.',
      'Send an automated email asking the employee to manually calculate their remaining days.'
    ],
    correctIndex: 1,
    points: 5,
    isCriticalGate: true,
    gateDescription: 'Critical Data-Integrity Gate 2: ACID Transaction Atomicity. Financial and human resource ledgers must maintain absolute consistency. Partial updates without transactional rollback corrupt enterprise data records.',
    explanation: 'All multi-entity mutations that depend on each other (leave balance deduction + approval log creation + status change) must be executed inside a single atomic `cds.tx` unit of work. If any step fails, the entire transaction is rolled back by the database engine.'
  },
  {
    id: 'wf-state-machine',
    section: 'workflow',
    sectionTitle: 'Section 4: Enterprise Workflow & Data Integrity',
    title: 'Leave Request State Machine Transitions',
    question: 'In the Leave Management lifecycle, which transition sequence represents a valid, legally and mathematically sound state progression?',
    options: [
      '`Approved` -> `Submitted` -> `Rejected` -> `Draft`',
      '`Submitted` -> `Approved` -> `Cancelled` (with balance refund restored to available days)',
      '`Rejected` -> `Approved` -> `Pending` -> `Cancelled`',
      '`Cancelled` -> `Approved` -> `Submitted`'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'A submitted request is evaluated by the manager. If approved, used days increase and available days decrease. If subsequently cancelled before commencement, the used days are deducted and available days are refunded transactionally.'
  },
  {
    id: 'wf-segregation-duties',
    section: 'workflow',
    sectionTitle: 'Section 4: Enterprise Workflow & Data Integrity',
    title: 'Segregation of Duties & Self-Approval Prevention',
    question: 'In enterprise compliance and governance frameworks, why must a manager be strictly prohibited from approving their own leave requests, and how is this enforced?',
    options: [
      'Managers do not get vacation days in SAP systems.',
      'To prevent conflicts of interest and maintain segregation of duties; the backend validates `req.user.id !== request.employee_ID` and returns HTTP 403 Forbidden if self-approval is attempted.',
      'Because managers must only submit paper forms to HR.',
      'Because XSUAA tokens cannot identify the manager’s user ID.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'Segregation of duties (SoD) is mandatory for enterprise compliance. A manager cannot approve their own requests. In `manager-service.js`, the action handler checks `isSelf = request.employee_ID === req.user.id` and immediately aborts with `req.reject(403, ...)`.'
  },
  {
    id: 'wf-cancellation-refund',
    section: 'workflow',
    sectionTitle: 'Section 4: Enterprise Workflow & Data Integrity',
    title: 'Approved Leave Cancellation Balance Refund Integrity',
    question: 'When an employee cancels a leave request that was already in `Approved` status, what mathematical adjustment must the backend transactionally perform on the employee’s `LeaveBalances` record?',
    options: [
      'No adjustment is made; approved days are forfeited permanently.',
      'Deduct the requested days from `usedDays` and add them back to `availableDays`, while leaving `entitledDays` unchanged.',
      'Double the `entitledDays` balance to compensate the employee.',
      'Delete the employee’s entire balance record from the database.'
    ],
    correctIndex: 1,
    points: 5,
    explanation: 'Approved leave consumed allowance (`usedDays += days; availableDays -= days`). Upon cancellation of an approved request, the operation must reverse this mathematically: `usedDays -= days; availableDays += days`, ensuring exact balance restoration.'
  }
];
