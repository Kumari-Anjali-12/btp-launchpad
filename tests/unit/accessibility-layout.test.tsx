import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ShellLayout } from '../../src/components/layout/ShellLayout';
import { Header } from '../../src/components/layout/Header';

describe('Work Package 5: Accessibility & Keyboard Navigation', () => {
  it('renders skip-to-content bypass link pointing to #main-content', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route element={<ShellLayout />}>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const skipLink = screen.getByRole('link', { name: /Skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders main landmark with id="main-content" and tabIndex={-1} for focus bypass', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route element={<ShellLayout />}>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('tabindex', '-1');
  });

  it('provides accessible navigation landmarks and status labels in Header', () => {
    render(
      <MemoryRouter>
        <Header onToggleMobileNav={() => {}} isMobileNavOpen={false} />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation', { name: /Main Navigation/i });
    expect(nav).toBeInTheDocument();

    const streakStatus = screen.getByLabelText(/learning streak/i);
    expect(streakStatus).toBeInTheDocument();

    const langStatus = screen.getByLabelText(/Active language: English/i);
    expect(langStatus).toBeInTheDocument();
  });
});
