import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Award,
  BookOpen,
  X,
  Lock,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import {
  CURRICULUM_MODULES,
  getAllPhases,
  getAllCapstones,
  getDeferredTopics,
  getRoadmapNodes,
  isModuleCompleted,
} from '../data/curriculum';
import { RoadmapDependencyNode } from '../types/curriculum';
import { loadUserProgress, setTargetWeeklyHours } from '../lib/storage';
import { UserProgressState } from '../types/storage';

export const RoadmapPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const [activeTab, setActiveTab] = useState<'graph' | 'phases' | 'pace' | 'capstones' | 'deferred' | 'milestones'>('graph');
  const [selectedNode, setSelectedNode] = useState<RoadmapDependencyNode | null>(null);
  const [weeklyHours, setWeeklyHoursState] = useState<number>(progress.targetWeeklyHours || 12);
  const [nodeTypeFilter, setNodeTypeFilter] = useState<'all' | 'module' | 'capstone' | 'practice' | 'project'>('all');
  const [graphSearch, setGraphSearch] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const phases = getAllPhases();
  const capstones = getAllCapstones();
  const deferredTopics = getDeferredTopics();
  const roadmapNodes = getRoadmapNodes();

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  // Pace calculations: Total ~227 hours across 9 phases
  const totalCurriculumHours = phases.reduce((acc, p) => acc + p.estimatedHours, 0) || 227;
  const estimatedWeeks = Math.ceil(totalCurriculumHours / weeklyHours);
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + estimatedWeeks * 7);
  const formattedCompletionDate = completionDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleWeeklyHoursChange = (hours: number) => {
    setWeeklyHoursState(hours);
    setTargetWeeklyHours(hours);
  };

  // Node completion & locked evaluation
  const getNodeStatus = (node: RoadmapDependencyNode): 'completed' | 'in-progress' | 'available' | 'locked' => {
    // 1. Check if completed
    if (node.moduleId && isModuleCompleted(node.moduleId, progress)) {
      return 'completed';
    }
    if (node.associatedPracticeId && progress.practice?.completedDrillIds.includes(node.associatedPracticeId)) {
      return 'completed';
    }
    if (node.associatedProjectId && progress.practice?.projectProgress[node.associatedProjectId]?.isCompleted) {
      return 'completed';
    }
    if (node.category === 'capstone') {
      const isCapstoneDone = progress.completedCapstones?.includes(node.id) || false;
      if (isCapstoneDone) return 'completed';
    }

    // 2. Check if locked by unsatisfied mandatory prerequisites
    if (node.prerequisites && node.prerequisites.length > 0) {
      const hasUnfinishedPrereq = node.prerequisites.some((prereqId) => {
        const prereqNode = roadmapNodes.find((n) => n.id === prereqId);
        if (!prereqNode) return false;
        if (prereqNode.moduleId) {
          return !isModuleCompleted(prereqNode.moduleId, progress);
        }
        return false;
      });
      if (hasUnfinishedPrereq && (node.category === 'capstone' || node.nodeType === 'project')) {
        return 'locked';
      }
    }

    // 3. In progress or available
    if (node.moduleId && progress.currentLessonId === node.moduleId) {
      return 'in-progress';
    }

    return 'available';
  };

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return roadmapNodes.filter((node) => {
      // Type filter
      if (nodeTypeFilter !== 'all') {
        const effectiveType = node.nodeType || (node.category === 'capstone' ? 'capstone' : 'module');
        if (effectiveType !== nodeTypeFilter) return false;
      }
      // Search filter
      if (graphSearch.trim()) {
        const query = graphSearch.trim().toLowerCase();
        const matchesLabel = node.label.toLowerCase().includes(query);
        const matchesTeaches = node.teaches.toLowerCase().includes(query);
        const matchesCode = node.moduleId?.toLowerCase().includes(query) || false;
        return matchesLabel || matchesTeaches || matchesCode;
      }
      return true;
    });
  }, [roadmapNodes, nodeTypeFilter, graphSearch]);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Page Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="success">9-Phase Authoritative Syllabus</Badge>
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
            36 Modules &bull; 9 Capstone Deliverables &bull; 15 Practice Drills &bull; ~{totalCurriculumHours} Hours
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          BTP Learning Roadmap
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
          The verified end-to-end curriculum dependency graph from zero prerequisite foundations to full-stack SAP CAP, Fiori Elements, Security, Cloud Foundry Deployment, and Generative AI Hub integration.
        </p>

        {/* 9-Phase Quick Navigation Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 mt-4">
          {phases.map((p) => {
            const isPhaseDone = p.modules.every((m) => isModuleCompleted(m.id, progress));
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab('phases')}
                className={`text-left p-2 rounded-lg border transition-all text-xs space-y-0.5 ${
                  isPhaseDone
                    ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/30'
                    : 'border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                    Phase {p.number}
                  </span>
                  {isPhaseDone && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />}
                </div>
                <span className="font-semibold text-stone-900 dark:text-white line-clamp-1 block text-[11px]">
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mt-6 border-b border-stone-200/80 dark:border-stone-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('graph')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'graph'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            Visual Dependency Graph
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('phases')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'phases'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            9-Phase Sequence
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pace')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'pace'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            Pace &amp; Timeline Calculator
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('capstones')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'capstones'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            9 Capstone Deliverables
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deferred')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'deferred'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            Deferred Topics (6)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('milestones')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'milestones'
                ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
          >
            Milestone Alignment (Legacy)
          </button>
        </div>
      </div>

      {/* 2. Visual Dependency Graph View */}
      {activeTab === 'graph' && (
        <div className="space-y-4">
          {/* Controls Bar: Type Filters, Search & Zoom */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-xs">
            {/* Left: Node Type Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-stone-700 dark:text-stone-300 mr-1">Node Type:</span>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('all')}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] transition-colors ${
                  nodeTypeFilter === 'all'
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-bold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                All ({roadmapNodes.length})
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('module')}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] transition-colors ${
                  nodeTypeFilter === 'module'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Modules (36)
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('capstone')}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] transition-colors ${
                  nodeTypeFilter === 'capstone'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Capstones (9)
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('practice')}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] transition-colors ${
                  nodeTypeFilter === 'practice'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Practice Drills (7)
              </button>
              <button
                type="button"
                onClick={() => setNodeTypeFilter('project')}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] transition-colors ${
                  nodeTypeFilter === 'project'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Guided Projects (3)
              </button>
            </div>

            {/* Right: Search & Zoom Controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter nodes..."
                  value={graphSearch}
                  onChange={(e) => setGraphSearch(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-36 sm:w-48"
                />
              </div>

              <div className="flex items-center gap-1 border border-stone-200 dark:border-stone-700 rounded-lg p-0.5 bg-white dark:bg-stone-800">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, Math.round((z - 0.1) * 10) / 10))}
                  title="Zoom Out"
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] px-1 text-stone-500">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(1.4, Math.round((z + 0.1) * 10) / 10))}
                  title="Zoom In"
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  title="Reset View"
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 border-l border-stone-200 dark:border-stone-700 ml-0.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Graph Container */}
          <div className="relative overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151619] p-6 min-h-[560px]">
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              className="min-w-[1080px] grid grid-cols-9 gap-4 transition-transform duration-150"
            >
              {phases.map((phase) => {
                const phaseNodes = filteredNodes.filter((n) => n.phaseId === phase.id);

                return (
                  <div key={phase.id} className="space-y-3">
                    {/* Phase Column Header */}
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-center">
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                        Phase {phase.number}
                      </span>
                      <div className="text-xs font-bold text-stone-900 dark:text-white truncate" title={phase.title}>
                        Phase {phase.number}: {phase.title}
                      </div>
                      <div className="text-[10px] font-mono text-stone-400">
                        {phase.suggestedWeeks} &bull; ~{phase.estimatedHours}h
                      </div>
                    </div>

                    {/* Nodes in this phase */}
                    <div className="space-y-2">
                      {phaseNodes.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        const status = getNodeStatus(node);
                        const effectiveType = node.nodeType || (node.category === 'capstone' ? 'capstone' : 'module');

                        // Node card visual styling by type
                        let cardBorder = 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60';
                        if (effectiveType === 'capstone') {
                          cardBorder = 'border-amber-300 bg-amber-50/50 dark:border-amber-800/80 dark:bg-amber-950/20';
                        } else if (effectiveType === 'practice') {
                          cardBorder = 'border-purple-300 bg-purple-50/50 dark:border-purple-800/80 dark:bg-purple-950/20';
                        } else if (effectiveType === 'project') {
                          cardBorder = 'border-blue-300 bg-blue-50/50 dark:border-blue-800/80 dark:bg-blue-950/20';
                        } else if (status === 'completed') {
                          cardBorder = 'border-emerald-300 bg-emerald-50/30 dark:border-emerald-800/80 dark:bg-emerald-950/20';
                        }

                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setSelectedNode(node)}
                            className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs space-y-1 relative group ${
                              isSelected
                                ? 'ring-2 ring-emerald-500 shadow-md bg-white dark:bg-stone-800 border-emerald-500'
                                : `${cardBorder} hover:shadow-xs`
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                                {effectiveType}
                              </span>
                              {status === 'completed' && (
                                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Completed</span>
                                </span>
                              )}
                              {status === 'locked' && (
                                <span className="flex items-center gap-1 text-[10px] text-stone-400">
                                  <Lock className="w-3 h-3" />
                                  <span>Locked</span>
                                </span>
                              )}
                            </div>
                            <div className="font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 leading-tight">
                              {node.label}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono truncate">
                              {node.prerequisites.length > 0 ? `${node.prerequisites.length} prereqs` : 'Foundation'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Nine-Phase Detailed Sequence View */}
      {activeTab === 'phases' && (
        <div className="space-y-6">
          {phases.map((phase) => {
            const completedCount = phase.modules.filter((m) => isModuleCompleted(m.id, progress)).length;
            const percent = Math.round((completedCount / phase.modules.length) * 100);

            return (
              <Card key={phase.id} className="border-stone-200 dark:border-stone-800">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Phase {phase.number} &bull; {phase.suggestedWeeks}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">&bull;</span>
                      <span className="text-xs text-stone-500 font-mono">
                        ~{phase.estimatedHours} Hours
                      </span>
                    </div>
                    <Badge variant={percent === 100 ? 'success' : percent > 0 ? 'info' : 'default'}>
                      {completedCount}/{phase.modules.length} Completed ({percent}%)
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mt-1">{phase.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{phase.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-xs">
                    <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Core Phase Objective:
                    </span>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      {phase.coreObjective}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {phase.modules.map((m) => {
                      const isDone = isModuleCompleted(m.id, progress);
                      return (
                        <Link
                          key={m.id}
                          to={`/learn/${m.id}`}
                          className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 hover:border-emerald-300 transition-colors flex items-center justify-between"
                        >
                          <div className="truncate">
                            <span className="text-[10px] font-mono text-stone-400 block">
                              Module {m.code}
                            </span>
                            <span className="text-xs font-semibold text-stone-900 dark:text-white truncate block">
                              {m.title}
                            </span>
                          </div>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-2" />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>Capstone: {phase.capstone.title}</span>
                    </div>
                    <Link
                      to={`/learn/${phase.modules[0]?.id || 'mod-0-1'}`}
                      className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 font-mono text-[11px]"
                    >
                      Start Phase &rarr;
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 4. Pace & Timeline Calculator View */}
      {activeTab === 'pace' && (
        <Card className="border-stone-200 dark:border-stone-800 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Personal Pace &amp; Schedule Calculator
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
              Customize your weekly study commitment to project your estimated graduation date across the complete 227-hour curriculum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Weekly Study Commitment:
              </span>
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {weeklyHours} Hours / Week
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={weeklyHours}
              onChange={(e) => handleWeeklyHoursChange(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
                <span className="text-[10px] text-stone-400 font-mono uppercase block">Total Hours</span>
                <span className="text-lg font-bold font-mono text-stone-900 dark:text-white">
                  ~{totalCurriculumHours}h
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
                <span className="text-[10px] text-stone-400 font-mono uppercase block">Estimated Duration</span>
                <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {estimatedWeeks} Weeks
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
                <span className="text-[10px] text-stone-400 font-mono uppercase block">Projected Graduation</span>
                <span className="text-lg font-bold font-mono text-purple-600 dark:text-purple-400">
                  {formattedCompletionDate}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 5. 9 Capstone Deliverables View */}
      {activeTab === 'capstones' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 text-xs text-stone-700 dark:text-stone-300">
            <div className="font-bold text-amber-900 dark:text-amber-200 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Syllabus Capstone Requirements</span>
            </div>
            Each phase culminates in a portfolio-grade capstone project. Capstones prove practical mastery of enterprise requirements.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capstones.map((cap) => (
              <Card key={cap.id} className="border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <span className="text-[10px] font-mono uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded w-fit">
                      Phase {cap.phaseId.replace('phase-', '')} Capstone
                    </span>
                    <CardTitle className="text-base mt-1">{cap.title}</CardTitle>
                    <CardDescription className="text-xs">{cap.objective}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div>
                      <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                        Key Deliverables:
                      </span>
                      <ul className="space-y-1 text-stone-500 dark:text-stone-400">
                        {cap.deliverables.slice(0, 3).map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">
                    {cap.deliverables.length} Deliverables
                  </span>
                  <Link to={`/learn/mod-${cap.phaseId.replace('phase-', '')}-1`}>
                    <Button variant="ghost" size="sm">
                      Open Phase &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 6. Deferred Topics View */}
      {activeTab === 'deferred' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/60 text-xs text-stone-700 dark:text-stone-300">
            <div className="font-bold text-purple-900 dark:text-purple-200 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>Syllabus Design Principle: Cognitive Load Protection</span>
            </div>
            These 6 advanced topics are explicitly deferred until after your core capstones to avoid cognitive overload. They should be explored post-graduation.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deferredTopics.map((d) => (
              <Card key={d.id} className="border-stone-200 dark:border-stone-800 space-y-2">
                <CardHeader>
                  <span className="text-[10px] font-mono uppercase bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded w-fit">
                    Post-Capstone Exploration
                  </span>
                  <CardTitle className="text-base mt-1">{d.title}</CardTitle>
                  <CardDescription className="text-xs">{d.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Covered subtopics:
                    </span>
                    <ul className="space-y-0.5 text-stone-500 dark:text-stone-400">
                      {d.subtopics.map((s, i) => (
                        <li key={i}>&bull; {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2 rounded bg-stone-100 dark:bg-stone-850 text-[11px] text-stone-600 dark:text-stone-400">
                    <strong>Revisit when:</strong> {d.revisitWhen}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 7. Milestone Alignment View (Legacy Competency Mapping) */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-xl bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
            This view maps earlier 5-competency milestones to the comprehensive 9-phase syllabus for backward-compatibility with existing progress tracking.
          </div>

          {CURRICULUM_MODULES.map((module) => {
            const moduleCompleted = module.chapters.filter((ch) =>
              isModuleCompleted(ch.id, progress)
            ).length;
            const percent =
              module.chapters.length > 0
                ? Math.round((moduleCompleted / module.chapters.length) * 100)
                : 0;

            const isDone = percent === 100;
            const isStarted = percent > 0 && !isDone;

            return (
              <Card key={module.id} className="border-stone-200 dark:border-stone-800">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                        Milestone {module.number}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">&bull;</span>
                      <Badge
                        variant={
                          module.level === 'Beginner'
                            ? 'success'
                            : module.level === 'Intermediate'
                            ? 'info'
                            : 'purple'
                        }
                      >
                        {module.level}
                      </Badge>
                    </div>

                    <Badge variant={isDone ? 'success' : isStarted ? 'info' : 'default'}>
                      {isDone ? 'Completed' : isStarted ? 'In Progress' : 'Not Started'}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mt-1">{module.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {module.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {module.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {module.chapters.map((ch) => {
                      const isChDone = isModuleCompleted(ch.id, progress);

                      return (
                        <Link
                          key={ch.id}
                          to={`/learn/${ch.id}`}
                          className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 hover:border-emerald-300 transition-colors flex items-center justify-between"
                        >
                          <div className="truncate">
                            <span className="text-[10px] font-mono text-stone-400 block">
                              Chapter {ch.number}
                            </span>
                            <span className="text-xs font-semibold text-stone-900 dark:text-white truncate block">
                              {ch.title}
                            </span>
                          </div>
                          {isChDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-2" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 8. Node Detail Drawer / Modal */}
      {selectedNode && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setSelectedNode(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold uppercase">
                    {selectedNode.nodeType || 'Node'} &bull; {selectedNode.phaseId.replace('phase-', 'Phase ')}
                  </span>
                  <Badge variant={getNodeStatus(selectedNode) === 'completed' ? 'success' : getNodeStatus(selectedNode) === 'locked' ? 'default' : 'info'}>
                    {getNodeStatus(selectedNode).replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-2">
                  {selectedNode.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  What this teaches:
                </span>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {selectedNode.teaches}
                </p>
              </div>

              {/* Explicit Dependency Relationships */}
              {selectedNode.dependencyEdges && selectedNode.dependencyEdges.length > 0 && (
                <div>
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Dependency Relationships:
                  </span>
                  <div className="space-y-1">
                    {selectedNode.dependencyEdges.map((edge, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-1.5 rounded bg-stone-50 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700"
                      >
                        <span className="font-mono text-[10px] text-stone-500">
                          {edge.label || edge.relationship}
                        </span>
                        <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-300 text-[10px]">
                          {edge.targetId}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  Prerequisites:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.prerequisites.length > 0 ? (
                    selectedNode.prerequisites.map((p: string) => (
                      <span key={p} className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-stone-400 italic">None (Foundation)</span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  Practical Output:
                </span>
                <p className="text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded border border-emerald-200 dark:border-emerald-850">
                  {selectedNode.practicalOutput}
                </p>
              </div>

              <div>
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  Mastery Requirement:
                </span>
                <p className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded border border-amber-200 dark:border-amber-850">
                  {selectedNode.masteryRequirement}
                </p>
              </div>
            </div>

            {/* Action Buttons Navigating to Real Destinations */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
              <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)}>
                Close
              </Button>

              {/* Module Action */}
              {selectedNode.moduleId && (
                <Link to={`/learn/${selectedNode.moduleId}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Start Lesson
                  </Button>
                </Link>
              )}

              {/* Practice Action */}
              {selectedNode.associatedPracticeId && (
                <Link to={`/practice?tab=drills&id=${selectedNode.associatedPracticeId}`}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Launch Practice Drill
                  </Button>
                </Link>
              )}

              {/* Project Action */}
              {selectedNode.associatedProjectId && (
                <Link to={`/practice?tab=projects&id=${selectedNode.associatedProjectId}`}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Open Guided Project
                  </Button>
                </Link>
              )}

              {/* Capstone Action */}
              {selectedNode.nodeType === 'capstone' && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedNode(null);
                    setActiveTab('capstones');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                >
                  View Capstone Details
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
