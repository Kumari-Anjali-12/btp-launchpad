import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  FolderGit2,
  Terminal,
  GraduationCap,
  Award,
  ChevronRight,
} from 'lucide-react';
import { CAPSTONE_LEVELS } from '../../data/capstoneData';
import { loadCapstoneProgress } from '../../store/capstoneStore';
import { CapstoneCard } from '../../components/capstone/CapstoneCard';
import { CapstoneSimulationBanner } from '../../components/capstone/CapstoneSimulationBanner';

export const CapstoneOverviewPage: React.FC = () => {
  const [progress, setProgress] = useState(loadCapstoneProgress());

  useEffect(() => {
    const handleUpdate = () => setProgress(loadCapstoneProgress());
    window.addEventListener('btp_capstone_updated', handleUpdate);
    return () => window.removeEventListener('btp_capstone_updated', handleUpdate);
  }, []);

  const totalCheckpoints = CAPSTONE_LEVELS.reduce(
    (sum, lvl) => sum + lvl.checkpoints.length,
    0
  );
  const completedCheckpointsCount = Object.values(
    progress.completedCheckpoints
  ).filter(Boolean).length;
  const passedQuizzesCount = Object.values(progress.passedQuizzes).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#fbf9f4] pb-16 dark:bg-[#141517]">
      {/* Hero Banner */}
      <div className="border-b border-stone-200/80 bg-white py-12 dark:border-stone-800 dark:bg-stone-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-bold text-indigo-800 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Phase 9: Hands-on Enterprise Capstone Project</span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
                Employee Leave Management System
              </h1>
              <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                Put all your knowledge into practice by building a production-grade SAP BTP Cloud Application
                Programming Model (CAP) project. Progress across three structured milestones—from Core Data Services
                domain modeling to transactional business logic, Fiori Elements UX, and Cloud Foundry MTA deployment.
              </p>
            </div>

            {/* Quick Stats Widget */}
            <div className="flex w-full flex-col gap-3 rounded-2xl border border-stone-200/90 bg-stone-50/80 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-800/50 sm:w-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Capstone Progress
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-2xl font-black text-stone-900 dark:text-stone-100">
                    {passedQuizzesCount}/3
                  </div>
                  <div className="text-xs text-stone-500">Milestones Passed</div>
                </div>
                <div className="h-8 w-px bg-stone-200 dark:bg-stone-700" />
                <div>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {completedCheckpointsCount}/{totalCheckpoints}
                  </div>
                  <div className="text-xs text-stone-500">Checkpoints Verified</div>
                </div>
                <div className="h-8 w-px bg-stone-200 dark:bg-stone-700" />
                <div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                    {progress.unlockedBadges.length}
                  </div>
                  <div className="text-xs text-stone-500">Badges Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 space-y-8">
        {/* Transparent Simulation Disclaimer */}
        <CapstoneSimulationBanner />

        {/* Standalone Project Info Banner */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60">
                <FolderGit2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Standalone SAP CAP Project Tree Included
                </h3>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
                  Alongside this educational studio, a genuine enterprise SAP CAP project is available in{' '}
                  <code className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                    projects/employee-leave-management/
                  </code>
                  . It includes complete CDS models, Node.js transactional validation handlers, Fiori Elements UI,
                  Application Router, and multi-target deployment descriptors.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-mono text-stone-800 dark:bg-stone-800 dark:text-stone-200">
                <Terminal className="h-3.5 w-3.5 text-stone-500" />
                <span>npm test (100% Passing Backend Tests)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Cards Grid */}
        <div>
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Three Progressive Capstone Milestones
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Complete each milestone sequentially to master enterprise SAP BTP application delivery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CAPSTONE_LEVELS.map((level) => {
              const checkpointsForLevel = level.checkpoints.filter(
                (cp) => progress.completedCheckpoints[cp.id]
              ).length;
              const isCompleted = Boolean(progress.passedQuizzes[level.id]);
              const score = progress.quizScores[level.id];

              return (
                <CapstoneCard
                  key={level.id}
                  level={level}
                  isCompleted={isCompleted}
                  quizScore={score}
                  completedCheckpointsCount={checkpointsForLevel}
                />
              );
            })}
          </div>
        </div>

        {/* Final Exit Assessment Card */}
        <div className="rounded-2xl border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/40 p-6 shadow-sm dark:border-indigo-900/60 dark:from-stone-900 dark:via-stone-900 dark:to-stone-900">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    Capstone Exit Examination
                  </span>
                  {progress.finalAssessment?.passed && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <Award className="h-3 w-3" /> Certified Passed ({progress.finalAssessment.totalScore}/100 pts)
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-lg font-black text-stone-900 dark:text-stone-100">
                  Comprehensive 100-Point Technical Assessment
                </h3>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Demonstrate complete mastery across CDS modeling, cloud security, transactional integrity,
                  and deployment. Features strict 75-point passing criteria and mandatory Critical Failure Gates
                  for RBAC authorization and ACID transaction atomicity.
                </p>
              </div>
            </div>

            <Link
              to="/capstone/final-assessment"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
            >
              <span>{progress.finalAssessment ? 'Review / Retake Assessment' : 'Take Final Assessment'}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Architectural Overview Diagram Box */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            System Architecture Overview
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Traces the complete enterprise request flow from the SAP Fiori Elements frontend through Application Router,
            XSUAA authentication, Node.js CAP service handlers, and SAP HANA Cloud persistence.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4 text-xs font-medium">
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[10px]">
                Tier 1: Presentation
              </div>
              <div className="mt-2 text-stone-800 dark:text-stone-200 font-semibold">
                SAP Fiori Elements
              </div>
              <p className="mt-1 text-stone-500 text-[11px] leading-relaxed">
                Metadata-driven List Report and Object Page configured via UI annotations in annotations.cds.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[10px]">
                Tier 2: Security & Routing
              </div>
              <div className="mt-2 text-stone-800 dark:text-stone-200 font-semibold">
                App Router & XSUAA
              </div>
              <p className="mt-1 text-stone-500 text-[11px] leading-relaxed">
                Reverse proxy routing, CSRF token validation, and OAuth2 JWT authentication with roles defined in xs-security.json.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <div className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px]">
                Tier 3: Business Logic
              </div>
              <div className="mt-2 text-stone-800 dark:text-stone-200 font-semibold">
                Node.js CAP Runtime
              </div>
              <p className="mt-1 text-stone-500 text-[11px] leading-relaxed">
                OData V4 services (LeaveService, ManagerService, AdminService) with ACID transactional handlers in srv/*.js.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <div className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                Tier 4: Persistence
              </div>
              <div className="mt-2 text-stone-800 dark:text-stone-200 font-semibold">
                SQLite & SAP HANA Cloud
              </div>
              <p className="mt-1 text-stone-500 text-[11px] leading-relaxed">
                In-memory SQLite for local testing; SAP HANA HDI container deployed via @sap/hdi-deploy in production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
