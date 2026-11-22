import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { ChapterAnalogy } from '../../types/curriculum';

export interface AnalogySectionProps {
  analogy: ChapterAnalogy;
}

export const AnalogySection: React.FC<AnalogySectionProps> = ({ analogy }) => {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/25 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
        <Lightbulb className="w-4 h-4 text-amber-600" />
        <span>Everyday Analogy: {analogy.analogy}</span>
      </div>

      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        {analogy.explanation}
      </div>

      <div className="pt-2 border-t border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
        <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 dark:text-slate-200">Transition to Enterprise Reality: </strong>
          <span>{analogy.transition}</span>
        </div>
      </div>
    </div>
  );
};
