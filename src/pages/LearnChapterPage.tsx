import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Award, Sparkles } from 'lucide-react';
import { getChapterById, getAdjacentChapters } from '../data/curriculum';
import {
  loadUserProgress,
  submitChapterQuiz,
  updateCurrentLocation,
} from '../lib/storage';
import { UserProgressState } from '../types/storage';
import { ChapterHeader } from '../components/learning/ChapterHeader';
import { LearningObjectives } from '../components/learning/LearningObjectives';
import { AnalogySection } from '../components/learning/AnalogySection';
import { ConceptSection } from '../components/learning/ConceptSection';
import { InteractiveDiagram } from '../components/learning/diagrams/InteractiveDiagram';
import { JargonDecoder } from '../components/learning/JargonDecoder';
import { CodeExample } from '../components/learning/CodeExample';
import { BusinessScenarioSection } from '../components/learning/BusinessScenario';
import { Quiz } from '../components/learning/Quiz';
import { ChapterNavigation } from '../components/learning/ChapterNavigation';
import { Button } from '../components/common/Button';

export const LearnChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  const data = getChapterById(chapterId || '');

  // Update learner location and scroll to top on chapter change
  useEffect(() => {
    if (chapterId) {
      const chapterData = getChapterById(chapterId);
      if (chapterData) {
        updateCurrentLocation(chapterData.module.id, chapterData.chapter.id);
      }
    }
    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [chapterId]);

  if (!data) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Chapter Not Found
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          The requested learning chapter does not exist in the curriculum.
        </p>
        <Link to="/chapters">
          <Button variant="primary">Return to Curriculum Overview</Button>
        </Link>
      </div>
    );
  }

  const { chapter, module } = data;
  const isCompleted = progress.completedChapterIds.includes(chapter.id);
  const quizRecord = progress.quizScores[chapter.id];
  const { prevChapter, nextChapter } = getAdjacentChapters(chapter.id);

  const handleQuizSubmit = (score: number, total: number, answers: Record<string, string>) => {
    const updatedState = submitChapterQuiz(chapter.id, answers, score, total);
    setProgress(updatedState);
  };

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto">
      {/* Back to Module Breadcrumb */}
      <div>
        <Link
          to={`/chapters/${module.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-sap-blue-600 dark:text-slate-400 dark:hover:text-sap-blue-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Module {module.number}: {module.title}</span>
        </Link>
      </div>

      {/* A. Chapter Header */}
      <ChapterHeader
        moduleNumber={module.number}
        moduleTitle={module.title}
        chapterNumber={chapter.number}
        title={chapter.title}
        subtitle={chapter.subtitle}
        estimatedMinutes={chapter.estimatedMinutes}
        isCompleted={isCompleted}
      />

      {/* B. Learning Objectives */}
      <LearningObjectives objectives={chapter.learningObjectives} />

      {/* C. Everyday Analogy */}
      <AnalogySection analogy={chapter.analogy} />

      {/* D. Plain-English Concept Deep Dive */}
      <ConceptSection concept={chapter.conceptExplanation} />

      {/* E. Interactive Visual Architecture Diagram */}
      <InteractiveDiagram
        type={chapter.diagramType}
        caption={`Figure: Architectural flow for Chapter ${chapter.number}: ${chapter.title}`}
      />

      {/* F. Enterprise Jargon Decoder */}
      <JargonDecoder terms={chapter.jargonTerms} />

      {/* G. Practical Technical Example */}
      <CodeExample example={chapter.technicalExample} />

      {/* H. Real Business Scenario */}
      <BusinessScenarioSection scenario={chapter.businessScenario} />

      {/* Key Takeaways */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-sap-slate-900/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Key Chapter Takeaways</span>
        </div>
        <ul className="grid grid-cols-1 gap-2 text-xs text-slate-600 dark:text-slate-400">
          {chapter.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* I. Interactive Knowledge Check (3 Questions) */}
      <div id="knowledge-check">
        <Quiz
          chapterId={chapter.id}
          questions={chapter.quizQuestions}
          onQuizSubmit={handleQuizSubmit}
          savedScore={quizRecord?.score}
          savedPassed={quizRecord?.passed}
        />
      </div>

      {/* Completion Banner if finished */}
      {isCompleted && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                Chapter {chapter.number} Completed!
              </span>
              <span className="text-emerald-700 dark:text-emerald-400">
                Your progress is safely stored in your browser.
              </span>
            </div>
          </div>
          {nextChapter && (
            <Link to={`/learn/${nextChapter.id}`}>
              <Button variant="primary" size="sm">
                Continue to Chapter {nextChapter.number}
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* J. Chapter Navigation */}
      <ChapterNavigation
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        moduleId={module.id}
      />
    </div>
  );
};
