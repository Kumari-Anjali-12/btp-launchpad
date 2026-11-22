import { Chapter } from '../../types/curriculum';

export const MODULE_3_CHAPTERS: Chapter[] = [
  {
    id: 'ch-3-1',
    moduleId: 'module-3',
    order: 1,
    number: '3.1',
    title: 'Authentication, Authorization & XSUAA',
    subtitle: 'Securing cloud microservices with OAuth 2.0, JWT tokens and Role Collections',
    estimatedMinutes: 9,
    summary:
      'Understand enterprise cloud security: the critical difference between Authentication (AuthN) and Authorization (AuthZ), how SAP BTP Extended Services for UAA (XSUAA) acts as the security broker, and how JWT tokens and Role Collections protect endpoints.',
    learningObjectives: [
      'Distinguish between Authentication ("Who are you?") and Authorization ("What are you allowed to do?").',
      'Explain the purpose of SAP BTP XSUAA and the OAuth 2.0 authorization framework.',
      'Inspect a JSON Web Token (JWT) structure: header, payload scopes, and digital signature.',
    ],
    analogy: {
      concept: 'AuthN vs AuthZ',
      analogy: 'Airport Passport Control vs Boarding Gate Passports',
      explanation:
        '1. Authentication (AuthN): You present your passport to border control. They verify your photo and confirm: "You are indeed Alex Smith." 2. Authorization (AuthZ): You walk to the boarding gate for Flight 402. The gate agent doesn\'t care what your passport looks like; they scan your boarding pass to check: "Does this ticket grant you access to Business Class on this specific flight?" If your ticket says Economy, you are blocked from the cockpit and First Class lounge.',
      transition:
        'In SAP BTP, your corporate login (Azure AD, Okta, SAP Identity) handles Authentication; XSUAA encodes your business permissions (Roles & Scopes) into a signed JWT token that every microservice verifies.',
    },
    conceptExplanation: {
      whatItIs:
        'SAP BTP Extended Services for User Account and Authentication (XSUAA) is SAP’s enterprise identity and authorization broker based on Cloud Foundry UAA and OAuth 2.0 standards.',
      whyItExists:
        'In a microservice architecture with 20 backend services, each service cannot independently ask users for passwords or query corporate LDAP directories on every HTTP request.',
      problemSolved:
        'Enables stateless, cryptographically secure Single Sign-On (SSO) with fine-grained Role-Based Access Control (RBAC).',
      howItWorks:
        'A user logs in once at the Approuter. XSUAA issues an encrypted, digitally signed JSON Web Token (JWT) containing the user’s identity and granted scopes (e.g. `LeaveApp.Approve`). Microservices inspect the token’s cryptographic signature and authorize requests without calling the auth server.',
      btpFit:
        'Every production application on SAP BTP binds to an XSUAA service instance configured via `xs-security.json`.',
    },
    diagramType: 'xsuaa-oauth',
    jargonTerms: [
      {
        term: 'Authentication (AuthN)',
        simpleMeaning: 'Verifying the identity of the user ("Who are you?").',
        familiarEquivalent: 'Logging in with your email and password / FaceID.',
      },
      {
        term: 'Authorization (AuthZ)',
        simpleMeaning: 'Checking what resources or actions the user is allowed to perform.',
        familiarEquivalent: 'Checking if your badge can open the server room door.',
      },
      {
        term: 'XSUAA',
        simpleMeaning: 'SAP BTP’s OAuth 2.0 authorization server that issues signed JWT security tokens.',
        familiarEquivalent: 'Auth0, Keycloak, or AWS Cognito for SAP BTP.',
      },
      {
        term: 'Role Collection',
        simpleMeaning: 'A bundle of business roles assigned to user groups in the BTP Cockpit.',
        familiarEquivalent: 'An Active Directory / Okta security group like "Finance_Managers".',
      },
    ],
    technicalExample: {
      title: 'Configuring Scopes and Roles in `xs-security.json`',
      language: 'json',
      code: `{
  "xsappname": "leave-management-app",
  "tenant-mode": "dedicated",
  "scopes": [
    {
      "name": "$XSAPPNAME.LeaveViewer",
      "description": "View employee leave requests"
    },
    {
      "name": "$XSAPPNAME.LeaveApprover",
      "description": "Approve or reject leave requests"
    }
  ],
  "role-templates": [
    {
      "name": "ManagerRole",
      "description": "Can view and approve employee leave",
      "scope-references": [
        "$XSAPPNAME.LeaveViewer",
        "$XSAPPNAME.LeaveApprover"
      ]
    }
  ]
}`,
      purpose:
        'Defines fine-grained permission scopes and aggregates them into business role templates that administrators assign to users.',
      lineExplanations: [
        { lines: '4-13', explanation: 'Scopes: Atomic permission units (Read permission vs Write/Approve permission).' },
        { lines: '14-23', explanation: 'Role Templates: Packages scopes together for assignable business roles.' },
      ],
      expectedOutput:
        'Provisions an XSUAA service instance that validates incoming JWT bearer tokens against these scopes.',
      commonMistakes: [
        'Granting full administrative scopes to general viewer users.',
        'Hardcoding user email addresses in backend JavaScript instead of checking generic scopes.',
      ],
    },
    businessScenario: {
      title: 'Preventing Unauthorized Expense Approvals',
      context:
        'A junior employee attempts to send an HTTP POST request to approve their own $5,000 corporate reimbursement.',
      workflowSteps: [
        'Employee logs into BTP; their JWT token contains only the scope `Expense.Submit`.',
        'Employee attempts to invoke the REST endpoint `POST /odata/v4/expense/Approve`.',
        'CAP microservice checks the token: required scope `Expense.Approve` is absent.',
        'Microservice immediately aborts with HTTP 403 Forbidden without executing database logic.',
      ],
      businessImpact:
        'Prevents internal fraud and satisfies international Sarbanes-Oxley (SOX) audit regulations.',
    },
    quizQuestions: [
      {
        id: 'q-3-1-1',
        question: 'What is the fundamental difference between Authentication and Authorization?',
        options: [
          {
            id: 'opt-a',
            text: 'Authentication verifies identity ("Who are you?"), while Authorization checks permissions ("What are you allowed to do?").',
            isCorrect: true,
            explanation: 'Correct! Logging in is authentication; checking if you can approve an invoice is authorization.',
          },
          {
            id: 'opt-b',
            text: 'Authentication is for mobile phones; Authorization is for desktop laptops.',
            isCorrect: false,
            explanation: 'Both concepts apply across all device types and platforms.',
          },
          {
            id: 'opt-c',
            text: 'They are synonyms that mean the exact same thing.',
            isCorrect: false,
            explanation: 'They represent two completely distinct security layers.',
          },
          {
            id: 'opt-d',
            text: 'Authentication is optional; Authorization is never used.',
            isCorrect: false,
            explanation: 'Both are strictly required in enterprise security architectures.',
          },
        ],
      },
      {
        id: 'q-3-1-2',
        question: 'What does a backend CAP microservice do when it receives a JWT bearer token from an incoming HTTP request?',
        options: [
          {
            id: 'opt-a',
            text: 'It sends the user’s password to a public forum.',
            isCorrect: false,
            explanation: 'Tokens do not contain passwords; they contain signed claims.',
          },
          {
            id: 'opt-b',
            text: 'It cryptographically verifies the token’s digital signature and checks whether the token’s `scope` array contains the required permissions.',
            isCorrect: true,
            explanation: 'Correct! If the signature is valid and the scope is present, the microservice fulfills the request.',
          },
          {
            id: 'opt-c',
            text: 'It deletes the user’s operating system.',
            isCorrect: false,
            explanation: 'Tokens are verified in memory.',
          },
          {
            id: 'opt-d',
            text: 'It ignores the token and lets anyone access all database tables.',
            isCorrect: false,
            explanation: 'Enterprise microservices reject requests lacking valid signed tokens.',
          },
        ],
      },
      {
        id: 'q-3-1-3',
        question: 'A logged-in employee receives an HTTP 403 Forbidden error when clicking "Approve Invoice". What is the root cause?',
        options: [
          {
            id: 'opt-a',
            text: 'The user’s password was incorrect.',
            isCorrect: false,
            explanation: 'An incorrect password produces an HTTP 401 Unauthorized during login, not a 403.',
          },
          {
            id: 'opt-b',
            text: 'The user is successfully authenticated, but lacks the necessary Role Collection / Scope required to approve invoices.',
            isCorrect: true,
            explanation: 'Correct! HTTP 403 Forbidden means the server knows who you are, but you are not permitted to execute this action.',
          },
          {
            id: 'opt-c',
            text: 'The database ran out of disk space.',
            isCorrect: false,
            explanation: 'Disk space issues produce HTTP 500 internal server errors, not 403.',
          },
          {
            id: 'opt-d',
            text: 'The internet cable was disconnected.',
            isCorrect: false,
            explanation: 'A disconnected cable produces a client network error, not an HTTP 403 status code from the server.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'AuthN verifies identity; AuthZ enforces fine-grained permission scopes.',
      'XSUAA is the OAuth 2.0 authorization server for SAP BTP issuing signed JWT tokens.',
      'Role Collections bundle roles in the BTP Cockpit for assignment to corporate user groups.',
    ],
    practicalActivity:
      'Inspect a decoded JWT token on jwt.io and locate the `user_name`, `exp` (expiration timestamp), and `scope` array.',
  },
  {
    id: 'ch-3-2',
    moduleId: 'module-3',
    order: 2,
    number: '3.2',
    title: 'BTP Destinations & SAP Cloud Connector',
    subtitle: 'Connecting cloud apps to on-premise ERPs without exposing firewall ports',
    estimatedMinutes: 9,
    summary:
      'Learn how the SAP BTP Destination Service eliminates hardcoded credentials, and how the SAP Cloud Connector establishes a secure outbound-only reverse TLS tunnel into on-premise corporate networks.',
    learningObjectives: [
      'Explain how the Destination Service separates connection configuration from application code.',
      'Understand how the SAP Cloud Connector establishes a reverse tunnel into on-premise firewalls.',
      'Configure virtual host mappings to hide internal network IP addresses from cloud applications.',
    ],
    analogy: {
      concept: 'Cloud Connector Reverse Tunnel',
      analogy: 'An Embassy Outbound Encrypted Phone Hotline',
      explanation:
        'Imagine a high-security embassy surrounded by blast walls with zero doors on the outside. Enemy spies cannot break in because there is no entrance. To communicate with headquarters, an authorized officer inside the building dials an outgoing encrypted satellite call to headquarters and keeps the line open. Headquarters sends messages back down that established line. The embassy never opens any inbound doors to the public.',
      transition:
        'The Cloud Connector runs inside the corporate data center. It initiates an outbound-only TLS tunnel to SAP BTP. Cloud apps talk to on-premise S/4HANA through this tunnel without corporate network admins having to open dangerous incoming firewall ports.',
    },
    conceptExplanation: {
      whatItIs:
        'The SAP BTP Destination Service stores target URLs, authentication credentials, and token configurations centrally. The SAP Cloud Connector is on-premise software providing secure communication between BTP and internal networks.',
      whyItExists:
        'Hardcoding URLs and passwords inside source code is a massive security hazard. Furthermore, enterprise security teams strictly prohibit opening inbound internet firewall ports into internal corporate SAP systems.',
      problemSolved:
        'Eliminates hardcoded credentials and enables hybrid cloud architectures without exposing internal enterprise data centers to public internet attacks.',
      howItWorks:
        'The Cloud Connector calls out to SAP BTP over port 443. When a BTP app queries a Destination named `S4_ONPREM`, BTP routes the request through the existing secure tunnel. The Cloud Connector maps the request to an internal virtual host.',
      btpFit:
        'Destinations and Cloud Connector are the foundational connectivity bridge enabling side-by-side BTP apps to extend on-premise S/4HANA and ECC systems.',
    },
    diagramType: 'cloud-connector-tunnel',
    jargonTerms: [
      {
        term: 'Destination Service',
        simpleMeaning: 'A managed cloud address book holding target system URLs and login credentials.',
        familiarEquivalent: 'An encrypted environment variable manager with automated OAuth2 token retrieval.',
      },
      {
        term: 'Cloud Connector',
        simpleMeaning: 'On-premise proxy that makes an outbound call to BTP so cloud apps can reach internal servers.',
        familiarEquivalent: 'Cloudflare Tunnel, ngrok, or an enterprise reverse SSH tunnel.',
      },
      {
        term: 'Virtual Host',
        simpleMeaning: 'A fake alias hostname shown to the cloud to disguise the internal server IP address.',
        familiarEquivalent: 'A nickname (e.g. `s4internal:44310`) hiding the real internal IP `10.14.2.89`.',
      },
    ],
    technicalExample: {
      title: 'Consuming an On-Premise Destination in a CAP Node.js Service',
      language: 'javascript',
      code: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  // Connect to an external on-premise service defined in package.json
  const s4Hana = await cds.connect.to('S4_ONPREMISE_DESTINATION');

  this.on('READ', 'ExternalPurchaseOrders', async (req) => {
    // CAP automatically queries Destination Service, retrieves credentials,
    // routes through Cloud Connector tunnel, and executes OData query!
    return s4Hana.run(
      SELECT.from('API_PURCHASEORDER_PROCESS_SRV.A_PurchaseOrder')
        .where({ CompanyCode: '1010' })
        .limit(10)
    );
  });
});`,
      purpose:
        'Shows how developers connect to complex on-premise enterprise backends with simple, clean code without manually configuring SSL certificates or socket tunnels.',
      lineExplanations: [
        { lines: '5', explanation: '`cds.connect.to()` binds to the destination name registered in the BTP Subaccount.' },
        { lines: '10-14', explanation: 'Queries the external S/4HANA OData service as if it were a local database table.' },
      ],
      expectedOutput:
        'Returns 10 purchase orders from internal on-premise ERP over the encrypted Cloud Connector tunnel.',
      commonMistakes: [
        'Attempting to reach an internal IP address (like `192.168.1.50`) directly from cloud code without Cloud Connector.',
        'Hardcoding basic authentication passwords in source code instead of using Destination Service.',
      ],
    },
    businessScenario: {
      title: 'Real-Time Inventory Check for Field Technicians',
      context:
        'A field service technician repairing an industrial wind turbine needs to check spare parts availability in an on-premise factory warehouse.',
      workflowSteps: [
        'Technician opens mobile app on BTP and searches for part SKU "TURBINE-VALVE-01".',
        'BTP app queries Destination `FACTORY_WAREHOUSE_DEST`.',
        'Request travels through Cloud Connector tunnel into internal factory network.',
        'Internal S/4HANA responds: "14 units available in Storage Bin B-4".',
      ],
      businessImpact:
        'Technician gets instant inventory answers in the field without the factory ever exposing its private intranet to the internet.',
    },
    quizQuestions: [
      {
        id: 'q-3-2-1',
        question: 'Why does the SAP Cloud Connector establish an "outbound" connection from on-premise to BTP instead of an inbound one?',
        options: [
          {
            id: 'opt-a',
            text: 'Because outbound connections do not require opening dangerous incoming ports in the corporate firewall.',
            isCorrect: true,
            explanation: 'Correct! Opening inbound firewall ports exposes enterprise networks to public port scans and hacking attempts.',
          },
          {
            id: 'opt-b',
            text: 'Because inbound cables are physically heavier than outbound cables.',
            isCorrect: false,
            explanation: 'Network direction is a software firewall concept, not cable weight.',
          },
          {
            id: 'opt-c',
            text: 'Because on-premise servers cannot receive internet traffic.',
            isCorrect: false,
            explanation: 'Servers can receive traffic if permitted, but doing so compromises network perimeter security.',
          },
          {
            id: 'opt-d',
            text: 'To make the internet run backwards.',
            isCorrect: false,
            explanation: 'It is a standard reverse tunnel security pattern.',
          },
        ],
      },
      {
        id: 'q-3-2-2',
        question: 'What is the primary benefit of using the SAP BTP Destination Service?',
        options: [
          {
            id: 'opt-a',
            text: 'It provides free plane tickets to developers.',
            isCorrect: false,
            explanation: 'The name refers to network destinations, not airline travel.',
          },
          {
            id: 'opt-b',
            text: 'It centralizes connection URLs, proxy settings, and credentials, eliminating hardcoded passwords from source code.',
            isCorrect: true,
            explanation: 'Correct! Centralizing connection configurations keeps credentials out of source repositories.',
          },
          {
            id: 'opt-c',
            text: 'It automatically translates English code into Latin.',
            isCorrect: false,
            explanation: 'It manages network endpoint configurations.',
          },
          {
            id: 'opt-d',
            text: 'It shuts down the database when memory reaches 50%.',
            isCorrect: false,
            explanation: 'It has nothing to do with database memory management.',
          },
        ],
      },
      {
        id: 'q-3-2-3',
        question: 'What is a "Virtual Host" in the context of the SAP Cloud Connector?',
        options: [
          {
            id: 'opt-a',
            text: 'A video game host presenting an esports tournament.',
            isCorrect: false,
            explanation: 'Virtual host is a network proxy term.',
          },
          {
            id: 'opt-b',
            text: 'An alias hostname configured on BTP that masks and protects the real internal IP address and port of the on-premise server.',
            isCorrect: true,
            explanation: 'Correct! Cloud applications only see the virtual host name; the Cloud Connector maps it internally to the private server.',
          },
          {
            id: 'opt-c',
            text: 'A computer that does not physically exist anywhere in the world.',
            isCorrect: false,
            explanation: 'Virtual hosts point to physical or virtual backend servers.',
          },
          {
            id: 'opt-d',
            text: 'A broken network link that cannot transmit data.',
            isCorrect: false,
            explanation: 'Virtual hosts actively route network packets.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'Destination Service abstracts connection URLs and credentials away from application code.',
      'Cloud Connector creates an outbound-only reverse TLS tunnel protecting corporate firewalls.',
      'Virtual host mapping disguises internal server network topology from cloud applications.',
    ],
    practicalActivity:
      'Outline the network path taken by an HTTP request starting from a Fiori browser app on BTP down to an on-premise SAP ECC system.',
  },
  {
    id: 'ch-3-3',
    moduleId: 'module-3',
    order: 3,
    number: '3.3',
    title: 'Event-Driven Integration & SAP Event Mesh',
    subtitle: 'Decoupling enterprise applications with real-time asynchronous messaging',
    estimatedMinutes: 8,
    summary:
      'Discover asynchronous event-driven architecture (EDA). Learn how SAP Event Mesh decouples systems using publish-subscribe messaging, topics, and guaranteed queue buffering.',
    learningObjectives: [
      'Contrast synchronous REST API calls with asynchronous event-driven messaging.',
      'Explain the Publish-Subscribe (Pub/Sub) pattern, topics, and message queues.',
      'Understand how SAP Event Mesh ensures zero message loss even when consumer systems are offline.',
    ],
    analogy: {
      concept: 'Synchronous REST vs Asynchronous Pub/Sub',
      analogy: 'Phone Calls vs Newspaper Subscriptions',
      explanation:
        'Synchronous REST is like calling a restaurant on the phone: you dial the number and hold the phone to your ear, blocked from doing anything else until someone answers. If their line is busy, your call fails. Asynchronous Pub/Sub is like a morning newspaper subscription: the printing press publishes articles once. Delivery agents drop copies into 500 mailboxes. Subscribers read the paper whenever they wake up. If a subscriber is asleep, the newspaper waits safely in their mailbox without disappearing.',
      transition:
        'In enterprise systems, SAP Event Mesh is the high-speed postal delivery service: when an order is created, an event is emitted once, and multiple cloud apps consume it at their own pace.',
    },
    conceptExplanation: {
      whatItIs:
        'SAP Event Mesh and SAP Integration Suite form the core integration backbone of SAP BTP. While Event Mesh manages asynchronous publish-subscribe messaging and CloudEvents, SAP Integration Suite (Cloud Integration / CPI) orchestrates enterprise Integration Flows (iFlows), converts message formats (like XML, EDI, and JSON), securely publishes REST APIs via API Management, and connects to hundreds of third-party SaaS platforms through Open Connectors.',
      whyItExists:
        'Large enterprises connect hundreds of disparate systems (SAP S/4HANA, Salesforce, Workday, government tax authorities). Direct point-to-point connections create an unmaintainable "spaghetti architecture". Integration Suite and Event Mesh provide standardized, governed pipelines.',
      problemSolved:
        'Decouples high-volume transactional systems from downstream processors and guarantees zero message loss through durable queue buffering.',
      howItWorks:
        'Producers publish lightweight event notifications to "Topics" (e.g. `sap/s4/order/created`). Consumers bind "Queues" to those topics. Event Mesh delivers messages to queues where they sit safely until consumers acknowledge processing (`ACK`).',
      btpFit:
        'Event Mesh is the central asynchronous nervous system connecting SAP S/4HANA, BTP microservices, third-party clouds, and serverless functions.',
    },
    diagramType: 'event-mesh-pubsub',
    jargonTerms: [
      {
        term: 'Event Mesh',
        simpleMeaning: 'A cloud message broker that routes events reliably between independent applications.',
        familiarEquivalent: 'Apache Kafka, RabbitMQ, or AWS EventBridge / SQS.',
      },
      {
        term: 'Publish-Subscribe (Pub/Sub)',
        simpleMeaning: 'Publishers broadcast events without knowing who or how many consumers will read them.',
        familiarEquivalent: 'A YouTube channel posting a video; subscribers receive notification feeds automatically.',
      },
      {
        term: 'Queue Buffering',
        simpleMeaning: 'Storing unread messages in a queue until the consumer is ready to process them.',
        familiarEquivalent: 'An email inbox holding unread messages while you are on vacation.',
      },
    ],
    technicalExample: {
      title: 'Emitting and Consuming Events in SAP CAP (`srv/service.js`)',
      language: 'javascript',
      code: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  // Connect to SAP Event Mesh messaging service
  const messaging = await cds.connect.to('messaging');

  // 1. PUBLISHER: Emit an event when leave request is approved
  this.after('UPDATE', 'LeaveRequests', async (data) => {
    if (data.status === 'APPROVED') {
      await messaging.emit('sap/launchpad/leave/approved', {
        requestId: data.ID,
        employeeEmail: data.employee_email,
        daysApproved: data.daysCount,
        timestamp: new Date().toISOString()
      });
    }
  });

  // 2. SUBSCRIBER: Listen to the event from another microservice
  messaging.on('sap/launchpad/leave/approved', async (msg) => {
    const { employeeEmail, daysApproved } = msg.data;
    console.log(\`[NOTIFICATION SERVICE] Sending calendar invite to \${employeeEmail} for \${daysApproved} days.\`);
    // Acknowledge receipt
    msg.ack();
  });
});`,
      purpose:
        'Demonstrates how CAP makes emitting and listening to asynchronous enterprise events as simple as standard JavaScript event listeners.',
      lineExplanations: [
        { lines: '5', explanation: 'Connects to BTP Event Mesh using the standard CAP messaging interface.' },
        { lines: '9-17', explanation: 'Publishes an event topic payload when a leave request status changes to APPROVED.' },
        { lines: '20-25', explanation: 'Decoupled subscriber listens to the topic and executes side effects asynchronously.' },
      ],
      expectedOutput:
        'Leave status is saved instantly without waiting for the notification service; event is delivered asynchronously to the queue.',
      commonMistakes: [
        'Sending 10MB file payloads inside an event message; events should be lightweight notifications containing IDs and timestamps.',
        'Using synchronous HTTP calls for operations that can easily be processed asynchronously in the background.',
      ],
    },
    businessScenario: {
      title: 'Black Friday E-Commerce Flash Sale Resiliency',
      context:
        'During a flash sale, 10,000 customers place orders in 60 seconds. Downstream invoice PDF generation and shipping email systems are slow.',
      workflowSteps: [
        'E-commerce order system writes order to database and emits `OrderCreated` to SAP Event Mesh.',
        'Order system responds to customer immediately: "Order Placed Successfully!".',
        'Event Mesh queues 10,000 messages safely.',
        'Shipping and invoice services process messages from the queue at a steady, sustainable pace over the next 15 minutes without crashing.',
      ],
      businessImpact:
        'The customer-facing storefront experiences zero lag or 504 timeouts, preventing lost shopping cart revenue.',
    },
    quizQuestions: [
      {
        id: 'q-3-3-1',
        question: 'What is the main danger of using synchronous REST calls for all inter-system communications during high volume?',
        options: [
          {
            id: 'opt-a',
            text: 'If a downstream system slows down or fails, the upstream application freezes, times out, and crashes.',
            isCorrect: true,
            explanation: 'Correct! Synchronous calls tightly couple systems; a bottleneck in one causes cascading failures everywhere.',
          },
          {
            id: 'opt-b',
            text: 'REST calls delete the user’s computer monitor font.',
            isCorrect: false,
            explanation: 'REST calls transmit HTTP data; they have no effect on monitor fonts.',
          },
          {
            id: 'opt-c',
            text: 'Synchronous calls run too quickly for computers to handle.',
            isCorrect: false,
            explanation: 'Synchronous calls block execution, creating latency and timeouts.',
          },
          {
            id: 'opt-d',
            text: 'REST calls can only transmit text in French.',
            isCorrect: false,
            explanation: 'REST calls transmit data in any language.',
          },
        ],
      },
      {
        id: 'q-3-3-2',
        question: 'What happens in SAP Event Mesh if a subscriber microservice crashes while an event is emitted?',
        options: [
          {
            id: 'opt-a',
            text: 'The event message is permanently destroyed and cannot be recovered.',
            isCorrect: false,
            explanation: 'Event Mesh uses durable queues that prevent message loss.',
          },
          {
            id: 'opt-b',
            text: 'The event is stored safely in the consumer’s durable queue and delivered the moment the subscriber microservice restarts.',
            isCorrect: true,
            explanation: 'Correct! Guaranteed queue buffering ensures no enterprise messages are lost during downstream downtime.',
          },
          {
            id: 'opt-c',
            text: 'The publisher application is immediately uninstalled.',
            isCorrect: false,
            explanation: 'Publishers continue running unaffected by subscriber health.',
          },
          {
            id: 'opt-d',
            text: 'The cloud bill triples in price automatically.',
            isCorrect: false,
            explanation: 'Queue storage is a standard, predictable feature of Event Mesh.',
          },
        ],
      },
      {
        id: 'q-3-3-3',
        question: 'What is the recommended size and content of an enterprise event message payload?',
        options: [
          {
            id: 'opt-a',
            text: 'A lightweight notification containing entity IDs, status change, and timestamps (typically a few kilobytes).',
            isCorrect: true,
            explanation: 'Correct! Event notifications should be lightweight; consumers fetch deep data via OData if needed.',
          },
          {
            id: 'opt-b',
            text: 'A full 500MB binary dump of the entire database.',
            isCorrect: false,
            explanation: 'Giant payloads clog message brokers and degrade network throughput.',
          },
          {
            id: 'opt-c',
            text: 'An uncompressed high-definition video recording.',
            isCorrect: false,
            explanation: 'Event brokers are designed for structured JSON business events, not video streaming.',
          },
          {
            id: 'opt-d',
            text: 'An empty message with zero characters.',
            isCorrect: false,
            explanation: 'Messages need sufficient metadata (like entity ID) so consumers understand what occurred.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'Asynchronous Event-Driven Architecture decouples publishers from consumers.',
      'SAP Event Mesh buffers messages in durable queues, ensuring zero message loss during downtime.',
      'Lightweight event notifications inform downstream microservices to take action at their own pace.',
    ],
    practicalActivity:
      'Design an event-driven flow where an S/4HANA "Customer Created" event triggers automated CRM record setup, marketing email, and credit score checks.',
  },
];
