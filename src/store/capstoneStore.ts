import { CapstoneProgressState, FinalAssessmentSubmission } from '../types/capstone';
import {
  FINAL_ASSESSMENT_QUESTIONS,
  FINAL_ASSESSMENT_PASSING_THRESHOLD,
  FINAL_ASSESSMENT_TOTAL_POINTS,
} from '../data/finalAssessmentData';

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

export const submitFinalAssessment = (
  answers: Record<string, number>
): { state: CapstoneProgressState; result: FinalAssessmentSubmission } => {
  const current = loadCapstoneProgress();

  let calculatedScore = 0;
  let criticalGate1Passed = false;
  let criticalGate2Passed = false;

  FINAL_ASSESSMENT_QUESTIONS.forEach((q) => {
    const selected = answers[q.id];
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) {
      calculatedScore += q.points;
    }

    if (q.id === 'debug-auth-gate') {
      criticalGate1Passed = isCorrect;
    }
    if (q.id === 'wf-acid-gate') {
      criticalGate2Passed = isCorrect;
    }
  });

  const criticalGatePassed = criticalGate1Passed && criticalGate2Passed;
  // Passing condition: Score >= 75 AND BOTH critical security/data-integrity gates passed
  const passed = calculatedScore >= FINAL_ASSESSMENT_PASSING_THRESHOLD && criticalGatePassed;

  const badges = new Set(current.unlockedBadges);
  if (passed) {
    badges.add('badge-capstone-mastery');
  }

  const result: FinalAssessmentSubmission = {
    answers,
    totalScore: calculatedScore,
    maxScore: FINAL_ASSESSMENT_TOTAL_POINTS,
    passed,
    criticalGatePassed,
    criticalGate1Passed,
    criticalGate2Passed,
    submittedAt: new Date().toISOString(),
  };

  const next: CapstoneProgressState = {
    ...current,
    unlockedBadges: Array.from(badges),
    finalAssessment: result,
  };

  saveCapstoneProgress(next);
  return { state: next, result };
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
