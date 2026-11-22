import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Map } from 'lucide-react';
import { Button } from '../common/Button';

export interface ChapterNavigationProps {
  prevChapter?: { id: string; number?: string; title: string };
  nextChapter?: { id: string; number?: string; title: string };
  moduleId: string;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  prevChapter,
  nextChapter,
  moduleId,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div>
        {prevChapter ? (
          <Link to={`/learn/${prevChapter.id}`}>
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
              Previous: Chapter {prevChapter.number}
            </Button>
          </Link>
        ) : (
          <Link to={`/chapters/${moduleId}`}>
            <Button variant="ghost" size="sm" leftIcon={<BookOpen className="w-3.5 h-3.5" />}>
              Module Overview
            </Button>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link to={`/chapters/${moduleId}`}>
          <Button variant="ghost" size="sm" leftIcon={<BookOpen className="w-3.5 h-3.5" />}>
            Module
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
          <Link to={`/learn/${nextChapter.id}`}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Next: Chapter {nextChapter.number}
            </Button>
          </Link>
        ) : (
          <Link to="/roadmap">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Next Module on Roadmap
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
