import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  Circle,
  ChevronLeft,
  Keyboard,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { LessonStep } from '../../types/curriculum';

interface GuidedInstructorPanelProps {
  currentStepIndex: number;
  steps: LessonStep[];
  learningObjectives: string[];
  onSelectStep: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onReplay?: () => void;
  onTogglePlay?: () => void;
}

export const GuidedInstructorPanel: React.FC<GuidedInstructorPanelProps> = ({
  currentStepIndex,
  steps,
  learningObjectives,
  onSelectStep,
  onPrev,
  onNext,
  onReplay,
  onTogglePlay,
}) => {
  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const canPrev = currentStepIndex > 0;
  const canNext = currentStepIndex < totalSteps - 1;

  // Track user-checked learning objectives locally
  const [checkedObjectives, setCheckedObjectives] = useState<Record<number, boolean>>({});

  const toggleObjective = (idx: number) => {
    setCheckedObjectives((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Keyboard navigation shortcuts: [<] [>] step · [R] replay · [Space] pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input, textarea or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight' && canNext) {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && canPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key.toLowerCase() === 'r' && onReplay) {
        e.preventDefault();
        onReplay();
      } else if (e.key === ' ' && onTogglePlay) {
        e.preventDefault();
        onTogglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canNext, canPrev, onNext, onPrev, onReplay, onTogglePlay]);

  return (
    <aside
      aria-label="Guided learning instructor"
      className="hidden xl:flex flex-col w-80 lg:w-88 h-[calc(100vh-3.5rem)] sticky top-14 shrink-0 border-l border-stone-200/80 dark:border-stone-800 bg-[#fbf9f4] dark:bg-[#141517] overflow-y-auto"
    >
      <div className="p-4 space-y-4">
        {/* Step Badge & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-[#d2e8d4] dark:bg-[#203828] px-2.5 py-0.5 rounded-full">
              STEP {currentStepIndex + 1} / {totalSteps}
            </span>
            <span className="text-[10px] font-mono text-stone-400 uppercase">
              {currentStepIndex === 0
                ? 'SETUP'
                : currentStepIndex === totalSteps - 1
                ? 'FINAL'
                : 'EXECUTION'}
            </span>
          </div>

          {/* Quick step jumps */}
          <div className="flex items-center gap-1">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectStep(idx)}
                title={`Jump to Step ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentStepIndex
                    ? 'bg-emerald-600 dark:bg-emerald-400'
                    : 'bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Explanation & Instruction */}
        <div className="space-y-2">
          <h2 className="text-base font-bold text-stone-900 dark:text-white leading-snug">
            {currentStep?.title}
          </h2>
          {currentStep?.subtitle && (
            <p className="text-xs text-stone-500 dark:text-stone-400 italic">
              {currentStep.subtitle}
            </p>
          )}
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            {currentStep?.explanation}
          </p>

          {currentStep?.taskInstruction && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-850 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentStep.taskInstruction}</span>
            </div>
          )}

          {currentStep?.warning && (
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-850 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{currentStep.warning}</span>
            </div>
          )}
        </div>

        {/* Reference UI "KEY IDEA" Callout Card */}
        {currentStep?.keyIdea && (
          <div className="rounded-xl border border-emerald-200/80 bg-white dark:border-emerald-900/60 dark:bg-stone-900/80 p-3.5 shadow-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400">
              <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                KEY IDEA
              </span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {currentStep.keyIdea}
            </p>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>&lt; Back</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
          >
            <span>{canNext ? `Next: Step ${currentStepIndex + 2} ->` : 'Completed'}</span>
          </button>
        </div>

        {/* Keyboard Shortcuts Legend (verbatim from reference screenshot) */}
        <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-stone-100/80 dark:bg-stone-850/80 text-[11px] font-mono text-stone-500 dark:text-stone-400 border border-stone-200/60 dark:border-stone-750">
          <Keyboard className="w-3.5 h-3.5 text-stone-400" />
          <span>[&lt;] [&gt;] step · [R] replay · [Space] pause</span>
        </div>

        {/* YOU'LL LEARN Checklist (from reference UI) */}
        <div className="space-y-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              YOU&apos;LL LEARN
            </span>
            <span className="text-[10px] font-mono text-stone-400">
              {Object.values(checkedObjectives).filter(Boolean).length} /{' '}
              {learningObjectives.length}
            </span>
          </div>

          <div className="space-y-2">
            {learningObjectives.map((obj, idx) => {
              const isChecked = !!checkedObjectives[idx];

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleObjective(idx)}
                  className="w-full flex items-start gap-2.5 text-left p-2 rounded-lg hover:bg-white/80 dark:hover:bg-stone-900/60 transition-colors group"
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-stone-400 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-xs leading-relaxed ${
                      isChecked
                        ? 'line-through text-stone-400 dark:text-stone-500'
                        : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {obj}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
