import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { LessonStep } from '../../types/curriculum';

interface LessonStepperProps {
  currentStepIndex: number;
  steps: LessonStep[];
  onSelectStep: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export const LessonStepper: React.FC<LessonStepperProps> = ({
  currentStepIndex,
  steps,
  onSelectStep,
  onPrev,
  onNext,
  canPrev,
  canNext,
}) => {
  const currentStep = steps[currentStepIndex];

  return (
    <div className="sticky bottom-0 z-20 bg-white/95 dark:bg-[#151619]/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800 p-3 sm:px-6 shadow-md rounded-t-xl">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Step Indicator Text */}
        <div className="flex items-center gap-2 truncate text-xs w-full sm:w-auto">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-850 shrink-0">
            IN THIS LESSON
          </span>
          <span className="font-semibold text-stone-900 dark:text-white truncate">
            Step {currentStepIndex + 1} of {steps.length}:{' '}
            <span className="font-normal text-stone-600 dark:text-stone-300">
              {currentStep?.title || 'Overview'}
            </span>
          </span>
        </div>

        {/* Step Pills & Prev/Next Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          {/* Step Dots/Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[220px] py-1">
            {steps.map((s, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <button
                  key={s.stepNumber}
                  type="button"
                  onClick={() => onSelectStep(idx)}
                  title={`Step ${s.stepNumber}: ${s.title}`}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 ring-2 ring-emerald-600 dark:ring-emerald-400'
                      : isPast
                      ? 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                      : 'bg-stone-100 text-stone-400 dark:bg-stone-850 dark:text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {isPast ? <Check className="w-3 h-3 text-emerald-600" /> : s.stepNumber}
                </button>
              );
            })}
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Previous step"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              aria-label="Next step"
              className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
            >
              <span>{canNext ? 'Next Step' : 'Last Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
