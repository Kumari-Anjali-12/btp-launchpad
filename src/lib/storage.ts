import { UserProgressState, ThemeMode, QuizProgress, PracticeProgressState, ProjectProgress } from '../types/storage';

const STORAGE_KEY = 'btp_launchpad_guest_state_v1';
const CURRENT_SCHEMA_VERSION = 1;

export const DEFAULT_PRACTICE_STATE: PracticeProgressState = {
  completedDrillIds: [],
  attemptedDrillIds: [],
  projectProgress: {},
  completedChallengeIds: [],
  challengeScores: {},
};

export const DEFAULT_PROGRESS_STATE: UserProgressState = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  theme: 'system',
  completedChapterIds: [],
  quizScores: {},
  currentModuleId: 'module-0',
  currentChapterId: 'ch-0-1',
  lastActiveDate: null,
  streakDays: 0,
  totalHoursLearned: 0,
  practice: { ...DEFAULT_PRACTICE_STATE },
};

/**
 * Validates and restores user state with corruption recovery.
 */
function sanitizeLoadedState(raw: unknown): UserProgressState {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PROGRESS_STATE };
  }

  const obj = raw as Partial<UserProgressState>;

  const sanitizedQuizScores: Record<string, QuizProgress> = {};
  if (typeof obj.quizScores === 'object' && obj.quizScores !== null) {
    for (const [key, val] of Object.entries(obj.quizScores)) {
      if (val && typeof val === 'object') {
        const item = val as Partial<QuizProgress>;
        sanitizedQuizScores[key] = {
          score: typeof item.score === 'number' ? item.score : 0,
          total: typeof item.total === 'number' ? item.total : 3,
          passed: Boolean(item.passed),
          selectedAnswers:
            typeof item.selectedAnswers === 'object' && item.selectedAnswers !== null
              ? (item.selectedAnswers as Record<string, string>)
              : {},
          attemptsCount: typeof item.attemptsCount === 'number' ? item.attemptsCount : 1,
          bestScore: typeof item.bestScore === 'number' ? item.bestScore : (typeof item.score === 'number' ? item.score : 0),
          completedAt: typeof item.completedAt === 'string' ? item.completedAt : new Date().toISOString(),
        };
      }
    }
  }

  // Sanitize Practice Progress
  const rawPractice = obj.practice;
  const sanitizedProjectProgress: Record<string, ProjectProgress> = {};
  const sanitizedChallengeScores: Record<string, { score: number; passed: boolean; submittedAt: string }> = {};

  if (rawPractice && typeof rawPractice === 'object') {
    if (rawPractice.projectProgress && typeof rawPractice.projectProgress === 'object') {
      for (const [pId, pData] of Object.entries(rawPractice.projectProgress)) {
        if (pData && typeof pData === 'object') {
          sanitizedProjectProgress[pId] = {
            currentMilestone: typeof pData.currentMilestone === 'number' ? pData.currentMilestone : 1,
            completedMilestones: Array.isArray(pData.completedMilestones) ? pData.completedMilestones : [],
            isCompleted: Boolean(pData.isCompleted),
            completedAt: typeof pData.completedAt === 'string' ? pData.completedAt : undefined,
          };
        }
      }
    }

    if (rawPractice.challengeScores && typeof rawPractice.challengeScores === 'object') {
      for (const [cId, cData] of Object.entries(rawPractice.challengeScores)) {
        if (cData && typeof cData === 'object') {
          sanitizedChallengeScores[cId] = {
            score: typeof cData.score === 'number' ? cData.score : 0,
            passed: Boolean(cData.passed),
            submittedAt: typeof cData.submittedAt === 'string' ? cData.submittedAt : new Date().toISOString(),
          };
        }
      }
    }
  }

  const sanitizedPractice: PracticeProgressState = {
    completedDrillIds: Array.isArray(rawPractice?.completedDrillIds) ? rawPractice.completedDrillIds : [],
    attemptedDrillIds: Array.isArray(rawPractice?.attemptedDrillIds) ? rawPractice.attemptedDrillIds : [],
    projectProgress: sanitizedProjectProgress,
    completedChallengeIds: Array.isArray(rawPractice?.completedChallengeIds) ? rawPractice.completedChallengeIds : [],
    challengeScores: sanitizedChallengeScores,
  };

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    theme: obj.theme === 'light' || obj.theme === 'dark' || obj.theme === 'system' ? obj.theme : 'system',
    completedChapterIds: Array.isArray(obj.completedChapterIds) ? obj.completedChapterIds : [],
    quizScores: sanitizedQuizScores,
    currentModuleId: typeof obj.currentModuleId === 'string' ? obj.currentModuleId : 'module-0',
    currentChapterId: typeof obj.currentChapterId === 'string' ? obj.currentChapterId : 'ch-0-1',
    lastActiveDate: typeof obj.lastActiveDate === 'string' ? obj.lastActiveDate : null,
    streakDays: typeof obj.streakDays === 'number' && obj.streakDays >= 0 ? obj.streakDays : 0,
    totalHoursLearned: typeof obj.totalHoursLearned === 'number' ? obj.totalHoursLearned : 0,
    practice: sanitizedPractice,
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
 * Toggle a chapter's completed status.
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
 * Mark a chapter as complete specifically after learning & quiz completion.
 */
export function markChapterComplete(chapterId: string): UserProgressState {
  const current = loadUserProgress();
  if (current.completedChapterIds.includes(chapterId)) {
    return current;
  }

  const withStreak = updateStreak(current);
  const nextState: UserProgressState = {
    ...withStreak,
    completedChapterIds: [...current.completedChapterIds, chapterId],
  };

  saveUserProgress(nextState);
  return nextState;
}

/**
 * Submits and records a quiz attempt with selected answers and score.
 */
export function submitChapterQuiz(
  chapterId: string,
  answers: Record<string, string>,
  score: number,
  total: number
): UserProgressState {
  const current = loadUserProgress();
  const passed = total > 0 && score / total >= 0.6; // 2 out of 3 is 66.7%

  const previousAttempt = current.quizScores[chapterId];
  const attemptsCount = previousAttempt ? previousAttempt.attemptsCount + 1 : 1;
  const bestScore = previousAttempt ? Math.max(previousAttempt.bestScore, score) : score;

  const quizProgress: QuizProgress = {
    score,
    total,
    passed,
    selectedAnswers: answers,
    attemptsCount,
    bestScore,
    completedAt: new Date().toISOString(),
  };

  const withStreak = updateStreak(current);

  const completedIds = current.completedChapterIds.includes(chapterId)
    ? current.completedChapterIds
    : passed
    ? [...current.completedChapterIds, chapterId]
    : current.completedChapterIds;

  const nextState: UserProgressState = {
    ...withStreak,
    completedChapterIds: completedIds,
    quizScores: {
      ...current.quizScores,
      [chapterId]: quizProgress,
    },
  };

  saveUserProgress(nextState);
  return nextState;
}

/**
 * Legacy alias for backwards compatibility with Phase 1 tests.
 */
export function recordQuizScore(quizId: string, score: number, total: number): UserProgressState {
  return submitChapterQuiz(quizId, {}, score, total);
}

/**
 * Updates current learner location.
 */
export function updateCurrentLocation(moduleId: string, chapterId: string | null): UserProgressState {
  const current = loadUserProgress();
  if (current.currentModuleId === moduleId && current.currentChapterId === chapterId) {
    return current;
  }
  const nextState: UserProgressState = {
    ...current,
    currentModuleId: moduleId,
    currentChapterId: chapterId,
  };
  saveUserProgress(nextState);
  return nextState;
}

/**
 * Records that a user has opened/attempted an interactive drill.
 */
export function recordDrillAttempt(drillId: string): UserProgressState {
  const current = loadUserProgress();
  const practice = current.practice || { ...DEFAULT_PRACTICE_STATE };

  if (practice.attemptedDrillIds.includes(drillId)) {
    return current;
  }

  const nextState: UserProgressState = {
    ...current,
    practice: {
      ...practice,
      attemptedDrillIds: [...practice.attemptedDrillIds, drillId],
    },
  };

  saveUserProgress(nextState);
  return nextState;
}

/**
 * Marks an interactive drill completed after passing validation.
 */
export function completeDrill(drillId: string): UserProgressState {
  const current = loadUserProgress();
  const practice = current.practice || { ...DEFAULT_PRACTICE_STATE };

  const attempted = practice.attemptedDrillIds.includes(drillId)
    ? practice.attemptedDrillIds
    : [...practice.attemptedDrillIds, drillId];

  const completed = practice.completedDrillIds.includes(drillId)
    ? practice.completedDrillIds
    : [...practice.completedDrillIds, drillId];

  const withStreak = updateStreak(current);
  const nextState: UserProgressState = {
    ...withStreak,
    practice: {
      ...practice,
      attemptedDrillIds: attempted,
      completedDrillIds: completed,
    },
  };

  saveUserProgress(nextState);
  return nextState;
}

/**
 * Advances a guided project milestone.
 */
export function advanceProjectMilestone(
  projectId: string,
  milestoneStep: number,
  isProjectCompleted: boolean = false
): UserProgressState {
  const current = loadUserProgress();
  const practice = current.practice || { ...DEFAULT_PRACTICE_STATE };

  const existingProject = practice.projectProgress[projectId] || {
    currentMilestone: 1,
    completedMilestones: [],
    isCompleted: false,
  };

  const completedMilestones = existingProject.completedMilestones.includes(milestoneStep)
    ? existingProject.completedMilestones
    : [...existingProject.completedMilestones, milestoneStep];

  const nextMilestone = isProjectCompleted ? milestoneStep : milestoneStep + 1;

  const updatedProject: ProjectProgress = {
    currentMilestone: nextMilestone,
    completedMilestones,
    isCompleted: isProjectCompleted || existingProject.isCompleted,
    completedAt: isProjectCompleted ? new Date().toISOString() : existingProject.completedAt,
  };

  const withStreak = updateStreak(current);
  const nextState: UserProgressState = {
    ...withStreak,
    practice: {
      ...practice,
      projectProgress: {
        ...practice.projectProgress,
        [projectId]: updatedProject,
      },
    },
  };

  saveUserProgress(nextState);
  return nextState;
}

/**
 * Submits and records an independent challenge attempt.
 */
export function submitChallenge(challengeId: string, score: number, passed: boolean): UserProgressState {
  const current = loadUserProgress();
  const practice = current.practice || { ...DEFAULT_PRACTICE_STATE };

  const completed = passed && !practice.completedChallengeIds.includes(challengeId)
    ? [...practice.completedChallengeIds, challengeId]
    : practice.completedChallengeIds;

  const withStreak = updateStreak(current);
  const nextState: UserProgressState = {
    ...withStreak,
    practice: {
      ...practice,
      completedChallengeIds: completed,
      challengeScores: {
        ...practice.challengeScores,
        [challengeId]: {
          score,
          passed,
          submittedAt: new Date().toISOString(),
        },
      },
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
