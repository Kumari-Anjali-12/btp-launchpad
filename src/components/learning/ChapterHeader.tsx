import React from 'react';
import { Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { Badge } from '../common/Badge';
import { SimulationBadge } from '../common/SimulationBadge';

export interface ChapterHeaderProps {
  moduleNumber: number;
  moduleTitle: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  isCompleted: boolean;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  moduleNumber,
  moduleTitle,
  chapterNumber,
  title,
  subtitle,
  estimatedMinutes,
  isCompleted,
}) => {
  return (
    <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
            Module {moduleNumber}: {moduleTitle}
          </span>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
            Chapter {chapterNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={isCompleted ? 'success' : 'default'} size="sm" className="gap-1">
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <CircleDashed className="w-3 h-3 text-slate-400" />
                <span>Not Completed</span>
              </>
            )}
          </Badge>
          <SimulationBadge />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {title}
      </h1>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {subtitle}
      </p>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
        <Clock className="w-3.5 h-3.5" />
        <span>Estimated reading &amp; practice time: {estimatedMinutes} minutes</span>
      </div>
    </div>
  );
};
