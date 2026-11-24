import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadCapstoneProgress,
  saveCapstoneProgress,
  toggleCheckpoint,
  recordQuizResult,
  resetCapstoneProgress,
} from '../../src/store/capstoneStore';

describe('Capstone Progress Store Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should load initial default progress when storage is empty', () => {
    const progress = loadCapstoneProgress();
    expect(progress).toBeDefined();
    expect(progress.completedCheckpoints).toEqual({});
    expect(progress.passedQuizzes).toEqual({});
    expect(progress.quizScores).toEqual({});
    expect(progress.unlockedBadges).toEqual([]);
  });

  it('should toggle checkpoints and persist state in localStorage', () => {
    const cpId = 'c1-entities';
    const state1 = toggleCheckpoint(cpId);
    expect(state1.completedCheckpoints[cpId]).toBe(true);

    const reloaded = loadCapstoneProgress();
    expect(reloaded.completedCheckpoints[cpId]).toBe(true);

    const state2 = toggleCheckpoint(cpId);
    expect(state2.completedCheckpoints[cpId]).toBe(false);
  });

  it('should record passing quiz score and unlock badge', () => {
    const levelId = 'level-1';
    const badgeId = 'badge-capstone-1';
    const state = recordQuizResult(levelId, 4, 5, badgeId);

    expect(state.passedQuizzes[levelId]).toBe(true);
    expect(state.quizScores[levelId]).toBe(4);
    expect(state.unlockedBadges).toContain(badgeId);
  });

  it('should not pass quiz or unlock badge if score is below 80%', () => {
    const levelId = 'level-2';
    const badgeId = 'badge-capstone-2';
    const state = recordQuizResult(levelId, 3, 5, badgeId);

    expect(state.passedQuizzes[levelId]).toBe(false);
    expect(state.quizScores[levelId]).toBe(3);
    expect(state.unlockedBadges).not.toContain(badgeId);
  });

  it('should reset progress cleanly', () => {
    toggleCheckpoint('c1-entities');
    recordQuizResult('level-1', 5, 5, 'badge-capstone-1');

    const resetState = resetCapstoneProgress();
    expect(resetState.completedCheckpoints).toEqual({});
    expect(resetState.passedQuizzes).toEqual({});
    expect(resetState.unlockedBadges).toEqual([]);
  });
});
