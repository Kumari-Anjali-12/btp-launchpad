import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Code2,
  Boxes,
  Award,
  Clock,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { loadUserProgress } from '../lib/storage';
import {
  getCurriculumProgress,
} from '../data/curriculum';
import { PRACTICE_DRILLS } from '../data/practice/drills';
import { UserProgressState } from '../types/storage';

export const DashboardPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  const curriculumSummary = getCurriculumProgress(progress);
  const {
    totalModules,
    completedModuleCount,
    overallPercent,
    totalPhases,
    completedPhaseCount,
    currentPhase,
    nextRecommendedModule,
    phaseSummaries,
  } = curriculumSummary;

  const isBrandNewLearner = completedModuleCount === 0;

  // Find current phase summary
  const currentPhaseSummary =
    phaseSummaries.find((ps) => ps.phase.id === currentPhase.id) || phaseSummaries[0]!;

  // Recommend relevant practice drill
  const completedDrillIds = progress.practice?.completedDrillIds || [];
  const nextDrill =
    PRACTICE_DRILLS.find((d) => !completedDrillIds.includes(d.id)) || PRACTICE_DRILLS[0]!;

  // Guided projects summary
  const projectProgress = progress.practice?.projectProgress || {};
  const completedProjectsCount = Object.values(projectProgress).filter((p) => p.isCompleted).length;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Welcome & Orientation Banner */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151619] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Welcome to your BTP Learning Journey
              </h1>
              <SimulationBadge />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isBrandNewLearner
                ? 'You are beginning from scratch. Follow the 9-phase roadmap to build your first SAP BTP cloud application.'
                : `Great progress! You have completed ${completedModuleCount} of ${totalModules} modules across 9 phases.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to={`/learn/${nextRecommendedModule.id}`}>
              <Button size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {isBrandNewLearner ? 'Start Learning' : 'Continue Learning'}
              </Button>
            </Link>
          </div>
        </div>

        {/* 2. Key Learning Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Overall Progress</span>
            <span
              data-testid="overall-percent"
              className="text-2xl font-bold text-slate-900 dark:text-white font-mono"
            >
              {overallPercent}%
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">36 Total Modules</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Completed Modules</span>
            <span
              data-testid="completed-chapters-count"
              className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono"
            >
              {completedModuleCount}{' '}
              <span className="text-xs font-normal text-slate-400">/ {totalModules}</span>
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">9 Phases</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Phases Mastered</span>
            <span className="text-2xl font-bold text-sap-blue-600 dark:text-sap-blue-400 font-mono">
              {completedPhaseCount}{' '}
              <span className="text-xs font-normal text-slate-400">/ {totalPhases}</span>
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">9 Capstones</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Practice Drills</span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 font-mono">
              {completedDrillIds.length}{' '}
              <span className="text-xs font-normal text-slate-400">/ {PRACTICE_DRILLS.length}</span>
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">{completedProjectsCount} Projects</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Learning Streak</span>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
              <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
              {progress.streakDays} <span className="text-xs font-normal text-slate-400">days</span>
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">Active guest session</span>
          </div>
        </div>
      </div>

      {/* 3. Actionable Next Steps: Continue Learning & Recommended Next Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card A: Next Recommended Theory Module */}
        <div className="rounded-xl border border-sap-blue-200 bg-sap-blue-50/50 p-6 dark:border-sap-blue-900/60 dark:bg-sap-blue-950/20 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sap-blue-700 dark:text-sap-blue-300 flex items-center gap-1.5 font-mono">
                <Compass className="w-3.5 h-3.5" /> Next Recommended Module
              </span>
              <Badge variant="info">
                {nextRecommendedModule.level}
              </Badge>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Module {nextRecommendedModule.code}: {nextRecommendedModule.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
              {nextRecommendedModule.summary}
            </p>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> ~{nextRecommendedModule.estimatedMinutes} mins
              </span>
              <span>&bull;</span>
              <span>Phase {nextRecommendedModule.phaseId.replace('phase-', '')}</span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-sap-blue-200/60 dark:border-sap-blue-900/40 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {nextRecommendedModule.steps?.length || 3} Interactive Steps &bull; Quiz
            </span>
            <Link to={`/learn/${nextRecommendedModule.id}`}>
              <Button size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Open Lesson
              </Button>
            </Link>
          </div>
        </div>

        {/* Card B: Next Recommended Practical Drill */}
        <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-6 dark:border-purple-900/60 dark:bg-purple-950/20 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5 font-mono">
                <Code2 className="w-3.5 h-3.5" /> Recommended Practice Drill
              </span>
              <Badge variant="purple">
                {nextDrill.category.toUpperCase()} &bull; {nextDrill.difficulty}
              </Badge>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {nextDrill.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
              {nextDrill.summary}
            </p>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> ~{nextDrill.estimatedMinutes} mins
              </span>
              <span>&bull;</span>
              <span>Reinforces Phase {currentPhase.number}</span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Interactive In-Browser Code Validation
            </span>
            <Link to={`/practice?tab=drills&id=${nextDrill.id}`}>
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Launch Drill
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Current Phase Progress Summary Card */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-[#151619] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                Current Active Phase &bull; Phase {currentPhase.number}
              </span>
              <Badge variant="success">
                {currentPhase.suggestedWeeks}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
              {currentPhase.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-2xl mt-0.5">
              {currentPhase.description}
            </p>
          </div>

          <div className="text-right sm:text-right shrink-0">
            <span className="text-xs font-mono text-stone-500 dark:text-stone-400 block">
              Phase Progress: {currentPhaseSummary.completedCount}/{currentPhaseSummary.totalCount} Modules
            </span>
            <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {currentPhaseSummary.percent}%
            </span>
          </div>
        </div>

        <ProgressBar
          value={currentPhaseSummary.percent}
          size="sm"
          label={`${currentPhaseSummary.completedCount} of ${currentPhaseSummary.totalCount} modules in Phase ${currentPhase.number} completed`}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-stone-200/80 dark:border-stone-800 text-xs">
          <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400">
            <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-semibold">Capstone Deliverable:</span> {currentPhase.capstone.title}
          </div>
          <Link
            to={`/learn/${currentPhase.modules[0]?.id || 'mod-0-1'}`}
            className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
          >
            Go to Phase Modules <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 5. Authoritative Curriculum Phases Breakdown (All 9 Phases) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Curriculum Modules
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your progress across all 9 authoritative phases and 36 structured modules.
            </p>
          </div>
          <Link to="/roadmap">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Full Roadmap
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phaseSummaries.map(({ phase, completedCount: pCompleted, totalCount: pTotal, percent: pPercent, isCompleted: pDone, isStarted: pStarted }) => {
            const categoryBadge =
              phase.badgeCategory === 'pre-learning'
                ? 'default'
                : phase.badgeCategory === 'ai-layer'
                ? 'purple'
                : phase.badgeCategory === 'capstone'
                ? 'warning'
                : 'success';

            return (
              <Card
                key={phase.id}
                className="hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
                        Phase {phase.number} &bull; {phase.suggestedWeeks}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Badge variant={categoryBadge} size="sm">
                          {phase.badgeCategory.replace('-', ' ')}
                        </Badge>
                        <Badge variant={pDone ? 'success' : pStarted ? 'info' : 'default'} size="sm">
                          {pDone ? 'Done' : pStarted ? 'In Progress' : 'Not Started'}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-base mt-1 line-clamp-1">{phase.title}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2 mt-0.5">{phase.tagline}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <ProgressBar
                      value={pPercent}
                      size="sm"
                      label={`${pCompleted} of ${pTotal} modules completed`}
                    />

                    <div className="text-[11px] text-stone-500 dark:text-stone-400 space-y-1 pt-1">
                      <div className="flex items-center justify-between font-mono">
                        <span>Modules: {pCompleted}/{pTotal}</span>
                        <span>~{phase.estimatedHours} hrs</span>
                      </div>
                      <div className="truncate text-stone-400" title={phase.capstone.title}>
                        &bull; {phase.capstone.title}
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {pPercent}% complete
                  </span>
                  <Link to={`/learn/${phase.modules[0]?.id || 'mod-0-1'}`}>
                    <Button variant="outline" size="sm">
                      {pDone ? 'Review Phase' : 'Open Phase'}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 6. Practical Learning & Tools Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sap-blue-50 text-sap-blue-600 dark:bg-sap-blue-950/60 dark:text-sap-blue-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Practice Sandboxes</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {completedDrillIds.length} drills &bull; {completedProjectsCount} projects
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Practice writing CDS schema files, executing live OData requests, solving security drills, and completing guided projects.
          </p>
          <Link to="/practice">
            <Button variant="secondary" size="sm" fullWidth>
              Open Practice Section
            </Button>
          </Link>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Architecture Design Lab</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interactive BTP solution designer</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Connect Approuter, CAP services, HANA DB, and Cloud Connector on an interactive canvas.
          </p>
          <Link to="/design-lab">
            <Button variant="secondary" size="sm" fullWidth>
              Open Design Lab
            </Button>
          </Link>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Phase Capstones</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">9 Enterprise Deliverables</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Inspect all 9 portfolio-grade phase capstones from API Gateways to Joule AI Agents.
          </p>
          <Link to="/roadmap?tab=capstones">
            <Button variant="secondary" size="sm" fullWidth>
              View Capstones
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
