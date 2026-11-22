# BTP Launchpad 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)](https://tailwindcss.com/)
[![Tests: Vitest](https://img.shields.io/badge/Tests-61%20Passing-emerald.svg)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, student-facing educational platform designed to teach the **SAP Business Technology Platform (SAP BTP)** to complete beginners.

---

## 🎯 The Vision

Enterprise SAP documentation is notoriously complex, fragmented, and full of institutional acronyms that assume decades of NetWeaver/ECC experience. 

**BTP Launchpad** breaks down these barriers. It guides students and junior developers from **zero SAP knowledge** to building, configuring, and understanding modern cloud applications on SAP BTP through interactive mental models, simulated coding sandboxes, visual architecture builders, and practical career guidance.

---

## 🌟 Core Features & Modules

1. 🗺️ **Authoritative 9-Phase Curriculum & Dependency Roadmap (`/roadmap`):** 36 structured modules and 9 Phase Capstone Deliverables spanning ~227 total hours from pre-learning to SAP Generative AI Hub integration, complete with an interactive SVG dependency graph, node drawer, and personal pace & schedule calculator.
2. 📖 **High-Fidelity Learning Workspace (`/learn/:chapterId` & `/chapters`):** 3-column reference educational interface featuring:
   - **Left Course Sidebar:** Expandable 9-phase accordion tree with progress tracking and mobile drawer.
   - **Central Workspace Header & Stepper:** Breadcrumb hierarchy, metadata badges, diagram replay & pause controls, and horizontal lesson stepper.
   - **Right Guided Instructor Panel:** Step-by-step instructions, `KEY IDEA` callout cards, active keyboard shortcuts (`[<] [>] step · [R] replay · [Space] pause`), and interactive `YOU'LL LEARN` checklist.
   - **Comprehensive Pedagogical Modules:** 10-section structure with analogies, concept deep-dives, interactive architecture diagrams, jargon decoder tables, line-by-line code examples, enterprise business scenarios, practical tasks, mastery checks, and 3-question knowledge check quizzes.
3. 📊 **Learning Dashboard (`/dashboard`):** Real-time tracking of overall progress percentage, completed chapters counter, practice drills mastered, active learning streak, and next recommended activity.
4. 💻 **Interactive Practice Sandboxes (`/practice`):**
   - **Level 1 — Foundation Drills (15 interactive exercises):** CDS Modeler (entities, types, aspects, associations, compositions), OData Explorer ($select, $filter, $expand, POST, PATCH, DELETE), Security & Authorization (401 vs 403, XSUAA JWT decoding, xs-app.json route protection), and Debugging Lab (CDS syntax, CAP handlers, OData URLs, Destination Service).
   - **Level 2 — Guided Mini-Projects (3 enterprise projects):** Employee Leave & Expense Tracker, Vendor Registration & Approval Portal, and Currency & Order Synchronization Engine with sequential milestone verification and target enterprise architecture breakdowns.
   - **Level 3 — Independent Architect Challenges:** Multi-tenant data isolation, idempotent event mesh consumers, and enterprise RBAC attribute configurations.
   - **In-Browser CDS Modeler & DDL Compiler:** Safe AST-like parser generating real SAP HANA DDL tables and OData EDMX metadata with line-numbered error diagnostics.
   - **OData v4 Query Explorer:** In-memory deterministic mock database of Employees, LeaveRequests, Vendors, and Orders with real OData v4 semantics and simulated auth error states.
5. 🔍 **Global Command Search (`Ctrl K` / `Cmd K`):** Instant modal search across all 36 modules, 9 phase capstones, and 6 deferred topics.
6. 📚 **SAP Terminology Cheatsheet & Acronym Decoder (`/cheatsheet`):** Searchable, filterable dictionary with plain-English translations and modern web equivalents.
7. 🏗️ **Visual Architecture Design Lab (`/design-lab`):** Preview of the drag-and-drop BTP topology canvas and rule linter.
8. 💼 **Career Hub (`/career-hub`):** Role blueprints for BTP Developer, CAP Full-Stack Engineer, and Integration Consultant with portfolio specs.
9. 🎨 **Accessible Theme Switcher:** Instant toggle between Light, Dark, and System modes with full keyboard accessibility.
10. 👤 **Zero-Friction Guest Progress Engine (Schema v2):** Robust LocalStorage state engine with corruption recovery, quiz attempt tracking, drill completion tracking, lesson progress mapping, and backward-compatible schema v1->v2 migration.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 with Vite 6
- **Programming Language:** TypeScript 5.7 (Strict mode enabled, `noUnusedLocals`, `noUncheckedIndexedAccess`)
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling & UI System:** Tailwind CSS (SAP Horizon-inspired color palette & accessible typography)
- **Component Primitives & Icons:** Accessible headless components with Lucide React
- **Persistence:** Versioned LocalStorage state engine with corruption recovery
- **Testing & Quality:** Vitest 3, React Testing Library, ESLint 9 (flat config), TypeScript compiler checks

---

## 📚 Project Documentation & Governance

All engineering, product documentation, and governance policies are maintained in the [`docs/`](file:///G:/BTP-Launchpad/docs) directory:

- ⚖️ [**Project Engineering Rules & Governance**](file:///G:/BTP-Launchpad/docs/ENGINEERING_RULES.md) — 10 mandatory engineering standards, strict 10-minute checkpoint policy, branch limit rules, and QA gates.
- 📋 [**Product Requirements Document (PRD)**](file:///G:/BTP-Launchpad/docs/PRODUCT_REQUIREMENTS.md) — Detailed feature requirements, user personas, and educational standards.
- 🏛️ [**Architecture Specification**](file:///G:/BTP-Launchpad/docs/ARCHITECTURE.md) — Technical stack, simulated SAP runtime engine, component hierarchy, and security standards.
- 🗺️ [**Development Roadmap**](file:///G:/BTP-Launchpad/docs/ROADMAP.md) — 4–6 week delivery schedule with phased milestones and deliverables.
- 🧪 [**Testing & Quality Assurance**](file:///G:/BTP-Launchpad/docs/TESTING.md) — QA verification protocol, test pyramid, and checkpoint verification matrix.
- 📝 [**Development Log**](file:///G:/BTP-Launchpad/docs/DEVELOPMENT_LOG.md) — Live chronological record of every checkpoint, test run, commit, and push.

---

## 🚀 Quick Start (Development & Installation)

### Prerequisites
- Node.js: `v20.x` or `v24.x`
- npm: `v10.x` or `v11.x`
- Git: `v2.x+`

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Kumari-Anjali-12/btp-launchpad.git
cd btp-launchpad

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run strict type checking
npm run typecheck

# 5. Run automated test suite
npm run test

# 6. Run linter
npm run lint

# 7. Build for production
npm run build
```

---

## ⚙️ Environment Configuration

BTP Launchpad is designed with an offline-first, client-side simulated architecture to guarantee complete accessibility for all students without requiring paid SAP cloud accounts or credentials.

- **Secrets Policy:** Zero API keys, secrets, or passwords are used, stored, or committed.
- **Configuration:** Optional environment overrides can be placed in `.env.local` (excluded from git via `.gitignore`).
- **Simulation Disclaimer:** All interactive sandboxes run in browser simulated environments with prominent disclaimer badges.

---

## 🚢 Deployment Instructions

The application compiles to a static, high-performance web bundle:

```bash
# Generate production bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

The production output in `dist/` is optimized for zero-config hosting on GitHub Pages, Vercel, or SAP BTP HTML5 Application Repository.

---

## 📌 Implementation Status & Git Governance

- **Current Phase:** Phase 2 Completed — Interactive Learning Engine (5 Modules, 15 Chapters, 45 Quizzes)
- **Primary Branch:** `main` (Strict limit: 1 main + max 5 additional branches = 6 total)
- **Active Branches:** 1 (`main`)
- **Remaining Branch Capacity:** 5 additional branches available
- **Test Status:** 32 passing tests across 4 suites (100% pass rate)
- **Repository Remote:** `https://github.com/Kumari-Anjali-12/btp-launchpad`
- **Latest Audit:** Documented in [DEVELOPMENT_LOG.md](file:///G:/BTP-Launchpad/docs/DEVELOPMENT_LOG.md)
