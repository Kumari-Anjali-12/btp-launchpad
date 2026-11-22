# BTP Launchpad 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19%20%2F%2018-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, student-facing educational platform designed to teach the **SAP Business Technology Platform (SAP BTP)** to complete beginners.

---

## 🎯 The Vision

Enterprise SAP documentation is notoriously complex, fragmented, and full of institutional acronyms that assume decades of NetWeaver/ECC experience. 

**BTP Launchpad** breaks down these barriers. It guides students and junior developers from **zero SAP knowledge** to building, configuring, and understanding modern cloud applications on SAP BTP through interactive mental models, simulated coding sandboxes, visual architecture builders, and practical career guidance.

---

## 🌟 Core Features

1. 🗺️ **Beginner-First SAP Learning Roadmap:** Clear visual progression from foundational ERP concepts to Cloud Foundry, Kyma, CAP/RAP, Fiori, and Integration Suite.
2. 📖 **Interactive Learning Chapters:** Bite-sized explanations with real-world analogies, enterprise context, and instant quiz checkpoints.
3. 💻 **Hands-on In-Browser Coding Sandboxes:** Simulated Core Data Services (CDS) modeler, CAP service generator, and OData v4 query explorer with zero setup required.
4. 📚 **SAP Terminology Cheatsheet & Acronym Decoder:** 100+ plain-English translations for enterprise jargon with modern web equivalents.
5. 🏗️ **Visual Architecture Design Lab:** Interactive drag-and-drop BTP topology canvas with real-time architectural validation and automated `mta.yaml` generation.
6. 💼 **Career Hub & Interview Preparation:** Career role blueprints, portfolio project specs, and 50+ curated interview questions with beginner vs. senior answers.
7. ⚡ **Zero-to-Cloud Setup Guide:** Practical onboarding for SAP BTP Free Tier, Business Application Studio, and Cloud Foundry CLI with interactive troubleshooting.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 / 18 with Vite
- **Programming Language:** TypeScript 5.x (Strict mode enabled)
- **Styling & UI System:** Tailwind CSS (SAP Horizon-inspired color palette & typography)
- **Component Primitives & Icons:** Accessible headless components with Lucide React
- **Simulation Engines:** In-browser CDS compiler & mock OData v4 query engine
- **State & Storage:** LocalStorage state store with schema versioning
- **Testing & Quality:** Vitest, React Testing Library, ESLint, TypeScript compiler checks

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

# 6. Build for production
npm run build
```

---

## ⚙️ Environment Configuration

BTP Launchpad is designed with an offline-first, client-side simulated architecture to guarantee complete accessibility for all students without requiring paid SAP cloud accounts or credentials.

- **Secrets Policy:** Zero API keys, secrets, or passwords are used, stored, or committed.
- **Configuration:** Optional environment overrides can be placed in `.env.local` (excluded from git via `.gitignore`).
- **Mock Disclaimers:** All sandbox features run safely within the browser sandbox and clearly indicate simulated state.

---

## 🚢 Deployment Instructions

The application compiles to a static, high-performance web bundle:

```bash
# Generate production bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

The production output is optimized for zero-config hosting on GitHub Pages, Vercel, or SAP BTP HTML5 Application Repository.

---

## 📌 Implementation Status & Git Governance

- **Current Phase:** Phase 1 — Project Initialization & Engineering Standards Baseline
- **Primary Branch:** `main` (Strict limit: 1 main + max 5 additional branches = 6 total)
- **Active Branches:** 1 (`main`)
- **Remaining Branch Capacity:** 5
- **Repository Remote:** `https://github.com/Kumari-Anjali-12/btp-launchpad`
- **Latest Audit:** Documented in [DEVELOPMENT_LOG.md](file:///G:/BTP-Launchpad/docs/DEVELOPMENT_LOG.md)
