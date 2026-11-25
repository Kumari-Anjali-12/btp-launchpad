import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  validateCurriculumIntegrity,
  getAdjacentChapters,
} from '../../src/data/curriculum';
import { ChapterNavigation } from '../../src/components/learning/ChapterNavigation';
import { Quiz } from '../../src/components/learning/Quiz';
import {
  loadUserProgress,
  saveUserProgress,
  updateStreak,
  exportUserProgressJson,
  importUserProgressJson,
  resetUserProgress,
  DEFAULT_PROGRESS_STATE,
} from '../../src/lib/storage';
import { ShellLayout } from '../../src/components/layout/ShellLayout';
import { ErrorBoundary } from '../../src/components/common/ErrorBoundary';
import { QuizQuestion } from '../../src/types/curriculum';

describe('Phase 9.2 Nine-Commit Sprint Full-Journey Regression Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Curriculum Integrity & Chapter Navigation Integration (WP1 & WP4)', () => {
    it('verifies that full curriculum passes integrity checks and has seamless navigation boundaries', () => {
      // WP1 integrity validation
      const integrity = validateCurriculumIntegrity();
      expect(integrity.isValid).toBe(true);
      expect(integrity.duplicateModuleIds).toHaveLength(0);
      expect(integrity.duplicateModuleCodes).toHaveLength(0);
      expect(integrity.modulesWithMissingObjectives).toHaveLength(0);
      expect(integrity.modulesWithInvalidQuizzes).toHaveLength(0);
      expect(integrity.totalModules).toBe(36);
      expect(integrity.totalPhases).toBe(9);

      // Phase 0 -> Phase 1 boundary
      const boundaryP0P1 = getAdjacentChapters('mod-0-6');
      expect(boundaryP0P1.nextChapter?.id).toBe('mod-1-1');

      // Phase 7 -> Phase 8 boundary
      const boundaryP7P8 = getAdjacentChapters('mod-7-6');
      expect(boundaryP7P8.nextChapter?.id).toBe('mod-8-1');

      // End of curriculum
      const terminalModule = getAdjacentChapters('mod-8-2');
      expect(terminalModule.nextChapter).toBeUndefined();
    });

    it('renders ChapterNavigation for modern modules without undefined chapter labels', () => {
      const adjacent = getAdjacentChapters('mod-0-1');
      expect(adjacent.nextChapter).toBeDefined();

      render(
        <MemoryRouter>
          <ChapterNavigation
            prevChapter={adjacent.prevChapter}
            nextChapter={adjacent.nextChapter}
            moduleId="phase-0"
          />
        </MemoryRouter>
      );

      // Must not display "Chapter undefined"
      expect(screen.queryByText(/Chapter undefined/i)).toBeNull();
      // Should display next label
      expect(screen.getByRole('button', { name: /Next:/i })).toBeInTheDocument();
    });
  });

  describe('Quiz State Lifecycle and Retry Hardening (WP2)', () => {
    const mockQuestions: [QuizQuestion, QuizQuestion, QuizQuestion] = [
      {
        id: 'rq1',
        question: 'Which service provides user authentication in SAP BTP Cloud Foundry?',
        options: [
          { id: 'rq1-o1', text: 'SAP HANA Cloud', isCorrect: false, explanation: 'HANA is a database.' },
          { id: 'rq1-o2', text: 'SAP XSUAA / Cloud Identity Services', isCorrect: true, explanation: 'Correct.' },
        ],
      },
      {
        id: 'rq2',
        question: 'What is the Clean Core strategy?',
        options: [
          { id: 'rq2-o1', text: 'Side-by-side cloud extensibility', isCorrect: true, explanation: 'Correct.' },
          { id: 'rq2-o2', text: 'Direct modification of standard tables', isCorrect: false, explanation: 'Incorrect.' },
        ],
      },
      {
        id: 'rq3',
        question: 'Which tool builds Multi-Target Applications (MTA)?',
        options: [
          { id: 'rq3-o1', text: 'Cloud MTA Build Tool (mbt)', isCorrect: true, explanation: 'Correct.' },
          { id: 'rq3-o2', text: 'Babel', isCorrect: false, explanation: 'Incorrect.' },
        ],
      },
    ];

    it('allows retaking a quiz without getting prematurely locked out', () => {
      const handleSubmit = vi.fn();

      render(
        <Quiz
          questions={mockQuestions}
          chapterId="mod-0-1"
          onQuizSubmit={handleSubmit}
        />
      );

      // Select answers for all 3 questions
      const opt1 = screen.getByLabelText(/SAP XSUAA \/ Cloud Identity Services/i);
      fireEvent.click(opt1);

      const opt2 = screen.getByLabelText(/Side-by-side cloud extensibility/i);
      fireEvent.click(opt2);

      const opt3 = screen.getByLabelText(/Cloud MTA Build Tool \(mbt\)/i);
      fireEvent.click(opt3);

      // Submit
      const submitBtn = screen.getByRole('button', { name: /Submit Knowledge Check/i });
      fireEvent.click(submitBtn);

      expect(handleSubmit).toHaveBeenCalledWith(3, 3, expect.any(Object));
      expect(screen.getByText(/\(Passed!\)/i)).toBeInTheDocument();

      // Click "Retry Knowledge Check"
      const retakeBtn = screen.getByRole('button', { name: /Retry Knowledge Check/i });
      fireEvent.click(retakeBtn);

      // Options must be re-enabled and unlocked
      expect(opt1).not.toBeDisabled();
      expect(opt2).not.toBeDisabled();
      expect(opt3).not.toBeDisabled();
    });
  });

  describe('Storage Hardening and Safe Import/Export (WP3)', () => {
    it('sanitizes malformed storage entries and cleanly exports/imports valid JSON', () => {
      // Inject corrupted data
      localStorage.setItem(
        'btp_launchpad_guest_state_v1',
        JSON.stringify({
          ...DEFAULT_PROGRESS_STATE,
          completedLessonIds: ['mod-0-1', 'mod-0-1', 'mod-0-2'],
          streakDays: -10,
          lastActiveDate: 'invalid-date-string',
        })
      );

      const progress = loadUserProgress();
      // Should deduplicate arrays
      expect(progress.completedLessonIds).toEqual(['mod-0-1', 'mod-0-2']);
      // Should clamp negative numbers
      expect(progress.streakDays).toBeGreaterThanOrEqual(0);

      // Test safe export
      const exportedJson = exportUserProgressJson();
      expect(typeof exportedJson).toBe('string');
      const parsed = JSON.parse(exportedJson);
      expect(parsed.completedLessonIds).toEqual(['mod-0-1', 'mod-0-2']);

      // Test invalid import protection (returns false)
      const badImportResult = importUserProgressJson('not-valid-json{{{');
      expect(badImportResult).toBe(false);

      // Test reset with preference preservation
      resetUserProgress(true);
      const afterReset = loadUserProgress();
      expect(afterReset.completedLessonIds).toEqual([]);
    });

    it('updates streak safely without NaN when called on valid dates', () => {
      const state = loadUserProgress();
      const updated = updateStreak(state);
      expect(isNaN(updated.streakDays)).toBe(false);
      expect(updated.streakDays).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Layout Accessibility & Skip Link Navigation (WP5)', () => {
    it('renders WCAG-compliant skip-to-content link and main landmark target', () => {
      render(
        <MemoryRouter>
          <ShellLayout>
            <div>Test Page Content</div>
          </ShellLayout>
        </MemoryRouter>
      );

      const skipLink = screen.getByText(/Skip to main content/i);
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');

      const mainContent = document.getElementById('main-content');
      expect(mainContent).not.toBeNull();
      expect(mainContent).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Error Boundary Diagnostics and Self-Healing (WP7)', () => {
    it('catches render errors in child components and provides recovery actions and diagnostics toggle', () => {
      const CrashingComponent = () => {
        throw new Error('Integration test crash trigger');
      };

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <CrashingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText(/An Unexpected Application Error Occurred/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Return to Dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Clear Cache & Reload/i })).toBeInTheDocument();

      // Expand diagnostics to view error details
      const toggleDiagnosticsBtn = screen.getByRole('button', { name: /Show Technical Diagnostics/i });
      fireEvent.click(toggleDiagnosticsBtn);

      const errorMentions = screen.getAllByText(/Integration test crash trigger/i);
      expect(errorMentions.length).toBeGreaterThanOrEqual(1);

      consoleErrorSpy.mockRestore();
    });
  });
});
