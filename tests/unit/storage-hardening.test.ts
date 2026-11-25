import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadUserProgress,
  saveUserProgress,
  updateStreak,
  resetUserProgress,
  exportUserProgressJson,
  importUserProgressJson,
  DEFAULT_PROGRESS_STATE,
} from '../../src/lib/storage';
import { UserProgressState } from '../../src/types/storage';

describe('Work Package 3: Learning Progress Storage Hardening', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('safely handles corrupted lastActiveDate without producing NaN streak days', () => {
    const corruptedState: UserProgressState = {
      ...DEFAULT_PROGRESS_STATE,
      lastActiveDate: 'not-a-valid-date-string',
      streakDays: 5,
    };

    const updated = updateStreak(corruptedState);
    expect(Number.isFinite(updated.streakDays)).toBe(true);
    expect(updated.streakDays).toBe(1);
    expect(typeof updated.lastActiveDate).toBe('string');
  });

  it('deduplicates completedLessonIds and completedChapterIds during loaded state sanitization', () => {
    const rawCorrupted = {
      ...DEFAULT_PROGRESS_STATE,
      completedLessonIds: ['mod-0-1', 'mod-0-1', 'mod-0-2', '', '  ', null],
      completedChapterIds: ['ch-0-1', 'ch-0-1', 'ch-0-2'],
      streakDays: 4.8, // Float
      totalHoursLearned: -10, // Negative
    };

    localStorage.setItem('btp_launchpad_guest_state_v1', JSON.stringify(rawCorrupted));
    const loaded = loadUserProgress();

    // Verify deduplication and removal of empty/null strings
    expect(loaded.completedLessonIds).toContain('mod-0-1');
    expect(loaded.completedLessonIds).toContain('mod-0-2');
    expect(loaded.completedLessonIds.filter((id) => id === 'mod-0-1')).toHaveLength(1);
    expect(loaded.completedLessonIds).not.toContain('');

    // Verify streakDays rounded to integer
    expect(loaded.streakDays).toBe(4);

    // Verify negative hours reset to 0
    expect(loaded.totalHoursLearned).toBe(0);
  });

  it('preserves user preferences when resetting learning progress', () => {
    const customState: UserProgressState = {
      ...DEFAULT_PROGRESS_STATE,
      theme: 'dark',
      targetWeeklyHours: 15,
      completedLessonIds: ['mod-0-1', 'mod-0-2'],
      streakDays: 10,
    };
    saveUserProgress(customState);

    // Reset with preservePreferences: true (default)
    const reset = resetUserProgress(true);
    expect(reset.completedLessonIds).toEqual([]);
    expect(reset.streakDays).toBe(0);
    // User preferences preserved!
    expect(reset.theme).toBe('dark');
    expect(reset.targetWeeklyHours).toBe(15);
  });

  it('exports and imports valid user progress JSON round-trip', () => {
    const initial: UserProgressState = {
      ...DEFAULT_PROGRESS_STATE,
      completedLessonIds: ['mod-0-1', 'mod-0-2', 'mod-1-1'],
      streakDays: 3,
      totalHoursLearned: 6.5,
    };
    saveUserProgress(initial);

    const exported = exportUserProgressJson();
    expect(typeof exported).toBe('string');
    expect(exported).toContain('mod-1-1');

    // Clear and restore
    localStorage.clear();
    const success = importUserProgressJson(exported);
    expect(success).toBe(true);

    const reloaded = loadUserProgress();
    expect(reloaded.completedLessonIds).toEqual(['mod-0-1', 'mod-0-2', 'mod-1-1']);
    expect(reloaded.streakDays).toBe(3);
    expect(reloaded.totalHoursLearned).toBe(6.5);
  });

  it('rejects malformed JSON on import without throwing or corrupting storage', () => {
    const result = importUserProgressJson('not-valid-json{{{{');
    expect(result).toBe(false);
  });
});
