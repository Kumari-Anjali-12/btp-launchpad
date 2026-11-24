# BTP Launchpad — Quality Assurance & Testing Strategy

## 1. Quality Philosophy

In accordance with the BTP Launchpad Mandatory Engineering Standards:
- **Never claim an untested feature is complete.**
- **Do not suppress errors to make builds appear successful.**
- **Preserve working functionality through regression testing.**

Every component, utility, engine, and educational module must undergo rigorous verification before being merged or committed.

---

## 2. Testing Levels & Matrix

| Level | Tool / Framework | Scope | Command |
|---|---|---|---|
| **Type Verification** | TypeScript (`tsc`) | Full codebase strict type check | `npm run typecheck` |
| **Linting & Code Style** | ESLint | Code standards, dead code, imports | `npm run lint` |
| **Unit Testing** | Vitest / Jest | Pure functions, CDS parser, OData mock, linter, utilities | `npm run test:unit` |
| **Component Testing** | React Testing Library | Component rendering, user interactions, accessibility | `npm run test:components` |
| **Integration Testing** | Vitest | Multi-component workflows (e.g., Quiz -> Progress state, Design Lab -> MTA Generator) | `npm run test:integration` |
| **Production Build** | Vite / Next.js | Bundling, tree-shaking, production asset generation | `npm run build` |
| **Accessibility Testing** | Axe-core / Manual audit | Keyboard navigation, ARIA roles, contrast ratio (WCAG 2.1 AA) | Manual / automated checks |
| **Responsive Testing** | Viewport Emulation | Mobile (375px), Tablet (768px), Laptop (1024px), Desktop (1440px+) | Browser / Playwright |
| **CAP Backend Integration** | Mocha / Chai / SQLite | Standalone CAP OData endpoints, validations, transactions, RBAC | `cd projects/employee-leave-management && npm test` |
| **Real Browser Chrome Audit** | Playwright (Google Chrome) | Complete end-to-end user journeys & live screenshot verification | `npm run test:capstone` |

---

## 3. Checkpoint Verification Protocol

Before every 10-minute checkpoint commit and push:

1. **Step 1: Type Checking**
   ```bash
   npm run typecheck
   ```
   *Pass Criterion:* Zero errors (`Found 0 errors`).

2. **Step 2: Linting**
   ```bash
   npm run lint
   ```
   *Pass Criterion:* Zero errors or unhandled warnings.

3. **Step 3: Automated Test Suite**
   ```bash
   npm run test
   ```
   *Pass Criterion:* 100% passing tests.

4. **Step 4: Production Build Verification**
   ```bash
   npm run build
   ```
   *Pass Criterion:* Clean build output in `dist/` or `.next/` without asset or bundling errors.

5. **Step 5: Git Status & Diff Inspection**
   ```bash
   git status
   git diff
   ```
   *Pass Criterion:* Only clean, relevant, intended changes staged. No temporary files or secrets.

---

## 4. Test Suites Inventory (Target Architecture)

### 4.1. In-Browser Simulated Engines
- **CDS Parser Tests:**
  - Parses basic entity declarations with data types (`String`, `Integer`, `UUID`, `Decimal`).
  - Handles `Association to` and `Composition of` relationships.
  - Flags syntax errors gracefully with helpful line-specific beginner messages.
- **Mock OData v4 Engine Tests:**
  - Accurately executes `$select=name,price` on mock datasets.
  - Accurately executes `$filter=price gt 20` and string filters.
  - Supports `$top` and `$skip` for pagination.
  - Formats responses in standard OData v4 JSON envelope (`@odata.context`, `value`).
- **Architecture Design Lab Linter Tests:**
  - Successfully detects missing authentication when frontend connects directly to backend.
  - Successfully detects missing Cloud Connector when routing to on-premise S/4HANA.
  - Successfully generates valid `mta.yaml` YAML structure from node graph.

### 4.2. Interactive Learning & Quiz Components
- **Quiz Engine Tests:**
  - Displays questions, tracks selected options, and computes correct score.
  - Renders explanations for both correct and incorrect choices.
  - Updates and persists user progress to LocalStorage upon completion.
- **Terminology Search & Filter Tests:**
  - Matches queries across terms, abbreviations, and definitions.
  - Category filters accurately narrow down the dictionary.

---

## 5. Regression & Bug Logging Standard

Whenever an issue is caught:
1. Log the issue in `docs/DEVELOPMENT_LOG.md`.
2. Add a failing test case that reproduces the bug.
3. Apply targeted fix.
4. Verify the test passes and no existing tests break.
5. Document root cause and resolution.
