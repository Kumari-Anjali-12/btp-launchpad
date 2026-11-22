import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import { CURRICULUM_MODULES } from '../data/curriculum';

describe('BTP Launchpad Application Shell & Routes', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
  });

  it('renders landing page with product identity, value proposition and CTAs', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Master SAP BTP Development Without Enterprise Gatekeeping/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Start Learning Free/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore 5-Module Roadmap/i)).toBeInTheDocument();
    expect(screen.getByText(/From Zero to BTP Cloud Engineer in 5 Modules/i)).toBeInTheDocument();
  });

  it('renders dashboard with honest zero-progress state for new learners', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Welcome to your BTP Learning Journey/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('overall-percent')).toHaveTextContent('0%');
    expect(screen.getByText(/Start Learning/i)).toBeInTheDocument();
    expect(screen.getByText(/Curriculum Modules/i)).toBeInTheDocument();
  });

  it('renders roadmap with all five modules', () => {
    render(
      <MemoryRouter initialEntries={['/roadmap']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /BTP Learning Roadmap/i })
    ).toBeInTheDocument();

    for (const module of CURRICULUM_MODULES) {
      expect(screen.getByText(module.title)).toBeInTheDocument();
    }
  });

  it('renders chapter overview page with module sections', () => {
    render(
      <MemoryRouter initialEntries={['/chapters']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Learning Chapters Overview/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Enterprise and SAP 101/i)).toBeInTheDocument();
    expect(screen.getByText(/SAP CAP Development/i)).toBeInTheDocument();
  });

  it('renders module detail page and toggles chapter completion', () => {
    render(
      <MemoryRouter initialEntries={['/chapters/module-0']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Enterprise and SAP 101/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The ERP Revolution & Enterprise Reality/i)
    ).toBeInTheDocument();

    // Find and click the toggle completion button for Chapter 0.1
    const markButtons = screen.getAllByRole('button', { name: /Mark as Completed/i });
    expect(markButtons.length).toBeGreaterThan(0);
    fireEvent.click(markButtons[0]!);

    // Should now toggle to "Mark as Incomplete"
    expect(screen.getByRole('button', { name: /Mark as Incomplete/i })).toBeInTheDocument();
  });

  it('renders practice sandboxes introductory page with honest preview', () => {
    render(
      <MemoryRouter initialEntries={['/practice']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Hands-On Practice Sandboxes/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Core Data Services \(CDS\) Sandbox/i)).toBeInTheDocument();
    expect(screen.getByText(/OData v4 Query Explorer/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Simulated SAP Environment/i).length).toBeGreaterThan(0);
  });

  it('renders cheatsheet page with search and category filtering', () => {
    render(
      <MemoryRouter initialEntries={['/cheatsheet']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /SAP Terminology & Cheatsheet/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search terms, acronyms/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloud Application Programming Model/i)).toBeInTheDocument();
  });

  it('renders design lab page with architecture canvas preview', () => {
    render(
      <MemoryRouter initialEntries={['/design-lab']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Visual Architecture Design Lab/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Interactive Architecture Canvas/i)).toBeInTheDocument();
  });

  it('renders career hub page with role blueprints', () => {
    render(
      <MemoryRouter initialEntries={['/career-hub']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /BTP Career Hub & Interview Prep/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/SAP BTP Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/CAP Full-Stack Cloud Engineer/i)).toBeInTheDocument();
  });

  it('toggles theme mode between light and dark', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const darkBtn = screen.getByRole('button', { name: /Dark mode/i });
    fireEvent.click(darkBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    const lightBtn = screen.getByRole('button', { name: /Light mode/i });
    fireEvent.click(lightBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('opens and closes mobile navigation drawer', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const menuBtn = screen.getByRole('button', { name: /Open navigation menu/i });
    fireEvent.click(menuBtn);

    // Mobile nav drawer should now be open
    const mobileNav = screen.getByRole('dialog', { name: /Mobile Navigation/i });
    expect(mobileNav).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close navigation drawer/i });
    fireEvent.click(closeBtn);

    // Mobile nav drawer should be closed
    expect(screen.queryByRole('dialog', { name: /Mobile Navigation/i })).not.toBeInTheDocument();
  });
});
