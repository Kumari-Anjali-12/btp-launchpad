import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_6: SyllabusPhase = {
  id: 'phase-6',
  number: 6,
  title: 'Deploy and Operate',
  tagline: 'Phase 6 · Weeks 1-2 · ~12 Hours',
  description:
    'Package enterprise multi-target applications (MTA), automate build and deployment pipelines with CI/CD, implement rigorous automated test suites for CAP, and operate mission-critical cloud workloads with Cloud Logging, distributed tracing, and incident runbooks.',
  coreObjective:
    'Package a complete full-stack enterprise cloud application as an MTA, build the deployable MTAR archive with MBT, execute zero-downtime blue-green deployments on Cloud Foundry, automate delivery pipelines using GitHub Actions, and diagnose distributed microservice failures using structured logs and correlation IDs.',
  estimatedHours: 12,
  suggestedWeeks: 'Weeks 17-18',
  badgeCategory: 'core',
  capstone: PHASE_CAPSTONES[6]!,
  modules: [
    {
      id: 'mod-6-1',
      code: '6.1',
      phaseId: 'phase-6',
      title: 'MTA Deployment',
      tagline: 'Multi-Target Application Descriptors (mta.yaml) & Packaging',
      summary:
        'Master the Multi-Target Application (MTA) architecture for SAP BTP. Author and configure mta.yaml descriptors, define modules and cloud resources, wire dependencies with provides/requires clauses, compile with Cloud MTA Build Tool (mbt), and execute zero-downtime deployments via cf deploy and blue-green strategies.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'MTA concept: declarative specification of modules, resources, parameters, and dependencies',
        'mta.yaml anatomy: ID, version, modules (srv, app, db-deployer), resources (HANA, XSUAA, Destination)',
        'Cloud MTA Build Tool (mbt): mbt build, Makefile generation, MTAR archive assembly',
        'Cloud Foundry Deploy Service: cf deploy, deployer plugin, MTA manifest tracking',
        'Dependencies: requires/provides contracts and configuration injection between modules',
        'Blue-Green deployment: cf bg-deploy, parallel application staging, zero-downtime route cutover',
        'Deployment extension descriptors: mtaext files for multi-environment (dev, test, prod) overrides',
      ],
      practicalImplementation:
        'Generate an mta.yaml descriptor using cds add mta, inspect the generated srv, db, and approuter modules, customize resource bindings, build an MTAR archive using mbt build, deploy to a Cloud Foundry space with cf deploy, perform a blue-green zero-downtime update, and create a production mtaext extension descriptor for memory and scaling overrides.',
      masteryCheck:
        'Generate an mta.yaml file for a full-stack CAP project. Configure backend, database deployer, and XSUAA resources. Successfully build an .mtar archive with mbt build, and describe how blue-green deployment handles routing transition without downtime.',
      learningObjectives: [
        'Author valid mta.yaml files configuring modules, managed cloud resources, and configuration parameters.',
        'Compile multi-target projects into deployable .mtar archives using the Cloud MTA Build Tool (mbt).',
        'Execute automated deployments and rollbacks to Cloud Foundry using cf deploy and cf bg-deploy.',
        'Apply mtaext extension descriptors to adapt build and runtime properties across dev, staging, and prod environments.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Generate and Inspect mta.yaml via CDS',
          subtitle: 'The standard blueprint for full-stack BTP deployment',
          explanation:
            'Execute `cds add mta` in your CAP project root. The CDS CLI analyzes package.json, db/ schema files, and srv/ services, automatically generating a standardized mta.yaml file defining the db-deployer module, the srv backend module, and references to HANA Cloud and XSUAA services.',
          keyIdea:
            'cds add mta provides a battle-tested SAP baseline descriptor respecting CDS conventions.',
        },
        {
          stepNumber: 2,
          title: 'Configure Module Properties, Provides, and Requires',
          subtitle: 'Wiring inter-microservice configuration dynamically',
          explanation:
            'Inspect the srv module in mta.yaml. Ensure it specifies `provides: - name: srv-api, properties: { srv-url: "${default-url}" }`. In the approuter or UI module, add `requires: - name: srv-api, group: destinations, properties: { name: srv-api, url: "~{srv-url}", forwardAuthToken: true }`. This declaratively wires the microservices together.',
          keyIdea:
            'Provides and Requires clauses dynamically inject runtime URLs and credentials between isolated microservices.',
        },
        {
          stepNumber: 3,
          title: 'Declare Managed Cloud Resources',
          subtitle: 'Instructing BTP to provision backing enterprise services',
          explanation:
            'Under the resources section, declare each BTP service dependency. For HANA Cloud, configure `type: com.sap.xs.hana, service: hana, service-plan: hdi-shared`. For authorization, configure `type: org.cloudfoundry.managed-service, service: xsuaa, service-plan: application, parameters: { path: ./xs-security.json }`.',
          keyIdea:
            'Resources instruct BTP to provision or locate backing cloud service instances during deployment.',
        },
        {
          stepNumber: 4,
          title: 'Assemble MTAR with Cloud MTA Build Tool (mbt)',
          subtitle: 'Compiling immutable multi-module release archives',
          explanation:
            'Run `mbt build -t gen/ --mtar app_1.0.0.mtar`. MBT parses mta.yaml, executes module build tasks (compiling TypeScript/CDS, packaging Node modules, optimizing UI5 bundles), and writes a signed, compressed Multi-Target Application Archive (.mtar) inside the gen/ directory.',
          keyIdea:
            'The .mtar is an immutable release artifact ready for deployment across dev, test, and production.',
        },
        {
          stepNumber: 5,
          title: 'Execute Deployment via Cloud Foundry CLI',
          subtitle: 'Atomic deployment and zero-downtime blue-green cutover',
          explanation:
            'Authenticate to your target BTP subaccount and space using `cf login`. Run `cf deploy gen/app_1.0.0.mtar`. For production zero-downtime releases, execute `cf bg-deploy gen/app_1.0.0.mtar --no-confirm`. Observe the step-by-step service provisioning, droplet upload, container start, and route mapping in the terminal.',
          keyIdea:
            'cf deploy guarantees atomic, automated orchestration of all cloud resources and microservice containers.',
        },
      ],
      diagramType: 'mta-lifecycle',
      analogy: {
        concept: 'Multi-Target Application (MTA) Packaging and Deployment',
        analogy: 'Prefabricated Modular Home Construction and Convoy Delivery',
        explanation:
          'Think of building a prefabricated modular home. You have different specialized rooms: the kitchen (CAP backend service), the living room (Fiori user interface), and the utility basement (HANA database). You do not want construction crews building each room on-site haphazardly without electrical and plumbing coordination. Instead, an architectural blueprint (mta.yaml) specifies every modular room, its exact dimensions, and what utilities it requires. The prefabricated factory builds all modules and bundles them into a single shipping convoy (the .mtar archive). When the convoy arrives on site, the master builder (cf deploy) installs the foundation first, connects the water and electricity mains (BTP cloud resources), bolts the rooms together according to the blueprint, and switches on the master power breaker in one coordinated sequence.',
        transition:
          'Where the prefab blueprint coordinates modular rooms, mta.yaml coordinates microservices, cloud bindings, and routing into a single deployable MTAR archive.',
      },
      conceptExplanation: {
        whatItIs:
          'A Multi-Target Application (MTA) is an SAP standard composite application model comprising multiple microservice components implemented with different runtimes, backed by managed cloud service instances, and described in a declarative mta.yaml file.',
        whyItExists:
          'Enterprise cloud systems cannot rely on developers manually running dozens of ad-hoc terminal commands in production. MTA packaging ensures reproducibility, deterministic dependency ordering, automated rollbacks upon failure, and continuous audit compliance.',
        problemSolved:
          'Eliminates human error during multi-service deployments, automates cloud service instance provisioning, binds credentials deterministically, and enables zero-downtime blue-green upgrades.',
        howItWorks:
          'mta.yaml defines modules and resources. MBT compiles code into an MTAR archive with a manifest. The Cloud Foundry Deploy Service parses the manifest, provisions resources, stages containers in topological order based on dependencies, binds services, and routes traffic.',
        btpFit:
          'MTA is the definitive deployment packaging standard across SAP BTP Cloud Foundry and Neo environments, fully supported by SAP Continuous Integration and Delivery and Project Piper.',
      },
      jargonTerms: [
        {
          term: 'mta.yaml',
          simpleMeaning: 'The master blueprint text file that lists all parts of your cloud app and what services they need.',
          familiarEquivalent: 'An architectural blueprint and bill-of-materials for a modular building.',
        },
        {
          term: 'MTAR (.mtar)',
          simpleMeaning: 'A single zip file containing all your compiled code and manifest, ready to be sent to BTP.',
          familiarEquivalent: 'A sealed shipping crate packed with all the modular parts ready for installation.',
        },
        {
          term: 'Blue-Green Deployment',
          simpleMeaning: 'Upgrading software with zero downtime by running the new version side-by-side with the old before switching users over.',
          familiarEquivalent: 'Opening a brand new bridge next to an old bridge and switching traffic over in one second without stopping cars.',
        },
        {
          term: 'mtaext',
          simpleMeaning: 'An override file that lets you change settings for test or production without editing the main blueprint.',
          familiarEquivalent: 'An addendum sheet attached to a blueprint specifying local site modifications.',
        },
      ],
      technicalExample: {
        title: 'Production mta.yaml for Full-Stack CAP & SAP HANA Cloud Application',
        language: 'yaml',
        code: `_schema-version: '3.1'
ID: logistics-management-mta
description: Enterprise Logistics Management Full-Stack Application
version: 1.0.0

modules:
  # CAP Node.js Backend Service
  - name: logistics-srv
    type: nodejs
    path: gen/srv
    requires:
      - name: logistics-db
      - name: logistics-auth
    provides:
      - name: srv-api
        properties:
          srv-url: '\${default-url}'
    parameters:
      buildpack: nodejs_buildpack
      memory: 512M
      disk-quota: 1024M

  # Database HDI Deployer
  - name: logistics-db-deployer
    type: hdb
    path: gen/db
    requires:
      - name: logistics-db
    parameters:
      buildpack: nodejs_buildpack
      memory: 256M

resources:
  # SAP HANA Cloud HDI Container
  - name: logistics-db
    type: com.sap.xs.hana
    parameters:
      service: hana
      service-plan: hdi-shared

  # SAP XSUAA Authentication Service
  - name: logistics-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: logistics-management-auth
        tenant-mode: dedicated`,
        purpose:
          'Declares the complete microservice architecture, module buildpaths, runtime constraints, and managed SAP HANA and XSUAA service instances.',
        lineExplanations: [
          { lines: '1-4', explanation: 'Declares MTA schema version 3.1, unique application ID, description, and semantic version 1.0.0.' },
          { lines: '7-18', explanation: 'Declares backend Node.js CAP service module, requiring db and auth resources, providing srv-api URL.' },
          { lines: '20-27', explanation: 'Declares database deployer module executing HDI container artifact creations during deployment.' },
          { lines: '29-35', explanation: 'Declares managed SAP HANA Cloud HDI container resource with hdi-shared plan.' },
          { lines: '37-45', explanation: 'Declares managed XSUAA security resource referencing xs-security.json configuration.' },
        ],
        expectedOutput:
          'mbt build successfully packages this configuration into logistics-management-mta_1.0.0.mtar without validation errors.',
        commonMistakes: [
          'Failing to run cds build --production before mbt build, leaving gen/srv and gen/db empty or out of date.',
          'Using tab characters in YAML instead of spaces, causing MBT parser errors.',
          'Mismatch between the resource name in mta.yaml and the binding name in package.json.',
        ],
      },
      businessScenario: {
        title: 'Global Freight Logistics Zero-Downtime Release',
        context:
          'TransGlobal Logistics experienced 45-minute system outages every Tuesday evening when developers manually deployed CAP services, resulting in container terminal congestion and stranded shipment manifests.',
        workflowSteps: [
          'Developer packages release into immutable .mtar using Cloud MTA Build Tool (mbt).',
          'Automated pipeline triggers cf bg-deploy to target Cloud Foundry space.',
          'Deployer provisions new containers on parallel temporary -idle route.',
          'Automated health check endpoints verify database connectivity and auth.',
          'Router instantly shifts live traffic to new version; old containers decommissioned cleanly with zero downtime.',
        ],
        businessImpact:
          'Eliminated weekly 45-minute operational outages, enabling continuous daily releases without disrupting port container operations.',
      },
      quizQuestions: [
        {
          id: 'mod-6-1-q1',
          question: 'What is the primary role of the mta.yaml file in an SAP BTP project?',
          options: [
            {
              id: 'a',
              text: 'It acts as an ABAP program file that executes transactional logic in S/4HANA.',
              isCorrect: false,
              explanation: 'Incorrect. mta.yaml is a YAML configuration descriptor, not ABAP executable code.',
            },
            {
              id: 'b',
              text: 'It declaratively specifies all modules, backing cloud resources, dependencies, and parameters for deployment.',
              isCorrect: true,
              explanation: 'Correct. mta.yaml is the definitive architectural deployment descriptor for Multi-Target Applications.',
            },
            {
              id: 'c',
              text: 'It is a database index configuration file used exclusively by SAP ASE databases.',
              isCorrect: false,
              explanation: 'Incorrect. Database schemas are defined in CDS or SQL DDL, not mta.yaml.',
            },
            {
              id: 'd',
              text: 'It replaces Dockerfiles by running Linux containers directly on local Windows desktops.',
              isCorrect: false,
              explanation: 'Incorrect. MTA is an SAP BTP cloud packaging standard, not a local Docker replacement.',
            },
          ],
        },
        {
          id: 'mod-6-1-q2',
          question: 'How does Blue-Green deployment (cf bg-deploy) prevent application downtime during upgrades?',
          options: [
            {
              id: 'a',
              text: 'It reboots the physical data center hardware while caching web requests in browser memory.',
              isCorrect: false,
              explanation: 'Incorrect. Blue-green deployment operates at the Cloud Foundry routing layer, not hardware reboots.',
            },
            {
              id: 'b',
              text: 'It spins up the new application version on temporary idle routes, validates health, and atomically switches live routing.',
              isCorrect: true,
              explanation: 'Correct. cf bg-deploy maintains the active "green" environment while deploying "blue", switching traffic only when healthy.',
            },
            {
              id: 'c',
              text: 'It disables all user logins for 2 hours until database migrations complete.',
              isCorrect: false,
              explanation: 'Incorrect. Blue-green deployments exist specifically to eliminate downtime and maintenance windows.',
            },
            {
              id: 'd',
              text: 'It deletes all database tables and restores them from yesterday night tape backup.',
              isCorrect: false,
              explanation: 'Incorrect. That would cause massive data loss and catastrophic operational downtime.',
            },
          ],
        },
        {
          id: 'mod-6-1-q3',
          question: 'What is the purpose of an MTA Extension Descriptor (.mtaext)?',
          options: [
            {
              id: 'a',
              text: 'To override environment-specific parameters (e.g. memory limits, domains, service plans) without altering the base mta.yaml.',
              isCorrect: true,
              explanation: 'Correct. .mtaext files enable clean separation between core architecture and environment-specific settings (dev, test, prod).',
            },
            {
              id: 'b',
              text: 'To convert Node.js JavaScript code into compiled C++ binary executables.',
              isCorrect: false,
              explanation: 'Incorrect. mtaext is a YAML override descriptor, not a compiler.',
            },
            {
              id: 'c',
              text: 'To allow unauthenticated anonymous users to bypass BTP OAuth security checks.',
              isCorrect: false,
              explanation: 'Incorrect. Security policies are governed by XSUAA and role-collections, not mtaext files.',
            },
            {
              id: 'd',
              text: 'To compress PNG images inside the Fiori web application.',
              isCorrect: false,
              explanation: 'Incorrect. Image optimization is handled by frontend bundlers (e.g. UI5 Tooling or Vite).',
            },
          ],
        },
      ],
      keyTakeaways: [
        'mta.yaml declaratively coordinates all microservice modules, resources, and dependencies in one blueprint.',
        'Cloud MTA Build Tool (mbt) packages application components into an immutable .mtar release archive.',
        'cf bg-deploy delivers zero-downtime production upgrades via parallel container staging and atomic route cutover.',
      ],
      practicalActivity:
        'Open terminal in a CAP application directory. Run cds add mta. Inspect mta.yaml. Build an MTAR archive using mbt build. Inspect the generated archive contents.',
    },
    {
      id: 'mod-6-2',
      code: '6.2',
      phaseId: 'phase-6',
      title: 'CI and CD Basics',
      tagline: 'Continuous Integration Pipelines and Build-Once Deploy-Many',
      summary:
        'Build robust, automated CI/CD delivery pipelines for SAP BTP. Implement GitHub Actions workflows that automatically lint code, run automated test suites with coverage gates, compile MTAR release archives once, and deploy deterministically across development, quality, and production environments using stored BTP credentials.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'Continuous Integration vs. Continuous Delivery principles in enterprise software',
        'Build-Once, Deploy-Many principle: immutability of the compiled .mtar artifact',
        'GitHub Actions workflow architecture: triggers, jobs, runners, steps, and artifacts',
        'Automated quality gates: ESLint linting, Vitest/Jest unit tests, code coverage thresholds',
        'Secrets management: storing BTP CF credentials, service keys, and API tokens safely',
        'Multi-stage pipeline: automated dev deployment, staging validation, manual approval gates for production',
        'Automated rollback strategies upon failed health checks',
      ],
      practicalImplementation:
        'Create a .github/workflows/deploy.yml pipeline. Configure automated dependency installation, linting, test execution, and mbt build. Save the generated MTAR as a workflow artifact. Add an automated deployment job targeting Cloud Foundry using secret environment variables, and configure a manual approval gate for production promotion.',
      masteryCheck:
        'Author a complete GitHub Actions CI/CD workflow YAML file for a CAP application. Explain how the workflow separates the test, build, and deploy stages, how it safeguards BTP credentials, and how it enforces the Build-Once Deploy-Many principle.',
      learningObjectives: [
        'Design and write GitHub Actions workflow pipelines tailored for SAP BTP CAP applications.',
        'Enforce automated quality gates that reject failing pull requests before code merges.',
        'Implement the Build-Once Deploy-Many pattern using GitHub Actions workflow artifacts.',
        'Securely manage enterprise BTP service credentials using encrypted secrets and service keys.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Establish Linting and Test Scripts in package.json',
          subtitle: 'Setting up deterministic npm scripts for CI execution',
          explanation:
            'Configure package.json with standard scripts: `"lint": "eslint . --ext .js,.ts"`, `"test": "vitest run --coverage"`, and `"build": "cds build --production"`. Verify locally that all commands exit with exit code 0 on success and non-zero on failure.',
          keyIdea:
            'CI runners rely exclusively on process exit codes to determine whether a pipeline stage passed or failed.',
        },
        {
          stepNumber: 2,
          title: 'Configure GitHub Actions CI Workflow Trigger',
          subtitle: 'Automated validation on pushes and pull requests',
          explanation:
            'Create `.github/workflows/ci.yml`. Define triggers: `on: push: branches: [main]` and `pull_request: branches: [main]`. Set the runner to `runs-on: ubuntu-latest` and configure Node.js version matrix matching your production runtime.',
          keyIdea:
            'Triggering on pull requests catches regressions before problematic code is ever merged into the main codebase.',
        },
        {
          stepNumber: 3,
          title: 'Implement Automated Quality Gate Steps',
          subtitle: 'Clean installs, static analysis, and code coverage barriers',
          explanation:
            'In the workflow job, add checkout, Node setup, `npm ci` (clean install from package-lock.json), `npm run lint`, and `npm test`. Configure test coverage reporting to ensure tests fail if coverage falls below your organizational target (e.g. 80%).',
          keyIdea:
            'npm ci guarantees deterministic, byte-for-byte identical package installations on remote CI runners.',
        },
        {
          stepNumber: 4,
          title: 'Compile and Store MTAR Release Artifact',
          subtitle: 'Enforcing the Build-Once, Deploy-Many principle',
          explanation:
            'Install Cloud MTA Build Tool on the runner (`npm install -g mbt`). Execute `mbt build`. Use `actions/upload-artifact@v4` to store the generated `.mtar` archive. This preserves the immutable compiled binary for subsequent deployment jobs.',
          keyIdea:
            'Never recompile the MTAR between QA and Production; use the identical verified artifact.',
        },
        {
          stepNumber: 5,
          title: 'Deploy to SAP BTP Cloud Foundry using Secrets',
          subtitle: 'Secure credential injection and automated release execution',
          explanation:
            'In your repository settings, store secrets: `BTP_CF_API`, `BTP_CF_ORG`, `BTP_CF_SPACE`, and `BTP_CF_DEPLOY_USER` / `BTP_CF_DEPLOY_PASSWORD`. In the deployment job, download the MTAR artifact, install the Cloud Foundry CLI and multiapps plugin, authenticate, and run `cf deploy <archive>.mtar`.',
          keyIdea:
            'Never store plain-text credentials in git; always inject them dynamically from encrypted repository secret vaults.',
        },
      ],
      diagramType: 'cf-deployment',
      analogy: {
        concept: 'Continuous Integration & Continuous Delivery (CI/CD)',
        analogy: 'Commercial Airplane Manufacturing Inspection and Flight Certification',
        explanation:
          'Think of modern commercial airplane manufacturing. Before an aircraft carries paying passengers, it passes through an automated assembly and inspection line. Robot scanners check every rivet (linting), wind tunnels test aerodynamics under stress (unit testing), and a single FAA airworthiness certification certificate is stamped onto the airframe (the compiled MTAR artifact). The airline does not rebuild the airplane when moving it from the factory hangar to regional test flights or international passenger service; the exact same tested aircraft is simply assigned to different routes. If any sensor test fails during initial manufacturing, the assembly conveyor belt stops instantly and alerts the engineers.',
        transition:
          'Where the airplane inspection line verifies airworthiness once before flight, CI/CD pipelines test and package code once into an MTAR before deploying across BTP environments.',
      },
      conceptExplanation: {
        whatItIs:
          'Continuous Integration and Continuous Delivery (CI/CD) is an engineering practice where code changes are automatically validated, tested, packaged into deployable artifacts (CI), and systematically promoted through staged cloud environments to production (CD).',
        whyItExists:
          'Manual deployments by developers on local laptops introduce environmental drift, undocumented changes, human error, and security risks. CI/CD guarantees that only code passing strict automated tests reaches business users.',
        problemSolved:
          'Eliminates manual deployment mistakes, guarantees test execution before merging, prevents secret leaks, and drastically accelerates feature delivery cycles.',
        howItWorks:
          'Git push triggers GitHub Actions. Ephemeral runners install dependencies via npm ci, run linters, execute automated test suites, build the MTAR artifact with MBT, upload it to artifact storage, and deploy it to Cloud Foundry spaces using repository secrets.',
        btpFit:
          'Seamlessly integrates with SAP BTP via the Cloud Foundry CLI and multiapps plugin, supported by enterprise SAP Project Piper and SAP CI/CD service.',
      },
      jargonTerms: [
        {
          term: 'Continuous Integration (CI)',
          simpleMeaning: 'Automatically testing everyone\'s code changes together every time someone saves to Git.',
          familiarEquivalent: 'An automated vehicle inspection station every car must pass before entering the highway.',
        },
        {
          term: 'Continuous Delivery (CD)',
          simpleMeaning: 'Automatically packaging and preparing software so it can be deployed to cloud servers at the click of a button.',
          familiarEquivalent: 'An automated delivery truck loaded and standing by to dispatch packages upon delivery sign-off.',
        },
        {
          term: 'Build-Once Deploy-Many',
          simpleMeaning: 'Compiling your app only once into a package, and sending that exact same package to Dev, Test, and Live.',
          familiarEquivalent: 'Baking a batch of cookies once, wrapping them in sealed boxes, and shipping identical boxes to different stores.',
        },
        {
          term: 'Repository Secrets',
          simpleMeaning: 'A secure digital safe on GitHub that holds cloud passwords so code files never display them.',
          familiarEquivalent: 'A bank lockbox that dispenses security keycards to authorized robots without displaying the master combination.',
        },
      ],
      technicalExample: {
        title: 'Production GitHub Actions CI/CD Workflow for SAP BTP CAP Deployment',
        language: 'yaml',
        code: `name: BTP Continuous Delivery Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  # Quality Gate: Linting & Automated Tests
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Static Code Analysis (ESLint)
        run: npm run lint

      - name: Run Unit & Integration Tests with Coverage
        run: npm test -- --coverage

  # Build Gate: Compile MTAR Release Artifact
  build:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Cloud MTA Build Tool & CDS CLI
        run: npm install -g @sap/cds-dk mbt

      - name: Install Project Dependencies
        run: npm ci

      - name: Compile CAP Production Models
        run: cds build --production

      - name: Assemble MTAR Release Archive
        run: mbt build -t gen --mtar btp-app-release.mtar

      - name: Persist MTAR as Workflow Artifact
        uses: actions/upload-artifact@v4
        with:
          name: btp-mtar-artifact
          path: gen/btp-app-release.mtar

  # Deploy Gate: Deploy Verified Artifact to SAP BTP Dev Space
  deploy-dev:
    needs: build
    runs-on: ubuntu-latest
    environment: development
    steps:
      - name: Download MTAR Artifact
        uses: actions/download-artifact@v4
        with:
          name: btp-mtar-artifact

      - name: Install Cloud Foundry CLI & Multi-Apps Plugin
        run: |
          curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&version=v8" | tar -zx
          sudo mv cf8 /usr/local/bin/cf
          cf install-plugin multiapps -f

      - name: Authenticate to SAP BTP Cloud Foundry
        run: |
          cf login -a \${{ secrets.CF_API_URL }} \\
                   -o \${{ secrets.CF_ORG }} \\
                   -s \${{ secrets.CF_SPACE_DEV }} \\
                   -u \${{ secrets.CF_DEPLOY_USER }} \\
                   -p '\${{ secrets.CF_DEPLOY_PASS }}'

      - name: Deploy MTAR to BTP Development Space
        run: cf deploy btp-app-release.mtar -f`,
        purpose:
          'Implements an enterprise-grade automated CI/CD pipeline enforcing linting, testing, MTAR assembly, and authenticated deployment to SAP BTP.',
        lineExplanations: [
          { lines: '10-27', explanation: 'Test job executes on every push and PR, ensuring dependencies are cleanly installed and tests pass.' },
          { lines: '29-54', explanation: 'Build job runs only on main branch after tests pass, using mbt to assemble the btp-app-release.mtar.' },
          { lines: '56-83', explanation: 'Deploy job runs in development environment, installing CF CLI and multiapps plugin, logging in securely with secrets.' },
          { lines: '84', explanation: 'Executes cf deploy with the certified MTAR artifact using the non-interactive -f flag.' },
        ],
        expectedOutput:
          'Pipeline passes with green checkmarks across Test, Build, and Deploy-Dev stages in GitHub Actions console.',
        commonMistakes: [
          'Committing BTP credentials directly into the workflow file instead of utilizing GitHub Repository Secrets.',
          'Using npm install instead of npm ci, causing unexpected dependency version drifts on remote runners.',
          'Recompiling the MTAR in the deploy stage rather than downloading the tested artifact from the build stage.',
        ],
      },
      businessScenario: {
        title: 'Banking Release Cycle Transformation',
        context:
          'Swiss International Bank had a 3-week change management release cycle for CAP BTP applications. Manual deployments frequently broke in production due to untested code and mismatched environment configurations.',
        workflowSteps: [
          'Developer submits pull request on GitHub.',
          'Automated CI runner executes ESLint and Vitest suite, enforcing an 85% test coverage threshold.',
          'Peer code review approved; merge to main triggers build job.',
          'Runner compiles single immutable MTAR archive and uploads to secure artifact repository.',
          'Deployment job authenticates using stored BTP service keys and deploys MTAR to Cloud Foundry dev space.',
        ],
        businessImpact:
          'Release cycle compressed from 3 weeks to 30 minutes, deployment defects plummeted by 90%, and full compliance was achieved with banking regulator change-audit standards.',
      },
      quizQuestions: [
        {
          id: 'mod-6-2-q1',
          question: 'What does the "Build-Once, Deploy-Many" architectural principle require?',
          options: [
            {
              id: 'a',
              text: 'Recompiling all TypeScript source code from scratch with custom parameters inside each target environment.',
              isCorrect: false,
              explanation: 'Incorrect. Recompiling in each environment violates the principle and introduces environment drift.',
            },
            {
              id: 'b',
              text: 'Compiling the deployable artifact (e.g. .mtar) exactly once in CI, and promoting that identical binary through testing to production.',
              isCorrect: true,
              explanation: 'Correct. The identical, certified binary is deployed to dev, test, and production, ensuring reproducibility.',
            },
            {
              id: 'c',
              text: 'Only writing one unit test per software release.',
              isCorrect: false,
              explanation: 'Incorrect. Unit test suites should have broad, comprehensive coverage.',
            },
            {
              id: 'd',
              text: 'Deploying code to production without ever testing in development.',
              isCorrect: false,
              explanation: 'Incorrect. Deploy-many refers to systematic promotion through staged pre-production environments.',
            },
          ],
        },
        {
          id: 'mod-6-2-q2',
          question: 'Why should CI/CD pipelines use "npm ci" rather than "npm install"?',
          options: [
            {
              id: 'a',
              text: 'npm ci is only available on Apple macOS operating systems.',
              isCorrect: false,
              explanation: 'Incorrect. npm ci is cross-platform and standard on all Linux CI runners.',
            },
            {
              id: 'b',
              text: 'npm ci strictly installs the exact versions locked in package-lock.json and refuses to modify dependency trees.',
              isCorrect: true,
              explanation: 'Correct. npm ci guarantees deterministic, repeatable, and fast dependency installs matching the lockfile.',
            },
            {
              id: 'c',
              text: 'npm ci bypasses all unit tests to make the pipeline run faster.',
              isCorrect: false,
              explanation: 'Incorrect. npm ci only handles package installation, not test execution.',
            },
            {
              id: 'd',
              text: 'npm ci deletes all files in the git repository before downloading.',
              isCorrect: false,
              explanation: 'Incorrect. npm ci only clears node_modules before performing a clean install.',
            },
          ],
        },
        {
          id: 'mod-6-2-q3',
          question: 'How should sensitive SAP BTP deployment credentials be managed in a CI/CD pipeline?',
          options: [
            {
              id: 'a',
              text: 'Committed directly to mta.yaml in plain text for convenience.',
              isCorrect: false,
              explanation: 'Incorrect. Committing credentials to git creates severe security vulnerabilities and credential leaks.',
            },
            {
              id: 'b',
              text: 'Stored in encrypted repository secret vaults (e.g. GitHub Secrets) and injected as environment variables at runtime.',
              isCorrect: true,
              explanation: 'Correct. Encrypted secrets keep credentials safe from unauthorized access, logging, and code commits.',
            },
            {
              id: 'c',
              text: 'Hardcoded into README.md files so all developers can copy-paste them.',
              isCorrect: false,
              explanation: 'Incorrect. Publicly exposing credentials violates basic enterprise security compliance.',
            },
            {
              id: 'd',
              text: 'Typed manually into the cloud server monitor whenever a container restarts.',
              isCorrect: false,
              explanation: 'Incorrect. Automated cloud pipelines cannot rely on manual interactive user input.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'CI/CD pipelines automate testing, packaging, and deployments, eliminating human error and environment drift.',
        'The Build-Once, Deploy-Many principle ensures the exact tested MTAR artifact is promoted across all stages.',
        'BTP service credentials must always be stored in encrypted secret vaults and injected into pipeline runners at runtime.',
      ],
      practicalActivity:
        'Create a .github/workflows/ci.yml file in your repository. Configure automated dependency installation with npm ci, linting, and automated tests. Push to GitHub and observe execution in the Actions tab.',
    },
    {
      id: 'mod-6-3',
      code: '6.3',
      phaseId: 'phase-6',
      title: 'Testing and Quality',
      tagline: 'Automated Unit, Integration, and Mock Service Test Suites',
      summary:
        'Establish an enterprise-grade automated testing pyramid for SAP CAP and BTP applications. Master unit testing with Vitest and Jest, utilize @sap/cds test utilities (cds.test), build realistic mock services to isolate external ERP dependencies, enforce code quality with ESLint, and establish coverage thresholds.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'The enterprise test pyramid: unit tests, integration tests, and end-to-end user journey tests',
        'CAP testing toolkit: @sap/cds/lib/test and cds.test() in-memory SQLite runtime',
        'Unit testing custom service handlers: isolating req.reject, req.error, and calculation logic',
        'Integration testing OData v4 endpoints: sending HTTP GET/POST and asserting status and payload bodies',
        'Mocking external BTP services and SAP S/4HANA OData/RFC destinations in tests',
        'Static code analysis: ESLint configuration with @sap/eslint-plugin-cds and Prettier formatting',
        'Code coverage metrics: line, branch, and function coverage thresholds in CI pipelines',
      ],
      practicalImplementation:
        'Set up a Vitest test suite in a CAP project using cds.test(). Write unit tests verifying custom business validation logic in srv/service.js. Write integration tests simulating authenticated OData POST requests against /odata/v4/catalog/Orders. Mock an external currency conversion API, and configure an 80% coverage threshold that fails the build if unmet.',
      masteryCheck:
        'Construct an automated integration test using cds.test() that tests both an authorized OData v4 GET request and an invalid POST request asserting a 400 Bad Request error. Explain how mock services isolate tests from external ERP network latency.',
      learningObjectives: [
        'Structure automated test suites following the testing pyramid methodology for enterprise cloud apps.',
        'Write in-memory unit and integration tests for CAP services using cds.test() and Vitest/Jest.',
        'Mock external SAP S/4HANA destinations and REST APIs to test failure modes deterministically.',
        'Enforce strict code quality, linting rules, and minimum code coverage thresholds in build pipelines.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Install Testing and Tooling Dependencies',
          subtitle: 'Setting up Vitest, coverage reporters, and SAP ESLint rules',
          explanation:
            'Install the testing framework in your CAP project: `npm install --save-dev vitest @sap/cds-dk c8 eslint @sap/eslint-plugin-cds`. Configure `vitest.config.ts` or `package.json` to define test directories and coverage thresholds.',
          keyIdea:
            'Vitest offers blazing fast ESM-native test execution perfectly aligned with modern TypeScript CAP projects.',
        },
        {
          stepNumber: 2,
          title: 'Bootstrap In-Memory CAP Test Harness with cds.test()',
          subtitle: 'Spinning up an ephemeral in-memory CAP server and database',
          explanation:
            'Create `test/orders.test.ts`. Initialize the test environment using `const cds = require("@sap/cds"); const { GET, POST, expect } = cds.test(__dirname + "/..");`. This launches your full CAP service in-memory with SQLite.',
          keyIdea:
            'cds.test() initializes services, mock authentication, and database schemas automatically.',
        },
        {
          stepNumber: 3,
          title: 'Write Unit Tests for Business Logic Handlers',
          subtitle: 'Verifying custom calculations and rejection logic in isolation',
          explanation:
            'Test individual validation functions and business logic handlers directly. For example, pass mock request objects to a discount calculation function and assert that orders over $1000 receive a 10% discount while invalid quantities call `req.reject(400)`.',
          keyIdea:
            'Unit tests run in single milliseconds and verify isolated algorithms under boundary conditions.',
        },
        {
          stepNumber: 4,
          title: 'Write Integration Tests for OData v4 Endpoints',
          subtitle: 'Simulating full HTTP requests through protocol and database layers',
          explanation:
            'Use the `GET` and `POST` helpers to send realistic HTTP requests to your OData endpoints. Send a valid order creation payload and assert `res.status === 201`. Send an order with missing mandatory fields and assert `res.status === 400` with the expected RFC 7807 error message.',
          keyIdea:
            'Integration tests verify the end-to-end request pipeline including parsing, security, handlers, and database.',
        },
        {
          stepNumber: 5,
          title: 'Mock External Dependencies and Assert Coverage',
          subtitle: 'Isolating external ERP network dependencies and checking coverage',
          explanation:
            'When testing integration with external S/4HANA destinations, use `cds.connect.to("API_BUSINESS_PARTNER")` with an in-memory mock implementation. Run `npm test -- --coverage` and verify that branch, line, and statement coverage exceed project standards.',
          keyIdea:
            'Mocking isolates your test suite from external outages while guaranteeing repeatable test results.',
        },
      ],
      diagramType: 'event-handlers',
      analogy: {
        concept: 'Automated Testing Pyramid and Service Mocking',
        analogy: 'Automobile Factory Testing: Bench Testing, Dynamic Rolling Roads, and Virtual Wind Tunnels',
        explanation:
          'Think of testing an automobile before it leaves the factory. The engineers test the brake pads individually on a test bench to ensure the friction material stops spinning metal (unit testing). Then they assemble the brake pedal, hydraulic lines, and calipers together to verify that pressing the pedal engages all four wheels smoothly without fluid leaks (integration testing). To simulate icy road conditions without waiting for winter, they put the car on a motorized rolling treadmill that mimics slippery ice (mocking external conditions). Finally, a test driver takes the car on a full track lap (end-to-end testing). You would never skip the bench tests and hope the brakes work on the public highway.',
        transition:
          'In CAP development, unit tests verify isolated functions, cds.test() verifies integrated OData handlers, and mock services simulate external S/4HANA systems.',
      },
      conceptExplanation: {
        whatItIs:
          'Testing and Quality in SAP BTP encompasses the methodology, tools, and automated frameworks used to verify the functional correctness, performance, security, and maintainability of Cloud Application Programming (CAP) microservices and user interfaces.',
        whyItExists:
          'In enterprise ERP extensions, an unhandled edge case or corrupted calculation can disrupt supply chains, trigger erroneous financial postings, or violate tax compliance. Automated testing ensures zero regressions and enables fearless refactoring.',
        problemSolved:
          'Detects defects early during development, validates boundary conditions, eliminates manual QA bottlenecks, and prevents breaking changes from reaching production.',
        howItWorks:
          'Tests import `{ GET, POST, expect }` from `@sap/cds/lib/test`. cds.test() mounts all CDS models in an in-memory SQLite database in milliseconds. Tests simulate HTTP queries, assert status codes and payloads, and mock external destinations.',
        btpFit:
          'Seamlessly integrates with the CAP framework via cds.test(), running in CI pipelines before compiling deployable MTAR artifacts.',
      },
      jargonTerms: [
        {
          term: 'cds.test()',
          simpleMeaning: 'A testing helper from SAP that starts a temporary mini-version of your app in computer memory in half a second.',
          familiarEquivalent: 'A flight simulator cockpit that lets pilots practice every maneuver safely on the ground.',
        },
        {
          term: 'Unit Test',
          simpleMeaning: 'A test that checks a single tiny function by itself without touching a real database or network.',
          familiarEquivalent: 'Testing a single lightbulb with a battery before screwing it into the chandelier.',
        },
        {
          term: 'Mocking',
          simpleMeaning: 'Creating a fake stand-in service that pretends to be a big external system (like SAP S/4HANA) during tests.',
          familiarEquivalent: 'Using crash-test dummies instead of real human passengers during vehicle collision testing.',
        },
        {
          term: 'Code Coverage',
          simpleMeaning: 'The percentage of your code lines that were actually run and checked during your automated tests.',
          familiarEquivalent: 'The percentage of road miles that have been inspected by safety crews before opening a highway.',
        },
      ],
      technicalExample: {
        title: 'Full-Stack CAP OData v4 Integration Test Suite with cds.test & Vitest',
        language: 'typescript',
        code: `import { describe, it, beforeAll, expect } from 'vitest';
// @ts-expect-error SAP CDS test harness
import cds from '@sap/cds';

describe('Logistics Order Management Service Test Suite', () => {
  // Initialize in-memory CAP service with SQLite and mock authentication
  const { GET, POST } = cds.test(__dirname + '/..');

  beforeAll(async () => {
    // Optional: seed custom test fixtures or setup mocks
  });

  it('GET /odata/v4/logistics/Orders should return list of active orders', async () => {
    // Authenticate as a user with LogisticsOperator role
    const response = await GET('/odata/v4/logistics/Orders', {
      auth: { username: 'alice', password: '', roles: ['LogisticsOperator'] }
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data.value)).toBe(true);
    expect(response.data.value.length).toBeGreaterThan(0);
  });

  it('POST /odata/v4/logistics/Orders should reject order with negative quantity', async () => {
    try {
      await POST('/odata/v4/logistics/Orders', {
        title: 'Emergency Medical Supplies',
        quantity: -5, // Invalid quantity boundary condition
        unitPrice: 150.00
      }, {
        auth: { username: 'alice', roles: ['LogisticsOperator'] }
      });
      // Should not reach this line
      expect.unreachable('Request should have thrown validation error');
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error.message).toContain('Quantity must be greater than zero');
    }
  });

  it('POST /odata/v4/logistics/Orders should successfully create valid order', async () => {
    const payload = {
      title: 'Standard Cold Storage Shipment',
      quantity: 50,
      unitPrice: 200.00
    };

    const response = await POST('/odata/v4/logistics/Orders', payload, {
      auth: { username: 'alice', roles: ['LogisticsOperator'] }
    });

    expect(response.status).toBe(201);
    expect(response.data.ID).toBeDefined();
    expect(response.data.quantity).toBe(50);
    expect(response.data.totalAmount).toBe(10000.00); // 50 * 200 calculated by handler
  });
});`,
        purpose:
          'Demonstrates how to test CAP OData v4 endpoints in-memory using cds.test, validating positive cases, boundary errors, and authorization roles.',
        lineExplanations: [
          { lines: '7', explanation: 'Boots the complete CAP application in-memory with SQLite and test credentials.' },
          { lines: '13-22', explanation: 'Executes an authenticated GET request, asserting HTTP 200 and JSON array output.' },
          { lines: '24-40', explanation: 'Tests validation failure: submits a negative quantity, expecting an HTTP 400 Bad Request error.' },
          { lines: '42-56', explanation: 'Tests happy path: submits a valid order payload, asserting HTTP 201 Created and calculated totalAmount.' },
        ],
        expectedOutput:
          'All tests pass with green status in under 500ms; code coverage shows 100% of order validation handlers covered.',
        commonMistakes: [
          'Attempting to connect to real SAP HANA Cloud during automated unit tests instead of using in-memory SQLite.',
          'Forgetting to pass mock authentication headers in tests when testing secured services with @requires.',
          'Hardcoding absolute timestamps or dynamic IDs in test assertions rather than asserting schema shape and properties.',
        ],
      },
      businessScenario: {
        title: 'Pharmaceutical Cold Chain Dispatch Quality Verification',
        context:
          'PharmaCare Global deployed an update to their temperature-controlled cold chain dispatch CAP application. A regression in an untested handler caused temperature excursion alerts to fail silently, risking $4.2M of sensitive vaccine batches.',
        workflowSteps: [
          'Developer authors cold chain alert handler in CAP service.',
          'Developer writes cds.test() suite with extreme temperature mock payloads.',
          'Tests verify alert triggers at temperatures above 8 degrees Celsius.',
          'Tests verify rejection when sensor disconnects or emits negative Kelvin values.',
          'CI runner asserts 95% test coverage before permitting merge to main.',
        ],
        businessImpact:
          'Achieved 100% compliance in FDA 21 CFR Part 11 software audits and eliminated software-induced cold chain excursions.',
      },
      quizQuestions: [
        {
          id: 'mod-6-3-q1',
          question: 'What is the primary advantage of using cds.test() for CAP service testing?',
          options: [
            {
              id: 'a',
              text: 'It connects directly to production SAP S/4HANA systems and executes irreversible database transactions.',
              isCorrect: false,
              explanation: 'Incorrect. Automated tests must never run destructive transactions on production systems.',
            },
            {
              id: 'b',
              text: 'It boots an ephemeral, in-memory CAP server with SQLite and mock authentication in milliseconds without cloud dependencies.',
              isCorrect: true,
              explanation: 'Correct. cds.test() provides an ultra-fast, isolated, and authentic CAP environment for local testing and CI.',
            },
            {
              id: 'c',
              text: 'It automatically writes all business logic code so developers do not have to write programs.',
              isCorrect: false,
              explanation: 'Incorrect. cds.test() is a testing harness for verifying code written by developers.',
            },
            {
              id: 'd',
              text: 'It disables all TypeScript type checks across the entire operating system.',
              isCorrect: false,
              explanation: 'Incorrect. Type checking remains active and enhances test reliability.',
            },
          ],
        },
        {
          id: 'mod-6-3-q2',
          question: 'Why are mock services critical when testing enterprise cloud extensions?',
          options: [
            {
              id: 'a',
              text: 'Because real ERP systems may be offline, slow, or have rate limits that make tests flaky and unpredictable.',
              isCorrect: true,
              explanation: 'Correct. Mocks isolate tests from external network outages, latency, and volatile remote test data.',
            },
            {
              id: 'b',
              text: 'Because SAP forbids cloud applications from ever calling real databases in production.',
              isCorrect: false,
              explanation: 'Incorrect. Mocks are used exclusively during development and testing, not production.',
            },
            {
              id: 'c',
              text: 'Because mock services make all HTTP requests return error 500 automatically.',
              isCorrect: false,
              explanation: 'Incorrect. Mocks return controlled, realistic responses tailored to specific test scenarios.',
            },
            {
              id: 'd',
              text: 'Because mock services compile JavaScript into machine binary code.',
              isCorrect: false,
              explanation: 'Incorrect. Mocks simulate service contracts; they do not alter compiler behavior.',
            },
          ],
        },
        {
          id: 'mod-6-3-q3',
          question: 'What happens when a CI pipeline enforces a minimum code coverage threshold (e.g. 80%)?',
          options: [
            {
              id: 'a',
              text: 'The pipeline automatically writes missing unit tests using artificial intelligence.',
              isCorrect: false,
              explanation: 'Incorrect. Test coverage thresholds measure existing tests; they do not generate code.',
            },
            {
              id: 'b',
              text: 'The build job exits with a failure code and blocks deployment if the test suite executes fewer than 80% of lines/branches.',
              isCorrect: true,
              explanation: 'Correct. Coverage thresholds serve as strict automated quality gates preventing untested code from merging.',
            },
            {
              id: 'c',
              text: 'The application runs 80% slower in production to conserve electricity.',
              isCorrect: false,
              explanation: 'Incorrect. Coverage thresholds are build-time metrics that have zero impact on runtime production speed.',
            },
            {
              id: 'd',
              text: 'Developers are locked out of their laptops until they complete 80 pull requests.',
              isCorrect: false,
              explanation: 'Incorrect. Quality gates reject the specific pull request failing the threshold.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'cds.test() launches an in-memory CAP server and SQLite database for blazing fast integration tests.',
        'The test pyramid prioritizes fast unit and integration tests over brittle end-to-end UI tests.',
        'Mocking external S/4HANA destinations guarantees reliable, deterministic test runs immune to network outages.',
      ],
      practicalActivity:
        'Create a test/ directory in your project. Add a service test using cds.test(). Execute tests with npx vitest run and inspect the execution time and assertions.',
    },
    {
      id: 'mod-6-4',
      code: '6.4',
      phaseId: 'phase-6',
      title: 'Monitoring and Troubleshooting',
      tagline: 'Cloud Logging, Metrics, Diagnostics, and Incident Runbooks',
      summary:
        'Master observability and incident diagnostics for SAP BTP applications. Implement structured JSON logging with correlation IDs, utilize the Cloud Logging service, inspect live container metrics via Cloud Foundry CLI, diagnose common microservice crashes (502 Bad Gateway, out-of-memory, failed HDI bindings), and author incident runbooks.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'The three pillars of cloud observability: logs, metrics, and distributed traces',
        'SAP BTP Cloud Logging service: OpenSearch-based log aggregation and dashboarding',
        'Structured logging in CAP: JSON format, log levels (DEBUG, INFO, WARN, ERROR), and correlation IDs',
        'Cloud Foundry CLI diagnostics: cf logs --recent, cf app, cf events, and container memory profiling',
        'Diagnosing classic cloud failures: 502 Bad Gateway, 503 Service Unavailable, 401 Unauthorized',
        'Database connection failures: HDI container binding errors, connection pool exhaustion',
        'Incident Runbooks: standard operating procedures for rapid triage, remediation, and post-mortems',
      ],
      practicalImplementation:
        'Add structured JSON logging and x-correlation-id propagation to a CAP application. Inspect live logs using `cf logs app-name --recent`. Intentionally simulate common failure states (out-of-memory limits, missing destination binding, invalid database credentials) and diagnose each using log traces alone. Write a standard incident runbook for a 502 Bad Gateway outage.',
      masteryCheck:
        'Explain how to diagnose a 502 Bad Gateway error using cf logs --recent, cf events, and correlation IDs in SAP BTP Cloud Logging. Outline the key sections of an enterprise incident runbook.',
      learningObjectives: [
        'Configure structured JSON application logging and distributed correlation IDs across microservices.',
        'Use Cloud Foundry CLI commands and BTP Cloud Logging to monitor container health and query log events.',
        'Systematically diagnose and remediate common production errors (502, 503, 401, OOM crashes).',
        'Author enterprise incident triage runbooks specifying symptoms, root causes, diagnostics, and fixes.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Implement Structured JSON Logging in CAP',
          subtitle: 'Enabling machine-readable log events with contextual fields',
          explanation:
            'Configure CAP to emit structured JSON logs in production by setting environment variable `DEBUG=` or adding `@sap/logging` middleware. In custom handlers, use `const LOG = cds.log("logistics"); LOG.info("Order processed", { orderId: order.ID, amount: order.totalAmount });`.',
          keyIdea:
            'Structured JSON logs allow log aggregation systems like OpenSearch to index and filter specific fields without complex regex.',
        },
        {
          stepNumber: 2,
          title: 'Propagate Correlation IDs Across Service Calls',
          subtitle: 'Stitching disparate microservice logs into unified transaction journeys',
          explanation:
            'Ensure incoming HTTP requests pass `x-correlation-id`. In CAP, `req.headers["x-correlation-id"]` is automatically captured. When making outbound calls to destinations or external REST APIs via the SAP Cloud SDK, ensure the correlation ID header is forwarded.',
          keyIdea:
            'The correlation ID stitches together isolated microservice logs into a single coherent transaction story.',
        },
        {
          stepNumber: 3,
          title: 'Inspect Live Container Logs via CF CLI',
          subtitle: 'Differentiating between router logs and application crashes',
          explanation:
            'Use `cf logs <app-name> --recent` to retrieve recent log dumps from container buffers. To stream live real-time logs during an active investigation, run `cf logs <app-name>`. Filter by log source: `[APP/PROC/WEB]` indicates application code, while `[RTR]` indicates the Cloud Foundry GoRouter.',
          keyIdea:
            'Differentiating between router logs (RTR) and application logs (APP) isolates whether failures are network or code-level.',
        },
        {
          stepNumber: 4,
          title: 'Diagnose Common Crash Signatures and Events',
          subtitle: 'Analyzing container lifecycle events and termination codes',
          explanation:
            'Run `cf events <app-name>` to inspect recent lifecycle events. Look for `app.crash` events with exit codes: `exit_description: out of memory` (increase memory in mta.yaml) or `exit_status: 1` (unhandled JavaScript exception or missing environment variable).',
          keyIdea:
            'cf events reveals why a container terminated before developers spend hours debugging application logic.',
        },
        {
          stepNumber: 5,
          title: 'Author and Maintain Operational Incident Runbooks',
          subtitle: 'Documenting standardized diagnostic and remediation procedures',
          explanation:
            'Create a repository markdown document `docs/RUNBOOK.md`. For each common failure symptom (e.g. 502 Bad Gateway, 401 Unauthorized, Database Connection Timeout), document the symptom, diagnostic command, root causes, and verified resolution procedure.',
          keyIdea:
            'Runbooks institutionalize operational knowledge, ensuring consistent and rapid incident resolution 24/7.',
        },
      ],
      diagramType: 'http-troubleshooting',
      analogy: {
        concept: 'Cloud Observability and Incident Triage',
        analogy: 'Hospital Intensive Care Unit (ICU) Telemetry and Emergency Protocols',
        explanation:
          'Think of the intensive care unit (ICU) in a major hospital. A patient does not just have a doctor checking their pulse once a day. Instead, sensors continuously monitor vital signs: heart rate, blood pressure, oxygen saturation, and body temperature (metrics). Every medication administered and nurse observation is recorded in a chronological digital chart with the patient\'s unique medical record number (structured logs with correlation IDs). If a vital sign drops dangerously, automated alarms sound immediately (alerting). If an emergency occurs, the medical team does not improvise; they pull out a laminated emergency protocol binder (the incident runbook) that gives exact step-by-step instructions for stabilizing the patient.',
        transition:
          'In BTP operations, container metrics act as vital signs, structured JSON logs act as the medical chart, correlation IDs act as patient numbers, and runbooks provide rapid emergency triage.',
      },
      conceptExplanation: {
        whatItIs:
          'Monitoring and Troubleshooting on SAP BTP is the operational discipline of collecting, aggregating, and analyzing telemetry data (metrics, logs, and traces) across distributed cloud microservices to maintain system availability, detect anomalies, and rapidly resolve incidents.',
        whyItExists:
          'Downtime in enterprise ERP applications costs thousands of dollars per minute in lost productivity and delayed logistics. Robust observability enables operations teams to detect and fix issues proactively and drastically reduces Mean Time to Resolution (MTTR).',
        problemSolved:
          'Stitches together disconnected microservice logs, pinpoints the root cause of 502/503 errors in seconds, detects memory leaks before crashes occur, and standardizes incident response.',
        howItWorks:
          'App Router injects an x-correlation-id into incoming requests. Microservices emit structured JSON logs tagged with that ID to stdout. Cloud Foundry loggregators collect streams and forward them to SAP Cloud Logging (OpenSearch) for indexing and alerting.',
        btpFit:
          'Directly integrates with the SAP BTP Cloud Logging service, SAP Alert Notification service, and Cloud Foundry CLI diagnostic tooling.',
      },
      jargonTerms: [
        {
          term: 'Correlation ID',
          simpleMeaning: 'A unique tracking number stamped onto a web request so you can trace it across multiple servers.',
          familiarEquivalent: 'A baggage claim barcode tracking your suitcase across three connecting flights.',
        },
        {
          term: '502 Bad Gateway',
          simpleMeaning: 'The door attendant (App Router) reached out to the kitchen (CAP backend), but the kitchen did not reply or crashed.',
          familiarEquivalent: 'Calling room service from your hotel room, but the phone in the kitchen just rings endlessly with no answer.',
        },
        {
          term: 'Incident Runbook',
          simpleMeaning: 'A step-by-step emergency checklist that tells engineers exactly what to check and fix when systems go down.',
          familiarEquivalent: 'An airline pilot\'s emergency checklist during engine failure.',
        },
        {
          term: 'Cloud Logging',
          simpleMeaning: 'A massive search engine on BTP that collects and organizes log messages from all your running cloud containers.',
          familiarEquivalent: 'A centralized digital archive where every security guard and nurse stores their daily shift logs.',
        },
      ],
      technicalExample: {
        title: 'Structured JSON Logging with Correlation ID & Diagnostic Error Handling in CAP',
        language: 'javascript',
        code: `const cds = require('@sap/cds');
const LOG = cds.log('logistics-srv');

module.exports = cds.service.impl(async function () {
  const { Orders } = this.entities;

  // Middleware to log incoming transaction context with correlation ID
  this.before('*', async (req) => {
    const correlationId = req.headers['x-correlation-id'] || 'local-dev-' + Date.now();
    LOG.info({
      event: 'INCOMING_REQUEST',
      target: req.target.name,
      method: req.event,
      user: req.user.id,
      correlationId: correlationId,
      timestamp: new Date().toISOString()
    });
  });

  // Business handler with structured diagnostic logging
  this.before('CREATE', Orders, async (req) => {
    const order = req.data;
    const correlationId = req.headers['x-correlation-id'];

    if (!order.quantity || order.quantity <= 0) {
      LOG.warn({
        event: 'VALIDATION_FAILED',
        reason: 'INVALID_ORDER_QUANTITY',
        providedQuantity: order.quantity,
        user: req.user.id,
        correlationId: correlationId
      });
      return req.reject(400, 'Order quantity must be a positive integer.');
    }

    try {
      LOG.info({
        event: 'PROCESSING_ORDER',
        orderTitle: order.title,
        quantity: order.quantity,
        correlationId: correlationId
      });
      // Perform business calculation
      order.totalAmount = order.quantity * (order.unitPrice || 100);
    } catch (err) {
      LOG.error({
        event: 'ORDER_PROCESSING_CRASH',
        errorName: err.name,
        errorMessage: err.message,
        stack: err.stack,
        correlationId: correlationId
      });
      return req.reject(500, 'Internal error calculating order total. Incident logged.');
    }
  });
});`,
        purpose:
          'Demonstrates how to emit machine-readable structured JSON logs containing correlation IDs and error context for Cloud Logging indexing.',
        lineExplanations: [
          { lines: '2', explanation: 'Instantiates a named CAP logger namespace (logistics-srv) for granular filtering.' },
          { lines: '8-19', explanation: 'Intercepts all requests, extracts or generates the correlation ID, and logs a structured JSON audit event.' },
          { lines: '24-34', explanation: 'Logs a structured warning event when user input fails validation, preserving diagnostic fields.' },
          { lines: '43-52', explanation: 'Catches unexpected calculation errors, logs full stack traces with the correlation ID, and returns a clean sanitized error to the client.' },
        ],
        expectedOutput:
          'Log messages are printed as structured JSON to stdout, captured by Cloud Foundry Loggregator, and indexed in OpenSearch.',
        commonMistakes: [
          'Using console.log() with raw strings, which prevents search engines from parsing JSON properties like correlationId or user.',
          'Logging sensitive personally identifiable information (PII) like credit card numbers or plain-text passwords, violating GDPR.',
          'Swallowing errors silently with empty catch {} blocks, making production failures completely invisible in logs.',
        ],
      },
      businessScenario: {
        title: 'Automotive Assembly Plant 502 Outage Triage',
        context:
          'Bavarian Auto Works assembly plant ground to a halt when their parts dispatch service began returning intermittent HTTP 502 Bad Gateway errors. Without structured logs, support engineers spent 4 hours guessing whether the failure was network, database, or backend.',
        workflowSteps: [
          'Dispatch barcode scanner fails; App Router logs 502 error with x-correlation-id: 7f8a-92bc.',
          'Site Reliability Engineer (SRE) searches OpenSearch for correlation ID 7f8a-92bc.',
          'Logs reveal CAP container crash with exit_description: out of memory during a 50MB CAD diagram upload.',
          'SRE consults the standardized Incident Runbook for Out of Memory exceptions.',
          'SRE scales container memory to 1024M via cf scale logistics-srv -m 1024M; system recovers in 5 minutes.',
        ],
        businessImpact:
          'Reduced Mean Time to Resolution (MTTR) from 4 hours to under 8 minutes, averting an estimated $600,000 in assembly line stoppage penalties.',
      },
      quizQuestions: [
        {
          id: 'mod-6-4-q1',
          question: 'What is the purpose of passing an "x-correlation-id" header across microservices in SAP BTP?',
          options: [
            {
              id: 'a',
              text: 'It acts as an encryption key that replaces TLS/HTTPS certificate handshakes.',
              isCorrect: false,
              explanation: 'Incorrect. Encryption is handled by TLS; correlation IDs are purely diagnostic tracing identifiers.',
            },
            {
              id: 'b',
              text: 'It allows engineers to trace a single user transaction across App Router, CAP services, and databases in centralized logs.',
              isCorrect: true,
              explanation: 'Correct. A correlation ID ties together all independent log entries generated during a single end-to-end request.',
            },
            {
              id: 'c',
              text: 'It forces the database to bypass all foreign key constraints.',
              isCorrect: false,
              explanation: 'Incorrect. Database integrity constraints are never bypassed by logging headers.',
            },
            {
              id: 'd',
              text: 'It automatically translates English log messages into German.',
              isCorrect: false,
              explanation: 'Incorrect. Logging language is controlled by the application code and formatting strings.',
            },
          ],
        },
        {
          id: 'mod-6-4-q2',
          question: 'What is indicated when an end user receives an HTTP "502 Bad Gateway" error from an App Router?',
          options: [
            {
              id: 'a',
              text: 'The user entered an incorrect password and their account is locked.',
              isCorrect: false,
              explanation: 'Incorrect. Authentication failures return HTTP 401 Unauthorized or 403 Forbidden.',
            },
            {
              id: 'b',
              text: 'The App Router received an invalid response, connection reset, or crash from the upstream backend service container.',
              isCorrect: true,
              explanation: 'Correct. A 502 Bad Gateway means the proxy router could not communicate successfully with the backend container.',
            },
            {
              id: 'c',
              text: 'The client web browser is missing an HDMI cable.',
              isCorrect: false,
              explanation: 'Incorrect. HTTP status codes reflect network and server conditions, not physical display cables.',
            },
            {
              id: 'd',
              text: 'The SAP S/4HANA system has permanently deleted all financial records.',
              isCorrect: false,
              explanation: 'Incorrect. 502 indicates a microservice communication failure, not database record deletion.',
            },
          ],
        },
        {
          id: 'mod-6-4-q3',
          question: 'Which Cloud Foundry command displays recent container lifecycle crashes, scaling actions, and terminations?',
          options: [
            {
              id: 'a',
              text: 'cf events <app-name>',
              isCorrect: true,
              explanation: 'Correct. cf events displays historical platform events including app.crash, crash exit codes, and scale events.',
            },
            {
              id: 'b',
              text: 'cf format-disk --all',
              isCorrect: false,
              explanation: 'Incorrect. That is a dangerous, non-existent Cloud Foundry command.',
            },
            {
              id: 'c',
              text: 'cf print-source-code',
              isCorrect: false,
              explanation: 'Incorrect. Source code is inspected via Git, not Cloud Foundry commands.',
            },
            {
              id: 'd',
              text: 'cf delete-user admin',
              isCorrect: false,
              explanation: 'Incorrect. Deleting users manages access, not container crash diagnostics.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'Structured JSON logging enables high-speed indexing, filtering, and dashboarding in SAP BTP Cloud Logging.',
        'Correlation IDs (x-correlation-id) connect disparate microservice logs into single transaction traces.',
        'Standardized incident runbooks dramatically reduce MTTR by providing clear triage workflows for common cloud failures.',
      ],
      practicalActivity:
        'Run cf apps and cf logs <app-name> --recent in terminal. Inspect recent log entries and check for app.crash events using cf events <app-name>.',
    },
  ],
};
