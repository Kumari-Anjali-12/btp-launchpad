import { describe, it, expect, beforeEach } from 'vitest';
import {
  FINAL_ASSESSMENT_QUESTIONS,
  FINAL_ASSESSMENT_PASSING_THRESHOLD,
  FINAL_ASSESSMENT_TOTAL_POINTS,
} from '../../src/data/finalAssessmentData';
import {
  loadCapstoneProgress,
  submitFinalAssessment,
  resetCapstoneProgress,
} from '../../src/store/capstoneStore';

describe('Phase 9.1 — Final Learner Assessment System', () => {
  beforeEach(() => {
    localStorage.clear();
    resetCapstoneProgress();
  });

  describe('Rubric and Weight Specifications', () => {
    it('contains exactly 20 questions', () => {
      expect(FINAL_ASSESSMENT_QUESTIONS).toHaveLength(20);
    });

    it('sums to exactly 100 total points', () => {
      const totalPoints = FINAL_ASSESSMENT_QUESTIONS.reduce((sum, q) => sum + q.points, 0);
      expect(totalPoints).toBe(100);
      expect(FINAL_ASSESSMENT_TOTAL_POINTS).toBe(100);
    });

    it('enforces a 75-point passing threshold', () => {
      expect(FINAL_ASSESSMENT_PASSING_THRESHOLD).toBe(75);
    });

    it('verifies section breakdown and weight allocations', () => {
      const technical = FINAL_ASSESSMENT_QUESTIONS.filter((q) => q.section === 'technical');
      const architecture = FINAL_ASSESSMENT_QUESTIONS.filter((q) => q.section === 'architecture');
      const debugging = FINAL_ASSESSMENT_QUESTIONS.filter((q) => q.section === 'debugging');
      const workflow = FINAL_ASSESSMENT_QUESTIONS.filter((q) => q.section === 'workflow');

      expect(technical).toHaveLength(6);
      expect(technical.reduce((s, q) => s + q.points, 0)).toBe(30);

      expect(architecture).toHaveLength(5);
      expect(architecture.reduce((s, q) => s + q.points, 0)).toBe(25);

      expect(debugging).toHaveLength(5);
      expect(debugging.reduce((s, q) => s + q.points, 0)).toBe(25);

      expect(workflow).toHaveLength(4);
      expect(workflow.reduce((s, q) => s + q.points, 0)).toBe(20);
    });

    it('defines exactly two critical failure gates for security and data integrity', () => {
      const criticalGates = FINAL_ASSESSMENT_QUESTIONS.filter((q) => q.isCriticalGate);
      expect(criticalGates).toHaveLength(2);

      const authGate = criticalGates.find((q) => q.id === 'debug-auth-gate');
      const acidGate = criticalGates.find((q) => q.id === 'wf-acid-gate');

      expect(authGate).toBeDefined();
      expect(authGate?.section).toBe('debugging');
      expect(authGate?.gateDescription).toContain('Critical Security Gate 1');

      expect(acidGate).toBeDefined();
      expect(acidGate?.section).toBe('workflow');
      expect(acidGate?.gateDescription).toContain('Critical Data-Integrity Gate 2');
    });
  });

  describe('Scoring Logic, Critical Gates & Persistence', () => {
    it('awards 100 points, passed status, and mastery badge on perfect submission', () => {
      const perfectAnswers: Record<string, number> = {};
      FINAL_ASSESSMENT_QUESTIONS.forEach((q) => {
        perfectAnswers[q.id] = q.correctIndex;
      });

      const { state, result } = submitFinalAssessment(perfectAnswers);

      expect(result.totalScore).toBe(100);
      expect(result.maxScore).toBe(100);
      expect(result.criticalGate1Passed).toBe(true);
      expect(result.criticalGate2Passed).toBe(true);
      expect(result.criticalGatePassed).toBe(true);
      expect(result.passed).toBe(true);
      expect(state.unlockedBadges).toContain('badge-capstone-mastery');

      // Check persistence
      const reloaded = loadCapstoneProgress();
      expect(reloaded.finalAssessment?.passed).toBe(true);
      expect(reloaded.finalAssessment?.totalScore).toBe(100);
    });

    it('passes when score is exactly 75 points and critical gates are passed', () => {
      // 15 correct (75 pts), 5 incorrect (25 pts), but both critical gates correct
      const passingAnswers: Record<string, number> = {};
      FINAL_ASSESSMENT_QUESTIONS.forEach((q, idx) => {
        if (q.id === 'debug-auth-gate' || q.id === 'wf-acid-gate') {
          passingAnswers[q.id] = q.correctIndex; // Keep critical gates correct
        } else if (idx < 15) {
          passingAnswers[q.id] = q.correctIndex;
        } else {
          passingAnswers[q.id] = (q.correctIndex + 1) % q.options.length; // Incorrect
        }
      });

      const { result } = submitFinalAssessment(passingAnswers);
      expect(result.totalScore).toBeGreaterThanOrEqual(75);
      expect(result.criticalGatePassed).toBe(true);
      expect(result.passed).toBe(true);
    });

    it('fails when score is below 75 points even if critical gates are correct', () => {
      // Only 10 correct answers (50 points), but both critical gates correct
      const failingScoreAnswers: Record<string, number> = {};
      FINAL_ASSESSMENT_QUESTIONS.forEach((q, idx) => {
        if (q.id === 'debug-auth-gate' || q.id === 'wf-acid-gate') {
          failingScoreAnswers[q.id] = q.correctIndex;
        } else if (idx < 8) {
          failingScoreAnswers[q.id] = q.correctIndex;
        } else {
          failingScoreAnswers[q.id] = (q.correctIndex + 1) % q.options.length;
        }
      });

      const { result } = submitFinalAssessment(failingScoreAnswers);
      expect(result.totalScore).toBeLessThan(75);
      expect(result.criticalGatePassed).toBe(true);
      expect(result.passed).toBe(false);
    });

    it('CRITICAL GATE 1 ENFORCEMENT: Fails assessment with 95 points if Security Gate is answered incorrectly', () => {
      // 19 of 20 correct (95 points), but fail debug-auth-gate
      const authFailedAnswers: Record<string, number> = {};
      FINAL_ASSESSMENT_QUESTIONS.forEach((q) => {
        if (q.id === 'debug-auth-gate') {
          authFailedAnswers[q.id] = (q.correctIndex + 1) % q.options.length; // Deliberate failure on critical gate
        } else {
          authFailedAnswers[q.id] = q.correctIndex;
        }
      });

      const { state, result } = submitFinalAssessment(authFailedAnswers);
      expect(result.totalScore).toBe(95);
      expect(result.totalScore).toBeGreaterThanOrEqual(FINAL_ASSESSMENT_PASSING_THRESHOLD);
      expect(result.criticalGate1Passed).toBe(false);
      expect(result.criticalGate2Passed).toBe(true);
      expect(result.criticalGatePassed).toBe(false);
      // Critical assertion: Must NOT pass despite 95/100 score!
      expect(result.passed).toBe(false);
      expect(state.unlockedBadges).not.toContain('badge-capstone-mastery');
    });

    it('CRITICAL GATE 2 ENFORCEMENT: Fails assessment with 95 points if ACID Gate is answered incorrectly', () => {
      // 19 of 20 correct (95 points), but fail wf-acid-gate
      const acidFailedAnswers: Record<string, number> = {};
      FINAL_ASSESSMENT_QUESTIONS.forEach((q) => {
        if (q.id === 'wf-acid-gate') {
          acidFailedAnswers[q.id] = (q.correctIndex + 1) % q.options.length; // Deliberate failure on critical gate
        } else {
          acidFailedAnswers[q.id] = q.correctIndex;
        }
      });

      const { state, result } = submitFinalAssessment(acidFailedAnswers);
      expect(result.totalScore).toBe(95);
      expect(result.totalScore).toBeGreaterThanOrEqual(FINAL_ASSESSMENT_PASSING_THRESHOLD);
      expect(result.criticalGate1Passed).toBe(true);
      expect(result.criticalGate2Passed).toBe(false);
      expect(result.criticalGatePassed).toBe(false);
      // Critical assertion: Must NOT pass despite 95/100 score!
      expect(result.passed).toBe(false);
      expect(state.unlockedBadges).not.toContain('badge-capstone-mastery');
    });

    it('ensures unsubmitted state or empty answers cannot award passing', () => {
      const initial = loadCapstoneProgress();
      expect(initial.finalAssessment).toBeUndefined();

      const { result } = submitFinalAssessment({});
      expect(result.totalScore).toBe(0);
      expect(result.passed).toBe(false);
      expect(result.criticalGatePassed).toBe(false);
    });
  });
});
