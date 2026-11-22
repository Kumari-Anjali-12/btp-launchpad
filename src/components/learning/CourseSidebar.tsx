import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Map,
  X,
  BookOpen,
} from 'lucide-react';
import { getAllPhases } from '../../data/curriculum';
import { SyllabusModule } from '../../types/curriculum';
import { LEGACY_CHAPTER_TO_MODULE_MAP, MODULE_TO_LEGACY_CHAPTER_MAP } from '../../data/curriculum/migrationMap';

interface CourseSidebarProps {
  currentModuleId: string;
  completedIds: string[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  currentModuleId,
  completedIds,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const phases = getAllPhases();

  // Resolve current active module ID (e.g. if passed 'ch-0-1' map to 'mod-0-1')
  const resolvedActiveId =
    LEGACY_CHAPTER_TO_MODULE_MAP[currentModuleId] || currentModuleId;

  // Track expanded phases
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    phases.forEach((p) => {
      const hasActive = p.modules.some(
        (m) => m.id === resolvedActiveId || m.code === resolvedActiveId
      );
      initial[p.id] = hasActive;
    });
    // Ensure at least phase-0 is expanded if none matched
    if (!Object.values(initial).some(Boolean)) {
      initial['phase-0'] = true;
    }
    return initial;
  });

  // Keep active phase expanded when lesson changes
  useEffect(() => {
    phases.forEach((p) => {
      const hasActive = p.modules.some(
        (m) => m.id === resolvedActiveId || m.code === resolvedActiveId
      );
      if (hasActive) {
        setExpandedPhases((prev) => ({ ...prev, [p.id]: true }));
      }
    });
  }, [resolvedActiveId, phases]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const isModuleCompleted = (m: SyllabusModule) => {
    const legacyId = MODULE_TO_LEGACY_CHAPTER_MAP[m.id];
    return (
      completedIds.includes(m.id) ||
      (legacyId ? completedIds.includes(legacyId) : false)
    );
  };

  const allModules = phases.flatMap((p) => p.modules);
  const totalCompleted = allModules.filter(isModuleCompleted).length;
  const progressPercent = Math.round((totalCompleted / allModules.length) * 100);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#fbf9f4] dark:bg-[#141517] border-r border-stone-200/80 dark:border-stone-800">
      {/* Top Header */}
      <div className="p-3.5 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Curriculum Course Map
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400">
              9 Phases · 36 Modules · 9 Capstones
            </div>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Accordion Phase Tree */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
        {phases.map((phase) => {
          const isExpanded = !!expandedPhases[phase.id];
          const phaseCompletedCount = phase.modules.filter(isModuleCompleted).length;
          const isPhaseDone = phaseCompletedCount === phase.modules.length;

          return (
            <div
              key={phase.id}
              className="rounded-lg border border-stone-200/60 dark:border-stone-800/80 overflow-hidden bg-white/70 dark:bg-stone-900/40"
            >
              {/* Phase Accordion Button */}
              <button
                type="button"
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-stone-100/70 dark:hover:bg-stone-800/60 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-mono font-bold ${
                      isPhaseDone
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                    }`}
                  >
                    P{phase.number}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {phase.title}
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {phase.suggestedWeeks} · {phaseCompletedCount}/{phase.modules.length}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                )}
              </button>

              {/* Phase Modules List */}
              {isExpanded && (
                <div className="divide-y divide-stone-100 dark:divide-stone-800/50 bg-stone-50/50 dark:bg-stone-900/20">
                  {phase.modules.map((m) => {
                    const isCurrent =
                      m.id === resolvedActiveId ||
                      m.code === resolvedActiveId ||
                      MODULE_TO_LEGACY_CHAPTER_MAP[m.id] === currentModuleId;
                    const isDone = isModuleCompleted(m);

                    return (
                      <Link
                        key={m.id}
                        to={`/learn/${m.id}`}
                        onClick={onCloseMobile}
                        className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                          isCurrent
                            ? 'bg-[#d2e8d4] text-[#143d22] font-semibold dark:bg-[#203828] dark:text-emerald-300 border-l-3 border-emerald-600'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-stone-300 dark:text-stone-600 shrink-0" />
                          )}
                          <span className="font-mono text-[10px] text-stone-400 dark:text-stone-500 shrink-0">
                            {m.code}
                          </span>
                          <span className="truncate">{m.title}</span>
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono ml-1 shrink-0">
                          {m.estimatedMinutes}m
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="p-3 border-t border-stone-200/80 dark:border-stone-800 bg-[#f8f6f0] dark:bg-[#121315]">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="text-stone-500 uppercase tracking-wider text-[10px]">
            PROGRESS
          </span>
          <span className="font-bold text-stone-900 dark:text-white">
            {totalCompleted} / {allModules.length} ({progressPercent}%)
          </span>
        </div>
        <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <Link
          to="/roadmap"
          className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-800 dark:text-emerald-400 hover:underline"
        >
          <Map className="w-3 h-3" />
          <span>Interactive Dependency Graph</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside
        aria-label="Course curriculum map"
        className="hidden md:block w-72 lg:w-80 h-[calc(100vh-3.5rem)] sticky top-14 shrink-0 overflow-hidden"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 md:hidden bg-slate-900/50 backdrop-blur-sm"
          onClick={onCloseMobile}
        >
          <div
            className="w-80 max-w-[85vw] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
