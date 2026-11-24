import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DesignLabPage } from '../pages/DesignLabPage';
import { resetToDefaultBlueprints } from '../lib/designLab/blueprintStorage';

describe('Design Lab UI: Interactive Studio Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    resetToDefaultBlueprints();
  });

  it('renders the Design Lab studio with top toolbar, profile selector, and default blueprint', () => {
    render(
      <MemoryRouter>
        <DesignLabPage />
      </MemoryRouter>
    );

    // Verify studio badges & title
    expect(screen.getByText('Phase 8 Studio')).toBeInTheDocument();
    expect(screen.getByText('Simulated SAP Environment')).toBeInTheDocument();

    // Verify Blueprint Switcher button
    expect(screen.getByRole('button', { name: /Manage Architecture Blueprints/i })).toBeInTheDocument();
    expect(screen.getByText('Basic CAP + HANA Application')).toBeInTheDocument();

    // Verify Target Deployment Profile selector
    const profileSelect = screen.getByLabelText('Select Target Deployment Profile');
    expect(profileSelect).toBeInTheDocument();

    // Verify View Switcher Tabs
    expect(screen.getByRole('button', { name: /^Canvas$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Validation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /MTA YAML/i })).toBeInTheDocument();
  });

  it('renders interactive architecture canvas with nodes for Blueprint 1', () => {
    render(
      <MemoryRouter>
        <DesignLabPage />
      </MemoryRouter>
    );

    // Verify nodes from Blueprint 1 are present on canvas
    expect(screen.getAllByText('User / Browser').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SAP CAP Service').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SAP HANA Cloud').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SAP XSUAA Service').length).toBeGreaterThan(0);

    // Verify Canvas Controls (+, -, Fit, Reset)
    expect(screen.getByTitle('Zoom In (+)')).toBeInTheDocument();
    expect(screen.getByTitle('Zoom Out (-)')).toBeInTheDocument();
    expect(screen.getByTitle('Reset Zoom to 100%')).toBeInTheDocument();
  });

  it('switches to Validation view and displays architecture health assessment', () => {
    render(
      <MemoryRouter>
        <DesignLabPage />
      </MemoryRouter>
    );

    // Click Validation tab
    const validationTab = screen.getByRole('button', { name: /Validation/i });
    fireEvent.click(validationTab);

    // Verify validation dashboard rendered
    expect(screen.getByText('Architecture Validator')).toBeInTheDocument();
    expect(screen.getByText('Valid Architecture')).toBeInTheDocument();
  });

  it('switches to MTA YAML view and displays valid deployment manifest', () => {
    render(
      <MemoryRouter>
        <DesignLabPage />
      </MemoryRouter>
    );

    // Click MTA YAML tab
    const mtaTab = screen.getByRole('button', { name: /MTA YAML/i });
    fireEvent.click(mtaTab);

    // Verify MTA generator panel
    expect(screen.getByText('Generated MTA Deployment Descriptor')).toBeInTheDocument();

    // Verify validation badges
    expect(screen.getByText(/Structurally Validated/i)).toBeInTheDocument();
    expect(screen.getByText(/Semantically Validated/i)).toBeInTheDocument();

    // Verify export buttons
    expect(screen.getByRole('button', { name: /Copy mta\.yaml to clipboard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download mta\.yaml file/i })).toBeInTheDocument();
  });

  it('opens Blueprint Manager modal and allows inspecting template blueprints', () => {
    render(
      <MemoryRouter>
        <DesignLabPage />
      </MemoryRouter>
    );

    // Open manager modal
    const manageBtn = screen.getByRole('button', { name: /Manage Architecture Blueprints/i });
    fireEvent.click(manageBtn);

    // Verify modal elements
    expect(screen.getByText('Manage Architecture Blueprints')).toBeInTheDocument();
    expect(screen.getByText(/Fiori \+ CAP Enterprise Application/i)).toBeInTheDocument();
    expect(screen.getByText(/CAP \+ External API Integration/i)).toBeInTheDocument();

    // Verify action buttons
    expect(screen.getByRole('button', { name: /Create New Blueprint/i })).toBeInTheDocument();
    expect(screen.getByText(/Import JSON/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset to Defaults/i })).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Manage Architecture Blueprints')).not.toBeInTheDocument();
  });

  it('switches blueprint to Blueprint 2 (Fiori + CAP) via manager modal', () => {
    render(
      <MemoryRouter>
        <DesignLabPage />
      </MemoryRouter>
    );

    // Open manager modal
    const manageBtn = screen.getByRole('button', { name: /Manage Architecture Blueprints/i });
    fireEvent.click(manageBtn);

    // Click on Open button for Blueprint 2 card
    const openButtons = screen.getAllByRole('button', { name: /^Open$/i });
    expect(openButtons.length).toBeGreaterThan(0);
    const targetButton = openButtons[0];
    expect(targetButton).toBeDefined();
    if (!targetButton) throw new Error('No open button found');
    fireEvent.click(targetButton);

    // Modal closes and current blueprint updates
    expect(screen.getAllByText('Fiori + CAP Enterprise Application').length).toBeGreaterThan(0);

    // Canvas now shows SAP Fiori Application
    expect(screen.getAllByText('SAP Fiori Application').length).toBeGreaterThan(0);
    expect(screen.getAllByText('App Router').length).toBeGreaterThan(0);
  });
});
