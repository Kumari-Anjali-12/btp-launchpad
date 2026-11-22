import React, { useState, useEffect } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { ThemeMode } from '../../types/storage';
import { loadUserProgress, saveUserProgress, applyTheme } from '../../lib/storage';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [theme, setTheme] = useState<ThemeMode>('system');

  useEffect(() => {
    const progress = loadUserProgress();
    setTheme(progress.theme);
    applyTheme(progress.theme);

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
        applyTheme(customEvent.detail.theme);
      }
    };

    window.addEventListener('btp_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleStorageUpdate);
  }, []);

  const handleToggle = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    const progress = loadUserProgress();
    saveUserProgress({ ...progress, theme: nextTheme });
  };

  return (
    <div
      role="group"
      aria-label="Theme mode switcher"
      className={`inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <button
        type="button"
        onClick={() => handleToggle('light')}
        aria-label="Light mode"
        aria-pressed={theme === 'light'}
        className={`rounded-md p-1.5 transition-colors focus-visible:outline focus-visible:outline-2 ${
          theme === 'light'
            ? 'bg-white text-sap-blue-600 shadow-xs dark:bg-slate-800 dark:text-sap-blue-400'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => handleToggle('dark')}
        aria-label="Dark mode"
        aria-pressed={theme === 'dark'}
        className={`rounded-md p-1.5 transition-colors focus-visible:outline focus-visible:outline-2 ${
          theme === 'dark'
            ? 'bg-white text-sap-blue-600 shadow-xs dark:bg-slate-800 dark:text-sap-blue-400'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => handleToggle('system')}
        aria-label="System theme mode"
        aria-pressed={theme === 'system'}
        className={`rounded-md p-1.5 transition-colors focus-visible:outline focus-visible:outline-2 ${
          theme === 'system'
            ? 'bg-white text-sap-blue-600 shadow-xs dark:bg-slate-800 dark:text-sap-blue-400'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  );
};
