import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

export interface LearningObjectivesProps {
  objectives: string[];
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({ objectives }) => {
  return (
    <div className="rounded-xl border border-sap-blue-200 bg-sap-blue-50/50 p-4 sm:p-5 dark:border-sap-blue-900/60 dark:bg-sap-blue-950/20">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sap-blue-700 dark:text-sap-blue-300 mb-2.5">
        <Target className="w-4 h-4 text-sap-blue-600 dark:text-sap-blue-400" />
        <span>What You Will Learn In This Chapter</span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
        {objectives.map((obj, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-sap-blue-500 shrink-0 mt-0.5" />
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
