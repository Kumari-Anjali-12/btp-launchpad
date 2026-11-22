import React from 'react';
import { BookOpen } from 'lucide-react';
import { ConceptExplanation } from '../../types/curriculum';

export interface ConceptSectionProps {
  concept: ConceptExplanation;
}

export const ConceptSection: React.FC<ConceptSectionProps> = ({ concept }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <BookOpen className="w-4 h-4 text-sap-blue-500" />
        <span>Technical Concept Breakdown</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. What It Is */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-sap-slate-900">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400 mb-1.5">
            1. What It Is
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {concept.whatItIs}
          </p>
        </div>

        {/* 2. Why It Exists */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-sap-slate-900">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1.5">
            2. Why It Exists
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {concept.whyItExists}
          </p>
        </div>

        {/* 3. What Problem It Solves */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-sap-slate-900">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
            3. The Problem It Solves
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {concept.problemSolved}
          </p>
        </div>

        {/* 4. How It Works */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-sap-slate-900">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
            4. How It Works Under the Hood
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {concept.howItWorks}
          </p>
        </div>
      </div>

      {/* 5. Where It Fits Into SAP BTP */}
      <div className="rounded-xl border border-sap-blue-200 bg-sap-blue-50/40 p-4 dark:border-sap-blue-900/50 dark:bg-sap-blue-950/20">
        <h4 className="text-xs font-bold uppercase tracking-wider text-sap-blue-700 dark:text-sap-blue-300 mb-1.5">
          5. Where It Fits in Modern SAP BTP Architecture
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {concept.btpFit}
        </p>
      </div>
    </div>
  );
};
