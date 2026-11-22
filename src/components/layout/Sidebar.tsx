import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Code2,
  FileText,
  Boxes,
  Briefcase,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { loadUserProgress, resetUserProgress } from '../../lib/storage';
import { getAllChapters } from '../../data/curriculum';
import { ProgressBar } from '../common/ProgressBar';

export const Sidebar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const totalChapters = getAllChapters().length;

  useEffect(() => {
    const updateStats = () => {
      const p = loadUserProgress();
      setCompletedCount(p.completedChapterIds.length);
    };
    updateStats();
    window.addEventListener('btp_storage_updated', updateStats);
    return () => window.removeEventListener('btp_storage_updated', updateStats);
  }, []);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'Chapters', path: '/chapters', icon: BookOpen },
    { label: 'Practice', path: '/practice', icon: Code2 },
    { label: 'Cheatsheet', path: '/cheatsheet', icon: FileText },
    { label: 'Design Lab', path: '/design-lab', icon: Boxes },
    { label: 'Career Hub', path: '/career-hub', icon: Briefcase },
  ];

  const handleReset = () => {
    resetUserProgress();
    setShowResetConfirm(false);
  };

  const progressPercent = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;

  return (
    <aside
      aria-label="Sidebar Navigation"
      className={`flex flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-sap-slate-900 w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 ${className}`}
    >
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Curriculum & Tools
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sap-blue-50 text-sap-blue-600 dark:bg-sap-blue-950/60 dark:text-sap-blue-400 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Guest Progress Widget & Storage Reset */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Overall Progress
            </span>
            <span className="font-mono text-slate-500">
              {completedCount}/{totalChapters}
            </span>
          </div>
          <ProgressBar value={progressPercent} size="sm" showPercent={false} />
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mb-3">
          Guest mode enabled. Your progress is saved in your local browser storage.
        </div>

        {showResetConfirm ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 dark:border-rose-900/60 dark:bg-rose-950/50">
            <p className="text-xs text-rose-800 dark:text-rose-300 font-medium mb-2">
              Reset all completed chapters and quiz scores?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Yes, Reset
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded bg-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset progress</span>
          </button>
        )}
      </div>
    </aside>
  );
};
