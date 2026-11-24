import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Flame, Menu, X, Search, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { CommandSearchModal } from '../common/CommandSearchModal';
import { loadUserProgress } from '../../lib/storage';
import { UserProgressState } from '../../types/storage';
import { getAllModules } from '../../data/curriculum';

export interface HeaderProps {
  onToggleMobileNav: () => void;
  isMobileNavOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileNav,
  isMobileNavOpen,
}) => {
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const allModules = getAllModules();
  const totalModules = allModules.length || 36;
  const completedCount =
    progress.completedLessonIds?.length || progress.completedChapterIds?.length || 0;
  const percent = Math.round((completedCount / totalModules) * 100);

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  // Top navigation tabs as requested by UI redesign
  const navTabs = [
    {
      label: 'Learn',
      path: '/learn/mod-0-1',
      isActive:
        location.pathname.startsWith('/learn') ||
        location.pathname.startsWith('/chapters') ||
        location.pathname === '/roadmap',
    },
    {
      label: 'Practice',
      path: '/practice',
      isActive: location.pathname.startsWith('/practice'),
    },
    {
      label: 'Design Lab',
      path: '/design-lab',
      isActive: location.pathname.startsWith('/design-lab'),
    },
    {
      label: 'Cheatsheets',
      path: '/cheatsheet',
      isActive: location.pathname.startsWith('/cheatsheet'),
    },
    {
      label: 'Capstones',
      path: '/capstone',
      isActive: location.pathname.startsWith('/capstone'),
    },
    {
      label: 'Career Hub',
      path: '/career-hub',
      isActive: location.pathname.startsWith('/career-hub'),
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-stone-200/80 bg-[#fbf9f4]/95 px-4 backdrop-blur-md dark:border-stone-800 dark:bg-[#141517]/95 sm:px-6">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileNavOpen}
            className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-200/60 dark:text-stone-300 dark:hover:bg-stone-800 md:hidden focus-visible:outline focus-visible:outline-2"
          >
            {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-stone-900 dark:text-white group focus-visible:outline focus-visible:outline-2 rounded-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Rocket className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black leading-none tracking-tight text-stone-900 dark:text-white">
                BTP <span className="text-emerald-700 dark:text-emerald-400">Launchpad</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-stone-500 dark:text-stone-400 uppercase">
                Beginner Academy
              </span>
            </div>
          </Link>

          {/* Reference UI Top Navigation Pill Tabs */}
          <nav className="hidden xl:flex items-center gap-1.5 ml-2">
            {navTabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.path}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all ${
                  tab.isActive
                    ? 'bg-[#d2e8d4] text-[#143d22] dark:bg-[#203828] dark:text-emerald-300 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 dark:text-stone-300 dark:hover:text-white dark:hover:bg-stone-800/60'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Controls: Search, Language, Streak, Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search curriculum"
            className="hidden sm:flex items-center gap-2 px-3 py-1 text-xs text-stone-500 bg-stone-100 hover:bg-stone-200/70 dark:bg-stone-800/80 dark:hover:bg-stone-800 dark:text-stone-300 rounded-full border border-stone-200/80 dark:border-stone-700 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-stone-400" />
            <span>Search...</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-400">
              Ctrl K
            </kbd>
          </button>

          {/* Language Selector Indicator */}
          <div
            title="Language: English"
            className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-900"
          >
            EN
          </div>

          {/* Streak Counter */}
          <div
            title={`${progress.streakDays} Day Learning Streak`}
            className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300"
          >
            <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="font-mono">{progress.streakDays}</span>
            <span className="hidden lg:inline text-[11px]">streak</span>
          </div>

          {/* Overall Progress Indicator */}
          <Link
            to="/dashboard"
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800 transition-colors"
            title={`${completedCount} of ${totalModules} syllabus modules completed`}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono">{percent}%</span>
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />
        </div>
      </header>

      {/* Global Command Search Modal */}
      <CommandSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
