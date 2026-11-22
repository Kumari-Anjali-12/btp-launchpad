export type ModuleId =
  | 'module-0'
  | 'module-1'
  | 'module-2'
  | 'module-3'
  | 'module-4';

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
    | 'http-troubleshooting';
  jargonTerms: JargonTerm[];
  technicalExample: TechnicalExample;
  businessScenario: BusinessScenario;
  quizQuestions: [QuizQuestion, QuizQuestion, QuizQuestion]; // Strictly 3 questions per chapter
  keyTakeaways: string[];
  practicalActivity: string;
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
