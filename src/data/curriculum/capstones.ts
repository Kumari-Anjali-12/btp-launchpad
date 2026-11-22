import { PhaseCapstone } from '../../types/curriculum';

export const PHASE_CAPSTONES: PhaseCapstone[] = [
  {
    id: 'capstone-phase-0',
    phaseId: 'phase-0',
    title: 'Secured API Gateway',
    objective:
      'Build a TypeScript Express service that proxies the TripPin OData service, protected by JWT validation.',
    functionalRequirements: [
      'A protected /people route passing through $select, $filter, $top and $orderby to upstream OData.',
      'A public /health route returning uptime and system timestamp.',
      'Consistent JSON error responses adhering to RFC 7807 problem details.',
      'A Dockerfile, a README with run instructions, and at least 8 automated tests.',
    ],
    edgeCasesToHandle: [
      'Missing, malformed, expired and wrong-audience tokens (401 versus 403 used strictly).',
      'Upstream timeout and upstream 5xx handling.',
      'An unknown entity returning HTTP 404.',
      'Invalid query syntax returning HTTP 400.',
      'Oversized $top capped to prevent denial of service.',
      'Zero secrets committed to Git repository.',
    ],
    prerequisiteModules: ['mod-0-1', 'mod-0-2', 'mod-0-3', 'mod-0-4', 'mod-0-5', 'mod-0-6'],
    deliverables: [
      'TypeScript Express codebase with ESLint and Vitest suite.',
      'Dockerfile with multi-stage build.',
      'Automated test suite with minimum 8 passing unit/integration tests.',
      'Postman collection demonstrating 200, 401, 403, and 404 scenarios.',
    ],
    acceptanceCriteria: [
      'Proxy correctly passes through OData system query options without dropping headers.',
      'JWT verification rejects unauthorized callers before forwarding to upstream.',
      'Zero plaintext API keys or credentials exist in the source tree.',
    ],
  },
  {
    id: 'capstone-phase-1',
    phaseId: 'phase-1',
    title: 'Trial Landing Zone with a Deployed Secured App',
    objective:
      'Set up a structured SAP BTP environment and deploy your Phase 0 gateway service to Cloud Foundry runtime.',
    functionalRequirements: [
      'A documented naming convention for global accounts, directories, and subaccounts.',
      'Entitlements and service quotas configured across instances.',
      'Two distinct environments: dev and test spaces in Cloud Foundry.',
      'Two custom Role Collections configured in SAP BTP Cockpit.',
      'The gateway deployed with manifest.yml, route mapping, health check, and environment variables.',
      'A runbook documenting deployment and maintenance steps.',
    ],
    edgeCasesToHandle: [
      'Missing entitlement errors and quota exhaustion.',
      'Cloud Foundry staging crash from missing start scripts.',
      'Expired CLI session tokens during multi-step deployments.',
      'AppRouter routing failures due to mismatched destination names.',
    ],
    prerequisiteModules: ['mod-1-1', 'mod-1-2', 'mod-1-3', 'mod-1-4', 'mod-1-5'],
    deliverables: [
      'Active SAP BTP trial subaccount with Cloud Foundry runtime enabled.',
      'manifest.yml deployment configuration file.',
      'Exported Role Collections and Trust configuration summary.',
      'Step-by-step operator runbook with CLI commands.',
    ],
    acceptanceCriteria: [
      'Cloud Foundry application status reports running with healthy route checks.',
      'Custom role collection is successfully mapped and restricts access.',
    ],
  },
  {
    id: 'capstone-phase-2',
    phaseId: 'phase-2',
    title: 'Reproducible CAP Dev Environment',
    objective:
      'Produce a scaffolded SAP Cloud Application Programming Model (CAP) project that any developer can start, debug, and package from your written guide.',
    functionalRequirements: [
      'A scaffolded CAP project with at least one entity, one service, and sample CSV data.',
      'A reproducible onboarding guide covering both SAP Business Application Studio (BAS) and local VS Code.',
      'A working launch configuration demonstrating at least one debug breakpoint.',
      'A compiled MTAR archive generated using Cloud MTA Build Tool (mbt).',
      'A strict .gitignore ensuring no generated artifacts or secrets reach Git.',
    ],
    edgeCasesToHandle: [
      'Mismatched Node.js versions causing installation failures.',
      'Missing make utility on Windows environments during mbt build.',
      'Port collisions (default port 4004 already allocated).',
      'Stopped or deleted dev space state in SAP BAS.',
    ],
    prerequisiteModules: ['mod-2-1', 'mod-2-2'],
    deliverables: [
      'Scaffolded CAP repository with package.json, srv/, db/, and app/ folders.',
      '.vscode/launch.json and tasks.json configurations.',
      'Verified Developer Setup Guide (DEVELOPER_SETUP.md).',
      'Successfully compiled .mtar artifact in mta_archives/.',
    ],
    acceptanceCriteria: [
      'cds watch starts cleanly and serves OData metadata without errors.',
      'Debugger halts execution on custom handler breakpoint.',
    ],
  },
  {
    id: 'capstone-phase-3',
    phaseId: 'phase-3',
    title: 'Order and Supplier Management Service',
    objective:
      'Build a complete CAP back end with OData v4 services, custom business logic, automated test suites, and SAP HANA Cloud persistence.',
    functionalRequirements: [
      '5-entity domain model (Orders, OrderItems, Products, Suppliers, Customers) with managed aspects.',
      'At least 2 bound actions, 1 unbound function, and 3 custom business validation rules.',
      'CSV seed data, SQLite profile for rapid local development, and HANA Cloud profile for cloud persistence.',
      'At least 20 automated tests with a code coverage report.',
      'An API reference listing all endpoints, payloads, and sample responses.',
    ],
    edgeCasesToHandle: [
      'Invalid enum values, missing mandatory fields, and foreign key reference errors.',
      'Cascading delete integrity on parent orders with child line items.',
      'Two concurrent requests updating stock levels (race conditions).',
      'HANA connection pool timeouts and reconnection handling.',
    ],
    prerequisiteModules: ['mod-3-1', 'mod-3-2', 'mod-3-3', 'mod-3-4'],
    deliverables: [
      'CDS schema definitions (db/schema.cds) and service projections (srv/order-service.cds).',
      'CAP event handler implementation in Node.js (srv/order-service.js).',
      'Comprehensive Vitest test suite with 20+ tests.',
      'Database migration and seed scripts.',
    ],
    acceptanceCriteria: [
      'All CRUD operations and custom actions execute with correct status codes.',
      'Business validations reject invalid orders before persisting to SAP HANA.',
    ],
  },
  {
    id: 'capstone-phase-4',
    phaseId: 'phase-4',
    title: 'Orders App with Fiori UI and Launchpad Entry',
    objective:
      'Build the user interface for your Phase 3 CAP service and expose it as a SAP Fiori launchpad application.',
    functionalRequirements: [
      'A Fiori Elements List Report and Object Page driven by CDS annotations (@UI).',
      'At least one custom action and one controller extension.',
      'One freestyle SAPUI5 screen with its own XML view and routing.',
      'App Router configuration and Launchpad registration via crossNavigation intent.',
      'Internationalization (i18n) properties files supporting at least 2 languages.',
    ],
    edgeCasesToHandle: [
      'Empty lists and zero search results handling.',
      'Extremely long text truncating gracefully without layout distortion.',
      'Server validation errors manifesting as standard Fiori message popovers.',
      'Browser cache serving stale UI bundles following redeployment.',
    ],
    prerequisiteModules: ['mod-4-1', 'mod-4-2', 'mod-4-3'],
    deliverables: [
      'app/orders/ web application folder with manifest.json and annotations.',
      'xs-app.json routing configuration for AppRouter.',
      'Freestyle UI5 controller and XML view.',
      'i18n message bundles.',
    ],
    acceptanceCriteria: [
      'List Report allows searching, filtering, and navigating into Object Page details.',
      'Custom action triggers backend handler and displays success message.',
    ],
  },
  {
    id: 'capstone-phase-5',
    phaseId: 'phase-5',
    title: 'Secured Orders Application',
    objective:
      'Secure the end-to-end application from Phase 4 with XSUAA, role-based authorization, and integrate an external REST service via SAP Destination Service.',
    functionalRequirements: [
      'XSUAA service binding with 3 roles (Viewer, Approver, Admin) and xs-security.json.',
      'Authorization rules by role and by attribute, complete with a role-by-operation matrix.',
      'One remote external service consumed through SAP BTP Destination Service.',
      'A security verification checklist with negative authorization test evidence.',
      'A test suite covering unauthenticated, unauthorized, and authorized flows.',
    ],
    edgeCasesToHandle: [
      'Expired, tampered, or wrong-audience JWT bearer tokens.',
      'Users authenticated via IdP but possessing zero assigned role collections.',
      'Role assignment latency before changes propagate to active sessions.',
      'Remote destination timeouts, proxy errors, or 401s from upstream APIs.',
    ],
    prerequisiteModules: ['mod-5-1', 'mod-5-2', 'mod-5-3', 'mod-5-4'],
    deliverables: [
      'xs-security.json security descriptor.',
      'CAP authorization annotations (@(requires: "Admin")).',
      'Destination consumption utility using SAP Cloud SDK.',
      'Security audit report documenting negative test runs.',
    ],
    acceptanceCriteria: [
      'Viewers can read orders but receive 403 Forbidden when attempting approvals.',
      'Outbound destination calls succeed without hardcoded credentials.',
    ],
  },
  {
    id: 'capstone-phase-6',
    phaseId: 'phase-6',
    title: 'Automated Deployment Pipeline with Runbook',
    objective:
      'Turn the secured application into a repeatable, observable release process with Multi-Target Application (MTA) packaging and CI/CD automation.',
    functionalRequirements: [
      'A complete mta.yaml descriptor with environment-specific extension files.',
      'A continuous integration pipeline that lints, tests, builds once, and deploys to target environments.',
      'Structured application logging with correlation IDs and health check routes.',
      'A comprehensive production runbook and post-mortem incident response template.',
    ],
    edgeCasesToHandle: [
      'MTA deployment failure midway through service instantiation.',
      'Rollback procedures across database schema changes.',
      'Expired deployment credentials in automated pipeline runners.',
      'Flaky tests causing intermittent pipeline blockages.',
    ],
    prerequisiteModules: ['mod-6-1', 'mod-6-2', 'mod-6-3', 'mod-6-4'],
    deliverables: [
      'Production mta.yaml descriptor.',
      'CI/CD pipeline configuration (e.g. GitHub Actions / GitLab CI).',
      'Operational Runbook (RUNBOOK.md) with rollback commands.',
      'Simulated incident diagnosis report.',
    ],
    acceptanceCriteria: [
      'Single command build and deploy successfully provisions all cloud modules.',
      'Application logs surface correlation IDs for traceable troubleshooting.',
    ],
  },
  {
    id: 'capstone-phase-7',
    phaseId: 'phase-7',
    title: 'AI Assistant for Orders',
    objective:
      'Incorporate SAP Business AI features into the secured Orders application using SAP AI Core, Generative AI Hub, and HANA Vector Engine.',
    functionalRequirements: [
      'A demand forecast endpoint backed by a machine learning model served on SAP AI Core.',
      'A summarizeOrder action and an askOrders RAG feature querying vector embeddings in SAP HANA Cloud.',
      'An intelligent assistant or tool-calling agent with at least 3 tools and human confirmation before writes.',
      'Authorization applied to all AI endpoints and retrieval filters.',
      'An evaluation report documenting retrieval hit rate, latency, and token cost tradeoffs.',
      'Offline mock services so the automated test suite executes without cloud API costs.',
    ],
    edgeCasesToHandle: [
      'Hallucinations and out-of-context retrieval results.',
      'Rate limiting (HTTP 429) and token context window exhaustion.',
      'Prompt injection attempts attempting to bypass business validation.',
      'Database vector search latency on high-volume queries.',
    ],
    prerequisiteModules: ['mod-7-1', 'mod-7-2', 'mod-7-3', 'mod-7-4', 'mod-7-5', 'mod-7-6'],
    deliverables: [
      'AI Core serving template and deployment configuration.',
      'SAP HANA Cloud vector embedding tables and similarity search queries.',
      'CAP service extensions exposing generative AI actions.',
      'AI Evaluation Benchmark Report (hit rate, latency, token costs).',
    ],
    acceptanceCriteria: [
      'RAG queries accurately retrieve grounding context with citations.',
      'Agent requires explicit user confirmation before executing write transactions.',
    ],
  },
  {
    id: 'capstone-phase-8',
    phaseId: 'phase-8',
    title: 'AI-Assisted Order and Forecast Management on SAP BTP',
    objective:
      'Ship one end-to-end cloud product that an engineering lead or recruiter can open, evaluate, run, and review.',
    functionalRequirements: [
      'CAP backend with at least 5 entities, custom actions, validations, and 40+ automated tests.',
      'SAP Fiori Elements UI with one freestyle view, served through AppRouter and registered for Fiori Launchpad.',
      'XSUAA authentication with 3 roles and attribute-based security rules.',
      'A forecast model on AI Core, RAG semantic search on HANA Cloud, and an AI assistant with write confirmations.',
      'Automated MTA deployment pipeline with manual promotion approval steps.',
      'Architecture documentation, security checklist, operations runbook, and AI evaluation report.',
    ],
    edgeCasesToHandle: [
      'Trial quota reclamation and service restart procedures.',
      'Cold-start latency on serverless AI deployments.',
      'Cross-origin resource sharing (CORS) across microservices.',
      'Graceful degradation when external services or AI endpoints are unavailable.',
    ],
    prerequisiteModules: ['mod-8-1', 'mod-8-2'],
    deliverables: [
      'Public GitHub repository with clean history and comprehensive documentation.',
      'Live deployed application URL on SAP BTP.',
      'Demonstration walkthrough video and portfolio article.',
      'Complete architectural blueprint with Clean Core compliance certification.',
    ],
    acceptanceCriteria: [
      'Application demonstrates full business lifecycle from customer order to AI forecast.',
      'All automated tests pass, zero credentials leaked, and runbook verified.',
    ],
  },
];
