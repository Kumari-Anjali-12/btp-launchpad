import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { loadUserProgress } from '../lib/storage';
import { UserProgressState } from '../types/storage';

export const ChaptersPage: React.FC = () => {
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
      <div>
        <Badge variant="info" className="mb-1">
          Full Curriculum
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Learning Chapters Overview
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Browse all chapters across the curriculum. Select any module to view in-depth explanations, real-world enterprise analogies, and practical coding exercises.
        </p>
      </div>

      <div className="space-y-8">
        {CURRICULUM_MODULES.map((module) => {
          return (
            <div key={module.id} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
                    Module {module.number}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
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
                      className="flex flex-col justify-between hover:border-sap-blue-300 dark:hover:border-sap-blue-700 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                            Chapter {ch.number}
                          </span>
                          {isCompleted ? (
                            <Badge variant="success" size="sm">
                              Completed
                            </Badge>
                          ) : (
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {ch.estimatedMinutes}m
                            </span>
                          )}
                        </div>

                        <CardTitle className="text-base">{ch.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {ch.subtitle}
                        </CardDescription>

                        <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                          {ch.summary}
                        </p>
                      </div>

                      <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                          {ch.analogy.concept}
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
    </div>
  );
};
