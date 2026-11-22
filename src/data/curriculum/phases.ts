import { SyllabusPhase } from '../../types/curriculum';
import { PHASE_CAPSTONES } from './capstones';

export const SYLLABUS_PHASES: SyllabusPhase[] = [
  {
    id: 'phase-0',
    number: 0,
    title: "Pre-learning",
    tagline: 'Phase 0 · Weeks 1-2 · ~30 Hours',
    description: "Read SAP and BTP documentation without stalling. By the end you can explain the SAP landscape, consume and write OData and REST calls, write asynchronous Node.js and TypeScript, use Git, the command line and Docker, and explain OAuth 2.0 and JWT validation.",
    coreObjective: "Read SAP and BTP documentation without stalling. By the end you can explain the SAP landscape, consume and write OData and REST calls, write asynchronous Node.js and TypeScript, use Git, the command line and Docker, and explain OAuth 2.0 and JWT validation.",
    estimatedHours: 30,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'pre-learning',
    capstone: PHASE_CAPSTONES[0]!,
    modules: [
      {
        id: 'mod-0-1',
        code: '0.1',
        phaseId: 'phase-0',
        title: "SAP World Basics",
        tagline: "Demystify Enterprise Cloud, ERP & Clean Core Architecture",
        summary: "Build a table mapping Odoo concepts to SAP concepts: apps to modules, models to tables or CDS entities, XML views to Fiori or UI5 views, server actions to event handlers or BAPIs. Mark any row you are unsure of. Draw Procure-to-Pay and Order-to-Cash as flow diagrams, labelling the document created and the data changed at each step. Open SAP Business Accelerator Hub, find a Business Partner or Purchase Order API, and record its base URL pattern, entity sets, and one sample payload. Write a one-page 'BTP versus S/4HANA' explanation in your own words. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["ERP concept: one integrated database and process layer across finance, procurement, sales, inventory, production and HR.", "Product map: SAP ECC (legacy ERP), SAP S/4HANA (current ERP suite), SAP HANA (in-memory column-store database), SAP Fiori (UX design system and launchpad), SAP BTP (platform for extending and integrating SAP systems).", "S/4HANA deployment options: Cloud Public Edition, Cloud Private Edition, on-premise.", "Functional areas and their classic codes: FI (Financial Accounting), CO (Controlling), MM (Materials Management), SD (Sales and Distribution), PP (Production Planning), QM (Quality Management), PM (Plant Maintenance), EWM (Extended Warehouse Management). Human resources lives mainly in SuccessFactors.", "End-to-end processes: Procure-to-Pay (purchase requisition, purchase order, goods receipt, invoice receipt, payment), Order-to-Cash (sales order, delivery, billing, payment), Plan-to-Produce, Record-to-Report.", "Data kinds: master data (material master, business partner, chart of accounts) versus transactional data (documents).", "Organisational units: client, company code, plant, storage location, sales organisation, purchasing organisation.", "Landscape and terms: development, quality and production systems, transports, tenants, T-codes, BAPI, IDoc, RFC, ABAP, CDS view, OData service, SAP Business Accelerator Hub.", "Clean core: why modifying standard SAP code makes upgrades painful, and the three extension styles (in-app key-user extensibility, developer extensibility in ABAP Cloud, side-by-side extensibility on BTP).", "BTP's four pillars: application development and automation, integration, data and analytics, AI.", "Required"],
        practicalImplementation: "Build a table mapping Odoo concepts to SAP concepts: apps to modules, models to tables or CDS entities, XML views to Fiori or UI5 views, server actions to event handlers or BAPIs. Mark any row you are unsure of. Draw Procure-to-Pay and Order-to-Cash as flow diagrams, labelling the document created and the data changed at each step. Open SAP Business Accelerator Hub, find a Business Partner or Purchase Order API, and record its base URL pattern, entity sets, and one sample payload. Write a one-page 'BTP versus S/4HANA' explanation in your own words. Verification /",
        masteryCheck: "Give a 2-minute spoken explanation of how BTP relates to S/4HANA to someone with no SAP background. Define 10 glossary terms from memory. Classify 8 given scenarios correctly as in-app extension, side-by-side extension, or a core modification to avoid.",
        learningObjectives: ["ERP concept: one integrated database and process layer across finance, procurement, sales, inventory, production and HR.", "Product map: SAP ECC (legacy ERP), SAP S/4HANA (current ERP suite), SAP HANA (in-memory column-store database), SAP Fiori (UX design system and launchpad), SAP BTP (platform for extending and integrating SAP systems).", "S/4HANA deployment options: Cloud Public Edition, Cloud Private Edition, on-premise.", "Functional areas and their classic codes: FI (Financial Accounting), CO (Controlling), MM (Materials Management), SD (Sales and Distribution), PP (Production Planning), QM (Quality Management), PM (Plant Maintenance), EWM (Extended Warehouse Management). Human resources lives mainly in SuccessFactors."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "ERP concept",
                    "explanation": "ERP concept: one integrated database and process layer across finance, procurement, sales, inventory, production and HR. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP World Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review ERP concept and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how ERP concept decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Product map",
                    "explanation": "Product map: SAP ECC (legacy ERP), SAP S/4HANA (current ERP suite), SAP HANA (in-memory column-store database), SAP Fiori (UX design system and launchpad), SAP BTP (platform for extending and integrating SAP systems). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP World Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Product map and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Product map decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "S/4HANA deployment options",
                    "explanation": "S/4HANA deployment options: Cloud Public Edition, Cloud Private Edition, on-premise. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP World Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review S/4HANA deployment options and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how S/4HANA deployment options decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Functional areas and their classic codes",
                    "explanation": "Functional areas and their classic codes: FI (Financial Accounting), CO (Controlling), MM (Materials Management), SD (Sales and Distribution), PP (Production Planning), QM (Quality Management), PM (Plant Maintenance), EWM (Extended Warehouse Management). Human resources lives mainly in SuccessFactors. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP World Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Functional areas and their classic codes and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Functional areas and their classic codes decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "End-to-end processes",
                    "explanation": "End-to-end processes: Procure-to-Pay (purchase requisition, purchase order, goods receipt, invoice receipt, payment), Order-to-Cash (sales order, delivery, billing, payment), Plan-to-Produce, Record-to-Report. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP World Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review End-to-end processes and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how End-to-end processes decouples application logic from underlying database schemas."
          }
],
        diagramType: 'erp-architecture',
        analogy: {
          concept: "SAP World Basics",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, SAP World Basics standardizes enterprise communication and data flow.',
          transition: 'Without standardized SAP World Basics, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "SAP World Basics provides core capabilities for SAP BTP applications, as defined in Module 0.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Build a table mapping Odoo concepts to SAP concepts: apps to modules, models to tables or CDS entities, XML views to Fiori or UI5 views, server actions to event handlers or BAPIs. Mark any row you are unsure of. Draw Procure-to-Pay and Order-to-Cash as flow diagrams, labelling the document created and the data changed at each step. Open SAP Business Accelerator Hub, find a Business Partner or Purchase Order API, and record its base URL pattern, entity sets, and one sample payload. Write a one-page 'BTP versus S/4HANA' explanation in your own words. Verification /",
          btpFit: "Give a 2-minute spoken explanation of how BTP relates to S/4HANA to someone with no SAP background. Define 10 glossary terms from memory. Classify 8 given scenarios correctly as in-app extension, side-by-side extension, or a core modification to avoid.",
        },
        jargonTerms: [
          {
            term: "ERP concept",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Product map",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "S/4HANA deployment options",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical SAP World Basics Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '0.1', title: 'SAP World Basics', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (SAP World Basics)',
          context: 'An international enterprise implements SAP World Basics to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for SAP World Basics.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-0-1-q1',
            question: 'What is the primary role of SAP World Basics in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-0-1-q2',
            question: 'According to the syllabus, how does SAP World Basics handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-0-1-q3',
            question: 'What is the required mastery outcome for Module 0.1 (SAP World Basics)?',
            options: [
              { id: 'a', text: "Give a 2-minute spoken explanation of how BTP relates to S/4HANA to someone with no SAP ba", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 0.1 establishes the core mechanics for SAP World Basics.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Build a table mapping Odoo concepts to SAP concepts: apps to modules, models to tables or CDS entities, XML views to Fiori or UI5 views, server actions to event handlers or BAPIs. Mark any row you are unsure of. Draw Procure-to-Pay and Order-to-Cash as flow diagrams, labelling the document created and the data changed at each step. Open SAP Business Accelerator Hub, find a Business Partner or Purchase Order API, and record its base URL pattern, entity sets, and one sample payload. Write a one-page 'BTP versus S/4HANA' explanation in your own words. Verification /"
      },
      {
        id: 'mod-0-2',
        code: '0.2',
        phaseId: 'phase-0',
        title: "API Basics",
        tagline: "Master HTTP, REST, JSON, and the OData v4 Protocol",
        summary: "Use the public TripPin OData sample service to read $metadata and list its entity sets and keys. Write 10 queries against it, covering select, filter, orderby, top, skip, count and expand. Build a Postman collection with a baseUrl environment variable and 5 requests, each with a test script asserting the status code and the JSON shape. Write one JSON document and its YAML equivalent. Introduce 3 deliberate syntax errors in each and read the parser messages. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["HTTP anatomy: method, URL, headers, body, status line.", "Methods: GET, POST, PUT, PATCH, DELETE, with safe versus idempotent behaviour.", "Status codes: 200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 409, 415, 422, 429, 500, 502, 503, 504.", "Headers: Content-Type, Accept, Authorization, Cache-Control, ETag, If-Match, Location, CORS headers.", "Transport and state: statelessness, HTTPS and TLS at concept level, cookies versus tokens.", "REST design: resources, URIs, representations, pagination, filtering, versioning.", "JSON and YAML: JSON types, nesting and syntax rules; YAML mappings, sequences, indentation, multi-line strings, comments. Both appear later in mta.yaml and manifest.yml.", "OData v4 structure: service root, $metadata, EntityType, EntitySet, key, NavigationProperty.", "OData v4 query options: $select, $filter, $orderby, $top, $skip, $count, $expand, $search.", "$filter syntax: the operators eq, ne, gt, ge, lt, le, and, or, not, and the functions contains, startswith, endswith.", "OData operations: create, update and delete via POST, PATCH and DELETE; actions versus functions; $batch.", "OData V2 versus V4: V2 is still common in S/4HANA APIs and UI5 models. Compare $inlinecount and $count, and the d.results JSON wrapper.", "Tools: Postman (collections, environments, variables, test scripts) and curl.", "Required"],
        practicalImplementation: "Use the public TripPin OData sample service to read $metadata and list its entity sets and keys. Write 10 queries against it, covering select, filter, orderby, top, skip, count and expand. Build a Postman collection with a baseUrl environment variable and 5 requests, each with a test script asserting the status code and the JSON shape. Write one JSON document and its YAML equivalent. Introduce 3 deliberate syntax errors in each and read the parser messages. Verification /",
        masteryCheck: "From a $metadata document, hand-write 5 correct URLs for 5 stated requirements. Classify 12 status-code scenarios correctly. Explain why PUT is idempotent and POST is not. Convert a nested JSON file to YAML and back with zero errors.",
        learningObjectives: ["HTTP anatomy: method, URL, headers, body, status line.", "Methods: GET, POST, PUT, PATCH, DELETE, with safe versus idempotent behaviour.", "Status codes: 200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 409, 415, 422, 429, 500, 502, 503, 504.", "Headers: Content-Type, Accept, Authorization, Cache-Control, ETag, If-Match, Location, CORS headers."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "HTTP anatomy",
                    "explanation": "HTTP anatomy: method, URL, headers, body, status line. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "API Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review HTTP anatomy and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how HTTP anatomy decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Methods",
                    "explanation": "Methods: GET, POST, PUT, PATCH, DELETE, with safe versus idempotent behaviour. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "API Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Methods and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Methods decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Status codes",
                    "explanation": "Status codes: 200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 409, 415, 422, 429, 500, 502, 503, 504. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "API Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Status codes and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Status codes decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Headers",
                    "explanation": "Headers: Content-Type, Accept, Authorization, Cache-Control, ETag, If-Match, Location, CORS headers. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "API Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Headers and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Headers decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Transport and state",
                    "explanation": "Transport and state: statelessness, HTTPS and TLS at concept level, cookies versus tokens. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "API Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Transport and state and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Transport and state decouples application logic from underlying database schemas."
          }
],
        diagramType: 'odata-flow',
        analogy: {
          concept: "API Basics",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, API Basics standardizes enterprise communication and data flow.',
          transition: 'Without standardized API Basics, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "API Basics provides core capabilities for SAP BTP applications, as defined in Module 0.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Use the public TripPin OData sample service to read $metadata and list its entity sets and keys. Write 10 queries against it, covering select, filter, orderby, top, skip, count and expand. Build a Postman collection with a baseUrl environment variable and 5 requests, each with a test script asserting the status code and the JSON shape. Write one JSON document and its YAML equivalent. Introduce 3 deliberate syntax errors in each and read the parser messages. Verification /",
          btpFit: "From a $metadata document, hand-write 5 correct URLs for 5 stated requirements. Classify 12 status-code scenarios correctly. Explain why PUT is idempotent and POST is not. Convert a nested JSON file to YAML and back with zero errors.",
        },
        jargonTerms: [
          {
            term: "HTTP anatomy",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Methods",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Status codes",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical API Basics Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '0.2', title: 'API Basics', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (API Basics)',
          context: 'An international enterprise implements API Basics to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for API Basics.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-0-2-q1',
            question: 'What is the primary role of API Basics in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-0-2-q2',
            question: 'According to the syllabus, how does API Basics handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-0-2-q3',
            question: 'What is the required mastery outcome for Module 0.2 (API Basics)?',
            options: [
              { id: 'a', text: "From a $metadata document, hand-write 5 correct URLs for 5 stated requirements. Classify 1", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 0.2 establishes the core mechanics for API Basics.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Use the public TripPin OData sample service to read $metadata and list its entity sets and keys. Write 10 queries against it, covering select, filter, orderby, top, skip, count and expand. Build a Postman collection with a baseUrl environment variable and 5 requests, each with a test script asserting the status code and the JSON shape. Write one JSON document and its YAML equivalent. Introduce 3 deliberate syntax errors in each and read the parser messages. Verification /"
      },
      {
        id: 'mod-0-3',
        code: '0.3',
        phaseId: 'phase-0',
        title: "JavaScript and Node.js",
        tagline: "Asynchronous Event Loop, Promises, and Node.js Fundamentals",
        summary: "Complete 20 small exercises, one per sub-topic above. Refactor one file-reading script from callbacks, to promises, to async/await. Write a script that fetches TripPin people with fetch, filters and prints them. Build an Express server with 3 routes, a request-logging middleware, and an error middleware. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Variables and types: var, let, const, hoisting, temporal dead zone; string, number, boolean, null, undefined, symbol, bigint; == versus ===; truthy and falsy values.", "Functions: declarations, expressions, arrow functions, closures, default, rest and spread parameters, this binding.", "Syntax features: destructuring, template literals.", "Arrays and objects: map, filter, reduce, find, some, every, forEach, sort; Object.keys, Object.values, Object.entries; JSON.parse and JSON.stringify.", "Modules: CommonJS (require, module.exports) versus ES modules (import, export).", "Event loop: call stack, task queue, microtask queue.", "Promises: pending, fulfilled, rejected; then, catch, finally; Promise.all, Promise.allSettled, Promise.race.", "Async code: async and await, try/catch, Error objects, custom error classes.", "Node.js runtime: process, process.env, fs/promises, path, the http module, global fetch.", "npm: package.json, dependencies versus devDependencies, scripts, package-lock.json, semver ranges, npx, node_modules.", "Express: routing, middleware order, request and response objects, error-handling middleware. CAP's Node runtime is built on Express.", "Required"],
        practicalImplementation: "Complete 20 small exercises, one per sub-topic above. Refactor one file-reading script from callbacks, to promises, to async/await. Write a script that fetches TripPin people with fetch, filters and prints them. Build an Express server with 3 routes, a request-logging middleware, and an error middleware. Verification /",
        masteryCheck: "Correctly predict the output order of a snippet mixing setTimeout, promises and synchronous logs. Deliver a CLI that takes a search term, fetches, and prints the top 5 results, handling network failure and a 404 without crashing.",
        learningObjectives: ["Variables and types: var, let, const, hoisting, temporal dead zone; string, number, boolean, null, undefined, symbol, bigint; == versus ===; truthy and falsy values.", "Functions: declarations, expressions, arrow functions, closures, default, rest and spread parameters, this binding.", "Syntax features: destructuring, template literals.", "Arrays and objects: map, filter, reduce, find, some, every, forEach, sort; Object.keys, Object.values, Object.entries; JSON.parse and JSON.stringify."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Variables and types",
                    "explanation": "Variables and types: var, let, const, hoisting, temporal dead zone; string, number, boolean, null, undefined, symbol, bigint; == versus ===; truthy and falsy values. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "JavaScript and Node.js enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Variables and types and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Variables and types decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Functions",
                    "explanation": "Functions: declarations, expressions, arrow functions, closures, default, rest and spread parameters, this binding. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "JavaScript and Node.js enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Functions and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Functions decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Syntax features",
                    "explanation": "Syntax features: destructuring, template literals. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "JavaScript and Node.js enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Syntax features and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Syntax features decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Arrays and objects",
                    "explanation": "Arrays and objects: map, filter, reduce, find, some, every, forEach, sort; Object.keys, Object.values, Object.entries; JSON.parse and JSON.stringify. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "JavaScript and Node.js enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Arrays and objects and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Arrays and objects decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Modules",
                    "explanation": "Modules: CommonJS (require, module.exports) versus ES modules (import, export). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "JavaScript and Node.js enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Modules and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Modules decouples application logic from underlying database schemas."
          }
],
        diagramType: 'event-handlers',
        analogy: {
          concept: "JavaScript and Node.js",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, JavaScript and Node.js standardizes enterprise communication and data flow.',
          transition: 'Without standardized JavaScript and Node.js, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "JavaScript and Node.js provides core capabilities for SAP BTP applications, as defined in Module 0.3.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Complete 20 small exercises, one per sub-topic above. Refactor one file-reading script from callbacks, to promises, to async/await. Write a script that fetches TripPin people with fetch, filters and prints them. Build an Express server with 3 routes, a request-logging middleware, and an error middleware. Verification /",
          btpFit: "Correctly predict the output order of a snippet mixing setTimeout, promises and synchronous logs. Deliver a CLI that takes a search term, fetches, and prints the top 5 results, handling network failure and a 404 without crashing.",
        },
        jargonTerms: [
          {
            term: "Variables and types",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Functions",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Syntax features",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical JavaScript and Node.js Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '0.3', title: 'JavaScript and Node.js', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (JavaScript and Node.js)',
          context: 'An international enterprise implements JavaScript and Node.js to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for JavaScript and Node.js.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-0-3-q1',
            question: 'What is the primary role of JavaScript and Node.js in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-0-3-q2',
            question: 'According to the syllabus, how does JavaScript and Node.js handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-0-3-q3',
            question: 'What is the required mastery outcome for Module 0.3 (JavaScript and Node.js)?',
            options: [
              { id: 'a', text: "Correctly predict the output order of a snippet mixing setTimeout, promises and synchronou", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 0.3 establishes the core mechanics for JavaScript and Node.js.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Complete 20 small exercises, one per sub-topic above. Refactor one file-reading script from callbacks, to promises, to async/await. Write a script that fetches TripPin people with fetch, filters and prints them. Build an Express server with 3 routes, a request-logging middleware, and an error middleware. Verification /"
      },
      {
        id: 'mod-0-4',
        code: '0.4',
        phaseId: 'phase-0',
        title: "TypeScript Basics",
        tagline: "Type Safety, Strict Contracts, and Typed API Integration",
        summary: "Convert your Module 0.3 CLI to TypeScript. Define interfaces for the TripPin response. Write a generic fetchJson<T> function. Turn on strict and fix every error without using any. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Core typing: why static typing, type annotations, inference, arrays, tuples, enums, union types, intersection types, literal types.", "Declarations: type aliases versus interfaces, optional properties, readonly.", "Safety: any versus unknown, narrowing (typeof, instanceof, in, discriminated unions), type assertions.", "Generics and async: generic functions and interfaces, Promise<T>.", "Configuration: tsconfig.json options target, module, strict, outDir, rootDir, esModuleInterop, sourceMap; @types declaration packages; compiling with tsc.", "Required"],
        practicalImplementation: "Convert your Module 0.3 CLI to TypeScript. Define interfaces for the TripPin response. Write a generic fetchJson<T> function. Turn on strict and fix every error without using any. Verification /",
        masteryCheck: "Compile with strict: true and zero errors. Explain unknown versus any with one code example.",
        learningObjectives: ["Core typing: why static typing, type annotations, inference, arrays, tuples, enums, union types, intersection types, literal types.", "Declarations: type aliases versus interfaces, optional properties, readonly.", "Safety: any versus unknown, narrowing (typeof, instanceof, in, discriminated unions), type assertions.", "Generics and async: generic functions and interfaces, Promise<T>."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Core typing",
                    "explanation": "Core typing: why static typing, type annotations, inference, arrays, tuples, enums, union types, intersection types, literal types. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "TypeScript Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Core typing and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Core typing decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Declarations",
                    "explanation": "Declarations: type aliases versus interfaces, optional properties, readonly. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "TypeScript Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Declarations and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Declarations decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Safety",
                    "explanation": "Safety: any versus unknown, narrowing (typeof, instanceof, in, discriminated unions), type assertions. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "TypeScript Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Safety and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Safety decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Generics and async",
                    "explanation": "Generics and async: generic functions and interfaces, Promise<T>. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "TypeScript Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Generics and async and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Generics and async decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Configuration",
                    "explanation": "Configuration: tsconfig.json options target, module, strict, outDir, rootDir, esModuleInterop, sourceMap; @types declaration packages; compiling with tsc. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "TypeScript Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Configuration and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Configuration decouples application logic from underlying database schemas."
          }
],
        diagramType: 'event-handlers',
        analogy: {
          concept: "TypeScript Basics",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, TypeScript Basics standardizes enterprise communication and data flow.',
          transition: 'Without standardized TypeScript Basics, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "TypeScript Basics provides core capabilities for SAP BTP applications, as defined in Module 0.4.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Convert your Module 0.3 CLI to TypeScript. Define interfaces for the TripPin response. Write a generic fetchJson<T> function. Turn on strict and fix every error without using any. Verification /",
          btpFit: "Compile with strict: true and zero errors. Explain unknown versus any with one code example.",
        },
        jargonTerms: [
          {
            term: "Core typing",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Declarations",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Safety",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical TypeScript Basics Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '0.4', title: 'TypeScript Basics', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (TypeScript Basics)',
          context: 'An international enterprise implements TypeScript Basics to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for TypeScript Basics.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-0-4-q1',
            question: 'What is the primary role of TypeScript Basics in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-0-4-q2',
            question: 'According to the syllabus, how does TypeScript Basics handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-0-4-q3',
            question: 'What is the required mastery outcome for Module 0.4 (TypeScript Basics)?',
            options: [
              { id: 'a', text: "Compile with strict: true and zero errors. Explain unknown versus any with one code exampl", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 0.4 establishes the core mechanics for TypeScript Basics.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Convert your Module 0.3 CLI to TypeScript. Define interfaces for the TripPin response. Write a generic fetchJson<T> function. Turn on strict and fix every error without using any. Verification /"
      },
      {
        id: 'mod-0-5',
        code: '0.5',
        phaseId: 'phase-0',
        title: "Dev Essentials",
        tagline: "Git Version Control, Command Line, and Docker Isolation",
        summary: "Create a GitHub repository with 3 branches, and deliberately create and resolve one merge conflict. Debug your Node script in VS Code using breakpoints and watch expressions. Write a Dockerfile for your Express app, build it, run it, and call it on a mapped port. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Git concepts: working tree, staging area, repository.", "Git commands: init, clone, status, add, commit, log, diff, branch, switch, merge, fetch, pull, push.", "Git workflow: .gitignore, feature branches, merge conflicts, commit message conventions, pull requests.", "Command line: pwd, ls, cd, mkdir, rm, cp, mv, cat, pipes, redirection, environment variables, PATH, and the PowerShell equivalents.", "VS Code: workspaces, extensions, integrated terminal, launch.json for Node debugging.", "Docker concepts: image versus container, layers, Dockerfile instructions FROM, RUN, COPY, CMD, EXPOSE, registries, port mapping, volumes, containers versus virtual machines.", "Docker commands: docker build, docker run, docker ps, docker logs, docker stop.", "Required"],
        practicalImplementation: "Create a GitHub repository with 3 branches, and deliberately create and resolve one merge conflict. Debug your Node script in VS Code using breakpoints and watch expressions. Write a Dockerfile for your Express app, build it, run it, and call it on a mapped port. Verification /",
        masteryCheck: "Go from an empty folder to a pushed repository with a README, entirely from memory, in under 10 minutes. Show the container answering on localhost.",
        learningObjectives: ["Git concepts: working tree, staging area, repository.", "Git commands: init, clone, status, add, commit, log, diff, branch, switch, merge, fetch, pull, push.", "Git workflow: .gitignore, feature branches, merge conflicts, commit message conventions, pull requests.", "Command line: pwd, ls, cd, mkdir, rm, cp, mv, cat, pipes, redirection, environment variables, PATH, and the PowerShell equivalents."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Git concepts",
                    "explanation": "Git concepts: working tree, staging area, repository. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Dev Essentials enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Git concepts and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Git concepts decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Git commands",
                    "explanation": "Git commands: init, clone, status, add, commit, log, diff, branch, switch, merge, fetch, pull, push. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Dev Essentials enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Git commands and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Git commands decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Git workflow",
                    "explanation": "Git workflow: .gitignore, feature branches, merge conflicts, commit message conventions, pull requests. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Dev Essentials enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Git workflow and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Git workflow decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Command line",
                    "explanation": "Command line: pwd, ls, cd, mkdir, rm, cp, mv, cat, pipes, redirection, environment variables, PATH, and the PowerShell equivalents. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Dev Essentials enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Command line and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Command line decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "VS Code",
                    "explanation": "VS Code: workspaces, extensions, integrated terminal, launch.json for Node debugging. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Dev Essentials enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review VS Code and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how VS Code decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cf-deployment',
        analogy: {
          concept: "Dev Essentials",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Dev Essentials standardizes enterprise communication and data flow.',
          transition: 'Without standardized Dev Essentials, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Dev Essentials provides core capabilities for SAP BTP applications, as defined in Module 0.5.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Create a GitHub repository with 3 branches, and deliberately create and resolve one merge conflict. Debug your Node script in VS Code using breakpoints and watch expressions. Write a Dockerfile for your Express app, build it, run it, and call it on a mapped port. Verification /",
          btpFit: "Go from an empty folder to a pushed repository with a README, entirely from memory, in under 10 minutes. Show the container answering on localhost.",
        },
        jargonTerms: [
          {
            term: "Git concepts",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Git commands",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Git workflow",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Dev Essentials Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '0.5', title: 'Dev Essentials', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Dev Essentials)',
          context: 'An international enterprise implements Dev Essentials to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Dev Essentials.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-0-5-q1',
            question: 'What is the primary role of Dev Essentials in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-0-5-q2',
            question: 'According to the syllabus, how does Dev Essentials handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-0-5-q3',
            question: 'What is the required mastery outcome for Module 0.5 (Dev Essentials)?',
            options: [
              { id: 'a', text: "Go from an empty folder to a pushed repository with a README, entirely from memory, in und", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 0.5 establishes the core mechanics for Dev Essentials.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Create a GitHub repository with 3 branches, and deliberately create and resolve one merge conflict. Debug your Node script in VS Code using breakpoints and watch expressions. Write a Dockerfile for your Express app, build it, run it, and call it on a mapped port. Verification /"
      },
      {
        id: 'mod-0-6',
        code: '0.6',
        phaseId: 'phase-0',
        title: "Auth Concepts",
        tagline: "OAuth 2.0 Grants, JWT Token Claims, and Authentication",
        summary: "Draw sequence diagrams for authorization code with PKCE and for client credentials. Decode a sample JWT locally with Node (Buffer.from(part, 'base64url')). Do not paste real tokens into online tools. Generate an RSA key pair with openssl. Write Express middleware using jsonwebtoken that rejects expired tokens, wrong audience and bad signatures. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Core ideas: authentication versus authorization, sessions versus tokens, password hashing at concept level, Basic authentication (Base64 is encoding, not encryption), API keys versus tokens.", "OAuth 2.0 roles: resource owner, client, authorization server, resource server.", "Grant types: authorization code with PKCE, client credentials, refresh token. The password and implicit grants are deprecated; know why.", "OAuth 2.0 mechanics: scopes, access token versus refresh token, authorization endpoint versus token endpoint.", "OpenID Connect: the ID token and how it differs from the access token.", "JWT structure: header, payload, signature, base64url encoding; claims iss, sub, aud, exp, iat, nbf, scope.", "JWT signing and validation: HS256 versus RS256, JWKS, and the validation steps (signature, issuer, audience, expiry).", "SSO and access models: SSO via SAML 2.0 and OIDC at awareness level, RBAC versus ABAC, least privilege, and CORS and CSRF at awareness level.", "Required"],
        practicalImplementation: "Draw sequence diagrams for authorization code with PKCE and for client credentials. Decode a sample JWT locally with Node (Buffer.from(part, 'base64url')). Do not paste real tokens into online tools. Generate an RSA key pair with openssl. Write Express middleware using jsonwebtoken that rejects expired tokens, wrong audience and bad signatures. Verification /",
        masteryCheck: "Given 3 tokens, correctly identify which is valid, which is expired, and which has the wrong audience, by reasoning and by code. Pick the right grant type for 6 scenarios.",
        learningObjectives: ["Core ideas: authentication versus authorization, sessions versus tokens, password hashing at concept level, Basic authentication (Base64 is encoding, not encryption), API keys versus tokens.", "OAuth 2.0 roles: resource owner, client, authorization server, resource server.", "Grant types: authorization code with PKCE, client credentials, refresh token. The password and implicit grants are deprecated; know why.", "OAuth 2.0 mechanics: scopes, access token versus refresh token, authorization endpoint versus token endpoint."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Core ideas",
                    "explanation": "Core ideas: authentication versus authorization, sessions versus tokens, password hashing at concept level, Basic authentication (Base64 is encoding, not encryption), API keys versus tokens. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Auth Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Core ideas and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Core ideas decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "OAuth 2.0 roles",
                    "explanation": "OAuth 2.0 roles: resource owner, client, authorization server, resource server. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Auth Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review OAuth 2.0 roles and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how OAuth 2.0 roles decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Grant types",
                    "explanation": "Grant types: authorization code with PKCE, client credentials, refresh token. The password and implicit grants are deprecated; know why. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Auth Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Grant types and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Grant types decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "OAuth 2.0 mechanics",
                    "explanation": "OAuth 2.0 mechanics: scopes, access token versus refresh token, authorization endpoint versus token endpoint. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Auth Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review OAuth 2.0 mechanics and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how OAuth 2.0 mechanics decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "OpenID Connect",
                    "explanation": "OpenID Connect: the ID token and how it differs from the access token. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Auth Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review OpenID Connect and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how OpenID Connect decouples application logic from underlying database schemas."
          }
],
        diagramType: 'xsuaa-oauth',
        analogy: {
          concept: "Auth Concepts",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Auth Concepts standardizes enterprise communication and data flow.',
          transition: 'Without standardized Auth Concepts, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Auth Concepts provides core capabilities for SAP BTP applications, as defined in Module 0.6.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Draw sequence diagrams for authorization code with PKCE and for client credentials. Decode a sample JWT locally with Node (Buffer.from(part, 'base64url')). Do not paste real tokens into online tools. Generate an RSA key pair with openssl. Write Express middleware using jsonwebtoken that rejects expired tokens, wrong audience and bad signatures. Verification /",
          btpFit: "Given 3 tokens, correctly identify which is valid, which is expired, and which has the wrong audience, by reasoning and by code. Pick the right grant type for 6 scenarios.",
        },
        jargonTerms: [
          {
            term: "Core ideas",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "OAuth 2.0 roles",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Grant types",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Auth Concepts Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '0.6', title: 'Auth Concepts', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Auth Concepts)',
          context: 'An international enterprise implements Auth Concepts to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Auth Concepts.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-0-6-q1',
            question: 'What is the primary role of Auth Concepts in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-0-6-q2',
            question: 'According to the syllabus, how does Auth Concepts handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-0-6-q3',
            question: 'What is the required mastery outcome for Module 0.6 (Auth Concepts)?',
            options: [
              { id: 'a', text: "Given 3 tokens, correctly identify which is valid, which is expired, and which has the wro", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 0.6 establishes the core mechanics for Auth Concepts.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Draw sequence diagrams for authorization code with PKCE and for client credentials. Decode a sample JWT locally with Node (Buffer.from(part, 'base64url')). Do not paste real tokens into online tools. Generate an RSA key pair with openssl. Write Express middleware using jsonwebtoken that rejects expired tokens, wrong audience and bad signatures. Verification /"
      },
    ]
  },
  {
    id: 'phase-1',
    number: 1,
    title: "BTP Foundations",
    tagline: 'Phase 1 · Weeks 1-2 · ~25 Hours',
    description: "Provision and organise a BTP trial, navigate the cockpit and both CLIs, manage entitlements and quotas, set up identity and role collections, and deploy a first Cloud Foundry app.",
    coreObjective: "Provision and organise a BTP trial, navigate the cockpit and both CLIs, manage entitlements and quotas, set up identity and role collections, and deploy a first Cloud Foundry app.",
    estimatedHours: 25,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'core',
    capstone: PHASE_CAPSTONES[1]!,
    modules: [
      {
        id: 'mod-1-1',
        code: '1.1',
        phaseId: 'phase-1',
        title: "Cloud Concepts",
        tagline: "IaaS vs PaaS vs SaaS and Cloud Shared Responsibility",
        summary: "Classify 10 named services as IaaS, PaaS or SaaS. Draw a shared-responsibility matrix with columns IaaS, PaaS, SaaS and rows hardware, network, OS, runtime, application, data, identity. Compare 3 BTP regions and justify one for a client in India, covering latency, data residency and service availability. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Service models: IaaS, PaaS, SaaS, FaaS, with one example of each.", "Deployment models: public, private and hybrid cloud.", "Tenancy: multi-tenancy versus single-tenancy.", "Geography: regions, availability zones, data residency.", "Responsibility: the shared responsibility model across IaaS, PaaS and SaaS.", "Operations and cost: elasticity, SLAs, and BTP commercial models (Cloud Platform Enterprise Agreement, pay-as-you-go, subscription).", "Infrastructure: BTP regions run on hyperscalers (AWS, Azure, Google Cloud) and other infrastructure providers.", "Required"],
        practicalImplementation: "Classify 10 named services as IaaS, PaaS or SaaS. Draw a shared-responsibility matrix with columns IaaS, PaaS, SaaS and rows hardware, network, OS, runtime, application, data, identity. Compare 3 BTP regions and justify one for a client in India, covering latency, data residency and service availability. Verification /",
        masteryCheck: "Explain the PaaS versus SaaS responsibility split, using BTP and S/4HANA Cloud as the examples.",
        learningObjectives: ["Service models: IaaS, PaaS, SaaS, FaaS, with one example of each.", "Deployment models: public, private and hybrid cloud.", "Tenancy: multi-tenancy versus single-tenancy.", "Geography: regions, availability zones, data residency."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Service models",
                    "explanation": "Service models: IaaS, PaaS, SaaS, FaaS, with one example of each. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Service models and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Service models decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Deployment models",
                    "explanation": "Deployment models: public, private and hybrid cloud. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Deployment models and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Deployment models decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Tenancy",
                    "explanation": "Tenancy: multi-tenancy versus single-tenancy. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Tenancy and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Tenancy decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Geography",
                    "explanation": "Geography: regions, availability zones, data residency. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Geography and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Geography decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Responsibility",
                    "explanation": "Responsibility: the shared responsibility model across IaaS, PaaS and SaaS. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Concepts enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Responsibility and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Responsibility decouples application logic from underlying database schemas."
          }
],
        diagramType: 'btp-hierarchy',
        analogy: {
          concept: "Cloud Concepts",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Cloud Concepts standardizes enterprise communication and data flow.',
          transition: 'Without standardized Cloud Concepts, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Cloud Concepts provides core capabilities for SAP BTP applications, as defined in Module 1.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Classify 10 named services as IaaS, PaaS or SaaS. Draw a shared-responsibility matrix with columns IaaS, PaaS, SaaS and rows hardware, network, OS, runtime, application, data, identity. Compare 3 BTP regions and justify one for a client in India, covering latency, data residency and service availability. Verification /",
          btpFit: "Explain the PaaS versus SaaS responsibility split, using BTP and S/4HANA Cloud as the examples.",
        },
        jargonTerms: [
          {
            term: "Service models",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Deployment models",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Tenancy",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Cloud Concepts Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '1.1', title: 'Cloud Concepts', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Cloud Concepts)',
          context: 'An international enterprise implements Cloud Concepts to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Cloud Concepts.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-1-1-q1',
            question: 'What is the primary role of Cloud Concepts in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-1-1-q2',
            question: 'According to the syllabus, how does Cloud Concepts handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-1-1-q3',
            question: 'What is the required mastery outcome for Module 1.1 (Cloud Concepts)?',
            options: [
              { id: 'a', text: "Explain the PaaS versus SaaS responsibility split, using BTP and S/4HANA Cloud as the exam", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 1.1 establishes the core mechanics for Cloud Concepts.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Classify 10 named services as IaaS, PaaS or SaaS. Draw a shared-responsibility matrix with columns IaaS, PaaS, SaaS and rows hardware, network, OS, runtime, application, data, identity. Compare 3 BTP regions and justify one for a client in India, covering latency, data residency and service availability. Verification /"
      },
      {
        id: 'mod-1-2',
        code: '1.2',
        phaseId: 'phase-1',
        title: "SAP BTP Overview",
        tagline: "BTP Multi-Cloud Account Architecture & Service Engines",
        summary: "Explore Discovery Center and record 5 services, noting the category, supported environments and plans. Design an account structure for a fictional company, with dev, test and production subaccounts under directories, and name everything. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Account hierarchy: global account, directories, subaccounts.", "Directories: optional grouping with entitlement management and authorizations.", "Subaccount contents: environments (Cloud Foundry, Kyma, ABAP), the Cloud Foundry org and its spaces, service instances, subscriptions to SaaS applications.", "Provisioning terms: service plans, entitlements versus quotas, subaccount subdomain and region, the 'used for production' flag.", "Catalogs: the Service Marketplace and SAP Discovery Center.", "Required"],
        practicalImplementation: "Explore Discovery Center and record 5 services, noting the category, supported environments and plans. Design an account structure for a fictional company, with dev, test and production subaccounts under directories, and name everything. Verification /",
        masteryCheck: "Draw the account hierarchy from memory, and correctly say where a service instance, a subscription, an entitlement and a Cloud Foundry space each live.",
        learningObjectives: ["Account hierarchy: global account, directories, subaccounts.", "Directories: optional grouping with entitlement management and authorizations.", "Subaccount contents: environments (Cloud Foundry, Kyma, ABAP), the Cloud Foundry org and its spaces, service instances, subscriptions to SaaS applications.", "Provisioning terms: service plans, entitlements versus quotas, subaccount subdomain and region, the 'used for production' flag."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Account hierarchy",
                    "explanation": "Account hierarchy: global account, directories, subaccounts. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP BTP Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Account hierarchy and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Account hierarchy decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Directories",
                    "explanation": "Directories: optional grouping with entitlement management and authorizations. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP BTP Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Directories and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Directories decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Subaccount contents",
                    "explanation": "Subaccount contents: environments (Cloud Foundry, Kyma, ABAP), the Cloud Foundry org and its spaces, service instances, subscriptions to SaaS applications. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP BTP Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Subaccount contents and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Subaccount contents decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Provisioning terms",
                    "explanation": "Provisioning terms: service plans, entitlements versus quotas, subaccount subdomain and region, the 'used for production' flag. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP BTP Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Provisioning terms and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Provisioning terms decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Catalogs",
                    "explanation": "Catalogs: the Service Marketplace and SAP Discovery Center. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP BTP Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Catalogs and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Catalogs decouples application logic from underlying database schemas."
          }
],
        diagramType: 'btp-hierarchy',
        analogy: {
          concept: "SAP BTP Overview",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, SAP BTP Overview standardizes enterprise communication and data flow.',
          transition: 'Without standardized SAP BTP Overview, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "SAP BTP Overview provides core capabilities for SAP BTP applications, as defined in Module 1.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Explore Discovery Center and record 5 services, noting the category, supported environments and plans. Design an account structure for a fictional company, with dev, test and production subaccounts under directories, and name everything. Verification /",
          btpFit: "Draw the account hierarchy from memory, and correctly say where a service instance, a subscription, an entitlement and a Cloud Foundry space each live.",
        },
        jargonTerms: [
          {
            term: "Account hierarchy",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Directories",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Subaccount contents",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical SAP BTP Overview Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '1.2', title: 'SAP BTP Overview', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (SAP BTP Overview)',
          context: 'An international enterprise implements SAP BTP Overview to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for SAP BTP Overview.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-1-2-q1',
            question: 'What is the primary role of SAP BTP Overview in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-1-2-q2',
            question: 'According to the syllabus, how does SAP BTP Overview handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-1-2-q3',
            question: 'What is the required mastery outcome for Module 1.2 (SAP BTP Overview)?',
            options: [
              { id: 'a', text: "Draw the account hierarchy from memory, and correctly say where a service instance, a subs", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 1.2 establishes the core mechanics for SAP BTP Overview.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Explore Discovery Center and record 5 services, noting the category, supported environments and plans. Design an account structure for a fictional company, with dev, test and production subaccounts under directories, and name everything. Verification /"
      },
      {
        id: 'mod-1-3',
        code: '1.3',
        phaseId: 'phase-1',
        title: "Account Navigation",
        tagline: "SAP BTP Cockpit Navigation, Regions, and Entitlements",
        summary: "Learn and master Account Navigation in enterprise SAP BTP environments.",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Cockpit areas: Account Explorer, Entitlements (Entity Assignments and Service Assignments), Subaccounts, Directories, Security, Service Marketplace, Instances and Subscriptions, Cloud Foundry, Connectivity, Usage and cost views.", "Subaccount creation: name, subdomain rules (lowercase letters, digits, hyphens), region.", "BTP CLI: btp login, btp list accounts/subaccount, btp create accounts/subaccount, btp assign accounts/entitlement.", "Cloud Foundry CLI: cf login -a <api-endpoint> --sso, cf target, cf orgs, cf spaces, cf marketplace, cf services, cf apps.", "Required Practical Implementation (do these one action at a time; labels may differ slightly):", "Open the cockpit and choose your global account.", "Open Account Explorer and screenshot the hierarchy.", "Open Entitlements \u2192 Entity Assignments, select your subaccount, and choose Configure Entitlements.", "Click Add Service Plans, select one service and plan, then Add, then Save.", "Open the subaccount Overview and copy the Cloud Foundry API endpoint.", "In a terminal, run cf login -a <endpoint> --sso and confirm with cf target.", "Repeat the subaccount creation and entitlement steps with the btp CLI.", "Verification /"],
        practicalImplementation: "Open the cockpit and choose your global account. Open Account Explorer and screenshot the hierarchy. Open Entitlements -> Entity Assignments, select your subaccount, and choose Configure Entitlements. Add Service Plans, copy the Cloud Foundry API endpoint, and execute cf login and btp CLI subaccount creation.",
        masteryCheck: "Create a subaccount, assign an entitlement, and log in to its Cloud Foundry space, all via the CLI, with no cockpit clicks, in under 15 minutes.",
        learningObjectives: ["Cockpit areas: Account Explorer, Entitlements (Entity Assignments and Service Assignments), Subaccounts, Directories, Security, Service Marketplace, Instances and Subscriptions, Cloud Foundry, Connectivity, Usage and cost views.", "Subaccount creation: name, subdomain rules (lowercase letters, digits, hyphens), region.", "BTP CLI: btp login, btp list accounts/subaccount, btp create accounts/subaccount, btp assign accounts/entitlement.", "Cloud Foundry CLI: cf login -a <api-endpoint> --sso, cf target, cf orgs, cf spaces, cf marketplace, cf services, cf apps."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Cockpit areas",
                    "explanation": "Cockpit areas: Account Explorer, Entitlements (Entity Assignments and Service Assignments), Subaccounts, Directories, Security, Service Marketplace, Instances and Subscriptions, Cloud Foundry, Connectivity, Usage and cost views. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Account Navigation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Cockpit areas and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Cockpit areas decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Subaccount creation",
                    "explanation": "Subaccount creation: name, subdomain rules (lowercase letters, digits, hyphens), region. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Account Navigation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Subaccount creation and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Subaccount creation decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "BTP CLI",
                    "explanation": "BTP CLI: btp login, btp list accounts/subaccount, btp create accounts/subaccount, btp assign accounts/entitlement. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Account Navigation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review BTP CLI and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how BTP CLI decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Cloud Foundry CLI",
                    "explanation": "Cloud Foundry CLI: cf login -a <api-endpoint> --sso, cf target, cf orgs, cf spaces, cf marketplace, cf services, cf apps. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Account Navigation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Cloud Foundry CLI and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Cloud Foundry CLI decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Required Practical Implementation (do th",
                    "explanation": "Required Practical Implementation (do these one action at a time; labels may differ slightly): This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Account Navigation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Required Practical Implementation (do these one action at a time; labels may differ slightly) and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Required Practical Implementation (do these one action at a time; labels may differ slightly) decouples application logic from underlying database schemas."
          }
],
        diagramType: 'btp-hierarchy',
        analogy: {
          concept: "Account Navigation",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Account Navigation standardizes enterprise communication and data flow.',
          transition: 'Without standardized Account Navigation, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Account Navigation provides core capabilities for SAP BTP applications, as defined in Module 1.3.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Operates through standard REST/OData protocols and managed cloud platform services.",
          btpFit: "Create a subaccount, assign an entitlement, and log in to its Cloud Foundry space, all via the CLI, with no cockpit clicks, in under 15 minutes.",
        },
        jargonTerms: [
          {
            term: "Cockpit areas",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Subaccount creation",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "BTP CLI",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Account Navigation Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '1.3', title: 'Account Navigation', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Account Navigation)',
          context: 'An international enterprise implements Account Navigation to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Account Navigation.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-1-3-q1',
            question: 'What is the primary role of Account Navigation in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-1-3-q2',
            question: 'According to the syllabus, how does Account Navigation handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-1-3-q3',
            question: 'What is the required mastery outcome for Module 1.3 (Account Navigation)?',
            options: [
              { id: 'a', text: "Create a subaccount, assign an entitlement, and log in to its Cloud Foundry space, all via", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 1.3 establishes the core mechanics for Account Navigation.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Implement the practical exercise for Account Navigation in the practice lab."
      },
      {
        id: 'mod-1-4',
        code: '1.4',
        phaseId: 'phase-1',
        title: "Identity and Access",
        tagline: "SAP Cloud Identity Services, User Groups & Role Collections",
        summary: "Inspect your subaccount's Security \u2192 Trust Configuration and record the default trust. Create a custom role collection and assign it to your user. Invite a second test user as Space Developer in your Cloud Foundry space, and compare what each user can and cannot do. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Identity providers: the default SAP ID service, SAP Cloud Identity Services (Identity Authentication and Identity Provisioning), custom IdP trust via SAML 2.0 or OIDC.", "User types: platform users (administer BTP) versus business users (use applications).", "Roles: scopes, role templates, roles, role collections, and assigning role collections to users or groups.", "Platform roles: subaccount administrator and viewer roles; Cloud Foundry org roles (Org Manager, Org Auditor, Billing Manager) and space roles (Space Manager, Space Developer, Space Auditor).", "Trust and access: trust configuration, user groups, SSO, and multi-factor authentication at concept level.", "Required"],
        practicalImplementation: "Inspect your subaccount's Security \u2192 Trust Configuration and record the default trust. Create a custom role collection and assign it to your user. Invite a second test user as Space Developer in your Cloud Foundry space, and compare what each user can and cannot do. Verification /",
        masteryCheck: "Explain in 5 sentences how a role collection reaches a user, and demonstrate a permission difference between two users.",
        learningObjectives: ["Identity providers: the default SAP ID service, SAP Cloud Identity Services (Identity Authentication and Identity Provisioning), custom IdP trust via SAML 2.0 or OIDC.", "User types: platform users (administer BTP) versus business users (use applications).", "Roles: scopes, role templates, roles, role collections, and assigning role collections to users or groups.", "Platform roles: subaccount administrator and viewer roles; Cloud Foundry org roles (Org Manager, Org Auditor, Billing Manager) and space roles (Space Manager, Space Developer, Space Auditor)."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Identity providers",
                    "explanation": "Identity providers: the default SAP ID service, SAP Cloud Identity Services (Identity Authentication and Identity Provisioning), custom IdP trust via SAML 2.0 or OIDC. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Identity and Access enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Identity providers and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Identity providers decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "User types",
                    "explanation": "User types: platform users (administer BTP) versus business users (use applications). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Identity and Access enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review User types and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how User types decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Roles",
                    "explanation": "Roles: scopes, role templates, roles, role collections, and assigning role collections to users or groups. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Identity and Access enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Roles and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Roles decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Platform roles",
                    "explanation": "Platform roles: subaccount administrator and viewer roles; Cloud Foundry org roles (Org Manager, Org Auditor, Billing Manager) and space roles (Space Manager, Space Developer, Space Auditor). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Identity and Access enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Platform roles and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Platform roles decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Trust and access",
                    "explanation": "Trust and access: trust configuration, user groups, SSO, and multi-factor authentication at concept level. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Identity and Access enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Trust and access and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Trust and access decouples application logic from underlying database schemas."
          }
],
        diagramType: 'xsuaa-oauth',
        analogy: {
          concept: "Identity and Access",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Identity and Access standardizes enterprise communication and data flow.',
          transition: 'Without standardized Identity and Access, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Identity and Access provides core capabilities for SAP BTP applications, as defined in Module 1.4.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Inspect your subaccount's Security \u2192 Trust Configuration and record the default trust. Create a custom role collection and assign it to your user. Invite a second test user as Space Developer in your Cloud Foundry space, and compare what each user can and cannot do. Verification /",
          btpFit: "Explain in 5 sentences how a role collection reaches a user, and demonstrate a permission difference between two users.",
        },
        jargonTerms: [
          {
            term: "Identity providers",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "User types",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Roles",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Identity and Access Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '1.4', title: 'Identity and Access', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Identity and Access)',
          context: 'An international enterprise implements Identity and Access to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Identity and Access.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-1-4-q1',
            question: 'What is the primary role of Identity and Access in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-1-4-q2',
            question: 'According to the syllabus, how does Identity and Access handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-1-4-q3',
            question: 'What is the required mastery outcome for Module 1.4 (Identity and Access)?',
            options: [
              { id: 'a', text: "Explain in 5 sentences how a role collection reaches a user, and demonstrate a permission ", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 1.4 establishes the core mechanics for Identity and Access.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Inspect your subaccount's Security \u2192 Trust Configuration and record the default trust. Create a custom role collection and assign it to your user. Invite a second test user as Space Developer in your Cloud Foundry space, and compare what each user can and cannot do. Verification /"
      },
      {
        id: 'mod-1-5',
        code: '1.5',
        phaseId: 'phase-1',
        title: "Cloud Foundry (only)",
        tagline: "Cloud Foundry Organizations, Spaces, Droplets & Routes",
        summary: "Write a manifest.yml for your Phase 0 Express app and run cf push. Bind it to one marketplace service instance available on your trial, and read the credentials from VCAP_SERVICES. Scale to 2 instances, then back to 1. Break the app on purpose by removing the start script, read the staging error with cf logs --recent, and fix it. Delete the app, route and service instance cleanly. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Core concepts: organization, space, application, buildpack (Node.js, Java, staticfile, Python), staging, droplet, route (domain, host, path).", "Services: service instance, service binding, service key, user-provided service, and the VCAP_SERVICES and VCAP_APPLICATION environment variables.", "manifest.yml fields: name, memory, disk_quota, instances, buildpacks, path, routes, services, env, health-check-type.", "Push lifecycle: upload, stage, start.", "Operations commands: cf push, cf logs --recent, cf env, cf scale, cf restart, cf restage, cf events, cf delete.", "Health checks: port, HTTP, and process.", "Required"],
        practicalImplementation: "Write a manifest.yml for your Phase 0 Express app and run cf push. Bind it to one marketplace service instance available on your trial, and read the credentials from VCAP_SERVICES. Scale to 2 instances, then back to 1. Break the app on purpose by removing the start script, read the staging error with cf logs --recent, and fix it. Delete the app, route and service instance cleanly. Verification /",
        masteryCheck: "Deploy the app from a clean folder in under 10 minutes, with its route and service binding working, and explain every field in your manifest.",
        learningObjectives: ["Core concepts: organization, space, application, buildpack (Node.js, Java, staticfile, Python), staging, droplet, route (domain, host, path).", "Services: service instance, service binding, service key, user-provided service, and the VCAP_SERVICES and VCAP_APPLICATION environment variables.", "manifest.yml fields: name, memory, disk_quota, instances, buildpacks, path, routes, services, env, health-check-type.", "Push lifecycle: upload, stage, start."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Core concepts",
                    "explanation": "Core concepts: organization, space, application, buildpack (Node.js, Java, staticfile, Python), staging, droplet, route (domain, host, path). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Foundry (only) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Core concepts and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Core concepts decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Services",
                    "explanation": "Services: service instance, service binding, service key, user-provided service, and the VCAP_SERVICES and VCAP_APPLICATION environment variables. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Foundry (only) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Services and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Services decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "manifest.yml fields",
                    "explanation": "manifest.yml fields: name, memory, disk_quota, instances, buildpacks, path, routes, services, env, health-check-type. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Foundry (only) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review manifest.yml fields and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how manifest.yml fields decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Push lifecycle",
                    "explanation": "Push lifecycle: upload, stage, start. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Foundry (only) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Push lifecycle and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Push lifecycle decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Operations commands",
                    "explanation": "Operations commands: cf push, cf logs --recent, cf env, cf scale, cf restart, cf restage, cf events, cf delete. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Cloud Foundry (only) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Operations commands and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Operations commands decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cf-deployment',
        analogy: {
          concept: "Cloud Foundry (only)",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Cloud Foundry (only) standardizes enterprise communication and data flow.',
          transition: 'Without standardized Cloud Foundry (only), enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Cloud Foundry (only) provides core capabilities for SAP BTP applications, as defined in Module 1.5.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Write a manifest.yml for your Phase 0 Express app and run cf push. Bind it to one marketplace service instance available on your trial, and read the credentials from VCAP_SERVICES. Scale to 2 instances, then back to 1. Break the app on purpose by removing the start script, read the staging error with cf logs --recent, and fix it. Delete the app, route and service instance cleanly. Verification /",
          btpFit: "Deploy the app from a clean folder in under 10 minutes, with its route and service binding working, and explain every field in your manifest.",
        },
        jargonTerms: [
          {
            term: "Core concepts",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Services",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "manifest.yml fields",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Cloud Foundry (only) Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '1.5', title: 'Cloud Foundry (only)', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Cloud Foundry (only))',
          context: 'An international enterprise implements Cloud Foundry (only) to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Cloud Foundry (only).',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-1-5-q1',
            question: 'What is the primary role of Cloud Foundry (only) in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-1-5-q2',
            question: 'According to the syllabus, how does Cloud Foundry (only) handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-1-5-q3',
            question: 'What is the required mastery outcome for Module 1.5 (Cloud Foundry (only))?',
            options: [
              { id: 'a', text: "Deploy the app from a clean folder in under 10 minutes, with its route and service binding", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 1.5 establishes the core mechanics for Cloud Foundry (only).',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Write a manifest.yml for your Phase 0 Express app and run cf push. Bind it to one marketplace service instance available on your trial, and read the credentials from VCAP_SERVICES. Scale to 2 instances, then back to 1. Break the app on purpose by removing the start script, read the staging error with cf logs --recent, and fix it. Delete the app, route and service instance cleanly. Verification /"
      },
    ]
  },
  {
    id: 'phase-2',
    number: 2,
    title: "Development Tools",
    tagline: 'Phase 2 · Weeks 1-2 · ~12 Hours',
    description: "Set up a repeatable cloud and local toolchain, scaffold a CAP project, run and debug it in both Business Application Studio and VS Code, and produce a deployable archive.",
    coreObjective: "Set up a repeatable cloud and local toolchain, scaffold a CAP project, run and debug it in both Business Application Studio and VS Code, and produce a deployable archive.",
    estimatedHours: 12,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'core',
    capstone: PHASE_CAPSTONES[2]!,
    modules: [
      {
        id: 'mod-2-1',
        code: '2.1',
        phaseId: 'phase-2',
        title: "Business Application Studio",
        tagline: "Cloud-Based IDE, Dev Spaces, and Run Configurations",
        summary: "Subscribe, assign the role collection, and create a Full-Stack Cloud Application dev space. Scaffold a project with cds init, add sample content, run it with cds watch, and open the service preview page. Add a small handler file in srv/, set a breakpoint in it, and hit it from a browser request. Clone your Phase 0 gateway repository into the dev space, make a change on a branch, and push. Stop the dev space, start it again, and confirm your files and terminal history persisted. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Access: subscribe to SAP Business Application Studio from the Service Marketplace (the trial uses the free plan), assign the Business Application Studio developer role collection to your user, and open it from Instances and Subscriptions.", "Dev space types: Full-Stack Cloud Application, SAP Fiori, SAP HANA Native Application, Basic. Verify the current list in the create-dev-space dialog, and note that extra tool extensions can be ticked per space.", "Dev space lifecycle: create, start, stop, delete. Trial dev spaces stop after inactivity and only a few can run at once. Verify the current limits.", "IDE areas: Explorer, Search, Source Control, Run and Debug, Extensions, Terminal, Problems panel, Command Palette, Settings.", "CAP project layout: app/ (UI), srv/ (services), db/ (data model), package.json, .cdsrc.json, mta.yaml, xs-security.json.", "Terminals and run configurations: cds watch in a terminal, package.json scripts, the Run Configurations view, exposing and opening a port in the browser.", "Debugging: breakpoints, conditional breakpoints, watch expressions, call stack, debug console, step over, step into, step out.", "Git in the IDE: clone from GitHub using a personal access token, stage, commit, push, branch switching.", "Required"],
        practicalImplementation: "Subscribe, assign the role collection, and create a Full-Stack Cloud Application dev space. Scaffold a project with cds init, add sample content, run it with cds watch, and open the service preview page. Add a small handler file in srv/, set a breakpoint in it, and hit it from a browser request. Clone your Phase 0 gateway repository into the dev space, make a change on a branch, and push. Stop the dev space, start it again, and confirm your files and terminal history persisted. Verification /",
        masteryCheck: "From a brand-new dev space, scaffold, run, hit a breakpoint and push a commit, all within 20 minutes and without notes.",
        learningObjectives: ["Access: subscribe to SAP Business Application Studio from the Service Marketplace (the trial uses the free plan), assign the Business Application Studio developer role collection to your user, and open it from Instances and Subscriptions.", "Dev space types: Full-Stack Cloud Application, SAP Fiori, SAP HANA Native Application, Basic. Verify the current list in the create-dev-space dialog, and note that extra tool extensions can be ticked per space.", "Dev space lifecycle: create, start, stop, delete. Trial dev spaces stop after inactivity and only a few can run at once. Verify the current limits.", "IDE areas: Explorer, Search, Source Control, Run and Debug, Extensions, Terminal, Problems panel, Command Palette, Settings."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Access",
                    "explanation": "Access: subscribe to SAP Business Application Studio from the Service Marketplace (the trial uses the free plan), assign the Business Application Studio developer role collection to your user, and open it from Instances and Subscriptions. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Business Application Studio enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Access and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Access decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Dev space types",
                    "explanation": "Dev space types: Full-Stack Cloud Application, SAP Fiori, SAP HANA Native Application, Basic. Verify the current list in the create-dev-space dialog, and note that extra tool extensions can be ticked per space. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Business Application Studio enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Dev space types and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Dev space types decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Dev space lifecycle",
                    "explanation": "Dev space lifecycle: create, start, stop, delete. Trial dev spaces stop after inactivity and only a few can run at once. Verify the current limits. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Business Application Studio enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Dev space lifecycle and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Dev space lifecycle decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "IDE areas",
                    "explanation": "IDE areas: Explorer, Search, Source Control, Run and Debug, Extensions, Terminal, Problems panel, Command Palette, Settings. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Business Application Studio enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review IDE areas and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how IDE areas decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "CAP project layout",
                    "explanation": "CAP project layout: app/ (UI), srv/ (services), db/ (data model), package.json, .cdsrc.json, mta.yaml, xs-security.json. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Business Application Studio enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review CAP project layout and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how CAP project layout decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cap-architecture',
        analogy: {
          concept: "Business Application Studio",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Business Application Studio standardizes enterprise communication and data flow.',
          transition: 'Without standardized Business Application Studio, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Business Application Studio provides core capabilities for SAP BTP applications, as defined in Module 2.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Subscribe, assign the role collection, and create a Full-Stack Cloud Application dev space. Scaffold a project with cds init, add sample content, run it with cds watch, and open the service preview page. Add a small handler file in srv/, set a breakpoint in it, and hit it from a browser request. Clone your Phase 0 gateway repository into the dev space, make a change on a branch, and push. Stop the dev space, start it again, and confirm your files and terminal history persisted. Verification /",
          btpFit: "From a brand-new dev space, scaffold, run, hit a breakpoint and push a commit, all within 20 minutes and without notes.",
        },
        jargonTerms: [
          {
            term: "Access",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Dev space types",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Dev space lifecycle",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Business Application Studio Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '2.1', title: 'Business Application Studio', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Business Application Studio)',
          context: 'An international enterprise implements Business Application Studio to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Business Application Studio.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-2-1-q1',
            question: 'What is the primary role of Business Application Studio in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-2-1-q2',
            question: 'According to the syllabus, how does Business Application Studio handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-2-1-q3',
            question: 'What is the required mastery outcome for Module 2.1 (Business Application Studio)?',
            options: [
              { id: 'a', text: "From a brand-new dev space, scaffold, run, hit a breakpoint and push a commit, all within ", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 2.1 establishes the core mechanics for Business Application Studio.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Subscribe, assign the role collection, and create a Full-Stack Cloud Application dev space. Scaffold a project with cds init, add sample content, run it with cds watch, and open the service preview page. Add a small handler file in srv/, set a breakpoint in it, and hit it from a browser request. Clone your Phase 0 gateway repository into the dev space, make a change on a branch, and push. Stop the dev space, start it again, and confirm your files and terminal history persisted. Verification /"
      },
      {
        id: 'mod-2-2',
        code: '2.2',
        phaseId: 'phase-2',
        title: "Local Tooling",
        tagline: "Local Node.js Tooling, @sap/cds-dk CLI, and MTA Build Tool",
        summary: "Install every tool above and record each --version output in a table. Recreate the Module 2.1 project locally in VS Code, run it with cds watch, and debug it using the JavaScript Debug Terminal. Run cds compile srv --to sql and cds compile srv --to edmx, then compare the EDMX with the service's $metadata. Run cds add hana,xsuaa,mta on the project, then mbt build to produce an .mtar without deploying it. Write a docs/setup.md that someone else could follow. Verification /",
        estimatedMinutes: 35,
        level: 'Beginner',
        subtopics: ["Node.js: use a current LTS version that the CAP release notes list as supported, manage versions with nvm (or nvm-windows), and check with node -v and npm -v.", "CAP dev kit: npm i -g @sap/cds-dk, cds -v, cds help, and keeping it updated.", "CAP commands: cds init, cds add (features hana, xsuaa, mta, approuter, html5-repo), cds watch, cds serve, cds compile, cds build, cds deploy, cds repl, cds env.", "Cloud Foundry CLI: cf login, cf api, and the multiapps plugin installed with cf install-plugin multiapps, which provides cf deploy.", "MTA Build Tool: install with npm i -g mbt, build with mbt build, and install make on Windows through a package manager.", "UI5 tooling: @ui5/cli, ui5 serve, ui5 build.", "VS Code extensions: SAP CDS Language Support, SAP Fiori tools (Application Generator, Application Modeler, Guided Development), and a REST client.", "Hybrid testing: cds bind to bind a local run to cloud service instances, and .cdsrc-private.json for local-only settings.", "Repository hygiene: .gitignore entries for node_modules, gen, mta_archives, and any file holding credentials.", "Required"],
        practicalImplementation: "Install every tool above and record each --version output in a table. Recreate the Module 2.1 project locally in VS Code, run it with cds watch, and debug it using the JavaScript Debug Terminal. Run cds compile srv --to sql and cds compile srv --to edmx, then compare the EDMX with the service's $metadata. Run cds add hana,xsuaa,mta on the project, then mbt build to produce an .mtar without deploying it. Write a docs/setup.md that someone else could follow. Verification /",
        masteryCheck: "On a clean machine, VM or fresh dev space, follow only your own setup.md and reach a running cds watch plus a built .mtar in 30 minutes, with no edits to the guide.",
        learningObjectives: ["Node.js: use a current LTS version that the CAP release notes list as supported, manage versions with nvm (or nvm-windows), and check with node -v and npm -v.", "CAP dev kit: npm i -g @sap/cds-dk, cds -v, cds help, and keeping it updated.", "CAP commands: cds init, cds add (features hana, xsuaa, mta, approuter, html5-repo), cds watch, cds serve, cds compile, cds build, cds deploy, cds repl, cds env.", "Cloud Foundry CLI: cf login, cf api, and the multiapps plugin installed with cf install-plugin multiapps, which provides cf deploy."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Node.js",
                    "explanation": "Node.js: use a current LTS version that the CAP release notes list as supported, manage versions with nvm (or nvm-windows), and check with node -v and npm -v. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Local Tooling enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Node.js and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Node.js decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "CAP dev kit",
                    "explanation": "CAP dev kit: npm i -g @sap/cds-dk, cds -v, cds help, and keeping it updated. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Local Tooling enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review CAP dev kit and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how CAP dev kit decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "CAP commands",
                    "explanation": "CAP commands: cds init, cds add (features hana, xsuaa, mta, approuter, html5-repo), cds watch, cds serve, cds compile, cds build, cds deploy, cds repl, cds env. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Local Tooling enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review CAP commands and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how CAP commands decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Cloud Foundry CLI",
                    "explanation": "Cloud Foundry CLI: cf login, cf api, and the multiapps plugin installed with cf install-plugin multiapps, which provides cf deploy. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Local Tooling enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Cloud Foundry CLI and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Cloud Foundry CLI decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "MTA Build Tool",
                    "explanation": "MTA Build Tool: install with npm i -g mbt, build with mbt build, and install make on Windows through a package manager. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Local Tooling enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review MTA Build Tool and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how MTA Build Tool decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cap-architecture',
        analogy: {
          concept: "Local Tooling",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Local Tooling standardizes enterprise communication and data flow.',
          transition: 'Without standardized Local Tooling, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Local Tooling provides core capabilities for SAP BTP applications, as defined in Module 2.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Install every tool above and record each --version output in a table. Recreate the Module 2.1 project locally in VS Code, run it with cds watch, and debug it using the JavaScript Debug Terminal. Run cds compile srv --to sql and cds compile srv --to edmx, then compare the EDMX with the service's $metadata. Run cds add hana,xsuaa,mta on the project, then mbt build to produce an .mtar without deploying it. Write a docs/setup.md that someone else could follow. Verification /",
          btpFit: "On a clean machine, VM or fresh dev space, follow only your own setup.md and reach a running cds watch plus a built .mtar in 30 minutes, with no edits to the guide.",
        },
        jargonTerms: [
          {
            term: "Node.js",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "CAP dev kit",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "CAP commands",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Local Tooling Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '2.2', title: 'Local Tooling', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Local Tooling)',
          context: 'An international enterprise implements Local Tooling to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Local Tooling.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-2-2-q1',
            question: 'What is the primary role of Local Tooling in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-2-2-q2',
            question: 'According to the syllabus, how does Local Tooling handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-2-2-q3',
            question: 'What is the required mastery outcome for Module 2.2 (Local Tooling)?',
            options: [
              { id: 'a', text: "On a clean machine, VM or fresh dev space, follow only your own setup.md and reach a runni", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 2.2 establishes the core mechanics for Local Tooling.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Install every tool above and record each --version output in a table. Recreate the Module 2.1 project locally in VS Code, run it with cds watch, and debug it using the JavaScript Debug Terminal. Run cds compile srv --to sql and cds compile srv --to edmx, then compare the EDMX with the service's $metadata. Run cds add hana,xsuaa,mta on the project, then mbt build to produce an .mtar without deploying it. Write a docs/setup.md that someone else could follow. Verification /"
      },
    ]
  },
  {
    id: 'phase-3',
    number: 3,
    title: "CAP Development (the heart)",
    tagline: 'Phase 3 · Weeks 1-2 · ~40 Hours',
    description: "Model a domain in CDS, expose it as OData services, implement validation and business logic in Node.js handlers, persist data in SQLite for development and SAP HANA Cloud for the cloud, and test it automatically.",
    coreObjective: "Model a domain in CDS, expose it as OData services, implement validation and business logic in Node.js handlers, persist data in SQLite for development and SAP HANA Cloud for the cloud, and test it automatically.",
    estimatedHours: 40,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'core',
    capstone: PHASE_CAPSTONES[3]!,
    modules: [
      {
        id: 'mod-3-1',
        code: '3.1',
        phaseId: 'phase-3',
        title: "CAP Fundamentals",
        tagline: "Core Data Services (CDS), Entity Projections, and Services",
        summary: "Model a 5-entity domain of your choice (for example Suppliers, Products, Orders, OrderItems, Forecasts) with at least one managed association, one composition, one enum and cuid plus managed. Expose it through two services: an admin service with full access and a read-only catalog service using projections. Add a view that aggregates data, such as order totals per supplier. Run cds compile to SQL and to EDMX for each service and read the output. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["CAP idea: domain-driven model, services as the API layer, framework generating OData, persistence and runtime behaviour from the model.", "File and namespace basics: namespace, using ... from, one concept per file, db/schema.cds versus srv/*.cds.", "Types and elements: built-in types (String, Integer, Decimal, Boolean, Date, Time, DateTime, Timestamp, UUID, LargeString), custom type definitions, enums, key, not null, default.", "Reuse: the cuid and managed aspects and Countries, Currencies, Languages from @sap/cds/common; your own aspect definitions; extend and annotate.", "Associations: Association to, Association to many, managed associations and their generated foreign keys, Composition of many and Composition of one for parent-child lifecycles, and the difference between association and composition.", "Special elements: localized elements and generated _texts entities, virtual elements, calculated elements, and @cds.persistence.skip.", "Services: service definitions, exposing entities with as projection on, @readonly, @insertonly, @odata.draft.enabled, and redirected to for composition targets.", "Projections and views: as select from, { * }, excluding, renamed elements, path expressions, where, group by, join basics.", "Annotations basics: @title, @mandatory, @assert.range, @assert.format, @assert.target.", "Required"],
        practicalImplementation: "Model a 5-entity domain of your choice (for example Suppliers, Products, Orders, OrderItems, Forecasts) with at least one managed association, one composition, one enum and cuid plus managed. Expose it through two services: an admin service with full access and a read-only catalog service using projections. Add a view that aggregates data, such as order totals per supplier. Run cds compile to SQL and to EDMX for each service and read the output. Verification /",
        masteryCheck: "Predict from your CDS file the foreign key column names, the tables generated and the entity sets exposed, then confirm with cds compile. Explain composition versus association with one deletion example.",
        learningObjectives: ["CAP idea: domain-driven model, services as the API layer, framework generating OData, persistence and runtime behaviour from the model.", "File and namespace basics: namespace, using ... from, one concept per file, db/schema.cds versus srv/*.cds.", "Types and elements: built-in types (String, Integer, Decimal, Boolean, Date, Time, DateTime, Timestamp, UUID, LargeString), custom type definitions, enums, key, not null, default.", "Reuse: the cuid and managed aspects and Countries, Currencies, Languages from @sap/cds/common; your own aspect definitions; extend and annotate."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "CAP idea",
                    "explanation": "CAP idea: domain-driven model, services as the API layer, framework generating OData, persistence and runtime behaviour from the model. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CAP Fundamentals enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review CAP idea and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how CAP idea decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "File and namespace basics",
                    "explanation": "File and namespace basics: namespace, using ... from, one concept per file, db/schema.cds versus srv/*.cds. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CAP Fundamentals enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review File and namespace basics and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how File and namespace basics decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Types and elements",
                    "explanation": "Types and elements: built-in types (String, Integer, Decimal, Boolean, Date, Time, DateTime, Timestamp, UUID, LargeString), custom type definitions, enums, key, not null, default. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CAP Fundamentals enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Types and elements and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Types and elements decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Reuse",
                    "explanation": "Reuse: the cuid and managed aspects and Countries, Currencies, Languages from @sap/cds/common; your own aspect definitions; extend and annotate. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CAP Fundamentals enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Reuse and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Reuse decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Associations",
                    "explanation": "Associations: Association to, Association to many, managed associations and their generated foreign keys, Composition of many and Composition of one for parent-child lifecycles, and the difference between association and composition. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CAP Fundamentals enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Associations and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Associations decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cap-architecture',
        analogy: {
          concept: "CAP Fundamentals",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, CAP Fundamentals standardizes enterprise communication and data flow.',
          transition: 'Without standardized CAP Fundamentals, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "CAP Fundamentals provides core capabilities for SAP BTP applications, as defined in Module 3.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Model a 5-entity domain of your choice (for example Suppliers, Products, Orders, OrderItems, Forecasts) with at least one managed association, one composition, one enum and cuid plus managed. Expose it through two services: an admin service with full access and a read-only catalog service using projections. Add a view that aggregates data, such as order totals per supplier. Run cds compile to SQL and to EDMX for each service and read the output. Verification /",
          btpFit: "Predict from your CDS file the foreign key column names, the tables generated and the entity sets exposed, then confirm with cds compile. Explain composition versus association with one deletion example.",
        },
        jargonTerms: [
          {
            term: "CAP idea",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "File and namespace basics",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Types and elements",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical CAP Fundamentals Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '3.1', title: 'CAP Fundamentals', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (CAP Fundamentals)',
          context: 'An international enterprise implements CAP Fundamentals to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for CAP Fundamentals.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-3-1-q1',
            question: 'What is the primary role of CAP Fundamentals in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-3-1-q2',
            question: 'According to the syllabus, how does CAP Fundamentals handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-3-1-q3',
            question: 'What is the required mastery outcome for Module 3.1 (CAP Fundamentals)?',
            options: [
              { id: 'a', text: "Predict from your CDS file the foreign key column names, the tables generated and the enti", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 3.1 establishes the core mechanics for CAP Fundamentals.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Model a 5-entity domain of your choice (for example Suppliers, Products, Orders, OrderItems, Forecasts) with at least one managed association, one composition, one enum and cuid plus managed. Expose it through two services: an admin service with full access and a read-only catalog service using projections. Add a view that aggregates data, such as order totals per supplier. Run cds compile to SQL and to EDMX for each service and read the output. Verification /"
      },
      {
        id: 'mod-3-2',
        code: '3.2',
        phaseId: 'phase-3',
        title: "Service Implementation",
        tagline: "Event Lifecycle (before, on, after), Actions & Validations",
        summary: "Implement a bound action on Orders (for example submit) that changes a status and rejects invalid transitions with a 409. Add a before handler that validates stock and quantity and returns multiple errors in one response. Add an unbound function returning aggregated data computed with CQL. Add an after READ handler that adds a computed field to results. Write at least 10 Jest tests covering success, validation failure and not-found cases. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Handler registration: a .js or .ts file with the same name as the .cds service, or @impl, and cds.service.impl.", "Request phases: srv.before, srv.on, srv.after, and the order handlers run in.", "Events: CREATE, READ, UPDATE, DELETE, bound and unbound actions and functions, custom events.", "Request object: req.data, req.query, req.params, req.target, req.user, req.locale, req.event.", "Feedback: req.error, req.reject, req.info, req.warn, req.notify, HTTP status mapping, and returning structured error messages.", "Querying: CQL builders SELECT.from, SELECT.one.from, INSERT.into, UPDATE.entity, DELETE.from, .where, .columns, .orderBy, .limit.", "Service calls: cds.connect.to, srv.run, srv.send, srv.emit.", "Validation layers: declarative @assert.*, @mandatory, @readonly, versus custom validation in before handlers.", "Automatic values: @cds.on.insert, @cds.on.update, and managed fields.", "Draft awareness: @odata.draft.enabled, draft lifecycle (NEW, EDIT, SAVE, CANCEL), and why validation runs on SAVE.", "Testing: @cap-js/cds-test or cds.test, with Jest, and calling the running service in tests.", "Required"],
        practicalImplementation: "Implement a bound action on Orders (for example submit) that changes a status and rejects invalid transitions with a 409. Add a before handler that validates stock and quantity and returns multiple errors in one response. Add an unbound function returning aggregated data computed with CQL. Add an after READ handler that adds a computed field to results. Write at least 10 Jest tests covering success, validation failure and not-found cases. Verification /",
        masteryCheck: "Show a request that triggers each of 400, 404 and 409 from your service, with the response body, and explain which layer produced each. All tests pass with npm test.",
        learningObjectives: ["Handler registration: a .js or .ts file with the same name as the .cds service, or @impl, and cds.service.impl.", "Request phases: srv.before, srv.on, srv.after, and the order handlers run in.", "Events: CREATE, READ, UPDATE, DELETE, bound and unbound actions and functions, custom events.", "Request object: req.data, req.query, req.params, req.target, req.user, req.locale, req.event."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Handler registration",
                    "explanation": "Handler registration: a .js or .ts file with the same name as the .cds service, or @impl, and cds.service.impl. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Service Implementation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Handler registration and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Handler registration decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Request phases",
                    "explanation": "Request phases: srv.before, srv.on, srv.after, and the order handlers run in. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Service Implementation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Request phases and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Request phases decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Events",
                    "explanation": "Events: CREATE, READ, UPDATE, DELETE, bound and unbound actions and functions, custom events. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Service Implementation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Events and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Events decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Request object",
                    "explanation": "Request object: req.data, req.query, req.params, req.target, req.user, req.locale, req.event. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Service Implementation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Request object and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Request object decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Feedback",
                    "explanation": "Feedback: req.error, req.reject, req.info, req.warn, req.notify, HTTP status mapping, and returning structured error messages. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Service Implementation enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Feedback and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Feedback decouples application logic from underlying database schemas."
          }
],
        diagramType: 'event-handlers',
        analogy: {
          concept: "Service Implementation",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Service Implementation standardizes enterprise communication and data flow.',
          transition: 'Without standardized Service Implementation, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Service Implementation provides core capabilities for SAP BTP applications, as defined in Module 3.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Implement a bound action on Orders (for example submit) that changes a status and rejects invalid transitions with a 409. Add a before handler that validates stock and quantity and returns multiple errors in one response. Add an unbound function returning aggregated data computed with CQL. Add an after READ handler that adds a computed field to results. Write at least 10 Jest tests covering success, validation failure and not-found cases. Verification /",
          btpFit: "Show a request that triggers each of 400, 404 and 409 from your service, with the response body, and explain which layer produced each. All tests pass with npm test.",
        },
        jargonTerms: [
          {
            term: "Handler registration",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Request phases",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Events",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Service Implementation Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '3.2', title: 'Service Implementation', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Service Implementation)',
          context: 'An international enterprise implements Service Implementation to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Service Implementation.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-3-2-q1',
            question: 'What is the primary role of Service Implementation in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-3-2-q2',
            question: 'According to the syllabus, how does Service Implementation handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-3-2-q3',
            question: 'What is the required mastery outcome for Module 3.2 (Service Implementation)?',
            options: [
              { id: 'a', text: "Show a request that triggers each of 400, 404 and 409 from your service, with the response", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 3.2 establishes the core mechanics for Service Implementation.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Implement a bound action on Orders (for example submit) that changes a status and rejects invalid transitions with a 409. Add a before handler that validates stock and quantity and returns multiple errors in one response. Add an unbound function returning aggregated data computed with CQL. Add an after READ handler that adds a computed field to results. Write at least 10 Jest tests covering success, validation failure and not-found cases. Verification /"
      },
      {
        id: 'mod-3-3',
        code: '3.3',
        phaseId: 'phase-3',
        title: "Data and Persistence",
        tagline: "Local SQLite Development, CSV Data, and Migrations",
        summary: "Create CSV test data for every entity of your domain and load it on cds watch. Deploy to a persistent SQLite file, then add a column to an entity and redeploy. Write a handler that updates two entities in one request and make the second update fail on purpose to prove the first rolls back. Add @odata.etag to one entity and demonstrate a 412 from two conflicting updates. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Development database: SQLite in-memory with cds watch, persistent file with cds deploy --to sqlite:db.sqlite, and the @cap-js/sqlite package.", "Test data: CSV files in db/data/ named <namespace>-<Entity>.csv, header rows, delimiter rules, and composition and association foreign key columns.", "Database configuration: cds.requires.db and profiles such as [development] and [production] in package.json or .cdsrc.json.", "Schema deployment: how the model becomes tables and views, cds build, and cds deploy.", "Migrations: adding a field versus renaming or removing one, @cds.persistence.journal and migration tables for HANA, and what HDI can evolve automatically.", "Transactions: one transaction per request, cds.tx, cds.context, commit and rollback, and what happens when a handler throws.", "Concurrency: @odata.etag for optimistic concurrency with If-Match.", "Performance basics: $select pushdown, indexes with @cds.persistence hints at awareness level, and avoiding N+1 queries in handlers.", "Required"],
        practicalImplementation: "Create CSV test data for every entity of your domain and load it on cds watch. Deploy to a persistent SQLite file, then add a column to an entity and redeploy. Write a handler that updates two entities in one request and make the second update fail on purpose to prove the first rolls back. Add @odata.etag to one entity and demonstrate a 412 from two conflicting updates. Verification /",
        masteryCheck: "Explain, with your own transaction test as evidence, why a failed second write leaves no partial data. Show the difference between a safe schema change and one that needs a migration.",
        learningObjectives: ["Development database: SQLite in-memory with cds watch, persistent file with cds deploy --to sqlite:db.sqlite, and the @cap-js/sqlite package.", "Test data: CSV files in db/data/ named <namespace>-<Entity>.csv, header rows, delimiter rules, and composition and association foreign key columns.", "Database configuration: cds.requires.db and profiles such as [development] and [production] in package.json or .cdsrc.json.", "Schema deployment: how the model becomes tables and views, cds build, and cds deploy."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Development database",
                    "explanation": "Development database: SQLite in-memory with cds watch, persistent file with cds deploy --to sqlite:db.sqlite, and the @cap-js/sqlite package. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Data and Persistence enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Development database and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Development database decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Test data",
                    "explanation": "Test data: CSV files in db/data/ named <namespace>-<Entity>.csv, header rows, delimiter rules, and composition and association foreign key columns. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Data and Persistence enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Test data and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Test data decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Database configuration",
                    "explanation": "Database configuration: cds.requires.db and profiles such as [development] and [production] in package.json or .cdsrc.json. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Data and Persistence enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Database configuration and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Database configuration decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Schema deployment",
                    "explanation": "Schema deployment: how the model becomes tables and views, cds build, and cds deploy. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Data and Persistence enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Schema deployment and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Schema deployment decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Migrations",
                    "explanation": "Migrations: adding a field versus renaming or removing one, @cds.persistence.journal and migration tables for HANA, and what HDI can evolve automatically. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Data and Persistence enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Migrations and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Migrations decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cap-architecture',
        analogy: {
          concept: "Data and Persistence",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Data and Persistence standardizes enterprise communication and data flow.',
          transition: 'Without standardized Data and Persistence, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Data and Persistence provides core capabilities for SAP BTP applications, as defined in Module 3.3.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Create CSV test data for every entity of your domain and load it on cds watch. Deploy to a persistent SQLite file, then add a column to an entity and redeploy. Write a handler that updates two entities in one request and make the second update fail on purpose to prove the first rolls back. Add @odata.etag to one entity and demonstrate a 412 from two conflicting updates. Verification /",
          btpFit: "Explain, with your own transaction test as evidence, why a failed second write leaves no partial data. Show the difference between a safe schema change and one that needs a migration.",
        },
        jargonTerms: [
          {
            term: "Development database",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Test data",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Database configuration",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Data and Persistence Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '3.3', title: 'Data and Persistence', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Data and Persistence)',
          context: 'An international enterprise implements Data and Persistence to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Data and Persistence.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-3-3-q1',
            question: 'What is the primary role of Data and Persistence in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-3-3-q2',
            question: 'According to the syllabus, how does Data and Persistence handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-3-3-q3',
            question: 'What is the required mastery outcome for Module 3.3 (Data and Persistence)?',
            options: [
              { id: 'a', text: "Explain, with your own transaction test as evidence, why a failed second write leaves no p", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 3.3 establishes the core mechanics for Data and Persistence.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Create CSV test data for every entity of your domain and load it on cds watch. Deploy to a persistent SQLite file, then add a column to an entity and redeploy. Write a handler that updates two entities in one request and make the second update fail on purpose to prove the first rolls back. Add @odata.etag to one entity and demonstrate a 412 from two conflicting updates. Verification /"
      },
      {
        id: 'mod-3-4',
        code: '3.4',
        phaseId: 'phase-3',
        title: "SAP HANA Cloud",
        tagline: "In-Memory Relational Persistence, HDI Containers & DDL",
        summary: "Create the HANA Cloud instance, allow connections, and start it. Run cds add hana, build for production, and deploy the schema to an HDI container. Open Database Explorer, find your tables, and run 10 SQL queries across your domain, including a join and an aggregate. Run the same service in cds watch against SQLite and in hybrid mode against HANA, and compare behaviour. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Database instances: creating an SAP HANA Cloud instance in the trial through the BTP cockpit's SAP HANA Cloud Central, the allowed connections setting, and that trial instances are stopped automatically and must be restarted. Verify the current trial behaviour.", "HDI: HDI containers, design-time versus runtime users, the hana service plan hdi-shared, binding an app to a container.", "CAP on HANA: cds add hana, the @cap-js/hana package, cds build --production, the generated gen/db folder, and cds deploy --to hana.", "SQL basics: SELECT, WHERE, ORDER BY, GROUP BY, HAVING, JOIN types, subqueries, INSERT, UPDATE, DELETE, window functions at awareness level.", "Objects: schemas, column tables versus row tables, views, data types such as NVARCHAR, DECIMAL, TIMESTAMP, REAL_VECTOR (revisited in Phase 7).", "Security users: DBADMIN, HDI container users, technical users, privileges at concept level, and never using DBADMIN from an application.", "Tools: SAP HANA Database Explorer for browsing tables, running SQL and viewing data.", "Required"],
        practicalImplementation: "Create the HANA Cloud instance, allow connections, and start it. Run cds add hana, build for production, and deploy the schema to an HDI container. Open Database Explorer, find your tables, and run 10 SQL queries across your domain, including a join and an aggregate. Run the same service in cds watch against SQLite and in hybrid mode against HANA, and compare behaviour. Verification /",
        masteryCheck: "Explain what an HDI container is and why the app uses a technical user instead of DBADMIN. Show the same request giving identical results on SQLite and on HANA.",
        learningObjectives: ["Database instances: creating an SAP HANA Cloud instance in the trial through the BTP cockpit's SAP HANA Cloud Central, the allowed connections setting, and that trial instances are stopped automatically and must be restarted. Verify the current trial behaviour.", "HDI: HDI containers, design-time versus runtime users, the hana service plan hdi-shared, binding an app to a container.", "CAP on HANA: cds add hana, the @cap-js/hana package, cds build --production, the generated gen/db folder, and cds deploy --to hana.", "SQL basics: SELECT, WHERE, ORDER BY, GROUP BY, HAVING, JOIN types, subqueries, INSERT, UPDATE, DELETE, window functions at awareness level."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Database instances",
                    "explanation": "Database instances: creating an SAP HANA Cloud instance in the trial through the BTP cockpit's SAP HANA Cloud Central, the allowed connections setting, and that trial instances are stopped automatically and must be restarted. Verify the current trial behaviour. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP HANA Cloud enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Database instances and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Database instances decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "HDI",
                    "explanation": "HDI: HDI containers, design-time versus runtime users, the hana service plan hdi-shared, binding an app to a container. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP HANA Cloud enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review HDI and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how HDI decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "CAP on HANA",
                    "explanation": "CAP on HANA: cds add hana, the @cap-js/hana package, cds build --production, the generated gen/db folder, and cds deploy --to hana. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP HANA Cloud enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review CAP on HANA and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how CAP on HANA decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "SQL basics",
                    "explanation": "SQL basics: SELECT, WHERE, ORDER BY, GROUP BY, HAVING, JOIN types, subqueries, INSERT, UPDATE, DELETE, window functions at awareness level. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP HANA Cloud enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review SQL basics and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how SQL basics decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Objects",
                    "explanation": "Objects: schemas, column tables versus row tables, views, data types such as NVARCHAR, DECIMAL, TIMESTAMP, REAL_VECTOR (revisited in Phase 7). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP HANA Cloud enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Objects and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Objects decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cap-architecture',
        analogy: {
          concept: "SAP HANA Cloud",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, SAP HANA Cloud standardizes enterprise communication and data flow.',
          transition: 'Without standardized SAP HANA Cloud, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "SAP HANA Cloud provides core capabilities for SAP BTP applications, as defined in Module 3.4.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Create the HANA Cloud instance, allow connections, and start it. Run cds add hana, build for production, and deploy the schema to an HDI container. Open Database Explorer, find your tables, and run 10 SQL queries across your domain, including a join and an aggregate. Run the same service in cds watch against SQLite and in hybrid mode against HANA, and compare behaviour. Verification /",
          btpFit: "Explain what an HDI container is and why the app uses a technical user instead of DBADMIN. Show the same request giving identical results on SQLite and on HANA.",
        },
        jargonTerms: [
          {
            term: "Database instances",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "HDI",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "CAP on HANA",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical SAP HANA Cloud Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '3.4', title: 'SAP HANA Cloud', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (SAP HANA Cloud)',
          context: 'An international enterprise implements SAP HANA Cloud to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for SAP HANA Cloud.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-3-4-q1',
            question: 'What is the primary role of SAP HANA Cloud in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-3-4-q2',
            question: 'According to the syllabus, how does SAP HANA Cloud handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-3-4-q3',
            question: 'What is the required mastery outcome for Module 3.4 (SAP HANA Cloud)?',
            options: [
              { id: 'a', text: "Explain what an HDI container is and why the app uses a technical user instead of DBADMIN.", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 3.4 establishes the core mechanics for SAP HANA Cloud.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Create the HANA Cloud instance, allow connections, and start it. Run cds add hana, build for production, and deploy the schema to an HDI container. Open Database Explorer, find your tables, and run 10 SQL queries across your domain, including a join and an aggregate. Run the same service in cds watch against SQLite and in hybrid mode against HANA, and compare behaviour. Verification /"
      },
    ]
  },
  {
    id: 'phase-4',
    number: 4,
    title: "User Interfaces",
    tagline: 'Phase 4 · Weeks 1-2 · ~24 Hours',
    description: "Put a working, secured-ready UI on your CAP service using Fiori Elements, understand SAPUI5 well enough to extend it, and serve it through the App Router and a launchpad.",
    coreObjective: "Put a working, secured-ready UI on your CAP service using Fiori Elements, understand SAPUI5 well enough to extend it, and serve it through the App Router and a launchpad.",
    estimatedHours: 24,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'core',
    capstone: PHASE_CAPSTONES[4]!,
    modules: [
      {
        id: 'mod-4-1',
        code: '4.1',
        phaseId: 'phase-4',
        title: "Fiori Elements (first)",
        tagline: "Metadata-Driven List Reports and Object Pages with Annotations",
        summary: "Generate a List Report and Object Page app for your Orders entity from your Phase 3 service. Write annotations in app/annotations.cds for a 6-column list, 3 filter fields and a header with a title and description. Add 3 object page sections: general information, a composition table of OrderItems, and a data point. Add a value help on Supplier and display the supplier name through @Common.Text. Add a toolbar button that calls your submit action and a status column that shows criticality through @UI.Criticality. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Idea: the UI is generated at runtime from OData metadata plus annotations, so you describe the UI instead of coding it.", "Floorplans: List Report with Object Page, Worklist, and, at awareness level only, Analytical List Page and Overview Page.", "Generating an app: SAP Fiori tools Application Generator in Business Application Studio or VS Code, choosing the template, data source (local CAP project), main entity and navigation entity.", "Application files: webapp/manifest.json, ui5.yaml, Component.js, annotations.cds in your CAP app/ folder.", "List Report annotations: @UI.LineItem, @UI.SelectionFields, @UI.HeaderInfo, @UI.PresentationVariant, @UI.SelectionVariant at awareness level, and @Common.Label or @title for labels.", "Object Page annotations: @UI.Facets (ReferenceFacet, CollectionFacet), @UI.FieldGroup, @UI.Identification, @UI.DataPoint, and sections for composition children.", "Actions and navigation: @UI.DataFieldForAction, @UI.DataFieldWithUrl, and navigation between pages with @UI.LineItem row navigation.", "Value helps and text: @Common.ValueList, @Common.Text with @Common.TextArrangement, and @Common.FieldControl.", "Search and filtering: @Search.defaultSearchElement, filter bar configuration, and @UI.SelectionFields.", "Draft editing: how @odata.draft.enabled creates Edit, Save and Discard behaviour automatically.", "Developer tools: the Fiori preview that cds watch offers, the Page Map and Guided Development in Fiori tools.", "Required"],
        practicalImplementation: "Generate a List Report and Object Page app for your Orders entity from your Phase 3 service. Write annotations in app/annotations.cds for a 6-column list, 3 filter fields and a header with a title and description. Add 3 object page sections: general information, a composition table of OrderItems, and a data point. Add a value help on Supplier and display the supplier name through @Common.Text. Add a toolbar button that calls your submit action and a status column that shows criticality through @UI.Criticality. Verification /",
        masteryCheck: "Create, edit, save and delete an order entirely through the UI. Change the UI only by editing annotations, with no UI5 JavaScript, and show 3 visible differences.",
        learningObjectives: ["Idea: the UI is generated at runtime from OData metadata plus annotations, so you describe the UI instead of coding it.", "Floorplans: List Report with Object Page, Worklist, and, at awareness level only, Analytical List Page and Overview Page.", "Generating an app: SAP Fiori tools Application Generator in Business Application Studio or VS Code, choosing the template, data source (local CAP project), main entity and navigation entity.", "Application files: webapp/manifest.json, ui5.yaml, Component.js, annotations.cds in your CAP app/ folder."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Idea",
                    "explanation": "Idea: the UI is generated at runtime from OData metadata plus annotations, so you describe the UI instead of coding it. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Fiori Elements (first) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Idea and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Idea decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Floorplans",
                    "explanation": "Floorplans: List Report with Object Page, Worklist, and, at awareness level only, Analytical List Page and Overview Page. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Fiori Elements (first) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Floorplans and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Floorplans decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Generating an app",
                    "explanation": "Generating an app: SAP Fiori tools Application Generator in Business Application Studio or VS Code, choosing the template, data source (local CAP project), main entity and navigation entity. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Fiori Elements (first) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Generating an app and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Generating an app decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Application files",
                    "explanation": "Application files: webapp/manifest.json, ui5.yaml, Component.js, annotations.cds in your CAP app/ folder. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Fiori Elements (first) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Application files and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Application files decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "List Report annotations",
                    "explanation": "List Report annotations: @UI.LineItem, @UI.SelectionFields, @UI.HeaderInfo, @UI.PresentationVariant, @UI.SelectionVariant at awareness level, and @Common.Label or @title for labels. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Fiori Elements (first) enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review List Report annotations and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how List Report annotations decouples application logic from underlying database schemas."
          }
],
        diagramType: 'fiori-elements-annotations',
        analogy: {
          concept: "Fiori Elements (first)",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Fiori Elements (first) standardizes enterprise communication and data flow.',
          transition: 'Without standardized Fiori Elements (first), enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Fiori Elements (first) provides core capabilities for SAP BTP applications, as defined in Module 4.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Generate a List Report and Object Page app for your Orders entity from your Phase 3 service. Write annotations in app/annotations.cds for a 6-column list, 3 filter fields and a header with a title and description. Add 3 object page sections: general information, a composition table of OrderItems, and a data point. Add a value help on Supplier and display the supplier name through @Common.Text. Add a toolbar button that calls your submit action and a status column that shows criticality through @UI.Criticality. Verification /",
          btpFit: "Create, edit, save and delete an order entirely through the UI. Change the UI only by editing annotations, with no UI5 JavaScript, and show 3 visible differences.",
        },
        jargonTerms: [
          {
            term: "Idea",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Floorplans",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Generating an app",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Fiori Elements (first) Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '4.1', title: 'Fiori Elements (first)', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Fiori Elements (first))',
          context: 'An international enterprise implements Fiori Elements (first) to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Fiori Elements (first).',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-4-1-q1',
            question: 'What is the primary role of Fiori Elements (first) in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-4-1-q2',
            question: 'According to the syllabus, how does Fiori Elements (first) handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-4-1-q3',
            question: 'What is the required mastery outcome for Module 4.1 (Fiori Elements (first))?',
            options: [
              { id: 'a', text: "Create, edit, save and delete an order entirely through the UI. Change the UI only by edit", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 4.1 establishes the core mechanics for Fiori Elements (first).',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Generate a List Report and Object Page app for your Orders entity from your Phase 3 service. Write annotations in app/annotations.cds for a 6-column list, 3 filter fields and a header with a title and description. Add 3 object page sections: general information, a composition table of OrderItems, and a data point. Add a value help on Supplier and display the supplier name through @Common.Text. Add a toolbar button that calls your submit action and a status column that shows criticality through @UI.Criticality. Verification /"
      },
      {
        id: 'mod-4-2',
        code: '4.2',
        phaseId: 'phase-4',
        title: "SAPUI5 Basics",
        tagline: "Model-View-Controller Architecture, XML Views & Data Binding",
        summary: "Generate a freestyle UI5 app from the template and bind a list to your OData V4 service. Add a detail view with routing and a parameterised route. Build a dialog fragment for creating an order and call a CAP action from it. Add an i18n file, move all texts into it, and add one language. Add a controller extension to your Fiori Elements app that adds a custom action. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Module system: sap.ui.define, sap.ui.require, dependency injection of libraries and controls.", "MVC: XML views, controllers extending sap.ui.core.mvc.Controller, onInit, onAfterRendering, event handlers named in the view, and fragments.", "Libraries: sap.m controls (Page, List, Table, Input, Button, Dialog), sap.ui.layout, and sap.f at awareness level.", "Models: JSONModel, ResourceModel for i18n, sap.ui.model.odata.v4.ODataModel, and the difference between V2 and V4 models.", "Data binding: property, aggregation and element binding, binding modes (one-way, two-way, one-time), formatters, expression binding, and binding to the OData model with $select and $expand.", "Component and descriptor: Component.js, manifest.json sections sap.app, sap.ui, sap.ui5 (models, dataSources, routing, rootView), and the i18n files.", "Routing: routes, targets, patterns with parameters, getRouter().navTo, and attachPatternMatched.", "Extending Fiori Elements: controller extensions, custom actions and custom sections, and when to choose freestyle UI5 over Fiori Elements.", "Debugging UI5: the browser developer tools, the UI5 Diagnostics window opened with Ctrl+Alt+Shift+S, and reading binding errors.", "Required"],
        practicalImplementation: "Generate a freestyle UI5 app from the template and bind a list to your OData V4 service. Add a detail view with routing and a parameterised route. Build a dialog fragment for creating an order and call a CAP action from it. Add an i18n file, move all texts into it, and add one language. Add a controller extension to your Fiori Elements app that adds a custom action. Verification /",
        masteryCheck: "Fix 3 deliberately introduced binding or routing errors using only the browser tools. Explain the flow from a button press to the OData request and back to the rendered list.",
        learningObjectives: ["Module system: sap.ui.define, sap.ui.require, dependency injection of libraries and controls.", "MVC: XML views, controllers extending sap.ui.core.mvc.Controller, onInit, onAfterRendering, event handlers named in the view, and fragments.", "Libraries: sap.m controls (Page, List, Table, Input, Button, Dialog), sap.ui.layout, and sap.f at awareness level.", "Models: JSONModel, ResourceModel for i18n, sap.ui.model.odata.v4.ODataModel, and the difference between V2 and V4 models."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Module system",
                    "explanation": "Module system: sap.ui.define, sap.ui.require, dependency injection of libraries and controls. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAPUI5 Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Module system and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Module system decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "MVC",
                    "explanation": "MVC: XML views, controllers extending sap.ui.core.mvc.Controller, onInit, onAfterRendering, event handlers named in the view, and fragments. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAPUI5 Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review MVC and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how MVC decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Libraries",
                    "explanation": "Libraries: sap.m controls (Page, List, Table, Input, Button, Dialog), sap.ui.layout, and sap.f at awareness level. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAPUI5 Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Libraries and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Libraries decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Models",
                    "explanation": "Models: JSONModel, ResourceModel for i18n, sap.ui.model.odata.v4.ODataModel, and the difference between V2 and V4 models. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAPUI5 Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Models and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Models decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Data binding",
                    "explanation": "Data binding: property, aggregation and element binding, binding modes (one-way, two-way, one-time), formatters, expression binding, and binding to the OData model with $select and $expand. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAPUI5 Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Data binding and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Data binding decouples application logic from underlying database schemas."
          }
],
        diagramType: 'ui5-freestyle',
        analogy: {
          concept: "SAPUI5 Basics",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, SAPUI5 Basics standardizes enterprise communication and data flow.',
          transition: 'Without standardized SAPUI5 Basics, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "SAPUI5 Basics provides core capabilities for SAP BTP applications, as defined in Module 4.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Generate a freestyle UI5 app from the template and bind a list to your OData V4 service. Add a detail view with routing and a parameterised route. Build a dialog fragment for creating an order and call a CAP action from it. Add an i18n file, move all texts into it, and add one language. Add a controller extension to your Fiori Elements app that adds a custom action. Verification /",
          btpFit: "Fix 3 deliberately introduced binding or routing errors using only the browser tools. Explain the flow from a button press to the OData request and back to the rendered list.",
        },
        jargonTerms: [
          {
            term: "Module system",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "MVC",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Libraries",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical SAPUI5 Basics Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '4.2', title: 'SAPUI5 Basics', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (SAPUI5 Basics)',
          context: 'An international enterprise implements SAPUI5 Basics to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for SAPUI5 Basics.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-4-2-q1',
            question: 'What is the primary role of SAPUI5 Basics in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-4-2-q2',
            question: 'According to the syllabus, how does SAPUI5 Basics handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-4-2-q3',
            question: 'What is the required mastery outcome for Module 4.2 (SAPUI5 Basics)?',
            options: [
              { id: 'a', text: "Fix 3 deliberately introduced binding or routing errors using only the browser tools. Expl", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 4.2 establishes the core mechanics for SAPUI5 Basics.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Generate a freestyle UI5 app from the template and bind a list to your OData V4 service. Add a detail view with routing and a parameterised route. Build a dialog fragment for creating an order and call a CAP action from it. Add an i18n file, move all texts into it, and add one language. Add a controller extension to your Fiori Elements app that adds a custom action. Verification /"
      },
      {
        id: 'mod-4-3',
        code: '4.3',
        phaseId: 'phase-4',
        title: "App Integration",
        tagline: "AppRouter Proxy, Launchpad Integration & Localization",
        summary: "Run cds add approuter,html5-repo (or your chosen hosting option) and read each generated file. Write xs-app.json routes for the UI, the OData service and a logout path. Declare crossNavigation for your Fiori app in manifest.json and add it to a Work Zone site, if your trial allows. If it does not, document the limitation and test the intent with a local launchpad. Draw a sequence diagram of one request through the App Router. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Roles of the App Router: single entry point, authentication, routing to services and UI, and token forwarding.", "Configuration: xs-app.json routes with source (regular expression), target, service, destination, authenticationType, and csrfProtection, plus the welcome file and logout settings.", "Adding it to CAP: cds add approuter, the @sap/approuter package, and the router module in mta.yaml.", "UI hosting: HTML5 Application Repository with cds add html5-repo, UI deployer module, and the difference from serving the UI inside the CAP app.", "Service consumption from UI: dataSources in manifest.json with relative URIs routed by the App Router.", "Authentication flow: browser to App Router to XSUAA login to JWT, then App Router to the CAP service with the token (revisited in Phase 5).", "Launchpad integration: SAP Build Work Zone standard edition, adding an app through the HTML5 repository content provider, crossNavigation inbounds with semantic object and action, tiles and groups.", "Local testing: running the App Router locally with cds watch against mocked authentication.", "Required"],
        practicalImplementation: "Run cds add approuter,html5-repo (or your chosen hosting option) and read each generated file. Write xs-app.json routes for the UI, the OData service and a logout path. Declare crossNavigation for your Fiori app in manifest.json and add it to a Work Zone site, if your trial allows. If it does not, document the limitation and test the intent with a local launchpad. Draw a sequence diagram of one request through the App Router. Verification /",
        masteryCheck: "Explain what each route in your xs-app.json does and what breaks if the order of routes is reversed. Open the app from the launchpad or the direct App Router URL and perform a full create-edit-save cycle.",
        learningObjectives: ["Roles of the App Router: single entry point, authentication, routing to services and UI, and token forwarding.", "Configuration: xs-app.json routes with source (regular expression), target, service, destination, authenticationType, and csrfProtection, plus the welcome file and logout settings.", "Adding it to CAP: cds add approuter, the @sap/approuter package, and the router module in mta.yaml.", "UI hosting: HTML5 Application Repository with cds add html5-repo, UI deployer module, and the difference from serving the UI inside the CAP app."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Roles of the App Router",
                    "explanation": "Roles of the App Router: single entry point, authentication, routing to services and UI, and token forwarding. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "App Integration enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Roles of the App Router and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Roles of the App Router decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Configuration",
                    "explanation": "Configuration: xs-app.json routes with source (regular expression), target, service, destination, authenticationType, and csrfProtection, plus the welcome file and logout settings. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "App Integration enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Configuration and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Configuration decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Adding it to CAP",
                    "explanation": "Adding it to CAP: cds add approuter, the @sap/approuter package, and the router module in mta.yaml. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "App Integration enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Adding it to CAP and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Adding it to CAP decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "UI hosting",
                    "explanation": "UI hosting: HTML5 Application Repository with cds add html5-repo, UI deployer module, and the difference from serving the UI inside the CAP app. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "App Integration enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review UI hosting and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how UI hosting decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Service consumption from UI",
                    "explanation": "Service consumption from UI: dataSources in manifest.json with relative URIs routed by the App Router. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "App Integration enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Service consumption from UI and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Service consumption from UI decouples application logic from underlying database schemas."
          }
],
        diagramType: 'fiori-horizon',
        analogy: {
          concept: "App Integration",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, App Integration standardizes enterprise communication and data flow.',
          transition: 'Without standardized App Integration, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "App Integration provides core capabilities for SAP BTP applications, as defined in Module 4.3.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Run cds add approuter,html5-repo (or your chosen hosting option) and read each generated file. Write xs-app.json routes for the UI, the OData service and a logout path. Declare crossNavigation for your Fiori app in manifest.json and add it to a Work Zone site, if your trial allows. If it does not, document the limitation and test the intent with a local launchpad. Draw a sequence diagram of one request through the App Router. Verification /",
          btpFit: "Explain what each route in your xs-app.json does and what breaks if the order of routes is reversed. Open the app from the launchpad or the direct App Router URL and perform a full create-edit-save cycle.",
        },
        jargonTerms: [
          {
            term: "Roles of the App Router",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Configuration",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Adding it to CAP",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical App Integration Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '4.3', title: 'App Integration', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (App Integration)',
          context: 'An international enterprise implements App Integration to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for App Integration.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-4-3-q1',
            question: 'What is the primary role of App Integration in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-4-3-q2',
            question: 'According to the syllabus, how does App Integration handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-4-3-q3',
            question: 'What is the required mastery outcome for Module 4.3 (App Integration)?',
            options: [
              { id: 'a', text: "Explain what each route in your xs-app.json does and what breaks if the order of routes is", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 4.3 establishes the core mechanics for App Integration.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Run cds add approuter,html5-repo (or your chosen hosting option) and read each generated file. Write xs-app.json routes for the UI, the OData service and a logout path. Declare crossNavigation for your Fiori app in manifest.json and add it to a Work Zone site, if your trial allows. If it does not, document the limitation and test the intent with a local launchpad. Draw a sequence diagram of one request through the App Router. Verification /"
      },
    ]
  },
  {
    id: 'phase-5',
    number: 5,
    title: "Security and Integration",
    tagline: 'Phase 5 · Weeks 1-2 · ~24 Hours',
    description: "Authenticate users and technical clients with XSUAA, enforce role-based and attribute-based authorization in CAP, call other systems through destinations, and apply secure development practices.",
    coreObjective: "Authenticate users and technical clients with XSUAA, enforce role-based and attribute-based authorization in CAP, call other systems through destinations, and apply secure development practices.",
    estimatedHours: 24,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'core',
    capstone: PHASE_CAPSTONES[5]!,
    modules: [
      {
        id: 'mod-5-1',
        code: '5.1',
        phaseId: 'phase-5',
        title: "Authentication",
        tagline: "XSUAA Token Validation, JWT Bearer Handlers & Scopes",
        summary: "Create the XSUAA instance from your xs-security.json with cf create-service and a service key with cf create-service-key. Obtain a client credentials token for your service key in Postman and call a protected endpoint. Decode the JWT locally and list every scope and attribute inside it. Configure two mocked users with different roles in cds.requires.auth for local tests. Draw sequence diagrams for the user login flow and the client credentials flow in your own app. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["XSUAA: its role as the OAuth 2.0 authorization server for BTP applications, service plan application, and the service instance and service key.", "xs-security.json: xsappname, tenant-mode, scopes, attributes, role-templates, role-collections, oauth2-configuration such as redirect URIs.", "CAP setup: cds add xsuaa, the @sap/xssec package, passport based authentication handled by CAP, and the auth configuration in cds.requires.", "Token types in BTP: user token via authorization code, client credentials token for technical access, refresh token, and user token exchange for calling a second service on behalf of the user.", "OpenID Connect and the newer SAP identity service: concept level, so you can read documentation that mentions Identity Authentication based services.", "Token handling: the token endpoint <uaa url>/oauth/token, the Authorization: Bearer header, JWT claims for BTP such as scope, client_id, zid, user_name, xs.user.attributes.", "Validation: signature check via the JWKS of the identity provider, issuer, audience and expiry, handled by @sap/xssec.", "Local development: mocked users in cds.requires.auth with the mocked kind, and testing roles without a cloud login.", "Required"],
        practicalImplementation: "Create the XSUAA instance from your xs-security.json with cf create-service and a service key with cf create-service-key. Obtain a client credentials token for your service key in Postman and call a protected endpoint. Decode the JWT locally and list every scope and attribute inside it. Configure two mocked users with different roles in cds.requires.auth for local tests. Draw sequence diagrams for the user login flow and the client credentials flow in your own app. Verification /",
        masteryCheck: "Call the protected endpoint with no token, an expired token, a token for another app, and a valid token, and explain each response code. Explain when you would use user token exchange rather than client credentials.",
        learningObjectives: ["XSUAA: its role as the OAuth 2.0 authorization server for BTP applications, service plan application, and the service instance and service key.", "xs-security.json: xsappname, tenant-mode, scopes, attributes, role-templates, role-collections, oauth2-configuration such as redirect URIs.", "CAP setup: cds add xsuaa, the @sap/xssec package, passport based authentication handled by CAP, and the auth configuration in cds.requires.", "Token types in BTP: user token via authorization code, client credentials token for technical access, refresh token, and user token exchange for calling a second service on behalf of the user."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "XSUAA",
                    "explanation": "XSUAA: its role as the OAuth 2.0 authorization server for BTP applications, service plan application, and the service instance and service key. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authentication enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review XSUAA and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how XSUAA decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "xs-security.json",
                    "explanation": "xs-security.json: xsappname, tenant-mode, scopes, attributes, role-templates, role-collections, oauth2-configuration such as redirect URIs. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authentication enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review xs-security.json and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how xs-security.json decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "CAP setup",
                    "explanation": "CAP setup: cds add xsuaa, the @sap/xssec package, passport based authentication handled by CAP, and the auth configuration in cds.requires. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authentication enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review CAP setup and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how CAP setup decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Token types in BTP",
                    "explanation": "Token types in BTP: user token via authorization code, client credentials token for technical access, refresh token, and user token exchange for calling a second service on behalf of the user. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authentication enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Token types in BTP and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Token types in BTP decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "OpenID Connect and the newer SAP identit",
                    "explanation": "OpenID Connect and the newer SAP identity service: concept level, so you can read documentation that mentions Identity Authentication based services. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authentication enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review OpenID Connect and the newer SAP identity service and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how OpenID Connect and the newer SAP identity service decouples application logic from underlying database schemas."
          }
],
        diagramType: 'xsuaa-oauth',
        analogy: {
          concept: "Authentication",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Authentication standardizes enterprise communication and data flow.',
          transition: 'Without standardized Authentication, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Authentication provides core capabilities for SAP BTP applications, as defined in Module 5.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Create the XSUAA instance from your xs-security.json with cf create-service and a service key with cf create-service-key. Obtain a client credentials token for your service key in Postman and call a protected endpoint. Decode the JWT locally and list every scope and attribute inside it. Configure two mocked users with different roles in cds.requires.auth for local tests. Draw sequence diagrams for the user login flow and the client credentials flow in your own app. Verification /",
          btpFit: "Call the protected endpoint with no token, an expired token, a token for another app, and a valid token, and explain each response code. Explain when you would use user token exchange rather than client credentials.",
        },
        jargonTerms: [
          {
            term: "XSUAA",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "xs-security.json",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "CAP setup",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Authentication Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '5.1', title: 'Authentication', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Authentication)',
          context: 'An international enterprise implements Authentication to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Authentication.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-5-1-q1',
            question: 'What is the primary role of Authentication in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-5-1-q2',
            question: 'According to the syllabus, how does Authentication handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-5-1-q3',
            question: 'What is the required mastery outcome for Module 5.1 (Authentication)?',
            options: [
              { id: 'a', text: "Call the protected endpoint with no token, an expired token, a token for another app, and ", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 5.1 establishes the core mechanics for Authentication.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Create the XSUAA instance from your xs-security.json with cf create-service and a service key with cf create-service-key. Obtain a client credentials token for your service key in Postman and call a protected endpoint. Decode the JWT locally and list every scope and attribute inside it. Configure two mocked users with different roles in cds.requires.auth for local tests. Draw sequence diagrams for the user login flow and the client credentials flow in your own app. Verification /"
      },
      {
        id: 'mod-5-2',
        code: '5.2',
        phaseId: 'phase-5',
        title: "Authorization",
        tagline: "Role Templates, Scopes, and Attribute-Based Access Control",
        summary: "Define 3 roles for your app: Viewer, Planner, Admin, with matching scopes, role templates and role collections. Restrict entities with @restrict: Viewer reads, Planner reads and runs actions, Admin has full access. Add an attribute-based rule so a Planner sees only orders of their region. Write at least 12 tests covering every role against every sensitive operation. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Model: scopes are technical permissions, role templates group scopes, role collections group roles and are assigned to users.", "Declarative CAP authorization: @requires on services and entities, @restrict with grant, to, and where, @readonly, and @insertonly.", "Pseudo roles: authenticated-user, any, system-user, and internal-user for service-to-service calls.", "Instance-based and attribute-based access: where conditions such as a region or supplier owned by the user, $user attributes from xs.user.attributes, and how attributes are defined in xs-security.json.", "Programmatic checks: req.user.is('role'), req.user.attr, req.reject(403), and cds.context.user.", "Least privilege: read-only roles by default, separation of admin and business roles, and avoiding roles that grant everything.", "Role administration: creating role collections in the cockpit, assigning them to users and groups, and the delay before a token reflects a change.", "Testing authorization: automated tests per role with mocked users.", "Required"],
        practicalImplementation: "Define 3 roles for your app: Viewer, Planner, Admin, with matching scopes, role templates and role collections. Restrict entities with @restrict: Viewer reads, Planner reads and runs actions, Admin has full access. Add an attribute-based rule so a Planner sees only orders of their region. Write at least 12 tests covering every role against every sensitive operation. Verification /",
        masteryCheck: "Produce a role-by-operation matrix and show that the test results match it exactly. Show a request that is denied with 403 because of an attribute rule, and explain why it was not a 401.",
        learningObjectives: ["Model: scopes are technical permissions, role templates group scopes, role collections group roles and are assigned to users.", "Declarative CAP authorization: @requires on services and entities, @restrict with grant, to, and where, @readonly, and @insertonly.", "Pseudo roles: authenticated-user, any, system-user, and internal-user for service-to-service calls.", "Instance-based and attribute-based access: where conditions such as a region or supplier owned by the user, $user attributes from xs.user.attributes, and how attributes are defined in xs-security.json."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Model",
                    "explanation": "Model: scopes are technical permissions, role templates group scopes, role collections group roles and are assigned to users. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authorization enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Model and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Model decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Declarative CAP authorization",
                    "explanation": "Declarative CAP authorization: @requires on services and entities, @restrict with grant, to, and where, @readonly, and @insertonly. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authorization enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Declarative CAP authorization and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Declarative CAP authorization decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Pseudo roles",
                    "explanation": "Pseudo roles: authenticated-user, any, system-user, and internal-user for service-to-service calls. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authorization enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Pseudo roles and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Pseudo roles decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Instance-based and attribute-based acces",
                    "explanation": "Instance-based and attribute-based access: where conditions such as a region or supplier owned by the user, $user attributes from xs.user.attributes, and how attributes are defined in xs-security.json. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authorization enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Instance-based and attribute-based access and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Instance-based and attribute-based access decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Programmatic checks",
                    "explanation": "Programmatic checks: req.user.is('role'), req.user.attr, req.reject(403), and cds.context.user. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Authorization enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Programmatic checks and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Programmatic checks decouples application logic from underlying database schemas."
          }
],
        diagramType: 'xsuaa-oauth',
        analogy: {
          concept: "Authorization",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Authorization standardizes enterprise communication and data flow.',
          transition: 'Without standardized Authorization, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Authorization provides core capabilities for SAP BTP applications, as defined in Module 5.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Define 3 roles for your app: Viewer, Planner, Admin, with matching scopes, role templates and role collections. Restrict entities with @restrict: Viewer reads, Planner reads and runs actions, Admin has full access. Add an attribute-based rule so a Planner sees only orders of their region. Write at least 12 tests covering every role against every sensitive operation. Verification /",
          btpFit: "Produce a role-by-operation matrix and show that the test results match it exactly. Show a request that is denied with 403 because of an attribute rule, and explain why it was not a 401.",
        },
        jargonTerms: [
          {
            term: "Model",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Declarative CAP authorization",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Pseudo roles",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Authorization Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '5.2', title: 'Authorization', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Authorization)',
          context: 'An international enterprise implements Authorization to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Authorization.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-5-2-q1',
            question: 'What is the primary role of Authorization in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-5-2-q2',
            question: 'According to the syllabus, how does Authorization handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-5-2-q3',
            question: 'What is the required mastery outcome for Module 5.2 (Authorization)?',
            options: [
              { id: 'a', text: "Produce a role-by-operation matrix and show that the test results match it exactly. Show a", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 5.2 establishes the core mechanics for Authorization.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Define 3 roles for your app: Viewer, Planner, Admin, with matching scopes, role templates and role collections. Restrict entities with @restrict: Viewer reads, Planner reads and runs actions, Admin has full access. Add an attribute-based rule so a Planner sees only orders of their region. Write at least 12 tests covering every role against every sensitive operation. Verification /"
      },
      {
        id: 'mod-5-3',
        code: '5.3',
        phaseId: 'phase-5',
        title: "Destinations",
        tagline: "Destination Service, On-Premise Cloud Connector & Proxy",
        summary: "Create a destination to the public TripPin service or an API from SAP Business Accelerator Hub sandbox. Import its EDMX into your CAP project with cds import and consume it as a remote service. Call it through the Cloud SDK using the destination name and handle an unreachable system gracefully. Mock the remote service for tests so the test suite runs without internet access. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Purpose: keep URLs and credentials outside code and manage them per subaccount or per service instance.", "Destination fields: Name, Type (HTTP), URL, ProxyType (Internet, OnPremise), Authentication, and additional properties.", "Authentication types: NoAuthentication, BasicAuthentication, OAuth2ClientCredentials, OAuth2UserTokenExchange, OAuth2SAMLBearerAssertion, PrincipalPropagation, ClientCertificateAuthentication, and when each applies.", "Connectivity service and Cloud Connector: reaching systems inside a corporate network, virtual host and port mappings, at concept level.", "Consuming from CAP: cds.requires.<name>.credentials.destination, cds.connect.to, remote services defined from an imported EDMX with cds import, and mocking a remote service for local tests.", "SAP Cloud SDK: @sap-cloud-sdk/http-client executeHttpRequest, @sap-cloud-sdk/connectivity destination lookup, and generated OData clients from @sap-cloud-sdk/generator.", "Binding the destination service: the destination service instance in mta.yaml and the instance-level destination configuration.", "Resilience: timeouts, retries and clear error messages when a remote system is down.", "Required"],
        practicalImplementation: "Create a destination to the public TripPin service or an API from SAP Business Accelerator Hub sandbox. Import its EDMX into your CAP project with cds import and consume it as a remote service. Call it through the Cloud SDK using the destination name and handle an unreachable system gracefully. Mock the remote service for tests so the test suite runs without internet access. Verification /",
        masteryCheck: "Change the destination URL in the cockpit and show your app using the new target with no code change. Explain which authentication type you would choose for 4 given integration scenarios.",
        learningObjectives: ["Purpose: keep URLs and credentials outside code and manage them per subaccount or per service instance.", "Destination fields: Name, Type (HTTP), URL, ProxyType (Internet, OnPremise), Authentication, and additional properties.", "Authentication types: NoAuthentication, BasicAuthentication, OAuth2ClientCredentials, OAuth2UserTokenExchange, OAuth2SAMLBearerAssertion, PrincipalPropagation, ClientCertificateAuthentication, and when each applies.", "Connectivity service and Cloud Connector: reaching systems inside a corporate network, virtual host and port mappings, at concept level."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Purpose",
                    "explanation": "Purpose: keep URLs and credentials outside code and manage them per subaccount or per service instance. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Destinations enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Purpose and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Purpose decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Destination fields",
                    "explanation": "Destination fields: Name, Type (HTTP), URL, ProxyType (Internet, OnPremise), Authentication, and additional properties. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Destinations enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Destination fields and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Destination fields decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Authentication types",
                    "explanation": "Authentication types: NoAuthentication, BasicAuthentication, OAuth2ClientCredentials, OAuth2UserTokenExchange, OAuth2SAMLBearerAssertion, PrincipalPropagation, ClientCertificateAuthentication, and when each applies. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Destinations enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Authentication types and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Authentication types decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Connectivity service and Cloud Connector",
                    "explanation": "Connectivity service and Cloud Connector: reaching systems inside a corporate network, virtual host and port mappings, at concept level. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Destinations enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Connectivity service and Cloud Connector and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Connectivity service and Cloud Connector decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Consuming from CAP",
                    "explanation": "Consuming from CAP: cds.requires.<name>.credentials.destination, cds.connect.to, remote services defined from an imported EDMX with cds import, and mocking a remote service for local tests. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Destinations enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Consuming from CAP and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Consuming from CAP decouples application logic from underlying database schemas."
          }
],
        diagramType: 'cloud-connector-tunnel',
        analogy: {
          concept: "Destinations",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Destinations standardizes enterprise communication and data flow.',
          transition: 'Without standardized Destinations, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Destinations provides core capabilities for SAP BTP applications, as defined in Module 5.3.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Create a destination to the public TripPin service or an API from SAP Business Accelerator Hub sandbox. Import its EDMX into your CAP project with cds import and consume it as a remote service. Call it through the Cloud SDK using the destination name and handle an unreachable system gracefully. Mock the remote service for tests so the test suite runs without internet access. Verification /",
          btpFit: "Change the destination URL in the cockpit and show your app using the new target with no code change. Explain which authentication type you would choose for 4 given integration scenarios.",
        },
        jargonTerms: [
          {
            term: "Purpose",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Destination fields",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Authentication types",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Destinations Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '5.3', title: 'Destinations', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Destinations)',
          context: 'An international enterprise implements Destinations to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Destinations.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-5-3-q1',
            question: 'What is the primary role of Destinations in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-5-3-q2',
            question: 'According to the syllabus, how does Destinations handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-5-3-q3',
            question: 'What is the required mastery outcome for Module 5.3 (Destinations)?',
            options: [
              { id: 'a', text: "Change the destination URL in the cockpit and show your app using the new target with no c", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 5.3 establishes the core mechanics for Destinations.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Create a destination to the public TripPin service or an API from SAP Business Accelerator Hub sandbox. Import its EDMX into your CAP project with cds import and consume it as a remote service. Call it through the Cloud SDK using the destination name and handle an unreachable system gracefully. Mock the remote service for tests so the test suite runs without internet access. Verification /"
      },
      {
        id: 'mod-5-4',
        code: '5.4',
        phaseId: 'phase-5',
        title: "Secure Development",
        tagline: "Secrets Management, Defensive Headers, and Security Audits",
        summary: "Run npm audit, fix or document every finding, and set up automated dependency update checks on your repository. Review your project against the OWASP Top 10 and write a one-line mitigation for each item. Write 6 negative tests: oversized input, wrong type, injection-like strings, missing token, wrong role, and tampered ID. Check your logs and remove any token or personal data that appears. Verification /",
        estimatedMinutes: 35,
        level: 'Intermediate',
        subtopics: ["Secrets management: no secrets in Git, service keys and credentials only from bindings, rotating secrets, and .gitignore plus secret scanning.", "Input validation: @assert.* annotations, handler validation, length limits, and rejecting unexpected fields.", "Injection and output handling: why CQL and parameterised queries prevent SQL injection, and why you never concatenate user input into queries, cross-site scripting at concept level, and encoding output.", "Secure headers and transport: HTTPS only, helmet-style headers (Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security), CORS configuration, and CSRF protection handled by the App Router.", "Dependencies: npm audit, lockfiles, pinning versions, Dependabot-style updates, and avoiding abandoned packages.", "Data protection: personal data minimisation, logging without personal data or tokens, and awareness of the GDPR principles.", "Security testing: static analysis, dependency scanning, negative tests, and an OWASP Top 10 checklist review.", "Required"],
        practicalImplementation: "Run npm audit, fix or document every finding, and set up automated dependency update checks on your repository. Review your project against the OWASP Top 10 and write a one-line mitigation for each item. Write 6 negative tests: oversized input, wrong type, injection-like strings, missing token, wrong role, and tampered ID. Check your logs and remove any token or personal data that appears. Verification /",
        masteryCheck: "Pass a self-review in which every OWASP item is either mitigated with evidence or explicitly marked not applicable with a reason. Show that no secret exists in the Git history, using a secret scanning tool.",
        learningObjectives: ["Secrets management: no secrets in Git, service keys and credentials only from bindings, rotating secrets, and .gitignore plus secret scanning.", "Input validation: @assert.* annotations, handler validation, length limits, and rejecting unexpected fields.", "Injection and output handling: why CQL and parameterised queries prevent SQL injection, and why you never concatenate user input into queries, cross-site scripting at concept level, and encoding output.", "Secure headers and transport: HTTPS only, helmet-style headers (Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security), CORS configuration, and CSRF protection handled by the App Router."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Secrets management",
                    "explanation": "Secrets management: no secrets in Git, service keys and credentials only from bindings, rotating secrets, and .gitignore plus secret scanning. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Secure Development enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Secrets management and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Secrets management decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Input validation",
                    "explanation": "Input validation: @assert.* annotations, handler validation, length limits, and rejecting unexpected fields. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Secure Development enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Input validation and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Input validation decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Injection and output handling",
                    "explanation": "Injection and output handling: why CQL and parameterised queries prevent SQL injection, and why you never concatenate user input into queries, cross-site scripting at concept level, and encoding output. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Secure Development enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Injection and output handling and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Injection and output handling decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Secure headers and transport",
                    "explanation": "Secure headers and transport: HTTPS only, helmet-style headers (Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security), CORS configuration, and CSRF protection handled by the App Router. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Secure Development enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Secure headers and transport and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Secure headers and transport decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Dependencies",
                    "explanation": "Dependencies: npm audit, lockfiles, pinning versions, Dependabot-style updates, and avoiding abandoned packages. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Secure Development enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Dependencies and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Dependencies decouples application logic from underlying database schemas."
          }
],
        diagramType: 'http-troubleshooting',
        analogy: {
          concept: "Secure Development",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Secure Development standardizes enterprise communication and data flow.',
          transition: 'Without standardized Secure Development, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Secure Development provides core capabilities for SAP BTP applications, as defined in Module 5.4.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Run npm audit, fix or document every finding, and set up automated dependency update checks on your repository. Review your project against the OWASP Top 10 and write a one-line mitigation for each item. Write 6 negative tests: oversized input, wrong type, injection-like strings, missing token, wrong role, and tampered ID. Check your logs and remove any token or personal data that appears. Verification /",
          btpFit: "Pass a self-review in which every OWASP item is either mitigated with evidence or explicitly marked not applicable with a reason. Show that no secret exists in the Git history, using a secret scanning tool.",
        },
        jargonTerms: [
          {
            term: "Secrets management",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Input validation",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Injection and output handling",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Secure Development Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '5.4', title: 'Secure Development', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Secure Development)',
          context: 'An international enterprise implements Secure Development to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Secure Development.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-5-4-q1',
            question: 'What is the primary role of Secure Development in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-5-4-q2',
            question: 'According to the syllabus, how does Secure Development handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-5-4-q3',
            question: 'What is the required mastery outcome for Module 5.4 (Secure Development)?',
            options: [
              { id: 'a', text: "Pass a self-review in which every OWASP item is either mitigated with evidence or explicit", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 5.4 establishes the core mechanics for Secure Development.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Run npm audit, fix or document every finding, and set up automated dependency update checks on your repository. Review your project against the OWASP Top 10 and write a one-line mitigation for each item. Write 6 negative tests: oversized input, wrong type, injection-like strings, missing token, wrong role, and tampered ID. Check your logs and remove any token or personal data that appears. Verification /"
      },
    ]
  },
  {
    id: 'phase-6',
    number: 6,
    title: "Deploy and Operate",
    tagline: 'Phase 6 · Weeks 1-2 · ~12 Hours',
    description: "Package the full application as an MTA, deploy it with one command, automate build, test and deploy with a pipeline, and diagnose failures from logs and metrics.",
    coreObjective: "Package the full application as an MTA, deploy it with one command, automate build, test and deploy with a pipeline, and diagnose failures from logs and metrics.",
    estimatedHours: 12,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'core',
    capstone: PHASE_CAPSTONES[6]!,
    modules: [
      {
        id: 'mod-6-1',
        code: '6.1',
        phaseId: 'phase-6',
        title: "MTA Deployment",
        tagline: "Multi-Target Application Descriptors (mta.yaml) & Packaging",
        summary: "Generate mta.yaml with cds add mta for your secured app and read every module and resource. Build the .mtar, deploy it, and open the app through the App Router URL. Change one handler, rebuild, and redeploy, then repeat using blue-green. Create a test.mtaext that changes the instance count and one environment variable. Undeploy cleanly and confirm no orphan services remain. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["mta.yaml structure: _schema-version, ID, version, modules, resources, parameters, build-parameters.", "Module types in a CAP app: the Node.js service module, the database deployer module, the App Router module, and the UI deployer module for the HTML5 repository.", "Resources: managed service instances for XSUAA, HANA Cloud (hdi-shared), destination, and HTML5 application repository, with their service, service-plan and config.", "Wiring: requires, provides, properties, group for destinations, and placeholders of the form ~{name} and ${name}.", "Build: cds build --production, then mbt build -t gen --mtar app.mtar, and what each module's build-parameters does.", "Deploy and manage: cf deploy gen/app.mtar, cf mtas, cf mta-ops, cf dmol for downloading operation logs, cf undeploy <id> --delete-services.", "Per-environment configuration: MTA extension descriptors .mtaext passed with -e.", "Release strategy: --strategy blue-green and the manual resume or abort steps, plus version rules.", "Regeneration: cds add mta and how to keep manual edits safe.", "Required"],
        practicalImplementation: "Generate mta.yaml with cds add mta for your secured app and read every module and resource. Build the .mtar, deploy it, and open the app through the App Router URL. Change one handler, rebuild, and redeploy, then repeat using blue-green. Create a test.mtaext that changes the instance count and one environment variable. Undeploy cleanly and confirm no orphan services remain. Verification /",
        masteryCheck: "Deploy the application from a clean checkout with a single build command and a single deploy command. Explain the effect of each requires entry in your mta.yaml.",
        learningObjectives: ["mta.yaml structure: _schema-version, ID, version, modules, resources, parameters, build-parameters.", "Module types in a CAP app: the Node.js service module, the database deployer module, the App Router module, and the UI deployer module for the HTML5 repository.", "Resources: managed service instances for XSUAA, HANA Cloud (hdi-shared), destination, and HTML5 application repository, with their service, service-plan and config.", "Wiring: requires, provides, properties, group for destinations, and placeholders of the form ~{name} and ${name}."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "mta.yaml structure",
                    "explanation": "mta.yaml structure: _schema-version, ID, version, modules, resources, parameters, build-parameters. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "MTA Deployment enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review mta.yaml structure and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how mta.yaml structure decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Module types in a CAP app",
                    "explanation": "Module types in a CAP app: the Node.js service module, the database deployer module, the App Router module, and the UI deployer module for the HTML5 repository. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "MTA Deployment enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Module types in a CAP app and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Module types in a CAP app decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Resources",
                    "explanation": "Resources: managed service instances for XSUAA, HANA Cloud (hdi-shared), destination, and HTML5 application repository, with their service, service-plan and config. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "MTA Deployment enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Resources and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Resources decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Wiring",
                    "explanation": "Wiring: requires, provides, properties, group for destinations, and placeholders of the form ~{name} and ${name}. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "MTA Deployment enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Wiring and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Wiring decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Build",
                    "explanation": "Build: cds build --production, then mbt build -t gen --mtar app.mtar, and what each module's build-parameters does. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "MTA Deployment enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Build and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Build decouples application logic from underlying database schemas."
          }
],
        diagramType: 'mta-lifecycle',
        analogy: {
          concept: "MTA Deployment",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, MTA Deployment standardizes enterprise communication and data flow.',
          transition: 'Without standardized MTA Deployment, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "MTA Deployment provides core capabilities for SAP BTP applications, as defined in Module 6.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Generate mta.yaml with cds add mta for your secured app and read every module and resource. Build the .mtar, deploy it, and open the app through the App Router URL. Change one handler, rebuild, and redeploy, then repeat using blue-green. Create a test.mtaext that changes the instance count and one environment variable. Undeploy cleanly and confirm no orphan services remain. Verification /",
          btpFit: "Deploy the application from a clean checkout with a single build command and a single deploy command. Explain the effect of each requires entry in your mta.yaml.",
        },
        jargonTerms: [
          {
            term: "mta.yaml structure",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Module types in a CAP app",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Resources",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical MTA Deployment Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '6.1', title: 'MTA Deployment', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (MTA Deployment)',
          context: 'An international enterprise implements MTA Deployment to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for MTA Deployment.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-6-1-q1',
            question: 'What is the primary role of MTA Deployment in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-6-1-q2',
            question: 'According to the syllabus, how does MTA Deployment handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-6-1-q3',
            question: 'What is the required mastery outcome for Module 6.1 (MTA Deployment)?',
            options: [
              { id: 'a', text: "Deploy the application from a clean checkout with a single build command and a single depl", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 6.1 establishes the core mechanics for MTA Deployment.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Generate mta.yaml with cds add mta for your secured app and read every module and resource. Build the .mtar, deploy it, and open the app through the App Router URL. Change one handler, rebuild, and redeploy, then repeat using blue-green. Create a test.mtaext that changes the instance count and one environment variable. Undeploy cleanly and confirm no orphan services remain. Verification /"
      },
      {
        id: 'mod-6-2',
        code: '6.2',
        phaseId: 'phase-6',
        title: "CI and CD Basics",
        tagline: "Continuous Integration Pipelines and Build-Once Deploy-Many",
        summary: "Write a workflow that installs dependencies, lints, runs tests with coverage, and builds the .mtar on every pull request. Add a deploy job to the test environment that runs on a version tag and uses stored secrets. Add a manual approval step before a second environment. Practise a rollback by redeploying the previous artifact. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Repository workflow: main branch protection, feature branches, pull requests, required checks, and semantic version tags.", "Pipeline stages: install, lint, test, build, package, deploy to test, approval, deploy to production.", "Tools: GitHub Actions workflows (on, jobs, steps, needs, secrets, environments) and, at awareness level, SAP Continuous Integration and Delivery service and the Project Piper library.", "Credentials in pipelines: a technical Cloud Foundry user, storing credentials as pipeline secrets, and cf auth rather than interactive login.", "Artifacts: building the .mtar once, storing it as an artifact, and deploying that same artifact to each environment.", "Approvals and rollback: manual approval gates, redeploying the previous artifact, and database change risks during rollback.", "Speed: dependency caching and running independent jobs in parallel.", "Required"],
        practicalImplementation: "Write a workflow that installs dependencies, lints, runs tests with coverage, and builds the .mtar on every pull request. Add a deploy job to the test environment that runs on a version tag and uses stored secrets. Add a manual approval step before a second environment. Practise a rollback by redeploying the previous artifact. Verification /",
        masteryCheck: "Push a commit and watch it reach the test environment in under 15 minutes without manual steps. Push a commit with a failing test and show that the deployment is blocked.",
        learningObjectives: ["Repository workflow: main branch protection, feature branches, pull requests, required checks, and semantic version tags.", "Pipeline stages: install, lint, test, build, package, deploy to test, approval, deploy to production.", "Tools: GitHub Actions workflows (on, jobs, steps, needs, secrets, environments) and, at awareness level, SAP Continuous Integration and Delivery service and the Project Piper library.", "Credentials in pipelines: a technical Cloud Foundry user, storing credentials as pipeline secrets, and cf auth rather than interactive login."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Repository workflow",
                    "explanation": "Repository workflow: main branch protection, feature branches, pull requests, required checks, and semantic version tags. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CI and CD Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Repository workflow and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Repository workflow decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Pipeline stages",
                    "explanation": "Pipeline stages: install, lint, test, build, package, deploy to test, approval, deploy to production. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CI and CD Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Pipeline stages and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Pipeline stages decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Tools",
                    "explanation": "Tools: GitHub Actions workflows (on, jobs, steps, needs, secrets, environments) and, at awareness level, SAP Continuous Integration and Delivery service and the Project Piper library. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CI and CD Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Tools and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Tools decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Credentials in pipelines",
                    "explanation": "Credentials in pipelines: a technical Cloud Foundry user, storing credentials as pipeline secrets, and cf auth rather than interactive login. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CI and CD Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Credentials in pipelines and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Credentials in pipelines decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Artifacts",
                    "explanation": "Artifacts: building the .mtar once, storing it as an artifact, and deploying that same artifact to each environment. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "CI and CD Basics enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Artifacts and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Artifacts decouples application logic from underlying database schemas."
          }
],
        diagramType: 'mta-lifecycle',
        analogy: {
          concept: "CI and CD Basics",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, CI and CD Basics standardizes enterprise communication and data flow.',
          transition: 'Without standardized CI and CD Basics, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "CI and CD Basics provides core capabilities for SAP BTP applications, as defined in Module 6.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Write a workflow that installs dependencies, lints, runs tests with coverage, and builds the .mtar on every pull request. Add a deploy job to the test environment that runs on a version tag and uses stored secrets. Add a manual approval step before a second environment. Practise a rollback by redeploying the previous artifact. Verification /",
          btpFit: "Push a commit and watch it reach the test environment in under 15 minutes without manual steps. Push a commit with a failing test and show that the deployment is blocked.",
        },
        jargonTerms: [
          {
            term: "Repository workflow",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Pipeline stages",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Tools",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical CI and CD Basics Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '6.2', title: 'CI and CD Basics', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (CI and CD Basics)',
          context: 'An international enterprise implements CI and CD Basics to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for CI and CD Basics.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-6-2-q1',
            question: 'What is the primary role of CI and CD Basics in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-6-2-q2',
            question: 'According to the syllabus, how does CI and CD Basics handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-6-2-q3',
            question: 'What is the required mastery outcome for Module 6.2 (CI and CD Basics)?',
            options: [
              { id: 'a', text: "Push a commit and watch it reach the test environment in under 15 minutes without manual s", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 6.2 establishes the core mechanics for CI and CD Basics.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Write a workflow that installs dependencies, lints, runs tests with coverage, and builds the .mtar on every pull request. Add a deploy job to the test environment that runs on a version tag and uses stored secrets. Add a manual approval step before a second environment. Practise a rollback by redeploying the previous artifact. Verification /"
      },
      {
        id: 'mod-6-3',
        code: '6.3',
        phaseId: 'phase-6',
        title: "Testing and Quality",
        tagline: "Automated Unit, Integration, and Mock Service Test Suites",
        summary: "Add ESLint and Prettier and fix every finding. Raise your suite to at least 40 tests, with a Jest coverage threshold that fails the build below your chosen value. Replace every external call in the tests with a mock. Write a pull request checklist file and use it on your own pull request. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Test types: unit tests for pure functions, integration tests of services with cds.test, API tests against a running service, and, at awareness level, UI tests with OPA5 or WebdriverIO.", "Test design: arrange, act, assert, one behaviour per test, independent tests, and meaningful names.", "Mocks: mocking remote services and the AI services so tests never call the internet or cost money.", "Test data: deterministic seed data, resetting between tests, and no dependence on test order.", "Coverage: Jest coverage reports, thresholds in the configuration, and why coverage is a signal and not a goal.", "Static quality: ESLint with @sap/eslint-plugin-cds, Prettier formatting, TypeScript strictness, and removing dead code.", "Review: a pull request checklist covering security, tests, naming, error handling, and documentation.", "Required"],
        practicalImplementation: "Add ESLint and Prettier and fix every finding. Raise your suite to at least 40 tests, with a Jest coverage threshold that fails the build below your chosen value. Replace every external call in the tests with a mock. Write a pull request checklist file and use it on your own pull request. Verification /",
        masteryCheck: "The pipeline fails when coverage drops under the threshold or lint errors appear, and passes when they are fixed. The test suite runs offline.",
        learningObjectives: ["Test types: unit tests for pure functions, integration tests of services with cds.test, API tests against a running service, and, at awareness level, UI tests with OPA5 or WebdriverIO.", "Test design: arrange, act, assert, one behaviour per test, independent tests, and meaningful names.", "Mocks: mocking remote services and the AI services so tests never call the internet or cost money.", "Test data: deterministic seed data, resetting between tests, and no dependence on test order."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Test types",
                    "explanation": "Test types: unit tests for pure functions, integration tests of services with cds.test, API tests against a running service, and, at awareness level, UI tests with OPA5 or WebdriverIO. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Testing and Quality enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Test types and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Test types decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Test design",
                    "explanation": "Test design: arrange, act, assert, one behaviour per test, independent tests, and meaningful names. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Testing and Quality enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Test design and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Test design decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Mocks",
                    "explanation": "Mocks: mocking remote services and the AI services so tests never call the internet or cost money. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Testing and Quality enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Mocks and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Mocks decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Test data",
                    "explanation": "Test data: deterministic seed data, resetting between tests, and no dependence on test order. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Testing and Quality enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Test data and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Test data decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Coverage",
                    "explanation": "Coverage: Jest coverage reports, thresholds in the configuration, and why coverage is a signal and not a goal. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Testing and Quality enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Coverage and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Coverage decouples application logic from underlying database schemas."
          }
],
        diagramType: 'http-troubleshooting',
        analogy: {
          concept: "Testing and Quality",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Testing and Quality standardizes enterprise communication and data flow.',
          transition: 'Without standardized Testing and Quality, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Testing and Quality provides core capabilities for SAP BTP applications, as defined in Module 6.3.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Add ESLint and Prettier and fix every finding. Raise your suite to at least 40 tests, with a Jest coverage threshold that fails the build below your chosen value. Replace every external call in the tests with a mock. Write a pull request checklist file and use it on your own pull request. Verification /",
          btpFit: "The pipeline fails when coverage drops under the threshold or lint errors appear, and passes when they are fixed. The test suite runs offline.",
        },
        jargonTerms: [
          {
            term: "Test types",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Test design",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Mocks",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Testing and Quality Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '6.3', title: 'Testing and Quality', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Testing and Quality)',
          context: 'An international enterprise implements Testing and Quality to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Testing and Quality.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-6-3-q1',
            question: 'What is the primary role of Testing and Quality in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-6-3-q2',
            question: 'According to the syllabus, how does Testing and Quality handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-6-3-q3',
            question: 'What is the required mastery outcome for Module 6.3 (Testing and Quality)?',
            options: [
              { id: 'a', text: "The pipeline fails when coverage drops under the threshold or lint errors appear, and pass", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 6.3 establishes the core mechanics for Testing and Quality.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Add ESLint and Prettier and fix every finding. Raise your suite to at least 40 tests, with a Jest coverage threshold that fails the build below your chosen value. Replace every external call in the tests with a mock. Write a pull request checklist file and use it on your own pull request. Verification /"
      },
      {
        id: 'mod-6-4',
        code: '6.4',
        phaseId: 'phase-6',
        title: "Monitoring and Troubleshooting",
        tagline: "Cloud Logging, Metrics, Diagnostics, and Incident Runbooks",
        summary: "Add structured logging with a correlation ID passed through your service and the remote calls. Break the deployed app in 5 ways (missing binding, wrong memory, wrong role, stopped database, wrong destination URL) and diagnose each from logs only. Write a troubleshooting runbook listing symptom, likely cause, check command and fix. Write one incident report for the hardest fault. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Logs: cf logs --recent, cf logs streaming, cds.log with levels, structured JSON logs, correlation IDs, and what must never be logged.", "Health and state: cf app, cf events, cf env, cf ssh once enabled, health check type and timeout, and a /health route.", "Metrics and alerts: CPU, memory, disk and request metrics from the cockpit and cf app, and, at awareness level, SAP Cloud Logging, SAP Alert Notification service and SAP Cloud ALM.", "Deployment problems: staging failures, missing start script, Exceeded memory crashes, route conflicts, missing service bindings, and failed HDI deployments, read with cf dmol.", "Authentication problems: 401 versus 403, invalid_token, wrong audience, missing scope, and role collection not assigned.", "Connectivity problems: destination errors, DNS and proxy problems, and testing from the container with cf ssh.", "Database problems: stopped HANA Cloud instance, container binding errors, and connection limits.", "Incident practice: timeline, impact, root cause, fix, and prevention actions in a short write-up.", "Required"],
        practicalImplementation: "Add structured logging with a correlation ID passed through your service and the remote calls. Break the deployed app in 5 ways (missing binding, wrong memory, wrong role, stopped database, wrong destination URL) and diagnose each from logs only. Write a troubleshooting runbook listing symptom, likely cause, check command and fix. Write one incident report for the hardest fault. Verification /",
        masteryCheck: "Given 5 unseen faults, diagnose each in under 10 minutes using only your runbook and the CLI.",
        learningObjectives: ["Logs: cf logs --recent, cf logs streaming, cds.log with levels, structured JSON logs, correlation IDs, and what must never be logged.", "Health and state: cf app, cf events, cf env, cf ssh once enabled, health check type and timeout, and a /health route.", "Metrics and alerts: CPU, memory, disk and request metrics from the cockpit and cf app, and, at awareness level, SAP Cloud Logging, SAP Alert Notification service and SAP Cloud ALM.", "Deployment problems: staging failures, missing start script, Exceeded memory crashes, route conflicts, missing service bindings, and failed HDI deployments, read with cf dmol."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Logs",
                    "explanation": "Logs: cf logs --recent, cf logs streaming, cds.log with levels, structured JSON logs, correlation IDs, and what must never be logged. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Monitoring and Troubleshooting enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Logs and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Logs decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Health and state",
                    "explanation": "Health and state: cf app, cf events, cf env, cf ssh once enabled, health check type and timeout, and a /health route. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Monitoring and Troubleshooting enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Health and state and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Health and state decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Metrics and alerts",
                    "explanation": "Metrics and alerts: CPU, memory, disk and request metrics from the cockpit and cf app, and, at awareness level, SAP Cloud Logging, SAP Alert Notification service and SAP Cloud ALM. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Monitoring and Troubleshooting enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Metrics and alerts and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Metrics and alerts decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Deployment problems",
                    "explanation": "Deployment problems: staging failures, missing start script, Exceeded memory crashes, route conflicts, missing service bindings, and failed HDI deployments, read with cf dmol. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Monitoring and Troubleshooting enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Deployment problems and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Deployment problems decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Authentication problems",
                    "explanation": "Authentication problems: 401 versus 403, invalid_token, wrong audience, missing scope, and role collection not assigned. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Monitoring and Troubleshooting enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Authentication problems and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Authentication problems decouples application logic from underlying database schemas."
          }
],
        diagramType: 'http-troubleshooting',
        analogy: {
          concept: "Monitoring and Troubleshooting",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Monitoring and Troubleshooting standardizes enterprise communication and data flow.',
          transition: 'Without standardized Monitoring and Troubleshooting, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Monitoring and Troubleshooting provides core capabilities for SAP BTP applications, as defined in Module 6.4.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Add structured logging with a correlation ID passed through your service and the remote calls. Break the deployed app in 5 ways (missing binding, wrong memory, wrong role, stopped database, wrong destination URL) and diagnose each from logs only. Write a troubleshooting runbook listing symptom, likely cause, check command and fix. Write one incident report for the hardest fault. Verification /",
          btpFit: "Given 5 unseen faults, diagnose each in under 10 minutes using only your runbook and the CLI.",
        },
        jargonTerms: [
          {
            term: "Logs",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Health and state",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Metrics and alerts",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Monitoring and Troubleshooting Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '6.4', title: 'Monitoring and Troubleshooting', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Monitoring and Troubleshooting)',
          context: 'An international enterprise implements Monitoring and Troubleshooting to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Monitoring and Troubleshooting.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-6-4-q1',
            question: 'What is the primary role of Monitoring and Troubleshooting in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-6-4-q2',
            question: 'According to the syllabus, how does Monitoring and Troubleshooting handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-6-4-q3',
            question: 'What is the required mastery outcome for Module 6.4 (Monitoring and Troubleshooting)?',
            options: [
              { id: 'a', text: "Given 5 unseen faults, diagnose each in under 10 minutes using only your runbook and the C", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 6.4 establishes the core mechanics for Monitoring and Troubleshooting.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Add structured logging with a correlation ID passed through your service and the remote calls. Break the deployed app in 5 ways (missing binding, wrong memory, wrong role, stopped database, wrong destination URL) and diagnose each from logs only. Write a troubleshooting runbook listing symptom, likely cause, check command and fix. Write one incident report for the hardest fault. Verification /"
      },
    ]
  },
  {
    id: 'phase-7',
    number: 7,
    title: "AI Layer on BTP",
    tagline: 'Phase 7 · Weeks 1-2 · ~36 Hours',
    description: "Explain SAP's AI architecture, serve a model on SAP AI Core, call language models through Generative AI Hub, build retrieval-augmented generation on HANA Cloud's vector engine from a CAP service, design a safe agent, and apply clean-core extension rules.",
    coreObjective: "Explain SAP's AI architecture, serve a model on SAP AI Core, call language models through Generative AI Hub, build retrieval-augmented generation on HANA Cloud's vector engine from a CAP service, design a safe agent, and apply clean-core extension rules.",
    estimatedHours: 36,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'ai-layer',
    capstone: PHASE_CAPSTONES[7]!,
    modules: [
      {
        id: 'mod-7-1',
        code: '7.1',
        phaseId: 'phase-7',
        title: "SAP Business AI Overview",
        tagline: "SAP AI Strategy, Joule Copilot, and Enterprise Use Cases",
        summary: "Read the SAP Business AI documentation and draw a one-page architecture of the layers above in your own words. Map 5 S/4HANA business processes to AI opportunities and classify each as embedded, extend on BTP, or build new. Choose one use case for your capstone and write a half-page justification including the data it needs and the risks. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Layers: AI embedded in SAP applications, the Joule assistant, and the BTP foundation for custom AI (AI Core, AI Launchpad, Generative AI Hub, SAP HANA Cloud with its vector engine, SAP Build Code with Joule for developers, Joule Studio), plus document processing services at awareness level.", "Build versus use: when embedded AI is enough, when to extend with BTP, and when to build a new application.", "Vocabulary: foundation model, token, context window, embedding, similarity search, RAG, fine-tuning versus prompting, function calling, agent, guardrail, grounding, hallucination.", "Responsible AI: data privacy, data masking, content filtering, human-in-the-loop, audit trails, cost control, and bias awareness.", "Use-case sources: SAP Business Accelerator Hub and SAP Discovery Center AI use cases, and the SAP Business AI roadmap.", "Required"],
        practicalImplementation: "Read the SAP Business AI documentation and draw a one-page architecture of the layers above in your own words. Map 5 S/4HANA business processes to AI opportunities and classify each as embedded, extend on BTP, or build new. Choose one use case for your capstone and write a half-page justification including the data it needs and the risks. Verification /",
        masteryCheck: "Explain AI Core, Generative AI Hub and Joule in 5 sentences without notes. Argue, for a given case, whether RAG, fine-tuning or a plain prompt is the right approach.",
        learningObjectives: ["Layers: AI embedded in SAP applications, the Joule assistant, and the BTP foundation for custom AI (AI Core, AI Launchpad, Generative AI Hub, SAP HANA Cloud with its vector engine, SAP Build Code with Joule for developers, Joule Studio), plus document processing services at awareness level.", "Build versus use: when embedded AI is enough, when to extend with BTP, and when to build a new application.", "Vocabulary: foundation model, token, context window, embedding, similarity search, RAG, fine-tuning versus prompting, function calling, agent, guardrail, grounding, hallucination.", "Responsible AI: data privacy, data masking, content filtering, human-in-the-loop, audit trails, cost control, and bias awareness."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Layers",
                    "explanation": "Layers: AI embedded in SAP applications, the Joule assistant, and the BTP foundation for custom AI (AI Core, AI Launchpad, Generative AI Hub, SAP HANA Cloud with its vector engine, SAP Build Code with Joule for developers, Joule Studio), plus document processing services at awareness level. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP Business AI Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Layers and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Layers decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Build versus use",
                    "explanation": "Build versus use: when embedded AI is enough, when to extend with BTP, and when to build a new application. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP Business AI Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Build versus use and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Build versus use decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Vocabulary",
                    "explanation": "Vocabulary: foundation model, token, context window, embedding, similarity search, RAG, fine-tuning versus prompting, function calling, agent, guardrail, grounding, hallucination. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP Business AI Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Vocabulary and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Vocabulary decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Responsible AI",
                    "explanation": "Responsible AI: data privacy, data masking, content filtering, human-in-the-loop, audit trails, cost control, and bias awareness. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP Business AI Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Responsible AI and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Responsible AI decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Use-case sources",
                    "explanation": "Use-case sources: SAP Business Accelerator Hub and SAP Discovery Center AI use cases, and the SAP Business AI roadmap. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP Business AI Overview enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Use-case sources and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Use-case sources decouples application logic from underlying database schemas."
          }
],
        diagramType: 'ai-core-rag',
        analogy: {
          concept: "SAP Business AI Overview",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, SAP Business AI Overview standardizes enterprise communication and data flow.',
          transition: 'Without standardized SAP Business AI Overview, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "SAP Business AI Overview provides core capabilities for SAP BTP applications, as defined in Module 7.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Read the SAP Business AI documentation and draw a one-page architecture of the layers above in your own words. Map 5 S/4HANA business processes to AI opportunities and classify each as embedded, extend on BTP, or build new. Choose one use case for your capstone and write a half-page justification including the data it needs and the risks. Verification /",
          btpFit: "Explain AI Core, Generative AI Hub and Joule in 5 sentences without notes. Argue, for a given case, whether RAG, fine-tuning or a plain prompt is the right approach.",
        },
        jargonTerms: [
          {
            term: "Layers",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Build versus use",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Vocabulary",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical SAP Business AI Overview Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '7.1', title: 'SAP Business AI Overview', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (SAP Business AI Overview)',
          context: 'An international enterprise implements SAP Business AI Overview to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for SAP Business AI Overview.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-7-1-q1',
            question: 'What is the primary role of SAP Business AI Overview in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-7-1-q2',
            question: 'According to the syllabus, how does SAP Business AI Overview handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-7-1-q3',
            question: 'What is the required mastery outcome for Module 7.1 (SAP Business AI Overview)?',
            options: [
              { id: 'a', text: "Explain AI Core, Generative AI Hub and Joule in 5 sentences without notes. Argue, for a gi", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 7.1 establishes the core mechanics for SAP Business AI Overview.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Read the SAP Business AI documentation and draw a one-page architecture of the layers above in your own words. Map 5 S/4HANA business processes to AI opportunities and classify each as embedded, extend on BTP, or build new. Choose one use case for your capstone and write a half-page justification including the data it needs and the risks. Verification /"
      },
      {
        id: 'mod-7-2',
        code: '7.2',
        phaseId: 'phase-7',
        title: "SAP AI Core",
        tagline: "SAP AI Core Serving Templates, Docker Images & Deployments",
        summary: "Create a resource group and register the registry and object store secrets. Onboard a Git repository holding a serving template and sync it. Package a small scikit-learn model (for example a simple demand forecaster) behind an inference endpoint, deploy it, and call it from Postman. Call it from a CAP action through a destination and return the prediction in your service. Stop and delete the deployment and record the cost drivers you observed. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Purpose: a managed runtime for training and serving AI workloads, controlled through the AI API and operated through AI Launchpad. Check the available service plans and whether your account has an entitlement.", "Core objects: resource groups (isolation, passed in the AI-Resource-Group header), scenarios, executables, configurations, executions for training, deployments for serving, artifacts, and secrets (container registry secret and object store secret).", "Templates: serving templates and workflow templates written in YAML, stored in a Git repository that AI Core synchronises through an onboarded repository and application.", "Access: the service key (AI API URL and authentication details), a client credentials token, and REST paths under /v2/lm/ for scenarios, configurations and deployments, or the Python AI Core SDK.", "Model packaging: train or load a model, wrap it in an inference server, build a Docker image, push it to a registry, expose the port and a health route, and read model files from the object store.", "Resources and cost: resource plans for CPU and GPU, replica counts, and deleting deployments after practice.", "Calling it from CAP: a destination to the deployment URL with OAuth2ClientCredentials and the resource group header.", "Required"],
        practicalImplementation: "Create a resource group and register the registry and object store secrets. Onboard a Git repository holding a serving template and sync it. Package a small scikit-learn model (for example a simple demand forecaster) behind an inference endpoint, deploy it, and call it from Postman. Call it from a CAP action through a destination and return the prediction in your service. Stop and delete the deployment and record the cost drivers you observed. Verification /",
        masteryCheck: "Show a deployment in a running state and a successful prediction call made from your CAP service. Explain how traffic to the deployment is authenticated, where the model files live, and what happens when you push a new image.",
        learningObjectives: ["Purpose: a managed runtime for training and serving AI workloads, controlled through the AI API and operated through AI Launchpad. Check the available service plans and whether your account has an entitlement.", "Core objects: resource groups (isolation, passed in the AI-Resource-Group header), scenarios, executables, configurations, executions for training, deployments for serving, artifacts, and secrets (container registry secret and object store secret).", "Templates: serving templates and workflow templates written in YAML, stored in a Git repository that AI Core synchronises through an onboarded repository and application.", "Access: the service key (AI API URL and authentication details), a client credentials token, and REST paths under /v2/lm/ for scenarios, configurations and deployments, or the Python AI Core SDK."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Purpose",
                    "explanation": "Purpose: a managed runtime for training and serving AI workloads, controlled through the AI API and operated through AI Launchpad. Check the available service plans and whether your account has an entitlement. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP AI Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Purpose and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Purpose decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Core objects",
                    "explanation": "Core objects: resource groups (isolation, passed in the AI-Resource-Group header), scenarios, executables, configurations, executions for training, deployments for serving, artifacts, and secrets (container registry secret and object store secret). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP AI Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Core objects and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Core objects decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Templates",
                    "explanation": "Templates: serving templates and workflow templates written in YAML, stored in a Git repository that AI Core synchronises through an onboarded repository and application. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP AI Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Templates and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Templates decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Access",
                    "explanation": "Access: the service key (AI API URL and authentication details), a client credentials token, and REST paths under /v2/lm/ for scenarios, configurations and deployments, or the Python AI Core SDK. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP AI Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Access and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Access decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Model packaging",
                    "explanation": "Model packaging: train or load a model, wrap it in an inference server, build a Docker image, push it to a registry, expose the port and a health route, and read model files from the object store. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "SAP AI Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Model packaging and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Model packaging decouples application logic from underlying database schemas."
          }
],
        diagramType: 'ai-core-rag',
        analogy: {
          concept: "SAP AI Core",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, SAP AI Core standardizes enterprise communication and data flow.',
          transition: 'Without standardized SAP AI Core, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "SAP AI Core provides core capabilities for SAP BTP applications, as defined in Module 7.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Create a resource group and register the registry and object store secrets. Onboard a Git repository holding a serving template and sync it. Package a small scikit-learn model (for example a simple demand forecaster) behind an inference endpoint, deploy it, and call it from Postman. Call it from a CAP action through a destination and return the prediction in your service. Stop and delete the deployment and record the cost drivers you observed. Verification /",
          btpFit: "Show a deployment in a running state and a successful prediction call made from your CAP service. Explain how traffic to the deployment is authenticated, where the model files live, and what happens when you push a new image.",
        },
        jargonTerms: [
          {
            term: "Purpose",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Core objects",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Templates",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical SAP AI Core Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '7.2', title: 'SAP AI Core', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (SAP AI Core)',
          context: 'An international enterprise implements SAP AI Core to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for SAP AI Core.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-7-2-q1',
            question: 'What is the primary role of SAP AI Core in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-7-2-q2',
            question: 'According to the syllabus, how does SAP AI Core handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-7-2-q3',
            question: 'What is the required mastery outcome for Module 7.2 (SAP AI Core)?',
            options: [
              { id: 'a', text: "Show a deployment in a running state and a successful prediction call made from your CAP s", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 7.2 establishes the core mechanics for SAP AI Core.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Create a resource group and register the registry and object store secrets. Onboard a Git repository holding a serving template and sync it. Package a small scikit-learn model (for example a simple demand forecaster) behind an inference endpoint, deploy it, and call it from Postman. Call it from a CAP action through a destination and return the prediction in your service. Stop and delete the deployment and record the cost drivers you observed. Verification /"
      },
      {
        id: 'mod-7-3',
        code: '7.3',
        phaseId: 'phase-7',
        title: "Generative AI Hub",
        tagline: "Generative AI Hub, Prompt Orchestration, and Token Budgets",
        summary: "Run the same prompt in the Launchpad prompt editor and from code. Add a CAP action summarizeOrder that sends order data to a model through the SDK and returns a short summary. Compare 3 available models on 10 test prompts and record quality, latency and token use in a table. Turn on content filtering and data masking, and test with a prompt containing fake personal data. Request JSON output, validate it against a schema, and retry once on failure. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Idea: governed access to several foundation models through AI Core, so applications do not hold provider keys. Check the current model catalogue and region availability.", "Orchestration: a single endpoint that can combine prompt templating, the model call, content filtering, data masking, grounding and translation. Verify which modules your landscape offers.", "Prompting: system, user and assistant roles, few-shot examples, templates with variables, structured output with a JSON schema, and parameters such as temperature, top-p and maximum tokens.", "Tooling: the prompt editor and prompt history in AI Launchpad, and the SAP Cloud SDK for AI for JavaScript and TypeScript (packages for orchestration, foundation models and LangChain) and the Python generative AI hub SDK. Verify the current package names before installing.", "Safeguards: content filter levels, masking of personal data, prompt injection awareness, validating model output against a schema, and refusal handling.", "Operations: counting tokens, estimating cost per request, rate limits with 429 handling and exponential backoff, streaming responses, and caching.", "Function calling: how a model returns a tool call that your code executes (used again in Module 7.5).", "Required"],
        practicalImplementation: "Run the same prompt in the Launchpad prompt editor and from code. Add a CAP action summarizeOrder that sends order data to a model through the SDK and returns a short summary. Compare 3 available models on 10 test prompts and record quality, latency and token use in a table. Turn on content filtering and data masking, and test with a prompt containing fake personal data. Request JSON output, validate it against a schema, and retry once on failure. Verification /",
        masteryCheck: "Switch the model by configuration only, with no code change. Demonstrate a prompt injection attempt being neutralised, and give the per-request cost estimate for your action.",
        learningObjectives: ["Idea: governed access to several foundation models through AI Core, so applications do not hold provider keys. Check the current model catalogue and region availability.", "Orchestration: a single endpoint that can combine prompt templating, the model call, content filtering, data masking, grounding and translation. Verify which modules your landscape offers.", "Prompting: system, user and assistant roles, few-shot examples, templates with variables, structured output with a JSON schema, and parameters such as temperature, top-p and maximum tokens.", "Tooling: the prompt editor and prompt history in AI Launchpad, and the SAP Cloud SDK for AI for JavaScript and TypeScript (packages for orchestration, foundation models and LangChain) and the Python generative AI hub SDK. Verify the current package names before installing."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Idea",
                    "explanation": "Idea: governed access to several foundation models through AI Core, so applications do not hold provider keys. Check the current model catalogue and region availability. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Generative AI Hub enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Idea and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Idea decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Orchestration",
                    "explanation": "Orchestration: a single endpoint that can combine prompt templating, the model call, content filtering, data masking, grounding and translation. Verify which modules your landscape offers. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Generative AI Hub enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Orchestration and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Orchestration decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Prompting",
                    "explanation": "Prompting: system, user and assistant roles, few-shot examples, templates with variables, structured output with a JSON schema, and parameters such as temperature, top-p and maximum tokens. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Generative AI Hub enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Prompting and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Prompting decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Tooling",
                    "explanation": "Tooling: the prompt editor and prompt history in AI Launchpad, and the SAP Cloud SDK for AI for JavaScript and TypeScript (packages for orchestration, foundation models and LangChain) and the Python generative AI hub SDK. Verify the current package names before installing. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Generative AI Hub enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Tooling and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Tooling decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Safeguards",
                    "explanation": "Safeguards: content filter levels, masking of personal data, prompt injection awareness, validating model output against a schema, and refusal handling. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Generative AI Hub enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Safeguards and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Safeguards decouples application logic from underlying database schemas."
          }
],
        diagramType: 'genai-hub',
        analogy: {
          concept: "Generative AI Hub",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Generative AI Hub standardizes enterprise communication and data flow.',
          transition: 'Without standardized Generative AI Hub, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Generative AI Hub provides core capabilities for SAP BTP applications, as defined in Module 7.3.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Run the same prompt in the Launchpad prompt editor and from code. Add a CAP action summarizeOrder that sends order data to a model through the SDK and returns a short summary. Compare 3 available models on 10 test prompts and record quality, latency and token use in a table. Turn on content filtering and data masking, and test with a prompt containing fake personal data. Request JSON output, validate it against a schema, and retry once on failure. Verification /",
          btpFit: "Switch the model by configuration only, with no code change. Demonstrate a prompt injection attempt being neutralised, and give the per-request cost estimate for your action.",
        },
        jargonTerms: [
          {
            term: "Idea",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Orchestration",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Prompting",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Generative AI Hub Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '7.3', title: 'Generative AI Hub', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Generative AI Hub)',
          context: 'An international enterprise implements Generative AI Hub to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Generative AI Hub.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-7-3-q1',
            question: 'What is the primary role of Generative AI Hub in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-7-3-q2',
            question: 'According to the syllabus, how does Generative AI Hub handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-7-3-q3',
            question: 'What is the required mastery outcome for Module 7.3 (Generative AI Hub)?',
            options: [
              { id: 'a', text: "Switch the model by configuration only, with no code change. Demonstrate a prompt injectio", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 7.3 establishes the core mechanics for Generative AI Hub.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Run the same prompt in the Launchpad prompt editor and from code. Add a CAP action summarizeOrder that sends order data to a model through the SDK and returns a short summary. Compare 3 available models on 10 test prompts and record quality, latency and token use in a table. Turn on content filtering and data masking, and test with a prompt containing fake personal data. Request JSON output, validate it against a schema, and retry once on failure. Verification /"
      },
      {
        id: 'mod-7-4',
        code: '7.4',
        phaseId: 'phase-7',
        title: "HANA Vector Engine and RAG",
        tagline: "REAL_VECTOR Search, Grounded RAG, and HANA Vector Engine",
        summary: "Create a table with a vector column and metadata in HANA Cloud. Ingest 20 to 30 documents that you have the right to use (for example your own project notes and openly licensed documentation) using two different chunk sizes. Add a CAP action ask that retrieves the top chunks, calls the model, and returns the answer with source references. Build a 20-question evaluation set with expected sources and measure the hit rate at 3 for each chunking choice. Add an access group filter so that a user without the role cannot retrieve restricted chunks. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Embeddings: what an embedding is, dimensionality, cosine similarity versus L2 distance, and why the same model must embed documents and queries.", "Vector storage in HANA Cloud: the REAL_VECTOR(n) column type, TO_REAL_VECTOR, similarity functions such as COSINE_SIMILARITY and L2DISTANCE, in-database embedding with VECTOR_EMBEDDING where available, and vector indexes where your HANA Cloud version supports them. Verify availability in your instance.", "In CAP: the CAP Vector type where your @cap-js/hana version supports it, otherwise native SQL through cds.db, and the CAP LLM plugin as an optional helper (verify its current status).", "Ingestion: loading documents, cleaning text, chunking by fixed size with overlap, by sentence, or by headings, and storing metadata such as source, section, owner and access group.", "Retrieval: embedding the query, top-k search, metadata filters in the WHERE clause, and score thresholds.", "Generation: assembling the prompt with the retrieved chunks, instructing the model to answer only from them, and returning citations.", "Evaluation: a question set with expected sources, hit rate at k, answer groundedness checks, and re-testing after each change.", "Security: retrieving only chunks the signed-in user may see, and treating document text as untrusted input.", "Failure modes: stale index, bad chunk boundaries, wrong embedding model, hallucinated answers, and injected instructions inside documents.", "Required"],
        practicalImplementation: "Create a table with a vector column and metadata in HANA Cloud. Ingest 20 to 30 documents that you have the right to use (for example your own project notes and openly licensed documentation) using two different chunk sizes. Add a CAP action ask that retrieves the top chunks, calls the model, and returns the answer with source references. Build a 20-question evaluation set with expected sources and measure the hit rate at 3 for each chunking choice. Add an access group filter so that a user without the role cannot retrieve restricted chunks. Verification /",
        masteryCheck: "Show cited answers, your evaluation table, and the better chunking choice with evidence. Show that a restricted document never appears for an unauthorised user, even when the question names it.",
        learningObjectives: ["Embeddings: what an embedding is, dimensionality, cosine similarity versus L2 distance, and why the same model must embed documents and queries.", "Vector storage in HANA Cloud: the REAL_VECTOR(n) column type, TO_REAL_VECTOR, similarity functions such as COSINE_SIMILARITY and L2DISTANCE, in-database embedding with VECTOR_EMBEDDING where available, and vector indexes where your HANA Cloud version supports them. Verify availability in your instance.", "In CAP: the CAP Vector type where your @cap-js/hana version supports it, otherwise native SQL through cds.db, and the CAP LLM plugin as an optional helper (verify its current status).", "Ingestion: loading documents, cleaning text, chunking by fixed size with overlap, by sentence, or by headings, and storing metadata such as source, section, owner and access group."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Embeddings",
                    "explanation": "Embeddings: what an embedding is, dimensionality, cosine similarity versus L2 distance, and why the same model must embed documents and queries. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "HANA Vector Engine and RAG enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Embeddings and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Embeddings decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Vector storage in HANA Cloud",
                    "explanation": "Vector storage in HANA Cloud: the REAL_VECTOR(n) column type, TO_REAL_VECTOR, similarity functions such as COSINE_SIMILARITY and L2DISTANCE, in-database embedding with VECTOR_EMBEDDING where available, and vector indexes where your HANA Cloud version supports them. Verify availability in your instance. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "HANA Vector Engine and RAG enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Vector storage in HANA Cloud and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Vector storage in HANA Cloud decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "In CAP",
                    "explanation": "In CAP: the CAP Vector type where your @cap-js/hana version supports it, otherwise native SQL through cds.db, and the CAP LLM plugin as an optional helper (verify its current status). This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "HANA Vector Engine and RAG enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review In CAP and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how In CAP decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Ingestion",
                    "explanation": "Ingestion: loading documents, cleaning text, chunking by fixed size with overlap, by sentence, or by headings, and storing metadata such as source, section, owner and access group. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "HANA Vector Engine and RAG enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Ingestion and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Ingestion decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Retrieval",
                    "explanation": "Retrieval: embedding the query, top-k search, metadata filters in the WHERE clause, and score thresholds. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "HANA Vector Engine and RAG enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Retrieval and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Retrieval decouples application logic from underlying database schemas."
          }
],
        diagramType: 'ai-core-rag',
        analogy: {
          concept: "HANA Vector Engine and RAG",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, HANA Vector Engine and RAG standardizes enterprise communication and data flow.',
          transition: 'Without standardized HANA Vector Engine and RAG, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "HANA Vector Engine and RAG provides core capabilities for SAP BTP applications, as defined in Module 7.4.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Create a table with a vector column and metadata in HANA Cloud. Ingest 20 to 30 documents that you have the right to use (for example your own project notes and openly licensed documentation) using two different chunk sizes. Add a CAP action ask that retrieves the top chunks, calls the model, and returns the answer with source references. Build a 20-question evaluation set with expected sources and measure the hit rate at 3 for each chunking choice. Add an access group filter so that a user without the role cannot retrieve restricted chunks. Verification /",
          btpFit: "Show cited answers, your evaluation table, and the better chunking choice with evidence. Show that a restricted document never appears for an unauthorised user, even when the question names it.",
        },
        jargonTerms: [
          {
            term: "Embeddings",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Vector storage in HANA Cloud",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "In CAP",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical HANA Vector Engine and RAG Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '7.4', title: 'HANA Vector Engine and RAG', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (HANA Vector Engine and RAG)',
          context: 'An international enterprise implements HANA Vector Engine and RAG to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for HANA Vector Engine and RAG.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-7-4-q1',
            question: 'What is the primary role of HANA Vector Engine and RAG in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-7-4-q2',
            question: 'According to the syllabus, how does HANA Vector Engine and RAG handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-7-4-q3',
            question: 'What is the required mastery outcome for Module 7.4 (HANA Vector Engine and RAG)?',
            options: [
              { id: 'a', text: "Show cited answers, your evaluation table, and the better chunking choice with evidence. S", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 7.4 establishes the core mechanics for HANA Vector Engine and RAG.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Create a table with a vector column and metadata in HANA Cloud. Ingest 20 to 30 documents that you have the right to use (for example your own project notes and openly licensed documentation) using two different chunk sizes. Add a CAP action ask that retrieves the top chunks, calls the model, and returns the answer with source references. Build a 20-question evaluation set with expected sources and measure the hit rate at 3 for each chunking choice. Add an access group filter so that a user without the role cannot retrieve restricted chunks. Verification /"
      },
      {
        id: 'mod-7-5',
        code: '7.5',
        phaseId: 'phase-7',
        title: "Joule and Agents",
        tagline: "Joule Studio Skills, Autonomous Tool Calling & Guardrails",
        summary: "Use Joule for developers, if available, to generate one unit test and one set of annotations in your project, then review and correct the output. Specify an 'order assistant' with 3 tools: get order status, list late orders, and draft a supplier email, each mapped to a CAP endpoint. Build it in Joule Studio if you have access. Otherwise implement a minimal tool-calling loop in Node.js with the Generative AI Hub SDK. Test with 15 scripted scenarios, 5 of them adversarial. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Joule: SAP's assistant across SAP applications, and Joule for developers inside Business Application Studio and SAP Build Code for generating and explaining code.", "Joule Studio: building skills and agents in SAP Build. Verify current names and availability for your account.", "Agent mechanics: instructions (the system prompt), tools, knowledge sources, the loop of reason, call a tool, observe, and answer, plus context limits and memory.", "Tool design: small single-purpose tools backed by your CAP endpoints, typed inputs, clear descriptions, and error results the model can understand.", "Guardrails: read-only tools first, confirmation before any write, least-privilege tokens, rate limits, audit logging of every tool call, and a deterministic fallback when the model is unsure.", "Threats: prompt injection through tool results and documents, excessive agency, and data leakage in responses.", "Evaluation: scripted scenarios including adversarial ones, and tracking correct tool choice and refusals.", "Required"],
        practicalImplementation: "Use Joule for developers, if available, to generate one unit test and one set of annotations in your project, then review and correct the output. Specify an 'order assistant' with 3 tools: get order status, list late orders, and draft a supplier email, each mapped to a CAP endpoint. Build it in Joule Studio if you have access. Otherwise implement a minimal tool-calling loop in Node.js with the Generative AI Hub SDK. Test with 15 scripted scenarios, 5 of them adversarial. Verification /",
        masteryCheck: "The agent never performs a write action without explicit confirmation. The correct tool is chosen in at least 12 of 15 scenarios, and every tool call is visible in the logs.",
        learningObjectives: ["Joule: SAP's assistant across SAP applications, and Joule for developers inside Business Application Studio and SAP Build Code for generating and explaining code.", "Joule Studio: building skills and agents in SAP Build. Verify current names and availability for your account.", "Agent mechanics: instructions (the system prompt), tools, knowledge sources, the loop of reason, call a tool, observe, and answer, plus context limits and memory.", "Tool design: small single-purpose tools backed by your CAP endpoints, typed inputs, clear descriptions, and error results the model can understand."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Joule",
                    "explanation": "Joule: SAP's assistant across SAP applications, and Joule for developers inside Business Application Studio and SAP Build Code for generating and explaining code. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Joule and Agents enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Joule and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Joule decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Joule Studio",
                    "explanation": "Joule Studio: building skills and agents in SAP Build. Verify current names and availability for your account. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Joule and Agents enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Joule Studio and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Joule Studio decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Agent mechanics",
                    "explanation": "Agent mechanics: instructions (the system prompt), tools, knowledge sources, the loop of reason, call a tool, observe, and answer, plus context limits and memory. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Joule and Agents enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Agent mechanics and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Agent mechanics decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Tool design",
                    "explanation": "Tool design: small single-purpose tools backed by your CAP endpoints, typed inputs, clear descriptions, and error results the model can understand. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Joule and Agents enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Tool design and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Tool design decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Guardrails",
                    "explanation": "Guardrails: read-only tools first, confirmation before any write, least-privilege tokens, rate limits, audit logging of every tool call, and a deterministic fallback when the model is unsure. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Joule and Agents enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Guardrails and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Guardrails decouples application logic from underlying database schemas."
          }
],
        diagramType: 'joule-agents',
        analogy: {
          concept: "Joule and Agents",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Joule and Agents standardizes enterprise communication and data flow.',
          transition: 'Without standardized Joule and Agents, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Joule and Agents provides core capabilities for SAP BTP applications, as defined in Module 7.5.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Use Joule for developers, if available, to generate one unit test and one set of annotations in your project, then review and correct the output. Specify an 'order assistant' with 3 tools: get order status, list late orders, and draft a supplier email, each mapped to a CAP endpoint. Build it in Joule Studio if you have access. Otherwise implement a minimal tool-calling loop in Node.js with the Generative AI Hub SDK. Test with 15 scripted scenarios, 5 of them adversarial. Verification /",
          btpFit: "The agent never performs a write action without explicit confirmation. The correct tool is chosen in at least 12 of 15 scenarios, and every tool call is visible in the logs.",
        },
        jargonTerms: [
          {
            term: "Joule",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Joule Studio",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Agent mechanics",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Joule and Agents Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '7.5', title: 'Joule and Agents', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Joule and Agents)',
          context: 'An international enterprise implements Joule and Agents to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Joule and Agents.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-7-5-q1',
            question: 'What is the primary role of Joule and Agents in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-7-5-q2',
            question: 'According to the syllabus, how does Joule and Agents handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-7-5-q3',
            question: 'What is the required mastery outcome for Module 7.5 (Joule and Agents)?',
            options: [
              { id: 'a', text: "The agent never performs a write action without explicit confirmation. The correct tool is", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 7.5 establishes the core mechanics for Joule and Agents.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Use Joule for developers, if available, to generate one unit test and one set of annotations in your project, then review and correct the output. Specify an 'order assistant' with 3 tools: get order status, list late orders, and draft a supplier email, each mapped to a CAP endpoint. Build it in Joule Studio if you have access. Otherwise implement a minimal tool-calling loop in Node.js with the Generative AI Hub SDK. Test with 15 scripted scenarios, 5 of them adversarial. Verification /"
      },
      {
        id: 'mod-7-6',
        code: '7.6',
        phaseId: 'phase-7',
        title: "Extensibility and Clean Core",
        tagline: "Clean Core Principles, Extension Points & Upgrade-Safe Design",
        summary: "Take 3 requirements (for example an approval workflow, a custom report, and a forecast widget) and decide the extension style for each with a written justification. Your Odoo module experience gives you a useful comparison, so note what maps and what does not. Draw the architecture of your forecast service as a side-by-side extension of S/4HANA, showing the released API it reads, the event it listens to, and the connectivity path. Generate an OData client with the Cloud SDK from a Business Accelerator Hub API specification and call the sandbox. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Extension styles: in-app extensibility (key-user tools such as custom fields, logic and views), developer extensibility with ABAP Cloud (awareness level), and side-by-side extensibility on BTP with CAP.", "Clean core: keeping custom code off the standard system, using released APIs and extension points only, and the A to D clean core levels. Verify the current definitions in SAP's clean core documentation.", "Integration contracts: released APIs in SAP Business Accelerator Hub, business events (SAP Event Mesh and its successor offerings at awareness level), and webhooks.", "Upgrade-safe design: never read standard tables directly, version your own APIs, decouple through events, replicate the minimum data, and add contract tests for the APIs you consume.", "SAP system connectivity: destinations, Cloud Connector for on-premise systems, communication arrangements, scenarios and users in S/4HANA Cloud, OAuth2SAMLBearerAssertion and principal propagation, and generated OData clients with the SAP Cloud SDK.", "Decision framework: choose in-app when it is a field or simple logic on a standard object, side-by-side when it needs its own data, UI, AI or life cycle, and avoid core modification.", "Required"],
        practicalImplementation: "Take 3 requirements (for example an approval workflow, a custom report, and a forecast widget) and decide the extension style for each with a written justification. Your Odoo module experience gives you a useful comparison, so note what maps and what does not. Draw the architecture of your forecast service as a side-by-side extension of S/4HANA, showing the released API it reads, the event it listens to, and the connectivity path. Generate an OData client with the Cloud SDK from a Business Accelerator Hub API specification and call the sandbox. Verification /",
        masteryCheck: "Classify 10 given scenarios correctly. Explain why your forecast service must not read S/4HANA tables directly, and what it uses instead.",
        learningObjectives: ["Extension styles: in-app extensibility (key-user tools such as custom fields, logic and views), developer extensibility with ABAP Cloud (awareness level), and side-by-side extensibility on BTP with CAP.", "Clean core: keeping custom code off the standard system, using released APIs and extension points only, and the A to D clean core levels. Verify the current definitions in SAP's clean core documentation.", "Integration contracts: released APIs in SAP Business Accelerator Hub, business events (SAP Event Mesh and its successor offerings at awareness level), and webhooks.", "Upgrade-safe design: never read standard tables directly, version your own APIs, decouple through events, replicate the minimum data, and add contract tests for the APIs you consume."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Extension styles",
                    "explanation": "Extension styles: in-app extensibility (key-user tools such as custom fields, logic and views), developer extensibility with ABAP Cloud (awareness level), and side-by-side extensibility on BTP with CAP. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Extensibility and Clean Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Extension styles and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Extension styles decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Clean core",
                    "explanation": "Clean core: keeping custom code off the standard system, using released APIs and extension points only, and the A to D clean core levels. Verify the current definitions in SAP's clean core documentation. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Extensibility and Clean Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Clean core and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Clean core decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Integration contracts",
                    "explanation": "Integration contracts: released APIs in SAP Business Accelerator Hub, business events (SAP Event Mesh and its successor offerings at awareness level), and webhooks. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Extensibility and Clean Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Integration contracts and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Integration contracts decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Upgrade-safe design",
                    "explanation": "Upgrade-safe design: never read standard tables directly, version your own APIs, decouple through events, replicate the minimum data, and add contract tests for the APIs you consume. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Extensibility and Clean Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Upgrade-safe design and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Upgrade-safe design decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "SAP system connectivity",
                    "explanation": "SAP system connectivity: destinations, Cloud Connector for on-premise systems, communication arrangements, scenarios and users in S/4HANA Cloud, OAuth2SAMLBearerAssertion and principal propagation, and generated OData clients with the SAP Cloud SDK. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Extensibility and Clean Core enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review SAP system connectivity and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how SAP system connectivity decouples application logic from underlying database schemas."
          }
],
        diagramType: 'clean-core',
        analogy: {
          concept: "Extensibility and Clean Core",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Extensibility and Clean Core standardizes enterprise communication and data flow.',
          transition: 'Without standardized Extensibility and Clean Core, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Extensibility and Clean Core provides core capabilities for SAP BTP applications, as defined in Module 7.6.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Take 3 requirements (for example an approval workflow, a custom report, and a forecast widget) and decide the extension style for each with a written justification. Your Odoo module experience gives you a useful comparison, so note what maps and what does not. Draw the architecture of your forecast service as a side-by-side extension of S/4HANA, showing the released API it reads, the event it listens to, and the connectivity path. Generate an OData client with the Cloud SDK from a Business Accelerator Hub API specification and call the sandbox. Verification /",
          btpFit: "Classify 10 given scenarios correctly. Explain why your forecast service must not read S/4HANA tables directly, and what it uses instead.",
        },
        jargonTerms: [
          {
            term: "Extension styles",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Clean core",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Integration contracts",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Extensibility and Clean Core Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '7.6', title: 'Extensibility and Clean Core', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Extensibility and Clean Core)',
          context: 'An international enterprise implements Extensibility and Clean Core to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Extensibility and Clean Core.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-7-6-q1',
            question: 'What is the primary role of Extensibility and Clean Core in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-7-6-q2',
            question: 'According to the syllabus, how does Extensibility and Clean Core handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-7-6-q3',
            question: 'What is the required mastery outcome for Module 7.6 (Extensibility and Clean Core)?',
            options: [
              { id: 'a', text: "Classify 10 given scenarios correctly. Explain why your forecast service must not read S/4", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 7.6 establishes the core mechanics for Extensibility and Clean Core.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Take 3 requirements (for example an approval workflow, a custom report, and a forecast widget) and decide the extension style for each with a written justification. Your Odoo module experience gives you a useful comparison, so note what maps and what does not. Draw the architecture of your forecast service as a side-by-side extension of S/4HANA, showing the released API it reads, the event it listens to, and the connectivity path. Generate an OData client with the Cloud SDK from a Business Accelerator Hub API specification and call the sandbox. Verification /"
      },
    ]
  },
  {
    id: 'phase-8',
    number: 8,
    title: "Capstone and Career",
    tagline: 'Phase 8 · Weeks 1-2 · ~24 Hours',
    description: "Deliver one complete, documented, deployed portfolio application that combines everything from Phases 0 to 7, and turn it into evidence for interviews.",
    coreObjective: "Deliver one complete, documented, deployed portfolio application that combines everything from Phases 0 to 7, and turn it into evidence for interviews.",
    estimatedHours: 24,
    suggestedWeeks: "Weeks 1-2",
    badgeCategory: 'capstone',
    capstone: PHASE_CAPSTONES[8]!,
    modules: [
      {
        id: 'mod-8-1',
        code: '8.1',
        phaseId: 'phase-8',
        title: "Capstone: AI + CAP App",
        tagline: "Production Full-Stack Cloud Product Integrating CAP, Fiori & AI",
        summary: "Write a one-page specification and 5 decision records. Draw the two architecture diagrams and review them against your actual deployment. Create at least 15 backlog issues, each linked to a test or a demo step, and work through them in two weekly milestones. Integrate the deliverables of Phases 3 to 7 into one repository with one pipeline. Record a 5-minute demo video following your demo script. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Scope: user stories with acceptance criteria, explicit non-goals, and a definition of done.", "Architecture decisions: record each as a short decision record covering runtime selection, service selection, data ownership, integration boundaries, security architecture, and cost tradeoffs.", "Diagrams: a system context view and a container view showing the UI, App Router, CAP service, HANA Cloud, AI Core, Generative AI Hub and any remote system, with authentication on each arrow.", "Contracts: the OData service as the API contract, error format, and versioning rule.", "Non-functional targets: response time goals, availability expectations, security requirements, and a monthly cost budget for trial or paid resources.", "Delivery management: a backlog of issues in GitHub Projects, weekly milestones, a risk register, and release tagging.", "Documentation set: README, architecture notes, API reference, security checklist, runbook, evaluation report for the AI features, and a demo script.", "Cost hygiene: stopping or deleting AI Core deployments and HANA Cloud instances you are not using.", "Required"],
        practicalImplementation: "Write a one-page specification and 5 decision records. Draw the two architecture diagrams and review them against your actual deployment. Create at least 15 backlog issues, each linked to a test or a demo step, and work through them in two weekly milestones. Integrate the deliverables of Phases 3 to 7 into one repository with one pipeline. Record a 5-minute demo video following your demo script. Verification /",
        masteryCheck: "A reviewer who has never seen the project can deploy it from the README in 45 minutes. Every requirement traces to an automated test or a demo step.",
        learningObjectives: ["Scope: user stories with acceptance criteria, explicit non-goals, and a definition of done.", "Architecture decisions: record each as a short decision record covering runtime selection, service selection, data ownership, integration boundaries, security architecture, and cost tradeoffs.", "Diagrams: a system context view and a container view showing the UI, App Router, CAP service, HANA Cloud, AI Core, Generative AI Hub and any remote system, with authentication on each arrow.", "Contracts: the OData service as the API contract, error format, and versioning rule."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Scope",
                    "explanation": "Scope: user stories with acceptance criteria, explicit non-goals, and a definition of done. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Capstone: AI + CAP App enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Scope and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Scope decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Architecture decisions",
                    "explanation": "Architecture decisions: record each as a short decision record covering runtime selection, service selection, data ownership, integration boundaries, security architecture, and cost tradeoffs. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Capstone: AI + CAP App enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Architecture decisions and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Architecture decisions decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "Diagrams",
                    "explanation": "Diagrams: a system context view and a container view showing the UI, App Router, CAP service, HANA Cloud, AI Core, Generative AI Hub and any remote system, with authentication on each arrow. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Capstone: AI + CAP App enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Diagrams and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Diagrams decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Contracts",
                    "explanation": "Contracts: the OData service as the API contract, error format, and versioning rule. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Capstone: AI + CAP App enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Contracts and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Contracts decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Non-functional targets",
                    "explanation": "Non-functional targets: response time goals, availability expectations, security requirements, and a monthly cost budget for trial or paid resources. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Capstone: AI + CAP App enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Non-functional targets and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Non-functional targets decouples application logic from underlying database schemas."
          }
],
        diagramType: 'joule-agents',
        analogy: {
          concept: "Capstone: AI + CAP App",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Capstone: AI + CAP App standardizes enterprise communication and data flow.',
          transition: 'Without standardized Capstone: AI + CAP App, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Capstone: AI + CAP App provides core capabilities for SAP BTP applications, as defined in Module 8.1.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Write a one-page specification and 5 decision records. Draw the two architecture diagrams and review them against your actual deployment. Create at least 15 backlog issues, each linked to a test or a demo step, and work through them in two weekly milestones. Integrate the deliverables of Phases 3 to 7 into one repository with one pipeline. Record a 5-minute demo video following your demo script. Verification /",
          btpFit: "A reviewer who has never seen the project can deploy it from the README in 45 minutes. Every requirement traces to an automated test or a demo step.",
        },
        jargonTerms: [
          {
            term: "Scope",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Architecture decisions",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Diagrams",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Capstone: AI + CAP App Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '8.1', title: 'Capstone: AI + CAP App', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Capstone: AI + CAP App)',
          context: 'An international enterprise implements Capstone: AI + CAP App to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Capstone: AI + CAP App.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-8-1-q1',
            question: 'What is the primary role of Capstone: AI + CAP App in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-8-1-q2',
            question: 'According to the syllabus, how does Capstone: AI + CAP App handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-8-1-q3',
            question: 'What is the required mastery outcome for Module 8.1 (Capstone: AI + CAP App)?',
            options: [
              { id: 'a', text: "A reviewer who has never seen the project can deploy it from the README in 45 minutes. Eve", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 8.1 establishes the core mechanics for Capstone: AI + CAP App.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Write a one-page specification and 5 decision records. Draw the two architecture diagrams and review them against your actual deployment. Create at least 15 backlog issues, each linked to a test or a demo step, and work through them in two weekly milestones. Integrate the deliverables of Phases 3 to 7 into one repository with one pipeline. Record a 5-minute demo video following your demo script. Verification /"
      },
      {
        id: 'mod-8-2',
        code: '8.2',
        phaseId: 'phase-8',
        title: "Portfolio and Career",
        tagline: "Technical Curation, Architecture Write-Ups & Career Strategy",
        summary: "Publish one summary article for each of the 9 phases and link them from your repository README. Build a bank of 40 interview questions from the topics above with your own written answers. Complete 2 recorded mock interviews and write down 3 improvements after each. Update your CV and LinkedIn profile with the capstone and its measurable results. Verification /",
        estimatedMinutes: 35,
        level: 'Advanced',
        subtopics: ["Public writing: one summary article per phase, structured as problem, steps taken, mistakes made, result, and what you would do differently, shared on LinkedIn.", "Repository hygiene: a README with an architecture diagram and screenshots, a licence, no secrets, a clear folder layout, and topics for discoverability.", "CV and profile evidence: bullets with measurable outcomes, such as test counts, deployment time, retrieval hit rate and cost per request.", "Learning credentials: SAP Learning journeys, and optional SAP certification. Check SAP Training Shop for the current BTP and AI exam names and codes before choosing.", "Community: answering questions on SAP Community, reading and commenting on blogs, and joining SAP developer events or challenges.", "Interview topics: the BTP account model, Cloud Foundry basics, CAP modelling and handlers, XSUAA and role design, destinations, MTA deployment, CI and CD, AI Core versus Generative AI Hub, RAG design, agent safety, and clean core.", "Your story: explaining how your Odoo module experience, machine learning projects and SAP BTP skills combine for roles at the intersection of ERP and AI.", "Required"],
        practicalImplementation: "Publish one summary article for each of the 9 phases and link them from your repository README. Build a bank of 40 interview questions from the topics above with your own written answers. Complete 2 recorded mock interviews and write down 3 improvements after each. Update your CV and LinkedIn profile with the capstone and its measurable results. Verification /",
        masteryCheck: "The public repository passes your own hygiene checklist, including a secret scan. You answer 10 randomly chosen technical questions in 2 minutes each without notes.",
        learningObjectives: ["Public writing: one summary article per phase, structured as problem, steps taken, mistakes made, result, and what you would do differently, shared on LinkedIn.", "Repository hygiene: a README with an architecture diagram and screenshots, a licence, no secrets, a clear folder layout, and topics for discoverability.", "CV and profile evidence: bullets with measurable outcomes, such as test counts, deployment time, retrieval hit rate and cost per request.", "Learning credentials: SAP Learning journeys, and optional SAP certification. Check SAP Training Shop for the current BTP and AI exam names and codes before choosing."],
        steps: [
          {
                    "stepNumber": 1,
                    "title": "Public writing",
                    "explanation": "Public writing: one summary article per phase, structured as problem, steps taken, mistakes made, result, and what you would do differently, shared on LinkedIn. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Portfolio and Career enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Public writing and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Public writing decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 2,
                    "title": "Repository hygiene",
                    "explanation": "Repository hygiene: a README with an architecture diagram and screenshots, a licence, no secrets, a clear folder layout, and topics for discoverability. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Portfolio and Career enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Repository hygiene and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Repository hygiene decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 3,
                    "title": "CV and profile evidence",
                    "explanation": "CV and profile evidence: bullets with measurable outcomes, such as test counts, deployment time, retrieval hit rate and cost per request. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Portfolio and Career enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review CV and profile evidence and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how CV and profile evidence decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 4,
                    "title": "Learning credentials",
                    "explanation": "Learning credentials: SAP Learning journeys, and optional SAP certification. Check SAP Training Shop for the current BTP and AI exam names and codes before choosing. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Portfolio and Career enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Learning credentials and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Learning credentials decouples application logic from underlying database schemas."
          },
          {
                    "stepNumber": 5,
                    "title": "Community",
                    "explanation": "Community: answering questions on SAP Community, reading and commenting on blogs, and joining SAP developer events or challenges. This step establishes the foundation for clean architecture on SAP BTP.",
                    "keyIdea": "Portfolio and Career enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                    "taskInstruction": "Review Community and verify compliance with standard SAP recommendations.",
                    "hint": "Focus on how Community decouples application logic from underlying database schemas."
          }
],
        diagramType: 'joule-agents',
        analogy: {
          concept: "Portfolio and Career",
          analogy: 'The Enterprise Logistics Network',
          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, Portfolio and Career standardizes enterprise communication and data flow.',
          transition: 'Without standardized Portfolio and Career, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',
        },
        conceptExplanation: {
          whatItIs: "Portfolio and Career provides core capabilities for SAP BTP applications, as defined in Module 8.2.",
          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',
          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',
          howItWorks: "Publish one summary article for each of the 9 phases and link them from your repository README. Build a bank of 40 interview questions from the topics above with your own written answers. Complete 2 recorded mock interviews and write down 3 improvements after each. Update your CV and LinkedIn profile with the capstone and its measurable results. Verification /",
          btpFit: "The public repository passes your own hygiene checklist, including a secret scan. You answer 10 randomly chosen technical questions in 2 minutes each without notes.",
        },
        jargonTerms: [
          {
            term: "Public writing",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "Repository hygiene",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
          {
            term: "CV and profile evidence",
            simpleMeaning: 'Standard SAP BTP cloud technology component.',
            familiarEquivalent: 'Industry standard cloud equivalent.',
          },
        ],
        technicalExample: {
          title: 'Practical Portfolio and Career Code Configuration',
          language: 'json',
          code: JSON.stringify({ module: '8.2', title: 'Portfolio and Career', cleanCore: true }, null, 2),
          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',
          lineExplanations: [
            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }
          ],
          expectedOutput: 'Clean compilation and execution with zero warnings.',
          commonMistakes: [
            'Hardcoding private IPs or credentials into configuration files.',
            'Modifying standard core artifacts rather than side-by-side extension.'
          ]
        },
        businessScenario: {
          title: 'Global Supply Chain Implementation (Portfolio and Career)',
          context: 'An international enterprise implements Portfolio and Career to automate mission-critical operations.',
          workflowSteps: [
            'System receives real-time transaction event.',
            'Applies business validation and security policies for Portfolio and Career.',
            'Persists auditable record in SAP HANA Cloud.'
          ],
          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'
        },
        quizQuestions: [
          {
            id: 'mod-8-2-q1',
            question: 'What is the primary role of Portfolio and Career in SAP BTP architecture?',
            options: [
              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },
              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },
              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },
              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }
            ]
          },
          {
            id: 'mod-8-2-q2',
            question: 'According to the syllabus, how does Portfolio and Career handle edge cases and validation?',
            options: [
              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },
              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },
              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },
              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }
            ]
          },
          {
            id: 'mod-8-2-q3',
            question: 'What is the required mastery outcome for Module 8.2 (Portfolio and Career)?',
            options: [
              { id: 'a', text: "The public repository passes your own hygiene checklist, including a secret scan. You answ", isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' },
              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },
              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },
              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }
            ]
          }
        ],
        keyTakeaways: [
          'Module 8.2 establishes the core mechanics for Portfolio and Career.',
          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',
          'All integrations must enforce strict security token verification and destination isolation.'
        ],
        practicalActivity: "Publish one summary article for each of the 9 phases and link them from your repository README. Build a bank of 40 interview questions from the topics above with your own written answers. Complete 2 recorded mock interviews and write down 3 improvements after each. Update your CV and LinkedIn profile with the capstone and its measurable results. Verification /"
      },
    ]
  },
];