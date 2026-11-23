import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import {
  getAllPhases,
  getAllModules,
  getAllCapstones,
  getCurriculumProgress,
  isModuleCompleted,
} from '../data/curriculum';
import { ROADMAP_NODES } from '../data/curriculum/roadmapGraph';
import { loadUserProgress, markChapterComplete, resetUserProgress } from '../lib/storage';

describe('Phase 4: Curriculum Consistency & Interactive Dependency Roadmap', () => {
  beforeEach(() => {
    localStorage.clear();
    resetUserProgress();
  });

  describe('1. Authoritative Curriculum Data Architecture', () => {
    it('verifies exact 9 phases, 36 modules, and 9 capstones structure', () => {
      const phases = getAllPhases();
      expect(phases).toHaveLength(9);

      const allModules = getAllModules();
      expect(allModules).toHaveLength(36);

      const allCapstones = getAllCapstones();
      expect(allCapstones).toHaveLength(9);

      // Verify each phase has an associated capstone
      phases.forEach((phase, index) => {
        expect(phase.number).toBe(index);
        expect(phase.capstone).toBeDefined();
        expect(phase.capstone.phaseId).toBe(phase.id);
        expect(phase.modules.length).toBeGreaterThan(0);
      });
    });

    it('verifies getCurriculumProgress calculates accurate metrics across 9 phases', () => {
      const emptyProgress = loadUserProgress();
      const emptySummary = getCurriculumProgress(emptyProgress);

      expect(emptySummary.totalPhases).toBe(9);
      expect(emptySummary.totalModules).toBe(36);
      expect(emptySummary.completedModuleCount).toBe(0);
      expect(emptySummary.overallPercent).toBe(0);
      expect(emptySummary.completedPhaseCount).toBe(0);
      expect(emptySummary.currentPhase.number).toBe(0);
      expect(emptySummary.nextRecommendedModule?.id).toBe('mod-0-1');
      expect(emptySummary.phaseSummaries).toHaveLength(9);

      // Mark first module complete via legacy chapter ID
      markChapterComplete('ch-0-1');
      const updatedProgress = loadUserProgress();
      const updatedSummary = getCurriculumProgress(updatedProgress);

      expect(updatedSummary.completedModuleCount).toBe(1);
      expect(updatedSummary.overallPercent).toBe(3); // Math.round(1/36 * 100) = 3%
      expect(isModuleCompleted('mod-0-1', updatedProgress)).toBe(true);
      expect(isModuleCompleted('ch-0-1', updatedProgress)).toBe(true);
      expect(updatedSummary.nextRecommendedModule?.id).toBe('mod-0-2');
    });

    it('verifies roadmap dependency graph contains typed nodes and dependency edges', () => {
      expect(ROADMAP_NODES.length).toBeGreaterThanOrEqual(36);

      const nodeTypes = new Set(ROADMAP_NODES.map((n) => n.nodeType));
      expect(nodeTypes.has('module')).toBe(true);
      expect(nodeTypes.has('capstone')).toBe(true);
      expect(nodeTypes.has('practice')).toBe(true);
      expect(nodeTypes.has('project')).toBe(true);

      // Nodes with dependencies must specify relationship types
      const nodesWithEdges = ROADMAP_NODES.filter(
        (n) => n.dependencyEdges && n.dependencyEdges.length > 0
      );
      expect(nodesWithEdges.length).toBeGreaterThan(0);

      nodesWithEdges.forEach((node) => {
        node.dependencyEdges?.forEach((edge) => {
          expect(['requires', 'recommended', 'reinforces', 'practiced-through', 'applied-in', 'demonstrated-by']).toContain(
            edge.relationship
          );
          expect(edge.targetId).toBeDefined();
        });
      });
    });
  });

  describe('2. Landing Page 9-Phase Alignment', () => {
    it('renders all 9 phases and zero stale 5-module / 15-chapter claims', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Assert headline references 9 phases
      expect(
        screen.getByText(/From Zero to BTP Cloud Engineer in 9 Phases/i)
      ).toBeInTheDocument();

      // Assert description references 36 modules and 9 capstones
      expect(
        screen.getByText(/Exactly 36 deep-dive modules and 9 production-grade capstone deliverables/i)
      ).toBeInTheDocument();

      // Ensure every phase heading is rendered
      const phases = getAllPhases();
      phases.forEach((p) => {
        expect(screen.getByText(new RegExp(`Phase ${p.number} •`, 'i'))).toBeInTheDocument();
        expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
      });

      // Assert no stale text
      expect(screen.queryByText(/5 progressive learning milestones/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/15 chapters covering/i)).not.toBeInTheDocument();
    });
  });

  describe('3. Actionable Dashboard Verification', () => {
    it('renders 5 metric cards and accurate progress state', () => {
      const phases = getAllPhases();
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // 5 metrics
      expect(screen.getByTestId('overall-percent')).toHaveTextContent('0%');
      expect(screen.getByTestId('completed-chapters-count')).toHaveTextContent('0 / 36');
      expect(screen.getByText('/ 9')).toBeInTheDocument(); // Phases Mastered
      expect(screen.getByText('/ 15')).toBeInTheDocument(); // Practice Drills
      expect(screen.getByText(/Learning Streak/i)).toBeInTheDocument();

      // Next Recommended Module card
      expect(screen.getByText(/Next Recommended Module/i)).toBeInTheDocument();
      expect(screen.getByText(/Module 0\.1:/i)).toBeInTheDocument();

      // Current Active Phase
      expect(screen.getByText(/Current Active Phase/i)).toBeInTheDocument();
      expect(screen.getAllByText('Pre-learning').length).toBeGreaterThan(0);

      // All 9 phases overview
      phases.forEach((p) => {
        expect(
          screen.getAllByText(new RegExp(`Phase ${p.number} •`, 'i')).length
        ).toBeGreaterThan(0);
        expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
      });
    });

    it('updates dynamically when modules are completed', () => {
      markChapterComplete('mod-0-1');
      markChapterComplete('mod-0-2');

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppRoutes />
        </MemoryRouter>
      );

      expect(screen.getByTestId('completed-chapters-count')).toHaveTextContent('2 / 36');
      expect(screen.getByTestId('overall-percent')).toHaveTextContent('6%');
      expect(screen.getByText(/2 of 6 modules completed/i)).toBeInTheDocument();
      expect(screen.getByText(/Module 0\.3:/i)).toBeInTheDocument(); // Next recommended
    });
  });

  describe('4. Interactive Dependency Roadmap Controls & Drawer', () => {
    it('renders 9-phase quick navigation strip and view tabs', () => {
      render(
        <MemoryRouter initialEntries={['/roadmap']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Assert header info
      expect(screen.getByText(/9-Phase Authoritative Syllabus/i)).toBeInTheDocument();
      expect(screen.getByText(/36 Modules • 9 Capstone Deliverables/i)).toBeInTheDocument();

      // Quick Nav Strip has buttons for Phase 0 to Phase 8
      for (let i = 0; i <= 8; i++) {
        expect(screen.getAllByRole('button', { name: new RegExp(`Phase ${i}`, 'i') }).length).toBeGreaterThan(0);
      }

      // View tabs exist
      expect(screen.getByRole('button', { name: /Visual Dependency Graph/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /9-Phase Sequence/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Pace & Timeline Calculator/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /9 Capstone Deliverables/i })).toBeInTheDocument();
    });

    it('supports node type filtering in dependency graph', () => {
      render(
        <MemoryRouter initialEntries={['/roadmap']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Switch to Visual Dependency Graph tab
      fireEvent.click(screen.getByRole('button', { name: /Visual Dependency Graph/i }));

      const capstonesFilterBtn = screen.getByRole('button', { name: /Capstones \(9\)/i });
      expect(capstonesFilterBtn).toBeInTheDocument();

      // Click Capstones filter
      fireEvent.click(capstonesFilterBtn);

      // Only capstone nodes should remain visible
      expect(screen.getByText(/Capstone: Secured API Gateway/i)).toBeInTheDocument();
      expect(screen.getByText(/Capstone: Order & Supplier Service/i)).toBeInTheDocument();
    });

    it('supports zoom in, zoom out, and reset view controls', () => {
      render(
        <MemoryRouter initialEntries={['/roadmap']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Switch to Visual Dependency Graph tab
      fireEvent.click(screen.getByRole('button', { name: /Visual Dependency Graph/i }));

      expect(screen.getByText('100%')).toBeInTheDocument();

      const zoomInBtn = screen.getByTitle('Zoom In');
      const zoomOutBtn = screen.getByTitle('Zoom Out');
      const resetBtn = screen.getByTitle('Reset View');

      fireEvent.click(zoomInBtn);
      expect(screen.getByText('110%')).toBeInTheDocument();

      fireEvent.click(zoomOutBtn);
      expect(screen.getByText('100%')).toBeInTheDocument();

      fireEvent.click(zoomInBtn);
      fireEvent.click(zoomInBtn);
      expect(screen.getByText('120%')).toBeInTheDocument();

      fireEvent.click(resetBtn);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('opens node detail drawer with explicit dependency relationships and action link', () => {
      render(
        <MemoryRouter initialEntries={['/roadmap']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Switch to Visual Dependency Graph tab
      fireEvent.click(screen.getByRole('button', { name: /Visual Dependency Graph/i }));

      // Find and click node mod-0-1: SAP World Basics
      const nodeBtn = screen.getByRole('button', {
        name: /SAP World Basics/i,
      });
      fireEvent.click(nodeBtn);

      // Drawer dialog should open
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      within(dialog).getByText(/What this teaches:/i);
      within(dialog).getByText(/Enterprise ERP fundamentals/i);

      // Direct action button to launch lesson
      const startLessonBtn = within(dialog).getByRole('link', { name: /Start Lesson/i });
      expect(startLessonBtn).toHaveAttribute('href', '/learn/mod-0-1');

      // Close drawer
      const closeBtn = within(dialog).getByRole('button', { name: /Close details/i });
      fireEvent.click(closeBtn);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
