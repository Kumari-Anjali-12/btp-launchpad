import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { CapstoneQuizQuestion } from '../../types/capstone';
import { recordQuizResult } from '../../store/capstoneStore';

interface CapstoneQuizSectionProps {
  levelId: string;
  badgeId: string;
  questions: CapstoneQuizQuestion[];
  onPassed?: () => void;
}

export const CapstoneQuizSection: React.FC<CapstoneQuizSectionProps> = ({
  levelId,
  badgeId,
  questions,
  onPassed,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    recordQuizResult(levelId, correctCount, questions.length, badgeId);

    const isPassed = correctCount >= Math.ceil(questions.length * 0.8);
    if (isPassed && onPassed) {
      onPassed();
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const totalQuestions = questions.length;
  const isPassed = score >= Math.ceil(totalQuestions * 0.8);
  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4 dark:border-stone-800">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Capstone Mastery Assessment
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Answer all {totalQuestions} questions to demonstrate your architectural mastery. Pass with 80% (4/5) to unlock your badge.
          </p>
        </div>

        {submitted && (
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold ${
              isPassed
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
            }`}
          >
            {isPassed ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            <span>
              Score: {score}/{totalQuestions} — {isPassed ? 'PASSED & BADGE UNLOCKED!' : 'RETRY NEEDED (Requires 4/5)'}
            </span>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="mt-6 space-y-6">
        {questions.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-xl border border-stone-100 bg-stone-50/50 p-4 dark:border-stone-800/60 dark:bg-stone-800/30"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-bold text-stone-700 dark:bg-stone-700 dark:text-stone-200">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {q.question}
                  </h4>

                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let optionStyle =
                        'border-stone-200 bg-white text-stone-700 hover:border-indigo-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300';

                      if (submitted) {
                        if (optIdx === q.correctIndex) {
                          optionStyle =
                            'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-200 font-semibold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle =
                            'border-rose-500 bg-rose-50 text-rose-900 dark:border-rose-600 dark:bg-rose-950/50 dark:text-rose-200';
                        } else {
                          optionStyle = 'opacity-60 border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900';
                        }
                      } else if (isOptionSelected) {
                        optionStyle =
                          'border-indigo-600 bg-indigo-50/60 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-200 font-medium';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submitted}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`w-full text-left rounded-lg border px-3.5 py-2.5 text-xs transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {submitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          )}
                          {submitted && isOptionSelected && !isCorrect && (
                            <XCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-3 rounded-lg bg-stone-100/80 p-3 text-xs text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
                      <span className="font-bold">Architectural Rationale: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-4 dark:border-stone-800">
        <div>
          {!submitted && (
            <span className="text-xs text-stone-500">
              {Object.keys(selectedAnswers).length} of {totalQuestions} answered
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {submitted ? (
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry Assessment</span>
            </button>
          ) : (
            <button
              disabled={!allAnswered}
              onClick={handleSubmit}
              className={`rounded-lg px-5 py-2 text-xs font-bold text-white shadow-sm transition-all ${
                allAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-500'
                  : 'cursor-not-allowed bg-stone-300 dark:bg-stone-800 dark:text-stone-500'
              }`}
            >
              Submit & Verify Mastery
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
