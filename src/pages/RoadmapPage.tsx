import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { loadUserProgress } from '../lib/storage';
import { UserProgressState } from '../types/storage';

export const RoadmapPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  const completedIds = progress.completedChapterIds;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="info">Curriculum Blueprint</Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            5 Modules &bull; 15 Chapters &bull; ~21 Hours
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          BTP Learning Roadmap
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Follow this structured progressive sequence to build deep, verified competency in modern SAP Business Technology Platform cloud engineering.
        </p>
      </div>

      {/* Connected Stepper Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 before:hidden md:before:block">
        {CURRICULUM_MODULES.map((module) => {
          const moduleCompleted = module.chapters.filter((ch) =>
            completedIds.includes(ch.id)
          ).length;
          const percent =
            module.chapters.length > 0
              ? Math.round((moduleCompleted / module.chapters.length) * 100)
              : 0;

          const isDone = percent === 100;
          const isStarted = percent > 0 && !isDone;

          return (
            <div key={module.id} className="relative flex flex-col md:flex-row gap-6">
              {/* Stepper Node Pill */}
              <div className="hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white bg-slate-100 dark:bg-slate-800 dark:border-sap-slate-900 shadow-sm z-10 font-bold text-lg font-mono text-slate-700 dark:text-slate-200">
                {isDone ? (
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                ) : (
                  <span>M{module.number}</span>
                )}
              </div>

              {/* Module Card */}
              <Card className="flex-1 border-slate-200 dark:border-slate-800 hover:border-sap-blue-300 dark:hover:border-sap-blue-800 transition-colors">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
                        Module {module.number}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                      <Badge
                        variant={
                          module.level === 'Beginner'
                            ? 'success'
                            : module.level === 'Intermediate'
                            ? 'info'
                            : 'purple'
                        }
                      >
                        {module.level}
                      </Badge>
                    </div>

                    <Badge variant={isDone ? 'success' : isStarted ? 'info' : 'default'}>
                      {isDone ? 'Completed' : isStarted ? 'In Progress' : 'Not Started'}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mt-1">{module.title}</CardTitle>
                  <CardDescription>{module.tagline}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {module.description}
                  </p>

                  {/* Prerequisites */}
                  {module.prerequisites.length > 0 && (
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/40 p-3 text-xs text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-800 dark:text-slate-200 font-semibold block mb-1">
                        Prerequisites:
                      </strong>
                      <ul className="list-disc list-inside space-y-0.5">
                        {module.prerequisites.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Learning Objectives */}
                  <div>
                    <strong className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Core Competencies You Will Build:
                    </strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                      {module.learningObjectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-sap-blue-500 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2">
                    <ProgressBar
                      value={percent}
                      size="sm"
                      label={`Module Progress: ${moduleCompleted} of ${module.chapters.length} chapters completed`}
                    />
                  </div>
                </CardContent>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Est. {module.estimatedHours} hrs
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" /> {module.chapters.length} Chapters
                    </span>
                  </div>

                  <Link to={`/chapters/${module.id}`}>
                    <Button size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      Explore Module Chapters
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
