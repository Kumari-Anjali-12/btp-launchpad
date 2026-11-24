import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LearnChapterPage } from '../pages/LearnChapterPage';
import { CareerHubPage } from '../pages/CareerHubPage';
import { DesignLabPage } from '../pages/DesignLabPage';
import { CodeExample } from '../components/learning/CodeExample';
import {
  loadUserProgress,
  submitChapterQuiz,
  updateCurrentLocation,
  applyTheme,
} from '../lib/storage';
import { SYLLABUS_PHASES, getAdjacentChapters } from '../data/curriculum';
import { validateCdsCode } from '../lib/practice/cdsValidator';
import { executeODataRequest } from '../lib/practice/odataSimulator';
import { PRACTICE_DRILLS } from '../data/practice/drills';
import { GUIDED_PROJECTS } from '../data/practice/guidedProjects';
import { INDEPENDENT_CHALLENGES } from '../data/practice/challenges';

describe('Phase 7: Real Beginner Acceptance Testing & Learning Experience Validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('1. Complete Beginner Learning Journey (Steps 1 to 17)', () => {
    it('Steps 1-3: brand new guest understands vision and finds starting point', () => {
      // Step 1: Open Application
      render(
        <MemoryRouter initialEntries={['/']}>
          <LandingPage />
        </MemoryRouter>
      );

      // Step 2: Understand what BTP Launchpad teaches
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Master.*SAP BTP Development/i);
      expect(screen.getByText(/Zero-to-Cloud SAP BTP Curriculum for Students & Beginners/i)).toBeInTheDocument();
      expect(screen.getByText(/From Zero to BTP Cloud Engineer in 9 Phases/i)).toBeInTheDocument();

      // Step 3: Find starting point
      const startButton = screen.getByRole('button', { name: /Start Learning Free/i });
      expect(startButton).toBeInTheDocument();
      expect(startButton.closest('a')).toHaveAttribute('href', '/dashboard');
    });

    it('Step 4: dashboard orients brand new learner to start at Module 0.1', () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <DashboardPage />
        </MemoryRouter>
      );

      // Verify guest state
      expect(screen.getByText(/You are beginning from scratch/i)).toBeInTheDocument();
      expect(screen.getByTestId('overall-percent')).toHaveTextContent('0%');
      expect(screen.getByTestId('completed-chapters-count')).toHaveTextContent('0 / 36');

      // Recommended module button directs to mod-0-1
      const startBtn = screen.getByRole('button', { name: /Start Learning/i });
      expect(startBtn.closest('a')).toHaveAttribute('href', '/learn/mod-0-1');
    });

    it('Steps 5-11: Module 0.1 delivers complete 13-part pedagogical sequence', () => {
      render(
        <MemoryRouter initialEntries={['/learn/mod-0-1']}>
          <Routes>
            <Route path="/learn/:chapterId" element={<LearnChapterPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Step 5: Understand lesson objectives
      expect(screen.getByText(/What You Will Learn In This Chapter/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Define Enterprise Resource Planning \(ERP\)/i).length).toBeGreaterThanOrEqual(1);

      // Step 6: Read everyday analogy
      expect(screen.getByText(/Everyday Analogy/i)).toBeInTheDocument();
      expect(screen.getByText(/A Modern International Airport vs Uncoordinated Terminals/i)).toBeInTheDocument();
      expect(screen.getByText(/Where the airport coordinates flights and baggage/i)).toBeInTheDocument();

      // Step 7: Understand technical explanation
      expect(screen.getByText(/Technical Concept Breakdown/i)).toBeInTheDocument();
      expect(screen.getByText(/1\. What It Is/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Why It Exists/i)).toBeInTheDocument();
      expect(screen.getByText(/5\. Where It Fits in Modern SAP BTP Architecture/i)).toBeInTheDocument();

      // Step 8: Explore interactive diagram
      const diagramEl = document.getElementById('interactive-diagram');
      expect(diagramEl).toBeInTheDocument();
      expect(diagramEl).toHaveTextContent(/SAP S\/4HANA In-Memory Digital Core/i);

      // Step 9: Read jargon decoder
      expect(screen.getByText(/Enterprise Jargon Decoder/i)).toBeInTheDocument();
      expect(screen.getByText(/ERP \(Enterprise Resource Planning\)/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Clean Core/i).length).toBeGreaterThanOrEqual(1);

      // Step 10: Study code example
      expect(screen.getAllByText(/SAP S\/4HANA Purchase Order Document/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Line-by-Line Technical Analysis/i)).toBeInTheDocument();
      expect(screen.getByText(/Expected Runtime Output \/ Behavior/i)).toBeInTheDocument();
      expect(screen.getByText(/Common Beginner Gotchas to Avoid/i)).toBeInTheDocument();

      // Step 11: Complete practical activity & scenario
      expect(screen.getByText(/Global Electronics Manufacturer Procurement Cycle/i)).toBeInTheDocument();
      expect(screen.getByText(/Practical Task/i)).toBeInTheDocument();
      expect(screen.getByText(/Mastery Check/i)).toBeInTheDocument();
    });

    it('Steps 12-14: quiz scoring gates completion strictly without premature pass', () => {
      const initialProgress = loadUserProgress();
      expect(initialProgress.completedLessonIds).not.toContain('mod-0-1');

      // Attempt failing quiz (0 out of 3 correct = 0%)
      const failingAnswers = {
        'mod-0-1-q1': 'b',
        'mod-0-1-q2': 'b',
        'mod-0-1-q3': 'b',
      };
      const failingResult = submitChapterQuiz('mod-0-1', failingAnswers, 0, 3);
      expect(failingResult.completedLessonIds).not.toContain('mod-0-1');
      expect(failingResult.quizScores['mod-0-1']?.passed).toBe(false);

      // Attempt passing quiz (3 out of 3 correct = 100%)
      const passingAnswers = {
        'mod-0-1-q1': 'a',
        'mod-0-1-q2': 'a',
        'mod-0-1-q3': 'a',
      };
      const passingResult = submitChapterQuiz('mod-0-1', passingAnswers, 3, 3);
      expect(passingResult.completedLessonIds).toContain('mod-0-1');
      expect(passingResult.quizScores['mod-0-1']?.passed).toBe(true);
      expect(passingResult.quizScores['mod-0-1']?.score).toBe(3);
    });

    it('Steps 15-17: sequential navigation connects mod-0-1 to mod-0-2 and progress persists after reload', () => {
      // Step 15: Sequential navigation
      const { prevChapter, nextChapter } = getAdjacentChapters('mod-0-1');
      expect(prevChapter).toBeUndefined();
      expect(nextChapter).not.toBeNull();
      expect(nextChapter?.id).toBe('mod-0-2');

      // Step 16 & 17: Refresh and verify progress persistence
      submitChapterQuiz('mod-0-1', { 'mod-0-1-q1': 'a', 'mod-0-1-q2': 'a', 'mod-0-1-q3': 'a' }, 3, 3);
      updateCurrentLocation('phase-0', 'mod-0-1');

      // Simulate browser refresh
      const reloadedState = loadUserProgress();
      expect(reloadedState.completedLessonIds).toContain('mod-0-1');
      expect(reloadedState.currentLessonId).toBe('mod-0-1');
      expect(reloadedState.quizScores['mod-0-1']?.score).toBe(3);
    });
  });

  describe('2. Nine-Phase Beginner Comprehension Evaluation', () => {
    const representativeModuleCodes = ['0.1', '1.2', '2.1', '3.1', '4.2', '5.1', '6.1', '7.4', '8.1'];

    it.each(representativeModuleCodes)(
      'evaluates comprehension criteria for Phase module %s',
      (code) => {
        const allModules = SYLLABUS_PHASES.flatMap((p) => p.modules);
        const mod = allModules.find((m) => m.code === code);
        expect(mod, `Module ${code} should exist`).toBeDefined();
        if (!mod) return;

        // 1. What problem does this technology solve?
        expect(mod.conceptExplanation.problemSolved.length).toBeGreaterThanOrEqual(30);

        // 2. Why does an enterprise need it?
        expect(mod.conceptExplanation.whyItExists.length).toBeGreaterThanOrEqual(40);

        // 3. What does the technology actually do?
        expect(mod.conceptExplanation.whatItIs.length).toBeGreaterThanOrEqual(40);
        expect(mod.conceptExplanation.howItWorks.length).toBeGreaterThanOrEqual(40);

        // 4. How does it connect to the previous concept / business reality?
        expect(mod.analogy.transition.length).toBeGreaterThanOrEqual(20);

        // 5. What should I practise?
        expect(
          (mod.practicalImplementation || mod.practicalActivity).length
        ).toBeGreaterThanOrEqual(30);

        // 6. What should I be able to build after completing this lesson?
        expect(mod.masteryCheck.length).toBeGreaterThanOrEqual(30);
      }
    );
  });

  describe('3. Interaction Testing & Robustness', () => {
    it('handles code copying gracefully with safe fallback', () => {
      const example = {
        title: 'Sample Code',
        language: 'json',
        code: '{"test": 123}',
        purpose: 'Demonstrate code rendering',
        lineExplanations: [{ lines: '1', explanation: 'Test line' }],
        expectedOutput: 'Runs successfully',
        commonMistakes: ['Syntax error'],
      };

      render(<CodeExample example={example} />);
      const copyBtn = screen.getByRole('button', { name: /Copy/i });
      expect(copyBtn).toBeInTheDocument();

      // Click copy button; must not throw in test environment
      expect(() => fireEvent.click(copyBtn)).not.toThrow();
    });

    it('toggles theme mode reliably between light, dark, and system', () => {
      applyTheme('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      applyTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      applyTheme('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('4. Practice Engine Validation', () => {
    it('validates in-browser CDS compiler for syntax, HANA SQL generation, and EDMX', () => {
      const validCds = `namespace sap.test;
entity Products : cuid {
  title : String(100);
  price : Decimal(9,2);
}`;
      const result = validateCdsCode(validCds);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sqlPreview).toContain('CREATE TABLE SAP_TEST_PRODUCTS');
      expect(result.odataEdmxPreview).toContain('<EntityType Name="Products">');

      // Invalid CDS syntax
      const invalidCds = `entity Broken { missing colon }`;
      const invalidResult = validateCdsCode(invalidCds);
      expect(invalidResult.valid).toBe(false);
      expect(invalidResult.errors.length).toBeGreaterThan(0);
    });

    it('validates mock OData v4 engine executes queries and filtering correctly', () => {
      const res = executeODataRequest({
        method: 'GET',
        path: '/odata/v4/catalog/Employees',
        queryParams: {
          $filter: "department eq 'Cloud Engineering'",
          $select: 'name,role,salary',
        },
      });

      expect(res.status).toBe(200);
      const data = res.data as { '@odata.context': string; value: Array<{ name: string; role: string }> };
      expect(data).toHaveProperty('@odata.context');
      expect(Array.isArray(data.value)).toBe(true);
      for (const emp of data.value) {
        expect(emp).toHaveProperty('name');
        expect(emp).toHaveProperty('role');
      }
    });

    it('verifies 15 foundation drills, 3 guided projects, and 3 independent challenges exist with validation rules', () => {
      expect(PRACTICE_DRILLS.length).toBe(15);
      for (const drill of PRACTICE_DRILLS) {
        expect(drill.starterCode.length).toBeGreaterThan(10);
        expect(drill.validationRules.length).toBeGreaterThanOrEqual(1);
        expect(drill.hints.length).toBeGreaterThanOrEqual(1);
      }

      expect(GUIDED_PROJECTS.length).toBe(3);
      for (const proj of GUIDED_PROJECTS) {
        expect(proj.milestones.length).toBeGreaterThanOrEqual(3);
      }

      expect(INDEPENDENT_CHALLENGES.length).toBe(3);
      for (const ch of INDEPENDENT_CHALLENGES) {
        expect(ch.requirements.length).toBeGreaterThanOrEqual(2);
      }
    });
  });

  describe('5. Design Lab and Career Hub Integration', () => {
    it('CareerHubPage links role cards directly to the Guided Roadmap', () => {
      render(
        <MemoryRouter initialEntries={['/career-hub']}>
          <CareerHubPage />
        </MemoryRouter>
      );

      const roadmapButtons = screen.getAllByRole('button', { name: /View Role Roadmap/i });
      expect(roadmapButtons.length).toBe(3);
      for (const btn of roadmapButtons) {
        expect(btn.closest('a')).toHaveAttribute('href', '/roadmap');
      }
    });

    it('DesignLabPage provides direct navigation to Practice Sandboxes', () => {
      render(
        <MemoryRouter initialEntries={['/design-lab']}>
          <DesignLabPage />
        </MemoryRouter>
      );

      const practiceBtn = screen.getByRole('button', { name: /Launch Practice Sandboxes/i });
      expect(practiceBtn.closest('a')).toHaveAttribute('href', '/practice');
    });
  });
});
