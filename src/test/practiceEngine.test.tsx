import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { validateCdsCode } from '../lib/practice/cdsValidator';
import { executeODataRequest, resetODataDatabase } from '../lib/practice/odataSimulator';
import { PRACTICE_DRILLS } from '../data/practice/drills';
import { GUIDED_PROJECTS } from '../data/practice/guidedProjects';
import { INDEPENDENT_CHALLENGES } from '../data/practice/challenges';

import {
  loadUserProgress,
  saveUserProgress,
  completeDrill,
  advanceProjectMilestone,
  submitChallenge,
  DEFAULT_PROGRESS_STATE,
} from '../lib/storage';

import { CdsPracticeLab } from '../components/practice/CdsPracticeLab';
import { ODataExplorer } from '../components/practice/ODataExplorer';
import { DrillWorkspace } from '../components/practice/DrillWorkspace';
import { GuidedProjectWorkspace } from '../components/practice/GuidedProjectWorkspace';
import { IndependentChallengeWorkspace } from '../components/practice/IndependentChallengeWorkspace';
import { PracticePage } from '../pages/PracticePage';

describe('Phase 3 Practice Engine & Sandboxes', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveUserProgress({ ...DEFAULT_PROGRESS_STATE });
    resetODataDatabase();
  });

  // ==========================================
  // 1. CDS VALIDATOR TESTS
  // ==========================================
  describe('CDS Syntax & AST Compiler Validator', () => {
    it('successfully parses valid CDS model and compiles to SQL DDL and OData EDMX', () => {
      const code = `namespace sap.launchpad;

entity Books : cuid, managed {
  title : String(100);
  stock : Integer;
  price : Decimal(10, 2);
}
`;
      const result = validateCdsCode(code);
      expect(result.valid).toBe(true);
      expect(result.namespace).toBe('sap.launchpad');
      expect(result.entities).toHaveLength(1);

      const entity = result.entities[0]!;
      expect(entity.name).toBe('Books');
      expect(entity.isAspectCuid).toBe(true);
      expect(entity.isAspectManaged).toBe(true);
      expect(entity.fields).toHaveLength(3);

      // Verify compiled SQL DDL preview
      expect(result.sqlPreview).toContain('CREATE TABLE SAP_LAUNCHPAD_BOOKS');
      expect(result.sqlPreview).toContain('ID NVARCHAR(36) NOT NULL PRIMARY KEY');
      expect(result.sqlPreview).toContain('TITLE NVARCHAR(100)');
      expect(result.sqlPreview).toContain('STOCK INTEGER');
      expect(result.sqlPreview).toContain('PRICE DECIMAL(10, 2)');
      expect(result.sqlPreview).toContain('CREATEDAT TIMESTAMP');

      // Verify compiled OData CSDL preview
      expect(result.odataEdmxPreview).toContain('<EntityType Name="Books">');
      expect(result.odataEdmxPreview).toContain('<Property Name="ID" Type="Edm.Guid" Nullable="false" />');
      expect(result.odataEdmxPreview).toContain('<Property Name="title" Type="Edm.String" />');
    });

    it('identifies syntax errors with accurate line numbers', () => {
      const codeWithErrors = `namespace sap.launchpad;

entity BrokenEntity {
  ID : UUID
  title : InvalidTypeName;
}
`;
      const result = validateCdsCode(codeWithErrors);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);

      const semicolonErr = result.errors.find((e) => e.message.includes('Missing trailing semicolon'));
      expect(semicolonErr).toBeDefined();
      expect(semicolonErr?.line).toBe(4);

      const typeWarning = result.errors.find((e) => e.message.includes('Unknown or unsupported CDS type'));
      expect(typeWarning).toBeDefined();

      const keyWarning = result.errors.find((e) => e.message.includes('has no primary key'));
      expect(keyWarning).toBeDefined();
    });

    it('parses associations and compositions correctly', () => {
      const code = `namespace sap.launchpad;

entity Orders : cuid {
  customer : Association to Customers;
  items    : Composition of many OrderItems on items.order = $self;
}
`;
      const result = validateCdsCode(code);
      expect(result.valid).toBe(true);
      const entity = result.entities[0]!;
      expect(entity.fields).toHaveLength(2);

      const assoc = entity.fields.find((f) => f.name === 'customer');
      expect(assoc?.isAssociation).toBe(true);
      expect(assoc?.target).toBe('Customers');

      const comp = entity.fields.find((f) => f.name === 'items');
      expect(comp?.isComposition).toBe(true);
      expect(comp?.cardinality).toBe('many');
      expect(comp?.target).toBe('OrderItems');
    });
  });

  // ==========================================
  // 2. ODATA SIMULATOR TESTS
  // ==========================================
  describe('OData v4 In-Memory Simulator', () => {
    it('executes GET collection queries with $select and $filter', () => {
      const res = executeODataRequest({
        method: 'GET',
        path: '/odata/v4/catalog/Employees',
        queryParams: {
          $select: 'name,department,salary',
          $filter: "department eq 'Cloud Engineering'",
        },
      });

      expect(res.status).toBe(200);
      expect(res.statusText).toBe('OK');
      const data = res.data as { value: Array<Record<string, unknown>> };
      expect(data.value).toBeDefined();
      expect(data.value.length).toBe(2);
      expect(data.value.every((e) => e.department === 'Cloud Engineering')).toBe(true);
      expect(data.value[0]!.name).toBeDefined();
      expect(data.value[0]!.role).toBeUndefined();
    });

    it('executes GET with $expand navigation', () => {
      const res = executeODataRequest({
        method: 'GET',
        path: '/odata/v4/catalog/LeaveRequests',
        queryParams: {
          $filter: "status eq 'Pending'",
          $expand: 'employee',
        },
      });

      expect(res.status).toBe(200);
      const data = res.data as { value: Array<Record<string, unknown>> };
      expect(data.value.length).toBeGreaterThan(0);
      const first = data.value[0]!;
      expect(first.status).toBe('Pending');
      expect(first.employee).toBeDefined();
      expect((first.employee as Record<string, unknown>).name).toBeDefined();
    });

    it('handles POST, PATCH, and DELETE operations', () => {
      // 1. POST
      const postRes = executeODataRequest({
        method: 'POST',
        path: '/odata/v4/catalog/LeaveRequests',
        body: JSON.stringify({
          employee_ID: 'e101',
          startDate: '2027-03-01',
          endDate: '2027-03-05',
          leaveType: 'Vacation',
          days: 4,
          status: 'Pending',
          comments: 'Spring holidays',
        }),
      });

      expect(postRes.status).toBe(201);
      expect(postRes.headers.location).toBeDefined();
      const createdItem = postRes.data as { ID: string; comments: string };
      const createdId = createdItem.ID;
      expect(createdId).toBeDefined();

      // 2. PATCH
      const patchRes = executeODataRequest({
        method: 'PATCH',
        path: `/odata/v4/catalog/LeaveRequests('${createdId}')`,
        body: JSON.stringify({
          status: 'Approved',
        }),
      });

      expect(patchRes.status).toBe(200);
      const updatedItem = patchRes.data as { status: string };
      expect(updatedItem.status).toBe('Approved');

      // 3. DELETE
      const deleteRes = executeODataRequest({
        method: 'DELETE',
        path: `/odata/v4/catalog/LeaveRequests('${createdId}')`,
      });

      expect(deleteRes.status).toBe(204);

      // Verify deletion
      const getDeleted = executeODataRequest({
        method: 'GET',
        path: `/odata/v4/catalog/LeaveRequests('${createdId}')`,
      });
      expect(getDeleted.status).toBe(404);
    });

    it('simulates security failure codes 401 and 403 accurately', () => {
      const res401 = executeODataRequest({
        method: 'GET',
        path: '/odata/v4/catalog/Employees',
        queryParams: { simulateAuth: '401' },
      });
      expect(res401.status).toBe(401);
      expect(res401.statusText).toBe('Unauthorized');

      const res403 = executeODataRequest({
        method: 'GET',
        path: '/odata/v4/catalog/Employees',
        queryParams: { simulateAuth: '403' },
      });
      expect(res403.status).toBe(403);
      expect(res403.statusText).toBe('Forbidden');
    });
  });

  // ==========================================
  // 3. CURRICULUM & CATALOG INTEGRITY
  // ==========================================
  describe('Practice Curriculum Catalog Integrity', () => {
    it('contains all 15 foundation drills with complete instructional metadata', () => {
      expect(PRACTICE_DRILLS).toHaveLength(15);

      const cdsDrills = PRACTICE_DRILLS.filter((d) => d.category === 'cds');
      const odataDrills = PRACTICE_DRILLS.filter((d) => d.category === 'odata');
      const secDrills = PRACTICE_DRILLS.filter((d) => d.category === 'security');
      const debugDrills = PRACTICE_DRILLS.filter((d) => d.category === 'debugging');

      expect(cdsDrills.length).toBeGreaterThanOrEqual(4);
      expect(odataDrills.length).toBeGreaterThanOrEqual(4);
      expect(secDrills.length).toBeGreaterThanOrEqual(3);
      expect(debugDrills.length).toBeGreaterThanOrEqual(4);

      PRACTICE_DRILLS.forEach((d) => {
        expect(d.id).toBeTruthy();
        expect(d.title).toBeTruthy();
        expect(d.starterCode).toBeTruthy();
        expect(d.solutionCode).toBeTruthy();
        expect(d.validationRules.length).toBeGreaterThan(0);
        expect(d.hints.length).toBeGreaterThan(0);
        expect(d.explanation).toBeTruthy();
      });
    });

    it('contains all 3 guided enterprise projects with 4 milestones each', () => {
      expect(GUIDED_PROJECTS).toHaveLength(3);

      GUIDED_PROJECTS.forEach((proj) => {
        expect(proj.id).toBeTruthy();
        expect(proj.title).toBeTruthy();
        expect(proj.businessScenario).toBeTruthy();
        expect(proj.architectureSummary).toBeDefined();
        expect(proj.architectureSummary.backend).toBeTruthy();
        expect(proj.architectureSummary.database).toBeTruthy();
        expect(proj.architectureSummary.integration).toBeTruthy();
        expect(proj.architectureSummary.frontend).toBeTruthy();
        expect(proj.milestones).toHaveLength(4);

        proj.milestones.forEach((m) => {
          expect(m.id).toBeTruthy();
          expect(m.title).toBeTruthy();
          expect(m.instructions.length).toBeGreaterThan(0);
          expect(m.validationRules.length).toBeGreaterThan(0);
          expect(m.solutionCode).toBeTruthy();
        });
      });
    });

    it('contains all 3 independent architect challenges', () => {
      expect(INDEPENDENT_CHALLENGES).toHaveLength(3);

      INDEPENDENT_CHALLENGES.forEach((ch) => {
        expect(ch.id).toBeTruthy();
        expect(ch.title).toBeTruthy();
        expect(ch.scenario).toBeTruthy();
        expect(ch.requirements.length).toBeGreaterThan(0);
        expect(ch.evaluationCriteria.length).toBeGreaterThan(0);
        expect(ch.validationRules.length).toBeGreaterThan(0);
      });
    });
  });

  // ==========================================
  // 4. STORAGE & PROGRESS ENGINE TESTS
  // ==========================================
  describe('Practice Progress State Persistence', () => {
    it('records drill completions and updates user state', () => {
      completeDrill('cds-basic-entity');
      const state = loadUserProgress();
      expect(state.practice?.completedDrillIds).toContain('cds-basic-entity');
      expect(state.practice?.attemptedDrillIds).toContain('cds-basic-entity');
    });

    it('advances guided project milestones and marks complete', () => {
      advanceProjectMilestone('project-leave-expense', 1, false);
      let state = loadUserProgress();
      let proj = state.practice?.projectProgress['project-leave-expense'];
      expect(proj?.currentMilestone).toBe(2);
      expect(proj?.completedMilestones).toContain(1);
      expect(proj?.isCompleted).toBe(false);

      advanceProjectMilestone('project-leave-expense', 4, true);
      state = loadUserProgress();
      proj = state.practice?.projectProgress['project-leave-expense'];
      expect(proj?.isCompleted).toBe(true);
      expect(proj?.completedMilestones).toContain(4);
    });

    it('submits independent challenge scores', () => {
      submitChallenge('challenge-multi-tenant-isolation', 100, true);
      const state = loadUserProgress();
      expect(state.practice?.completedChallengeIds).toContain('challenge-multi-tenant-isolation');
      expect(state.practice?.challengeScores['challenge-multi-tenant-isolation']?.score).toBe(100);
      expect(state.practice?.challengeScores['challenge-multi-tenant-isolation']?.passed).toBe(true);
    });
  });

  // ==========================================
  // 5. REACT UI WORKSPACE RENDERING TESTS
  // ==========================================
  describe('Practice UI Workspaces', () => {
    it('renders CdsPracticeLab and executes live compilation', () => {
      render(<CdsPracticeLab />);

      expect(screen.getByText(/Interactive CDS Modeler & DDL Compiler/i)).toBeInTheDocument();
      expect(screen.getByText(/SAP HANA DDL/i)).toBeInTheDocument();
      expect(screen.getByText(/OData CSDL \(\$metadata\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Valid CDS/i)).toBeInTheDocument();
    });

    it('renders ODataExplorer and executes a simulated query', () => {
      render(<ODataExplorer />);

      expect(screen.getByRole('heading', { name: /OData v4 Live Query Explorer/i })).toBeInTheDocument();
      const sendBtn = screen.getByRole('button', { name: /Send Request/i });
      fireEvent.click(sendBtn);

      expect(screen.getByText(/200 OK/i)).toBeInTheDocument();
      expect(screen.getByText(/Aarav Sharma/i)).toBeInTheDocument();
    });

    it('renders DrillWorkspace and validates solution', () => {
      const drill = PRACTICE_DRILLS[0]!;
      render(<DrillWorkspace drill={drill} />);

      expect(screen.getByRole('heading', { name: drill.title })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Verify Solution/i })).toBeInTheDocument();

      const editor = screen.getByLabelText(/Code Editor/i);
      fireEvent.change(editor, { target: { value: drill.solutionCode } });

      const verifyBtn = screen.getByRole('button', { name: /Verify Solution/i });
      fireEvent.click(verifyBtn);

      expect(screen.getByText(/All criteria met! Progress recorded/i)).toBeInTheDocument();
    });

    it('renders GuidedProjectWorkspace and displays milestones and architecture', () => {
      const project = GUIDED_PROJECTS[0]!;
      render(<GuidedProjectWorkspace project={project} />);

      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
      expect(screen.getByText(/Enterprise Target Architecture/i)).toBeInTheDocument();
      expect(screen.getByText(/Cloud Foundry runtime/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Verify Checkpoint/i })).toBeInTheDocument();
    });

    it('renders IndependentChallengeWorkspace and performs evaluation', () => {
      const challenge = INDEPENDENT_CHALLENGES[0]!;
      render(<IndependentChallengeWorkspace challenge={challenge} />);

      expect(screen.getByRole('heading', { name: challenge.title })).toBeInTheDocument();
      expect(screen.getByText(/Business Scenario/i)).toBeInTheDocument();

      const editor = screen.getByLabelText(/Independent Challenge Code/i);
      fireEvent.change(editor, { target: { value: challenge.solutionCode } });

      const submitBtn = screen.getByRole('button', { name: /Submit for Evaluation/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Evaluation Test Suite/i)).toBeInTheDocument();
      expect(screen.getByText(/Score: 100%/i)).toBeInTheDocument();
    });

    it('renders PracticePage with tab navigation and switches between tools', () => {
      render(
        <MemoryRouter>
          <PracticePage />
        </MemoryRouter>
      );

      expect(
        screen.getByRole('heading', { name: /Hands-On Practice Sandboxes/i })
      ).toBeInTheDocument();

      const cdsTab = screen.getByRole('button', { name: /Core Data Services \(CDS\) Sandbox/i });
      fireEvent.click(cdsTab);
      expect(screen.getByText(/Interactive CDS Modeler & DDL Compiler/i)).toBeInTheDocument();

      const odataTab = screen.getByRole('button', { name: /OData v4 Query Explorer/i });
      fireEvent.click(odataTab);
      expect(screen.getByRole('heading', { name: /OData v4 Live Query Explorer/i })).toBeInTheDocument();

      const projectsTab = screen.getByRole('button', { name: /Guided Mini-Projects/i });
      fireEvent.click(projectsTab);
      expect(screen.getByText(/Employee Leave & Expense Tracker/i)).toBeInTheDocument();
      expect(screen.getByText(/Vendor Registration & Approval Portal/i)).toBeInTheDocument();
      expect(screen.getByText(/Currency & Order Synchronization Engine/i)).toBeInTheDocument();

      const challengesTab = screen.getByRole('button', { name: /Independent Challenges/i });
      fireEvent.click(challengesTab);
      expect(screen.getByText(/Multi-Tenant Data Isolation Pattern/i)).toBeInTheDocument();
    });
  });
});
