import { CapstoneProgressState } from '../types/capstone';

const STORAGE_KEY = 'btp_launchpad_capstone_progress';

export const loadCapstoneProgress = (): CapstoneProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse capstone progress from localStorage', e);
  }

  return {
    completedCheckpoints: {},
    passedQuizzes: {},
    quizScores: {},
    unlockedBadges: [],
    selectedCodeFile: 'db/schema.cds',
  };
};

export const saveCapstoneProgress = (state: CapstoneProgressState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('btp_capstone_updated', { detail: state }));
  } catch (e) {
    console.error('Failed to save capstone progress to localStorage', e);
  }
};

export const toggleCheckpoint = (checkpointId: string): CapstoneProgressState => {
  const current = loadCapstoneProgress();
  const next = {
    ...current,
    completedCheckpoints: {
      ...current.completedCheckpoints,
      [checkpointId]: !current.completedCheckpoints[checkpointId],
    },
  };
  saveCapstoneProgress(next);
  return next;
};

export const recordQuizResult = (levelId: string, score: number, total: number, badgeId: string): CapstoneProgressState => {
  const current = loadCapstoneProgress();
  const passed = score >= Math.ceil(total * 0.8); // 80% passing threshold (4/5)
  const badges = new Set(current.unlockedBadges);

  if (passed && badgeId) {
    badges.add(badgeId);
  }

  const next = {
    ...current,
    passedQuizzes: {
      ...current.passedQuizzes,
      [levelId]: passed,
    },
    quizScores: {
      ...current.quizScores,
      [levelId]: score,
    },
    unlockedBadges: Array.from(badges),
  };
  saveCapstoneProgress(next);
  return next;
};

export const resetCapstoneProgress = (): CapstoneProgressState => {
  const initial: CapstoneProgressState = {
    completedCheckpoints: {},
    passedQuizzes: {},
    quizScores: {},
    unlockedBadges: [],
    selectedCodeFile: 'db/schema.cds',
  };
  saveCapstoneProgress(initial);
  return initial;
};
