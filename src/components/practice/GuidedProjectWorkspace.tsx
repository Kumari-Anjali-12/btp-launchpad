import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Play,
  Sparkles,
  HelpCircle,
  Eye,
  RefreshCw,
  Building2,
  Server,
  Database,
  Globe,
  Layout,
  XCircle,
  Award,
} from 'lucide-react';
import { GuidedProject, ProjectMilestone } from '../../types/practice';
import { ProjectProgress } from '../../types/storage';
import { advanceProjectMilestone } from '../../lib/storage';
import { Button } from '../common/Button';
import { SimulationBadge } from '../common/SimulationBadge';

interface GuidedProjectWorkspaceProps {
  project: GuidedProject;
  savedProgress?: ProjectProgress;
  onBack?: () => void;
  onProjectUpdated?: (progress: ProjectProgress) => void;
}

export const GuidedProjectWorkspace: React.FC<GuidedProjectWorkspaceProps> = ({
  project,
  savedProgress,
  onBack,
  onProjectUpdated,
}) => {
  const initialMilestone = savedProgress?.currentMilestone || 1;
  const [activeStep, setActiveStep] = useState<number>(
    Math.min(initialMilestone, project.milestones.length)
  );

  const currentMilestone: ProjectMilestone | undefined = project.milestones.find(
    (m) => m.stepNumber === activeStep
  );

  const [code, setCode] = useState(currentMilestone?.starterCode || '');
  const [validationResults, setValidationResults] = useState<
    Array<{ id: string; description: string; passed: boolean }>
  >([]);
  const [hasRunValidation, setHasRunValidation] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState(-1);

  const completedSteps = savedProgress?.completedMilestones || [];
  const isProjectDone = Boolean(savedProgress?.isCompleted);

  // Sync code and state when active milestone changes
  useEffect(() => {
    if (currentMilestone) {
      setCode(currentMilestone.starterCode);
      setValidationResults([]);
      setHasRunValidation(false);
      setShowSolution(false);
      setActiveHintIndex(-1);
    }
  }, [currentMilestone]);

  const handleValidateMilestone = () => {
    if (!currentMilestone) return;

    const results = currentMilestone.validationRules.map((r) => ({
      id: r.id,
      description: r.description,
      passed: r.test(code),
    }));

    setValidationResults(results);
    setHasRunValidation(true);

    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      const isLastStep = activeStep === project.milestones.length;
      const updatedState = advanceProjectMilestone(project.id, activeStep, isLastStep);
      const projState = updatedState.practice?.projectProgress[project.id];
      if (projState && onProjectUpdated) {
        onProjectUpdated(projState);
      }
    }
  };

  const handleAdvanceNext = () => {
    if (activeStep < project.milestones.length) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const isCurrentStepPassed =
    completedSteps.includes(activeStep) ||
    (hasRunValidation && validationResults.every((r) => r.passed));

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
            {isProjectDone && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Project Certified
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{project.title}</h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 max-w-3xl">{project.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
            ~{project.estimatedHours} Hours
          </span>
          <span className="px-2.5 py-1 rounded-md bg-sap-blue-50 dark:bg-sap-blue-950/60 text-sap-blue-700 dark:text-sap-blue-400 font-semibold uppercase text-[11px] border border-sap-blue-200 dark:border-sap-blue-800">
            {project.difficulty}
          </span>
        </div>
      </div>

      {/* Enterprise Architecture Summary Strip */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-sap-blue-500" />
          <span>Enterprise Target Architecture</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <Server className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-slate-900 dark:text-white">Backend</span>
              <span className="text-slate-500 text-[11px]">{project.architectureSummary.backend}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <Database className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-slate-900 dark:text-white">Database</span>
              <span className="text-slate-500 text-[11px]">{project.architectureSummary.database}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <Globe className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-slate-900 dark:text-white">Integration</span>
              <span className="text-slate-500 text-[11px]">{project.architectureSummary.integration}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <Layout className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-slate-900 dark:text-white">Frontend</span>
              <span className="text-slate-500 text-[11px]">{project.architectureSummary.frontend}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {project.milestones.map((m) => {
          const isDone = completedSteps.includes(m.stepNumber);
          const isCurrent = activeStep === m.stepNumber;
          const isAccessible = m.stepNumber === 1 || completedSteps.includes(m.stepNumber - 1);

          return (
            <button
              key={m.id}
              type="button"
              disabled={!isAccessible}
              onClick={() => setActiveStep(m.stepNumber)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isCurrent
                  ? 'border-sap-blue-600 bg-sap-blue-50/40 dark:bg-sap-blue-950/30 ring-2 ring-sap-blue-500/30'
                  : isDone
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : isAccessible
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/40 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Step {m.stepNumber}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : !isAccessible ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-sap-blue-500" />
                )}
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {m.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Workspace */}
      {currentMilestone && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Instructions (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Milestone #{currentMilestone.stepNumber}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {currentMilestone.type}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {currentMilestone.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {currentMilestone.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Tasks
                </span>
                <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                  {currentMilestone.instructions.map((inst, i) => (
                    <li key={i} className="pl-1">
                      <span>{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Checkpoint Validation Criteria */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Milestone Verification Checks
              </h3>
              <div className="space-y-2">
                {currentMilestone.validationRules.map((rule) => {
                  const res = validationResults.find((r) => r.id === rule.id);
                  return (
                    <div
                      key={rule.id}
                      className="flex items-start gap-2 text-xs py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
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

            {/* Hints & Solution */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assistance</span>
                {activeHintIndex < currentMilestone.hints.length - 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveHintIndex((prev) => prev + 1)}
                    leftIcon={<HelpCircle className="w-3.5 h-3.5" />}
                  >
                    Hint ({activeHintIndex + 2}/{currentMilestone.hints.length})
                  </Button>
                )}
              </div>

              {activeHintIndex >= 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {currentMilestone.hints.slice(0, activeHintIndex + 1).map((h, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200"
                    >
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSolution((prev) => !prev)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1"
                >
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sap-blue-500" />
                    <span>{showSolution ? 'Hide Solution' : 'Reveal Reference Implementation'}</span>
                  </div>
                </button>

                {showSolution && (
                  <div className="mt-2 space-y-2">
                    <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre">
                      {currentMilestone.solutionCode}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      {currentMilestone.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor & Milestone Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex-1 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sap-blue-400" />
                  <span>Milestone Workspace Editor</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCode(currentMilestone.starterCode)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Milestone</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full min-h-[340px] p-4 bg-transparent text-slate-100 font-mono text-xs leading-6 resize-none focus:outline-none focus:ring-0 overflow-auto whitespace-pre font-normal"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Milestone Code Input"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div>
                {isCurrentStepPassed ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    Milestone {activeStep} Verified!
                  </span>
                ) : (
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Verify this milestone before advancing.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={handleValidateMilestone}
                  leftIcon={<Play className="w-4 h-4" />}
                >
                  Verify Checkpoint
                </Button>

                {isCurrentStepPassed && activeStep < project.milestones.length && (
                  <Button
                    variant="secondary"
                    onClick={handleAdvanceNext}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Next Milestone
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {isProjectDone && (
        <div className="p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-slate-900 dark:text-white space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
            <Award className="w-5 h-5" />
            <span>Project Milestones Complete & Verified</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            You have successfully implemented the domain schema, business rules, integration destinations, and verified the end-to-end architecture for this enterprise project on SAP BTP.
          </p>
        </div>
      )}
    </div>
  );
};
