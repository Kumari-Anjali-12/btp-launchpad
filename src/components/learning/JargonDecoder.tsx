import React from 'react';
import { BookMarked } from 'lucide-react';
import { JargonTerm } from '../../types/curriculum';

export interface JargonDecoderProps {
  terms: JargonTerm[];
}

export const JargonDecoder: React.FC<JargonDecoderProps> = ({ terms }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <BookMarked className="w-4 h-4 text-purple-500" />
        <span>Enterprise Jargon Decoder</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-sap-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold">
              <th className="py-2.5 px-4 w-1/4">Technical Term</th>
              <th className="py-2.5 px-4 w-2/5">Plain-English Meaning</th>
              <th className="py-2.5 px-4 w-1/3">Familiar Tech Equivalent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {terms.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-2.5 px-4 font-mono font-bold text-sap-blue-600 dark:text-sap-blue-400">
                  {item.term}
                </td>
                <td className="py-2.5 px-4 leading-relaxed">
                  {item.simpleMeaning}
                </td>
                <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {item.familiarEquivalent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
