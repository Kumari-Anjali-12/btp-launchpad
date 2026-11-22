export type SyllabusPhaseId =
  | 'phase-0'
  | 'phase-1'
  | 'phase-2'
  | 'phase-3'
  | 'phase-4'
  | 'phase-5'
  | 'phase-6'
  | 'phase-7'
  | 'phase-8';

// Legacy ModuleId alias for backward-compatibility with Phase 1 & 2 tests
export type ModuleId =
  | 'module-0'
  | 'module-1'
  | 'module-2'
  | 'module-3'
  | 'module-4';

export interface LessonStep {
  stepNumber: number;
  title: string;
  subtitle?: string;
  explanation: string;
  keyIdea: string;
  taskInstruction?: string;
  hint?: string;
  warning?: string;
}

export interface ChapterAnalogy {
  concept: string;
  analogy: string;
  explanation: string;
  transition: string;
}

export interface ConceptExplanation {
  whatItIs: string;
  whyItExists: string;
  problemSolved: string;
  howItWorks: string;
  btpFit: string;
}

export interface JargonTerm {
  term: string;
  simpleMeaning: string;
  familiarEquivalent: string;
}

export interface CodeLineExplanation {
  lines: string;
  explanation: string;
}

export interface TechnicalExample {
  title: string;
  language: string;
  code: string;
  purpose: string;
  lineExplanations: CodeLineExplanation[];
  expectedOutput: string;
  commonMistakes: string[];
}

export interface BusinessScenario {
  title: string;
  context: string;
  workflowSteps: string[];
  businessImpact: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenarioContext?: string;
  options: QuizOption[];
}

export interface PhaseCapstone {
  id: string;
  phaseId: SyllabusPhaseId;
  title: string;
  objective: string;
  functionalRequirements: string[];
  edgeCasesToHandle: string[];
  prerequisiteModules: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
}

export interface DeferredTopic {
  id: string;
  title: string;
  description: string;
  subtopics: string[];
  revisitWhen: string;
}

export interface SyllabusModule {
  id: string; // e.g. 'mod-0-1'
  code: string; // e.g. '0.1'
  phaseId: SyllabusPhaseId;
  title: string;
  tagline: string;
  summary: string;
  estimatedMinutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  subtopics: string[];
  practicalImplementation: string;
  masteryCheck: string;
  learningObjectives: string[];
  steps: LessonStep[];
  analogy: ChapterAnalogy;
  conceptExplanation: ConceptExplanation;
  diagramType:
  | 'erp-architecture'
  | 'btp-hierarchy'
  | 'clean-core'
  | 'cap-architecture'
  | 'odata-flow'
  | 'event-handlers'
  | 'fiori-horizon'
  | 'fiori-elements-annotations'
  | 'ui5-freestyle'
  | 'xsuaa-oauth'
  | 'cloud-connector-tunnel'
  | 'event-mesh-pubsub'
  | 'mta-lifecycle'
  | 'cf-deployment'
  | 'http-troubleshooting'
  | 'ai-core-rag'
  | 'genai-hub'
  | 'joule-agents';
  jargonTerms: JargonTerm[];
  technicalExample: TechnicalExample;
  businessScenario: BusinessScenario;
  quizQuestions: [QuizQuestion, QuizQuestion, QuizQuestion];
  keyTakeaways: string[];
  practicalActivity: string;

  // Compatibility properties
  moduleId?: string;
  number?: string;
  subtitle?: string;
  order?: number;
}

export interface SyllabusPhase {
  id: SyllabusPhaseId;
  number: number;
  title: string;
  tagline: string;
  description: string;
  coreObjective: string;
  estimatedHours: number;
  suggestedWeeks: string;
  badgeCategory: 'pre-learning' | 'core' | 'ai-layer' | 'capstone';
  modules: SyllabusModule[];
  capstone: PhaseCapstone;
}

export interface Chapter {
  id: string;
  moduleId: ModuleId;
  order: number;
  number: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  summary: string;
  learningObjectives: string[];
  analogy: ChapterAnalogy;
  conceptExplanation: ConceptExplanation;
  diagramType:
  | 'erp-architecture'
  | 'btp-hierarchy'
  | 'clean-core'
  | 'cap-architecture'
  | 'odata-flow'
  | 'event-handlers'
  | 'fiori-horizon'
  | 'fiori-elements-annotations'
  | 'ui5-freestyle'
  | 'xsuaa-oauth'
  | 'cloud-connector-tunnel'
  | 'event-mesh-pubsub'
  | 'mta-lifecycle'
  | 'cf-deployment'
  | 'http-troubleshooting'
  | 'ai-core-rag'
  | 'genai-hub'
  | 'joule-agents';
  jargonTerms: JargonTerm[];
  technicalExample: TechnicalExample;
  businessScenario: BusinessScenario;
  quizQuestions: [QuizQuestion, QuizQuestion, QuizQuestion];
  keyTakeaways: string[];
  practicalActivity: string;
  code?: string;
  phaseId?: SyllabusPhaseId;
  tagline?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  steps?: LessonStep[];
  practicalImplementation?: string;
  masteryCheck?: string;
  subtopics?: string[];
}

export interface CurriculumModule {
  id: ModuleId;
  number: number;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: string[];
  chapters: Chapter[];
}

export interface RoadmapDependencyNode {
  id: string;
  label: string;
  phaseId: SyllabusPhaseId;
  moduleId?: string;
  category: 'pre-learning' | 'core' | 'ai-layer' | 'capstone' | 'later';
  teaches: string;
  prerequisites: string[];
  downstream: string[];
  practicalOutput: string;
  masteryRequirement: string;
  x: number;
  y: number;
}
