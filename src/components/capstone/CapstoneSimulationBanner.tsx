import React from 'react';
import { AlertCircle, Code2 } from 'lucide-react';

interface CapstoneSimulationBannerProps {
  className?: string;
  sourceFilePath?: string;
}

export const CapstoneSimulationBanner: React.FC<CapstoneSimulationBannerProps> = ({
  className = '',
  sourceFilePath,
}) => {
  return (
    <div
      className={`rounded-xl border border-amber-300/80 bg-amber-50/90 p-4 text-amber-900 shadow-sm dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200 ${className}`}
      role="region"
      aria-label="Simulation Environment Disclaimer"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="flex-1 text-sm">
          <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
            <span>EDUCATIONAL SIMULATOR — DEMO ONLY</span>
            <span className="rounded bg-amber-200/80 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
              Browser-Based Preview
            </span>
          </div>
          <p className="mt-1 leading-relaxed text-amber-800/90 dark:text-amber-300/90">
            This interactive preview demonstrates core concepts directly in browser memory. The production-ready,
            canonical SAP CAP implementation with real Node.js handlers, database persistence, and XSUAA security is located
            in{' '}
            <code className="rounded bg-amber-200/60 px-1.5 py-0.5 font-mono text-xs font-semibold text-amber-950 dark:bg-amber-900/80 dark:text-amber-100">
              projects/employee-leave-management/
            </code>
            .
          </p>
          {sourceFilePath && (
            <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400">
              <Code2 className="h-3.5 w-3.5" />
              <span>Corresponding Enterprise Source File:</span>
              <span className="font-mono font-semibold underline underline-offset-2">{sourceFilePath}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
