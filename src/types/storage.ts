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
}
