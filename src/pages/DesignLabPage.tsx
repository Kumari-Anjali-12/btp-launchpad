import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Blueprint,
  ArchitectureNode,
  ArchitectureEdge,
  DeploymentProfileId,
  ConnectionType,
} from '../types/designLab';
import { COMPONENT_CATALOGUE } from '../data/designLab/catalogue';
import {
  DEPLOYMENT_PROFILES,
  EMPTY_BLUEPRINT,
  getDeploymentProfile,
} from '../data/designLab/defaultBlueprints';
import { validateArchitecture } from '../lib/designLab/validator';
import { generateMtaDescriptor } from '../lib/designLab/mtaGenerator';
import {
  loadAllBlueprints,
  saveBlueprint,
  duplicateBlueprint,
  deleteBlueprint,
  resetToDefaultBlueprints,
  getActiveBlueprintId,
  setActiveBlueprintId,
} from '../lib/designLab/blueprintStorage';

import { ArchitectureCanvas } from '../components/design-lab/ArchitectureCanvas';
import { ComponentPalette } from '../components/design-lab/ComponentPalette';
import { ComponentProperties } from '../components/design-lab/ComponentProperties';
import { ValidationPanel } from '../components/design-lab/ValidationPanel';
import { MtaPreviewPanel } from '../components/design-lab/MtaPreviewPanel';
import { BlueprintManagerModal } from '../components/design-lab/BlueprintManagerModal';

import { Badge } from '../components/common/Badge';
import { SimulationBadge } from '../components/common/SimulationBadge';
import {
  Boxes,
  ShieldCheck,
  FileCode,
  FolderOpen,
  CheckCircle2,
  ChevronRight,
  Sliders,
  X,
  Plus,
  FlaskConical,
} from 'lucide-react';

export const DesignLabPage: React.FC = () => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [currentBlueprint, setCurrentBlueprint] = useState<Blueprint>(EMPTY_BLUEPRINT);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Active view pane: 'canvas' | 'validation' | 'mta'
  const [activePane, setActivePane] = useState<'canvas' | 'validation' | 'mta'>('canvas');
  const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState(false);
  const [isPropertiesOpenMobile, setIsPropertiesOpenMobile] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);

  // Load initial blueprints
  useEffect(() => {
    const all = loadAllBlueprints();
    setBlueprints(all);
    const activeId = getActiveBlueprintId();
    const active = all.find((b) => b.id === activeId) || all[0] || EMPTY_BLUEPRINT;
    setCurrentBlueprint(active);
  }, []);

  // Sync state changes with persistence
  const updateAndSaveBlueprint = useCallback((updater: (prev: Blueprint) => Blueprint) => {
    setCurrentBlueprint((prev) => {
      const next = updater(prev);
      saveBlueprint(next);
      setSaveIndicator('Saved');
      setTimeout(() => setSaveIndicator(null), 1500);
      return next;
    });
  }, []);

  // Real-time validation computation
  const validationResult = useMemo(() => {
    return validateArchitecture(currentBlueprint);
  }, [currentBlueprint]);

  // Real-time MTA generation computation
  const mtaOutput = useMemo(() => {
    return generateMtaDescriptor(currentBlueprint);
  }, [currentBlueprint]);

  // Current selected node
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return currentBlueprint.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [currentBlueprint.nodes, selectedNodeId]);

  // Handle adding a component
  const handleAddComponent = (componentType: string) => {
    const def = COMPONENT_CATALOGUE[componentType];
    if (!def) return;

    const newId = `node-${componentType}-${Date.now().toString(36)}`;
    // Calculate sensible initial placement
    const existingCount = currentBlueprint.nodes.length;
    const initialX = 60 + (existingCount % 4) * 240;
    const initialY = 100 + Math.floor(existingCount / 4) * 140;

    const initialConfig: Record<string, string | number | boolean> = {};
    for (const field of def.configurationFields) {
      initialConfig[field.name] = field.defaultValue;
    }

    const newNode: ArchitectureNode = {
      id: newId,
      componentType,
      label: def.displayName,
      customName: def.displayName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      position: { x: initialX, y: initialY },
      configuration: initialConfig,
    };

    updateAndSaveBlueprint((bp) => ({
      ...bp,
      nodes: [...bp.nodes, newNode],
    }));

    setSelectedNodeId(newId);
    setSelectedEdgeId(null);
    setIsPropertiesOpenMobile(true);
  };

  // Move node on canvas
  const handleMoveNode = (nodeId: string, position: { x: number; y: number }) => {
    updateAndSaveBlueprint((bp) => ({
      ...bp,
      nodes: bp.nodes.map((n) => (n.id === nodeId ? { ...n, position } : n)),
    }));
  };

  // Update node configuration/label
  const handleUpdateNode = (nodeId: string, updates: Partial<ArchitectureNode>) => {
    updateAndSaveBlueprint((bp) => ({
      ...bp,
      nodes: bp.nodes.map((n) => (n.id === nodeId ? { ...n, ...updates } : n)),
    }));
  };

  // Delete node
  const handleDeleteNode = (nodeId: string) => {
    updateAndSaveBlueprint((bp) => ({
      ...bp,
      nodes: bp.nodes.filter((n) => n.id !== nodeId),
      // Automatically cascade-delete connected edges
      edges: bp.edges.filter((e) => e.sourceNodeId !== nodeId && e.targetNodeId !== nodeId),
    }));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  // Duplicate node
  const handleDuplicateNode = (nodeId: string) => {
    const target = currentBlueprint.nodes.find((n) => n.id === nodeId);
    if (!target) return;

    const newId = `node-${target.componentType}-${Date.now().toString(36)}`;
    const duplicate: ArchitectureNode = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      customName: `${target.customName || target.label}-copy`,
      position: {
        x: target.position.x + 30,
        y: target.position.y + 30,
      },
    };

    updateAndSaveBlueprint((bp) => ({
      ...bp,
      nodes: [...bp.nodes, duplicate],
    }));

    setSelectedNodeId(newId);
  };

  // Add edge connection
  const handleAddEdge = (sourceNodeId: string, targetNodeId: string, connectionType: ConnectionType) => {
    // Prevent duplicate edges
    const exists = currentBlueprint.edges.some(
      (e) => e.sourceNodeId === sourceNodeId && e.targetNodeId === targetNodeId
    );
    if (exists) return;

    const newEdge: ArchitectureEdge = {
      id: `edge-${sourceNodeId}-${targetNodeId}`,
      sourceNodeId,
      targetNodeId,
      connectionType,
      label: connectionType,
    };

    updateAndSaveBlueprint((bp) => ({
      ...bp,
      edges: [...bp.edges, newEdge],
    }));
  };

  // Delete edge connection
  const handleDeleteEdge = (edgeId: string) => {
    updateAndSaveBlueprint((bp) => ({
      ...bp,
      edges: bp.edges.filter((e) => e.id !== edgeId),
    }));
    if (selectedEdgeId === edgeId) {
      setSelectedEdgeId(null);
    }
  };

  // Clear canvas
  const handleClearCanvas = () => {
    updateAndSaveBlueprint((bp) => ({
      ...bp,
      nodes: [],
      edges: [],
    }));
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  };

  // Change deployment profile
  const handleDeploymentProfileChange = (profileId: DeploymentProfileId) => {
    updateAndSaveBlueprint((bp) => ({
      ...bp,
      deploymentProfile: profileId,
    }));
  };

  // Focus node from validation panel
  const handleFocusNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedEdgeId(null);
    setActivePane('canvas');
  };

  // Switch blueprint
  const handleSelectBlueprint = (id: string) => {
    const all = loadAllBlueprints();
    const found = all.find((b) => b.id === id);
    if (found) {
      setCurrentBlueprint(found);
      setActiveBlueprintId(id);
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
    }
  };

  // Create new blueprint
  const handleCreateNew = () => {
    const newBp: Blueprint = {
      ...EMPTY_BLUEPRINT,
      id: `bp-${Date.now()}`,
      name: 'Custom BTP Architecture',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveBlueprint(newBp);
    const all = loadAllBlueprints();
    setBlueprints(all);
    setCurrentBlueprint(newBp);
    setActiveBlueprintId(newBp.id);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  };

  // Rename blueprint
  const handleRenameBlueprint = (id: string, newName: string) => {
    updateAndSaveBlueprint((bp) => (bp.id === id ? { ...bp, name: newName } : bp));
    setBlueprints(loadAllBlueprints());
  };

  // Duplicate blueprint
  const handleDuplicateBlueprint = (id: string) => {
    const dup = duplicateBlueprint(id);
    const all = loadAllBlueprints();
    setBlueprints(all);
    setCurrentBlueprint(dup);
    setActiveBlueprintId(dup.id);
  };

  // Delete blueprint
  const handleDeleteBlueprint = (id: string) => {
    const next = deleteBlueprint(id);
    const all = loadAllBlueprints();
    setBlueprints(all);
    setCurrentBlueprint(next);
    setActiveBlueprintId(next.id);
  };

  // Reset defaults
  const handleResetDefaults = () => {
    const defaults = resetToDefaultBlueprints();
    setBlueprints(defaults);
    if (defaults[0]) {
      setCurrentBlueprint(defaults[0]);
      setActiveBlueprintId(defaults[0].id);
    }
  };

  const profile = getDeploymentProfile(currentBlueprint.deploymentProfile);

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-slate-50 dark:bg-[#121316]">
      {/* 1. TOP STUDIO TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-sap-slate-900 shrink-0 z-20 shadow-xs">
        {/* Left Identity & Blueprint Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Visual Architecture Design Lab</span>
            </h1>
            <span className="sr-only">Interactive Architecture Canvas</span>
            <Badge variant="purple">Phase 8 Studio</Badge>
            <SimulationBadge />
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Blueprint Name & Manager Button */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsManagerModalOpen(true)}
              aria-label="Manage Architecture Blueprints"
              title="Switch or manage blueprints"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-colors shadow-2xs"
            >
              <FolderOpen className="h-3.5 w-3.5 text-sap-blue-600 dark:text-sap-blue-400" />
              <span className="truncate max-w-[180px] sm:max-w-[240px]">
                {currentBlueprint.name}
              </span>
              <ChevronRight className="h-3 w-3 text-slate-400" />
            </button>

            {saveIndicator && (
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="h-3 w-3" />
                {saveIndicator}
              </span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden xl:block" />

          {/* Link to Practice Sandboxes */}
          <Link to="/practice" className="hidden xl:inline-flex items-center">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              aria-label="Launch Practice Sandboxes"
            >
              <FlaskConical className="h-3.5 w-3.5 text-sap-blue-600 dark:text-sap-blue-400" />
              <span>Launch Practice Sandboxes</span>
            </button>
          </Link>
        </div>

        {/* Center/Right Profile Selector & View Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Deployment Profile Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <Sliders className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
            <span className="text-slate-500 dark:text-slate-400 font-medium hidden md:inline">
              Profile:
            </span>
            <select
              value={currentBlueprint.deploymentProfile}
              onChange={(e) => handleDeploymentProfileChange(e.target.value as DeploymentProfileId)}
              aria-label="Select Target Deployment Profile"
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-sap-blue-500"
            >
              {Object.values(DEPLOYMENT_PROFILES).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <span className="hidden xl:inline-block text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              {profile.targetRuntime}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Mobile Palette / Properties Triggers */}
          {activePane === 'canvas' && (
            <div className="flex items-center gap-1 md:hidden">
              <button
                type="button"
                onClick={() => setIsPaletteOpenMobile(true)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-2xs"
                aria-label="Add Component to Architecture"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
              {selectedNode && (
                <button
                  type="button"
                  onClick={() => setIsPropertiesOpenMobile(true)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-sap-blue-600 text-white shadow-2xs"
                  aria-label="Inspect Component Properties"
                >
                  <span>Props</span>
                </button>
              )}
            </div>
          )}

          {/* View Mode Switcher Tabs */}
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActivePane('canvas')}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-semibold transition-colors ${
                activePane === 'canvas'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Boxes className="h-3.5 w-3.5" />
              <span>Canvas</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePane('validation')}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-semibold transition-colors ${
                activePane === 'validation'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Validation</span>
              {validationResult.summary.errorsCount > 0 ? (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500 text-white font-bold">
                  {validationResult.summary.errorsCount}
                </span>
              ) : (
                <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActivePane('mta')}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-semibold transition-colors ${
                activePane === 'mta'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>MTA YAML</span>
              {mtaOutput.isBlocked && (
                <span className="w-2 h-2 rounded-full bg-rose-500 ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE AREA */}
      <div className="flex flex-1 w-full overflow-hidden relative">
        {/* VIEW 1: FULL INTERACTIVE ARCHITECTURE CANVAS */}
        {activePane === 'canvas' && (
          <div className="flex flex-1 w-full h-full overflow-hidden">
            {/* Left: Component Palette */}
            <div className="hidden md:flex h-full">
              <ComponentPalette onAddComponent={handleAddComponent} />
            </div>

            {/* Center: Architecture Graph Canvas */}
            <div className="flex-1 h-full relative overflow-hidden flex flex-col">
              <ArchitectureCanvas
                nodes={currentBlueprint.nodes}
                edges={currentBlueprint.edges}
                selectedNodeId={selectedNodeId}
                selectedEdgeId={selectedEdgeId}
                validationResult={validationResult}
                onSelectNode={setSelectedNodeId}
                onSelectEdge={setSelectedEdgeId}
                onMoveNode={handleMoveNode}
                onAddEdge={handleAddEdge}
                onDeleteEdge={handleDeleteEdge}
                onDeleteNode={handleDeleteNode}
                onClearCanvas={handleClearCanvas}
              />
            </div>

            {/* Right: Component Properties & Educational Guide */}
            <div className="hidden lg:flex h-full">
              <ComponentProperties
                selectedNode={selectedNode}
                onUpdateNode={handleUpdateNode}
                onDeleteNode={handleDeleteNode}
                onDuplicateNode={handleDuplicateNode}
                onClose={() => setSelectedNodeId(null)}
              />
            </div>

            {/* Mobile Drawer: Component Palette */}
            {isPaletteOpenMobile && (
              <div className="fixed inset-0 z-40 flex md:hidden bg-black/50 backdrop-blur-xs">
                <div className="w-80 max-w-[85vw] h-full bg-white dark:bg-sap-slate-900 shadow-2xl flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Add BTP Component</span>
                    <button
                      type="button"
                      onClick={() => setIsPaletteOpenMobile(false)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
                      aria-label="Close Component Palette"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <ComponentPalette
                      onAddComponent={(type) => {
                        handleAddComponent(type);
                        setIsPaletteOpenMobile(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Drawer: Component Properties */}
            {isPropertiesOpenMobile && selectedNode && (
              <div className="fixed inset-0 z-40 flex md:hidden justify-end bg-black/50 backdrop-blur-xs">
                <div className="w-80 max-w-[85vw] h-full bg-white dark:bg-sap-slate-900 shadow-2xl flex flex-col">
                  <ComponentProperties
                    selectedNode={selectedNode}
                    onUpdateNode={handleUpdateNode}
                    onDeleteNode={(id) => {
                      handleDeleteNode(id);
                      setIsPropertiesOpenMobile(false);
                    }}
                    onDuplicateNode={handleDuplicateNode}
                    onClose={() => setIsPropertiesOpenMobile(false)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: VALIDATION ENGINE PANEL */}
        {activePane === 'validation' && (
          <div className="flex-1 w-full h-full overflow-hidden">
            <ValidationPanel
              validationResult={validationResult}
              onFocusNode={handleFocusNode}
            />
          </div>
        )}

        {/* VIEW 3: MTA YAML DESCRIPTOR PREVIEW & EXPORT */}
        {activePane === 'mta' && (
          <div className="flex-1 w-full h-full overflow-hidden">
            <MtaPreviewPanel
              mtaOutput={mtaOutput}
              onOpenValidation={() => setActivePane('validation')}
            />
          </div>
        )}
      </div>

      {/* 3. MODAL BLUEPRINT MANAGER */}
      <BlueprintManagerModal
        isOpen={isManagerModalOpen}
        onClose={() => setIsManagerModalOpen(false)}
        blueprints={blueprints}
        activeBlueprintId={currentBlueprint.id}
        onSelectBlueprint={handleSelectBlueprint}
        onCreateNew={handleCreateNew}
        onRenameBlueprint={handleRenameBlueprint}
        onDuplicateBlueprint={handleDuplicateBlueprint}
        onDeleteBlueprint={handleDeleteBlueprint}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
};
