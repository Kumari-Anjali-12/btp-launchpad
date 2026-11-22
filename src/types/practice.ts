export type DrillCategory = 'cds' | 'odata' | 'security' | 'debugging';
export type DrillDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface DrillValidationRule {
  id: string;
  description: string;
  test: (input: string) => boolean;
}

export interface PracticeDrill {
  id: string;
  title: string;
  category: DrillCategory;
  difficulty: DrillDifficulty;
  estimatedMinutes: number;
  summary: string;
  instructions: string[];
  concepts: string[];
  starterCode: string;
  solutionCode: string;
  hints: string[];
  validationRules: DrillValidationRule[];
  explanation: string;
}

export interface CdsFieldDef {
  name: string;
  isKey: boolean;
  type: string;
  isAssociation?: boolean;
  isComposition?: boolean;
  target?: string;
  cardinality?: 'one' | 'many';
}

export interface CdsEntityDef {
  name: string;
  isAspectManaged?: boolean;
  isAspectCuid?: boolean;
  fields: CdsFieldDef[];
}

export interface CdsError {
  line: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface CdsParseResult {
  valid: boolean;
  errors: CdsError[];
  namespace?: string;
  entities: CdsEntityDef[];
  sqlPreview?: string;
  odataEdmxPreview?: string;
}

export type ODataHttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface ODataRequest {
  method: ODataHttpMethod;
  path: string;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
}

export interface ODataResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
  executionTimeMs: number;
}

export interface ProjectMilestone {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  instructions: string[];
  type: 'cds' | 'odata' | 'handler' | 'config';
  starterCode: string;
  solutionCode: string;
  hints: string[];
  validationRules: {
    id: string;
    description: string;
    test: (codeOrInput: string) => boolean;
  }[];
  explanation: string;
}

export interface GuidedProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: DrillDifficulty;
  estimatedHours: number;
  businessScenario: string;
  architectureSummary: {
    backend: string;
    database: string;
    integration: string;
    frontend: string;
  };
  milestones: ProjectMilestone[];
}

export interface IndependentChallenge {
  id: string;
  title: string;
  difficulty: DrillDifficulty;
  category: DrillCategory;
  scenario: string;
  requirements: string[];
  starterCode: string;
  solutionCode: string;
  hints: string[];
  evaluationCriteria: string[];
  validationRules: {
    id: string;
    description: string;
    test: (input: string) => boolean;
  }[];
  explanation: string;
}
