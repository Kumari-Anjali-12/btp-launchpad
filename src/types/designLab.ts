/**
 * BTP Launchpad — Phase 8 Visual Architecture Designer Types
 * Normalized, strictly typed domain models for SAP BTP architectures,
 * component catalogues, connection rules, validation results, and MTA manifests.
 */

export type ComponentCategory =
  | 'ui'
  | 'service'
  | 'security'
  | 'data'
  | 'connectivity'
  | 'deployment';

export type ConnectionType =
  | 'http-route'          // UI/Proxy routing to application service
  | 'service-binding'     // Application service bound to backing service (e.g. XSUAA, Destination)
  | 'persistence'         // Application service connected to database container (HANA, SQLite)
  | 'auth-check'          // Authentication / scope verification against XSUAA
  | 'destination-lookup'  // Application service requesting remote destination credentials
  | 'connectivity-tunnel' // Destination service leveraging Cloud Connector for on-premise access
  | 'data-sync';          // External system communication

export interface ConfigFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'password';
  defaultValue: string | number | boolean;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  placeholder?: string;
  description: string;
  helpText?: string;
}

export interface ComponentDefinition {
  type: string;
  displayName: string;
  category: ComponentCategory;
  iconName: string;
  badgeText: string;
  plainEnglishDescription: string;
  technicalExplanation: string;
  realWorldAnalogy: {
    metaphor: string;
    explanation: string;
  };
  whyRequired: string;
  commonMistakes: string[];
  configurationFields: ConfigFieldDefinition[];
  supportedConnectionTypes: Array<{
    targetType: string;
    connectionType: ConnectionType;
    label: string;
    description: string;
  }>;
  prerequisites: string[];
  securityImplications: string;
  deploymentImplications: string;
  mtaProfileEligible: boolean;
  defaultMtaRole: 'module' | 'resource' | 'none';
  defaultMtaType?: string;
}

export interface ArchitectureNode {
  id: string;
  componentType: string;
  label: string;
  customName?: string;
  position: { x: number; y: number };
  configuration: Record<string, string | number | boolean>;
}

export interface ArchitectureEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  connectionType: ConnectionType;
  label?: string;
}

export type DeploymentProfileId =
  | 'cf-cap-hana'
  | 'cf-fiori-cap-hana'
  | 'cf-cap-destination-api'
  | 'standalone-dev';

export interface DeploymentProfile {
  id: DeploymentProfileId;
  title: string;
  description: string;
  targetRuntime: 'Cloud Foundry' | 'Local Development';
  recommendedComponents: string[];
  requiredModules: string[];
  requiredResources: string[];
  mtaSchemaVersion: string;
}

export interface Blueprint {
  id: string;
  schemaVersion: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deploymentProfile: DeploymentProfileId;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export type ValidationSeverity = 'error' | 'warning' | 'info';
export type ValidationCategory = 'graph' | 'architecture' | 'security' | 'deployment';

export interface ValidationIssue {
  id: string;
  ruleId: string;
  severity: ValidationSeverity;
  category: ValidationCategory;
  title: string;
  plainEnglishExplanation: string;
  technicalExplanation: string;
  affectedNodeIds: string[];
  affectedEdgeIds: string[];
  suggestedCorrection: string;
  blocksMtaGeneration: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  hasBlockingErrors: boolean;
  issues: ValidationIssue[];
  summary: {
    errorsCount: number;
    warningsCount: number;
    infoCount: number;
  };
  validatedAt: string;
}

// MTA Generation and Inspection Types
export interface MtaRequires {
  name: string;
  parameters?: Record<string, unknown>;
  group?: string;
  properties?: Record<string, unknown>;
}

export interface MtaProvides {
  name: string;
  public?: boolean;
  properties?: Record<string, unknown>;
}

export interface MtaModule {
  name: string;
  type: string;
  path?: string;
  parameters?: Record<string, unknown>;
  buildParameters?: Record<string, unknown>;
  requires?: MtaRequires[];
  provides?: MtaProvides[];
  properties?: Record<string, unknown>;
}

export interface MtaResource {
  name: string;
  type: string;
  parameters?: Record<string, unknown>;
  properties?: Record<string, unknown>;
}

export interface MtaDescriptor {
  schemaVersion: string;
  id: string;
  version: string;
  description: string;
  modules: MtaModule[];
  resources: MtaResource[];
  parameters?: Record<string, unknown>;
}

export interface MtaValidationResult {
  isStructurallyValid: boolean;
  isSemanticallyValid: boolean;
  errors: string[];
  warnings: string[];
  badges: string[];
}
