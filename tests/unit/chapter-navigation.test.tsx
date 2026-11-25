import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChapterNavigation } from '../../src/components/learning/ChapterNavigation';

describe('Work Package 4: ChapterNavigation Labels & Accessibility', () => {
  it('formats modern syllabus modules with code correctly without undefined', () => {
    render(
      <MemoryRouter>
        <ChapterNavigation
          prevChapter={{ id: 'mod-0-1', code: '0.1', title: 'SAP World Basics' }}
          nextChapter={{ id: 'mod-0-3', code: '0.3', title: 'ERP Evolution' }}
          moduleId="phase-0"
        />
      </MemoryRouter>
    );

    const prevBtn = screen.getByRole('button', { name: /Previous: Module 0.1/i });
    expect(prevBtn).toBeInTheDocument();
    expect(prevBtn).not.toHaveTextContent('undefined');

    const nextBtn = screen.getByRole('button', { name: /Next: Module 0.3/i });
    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).not.toHaveTextContent('undefined');
  });

  it('formats legacy chapters with number prefix', () => {
    render(
      <MemoryRouter>
        <ChapterNavigation
          prevChapter={{ id: 'ch-1-1', number: '1.1', title: 'CDS Modeling' }}
          nextChapter={{ id: 'ch-1-3', number: '1.3', title: 'CAP Handlers' }}
          moduleId="module-1"
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Previous: Chapter 1.1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next: Chapter 1.3/i })).toBeInTheDocument();
  });

  it('falls back to title when neither code nor number is present', () => {
    render(
      <MemoryRouter>
        <ChapterNavigation
          prevChapter={{ id: 'intro', title: 'Introduction to BTP' }}
          nextChapter={{ id: 'conclusion', title: 'Capstone Project' }}
          moduleId="phase-0"
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Previous: Introduction to BTP/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next: Capstone Project/i })).toBeInTheDocument();
  });

  it('provides accessible navigation landmark', () => {
    render(
      <MemoryRouter>
        <ChapterNavigation moduleId="module-0" />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation', { name: /Lesson progression navigation/i });
    expect(nav).toBeInTheDocument();
  });
});
