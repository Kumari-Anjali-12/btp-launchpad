export type ThemeMode = 'light' | 'dark' | 'system';

export interface QuizProgress {
  score: number;
  total: number;
  passed: boolean;
  selectedAnswers: Record<string, string>;
  attemptsCount: number;
  bestScore: number;
  completedAt: string;
}

export interface ProjectProgress {
  currentMilestone: number;
  completedMilestones: number[];
  isCompleted: boolean;
  completedAt?: string;
}

export interface PracticeProgressState {
  completedDrillIds: string[];
  attemptedDrillIds: string[];
  projectProgress: Record<string, ProjectProgress>;
  completedChallengeIds: string[];
  challengeScores: Record<string, {
    score: number;
    passed: boolean;
    submittedAt: string;
  }>;
}

export interface UserProgressState {
  schemaVersion: number; // 2
  theme: ThemeMode;
  completedLessonIds: string[]; // e.g. 'mod-0-1', 'mod-3-1'
  completedChapterIds: string[]; // legacy mapped array kept in sync
  quizScores: Record<string, QuizProgress>;
  currentPhaseId?: string;
  currentLessonId?: string | null;
  currentModuleId?: string; // legacy alias
  currentChapterId?: string | null; // legacy alias
  currentStepIndex?: number;
  lastActiveDate: string | null;
  streakDays: number;
  totalHoursLearned: number;
  completedCapstones?: string[];
  targetWeeklyHours?: number; // default 10
  practice?: PracticeProgressState;
}
