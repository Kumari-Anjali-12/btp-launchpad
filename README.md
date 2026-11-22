# BTP Launchpad 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)](https://tailwindcss.com/)
[![Tests: Vitest](https://img.shields.io/badge/Tests-23%20Passing-emerald.svg)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, student-facing educational platform designed to teach the **SAP Business Technology Platform (SAP BTP)** to complete beginners.

---

## 🎯 The Vision

Enterprise SAP documentation is notoriously complex, fragmented, and full of institutional acronyms that assume decades of NetWeaver/ECC experience. 

**BTP Launchpad** breaks down these barriers. It guides students and junior developers from **zero SAP knowledge** to building, configuring, and understanding modern cloud applications on SAP BTP through interactive mental models, simulated coding sandboxes, visual architecture builders, and practical career guidance.

---

## 🌟 Core Features & Modules (Phase 1 & Phase 2 Implemented)

1. 🗺️ **Beginner-First SAP Learning Roadmap (`/roadmap`):** Visual 5-module progression from foundational ERP concepts to Cloud Foundry, Kyma, CAP/RAP, Fiori, and Integration Suite.
2. 📖 **Interactive Learning Chapters (`/learn/:chapterId` & `/chapters/:moduleId`):** 15 deep, beginner-friendly chapters across 5 modules, each featuring real-world analogies, 5-part concept breakdowns, interactive architecture diagrams, jargon decoder tables, line-by-line code examples, real enterprise scenarios, and 3-question knowledge checks (45 total questions with immediate feedback and retry support).
3. 📊 **Learning Dashboard (`/dashboard`):** Real-time tracking of overall progress percentage, completed chapters counter, active learning streak, and next recommended activity.
4. 💻 **Hands-on Practice Lab (`/practice`):** Architectural preview of the upcoming In-Browser CDS Modeler and OData v4 Query Explorer.
5. 📚 **SAP Terminology Cheatsheet & Acronym Decoder (`/cheatsheet`):** Searchable, filterable dictionary with plain-English translations and modern web equivalents (e.g. CAP <-> Express/Prisma, Destination <-> Managed OAuth Client).
6. 🏗️ **Visual Architecture Design Lab (`/design-lab`):** Preview of the drag-and-drop BTP topology canvas and rule linter.
7. 💼 **Career Hub (`/career-hub`):** Role blueprints for BTP Developer, CAP Full-Stack Engineer, and Integration Consultant with portfolio specs.
8. 🎨 **Accessible Theme Switcher:** Instant toggle between Light, Dark, and System modes with full keyboard accessibility.
9. 👤 **Zero-Friction Guest Progress Engine:** Robust LocalStorage state engine with corruption recovery, quiz attempt tracking, and automatic completion thresholds.

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
- **Test Status:** 23 passing tests across 3 suites (100% pass rate)
- **Repository Remote:** `https://github.com/Kumari-Anjali-12/btp-launchpad`
- **Latest Audit:** Documented in [DEVELOPMENT_LOG.md](file:///G:/BTP-Launchpad/docs/DEVELOPMENT_LOG.md)
