import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_0: SyllabusPhase = {
  id: 'phase-0',
  number: 0,
  title: 'Pre-learning',
  tagline: 'Phase 0 · Weeks 1-2 · ~30 Hours',
  description:
    'Master the programming, networking, enterprise architectural foundations, and cloud security protocols required to understand and build professional SAP BTP applications.',
  coreObjective:
    'Read SAP and BTP documentation with fluency. Gain technical clarity on the SAP S/4HANA core, consume and write OData v4 and REST APIs, write asynchronous Node.js and TypeScript, operate Git and Docker tooling, and validate OAuth 2.0 / JWT security flows.',
  estimatedHours: 30,
  suggestedWeeks: 'Weeks 1-2',
  badgeCategory: 'pre-learning',
  capstone: PHASE_CAPSTONES[0]!,
  modules: [
    {
      id: 'mod-0-1',
      code: '0.1',
      phaseId: 'phase-0',
      title: 'SAP World Basics',
      tagline: 'Enterprise Software, S/4HANA ERP, and the Clean Core Strategy',
      summary:
        'Understand what enterprise software is, how Enterprise Resource Planning (ERP) replaces disconnected spreadsheets, and how SAP BTP enables side-by-side extensibility without modifying the digital core.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'ERP concept: single unified database and process layer across finance, procurement, sales, warehouse, and HR.',
        'Product map: SAP ECC (legacy ERP), SAP S/4HANA (current in-memory suite), SAP HANA (in-memory column-store database), SAP Fiori (design system), SAP BTP (cloud extension & integration platform).',
        'S/4HANA deployment options: Cloud Public Edition (SaaS), Cloud Private Edition, and On-Premise.',
        'Functional enterprise modules and codes: FI (Finance), CO (Controlling), MM (Materials Management), SD (Sales & Distribution), PP (Production Planning), and SuccessFactors (Cloud HR).',
        'End-to-end business cycles: Procure-to-Pay (P2P), Order-to-Cash (O2C), Plan-to-Produce, Record-to-Report.',
        'Enterprise data classification: Master data (Business Partners, Material Master, GL Accounts) vs Transactional data (Purchase Orders, Sales Orders, Material Documents).',
        'Organizational units hierarchy: Client, Company Code (legal entity), Plant (manufacturing/logistics), Storage Location, Sales Org, Purchasing Org.',
        'Clean Core architectural doctrine: Why classical ERP modifications break cloud updates, and the 3 extension tiers (In-app key-user, developer extensibility in ABAP Cloud, side-by-side on SAP BTP).',
        'BTP Four Core Pillars: Application Development & Automation, Integration Suite, Data & Analytics, and Business AI.',
      ],
      practicalImplementation:
        'Map enterprise business objects across departments: correlate Sales Orders to FI Ledger postings. Navigate SAP Business Accelerator Hub (api.sap.com) to inspect standard OData APIs for Business Partner and Purchase Orders.',
      masteryCheck:
        'Deliver a precise 2-minute architectural explanation of how SAP BTP extends S/4HANA side-by-side. Classify 8 enterprise integration scenarios into in-app extension, side-by-side BTP extension, or prohibited core modification.',
      learningObjectives: [
        'Define Enterprise Resource Planning (ERP) and explain how it prevents corporate data silos.',
        'Differentiate between SAP ECC, SAP S/4HANA, SAP HANA database, and SAP BTP.',
        'Identify the key stages of Procure-to-Pay (P2P) and Order-to-Cash (O2C) business workflows.',
        'Distinguish between Master Data and Transactional Data in enterprise systems.',
        'Explain the SAP Clean Core strategy and why classical core modifications prevent cloud upgrades.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Enterprise Fragmentation Problem',
          subtitle: 'Why disconnected software collapses at scale',
          explanation:
            'Large multinational corporations operate across dozens of countries with multiple legal entities, thousands of suppliers, and millions of customers. When departments maintain separate databases (e.g., Sales using a standalone CRM, Warehouse using spreadsheets, and Accounting using an isolated ledger), critical business events fail to synchronize. A customer orders 500 laptops; Sales approves the deal, but the Warehouse has zero inventory, and Finance bills the wrong legal entity. Enterprise Resource Planning (ERP) solves this by enforcing a single, real-time transactional database shared across all corporate departments.',
          keyIdea:
            'An ERP system is not just software—it is the single source of truth that guarantees every department acts on identical, real-time data.',
          taskInstruction:
            'Review the university campus analogy below to understand how centralized databases replace manual reconciliations.',
          hint: 'Think about how bank balances, warehouse stock, and tax documents must update simultaneously.',
        },
        {
          stepNumber: 2,
          title: 'The SAP Product Evolution',
          subtitle: 'From R/3 and ECC to S/4HANA and SAP BTP',
          explanation:
            'Historically, SAP introduced SAP R/3 in 1992 and SAP ECC (ERP Central Component) in 2004, running on traditional relational row-store databases (Oracle, DB2, MS SQL). In 2015, SAP revolutionized enterprise computing by introducing SAP S/4HANA, built natively on SAP HANA—an in-memory, column-oriented database that processes complex analytical queries and transactional updates instantaneously. However, enterprise customers need custom mobile apps, supplier portals, and AI integrations. Building custom code directly inside S/4HANA creates severe technical debt that blocks automated upgrades. SAP Business Technology Platform (BTP) was created as the independent cloud platform where developers build custom extensions side-by-side.',
          keyIdea:
            'SAP S/4HANA houses the mission-critical business core; SAP BTP is the agile cloud platform where innovations and custom applications are developed and run.',
          taskInstruction:
            'Examine the product map to distinguish the database layer (HANA), ERP suite (S/4HANA), design system (Fiori), and cloud platform (BTP).',
          hint: 'Never refer to "HANA" as an ERP—HANA is the underlying in-memory database engine.',
        },
        {
          stepNumber: 3,
          title: 'Enterprise Data Models: Master vs Transactional Data',
          subtitle: 'How corporate objects are structured and linked',
          explanation:
            'In enterprise systems, data is strictly categorized into two primary forms: 1) Master Data: Slow-moving, foundational entities that represent business reality over long periods. Examples include Business Partners (suppliers, customers, vendors), Material Master (SKUs, dimensions, valuations), and Chart of Accounts (ledger numbers). 2) Transactional Data: High-velocity, transient records generated when a business event occurs. Examples include Purchase Orders, Invoices, Delivery Slips, and Journal Entries. Transactional documents always reference Master Data keys and are permanently recorded in the ledger for regulatory auditing.',
          keyIdea:
            'Transactional records (e.g., Purchase Order #4500001024) are immutable event records that point to permanent Master Data entities (Supplier #100042, Material #LAPTOP-01).',
          taskInstruction:
            'Inspect the JSON Purchase Order payload below to see how organizational keys, master data, and line items intersect.',
          hint: 'Master data rarely changes; transactional data is created thousands of times per hour.',
        },
        {
          stepNumber: 4,
          title: 'The Clean Core Doctrine',
          subtitle: 'Why classical ERP modifications must be avoided',
          explanation:
            'For decades, developers customized SAP by writing custom ABAP code directly modifying standard SAP database tables and functions (classical modifications). When SAP released an update or service pack, these custom modifications collided with standard code, requiring months of costly regression testing and manual remediation. Under SAP’s modern "Clean Core" strategy, modifying standard SAP code is strictly prohibited. Extensions must be built using: 1) In-app key-user extensibility for low-code UI tweaks, 2) Developer extensibility using ABAP Cloud and released APIs, or 3) Side-by-side extensibility on SAP BTP using CAP, Node.js, and Java consuming stable, versioned OData APIs.',
          keyIdea:
            'Clean Core ensures the digital core remains pristine so that quarterly cloud updates happen automatically with zero custom regressions.',
          taskInstruction:
            'Review the Clean Core architectural diagram to compare traditional core modifications with BTP side-by-side extensions.',
          warning: 'Modifying standard SAP tables directly will block ERP cloud certification and upgrades.',
        },
        {
          stepNumber: 5,
          title: 'SAP BTP: The Four Pillars',
          subtitle: 'The enterprise developer toolbelt',
          explanation:
            'SAP BTP organizes cloud services across four strategic pillars: 1) Application Development and Automation: SAP Build, Cloud Application Programming (CAP) Model, and Cloud Foundry runtimes for crafting full-stack apps. 2) Integration Suite: Enterprise message brokers (Event Mesh), API Management, Cloud Integration, and Cloud Connector for bridging cloud-to-on-premise networks. 3) Data and Analytics: SAP HANA Cloud, SAP Analytics Cloud, and Datasphere for real-time reporting. 4) Business AI: Generative AI Hub, SAP AI Core, and Joule Copilot for enterprise-grade autonomous reasoning grounded in real corporate data.',
          keyIdea:
            'BTP is not an ERP replacement; it is the extension and integration backbone that turns traditional enterprise data into modern cloud experiences.',
          taskInstruction:
            'Complete the knowledge check questions below to verify your understanding of enterprise ERP and BTP architecture.',
          hint: 'Every BTP project you build will leverage at least two of these four pillars.',
        },
      ],
      diagramType: 'erp-architecture',
      analogy: {
        concept: 'Centralized ERP vs Disconnected Spreadsheets',
        analogy: 'A Modern International Airport vs Uncoordinated Terminals',
        explanation:
          'Imagine an international airport where Flight Operations, Luggage Handling, Security Checkpoints, Fueling Crews, and Gate Assignment each operate on their own private paper notebooks. Flight Operations reschedules a flight from Gate 4 to Gate 22, but Luggage Handling never receives the memo. Passengers board at Gate 22, but their luggage is loaded onto a plane at Gate 4, while the Fueling Crew fills an empty aircraft. An ERP system acts as the central Airport Operations Control Center: the moment Flight Operations updates the flight record, gate displays update, luggage routing tugs redirect, and ticketing kiosks synchronize instantly.',
        transition:
          'Where the airport coordinates flights and baggage, SAP S/4HANA coordinates Procurement, Manufacturing, Inventory, Sales, and Accounting across multi-billion-dollar global supply chains.',
      },
      conceptExplanation: {
        whatItIs:
          'Enterprise Resource Planning (ERP) is centralized enterprise software that integrates core business processes—finance, supply chain, procurement, manufacturing, and human resources—into a unified transactional system of record running on a real-time database.',
        whyItExists:
          'Enterprises operate across dozens of legal subsidiaries with strict statutory accounting and tax compliance laws. Operating without an integrated ERP leads to accounting fraud, supply chain stockouts, duplicate payments, and multi-million-dollar regulatory penalties.',
        problemSolved:
          'Eliminates data fragmentation, manual inter-departmental reconciliations, batch ETL sync errors, and uncoordinated decision-making by enforcing an in-memory single source of truth.',
        howItWorks:
          'When a sales rep confirms an order in SAP S/4HANA, the system immediately: 1) Verifies the customer credit limit, 2) Reserves stock in the closest warehouse plant, 3) Schedules shipping logistics, and 4) Posts real-time debit/credit commitments to the general ledger, all in a single sub-second database transaction.',
        btpFit:
          'SAP S/4HANA serves as the core system of record. SAP BTP connects to S/4HANA via secure, versioned APIs (OData/REST) to host custom customer-facing web apps, supplier collaboration portals, and automated workflows without polluting the core ERP codebase.',
      },
      jargonTerms: [
        {
          term: 'ERP (Enterprise Resource Planning)',
          simpleMeaning: 'Central business software that unites all company departments under one digital roof.',
          familiarEquivalent: 'One master corporate operating system that updates everyone simultaneously.',
        },
        {
          term: 'SAP S/4HANA',
          simpleMeaning: 'SAP flagship ERP system powered by the high-speed in-memory HANA database.',
          familiarEquivalent: 'The digital nervous system of Fortune 500 enterprises.',
        },
        {
          term: 'Clean Core',
          simpleMeaning: 'An architectural rule: never modify standard ERP code; build all custom logic externally on BTP.',
          familiarEquivalent: 'Installing phone apps from the App Store instead of soldering wires onto your phone motherboard.',
        },
        {
          term: 'Master Data',
          simpleMeaning: 'Permanent foundational records (customers, products, suppliers, chart of accounts).',
          familiarEquivalent: 'Your phone contact book and address directory.',
        },
        {
          term: 'Transactional Data',
          simpleMeaning: 'Event records generated by business activities (purchase orders, invoices, payments).',
          familiarEquivalent: 'Your credit card monthly itemized transaction history.',
        },
      ],
      technicalExample: {
        title: 'SAP S/4HANA Purchase Order Document (JSON Representation)',
        language: 'json',
        code: `{
  "PurchaseOrder": "4500001024",
  "CompanyCode": "1010",
  "PurchasingOrganization": "1010",
  "PurchasingGroup": "001",
  "Supplier": "100042",
  "CreationDate": "2026-11-23",
  "TotalNetAmount": 125000.00,
  "TransactionCurrency": "EUR",
  "to_PurchaseOrderItem": [
    {
      "PurchaseOrderItem": "10",
      "Material": "INDUSTRIAL-MOTOR-V4",
      "OrderQuantity": "50",
      "OrderPriceUnit": "EA",
      "NetPriceAmount": 2500.00,
      "Plant": "1010",
      "StorageLocation": "0001"
    }
  ]
}`,
        purpose:
          'Illustrates how a standard SAP business document encapsulates organizational hierarchy (CompanyCode, PurchasingOrg), vendor master data (Supplier), and line item inventory allocations in one auditable record.',
        lineExplanations: [
          { lines: '2', explanation: 'PurchaseOrder: Unique 10-digit primary document key generated by SAP ERP.' },
          { lines: '3', explanation: 'CompanyCode: Legal entity ID registered for statutory financial and tax reporting.' },
          { lines: '6', explanation: 'Supplier: Foreign key pointing to the Business Partner master data record.' },
          { lines: '8', explanation: 'TransactionCurrency: Three-character ISO currency code enforcing financial ledger balance.' },
          { lines: '9-18', explanation: 'to_PurchaseOrderItem: One-to-many child entity containing itemized goods, quantities, plant, and storage location.' },
        ],
        expectedOutput:
          'Committed document generates purchase commitment in FI ledger, creates pending Goods Receipt in MM, and transmits EDI order to supplier.',
        commonMistakes: [
          'Confusing CompanyCode (financial legal entity) with Plant (physical manufacturing or warehouse facility).',
          'Attempting to edit standard SAP database tables via raw SQL queries rather than certified OData/BAPI interfaces.',
          'Hardcoding company codes or currencies instead of reading user context parameters.',
        ],
      },
      businessScenario: {
        title: 'Global Electronics Manufacturer Procurement Cycle',
        context:
          'A European automotive manufacturer needs to procure 50 industrial electric motors from a Japanese tier-1 supplier without manual paper PO generation.',
        workflowSteps: [
          'Production Planning (PP) detects motor inventory dropping below safety threshold (10 units).',
          'S/4HANA automatically generates an approved Purchase Order (PO #4500001024) referencing supplier master data.',
          'An extension on SAP BTP securely reads the PO via OData API and publishes an event to the Supplier Collaboration Portal.',
          'Supplier confirms delivery date; upon physical delivery, warehouse scans barcodes into SAP S/4HANA generating a Goods Receipt (GR).',
          'Finance automates 3-way matching (PO price == GR quantity == Invoice amount) and executes automated electronic payment.',
        ],
        businessImpact:
          'Reduces purchase order cycle time from 14 days to under 4 hours while maintaining 100% auditable accounting integrity.',
      },
      practicalActivity:
        'Explore SAP Business Accelerator Hub (api.sap.com). Search for "Purchase Order (OData v4)" in S/4HANA Cloud and inspect the API specification.',
      keyTakeaways: [
        'ERP unites disparate enterprise departments onto a single in-memory database to eliminate data silos and operational lag.',
        'SAP S/4HANA is the digital core; SAP BTP is the side-by-side cloud platform for building agile, modern extensions.',
        'Clean Core is the modern architectural standard that forbids modifying standard ERP code to ensure seamless cloud upgrades.',
        'Master data represents permanent business entities, while transactional data records high-velocity business events.',
      ],
      quizQuestions: [
        {
          id: 'mod-0-1-q1',
          question:
            'Why does SAP Clean Core doctrine strictly forbid writing custom code directly inside standard ERP tables and routines?',
          options: [
            {
              id: 'a',
              text: 'Because classical core modifications break during quarterly cloud upgrades, causing immense testing costs and system downtime.',
              isCorrect: true,
              explanation:
                'Correct. Clean Core ensures that custom code is completely decoupled on SAP BTP or in ABAP Cloud, enabling continuous zero-downtime updates.',
            },
            {
              id: 'b',
              text: 'Because SAP S/4HANA does not support custom business logic of any kind.',
              isCorrect: false,
              explanation:
                'Incorrect. S/4HANA fully supports custom logic, but insists it be decoupled via key-user extensibility or BTP side-by-side extensions.',
            },
            {
              id: 'c',
              text: 'Because writing custom code inside ERP increases monthly cloud subscription costs exponentially.',
              isCorrect: false,
              explanation:
                'Incorrect. Cost is not the primary technical driver—upgradeability and operational resilience are the core drivers.',
            },
            {
              id: 'd',
              text: 'Because relational database tables cannot store more than 1,000 custom fields.',
              isCorrect: false,
              explanation:
                'Incorrect. HANA can store massive columns; the limitation is software maintainability and API stability, not database capacity.',
            },
          ],
        },
        {
          id: 'mod-0-1-q2',
          question:
            'In an enterprise data model, which of the following represents Master Data rather than Transactional Data?',
          options: [
            {
              id: 'a',
              text: 'A Business Partner record containing a vendor tax ID, bank coordinates, and payment terms.',
              isCorrect: true,
              explanation:
                'Correct. Business Partners (vendors, customers) are foundational, slow-moving master data entities referenced across hundreds of transactions.',
            },
            {
              id: 'b',
              text: 'Purchase Order #4500001024 issued on November 23rd for 50 electric motors.',
              isCorrect: false,
              explanation:
                'Incorrect. A purchase order is transactional data recording an event in time.',
            },
            {
              id: 'c',
              text: 'A Goods Receipt slip recording 50 crates arriving at Warehouse Bay 4.',
              isCorrect: false,
              explanation:
                'Incorrect. A Goods Receipt is a transactional material document.',
            },
            {
              id: 'd',
              text: 'A customer billing invoice charging €125,000 for shipped items.',
              isCorrect: false,
              explanation:
                'Incorrect. Customer billing invoices are transactional financial documents.',
            },
          ],
        },
        {
          id: 'mod-0-1-q3',
          question:
            'Which SAP BTP pillar provides the Cloud Application Programming (CAP) model and Cloud Foundry runtimes for full-stack applications?',
          options: [
            {
              id: 'a',
              text: 'Application Development and Automation',
              isCorrect: true,
              explanation:
                'Correct. Application Development and Automation encompasses SAP Build, CAP, Cloud Foundry, and Pro-Code runtimes.',
            },
            {
              id: 'b',
              text: 'Integration Suite',
              isCorrect: false,
              explanation:
                'Incorrect. Integration Suite focuses on API management, Event Mesh, and Cloud Connector.',
            },
            {
              id: 'c',
              text: 'Data and Analytics',
              isCorrect: false,
              explanation:
                'Incorrect. Data and Analytics provides SAP HANA Cloud, Datasphere, and SAP Analytics Cloud.',
            },
            {
              id: 'd',
              text: 'Business AI',
              isCorrect: false,
              explanation:
                'Incorrect. Business AI houses Generative AI Hub, AI Core, and Joule Copilot.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-0-2',
      code: '0.2',
      phaseId: 'phase-0',
      title: 'API Basics',
      tagline: 'HTTP Protocols, REST Architecture, and OData v4 Fundamentals',
      summary:
        'Master the communication foundation of modern enterprise software. Learn HTTP verbs, status codes, header mechanics, JSON data formatting, and why SAP standardizes on OData v4 for enterprise integration.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Client-Server model and HTTP request/response anatomy: URL, method, headers, query string, payload.',
        'HTTP methods: GET (idempotent read), POST (non-idempotent create), PUT (complete replace), PATCH (partial update), DELETE.',
        'HTTP status code categories: 2xx (Success), 3xx (Redirection), 4xx (Client errors: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx (Server errors: 500 Internal, 502 Bad Gateway, 503 Unavailable).',
        'Header contracts: Content-Type, Accept, Authorization Bearer, If-Match (ETag concurrency), and X-CSRF-Token (state-change protection).',
        'REST architectural principles: Statelessness, resource-oriented URIs, standardized representations.',
        'OData v4 vs Standard REST: Standardized metadata schema ($metadata), declarative query options ($select, $filter, $expand, $orderby, $top, $skip).',
        'Batch processing: Executing atomic multi-statement operations in a single HTTP POST request using $batch.',
        'API exploration tools: Inspecting enterprise services with curl, Postman, and SAP Business Accelerator Hub.',
      ],
      practicalImplementation:
        'Construct raw HTTP requests using curl against a simulated OData v4 endpoint. Formulate query strings with $select, $filter (e.g., eq, lt, contains), and $expand to fetch deep relational entities in a single round-trip.',
      masteryCheck:
        'Execute 4 precise OData v4 queries: filter products by unit price, project 3 specific columns, navigate an association to retrieve supplier details, and diagnose an intentional 403 Forbidden CSRF error.',
      learningObjectives: [
        'Explain the HTTP request-response cycle and identify the role of methods, headers, and status codes.',
        'Differentiate between 401 Unauthorized (missing authentication) and 403 Forbidden (insufficient authorization).',
        'Understand the business and performance value of OData v4 compared to custom REST endpoints.',
        'Write valid OData query parameters ($select, $filter, $expand) to retrieve specific enterprise datasets.',
        'Explain how the X-CSRF-Token handshake defends against Cross-Site Request Forgery in enterprise SAP apps.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The HTTP Request and Response Wire Protocol',
          subtitle: 'The universal language of web services',
          explanation:
            'Every interaction between a web browser, a mobile app, or a backend microservice on SAP BTP occurs over HTTP (Hypertext Transfer Protocol). An HTTP request consists of four mandatory elements: 1) The Method (action verb such as GET, POST, or PATCH), 2) The URI (the path addressing a specific resource), 3) Headers (metadata key-value pairs specifying authentication tokens, accepted data formats, and caching policies), and 4) An optional Body (the data payload being transmitted, typically serialized as JSON). The server processes the request and responds with an HTTP Status Code, response headers, and the response body.',
          keyIdea:
            'HTTP is a stateless protocol: every individual request must contain all the identity and authentication context needed by the server to execute the operation.',
          taskInstruction:
            'Review the request-response breakdown in the technical example below to see raw HTTP headers in action.',
          hint: 'Remember that GET requests never carry a payload body, whereas POST, PUT, and PATCH do.',
        },
        {
          stepNumber: 2,
          title: 'HTTP Status Codes: Diagnosing System Behavior',
          subtitle: 'Understanding what the server is telling you',
          explanation:
            'Enterprise developers spend substantial time diagnosing network and application errors. Status codes are grouped into five logical families: 1) 2xx Success: 200 OK (data returned), 201 Created (resource generated), 204 No Content (action succeeded with no return body). 2) 4xx Client Error: 400 Bad Request (malformed JSON syntax), 401 Unauthorized (missing or expired JWT identity token), 403 Forbidden (authenticated, but lacking required security role/scope), 404 Not Found (invalid URL or non-existent entity key). 3) 5xx Server Error: 500 Internal Server Error (unhandled exception in code), 502 Bad Gateway / 503 Service Unavailable (backend container crashed or unreachable).',
          keyIdea:
            'Crucial distinction: 401 means "I don\'t know who you are (login needed)"; 403 means "I know who you are, but you do not have permission to perform this action."',
          taskInstruction:
            'Memorize the difference between 401 and 403—this is the most common confusion in enterprise security audits.',
          warning: 'Do not return 200 OK with an error message inside the JSON body; always return appropriate HTTP error codes.',
        },
        {
          stepNumber: 3,
          title: 'What is OData (Open Data Protocol)?',
          subtitle: 'Why standard REST is not enough for enterprise applications',
          explanation:
            'In standard custom REST APIs, every developer invents their own query parameters: one uses `/users?search=john`, another uses `/users?filter_name=john`, and a third uses `/users?q=john`. Even worse, if a mobile app only needs customer names, standard REST returns the entire 50-field customer record, wasting bandwidth. OData (an OASIS and ISO standard co-created by SAP and Microsoft) solves this by standardizing enterprise REST APIs. Every OData service exposes a machine-readable `$metadata` XML document describing all entities, fields, data types, and foreign key relationships. Furthermore, OData provides declarative query options out-of-the-box: `$select` picks columns, `$filter` conditions rows, and `$expand` fetches parent-child relationships in a single HTTP call.',
          keyIdea:
            'OData transforms REST from arbitrary custom endpoints into a standardized, self-describing, SQL-like querying layer over HTTP.',
          taskInstruction:
            'Examine the interactive OData diagram below to trace how a single query fetches both an order and its line items.',
          hint: 'Think of OData as "SQL over the Web using HTTP URLs".',
        },
        {
          stepNumber: 4,
          title: 'OData Query Parameters: $select, $filter, and $expand',
          subtitle: 'Optimizing network efficiency and application performance',
          explanation:
            'In enterprise systems with tables containing millions of rows, network optimization is vital: 1) `$select`: Projects only specified attributes (e.g., `?$select=ID,name,price`), eliminating payload bloat. 2) `$filter`: Applies boolean expressions executed directly on the database engine (e.g., `?$filter=price gt 500 and status eq \'Active\'`), preventing full-table memory scans. 3) `$expand`: Traverses relational associations (e.g., `?$expand=items`), returning parent orders and child items in one single HTTP round-trip instead of executing "1 + N" separate HTTP requests.',
          keyIdea:
            'Using `$expand` prevents the catastrophic "1 + N" network request anti-pattern where a client fetches 50 orders and makes 50 additional HTTP calls to get their items.',
          taskInstruction:
            'Formulate an OData query that retrieves employee names and expands their departmental manager.',
          hint: 'Multiple OData query parameters are concatenated using the ampersand `&` symbol.',
        },
        {
          stepNumber: 5,
          title: 'Enterprise Protection: The X-CSRF-Token Handshake',
          subtitle: 'Defending against Cross-Site Request Forgery attacks',
          explanation:
            'Because enterprise SAP systems handle payroll, contracts, and fund transfers, APIs must be secured against Cross-Site Request Forgery (CSRF). Malicious websites could otherwise trigger unauthorized actions in a user\'s authenticated browser session. To protect state-modifying requests (POST, PUT, PATCH, DELETE), SAP gateways enforce an `X-CSRF-Token` handshake: 1) The client first sends a harmless `GET` request with header `X-CSRF-Token: Fetch`. 2) The server responds with an encrypted token in the `X-CSRF-Token` response header along with session cookies. 3) The client includes this exact token in the `X-CSRF-Token` header on subsequent `POST` or `PATCH` calls. If the token is missing or invalid, the gateway immediately returns `403 Forbidden`.',
          keyIdea:
            'State-modifying requests to SAP systems will always fail with 403 Forbidden unless preceded by an X-CSRF-Token fetch handshake.',
          taskInstruction:
            'Review the business scenario below to understand how external partner portals integrate with SAP OData services.',
          warning: 'Never attempt to disable CSRF protection in production environments.',
        },
      ],
      diagramType: 'odata-flow',
      analogy: {
        concept: 'REST APIs vs OData v4 Services',
        analogy: 'The Fixed-Menu Diner vs The Custom Fine-Dining Waiter',
        explanation:
          'In a basic fast-food diner (Standard REST), there is only one "Combo Meal #1": you ask for lunch, and the counter hands you a tray containing a burger, fries, soda, and coleslaw whether you want them or not (over-fetching). If you want an extra napkin, you must stand in a second line (under-fetching). In a fine-dining restaurant (OData v4), the menu ($metadata) lists every individual ingredient, sauce, and beverage with dietary tags. You can instruct the waiter: "Bring me the steak ($select=steak), make sure it is cooked medium-rare ($filter=temp eq \'medium-rare\'), and bring the recommended wine pairing alongside it ($expand=winePairing)". The waiter brings exactly what you requested in a single trip with zero wasted food.',
        transition:
          'Where the waiter brings tailored dishes, an SAP OData v4 service returns precisely the requested columns and child records without wasting enterprise network bandwidth.',
      },
      conceptExplanation: {
        whatItIs:
          'An Application Programming Interface (API) is a formalized contract of endpoints, methods, headers, and schemas that allows disparate software systems to exchange data and execute operations reliably over a network.',
        whyItExists:
          'Modern enterprises operate hundreds of heterogeneous cloud and on-premise systems (e.g., Salesforce, SAP S/4HANA, ServiceNow, mobile apps). Direct database access between systems is strictly prohibited for security and data consistency; APIs provide a secure, governed access layer.',
        problemSolved:
          'Eliminates direct database coupling, protects business logic integrity, enforces authentication and rate limits, and allows systems built in different languages (Java, ABAP, TypeScript, Python) to communicate seamlessly.',
        howItWorks:
          'A client dispatches an HTTP request containing a method (e.g., GET), a path (`/odata/v4/catalog/Products`), headers (`Authorization: Bearer <token>`), and query parameters (`$select=name,price`). The server gateway validates authentication, parses the query, executes optimized SQL on SAP HANA, serializes the result into JSON, and returns an HTTP 200 OK response.',
        btpFit:
          'All applications built on SAP BTP (CAP services, Fiori frontends, integration flows) communicate using REST and OData v4 APIs. SAP Business Accelerator Hub provides the global catalog of pre-built APIs for all SAP cloud and on-premise products.',
      },
      jargonTerms: [
        {
          term: 'API (Application Programming Interface)',
          simpleMeaning: 'A digital doorway and ruleset that lets two software programs talk to each other.',
          familiarEquivalent: 'An electrical wall outlet: any certified plug can draw power without knowing the power plant architecture.',
        },
        {
          term: 'OData (Open Data Protocol)',
          simpleMeaning: 'An international standard for creating queryable, filterable REST APIs over HTTP.',
          familiarEquivalent: 'Writing SQL queries directly inside web URLs using simple parameters.',
        },
        {
          term: '$metadata Document',
          simpleMeaning: 'An XML schema file published by an OData service describing every entity, property, and relationship.',
          familiarEquivalent: 'The blueprint and user manual of a complex machine.',
        },
        {
          term: 'Payload',
          simpleMeaning: 'The actual business data transmitted in the body of an HTTP request or response (typically JSON).',
          familiarEquivalent: 'The letter inside a postal envelope (where headers are the address written on the outside).',
        },
        {
          term: 'CSRF (Cross-Site Request Forgery)',
          simpleMeaning: 'A malicious web attack that tricks a user browser into executing unwanted actions on an authenticated site.',
          familiarEquivalent: 'Someone forging your signature on a check because you left your stamp on their desk.',
        },
      ],
      technicalExample: {
        title: 'OData v4 HTTP Request with Query Options and JSON Response',
        language: 'json',
        code: `// 1. CLIENT REQUEST (Raw HTTP)
GET /odata/v4/sales/Orders?$select=ID,orderDate,totalAmount&$filter=totalAmount%20gt%205000&$expand=customer($select=name,email) HTTP/1.1
Host: api.mycompany.btp.ondemand.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
X-CSRF-Token: aB89xZ01kL34mN78

// 2. SERVER RESPONSE (HTTP/1.1 200 OK)
{
  "@odata.context": "$metadata#Orders(ID,orderDate,totalAmount,customer(name,email))",
  "value": [
    {
      "ID": "ord-2026-9901",
      "orderDate": "2026-11-23T14:30:00Z",
      "totalAmount": 14250.00,
      "customer": {
        "name": "Acme Aerospace Corp",
        "email": "procurement@acme.com"
      }
    }
  ]
}`,
        purpose:
          'Demonstrates how OData query parameters ($select, $filter, $expand) combine into an HTTP request that retrieves filtered orders and customer details in a single atomic round-trip.',
        lineExplanations: [
          { lines: '2', explanation: 'GET request using $select for columns, $filter for orders > 5000, and $expand for customer details.' },
          { lines: '4', explanation: 'Accept: application/json instructs server to format response payload as JSON.' },
          { lines: '5', explanation: 'Authorization: Bearer token containing cryptographically signed OAuth 2.0 JWT identity.' },
          { lines: '6', explanation: 'X-CSRF-Token: Security token validating the request originated from a trusted client session.' },
          { lines: '10', explanation: '@odata.context: Standard OData metadata declaration indicating exact schema projection returned.' },
          { lines: '11-20', explanation: 'value array: Clean JSON array containing projected fields and expanded customer object.' },
        ],
        expectedOutput:
          'Server executes a single SQL JOIN on HANA DB, returning only matched rows with zero payload bloat in < 45ms.',
        commonMistakes: [
          'Forgetting to URL-encode query strings (e.g., spaces must be encoded as %20 or +).',
          'Using == instead of OData comparison operators (OData uses eq, ne, gt, lt, ge, le).',
          'Attempting a POST/PATCH request without fetching an X-CSRF-Token first, causing immediate 403 Forbidden.',
        ],
      },
      businessScenario: {
        title: 'B2B Partner Portal Real-Time Order Verification',
        context:
          'An external logistics partner needs to query pending freight orders from SAP S/4HANA without giving third-party contractors direct database credentials.',
        workflowSteps: [
          'Logistics driver opens mobile delivery app and requests high-value pending shipments.',
          'Mobile app sends authenticated OData v4 request: `GET /Orders?$filter=status eq \'Pending\' and weight gt 1000&$expand=deliveryAddress`.',
          'SAP Cloud Integration gateway validates OAuth JWT token and checks logistics contractor scopes.',
          'Gateway routes query through Cloud Connector to S/4HANA core; returns optimized JSON payload in 120ms.',
          'Driver app renders map directions and shipment weights immediately with zero server lag.',
        ],
        businessImpact:
          'Eliminates custom database synchronization scripts, reduces mobile data consumption by 78%, and prevents unauthorized data leakage.',
      },
      practicalActivity:
        'Launch Practice Drill "Querying Data with $select and $filter" (/practice?tab=drills&id=odata-select-filter) to test your querying skills interactively.',
      keyTakeaways: [
        'HTTP methods (GET, POST, PATCH, DELETE) define the operation; status codes (2xx, 4xx, 5xx) report the exact outcome.',
        'OData v4 standardizes REST by providing declarative metadata ($metadata) and powerful querying ($select, $filter, $expand).',
        '$expand avoids the "1 + N" query problem by retrieving parent-child associations in a single network round-trip.',
        '401 means Unauthenticated; 403 means Forbidden. State-changing requests to SAP gateways require an X-CSRF-Token handshake.',
      ],
      quizQuestions: [
        {
          id: 'mod-0-2-q1',
          question:
            'A frontend developer sends a PATCH request to update an existing employee record on SAP BTP, but receives an HTTP 403 Forbidden error with message "CSRF token validation failed". What caused this error?',
          options: [
            {
              id: 'a',
              text: 'The client did not execute a preceding GET request with header "X-CSRF-Token: Fetch" to retrieve a valid security token before sending the PATCH request.',
              isCorrect: true,
              explanation:
                'Correct. SAP gateways protect state-modifying verbs (POST, PUT, PATCH, DELETE) by requiring an X-CSRF-Token retrieved via a prior GET handshake.',
            },
            {
              id: 'b',
              text: 'The server ran out of database memory and could not allocate transaction locks.',
              isCorrect: false,
              explanation:
                'Incorrect. Database memory issues result in HTTP 500 or 503 errors, not 403 CSRF failures.',
            },
            {
              id: 'c',
              text: 'The employee ID in the URL does not exist in the database.',
              isCorrect: false,
              explanation:
                'Incorrect. Non-existent entities return HTTP 404 Not Found.',
            },
            {
              id: 'd',
              text: 'PATCH is an invalid HTTP method that is strictly prohibited by OData v4 specifications.',
              isCorrect: false,
              explanation:
                'Incorrect. PATCH is the standard OData v4 method for partial entity updates.',
            },
          ],
        },
        {
          id: 'mod-0-2-q2',
          question:
            'Which OData v4 query parameter solves the "1 + N" query problem by fetching related child records alongside parent entities in a single HTTP request?',
          options: [
            {
              id: 'a',
              text: '$expand',
              isCorrect: true,
              explanation:
                'Correct. $expand traverses entity relationships (e.g. Orders -> Items) to return both in one single round-trip.',
            },
            {
              id: 'b',
              text: '$select',
              isCorrect: false,
              explanation:
                'Incorrect. $select picks specific columns/properties of an entity to reduce width.',
            },
            {
              id: 'c',
              text: '$filter',
              isCorrect: false,
              explanation:
                'Incorrect. $filter conditions which rows are returned based on boolean logic.',
            },
            {
              id: 'd',
              text: '$orderby',
              isCorrect: false,
              explanation:
                'Incorrect. $orderby sorts the returned dataset.',
            },
          ],
        },
        {
          id: 'mod-0-2-q3',
          question:
            'How do OData v4 comparison operators differ from standard JavaScript equality operators in query strings?',
          options: [
            {
              id: 'a',
              text: 'OData v4 uses word-based operators like "eq", "ne", "gt", and "lt" instead of "==", "!=", ">", and "<".',
              isCorrect: true,
              explanation:
                'Correct. Standard OData uses lowercase word abbreviations (eq, ne, gt, ge, lt, le) to avoid URL encoding conflicts with angle brackets.',
            },
            {
              id: 'b',
              text: 'OData v4 only supports regular expressions and does not support equality checks.',
              isCorrect: false,
              explanation:
                'Incorrect. OData fully supports equality checks via "eq".',
            },
            {
              id: 'c',
              text: 'OData v4 requires all filters to be written in raw ABAP syntax.',
              isCorrect: false,
              explanation:
                'Incorrect. OData is an open international standard completely independent of ABAP.',
            },
            {
              id: 'd',
              text: 'OData v4 uses triple equals "===" just like JavaScript.',
              isCorrect: false,
              explanation:
                'Incorrect. "===" is not valid OData query syntax.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-0-3',
      code: '0.3',
      phaseId: 'phase-0',
      title: 'JavaScript and Node.js',
      tagline: 'Asynchronous Programming, Event Loop, and Cloud Runtimes',
      summary:
        'Understand the runtime engine behind SAP CAP. Master modern JavaScript (ES6+), asynchronous execution with Promises and async/await, the Node.js event loop, and modular package management with npm.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Modern ECMAScript (ES6+) essentials: const/let block scoping, arrow functions, template literals, destructuring assignment, and spread/rest operators.',
        'Asynchronous runtime model: Call Stack, Web APIs / libuv worker threads, Callback/Task Queue, Microtask Queue, and the Event Loop.',
        'Promises in-depth: Pending, Fulfilled, and Rejected states; chaining with .then()/.catch()/.finally().',
        'Modern async/await syntax: Writing clean asynchronous code that reads synchronously, combined with robust try/catch error boundaries.',
        'Concurrent operations: Parallel asynchronous execution using Promise.all(), Promise.allSettled(), and Promise.race().',
        'Node.js architecture: Single-threaded non-blocking I/O event-driven architecture.',
        'Module systems: CommonJS (require / module.exports) vs modern ECMAScript Modules (ESM: import / export).',
        'Package ecosystem: package.json structure, semantic versioning (^, ~, exact), npm dependencies vs devDependencies, and node_modules resolution.',
      ],
      practicalImplementation:
        'Write an asynchronous Node.js utility that fetches data concurrently from two external REST endpoints using Promise.allSettled(), handles network timeouts gracefully, and formats an aggregated summary response.',
      masteryCheck:
        'Trace the precise console execution order of a script mixing synchronous statements, setTimeout macrotasks, and Promise microtasks. Refactor a deeply nested callback chain into clean async/await with error boundaries.',
      learningObjectives: [
        'Explain how Node.js handles thousands of concurrent requests on a single main thread without blocking.',
        'Differentiate between synchronous code, microtasks (Promises), and macrotasks (setTimeout, I/O).',
        'Use async/await with try/catch to write readable, resilient asynchronous business logic.',
        'Manage enterprise dependencies and semantic versions in package.json.',
        'Choose between Promise.all() (fail-fast) and Promise.allSettled() (resilient aggregation) for enterprise integrations.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Non-Blocking Event Loop Architecture',
          subtitle: 'Why Node.js is ideal for enterprise cloud microservices',
          explanation:
            'Traditional enterprise application servers (such as classic Java EE or Apache) allocated a dedicated operating system thread for every concurrent HTTP connection. If 1,000 clients sent requests, the server spawned 1,000 threads, consuming gigabytes of RAM while threads sat idle waiting for database responses. Node.js takes a fundamentally different approach: it operates on a single execution thread powered by the Google V8 engine and the libuv C++ asynchronous library. When a Node.js service queries SAP HANA, it does not freeze the thread; it delegates the I/O operation to the operating system kernel. The main thread is immediately free to handle hundreds of other incoming requests. When the database query finishes, libuv pushes a callback to the event queue, and the main thread returns the result.',
          keyIdea:
            'Node.js never waits for database queries or network requests to complete; it delegates I/O and keeps the main thread available for incoming traffic.',
          taskInstruction:
            'Review the single-chef restaurant analogy below to understand how non-blocking I/O achieves massive throughput with minimal memory.',
          hint: 'Heavy synchronous CPU computation (like infinite loops) will freeze the entire Node.js server.',
        },
        {
          stepNumber: 2,
          title: 'Modern JavaScript (ES6+) for SAP Developers',
          subtitle: 'Writing clean, expressive, and maintainable cloud code',
          explanation:
            'Legacy JavaScript suffered from confusing scoping bugs caused by `var` hoisting and verbose function syntax. Modern JavaScript (ES6+) introduced features now standard across all SAP CAP development: 1) `const` and `let`: Enforce strict block-level scoping, preventing accidental variable reassignment. 2) Arrow functions (`=>`): Provide concise syntax and preserve lexical `this` binding. 3) Object and Array Destructuring: Extracts properties cleanly (e.g., `const { ID, price } = req.data;`). 4) Spread/Rest Operator (`...`): Clones objects immutably and gathers variable function arguments without mutating original data.',
          keyIdea:
            'Always use `const` by default, `let` only when reassigning a variable, and never use `var` in modern enterprise applications.',
          taskInstruction:
            'Inspect the code example below to observe modern destructuring and arrow functions used in SAP CAP service handlers.',
          hint: 'Immutability prevents side-effect bugs when processing transactional financial records.',
        },
        {
          stepNumber: 3,
          title: 'From Callback Hell to Promises and async/await',
          subtitle: 'Taming asynchronous flow control',
          explanation:
            'In early Node.js code, asynchronous operations relied on nested callback functions. When an app needed to authenticate a user, check inventory, charge a credit card, and send an email, code nested four levels deep—creating unmaintainable "Callback Hell" where error handling was nearly impossible. Promises solved this by encapsulating a future value with three distinct states: Pending, Fulfilled, or Rejected. ECMAScript 2017 introduced `async/await`, which is syntactic sugar over Promises. An `async` function always returns a Promise, and `await` pauses execution inside that function until the Promise resolves, allowing asynchronous code to be read and written just like synchronous code with standard `try/catch` blocks.',
          keyIdea:
            '`async/await` transforms messy callback chains into sequential, readable code with robust, localized error handling.',
          taskInstruction:
            'Compare the nested callback pattern with clean `async/await` syntax in the technical example.',
          warning: 'Never forget `await` before an asynchronous database query, or you will receive a pending Promise instead of actual data.',
        },
        {
          stepNumber: 4,
          title: 'Parallelism: Promise.all vs Promise.allSettled',
          subtitle: 'Mastering concurrent external API orchestration',
          explanation:
            'Enterprise services frequently aggregate data from multiple upstream systems. If an order service needs data from the Warehouse API, Currency Exchange API, and Tax Rate API, calling them sequentially with `await` adds their response times together (e.g., 200ms + 150ms + 300ms = 650ms). Running them concurrently reduces total latency to the slowest individual call (300ms). However, developers must choose the correct concurrency tool: 1) `Promise.all()`: "All-or-nothing". If any single call fails, the entire batch rejects immediately. Ideal for atomic financial transactions. 2) `Promise.allSettled()`: "Resilient aggregation". Waits for all calls to finish and returns an array of individual status objects (`fulfilled` with value, or `rejected` with reason). Ideal for dashboard metrics where a failure in one service should not crash the entire screen.',
          keyIdea:
            'Use `Promise.all` when all data is strictly mandatory; use `Promise.allSettled` when partial success is acceptable.',
          taskInstruction:
            'Determine whether a supplier catalog aggregator should use `Promise.all` or `Promise.allSettled`.',
          hint: 'In enterprise dashboards, one failing weather widget should not prevent sales figures from displaying.',
        },
        {
          stepNumber: 5,
          title: 'Node.js Modules and package.json Governance',
          subtitle: 'Managing dependencies and cloud deployment artifacts',
          explanation:
            'Every Node.js application is governed by a `package.json` manifest. Key elements include: 1) `scripts`: Automation commands like `"start": "cds run"`, `"build": "mbt build"`. 2) `dependencies`: Production packages required at runtime on Cloud Foundry (e.g., `@sap/cds`, `express`, `@sap/xssec`). 3) `devDependencies`: Development-only tools excluded from production containers (e.g., `vitest`, `typescript`, `eslint`). 4) Semantic Versioning: `^1.2.3` permits minor/patch updates (< 2.0.0); `~1.2.3` permits patch updates only (< 1.3.0); `1.2.3` locks the exact version. In enterprise CI/CD pipelines, `package-lock.json` guarantees that every developer and production buildpack installs identical dependency trees.',
          keyIdea:
            'Always commit `package-lock.json` to source control to prevent breaking changes when cloud buildpacks install dependencies.',
          taskInstruction:
            'Check your project dependencies and verify that test runners are placed in devDependencies, not production dependencies.',
          warning: 'Never commit the `node_modules` directory to Git; it can contain hundreds of megabytes of compiled binaries.',
        },
      ],
      diagramType: 'event-handlers',
      analogy: {
        concept: 'Single-Threaded Non-Blocking Event Loop',
        analogy: 'The Solo Chef in a Fast-Casual Bistro',
        explanation:
          'Imagine a talented solo chef running a busy restaurant kitchen. If the chef were "blocking/synchronous," they would place a pizza in the oven and stand motionless staring at the oven door for 15 minutes, refusing to chop salad or seat customers until the pizza came out. A smart chef is "non-blocking": they slide the pizza into the oven, set a digital timer (libuv background worker), and immediately turn around to chop onions, assemble tacos, and greet guests (main event loop thread). When the oven timer rings (I/O event callback), the chef takes 5 seconds to pull the pizza out and hand it to the waiter, then immediately resumes prepping other dishes.',
        transition:
          'Where the chef preps orders while ovens bake, Node.js serves hundreds of users while background database queries execute on SAP HANA Cloud.',
      },
      conceptExplanation: {
        whatItIs:
          'Node.js is an open-source, cross-platform JavaScript runtime environment built on Google V8 engine that executes JavaScript code outside a web browser, designed for scalable server-side network applications.',
        whyItExists:
          'Traditional multi-threaded server architectures incur heavy memory and context-switching overhead under high concurrency. Node.js provides a lightweight, asynchronous, event-driven model that handles thousands of concurrent I/O connections efficiently on modest cloud hardware.',
        problemSolved:
          'Eliminates thread-exhaustion bottlenecks, allows full-stack developers to use a single programming language (JavaScript/TypeScript) across both frontend and backend, and powers the modern SAP Cloud Application Programming (CAP) framework.',
        howItWorks:
          'The V8 engine executes synchronous JavaScript on a single Call Stack. When an asynchronous operation occurs (file read, HTTP call, database query), Node.js delegates the task to the libuv C++ thread pool or OS kernel. Once completed, the callback enters the Microtask or Macrotask queue. The Event Loop continuously checks if the Call Stack is clear, pulling queued tasks onto the stack for execution.',
        btpFit:
          'Node.js is the primary runtime for the SAP Cloud Application Programming (CAP) Model and the SAP BTP Cloud Foundry runtime environment.',
      },
      jargonTerms: [
        {
          term: 'Event Loop',
          simpleMeaning: 'The internal mechanism in Node.js that checks if the main thread is free and executes queued background tasks.',
          familiarEquivalent: 'An air traffic controller assigning the single runway to planes as soon as they are ready to land.',
        },
        {
          term: 'Promise',
          simpleMeaning: 'A JavaScript object representing the eventual completion (or failure) of an asynchronous operation.',
          familiarEquivalent: 'A buzzer you receive at a crowded restaurant: it buzzes when your table is ready.',
        },
        {
          term: 'Non-Blocking I/O',
          simpleMeaning: 'Starting a disk or network task and immediately moving on to other work without waiting for it to finish.',
          familiarEquivalent: 'Putting your laundry in the washing machine and doing homework while it runs.',
        },
        {
          term: 'Semantic Versioning (SemVer)',
          simpleMeaning: 'A three-part version numbering system: MAJOR.MINOR.PATCH (e.g., 2.4.1).',
          familiarEquivalent: 'MAJOR = breaking changes; MINOR = new features; PATCH = bug fixes.',
        },
        {
          term: 'Microtask Queue',
          simpleMeaning: 'A high-priority queue where resolved Promise callbacks execute before any other timers or I/O events.',
          familiarEquivalent: 'First-class passengers permitted to board the airplane before general boarding starts.',
        },
      ],
      technicalExample: {
        title: 'Asynchronous Service Handler with Resilient Concurrency in Node.js',
        language: 'javascript',
        code: `// Resilient Aggregator Service for SAP BTP CAP
import cds from '@sap/cds';

export class SupplierAggregationService extends cds.ApplicationService {
  async init() {
    const { Suppliers, Analytics } = this.entities;

    // Custom action: Aggregate multiple supplier credit scores in parallel
    this.on('checkCreditBatch', async (req) => {
      const { supplierIds } = req.data;
      if (!Array.isArray(supplierIds) || supplierIds.length === 0) {
        return req.reject(400, 'supplierIds array must contain at least one ID');
      }

      // Execute external calls in parallel using Promise.allSettled
      const creditPromises = supplierIds.map(async (id) => {
        const creditService = await cds.connect.to('CreditBureauAPI');
        return creditService.get(\`/score/\${id}\`);
      });

      const results = await Promise.allSettled(creditPromises);

      // Separate successful responses from network failures
      const summary = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return { id: supplierIds[index], score: result.value.score, status: 'VERIFIED' };
        } else {
          return { id: supplierIds[index], error: result.reason.message, status: 'UNAVAILABLE' };
        }
      });

      return summary;
    });

    await super.init();
  }
}`,
        purpose:
          'Demonstrates professional asynchronous Node.js in SAP CAP: validates input, queries external microservices in parallel using Promise.allSettled, and gracefully handles individual network failures.',
        lineExplanations: [
          { lines: '2', explanation: 'Imports core @sap/cds runtime SDK powering CAP.' },
          { lines: '10', explanation: 'Validates input array; uses req.reject(400) to return clean HTTP 400 Bad Request if invalid.' },
          { lines: '15-18', explanation: 'Maps IDs to an array of pending Promises executing HTTP calls concurrently.' },
          { lines: '20', explanation: 'await Promise.allSettled(): Waits for all calls to finish without failing if a single endpoint is down.' },
          { lines: '23-30', explanation: 'Extracts fulfilled values and formats fallback error objects for rejected calls.' },
        ],
        expectedOutput:
          'Returns unified array of verified scores and clear status indicators in a single response, even if one vendor API is offline.',
        commonMistakes: [
          'Using sequential "for...of" loop with await inside, making 10 calls take 3,000ms instead of 300ms.',
          'Using Promise.all() when calling unreliable external APIs, causing the entire batch to crash if one vendor drops connection.',
          'Forgetting to return req.reject(), causing unhandled promise rejections that crash Node.js processes.',
        ],
      },
      businessScenario: {
        title: 'Supplier Risk Dashboard for Global Supply Chain',
        context:
          'A manufacturing company needs to evaluate financial solvency scores for 20 potential vendors across multiple credit rating agencies in real-time.',
        workflowSteps: [
          'Procurement manager selects 20 candidate suppliers in SAP Fiori List Report and clicks "Evaluate Risk Batch".',
          'Fiori triggers custom CAP action passing an array of 20 supplier IDs.',
          'Node.js backend dispatches 20 concurrent HTTP requests to credit agencies using `Promise.allSettled`.',
          '18 agencies respond in 280ms; 2 agencies time out.',
          'Backend compiles unified report marking 18 as "VERIFIED" and 2 as "MANUAL_REVIEW", returning payload to UI immediately.',
        ],
        businessImpact:
          'Cuts vendor evaluation time from 4 days of manual email chasing to 300 milliseconds of automated non-blocking execution.',
      },
      practicalActivity:
        'Launch Practice Drill "Debugging CAP Handlers" (/practice?tab=drills&id=debug-cap-handler) to test asynchronous error handling in CAP.',
      keyTakeaways: [
        'Node.js uses a single-threaded non-blocking event loop to deliver exceptional concurrency with minimal RAM.',
        'Always use const/let, arrow functions, and destructuring; never use var in modern code.',
        'async/await makes asynchronous code readable and allows standard try/catch error management.',
        'Use Promise.allSettled() when querying multiple independent external endpoints to prevent single-point-of-failure crashes.',
      ],
      quizQuestions: [
        {
          id: 'mod-0-3-q1',
          question:
            'What will happen if a developer executes a heavy synchronous CPU loop (e.g., computing prime numbers for 10 seconds) on the main Node.js thread?',
          options: [
            {
              id: 'a',
              text: 'The entire Node.js server will freeze, unable to process any incoming HTTP requests or database callbacks for 10 seconds.',
              isCorrect: true,
              explanation:
                'Correct. Because Node.js executes JavaScript on a single main thread, synchronous CPU-heavy loops block the Call Stack and prevent the Event Loop from handling other traffic.',
            },
            {
              id: 'b',
              text: 'Node.js will automatically create 10 background operating system threads to balance the CPU load.',
              isCorrect: false,
              explanation:
                'Incorrect. Node.js only delegates I/O (files, network) to libuv worker threads, not synchronous JavaScript code.',
            },
            {
              id: 'c',
              text: 'The operating system will terminate the Node.js process immediately for exceeding memory limits.',
              isCorrect: false,
              explanation:
                'Incorrect. CPU loops do not necessarily exceed RAM; they monopolize CPU cycles.',
            },
            {
              id: 'd',
              text: 'The code will execute in parallel on the GPU without impacting HTTP traffic.',
              isCorrect: false,
              explanation:
                'Incorrect. Standard Node.js does not automatically offload JavaScript loops to the GPU.',
            },
          ],
        },
        {
          id: 'mod-0-3-q2',
          question:
            'Why is Promise.allSettled() preferred over Promise.all() when aggregating data from three independent third-party vendor APIs for an executive dashboard?',
          options: [
            {
              id: 'a',
              text: 'Because Promise.allSettled() waits for all requests to finish and returns results for both fulfilled and failed calls, preventing one down API from crashing the entire dashboard.',
              isCorrect: true,
              explanation:
                'Correct. Promise.all() fails immediately if any single promise rejects ("fail-fast"), whereas Promise.allSettled() guarantees results for all calls.',
            },
            {
              id: 'b',
              text: 'Because Promise.allSettled() executes queries sequentially, saving network bandwidth.',
              isCorrect: false,
              explanation:
                'Incorrect. Both execute promises concurrently in parallel.',
            },
            {
              id: 'c',
              text: 'Because Promise.all() does not support async/await syntax.',
              isCorrect: false,
              explanation:
                'Incorrect. Both Promise.all and Promise.allSettled fully support async/await.',
            },
            {
              id: 'd',
              text: 'Because Promise.allSettled() automatically retries failed HTTP calls 10 times.',
              isCorrect: false,
              explanation:
                'Incorrect. Promise.allSettled does not provide automatic retry logic.',
            },
          ],
        },
        {
          id: 'mod-0-3-q3',
          question:
            'In an enterprise project repository, why should the "node_modules" folder be listed in ".gitignore" and never committed to source control?',
          options: [
            {
              id: 'a',
              text: 'Because node_modules can be completely reconstructed from package.json and package-lock.json, and contains thousands of platform-specific binary files that bloat Git repositories.',
              isCorrect: true,
              explanation:
                'Correct. Dependencies should be installed cleanly via "npm ci" or "npm install" on each target machine and CI/CD buildpack.',
            },
            {
              id: 'b',
              text: 'Because GitHub automatically deletes any repository containing a folder named node_modules.',
              isCorrect: false,
              explanation:
                'Incorrect. GitHub does not delete repositories, but large folders cause severe repository bloat and slow clone times.',
            },
            {
              id: 'c',
              text: 'Because JavaScript code inside node_modules cannot run if committed to Git.',
              isCorrect: false,
              explanation:
                'Incorrect. Git does not alter files, but committing node_modules violates enterprise engineering best practices.',
            },
            {
              id: 'd',
              text: 'Because npm packages expire after 24 hours unless refreshed.',
              isCorrect: false,
              explanation:
                'Incorrect. Installed npm packages do not expire after 24 hours.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-0-4',
      code: '0.4',
      phaseId: 'phase-0',
      title: 'TypeScript Basics',
      tagline: 'Static Typing, Interfaces, Generics, and Enterprise Type Safety',
      summary:
        'Bridge the gap between dynamic JavaScript and enterprise reliability. Learn static typing, custom interfaces, generics, union types, and how TypeScript prevents runtime bugs in SAP BTP applications.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Why TypeScript for enterprise: Catching runtime bugs at compile-time, IDE autocomplete, and self-documenting codebases.',
        'Primitive and core types: string, number, boolean, array, tuple, enum, any vs unknown vs never.',
        'Type Aliases vs Interfaces: When to use "interface" for extensible object contracts and "type" for unions/primitives.',
        'Generics in functions and classes: Writing reusable components that operate over multiple data types safely (e.g., APIResponse<T>).',
        'Advanced type composition: Union types (|), Intersection types (&), Optional properties (?), and readonly modifiers.',
        'Type narrowing and guards: typeof, instanceof, and custom user-defined type predicates (pet is Dog).',
        'Compiler governance (tsconfig.json): Strict mode (strict: true), noImplicitAny, strictNullChecks, and target compilation.',
        'TypeScript in SAP ecosystem: Type definitions for @sap/cds, @sap-cloud-sdk/connectivity, and UI5 Web Components.',
      ],
      practicalImplementation:
        'Author a strongly-typed generic API response wrapper and type-guard validator that parses incoming SAP S/4HANA OData payloads, strictly rejecting missing mandatory keys before processing.',
      masteryCheck:
        'Define a TypeScript interface for an enterprise Purchase Order with nested line items. Implement a custom type guard function that safely narrows "unknown" HTTP payload data into a verified PurchaseOrder contract.',
      learningObjectives: [
        'Explain the architectural advantages of compile-time static typing over dynamic runtime checking in enterprise systems.',
        'Differentiate between "any" (unsafe escape hatch) and "unknown" (type-safe requiring narrowing).',
        'Create reusable generic interfaces that model enterprise data structures with full IDE autocomplete.',
        'Implement type guards to validate external HTTP payloads safely at application boundaries.',
        'Configure tsconfig.json with strict flags for professional SAP BTP development.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Enterprise Cost of Runtime Bugs',
          subtitle: 'Why JavaScript flexibility becomes liability at scale',
          explanation:
            'JavaScript is dynamically typed: variable types are evaluated only when code runs in production. If a developer accidentally writes `order.totalAmmount` (with two \'m\'s), JavaScript does not throw a compile error—it silently evaluates the property as `undefined`. In a consumer mobile game, this might cause a visual glitch. In an enterprise ERP system managing a €50,000,000 corporate payment, `undefined` can lead to corrupted ledger balances or payment failures. TypeScript, developed by Microsoft, adds static typing to JavaScript. Code is analyzed at compile-time inside your IDE: spelling mistakes, invalid property access, and incorrect function arguments are flagged immediately before code ever touches a server.',
          keyIdea:
            'TypeScript catches bugs during development inside your editor, preventing catastrophic runtime failures in production.',
          taskInstruction:
            'Review the blueprint analogy below to see why enterprise engineering requires structural verification before execution.',
          hint: 'TypeScript code is transpiled into clean, standard JavaScript that runs on any Node.js runtime.',
        },
        {
          stepNumber: 2,
          title: 'Core Types: any vs unknown vs never',
          subtitle: 'Enforcing strict type hygiene',
          explanation:
            'TypeScript provides standard types (`string`, `number`, `boolean`, `Date`). However, developers often encounter special types: 1) `any`: Disables all type checking. It turns TypeScript back into plain JavaScript. Using `any` in enterprise code defeats the purpose of TypeScript and is considered a code-smell. 2) `unknown`: The type-safe counterpart of `any`. It signifies "this could be anything, but you must narrow its type using `typeof` or a type guard before you can read its properties." 3) `never`: Represents values that never occur (e.g., a function that always throws an exception or an exhaustive check in a switch statement).',
          keyIdea:
            'Never use `any` when handling external API payloads; use `unknown` and validate the structure using type guards.',
          taskInstruction:
            'Notice how the technical example below accepts `unknown` input and safely narrows it before reading properties.',
          warning: 'Enabling "noImplicitAny: true" in tsconfig.json prevents developers from accidentally introducing untyped variables.',
        },
        {
          stepNumber: 3,
          title: 'Interfaces and Type Aliases',
          subtitle: 'Designing contract-first data architectures',
          explanation:
            'In TypeScript, we define the shape of enterprise objects using `interface` or `type`: 1) `interface`: Primarily used to define the contract of objects, services, and classes. Interfaces support declaration merging and extension via `extends`. 2) `type`: Used for unions, intersections, primitives, and tuples (e.g., `type OrderStatus = \'Pending\' | \'Approved\' | \'Rejected\';`). For modeling business objects like Business Partners, Sales Orders, or Invoices, interfaces provide clean, self-documenting code with full autocomplete in VS Code and SAP Business Application Studio.',
          keyIdea:
            'Interfaces define the strict contract of your data. If backend API data does not match the interface, TypeScript flags it immediately.',
          taskInstruction:
            'Write an interface defining a Customer entity with mandatory ID, optional phoneNumber, and readonly taxNumber.',
          hint: 'Use the `readonly` modifier to prevent accidental reassignment of primary keys.',
        },
        {
          stepNumber: 4,
          title: 'Generics: Reusable Type-Safe Components',
          subtitle: 'Writing flexible code without sacrificing type safety',
          explanation:
            'In enterprise systems, we frequently write utility functions, database queries, and API clients that must operate on different entities (e.g., a response wrapper that wraps Orders, Products, or Invoices). Without Generics, developers are tempted to use `any`. Generics allow us to pass types as parameters (using angle brackets `<T>`). For example, `interface ApiResponse<T> { data: T; status: number; timestamp: string; }`. If we request `ApiResponse<Order>`, TypeScript knows that `response.data` has an `orderId` and `totalAmount`. If we request `ApiResponse<Employee>`, TypeScript knows `response.data` has an `employeeId` and `department`.',
          keyIdea:
            'Generics enable high code reusability while preserving 100% strict type safety and autocomplete.',
          taskInstruction:
            'Inspect the generic `ODataListResponse<T>` interface in the code snippet below.',
          hint: 'Think of Generics as "variables for types instead of values".',
        },
        {
          stepNumber: 5,
          title: 'tsconfig.json: Enterprise Compiler Configuration',
          subtitle: 'Enforcing organizational quality standards',
          explanation:
            'The behavior of the TypeScript compiler is controlled by `tsconfig.json`. Enterprise SAP BTP projects enforce strict compiler flags: 1) `"strict": true`: Enables all strict type-checking options simultaneously. 2) `"noImplicitAny": true`: Raises errors on any variable inferred as `any`. 3) `"strictNullChecks": true`: Prevents the notorious "Cannot read property of undefined" error by ensuring `null` and `undefined` must be explicitly handled. 4) `"target": "ES2022"`: Compiles to modern ECMAScript supported by current Node.js LTS runtimes. 5) `"moduleResolution": "node"`: Resolves packages according to standard Node.js conventions.',
          keyIdea:
            'Always enable `"strict": true` in new SAP BTP projects from day one; retrofitting strict typing later is vastly more difficult.',
          taskInstruction:
            'Verify your project tsconfig.json has strict mode activated.',
          warning: 'Disabling strictNullChecks reintroduces the number one cause of web application crashes.',
        },
      ],
      diagramType: 'event-handlers',
      analogy: {
        concept: 'Static TypeScript vs Dynamic JavaScript',
        analogy: 'Architectural Blueprints vs Freehand Sketching',
        explanation:
          'Imagine building a skyscraper. Dynamic JavaScript is like sketching an idea on a napkin and immediately pouring concrete on the construction site: you only discover that the elevator shaft is 2 meters too narrow when the elevator arrives on opening day (a runtime crash). TypeScript is the certified civil engineering blueprint: every beam thickness, load tolerance, and plumbing pipe diameter is mathematically validated before a single dollar is spent on construction. If an electrical wire passes through a water main, the CAD software flags a collision error immediately on the computer screen before anyone steps onto the job site.',
        transition:
          'Where engineering blueprints prevent building collapses, TypeScript prevents runtime data corruption in enterprise financial applications.',
      },
      conceptExplanation: {
        whatItIs:
          'TypeScript is a strongly-typed, object-oriented programming language developed by Microsoft that builds on JavaScript by adding optional static type definitions, which compile to plain JavaScript.',
        whyItExists:
          'As JavaScript applications grew from small browser scripts into massive enterprise microservices with hundreds of thousands of lines of code, the lack of static types caused pervasive runtime defects, difficult refactoring, and poor developer productivity.',
        problemSolved:
          'Eliminates runtime "undefined is not a function" errors, makes refactoring safe across large codebases, and provides instant code documentation via IDE autocomplete.',
        howItWorks:
          'During development, the TypeScript language server (`tsc`) analyzes code against declared types and interfaces. When you run `npm run build`, `tsc` strips all type annotations and emits clean JavaScript that executes on standard Node.js runtimes.',
        btpFit:
          'SAP modern development tools—including the SAP Cloud Application Programming Model (@sap/cds), SAP Cloud SDK, and SAP Fiori UI5 tooling—fully support and recommend TypeScript for building robust, enterprise-grade cloud services.',
      },
      jargonTerms: [
        {
          term: 'Static Typing',
          simpleMeaning: 'Checking variable types at compile-time before code executes.',
          familiarEquivalent: 'Checking that a key fits a lock before trying to turn it.',
        },
        {
          term: 'Interface',
          simpleMeaning: 'A declared blueprint defining the exact properties and types an object must have.',
          familiarEquivalent: 'A legal contract specifying terms that both parties must satisfy.',
        },
        {
          term: 'Generics (<T>)',
          simpleMeaning: 'A feature that allows writing code that works with any data type while maintaining strict type safety.',
          familiarEquivalent: 'A shipping crate designed to carry any cargo safely without opening it.',
        },
        {
          term: 'Type Narrowing',
          simpleMeaning: 'Using code checks (like typeof or custom guards) to refine an uncertain type into a specific known type.',
          familiarEquivalent: 'Inspecting a package label to confirm whether it contains glass or metal before lifting.',
        },
        {
          term: 'Union Type (|)',
          simpleMeaning: 'A type that allows a value to be one of several specified types (e.g., string | number).',
          familiarEquivalent: 'An ATM that accepts either debit cards or mobile phone contactless scans.',
        },
      ],
      technicalExample: {
        title: 'Enterprise Strongly-Typed OData Response with Type Guard in TypeScript',
        language: 'typescript',
        code: `// Enterprise Generic OData v4 Types and Type Guard Validator

export interface ODataResponse<T> {
  '@odata.context': string;
  value: T[];
}

export interface PurchaseOrderItem {
  itemNumber: string;
  material: string;
  quantity: number;
  netPrice: number;
}

export interface PurchaseOrder {
  orderId: string;
  companyCode: string;
  supplierId: string;
  currency: 'EUR' | 'USD' | 'GBP';
  items: PurchaseOrderItem[];
}

// User-Defined Type Guard to validate incoming unknown payload
export function isPurchaseOrder(data: unknown): data is PurchaseOrder {
  if (typeof data !== 'object' || data === null) return false;
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.orderId === 'string' &&
    typeof candidate.companyCode === 'string' &&
    typeof candidate.supplierId === 'string' &&
    Array.isArray(candidate.items)
  );
}

// Safe Consumer Function
export function calculateOrderTotal(payload: unknown): number {
  if (!isPurchaseOrder(payload)) {
    throw new Error('Invalid payload: Data does not conform to PurchaseOrder contract');
  }
  // TypeScript now knows payload is PurchaseOrder with 100% certainty!
  return payload.items.reduce((sum, item) => sum + (item.quantity * item.netPrice), 0);
}`,
        purpose:
          'Demonstrates professional TypeScript: generic response wrappers, strict string union types, and a user-defined type guard (`data is PurchaseOrder`) that safely validates external data at application boundaries.',
        lineExplanations: [
          { lines: '3-6', explanation: 'Generic interface ODataResponse<T> that wraps any entity type T in an OData v4 payload structure.' },
          { lines: '18', explanation: 'Strict union type restricting currency to three valid ISO codes: EUR, USD, or GBP.' },
          { lines: '23', explanation: 'Type guard signature "data is PurchaseOrder": if function returns true, TypeScript narrows data type automatically.' },
          { lines: '35', explanation: 'Exhaustive validation check: throws meaningful error if contract is violated.' },
          { lines: '39', explanation: 'Type-safe reduction: editor autocompletes item.quantity and item.netPrice with zero risk of undefined.' },
        ],
        expectedOutput:
          'Zero compile-time errors. Complete IDE autocomplete and instant compile warnings if an invalid property is accessed.',
        commonMistakes: [
          'Using "data as PurchaseOrder" without runtime validation (type assertion lie that hides bugs).',
          'Using "any" instead of "unknown" when receiving untrusted data from network requests.',
          'Not validating nested array items inside custom type guards.',
        ],
      },
      businessScenario: {
        title: 'Financial Transaction Ledger Type Safety',
        context:
          'A multi-currency financial ledger microservice on SAP BTP calculates foreign exchange settlements across 15 banking partners.',
        workflowSteps: [
          'External banking API delivers raw JSON transaction payload.',
          'TypeScript type guard `isBankingTransaction(payload)` executes at API boundary.',
          'Payload missing mandatory ISO currency code is rejected immediately with HTTP 400 Bad Request before database access.',
          'Valid transactions enter ledger calculation engine with guaranteed non-null numerical properties.',
          'Ledger balances settle with zero rounding errors and zero runtime null pointer crashes.',
        ],
        businessImpact:
          'Eliminates 100% of runtime data-type mismatch errors and reduces post-deployment production hotfixes by 40%.',
      },
      practicalActivity:
        'Launch Practice Drill "Define Your First CDS Entity" (/practice?tab=drills&id=cds-basic-entity) to observe declarative typing in SAP Core Data Services.',
      keyTakeaways: [
        'TypeScript catches errors during development inside your IDE, preventing expensive production crashes.',
        'Use "unknown" instead of "any" for untrusted data, and narrow it safely using type guards.',
        'Generics (<T>) allow building reusable components while maintaining strict type safety.',
        'Always enable "strict: true" in tsconfig.json for professional enterprise projects.',
      ],
      quizQuestions: [
        {
          id: 'mod-0-4-q1',
          question:
            'What is the fundamental difference between the "any" type and the "unknown" type in TypeScript?',
          options: [
            {
              id: 'a',
              text: '"any" disables all type checking completely, while "unknown" enforces type safety by requiring you to narrow the type before accessing properties.',
              isCorrect: true,
              explanation:
                'Correct. "any" is an escape hatch that silences the compiler, whereas "unknown" is type-safe: you cannot call methods or access properties on it without checking its type first.',
            },
            {
              id: 'b',
              text: '"any" can only store numbers, while "unknown" can store any data type.',
              isCorrect: false,
              explanation:
                'Incorrect. Both can store any value, but "unknown" forces validation before use.',
            },
            {
              id: 'c',
              text: '"unknown" is converted to null at runtime by the TypeScript compiler.',
              isCorrect: false,
              explanation:
                'Incorrect. TypeScript types are erased during compilation and have zero effect on runtime objects.',
            },
            {
              id: 'd',
              text: '"any" is mandatory for all functions that return Promises.',
              isCorrect: false,
              explanation:
                'Incorrect. Promises should always be typed with their resolved value, e.g. Promise<User>.',
            },
          ],
        },
        {
          id: 'mod-0-4-q2',
          question:
            'What does a custom type guard function with return type "data is PurchaseOrder" accomplish?',
          options: [
            {
              id: 'a',
              text: 'It tells the TypeScript compiler that if the function returns true, the parameter "data" can be treated as a PurchaseOrder with full type safety.',
              isCorrect: true,
              explanation:
                'Correct. Type predicate guards allow custom runtime validation code to inform TypeScript static analysis.',
            },
            {
              id: 'b',
              text: 'It automatically encrypts the data using AES-256 before sending it to SAP HANA.',
              isCorrect: false,
              explanation:
                'Incorrect. Type guards are purely for static typing and runtime validation, not encryption.',
            },
            {
              id: 'c',
              text: 'It forces the browser to download a PurchaseOrder PDF document.',
              isCorrect: false,
              explanation:
                'Incorrect. Type guards have nothing to do with PDF generation.',
            },
            {
              id: 'd',
              text: 'It converts a SQL database table into a MongoDB collection.',
              isCorrect: false,
              explanation:
                'Incorrect. Type guards perform in-memory type narrowing.',
            },
          ],
        },
        {
          id: 'mod-0-4-q3',
          question:
            'What happens when a TypeScript project is compiled for production using "tsc"?',
          options: [
            {
              id: 'a',
              text: 'TypeScript verifies all types, flags any compiler errors, strips all type annotations, and emits clean, standard JavaScript.',
              isCorrect: true,
              explanation:
                'Correct. Browsers and Node.js execute standard JavaScript; TypeScript is completely erased at compile time.',
            },
            {
              id: 'b',
              text: 'The code is converted into a binary .exe file that runs directly on the CPU.',
              isCorrect: false,
              explanation:
                'Incorrect. TypeScript compiles to JavaScript, not machine code executables.',
            },
            {
              id: 'c',
              text: 'The code is sent to SAP headquarters for manual security review before execution.',
              isCorrect: false,
              explanation:
                'Incorrect. Compilation is local or performed in your automated CI/CD pipeline.',
            },
            {
              id: 'd',
              text: 'Type definitions remain embedded in the code to perform runtime validation in the browser.',
              isCorrect: false,
              explanation:
                'Incorrect. Standard TypeScript types have zero runtime footprint and are stripped completely.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-0-5',
      code: '0.5',
      phaseId: 'phase-0',
      title: 'Dev Essentials',
      tagline: 'Terminal CLI Mastery, Git Version Control, and Containerization Basics',
      summary:
        'Equip yourself with the fundamental toolbelt of an enterprise cloud engineer: Command-Line Interface (CLI) navigation, Git branching and collaboration workflows, environment variable management, and Docker containerization.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Terminal CLI mastery: File system navigation, piping (|), standard streams (stdout, stderr), environment variables (.env), and process signals.',
        'Git version control fundamentals: Repository initialization, working tree, staging area (index), and immutable commit history.',
        'Enterprise branching strategies: Feature branching, Trunk-Based Development, pull requests, code reviews, and semantic commit conventions.',
        'Git collaboration operations: merge vs rebase, resolving merge conflicts cleanly, git stash, git diff, and inspecting commit logs.',
        'Remote repositories: GitHub/GitLab integration, SSH key authentication, Personal Access Tokens, and branch protection rules.',
        'Containerization basics: Why containers replace "it works on my machine", Virtual Machines vs Docker containers, images vs running containers.',
        'Dockerfile architecture: Base images, FROM, WORKDIR, COPY, RUN, EXPOSE, and CMD directives.',
        'Local developer environment: Essential tooling in VS Code / SAP Business Application Studio, SAP CDS Language Support, and REST Client.',
      ],
      practicalImplementation:
        'Initialize a Git repository, create a feature branch, author a multi-stage Dockerfile for a Node.js microservice, simulate a merge conflict, and resolve it using command-line Git tools.',
      masteryCheck:
        'Successfully initialize a Git repository, configure .gitignore to exclude secrets and node_modules, create and merge a feature branch without fast-forward, and explain how Docker containers ensure reproducible BTP deployments.',
      learningObjectives: [
        'Navigate the command line comfortably and manage environment variables securely.',
        'Explain the three states of Git (Working Directory, Staging Area, Repository Commit).',
        'Execute enterprise Git branching, pull requests, and resolve merge conflicts cleanly.',
        'Understand how Docker containers package application runtimes and prevent environment drift.',
        'Protect sensitive credentials from ever being committed to source control repositories.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Terminal: The Professional Developer Cockpit',
          subtitle: 'Why cloud engineers operate via the command line',
          explanation:
            'While graphical user interfaces (GUIs) are convenient for basic tasks, enterprise cloud engineering on SAP BTP requires command-line interface (CLI) mastery. Deployment tools (`cf push`), build tools (`mbt build`), project scaffolding (`cds init`), and container managers (`docker run`) operate exclusively via the terminal. Key concepts include: 1) File navigation: `cd`, `ls -la`, `pwd`. 2) Environment variables: Configuration parameters passed to processes at runtime (e.g., `PORT=8080`, `NODE_ENV=production`). 3) Piping: Directing output from one command into another using `|` (e.g., `cf logs my-app --recent | grep ERROR`).',
          keyIdea:
            'The terminal allows scripting, reproducibility, and automation across continuous integration and deployment pipelines.',
          taskInstruction:
            'Practice navigating directories and printing environment variables in your terminal.',
          hint: 'On Windows PowerShell use `$env:VARIABLE_NAME`; on macOS/Linux use `echo $VARIABLE_NAME`.',
        },
        {
          stepNumber: 2,
          title: 'Git Version Control: The Three Trees',
          subtitle: 'Understanding the mechanics of Git state',
          explanation:
            'Git is a distributed version control system that tracks changes in source code. To master Git, you must understand its three distinct stages: 1) Working Directory: The physical files you edit in VS Code or Business Application Studio. 2) Staging Area (Index): The buffer where you prepare changes before committing (`git add filename`). It allows you to craft precise, cohesive commits. 3) Repository History: The permanent, cryptographically signed ledger of immutable commits (`git commit -m "feat: add purchase order handler"`). Each commit has a unique SHA-1/SHA-256 hash pointing to its parent, author, and exact code snapshot.',
          keyIdea:
            'Never commit half-finished, untested code. Use the staging area to review your diffs before committing.',
          taskInstruction:
            'Review the safe-deposit vault analogy below to internalize Git commit immutability.',
          hint: 'Always run `git status` and `git diff` before staging files.',
        },
        {
          stepNumber: 3,
          title: 'Branching, Collaboration, and Merge Conflicts',
          subtitle: 'How enterprise teams work simultaneously without collision',
          explanation:
            'In enterprise projects, multiple developers build features concurrently. Working directly on the `main` branch is strictly prohibited. Instead, developers create feature branches (`git checkout -b feature/order-validation`). Once work is complete, tested, and verified, the developer pushes the branch to GitHub/GitLab and opens a Pull Request (PR). Teammates review the code, automated CI/CD pipelines run tests, and the branch is merged. When two developers edit the same lines in the same file, Git pauses during merge and flags a "Merge Conflict." The developer must open the file, inspect the conflicting sections (`<<<<<<< HEAD` vs `>>>>>>> feature`), decide on the correct unified code, and commit the resolution.',
          keyIdea:
            'Merge conflicts are not bugs—they are Git\'s safety mechanism preventing developers from silently overwriting each other\'s work.',
          taskInstruction:
            'Inspect the merge conflict resolution walkthrough in the technical example below.',
          warning: 'Never force-push (`git push --force`) to shared branches like main.',
        },
        {
          stepNumber: 4,
          title: 'Secrets Management: The .gitignore Imperative',
          subtitle: 'Preventing catastrophic credential leaks',
          explanation:
            'One of the most dangerous mistakes an enterprise developer can make is committing database credentials, API keys, private keys, or passwords to a Git repository. Automated scanners index public repositories in seconds; compromised credentials can result in massive corporate data breaches. Every project must have a `.gitignore` file in its root directory specifying files that Git must never track: 1) `.env` (local secret credentials), 2) `node_modules/` (third-party libraries), 3) `dist/` and `gen/` (compiled build outputs), and 4) OS files (`.DS_Store`, `Thumbs.db`).',
          keyIdea:
            'Once a secret is committed to Git, it is preserved in the permanent commit history even if you delete it in the next commit. Always use .gitignore.',
          taskInstruction:
            'Examine the production-grade .gitignore template provided in the technical example.',
          warning: 'If you accidentally commit a secret, consider that secret compromised immediately: revoke and rotate it at once.',
        },
        {
          stepNumber: 5,
          title: 'Containerization Basics: The Docker Revolution',
          subtitle: 'Solving "It works on my machine" forever',
          explanation:
            'Historically, software that ran perfectly on a developer\'s laptop crashed in production because the server had a different Node.js version, missing system libraries, or different operating system patches. Docker containerization solves this by packaging the application code, runtime (Node.js 20), system tools, libraries, and configuration into a single, standardized, isolated container image. Unlike Virtual Machines (VMs), which run an entire guest operating system and consume gigabytes of memory, containers share the host OS kernel and start in sub-seconds. Cloud Foundry and Kubernetes run applications inside container instances.',
          keyIdea:
            'A container packages everything your code needs to run, guaranteeing that what runs locally runs identically on SAP BTP.',
          taskInstruction:
            'Review the Dockerfile instructions in the code example below.',
          hint: 'Images are the immutable blueprint (the class); containers are the running instances (the objects).',
        },
      ],
      diagramType: 'cf-deployment',
      analogy: {
        concept: 'Git Version Control and Docker Containers',
        analogy: 'The Architectural Vault and Standardized Cargo Shipping Container',
        explanation:
          'Git is like an immutable architectural safe-deposit vault. Every time an architect finalizes a blueprint, they seal it in an envelope, timestamp it, and deposit it in the vault. If a renovation fails months later, you can retrieve the exact blueprint from three years ago and inspect every millimeter of the original structure. Docker is like the intermodal steel shipping container that revolutionized global trade: before containers, dockworkers loaded loose barrels, crates, and sacks onto ships with high breakage and theft. With standardized 40-foot steel containers, the crane does not care whether the container holds bananas, laptops, or car engines—it stacks identically onto trucks, trains, and cargo ships worldwide.',
        transition:
          'Where steel containers standardize physical shipping, Docker containers standardize cloud software execution on SAP BTP.',
      },
      conceptExplanation: {
        whatItIs:
          'Development essentials encompass the foundational command-line tools, distributed version control systems (Git), and containerization technologies (Docker) that software engineers use to write, collaborate on, version, package, and deploy software.',
        whyItExists:
          'Enterprise software is built by distributed teams across multiple time zones. Without standardized version control, teams overwrite each other\'s code. Without containerization, software behaves inconsistently across development, quality assurance, and production environments.',
        problemSolved:
          'Eliminates code loss, allows safe experimentation through branches, provides complete auditability of who changed what and why, and guarantees reproducible deployments.',
        howItWorks:
          'Developers write code locally, test using local containers, commit atomic changes to Git, push branches to remote repositories, and trigger automated Continuous Integration (CI) pipelines that test, build container images, and deploy to SAP BTP.',
        btpFit:
          'SAP development tools—including the Cloud Foundry CLI (`cf`), Multi-Apps CLI (`cf deploy`), and modern Cloud Application Programming Model (`@sap/cds-dk`)—are driven via terminal CLI and version-controlled via Git.',
      },
      jargonTerms: [
        {
          term: 'Git Repository (Repo)',
          simpleMeaning: 'A project folder tracked by Git containing your code and its complete historical commit log.',
          familiarEquivalent: 'A digital ledger recording every edit ever made to a manuscript.',
        },
        {
          term: 'Commit',
          simpleMeaning: 'An immutable, timestamped snapshot of code changes saved to the repository history.',
          familiarEquivalent: 'A permanent save-point in a video game that you can always reload.',
        },
        {
          term: 'Merge Conflict',
          simpleMeaning: 'A state where Git stops during a merge because two branches altered the same line in different ways.',
          familiarEquivalent: 'Two co-authors editing the exact same sentence differently in a shared book draft.',
        },
        {
          term: 'Docker Container',
          simpleMeaning: 'A lightweight, standalone, executable package containing code, runtime, and system libraries.',
          familiarEquivalent: 'A self-contained space capsule carrying everything an astronaut needs to survive independently.',
        },
        {
          term: 'Environment Variable',
          simpleMeaning: 'A dynamic key-value pair passed to a process from outside the code at runtime.',
          familiarEquivalent: 'Setting the temperature dial on an air conditioner without rewiring the motor.',
        },
      ],
      technicalExample: {
        title: 'Production .gitignore, Environment Config, and Dockerfile for SAP Microservices',
        language: 'dockerfile',
        code: `# 1. PRODUCTION-GRADE .gitignore TEMPLATE
# Environment and Secrets (CRITICAL: NEVER COMMIT)
.env
.env.local
*.pem
*.key

# Dependencies and Build Artifacts
node_modules/
dist/
gen/
mta_archives/
*.mtar

# Logs and OS Artifacts
*.log
.DS_Store
Thumbs.db

# 2. MULTI-STAGE DOCKERFILE FOR SAP BTP NODE.JS SERVICE
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /usr/src/app
# Copy installed dependencies and application code
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

# Run as non-root user for enterprise container security
USER node
EXPOSE 4004
ENV NODE_ENV=production

CMD ["node", "node_modules/@sap/cds/bin/cds-serve.js"]`,
        purpose:
          'Demonstrates enterprise engineering standards: comprehensive .gitignore file protecting secrets and multi-stage Dockerfile that creates an optimized, secure, non-root container for SAP CAP services.',
        lineExplanations: [
          { lines: '3-6', explanation: 'Specifies secret files (.env, *.key) that Git must permanently ignore to prevent security breaches.' },
          { lines: '9-12', explanation: 'Excludes node_modules and compilation archives (.mtar) from repository bloat.' },
          { lines: '20-24', explanation: 'Multi-stage builder: installs production dependencies in a separate build stage using npm ci.' },
          { lines: '32', explanation: 'USER node: Enforces enterprise security by running the container process as an unprivileged user.' },
          { lines: '33', explanation: 'EXPOSE 4004: Documents standard SAP CAP listening port.' },
        ],
        expectedOutput:
          'Clean Git status with zero secret leaks; compact Docker container image (< 180MB) running CAP securely.',
        commonMistakes: [
          'Committing .env files to GitHub, exposing database credentials to web scanners.',
          'Running Docker containers as root user in production environments.',
          'Using "npm install" instead of "npm ci" in Dockerfiles, leading to non-deterministic dependency versions.',
        ],
      },
      businessScenario: {
        title: 'Automated CI/CD Deployment Pipeline for Healthcare SAP BTP Portal',
        context:
          'A hospital network develops a patient records extension on SAP BTP and requires zero downtime and 100% auditability for code deployments.',
        workflowSteps: [
          'Developer creates a feature branch `feature/hipaa-audit-log` and implements verified code.',
          'Developer creates Pull Request on GitHub; automated CI pipeline triggers.',
          'Pipeline validates code: runs `npm run typecheck`, `npm run lint`, and 80 unit tests inside a Docker test container.',
          'Senior architect reviews code diff, verifies zero credentials are leaked, and approves the PR.',
          'Merged commit automatically builds MTA archive and deploys to SAP BTP Cloud Foundry space with zero downtime.',
        ],
        businessImpact:
          'Ensures 100% HIPAA regulatory compliance, eliminates deployment errors, and reduces deployment lead time from 3 weeks to 12 minutes.',
      },
      practicalActivity:
        'Launch Practice Drill "CDS Syntax & Entity Debugging" (/practice?tab=drills&id=debug-cds-syntax) to test your syntax inspection skills.',
      keyTakeaways: [
        'CLI navigation and tooling are mandatory skills for modern cloud developers.',
        'Git staging allows crafting clean, cohesive commits; branches allow risk-free parallel collaboration.',
        'Never commit secrets or node_modules to Git; always maintain a strict .gitignore file.',
        'Docker containers package runtime and code together, eliminating environment discrepancies forever.',
      ],
      quizQuestions: [
        {
          id: 'mod-0-5-q1',
          question:
            'A new developer joins an enterprise project and accidentally commits a ".env" file containing real SAP HANA database passwords to the team GitHub repository. What is the immediate required action?',
          options: [
            {
              id: 'a',
              text: 'Immediately revoke and rotate the database credentials, add .env to .gitignore, and purge the sensitive file from Git commit history using repository rewriting tools.',
              isCorrect: true,
              explanation:
                'Correct. Once committed, credentials must be considered compromised and rotated immediately, because simply deleting the file in a new commit still leaves it visible in previous Git commits.',
            },
            {
              id: 'b',
              text: 'Simply delete the file in a new commit and push it to main.',
              isCorrect: false,
              explanation:
                'Incorrect. Deleting the file leaves it intact in Git history where anyone with repository access can view it.',
            },
            {
              id: 'c',
              text: 'Do nothing, because private Git repositories can never be accessed by attackers.',
              isCorrect: false,
              explanation:
                'Incorrect. Insider threats, compromised developer laptops, and CI/CD breaches frequently expose private repos.',
            },
            {
              id: 'd',
              text: 'Rename the .env file to config.json so it is no longer hidden.',
              isCorrect: false,
              explanation:
                'Incorrect. Renaming does not hide credentials from version control.',
            },
          ],
        },
        {
          id: 'mod-0-5-q2',
          question:
            'What occurs when Git encounters a Merge Conflict during a branch integration?',
          options: [
            {
              id: 'a',
              text: 'Git pauses the merge, inserts conflict markers (<<<<<<< HEAD and >>>>>>>) in the affected files, and requires the developer to manually review and commit the resolved code.',
              isCorrect: true,
              explanation:
                'Correct. Conflict markers highlight the competing changes so developers can make a conscious decision on the final unified code.',
            },
            {
              id: 'b',
              text: 'Git automatically deletes both files to protect database consistency.',
              isCorrect: false,
              explanation:
                'Incorrect. Git never deletes conflicting files.',
            },
            {
              id: 'c',
              text: 'Git chooses whichever commit was made by the developer with higher administrative privileges.',
              isCorrect: false,
              explanation:
                'Incorrect. Git is decentralized and does not make arbitrary priority judgments.',
            },
            {
              id: 'd',
              text: 'The repository is corrupted and must be re-cloned from scratch.',
              isCorrect: false,
              explanation:
                'Incorrect. Merge conflicts are standard routine collaboration events.',
            },
          ],
        },
        {
          id: 'mod-0-5-q3',
          question:
            'What is the primary operational advantage of Docker containers over traditional Virtual Machines (VMs)?',
          options: [
            {
              id: 'a',
              text: 'Containers share the host operating system kernel, making them lightweight, fast to start (sub-seconds), and vastly less memory-intensive than VMs with full guest operating systems.',
              isCorrect: true,
              explanation:
                'Correct. Containers virtualize the operating system, whereas VMs virtualize physical hardware.',
            },
            {
              id: 'b',
              text: 'Containers do not require any operating system or CPU to run.',
              isCorrect: false,
              explanation:
                'Incorrect. Containers still require a host OS and CPU to execute.',
            },
            {
              id: 'c',
              text: 'Containers can only run Python applications and cannot run Node.js.',
              isCorrect: false,
              explanation:
                'Incorrect. Containers can run any programming language and runtime.',
            },
            {
              id: 'd',
              text: 'Containers automatically rewrite your source code into ABAP.',
              isCorrect: false,
              explanation:
                'Incorrect. Containers do not alter application source code.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-0-6',
      code: '0.6',
      phaseId: 'phase-0',
      title: 'Auth Concepts',
      tagline: 'Authentication, Authorization, OAuth 2.0, and JWT Tokens',
      summary:
        'Master modern cloud security protocols. Understand the difference between Authentication and Authorization, how OAuth 2.0 flows grant delegated access, and how JSON Web Tokens (JWT) secure microservices on SAP BTP.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Authentication (AuthN: Who are you?) vs Authorization (AuthZ: What are you allowed to do?).',
        'Corporate Identity Providers (IdP): SAML 2.0, OpenID Connect (OIDC), SAP Cloud Identity Services (IAS), and Microsoft Entra ID.',
        'OAuth 2.0 Framework actors: Resource Owner (user), Client (Fiori UI), Authorization Server (XSUAA/IAS), Resource Server (CAP backend).',
        'OAuth 2.0 Grant Types: Authorization Code Flow with PKCE (for user-facing apps) and Client Credentials Grant (for machine-to-machine integration).',
        'JSON Web Token (JWT) structure: Header (algorithm & key ID), Payload (claims: sub, iss, aud, exp, scope), and Signature.',
        'Cryptographic validation: Asymmetric encryption (RS256 with public/private keys), JWKS endpoints, and tampering detection.',
        'Scopes, Roles, and Role Collections: How SAP BTP maps technical scopes to business role collections.',
        'State protection: Mutual TLS (mTLS), Bearer tokens, and X-CSRF-Token handshakes.',
      ],
      practicalImplementation:
        'Inspect and decode an authentic SAP BTP XSUAA JWT token. Verify signature validation using public keys from the JWKS endpoint, inspect scope claims, and write a middleware check that enforces scope permissions.',
      masteryCheck:
        'Decode an encoded JWT string, identify expired timestamp claims, verify the audience (aud) matches the target service, and explain why microservices must never trust unverified client-provided tokens.',
      learningObjectives: [
        'Distinguish clearly between Authentication (AuthN) and Authorization (AuthZ).',
        'Explain the roles and flow of the OAuth 2.0 Authorization Code Grant.',
        'Deconstruct a JSON Web Token (JWT) into Header, Payload, and Signature.',
        'Verify how asymmetric RS256 cryptography enables microservices to validate tokens without central database queries.',
        'Explain how SAP BTP XSUAA issues and verifies scopes in CAP applications.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Authentication vs Authorization: The Foundational Divide',
          subtitle: 'The two distinct pillars of digital security',
          explanation:
            'Security begins with separating two distinct concepts: 1) Authentication (AuthN): Verifying identity. It answers the question: "Who are you?" When you enter your corporate email and password, touch your fingerprint, or approve a mobile push notification, the Identity Provider (IdP) authenticates your identity. 2) Authorization (AuthZ): Verifying permissions. It answers the question: "What are you allowed to do?" Even if an employee is authenticated as a valid company staff member, they are not authorized to view everyone\'s salary or approve a €1,000,000 procurement invoice unless they possess the specific role.',
          keyIdea:
            'Authentication proves identity; Authorization grants specific operational permissions.',
          taskInstruction:
            'Review the airport passport and boarding pass analogy below to internalize this distinction.',
          hint: 'A valid passport proves who you are; a boarding pass determines which plane and seat you may enter.',
        },
        {
          stepNumber: 2,
          title: 'The OAuth 2.0 Authorization Framework',
          subtitle: 'Delegated security without sharing user passwords',
          explanation:
            'In the early web, if an external application needed data from your account, it asked for your master username and password. This was a severe security vulnerability. OAuth 2.0 solved this by establishing a delegated authorization framework involving four distinct actors: 1) Resource Owner: The user (e.g., an employee). 2) Client: The application requesting access (e.g., a Fiori web app). 3) Authorization Server: The security gateway that authenticates the user and issues tokens (e.g., SAP BTP XSUAA or Cloud Identity Services). 4) Resource Server: The backend API hosting the protected business data (e.g., a CAP microservice on SAP HANA). The client never sees the user\'s password; it receives a scoped, short-lived Access Token.',
          keyIdea:
            'OAuth 2.0 grants applications limited, temporary access tokens without ever exposing user credentials to third-party code.',
          taskInstruction:
            'Trace the OAuth 2.0 Authorization Code flow in the architectural diagram.',
          hint: 'Notice that tokens have strict expiration times (e.g., 15 to 60 minutes).',
        },
        {
          stepNumber: 3,
          title: 'Deconstructing the JSON Web Token (JWT)',
          subtitle: 'Anatomy of a modern cryptographically signed token',
          explanation:
            'On SAP BTP, access tokens are formatted as JSON Web Tokens (JWT, pronounced "jot"). A JWT is a compact, URL-safe string consisting of three parts separated by periods (`header.payload.signature`): 1) Header: Contains metadata specifying the cryptographic algorithm (e.g., `RS256`) and the key ID (`kid`). 2) Payload: A base64-encoded JSON object containing standard claims: `sub` (subject/user ID), `iss` (issuer URL), `aud` (audience/target service), `exp` (expiration Unix timestamp), and `scope` (array of granted permissions, such as `LeaveApp.Approve`). 3) Signature: A cryptographic hash created by the Authorization Server using its private RSA key.',
          keyIdea:
            'A JWT is self-contained: it carries user identity, expiration, and permissions directly inside the token.',
          taskInstruction:
            'Inspect the raw JWT token breakdown in the technical example below.',
          warning: 'A JWT is encoded, not encrypted! Anyone who intercepts the token can read the payload; never put credit card numbers or passwords in a JWT.',
        },
        {
          stepNumber: 4,
          title: 'Asymmetric Cryptography: How Microservices Verify Tokens',
          subtitle: 'Zero database latency security validation',
          explanation:
            'If 1,000 microservices received 50,000 requests per second, and each service had to query a central database to check if a token was valid, the database would crash. Asymmetric cryptography (Public-Private Key Pairs) solves this elegantly: 1) The Authorization Server (XSUAA) holds a confidential Private Key that it uses to sign JWTs. 2) The Authorization Server publishes its Public Key at a public URL called the JWKS (`/.well-known/jwks.json`). 3) Any backend CAP microservice downloads the public key once, caches it, and mathematically verifies the cryptographic signature of incoming JWT tokens locally in sub-milliseconds without making any database queries.',
          keyIdea:
            'If an attacker tampers with a single character in the payload (e.g., changing their role from Employee to Admin), the cryptographic signature fails mathematical verification immediately.',
          taskInstruction:
            'Observe how the CAP backend middleware verifies JWT signatures in the code example.',
          hint: 'The private key signs; the public key verifies.',
        },
        {
          stepNumber: 5,
          title: 'SAP BTP Security Model: Scopes, Roles, and Role Collections',
          subtitle: 'Bridging technical code permissions to business administrators',
          explanation:
            'In SAP BTP, security is structured into three ascending layers: 1) Scopes (Technical Code Level): Defined by developers in `xs-security.json` or `cds` annotations (e.g., `Employee.Read`, `Payroll.Approve`). 2) Role Templates and Roles: Groups of technical scopes packaged into functional roles (e.g., `HR_Manager_Role`). 3) Role Collections (Business Admin Level): The composite bundles assigned to actual human users or user groups in the SAP BTP Cockpit. This decouples code from administration: developers define technical scopes in code, while HR administrators assign Role Collections to employees in the BTP Cockpit without touching source code.',
          keyIdea:
            'Developers write technical scopes in code; administrators assign business Role Collections in the BTP Cockpit.',
          taskInstruction:
            'Complete the final knowledge check to verify your understanding of enterprise authentication and authorization.',
          hint: 'CAP handles scope checking automatically when you annotate services with `@(requires: \'admin\')`.',
        },
      ],
      diagramType: 'xsuaa-oauth',
      analogy: {
        concept: 'Authentication vs Authorization and JWT Tokens',
        analogy: 'Airport Passport Control and Boarding Passes',
        explanation:
          'When you enter an international airport, you first approach the Government Immigration Booth (Authentication / IdP). You present your biometric passport: the officer inspects your face and stamps your passport. Your identity is authenticated: you are Alice Smith, citizen #10492. Next, you proceed to the Departure Gate (Authorization / Scopes). The gate agent does not care what your passport looks like; they inspect your Boarding Pass (JWT token). The boarding pass lists your specific permissions: Flight #LH404 (aud claim), Seat 12A (sub claim), and Priority Boarding (scope claim). If you try to board Flight #UA900 or sit in the Cockpit, the gate agent denies entry. The printed barcode is a cryptographic signature: if you use a pen to alter "Seat 38B" to "First Class 1A", the barcode scanner rejects it immediately.',
        transition:
          'Where the airport validates passports and boarding passes, SAP BTP validates identity with corporate IdPs and permissions with cryptographically signed JWT tokens.',
      },
      conceptExplanation: {
        whatItIs:
          'Authentication (AuthN) and Authorization (AuthZ) are the foundational security controls of enterprise computing, governing how identities are verified (via SAML 2.0/OIDC IdPs) and how operational access is granted and verified (via OAuth 2.0 access tokens and JSON Web Tokens).',
        whyItExists:
          'Enterprise software manages confidential corporate assets—intellectual property, employee payroll records, customer financial information, and regulated health data. Unauthorized access leads to corporate espionage, data theft, and catastrophic regulatory fines (GDPR, HIPAA, SOX).',
        problemSolved:
          'Eliminates password sharing between applications, enables single sign-on (SSO) across enterprise clouds, and allows microservices to verify permissions independently with zero database overhead.',
        howItWorks:
          'A user logs into an identity provider (e.g., Microsoft Entra ID or SAP IAS). The client receives an OAuth 2.0 authorization code and exchanges it with SAP BTP XSUAA for a signed JWT access token. The client passes this token in the `Authorization: Bearer <token>` header to the backend CAP service, which cryptographically verifies the signature and checks user scopes before executing business logic.',
        btpFit:
          'SAP BTP uses the SAP Cloud Identity Services (IAS) and the SAP Authorization and Trust Management Service (XSUAA) to secure all web apps, APIs, destinations, and integrations.',
      },
      jargonTerms: [
        {
          term: 'AuthN vs AuthZ',
          simpleMeaning: 'AuthN = Authentication (Who you are); AuthZ = Authorization (What you are allowed to do).',
          familiarEquivalent: 'Your photo driver license (AuthN) vs the specific vehicle weight classes you are licensed to drive (AuthZ).',
        },
        {
          term: 'JWT (JSON Web Token)',
          simpleMeaning: 'A cryptographically signed, compact JSON object that carries user identity and granted scopes.',
          familiarEquivalent: 'A tamper-evident sealed security badge with printed permissions and an anti-counterfeit holographic seal.',
        },
        {
          term: 'XSUAA',
          simpleMeaning: 'SAP Authorization and Trust Management Service on BTP that issues and validates OAuth 2.0 tokens.',
          familiarEquivalent: 'The corporate security badge office that issues employee keycards.',
        },
        {
          term: 'Scope',
          simpleMeaning: 'A granular technical permission string defined in code (e.g., PurchaseOrder.Approve).',
          familiarEquivalent: 'A specific physical key that opens only the server room door.',
        },
        {
          term: 'Bearer Token',
          simpleMeaning: 'A security token where possession alone grants access: whoever "bears" the token is granted the permission.',
          familiarEquivalent: 'A physical cash ticket to a concert: whoever holds the ticket enters the venue.',
        },
      ],
      technicalExample: {
        title: 'Decoded SAP BTP XSUAA JWT Token and Scope Validation Middleware',
        language: 'javascript',
        code: `// 1. DECODED SAP BTP XSUAA JWT TOKEN (PAYLOAD SECTION)
{
  "jti": "8b23c941-8652-4412-9c12-ef2891234567",
  "sub": "alice.smith@enterprise.com",
  "user_name": "alice.smith",
  "given_name": "Alice",
  "family_name": "Smith",
  "email": "alice.smith@enterprise.com",
  "iss": "https://my-subaccount.authentication.eu10.hana.ondemand.com/oauth/token",
  "aud": ["uaa", "my-cap-app!t1042"],
  "exp": 1795536000,
  "iat": 1795532400,
  "scope": [
    "my-cap-app!t1042.LeaveRequest.Submit",
    "my-cap-app!t1042.LeaveRequest.Approve"
  ],
  "ext_attr": {
    "enhancer": "XSUAA",
    "subaccountid": "6a901234-bcde-4567-8901-234567890abc"
  }
}

// 2. BACKEND SCOPE ENFORCEMENT IN NODE.JS / SAP CAP
export function checkScope(requiredScope) {
  return (req, res, next) => {
    // CAP automatically populates req.user from verified XSUAA JWT
    if (!req.user || !req.user.is(requiredScope)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: \`User '\${req.user ? req.user.id : 'Anonymous'}' lacks required scope '\${requiredScope}'\`
      });
    }
    next();
  };
}`,
        purpose:
          'Illustrates a production SAP BTP XSUAA JWT payload with issuer, audience, and scope claims, alongside a Node.js middleware function enforcing scope access control.',
        lineExplanations: [
          { lines: '4', explanation: 'sub (Subject): Primary unique user identifier (email or corporate user ID).' },
          { lines: '9', explanation: 'iss (Issuer): Identity provider service endpoint that cryptographically signed the token.' },
          { lines: '10', explanation: 'aud (Audience): Target application IDs permitted to accept this token.' },
          { lines: '11', explanation: 'exp: Expiration Unix timestamp. If current time > exp, request is rejected with 401.' },
          { lines: '13-16', explanation: 'scope: Technical permissions assigned to this user in this application context.' },
          { lines: '26', explanation: 'req.user.is(requiredScope): CAP method that verifies if user holds the required scope.' },
        ],
        expectedOutput:
          'Authorized users proceed to business logic; unauthorized users receive immediate HTTP 403 Forbidden with zero data exposure.',
        commonMistakes: [
          'Confusing 401 Unauthorized (invalid/expired token) with 403 Forbidden (valid token, but missing required scope).',
          'Relying on client-side role checks without enforcing scope authorization on the backend API.',
          'Not validating the "aud" (audience) claim, allowing tokens issued for App A to be maliciously reused in App B.',
        ],
      },
      businessScenario: {
        title: 'Executive Bonus Approval Authorization Workflow',
        context:
          'An HR compensation portal on SAP BTP handles annual performance bonus approvals ranging from €5,000 to €250,000.',
        workflowSteps: [
          'Department Manager logs in via Microsoft Entra ID (Single Sign-On).',
          'SAP Cloud Identity Services exchanges corporate login for an XSUAA access token carrying scope `Bonus.Submit`.',
          'Manager attempts to click "Execute Wire Transfer" (which requires scope `Bonus.ApproveExecutive`).',
          'Backend CAP service inspects JWT scopes, detects absence of `Bonus.ApproveExecutive`, and returns HTTP 403 Forbidden.',
          'Security event is logged in SAP Cloud Logging; manager is prompted to submit for VP approval instead.',
        ],
        businessImpact:
          'Prevents internal fraud, enforces segregation of duties (SoD), and provides tamper-proof audit trails for SOX compliance.',
      },
      practicalActivity:
        'Launch Practice Drill "Authentication vs Authorization" (/practice?tab=drills&id=sec-authn-authz) and "Securing Routes with JWT" (/practice?tab=drills&id=sec-jwt-xsuaa) to test your security skills.',
      keyTakeaways: [
        'Authentication verifies WHO you are; Authorization governs WHAT you can do.',
        'OAuth 2.0 provides delegated authorization tokens without ever exposing user passwords.',
        'JWT tokens are compact, self-contained, and cryptographically signed (Header, Payload, Signature).',
        'Asymmetric cryptography (RS256) allows microservices to verify tokens locally with zero database bottlenecks.',
      ],
      quizQuestions: [
        {
          id: 'mod-0-6-q1',
          question:
            'A corporate employee successfully logs into the SAP BTP Launchpad using their company email and password, but when they click on the "Payroll Administration" tile, the system displays an error: "Access Denied (HTTP 403)". What does this indicate?',
          options: [
            {
              id: 'a',
              text: 'The employee is successfully Authenticated (their identity is confirmed), but not Authorized (they lack the required Payroll Administrator role/scope).',
              isCorrect: true,
              explanation:
                'Correct. Authentication succeeded (hence login worked), but Authorization failed (HTTP 403 Forbidden due to missing scope).',
            },
            {
              id: 'b',
              text: 'The employee typed their password incorrectly.',
              isCorrect: false,
              explanation:
                'Incorrect. An incorrect password prevents authentication, returning HTTP 401.',
            },
            {
              id: 'c',
              text: 'The SAP HANA database server is powered off.',
              isCorrect: false,
              explanation:
                'Incorrect. An offline database would cause an HTTP 500 or 503 error.',
            },
            {
              id: 'd',
              text: 'The user web browser does not support HTML5.',
              isCorrect: false,
              explanation:
                'Incorrect. Browser HTML rendering is completely unrelated to HTTP 403 authorization denial.',
            },
          ],
        },
        {
          id: 'mod-0-6-q2',
          question:
            'What prevents a malicious user from intercepting a valid JWT token, altering the payload to add the "Admin" scope, and sending it to a backend service?',
          options: [
            {
              id: 'a',
              text: 'The cryptographic Signature: altering any character in the Header or Payload invalidates the signature, causing the backend server to reject the token during mathematical verification.',
              isCorrect: true,
              explanation:
                'Correct. The signature is computed using the Authorization Server\'s private key. Without the private key, an attacker cannot forge a valid signature for an altered payload.',
            },
            {
              id: 'b',
              text: 'JWT tokens cannot be intercepted because they are physically embedded inside the user computer hardware.',
              isCorrect: false,
              explanation:
                'Incorrect. JWTs are transmitted over HTTP headers and can be observed in network logs.',
            },
            {
              id: 'c',
              text: 'The backend database queries the user directly via SMS to ask if they edited the token.',
              isCorrect: false,
              explanation:
                'Incorrect. Verification is cryptographic and automated without manual confirmation.',
            },
            {
              id: 'd',
              text: 'JSON files cannot be edited once saved.',
              isCorrect: false,
              explanation:
                'Incorrect. JSON is plain text and easily edited; it is the cryptographic signature that detects tampering.',
            },
          ],
        },
        {
          id: 'mod-0-6-q3',
          question:
            'Why does the backend CAP microservice use the public key from the Authorization Server\'s JWKS endpoint rather than storing the private key?',
          options: [
            {
              id: 'a',
              text: 'Because the Private Key must remain strictly confidential to the Authorization Server that signs tokens; microservices only need the Public Key to verify that the signature was created by that private key.',
              isCorrect: true,
              explanation:
                'Correct. In asymmetric cryptography (RS256), the private key signs, while the public key verifies. Storing the private key in distributed microservices would severely compromise enterprise security.',
            },
            {
              id: 'b',
              text: 'Because public keys are 100 times faster to download than private keys.',
              isCorrect: false,
              explanation:
                'Incorrect. Key size and download speed are not the architectural reason.',
            },
            {
              id: 'c',
              text: 'Because private keys are only compatible with Windows operating systems.',
              isCorrect: false,
              explanation:
                'Incorrect. Cryptographic keys are mathematically operating-system agnostic.',
            },
            {
              id: 'd',
              text: 'Because SAP BTP does not allow applications to use cryptography.',
              isCorrect: false,
              explanation:
                'Incorrect. SAP BTP enforces high-grade cryptography across all services.',
            },
          ],
        },
      ],
    },
  ],
};
