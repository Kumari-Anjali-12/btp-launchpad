import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Award,
  BookOpen,
  X,
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
} from '../data/curriculum';
import { RoadmapDependencyNode } from '../types/curriculum';
import { loadUserProgress, setTargetWeeklyHours } from '../lib/storage';
import { UserProgressState } from '../types/storage';

export const RoadmapPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const [activeTab, setActiveTab] = useState<'graph' | 'phases' | 'pace' | 'capstones' | 'deferred' | 'milestones'>('graph');
  const [selectedNode, setSelectedNode] = useState<RoadmapDependencyNode | null>(null);
  const [weeklyHours, setWeeklyHoursState] = useState<number>(progress.targetWeeklyHours || 12);

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

  const completedIds = progress.completedChapterIds;

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

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Page Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="success">9-Phase Authoritative Syllabus</Badge>
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
            36 Modules &bull; 9 Capstone Deliverables &bull; ~{totalCurriculumHours} Hours
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          BTP Learning Roadmap
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
          The verified end-to-end curriculum dependency graph from zero prerequisite foundations to full-stack SAP CAP, Fiori Elements, Security, Cloud Foundry Deployment, and Generative AI Hub integration.
        </p>

        {/* Milestone Completion Status Badges for backward compatibility & overview */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {CURRICULUM_MODULES.map((mod) => {
            const isDone = mod.chapters.every((ch) => completedIds.includes(ch.id));
            if (!isDone) return null;
            return (
              <span
                key={mod.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{mod.title}:</span>
                <Badge variant="success" size="sm">
                  Completed
                </Badge>
              </span>
            );
          })}
        </div>

        {/* Core Curriculum Milestones Overview Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-4">
          {CURRICULUM_MODULES.map((m) => (
            <div
              key={m.id}
              className="p-2.5 rounded-lg border border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-xs space-y-0.5"
            >
              <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                Module {m.number}
              </span>
              <span className="font-semibold text-stone-900 dark:text-white line-clamp-1 block">
                {m.title}
              </span>
            </div>
          ))}
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
            5 Core Milestones
          </button>
        </div>
      </div>

      {/* 2. Visual Dependency Graph View */}
      {activeTab === 'graph' && (
        <div className="space-y-4">
          {/* Graph Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-stone-100/70 dark:bg-stone-900/40 text-xs border border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-700 dark:text-stone-300">Category Legend:</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Pre-learning (P0)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Core (P1-P6)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                AI Layer (P7)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Capstone (P8)
              </span>
            </div>
            <span className="text-[11px] text-stone-400 font-mono">
              Click any node to inspect prerequisites &amp; deliverables
            </span>
          </div>

          {/* Interactive Graph Container */}
          <div className="relative overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151619] p-6 min-h-[500px]">
            <div className="min-w-[900px] grid grid-cols-9 gap-4">
              {phases.map((phase) => (
                <div key={phase.id} className="space-y-3">
                  {/* Phase Column Header */}
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                      P{phase.number}
                    </span>
                    <div className="text-xs font-bold text-stone-900 dark:text-white truncate" title={phase.title}>
                      Phase {phase.number}: {phase.title}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400">
                      ~{phase.estimatedHours}h
                    </div>
                  </div>

                  {/* Nodes in this phase */}
                  <div className="space-y-2">
                    {phase.modules.map((m) => {
                      const nodeData = roadmapNodes.find((n) => n.moduleId === m.id || n.id === m.id);
                      const isSelected = selectedNode?.moduleId === m.id;
                      const isDone = completedIds.includes(m.id);

                      const badgeBg =
                        phase.badgeCategory === 'pre-learning'
                          ? 'border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/20'
                          : phase.badgeCategory === 'ai-layer'
                          ? 'border-purple-200 bg-purple-50/60 dark:border-purple-900 dark:bg-purple-950/20'
                          : phase.badgeCategory === 'capstone'
                          ? 'border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20'
                          : 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20';

                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedNode(nodeData || null)}
                          className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs space-y-1 relative group ${
                            isSelected
                              ? 'ring-2 ring-emerald-500 shadow-md bg-white dark:bg-stone-800 border-emerald-500'
                              : `${badgeBg} hover:shadow-xs`
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-stone-500 dark:text-stone-400">
                              {m.code}
                            </span>
                            {isDone && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            )}
                          </div>
                          <div className="font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 leading-tight">
                            {m.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Nine-Phase Detailed Sequence View */}
      {activeTab === 'phases' && (
        <div className="space-y-6">
          {phases.map((phase) => {
            const completedCount = phase.modules.filter((m) => completedIds.includes(m.id)).length;
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
                      {percent === 100 ? 'Completed' : percent > 0 ? `${percent}% In Progress` : 'Not Started'}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mt-1">{phase.title}</CardTitle>
                  <CardDescription className="text-xs mt-1 leading-relaxed">
                    {phase.coreObjective}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {phase.modules.map((m) => (
                      <Link
                        key={m.id}
                        to={`/learn/${m.id}`}
                        className="p-3 rounded-lg border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors flex flex-col justify-between space-y-2 group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-stone-400">
                              {m.code}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {m.estimatedMinutes}m
                            </span>
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                            {m.title}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                            {m.tagline}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                          <span>Open Lesson</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Phase Capstone Deliverable Callout */}
                  <div className="p-3.5 rounded-lg border border-amber-200/80 bg-amber-50/40 dark:border-amber-900/60 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Phase {phase.number} Capstone Deliverable</span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400">
                        {phase.capstone.title}: {phase.capstone.objective}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveTab('capstones')}
                      rightIcon={<ArrowRight className="w-3 h-3" />}
                    >
                      View Capstone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 4. Pace & Timeline Calculator View */}
      {activeTab === 'pace' && (
        <Card className="border-stone-200 dark:border-stone-800">
          <CardHeader>
            <CardTitle className="text-xl">Personal Pace &amp; Schedule Calculator</CardTitle>
            <CardDescription className="text-xs">
              Based on the authoritative syllabus estimate of ~{totalCurriculumHours} total hours across all 9 phases, calculate your projected completion timeline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-2">
                Target Study Hours Per Week
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {[5, 10, 12, 15, 20].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleWeeklyHoursChange(h)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      weeklyHours === h
                        ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm'
                        : 'border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {h} hrs/week
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[11px] font-mono text-stone-500 uppercase">Estimated Duration</span>
                <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
                  ~{estimatedWeeks} weeks
                </div>
                <span className="text-[11px] text-stone-400">
                  {Math.round(estimatedWeeks / 4.3)} months of steady commitment
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[11px] font-mono text-stone-500 uppercase">Projected Graduation</span>
                <div className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {formattedCompletionDate}
                </div>
                <span className="text-[11px] text-stone-400">
                  Job-ready BTP cloud portfolio
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[11px] font-mono text-stone-500 uppercase">Curriculum Load</span>
                <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
                  {totalCurriculumHours} hrs
                </div>
                <span className="text-[11px] text-stone-400">
                  36 modules + 9 phase capstones
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5. Nine Phase Capstones View */}
      {activeTab === 'capstones' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 text-xs text-stone-700 dark:text-stone-300">
            <div className="font-bold text-amber-900 dark:text-amber-200 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Phase Capstone Requirement</span>
            </div>
            Each phase terminates in a mandatory, standalone capstone deliverable that verifies your hands-on ability before advancing.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capstones.map((c, idx) => (
              <Card key={c.id} className="border-stone-200 dark:border-stone-800 space-y-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      Phase {idx} Capstone
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      {c.deliverables.length} Deliverables
                    </span>
                  </div>
                  <CardTitle className="text-base mt-1">{c.title}</CardTitle>
                  <CardDescription className="text-xs">{c.objective}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Deliverables:
                    </span>
                    <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                      {c.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                      Acceptance Criteria:
                    </span>
                    <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                      {c.acceptanceCriteria.map((a, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
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

      {/* 7. Core Milestones View (Preserves legacy 5-module view for backward compatibility) */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          {CURRICULUM_MODULES.map((module) => {
            const moduleCompleted = module.chapters.filter((ch) =>
              completedIds.includes(ch.id)
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
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
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
                      const isChDone = completedIds.includes(ch.id);

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
            className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  {selectedNode.phaseId.replace('phase-', 'Phase ')} &bull; {selectedNode.category}
                </span>
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

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
              <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)}>
                Close
              </Button>
              {selectedNode.moduleId && (
                <Link to={`/learn/${selectedNode.moduleId}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Open Lesson
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
