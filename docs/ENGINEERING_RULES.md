# BTP Launchpad — Engineering Rules & Operational Standards

## 1. Project Identity

**BTP Launchpad** is a student-facing educational product that teaches SAP Business Technology Platform (BTP) development to complete beginners.

- **Development Deadline:** 4–6 weeks.
- **Success Criterion:** A functional, tested, responsive application with all major agreed features.

---

## 2. Mandatory Engineering Standards

1. **Inspect existing code before modifying it:** Understand surrounding logic, dependencies, and style before making edits.
2. **Preserve working functionality:** Never break existing features or regressions during additions or refactorings.
3. **Use modular, reusable, and maintainable components:** Avoid giant monolithic files; break components into clean, single-responsibility units.
4. **Use TypeScript strictly where applicable:** Strict typing (`strict: true`), explicit interfaces, no lazy `any` types.
5. **Do not use fake functionality or non-working buttons:** Every interactive control, tab, modal, filter, and button must execute its intended action or provide real feedback. No dead ends.
6. **Never claim an untested feature is complete:** A feature is only complete after verification via tests and runtime checks.
7. **Maintain beginner-friendly and technically accurate educational content:** Demystify enterprise jargon with plain English analogies while preserving rigorous technical accuracy.
8. **Distinguish simulated SAP operations from real SAP BTP operations:** Clearly label in-browser sandboxes with prominent simulation indicators.
9. **Never expose credentials or secrets:** Keep `.env` and sensitive tokens strictly out of version control; use safe mock environments.
10. **Keep the application responsive and accessible:** Ensure full compatibility from mobile viewports (375px) to widescreen desktops (1440px+), adhering to WCAG 2.1 AA accessibility guidelines.

---

## 3. GitHub Management & 10-Minute Checkpoint Policy

- **Repository:** `https://github.com/Kumari-Anjali-12/btp-launchpad`
- **Primary Branch:** `main`

### 10-Minute Active-Development Checkpoint Cycle:
At each 10-minute active development window:
1. **Inspect git status:** Check which files have been modified or staged.
2. **Review the diff:** Ensure only intended, clean changes are present.
3. **Run relevant tests and validation:** Execute TypeScript checks, linter, tests, and build verification.
4. **Fix straightforward failures:** Immediately correct any compiler or test issues.
5. **Commit meaningful changes:** Write clear, imperative, conventional commit messages.
6. **Push verified commits to configured remote:** Push directly to `main` on `origin`.
7. **Verify the push:** Confirm remote branch reflects the new commit.

### Restrictions:
- **Never force-push (`git push --force`) or rewrite existing git history.**
- **Never commit secrets, environment files, or unrelated changes.**
- **Never commit knowingly broken work to `main`.**
- If a persistent timer is unavailable, active-session checkpoints are triggered systematically after each validated milestone or logical chunk of work.

---

## 4. Debugging Policy

For every error encountered during development:
1. **Capture the actual error:** Record the full error trace, command output, or console diagnostic.
2. **Identify its root cause:** Trace the underlying mechanism causing the issue.
3. **Make a targeted correction:** Formulate a precise, minimal fix addressing the root cause.
4. **Rerun the failing command:** Confirm the exact failure condition is resolved.
5. **Perform regression testing:** Verify existing functionality remains unbroken.
6. **Document the correction:** Record findings in `docs/DEVELOPMENT_LOG.md`.

*Strict Rule:* Never suppress errors, bypass linters, or silence tests to make builds artificially pass.

---

## 5. Quality Assurance Gates

Before any milestone is completed, run applicable:
- **TypeScript checks:** `npm run typecheck` (`tsc --noEmit`)
- **ESLint:** `npm run lint`
- **Unit & Integration Tests:** `npm run test`
- **Production Build:** `npm run build`
- **Browser Functional Tests:** Verification of user interaction flows
- **Responsive Layout Verification:** Mobile, tablet, desktop viewports
- **Accessibility Checks:** Semantic structure, ARIA attributes, keyboard focus

---

## 6. Development Reporting Requirements

Keep all documentation continuously synchronized:
- `README.md`
- `docs/PRODUCT_REQUIREMENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/DEVELOPMENT_LOG.md`
- `docs/ROADMAP.md`
- `docs/TESTING.md`
- `docs/ENGINEERING_RULES.md`

Always report completed work, failed tests, known issues, latest commit SHA, and remote push status accurately.

---

## 7. Product Priorities

1. **Working functionality**
2. **Educational accuracy**
3. **User experience**
4. **Accessibility**
5. **Reliability**
6. **Visual polish**

*Never prioritize decorative elements over core functionality.*
