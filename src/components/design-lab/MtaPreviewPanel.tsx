import React, { useState } from 'react';
import { GeneratedMtaOutput, downloadMtaYaml } from '../../lib/designLab/mtaGenerator';
import {
  FileCode,
  Copy,
  Check,
  Download,
  AlertOctagon,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export interface MtaPreviewPanelProps {
  mtaOutput: GeneratedMtaOutput;
  onOpenValidation: () => void;
}

export const MtaPreviewPanel: React.FC<MtaPreviewPanelProps> = ({
  mtaOutput,
  onOpenValidation,
}) => {
  const [copied, setCopied] = useState(false);

  const { yaml, validation, isBlocked, blockingReason } = mtaOutput;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(yaml);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleDownload = () => {
    downloadMtaYaml(yaml, 'mta.yaml');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-sap-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 w-full overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileCode className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
              Generated MTA Deployment Descriptor
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy mta.yaml to clipboard"
              title="Copy YAML"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              aria-label="Download mta.yaml file"
              title="Download mta.yaml"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download mta.yaml</span>
            </button>
          </div>
        </div>

        {/* Validation Status Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {validation.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                badge.includes('Structurally')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : badge.includes('Semantically')
                  ? 'bg-sap-blue-50 text-sap-blue-700 border border-sap-blue-200 dark:bg-sap-blue-950/40 dark:text-sap-blue-300 dark:border-sap-blue-800'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
              }`}
            >
              <ShieldCheck className="h-3 w-3" />
              <span>{badge}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Blocked Warning Banner */}
      {isBlocked && (
        <div className="m-3 p-3 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-900/60 dark:bg-rose-950/30 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-rose-900 dark:text-rose-200">
            <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0" />
            <span>MTA Generation Blocked by Architectural Violations</span>
          </div>
          <p className="text-[11px] text-rose-800 dark:text-rose-300 leading-relaxed">
            {blockingReason ||
              'Your architecture contains blocking errors that prevent compiling a valid Cloud Foundry deployment descriptor.'}
          </p>
          <button
            type="button"
            onClick={onOpenValidation}
            className="text-[11px] font-bold text-rose-700 dark:text-rose-300 hover:underline inline-flex items-center gap-1 pt-1"
          >
            <span>Review Blocking Issues in Validation Panel &rarr;</span>
          </button>
        </div>
      )}

      {/* YAML Source Code Viewer */}
      <div className="flex-1 overflow-auto bg-slate-900 text-slate-100 p-4 font-mono text-xs leading-relaxed select-text">
        <pre className="overflow-x-auto">
          <code>{yaml}</code>
        </pre>
      </div>

      {/* Footer Educational Note */}
      <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-amber-500" />
          <span>Deployable via Cloud MTA Build Tool (<code>mbt build</code>) and <code>cf deploy</code>.</span>
        </span>
        <span className="font-mono text-[10px]">Cloud Foundry Target</span>
      </div>
    </div>
  );
};
