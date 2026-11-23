import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import { getAllPhases, getAllModules } from '../data/curriculum';
import { markChapterComplete, resetUserProgress } from '../lib/storage';

describe('Roadmap UX Redesign: Guided Learning Journey', () => {
  beforeEach(() => {
    localStorage.clear();
    resetUserProgress();
  });

  it('renders all nine phases in correct sequential order on the Guided Learning Journey', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const phases = getAllPhases();
    expect(phases).toHaveLength(9);

    // Verify all 9 phases appear on the page with headings
    phases.forEach((phase) => {
      expect(
        screen.getAllByText(new RegExp(`Phase ${phase.number}:`, 'i')).length
      ).toBeGreaterThan(0);
    });

    // Verify "Your Learning Journey" top summary is present
    expect(screen.getByText(/Your Learning Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/0% Curriculum Complete/i)).toBeInTheDocument();
    expect(screen.getByText(/Start with Phase 0/i)).toBeInTheDocument();
  });

  it('verifies all 36 modules are accessible in the Guided Learning Journey when expanded', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Expand All phases to reveal all 36 modules
    const expandAllBtn = screen.getByRole('button', { name: /Expand All/i });
    fireEvent.click(expandAllBtn);

    const allModules = getAllModules();
    expect(allModules).toHaveLength(36);

    // Check a sample of modules across different phases
    expect(screen.getAllByText('SAP World Basics').length).toBeGreaterThan(0); // Phase 0 (mod-0-1)
    expect(screen.getAllByText('Cloud Concepts').length).toBeGreaterThan(0); // Phase 1 (mod-1-1)
    expect(screen.getAllByText('Business Application Studio').length).toBeGreaterThan(0); // Phase 2 (mod-2-1)
    expect(screen.getAllByText('CAP Fundamentals').length).toBeGreaterThan(0); // Phase 3 (mod-3-1)
    expect(screen.getAllByText('Fiori Elements (first)').length).toBeGreaterThan(0); // Phase 4 (mod-4-1)
    expect(screen.getAllByText('Authentication').length).toBeGreaterThan(0); // Phase 5 (mod-5-1)
    expect(screen.getAllByText('MTA Deployment').length).toBeGreaterThan(0); // Phase 6 (mod-6-1)
    expect(screen.getAllByText('SAP Business AI Overview').length).toBeGreaterThan(0); // Phase 7 (mod-7-1)
    expect(screen.getAllByText('Capstone: AI + CAP App').length).toBeGreaterThan(0); // Phase 8 (mod-8-1)
  });

  it('supports Expand All, Collapse All, and individual phase accordion toggling', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Initial state: Phase 0 is expanded by default
    expect(screen.getAllByText('SAP World Basics').length).toBeGreaterThan(0);

    // Collapse All
    const collapseAllBtn = screen.getByRole('button', { name: /Collapse All/i });
    fireEvent.click(collapseAllBtn);

    // Modules under Phase 0 should not be visible when collapsed
    expect(screen.queryByText('SAP World Basics')).not.toBeInTheDocument();

    // Toggle Phase 0 individually using its expand button
    const expandPhase0Btn = screen.getByRole('button', { name: /Expand Phase 0/i });
    fireEvent.click(expandPhase0Btn);

    // Phase 0 modules should now be visible again
    expect(screen.getAllByText('SAP World Basics').length).toBeGreaterThan(0);
  });

  it('provides direct route navigation to the learning workspace for modules', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Expand All
    fireEvent.click(screen.getByRole('button', { name: /Expand All/i }));

    // The next recommended module (0.1) has a direct continue link
    const nextModuleLink = screen.getAllByRole('link', { name: /Continue/i })[0];
    expect(nextModuleLink).toHaveAttribute('href', '/learn/mod-0-1');

    // Subsequent modules have Start Module links
    const startLinks = screen.getAllByRole('link', { name: /Start Module/i });
    expect(startLinks.length).toBeGreaterThan(0);
    expect(startLinks[0]).toHaveAttribute('href', '/learn/mod-0-2');
  });

  it('displays actual progress and updates dynamic completion states', () => {
    markChapterComplete('mod-0-1');
    markChapterComplete('mod-0-2');

    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Summary reflects completed modules (2 / 36)
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    expect(screen.getByText('/ 36')).toBeInTheDocument();

    // Next recommended button reflects next unfinished module
    expect(screen.getByText(/Continue Learning \(0\.3\)/i)).toBeInTheDocument();

    // Expand All to ensure badges are visible
    fireEvent.click(screen.getByRole('button', { name: /Expand All/i }));

    // Completed badges exist
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(2);
  });

  it('explains prerequisites and downstream unlocks in plain English for beginners', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Expand All
    fireEvent.click(screen.getByRole('button', { name: /Expand All/i }));

    // Verify plain-English dependency labels
    expect(screen.getAllByText(/What you need before starting:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/What this prepares you for:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/None \(Foundation topic — start here\)/i).length).toBeGreaterThan(0);
  });

  it('associates practical drills and guided projects within the relevant phase under Apply What You Learned', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Expand All
    fireEvent.click(screen.getByRole('button', { name: /Expand All/i }));

    // Verify "Apply What You Learned" sections exist
    const applySections = screen.getAllByText(/Apply What You Learned/i);
    expect(applySections.length).toBeGreaterThan(0);

    // Phase 0 has OData Explorer drill
    expect(screen.getByText(/Querying Data with \$select and \$filter/i)).toBeInTheDocument();

    // Phase 3 has CDS Modeler drill and Guided Project
    expect(screen.getByText(/Define Your First CDS Entity/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Leave & Expense Tracker/i)).toBeInTheDocument();
  });

  it('supports in-journey search filtering and category pills', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search modules, concepts, or exercises\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'Vector Engine' } });

    // Matching module in Phase 7 should be visible
    expect(screen.getAllByText(/HANA Vector Engine and RAG/i).length).toBeGreaterThan(0);
    // Unmatched Phase 0 module should not be in the document
    expect(screen.queryByText('SAP World Basics')).not.toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });

    // Filter by Practice Drills only
    const practiceFilterBtn = screen.getByRole('button', { name: /Practice Drills \(15\)/i });
    fireEvent.click(practiceFilterBtn);

    // Theory modules should be hidden
    expect(screen.queryByText(/Theory & Guided Modules/i)).not.toBeInTheDocument();
    // Practice drills should remain visible
    expect(screen.getAllByText(/Launch Drill/i).length).toBeGreaterThan(0);
  });

  it('allows switching seamlessly to Advanced Dependency Map, Pace Calculator, and Capstones', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Switch to Advanced Dependency Map
    const advMapBtn = screen.getByRole('button', { name: /Visual Dependency Graph/i });
    fireEvent.click(advMapBtn);
    expect(screen.getByText(/How to Read the Advanced Dependency Map:/i)).toBeInTheDocument();
    expect(screen.getByTitle('Zoom In')).toBeInTheDocument();

    // Switch to Pace Calculator
    const paceBtn = screen.getByRole('button', { name: /Pace & Timeline Calculator/i });
    fireEvent.click(paceBtn);
    expect(screen.getByText(/Personal Pace & Schedule Calculator/i)).toBeInTheDocument();

    // Switch to 9 Capstone Deliverables
    const capstonesBtn = screen.getByRole('button', { name: /9 Capstone Deliverables/i });
    fireEvent.click(capstonesBtn);
    expect(screen.getByText(/Syllabus Capstone Requirements/i)).toBeInTheDocument();
  });
});
