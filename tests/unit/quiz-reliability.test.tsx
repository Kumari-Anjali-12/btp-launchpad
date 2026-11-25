import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Quiz } from '../../src/components/learning/Quiz';
import { QuizQuestion } from '../../src/types/curriculum';

const mockQuestions: [QuizQuestion, QuizQuestion, QuizQuestion] = [
  {
    id: 'q1',
    question: 'What is SAP BTP?',
    options: [
      { id: 'q1-opt1', text: 'A database only', isCorrect: false, explanation: 'Incorrect: BTP is a full platform.' },
      { id: 'q1-opt2', text: 'Business Technology Platform', isCorrect: true, explanation: 'Correct: BTP provides integrated cloud services.' },
      { id: 'q1-opt3', text: 'An operating system', isCorrect: false, explanation: 'Incorrect: BTP is not an OS.' },
    ],
  },
  {
    id: 'q2',
    question: 'What is Clean Core?',
    options: [
      { id: 'q2-opt1', text: 'Side-by-side cloud extensibility', isCorrect: true, explanation: 'Correct: Keeps standard ERP pristine.' },
      { id: 'q2-opt2', text: 'Modifying standard SAP code directly', isCorrect: false, explanation: 'Incorrect: Direct modification breaks Clean Core.' },
    ],
  },
  {
    id: 'q3',
    question: 'Which tool packages MTA archives?',
    options: [
      { id: 'q3-opt1', text: 'Webpack', isCorrect: false, explanation: 'Incorrect: Webpack packages JS modules.' },
      { id: 'q3-opt2', text: 'Cloud MTA Build Tool (mbt)', isCorrect: true, explanation: 'Correct: mbt packages multi-target apps.' },
    ],
  },
];

describe('Work Package 2: Quiz Reliability & Explanation Accessibility', () => {
  it('renders interactive radiogroup landmarks with accessible labels', () => {
    const handleSubmit = vi.fn();
    render(<Quiz questions={mockQuestions} chapterId="mod-0-1" onQuizSubmit={handleSubmit} />);

    const radioGroups = screen.getAllByRole('radiogroup');
    expect(radioGroups).toHaveLength(3);
    expect(radioGroups[0]).toHaveAttribute('aria-labelledby', 'question-title-q1');
  });

  it('keeps submit button disabled until all 3 questions are answered', () => {
    const handleSubmit = vi.fn();
    render(<Quiz questions={mockQuestions} chapterId="mod-0-1" onQuizSubmit={handleSubmit} />);

    const submitBtn = screen.getByRole('button', { name: /Submit Knowledge Check/i });
    expect(submitBtn).toBeDisabled();

    // Answer Q1
    fireEvent.click(screen.getByLabelText(/Business Technology Platform/i));
    expect(submitBtn).toBeDisabled();

    // Answer Q2
    fireEvent.click(screen.getByLabelText(/Side-by-side cloud extensibility/i));
    expect(submitBtn).toBeDisabled();

    // Answer Q3
    fireEvent.click(screen.getByLabelText(/Cloud MTA Build Tool/i));
    expect(submitBtn).toBeEnabled();
  });

  it('calculates perfect score (3/3), updates status live region, and calls onQuizSubmit', () => {
    const handleSubmit = vi.fn();
    render(<Quiz questions={mockQuestions} chapterId="mod-0-1" onQuizSubmit={handleSubmit} />);

    fireEvent.click(screen.getByLabelText(/Business Technology Platform/i));
    fireEvent.click(screen.getByLabelText(/Side-by-side cloud extensibility/i));
    fireEvent.click(screen.getByLabelText(/Cloud MTA Build Tool/i));

    fireEvent.click(screen.getByRole('button', { name: /Submit Knowledge Check/i }));

    expect(handleSubmit).toHaveBeenCalledWith(3, 3, {
      q1: 'q1-opt2',
      q2: 'q2-opt1',
      q3: 'q3-opt2',
    });

    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toHaveTextContent('Score: 3 / 3 (Passed!)');
    expect(statusRegion).toHaveAttribute('aria-live', 'polite');
  });

  it('allows retrying an already passed quiz without immediately re-locking into submitted state', () => {
    const handleSubmit = vi.fn();
    const { rerender } = render(
      <Quiz
        questions={mockQuestions}
        chapterId="mod-0-1"
        onQuizSubmit={handleSubmit}
        savedScore={3}
        savedPassed={true}
        savedAnswers={{ q1: 'q1-opt2', q2: 'q2-opt1', q3: 'q3-opt2' }}
      />
    );

    // Initial state is submitted and passed
    expect(screen.getByRole('status')).toHaveTextContent('Score: 3 / 3 (Passed!)');
    const retryBtn = screen.getByRole('button', { name: /Retry Knowledge Check/i });
    expect(retryBtn).toBeInTheDocument();

    // Click retry
    fireEvent.click(retryBtn);

    // Now it must NOT be submitted, and submit button must be disabled until new answers are selected
    const submitBtn = screen.getByRole('button', { name: /Submit Knowledge Check/i });
    expect(submitBtn).toBeDisabled();

    // Rerender with same props (e.g., parent state update during retry)
    rerender(
      <Quiz
        questions={mockQuestions}
        chapterId="mod-0-1"
        onQuizSubmit={handleSubmit}
        savedScore={3}
        savedPassed={true}
        savedAnswers={{ q1: 'q1-opt2', q2: 'q2-opt1', q3: 'q3-opt2' }}
      />
    );

    // CRITICAL BUG VERIFICATION: It should STAY in retry mode, not bounce back to submitted!
    expect(screen.getByRole('button', { name: /Submit Knowledge Check/i })).toBeInTheDocument();
  });
});
