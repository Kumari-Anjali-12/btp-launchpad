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

## 📚 Project Documentation

All engineering and product documentation is actively maintained in the [`docs/`](file:///G:/BTP-Launchpad/docs) directory:

- 📋 [**Product Requirements Document (PRD)**](file:///G:/BTP-Launchpad/docs/PRODUCT_REQUIREMENTS.md) — Detailed feature requirements, user personas, and acceptance criteria.
- 🏛️ [**Architecture Specification**](file:///G:/BTP-Launchpad/docs/ARCHITECTURE.md) — Technical stack, simulated SAP runtime engine, component hierarchy, and security standards.
- ⚖️ [**Project Engineering Rules**](file:///G:/BTP-Launchpad/docs/ENGINEERING_RULES.md) — Mandatory engineering standards, 10-minute checkpoint policy, debugging policy, and QA gates.
- 🗺️ [**Development Roadmap**](file:///G:/BTP-Launchpad/docs/ROADMAP.md) — 4–6 week delivery schedule with phased milestones and deliverables.
- 🧪 [**Testing & Quality Assurance**](file:///G:/BTP-Launchpad/docs/TESTING.md) — QA verification protocol, test pyramid, and checkpoint verification matrix.
- 📝 [**Development Log**](file:///G:/BTP-Launchpad/docs/DEVELOPMENT_LOG.md) — Live chronological record of every checkpoint, test run, commit, and push.

---

## 🛠️ Mandatory Engineering Principles

1. **Inspect existing code** before modifying it.
2. **Preserve working functionality** with strict regression testing.
3. **Modular, reusable, and maintainable** component design.
4. **Strict TypeScript** (`strict: true`) with zero tolerated type errors.
5. **Zero fake functionality:** Every button, tab, search bar, and interactive control is fully functional.
6. **Never claim an untested feature is complete.**
7. **Technically accurate & beginner-friendly** educational content.
8. **Clear simulation boundaries:** Transparent distinction between simulated browser sandboxes and real SAP BTP operations.
9. **Zero secret exposure:** No credentials or sensitive tokens committed or exposed.
10. **Responsive & accessible:** Full support from mobile (375px) to desktop (1440px+), adhering to WCAG 2.1 AA.

---

## 🚀 Quick Start (Development)

```bash
# Clone the repository
git clone https://github.com/Kumari-Anjali-12/btp-launchpad.git
cd btp-launchpad

# Install dependencies
npm install

# Start development server
npm run dev

# Run type check
npm run typecheck

# Run test suite
npm run test

# Build for production
npm run build
```

---

## 📌 Development Status

- **Current Phase:** Phase 1 — Project Initialization & Engineering Standards Baseline
- **Repository Remote:** `origin https://github.com/Kumari-Anjali-12/btp-launchpad (main)`
- **Latest Audit:** Documented in [DEVELOPMENT_LOG.md](file:///G:/BTP-Launchpad/docs/DEVELOPMENT_LOG.md)
