import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { getModuleById, getPhaseById } from '../data/curriculum';
import { ModuleId } from '../types/curriculum';
import { loadUserProgress, toggleChapterCompletion } from '../lib/storage';
import { UserProgressState } from '../types/storage';

export const ModuleDetailPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [progress, setProgress] = useState<UserProgressState>(loadUserProgress());

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(loadUserProgress());
    };
    window.addEventListener('btp_storage_updated', handleUpdate);
    return () => window.removeEventListener('btp_storage_updated', handleUpdate);
  }, []);

  let module = getModuleById(moduleId || 'module-0');
  if (!module && moduleId?.startsWith('phase-')) {
    const phase = getPhaseById(moduleId);
    if (phase) {
      module = {
        id: phase.id as unknown as ModuleId,
        number: phase.number,
        title: phase.title,
        tagline: phase.tagline,
        description: phase.description,
        iconName: 'Layers',
        level: 'Beginner',
        estimatedHours: phase.estimatedHours,
        prerequisites: [],
        learningObjectives: [phase.coreObjective],
        chapters: phase.modules.map((m) => ({
          ...m,
          moduleId: 'module-0' as ModuleId,
          order: 1,
          number: m.code,
          subtitle: m.tagline,
        })),
      };
    }
  }

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Module Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The requested curriculum module does not exist.
        </p>
        <Link to="/roadmap">
          <Button variant="primary">Return to Roadmap</Button>
        </Link>
      </div>
    );
  }

  const handleToggle = (chapterId: string) => {
    const nextState = toggleChapterCompletion(chapterId);
    setProgress(nextState);
  };

  const completedCount = module.chapters.filter((ch) =>
    progress.completedChapterIds.includes(ch.id)
  ).length;
  const percent =
    module.chapters.length > 0 ? Math.round((completedCount / module.chapters.length) * 100) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Back button */}
      <div>
        <Link
          to="/chapters"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-sap-blue-600 dark:text-slate-400 dark:hover:text-sap-blue-400 transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to all chapters</span>
        </Link>

        {/* Module Header */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-sap-slate-900 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
              Module {module.number}
            </span>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  module.level === 'Beginner'
                    ? 'success'
                    : module.level === 'Intermediate'
                    ? 'info'
                    : 'purple'
                }
              >
                {module.level}
              </Badge>
              <Badge variant={percent === 100 ? 'success' : percent > 0 ? 'info' : 'default'}>
                {percent === 100 ? 'Completed' : percent > 0 ? 'In Progress' : 'Not Started'}
              </Badge>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {module.title}
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            {module.tagline}
          </p>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            {module.description}
          </p>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <ProgressBar
              value={percent}
              size="sm"
              label={`Module Completion: ${completedCount} of ${module.chapters.length} chapters`}
            />
          </div>
        </div>
      </div>

      {/* Chapters Listing with Deep Content */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Chapters & Learning Walkthroughs
        </h2>

        {module.chapters.map((ch) => {
          const isDone = progress.completedChapterIds.includes(ch.id);

          return (
            <Card
              key={ch.id}
              className={`transition-all ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-950/60 dark:bg-emerald-950/10'
                  : 'hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-sap-blue-600 dark:text-sap-blue-400">
                      Chapter {ch.number}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" /> {ch.estimatedMinutes} mins
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={isDone ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => handleToggle(ch.id)}
                      leftIcon={isDone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      {isDone ? 'Completed' : 'Mark Completed'}
                    </Button>
                    <Link to={`/learn/${ch.id}`}>
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        {isDone ? 'Review Chapter' : 'Start Chapter'}
                      </Button>
                    </Link>
                  </div>
                </div>

                <CardTitle className="text-xl mt-1">{ch.title}</CardTitle>
                <CardDescription>{ch.subtitle}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {ch.summary}
                </p>

                {/* Real-World Enterprise Analogy Card */}
                <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Real-World Analogy: {ch.analogy.analogy}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {ch.analogy.explanation}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                    Key Technical Takeaways:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {ch.keyTakeaways.map((takeaway, i) => (
                      <li key={i}>{takeaway}</li>
                    ))}
                  </ul>
                </div>

                {/* Practical Hands-on Activity */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      Hands-on Challenge:
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                      {ch.practicalActivity}
                    </p>
                  </div>
                  <Link to={`/learn/${ch.id}`}>
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                      Open Full Interactive Lesson
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
