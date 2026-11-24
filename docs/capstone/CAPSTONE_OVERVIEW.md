# Capstone Project: Enterprise Employee Leave Management System
## Three-Tier Progressive Learning Architecture on SAP BTP

**Project:** BTP Launchpad  
**Standalone Codebase Location:** `projects/employee-leave-management/`  
**Host Application Studio:** `/capstone` (BTP Launchpad Educational Platform)  

---

## 1. Executive Overview & Business Problem

In any enterprise, managing employee time off requires strict accuracy, audit compliance, and transactional safety:
- **Balance Integrity:** Employees receive annual quotas for different categories (Annual Vacation, Sick Leave, Parental Leave). Applications must never allow users to exceed remaining balances.
- **Overlap Prevention:** Employees must not be permitted to submit overlapping leave requests across active dates.
- **Role-Based Workflow:** Employees submit self-service requests; line managers inspect pending direct reports and approve or reject with comments; HR administrators manage corporate policies and execute annual accrual allocations.
- **Transactional Atomicity:** When a manager approves a request, the employee's pending balance must atomically transfer to used balance, and an immutable audit log must be recorded.

---

## 2. Two-Tier Architectural Separation

```
                                  TWO-TIER ARCHITECTURE
 ┌──────────────────────────────────────────────┐  ┌──────────────────────────────────────────────┐
 │          DELIVERABLE A: EDUCATIONAL          │  │          DELIVERABLE B: ENTERPRISE           │
 │               LAUNCHPAD STUDIO               │  │               CAP APPLICATION                │
 │          (Hosted in React / Vite)            │  │          (Standalone Project Tree)           │
 ├──────────────────────────────────────────────┤  ├──────────────────────────────────────────────┤
 │ • Guided Step-by-Step Capstone Modules       │  │ • Real Core Data Services (CDS) Models       │
 │ • Interactive CDS & OData Concept Visualizer │  │ • Real OData V4 Service Endpoints            │
 │ • Visual Business Logic Workflow Simulator   │  │ • Real Node.js Event Handlers & Validations  │
 │ • Role-Switching Mock Inspection (Simulated) │  │ • Real Declarative Authorization (@restrict) │
 │ • Real Codebase File Explorer & Diff Viewer  │  │ • Real SAP Fiori Elements UI Annotations    │
 │ • Honest Simulation Disclaimers & Indicators │  │ • Real App Router (xs-app.json) & XSUAA      │
 │ • Vitest UI & Playwright E2E Test Suites     │  │ • Real Production MTA Descriptor (mta.yaml)  │
 │                                              │  │ • Headless Backend Integration Tests (@cds)  │
 └──────────────────────────────────────────────┘  └──────────────────────────────────────────────┘
```

---

## 3. The Three Progressive Capstone Milestones

### Milestone 1 (Phase 9.1): Data Modeling & Core Services
- **Focus:** Core Data Services (CDS) schema design, relational modeling, associations vs compositions, seed data loading.
- **Primary Source Files:** `db/schema.cds`, `db/data/*.csv`, `srv/leave-service.cds`.
- **Key Concepts:**
  - `cuid`: Standard SAP UUID primary key generation aspect.
  - `managed`: Injects standard audit fields (`createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`).
  - `Composition`: Strong parent-child lifecycle ownership (`Employees` -> `LeaveBalances`).
  - `Association`: Loose cross-entity reference (`LeaveRequests` -> `LeaveTypes`).
  - Deterministic CSV seeding for local database initialization.

### Milestone 2 (Phase 9.2): Business Logic, Validations & Security
- **Focus:** Node.js event handlers (`cds.service.impl`), input sanitization, transactional workflows, declarative security.
- **Primary Source Files:** `srv/leave-service.js`, `srv/manager-service.cds`, `srv/manager-service.js`, `xs-security.json`.
- **Key Concepts:**
  - Date chronology validation (`startDate <= endDate`).
  - Interval overlap detection: `(newStart <= existingEnd AND newEnd >= existingStart)`.
  - Leave balance quota enforcement before request creation.
  - ACID transactions using `cds.tx(req).run(...)` for atomic balance deduction and approval logging.
  - Declarative role restrictions (`@requires: 'LeaveManager'`) and XSUAA scope configuration.

### Milestone 3 (Phase 9.3): SAP Fiori Elements UX, App Router & Cloud Deployment
- **Focus:** Metadata-driven UI, reverse proxy routing, multi-target packaging, SAP BTP deployment.
- **Primary Source Files:** `app/leave-requests/annotations.cds`, `app/approuter/xs-app.json`, `mta.yaml`.
- **Key Concepts:**
  - UI Annotations: `UI.LineItem`, `UI.HeaderInfo`, `UI.SelectionFields`, `UI.Facets`.
  - Semantic criticality codes (3=Positive/Approved, 2=Critical/Pending, 1=Negative/Rejected).
  - SAP Application Router as reverse proxy and OAuth2 security terminator.
  - Cloud MTA Build Tool (`mbt`) compilation to MTAR archive.
  - Multiapps deployment (`cf deploy`) into SAP HANA Cloud HDI container and Cloud Foundry runtime.

---

## 4. Entity-Relationship Data Dictionary

| Entity | Primary Key | Key Relationships | Description |
| :--- | :--- | :--- | :--- |
| `Employees` | `ID: UUID` | Manager (`Association to Employees`), Balances (`Composition of LeaveBalances`) | Master employee record with employee number, name, email, department. |
| `LeaveTypes` | `code: String(10)` | None | Master leave categories (ANNUAL, SICK, PARENTAL, UNPAID) with annual maximums. |
| `LeaveBalances` | `ID: UUID` | `employee`, `leaveType` | Annual quota tracking: `totalEntitlement`, `usedDays`, `pendingDays`, `availableDays`. |
| `LeaveRequests` | `ID: UUID` | `employee`, `leaveType`, `approvalLogs` | Transactional leave applications with dates, total days, reason, and status. |
| `ApprovalLogs` | `ID: UUID` | `leaveRequest`, `approver` | Immutable chronological audit trail recording submission, approval, rejection, or cancellation. |
| `LeavePolicies` | `ID: UUID` | Country | Country-level compliance parameters: max consecutive days, notice window. |
