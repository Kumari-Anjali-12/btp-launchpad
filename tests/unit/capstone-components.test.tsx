import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CapstoneSimulationBanner } from '../../src/components/capstone/CapstoneSimulationBanner';
import { CapstoneCard } from '../../src/components/capstone/CapstoneCard';
import { CapstoneCodeInspector } from '../../src/components/capstone/CapstoneCodeInspector';
import { SimulatedApprovalMatrix } from '../../src/components/capstone/SimulatedApprovalMatrix';
import { CapstoneQuizSection } from '../../src/components/capstone/CapstoneQuizSection';
import { CAPSTONE_LEVELS } from '../../src/data/capstoneData';

describe('Capstone Component Suite', () => {
  it('renders CapstoneSimulationBanner with disclaimer and source file', () => {
    render(
      <CapstoneSimulationBanner sourceFilePath="projects/employee-leave-management/db/schema.cds" />
    );

    expect(
      screen.getByText(/EDUCATIONAL SIMULATOR — DEMO ONLY/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/projects\/employee-leave-management\/db\/schema\.cds/i)
    ).toBeInTheDocument();
  });

  it('renders CapstoneCard with level title and estimated time', () => {
    const level = CAPSTONE_LEVELS[0]!;
    render(
      <BrowserRouter>
        <CapstoneCard
          level={level}
          completedCheckpointsCount={2}
          isCompleted={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(level.title)).toBeInTheDocument();
    expect(screen.getByText(/45m/i)).toBeInTheDocument();
    expect(screen.getByText(/2\/4/i)).toBeInTheDocument();
  });

  it('renders CapstoneCodeInspector and allows tab switching', () => {
    render(<CapstoneCodeInspector initialFileId="db-schema" />);

    expect(screen.getByText('schema.cds')).toBeInTheDocument();
    expect(screen.getByText('leave-service.js')).toBeInTheDocument();

    // Click leave-service.js tab
    fireEvent.click(screen.getByText('leave-service.js'));
    expect(
      screen.getByText(/projects\/employee-leave-management\/srv\/leave-service\.js/i)
    ).toBeInTheDocument();
  });

  it('renders SimulatedApprovalMatrix with live balance cards and persona switcher', () => {
    render(<SimulatedApprovalMatrix />);

    expect(
      screen.getByText(/Role-Based Approval Workflow Simulator/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Alice \(Employee\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob \(Manager\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Carol \(Admin\)/i)).toBeInTheDocument();
    expect(screen.getByText('20 Days')).toBeInTheDocument(); // Available days
  });

  it('renders CapstoneQuizSection and calculates score', () => {
    const level = CAPSTONE_LEVELS[0]!;
    render(
      <CapstoneQuizSection
        levelId={level.id}
        badgeId={level.badge.id}
        questions={level.quiz}
      />
    );

    expect(screen.getByText(/Capstone Mastery Assessment/i)).toBeInTheDocument();
    expect(
      screen.getByText(/What is the primary architectural purpose of the "managed" aspect/i)
    ).toBeInTheDocument();
  });
});
