import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Code2,
  Boxes,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardTitle } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { loadUserProgress } from '../lib/storage';
import { CURRICULUM_MODULES, getAllChapters } from '../data/curriculum';
import { UserProgressState } from '../types/storage';

export const DashboardPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const allChapters = getAllChapters();
  const totalChapters = allChapters.length;
  const completedCount = progress.completedChapterIds.length;
  const overallPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  const nextUnfinishedChapter = allChapters.find(
    (ch) => !progress.completedChapterIds.includes(ch.id)
  ) || allChapters[0]!;

  const isBrandNewLearner = completedCount === 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-sap-slate-900">
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
                ? 'You are beginning from scratch. Follow the structured roadmap to build your first SAP BTP cloud application.'
                : `Great progress! You have completed ${completedCount} of ${totalChapters} chapters across 5 modules.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to={`/chapters/${nextUnfinishedChapter.moduleId}`}>
              <Button size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {isBrandNewLearner ? 'Start Learning' : 'Continue Learning'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Learning Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Overall Progress</span>
            <span
              data-testid="overall-percent"
              className="text-2xl font-bold text-slate-900 dark:text-white font-mono"
            >
              {overallPercent}%
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Completed Chapters</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
              {completedCount} <span className="text-xs font-normal text-slate-400">/ {totalChapters}</span>
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Learning Streak</span>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
              <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
              {progress.streakDays} <span className="text-xs font-normal text-slate-400">days</span>
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Active Mode</span>
            <span className="text-sm font-semibold text-sap-blue-600 dark:text-sap-blue-400 mt-1 block">
              Guest (Local Storage)
            </span>
          </div>
        </div>
      </div>

      {/* Next Recommended Activity Card */}
      <div className="rounded-xl border border-sap-blue-200 bg-sap-blue-50/50 p-6 dark:border-sap-blue-900/60 dark:bg-sap-blue-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
              Next Recommended Activity
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {nextUnfinishedChapter.number}: {nextUnfinishedChapter.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              {nextUnfinishedChapter.summary}
            </p>
          </div>
          <Link to={`/chapters/${nextUnfinishedChapter.moduleId}`}>
            <Button size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Open Chapter
            </Button>
          </Link>
        </div>
      </div>

      {/* Module Progress Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Curriculum Modules
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your progress across all 5 progressive learning milestones.
            </p>
          </div>
          <Link to="/roadmap">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Full Roadmap
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM_MODULES.map((module) => {
            const moduleCompletedCount = module.chapters.filter((ch) =>
              progress.completedChapterIds.includes(ch.id)
            ).length;
            const modulePercent =
              module.chapters.length > 0
                ? Math.round((moduleCompletedCount / module.chapters.length) * 100)
                : 0;

            const isDone = modulePercent === 100;
            const isStarted = modulePercent > 0 && !isDone;

            return (
              <Card
                key={module.id}
                className="hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
                      Module {module.number}
                    </span>
                    <CardTitle className="text-base mt-0.5">{module.title}</CardTitle>
                  </div>
                  <Badge variant={isDone ? 'success' : isStarted ? 'info' : 'default'}>
                    {isDone ? 'Completed' : isStarted ? 'In Progress' : 'Not Started'}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                  {module.description}
                </p>

                <div className="mb-4">
                  <ProgressBar
                    value={modulePercent}
                    size="sm"
                    label={`${moduleCompletedCount} of ${module.chapters.length} chapters completed`}
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Est. {module.estimatedHours} hrs
                  </span>
                  <Link to={`/chapters/${module.id}`}>
                    <Button variant="outline" size="sm">
                      {isDone ? 'Review Module' : 'Open Module'}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Practice & Tools Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sap-blue-50 text-sap-blue-600 dark:bg-sap-blue-950/60 dark:text-sap-blue-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Practice Lab</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">Simulated CDS & OData v4 queries</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Practice writing CDS schema files and executing OData requests with instant browser feedback.
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
      </div>
    </div>
  );
};
