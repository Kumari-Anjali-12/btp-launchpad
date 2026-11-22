import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadUserProgress,
  saveUserProgress,
  toggleChapterCompletion,
  recordQuizScore,
  resetUserProgress,
  applyTheme,
  DEFAULT_PROGRESS_STATE,
} from '../lib/storage';
import { UserProgressState } from '../types/storage';

describe('Storage & Progress Engine', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  it('initializes with default state when localStorage is empty', () => {
    const progress = loadUserProgress();
    expect(progress).toEqual(DEFAULT_PROGRESS_STATE);
    expect(progress.completedChapterIds).toHaveLength(0);
    expect(progress.theme).toBe('system');
  });

  it('safely recovers when localStorage contains corrupted JSON', () => {
    window.localStorage.setItem('btp_launchpad_guest_state_v1', 'corrupted-invalid-json{{{');
    const progress = loadUserProgress();
    expect(progress).toEqual(DEFAULT_PROGRESS_STATE);
  });

  it('saves and loads user progress accurately', () => {
    const customState: UserProgressState = {
      ...DEFAULT_PROGRESS_STATE,
      theme: 'dark',
      completedChapterIds: ['ch-0-1', 'ch-0-2'],
      streakDays: 3,
    };
    saveUserProgress(customState);

    const reloaded = loadUserProgress();
    expect(reloaded.theme).toBe('dark');
    expect(reloaded.completedChapterIds).toEqual(['ch-0-1', 'ch-0-2']);
    expect(reloaded.streakDays).toBe(3);
  });

  it('toggles chapter completion accurately', () => {
    // Add chapter
    const state1 = toggleChapterCompletion('ch-1-1');
    expect(state1.completedChapterIds).toContain('ch-1-1');
    expect(state1.streakDays).toBeGreaterThanOrEqual(1);

    // Toggle same chapter off
    const state2 = toggleChapterCompletion('ch-1-1');
    expect(state2.completedChapterIds).not.toContain('ch-1-1');
  });

  it('records quiz scores accurately and sets passed status', () => {
    const state = recordQuizScore('quiz-1', 4, 5);
    expect(state.quizScores['quiz-1']).toBeDefined();
    expect(state.quizScores['quiz-1']?.score).toBe(4);
    expect(state.quizScores['quiz-1']?.total).toBe(5);
    expect(state.quizScores['quiz-1']?.passed).toBe(true);
  });

  it('resets progress back to default', () => {
    toggleChapterCompletion('ch-0-1');
    expect(loadUserProgress().completedChapterIds).toHaveLength(1);

    const reset = resetUserProgress();
    expect(reset.completedChapterIds).toHaveLength(0);
    expect(loadUserProgress().completedChapterIds).toHaveLength(0);
  });

  it('applies dark theme class to document root', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    applyTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
