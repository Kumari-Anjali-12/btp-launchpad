import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import {
  loadUserProgress,
  resetUserProgress,
  submitChapterQuiz,
  markChapterComplete,
} from '../lib/storage';
import { CURRICULUM_MODULES, getAllChapters, getAdjacentChapters } from '../data/curriculum';

describe('Phase 2 Comprehensive Quality Audit', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  it('verifies curriculum structure: 5 modules, 15 chapters, and 45 questions', () => {
    expect(CURRICULUM_MODULES).toHaveLength(5);
    const chapters = getAllChapters();
    expect(chapters).toHaveLength(15);

    let totalQuestions = 0;
    chapters.forEach((ch) => {
      expect(ch.learningObjectives.length).toBeGreaterThanOrEqual(2);
      expect(ch.analogy.analogy).toBeTruthy();
      expect(ch.analogy.transition).toBeTruthy();
      expect(ch.conceptExplanation.whatItIs).toBeTruthy();
      expect(ch.conceptExplanation.whyItExists).toBeTruthy();
      expect(ch.conceptExplanation.problemSolved).toBeTruthy();
      expect(ch.conceptExplanation.howItWorks).toBeTruthy();
      expect(ch.conceptExplanation.btpFit).toBeTruthy();
      expect(ch.jargonTerms.length).toBeGreaterThanOrEqual(3);
      expect(ch.technicalExample.code).toBeTruthy();
      expect(ch.technicalExample.lineExplanations.length).toBeGreaterThanOrEqual(2);
      expect(ch.businessScenario.workflowSteps.length).toBeGreaterThanOrEqual(3);
      expect(ch.quizQuestions).toHaveLength(3);

      ch.quizQuestions.forEach((q) => {
        totalQuestions += 1;
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        const correct = q.options.filter((o) => o.isCorrect);
        expect(correct).toHaveLength(1);
        q.options.forEach((opt) => {
          expect(opt.explanation).toBeTruthy();
        });
      });
    });

    expect(totalQuestions).toBe(45);
  });

  it('renders every single module detail page (0 through 4) without errors', () => {
    for (const mod of CURRICULUM_MODULES) {
      const { unmount } = render(
        <MemoryRouter initialEntries={[`/chapters/${mod.id}`]}>
          <AppRoutes />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { name: new RegExp(mod.title, 'i') })).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(`Module ${mod.number}`, 'i')).length).toBeGreaterThan(0);
      unmount();
    }
  });

  it('renders all 15 individual chapters with complete 10-section anatomy', () => {
    const chapters = getAllChapters();
    for (const ch of chapters) {
      const { unmount } = render(
        <MemoryRouter initialEntries={[`/learn/${ch.id}`]}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Verify header with escaped title regex
      const escapedTitle = ch.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expect(screen.getByRole('heading', { name: new RegExp(escapedTitle, 'i') })).toBeInTheDocument();
      // Verify objectives
      expect(screen.getByText(/What You Will Learn In This Chapter/i)).toBeInTheDocument();
      // Verify analogy
      expect(screen.getByText(/Everyday Analogy:/i)).toBeInTheDocument();
      // Verify concept section
      expect(screen.getByText(/1\. What It Is/i)).toBeInTheDocument();
      // Verify diagram
      expect(screen.getByText(/Interactive Visual Architecture/i)).toBeInTheDocument();
      // Verify jargon decoder
      expect(screen.getByText(/Enterprise Jargon Decoder/i)).toBeInTheDocument();
      // Verify technical example
      expect(screen.getByText(/Practical Technical Example/i)).toBeInTheDocument();
      // Verify business scenario with hypothetical badge
      expect(screen.getByText(/Hypothetical Case Study/i)).toBeInTheDocument();
      // Verify quiz section with 3 questions
      expect(screen.getByText(/Check Your Understanding \(3 Questions\)/i)).toBeInTheDocument();

      unmount();
    }
  });

  it('verifies bidirectional chapter navigation across entire curriculum chain', () => {
    const chapters = getAllChapters();
    for (let i = 0; i < chapters.length; i++) {
      const current = chapters[i]!;
      const { prevChapter, nextChapter } = getAdjacentChapters(current.id);

      if (i > 0) {
        expect(prevChapter).toBeDefined();
        expect(prevChapter?.id).toBe(chapters[i - 1]?.id);
      } else {
        expect(prevChapter).toBeUndefined();
      }

      if (i < chapters.length - 1) {
        expect(nextChapter).toBeDefined();
        expect(nextChapter?.id).toBe(chapters[i + 1]?.id);
      } else {
        expect(nextChapter).toBeUndefined();
      }
    }
  });

  it('enforces quiz threshold: 1/3 fails, 2/3 and 3/3 pass and mark chapter complete', () => {
    // 1/3 (33%) -> Not passed
    const pFail = submitChapterQuiz('ch-0-1', { 'q-0-1-1': 'opt-b' }, 1, 3);
    expect(pFail.quizScores['ch-0-1']?.passed).toBe(false);
    expect(pFail.completedChapterIds).not.toContain('ch-0-1');

    // 2/3 (66.7%) -> Passed
    const pPass = submitChapterQuiz('ch-0-1', { 'q-0-1-1': 'opt-b', 'q-0-1-2': 'opt-b' }, 2, 3);
    expect(pPass.quizScores['ch-0-1']?.passed).toBe(true);
    expect(pPass.completedChapterIds).toContain('ch-0-1');

    // 3/3 (100%) -> Passed with best score recorded
    const pPerfect = submitChapterQuiz('ch-0-1', { 'q-0-1-1': 'opt-b', 'q-0-1-2': 'opt-b', 'q-0-1-3': 'opt-b' }, 3, 3);
    expect(pPerfect.quizScores['ch-0-1']?.bestScore).toBe(3);
    expect(pPerfect.completedChapterIds).toContain('ch-0-1');
  });

  it('verifies full dashboard and roadmap synchronization as chapters complete', () => {
    markChapterComplete('ch-0-1');
    markChapterComplete('ch-0-2');
    markChapterComplete('ch-0-3');

    // Module 0 should be 100% complete
    const { unmount } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByTestId('completed-chapters-count')).toHaveTextContent('3 / 15');
    expect(screen.getByTestId('overall-percent')).toHaveTextContent('20%');
    expect(screen.getByText(/3 of 3 chapters completed/i)).toBeInTheDocument();
    // Next unfinished chapter should now be Chapter 1.1
    expect(screen.getByText(/Chapter 1\.1: CAP Architecture & Core Data Services/i)).toBeInTheDocument();
    unmount();

    // Verify Roadmap reflects completion
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/^Completed$/i).length).toBeGreaterThan(0);
  });

  it('resets progress cleanly when resetUserProgress is executed', () => {
    markChapterComplete('ch-0-1');
    markChapterComplete('ch-1-1');
    expect(loadUserProgress().completedChapterIds).toHaveLength(2);

    resetUserProgress();
    const cleanState = loadUserProgress();
    expect(cleanState.completedChapterIds).toHaveLength(0);
    expect(Object.keys(cleanState.quizScores)).toHaveLength(0);
  });
});
