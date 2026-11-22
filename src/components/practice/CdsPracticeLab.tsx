import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Eye, Sparkles, Database, Code, Check } from 'lucide-react';
import { validateCdsCode } from '../../lib/practice/cdsValidator';
import { CdsParseResult } from '../../types/practice';
import { Button } from '../common/Button';
import { SimulationBadge } from '../common/SimulationBadge';

interface CdsPracticeLabProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onValidate?: (result: CdsParseResult) => void;
  title?: string;
  description?: string;
  readOnly?: boolean;
}

const DEFAULT_SAMPLE_CDS = `namespace sap.launchpad;

entity Books : cuid, managed {
  title       : String(120);
  stock       : Integer;
  price       : Decimal(9, 2);
  author      : Association to Authors;
}

entity Authors : cuid {
  name        : String(100);
  nationality : String(50);
  books       : Association to many Books on books.author = $self;
}
`;

export const CdsPracticeLab: React.FC<CdsPracticeLabProps> = ({
  initialCode = DEFAULT_SAMPLE_CDS,
  onCodeChange,
  onValidate,
  title = 'Interactive CDS Modeler & DDL Compiler',
  description = 'Write Core Data Services (CDS) models and compile to relational SAP HANA tables and OData metadata in real-time.',
}) => {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<'sql' | 'edmx' | 'entities' | 'diagnostics'>('sql');
  const [copied, setCopied] = useState(false);

  // Live compilation
  const parseResult = useMemo(() => {
    return validateCdsCode(code);
  }, [code]);

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code);
    }
    if (onValidate) {
      onValidate(parseResult);
    }
  }, [code, parseResult, onCodeChange, onValidate]);

  const handleReset = () => {
    setCode(initialCode);
  };

  const handleCopyCompiled = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lineNumbers = useMemo(() => {
    const count = code.split('\n').length;
    return Array.from({ length: Math.max(count, 12) }, (_, i) => i + 1);
  }, [code]);

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
            <SimulationBadge />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Compilation Active</span>
          </div>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Panel: CDS Code Editor */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-sap-blue-400" />
              <span>db/schema.cds</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              {parseResult.valid ? (
                <span className="flex items-center gap-1 text-emerald-400 font-sans font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Valid CDS
                </span>
              ) : (
                <span className="flex items-center gap-1 text-rose-400 font-sans font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {parseResult.errors.filter((e) => e.severity === 'error').length} Error(s)
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-1 min-h-[360px] font-mono text-xs text-slate-100">
            {/* Line numbers gutter */}
            <div className="select-none py-3 px-2.5 bg-slate-950/70 text-slate-600 text-right font-mono border-r border-slate-800">
              {lineNumbers.map((num) => {
                const hasError = parseResult.errors.some((e) => e.line === num && e.severity === 'error');
                return (
                  <div
                    key={num}
                    className={`leading-6 px-1 ${
                      hasError ? 'text-rose-400 font-bold bg-rose-950/50 rounded' : ''
                    }`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>

            {/* Code text area */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full p-3 bg-transparent text-slate-100 font-mono text-xs leading-6 resize-none focus:outline-none focus:ring-0 overflow-auto whitespace-pre font-normal"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Core Data Services CDS Code Input"
            />
          </div>

          {/* Bottom status bar */}
          <div className="px-3 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Namespace: {parseResult.namespace || '(default)'}</span>
            <span>Entities Parsed: {parseResult.entities.length}</span>
          </div>
        </div>

        {/* Right Panel: Compilation Targets & Previews */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          {/* Tabs header */}
          <div className="flex items-center justify-between px-3 pt-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('sql')}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                  activeTab === 'sql'
                    ? 'border-sap-blue-600 text-sap-blue-600 dark:text-sap-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>SAP HANA DDL</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('edmx')}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                  activeTab === 'edmx'
                    ? 'border-sap-blue-600 text-sap-blue-600 dark:text-sap-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>OData CSDL ($metadata)</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('entities')}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                  activeTab === 'entities'
                    ? 'border-sap-blue-600 text-sap-blue-600 dark:text-sap-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Entity Model ({parseResult.entities.length})</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                  activeTab === 'diagnostics'
                    ? 'border-sap-blue-600 text-sap-blue-600 dark:text-sap-blue-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Diagnostics ({parseResult.errors.length})</span>
                </div>
              </button>
            </div>

            {(activeTab === 'sql' || activeTab === 'edmx') && (
              <button
                type="button"
                onClick={() =>
                  handleCopyCompiled(
                    activeTab === 'sql'
                      ? parseResult.sqlPreview || ''
                      : parseResult.odataEdmxPreview || ''
                  )
                }
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-2 px-2 flex items-center gap-1"
                title="Copy generated code"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : null}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="p-4 flex-1 min-h-[360px] overflow-auto bg-slate-900/90 text-slate-100 font-mono text-xs">
            {activeTab === 'sql' && (
              <pre className="text-teal-300 whitespace-pre overflow-x-auto leading-relaxed">
                {parseResult.sqlPreview || '-- No SQL generated yet.'}
              </pre>
            )}

            {activeTab === 'edmx' && (
              <pre className="text-amber-200 whitespace-pre overflow-x-auto leading-relaxed">
                {parseResult.odataEdmxPreview || '<!-- No EDMX generated yet -->'}
              </pre>
            )}

            {activeTab === 'entities' && (
              <div className="space-y-4 font-sans text-xs">
                {parseResult.entities.length === 0 ? (
                  <p className="text-slate-400 italic">No entities defined. Write an entity to view parsed structure.</p>
                ) : (
                  parseResult.entities.map((ent) => (
                    <div
                      key={ent.name}
                      className="rounded-lg border border-slate-700 bg-slate-950 p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-sap-blue-400">entity {ent.name}</span>
                        <div className="flex items-center gap-1">
                          {ent.isAspectCuid && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-900/60 text-purple-200 border border-purple-700">
                              cuid
                            </span>
                          )}
                          {ent.isAspectManaged && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-900/60 text-blue-200 border border-blue-700">
                              managed
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 font-mono text-[11px]">
                        {ent.fields.map((f) => (
                          <div key={f.name} className="flex items-center justify-between text-slate-300 py-0.5 border-b border-slate-800/60">
                            <span className={f.isKey ? 'text-amber-300 font-semibold' : ''}>
                              {f.isKey && 'key '}
                              {f.name}
                            </span>
                            <span className="text-slate-400">
                              {f.isAssociation ? `Association to ${f.target}` : f.isComposition ? `Composition of many ${f.target}` : f.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'diagnostics' && (
              <div className="space-y-2 font-sans text-xs">
                {parseResult.errors.length === 0 ? (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>No errors found. The CDS model compiles cleanly.</span>
                  </div>
                ) : (
                  parseResult.errors.map((err, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg flex items-start gap-2.5 border ${
                        err.severity === 'error'
                          ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                          : 'bg-amber-950/40 border-amber-800 text-amber-300'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">
                          Line {err.line}: {err.severity.toUpperCase()}
                        </div>
                        <div className="mt-0.5 text-slate-200 font-mono text-[11px]">{err.message}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
