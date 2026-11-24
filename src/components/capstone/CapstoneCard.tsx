import React from 'react';
import { Link } from 'react-router-dom';
import { Database, ShieldCheck, CloudUpload, ArrowRight, CheckCircle2, Clock, Award } from 'lucide-react';
import { CapstoneLevel } from '../../types/capstone';

interface CapstoneCardProps {
  level: CapstoneLevel;
  isCompleted?: boolean;
  quizScore?: number;
  completedCheckpointsCount: number;
}

export const CapstoneCard: React.FC<CapstoneCardProps> = ({
  level,
  isCompleted = false,
  quizScore,
  completedCheckpointsCount,
}) => {
  const getIcon = () => {
    switch (level.badge.icon) {
      case 'Database':
        return <Database className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />;
      case 'CloudUpload':
        return <CloudUpload className="h-7 w-7 text-blue-600 dark:text-blue-400" />;
      default:
        return <Award className="h-7 w-7 text-amber-600 dark:text-amber-400" />;
    }
  };

  const totalCheckpoints = level.checkpoints.length;
  const progressPercent = Math.round((completedCheckpointsCount / totalCheckpoints) * 100);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-md dark:border-stone-800 dark:bg-stone-900/90 dark:hover:border-indigo-500">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {level.phase}
                </span>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                  {level.difficulty}
                </span>
              </div>
              <h3 className="mt-0.5 text-lg font-bold text-stone-900 dark:text-stone-100">
                {level.title}
              </h3>
            </div>
          </div>
          {isCompleted && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Passed
            </span>
          )}
        </div>

        <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
          {level.subtitle}
        </p>

        {/* Checkpoint Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
            <span>Checkpoints Verified</span>
            <span>
              {completedCheckpointsCount}/{totalCheckpoints} ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
            <div
              className={`h-full transition-all duration-300 ${
                isCompleted ? 'bg-emerald-500' : 'bg-indigo-600 dark:bg-indigo-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Objectives preview */}
        <div className="mt-4 border-t border-stone-100 pt-3 dark:border-stone-800/80">
          <div className="text-xs font-semibold uppercase text-stone-400 dark:text-stone-500">Key Focus</div>
          <ul className="mt-2 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
            {level.objectives.slice(0, 2).map((obj, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-indigo-500">•</span>
                <span className="line-clamp-1">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800/80">
        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {level.estimatedMinutes}m
          </span>
          {quizScore !== undefined && (
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Quiz: {quizScore}/5
            </span>
          )}
        </div>
        <Link
          to={`/capstone/${level.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-indigo-500 dark:hover:text-white"
        >
          <span>Open Studio</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
