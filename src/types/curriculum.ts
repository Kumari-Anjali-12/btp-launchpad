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
  analogy: ChapterAnalogy;
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
