import React, { useState, useEffect, useMemo } from 'react';
import {
  FileCode,
  Terminal,
  Shield,
  Bug,
  BookOpen,
  Boxes,
  Award,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SimulationBadge } from '../components/common/SimulationBadge';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

import { CdsPracticeLab } from '../components/practice/CdsPracticeLab';
import { ODataExplorer } from '../components/practice/ODataExplorer';
import { DrillWorkspace } from '../components/practice/DrillWorkspace';
import { GuidedProjectWorkspace } from '../components/practice/GuidedProjectWorkspace';
import { IndependentChallengeWorkspace } from '../components/practice/IndependentChallengeWorkspace';

import { PRACTICE_DRILLS } from '../data/practice/drills';
import { GUIDED_PROJECTS } from '../data/practice/guidedProjects';
import { INDEPENDENT_CHALLENGES } from '../data/practice/challenges';
import { DrillCategory, PracticeDrill, GuidedProject, IndependentChallenge } from '../types/practice';
import { loadUserProgress } from '../lib/storage';
import { UserProgressState } from '../types/storage';

type PracticeTab = 'drills' | 'cds-lab' | 'odata-explorer' | 'projects' | 'challenges';

export const PracticePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PracticeTab>('drills');
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());

  // Drill Filtering state
  const [selectedCategory, setSelectedCategory] = useState<DrillCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active items for detailed workspace views
  const [activeDrill, setActiveDrill] = useState<PracticeDrill | null>(null);
  const [activeProject, setActiveProject] = useState<GuidedProject | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<IndependentChallenge | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  const completedDrillIds = progress.practice?.completedDrillIds || [];
  const projectProgress = progress.practice?.projectProgress || {};
  const completedChallengeIds = progress.practice?.completedChallengeIds || [];

  // Filtered drills
  const filteredDrills = useMemo(() => {
    return PRACTICE_DRILLS.filter((d) => {
      const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
      const matchesSearch =
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.concepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const completedDrillsCount = completedDrillIds.length;
  const totalDrillsCount = PRACTICE_DRILLS.length;

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Hands-On Practice Sandboxes
            </h1>
            <SimulationBadge showExplanation />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Learn SAP BTP by writing real Core Data Services (CDS) models, executing live OData v4 queries, solving security challenges, and completing guided enterprise projects.
          </p>
        </div>

        {/* Global Practice Metric Badge */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center gap-2 text-xs">
            <Award className="w-4 h-4 text-amber-500" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white font-mono">
                {completedDrillsCount} / {totalDrillsCount}
              </span>
              <span className="text-slate-500 text-[11px] block">Drills Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Workspace View Overrides (when an item is currently opened) */}
      {activeDrill ? (
        <DrillWorkspace
          drill={activeDrill}
          isInitiallyCompleted={completedDrillIds.includes(activeDrill.id)}
          onBack={() => setActiveDrill(null)}
          onDrillCompleted={() => setProgress(loadUserProgress())}
        />
      ) : activeProject ? (
        <GuidedProjectWorkspace
          project={activeProject}
          savedProgress={projectProgress[activeProject.id]}
          onBack={() => setActiveProject(null)}
          onProjectUpdated={() => setProgress(loadUserProgress())}
        />
      ) : activeChallenge ? (
        <IndependentChallengeWorkspace
          challenge={activeChallenge}
          savedScore={progress.practice?.challengeScores[activeChallenge.id]?.score}
          onBack={() => setActiveChallenge(null)}
          onChallengeSubmitted={() => setProgress(loadUserProgress())}
        />
      ) : (
        /* Normal Practice Catalog & Tabs */
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('drills')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'drills'
                  ? 'bg-sap-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Foundation Drills ({PRACTICE_DRILLS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cds-lab')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'cds-lab'
                  ? 'bg-sap-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Core Data Services (CDS) Sandbox</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('odata-explorer')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'odata-explorer'
                  ? 'bg-sap-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>OData v4 Query Explorer</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-sap-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Guided Mini-Projects ({GUIDED_PROJECTS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('challenges')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'challenges'
                  ? 'bg-sap-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Challenges ({INDEPENDENT_CHALLENGES.length})</span>
            </button>
          </div>

          {/* TAB 1: FOUNDATION DRILLS */}
          {activeTab === 'drills' && (
            <div className="space-y-6">
              {/* Category Pills & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      { id: 'all', label: 'All Drills' },
                      { id: 'cds', label: 'CDS Modeler' },
                      { id: 'odata', label: 'OData Queries' },
                      { id: 'security', label: 'Security & XSUAA' },
                      { id: 'debugging', label: 'Debugging Lab' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-sap-blue-50 dark:bg-sap-blue-950/60 text-sap-blue-700 dark:text-sap-blue-400 border border-sap-blue-200 dark:border-sap-blue-800'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drills, concepts..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sap-blue-500"
                  />
                </div>
              </div>

              {/* Drills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDrills.map((drill) => {
                  const isDone = completedDrillIds.includes(drill.id);
                  return (
                    <div
                      key={drill.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-sap-blue-600 dark:text-sap-blue-400">
                            {drill.category === 'cds' && <FileCode className="w-3.5 h-3.5" />}
                            {drill.category === 'odata' && <Terminal className="w-3.5 h-3.5" />}
                            {drill.category === 'security' && <Shield className="w-3.5 h-3.5" />}
                            {drill.category === 'debugging' && <Bug className="w-3.5 h-3.5" />}
                            <span>{drill.category.toUpperCase()}</span>
                          </span>

                          <div className="flex items-center gap-1.5">
                            {isDone && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Mastered
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                drill.difficulty === 'beginner'
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                                  : drill.difficulty === 'intermediate'
                                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                                  : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                              }`}
                            >
                              {drill.difficulty}
                            </span>
                          </div>
                        </div>

                        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                          {drill.title}
                        </h2>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {drill.summary}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {drill.concepts.slice(0, 3).map((concept, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              {concept}
                            </span>
                          ))}
                          {drill.concepts.length > 3 && (
                            <span className="text-[10px] text-slate-400 self-center">
                              +{drill.concepts.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <span className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                          <Clock className="w-3 h-3" />
                          <span>~{drill.estimatedMinutes}m</span>
                        </span>

                        <Button
                          variant={isDone ? 'outline' : 'primary'}
                          size="sm"
                          onClick={() => setActiveDrill(drill)}
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          {isDone ? 'Practice Again' : 'Start Drill'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CDS MODELER LAB */}
          {activeTab === 'cds-lab' && <CdsPracticeLab />}

          {/* TAB 3: ODATA V4 EXPLORER */}
          {activeTab === 'odata-explorer' && <ODataExplorer />}

          {/* TAB 4: GUIDED MINI-PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GUIDED_PROJECTS.map((proj) => {
                  const pData = projectProgress[proj.id];
                  const currentM = pData?.currentMilestone || 1;
                  const isDone = Boolean(pData?.isCompleted);
                  const totalMilestones = proj.milestones.length;

                  return (
                    <Card key={proj.id} className="flex flex-col justify-between">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
                            Guided Project
                          </span>
                          <Badge variant={isDone ? 'success' : currentM > 1 ? 'info' : 'default'}>
                            {isDone ? 'Certified' : currentM > 1 ? `Step ${currentM}/${totalMilestones}` : 'Not Started'}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">{proj.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{proj.subtitle}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                          {proj.description}
                        </p>

                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-white">Stack Snapshot:</div>
                          <div className="text-slate-600 dark:text-slate-400 truncate">
                            &bull; {proj.architectureSummary.backend}
                          </div>
                          <div className="text-slate-600 dark:text-slate-400 truncate">
                            &bull; {proj.architectureSummary.database}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-mono text-slate-500">~{proj.estimatedHours} hrs</span>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActiveProject(proj)}
                            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          >
                            {isDone ? 'Review Project' : currentM > 1 ? 'Resume Project' : 'Launch Project'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: INDEPENDENT CHALLENGES */}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INDEPENDENT_CHALLENGES.map((ch) => {
                  const isDone = completedChallengeIds.includes(ch.id);
                  const savedScore = progress.practice?.challengeScores[ch.id]?.score;

                  return (
                    <Card key={ch.id} className="flex flex-col justify-between">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                            Level 3 Challenge
                          </span>
                          {isDone ? (
                            <Badge variant="success">Cleared ({savedScore}%)</Badge>
                          ) : (
                            <Badge variant="warning">Unguided</Badge>
                          )}
                        </div>
                        <CardTitle className="text-base">{ch.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{ch.scenario}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Key Requirements:
                          </span>
                          <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
                            {ch.requirements.slice(0, 2).map((r, i) => (
                              <li key={i} className="truncate">
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-semibold uppercase text-purple-600 dark:text-purple-400">
                            {ch.difficulty}
                          </span>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActiveChallenge(ch)}
                            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          >
                            {isDone ? 'Retry Challenge' : 'Take Challenge'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
