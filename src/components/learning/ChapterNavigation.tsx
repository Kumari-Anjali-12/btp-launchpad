import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Map } from 'lucide-react';
import { Button } from '../common/Button';

export interface ChapterNavigationItem {
  id: string;
  title: string;
  number?: string;
  code?: string;
}

export interface ChapterNavigationProps {
  prevChapter?: ChapterNavigationItem;
  nextChapter?: ChapterNavigationItem;
  moduleId: string;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  prevChapter,
  nextChapter,
  moduleId,
}) => {
  const formatLabel = (chap: ChapterNavigationItem, prefix: 'Previous' | 'Next') => {
    if (chap.code) {
      return `${prefix}: Module ${chap.code}`;
    }
    if (chap.number) {
      return `${prefix}: Chapter ${chap.number}`;
    }
    return `${prefix}: ${chap.title}`;
  };

  const overviewPath = moduleId.startsWith('phase-') ? '/roadmap' : `/chapters/${moduleId}`;

  return (
    <nav
      aria-label="Lesson progression navigation"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800"
    >
      <div>
        {prevChapter ? (
          <Link to={`/learn/${prevChapter.id}`} title={prevChapter.title}>
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
              {formatLabel(prevChapter, 'Previous')}
            </Button>
          </Link>
        ) : (
          <Link to={overviewPath}>
            <Button variant="ghost" size="sm" leftIcon={<BookOpen className="w-3.5 h-3.5" />}>
              Curriculum Overview
            </Button>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link to={overviewPath}>
          <Button variant="ghost" size="sm" leftIcon={<BookOpen className="w-3.5 h-3.5" />}>
            {moduleId.startsWith('phase-') ? 'Phase Modules' : 'Module Overview'}
          </Button>
        </Link>
        <Link to="/roadmap">
          <Button variant="ghost" size="sm" leftIcon={<Map className="w-3.5 h-3.5" />}>
            Roadmap
          </Button>
        </Link>
      </div>

      <div>
        {nextChapter ? (
          <Link to={`/learn/${nextChapter.id}`} title={nextChapter.title}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              {formatLabel(nextChapter, 'Next')}
            </Button>
          </Link>
        ) : (
          <Link to="/roadmap">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Next on Roadmap
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
