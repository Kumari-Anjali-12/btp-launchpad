import React from 'react';
import { Briefcase } from 'lucide-react';
import { BusinessScenario } from '../../types/curriculum';

export interface BusinessScenarioProps {
  scenario: BusinessScenario;
}

export const BusinessScenarioSection: React.FC<BusinessScenarioProps> = ({ scenario }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-sap-slate-900 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Briefcase className="w-4 h-4 text-emerald-500" />
          <span>Enterprise Scenario: {scenario.title}</span>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Hypothetical Case Study
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {scenario.context}
      </p>

      <div>
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
          Enterprise Process Flow:
        </span>
        <div className="space-y-1.5">
          {scenario.workflowSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <strong className="text-slate-700 dark:text-slate-300">Business Objective (Illustrative): </strong>
        <span>{scenario.businessImpact}</span>
      </div>
    </div>
  );
};
