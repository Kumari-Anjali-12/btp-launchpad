import React, { useState } from 'react';
import { CAPSTONE_LEVELS } from '../../data/capstoneData';
import { loadCapstoneProgress, toggleCheckpoint } from '../../store/capstoneStore';
import { CapstoneHeader } from '../../components/capstone/CapstoneHeader';
import { CapstoneCodeInspector } from '../../components/capstone/CapstoneCodeInspector';
import { CapstoneSimulationBanner } from '../../components/capstone/CapstoneSimulationBanner';
import { CapstoneQuizSection } from '../../components/capstone/CapstoneQuizSection';
import { CheckCircle2, Circle, Sparkles, Layers } from 'lucide-react';

export const CapstoneLevel3Page: React.FC = () => {
  const level = CAPSTONE_LEVELS[2]!;
  const [progress, setProgress] = useState(loadCapstoneProgress());
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

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
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {level.phase}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
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
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'preview'
                    ? 'bg-white text-indigo-700 shadow-sm dark:bg-stone-700 dark:text-white'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Fiori UI Preview</span>
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
                <span>MTA & App Router Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <CapstoneSimulationBanner sourceFilePath="projects/employee-leave-management/app/leave-requests/annotations.cds" />

            <div className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
              <div className="border-b border-stone-100 pb-3 dark:border-stone-800">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  SAP Fiori Elements List Report (Simulated Preview)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  This table is generated directly from CDS annotations: LineItem, SelectionFields, and Criticality codes.
                </p>
              </div>

              {/* Mock Fiori Toolbar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-stone-100/70 p-3 dark:bg-stone-800/50">
                <div className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Leave Requests (3)
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-white px-2.5 py-1 text-xs font-semibold text-stone-600 shadow-sm dark:bg-stone-700 dark:text-stone-200">
                    Filter by Status: All
                  </span>
                  <span className="rounded bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    + Create Request
                  </span>
                </div>
              </div>

              {/* Mock Fiori Table */}
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-stone-200 bg-stone-50 text-stone-500 dark:border-stone-800 dark:bg-stone-800/40">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Request Number</th>
                      <th className="py-2.5 px-3 font-semibold">Leave Type</th>
                      <th className="py-2.5 px-3 font-semibold">Start Date</th>
                      <th className="py-2.5 px-3 font-semibold">End Date</th>
                      <th className="py-2.5 px-3 font-semibold">Total Days</th>
                      <th className="py-2.5 px-3 font-semibold">Status (Criticality)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 font-medium">
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="py-3 px-3 font-bold text-stone-900 dark:text-stone-100">1001</td>
                      <td className="py-3 px-3">Annual Leave</td>
                      <td className="py-3 px-3">2026-03-10</td>
                      <td className="py-3 px-3">2026-03-14</td>
                      <td className="py-3 px-3">5.0</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                          Approved (Criticality: 3)
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="py-3 px-3 font-bold text-stone-900 dark:text-stone-100">1002</td>
                      <td className="py-3 px-3">Annual Leave</td>
                      <td className="py-3 px-3">2026-06-15</td>
                      <td className="py-3 px-3">2026-06-19</td>
                      <td className="py-3 px-3">5.0</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                          Pending (Criticality: 2)
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="py-3 px-3 font-bold text-stone-900 dark:text-stone-100">1003</td>
                      <td className="py-3 px-3">Sick Leave</td>
                      <td className="py-3 px-3">2026-04-01</td>
                      <td className="py-3 px-3">2026-04-02</td>
                      <td className="py-3 px-3">2.0</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                          Approved (Criticality: 3)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && <CapstoneCodeInspector initialFileId="fiori-annotations" />}

        {/* Checkpoints Checklist */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Milestone 3 Verification Checkpoints
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Verify your mastery of metadata-driven Fiori Elements, App Router routing, and MTA assembly.
              </p>
            </div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
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
                    <div className="mt-2 text-[11px] font-medium text-blue-600 dark:text-blue-400">
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
