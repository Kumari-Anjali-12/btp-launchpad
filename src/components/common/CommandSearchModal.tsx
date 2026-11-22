import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Award, ArrowRight } from 'lucide-react';
import { getAllModules, getAllCapstones, getDeferredTopics } from '../../data/curriculum';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const allModules = getAllModules();
  const allCapstones = getAllCapstones();
  const deferred = getDeferredTopics();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedModules = trimmed
    ? allModules.filter(
        (m) =>
          m.title.toLowerCase().includes(trimmed) ||
          m.code.toLowerCase().includes(trimmed) ||
          m.tagline.toLowerCase().includes(trimmed) ||
          m.subtopics.some((s) => s.toLowerCase().includes(trimmed))
      )
    : allModules.slice(0, 6);

  const matchedCapstones = trimmed
    ? allCapstones.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmed) ||
          c.objective.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedDeferred = trimmed
    ? deferred.filter(
        (d) =>
          d.title.toLowerCase().includes(trimmed) ||
          d.subtopics.some((s) => s.toLowerCase().includes(trimmed))
      )
    : [];

  const totalResults = matchedModules.length + matchedCapstones.length + matchedDeferred.length;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search curriculum"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search all 36 modules, capstones, and concepts..."
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-stone-500 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded">
            ESC
          </kbd>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-stone-100 dark:divide-stone-800/60">
          {totalResults === 0 ? (
            <div className="py-8 text-center text-sm text-stone-500 dark:text-stone-400">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <>
              {matchedModules.length > 0 && (
                <div className="py-2">
                  <div className="px-3 pb-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-400">
                    Syllabus Modules ({matchedModules.length})
                  </div>
                  {matchedModules.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(`/learn/${m.id}`)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg hover:bg-[#d2e8d4]/40 dark:hover:bg-emerald-950/30 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {m.code}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-200">
                            {m.title}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                            {m.tagline}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {matchedCapstones.length > 0 && (
                <div className="py-2">
                  <div className="px-3 pb-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-400">
                    Phase Capstones ({matchedCapstones.length})
                  </div>
                  {matchedCapstones.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelect(`/roadmap`)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-amber-500" />
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {c.title}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                            {c.objective}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        Capstone
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {matchedDeferred.length > 0 && (
                <div className="py-2">
                  <div className="px-3 pb-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-400">
                    Deferred Topics ({matchedDeferred.length})
                  </div>
                  {matchedDeferred.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => handleSelect(`/roadmap`)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {d.title}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                            {d.description}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                        Revisit Post-Capstone
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
          <span>Search 36 modules, 9 phase capstones, and 6 deferred topics</span>
          <span className="font-mono">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
