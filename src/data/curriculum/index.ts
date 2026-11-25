import {
  SyllabusPhase,
  SyllabusModule,
  PhaseCapstone,
  DeferredTopic,
  RoadmapDependencyNode,
  RoadmapNodeType,
  DependencyRelationshipType,
  DependencyEdge,
  CurriculumModule,
  Chapter,
} from '../../types/curriculum';
import { SYLLABUS_PHASES } from './phases';
import { PHASE_CAPSTONES } from './capstones';
import { DEFERRED_TOPICS } from './deferred';
import { ROADMAP_NODES } from './roadmapGraph';
import { LEGACY_CHAPTER_TO_MODULE_MAP, MODULE_TO_LEGACY_CHAPTER_MAP } from './migrationMap';

import { MODULE_0_CHAPTERS } from '../chapters/module0';
import { MODULE_1_CHAPTERS } from '../chapters/module1';
import { MODULE_2_CHAPTERS } from '../chapters/module2';
import { MODULE_3_CHAPTERS } from '../chapters/module3';
import { MODULE_4_CHAPTERS } from '../chapters/module4';

// Re-export core datasets
export { SYLLABUS_PHASES } from './phases';
export { PHASE_CAPSTONES } from './capstones';
export { DEFERRED_TOPICS } from './deferred';
export { ROADMAP_NODES } from './roadmapGraph';
export { LEGACY_CHAPTER_TO_MODULE_MAP, MODULE_TO_LEGACY_CHAPTER_MAP } from './migrationMap';
export type { RoadmapNodeType, DependencyRelationshipType, DependencyEdge };

/**
 * Returns all 9 learner-facing curriculum phases (Phase 0 to Phase 8).
 */
export function getAllPhases(): SyllabusPhase[] {
  return SYLLABUS_PHASES;
}

/**
 * Returns a specific phase by ID (e.g. 'phase-0', 'phase-3').
 */
export function getPhaseById(phaseId: string): SyllabusPhase | undefined {
  return SYLLABUS_PHASES.find((p) => p.id === phaseId);
}

/**
 * Returns all 36 modules across all 9 phases in order.
 */
export function getAllModules(): SyllabusModule[] {
  return SYLLABUS_PHASES.flatMap((p) => p.modules);
}

/**
 * Returns a specific syllabus module by ID (e.g. 'mod-0-1', 'mod-3-2').
 * Also supports resolving legacy chapter IDs (e.g. 'ch-0-1' -> 'mod-0-1').
 */
export function getSyllabusModuleById(moduleId: string): SyllabusModule | undefined {
  const resolvedId = LEGACY_CHAPTER_TO_MODULE_MAP[moduleId] || moduleId;
  const all = getAllModules();
  return (
    all.find((m) => m.id === resolvedId) ||
    all.find((m) => m.id === moduleId) ||
    all.find((m) => m.code === moduleId)
  );
}

/**
 * Returns all 9 Phase Capstone Deliverables.
 */
export function getAllCapstones(): PhaseCapstone[] {
  return PHASE_CAPSTONES;
}

/**
 * Returns a phase capstone deliverable by phase ID.
 */
export function getCapstoneByPhaseId(phaseId: string): PhaseCapstone | undefined {
  return PHASE_CAPSTONES.find((c) => c.phaseId === phaseId);
}

/**
 * Returns the 6 Deferred Topics (to revisit after the capstone).
 */
export function getDeferredTopics(): DeferredTopic[] {
  return DEFERRED_TOPICS;
}

/**
 * Returns the nodes of the interactive dependency roadmap graph.
 */
export function getRoadmapNodes(): RoadmapDependencyNode[] {
  return ROADMAP_NODES;
}

/**
 * Checks whether a syllabus module is completed according to user progress state,
 * taking into account bidirectional schema v1 / v2 legacy mapping.
 */
export function isModuleCompleted(
  moduleIdOrCode: string,
  progress: { completedLessonIds?: string[]; completedChapterIds?: string[] }
): boolean {
  const resolvedId = LEGACY_CHAPTER_TO_MODULE_MAP[moduleIdOrCode] || moduleIdOrCode;
  const legacyId = MODULE_TO_LEGACY_CHAPTER_MAP[resolvedId] || resolvedId;
  const completedLessons = progress.completedLessonIds || [];
  const completedChapters = progress.completedChapterIds || [];

  return (
    completedLessons.includes(resolvedId) ||
    completedLessons.includes(moduleIdOrCode) ||
    completedChapters.includes(legacyId) ||
    completedChapters.includes(resolvedId) ||
    completedChapters.includes(moduleIdOrCode)
  );
}

export interface PhaseProgressSummary {
  phase: SyllabusPhase;
  completedCount: number;
  totalCount: number;
  percent: number;
  isCompleted: boolean;
  isStarted: boolean;
  nextModule?: SyllabusModule;
}

export interface CurriculumProgressSummary {
  totalModules: number;
  completedModuleCount: number;
  overallPercent: number;
  totalPhases: number;
  completedPhaseCount: number;
  currentPhase: SyllabusPhase;
  nextRecommendedModule: SyllabusModule;
  phaseSummaries: PhaseProgressSummary[];
}

/**
 * Calculates unified progress across the entire 9-phase, 36-module curriculum.
 */
export function getCurriculumProgress(
  progress: { completedLessonIds?: string[]; completedChapterIds?: string[]; currentPhaseId?: string }
): CurriculumProgressSummary {
  const phases = getAllPhases();
  const allModules = getAllModules();

  let totalCompletedModules = 0;
  let completedPhases = 0;

  const phaseSummaries: PhaseProgressSummary[] = phases.map((phase) => {
    const completedCount = phase.modules.filter((m) => isModuleCompleted(m.id, progress)).length;
    const totalCount = phase.modules.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const isCompleted = completedCount === totalCount && totalCount > 0;
    const isStarted = completedCount > 0 && !isCompleted;
    const nextModule = phase.modules.find((m) => !isModuleCompleted(m.id, progress));

    totalCompletedModules += completedCount;
    if (isCompleted) {
      completedPhases += 1;
    }

    return {
      phase,
      completedCount,
      totalCount,
      percent,
      isCompleted,
      isStarted,
      nextModule,
    };
  });

  const overallPercent = allModules.length > 0 ? Math.round((totalCompletedModules / allModules.length) * 100) : 0;

  // Determine current active phase: either progress.currentPhaseId, or first incomplete phase
  let currentPhase = phases.find((p) => p.id === progress.currentPhaseId);
  if (!currentPhase) {
    const firstIncomplete = phaseSummaries.find((ps) => !ps.isCompleted);
    currentPhase = firstIncomplete ? firstIncomplete.phase : phases[0]!;
  }

  // Next recommended module across entire curriculum
  const nextRecommendedModule =
    allModules.find((m) => !isModuleCompleted(m.id, progress)) || allModules[0]!;

  return {
    totalModules: allModules.length,
    completedModuleCount: totalCompletedModules,
    overallPercent,
    totalPhases: phases.length,
    completedPhaseCount: completedPhases,
    currentPhase,
    nextRecommendedModule,
    phaseSummaries,
  };
}

// =========================================================================
// BACKWARD-COMPATIBILITY EXPORTS FOR LEGACY PHASE 1 & PHASE 2 CONSUMERS
// =========================================================================

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'module-0',
    number: 0,
    title: 'Enterprise and SAP Fundamentals',
    tagline: 'Demystify Enterprise Cloud, ERP & Clean Core Architecture',
    description:
      'Understand what enterprise software is, why global corporations run on SAP S/4HANA, the foundational Clean Core strategy, and how SAP BTP organizes accounts, regions, and cloud runtimes.',
    iconName: 'Building2',
    level: 'Beginner',
    estimatedHours: 3.5,
    prerequisites: ['Basic understanding of web technologies (HTTP, JSON, APIs)'],
    learningObjectives: [
      'Understand the role of Enterprise Resource Planning (ERP) in global business.',
      'Define the Clean Core strategy and side-by-side cloud extensibility.',
      'Navigate SAP BTP account hierarchies: Global Accounts, Subaccounts, and Spaces.',
      'Compare multi-cloud hyperscaler regions (AWS, Azure, GCP) and Cloud Foundry.',
    ],
    chapters: MODULE_0_CHAPTERS,
  },
  {
    id: 'module-1',
    number: 1,
    title: 'SAP CAP Development',
    tagline: 'Modern Full-Stack Cloud Application Programming',
    description:
      'Master the SAP Cloud Application Programming Model (CAP) using Core Data Services (CDS), Node.js event lifecycles, and OData v4 to build enterprise-grade domain services on SAP HANA Cloud.',
    iconName: 'Code2',
    level: 'Beginner',
    estimatedHours: 5.0,
    prerequisites: ['Module 0', 'Basic JavaScript / TypeScript and SQL knowledge'],
    learningObjectives: [
      'Model relational domain entities using declarative Core Data Services (CDS).',
      'Expose auto-generated RESTful OData v4 services with projections.',
      'Implement custom event handlers in Node.js (before, on, after lifecycle).',
      'Enforce business validations and execute database transactions with SAP HANA Cloud.',
    ],
    chapters: MODULE_1_CHAPTERS,
  },
  {
    id: 'module-2',
    number: 2,
    title: 'SAP Fiori and UI5',
    tagline: 'Enterprise User Experience & Metadata-Driven Frontends',
    description:
      'Learn how SAP creates consistent, responsive enterprise user interfaces with the SAP Horizon design system, Fiori Elements metadata annotations, and Freestyle UI5 applications.',
    iconName: 'Layout',
    level: 'Intermediate',
    estimatedHours: 4.0,
    prerequisites: ['Module 1', 'Basic CSS and component concepts'],
    learningObjectives: [
      'Understand SAP Fiori design guidelines and the Horizon visual theme family.',
      'Configure UI annotations in CDS to automatically generate List Reports and Object Pages.',
      'Understand the Model-View-Controller (MVC) architecture of SAPUI5.',
      'Leverage SAP UI5 Web Components in modern React applications.',
    ],
    chapters: MODULE_2_CHAPTERS,
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Security and Integration',
    tagline: 'Enterprise Identity, Destinations & Event-Driven Connectivity',
    description:
      'Learn how enterprise cloud applications authenticate users via XSUAA, securely connect to on-premise ERPs with Cloud Connector, and exchange asynchronous messages using SAP Event Mesh.',
    iconName: 'ShieldCheck',
    level: 'Intermediate',
    estimatedHours: 4.5,
    prerequisites: ['Module 1', 'Understanding of OAuth 2.0 and JWTs'],
    learningObjectives: [
      'Configure enterprise security with SAP BTP XSUAA and Role Collections.',
      'Set up BTP Destinations to securely access external and on-premise APIs.',
      'Understand how SAP Cloud Connector creates a secure reverse tunnel into corporate firewalls.',
      'Implement asynchronous decoupled messaging using SAP Event Mesh.',
    ],
    chapters: MODULE_3_CHAPTERS,
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Deployment and Debugging',
    tagline: 'MTA Packaging, Cloud Foundry CLI & Production Ops',
    description:
      'Package multi-target applications (MTA), deploy to SAP BTP Cloud Foundry, inspect runtime logs, and diagnose production crashes and HTTP errors like a senior engineer.',
    iconName: 'Rocket',
    level: 'Advanced',
    estimatedHours: 4.0,
    prerequisites: ['Modules 0–3', 'Terminal/CLI familiarity'],
    learningObjectives: [
      'Structure and author `mta.yaml` deployment descriptors.',
      'Build MTAR archives using the Cloud MTA Build Tool (MBT).',
      'Deploy applications with the Cloud Foundry CLI and monitor container health.',
      'Diagnose production HTTP errors (401, 403, 404, 500, 502, 503) using `cf logs`.',
    ],
    chapters: MODULE_4_CHAPTERS,
  },
];

export function getModuleById(id: string): CurriculumModule | undefined {
  return CURRICULUM_MODULES.find((m) => m.id === id);
}

export function getAllChapters(): Chapter[] {
  return CURRICULUM_MODULES.flatMap((m) => m.chapters);
}

export function getChapterById(id: string): { chapter: Chapter | SyllabusModule; module: { id: string; number: number; title: string } } | undefined {
  // First check legacy chapters
  for (const module of CURRICULUM_MODULES) {
    const found = module.chapters.find((ch) => ch.id === id);
    if (found) return { chapter: found, module };
  }

  // Check syllabus modules
  const resolvedId = LEGACY_CHAPTER_TO_MODULE_MAP[id] || id;
  for (const phase of SYLLABUS_PHASES) {
    const found = phase.modules.find((m) => m.id === resolvedId || m.id === id || m.code === id);
    if (found) {
      return {
        chapter: found,
        module: {
          id: phase.id,
          number: phase.number,
          title: phase.title,
        },
      };
    }
  }

  return undefined;
}

export function getAdjacentChapters(currentChapterId: string): {
  prevChapter?: Chapter | SyllabusModule;
  nextChapter?: Chapter | SyllabusModule;
} {
  const allModules = getAllModules();
  const resolvedId = LEGACY_CHAPTER_TO_MODULE_MAP[currentChapterId] || currentChapterId;

  // Search syllabus modules using resolved modern ID or direct match
  const modIndex = allModules.findIndex(
    (m) => m.id === resolvedId || m.id === currentChapterId || m.code === currentChapterId
  );

  if (modIndex !== -1) {
    return {
      prevChapter: modIndex > 0 ? allModules[modIndex - 1] : undefined,
      nextChapter: modIndex < allModules.length - 1 ? allModules[modIndex + 1] : undefined,
    };
  }

  // Fallback to legacy chapters array if direct match is present
  const allChapters = getAllChapters();
  const legacyIndex = allChapters.findIndex((ch) => ch.id === currentChapterId);
  if (legacyIndex !== -1) {
    return {
      prevChapter: legacyIndex > 0 ? allChapters[legacyIndex - 1] : undefined,
      nextChapter: legacyIndex < allChapters.length - 1 ? allChapters[legacyIndex + 1] : undefined,
    };
  }

  return {};
}

export interface CurriculumIntegrityReport {
  isValid: boolean;
  totalPhases: number;
  totalModules: number;
  duplicateModuleIds: string[];
  duplicateModuleCodes: string[];
  modulesWithMissingObjectives: string[];
  modulesWithInvalidQuizzes: string[];
  unresolvedPrerequisites: { moduleId: string; prerequisite: string }[];
}

/**
 * Validates structural integrity across the authoritative 9-phase, 36-module curriculum.
 * Ensures zero duplicate IDs, valid codes, full pedagogical depth, and answer options.
 */
export function validateCurriculumIntegrity(): CurriculumIntegrityReport {
  const phases = getAllPhases();
  const modules = getAllModules();

  const seenIds = new Set<string>();
  const duplicateModuleIds: string[] = [];
  const seenCodes = new Set<string>();
  const duplicateModuleCodes: string[] = [];
  const modulesWithMissingObjectives: string[] = [];
  const modulesWithInvalidQuizzes: string[] = [];
  const unresolvedPrerequisites: { moduleId: string; prerequisite: string }[] = [];

  const allModuleIdentifiers = new Set<string>();
  modules.forEach((m) => {
    allModuleIdentifiers.add(m.id);
    allModuleIdentifiers.add(m.code);
  });

  modules.forEach((m) => {
    // Check duplicate ID
    if (seenIds.has(m.id)) {
      duplicateModuleIds.push(m.id);
    }
    seenIds.add(m.id);

    // Check duplicate Code
    if (seenCodes.has(m.code)) {
      duplicateModuleCodes.push(m.code);
    }
    seenCodes.add(m.code);

    // Check learning objectives (minimum 3 required by pedagogical standard)
    if (!m.learningObjectives || m.learningObjectives.length < 3) {
      modulesWithMissingObjectives.push(m.id);
    }

    // Check quiz structure (minimum 3 questions with at least one correct option)
    if (!m.quizQuestions || m.quizQuestions.length < 3) {
      modulesWithInvalidQuizzes.push(m.id);
    } else {
      const hasInvalidQuestion = m.quizQuestions.some(
        (q) => !q.options || q.options.length < 2 || !q.options.some((opt) => opt.isCorrect)
      );
      if (hasInvalidQuestion) {
        modulesWithInvalidQuizzes.push(m.id);
      }
    }

    // Check prerequisites
    if (m.prerequisites && m.prerequisites.length > 0) {
      m.prerequisites.forEach((prereq) => {
        const isGeneralSkill =
          prereq.toLowerCase().includes('basic') ||
          prereq.toLowerCase().includes('none') ||
          prereq.toLowerCase().includes('understanding') ||
          prereq.toLowerCase().includes('familiarity');
        if (!isGeneralSkill && !allModuleIdentifiers.has(prereq)) {
          const matchesPhase = phases.some((p) => p.id === prereq || `Phase ${p.number}` === prereq);
          const matchesLegacy = Boolean(MODULE_TO_LEGACY_CHAPTER_MAP[prereq] || LEGACY_CHAPTER_TO_MODULE_MAP[prereq]);
          if (!matchesPhase && !matchesLegacy) {
            unresolvedPrerequisites.push({ moduleId: m.id, prerequisite: prereq });
          }
        }
      });
    }
  });

  const isValid =
    phases.length === 9 &&
    modules.length === 36 &&
    duplicateModuleIds.length === 0 &&
    duplicateModuleCodes.length === 0 &&
    modulesWithMissingObjectives.length === 0 &&
    modulesWithInvalidQuizzes.length === 0 &&
    unresolvedPrerequisites.length === 0;

  return {
    isValid,
    totalPhases: phases.length,
    totalModules: modules.length,
    duplicateModuleIds,
    duplicateModuleCodes,
    modulesWithMissingObjectives,
    modulesWithInvalidQuizzes,
    unresolvedPrerequisites,
  };
}
