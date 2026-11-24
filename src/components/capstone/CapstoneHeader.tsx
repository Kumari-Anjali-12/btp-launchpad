import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Database, ShieldCheck, CloudUpload } from 'lucide-react';
import { CAPSTONE_LEVELS } from '../../data/capstoneData';
import { loadCapstoneProgress } from '../../store/capstoneStore';

export const CapstoneHeader: React.FC = () => {
  const location = useLocation();
  const progress = loadCapstoneProgress();

  return (
    <div className="border-b border-stone-200/90 bg-white px-4 py-4 dark:border-stone-800 dark:bg-stone-900/90 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/capstone"
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Capstone Hub</span>
          </Link>
          <div className="h-4 w-px bg-stone-200 dark:bg-stone-800" />
          <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Employee Leave Management Capstone
          </h2>
        </div>

        {/* Level Navigation Tabs */}
        <div className="flex items-center gap-2">
          {CAPSTONE_LEVELS.map((lvl) => {
            const isActive = location.pathname.includes(lvl.id);
            const isPassed = progress.passedQuizzes[lvl.id];

            return (
              <Link
                key={lvl.id}
                to={`/capstone/${lvl.id}`}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                }`}
              >
                {lvl.id === 'level-1' && <Database className="h-3.5 w-3.5" />}
                {lvl.id === 'level-2' && <ShieldCheck className="h-3.5 w-3.5" />}
                {lvl.id === 'level-3' && <CloudUpload className="h-3.5 w-3.5" />}
                <span>{lvl.title.split('&')[0]?.trim() || lvl.title}</span>
                {isPassed && (
                  <span className={`inline-block h-2 w-2 rounded-full ${isActive ? 'bg-white' : 'bg-emerald-500'}`} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
