import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  RefreshCw,
  Award,
  Sparkles,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { IndependentChallenge } from '../../types/practice';
import { submitChallenge } from '../../lib/storage';
import { Button } from '../common/Button';
import { SimulationBadge } from '../common/SimulationBadge';

interface IndependentChallengeWorkspaceProps {
  challenge: IndependentChallenge;
  onBack?: () => void;
  onChallengeSubmitted?: (challengeId: string, score: number) => void;
  savedScore?: number;
}

export const IndependentChallengeWorkspace: React.FC<IndependentChallengeWorkspaceProps> = ({
  challenge,
  onBack,
  onChallengeSubmitted,
  savedScore,
}) => {
  const [code, setCode] = useState(challenge.starterCode);
  const [hasSubmitted, setHasSubmitted] = useState(savedScore !== undefined);
  const [score, setScore] = useState(savedScore || 0);
  const [ruleResults, setRuleResults] = useState<
    Array<{ id: string; description: string; passed: boolean }>
  >([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    const results = challenge.validationRules.map((rule) => ({
      id: rule.id,
      description: rule.description,
      passed: rule.test(code),
    }));

    const passedCount = results.filter((r) => r.passed).length;
    const computedScore = Math.round((passedCount / results.length) * 100);
    const passed = computedScore >= 80;

    setRuleResults(results);
    setScore(computedScore);
    setHasSubmitted(true);

    submitChallenge(challenge.id, computedScore, passed);

    if (onChallengeSubmitted) {
      onChallengeSubmitted(challenge.id, computedScore);
    }
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setHasSubmitted(false);
    setRuleResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-semibold text-sap-blue-600 dark:text-sap-blue-400 hover:underline mr-1"
              >
                &larr; Back to Challenges
              </button>
            )}
            <SimulationBadge />
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
              Level 3 Challenge
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{challenge.title}</h1>
        </div>

        {hasSubmitted && (
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                score >= 80
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Score: {score}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Scenario Overview */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Business Scenario</h2>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{challenge.scenario}</p>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requirements & Evaluation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Solution Requirements
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
              {challenge.requirements.map((req, i) => (
                <li key={i} className="pl-1">
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Architectural Evaluation Criteria
            </h3>
            <div className="space-y-2 text-xs">
              {challenge.evaluationCriteria.map((crit, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sap-blue-500 shrink-0 mt-0.5" />
                  <span>{crit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hint Accordion */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-sm">
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <div className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-sap-blue-500" />
                <span>Architectural Hint</span>
              </div>
              {showHint ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {showHint && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/60">
                {challenge.hints[0]}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Submission (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex-1 flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-300">
              <span className="font-semibold">Independent Challenge Workspace</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full min-h-[360px] p-4 bg-transparent text-slate-100 font-mono text-xs leading-6 resize-none focus:outline-none focus:ring-0 overflow-auto whitespace-pre font-normal"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Independent Challenge Code"
            />
          </div>

          {/* Submission Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {hasSubmitted ? (
                score >= 80 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Challenge Successfully Cleared!
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    Score below 80%. Review criteria and retry.
                  </span>
                )
              ) : (
                <span>Submit your implementation when ready for evaluation.</span>
              )}
            </div>

            <Button
              variant="primary"
              onClick={handleSubmit}
              leftIcon={<Play className="w-4 h-4" />}
            >
              Submit for Evaluation
            </Button>
          </div>

          {/* Results Checklist after submit */}
          {hasSubmitted && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Evaluation Test Suite
              </h3>
              <div className="space-y-2">
                {ruleResults.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-start gap-2 text-xs py-1.5 px-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                  >
                    {rule.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`leading-tight ${
                        rule.passed
                          ? 'text-slate-900 dark:text-white font-medium'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {rule.description}
                    </span>
                  </div>
                ))}
              </div>

              {/* Architectural Debrief Toggle */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowExplanation((prev) => !prev)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1"
                >
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sap-blue-500" />
                    <span>{showExplanation ? 'Hide Architecture Debrief' : 'View Architecture Debrief & Solution'}</span>
                  </div>
                </button>

                {showExplanation && (
                  <div className="mt-3 space-y-3">
                    <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre">
                      {challenge.solutionCode}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-slate-900 dark:text-white not-italic block mb-1">
                        SAP BTP Best Practice Debrief:
                      </span>
                      {challenge.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
