import { UserProgressState, ThemeMode, QuizProgress } from '../types/storage';

const STORAGE_KEY = 'btp_launchpad_guest_state_v1';
const CURRENT_SCHEMA_VERSION = 1;

export const DEFAULT_PROGRESS_STATE: UserProgressState = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  theme: 'system',
  completedChapterIds: [],
  quizScores: {},
  currentModuleId: 'module-0',
  currentChapterId: null,
  lastActiveDate: null,
  streakDays: 0,
  totalHoursLearned: 0,
};

/**
 * Validates and restores user state with corruption recovery.
 */
function sanitizeLoadedState(raw: unknown): UserProgressState {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PROGRESS_STATE };
  }

  const obj = raw as Partial<UserProgressState>;

  // Schema version check and future migrations
  if (obj.schemaVersion !== CURRENT_SCHEMA_VERSION) {
    // If older schema, safely migrate or re-initialize preserving completed chapters
    return {
      ...DEFAULT_PROGRESS_STATE,
      theme: obj.theme === 'light' || obj.theme === 'dark' ? obj.theme : 'system',
      completedChapterIds: Array.isArray(obj.completedChapterIds) ? obj.completedChapterIds : [],
      quizScores: typeof obj.quizScores === 'object' && obj.quizScores !== null ? obj.quizScores : {},
    };
  }

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    theme: obj.theme === 'light' || obj.theme === 'dark' || obj.theme === 'system' ? obj.theme : 'system',
    completedChapterIds: Array.isArray(obj.completedChapterIds) ? obj.completedChapterIds : [],
    quizScores: typeof obj.quizScores === 'object' && obj.quizScores !== null ? obj.quizScores : {},
    currentModuleId: typeof obj.currentModuleId === 'string' ? obj.currentModuleId : 'module-0',
    currentChapterId: typeof obj.currentChapterId === 'string' ? obj.currentChapterId : null,
    lastActiveDate: typeof obj.lastActiveDate === 'string' ? obj.lastActiveDate : null,
    streakDays: typeof obj.streakDays === 'number' && obj.streakDays >= 0 ? obj.streakDays : 0,
    totalHoursLearned: typeof obj.totalHoursLearned === 'number' ? obj.totalHoursLearned : 0,
  };
}

/**
 * Load progress safely from localStorage.
 */
export function loadUserProgress(): UserProgressState {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_PROGRESS_STATE };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_PROGRESS_STATE };
    }
    const parsed = JSON.parse(raw);
    return sanitizeLoadedState(parsed);
  } catch (error) {
    console.warn('[BTP Launchpad] Corrupted progress detected in localStorage. Recovering default state.', error);
    return { ...DEFAULT_PROGRESS_STATE };
  }
}

/**
 * Persist progress state to localStorage.
 */
export function saveUserProgress(state: UserProgressState): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch custom event so all reactive hooks update across windows/components
    window.dispatchEvent(new CustomEvent('btp_storage_updated', { detail: state }));
  } catch (error) {
    console.error('[BTP Launchpad] Failed to persist state to localStorage:', error);
  }
}

/**
 * Applies the selected theme class to document root.
 */
export function applyTheme(theme: ThemeMode): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Calculates updated learning streak based on today's activity.
 */
export function updateStreak(state: UserProgressState): UserProgressState {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastActiveDate === today) {
    return state;
  }

  let newStreak = state.streakDays;
  if (state.lastActiveDate) {
    const last = new Date(state.lastActiveDate);
    const now = new Date(today);
    const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  return {
    ...state,
    lastActiveDate: today,
    streakDays: newStreak,
  };
}

/**
 * Mark a chapter as completed or toggle its status.
 */
export function toggleChapterCompletion(chapterId: string): UserProgressState {
  const current = loadUserProgress();
  const exists = current.completedChapterIds.includes(chapterId);

  const updatedIds = exists
    ? current.completedChapterIds.filter((id) => id !== chapterId)
    : [...current.completedChapterIds, chapterId];

  const withStreak = updateStreak(current);
  const nextState: UserProgressState = {
    ...withStreak,
    completedChapterIds: updatedIds,
  };

  saveUserProgress(nextState);
  return nextState;
}

/**
 * Record a completed quiz result.
 */
export function recordQuizScore(quizId: string, score: number, total: number): UserProgressState {
  const current = loadUserProgress();
  const progress: QuizProgress = {
    score,
    total,
    passed: score / total >= 0.7,
    completedAt: new Date().toISOString(),
  };

  const withStreak = updateStreak(current);
  const nextState: UserProgressState = {
    ...withStreak,
    quizScores: {
      ...current.quizScores,
      [quizId]: progress,
    },
  };

  saveUserProgress(nextState);
  return nextState;
}

/**
 * Reset all learning progress to defaults.
 */
export function resetUserProgress(): UserProgressState {
  const resetState = { ...DEFAULT_PROGRESS_STATE };
  saveUserProgress(resetState);
  return resetState;
}
