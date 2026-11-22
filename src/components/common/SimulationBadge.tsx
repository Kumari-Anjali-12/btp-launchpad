import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Badge } from './Badge';

export const SimulationBadge: React.FC<{
  className?: string;
  showExplanation?: boolean;
}> = ({ className = '', showExplanation = false }) => {
  return (
    <div className={`inline-flex flex-col sm:flex-row sm:items-center gap-1.5 ${className}`}>
      <Badge variant="simulation" className="gap-1 shadow-xs">
        <ShieldAlert className="w-3 h-3 text-sky-600 dark:text-sky-400" />
        <span>Simulated SAP Environment</span>
      </Badge>
      {showExplanation && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          In-browser sandbox. No real SAP credentials or paid cloud quota required.
        </span>
      )}
    </div>
  );
};
