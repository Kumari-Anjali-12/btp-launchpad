# Local Development & Testing Guide
## SAP CAP Employee Leave Management System

This guide explains how any developer can run, test, and inspect the real SAP CAP project locally on Windows, macOS, or Linux without installing global CLI tools or provisioning cloud subscriptions.

---

## 1. Prerequisites

- **Node.js:** `>=18.0.0` (Recommended: v20 LTS, v22 LTS, or active v24).
- **npm:** `>=9.0.0`.
- **Git:** Standard git client.

*Zero Global CLI Requirement:* You do NOT need `@sap/cds-dk` installed globally. The project includes all development tools as project-local dependencies.

---

## 2. Project Location

From the repository root:
```powershell
cd G:\BTP-Launchpad\projects\employee-leave-management
```

---

## 3. Installing Dependencies

```powershell
npm install
```
This installs:
- `@sap/cds`: Core CAP framework runtime.
- `@sap/cds-dk`: Developer tools and CLI (`cds`).
- `@cap-js/sqlite`: In-memory SQLite database driver.
- `mocha`, `chai`, `axios`: Automated backend test harness.

---

## 4. Running the Automated Backend Test Suite

To run all 12 headless integration tests:
```powershell
npm test
```

### What `npm test` Does Automatically:
1. Executes `npm run pretest` (`cds deploy --to sqlite`), compiling `db/schema.cds` into SQLite DDL and seeding tables from CSV files in `db/data/`.
2. Launches an in-process `@sap/cds` test server using `cds.test`.
3. Runs all Mocha test suites in `test/`:
   - `test/authorization.test.js`: Verifies role-based access control (`alice` vs `carol`).
   - `test/leave-service.test.js`: Verifies date chronology, interval overlap prevention, balance checking, and draft-to-submission transitions.
   - `test/manager-workflow.test.js`: Verifies manager approval actions, atomic balance deductions, and audit logging.

Expected result: **12 passing (5s)**.

---

## 5. Starting the Local Interactive Server

To launch the live CAP server with hot-reload:
```powershell
npx cds watch
```

Output:
```
[cds] - loaded model from 4 file(s):
  db/schema.cds
  srv/leave-service.cds
  srv/manager-service.cds
  srv/admin-service.cds
[cds] - connect to db > sqlite { database: 'db.sqlite' }
[cds] - serving LeaveService { path: '/odata/v4/leave' }
[cds] - serving ManagerService { path: '/odata/v4/manager' }
[cds] - serving AdminService { path: '/odata/v4/admin' }
[cds] - server listening on { url: 'http://localhost:4004' }
```

Open `http://localhost:4004` in your browser to view:
- The Developer Launchpad preview (`app/index.html`).
- OData V4 Metadata and Entity Collections.
- Live Fiori Elements preview.

---

## 6. Testing Personas via Mock Authentication

When running locally, CAP simulates authentication roles defined in `.cdsrc.json`:

| Persona | Username | Password | Assigned Roles | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Alice** | `alice` | *(empty)* | `LeaveEmployee` | Submit leave requests, view own balances and logs. |
| **Bob** | `bob` | *(empty)* | `LeaveEmployee`, `LeaveManager` | View direct reports, approve/reject pending team requests. |
| **Carol** | `carol` | *(empty)* | `LeaveEmployee`, `LeaveManager`, `LeaveAdmin` | Administer company leave policies, run annual accruals. |

### Testing via curl:
```powershell
# Alice reads her leave balances (HTTP 200)
curl -u alice: http://localhost:4004/odata/v4/leave/LeaveBalances

# Alice attempts to access AdminService (HTTP 403 Forbidden)
curl -u alice: http://localhost:4004/odata/v4/admin/Employees

# Carol accesses AdminService (HTTP 200 OK)
curl -u carol: http://localhost:4004/odata/v4/admin/Employees
```
