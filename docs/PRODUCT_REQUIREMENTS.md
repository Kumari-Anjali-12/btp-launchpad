# BTP Launchpad — Product Requirements Document (PRD)

## 1. Product Identity & Purpose

**BTP Launchpad** is a student-facing, interactive educational platform designed to teach the **SAP Business Technology Platform (SAP BTP)** to complete beginners.

Enterprise SAP documentation is notoriously complex, fragmented, and full of institutional acronyms that assume decades of NetWeaver/ECC experience. **BTP Launchpad breaks down the barriers to entry** by providing an intuitive, interactive, beginner-first learning path with simulated sandboxes, clear mental models, visual architecture builders, and practical career guidance.

- **Development Timeline:** 4–6 weeks.
- **Success Criterion:** A functional, tested, responsive web application with all major agreed features working seamlessly with zero fake functionality or dead-end buttons.

---

## 2. Target Audience & User Personas

1. **The College Computer Science / IT Student:**
   - *Profile:* Familiar with JavaScript, Python, or SQL, but has never touched SAP.
   - *Need:* Wants to understand what SAP BTP actually does, how it connects to modern cloud concepts, and how to get job-ready.
2. **The Junior Enterprise Developer / Career Switcher:**
   - *Profile:* Transitioning from standard web development or traditional IT into SAP ecosystem.
   - *Need:* Needs quick translation of familiar concepts (e.g., Express.js -> CAP, Docker/K8s -> Kyma, Microservices -> Cloud Foundry) and hands-on practice without an expensive corporate tenant.
3. **The Traditional ABAPer Moving to Cloud:**
   - *Profile:* Knows on-premise ABAP/R3/ECC, feeling overwhelmed by BTP, Cloud Foundry, CDS, and modern cloud architecture.
   - *Need:* Clear mapping between classic SAP concepts and modern BTP equivalents.

---

## 3. Core Feature Requirements

### Feature 1: Beginner-First SAP Learning Roadmap
- **Visual Progression Milestones:**
  1. *Foundation:* What is SAP & What is BTP? (Cloud Foundry, Kyma, Global Accounts, Subaccounts, Spaces).
  2. *Data & Backends:* SAP HANA Cloud, Core Data Services (CDS), Cloud Application Programming (CAP) Model vs ABAP RESTful Application Programming (RAP).
  3. *Frontends & Experience:* SAP Fiori, SAPUI5, SAP Build Work Zone.
  4. *Integration & Automation:* SAP Integration Suite (Cloud Integration, API Management), Event Mesh, Build Process Automation.
  5. *Security & Deployment:* XSUAA, Role Collections, Destinations, MTA (Multi-Target Application) deployment.
- **Interactive Checkpoints:** Visual progress tracking, estimated completion times, prerequisites, and milestone completion badges.

### Feature 2: Interactive Learning Chapters
- **Structure per Chapter:**
  - *The Real-World Analogy:* Explaining abstract enterprise concepts using relatable analogies (e.g., Subaccounts as office branches, Destinations as address books, XSUAA as a security bouncer).
  - *Enterprise Reality:* How this actually works in a Fortune 500 company.
  - *Technical Deep Dive:* Diagrams, configuration examples, and code snippets.
  - *Interactive Quiz Checkpoints:* Real-time knowledge checks with explanations for right and wrong answers.
  - *Key Takeaway Cards:* Quick-reference revision cards.

### Feature 3: Hands-On Coding Exercises (Simulated Sandboxes)
- **Simulated CDS & CAP Model Sandbox:**
  - Write or modify `.cds` entity definitions (Entities, Elements, Associations).
  - Test service definitions (`service CatalogService { entity Books as projection on my.Books; }`).
  - View auto-generated mock database tables and mock OData v4 metadata and JSON payloads.
- **OData Query Explorer:**
  - Interactive test bench to run simulated `$select`, `$filter`, `$expand`, and `$top` queries against simulated BTP services.
  - Immediate visual feedback with JSON response viewer and query explanations.
- **Strict Distinction:** Every sandbox prominently displays a badge: **"SIMULATED SAP ENVIRONMENT — NO REAL CREDENTIALS NEEDED"** to prevent confusion.

### Feature 4: SAP Terminology Cheatsheet & Acronym Decoder
- **Searchable, Filterable Dictionary:**
  - Over 100+ essential SAP BTP terms (BTP, CAP, RAP, CDS, BAS, MTA, CF, Kyma, Fiori, UI5, XSUAA, Destination, Event Mesh, Cloud Connector, etc.).
  - Filter by category: Architecture, Backend, Frontend, Integration, Security, Database.
  - "Plain English" translation toggle vs "Official SAP Definition".
  - "Equivalent in Modern Web Tech" (e.g., CAP = Express/NestJS + Prisma; Destination = Managed Axios/Fetch Config + OAuth2; XSUAA = Auth0/Keycloak with JWT).

### Feature 5: Visual Architecture Design Lab
- **Interactive BTP Topology Canvas:**
  - Drag-and-drop or node-based visual configuration of SAP BTP solutions.
  - Connect components: Fiori App -> Approuter -> CAP Node.js / Java Service -> SAP HANA Cloud DB.
  - Connect to On-Premise S/4HANA via Cloud Connector & BTP Destination Service.
  - Add Event Mesh for asynchronous event-driven messaging.
- **Architecture Validator:**
  - Analyzes the student's diagram and highlights missing components (e.g., "Warning: Direct database access from frontend detected! You must route requests through Approuter and a CAP Service").
  - Generates estimated cost profile (Free Tier eligible vs Paid Services) and generates an `mta.yaml` deployment descriptor preview.

### Feature 6: Career Hub & Interview Preparation
- **Role Blueprints:**
  - SAP BTP Developer, CAP Developer, SAP Integration Consultant, Fiori/UI5 Front-End Engineer.
  - Required skills, day-to-day responsibilities, and recommended project portfolios.
- **Interactive Interview Flashcards:**
  - 50+ curated BTP interview questions categorized by topic and difficulty (Junior vs Mid).
  - "Beginner Answer" vs "Senior Architect Answer" breakdown.
- **Starter Project Blueprints:**
  - Step-by-step specifications for 3 resume-worthy student projects (e.g., "Smart Warehouse Inventory Manager", "Employee Reimbursement Workflow", "Supplier Multi-Tenant Portal").

### Feature 7: Zero-to-Cloud Setup Guide
- **Actionable Step-by-Step Onboarding:**
  - Registering for SAP BTP Free Tier / Trial without billing gotchas.
  - Setting up SAP Business Application Studio (BAS) vs local VS Code with SAP Fiori tools and `@sap/cds-dk`.
  - Cloud Foundry CLI (`cf login`, `cf push`) cheat sheet and common troubleshooting guide.
  - Interactive Troubleshooting Wizard for common beginner setup errors (e.g., Quota exceeded, trial account expired, CORS errors, invalid destination names).

---

## 4. Mandatory Educational Standards

1. **Zero Prior Knowledge Assumed:** Jargon must be explained upon first mention.
2. **Technically Accurate:** While analogies simplify concepts, technical details must align 100% with modern SAP BTP standards (e.g., promoting CAP/RAP over legacy solutions; using OData v4; adopting SAP Horizon theme aesthetics).
3. **Transparent Simulation:** All interactive components clearly state whether they run simulated browser-based code or interface with actual APIs. No deceptive mocks.
4. **No Dead Ends:** Every button, tab, search bar, and interactive control must be fully functional. No placeholder `onClick={() => alert('Coming soon')}`.

---

## 5. Non-Functional Requirements

- **Performance:** Instant client-side navigation, lighthouse score 90+, fast interactive execution.
- **Responsiveness:** Flawless layout on Mobile (375px+), Tablet (768px+), Laptop (1024px+), and Large Desktop (1440px+).
- **Accessibility:** WCAG 2.1 AA compliant, semantic HTML, keyboard navigable, screen-reader friendly, contrast compliant.
- **Code Quality:** 100% Strict TypeScript (`strict: true`), zero TypeScript errors, clean ESLint validation.
- **Security:** Zero secrets or credentials committed or exposed; client-side only mock data; sanitized user inputs.
