import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  RefreshCw,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { PracticeDrill } from '../../types/practice';
import { completeDrill, recordDrillAttempt } from '../../lib/storage';
import { Button } from '../common/Button';
import { SimulationBadge } from '../common/SimulationBadge';

interface DrillWorkspaceProps {
  drill: PracticeDrill;
  onBack?: () => void;
  onDrillCompleted?: (drillId: string) => void;
  isInitiallyCompleted?: boolean;
}

export const DrillWorkspace: React.FC<DrillWorkspaceProps> = ({
  drill,
  onBack,
  onDrillCompleted,
  isInitiallyCompleted = false,
}) => {
  const [code, setCode] = useState(drill.starterCode);
  const [activeHintIndex, setActiveHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [validationResults, setValidationResults] = useState<
    Array<{ id: string; description: string; passed: boolean }>
  >([]);
  const [hasRunValidation, setHasRunValidation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isInitiallyCompleted);

  useEffect(() => {
    setCode(drill.starterCode);
    setActiveHintIndex(-1);
    setShowSolution(false);
    setValidationResults([]);
    setHasRunValidation(false);
    setIsCompleted(isInitiallyCompleted);
    recordDrillAttempt(drill.id);
  }, [drill, isInitiallyCompleted]);

  const handleRunValidation = () => {
    const results = drill.validationRules.map((rule) => ({
      id: rule.id,
      description: rule.description,
      passed: rule.test(code),
    }));

    setValidationResults(results);
    setHasRunValidation(true);

    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      setIsCompleted(true);
      completeDrill(drill.id);
      if (onDrillCompleted) {
        onDrillCompleted(drill.id);
      }
    }
  };

  const handleReset = () => {
    setCode(drill.starterCode);
    setValidationResults([]);
    setHasRunValidation(false);
  };

  const handleRevealNextHint = () => {
    if (activeHintIndex < drill.hints.length - 1) {
      setActiveHintIndex((prev) => prev + 1);
    }
  };

  const lineNumbers = code.split('\n').map((_, idx) => idx + 1);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-semibold text-sap-blue-600 dark:text-sap-blue-400 hover:underline mr-1"
              >
                &larr; Back to Practice Catalog
              </button>
            )}
            <SimulationBadge />
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{drill.title}</h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 max-w-3xl">{drill.summary}</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>~{drill.estimatedMinutes} mins</span>
          </span>
          <span
            className={`px-2.5 py-1 rounded-md font-semibold uppercase text-[11px] ${
              drill.difficulty === 'beginner'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : drill.difficulty === 'intermediate'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
            }`}
          >
            {drill.difficulty}
          </span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Instructions & Rules (4 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Instructions Box */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Task Instructions</h2>
            <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
              {drill.instructions.map((inst, i) => (
                <li key={i} className="pl-1">
                  <span>{inst}</span>
                </li>
              ))}
            </ol>

            {/* Concepts Chips */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Target Concepts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {drill.concepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Validation Checklist Box */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Acceptance Criteria</h2>
            <div className="space-y-2">
              {drill.validationRules.map((rule) => {
                const res = validationResults.find((r) => r.id === rule.id);
                return (
                  <div
                    key={rule.id}
                    className="flex items-start gap-2 text-xs py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80"
                  >
                    {hasRunValidation ? (
                      res?.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`leading-tight ${
                        hasRunValidation && res?.passed
                          ? 'text-slate-900 dark:text-white font-medium'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {rule.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hints & Solution Drawer */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Guided Assistance</span>
              {activeHintIndex < drill.hints.length - 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRevealNextHint}
                  leftIcon={<HelpCircle className="w-3.5 h-3.5" />}
                >
                  Unlock Hint ({activeHintIndex + 2}/{drill.hints.length})
                </Button>
              )}
            </div>

            {/* Revealed Hints */}
            {activeHintIndex >= 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {drill.hints.slice(0, activeHintIndex + 1).map((hint, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200"
                  >
                    <span className="font-semibold block mb-0.5">Hint #{idx + 1}:</span>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Solution Toggle */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowSolution((prev) => !prev)}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1"
              >
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sap-blue-500" />
                  <span>{showSolution ? 'Hide Solution & Explanation' : 'Reveal Model Solution'}</span>
                </div>
                {showSolution ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {showSolution && (
                <div className="mt-2 space-y-2">
                  <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre">
                    {drill.solutionCode}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-white not-italic block mb-1">
                      Architectural Note:
                    </span>
                    {drill.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Action Bar (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex-1 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sap-blue-400" />
                <span>Interactive Exercise Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Code</span>
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex flex-1 min-h-[360px] font-mono text-xs text-slate-100">
              <div className="select-none py-3 px-2 bg-slate-950/70 text-slate-600 text-right font-mono border-r border-slate-800">
                {lineNumbers.map((num) => (
                  <div key={num} className="leading-6 px-1">
                    {num}
                  </div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full p-3 bg-transparent text-slate-100 font-mono text-xs leading-6 resize-none focus:outline-none focus:ring-0 overflow-auto whitespace-pre font-normal"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Code Editor"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {hasRunValidation ? (
                isCompleted ? (
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <Award className="w-4 h-4" />
                    All criteria met! Progress recorded.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    Some criteria failed. Review instructions and hints above.
                  </span>
                )
              ) : (
                <span>Edit your code and run validation to verify your solution.</span>
              )}
            </div>

            <Button
              variant="primary"
              onClick={handleRunValidation}
              leftIcon={<Play className="w-4 h-4" />}
            >
              Verify Solution
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
