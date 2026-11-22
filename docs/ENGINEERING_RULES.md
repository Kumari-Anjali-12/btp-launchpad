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

## 3. GitHub Management & Checkpoint Protocol

- **Repository:** `https://github.com/Kumari-Anjali-12/btp-launchpad`
- **Primary Branch:** `main`

### 3.1. 10-Minute Active-Development Checkpoint Cycle
Every 10 minutes of active development, perform a Git checkpoint:
1. **Inspect git status:** `git status` to identify modified and newly created files.
2. **Review git diff:** `git diff --check` to review changes and guard against syntax or whitespace defects.
3. **Run relevant tests and validation:** Execute type checks, linter, tests, and build verification.
4. **Correct straightforward errors:** Immediately correct any identified defects.
5. **Stage only relevant files:** `git add <specific-files>`. Never stage unrelated files or secrets.
6. **Create a meaningful commit:** `git commit -m "type: meaningful description"`.
7. **Push the commit to origin:** `git push origin <current-branch>`. Local commits alone do not satisfy the checkpoint.
8. **Verify remote synchronization:** Verify via `git status`, `git log -1 --oneline`, and `git ls-remote origin`.
9. **Update the development log:** Record entries in `docs/DEVELOPMENT_LOG.md` whenever meaningful information changes.

*Active-Session Checkpoint Limitation:* If an automated persistent background timer is unavailable, checkpoints are strictly executed at each 10-minute active development window and immediately following every verified unit of work.

### 3.2. Strict Branch Limit (Maximum 6 Branches Total)
The repository may contain:
- **One permanent `main` branch.**
- **A maximum of five additional branches.**
- **Maximum total: Six branches.**

**Pre-Branch Creation Protocol:**
1. Inspect all existing branches (`git branch -a`).
2. Determine whether an existing branch can be reused.
3. Check whether the task genuinely requires a separate branch (never create branches for trivial UI adjustments or single file edits).
4. Confirm total branch count will not exceed six.
5. Once the limit of six branches is reached, no additional branches may be created without explicit user authorization.

### 3.3. GitHub Commit & History Rules
- **Never force-push (`git push --force`) or rewrite existing Git history.**
- **Never commit empty commits, secrets, environment files, or unrelated changes.**
- **Never commit knowingly broken work to `main`.** If a feature is incomplete, commit a coherent intermediate state on an appropriate feature branch.
- If a push fails, diagnose and resolve the issue immediately; never falsely report success.

---

## 4. Strict File and Documentation Discipline

Before creating any file, determine whether it is strictly necessary. Prefer updating existing files over creating new ones.

### Prohibitions:
- Do NOT create duplicate documentation.
- Do NOT create redundant instruction files.
- Do NOT create multiple versions of the same configuration.
- Do NOT create unnecessary temporary files.
- Do NOT create unused components or placeholder pages.
- Do NOT create duplicate utilities or unnecessary abstractions.

### Canonical Documentation Structure:
- `README.md` — Primary product entry point (kept continuously updated).
- `docs/ENGINEERING_RULES.md` — Governance, standards, checkpoint protocols, priorities.
- `docs/PRODUCT_REQUIREMENTS.md` — Personas, detailed feature requirements, educational standards.
- `docs/ARCHITECTURE.md` — System architecture, simulation engine, directory structure, security.
- `docs/ROADMAP.md` — Phased 4–6 week schedule and milestones.
- `docs/TESTING.md` — QA strategy, testing matrix, checkpoint verification criteria.
- `docs/DEVELOPMENT_LOG.md` — Concise, chronological development audit trail.

*Rule:* Do not create additional documentation files unless a concrete requirement justifies them.

---

## 5. README Maintenance Protocol

`README.md` is the primary entry point to BTP Launchpad. It must be updated whenever:
- Features are added or modified.
- Technology stack or tooling changes.
- Installation, setup, or development commands change.
- Environment configurations change.
- Testing or deployment instructions change.
- Major functionality becomes available.
- Project status changes materially.

*Mandatory Sections in README.md:*
- Product description & vision.
- Main features.
- Technology stack.
- Installation instructions.
- Development commands.
- Environment configuration.
- Testing instructions.
- Deployment instructions.
- Current implementation status.

---

## 6. Error Analysis and Self-Correction (Debugging Policy)

For every implementation error:
1. **Capture the exact error:** Full error trace, console diagnostic, or command exit code.
2. **Identify the affected component or file:** Locate the precise line and file responsible.
3. **Determine the root cause:** Trace why the failure occurred.
4. **Review recent code changes:** Check the git diff for unintended side-effects.
5. **Implement a targeted correction:** Formulate a minimal, precise fix.
6. **Rerun the failing operation:** Confirm the exact failure condition is resolved.
7. **Perform regression testing:** Verify existing functionality remains unbroken.
8. **Document unresolved issues honestly:** Never suppress errors or disable tests to force passing status.

---

## 7. Mandatory Final Checkpoint Report Format

At every meaningful checkpoint, output a structured report containing:
- **Current development phase:** Current phase from roadmap.
- **Features completed:** Concrete functional items finished in this cycle.
- **Files created or modified:** Specific list of affected files.
- **Tests executed:** Commands run and their outcomes.
- **Errors identified:** Issues caught during verification.
- **Errors corrected:** Specific fixes applied.
- **Remaining issues:** Any open blockers or pending items.
- **Latest commit hash:** Current commit SHA.
- **Branch name:** Active working branch.
- **GitHub push verification:** Remote sync confirmation (`git ls-remote`).
- **Remaining branch capacity:** Exact number of branch slots remaining (out of 6 total).

---

## 8. Product Priorities

1. **Functional application**
2. **Correct implementation**
3. **Testing and reliability**
4. **Documentation accuracy**
5. **GitHub synchronization**
6. **Accessibility**
7. **Visual refinement**

*The objective is a maintainable product, not an unnecessarily large repository.*
