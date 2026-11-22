import { IndependentChallenge } from '../../types/practice';

export const INDEPENDENT_CHALLENGES: IndependentChallenge[] = [
  {
    id: 'challenge-multi-tenant-isolation',
    title: 'Multi-Tenant Data Isolation Pattern',
    difficulty: 'advanced',
    category: 'cds',
    scenario:
      'You are the lead architect for an enterprise SaaS solution deployed on SAP BTP. Multiple client corporations (tenants) share the same application runtime, but their transactional data must be strictly isolated at the database layer.',
    requirements: [
      'Define a CDS schema in namespace sap.launchpad.saas;',
      'Model an entity TenantClients with key tenantId : String(36) and clientName : String(100);',
      'Model an entity Invoices with key ID : UUID, tenant : Association to TenantClients, invoiceNumber : String(30), and amount : Decimal(12, 2);',
      'Define a CDS service projection MyInvoices that enforces tenant discrimination by filtering invoices where tenant.tenantId = $user.tenant;',
    ],
    starterCode: `namespace sap.launchpad.saas;

// Define TenantClients, Invoices, and the secure MyInvoices projection
entity TenantClients {
  // Define tenant key and company name
}

entity Invoices {
  // Define invoices with tenant association
}
`,
    solutionCode: `namespace sap.launchpad.saas;

entity TenantClients {
  key tenantId   : String(36);
  clientName     : String(100);
}

entity Invoices {
  key ID         : UUID;
  invoiceNumber  : String(30);
  amount         : Decimal(12, 2);
  tenant         : Association to TenantClients;
}
`,
    hints: [
      'In multi-tenant CAP architectures, either HDI container-per-tenant or schema discriminator columns with $user.tenant views are used.',
      'Ensure the tenant relationship is modeled as an Association to TenantClients.',
    ],
    evaluationCriteria: [
      'Accurate primary key assignment on tenantId and ID',
      'Association linking transactional data directly to the tenant master',
      'Adherence to SAP multi-tenant separation best practices',
    ],
    validationRules: [
      {
        id: 'has-tenant-clients',
        description: 'Defines TenantClients with key tenantId',
        test: (code) => /entity\s+TenantClients\s*\{[\s\S]*key\s+tenantId/i.test(code),
      },
      {
        id: 'has-invoices-with-tenant',
        description: 'Defines Invoices with tenant Association',
        test: (code) => /entity\s+Invoices\s*\{[\s\S]*tenant\s*:\s*Association\s+to\s+TenantClients/i.test(code),
      },
    ],
    explanation:
      'In multi-tenant SaaS applications on SAP BTP, tenant isolation can be implemented either at the database level (separate HDI containers per subscriber) or at the application level using CDS views parameterized with $user.tenant extracted from the subscriber JWT token.',
  },
  {
    id: 'challenge-event-mesh-retry',
    title: 'Idempotent Event Mesh Consumer with Dead-Lettering',
    difficulty: 'advanced',
    category: 'debugging',
    scenario:
      'In an asynchronous event-driven architecture using SAP Event Mesh, external billing events may arrive out-of-order or be delivered more than once (at-least-once delivery semantics). Your service must guarantee idempotent processing and route unrecoverable failures to a dead-letter queue.',
    requirements: [
      'Implement an event handler for topic "sap/s4/ce/billing/v1/InvoiceCreated".',
      'Extract eventId from the incoming event message.',
      'Check if eventId has already been recorded in ProcessedEvents. If yes, log a warning and return early without reprocessing.',
      'Wrap processing in a try/catch block. If processing fails repeatedly after max retries, route to a Dead-Letter Queue (DLQ).',
    ],
    starterCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const messaging = await cds.connect.to('messaging');

  messaging.on('sap/s4/ce/billing/v1/InvoiceCreated', async (msg) => {
    const { eventId, invoiceId } = msg.data;

    // TODO: Implement idempotency check using ProcessedEvents
    // TODO: Process event and record eventId in ProcessedEvents
  });
});
`,
    solutionCode: `const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const messaging = await cds.connect.to('messaging');

  messaging.on('sap/s4/ce/billing/v1/InvoiceCreated', async (msg) => {
    const { eventId, invoiceId } = msg.data;

    // Idempotency verification
    const existing = await SELECT.one.from('ProcessedEvents').where({ eventId });
    if (existing) {
      console.warn(\`Duplicate event \${eventId} ignored.\`);
      return;
    }

    try {
      await INSERT.into('ProcessedEvents').entries({ eventId, processedAt: new Date().toISOString() });
      // Process business transaction for invoiceId
    } catch (err) {
      console.error(\`Failed to process event \${eventId}\`, err);
      // Route to dead letter or rethrow for retry
    }
  });
});
`,
    hints: [
      'In messaging, idempotency means f(f(x)) = f(x). Always track a table of processed unique event IDs.',
      'Never assume messages arrive exactly once; cloud message brokers guarantee at-least-once delivery.',
    ],
    evaluationCriteria: [
      'Checks ProcessedEvents table prior to executing business mutations',
      'Records processed events atomically',
      'Handles errors gracefully without crashing the Node.js event loop',
    ],
    validationRules: [
      {
        id: 'checks-existing-event',
        description: 'Performs SELECT.one on ProcessedEvents by eventId',
        test: (code) => /SELECT\.one\.from\(['"]ProcessedEvents['"]\)/i.test(code) && /eventId/i.test(code),
      },
      {
        id: 'inserts-processed-event',
        description: 'Records eventId in ProcessedEvents table',
        test: (code) => /INSERT\.into\(['"]ProcessedEvents['"]\)/i.test(code),
      },
    ],
    explanation:
      'SAP Event Mesh implements standard CloudEvents 1.0 protocols. Because cloud network partitions can cause message re-delivery, building idempotent consumers is an enterprise engineering requirement.',
  },
  {
    id: 'challenge-xsuaa-role-design',
    title: 'Enterprise Multi-Tier RBAC Architecture',
    difficulty: 'advanced',
    category: 'security',
    scenario:
      'Design an enterprise authorization structure for a global operations dashboard where Regional Managers can view only their respective countries, while Global Administrators have unrestricted access.',
    requirements: [
      'Configure xs-security.json with an attribute definition for "Country".',
      'Define scope "$XSAPPNAME.DashboardViewer".',
      'Define role template "DashboardViewerRole" referencing scope "$XSAPPNAME.DashboardViewer".',
      'Bind the "Country" attribute to the role template with valueType: "string".',
    ],
    starterCode: `{
  "xsappname": "operations-dashboard",
  "attributes": [
    // Define Country attribute
  ],
  "scopes": [
    // Define DashboardViewer scope
  ],
  "role-templates": [
    // Define DashboardViewerRole with attribute reference
  ]
}`,
    solutionCode: `{
  "xsappname": "operations-dashboard",
  "attributes": [
    {
      "name": "Country",
      "description": "User assigned geographic country code",
      "valueType": "string"
    }
  ],
  "scopes": [
    {
      "name": "$XSAPPNAME.DashboardViewer",
      "description": "Access operations dashboard"
    }
  ],
  "role-templates": [
    {
      "name": "DashboardViewerRole",
      "description": "Regional viewer role",
      "scope-references": ["$XSAPPNAME.DashboardViewer"],
      "attribute-references": ["Country"]
    }
  ]
}`,
    hints: [
      'Role attributes in XSUAA enable Row-Level Security (RLS) in SAP CAP without hardcoding country codes into scopes.',
    ],
    evaluationCriteria: [
      'Properly configures dynamic attributes in xs-security.json',
      'References attributes inside role templates',
      'Enables attribute-based access control (ABAC)',
    ],
    validationRules: [
      {
        id: 'has-country-attribute',
        description: 'Defines Country attribute in xs-security.json',
        test: (code) => /"name"\s*:\s*"Country"/i.test(code) && /"valueType"\s*:\s*"string"/i.test(code),
      },
      {
        id: 'has-attribute-reference',
        description: 'References Country in attribute-references array',
        test: (code) => /"attribute-references"\s*:\s*\[[\s\S]*"Country"[\s\S]*\]/i.test(code),
      },
    ],
    explanation:
      'Attribute-Based Access Control (ABAC) in SAP BTP allows an enterprise to maintain a single role template while customizing access per user (e.g. User A has Country=DE, User B has Country=US) via SAML/OIDC identity federation.',
  },
];
