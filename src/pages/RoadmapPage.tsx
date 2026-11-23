import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Award,
  BookOpen,
  X,
  Lock,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  ChevronDown,
  ChevronUp,
  Compass,
  Code2,
  Layers,
  ArrowUp,
  Info,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  getAllPhases,
  getAllCapstones,
  getDeferredTopics,
  getRoadmapNodes,
  isModuleCompleted,
  getCurriculumProgress,
} from '../data/curriculum';
import { RoadmapDependencyNode } from '../types/curriculum';
import { loadUserProgress, setTargetWeeklyHours } from '../lib/storage';
import { UserProgressState } from '../types/storage';
import { PRACTICE_DRILLS } from '../data/practice/drills';
import { GUIDED_PROJECTS } from '../data/practice/guidedProjects';

// Practical mapping: associate interactive drills and guided projects with each phase
const PHASE_PRACTICE_DRILL_MAP: Record<string, string[]> = {
  'phase-0': ['odata-select-filter', 'odata-expand-relation', 'sec-jwt-xsuaa'],
  'phase-1': ['sec-authn-authz'],
  'phase-2': ['debug-cds-syntax'],
  'phase-3': ['cds-basic-entity', 'cds-built-in-aspects', 'cds-associations', 'cds-compositions', 'debug-cap-handler'],
  'phase-4': ['odata-create-entity', 'odata-update-delete'],
  'phase-5': ['sec-route-protection', 'debug-destination-connectivity'],
  'phase-6': ['debug-odata-url'],
  'phase-7': [],
  'phase-8': [],
};

const PHASE_GUIDED_PROJECTS_MAP: Record<string, string[]> = {
  'phase-0': [],
  'phase-1': [],
  'phase-2': [],
  'phase-3': ['project-leave-expense'],
  'phase-4': [],
  'phase-5': ['project-vendor-portal'],
  'phase-6': ['project-currency-sync'],
  'phase-7': [],
  'phase-8': [],
};

// Beginner-friendly explanations of why each phase matters and what learners will build
const PHASE_BEGINNER_GUIDE: Record<string, { whyItMatters: string; whatYouWillBuild: string }> = {
  'phase-0': {
    whyItMatters:
      'Lay the rock-solid foundations of modern cloud development: HTTP APIs, asynchronous TypeScript, Git, and OAuth 2.0 / JWT security before touching BTP.',
    whatYouWillBuild:
      'A strongly typed REST/OData proxy microservice with Docker containerization, JWT validation, and automated test coverage.',
  },
  'phase-1': {
    whyItMatters:
      'Understand how enterprise cloud architectures work: subaccounts, multitenancy, Cloud Foundry runtimes, and user identity management.',
    whatYouWillBuild:
      'A multi-tier cloud landing zone with isolated subaccounts, Cloud Foundry runtime spaces, and role collection access policies.',
  },
  'phase-2': {
    whyItMatters:
      'Set up professional developer tooling so you can write, run, and test cloud applications without configuration friction.',
    whatYouWillBuild:
      'A reproducible development workspace in SAP Business Application Studio or local VS Code using Dev Containers, CF CLI, and @sap/cds-dk.',
  },
  'phase-3': {
    whyItMatters:
      'The core heart of enterprise development: the SAP Cloud Application Programming Model (CAP), CDS data modeling, custom event handlers, and SAP HANA Cloud relational persistence.',
    whatYouWillBuild:
      'A production-grade transactional order and supplier management backend with custom lifecycle handlers and automated unit tests.',
  },
  'phase-4': {
    whyItMatters:
      'Turn your backend APIs into modern enterprise web applications using SAP Fiori Elements (List Report & Object Page) and SAP Build Work Zone without writing frontend boilerplate.',
    whatYouWillBuild:
      'An enterprise Fiori web application with filter bars, table views, detail object pages, and launchpad tiles generated directly from CDS annotations.',
  },
  'phase-5': {
    whyItMatters:
      'Lock down your cloud applications using XSUAA authentication, role-based authorizations, Destination Service, and Cloud Connector reverse tunnels.',
    whatYouWillBuild:
      'A secured enterprise service with fine-grained access control, remote Destination integration, and automated security audit checks.',
  },
  'phase-6': {
    whyItMatters:
      'Package, automate, deploy, and monitor your cloud apps using Multi-Target Application (MTA) bundles, CI/CD pipelines, and health monitoring runbooks.',
    whatYouWillBuild:
      'A fully automated release pipeline with MTA packaging, Cloud Transport Management, and health alert dashboards.',
  },
  'phase-7': {
    whyItMatters:
      'Add cutting-edge intelligence to business processes using SAP Generative AI Hub, foundation LLMs, SAP HANA Cloud Vector Engine, and retrieval-augmented generation (RAG).',
    whatYouWillBuild:
      'An enterprise generative AI assistant capable of semantic product search, retrieval-augmented order forecasting, and intelligent tool-calling.',
  },
  'phase-8': {
    whyItMatters:
      'Consolidate everything you have mastered into a flagship capstone application, curate a public GitHub & technical blog portfolio, and prepare for SAP BTP Certification.',
    whatYouWillBuild:
      'A complete, verified end-to-end cloud product with public repository documentation, architectural diagrams, and resume portfolio.',
  },
};

export const RoadmapPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const [activeTab, setActiveTab] = useState<'journey' | 'graph' | 'pace' | 'capstones' | 'deferred' | 'milestones'>('journey');
  const [selectedNode, setSelectedNode] = useState<RoadmapDependencyNode | null>(null);
  const [weeklyHours, setWeeklyHoursState] = useState<number>(progress.targetWeeklyHours || 12);

  // Guided Journey State
  const [journeySearch, setJourneySearch] = useState<string>('');
  const [journeyFilter, setJourneyFilter] = useState<'all' | 'modules' | 'practice' | 'capstones'>('all');

  // Advanced Graph State
  const [nodeTypeFilter, setNodeTypeFilter] = useState<'all' | 'module' | 'capstone' | 'practice' | 'project'>('all');
  const [graphSearch, setGraphSearch] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const phases = getAllPhases();
  const capstones = getAllCapstones();
  const deferredTopics = getDeferredTopics();
  const roadmapNodes = getRoadmapNodes();

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  const progressSummary = useMemo(() => getCurriculumProgress(progress), [progress]);

  // Phase expansion state: default to expanding the current active phase (or Phase 0)
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const currId = progressSummary.currentPhase?.id || 'phase-0';
    phases.forEach((p) => {
      initial[p.id] = p.id === currId;
    });
    if (!Object.values(initial).some(Boolean)) {
      initial['phase-0'] = true;
    }
    return initial;
  });

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    phases.forEach((p) => {
      allExpanded[p.id] = true;
    });
    setExpandedPhases(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    phases.forEach((p) => {
      allCollapsed[p.id] = false;
    });
    setExpandedPhases(allCollapsed);
  };

  const scrollToPhase = (phaseNumber: number) => {
    const phaseId = `phase-${phaseNumber}`;
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: true }));
    const el = document.getElementById(`phase-timeline-${phaseNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pace calculations: Total ~227 hours across 9 phases
  const totalCurriculumHours = phases.reduce((acc, p) => acc + p.estimatedHours, 0) || 227;
  const estimatedWeeks = Math.ceil(totalCurriculumHours / weeklyHours);
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + estimatedWeeks * 7);
  const formattedCompletionDate = completionDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleWeeklyHoursChange = (hours: number) => {
    setWeeklyHoursState(hours);
    setTargetWeeklyHours(hours);
  };

  // Node completion & locked evaluation
  const getNodeStatus = (node: RoadmapDependencyNode): 'completed' | 'in-progress' | 'available' | 'locked' => {
    if (node.moduleId && isModuleCompleted(node.moduleId, progress)) {
      return 'completed';
    }
    if (node.associatedPracticeId && progress.practice?.completedDrillIds.includes(node.associatedPracticeId)) {
      return 'completed';
    }
    if (node.associatedProjectId && progress.practice?.projectProgress[node.associatedProjectId]?.isCompleted) {
      return 'completed';
    }
    if (node.category === 'capstone') {
      const isCapstoneDone = progress.completedCapstones?.includes(node.id) || false;
      if (isCapstoneDone) return 'completed';
    }

    if (node.prerequisites && node.prerequisites.length > 0) {
      const hasUnfinishedPrereq = node.prerequisites.some((prereqId) => {
        const prereqNode = roadmapNodes.find((n) => n.id === prereqId);
        if (!prereqNode) return false;
        if (prereqNode.moduleId) {
          return !isModuleCompleted(prereqNode.moduleId, progress);
        }
        return false;
      });
      if (hasUnfinishedPrereq && (node.category === 'capstone' || node.nodeType === 'project')) {
        return 'locked';
      }
    }

    if (node.moduleId && progress.currentLessonId === node.moduleId) {
      return 'in-progress';
    }

    return 'available';
  };

  // Filtered nodes for the Advanced Graph
  const filteredNodes = useMemo(() => {
    return roadmapNodes.filter((node) => {
      if (nodeTypeFilter !== 'all') {
        const effectiveType = node.nodeType || (node.category === 'capstone' ? 'capstone' : 'module');
        if (effectiveType !== nodeTypeFilter) return false;
      }
      if (graphSearch.trim()) {
        const query = graphSearch.trim().toLowerCase();
        const matchesLabel = node.label.toLowerCase().includes(query);
        const matchesTeaches = node.teaches.toLowerCase().includes(query);
        const matchesCode = node.moduleId?.toLowerCase().includes(query) || false;
        return matchesLabel || matchesTeaches || matchesCode;
      }
      return true;
    });
  }, [roadmapNodes, nodeTypeFilter, graphSearch]);

  const isBrandNewLearner = progressSummary.completedModuleCount === 0;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Page Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="success">9-Phase Authoritative Syllabus</Badge>
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
            36 Modules &bull; 9 Capstone Deliverables &bull; 15 Practice Drills &bull; ~{totalCurriculumHours} Hours
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          BTP Learning Roadmap
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
          The verified end-to-end curriculum roadmap designed for complete beginners. Follow the guided sequential path from zero prior SAP experience to full-stack CAP, Fiori Elements, XSUAA Security, and SAP Generative AI Hub.
        </p>
      </div>

      {/* 2. "Your Learning Journey" Summary Card */}
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/70 via-white to-stone-50/50 dark:from-emerald-950/20 dark:via-[#151619] dark:to-stone-900/40 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Your Learning Journey
              </span>
              <Badge variant={progressSummary.overallPercent === 100 ? 'success' : progressSummary.overallPercent > 0 ? 'info' : 'default'}>
                {progressSummary.overallPercent}% Curriculum Complete
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase block">Current Phase</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white">
                  Phase {progressSummary.currentPhase.number}: {progressSummary.currentPhase.title}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase block">Modules Completed</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {progressSummary.completedModuleCount} <span className="text-stone-400 text-xs">/ 36</span>
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase block">Phases Mastered</span>
                <span className="text-sm font-bold text-sap-blue-600 dark:text-sap-blue-400 font-mono">
                  {progressSummary.completedPhaseCount} <span className="text-stone-400 text-xs">/ 9</span>
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase block">Target Milestone</span>
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 truncate block" title={progressSummary.currentPhase.capstone.title}>
                  Capstone {progressSummary.currentPhase.number}
                </span>
              </div>
            </div>

            <ProgressBar value={progressSummary.overallPercent} size="sm" showPercent={false} />
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-2 shrink-0">
            {isBrandNewLearner ? (
              <Link to="/learn/mod-0-1">
                <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Start with Phase 0
                </Button>
              </Link>
            ) : (
              <Link to={`/learn/${progressSummary.nextRecommendedModule?.id || 'mod-0-1'}`}>
                <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Continue Learning ({progressSummary.nextRecommendedModule?.code})
                </Button>
              </Link>
            )}
            <span className="text-[11px] text-stone-500 text-center lg:text-right font-mono">
              Next: {progressSummary.nextRecommendedModule?.title || 'Phase 0'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. 9-Phase Quick Navigation Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-stone-500 dark:text-stone-400">
            Quick Phase Navigation
          </span>
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => scrollToPhase(progressSummary.currentPhase.number)}
              className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Current Phase</span>
            </button>
            <span className="text-stone-300 dark:text-stone-700">&bull;</span>
            <button
              type="button"
              onClick={expandAll}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            >
              Expand All
            </button>
            <span className="text-stone-300 dark:text-stone-700">&bull;</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
          {phases.map((p) => {
            const isPhaseDone = p.modules.every((m) => isModuleCompleted(m.id, progress));
            const isCurrent = p.id === progressSummary.currentPhase.id;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActiveTab('journey');
                  scrollToPhase(p.number);
                }}
                className={`text-left p-2 rounded-lg border transition-all text-xs space-y-0.5 ${
                  isCurrent
                    ? 'ring-2 ring-emerald-500 border-emerald-400 bg-white dark:bg-stone-900 shadow-xs'
                    : isPhaseDone
                    ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/30'
                    : 'border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                    Phase {p.number}
                  </span>
                  {isPhaseDone ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ) : null}
                </div>
                <span className="font-semibold text-stone-900 dark:text-white line-clamp-1 block text-[11px]">
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. View Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-200/80 dark:border-stone-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('journey')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
            activeTab === 'journey'
              ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Guided Learning Journey (9-Phase Sequence)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('graph')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
            activeTab === 'graph'
              ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Visual Dependency Graph (Advanced Map)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pace')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
            activeTab === 'pace'
              ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Pace &amp; Timeline Calculator
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('capstones')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
            activeTab === 'capstones'
              ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          9 Capstone Deliverables
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('deferred')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
            activeTab === 'deferred'
              ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Deferred Topics (6)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('milestones')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
            activeTab === 'milestones'
              ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
          }`}
        >
          Milestone Alignment (Legacy)
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: GUIDED LEARNING JOURNEY (DEFAULT & PRIMARY LEARNER PATH)           */}
      {/* ========================================================================= */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          {/* Journey Filter & Search Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-stone-700 dark:text-stone-300 mr-1">Filter Content:</span>
              <button
                type="button"
                onClick={() => setJourneyFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  journeyFilter === 'all'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                All (Complete Journey)
              </button>
              <button
                type="button"
                onClick={() => setJourneyFilter('modules')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  journeyFilter === 'modules'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                Modules (36)
              </button>
              <button
                type="button"
                onClick={() => setJourneyFilter('practice')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  journeyFilter === 'practice'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                Practice Drills (15)
              </button>
              <button
                type="button"
                onClick={() => setJourneyFilter('capstones')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  journeyFilter === 'capstones'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                Capstones (9)
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search modules, concepts, or exercises..."
                value={journeySearch}
                onChange={(e) => setJourneySearch(e.target.value)}
                className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-48 sm:w-64"
              />
            </div>
          </div>

          {/* Sequential Timeline Connecting 9 Phases */}
          <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-4 sm:ml-6 pl-4 sm:pl-8 space-y-10">
            {phases.map((phase) => {
              const guide = PHASE_BEGINNER_GUIDE[phase.id] || {
                whyItMatters: phase.description,
                whatYouWillBuild: phase.capstone.objective,
              };

              const completedModules = phase.modules.filter((m) => isModuleCompleted(m.id, progress));
              const phasePercent = Math.round((completedModules.length / phase.modules.length) * 100);
              const isPhaseDone = completedModules.length === phase.modules.length;
              const isCurrent = phase.id === progressSummary.currentPhase.id;
              const isExpanded = !!expandedPhases[phase.id] || journeySearch.trim().length > 0;

              // Filtered items in this phase
              const query = journeySearch.trim().toLowerCase();
              const matchingModules = phase.modules.filter((m) => {
                if (journeyFilter === 'practice' || journeyFilter === 'capstones') return false;
                if (!query) return true;
                return (
                  m.title.toLowerCase().includes(query) ||
                  m.code.toLowerCase().includes(query) ||
                  m.tagline.toLowerCase().includes(query) ||
                  m.subtopics.some((s) => s.toLowerCase().includes(query))
                );
              });

              // Associated practice drills
              const drillIds = PHASE_PRACTICE_DRILL_MAP[phase.id] || [];
              const phaseDrills = PRACTICE_DRILLS.filter((d) => drillIds.includes(d.id));
              const matchingDrills = phaseDrills.filter((d) => {
                if (journeyFilter === 'modules' || journeyFilter === 'capstones') return false;
                if (!query) return true;
                return d.title.toLowerCase().includes(query) || d.summary.toLowerCase().includes(query);
              });

              // Associated guided projects
              const projectIds = PHASE_GUIDED_PROJECTS_MAP[phase.id] || [];
              const phaseProjects = GUIDED_PROJECTS.filter((p) => projectIds.includes(p.id));
              const matchingProjects = phaseProjects.filter((p) => {
                if (journeyFilter === 'modules' || journeyFilter === 'capstones') return false;
                if (!query) return true;
                return p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
              });

              // Capstone matching
              const showCapstone =
                journeyFilter === 'all' || journeyFilter === 'capstones';
              const capstoneMatches =
                !query ||
                phase.capstone.title.toLowerCase().includes(query) ||
                phase.capstone.objective.toLowerCase().includes(query);

              return (
                <div key={phase.id} id={`phase-timeline-${phase.number}`} className="relative scroll-mt-24">
                  {/* Step Marker Node on Timeline Line */}
                  <div
                    className={`absolute -left-[25px] sm:-left-[41px] top-6 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold font-mono text-xs shadow-xs ${
                      isPhaseDone
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-white dark:bg-stone-900 border-emerald-500 text-emerald-600 ring-4 ring-emerald-500/20'
                        : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-500'
                    }`}
                  >
                    {isPhaseDone ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span>{phase.number}</span>
                    )}
                  </div>

                  {/* Main Phase Card */}
                  <Card className={`border transition-all ${
                    isCurrent
                      ? 'border-emerald-300 dark:border-emerald-800 shadow-sm'
                      : 'border-stone-200 dark:border-stone-800'
                  }`}>
                    {/* Phase Header with Expand/Collapse Trigger */}
                    <CardHeader className="cursor-pointer select-none pb-4" onClick={() => togglePhase(phase.id)}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            Phase {phase.number} &bull; {phase.suggestedWeeks}
                          </span>
                          <span className="text-stone-300 dark:text-stone-700">&bull;</span>
                          <span className="text-xs text-stone-500 font-mono">
                            ~{phase.estimatedHours} Hours
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant={isPhaseDone ? 'success' : isCurrent ? 'info' : phasePercent > 0 ? 'info' : 'default'}>
                            {completedModules.length}/{phase.modules.length} Completed ({phasePercent}%)
                          </Badge>
                          <button
                            type="button"
                            aria-label={isExpanded ? `Collapse Phase ${phase.number}` : `Expand Phase ${phase.number}`}
                            className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="mt-1">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                          Phase {phase.number}: {phase.title}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm mt-1 leading-relaxed">
                          {phase.tagline}
                        </CardDescription>
                      </div>

                      <div className="mt-3">
                        <ProgressBar value={phasePercent} size="sm" showPercent={false} />
                      </div>
                    </CardHeader>

                    {/* Phase Overview (Always Visible) */}
                    <CardContent className="space-y-4 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-3 border-t border-stone-100 dark:border-stone-800/80">
                        <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                          <span className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                            <Info className="w-3.5 h-3.5" /> Why This Phase Matters:
                          </span>
                          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                            {guide.whyItMatters}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                          <span className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                            <Award className="w-3.5 h-3.5" /> What You Will Build:
                          </span>
                          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                            {guide.whatYouWillBuild}
                          </p>
                        </div>
                      </div>

                      {/* Expandable Content: In-Order Modules & Practical Work */}
                      {isExpanded && (
                        <div className="space-y-6 pt-4 border-t border-stone-200 dark:border-stone-800">
                          {/* 1. In-Order Theory Modules */}
                          {matchingModules.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                                  Theory &amp; Guided Modules ({matchingModules.length})
                                </span>
                                <span className="text-[11px] font-mono text-stone-400">
                                  In chronological learning sequence
                                </span>
                              </div>

                              <div className="grid grid-cols-1 gap-3">
                                {matchingModules.map((m) => {
                                  const isDone = isModuleCompleted(m.id, progress);
                                  const isNext = progressSummary.nextRecommendedModule?.id === m.id;
                                  const isCurr = progress.currentLessonId === m.id;
                                  const roadmapNode = roadmapNodes.find((n) => n.moduleId === m.id);

                                  // Derive human-readable prerequisites
                                  const prereqLabels = (roadmapNode?.prerequisites || [])
                                    .map((id) => roadmapNodes.find((n) => n.id === id)?.label)
                                    .filter(Boolean);

                                  // Derive human-readable downstream unlocks
                                  const downstreamLabels = (roadmapNode?.downstream || [])
                                    .map((id) => roadmapNodes.find((n) => n.id === id)?.label)
                                    .filter(Boolean);

                                  return (
                                    <div
                                      key={m.id}
                                      className={`p-4 rounded-xl border transition-all ${
                                        isNext
                                          ? 'border-emerald-400 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500/30'
                                          : isDone
                                          ? 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60'
                                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30'
                                      }`}
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                        <div className="space-y-1.5 flex-1">
                                          <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                              Module {m.code}
                                            </span>
                                            <span className="text-stone-300 dark:text-stone-700">&bull;</span>
                                            <span className="text-[11px] font-mono text-stone-400">
                                              ~{m.estimatedMinutes || 35} mins
                                            </span>
                                            <span className="text-stone-300 dark:text-stone-700">&bull;</span>
                                            <Badge size="sm" variant={m.level === 'Beginner' ? 'default' : m.level === 'Intermediate' ? 'info' : 'purple'}>
                                              {m.level || 'Beginner'}
                                            </Badge>

                                            {isDone ? (
                                              <Badge size="sm" variant="success">Completed</Badge>
                                            ) : isNext ? (
                                              <Badge size="sm" variant="info">Next Recommended</Badge>
                                            ) : isCurr ? (
                                              <Badge size="sm" variant="info">In Progress</Badge>
                                            ) : (
                                              <Badge size="sm" variant="default">Not Started</Badge>
                                            )}
                                          </div>

                                          <h4 className="text-base font-bold text-stone-900 dark:text-white">
                                            {m.title}
                                          </h4>
                                          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                                            {m.tagline || m.summary}
                                          </p>

                                          {/* Plain-English Dependency Callouts */}
                                          <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                            <div>
                                              <span className="font-semibold text-stone-700 dark:text-stone-300 block">
                                                What you need before starting:
                                              </span>
                                              <span className="text-stone-500 dark:text-stone-400">
                                                {prereqLabels.length > 0
                                                  ? prereqLabels.slice(0, 2).join(', ')
                                                  : 'None (Foundation topic — start here)'}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="font-semibold text-stone-700 dark:text-stone-300 block">
                                                What this prepares you for:
                                              </span>
                                              <span className="text-stone-500 dark:text-stone-400">
                                                {downstreamLabels.length > 0
                                                  ? downstreamLabels.slice(0, 2).join(', ')
                                                  : 'Phase Capstone deliverable'}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="shrink-0 flex items-center sm:flex-col justify-end gap-2 pt-2 sm:pt-0">
                                          <Link to={`/learn/${m.id}`}>
                                            <Button
                                              size="sm"
                                              variant={isNext ? 'primary' : isDone ? 'outline' : 'secondary'}
                                              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                                            >
                                              {isDone ? 'Review Module' : isNext ? 'Continue' : 'Start Module'}
                                            </Button>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 2. "Apply What You Learned" Practical Work */}
                          {(matchingDrills.length > 0 || matchingProjects.length > 0) && (
                            <div className="space-y-3 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                                  <Code2 className="w-3.5 h-3.5" />
                                  Apply What You Learned ({matchingDrills.length + matchingProjects.length} Practical Activities)
                                </span>
                                <span className="text-[11px] font-mono text-stone-400">
                                  Hands-on sandboxes &amp; projects
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Practice Drills */}
                                {matchingDrills.map((drill) => {
                                  const isDrillDone = progress.practice?.completedDrillIds.includes(drill.id);

                                  return (
                                    <div
                                      key={drill.id}
                                      className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 flex flex-col justify-between"
                                    >
                                      <div>
                                        <div className="flex items-center justify-between gap-2 mb-1.5">
                                          <span className="font-mono text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300 px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50">
                                            {drill.category.toUpperCase()} Drill &bull; ~{drill.estimatedMinutes}m
                                          </span>
                                          {isDrillDone && (
                                            <Badge size="sm" variant="success">Passed</Badge>
                                          )}
                                        </div>
                                        <h5 className="font-bold text-xs text-stone-900 dark:text-white">
                                          {drill.title}
                                        </h5>
                                        <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                                          {drill.summary}
                                        </p>
                                      </div>

                                      <div className="pt-3 mt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between text-xs">
                                        <span className="text-[10px] text-stone-400 font-mono">
                                          Browser Code Validation
                                        </span>
                                        <Link to={`/practice?tab=drills&id=${drill.id}`}>
                                          <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3 h-3" />}>
                                            Launch Drill
                                          </Button>
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Guided Projects */}
                                {matchingProjects.map((proj) => {
                                  const isProjDone = progress.practice?.projectProgress[proj.id]?.isCompleted;

                                  return (
                                    <div
                                      key={proj.id}
                                      className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col justify-between"
                                    >
                                      <div>
                                        <div className="flex items-center justify-between gap-2 mb-1.5">
                                          <span className="font-mono text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50">
                                            Guided Project &bull; ~{proj.estimatedHours}h
                                          </span>
                                          {isProjDone && (
                                            <Badge size="sm" variant="success">Completed</Badge>
                                          )}
                                        </div>
                                        <h5 className="font-bold text-xs text-stone-900 dark:text-white">
                                          {proj.title}
                                        </h5>
                                        <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed line-clamp-2">
                                          {proj.description}
                                        </p>
                                      </div>

                                      <div className="pt-3 mt-3 border-t border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-xs">
                                        <span className="text-[10px] text-stone-400 font-mono">
                                          {proj.milestones.length} Milestones
                                        </span>
                                        <Link to={`/practice?tab=projects&id=${proj.id}`}>
                                          <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3 h-3" />}>
                                            Open Project
                                          </Button>
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 3. Phase Capstone Milestone Deliverable */}
                          {showCapstone && capstoneMatches && (
                            <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/60 dark:bg-amber-950/20">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 font-bold uppercase">
                                      Phase {phase.number} Capstone Deliverable
                                    </span>
                                    {progress.completedCapstones?.includes(`capstone-${phase.id}`) && (
                                      <Badge size="sm" variant="success">Achieved</Badge>
                                    )}
                                  </div>
                                  <h4 className="text-base font-bold text-amber-950 dark:text-amber-200">
                                    {phase.capstone.title}
                                  </h4>
                                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                                    {phase.capstone.objective}
                                  </p>

                                  <div className="mt-2">
                                    <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                                      Key Requirements to Prove Mastery:
                                    </span>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-stone-600 dark:text-stone-400">
                                      {phase.capstone.deliverables.slice(0, 4).map((d, i) => (
                                        <li key={i} className="flex items-start gap-1.5">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                          <span>{d}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <div className="shrink-0 flex items-center justify-end">
                                  <Link to={`/learn/${phase.modules[0]?.id || 'mod-0-1'}`}>
                                    <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                                      Start Phase &rarr;
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center pt-8 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={scrollToTop}
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1.5"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top of Roadmap</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ADVANCED DEPENDENCY MAP (OPTIONAL 2D GRAPH VIEW)                   */}
      {/* ========================================================================= */}
      {activeTab === 'graph' && (
        <div className="space-y-4">
          {/* Introductory Guide Banner */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/60 text-xs text-stone-700 dark:text-stone-300 space-y-1">
            <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>How to Read the Advanced Dependency Map:</span>
            </div>
            <p className="leading-relaxed text-stone-600 dark:text-stone-400">
              This technical map visualizes the cross-phase dependency topology of all 36 modules, 15 practice drills, 3 guided projects, and 9 capstones. Click any node to open its detailed prerequisite breakdown and downstream unlocks. Use the zoom controls to inspect complex multi-phase links.
            </p>
          </div>

          {/* Controls Bar: Type Filters, Search & Zoom */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-xs">
            {/* Left: Node Type Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-stone-700 dark:text-stone-300 mr-1">Node Type:</span>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  nodeTypeFilter === 'all'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                All ({roadmapNodes.length})
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('module')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  nodeTypeFilter === 'module'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                Modules (36)
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('capstone')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  nodeTypeFilter === 'capstone'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                Capstones (9)
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('practice')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  nodeTypeFilter === 'practice'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                Practice Drills (7)
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('project')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  nodeTypeFilter === 'project'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                Guided Projects (3)
              </button>
            </div>

            {/* Right: Search & Zoom Controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter nodes..."
                  value={graphSearch}
                  onChange={(e) => setGraphSearch(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-36 sm:w-48"
                />
              </div>

              <div className="flex items-center gap-1 border border-stone-200 dark:border-stone-700 rounded-lg p-0.5 bg-white dark:bg-stone-800">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, Math.round((z - 0.1) * 10) / 10))}
                  title="Zoom Out"
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] px-1 text-stone-500">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(1.4, Math.round((z + 0.1) * 10) / 10))}
                  title="Zoom In"
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  title="Reset View"
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 border-l border-stone-200 dark:border-stone-700 ml-0.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Graph Container */}
          <div className="relative overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151619] p-6 min-h-[560px]">
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              className="min-w-[1080px] grid grid-cols-9 gap-4 transition-transform duration-150"
            >
              {phases.map((phase) => {
                const phaseNodes = filteredNodes.filter((n) => n.phaseId === phase.id);

                return (
                  <div key={phase.id} className="space-y-3">
                    {/* Phase Column Header */}
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-center">
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                        Phase {phase.number}
                      </span>
                      <div className="text-xs font-bold text-stone-900 dark:text-white truncate" title={phase.title}>
                        Phase {phase.number}: {phase.title}
                      </div>
                      <div className="text-[10px] font-mono text-stone-400">
                        {phase.suggestedWeeks} &bull; ~{phase.estimatedHours}h
                      </div>
                    </div>

                    {/* Nodes in this phase */}
                    <div className="space-y-2">
                      {phaseNodes.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        const status = getNodeStatus(node);
                        const effectiveType = node.nodeType || (node.category === 'capstone' ? 'capstone' : 'module');

                        // Node card visual styling by type
                        let cardBorder = 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60';
                        if (effectiveType === 'capstone') {
                          cardBorder = 'border-amber-300 bg-amber-50/50 dark:border-amber-800/80 dark:bg-amber-950/20';
                        } else if (effectiveType === 'practice') {
                          cardBorder = 'border-purple-300 bg-purple-50/50 dark:border-purple-800/80 dark:bg-purple-950/20';
                        } else if (effectiveType === 'project') {
                          cardBorder = 'border-blue-300 bg-blue-50/50 dark:border-blue-800/80 dark:bg-blue-950/20';
                        } else if (status === 'completed') {
                          cardBorder = 'border-emerald-300 bg-emerald-50/30 dark:border-emerald-800/80 dark:bg-emerald-950/20';
                        }

                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setSelectedNode(node)}
                            className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs space-y-1 relative group ${
                              isSelected
                                ? 'ring-2 ring-emerald-500 shadow-md bg-white dark:bg-stone-800 border-emerald-500'
                                : `${cardBorder} hover:shadow-xs`
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                                {effectiveType}
                              </span>
                              {status === 'completed' && (
                                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Completed</span>
                                </span>
                              )}
                              {status === 'locked' && (
                                <span className="flex items-center gap-1 text-[10px] text-stone-400">
                                  <Lock className="w-3 h-3" />
                                  <span>Locked</span>
                                </span>
                              )}
                            </div>
                            <div className="font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 leading-tight">
                              {node.label}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono truncate">
                              {node.prerequisites.length > 0 ? `${node.prerequisites.length} prereqs` : 'Foundation'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: PACE & TIMELINE CALCULATOR                                         */}
      {/* ========================================================================= */}
      {activeTab === 'pace' && (
        <Card className="border-stone-200 dark:border-stone-800 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Personal Pace &amp; Schedule Calculator
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
              Customize your weekly study commitment to project your estimated graduation date across the complete 227-hour curriculum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Weekly Study Commitment:
              </span>
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {weeklyHours} Hours / Week
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={weeklyHours}
              onChange={(e) => handleWeeklyHoursChange(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
                <span className="text-[10px] text-stone-400 font-mono uppercase block">Total Hours</span>
                <span className="text-lg font-bold font-mono text-stone-900 dark:text-white">
                  ~{totalCurriculumHours}h
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
                <span className="text-[10px] text-stone-400 font-mono uppercase block">Estimated Duration</span>
                <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {estimatedWeeks} Weeks
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
                <span className="text-[10px] text-stone-400 font-mono uppercase block">Projected Graduation</span>
                <span className="text-lg font-bold font-mono text-purple-600 dark:text-purple-400">
                  {formattedCompletionDate}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: 9 CAPSTONE DELIVERABLES                                            */}
      {/* ========================================================================= */}
      {activeTab === 'capstones' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 text-xs text-stone-700 dark:text-stone-300">
            <div className="font-bold text-amber-900 dark:text-amber-200 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Syllabus Capstone Requirements</span>
            </div>
            Each phase culminates in a portfolio-grade capstone project. Capstones prove practical mastery of enterprise requirements.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capstones.map((cap) => (
              <Card key={cap.id} className="border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <span className="text-[10px] font-mono uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded w-fit">
                      Phase {cap.phaseId.replace('phase-', '')} Capstone
                    </span>
                    <CardTitle className="text-base mt-1">{cap.title}</CardTitle>
                    <CardDescription className="text-xs">{cap.objective}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div>
                      <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                        Key Deliverables:
                      </span>
                      <ul className="space-y-1 text-stone-500 dark:text-stone-400">
                        {cap.deliverables.slice(0, 3).map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">
                    {cap.deliverables.length} Deliverables
                  </span>
                  <Link to={`/learn/mod-${cap.phaseId.replace('phase-', '')}-1`}>
                    <Button variant="ghost" size="sm">
                      Open Phase &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: DEFERRED TOPICS                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'deferred' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/60 text-xs text-stone-700 dark:text-stone-300">
            <div className="font-bold text-purple-900 dark:text-purple-200 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>Cognitive Load Protection: Deferred Topics</span>
            </div>
            These 6 advanced topics are intentionally deferred to post-capstone study. Enterprise BTP has a vast surface area; attempting to learn Kyma, Kubernetes, or multi-cloud streaming too early dilutes mastery of core CAP and Fiori concepts.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deferredTopics.map((topic) => (
              <Card key={topic.id} className="border-stone-200 dark:border-stone-800">
                <CardHeader>
                  <span className="text-[10px] font-mono uppercase bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded w-fit">
                    Deferred &bull; Post-Syllabus
                  </span>
                  <CardTitle className="text-base mt-1">{topic.title}</CardTitle>
                  <CardDescription className="text-xs">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Subtopics Covered Later:
                    </span>
                    <ul className="space-y-1 text-stone-500 dark:text-stone-400">
                      {topic.subtopics.map((s, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] font-mono text-purple-700 dark:text-purple-400">
                    Revisit When: {topic.revisitWhen}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 6: MILESTONE ALIGNMENT (LEGACY COMPATIBILITY)                         */}
      {/* ========================================================================= */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/60 text-xs text-stone-700 dark:text-stone-300">
            <div className="font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500" />
              <span>Legacy Milestone Mapping</span>
            </div>
            This view maps the original 5 learning milestones to the new 9-phase syllabus architecture for complete transparency.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phases.slice(0, 5).map((p) => (
              <Card key={p.id} className="border-stone-200 dark:border-stone-800">
                <CardHeader>
                  <span className="text-[10px] font-mono uppercase bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded w-fit">
                    Milestone {p.number}
                  </span>
                  <CardTitle className="text-base mt-1">{p.title}</CardTitle>
                  <CardDescription className="text-xs">{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <div>
                    <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Included Modules:
                    </span>
                    <ul className="space-y-1 text-stone-500 dark:text-stone-400">
                      {p.modules.map((m) => (
                        <li key={m.id} className="truncate">
                          Module {m.code}: {m.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NODE DETAIL MODAL / DRAWER                                                 */}
      {/* ========================================================================= */}
      {selectedNode && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setSelectedNode(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold uppercase">
                    {selectedNode.nodeType || 'Node'} &bull; {selectedNode.phaseId.replace('phase-', 'Phase ')}
                  </span>
                  <Badge variant={getNodeStatus(selectedNode) === 'completed' ? 'success' : getNodeStatus(selectedNode) === 'locked' ? 'default' : 'info'}>
                    {getNodeStatus(selectedNode).replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-2">
                  {selectedNode.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  What this teaches:
                </span>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {selectedNode.teaches}
                </p>
              </div>

              {/* Explicit Dependency Relationships */}
              {selectedNode.dependencyEdges && selectedNode.dependencyEdges.length > 0 && (
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Explicit Dependency Links:
                  </span>
                  <div className="space-y-1">
                    {selectedNode.dependencyEdges.map((edge, i) => {
                      const targetNode = roadmapNodes.find((n) => n.id === edge.targetId);
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700"
                        >
                          <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                            {edge.relationship.replace('-', ' ')}
                          </span>
                          <span className="text-stone-700 dark:text-stone-200 truncate max-w-[240px]">
                            {targetNode?.label || edge.targetId}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {selectedNode.prerequisites.length > 0 && (
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Prerequisites:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.prerequisites.map((prereqId) => {
                      const prereqNode = roadmapNodes.find((n) => n.id === prereqId);
                      return (
                        <span
                          key={prereqId}
                          className="px-2 py-0.5 rounded text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                        >
                          {prereqNode?.label || prereqId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Downstream Unlocks */}
              {selectedNode.downstream.length > 0 && (
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Downstream Unlocks:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.downstream.map((downId) => {
                      const downNode = roadmapNodes.find((n) => n.id === downId);
                      return (
                        <span
                          key={downId}
                          className="px-2 py-0.5 rounded text-[11px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        >
                          {downNode?.label || downId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  Practical Deliverable:
                </span>
                <p className="text-stone-600 dark:text-stone-400">
                  {selectedNode.practicalOutput}
                </p>
              </div>

              <div>
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  Mastery Check:
                </span>
                <p className="text-stone-600 dark:text-stone-400">
                  {selectedNode.masteryRequirement}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-stone-400">
                {selectedNode.estimatedMinutes ? `~${selectedNode.estimatedMinutes} mins` : 'Self-paced'}
              </span>

              {selectedNode.moduleId ? (
                <Link to={`/learn/${selectedNode.moduleId}`}>
                  <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Start Lesson
                  </Button>
                </Link>
              ) : selectedNode.associatedPracticeId ? (
                <Link to={`/practice?tab=drills&id=${selectedNode.associatedPracticeId}`}>
                  <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Launch Practice Drill
                  </Button>
                </Link>
              ) : selectedNode.associatedProjectId ? (
                <Link to={`/practice?tab=projects&id=${selectedNode.associatedProjectId}`}>
                  <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Open Guided Project
                  </Button>
                </Link>
              ) : selectedNode.category === 'capstone' ? (
                <Link to={`/learn/mod-${selectedNode.phaseId.replace('phase-', '')}-1`}>
                  <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Inspect Capstone
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
