import { ConnectionType } from '../../types/designLab';

export interface ValidConnectionRule {
  sourceType: string;
  targetType: string;
  connectionType: ConnectionType;
  label: string;
  description: string;
  requiresReverse?: boolean;
}

/**
 * Authoritative connection rule registry.
 * Validates whether a connection between two component types is technically permitted in SAP BTP.
 */
export const VALID_CONNECTION_RULES: ValidConnectionRule[] = [
  // User/Browser connections
  {
    sourceType: 'user-browser',
    targetType: 'app-router',
    connectionType: 'http-route',
    label: 'HTTPS Inbound',
    description: 'Directs external user browser requests to the central App Router reverse proxy.',
  },
  {
    sourceType: 'user-browser',
    targetType: 'fiori-app',
    connectionType: 'http-route',
    label: 'UI Presentation',
    description: 'User browser renders the Fiori presentation bundle.',
  },

  // UI to App Router / Backend
  {
    sourceType: 'fiori-app',
    targetType: 'app-router',
    connectionType: 'http-route',
    label: 'HTML5 Route',
    description: 'Serves static Fiori web assets through the App Router.',
  },
  {
    sourceType: 'ui5-app',
    targetType: 'app-router',
    connectionType: 'http-route',
    label: 'App Router Binding',
    description: 'Serves custom UI5 assets through the App Router.',
  },
  {
    sourceType: 'fiori-app',
    targetType: 'cap-service',
    connectionType: 'http-route',
    label: 'OData v4 Binding',
    description: 'Fiori Elements consumes OData services exposed by the CAP backend.',
  },
  {
    sourceType: 'ui5-app',
    targetType: 'cap-service',
    connectionType: 'http-route',
    label: 'OData API Call',
    description: 'Freestyle UI5 consumes business entities from the CAP backend.',
  },

  // App Router connections
  {
    sourceType: 'app-router',
    targetType: 'cap-service',
    connectionType: 'http-route',
    label: 'API Forwarding',
    description: 'App Router proxies authenticated API requests to the CAP service with user token.',
  },
  {
    sourceType: 'app-router',
    targetType: 'xsuaa',
    connectionType: 'service-binding',
    label: 'XSUAA Auth Binding',
    description: 'App Router binds to XSUAA for OAuth 2.0 user login and session cookie management.',
  },
  {
    sourceType: 'app-router',
    targetType: 'node-service',
    connectionType: 'http-route',
    label: 'Custom Route Forward',
    description: 'App Router forwards designated routes to a custom Node.js microservice.',
  },

  // CAP Service connections
  {
    sourceType: 'cap-service',
    targetType: 'hana-cloud',
    connectionType: 'persistence',
    label: 'HDI Persistence',
    description: 'CAP service binds to an SAP HANA Cloud HDI Container for transactional SQL storage.',
  },
  {
    sourceType: 'cap-service',
    targetType: 'sqlite',
    connectionType: 'persistence',
    label: 'Local SQLite File',
    description: 'CAP service connects to local SQLite for rapid prototyping (dev profile only).',
  },
  {
    sourceType: 'cap-service',
    targetType: 'xsuaa',
    connectionType: 'service-binding',
    label: 'Security Binding',
    description: 'CAP service inspects XSUAA JWT tokens to enforce @restrict and @requires authorizations.',
  },
  {
    sourceType: 'cap-service',
    targetType: 'destination-service',
    connectionType: 'service-binding',
    label: 'Destination Binding',
    description: 'CAP service requests target endpoint credentials from Destination Service.',
  },

  // Node Service connections
  {
    sourceType: 'node-service',
    targetType: 'xsuaa',
    connectionType: 'service-binding',
    label: 'Token Verification',
    description: 'Node.js microservice binds to XSUAA to validate incoming bearer tokens.',
  },

  // Security connections
  {
    sourceType: 'role-scope-config',
    targetType: 'xsuaa',
    connectionType: 'service-binding',
    label: 'Policy Declaration',
    description: 'Applies role templates and scope definitions to the XSUAA configuration.',
  },

  // Destination & Connectivity Service connections
  {
    sourceType: 'destination-service',
    targetType: 'connectivity-service',
    connectionType: 'connectivity-tunnel',
    label: 'Tunnel Association',
    description: 'Destination Service uses Connectivity Service to route through Cloud Connector.',
  },
  {
    sourceType: 'destination-service',
    targetType: 'external-api',
    connectionType: 'data-sync',
    label: 'Remote Target',
    description: 'Destination Service routes requests to an external SaaS API.',
  },
  {
    sourceType: 'destination-service',
    targetType: 'external-system',
    connectionType: 'data-sync',
    label: 'Enterprise Target',
    description: 'Destination Service connects to a core S/4HANA or ECC system.',
  },
  {
    sourceType: 'connectivity-service',
    targetType: 'external-system',
    connectionType: 'connectivity-tunnel',
    label: 'Cloud Connector Tunnel',
    description: 'Establishes reverse tunnel to on-premise firewall.',
  },
];

/**
 * Checks if a connection between source and target component types is valid.
 */
export function isValidConnection(sourceType: string, targetType: string): ValidConnectionRule | undefined {
  return VALID_CONNECTION_RULES.find(
    (rule) => rule.sourceType === sourceType && rule.targetType === targetType
  );
}

/**
 * Checks whether the connection violates enterprise security (e.g. Browser -> Database direct bypass).
 */
export function isForbiddenConnection(sourceType: string, targetType: string): { forbidden: boolean; reason?: string } {
  if (sourceType === 'user-browser' && (targetType === 'hana-cloud' || targetType === 'sqlite')) {
    return {
      forbidden: true,
      reason:
        'CRITICAL SECURITY VIOLATION: A web browser cannot connect directly to a database without an intermediate application service to enforce authentication and input validation.',
    };
  }

  if (sourceType === 'user-browser' && targetType === 'destination-service') {
    return {
      forbidden: true,
      reason:
        'SECURITY VIOLATION: Browsers cannot bind to Destination Service directly. Destination secrets must be resolved server-side.',
    };
  }

  if (sourceType === 'fiori-app' && (targetType === 'hana-cloud' || targetType === 'sqlite')) {
    return {
      forbidden: true,
      reason:
        'ARCHITECTURE VIOLATION: SAP Fiori frontend applications cannot connect directly to databases; they must consume OData services exposed by a backend layer (CAP).',
    };
  }

  if (sourceType === 'hana-cloud' || sourceType === 'sqlite') {
    return {
      forbidden: true,
      reason:
        'INVALID DIRECTION: Database persistence components do not initiate outbound connections to client tiers.',
    };
  }

  return { forbidden: false };
}
