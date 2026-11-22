import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CURRICULUM_MODULES, getAllPhases } from '../data/curriculum';
import { loadUserProgress } from '../lib/storage';
import { UserProgressState } from '../types/storage';

export const ChaptersPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const [viewMode, setViewMode] = useState<'phases' | 'milestones'>('phases');

  const phases = getAllPhases();

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
          <Badge variant="info">Full Curriculum</Badge>
          <span className="text-xs font-mono text-stone-500">
            9 Phases &bull; 36 Modules &bull; ~227 Hours
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Learning Chapters Overview
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
          Browse all modules across the authoritative 9-phase BTP curriculum. Select any module to view in-depth architectural explanations, real-world enterprise analogies, interactive diagrams, and practical coding exercises.
        </p>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setViewMode('phases')}
            className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all ${
              viewMode === 'phases'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            Authoritative 9 Phases (36 Modules)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('milestones')}
            className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all ${
              viewMode === 'milestones'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            5 Core Milestones View
          </button>
        </div>

        {/* Core Curriculum Milestones Overview Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-4">
          {CURRICULUM_MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setViewMode('milestones')}
              className="text-left p-2.5 rounded-lg border border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-xs space-y-0.5 hover:border-emerald-300 transition-colors"
            >
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                Module {m.number}
              </span>
              <span className="font-semibold text-stone-900 dark:text-white line-clamp-1 block">
                {m.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 9-Phase View */}
      {viewMode === 'phases' && (
        <div className="space-y-8">
          {phases.map((phase) => {
            const phaseCompletedCount = phase.modules.filter((m) => completedIds.includes(m.id)).length;
            const phasePercent = Math.round((phaseCompletedCount / phase.modules.length) * 100);

            return (
              <div key={phase.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2 dark:border-stone-800">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Phase {phase.number} &bull; {phase.suggestedWeeks} &bull; ~{phase.estimatedHours}h
                    </span>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                      {phase.title}
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 max-w-2xl">
                      {phase.description}
                    </p>
                  </div>
                  <Badge variant={phasePercent === 100 ? 'success' : phasePercent > 0 ? 'info' : 'default'}>
                    {phaseCompletedCount}/{phase.modules.length} Done
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {phase.modules.map((m) => {
                    const isCompleted = completedIds.includes(m.id);

                    return (
                      <Card
                        key={m.id}
                        className="flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-semibold text-stone-500 dark:text-stone-400">
                              Module {m.code}
                            </span>
                            {isCompleted ? (
                              <Badge variant="success" size="sm">
                                Completed
                              </Badge>
                            ) : (
                              <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" /> {m.estimatedMinutes}m
                              </span>
                            )}
                          </div>

                          <CardTitle className="text-base">{m.title}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {m.tagline}
                          </CardDescription>

                          <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                            {m.summary}
                          </p>
                        </div>

                        <div className="pt-3 mt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-[140px]">
                            {m.analogy?.concept || 'Core Concept'}
                          </span>
                          <Link to={`/learn/${m.id}`}>
                            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3 w-3" />}>
                              {isCompleted ? 'Review' : 'Start'}
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5 Core Milestones View (Preserved for compatibility and high-level milestone viewing) */}
      {viewMode === 'milestones' && (
        <div className="space-y-8">
          {CURRICULUM_MODULES.map((module) => {
            return (
              <div key={module.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2 dark:border-stone-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Module {module.number}
                    </span>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                      {module.title}
                    </h2>
                  </div>
                  <Link to={`/chapters/${module.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      Open Module Detail
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {module.chapters.map((ch) => {
                    const isCompleted = completedIds.includes(ch.id);

                    return (
                      <Card
                        key={ch.id}
                        className="flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-semibold text-stone-500 dark:text-stone-400">
                              Chapter {ch.number}
                            </span>
                            {isCompleted ? (
                              <Badge variant="success" size="sm">
                                Completed
                              </Badge>
                            ) : (
                              <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" /> {ch.estimatedMinutes}m
                              </span>
                            )}
                          </div>

                          <CardTitle className="text-base">{ch.title}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {ch.subtitle}
                          </CardDescription>

                          <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 line-clamp-3">
                            {ch.summary}
                          </p>
                        </div>

                        <div className="pt-3 mt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-[150px]">
                            {ch.analogy?.concept || 'Enterprise Core'}
                          </span>
                          <Link to={`/learn/${ch.id}`}>
                            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3 w-3" />}>
                              {isCompleted ? 'Review' : 'Start'}
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
