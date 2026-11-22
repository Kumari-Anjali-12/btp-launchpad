import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Award,
  Sparkles,
  Wrench,
  ShieldAlert,
} from 'lucide-react';
import {
  getChapterById,
  getSyllabusModuleById,
  getAdjacentChapters,
} from '../data/curriculum';
import {
  loadUserProgress,
  submitChapterQuiz,
  updateCurrentLocation,
} from '../lib/storage';
import { UserProgressState } from '../types/storage';
import { LessonStep, Chapter, SyllabusModule } from '../types/curriculum';

// Learning Components
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

// Redesigned Reference UI Components
import { CourseSidebar } from '../components/learning/CourseSidebar';
import { WorkspaceHeader } from '../components/learning/WorkspaceHeader';
import { LessonStepper } from '../components/learning/LessonStepper';
import { GuidedInstructorPanel } from '../components/learning/GuidedInstructorPanel';

export const LearnChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  // Resolve chapter and module data
  const rawId = chapterId || 'mod-0-1';
  let resolvedData:
    | {
        chapter: Chapter | SyllabusModule;
        module: { id: string; number: number; title: string };
      }
    | undefined = getChapterById(rawId);

  if (!resolvedData) {
    const syllabusModule = getSyllabusModuleById(rawId);
    if (syllabusModule) {
      resolvedData = {
        chapter: syllabusModule,
        module: {
          id: syllabusModule.phaseId,
          number: parseInt(syllabusModule.phaseId.replace('phase-', ''), 10) || 0,
          title: `Phase ${syllabusModule.phaseId.replace('phase-', '')}`,
        },
      };
    }
  }

  // Update learner location and scroll to top on chapter change
  useEffect(() => {
    if (resolvedData) {
      updateCurrentLocation(resolvedData.module.id, resolvedData.chapter.id);
      setCurrentStepIndex(0);
    }
    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [rawId, resolvedData]);

  const handleReplay = useCallback(() => {
    setReplayKey((k) => k + 1);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  if (!resolvedData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
          Lesson Not Found
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          The requested curriculum lesson &ldquo;{rawId}&rdquo; does not exist.
        </p>
        <Link to="/chapters">
          <Button variant="primary">Return to Curriculum Overview</Button>
        </Link>
      </div>
    );
  }

  const { chapter, module } = resolvedData;
  const isCompleted =
    progress.completedChapterIds.includes(chapter.id) ||
    progress.completedLessonIds?.includes(chapter.id) ||
    false;
  const quizRecord = progress.quizScores[chapter.id];
  const { prevChapter, nextChapter } = getAdjacentChapters(chapter.id);

  const chapterCode =
    chapter.code ||
    chapter.number ||
    (chapter.id.startsWith('mod-') ? chapter.id.replace('mod-', '').replace('-', '.') : '0.1');

  const chapterTagline =
    chapter.tagline ||
    chapter.subtitle ||
    '';

  // Construct structured steps for the Stepper and Guided Instructor Panel
  const rawSteps: LessonStep[] = chapter.steps && chapter.steps.length > 0
    ? chapter.steps
    : [
        {
          stepNumber: 1,
          title: 'Foundational Concept & Objectives',
          subtitle: 'The architectural necessity',
          explanation: chapter.summary,
          keyIdea:
            chapter.conceptExplanation?.whatItIs ||
            'Enterprise systems require strict side-by-side extensibility and real-time core consistency.',
          taskInstruction: 'Review the learning objectives below before proceeding.',
        },
        {
          stepNumber: 2,
          title: 'Real-World Mental Model',
          subtitle: chapter.analogy?.concept || 'Everyday Metaphor',
          explanation: chapter.analogy?.explanation || '',
          keyIdea:
            chapter.analogy?.transition ||
            'Enterprise ERP guarantees every department acts on identical real-time data.',
        },
        {
          stepNumber: 3,
          title: 'Under the Hood & BTP Fit',
          subtitle: 'System Mechanics',
          explanation: chapter.conceptExplanation?.howItWorks || '',
          keyIdea:
            chapter.conceptExplanation?.btpFit ||
            'Decoupling custom cloud applications from core ERP keeps upgrades seamless.',
        },
        {
          stepNumber: 4,
          title: 'Technical Implementation',
          subtitle: chapter.technicalExample?.title || 'Code Walkthrough',
          explanation: chapter.technicalExample?.purpose || '',
          keyIdea:
            chapter.technicalExample?.commonMistakes?.[0] ||
            'Verify syntax, imports and cloud annotations carefully.',
          taskInstruction: 'Inspect the code snippet and line-by-line annotations.',
        },
        {
          stepNumber: 5,
          title: 'Business Impact & Knowledge Check',
          subtitle: chapter.businessScenario?.title || 'Enterprise Verification',
          explanation: chapter.businessScenario?.context || '',
          keyIdea:
            chapter.businessScenario?.businessImpact ||
            'Real-time automated integration removes manual operational delays.',
          taskInstruction: 'Complete the 3 quiz questions to test your understanding.',
        },
      ];

  const handleQuizSubmit = (score: number, total: number, answers: Record<string, string>) => {
    const updatedState = submitChapterQuiz(chapter.id, answers, score, total);
    setProgress(updatedState);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((i) => Math.max(0, i - 1));
  };

  const handleNextStep = () => {
    setCurrentStepIndex((i) => Math.min(rawSteps.length - 1, i + 1));
  };

  return (
    <div className="flex flex-1 w-full bg-[#fbf9f4] dark:bg-[#141517] overflow-hidden">
      {/* 1. Left Course Sidebar (Accordion & Progress) */}
      <CourseSidebar
        currentModuleId={chapter.id}
        completedIds={progress.completedChapterIds}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Central Learning Workspace */}
      <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto">
        <main className="flex-1 px-4 py-6 sm:px-8 max-w-4xl mx-auto w-full space-y-8">
          {/* Workspace Top Header (Breadcrumb, Title, Chips, Replay & Pause) */}
          <WorkspaceHeader
            phaseNumber={module.number}
            phaseTitle={module.title}
            moduleCode={chapterCode}
            title={chapter.title}
            tagline={chapterTagline}
            estimatedMinutes={chapter.estimatedMinutes}
            level={chapter.level || 'Beginner'}
            totalSteps={rawSteps.length}
            isCompleted={isCompleted}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onReplay={handleReplay}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />

          {/* Learning Objectives */}
          <LearningObjectives objectives={chapter.learningObjectives} />

          {/* Everyday Analogy */}
          <AnalogySection analogy={chapter.analogy} />

          {/* Plain-English Concept Deep Dive */}
          <ConceptSection concept={chapter.conceptExplanation} />

          {/* Interactive Visual Architecture Diagram */}
          <div id="interactive-diagram">
            <InteractiveDiagram
              key={replayKey}
              type={chapter.diagramType}
              caption={`Figure: Architectural flow for Module ${chapterCode}: ${chapter.title}`}
            />
          </div>

          {/* Enterprise Jargon Decoder */}
          <JargonDecoder terms={chapter.jargonTerms} />

          {/* Practical Technical Code Example */}
          <CodeExample example={chapter.technicalExample} />

          {/* Real Business Scenario */}
          <BusinessScenarioSection scenario={chapter.businessScenario} />

          {/* Practical Implementation & Mastery Check Callouts (from 9-Phase Syllabus) */}
          {(chapter.practicalImplementation || chapter.masteryCheck) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.practicalImplementation && (
                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    <Wrench className="w-4 h-4 text-emerald-600" />
                    <span>Practical Task</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {chapter.practicalImplementation}
                  </p>
                </div>
              )}

              {chapter.masteryCheck && (
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 dark:border-amber-900/60 dark:bg-amber-950/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>Mastery Check</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {chapter.masteryCheck}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Takeaways */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 dark:border-stone-800 dark:bg-stone-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Key Module Takeaways</span>
            </div>
            <ul className="grid grid-cols-1 gap-2 text-xs text-stone-600 dark:text-stone-400">
              {chapter.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Knowledge Check (3 Questions) */}
          <div id="knowledge-check">
            <Quiz
              chapterId={chapter.id}
              questions={chapter.quizQuestions}
              onQuizSubmit={handleQuizSubmit}
              savedScore={quizRecord?.score}
              savedPassed={quizRecord?.passed}
              savedAnswers={quizRecord?.selectedAnswers}
            />
          </div>

          {/* Completion Banner */}
          {isCompleted && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                    Module {chapterCode} Completed!
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    Your mastery check and score are stored in your browser.
                  </span>
                </div>
              </div>
              {nextChapter && (
                <Link to={`/learn/${nextChapter.id}`}>
                  <Button variant="primary" size="sm">
                    Continue to Module {(nextChapter as SyllabusModule).code || nextChapter.number}
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Chapter Navigation Buttons */}
          <ChapterNavigation
            prevChapter={
              prevChapter
                ? {
                    id: prevChapter.id,
                    number: (prevChapter as SyllabusModule).code || prevChapter.number,
                    title: prevChapter.title,
                  }
                : undefined
            }
            nextChapter={
              nextChapter
                ? {
                    id: nextChapter.id,
                    number: (nextChapter as SyllabusModule).code || nextChapter.number,
                    title: nextChapter.title,
                  }
                : undefined
            }
            moduleId={module.id}
          />
        </main>

        {/* Bottom Horizontal Lesson Stepper */}
        <LessonStepper
          currentStepIndex={currentStepIndex}
          steps={rawSteps}
          onSelectStep={setCurrentStepIndex}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
          canPrev={currentStepIndex > 0}
          canNext={currentStepIndex < rawSteps.length - 1}
        />
      </div>

      {/* 3. Right Guided Instructor Panel */}
      <GuidedInstructorPanel
        currentStepIndex={currentStepIndex}
        steps={rawSteps}
        learningObjectives={chapter.learningObjectives}
        onSelectStep={setCurrentStepIndex}
        onPrev={handlePrevStep}
        onNext={handleNextStep}
        onReplay={handleReplay}
        onTogglePlay={handleTogglePlay}
      />
    </div>
  );
};
