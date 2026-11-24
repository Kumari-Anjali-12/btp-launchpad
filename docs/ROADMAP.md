# BTP Launchpad — Development Roadmap

## Timeline: 4–6 Weeks Overview

```
Week 1: Core Foundation, App Shell, System Architecture & Documentation
Week 2: Learning Roadmap & SAP Terminology Cheatsheet Engine
Week 3: Interactive Learning Chapters & In-Browser CDS/CAP Code Sandbox
Week 4: Visual Architecture Design Lab (Interactive Topology Builder)
Week 5: Career Hub, Interview Preparation & Zero-to-Cloud Guides
Week 6: End-to-End QA, Comprehensive Testing, Accessibility Audit & Deployment
```

---

## Phase 1 (Week 1): Foundation, Architecture & UI System
- [x] Establish Engineering Rules and Documentation Framework (`PRD`, `ARCHITECTURE`, `ENGINEERING_RULES`, `DEVELOPMENT_LOG`, `ROADMAP`, `TESTING`).
- [ ] Initialize frontend application stack (React, TypeScript, Tailwind CSS, Lucide icons, Vite/Next.js).
- [ ] Configure Strict TypeScript configuration (`strict: true`), ESLint, and test harness (Vitest / React Testing Library).
- [ ] Implement responsive App Shell with SAP Horizon-inspired design system:
  - Header with navigation and quick search trigger.
  - Sidebar with active module indicator.
  - Footer with open-source and educational resource links.
  - Simulated Environment notification banner.
- [ ] Local storage user state manager (progress tracking, completion badges).

## Phase 2 (Week 2): SAP BTP Foundation Roadmap & Terminology Hub
- [ ] **Interactive BTP Learning Roadmap:**
  - Visual milestone path (Foundation -> Backend -> Frontend -> Integration -> Security).
  - Milestone detail drawer with prerequisites, estimated time, and skills acquired.
  - Progress toggle marking milestones completed.
- [ ] **SAP Terminology Cheatsheet & Acronym Decoder:**
  - 100+ curated terms covering BTP, Cloud Foundry, Kyma, CAP, RAP, CDS, BAS, MTA, XSUAA, Destinations, etc.
  - Instant live search and category pills (Architecture, Backend, Frontend, Integration, Security, Database).
  - "Plain English" vs "SAP Official" explanation toggle.
  - "Modern Web Tech Equivalent" column (e.g., CAP <-> Express/Prisma, Destination <-> Managed OAuth Client).

## Phase 3 (Week 3): Interactive Chapters & In-Browser Code Sandbox
- [ ] **Interactive Learning Chapters:**
  - Chapter 1: Introduction to SAP & Cloud Transformation.
  - Chapter 2: SAP BTP Architecture Demystified (Global Accounts, Subaccounts, Orgs, Spaces).
  - Chapter 3: Cloud Application Programming Model (CAP) & Core Data Services (CDS).
  - Chapter 4: Frontend Development with SAP Fiori & SAPUI5.
  - Chapter 5: Security, Destinations & Cloud Connector.
  - Chapter 6: Event-Driven Architecture with SAP Event Mesh.
  - Interactive quiz checkpoints at the end of each chapter with immediate feedback.
- [ ] **In-Browser CDS & CAP Code Playground:**
  - Syntax-highlighted CDS editor for entity and service definitions.
  - In-browser simulated compiler showing generated relational schema and mock OData v4 metadata.
  - Interactive OData Query Explorer: execute `$select`, `$filter`, `$expand` and inspect live mock JSON payloads.
  - Prominent "Simulated Environment" indicator.

## Phase 4 (Week 4): Visual Architecture Design Lab
- [ ] **Interactive Topology Canvas:**
  - Drag-and-drop / click-to-connect nodes:
    - User Clients (Fiori App, Mobile App, Postman/API)
    - Approuter / Standalone Router
    - Authorization (XSUAA Service)
    - Backend Service (CAP Node.js / Java, ABAP RAP)
    - Database (SAP HANA Cloud, Redis Cache)
    - Connectivity (Destination Service, SAP Cloud Connector)
    - On-Premise Systems (SAP S/4HANA, SAP ECC)
    - Messaging (SAP Event Mesh)
- [ ] **Architecture Linter & Validator:**
  - Real-time rule evaluation (e.g., warns on missing security boundary or missing Cloud Connector for on-premise targets).
  - Cost profile indicator (Free Tier eligible vs Enterprise Paid services).
  - One-click `mta.yaml` deployment manifest generator based on the active diagram.

## Phase 5 (Week 5): Career Hub & Zero-to-Cloud Setup Guide
- [ ] **Career Hub & Role Guides:**
  - Role roadmaps: SAP BTP Developer, CAP Full-Stack Engineer, Integration Consultant.
  - Skills checklist and portfolio project blueprints with starter templates.
  - 50+ curated interview questions with "Beginner Explanation" vs "Senior Architect Explanation".
- [ ] **Zero-to-Cloud Setup Guide:**
  - Interactive step-by-step onboarding wizard for SAP BTP Free Tier registration.
  - Setting up SAP Business Application Studio vs local VS Code with CDS tools.
  - Cloud Foundry CLI guide (`cf login`, `cf push`, `cf apps`, `cf logs`) with interactive command reference.
  - Common error troubleshooter (quota exhausted, trial expired, 401 unauthorized, destination not found).

## Phase 6 (Week 6): QA, Hardening & Production Release
- [x] Comprehensive TypeScript compilation and zero-warning verification.
- [x] Comprehensive unit and integration test suite execution with high coverage.
- [x] Accessibility (WCAG 2.1 AA) validation: keyboard navigation, screen reader checks, color contrast.
- [x] Cross-browser and responsive layout testing across viewports (375px, 768px, 1024px, 1440px).
- [x] Production build optimization and deployment to GitHub Pages / Vercel.
- [x] Final documentation sign-off and student user test feedback collection.

## Phase 9: Three Progressive Capstones — Employee Leave Management System [COMPLETED]
- [x] **Two-Tier Architecture Separation:** Distinct educational simulator inside React Launchpad and standalone enterprise SAP CAP project in `projects/employee-leave-management/`.
- [x] **Milestone 1 (Phase 9.1): Data Modeling & Core Services:**
  - Core domain model in `db/schema.cds` (`Employees`, `LeaveTypes`, `LeaveBalances`, `LeaveRequests`, `ApprovalLogs`, `LeavePolicies`) with `cuid` & `managed` aspects.
  - Master and transactional CSV seed datasets in `db/data/`.
  - OData V4 projection in `srv/leave-service.cds`.
  - In-browser Interactive CDS Schema Simulator and real codebase inspector in `/capstone/level-1`.
- [x] **Milestone 2 (Phase 9.2): Business Logic, Validations & Security:**
  - Canonical validations in `srv/leave-service.js`: date chronology, interval overlap prevention, remaining balance checks.
  - Transactional manager approval/rejection actions in `srv/manager-service.js` with atomic balance deductions (`cds.tx`) and immutable audit logs.
  - Role-based authorization with XSUAA roles in `xs-security.json` (`LeaveEmployee`, `LeaveManager`, `LeaveAdmin`).
  - Interactive Role-Based Approval Workflow Simulator with live persona switcher (Alice, Bob, Carol) in `/capstone/level-2`.
- [x] **Milestone 3 (Phase 9.3): Fiori Elements UX, App Router & Cloud Deployment:**
  - Metadata-driven UI annotations in `app/leave-requests/annotations.cds` with semantic status criticality highlights.
  - Application Router reverse proxy routing in `app/approuter/xs-app.json` with token forwarding and CSRF protection.
  - Cloud Multi-Target Application descriptor in `mta.yaml` targeting Cloud Foundry and SAP HANA HDI containers.
  - Interactive Fiori Elements table preview and production MTA inspector in `/capstone/level-3`.
- [x] **Dual-Tier Quality Assurance & Verification:**
  - 12/12 automated integration tests passing in Mocha with in-memory SQLite in `projects/employee-leave-management/`.
  - 152/152 frontend Vitest tests passing with zero regressions.
  - 100% Playwright real Chrome browser verification with 6 screenshot artifacts.
