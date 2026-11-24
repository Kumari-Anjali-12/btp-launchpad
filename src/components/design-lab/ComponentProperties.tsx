import React, { useState } from 'react';
import {
  ArchitectureNode,
  ComponentDefinition,
} from '../../types/designLab';
import { COMPONENT_CATALOGUE } from '../../data/designLab/catalogue';
import { ICON_MAP, CATEGORY_COLORS } from './paletteConfig';
import {
  Boxes,
  Trash2,
  Copy,
  Lightbulb,
  AlertTriangle,
  Shield,
  ArrowRight,
  Info,
  CheckCircle,
  X,
} from 'lucide-react';

export interface ComponentPropertiesProps {
  selectedNode: ArchitectureNode | null;
  onUpdateNode: (nodeId: string, updates: Partial<ArchitectureNode>) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onClose: () => void;
}

export const ComponentProperties: React.FC<ComponentPropertiesProps> = ({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
  onClose,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!selectedNode) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center select-none bg-white dark:bg-sap-slate-900 border-l border-slate-200 dark:border-slate-800 w-full sm:w-80 lg:w-96 shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 mb-3">
          <Boxes className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-white">
          No Component Selected
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
          Click any component on the architecture canvas to inspect its enterprise configuration, security attributes, and educational analogies.
        </p>
      </div>
    );
  }

  const definition: ComponentDefinition | undefined =
    COMPONENT_CATALOGUE[selectedNode.componentType];
  const IconComp = definition ? ICON_MAP[definition.iconName] || Boxes : Boxes;
  const colors = definition ? CATEGORY_COLORS[definition.category] : CATEGORY_COLORS.deployment;

  const handleCustomNameChange = (val: string) => {
    onUpdateNode(selectedNode.id, { customName: val });
  };

  const handleConfigFieldChange = (fieldName: string, value: string | number | boolean) => {
    onUpdateNode(selectedNode.id, {
      configuration: {
        ...(selectedNode.configuration || {}),
        [fieldName]: value,
      },
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-sap-slate-900 border-l border-slate-200 dark:border-slate-800 w-full sm:w-80 lg:w-96 shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-2 sticky top-0 bg-white/95 dark:bg-sap-slate-900/95 backdrop-blur-md z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              <IconComp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {definition?.displayName || selectedNode.label}
              </h3>
              <span
                className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold uppercase tracking-wider ${colors.bg} ${colors.text}`}
              >
                {definition?.badgeText || selectedNode.componentType}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onDuplicateNode(selectedNode.id)}
              aria-label="Duplicate component"
              title="Duplicate component"
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              aria-label="Delete component"
              title="Delete component"
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close properties panel"
              title="Close properties"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Alert */}
        {showDeleteConfirm && (
          <div className="p-2.5 rounded-lg border border-rose-200 bg-rose-50 dark:border-rose-900/60 dark:bg-rose-950/30 text-xs space-y-2">
            <p className="font-semibold text-rose-900 dark:text-rose-200">
              Delete &ldquo;{selectedNode.customName || selectedNode.label}&rdquo;?
            </p>
            <p className="text-[11px] text-rose-700 dark:text-rose-300">
              This will also remove all connected input and output links.
            </p>
            <div className="flex items-center gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-2 py-1 rounded bg-white text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteNode(selectedNode.id);
                  setShowDeleteConfirm(false);
                }}
                className="px-2 py-1 rounded bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Section 1: Technical Properties & Configuration */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Component Configuration
          </span>

          {/* Technical Name / Identifier */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Technical Identifier / Resource Name
            </label>
            <input
              type="text"
              value={selectedNode.customName || selectedNode.label}
              onChange={(e) => handleCustomNameChange(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sap-blue-500"
            />
            <p className="text-[10px] text-slate-400">
              Unique name referenced in the generated MTA manifest.
            </p>
          </div>

          {/* Dynamic Configuration Fields */}
          {definition?.configurationFields && definition.configurationFields.length > 0 ? (
            definition.configurationFields.map((field) => {
              const currentValue =
                selectedNode.configuration?.[field.name] !== undefined
                  ? selectedNode.configuration[field.name]
                  : field.defaultValue;

              return (
                <div key={field.name} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    {field.label}
                    {field.required && <span className="text-rose-500 ml-1">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      value={String(currentValue)}
                      onChange={(e) => handleConfigFieldChange(field.name, e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sap-blue-500"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'boolean' ? (
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={Boolean(currentValue)}
                        onChange={(e) => handleConfigFieldChange(field.name, e.target.checked)}
                        className="rounded border-slate-300 text-sap-blue-600 focus:ring-sap-blue-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">
                        {field.description}
                      </span>
                    </label>
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={String(currentValue ?? '')}
                      onChange={(e) =>
                        handleConfigFieldChange(
                          field.name,
                          field.type === 'number' ? Number(e.target.value) : e.target.value
                        )
                      }
                      placeholder={field.placeholder}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sap-blue-500"
                    />
                  )}

                  {field.type !== 'boolean' && (
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {field.description}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-[11px] text-slate-400 italic">
              No additional configuration required for this component.
            </p>
          )}
        </div>

        {/* Section 2: Educational Guide & Real-World Analogy */}
        {definition && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Architectural Concept Guide
            </span>

            {/* Real World Analogy */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900/60 dark:bg-amber-950/20 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Analogy: {definition.realWorldAnalogy.metaphor}</span>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                {definition.realWorldAnalogy.explanation}
              </p>
            </div>

            {/* Why Required */}
            <div className="space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-sap-blue-500" /> Why This Component is Required:
              </strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {definition.whyRequired}
              </p>
            </div>

            {/* Technical Explanation */}
            <div className="space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Technical Role in SAP BTP:
              </strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {definition.technicalExplanation}
              </p>
            </div>

            {/* Security Implications */}
            <div className="space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-purple-500" /> Security & Trust Boundary:
              </strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {definition.securityImplications}
              </p>
            </div>

            {/* Common Beginner Mistakes */}
            {definition.commonMistakes.length > 0 && (
              <div className="rounded-lg border border-rose-100 bg-rose-50/60 p-3 dark:border-rose-950 dark:bg-rose-950/20 space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600" /> Common Beginner Pitfalls:
                </strong>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-rose-800 dark:text-rose-400">
                  {definition.commonMistakes.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Supported Connection Targets */}
            {definition.supportedConnectionTypes.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <strong className="text-slate-800 dark:text-slate-200 block text-[11px]">
                  Permitted Outbound Connections:
                </strong>
                <div className="space-y-1">
                  {definition.supportedConnectionTypes.map((conn, idx) => {
                    const targetDef = COMPONENT_CATALOGUE[conn.targetType];
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[11px]"
                      >
                        <ArrowRight className="h-3 w-3 text-sap-blue-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {targetDef?.displayName || conn.targetType}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-auto font-mono">
                          {conn.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
