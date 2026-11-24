import React, { useState } from 'react';
import { CAPSTONE_LEVELS } from '../../data/capstoneData';
import { loadCapstoneProgress, toggleCheckpoint } from '../../store/capstoneStore';
import { CapstoneHeader } from '../../components/capstone/CapstoneHeader';
import { CapstoneCodeInspector } from '../../components/capstone/CapstoneCodeInspector';
import { SimulatedCdsEditor } from '../../components/capstone/SimulatedCdsEditor';
import { CapstoneQuizSection } from '../../components/capstone/CapstoneQuizSection';
import { CheckCircle2, Circle, Sparkles, Layers } from 'lucide-react';

export const CapstoneLevel1Page: React.FC = () => {
  const level = CAPSTONE_LEVELS[0]!;
  const [progress, setProgress] = useState(loadCapstoneProgress());
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'guide'>('simulator');

  const handleToggle = (id: string) => {
    const updated = toggleCheckpoint(id);
    setProgress({ ...updated });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] pb-16 dark:bg-[#141517]">
      <CapstoneHeader />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 space-y-6">
        {/* Level Header Title Card */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {level.phase}
                </span>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {level.difficulty}
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl">
                {level.title}
              </h1>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{level.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
              <button
                onClick={() => setActiveTab('simulator')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-white text-indigo-700 shadow-sm dark:bg-stone-700 dark:text-white'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Interactive Simulator</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'code'
                    ? 'bg-white text-indigo-700 shadow-sm dark:bg-stone-700 dark:text-white'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Real Code Inspector</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'simulator' && <SimulatedCdsEditor />}
        {activeTab === 'code' && <CapstoneCodeInspector initialFileId="db-schema" />}

        {/* Checkpoint Checklist */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Milestone 1 Verification Checkpoints
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Review and check off each architectural checkpoint as you inspect the code.
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {level.checkpoints.filter((cp) => progress.completedCheckpoints[cp.id]).length}/
              {level.checkpoints.length} Completed
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {level.checkpoints.map((cp) => {
              const isChecked = Boolean(progress.completedCheckpoints[cp.id]);
              return (
                <div
                  key={cp.id}
                  onClick={() => handleToggle(cp.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                    isChecked
                      ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-800/60 dark:bg-emerald-950/20'
                      : 'border-stone-200 bg-stone-50/50 hover:border-indigo-300 dark:border-stone-800 dark:bg-stone-800/30'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-stone-400">
                    {isChecked ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{cp.title}</h4>
                    <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {cp.description}
                    </p>
                    <div className="mt-2 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                      💡 Tip: {cp.hint}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5-Question Mastery Assessment */}
        <CapstoneQuizSection
          levelId={level.id}
          badgeId={level.badge.id}
          questions={level.quiz}
          onPassed={() => setProgress(loadCapstoneProgress())}
        />
      </div>
    </div>
  );
};
