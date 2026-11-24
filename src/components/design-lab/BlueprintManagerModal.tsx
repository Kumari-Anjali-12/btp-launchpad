import React, { useState } from 'react';
import { Blueprint } from '../../types/designLab';
import {
  X,
  Plus,
  Copy,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Check,
  Edit2,
  Boxes,
} from 'lucide-react';
import {
  exportBlueprintJson,
  importBlueprintJson,
} from '../../lib/designLab/blueprintStorage';

export interface BlueprintManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprints: Blueprint[];
  activeBlueprintId: string;
  onSelectBlueprint: (id: string) => void;
  onCreateNew: () => void;
  onRenameBlueprint: (id: string, newName: string) => void;
  onDuplicateBlueprint: (id: string) => void;
  onDeleteBlueprint: (id: string) => void;
  onResetDefaults: () => void;
}

export const BlueprintManagerModal: React.FC<BlueprintManagerModalProps> = ({
  isOpen,
  onClose,
  blueprints,
  activeBlueprintId,
  onSelectBlueprint,
  onCreateNew,
  onRenameBlueprint,
  onDuplicateBlueprint,
  onDeleteBlueprint,
  onResetDefaults,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleStartRename = (bp: Blueprint) => {
    setEditingId(bp.id);
    setEditingName(bp.name);
  };

  const handleSaveRename = (id: string) => {
    if (editingName.trim()) {
      onRenameBlueprint(id, editingName.trim());
    }
    setEditingId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBlueprintJson(content);
      if (res.success && res.blueprint) {
        onSelectBlueprint(res.blueprint.id);
        onClose();
      } else {
        setImportError(res.error || 'Failed to parse blueprint JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Blueprint Management"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-sap-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-sap-blue-600 dark:text-sap-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Manage Architecture Blueprints
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onCreateNew();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sap-blue-600 text-white hover:bg-sap-blue-700 transition-colors shadow-2xs"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Blueprint</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <Upload className="h-3.5 w-3.5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 rounded transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* Reset Confirmation Banner */}
        {showResetConfirm && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-900 text-xs flex items-center justify-between">
            <span className="text-rose-900 dark:text-rose-200 font-medium">
              Restore all 3 original canonical blueprints? Custom changes will be reset.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-0.5 rounded bg-white text-slate-700 border text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetDefaults();
                  setShowResetConfirm(false);
                }}
                className="px-2 py-0.5 rounded bg-rose-600 text-white font-semibold text-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {importError && (
          <div className="p-3 bg-rose-50 border-b border-rose-200 text-rose-800 text-xs">
            {importError}
          </div>
        )}

        {/* Blueprint List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {blueprints.map((bp) => {
            const isActive = bp.id === activeBlueprintId;
            const isEditing = editingId === bp.id;

            return (
              <div
                key={bp.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                  isActive
                    ? 'border-sap-blue-500 bg-sap-blue-50/40 dark:border-sap-blue-600 dark:bg-sap-blue-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(bp.id)}
                          className="px-2 py-1 text-xs rounded border border-sap-blue-500 bg-white dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(bp.id)}
                          className="p-1 rounded bg-sap-blue-600 text-white"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {bp.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleStartRename(bp)}
                          title="Rename blueprint"
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                      </>
                    )}

                    {isActive && (
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-sap-blue-100 text-sap-blue-800 dark:bg-sap-blue-900/60 dark:text-sap-blue-200">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {bp.description || 'Custom user architecture blueprint.'}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                    <span>{bp.nodes.length} Components</span>
                    <span>&bull;</span>
                    <span>{bp.edges.length} Connections</span>
                    <span>&bull;</span>
                    <span>{bp.deploymentProfile}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectBlueprint(bp.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200"
                    >
                      Open
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onDuplicateBlueprint(bp.id)}
                    title="Duplicate blueprint"
                    aria-label={`Duplicate ${bp.name}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    <Copy className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => exportBlueprintJson(bp)}
                    title="Export JSON"
                    aria-label={`Export ${bp.name} as JSON`}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4" />
                  </button>

                  {blueprints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onDeleteBlueprint(bp.id)}
                      title="Delete blueprint"
                      aria-label={`Delete ${bp.name}`}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
