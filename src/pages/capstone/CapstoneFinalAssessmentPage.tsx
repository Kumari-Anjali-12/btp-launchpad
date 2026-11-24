import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  FINAL_ASSESSMENT_QUESTIONS,
  FINAL_ASSESSMENT_PASSING_THRESHOLD,
  FINAL_ASSESSMENT_TOTAL_POINTS,
} from '../../data/finalAssessmentData';
import {
  loadCapstoneProgress,
  submitFinalAssessment,
} from '../../store/capstoneStore';
import { CapstoneHeader } from '../../components/capstone/CapstoneHeader';

export const CapstoneFinalAssessmentPage: React.FC = () => {
  const [progress, setProgress] = useState(loadCapstoneProgress());
  const initialAnswers = progress.finalAssessment?.answers || {};
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(initialAnswers);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(Boolean(progress.finalAssessment));
  const [submissionResult, setSubmissionResult] = useState(progress.finalAssessment || null);

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = FINAL_ASSESSMENT_QUESTIONS.length;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    const { state, result } = submitFinalAssessment(selectedAnswers);
    setProgress(state);
    setSubmissionResult(result);
    setHasSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setHasSubmitted(false);
  };

  // Group questions by section
  const sections = [
    { key: 'technical', title: 'Section 1: Core Technical Foundations', weight: '30 Points (6 Questions)' },
    { key: 'architecture', title: 'Section 2: Enterprise Cloud Architecture', weight: '25 Points (5 Questions)' },
    { key: 'debugging', title: 'Section 3: Practical Debugging & Security Analysis', weight: '25 Points (5 Questions)' },
    { key: 'workflow', title: 'Section 4: Enterprise Workflow & Data Integrity', weight: '20 Points (4 Questions)' },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f4] pb-20 dark:bg-[#141517]">
      <CapstoneHeader />

      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/capstone" className="hover:text-indigo-600 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Capstone Hub
          </Link>
          <span>/</span>
          <span className="font-semibold text-stone-800 dark:text-stone-200">
            Final Comprehensive Technical Assessment
          </span>
        </div>

        {/* Hero Banner */}
        <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-bold text-indigo-800 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Phase 9.1 Capstone Exit Examination</span>
              </div>
              <h1 className="mt-3 text-2xl font-black text-stone-900 dark:text-stone-100 sm:text-3xl">
                Comprehensive SAP BTP Technical Assessment
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300 sm:text-sm">
                Validate your end-to-end expertise across SAP Cloud Application Programming Model (CAP),
                enterprise security architecture (XSUAA & App Router), transactional ACID integrity, and Cloud
                Foundry MTA deployments.
              </p>
            </div>

            {/* Assessment Rubric Rules Card */}
            <div className="rounded-xl border border-stone-200 bg-stone-50/90 p-4 text-xs dark:border-stone-800 dark:bg-stone-800/50 sm:w-80">
              <div className="font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Assessment Rules
              </div>
              <div className="space-y-1.5 text-stone-600 dark:text-stone-400 text-[11px]">
                <div className="flex justify-between">
                  <span>Total Possible Score:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{FINAL_ASSESSMENT_TOTAL_POINTS} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Passing Threshold:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{FINAL_ASSESSMENT_PASSING_THRESHOLD} pts (75%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{totalQuestions}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-amber-700 dark:text-amber-400 font-medium">
                  <strong>Critical Failure Gates:</strong> Must correctly solve both Critical Security Gate & Critical ACID Integrity Gate to earn passing certification.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Banner if Submitted */}
        {hasSubmitted && submissionResult && (
          <div
            className={`rounded-2xl border p-6 shadow-sm transition-all ${
              submissionResult.passed
                ? 'border-emerald-300 bg-emerald-50/90 dark:border-emerald-900/50 dark:bg-emerald-950/40'
                : 'border-red-300 bg-red-50/90 dark:border-red-900/50 dark:bg-red-950/40'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    submissionResult.passed
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {submissionResult.passed ? (
                    <Award className="h-6 w-6" />
                  ) : (
                    <XCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-black text-stone-900 dark:text-stone-100">
                    {submissionResult.passed
                      ? 'Assessment Passed — SAP BTP Capstone Certified!'
                      : 'Assessment Not Passed'}
                  </h2>
                  <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                    {submissionResult.passed
                      ? 'Congratulations! You demonstrated enterprise-grade competency in CAP modeling, security, and transactions.'
                      : 'You did not meet the certification criteria. Review the questions and failure gates below before retaking.'}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold">
                    <span
                      className={`rounded-md px-2.5 py-1 ${
                        submissionResult.totalScore >= FINAL_ASSESSMENT_PASSING_THRESHOLD
                          ? 'bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-200'
                          : 'bg-red-200/80 text-red-900 dark:bg-red-900/80 dark:text-red-200'
                      }`}
                    >
                      Score: {submissionResult.totalScore} / {FINAL_ASSESSMENT_TOTAL_POINTS} Points
                    </span>

                    <span
                      className={`rounded-md px-2.5 py-1 ${
                        submissionResult.criticalGate1Passed
                          ? 'bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-200'
                          : 'bg-red-200/80 text-red-900 dark:bg-red-900/80 dark:text-red-200'
                      }`}
                    >
                      Critical Security Gate: {submissionResult.criticalGate1Passed ? 'PASSED' : 'FAILED'}
                    </span>

                    <span
                      className={`rounded-md px-2.5 py-1 ${
                        submissionResult.criticalGate2Passed
                          ? 'bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-200'
                          : 'bg-red-200/80 text-red-900 dark:bg-red-900/80 dark:text-red-200'
                      }`}
                    >
                      Critical Data-Integrity Gate: {submissionResult.criticalGate2Passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>

                  {!submissionResult.passed &&
                    submissionResult.totalScore >= FINAL_ASSESSMENT_PASSING_THRESHOLD &&
                    !submissionResult.criticalGatePassed && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-100 p-2 text-xs font-medium text-amber-900 dark:bg-amber-950/70 dark:text-amber-200">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                        <span>
                          <strong>Critical Failure Gate Alert:</strong> Your numeric score ({submissionResult.totalScore}) exceeded 75,
                          but one or more critical failure gates were missed. In enterprise production systems, a security or data-integrity vulnerability cannot be approved.
                        </span>
                      </div>
                    )}
                </div>
              </div>

              <button
                onClick={handleRetake}
                className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-750"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>
        )}

        {/* Questions grouped by section */}
        <div className="space-y-10">
          {sections.map((section) => {
            const sectionQuestions = FINAL_ASSESSMENT_QUESTIONS.filter(
              (q) => q.section === section.key
            );

            return (
              <div
                key={section.key}
                className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/90"
              >
                <div className="border-b border-stone-200/80 pb-4 dark:border-stone-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      {section.title}
                    </h2>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {section.weight}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-8">
                  {sectionQuestions.map((q, idx) => {
                    const selected = selectedAnswers[q.id];
                    const isAnswered = selected !== undefined;
                    const isCorrect = isAnswered && selected === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`rounded-xl border p-5 transition-all ${
                          q.isCriticalGate
                            ? 'border-amber-300/80 bg-amber-50/20 dark:border-amber-800/40 dark:bg-amber-950/10'
                            : 'border-stone-200/80 bg-stone-50/40 dark:border-stone-800 dark:bg-stone-800/20'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-200 text-xs font-bold text-stone-700 dark:bg-stone-700 dark:text-stone-200">
                              {idx + 1}
                            </span>
                            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                              {q.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2">
                            {q.isCriticalGate && (
                              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-300/50 dark:border-amber-700/50">
                                <AlertTriangle className="h-3 w-3 text-amber-600" />
                                CRITICAL GATE ({q.points} pts)
                              </span>
                            )}
                            {!q.isCriticalGate && (
                              <span className="rounded bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                                {q.points} pts
                              </span>
                            )}
                          </div>
                        </div>

                        {q.isCriticalGate && q.gateDescription && (
                          <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-amber-100/70 p-2.5 text-[11px] text-amber-900 dark:bg-amber-950/50 dark:text-amber-300">
                            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />
                            <span>{q.gateDescription}</span>
                          </div>
                        )}

                        <p className="mt-3 text-xs font-medium leading-relaxed text-stone-800 dark:text-stone-200">
                          {q.question}
                        </p>

                        {/* Options */}
                        <div className="mt-4 space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selected === optIdx;

                            let optionClasses =
                              'flex items-start gap-3 rounded-lg border p-3 text-xs transition-all cursor-pointer ';

                            if (hasSubmitted) {
                              if (optIdx === q.correctIndex) {
                                optionClasses +=
                                  'border-emerald-500 bg-emerald-50/70 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-200 font-semibold';
                              } else if (isSelected && !isCorrect) {
                                optionClasses +=
                                  'border-red-400 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200';
                              } else {
                                optionClasses +=
                                  'border-stone-200 bg-white opacity-60 dark:border-stone-800 dark:bg-stone-900 text-stone-600 dark:text-stone-400';
                              }
                            } else {
                              if (isSelected) {
                                optionClasses +=
                                  'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-medium dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200';
                              } else {
                                optionClasses +=
                                  'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800';
                              }
                            }

                            return (
                              <label
                                key={optIdx}
                                className={optionClasses}
                                onClick={() => !hasSubmitted && handleSelectOption(q.id, optIdx)}
                              >
                                <input
                                  type="radio"
                                  name={`question-${q.id}`}
                                  checked={isSelected}
                                  onChange={() => !hasSubmitted && handleSelectOption(q.id, optIdx)}
                                  disabled={hasSubmitted}
                                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="flex-1 leading-relaxed">{opt}</span>
                                {hasSubmitted && optIdx === q.correctIndex && (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                )}
                                {hasSubmitted && isSelected && !isCorrect && (
                                  <XCircle className="h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
                                )}
                              </label>
                            );
                          })}
                        </div>

                        {/* Explanation on Submission */}
                        {hasSubmitted && (
                          <div className="mt-3 rounded-lg bg-stone-100 p-3 text-[11px] leading-relaxed text-stone-700 dark:bg-stone-800/70 dark:text-stone-300">
                            <strong>Explanation:</strong> {q.explanation}
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

        {/* Sticky/Bottom Submission Action Bar */}
        <div className="sticky bottom-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl dark:border-stone-800 dark:bg-stone-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-stone-800 dark:text-stone-200">
                Assessment Status: {answeredCount} of {totalQuestions} Questions Answered
              </div>
              <p className="text-[11px] text-stone-500">
                Passing required: 75/100 points + Both Critical Gates. All questions must be completed.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={answeredCount < totalQuestions}
              className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold transition-all ${
                answeredCount === totalQuestions
                  ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                  : 'cursor-not-allowed bg-stone-200 text-stone-400 dark:bg-stone-800 dark:text-stone-600'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>
                {hasSubmitted ? 'Re-Evaluate Submission' : 'Submit Assessment for Grading'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
