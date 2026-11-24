import React, { useState, useMemo } from 'react';
import {
  Search,
  Boxes,
  Plus,
  Info,
} from 'lucide-react';
import { ComponentCategory, ComponentDefinition } from '../../types/designLab';
import { COMPONENT_CATALOGUE } from '../../data/designLab/catalogue';
import { CATEGORY_LABELS, ICON_MAP, CATEGORY_COLORS } from './paletteConfig';

export interface ComponentPaletteProps {
  onAddComponent: (componentType: string) => void;
}

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onAddComponent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');
  const [inspectedComponent, setInspectedComponent] = useState<ComponentDefinition | null>(null);

  const allComponents = useMemo(() => Object.values(COMPONENT_CATALOGUE), []);

  const filteredComponents = useMemo(() => {
    return allComponents.filter((comp) => {
      if (selectedCategory !== 'all' && comp.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          comp.displayName.toLowerCase().includes(q) ||
          comp.plainEnglishDescription.toLowerCase().includes(q) ||
          comp.badgeText.toLowerCase().includes(q) ||
          comp.type.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [allComponents, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-sap-slate-900 border-r border-slate-200 dark:border-slate-800 w-full sm:w-72 lg:w-80 shrink-0 select-none">
      {/* Palette Header */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Boxes className="h-4 w-4 text-sap-blue-600 dark:text-sap-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
              Component Library
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {filteredComponents.length} items
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search BTP components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sap-blue-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1">
          {(Object.keys(CATEGORY_LABELS) as Array<ComponentCategory | 'all'>).map((catKey) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-sap-blue-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {CATEGORY_LABELS[catKey]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Component Cards List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {filteredComponents.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
            No components match &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredComponents.map((comp) => {
            const IconComp = ICON_MAP[comp.iconName] || Boxes;
            const colors = CATEGORY_COLORS[comp.category];

            return (
              <div
                key={comp.type}
                className="group relative rounded-lg border border-slate-200/90 bg-white p-2.5 transition-all hover:border-sap-blue-400 hover:shadow-xs dark:border-slate-800 dark:bg-sap-slate-900/80"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      <IconComp className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {comp.displayName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold uppercase tracking-wider ${colors.bg} ${colors.text}`}
                        >
                          {comp.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setInspectedComponent(
                          inspectedComponent?.type === comp.type ? null : comp
                        )
                      }
                      title="Inspect educational guidance"
                      aria-label={`View educational details for ${comp.displayName}`}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      <Info className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddComponent(comp.type)}
                      aria-label={`Add ${comp.displayName} to canvas`}
                      title="Add to canvas"
                      className="flex items-center justify-center h-6 w-6 rounded bg-slate-100 hover:bg-sap-blue-600 hover:text-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-sap-blue-500 dark:hover:text-white transition-all shadow-2xs"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                  {comp.plainEnglishDescription}
                </p>

                {/* Inline Educational Popover / Details */}
                {inspectedComponent?.type === comp.type && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] space-y-1.5 bg-slate-50/70 dark:bg-slate-800/40 p-2 rounded">
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300 block">
                        Analogy: {comp.realWorldAnalogy.metaphor}
                      </strong>
                      <p className="text-slate-500 dark:text-slate-400">
                        {comp.realWorldAnalogy.explanation}
                      </p>
                    </div>
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300 block">
                        Why Required:
                      </strong>
                      <p className="text-slate-500 dark:text-slate-400">
                        {comp.whyRequired}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
