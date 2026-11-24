import { Blueprint, DeploymentProfile, DeploymentProfileId } from '../../types/designLab';

export const DEPLOYMENT_PROFILES: Record<DeploymentProfileId, DeploymentProfile> = {
  'cf-cap-hana': {
    id: 'cf-cap-hana',
    title: 'Cloud Foundry: CAP + SAP HANA Cloud',
    description:
      'Standard production architecture for transactional enterprise backends with HDI container persistence, App Router entrypoint, and XSUAA security.',
    targetRuntime: 'Cloud Foundry',
    recommendedComponents: ['user-browser', 'app-router', 'cap-service', 'xsuaa', 'hana-cloud'],
    requiredModules: ['approuter', 'srv'],
    requiredResources: ['xsuaa', 'hdi-db'],
    mtaSchemaVersion: '3.1.0',
  },
  'cf-fiori-cap-hana': {
    id: 'cf-fiori-cap-hana',
    title: 'Cloud Foundry: Fiori Elements + CAP + HANA',
    description:
      'Full-stack enterprise solution with modern Fiori UI, App Router reverse proxy, CAP OData v4 backend, and HANA database persistence.',
    targetRuntime: 'Cloud Foundry',
    recommendedComponents: [
      'user-browser',
      'fiori-app',
      'app-router',
      'cap-service',
      'xsuaa',
      'hana-cloud',
    ],
    requiredModules: ['approuter', 'srv', 'fiori-app-deployer'],
    requiredResources: ['xsuaa', 'hdi-db', 'html5-repo-host'],
    mtaSchemaVersion: '3.1.0',
  },
  'cf-cap-destination-api': {
    id: 'cf-cap-destination-api',
    title: 'Cloud Foundry: CAP + Destination / External API',
    description:
      'Side-by-side extension architecture consuming external APIs or remote ERP systems via SAP Destination Service.',
    targetRuntime: 'Cloud Foundry',
    recommendedComponents: [
      'user-browser',
      'app-router',
      'cap-service',
      'xsuaa',
      'destination-service',
      'external-api',
    ],
    requiredModules: ['approuter', 'srv'],
    requiredResources: ['xsuaa', 'destination-service'],
    mtaSchemaVersion: '3.1.0',
  },
  'standalone-dev': {
    id: 'standalone-dev',
    title: 'Local Standalone Development (SQLite Mocking)',
    description:
      'Rapid offline developer sandbox with embedded SQLite file storage. Not eligible for Cloud Foundry production MTA deployment.',
    targetRuntime: 'Local Development',
    recommendedComponents: ['user-browser', 'cap-service', 'sqlite'],
    requiredModules: ['srv'],
    requiredResources: [],
    mtaSchemaVersion: '3.1.0',
  },
};

export function getDeploymentProfile(id?: DeploymentProfileId): DeploymentProfile {
  if (id && DEPLOYMENT_PROFILES[id]) {
    return DEPLOYMENT_PROFILES[id];
  }
  return DEPLOYMENT_PROFILES['cf-cap-hana'];
}

/**
 * Acceptance Blueprint 1: Basic CAP + HANA Application
 * Logical Flow: User/Browser -> App Router -> CAP Service -> SAP HANA Cloud + XSUAA
 */
export const BLUEPRINT_1_CAP_HANA: Blueprint = {
  id: 'bp-1-cap-hana',
  schemaVersion: 1,
  name: 'Basic CAP + HANA Application',
  description:
    'Core transactional enterprise architecture with App Router entrypoint, CAP OData backend, SAP HANA Cloud HDI Container, and XSUAA authentication.',
  createdAt: '2026-11-24T10:00:00.000Z',
  updatedAt: '2026-11-24T10:00:00.000Z',
  deploymentProfile: 'cf-cap-hana',
  nodes: [
    {
      id: 'node-client-1',
      componentType: 'user-browser',
      label: 'User / Browser',
      position: { x: 50, y: 160 },
      configuration: {
        clientType: 'desktop-browser',
        expectedConcurrentUsers: 100,
      },
    },
    {
      id: 'node-router-1',
      componentType: 'app-router',
      label: 'App Router',
      customName: 'orders-approuter',
      position: { x: 280, y: 160 },
      configuration: {
        routerName: 'orders-approuter',
        authenticationMethod: 'route',
      },
    },
    {
      id: 'node-xsuaa-1',
      componentType: 'xsuaa',
      label: 'SAP XSUAA Service',
      customName: 'orders-uaa',
      position: { x: 280, y: 340 },
      configuration: {
        servicePlan: 'application',
        roleTemplateName: 'OrderViewer',
      },
    },
    {
      id: 'node-cap-1',
      componentType: 'cap-service',
      label: 'SAP CAP Service',
      customName: 'orders-srv',
      position: { x: 540, y: 160 },
      configuration: {
        serviceName: 'orders-srv',
        memoryLimit: '512M',
      },
    },
    {
      id: 'node-hana-1',
      componentType: 'hana-cloud',
      label: 'SAP HANA Cloud',
      customName: 'orders-db',
      position: { x: 800, y: 160 },
      configuration: {
        hdiContainerName: 'orders-db-hdi',
        servicePlan: 'hdi-shared',
      },
    },
  ],
  edges: [
    {
      id: 'edge-client-router',
      sourceNodeId: 'node-client-1',
      targetNodeId: 'node-router-1',
      connectionType: 'http-route',
      label: 'HTTPS Inbound',
    },
    {
      id: 'edge-router-xsuaa',
      sourceNodeId: 'node-router-1',
      targetNodeId: 'node-xsuaa-1',
      connectionType: 'service-binding',
      label: 'XSUAA Auth Binding',
    },
    {
      id: 'edge-router-cap',
      sourceNodeId: 'node-router-1',
      targetNodeId: 'node-cap-1',
      connectionType: 'http-route',
      label: 'API Forwarding',
    },
    {
      id: 'edge-cap-xsuaa',
      sourceNodeId: 'node-cap-1',
      targetNodeId: 'node-xsuaa-1',
      connectionType: 'service-binding',
      label: 'Security Binding',
    },
    {
      id: 'edge-cap-hana',
      sourceNodeId: 'node-cap-1',
      targetNodeId: 'node-hana-1',
      connectionType: 'persistence',
      label: 'HDI Persistence',
    },
  ],
};

/**
 * Acceptance Blueprint 2: Fiori + CAP Enterprise Application
 * Logical Flow: User/Browser -> Fiori App -> App Router -> CAP Service -> SAP HANA Cloud + XSUAA
 */
export const BLUEPRINT_2_FIORI_CAP_HANA: Blueprint = {
  id: 'bp-2-fiori-cap-hana',
  schemaVersion: 1,
  name: 'Fiori + CAP Enterprise Application',
  description:
    'Full-stack enterprise application with SAP Fiori Elements UI, App Router reverse proxy, CAP OData v4 microservice, SAP HANA Cloud persistence, and XSUAA OAuth 2.0 security.',
  createdAt: '2026-11-24T10:00:00.000Z',
  updatedAt: '2026-11-24T10:00:00.000Z',
  deploymentProfile: 'cf-fiori-cap-hana',
  nodes: [
    {
      id: 'node-client-2',
      componentType: 'user-browser',
      label: 'User / Browser',
      position: { x: 50, y: 160 },
      configuration: {
        clientType: 'desktop-browser',
        expectedConcurrentUsers: 250,
      },
    },
    {
      id: 'node-fiori-2',
      componentType: 'fiori-app',
      label: 'SAP Fiori Application',
      customName: 'manageorders',
      position: { x: 260, y: 60 },
      configuration: {
        appName: 'manageorders',
        floorplan: 'list-report-object-page',
      },
    },
    {
      id: 'node-router-2',
      componentType: 'app-router',
      label: 'App Router',
      customName: 'enterprise-approuter',
      position: { x: 260, y: 220 },
      configuration: {
        routerName: 'enterprise-approuter',
        authenticationMethod: 'route',
      },
    },
    {
      id: 'node-xsuaa-2',
      componentType: 'xsuaa',
      label: 'SAP XSUAA Service',
      customName: 'enterprise-uaa',
      position: { x: 260, y: 380 },
      configuration: {
        servicePlan: 'application',
        roleTemplateName: 'OrderAdmin',
      },
    },
    {
      id: 'node-cap-2',
      componentType: 'cap-service',
      label: 'SAP CAP Service',
      customName: 'enterprise-srv',
      position: { x: 540, y: 220 },
      configuration: {
        serviceName: 'enterprise-srv',
        memoryLimit: '512M',
      },
    },
    {
      id: 'node-hana-2',
      componentType: 'hana-cloud',
      label: 'SAP HANA Cloud',
      customName: 'enterprise-db',
      position: { x: 800, y: 220 },
      configuration: {
        hdiContainerName: 'enterprise-db-hdi',
        servicePlan: 'hdi-shared',
      },
    },
  ],
  edges: [
    {
      id: 'edge-client-fiori',
      sourceNodeId: 'node-client-2',
      targetNodeId: 'node-fiori-2',
      connectionType: 'http-route',
      label: 'UI Presentation',
    },
    {
      id: 'edge-client-router-2',
      sourceNodeId: 'node-client-2',
      targetNodeId: 'node-router-2',
      connectionType: 'http-route',
      label: 'HTTPS Inbound',
    },
    {
      id: 'edge-fiori-router',
      sourceNodeId: 'node-fiori-2',
      targetNodeId: 'node-router-2',
      connectionType: 'http-route',
      label: 'HTML5 Route',
    },
    {
      id: 'edge-router-xsuaa-2',
      sourceNodeId: 'node-router-2',
      targetNodeId: 'node-xsuaa-2',
      connectionType: 'service-binding',
      label: 'XSUAA Auth Binding',
    },
    {
      id: 'edge-router-cap-2',
      sourceNodeId: 'node-router-2',
      targetNodeId: 'node-cap-2',
      connectionType: 'http-route',
      label: 'API Forwarding',
    },
    {
      id: 'edge-cap-xsuaa-2',
      sourceNodeId: 'node-cap-2',
      targetNodeId: 'node-xsuaa-2',
      connectionType: 'service-binding',
      label: 'Security Binding',
    },
    {
      id: 'edge-cap-hana-2',
      sourceNodeId: 'node-cap-2',
      targetNodeId: 'node-hana-2',
      connectionType: 'persistence',
      label: 'HDI Persistence',
    },
  ],
};

/**
 * Acceptance Blueprint 3: CAP + External API Integration
 * Logical Flow: User/Browser -> App Router -> CAP Service -> Destination Service -> External API + XSUAA
 */
export const BLUEPRINT_3_CAP_DESTINATION_API: Blueprint = {
  id: 'bp-3-cap-destination-api',
  schemaVersion: 1,
  name: 'CAP + External API Integration',
  description:
    'Side-by-side extension architecture integrating external APIs or enterprise SaaS services through the SAP BTP Destination Service with token exchange.',
  createdAt: '2026-11-24T10:00:00.000Z',
  updatedAt: '2026-11-24T10:00:00.000Z',
  deploymentProfile: 'cf-cap-destination-api',
  nodes: [
    {
      id: 'node-client-3',
      componentType: 'user-browser',
      label: 'User / Browser',
      position: { x: 50, y: 160 },
      configuration: {
        clientType: 'desktop-browser',
        expectedConcurrentUsers: 80,
      },
    },
    {
      id: 'node-router-3',
      componentType: 'app-router',
      label: 'App Router',
      customName: 'ext-approuter',
      position: { x: 260, y: 160 },
      configuration: {
        routerName: 'ext-approuter',
        authenticationMethod: 'route',
      },
    },
    {
      id: 'node-xsuaa-3',
      componentType: 'xsuaa',
      label: 'SAP XSUAA Service',
      customName: 'ext-uaa',
      position: { x: 260, y: 340 },
      configuration: {
        servicePlan: 'application',
        roleTemplateName: 'ApiConsumer',
      },
    },
    {
      id: 'node-cap-3',
      componentType: 'cap-service',
      label: 'SAP CAP Service',
      customName: 'ext-srv',
      position: { x: 520, y: 160 },
      configuration: {
        serviceName: 'ext-srv',
        memoryLimit: '512M',
      },
    },
    {
      id: 'node-dest-3',
      componentType: 'destination-service',
      label: 'Destination Service',
      customName: 'ext-destination',
      position: { x: 780, y: 160 },
      configuration: {
        destinationName: 'StripePaymentGateway',
        authenticationType: 'OAuth2ClientCredentials',
      },
    },
    {
      id: 'node-ext-api-3',
      componentType: 'external-api',
      label: 'External API',
      customName: 'PaymentGatewayAPI',
      position: { x: 1040, y: 160 },
      configuration: {
        apiName: 'StripePaymentGateway',
        targetUrl: 'https://api.stripe.com/v1',
      },
    },
  ],
  edges: [
    {
      id: 'edge-client-router-3',
      sourceNodeId: 'node-client-3',
      targetNodeId: 'node-router-3',
      connectionType: 'http-route',
      label: 'HTTPS Inbound',
    },
    {
      id: 'edge-router-xsuaa-3',
      sourceNodeId: 'node-router-3',
      targetNodeId: 'node-xsuaa-3',
      connectionType: 'service-binding',
      label: 'XSUAA Auth Binding',
    },
    {
      id: 'edge-router-cap-3',
      sourceNodeId: 'node-router-3',
      targetNodeId: 'node-cap-3',
      connectionType: 'http-route',
      label: 'API Forwarding',
    },
    {
      id: 'edge-cap-xsuaa-3',
      sourceNodeId: 'node-cap-3',
      targetNodeId: 'node-xsuaa-3',
      connectionType: 'service-binding',
      label: 'Security Binding',
    },
    {
      id: 'edge-cap-dest-3',
      sourceNodeId: 'node-cap-3',
      targetNodeId: 'node-dest-3',
      connectionType: 'service-binding',
      label: 'Destination Binding',
    },
    {
      id: 'edge-dest-api-3',
      sourceNodeId: 'node-dest-3',
      targetNodeId: 'node-ext-api-3',
      connectionType: 'data-sync',
      label: 'Remote Target',
    },
  ],
};

export const EMPTY_BLUEPRINT: Blueprint = {
  id: 'bp-new-empty',
  schemaVersion: 1,
  name: 'New Architecture Blueprint',
  description: 'Empty canvas ready for designing custom SAP BTP architecture topologies.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deploymentProfile: 'cf-cap-hana',
  nodes: [],
  edges: [],
};

export const DEFAULT_BLUEPRINTS: Blueprint[] = [
  BLUEPRINT_1_CAP_HANA,
  BLUEPRINT_2_FIORI_CAP_HANA,
  BLUEPRINT_3_CAP_DESTINATION_API,
];
