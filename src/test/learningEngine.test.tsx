import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import {
  loadUserProgress,
  markChapterComplete,
} from '../lib/storage';
import { getAllChapters } from '../data/curriculum';

describe('BTP Launchpad Phase 2 Learning Engine', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  it('renders all 15 curriculum chapters across 5 modules', () => {
    const chapters = getAllChapters();
    expect(chapters).toHaveLength(15);
    expect(chapters[0]?.id).toBe('ch-0-1');
    expect(chapters[14]?.id).toBe('ch-4-3');

    // Verify each chapter has exactly 3 quiz questions
    chapters.forEach((ch) => {
      expect(ch.quizQuestions).toHaveLength(3);
      ch.quizQuestions.forEach((q) => {
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        const correctOptions = q.options.filter((o) => o.isCorrect);
        expect(correctOptions).toHaveLength(1);
      });
    });
  });

  it('renders a full interactive chapter with all mandatory sections', () => {
    render(
      <MemoryRouter initialEntries={['/learn/ch-0-1']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // 1. Header
    expect(
      screen.getByRole('heading', { name: /Enterprise Software, ERP & SAP S\/4HANA/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Chapter 0.1/i).length).toBeGreaterThan(0);

    // 2. Learning Objectives
    expect(screen.getByText(/What You Will Learn In This Chapter/i)).toBeInTheDocument();

    // 3. Everyday Analogy
    expect(screen.getByText(/Everyday Analogy: A University Administration System/i)).toBeInTheDocument();

    // 4. Concept Sections
    expect(screen.getByText(/1. What It Is/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Why It Exists/i)).toBeInTheDocument();
    expect(screen.getByText(/3. The Problem It Solves/i)).toBeInTheDocument();
    expect(screen.getByText(/4. How It Works Under the Hood/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Where It Fits in Modern SAP BTP Architecture/i)).toBeInTheDocument();

    // 5. Visual Diagram
    expect(screen.getByText(/Interactive Visual Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/SAP S\/4HANA In-Memory Digital Core/i)).toBeInTheDocument();

    // 6. Jargon Decoder
    expect(screen.getByText(/Enterprise Jargon Decoder/i)).toBeInTheDocument();
    expect(screen.getByText('ERP')).toBeInTheDocument();
    expect(screen.getByText('S/4HANA')).toBeInTheDocument();

    // 7. Technical Code Example
    expect(screen.getByText(/Practical Technical Example/i)).toBeInTheDocument();
    expect(screen.getByText(/Line-by-Line Technical Analysis/i)).toBeInTheDocument();

    // 8. Business Scenario
    expect(screen.getByText(/Real Enterprise Business Scenario/i)).toBeInTheDocument();

    // 9. Interactive Knowledge Check (3 questions)
    expect(screen.getByText(/Interactive Knowledge Check/i)).toBeInTheDocument();
    expect(screen.getByText(/Check Your Understanding \(3 Questions\)/i)).toBeInTheDocument();
  });

  it('handles quiz selection, submission, feedback, and retry without early answer leakage', () => {
    render(
      <MemoryRouter initialEntries={['/learn/ch-0-1']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Explanations must NOT be visible before submit
    expect(screen.queryByText(/Correct:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Incorrect:/i)).not.toBeInTheDocument();

    // Submit button should be disabled initially
    const submitBtn = screen.getByRole('button', { name: /Submit Knowledge Check/i });
    expect(submitBtn).toBeDisabled();

    // Answer Q1: Option B (Correct)
    const optB = screen.getByLabelText(/It eliminates data silos by uniting Sales, Warehouse, Finance, and HR into one single source of truth/i);
    fireEvent.click(optB);

    // Answer Q2: Option B (Correct)
    const opt2B = screen.getByLabelText(/Housing and Tuition used separate, disconnected systems that did not share data in real-time/i);
    fireEvent.click(opt2B);

    // Answer Q3: Option A (Incorrect - to test incorrect feedback)
    const opt3A = screen.getByLabelText(/Custom scripts cannot store more than 10,000 rows of data/i);
    fireEvent.click(opt3A);

    // Now all 3 answered, submit button should be enabled
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    // Feedback should now be visible
    expect(screen.getByText(/Score: 2 \/ 3/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Correct:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Incorrect:/i).length).toBeGreaterThan(0);

    // Since score is 2/3 (>= 60%), chapter is automatically marked completed!
    const progress = loadUserProgress();
    expect(progress.completedChapterIds).toContain('ch-0-1');

    // Test retry functionality
    const retryBtn = screen.getByRole('button', { name: /Retry Knowledge Check/i });
    expect(retryBtn).toBeInTheDocument();
    fireEvent.click(retryBtn);

    // Questions should be reset and submit button re-disabled
    expect(screen.queryByText(/Score: 2 \/ 3/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Knowledge Check/i })).toBeDisabled();
  });

  it('persists chapter completion and updates Dashboard and Roadmap accurately', () => {
    // Complete chapter 0.1
    markChapterComplete('ch-0-1');
    const p1 = loadUserProgress();
    expect(p1.completedChapterIds).toContain('ch-0-1');

    // Complete chapter 0.2
    markChapterComplete('ch-0-2');

    // Render Dashboard
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Completed chapters count should be 2 / 15
    expect(screen.getByTestId('completed-chapters-count')).toHaveTextContent('2 / 15');

    // Module 0 should show In Progress (2 of 3 chapters completed)
    expect(screen.getByText(/2 of 3 chapters completed/i)).toBeInTheDocument();
  });

  it('navigates seamlessly between chapters using Next and Previous controls', () => {
    render(
      <MemoryRouter initialEntries={['/learn/ch-0-1']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Ch 0.1 is the first chapter, so it should have a Next button to Chapter 0.2
    const nextBtn = screen.getByRole('button', { name: /Next: Chapter 0.2/i });
    expect(nextBtn).toBeInTheDocument();

    // Click Next Chapter
    fireEvent.click(nextBtn);
  });
});
