import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Flame, Menu, X, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { loadUserProgress } from '../../lib/storage';
import { UserProgressState } from '../../types/storage';
import { getAllChapters } from '../../data/curriculum';

export interface HeaderProps {
  onToggleMobileNav: () => void;
  isMobileNavOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileNav,
  isMobileNavOpen,
}) => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const allChapters = getAllChapters();
  const totalChapters = allChapters.length;
  const completedCount = progress.completedChapterIds.length;
  const percent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-sap-slate-900/95 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleMobileNav}
          aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileNavOpen}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden focus-visible:outline focus-visible:outline-2"
        >
          {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white group focus-visible:outline focus-visible:outline-2 rounded-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sap-blue-500 text-white shadow-sm transition-transform group-hover:scale-105">
            <Rocket className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold leading-none text-slate-900 dark:text-white">
              BTP <span className="text-sap-blue-500">Launchpad</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              Beginner Academy
            </span>
          </div>
        </Link>
      </div>

      {/* Progress & Quick Stats & Theme */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Streak Counter */}
        <div
          title={`${progress.streakDays} Day Learning Streak`}
          className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300"
        >
          <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span className="font-mono">{progress.streakDays}</span>
          <span className="hidden sm:inline">day streak</span>
        </div>

        {/* Learning Progress Indicator */}
        <Link
          to="/dashboard"
          className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
          title={`${completedCount} of ${totalChapters} chapters completed`}
        >
          <Sparkles className="h-3.5 w-3.5 text-sap-blue-500" />
          <span>{percent}% Completed</span>
        </Link>

        {/* Accessible Theme Switcher */}
        <ThemeToggle />
      </div>
    </header>
  );
};
