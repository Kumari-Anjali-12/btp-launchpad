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
  schemaVersion: number;
  theme: ThemeMode;
  completedChapterIds: string[];
  quizScores: Record<string, QuizProgress>;
  currentModuleId: string;
  currentChapterId: string | null;
  lastActiveDate: string | null;
  streakDays: number;
  totalHoursLearned: number;
  practice?: PracticeProgressState;
}
