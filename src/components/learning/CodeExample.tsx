import React, { useState } from 'react';
import { Terminal, Copy, Check, AlertCircle } from 'lucide-react';
import { TechnicalExample } from '../../types/curriculum';

export interface CodeExampleProps {
  example: TechnicalExample;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ example }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(example.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = example.code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span>Practical Technical Example: {example.title}</span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase font-mono">{example.language}</span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400">
        {example.purpose}
      </p>

      {/* Syntax container */}
      <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-200 shadow-sm overflow-hidden font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
          <span>{example.title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="overflow-x-auto leading-relaxed text-[11px] text-slate-100 whitespace-pre">
          {example.code}
        </pre>
      </div>

      {/* Line explanations */}
      {example.lineExplanations.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-sap-slate-900 space-y-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
            Line-by-Line Technical Analysis:
          </span>
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {example.lineExplanations.map((exp, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-sap-blue-600 dark:text-sap-blue-400 shrink-0 font-semibold">
                  [{exp.lines}]
                </span>
                <span>{exp.explanation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expected output */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/60 dark:bg-emerald-950/20 text-xs">
        <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
          Expected Runtime Output / Behavior:
        </span>
        <pre className="font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
          {example.expectedOutput}
        </pre>
      </div>

      {/* Common beginner mistakes */}
      {example.commonMistakes.length > 0 && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-3 dark:border-rose-900/60 dark:bg-rose-950/20 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Common Beginner Gotchas to Avoid:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
            {example.commonMistakes.map((mis, i) => (
              <li key={i}>{mis}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
