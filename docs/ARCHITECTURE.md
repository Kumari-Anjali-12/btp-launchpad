# BTP Launchpad — Architecture Specification

## 1. System Overview

BTP Launchpad is built as a modern, high-performance, responsive Single-Page / Client-Server Web Application engineered specifically for interactive learning.

### Core Stack
- **Framework:** React 19 / Next.js or React + Vite (Fast, deterministic client-side rendering for instant sandbox interactions)
- **Language:** TypeScript 5.x (Strict mode enabled)
- **Styling & Design System:** Tailwind CSS with an SAP Horizon-inspired theme palette (Enterprise clean, high-contrast, modern accessible UI)
- **Component Primitives:** Modular, headless, accessible components with Lucide React icons
- **State Management:** Reactive lightweight state store (Zustand or React Context + Hooks) for user progress, sandbox state, and quiz tracking
- **Persistence:** LocalStorage adapter with clear schema versioning for zero-friction student progress saving (no mandatory login required to start learning)
- **Testing:** Vitest / Playwright / React Testing Library for automated unit, integration, and UI verification

---

## 2. Architectural Blueprint

```
+-----------------------------------------------------------------------------------+
|                                  USER BROWSER                                     |
+-----------------------------------------------------------------------------------+
|  [Presentation Layer]                                                             |
|  +-------------------+  +--------------------+  +-------------------------------+ |
|  | Navigation & Shell|  | Learning Roadmap   |  | Chapter Content Viewer        | |
|  +-------------------+  +--------------------+  +-------------------------------+ |
|  | Terminology Hub   |  | Design Lab Canvas  |  | Career & Setup Hub            | |
|  +-------------------+  +--------------------+  +-------------------------------+ |
+-----------------------------------------------------------------------------------+
|  [Interactive Engine Layer]                                                       |
|  +-------------------------+  +------------------------+  +---------------------+ |
|  | In-Browser CDS Parser   |  | Mock OData v4 Provider |  | Architecture Linter | |
|  +-------------------------+  +------------------------+  +---------------------+ |
|  | Quiz & Evaluation Engine|  | Progress Store (Local) |  | Search / Indexer    | |
|  +-------------------------+  +------------------------+  +---------------------+ |
+-----------------------------------------------------------------------------------+
|  [Domain / Data Models] (Strict TypeScript Definitions)                           |
|  - Chapter & Roadmap Schema   - Terminology Dictionary Schema                     |
|  - CDS AST / Mock Entity Data - Architecture Node/Edge Topology                   |
|  - Quiz & Score Models        - Career Blueprint Data                             |
+-----------------------------------------------------------------------------------+
```

---

## 3. Key Subsystems & Design Principles

### 3.1. In-Browser Simulated SAP Runtime Engine
- **Purpose:** Allow students to learn CDS syntax, OData queries, and MTA configurations without needing an expensive, slow, or expired SAP trial account.
- **Components:**
  1. *CDS Schema Interpreter:* Parses basic CDS syntax (`entity`, `key`, associations) into structured schemas.
  2. *Mock OData v4 Engine:* Implements mock endpoints responding to `$select`, `$filter`, `$top`, `$skip`, and `$expand`.
  3. *MTA Descriptor Generator:* Compiles Visual Design Lab diagrams into standard `mta.yaml` deployment manifests.
- **Safety Standard:** Clearly labeled with badge `[Simulated Environment]`. Zero real network requests to external SAP services required for baseline learning.

### 3.2. Visual Architecture Design Lab Engine
- **Canvas State:** Node-and-edge graph model tracking components (Approuter, CAP Backend, HANA DB, Destination, Cloud Connector, S/4HANA On-Premise, Event Mesh).
- **Validation Rules Engine:** Evaluates graph connectivity against SAP BTP best practices:
  - Detects orphan nodes.
  - Flags insecure direct client-to-database connections.
  - Verifies presence of Approuter / XSUAA for authenticated routes.
  - Verifies Cloud Connector presence when connecting on-premise systems.

### 3.3. Offline-First Progress & State Engine
- Saves user module progress, quiz scores, completed coding exercises, and custom architecture lab diagrams into browser `localStorage`.
- Allows export and import of student progress as a JSON snapshot.

---

## 4. Directory & Code Organization

```
btp-launchpad/
├── .github/                 # CI/CD workflows and automated quality checks
├── docs/                    # Living engineering documentation
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT_LOG.md
│   ├── ENGINEERING_RULES.md
│   ├── PRODUCT_REQUIREMENTS.md
│   ├── ROADMAP.md
│   └── TESTING.md
├── public/                  # Static assets, diagrams, fonts
├── src/
│   ├── assets/              # Icons, illustrations, visual diagrams
│   ├── components/          # Reusable modular UI components
│   │   ├── common/          # Buttons, Badges, Modals, Tabs, Cards, Tooltips
│   │   ├── layout/          # Header, Sidebar, Footer, Breadcrumbs
│   │   ├── roadmap/         # Interactive roadmap tree and milestone cards
│   │   ├── chapter/         # Chapter viewer, analogy cards, code walkthrough
│   │   ├── sandbox/         # In-browser CDS editor, OData explorer, output viewer
│   │   ├── design-lab/      # Visual architecture canvas, node palette, inspector
│   │   ├── terminology/     # Searchable glossary, category filters, tech comparator
│   │   └── career/          # Interview cards, role profiles, project specs
│   ├── data/                # Strongly-typed curriculum content & reference data
│   │   ├── chapters/        # Modular educational chapters
│   │   ├── glossary/        # 100+ SAP BTP terms and analogies
│   │   ├── interview/       # Curated Q&As and flashcard sets
│   │   └── roadmap/         # Structured curriculum path and prerequisites
│   ├── lib/                 # Core engine utilities
│   │   ├── cds-parser/      # In-browser simulated CDS parser
│   │   ├── odata-mock/      # Mock OData v4 query runner
│   │   ├── linter/          # Architecture design lab validation rules
│   │   └── storage/         # Typed LocalStorage persistence adapter
│   ├── types/               # Strict TypeScript interface declarations
│   ├── App.tsx              # Application root and route orchestrator
│   ├── main.tsx             # Application bootstrap
│   └── index.css            # Tailwind CSS directives and theme variables
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 5. Security & Secret Protection

1. **No Real Secrets:** The repository must never contain live API keys, BTP service keys, XSUAA client secrets, or Cloud Foundry credentials.
2. **Environment Variable Hygiene:** If any external integration is added in the future, only public sandbox endpoints are used, configured via `.env.example` with dummy values.
3. **Client-Side Sanitization:** User inputs in code sandboxes are parsed in-memory with strict schema bounds; no `eval()` or unvalidated DOM injection.

---

## 6. Phase 9 Two-Tier Deliverable Architecture

Phase 9 establishes a strict physical and conceptual separation of concerns:

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

1. **Deliverable A (Educational Launchpad Studio):**
   - Located in `src/pages/capstone/` and `src/components/capstone/`.
   - Accessible via `/capstone`, `/capstone/level-1`, `/capstone/level-2`, `/capstone/level-3`.
   - Includes persistent `[EDUCATIONAL SIMULATOR — DEMO ONLY]` banners distinguishing browser sandboxes from enterprise code.
   - Provides real code inspectors, interactive CDS syntax compilation, and role-based approval playgrounds.
2. **Deliverable B (Standalone Enterprise SAP CAP Application):**
   - Located in `projects/employee-leave-management/`.
   - Runs locally with zero global CLI dependencies via `npm test` and `npx cds watch`.
   - Implements real Core Data Services schemas (`db/schema.cds`), seed datasets (`db/data/`), and OData V4 services (`srv/`).
   - Implements canonical business logic (`srv/leave-service.js`, `srv/manager-service.js`): chronology validation, overlap prevention, balance sufficiency, and atomic approvals (`cds.tx`).
   - Includes XSUAA security (`xs-security.json`), Fiori Elements UI (`app/leave-requests/`), App Router reverse proxy (`app/approuter/`), and Cloud MTA descriptor (`mta.yaml`).
