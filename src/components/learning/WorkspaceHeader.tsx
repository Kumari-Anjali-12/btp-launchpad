import React from 'react';
import {
  Clock,
  Layers,
  RotateCcw,
  Play,
  Pause,
  Menu,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { SimulationBadge } from '../common/SimulationBadge';

interface WorkspaceHeaderProps {
  phaseNumber: number;
  phaseTitle: string;
  moduleCode: string;
  title: string;
  tagline: string;
  estimatedMinutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalSteps: number;
  isCompleted: boolean;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReplay?: () => void;
  onOpenMobileSidebar?: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  phaseNumber,
  phaseTitle,
  moduleCode,
  title,
  tagline,
  estimatedMinutes,
  level,
  totalSteps,
  isCompleted,
  isPlaying = true,
  onTogglePlay,
  onReplay,
  onOpenMobileSidebar,
}) => {
  return (
    <div className="border-b border-stone-200/80 dark:border-stone-800 bg-white/60 dark:bg-stone-900/40 p-4 sm:p-6 rounded-xl shadow-xs space-y-4">
      {/* Top Row: Breadcrumb & Mobile Drawer Trigger */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 truncate">
          {onOpenMobileSidebar && (
            <button
              onClick={onOpenMobileSidebar}
              className="md:hidden p-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded mr-1"
              aria-label="Open course curriculum map"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
          <span>Phase {phaseNumber}: {phaseTitle}</span>
          <span>&gt;</span>
          <span className="text-emerald-800 dark:text-emerald-400 font-bold">
            Module {moduleCode}
          </span>
          <span className="sr-only">Chapter {moduleCode}</span>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 shrink-0">
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-850">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Completed</span>
            </span>
          )}
          <SimulationBadge />
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold border border-stone-200 dark:border-stone-700">
            {moduleCode}
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            {title}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          {tagline}
        </p>
      </div>

      {/* Metadata Chips & Diagram Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-stone-800/60 text-xs">
        {/* Info Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-stone-600 dark:text-stone-400">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-mono font-medium">{estimatedMinutes} min</span>
          </span>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <Badge
            variant={
              level === 'Beginner'
                ? 'success'
                : level === 'Intermediate'
                ? 'info'
                : 'purple'
            }
            size="sm"
          >
            {level}
          </Badge>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <span className="inline-flex items-center gap-1 font-mono text-[11px]">
            <Layers className="w-3.5 h-3.5 text-stone-400" />
            <span>{totalSteps} steps</span>
          </span>
        </div>

        {/* Diagram Replay & Pause Controls (from reference screenshot) */}
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-lg border border-stone-200/80 dark:border-stone-700/80">
          {onReplay && (
            <button
              type="button"
              onClick={onReplay}
              title="Replay interactive animation (Hotkey: R)"
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono font-medium text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
          )}

          {onTogglePlay && (
            <button
              type="button"
              onClick={onTogglePlay}
              title={isPlaying ? 'Pause animation (Hotkey: Space)' : 'Play animation (Hotkey: Space)'}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono font-medium text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Play</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
