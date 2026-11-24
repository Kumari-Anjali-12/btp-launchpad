import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import { Button } from '../common/Button';
import { QuizQuestion as QuizQuestionType } from '../../types/curriculum';

export interface QuizProps {
  questions: [QuizQuestionType, QuizQuestionType, QuizQuestionType];
  chapterId: string;
  onQuizSubmit: (score: number, total: number, answers: Record<string, string>) => void;
  savedScore?: number;
  savedPassed?: boolean;
  savedAnswers?: Record<string, string>;
}

export const Quiz: React.FC<QuizProps> = ({
  questions,
  chapterId,
  onQuizSubmit,
  savedScore,
  savedPassed,
  savedAnswers,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(savedAnswers || {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(savedPassed || false);
  const [currentScore, setCurrentScore] = useState<number>(savedScore ?? 0);

  useEffect(() => {
    setSelectedAnswers(savedAnswers || {});
    setIsSubmitted(savedPassed || false);
    setCurrentScore(savedScore ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  useEffect(() => {
    if (savedPassed) {
      setIsSubmitted(true);
      if (savedScore !== undefined) {
        setCurrentScore(savedScore);
      }
      if (savedAnswers) {
        setSelectedAnswers(savedAnswers);
      }
    }
  }, [savedPassed, savedScore, savedAnswers]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return; // Cannot change after submit without retrying
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const allQuestionsAnswered =
    questions.length === 3 &&
    questions.every((q) => Boolean(selectedAnswers[q.id]));

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const correct = q.options.find((opt) => opt.isCorrect);
      if (selected && correct && selected === correct.id) {
        score += 1;
      }
    });

    setCurrentScore(score);
    setIsSubmitted(true);
    onQuizSubmit(score, questions.length, selectedAnswers);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentScore(0);
  };

  const isPassed = isSubmitted && currentScore >= 2;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-sap-slate-900 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Knowledge Check</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Check Your Understanding (3 Questions)
          </h3>
        </div>

        {isSubmitted && (
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              isPassed
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Score: {currentScore} / 3 {isPassed ? '(Passed!)' : '(Try again)'}</span>
          </div>
        )}
      </div>

      {/* 3 Questions */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOptionId = selectedAnswers[q.id];

          return (
            <div key={q.id} className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                  {qIndex + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>
                  {q.scenarioContext && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic">
                      {q.scenarioContext}
                    </p>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="pl-7 space-y-2">
                {q.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.isCorrect;

                  let optionStyle =
                    'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60';

                  if (isSubmitted) {
                    if (isCorrect) {
                      optionStyle =
                        'border-emerald-300 bg-emerald-50/70 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'border-rose-300 bg-rose-50/70 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200';
                    } else {
                      optionStyle = 'opacity-60 border-slate-200 dark:border-slate-800';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'border-sap-blue-500 bg-sap-blue-50/60 text-sap-blue-900 dark:border-sap-blue-600 dark:bg-sap-blue-950/50 dark:text-sap-blue-100';
                  }

                  return (
                    <div key={opt.id} className="space-y-1">
                      <label
                        className={`flex items-start gap-3 rounded-lg border p-3 text-xs cursor-pointer transition-colors ${optionStyle}`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={opt.id}
                          checked={isSelected}
                          disabled={isSubmitted}
                          onChange={() => handleSelectOption(q.id, opt.id)}
                          className="mt-0.5 text-sap-blue-600 focus:ring-sap-blue-500"
                        />
                        <span className="flex-1 leading-relaxed">{opt.text}</span>
                        {isSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {isSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </label>

                      {/* Explanation displayed after submission */}
                      {isSubmitted && (isSelected || isCorrect) && (
                        <div
                          className={`ml-6 p-2 rounded text-[11px] leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                          }`}
                        >
                          <strong>{isCorrect ? 'Correct: ' : 'Incorrect: '}</strong>
                          {opt.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {!isSubmitted ? (
          <>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {allQuestionsAnswered
                ? 'Ready to check your answers!'
                : `Please answer all 3 questions (${Object.keys(selectedAnswers).length}/3 completed).`}
            </span>
            <Button
              variant="primary"
              size="md"
              disabled={!allQuestionsAnswered}
              onClick={handleSubmit}
            >
              Submit Knowledge Check
            </Button>
          </>
        ) : (
          <>
            <span className="text-xs text-slate-600 dark:text-slate-300">
              {isPassed
                ? '🎉 Congratulations! You demonstrated strong conceptual understanding.'
                : 'Review the explanations above and retry to solidify your knowledge.'}
            </span>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={handleRetry}
            >
              Retry Knowledge Check
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
