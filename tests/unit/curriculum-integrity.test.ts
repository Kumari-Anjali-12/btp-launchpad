import { describe, it, expect } from 'vitest';
import {
  getAllModules,
  getAllPhases,
  getAdjacentChapters,
  validateCurriculumIntegrity,
} from '../../src/data/curriculum';

describe('Work Package 1: Curriculum Integrity & Adjacent Navigation', () => {
  it('validates entire curriculum structural integrity with zero errors', () => {
    const report = validateCurriculumIntegrity();
    expect(report.totalPhases).toBe(9);
    expect(report.totalModules).toBe(36);
    expect(report.duplicateModuleIds).toEqual([]);
    expect(report.duplicateModuleCodes).toEqual([]);
    expect(report.modulesWithMissingObjectives).toEqual([]);
    expect(report.modulesWithInvalidQuizzes).toEqual([]);
    expect(report.unresolvedPrerequisites).toEqual([]);
    expect(report.isValid).toBe(true);
  });

  it('correctly resolves adjacent modules across syllabus sequence', () => {
    // First module in syllabus has no previous
    const first = getAdjacentChapters('mod-0-1');
    expect(first.prevChapter).toBeUndefined();
    expect(first.nextChapter).toBeDefined();
    expect(first.nextChapter?.id).toBe('mod-0-2');

    // Middle module has both previous and next
    const mid = getAdjacentChapters('mod-0-2');
    expect(mid.prevChapter?.id).toBe('mod-0-1');
    expect(mid.nextChapter?.id).toBe('mod-0-3');

    // Boundary between Phase 0 and Phase 1 (Phase 0 has 6 modules: mod-0-1 through mod-0-6)
    const phase0End = getAdjacentChapters('mod-0-6');
    expect(phase0End.nextChapter?.id).toBe('mod-1-1');

    // Last module in syllabus has no next (Phase 8 has mod-8-1 and mod-8-2)
    const last = getAdjacentChapters('mod-8-2');
    expect(last.prevChapter?.id).toBe('mod-8-1');
    expect(last.nextChapter).toBeUndefined();
  });

  it('seamlessly bridges legacy chapter IDs across phase boundaries into modern modules', () => {
    // When requesting adjacent for legacy ch-4-3 (maps to mod-7-6), it bridges to mod-8-1 in Phase 8
    const legacyBoundary = getAdjacentChapters('ch-4-3');
    expect(legacyBoundary.prevChapter).toBeDefined();
    expect(legacyBoundary.nextChapter).toBeDefined();
    expect(legacyBoundary.nextChapter?.id).toBe('mod-8-1');

    // Legacy ch-0-1 maps to mod-0-1, so next is mod-0-2
    const legacyStart = getAdjacentChapters('ch-0-1');
    expect(legacyStart.nextChapter?.id).toBe('mod-0-2');
  });

  it('resolves adjacent chapters using module code strings (e.g., 0.1)', () => {
    const byCode = getAdjacentChapters('0.1');
    expect(byCode.nextChapter?.id).toBe('mod-0-2');
  });

  it('returns empty object when an invalid or unknown chapter ID is passed', () => {
    const unknown = getAdjacentChapters('non-existent-module-xyz');
    expect(unknown.prevChapter).toBeUndefined();
    expect(unknown.nextChapter).toBeUndefined();
  });
});
