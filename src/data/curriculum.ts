import { CurriculumModule } from '../types/curriculum';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'module-0',
    number: 0,
    title: 'Enterprise and SAP 101',
    tagline: 'Demystify Enterprise Cloud & BTP Architecture',
    description:
      'Learn what SAP actually does, why Fortune 500 companies run on it, and how SAP BTP serves as the modern cloud foundation replacing legacy NetWeaver architectures.',
    iconName: 'Building2',
    level: 'Beginner',
    estimatedHours: 3.5,
    prerequisites: ['Basic understanding of web technologies (HTTP, JSON, APIs)'],
    learningObjectives: [
      'Understand the role of Enterprise Resource Planning (ERP) in global business.',
      'Navigate SAP BTP account hierarchies: Global Accounts, Directories, Subaccounts, and Spaces.',
      'Compare Cloud Foundry and Kyma (Kubernetes) runtime environments.',
      'Differentiate between standard cloud providers (AWS, Azure, GCP) and SAP PaaS services.',
    ],
    chapters: [
      {
        id: 'ch-0-1',
        moduleId: 'module-0',
        order: 1,
        number: '0.1',
        title: 'The ERP Revolution & Enterprise Reality',
        subtitle: 'Why SAP powers 87% of total global commerce',
        estimatedMinutes: 25,
        summary:
          'Explore how modern global businesses operate. Discover what ERP means in practice, why companies cannot run on disconnected spreadsheets, and how SAP evolved from on-premise R/3 to S/4HANA and BTP.',
        analogy: {
          concept: 'ERP vs Disconnected Apps',
          analogy: 'A Grand Orchestra vs Solo Musicians',
          explanation:
            'If Sales, Warehouse, Finance, and HR each play their own sheet music at their own tempo, the concert fails. ERP is the conductor coordinating everyone to a single real-time rhythm.',
        },
        keyTakeaways: [
          'ERP unifies finance, supply chain, procurement, and HR into one single source of truth.',
          'Legacy on-premise customizations ("clean core violation") created technical debt.',
          'BTP enables side-by-side extensibility: keep the core ERP clean while innovating in the cloud.',
        ],
        practicalActivity: 'Analyze a real-world purchase order flow across 4 enterprise departments.',
      },
      {
        id: 'ch-0-2',
        moduleId: 'module-0',
        order: 2,
        number: '0.2',
        title: 'Anatomy of SAP BTP: Accounts, Orgs & Spaces',
        subtitle: 'Mapping enterprise organization to cloud tenancy',
        estimatedMinutes: 30,
        summary:
          'Learn the structural hierarchy of SAP BTP: Global Accounts, Subaccounts, Entitlements, Service Plans, and Cloud Foundry Orgs/Spaces.',
        analogy: {
          concept: 'BTP Account Hierarchy',
          analogy: 'Corporate Headquarters and Regional Branches',
          explanation:
            'A Global Account is the company headquarters holding the master contract. Subaccounts are regional office branches (e.g., US-East, Europe-Central) with their own budget, quota, and staff.',
        },
        keyTakeaways: [
          'Global Accounts hold billing and global license agreements.',
          'Subaccounts are isolated environments bound to a specific cloud region (AWS, Azure, GCP).',
          'Entitlements assign specific quotas of services (e.g., HANA memory, CAP instances) to Subaccounts.',
        ],
        practicalActivity: 'Design an account structure for a multinational retail company with Dev, QA, and Prod tiers.',
      },
      {
        id: 'ch-0-3',
        moduleId: 'module-0',
        order: 3,
        number: '0.3',
        title: 'The Multi-Cloud Runtime: Cloud Foundry vs Kyma',
        subtitle: 'Choosing between PaaS buildpacks and cloud-native Kubernetes',
        estimatedMinutes: 30,
        summary:
          'Examine the two primary application runtimes in SAP BTP: Cloud Foundry (standard PaaS) and Kyma (open-source Kubernetes-based runtime for microservices).',
        analogy: {
          concept: 'Cloud Foundry vs Kyma',
          analogy: 'Turnkey Apartment vs Custom Architectural Villa',
          explanation:
            'Cloud Foundry gives you a furnished apartment: push your code and it runs without worrying about plumbing. Kyma gives you custom architecture: full control over Kubernetes containers, ingresses, and service meshes.',
        },
        keyTakeaways: [
          'Cloud Foundry is ideal for standard full-stack web apps, microservices, and rapid CAP deployments.',
          'Kyma provides managed Kubernetes with Istio, Serverless functions, and event-driven triggers.',
          'Both runtimes share access to SAP BTP services through the Service Marketplace.',
        ],
        practicalActivity: 'Evaluate which runtime to select for 3 realistic enterprise scenarios.',
      },
    ],
  },
  {
    id: 'module-1',
    number: 1,
    title: 'SAP CAP Development',
    tagline: 'Modern Full-Stack Cloud Application Programming',
    description:
      'Master the SAP Cloud Application Programming Model (CAP) using Core Data Services (CDS), Node.js, and OData v4 to build enterprise-grade, domain-driven services.',
    iconName: 'Code2',
    level: 'Beginner',
    estimatedHours: 5.0,
    prerequisites: ['Module 0', 'Basic JavaScript / TypeScript and SQL knowledge'],
    learningObjectives: [
      'Model relational domain entities using declarative Core Data Services (CDS).',
      'Expose auto-generated RESTful OData v4 services with projections.',
      'Implement custom event handlers in Node.js (before, on, after lifecycle).',
      'Validate data and manage database transactions with SQLite and SAP HANA Cloud.',
    ],
    chapters: [
      {
        id: 'ch-1-1',
        moduleId: 'module-1',
        order: 1,
        number: '1.1',
        title: 'Core Data Services (CDS) Modeling',
        subtitle: 'The universal declarative language of SAP',
        estimatedMinutes: 35,
        summary:
          'Learn to define domain models with CDS syntax: entities, aspects, associations, compositions, and custom types that compile to database tables and service definitions.',
        analogy: {
          concept: 'CDS Modeling',
          analogy: 'Architectural Blueprints for a Skyscraper',
          explanation:
            'Instead of writing raw SQL DDL, API routes, and documentation separately, CDS is the master blueprint that automatically generates tables, OData schemas, and access controls simultaneously.',
        },
        keyTakeaways: [
          'CDS separates domain models (`db/schema.cds`) from exposed services (`srv/service.cds`).',
          'Compositions represent parent-child document relationships (e.g., Order with Line Items).',
          'Associations represent loose relational links (e.g., Order referencing a Customer).',
        ],
        practicalActivity: 'Write a CDS domain model for an incident management ticketing system.',
      },
      {
        id: 'ch-1-2',
        moduleId: 'module-1',
        order: 2,
        number: '1.2',
        title: 'Service Handlers in Node.js',
        subtitle: 'Adding business logic via the CAP event lifecycle',
        estimatedMinutes: 40,
        summary:
          'Write custom business logic using CAP Node.js handlers (`srv.before`, `srv.on`, `srv.after`). Handle validation, calculate discounts, and trigger business events.',
        analogy: {
          concept: 'CAP Event Lifecycle',
          analogy: 'Airport Security Checkpoints',
          explanation:
            'Before boarding (before: validate passport/ticket), the actual flight (on: database read/write), and baggage claim arrival (after: format output or send confirmation SMS).',
        },
        keyTakeaways: [
          'CAP provides default CRUD handlers automatically; you only code custom exceptions.',
          '`before` handlers are ideal for input validation, sanitization, and authorization checks.',
          '`after` handlers are ideal for enriching response data and auditing.',
        ],
        practicalActivity: 'Implement a discount calculation handler that caps discounts at 20%.',
      },
      {
        id: 'ch-1-3',
        moduleId: 'module-1',
        order: 3,
        number: '1.3',
        title: 'Consuming and Exposing OData v4 APIs',
        subtitle: 'Enterprise-grade querying with filtering and sorting built-in',
        estimatedMinutes: 35,
        summary:
          'Master OData v4 principles: querying with `$select`, `$filter`, `$expand`, `$orderby`, and `$top`. Understand why enterprise frontends demand OData over simple REST.',
        analogy: {
          concept: 'OData v4 Querying',
          analogy: 'Customizing a Restaurant Order',
          explanation:
            'Instead of receiving a fixed menu combo (rigid REST endpoint), OData lets the client ask for exactly the ingredients they want, in the exact portion size, with sides attached in one order.',
        },
        keyTakeaways: [
          'OData standardizes query parameters across all enterprise services.',
          '`$expand` solves the N+1 query problem by pulling related entities in a single HTTP request.',
          'OData metadata (`$metadata`) enables frontend frameworks like Fiori to generate UI automatically.',
        ],
        practicalActivity: 'Construct complex OData query URLs to fetch top-selling products with category data.',
      },
    ],
  },
  {
    id: 'module-2',
    number: 2,
    title: 'SAP Fiori and UI5',
    tagline: 'Modern Enterprise Frontends & User Experience',
    description:
      'Learn how SAP creates consistent, responsive enterprise user interfaces with the SAP Horizon design system, Fiori Elements, and SAPUI5.',
    iconName: 'Layout',
    level: 'Intermediate',
    estimatedHours: 4.0,
    prerequisites: ['Module 1', 'Basic CSS and component concepts'],
    learningObjectives: [
      'Understand SAP Fiori design guidelines and the Horizon visual theme.',
      'Differentiate between Fiori Elements (metadata-driven) and Freestyle UI5.',
      'Configure UI annotations in CDS to automatically generate List Reports and Object Pages.',
      'Leverage SAP UI5 Web Components in modern React or Vue applications.',
    ],
    chapters: [
      {
        id: 'ch-2-1',
        moduleId: 'module-2',
        order: 1,
        number: '2.1',
        title: 'The SAP Horizon Design Philosophy',
        subtitle: 'Enterprise UX designed for delight and high accessibility',
        estimatedMinutes: 25,
        summary:
          'Understand the core principles of SAP Horizon: role-based, adaptive, simple, coherent, and delightful. Learn about WCAG 2.2 accessibility and color palettes.',
        analogy: {
          concept: 'Fiori Design Guidelines',
          analogy: 'A Standardized Airplane Cockpit',
          explanation:
            'Pilots can step into any aircraft and immediately find the altimeter and throttles. Fiori ensures enterprise users can use any business app without needing re-training for every tool.',
        },
        keyTakeaways: [
          'Morning Horizon (light) and Evening Horizon (dark) offer high-contrast accessibility.',
          'UI consistency reduces user error and cognitive load in mission-critical workflows.',
        ],
        practicalActivity: 'Audit an enterprise UI screen against the 5 Fiori design principles.',
      },
      {
        id: 'ch-2-2',
        moduleId: 'module-2',
        order: 2,
        number: '2.2',
        title: 'Building Fiori Elements with OData Annotations',
        subtitle: 'Zero-code frontend generation driven entirely by backend metadata',
        estimatedMinutes: 35,
        summary:
          'See how CDS UI annotations (`@UI.LineItem`, `@UI.SelectionField`, `@UI.HeaderInfo`) automatically generate interactive List Reports and Object Pages without writing HTML or CSS.',
        analogy: {
          concept: 'Fiori Elements Annotations',
          analogy: 'A Smart Form Builder',
          explanation:
            'You label your data fields ("this is a title", "this is a price", "allow filtering by date"), and the builder constructs the complete interactive table, search bar, and edit modal.',
        },
        keyTakeaways: [
          'Fiori Elements accelerates development by 70% for standard enterprise transactional apps.',
          'All business logic and UI layout rules stay synchronized in the CDS service model.',
        ],
        practicalActivity: 'Add `@UI.LineItem` annotations to display price, status, and creation date in a table.',
      },
      {
        id: 'ch-2-3',
        moduleId: 'module-2',
        order: 3,
        number: '2.3',
        title: 'Custom Freestyle SAPUI5 Components',
        subtitle: 'When standard templates do not meet unique UX requirements',
        estimatedMinutes: 30,
        summary:
          'Explore Freestyle SAPUI5 development: MVC architecture, two-way data binding, XML views, controllers, and integrating UI5 Web Components into React apps.',
        analogy: {
          concept: 'Freestyle UI5 vs Elements',
          analogy: 'Custom Sculpting vs Prefabricated Modules',
          explanation:
            'Prefabricated modules (Elements) assemble in minutes for standard buildings; custom sculpting (Freestyle) allows arbitrary artistic freedom when building an avant-garde museum.',
        },
        keyTakeaways: [
          'Use Freestyle UI5 for complex dashboards, interactive wizards, and unique shop floors.',
          'SAP UI5 Web Components allow standard React apps to adopt Fiori design natively.',
        ],
        practicalActivity: 'Construct a custom KPI dashboard card with interactive drill-down buttons.',
      },
    ],
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Security and Integration',
    tagline: 'Enterprise Identity, Destinations & Connectivity',
    description:
      'Learn how enterprise cloud applications authenticate users via XSUAA, securely connect to on-premise ERPs with Cloud Connector, and exchange asynchronous events.',
    iconName: 'ShieldCheck',
    level: 'Intermediate',
    estimatedHours: 4.5,
    prerequisites: ['Module 1', 'Understanding of OAuth 2.0 and JWTs'],
    learningObjectives: [
      'Configure enterprise security with SAP BTP XSUAA and Role Collections.',
      'Set up BTP Destinations to securely access external and on-premise APIs.',
      'Understand how SAP Cloud Connector creates a secure reverse tunnel into corporate firewalls.',
      'Implement event-driven architecture using SAP Event Mesh.',
    ],
    chapters: [
      {
        id: 'ch-3-1',
        moduleId: 'module-3',
        order: 1,
        number: '3.1',
        title: 'Authentication & Authorization with XSUAA',
        subtitle: 'Role-based access control (RBAC) in cloud environments',
        estimatedMinutes: 35,
        summary:
          'Understand how the SAP BTP Extended Services for UAA (XSUAA) secures applications using OAuth 2.0 and JWT tokens. Define scopes, roles, and role collections.',
        analogy: {
          concept: 'XSUAA Security',
          analogy: 'Hotel Keycards & RFID Badges',
          explanation:
            'The hotel reception (Identity Provider) validates your ID and encodes your room number and gym access onto an RFID keycard (JWT). Doors (microservices) read the card without calling reception each time.',
        },
        keyTakeaways: [
          'XSUAA separates identity verification from permission management.',
          'Scopes define fine-grained actions (e.g., `Book.Read`, `Book.Edit`).',
          'Role Collections group roles together and map to corporate Azure AD or SAP Cloud Identity users.',
        ],
        practicalActivity: 'Define an `xs-security.json` configuration for Manager and Employee access tiers.',
      },
      {
        id: 'ch-3-2',
        moduleId: 'module-3',
        order: 2,
        number: '3.2',
        title: 'BTP Destinations & SAP Cloud Connector',
        subtitle: 'Connecting cloud apps to on-premise systems without opening firewall ports',
        estimatedMinutes: 40,
        summary:
          'Explore how BTP Destination service stores connection details and credentials centrally, and how the Cloud Connector creates a secure TLS reverse tunnel into corporate on-premise networks.',
        analogy: {
          concept: 'Cloud Connector Reverse Tunnel',
          analogy: 'An Embassy Outgoing Secure Phone Line',
          explanation:
            'Instead of piercing holes in the fortress wall (inbound open ports), an internal agent calls out to headquarters over an encrypted line to listen for authorized messages.',
        },
        keyTakeaways: [
          'Destinations eliminate hardcoded URLs and secrets in source code.',
          'Cloud Connector establishes an outbound-only connection from on-premise into BTP.',
          'Virtual host mapping protects internal server hostnames and ports from exposure.',
        ],
        practicalActivity: 'Configure a virtual destination pointing to an on-premise S/4HANA OData service.',
      },
      {
        id: 'ch-3-3',
        moduleId: 'module-3',
        order: 3,
        number: '3.3',
        title: 'Asynchronous Messaging with SAP Event Mesh',
        subtitle: 'Decoupling enterprise applications with real-time events',
        estimatedMinutes: 30,
        summary:
          'Discover event-driven architecture with SAP Event Mesh. Understand topics, queues, publish-subscribe patterns, and CloudEvents standards in enterprise systems.',
        analogy: {
          concept: 'Event Mesh Pub/Sub',
          analogy: 'A News Subscription Service',
          explanation:
            'Instead of 100 subscribers calling the newspaper printing press every minute asking "Is the news ready?", the publisher drops papers into mailboxes the instant printing finishes.',
        },
        keyTakeaways: [
          'Pub/Sub architecture decouples high-volume publishers from slower backend consumers.',
          'SAP Event Mesh guarantees message delivery even during consumer system downtime.',
        ],
        practicalActivity: 'Trace an end-to-end event from S/4HANA Sales Order Created to a Cloud Webhook.',
      },
    ],
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Deployment and Debugging',
    tagline: 'MTA Packaging, Cloud Foundry CLI & Production Ops',
    description:
      'Package multi-target applications (MTA), deploy to SAP BTP Cloud Foundry, inspect runtime logs, and troubleshoot common cloud deployment issues.',
    iconName: 'Rocket',
    level: 'Advanced',
    estimatedHours: 4.0,
    prerequisites: ['Modules 0–3', 'Terminal/CLI familiarity'],
    learningObjectives: [
      'Structure and author `mta.yaml` deployment descriptors.',
      'Build MTAR archives using Cloud MTA Build Tool (MBT).',
      'Deploy applications with the Cloud Foundry CLI and inspect application health.',
      'Debug production crashes using `cf logs` and diagnose quota or memory exhaustion.',
    ],
    chapters: [
      {
        id: 'ch-4-1',
        moduleId: 'module-4',
        order: 1,
        number: '4.1',
        title: 'Multi-Target Applications (MTA) & mta.yaml',
        subtitle: 'The gold standard for packaging distributed enterprise solutions',
        estimatedMinutes: 35,
        summary:
          'Learn the anatomy of `mta.yaml`: modules (frontend, backend, db deployer), resources (HANA DB, XSUAA, Destination), and requires/provides dependencies.',
        analogy: {
          concept: 'MTA Architecture',
          analogy: 'A Flat-Pack Furniture Assembly Kit',
          explanation:
            'An MTA archive contains all the pieces (database tables, web server, auth service) and the instruction manual (`mta.yaml`) showing the deployment engine exact assembly order.',
        },
        keyTakeaways: [
          '`mta.yaml` orchestrates deployment order (database first, then backend, then router).',
          'Managed service keys and credentials are automatically injected into bound containers.',
        ],
        practicalActivity: 'Author an `mta.yaml` manifest linking a Node.js CAP service to SAP HANA Cloud.',
      },
      {
        id: 'ch-4-2',
        moduleId: 'module-4',
        order: 2,
        number: '4.2',
        title: 'Building and Deploying via Cloud Foundry CLI',
        subtitle: 'From local code to running enterprise cloud container',
        estimatedMinutes: 35,
        summary:
          'Master Cloud Foundry commands: `cf login`, `cf push`, `cf deploy`, `cf apps`, `cf services`. Understand buildpacks, droplet compilation, and container staging.',
        analogy: {
          concept: 'Cloud Foundry Buildpacks',
          analogy: 'An Automated Cargo Container Loading Dock',
          explanation:
            'You hand over raw cargo (source files). The buildpack identifies what it is (Node.js), installs the exact engine and dependencies, and seals it in a standard shipping container ready to launch.',
        },
        keyTakeaways: [
          '`cf deploy <archive.mtar>` handles transactional zero-downtime blue-green deployments.',
          'Environment variables and service bindings inject credentials at runtime.',
        ],
        practicalActivity: 'Execute a simulated `cf push` deployment and inspect container startup logs.',
      },
      {
        id: 'ch-4-3',
        moduleId: 'module-4',
        order: 3,
        number: '4.3',
        title: 'Production Troubleshooting & Logging',
        subtitle: 'Diagnosing crashes, quota limits, and 502 Bad Gateway errors',
        estimatedMinutes: 30,
        summary:
          'Analyze common enterprise cloud failures: out-of-memory (OOM) errors, quota exhaustion, unhandled promise rejections, destination connection timeouts, and SSL handshake errors.',
        analogy: {
          concept: 'Cloud Diagnostic Logging',
          analogy: 'An Aircraft Flight Data Recorder (Black Box)',
          explanation:
            'When an engine sputters at 30,000 feet, technicians do not guess: they read the black box timestamps and sensor readings to locate the exact fuel pump that tripped.',
        },
        keyTakeaways: [
          'Use `cf logs <app> --recent` to retrieve container crash diagnostics.',
          'Understand HTTP 502 / 503 errors caused by router timeouts vs application unresponsiveness.',
        ],
        practicalActivity: 'Troubleshoot a simulated 502 Bad Gateway crash report to identify the root cause.',
      },
    ],
  },
];

export function getModuleById(id: string): CurriculumModule | undefined {
  return CURRICULUM_MODULES.find((m) => m.id === id);
}

export function getAllChapters(): CurriculumModule['chapters'] {
  return CURRICULUM_MODULES.flatMap((m) => m.chapters);
}

export function getChapterById(id: string) {
  for (const module of CURRICULUM_MODULES) {
    const found = module.chapters.find((ch) => ch.id === id);
    if (found) return { chapter: found, module };
  }
  return undefined;
}
