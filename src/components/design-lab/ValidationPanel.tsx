import React, { useState } from 'react';
import {
  ValidationResult,
  ValidationSeverity,
} from '../../types/designLab';
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Info,
  ArrowRight,
  ShieldAlert,
  Layers,
  Wrench,
} from 'lucide-react';

export interface ValidationPanelProps {
  validationResult: ValidationResult;
  onFocusNode: (nodeId: string) => void;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({
  validationResult,
  onFocusNode,
}) => {
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<ValidationSeverity | 'all'>('all');

  const { issues, summary, isValid } = validationResult;

  const filteredIssues = issues.filter((issue) => {
    if (activeSeverityFilter === 'all') return true;
    return issue.severity === activeSeverityFilter;
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-sap-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 w-full overflow-hidden">
      {/* Header & Status Bar */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4 text-sap-blue-600 dark:text-sap-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
              Architecture Validator
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isValid ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="h-3 w-3" />
                Valid Architecture
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
                <AlertOctagon className="h-3 w-3" />
                {summary.errorsCount} Blocking Errors
              </span>
            )}
          </div>
        </div>

        {/* Severity Count Pills */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              activeSeverityFilter === 'all'
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            All ({issues.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveSeverityFilter('error')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              activeSeverityFilter === 'error'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300'
            }`}
          >
            Errors ({summary.errorsCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveSeverityFilter('warning')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              activeSeverityFilter === 'warning'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300'
            }`}
          >
            Warnings ({summary.warningsCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveSeverityFilter('info')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              activeSeverityFilter === 'info'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300'
            }`}
          >
            Info ({summary.infoCount})
          </button>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {isValid && issues.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Zero Architectural Violations
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Every component connection, security boundary, and deployment requirement complies with official SAP BTP standards. You are ready to generate the MTA manifest.
            </p>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No issues match the selected severity filter.
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const isError = issue.severity === 'error';
            const isWarning = issue.severity === 'warning';

            const borderStyle = isError
              ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20'
              : isWarning
              ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20'
              : 'border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20';

            const badgeStyle = isError
              ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'
              : isWarning
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200';

            const Icon = isError ? AlertOctagon : isWarning ? AlertTriangle : Info;

            return (
              <div
                key={issue.id}
                className={`rounded-xl border p-3.5 space-y-2 text-xs transition-all ${borderStyle}`}
              >
                {/* Rule Title & Severity Tag */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <Icon className="h-4 w-4 shrink-0 mt-0.5 text-current" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                        {issue.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${badgeStyle}`}>
                          {issue.severity}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400">
                          {issue.ruleId}
                        </span>
                        {issue.blocksMtaGeneration && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-rose-200/80 text-rose-900 dark:bg-rose-900/80 dark:text-rose-200">
                            Blocks MTA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plain English Explanation */}
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  {issue.plainEnglishExplanation}
                </p>

                {/* Technical Explanation */}
                <div className="p-2 rounded bg-white/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-[10px] space-y-1">
                  <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Layers className="h-3 w-3" /> Technical Context:
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 leading-normal font-mono">
                    {issue.technicalExplanation}
                  </p>
                </div>

                {/* Suggested Correction & Action Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1">
                    <Wrench className="h-3.5 w-3.5 text-sap-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Fix:</strong> {issue.suggestedCorrection}</span>
                  </div>

                  {issue.affectedNodeIds.length > 0 && issue.affectedNodeIds[0] && (
                    <button
                      type="button"
                      onClick={() => onFocusNode(issue.affectedNodeIds[0] as string)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-sap-blue-600 hover:text-sap-blue-700 dark:text-sap-blue-400 shrink-0 shadow-2xs"
                    >
                      <span>Focus Component</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
