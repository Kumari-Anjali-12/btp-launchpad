import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import {
  getAllPhases,
  getAllModules,
  getAllCapstones,
  getDeferredTopics,
  getRoadmapNodes,
  getSyllabusModuleById,
  getCapstoneByPhaseId,
  LEGACY_CHAPTER_TO_MODULE_MAP,
  MODULE_TO_LEGACY_CHAPTER_MAP,
} from '../data/curriculum';
import {
  loadUserProgress,
  setTargetWeeklyHours,
} from '../lib/storage';

describe('BTP Launchpad Curriculum Realignment & Redesign', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  it('verifies authoritative 9-phase syllabus structure and total hours', () => {
    const phases = getAllPhases();
    expect(phases).toHaveLength(9);

    const expectedPhaseIds = [
      'phase-0',
      'phase-1',
      'phase-2',
      'phase-3',
      'phase-4',
      'phase-5',
      'phase-6',
      'phase-7',
      'phase-8',
    ];

    phases.forEach((phase, index) => {
      expect(phase.id).toBe(expectedPhaseIds[index]);
      expect(phase.number).toBe(index);
      expect(phase.title).toBeTruthy();
      expect(phase.coreObjective).toBeTruthy();
      expect(phase.suggestedWeeks).toBeTruthy();
      expect(phase.modules.length).toBeGreaterThanOrEqual(2);
      expect(phase.capstone).toBeDefined();
      expect(phase.capstone.phaseId).toBe(phase.id);
    });

    const totalHours = phases.reduce((acc, p) => acc + p.estimatedHours, 0);
    expect(totalHours).toBeGreaterThanOrEqual(220);
    expect(totalHours).toBeLessThanOrEqual(250);
  });

  it('verifies all 36 syllabus modules have full pedagogical depth', () => {
    const modules = getAllModules();
    expect(modules).toHaveLength(36);

    modules.forEach((mod) => {
      expect(mod.id).toMatch(/^mod-\d+-\d+$/);
      expect(mod.code).toMatch(/^\d+\.\d+$/);
      expect(mod.title).toBeTruthy();
      expect(mod.tagline).toBeTruthy();
      expect(mod.summary).toBeTruthy();
      expect(mod.subtopics.length).toBeGreaterThanOrEqual(2);
      expect(mod.practicalImplementation).toBeTruthy();
      expect(mod.masteryCheck).toBeTruthy();
      expect(mod.learningObjectives.length).toBeGreaterThanOrEqual(2);
      expect(mod.steps.length).toBeGreaterThanOrEqual(3);

      mod.steps.forEach((step) => {
        expect(step.stepNumber).toBeGreaterThan(0);
        expect(step.title).toBeTruthy();
        expect(step.explanation).toBeTruthy();
        expect(step.keyIdea).toBeTruthy();
      });

      expect(mod.analogy.concept).toBeTruthy();
      expect(mod.analogy.explanation).toBeTruthy();
      expect(mod.conceptExplanation.whatItIs).toBeTruthy();
      expect(mod.conceptExplanation.howItWorks).toBeTruthy();
      expect(mod.diagramType).toBeTruthy();
      expect(mod.jargonTerms.length).toBeGreaterThanOrEqual(3);
      expect(mod.technicalExample.code).toBeTruthy();
      expect(mod.businessScenario.workflowSteps.length).toBeGreaterThanOrEqual(3);

      expect(mod.quizQuestions).toHaveLength(3);
      mod.quizQuestions.forEach((q) => {
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        const correct = q.options.filter((o) => o.isCorrect);
        expect(correct).toHaveLength(1);
      });
    });
  });

  it('verifies 9 Phase Capstone Deliverables verbatim from syllabus', () => {
    const capstones = getAllCapstones();
    expect(capstones).toHaveLength(9);

    capstones.forEach((capstone) => {
      expect(capstone.id).toMatch(/^capstone-phase-\d+$/);
      expect(capstone.title).toBeTruthy();
      expect(capstone.objective).toBeTruthy();
      expect(capstone.deliverables.length).toBeGreaterThanOrEqual(2);
      expect(capstone.acceptanceCriteria.length).toBeGreaterThanOrEqual(2);
    });

    const phase0Capstone = getCapstoneByPhaseId('phase-0');
    expect(phase0Capstone?.title).toBe('Secured API Gateway');
    const phase8Capstone = getCapstoneByPhaseId('phase-8');
    expect(phase8Capstone?.title).toBe('AI-Assisted Order and Forecast Management on SAP BTP');
  });

  it('verifies 6 Deferred Topics for cognitive load protection', () => {
    const deferred = getDeferredTopics();
    expect(deferred).toHaveLength(6);

    const titles = deferred.map((d) => d.title);
    expect(titles).toContain('Java Services');
    expect(titles).toContain('Kyma and Kubernetes');
    expect(titles).toContain('API Management');
    expect(titles).toContain('Event-Driven Integration');
    expect(titles).toContain('Scale and Reliability');
    expect(titles).toContain('Advanced Architecture');

    deferred.forEach((item) => {
      expect(item.subtopics.length).toBeGreaterThanOrEqual(3);
      expect(item.revisitWhen).toBeTruthy();
    });
  });

  it('verifies interactive roadmap graph has 36 module nodes with valid dependency links', () => {
    const nodes = getRoadmapNodes();
    expect(nodes.length).toBeGreaterThanOrEqual(36);

    const moduleNodes = nodes.filter((n) => n.moduleId);
    expect(moduleNodes).toHaveLength(36);

    nodes.forEach((node) => {
      expect(node.id).toBeTruthy();
      expect(node.label).toBeTruthy();
      expect(node.teaches).toBeTruthy();
      expect(node.practicalOutput).toBeTruthy();
      expect(node.masteryRequirement).toBeTruthy();
    });

    const firstNode = nodes[0]!;
    expect(firstNode.prerequisites).toHaveLength(0);
    expect(firstNode.downstream.length).toBeGreaterThan(0);
  });

  it('verifies bidirectional migration mapping between legacy chapters and syllabus modules', () => {
    expect(LEGACY_CHAPTER_TO_MODULE_MAP['ch-0-1']).toBe('mod-0-1');
    expect(LEGACY_CHAPTER_TO_MODULE_MAP['ch-1-1']).toBe('mod-3-1');
    expect(MODULE_TO_LEGACY_CHAPTER_MAP['mod-0-1']).toBe('ch-0-1');

    const resolved = getSyllabusModuleById('ch-0-1');
    expect(resolved).toBeDefined();
    expect(resolved?.code).toBe('0.1');
  });

  it('verifies schema upgrade to v2 and pace preference persistence', () => {
    const initial = loadUserProgress();
    expect(initial.schemaVersion).toBe(2);
    expect(initial.targetWeeklyHours).toBe(10);

    setTargetWeeklyHours(15);
    const updated = loadUserProgress();
    expect(updated.targetWeeklyHours).toBe(15);
  });

  it('renders modern 3-column learning workspace for /learn/mod-0-1', () => {
    render(
      <MemoryRouter initialEntries={['/learn/mod-0-1']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Left Course Sidebar
    expect(screen.getByText(/Curriculum Course Map/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SAP World Basics/i).length).toBeGreaterThan(0);

    // Central Workspace Header & Stepper
    expect(screen.getByRole('heading', { level: 1, name: /SAP World Basics/i })).toBeInTheDocument();
    expect(screen.getByText(/IN THIS LESSON/i)).toBeInTheDocument();

    // Right Guided Instructor Panel
    expect(screen.getByText(/KEY IDEA/i)).toBeInTheDocument();
    expect(screen.getByText(/YOU'LL LEARN/i)).toBeInTheDocument();
    expect(screen.getByText(/\[<\] \[>\] step · \[R\] replay · \[Space\] pause/i)).toBeInTheDocument();
  });

  it('preserves backward compatibility for legacy /learn/ch-0-1 URL', () => {
    render(
      <MemoryRouter initialEntries={['/learn/ch-0-1']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Enterprise Software, ERP & SAP S\/4HANA/i })
    ).toBeInTheDocument();
  });

  it('renders Roadmap page with dependency graph, pace calculator, and capstones', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /BTP Learning Roadmap/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Visual Dependency Graph/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /9-Phase Sequence/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pace & Timeline Calculator/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /9 Capstone Deliverables/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Deferred Topics \(6\)/i })).toBeInTheDocument();

    // Switch to Pace tab
    fireEvent.click(screen.getByRole('button', { name: /Pace & Timeline Calculator/i }));
    expect(screen.getByText(/Personal Pace & Schedule Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Projected Graduation/i)).toBeInTheDocument();
  });
});
