import { ComponentDefinition } from '../../types/designLab';

export const COMPONENT_CATALOGUE: Record<string, ComponentDefinition> = {
  // ==========================================
  // 1. APPLICATION & USER INTERFACE
  // ==========================================
  'user-browser': {
    type: 'user-browser',
    displayName: 'User / Browser',
    category: 'ui',
    iconName: 'Globe',
    badgeText: 'Client Tier',
    plainEnglishDescription:
      'The human end-user sitting at a laptop or mobile phone requesting business data through their web browser.',
    technicalExplanation:
      'Client-side user agent executing HTTP/HTTPS requests against enterprise endpoints. Initiates TLS handshakes and stores JWT session cookies.',
    realWorldAnalogy: {
      metaphor: 'The Customer at the Front Door',
      explanation:
        'Just as a customer walks into an office building through the main entrance, the browser is where external interactions start.',
    },
    whyRequired:
      'Every interactive application requires an entry client to initiate user actions and render presentation views.',
    commonMistakes: [
      'Attempting to connect directly from the browser to an internal database or private backend without an App Router.',
      'Storing master passwords or API secrets in client-side JavaScript.',
    ],
    configurationFields: [
      {
        name: 'clientType',
        label: 'Client Type',
        type: 'select',
        defaultValue: 'desktop-browser',
        options: [
          { label: 'Desktop Browser (Chrome/Edge/Firefox)', value: 'desktop-browser' },
          { label: 'Mobile Device (SAP Mobile Start / iOS / Android)', value: 'mobile-app' },
          { label: 'Automated API Consumer / Postman', value: 'api-consumer' },
        ],
        description: 'The physical device or client environment consuming the application.',
      },
      {
        name: 'expectedConcurrentUsers',
        label: 'Expected Concurrent Users',
        type: 'number',
        defaultValue: 50,
        description: 'Estimated simultaneous peak traffic for scaling calculations.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'app-router',
        connectionType: 'http-route',
        label: 'HTTP Inbound',
        description: 'Routes inbound HTTPS browser traffic to the secure App Router reverse proxy.',
      },
      {
        targetType: 'fiori-app',
        connectionType: 'http-route',
        label: 'Direct UI Load',
        description: 'Loads the compiled Fiori HTML5 presentation bundle directly.',
      },
    ],
    prerequisites: [],
    securityImplications:
      'Untrusted network zone. All traffic crossing from the browser must be validated through OAuth 2.0 / XSUAA tokens.',
    deploymentImplications: 'Not a deployable cloud resource. Represents external inbound traffic.',
    mtaProfileEligible: false,
    defaultMtaRole: 'none',
  },

  'fiori-app': {
    type: 'fiori-app',
    displayName: 'SAP Fiori Application',
    category: 'ui',
    iconName: 'Smartphone',
    badgeText: 'Fiori Elements',
    plainEnglishDescription:
      'A modern, standard SAP enterprise web interface (List Report, Object Page) generated from UI annotations without frontend boilerplate.',
    technicalExplanation:
      'SAP Fiori Elements or UI5 web app hosted in the HTML5 Application Repository. Uses OData v4 to query backend entities and render Horizon-themed components.',
    realWorldAnalogy: {
      metaphor: 'The Interactive Tablet Menu at a Restaurant',
      explanation:
        'Instead of handwriting orders, customers pick items from a polished digital menu that sends orders directly to the kitchen.',
    },
    whyRequired:
      'Delivers an intuitive, consistent user experience compliant with SAP Fiori design standards across all corporate devices.',
    commonMistakes: [
      'Hardcoding backend URLs inside Fiori components instead of using relative App Router destination paths.',
      'Deploying Fiori apps as standalone Cloud Foundry microservices instead of using the cost-effective HTML5 Application Repository.',
    ],
    configurationFields: [
      {
        name: 'appName',
        label: 'Fiori App Name',
        type: 'text',
        defaultValue: 'manageorders',
        required: true,
        description: 'The unique technical application ID used in the HTML5 repository.',
      },
      {
        name: 'floorplan',
        label: 'Floorplan Pattern',
        type: 'select',
        defaultValue: 'list-report-object-page',
        options: [
          { label: 'List Report & Object Page (Standard CRUD)', value: 'list-report-object-page' },
          { label: 'Analytical List Page (Charts & KPIs)', value: 'analytical-list-page' },
          { label: 'Worklist (High-volume triage)', value: 'worklist' },
          { label: 'Freestyle SAPUI5 (Custom Canvas)', value: 'ui5-freestyle' },
        ],
        description: 'Standard Fiori floorplan pattern defining the UI layout.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'app-router',
        connectionType: 'http-route',
        label: 'App Router Proxy',
        description: 'Serves static HTML5 resources through the central App Router reverse proxy.',
      },
      {
        targetType: 'cap-service',
        connectionType: 'http-route',
        label: 'OData v4 Binding',
        description: 'Consumes OData metadata and CRUD APIs exposed by the CAP backend.',
      },
    ],
    prerequisites: ['app-router'],
    securityImplications:
      'Relies on session cookies and XSUAA authentication provided by the enclosing App Router.',
    deploymentImplications:
      'Deployed via HTML5 Application Deployer module into the SAP HTML5 Application Repository service.',
    mtaProfileEligible: true,
    defaultMtaRole: 'module',
    defaultMtaType: 'html5',
  },

  'ui5-app': {
    type: 'ui5-app',
    displayName: 'SAPUI5 Application',
    category: 'ui',
    iconName: 'Layout',
    badgeText: 'Freestyle UI5',
    plainEnglishDescription:
      'A custom-built SAPUI5 web application designed with bespoke XML views, JavaScript controllers, and custom visual controls.',
    technicalExplanation:
      'Custom SAPUI5 client-side MVC framework runtime bundle. Consumes OData/REST APIs and renders bespoke enterprise views.',
    realWorldAnalogy: {
      metaphor: 'A Custom-Architected Display Dashboard',
      explanation:
        'When standard pre-built templates do not fit, a freestyle UI5 app gives engineers total freedom to design every single pixel.',
    },
    whyRequired:
      'Required when enterprise requirements exceed the capabilities of standard Fiori Elements floorplans.',
    commonMistakes: [
      'Bypassing the App Router and attempting to call backend microservices directly across domains without CORS configuration.',
    ],
    configurationFields: [
      {
        name: 'appName',
        label: 'Application ID',
        type: 'text',
        defaultValue: 'customui5app',
        required: true,
        description: 'Technical module name of the freestyle UI5 bundle.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'app-router',
        connectionType: 'http-route',
        label: 'App Router Routing',
        description: 'Binds the freestyle UI bundle to the central router.',
      },
      {
        targetType: 'cap-service',
        connectionType: 'http-route',
        label: 'OData / REST API',
        description: 'Consumes business APIs exposed by the CAP service.',
      },
    ],
    prerequisites: ['app-router'],
    securityImplications:
      'Must enforce client-side input validation and rely on backend for authoritative RBAC authorization.',
    deploymentImplications:
      'Packaged in an MTA archive and deployed to HTML5 Application Repository or standalone Cloud Foundry container.',
    mtaProfileEligible: true,
    defaultMtaRole: 'module',
    defaultMtaType: 'html5',
  },

  'app-router': {
    type: 'app-router',
    displayName: 'App Router',
    category: 'ui',
    iconName: 'ShieldAlert',
    badgeText: 'Reverse Proxy',
    plainEnglishDescription:
      'The reception desk of your application. It receives incoming requests, verifies user login, and directs them to the correct backend service.',
    technicalExplanation:
      'A Node.js reverse proxy (`@sap/approuter`) acting as the single point of entry for multi-target applications. Intercepts incoming requests, initiates OAuth 2.0 authorization code flows with XSUAA, and proxies traffic according to `xs-app.json` routes.',
    realWorldAnalogy: {
      metaphor: 'The Security Receptionist in a Corporate Tower',
      explanation:
        'Visitors cannot wander straight into executive offices. They must first show their ID badge at the reception desk, which directs them to the authorized floor.',
    },
    whyRequired:
      'Essential for Clean Core and enterprise security. Eliminates Cross-Origin Resource Sharing (CORS) issues and prevents unauthorized direct access to backend microservices.',
    commonMistakes: [
      'Forgetting to bind XSUAA to the App Router, leaving routes unprotected.',
      'Deploying backend CAP services with public routes instead of routing exclusively through App Router.',
    ],
    configurationFields: [
      {
        name: 'routerName',
        label: 'Router Module Name',
        type: 'text',
        defaultValue: 'approuter',
        required: true,
        description: 'Technical module name in the deployment descriptor.',
      },
      {
        name: 'authenticationMethod',
        label: 'Authentication Method',
        type: 'select',
        defaultValue: 'route',
        options: [
          { label: 'Route (Enforce authentication per route)', value: 'route' },
          { label: 'None (Public anonymous access)', value: 'none' },
        ],
        description: 'How the App Router validates inbound session tokens.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'cap-service',
        connectionType: 'http-route',
        label: 'Forward API Traffic',
        description: 'Proxies authenticated API calls to the CAP backend with forwarded user JWT.',
      },
      {
        targetType: 'xsuaa',
        connectionType: 'service-binding',
        label: 'Bind XSUAA',
        description: 'Binds the XSUAA instance for OAuth 2.0 token exchange and session management.',
      },
      {
        targetType: 'node-service',
        connectionType: 'http-route',
        label: 'Forward Custom Traffic',
        description: 'Proxies HTTP traffic to a custom Node.js microservice.',
      },
    ],
    prerequisites: ['xsuaa'],
    securityImplications:
      'Critical security gatekeeper. Must enforce HTTPS, secure cookies, and CSRF token protection.',
    deploymentImplications:
      'Deploys as a Cloud Foundry application (`approuter.nodejs`) with memory allocation (typically 128M - 256M).',
    mtaProfileEligible: true,
    defaultMtaRole: 'module',
    defaultMtaType: 'approuter.nodejs',
  },

  // ==========================================
  // 2. APPLICATION SERVICES
  // ==========================================
  'cap-service': {
    type: 'cap-service',
    displayName: 'SAP CAP Service',
    category: 'service',
    iconName: 'Server',
    badgeText: 'Business Engine',
    plainEnglishDescription:
      'The engine room that understands business logic, validates data, processes workflows, and coordinates database operations.',
    technicalExplanation:
      'A backend service built with the SAP Cloud Application Programming Model (`@sap/cds`). Automatically serves OData v4 / REST endpoints, compiles CDS data models, executes custom event handlers, and handles database transactions.',
    realWorldAnalogy: {
      metaphor: 'The Master Chef in a Restaurant Kitchen',
      explanation:
        'Takes raw ingredients from the pantry (database), applies strict recipes (business logic), and plates the finished meal (OData response) for the customer.',
    },
    whyRequired:
      'Provides standard, enterprise-grade data management, lifecycle event hooks, and automated OData generation with minimal boilerplate.',
    commonMistakes: [
      'Writing raw SQL queries directly instead of using the CDS Query Language (CQL).',
      'Forgetting to configure `@requires: "authenticated-user"` or role restrictions on sensitive services.',
    ],
    configurationFields: [
      {
        name: 'serviceName',
        label: 'Service Name',
        type: 'text',
        defaultValue: 'orders-srv',
        required: true,
        description: 'The technical module name of the CAP service.',
      },
      {
        name: 'memoryLimit',
        label: 'Memory Limit',
        type: 'select',
        defaultValue: '256M',
        options: [
          { label: '256 MB (Development / Light)', value: '256M' },
          { label: '512 MB (Standard Production)', value: '512M' },
          { label: '1024 MB (High-Throughput Analytics)', value: '1024M' },
        ],
        description: 'Cloud Foundry memory allocation for this microservice container.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'hana-cloud',
        connectionType: 'persistence',
        label: 'HANA HDI Binding',
        description: 'Connects to SAP HANA Cloud for transactional persistence via HDI container.',
      },
      {
        targetType: 'sqlite',
        connectionType: 'persistence',
        label: 'SQLite Persistence',
        description: 'Connects to a local embedded SQLite database for zero-cost rapid development.',
      },
      {
        targetType: 'xsuaa',
        connectionType: 'service-binding',
        label: 'Bind XSUAA',
        description: 'Validates user scopes, roles, and tenant identities on every API call.',
      },
      {
        targetType: 'destination-service',
        connectionType: 'service-binding',
        label: 'Bind Destination Service',
        description: 'Allows CAP to discover and consume remote APIs without hardcoded credentials.',
      },
    ],
    prerequisites: [],
    securityImplications:
      'Must enforce token verification via `@sap/xssec` and restrict entity operations via `@restrict` annotations.',
    deploymentImplications:
      'Deploys as a Cloud Foundry Node.js module (`nodejs`) with `cds-serve` entrypoint.',
    mtaProfileEligible: true,
    defaultMtaRole: 'module',
    defaultMtaType: 'nodejs',
  },

  'node-service': {
    type: 'node-service',
    displayName: 'Node.js Microservice',
    category: 'service',
    iconName: 'Cpu',
    badgeText: 'Custom Service',
    plainEnglishDescription:
      'A standard custom Node.js (or Express/Fastify) backend used for specialized processing or legacy integration.',
    technicalExplanation:
      'Standalone Node.js microservice running on the Cloud Foundry runtime. Serves custom REST/WebSocket endpoints.',
    realWorldAnalogy: {
      metaphor: 'A Specialized Workshop Machine',
      explanation:
        'A dedicated tool designed for a specific industrial task that falls outside the standard assembly line.',
    },
    whyRequired:
      'Useful for custom integrations, file processing pipelines, or bespoke protocol handlers.',
    commonMistakes: [
      'Neglecting to validate incoming JWT tokens, creating an unauthenticated backdoor.',
    ],
    configurationFields: [
      {
        name: 'serviceName',
        label: 'Service Name',
        type: 'text',
        defaultValue: 'custom-processor',
        required: true,
        description: 'Technical module name.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'xsuaa',
        connectionType: 'service-binding',
        label: 'JWT Validation',
        description: 'Binds XSUAA to inspect security credentials.',
      },
    ],
    prerequisites: [],
    securityImplications:
      'Requires explicit JWT verification middleware using `@sap/xssec` to prevent unauthorized access.',
    deploymentImplications: 'Deploys as a standard Cloud Foundry Node.js application container.',
    mtaProfileEligible: true,
    defaultMtaRole: 'module',
    defaultMtaType: 'nodejs',
  },

  'external-api': {
    type: 'external-api',
    displayName: 'External API',
    category: 'service',
    iconName: 'Network',
    badgeText: 'Remote Target',
    plainEnglishDescription:
      'A third-party web service (such as Stripe, Slack, Twilio, or Google Maps) located outside the SAP BTP subaccount.',
    technicalExplanation:
      'Remote HTTP REST/GraphQL API hosted on an external public cloud or SaaS vendor. Consumed using OAuth/API Key authentication.',
    realWorldAnalogy: {
      metaphor: 'The International Mail Courier',
      explanation:
        'A service outside your organization that you send letters to and receive parcels from on demand.',
    },
    whyRequired:
      'Enables BTP applications to leverage third-party SaaS capabilities (payment processing, messaging, address verification).',
    commonMistakes: [
      'Hardcoding API secrets or authorization tokens directly in application source code.',
      'Calling external APIs directly from user browsers without a backend proxy.',
    ],
    configurationFields: [
      {
        name: 'apiName',
        label: 'External API Identifier',
        type: 'text',
        defaultValue: 'StripePaymentGateway',
        required: true,
        description: 'Logical name of the remote system.',
      },
      {
        name: 'targetUrl',
        label: 'Base URL',
        type: 'text',
        defaultValue: 'https://api.external.com/v1',
        required: true,
        description: 'The remote endpoint destination address.',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: ['destination-service'],
    securityImplications:
      'All credentials must be stored securely inside the SAP BTP Destination Service, never in code.',
    deploymentImplications: 'External resource. Not deployed by MTA.',
    mtaProfileEligible: false,
    defaultMtaRole: 'none',
  },

  // ==========================================
  // 3. SECURITY
  // ==========================================
  'xsuaa': {
    type: 'xsuaa',
    displayName: 'SAP XSUAA Service',
    category: 'security',
    iconName: 'ShieldCheck',
    badgeText: 'OAuth 2.0 / JWT',
    plainEnglishDescription:
      'The security checkpoint that verifies who is allowed to enter (authentication) and what specific actions they are permitted to perform (authorization).',
    technicalExplanation:
      'SAP Authorization and Trust Management Service (`com.sap.xs.uaa`). Issues, signs, and validates OAuth 2.0 JSON Web Tokens (JWT) using asymmetric keys. Configured via `xs-security.json` with role templates, scopes, and user attributes.',
    realWorldAnalogy: {
      metaphor: 'The Airport Security & Passport Control',
      explanation:
        'Verifies your passport (Identity), scans your boarding pass (Authentication), and checks if you have access to the First Class Lounge (Authorization Scopes).',
    },
    whyRequired:
      'Mandatory for enterprise applications. Implements enterprise Single Sign-On (SSO), multi-tenancy isolation, and Role-Based Access Control (RBAC).',
    commonMistakes: [
      'Hardcoding user IDs instead of checking JWT scopes (`$XSAPPNAME.Viewer`, `$XSAPPNAME.Admin`).',
      'Using the `application` service plan when multi-tenancy requires `broker`.',
    ],
    configurationFields: [
      {
        name: 'servicePlan',
        label: 'XSUAA Service Plan',
        type: 'select',
        defaultValue: 'application',
        options: [
          { label: 'application (Standard Single-Tenant App)', value: 'application' },
          { label: 'broker (Multi-Tenant SaaS Solution)', value: 'broker' },
          { label: 'apiaccess (Administrative API access)', value: 'apiaccess' },
        ],
        description: 'The SAP Cloud Foundry service plan governing tenant isolation.',
      },
      {
        name: 'roleTemplateName',
        label: 'Default Role Template',
        type: 'text',
        defaultValue: 'Viewer',
        description: 'Primary role template declared in xs-security.json.',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: [],
    securityImplications:
      'Foundational security broker. Generates cryptographically signed JWT tokens carrying user identity, tenant subdomain, and granted scopes.',
    deploymentImplications:
      'Deploys as an MTA resource of type `org.cloudfoundry.managed-service` with service `xsuaa`.',
    mtaProfileEligible: true,
    defaultMtaRole: 'resource',
    defaultMtaType: 'org.cloudfoundry.managed-service',
  },

  'auth-boundary': {
    type: 'auth-boundary',
    displayName: 'Authentication Boundary',
    category: 'security',
    iconName: 'Lock',
    badgeText: 'Security Perimeter',
    plainEnglishDescription:
      'A conceptual security wall separating public unauthenticated internet traffic from the private, secure enterprise application perimeter.',
    technicalExplanation:
      'Network perimeter demarcation zone. Enforces TLS termination, WAF inspection, and mutual authentication before requests enter the private Cloud Foundry overlay network.',
    realWorldAnalogy: {
      metaphor: 'The Gated Perimeter Fence around a Corporate Campus',
      explanation:
        'Anyone can drive up to the guard booth outside, but only badge-holders are admitted inside the gates.',
    },
    whyRequired:
      'Helps beginners clearly visualize where public internet requests terminate and where authenticated enterprise operations begin.',
    commonMistakes: [
      'Assuming that being inside a cloud subaccount makes services private without explicit authentication checks.',
    ],
    configurationFields: [],
    supportedConnectionTypes: [],
    prerequisites: ['xsuaa'],
    securityImplications: 'Defines the trust boundary for zero-trust enterprise security audits.',
    deploymentImplications: 'Conceptual architectural element. Does not generate an MTA resource.',
    mtaProfileEligible: false,
    defaultMtaRole: 'none',
  },

  'role-scope-config': {
    type: 'role-scope-config',
    displayName: 'Role & Scope Configuration',
    category: 'security',
    iconName: 'Key',
    badgeText: 'RBAC Policy',
    plainEnglishDescription:
      'Defines the list of permissions (scopes) such as "OrderReader" or "OrderApprover" and bundles them into roles assignable to users.',
    technicalExplanation:
      'Security descriptor configuration representing the `scopes` and `role-templates` blocks inside an `xs-security.json` manifest.',
    realWorldAnalogy: {
      metaphor: 'The Company Job Description & Badge Privileges',
      explanation:
        'Specifies that an Accountant has access to the ledger room, while an Intern only has access to the lobby and breakroom.',
    },
    whyRequired:
      'Enforces granular Role-Based Access Control (RBAC) so users only see and edit data they are authorized to handle.',
    commonMistakes: [
      'Creating one single all-powerful admin scope and giving it to everyone.',
    ],
    configurationFields: [
      {
        name: 'declaredScopes',
        label: 'Declared Scopes',
        type: 'text',
        defaultValue: 'OrderViewer, OrderAdmin',
        description: 'Comma-separated list of technical scopes.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'xsuaa',
        connectionType: 'service-binding',
        label: 'Applies to XSUAA',
        description: 'Injects role templates into the XSUAA service descriptor.',
      },
    ],
    prerequisites: ['xsuaa'],
    securityImplications:
      'Directly governs which API routes and CAP service entities are unlocked for specific user roles.',
    deploymentImplications: 'Bundled into the `xs-security.json` file referenced by the XSUAA resource.',
    mtaProfileEligible: false,
    defaultMtaRole: 'none',
  },

  // ==========================================
  // 4. DATA & PERSISTENCE
  // ==========================================
  'hana-cloud': {
    type: 'hana-cloud',
    displayName: 'SAP HANA Cloud',
    category: 'data',
    iconName: 'Database',
    badgeText: 'In-Memory DB',
    plainEnglishDescription:
      'The high-performance, in-memory relational database that permanently stores corporate tables, financial documents, and business records.',
    technicalExplanation:
      'Cloud-managed in-memory database service. In CAP applications, access is mediated through an isolated HANA Deployment Infrastructure (HDI) Container, preventing direct schema modifications.',
    realWorldAnalogy: {
      metaphor: 'The Ultra-Secure Bank Vault',
      explanation:
        'A fireproof, high-speed safe where cash, contracts, and jewels are permanently stored with absolute cryptographic audit trails.',
    },
    whyRequired:
      'The enterprise standard for transactional persistence, multi-model processing (relational, vector, graph), and ACID integrity in SAP environments.',
    commonMistakes: [
      'Attempting to connect a web browser directly to HANA without an intermediate backend microservice.',
      'Hardcoding database passwords instead of using Cloud Foundry service bindings.',
    ],
    configurationFields: [
      {
        name: 'hdiContainerName',
        label: 'HDI Container Resource Name',
        type: 'text',
        defaultValue: 'orders-db-hdi',
        required: true,
        description: 'Logical name of the HDI container resource in the MTA manifest.',
      },
      {
        name: 'servicePlan',
        label: 'Service Plan',
        type: 'select',
        defaultValue: 'hdi-shared',
        options: [
          { label: 'hdi-shared (Standard Shared Container)', value: 'hdi-shared' },
          { label: 'schema (Direct dedicated database schema)', value: 'schema' },
          { label: 'securestore (Encrypted key-value storage)', value: 'securestore' },
        ],
        description: 'The HANA service plan requested from the BTP marketplace.',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: [],
    securityImplications:
      'Isolated inside an HDI container. Access keys are dynamically generated by Cloud Foundry bindings.',
    deploymentImplications:
      'Deploys as an MTA resource of type `com.sap.xs.hana` with service plan `hdi-shared`. Deployed via `deployer` module.',
    mtaProfileEligible: true,
    defaultMtaRole: 'resource',
    defaultMtaType: 'com.sap.xs.hana',
  },

  'sqlite': {
    type: 'sqlite',
    displayName: 'SQLite Database',
    category: 'data',
    iconName: 'HardDrive',
    badgeText: 'Local Dev Only',
    plainEnglishDescription:
      'A lightweight, embedded file database used exclusively for zero-cost local development and rapid unit testing on a laptop.',
    technicalExplanation:
      'Embedded serverless SQL database engine. Runs in-memory (`:memory:`) or persists to a local `.db` file on the developer workstation. NOT supported in production Cloud Foundry environments.',
    realWorldAnalogy: {
      metaphor: 'A Personal Notebook on Your Desk',
      explanation:
        'Great for jotting down drafts and quick notes while working alone, but not suitable as the official corporate ledger.',
    },
    whyRequired:
      'Enables developers to run tests in milliseconds without provisioning a live cloud database.',
    commonMistakes: [
      'Trying to deploy SQLite to production Cloud Foundry in an MTA file (ephemeral container filesystems destroy the database on restart).',
    ],
    configurationFields: [
      {
        name: 'storageType',
        label: 'SQLite Storage Mode',
        type: 'select',
        defaultValue: 'in-memory',
        options: [
          { label: 'In-Memory (:memory: for fast tests)', value: 'in-memory' },
          { label: 'Local File (sqlite.db for persisted dev testing)', value: 'file' },
        ],
        description: 'Persistence mechanism for local developer testing.',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: [],
    securityImplications: 'No enterprise encryption or multi-tenant isolation. Strictly forbidden for production.',
    deploymentImplications: 'FORBIDDEN in production MTA descriptors. Validation engine will block generation.',
    mtaProfileEligible: false,
    defaultMtaRole: 'none',
  },

  // ==========================================
  // 5. CONNECTIVITY & INTEGRATION
  // ==========================================
  'destination-service': {
    type: 'destination-service',
    displayName: 'Destination Service',
    category: 'connectivity',
    iconName: 'Share2',
    badgeText: 'Endpoint Registry',
    plainEnglishDescription:
      'The corporate phonebook. It securely stores target URLs, authentication credentials, and proxy settings for external and on-premise systems.',
    technicalExplanation:
      'SAP Destination Service (`destination`). Manages remote endpoint credentials (OAuth2ClientCredentials, BasicAuth, PrincipalPropagation) so application code only references logical destination names.',
    realWorldAnalogy: {
      metaphor: 'The Speed-Dial Contact List on Your Phone',
      explanation:
        'You tap "Headquarters" rather than memorizing their IP address, routing protocol, and secret password every time you call.',
    },
    whyRequired:
      'Adheres to Clean Core by decoupling application logic from physical target hostnames and rotating credentials.',
    commonMistakes: [
      'Hardcoding destination URLs in CAP code instead of reading them dynamically via `cds.connect.to("LogicalName")`.',
    ],
    configurationFields: [
      {
        name: 'destinationName',
        label: 'Logical Destination Name',
        type: 'text',
        defaultValue: 'S4HANA_CLOUD_API',
        required: true,
        description: 'The logical name looked up by the application at runtime.',
      },
      {
        name: 'authenticationType',
        label: 'Authentication Scheme',
        type: 'select',
        defaultValue: 'OAuth2ClientCredentials',
        options: [
          { label: 'OAuth 2.0 Client Credentials (S2S)', value: 'OAuth2ClientCredentials' },
          { label: 'Principal Propagation (Forward User Identity)', value: 'PrincipalPropagation' },
          { label: 'Basic Authentication (Username / Password)', value: 'BasicAuthentication' },
          { label: 'No Authentication (Public API)', value: 'NoAuthentication' },
        ],
        description: 'How BTP authenticates with the target system.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'connectivity-service',
        connectionType: 'connectivity-tunnel',
        label: 'On-Premise Routing',
        description: 'Leverages the Connectivity Service tunnel to reach internal firewalled networks.',
      },
      {
        targetType: 'external-system',
        connectionType: 'data-sync',
        label: 'Target System Connection',
        description: 'Directs outbound requests to the target enterprise ERP system.',
      },
      {
        targetType: 'external-api',
        connectionType: 'data-sync',
        label: 'Third-Party SaaS Connection',
        description: 'Routes outbound API calls to an external SaaS vendor.',
      },
    ],
    prerequisites: [],
    securityImplications:
      'Safely isolates sensitive passwords and tokens inside hardware security modules, completely hidden from developer code.',
    deploymentImplications:
      'Deploys as an MTA resource of type `org.cloudfoundry.managed-service` with service `destination`.',
    mtaProfileEligible: true,
    defaultMtaRole: 'resource',
    defaultMtaType: 'org.cloudfoundry.managed-service',
  },

  'connectivity-service': {
    type: 'connectivity-service',
    displayName: 'Connectivity Service',
    category: 'connectivity',
    iconName: 'Radio',
    badgeText: 'Reverse Tunnel',
    plainEnglishDescription:
      'The secure bridge that connects cloud applications to on-premise systems hiding behind corporate firewalls without opening incoming firewall ports.',
    technicalExplanation:
      'SAP Connectivity Service (`connectivity`). Establishes a TLS-encrypted reverse proxy tunnel with an on-premise SAP Cloud Connector instance.',
    realWorldAnalogy: {
      metaphor: 'The Underground Secure Tunnel between Two Buildings',
      explanation:
        'Employees can walk securely between corporate headquarters and the manufacturing plant without ever stepping onto public streets.',
    },
    whyRequired:
      'Mandatory whenever cloud applications need to read on-premise S/4HANA or SAP ECC systems securely.',
    commonMistakes: [
      'Binding Connectivity Service when only communicating with public cloud APIs (waste of resources).',
    ],
    configurationFields: [
      {
        name: 'servicePlan',
        label: 'Service Plan',
        type: 'select',
        defaultValue: 'lite',
        options: [
          { label: 'lite (Standard connectivity tunnel)', value: 'lite' },
        ],
        description: 'The standard Cloud Foundry connectivity plan.',
      },
    ],
    supportedConnectionTypes: [
      {
        targetType: 'external-system',
        connectionType: 'connectivity-tunnel',
        label: 'On-Premise Tunnel',
        description: 'Binds to the Cloud Connector establishing reverse-tunnel access to on-premise ERP.',
      },
    ],
    prerequisites: ['destination-service'],
    securityImplications:
      'Enforces mutual TLS authentication. Outbound connections are initiated exclusively from the on-premise network.',
    deploymentImplications:
      'Deploys as an MTA resource of type `org.cloudfoundry.managed-service` with service `connectivity`.',
    mtaProfileEligible: true,
    defaultMtaRole: 'resource',
    defaultMtaType: 'org.cloudfoundry.managed-service',
  },

  'external-system': {
    type: 'external-system',
    displayName: 'External Enterprise System',
    category: 'connectivity',
    iconName: 'Building2',
    badgeText: 'Core ERP',
    plainEnglishDescription:
      'A primary core business system such as SAP S/4HANA, SAP ECC, or SuccessFactors that acts as the single source of truth.',
    technicalExplanation:
      'On-premise or cloud enterprise system of record exposing certified OData/BAPI interfaces.',
    realWorldAnalogy: {
      metaphor: 'The Central Headquarters Archive',
      explanation:
        'The permanent historical archive where all legal corporate records and transactions are safely stored.',
    },
    whyRequired:
      'Represents the core transactional ERP that side-by-side BTP applications extend.',
    commonMistakes: [
      'Attempting to connect to on-premise systems without both Destination and Connectivity services.',
    ],
    configurationFields: [
      {
        name: 'systemType',
        label: 'System Type',
        type: 'select',
        defaultValue: 's4hana-cloud',
        options: [
          { label: 'SAP S/4HANA Cloud (Public APIs)', value: 's4hana-cloud' },
          { label: 'SAP S/4HANA On-Premise (Private Corporate Network)', value: 's4hana-onprem' },
          { label: 'SAP ECC 6.0 (Legacy On-Premise ERP)', value: 'sap-ecc' },
          { label: 'SAP SuccessFactors (HCM Cloud)', value: 'successfactors' },
        ],
        description: 'The architectural edition of the core ERP system.',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: ['destination-service'],
    securityImplications:
      'Protected by corporate firewalls. BTP extensions never bypass core business authorization checks.',
    deploymentImplications: 'External system. Not managed by the MTA deployment descriptor.',
    mtaProfileEligible: false,
    defaultMtaRole: 'none',
  },

  // ==========================================
  // 6. DEPLOYMENT & OPERATIONS
  // ==========================================
  'cf-app': {
    type: 'cf-app',
    displayName: 'Cloud Foundry Application',
    category: 'deployment',
    iconName: 'Layers',
    badgeText: 'Runtime Container',
    plainEnglishDescription:
      'An isolated Linux container running in the SAP BTP Cloud Foundry runtime hosting code, memory, and CPU resources.',
    technicalExplanation:
      'A Diego container instance managed by Cloud Foundry Cloud Controller with autoscaling and health check runbooks.',
    realWorldAnalogy: {
      metaphor: 'A High-Tech Rented Office Suite',
      explanation:
        'You pay for the square footage (RAM and CPU) you need; the building landlord takes care of electricity, water, and security.',
    },
    whyRequired: 'The standard execution runtime container for custom application logic.',
    commonMistakes: ['Requesting too little memory causing container Out Of Memory (OOM) crashes.'],
    configurationFields: [
      {
        name: 'diskQuota',
        label: 'Disk Quota',
        type: 'select',
        defaultValue: '512M',
        options: [
          { label: '512 MB', value: '512M' },
          { label: '1024 MB', value: '1024M' },
        ],
        description: 'Allocated container disk space.',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: [],
    securityImplications: 'Runs in an isolated container namespace with restricted kernel privileges.',
    deploymentImplications: 'Generated as an MTA module.',
    mtaProfileEligible: true,
    defaultMtaRole: 'module',
    defaultMtaType: 'nodejs',
  },

  'mta-app': {
    type: 'mta-app',
    displayName: 'MTA Application Package',
    category: 'deployment',
    iconName: 'PackageCheck',
    badgeText: 'MTA Bundle',
    plainEnglishDescription:
      'The multi-target application packaging boundary that bundles UI, backend microservices, and database resources into a single deployable archive.',
    technicalExplanation:
      'A software package governed by an `mta.yaml` deployment manifest compiled into an `.mtar` archive and deployed via the Cloud Foundry MTA plugin.',
    realWorldAnalogy: {
      metaphor: 'The Shipping Container',
      explanation:
        'Instead of loading hundreds of loose packages onto a cargo ship individually, everything is packed into a standardized shipping container for seamless global transport.',
    },
    whyRequired:
      'Ensures atomic deployments: either the UI, backend, and database bindings deploy together successfully, or the entire release is rolled back cleanly.',
    commonMistakes: [
      'Creating circular dependencies between modules in the `requires` and `provides` blocks.',
    ],
    configurationFields: [
      {
        name: 'mtaId',
        label: 'MTA Package ID',
        type: 'text',
        defaultValue: 'com.sap.btplaunchpad.app',
        required: true,
        description: 'Unique global enterprise namespace identifier.',
      },
      {
        name: 'mtaVersion',
        label: 'Version',
        type: 'text',
        defaultValue: '1.0.0',
        required: true,
        description: 'Semantic version string (major.minor.patch).',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: [],
    securityImplications: 'Declares service bindings and credentials injection parameters.',
    deploymentImplications: 'The top-level structure of the `mta.yaml` document.',
    mtaProfileEligible: true,
    defaultMtaRole: 'none',
  },

  'service-instance': {
    type: 'service-instance',
    displayName: 'Generic Service Instance',
    category: 'deployment',
    iconName: 'Boxes',
    badgeText: 'Backing Service',
    plainEnglishDescription:
      'A managed platform service instance (such as Alert Notification, Workflow, or Object Store) provisioned from the SAP BTP Service Marketplace.',
    technicalExplanation:
      'A Cloud Foundry service instance created via Open Service Broker API providing credentials to bound microservices.',
    realWorldAnalogy: {
      metaphor: 'A Utility Subscription (Power / Water Company)',
      explanation:
        'You do not build your own power plant; you simply flip a switch and consume electricity from the certified provider.',
    },
    whyRequired: 'Enables microservices to consume standard platform utilities declaratively.',
    commonMistakes: ['Referencing non-existent service plans in the deployment manifest.'],
    configurationFields: [
      {
        name: 'serviceName',
        label: 'Service Name',
        type: 'text',
        defaultValue: 'alert-notification',
        required: true,
        description: 'The service broker catalog name in the BTP Marketplace.',
      },
      {
        name: 'planName',
        label: 'Plan Name',
        type: 'text',
        defaultValue: 'standard',
        required: true,
        description: 'The service plan entitlement.',
      },
    ],
    supportedConnectionTypes: [],
    prerequisites: [],
    securityImplications: 'Credentials injected dynamically via VCAP_SERVICES environment variable.',
    deploymentImplications:
      'Deploys as an MTA resource of type `org.cloudfoundry.managed-service`.',
    mtaProfileEligible: true,
    defaultMtaRole: 'resource',
    defaultMtaType: 'org.cloudfoundry.managed-service',
  },
};
