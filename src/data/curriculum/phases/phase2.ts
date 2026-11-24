import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_2: SyllabusPhase = {
  id: 'phase-2',
  number: 2,
  title: 'Development Tools',
  tagline: 'Phase 2 · Weeks 5-6 · ~12 Hours',
  description:
    'Master the modern enterprise developer tooling for SAP BTP. Understand the browser-based SAP Business Application Studio (BAS), local desktop development with VS Code, the SAP Cloud Application Programming Model CLI (@sap/cds-dk), and local SQLite mocking.',
  coreObjective:
    'Set up and operate both cloud-hosted and local professional development environments. Create customized Dev Spaces in BAS, initialize CAP projects using @sap/cds-dk, utilize CDS Language Support and Fiori Tools, execute local live-reloading with "cds watch", and test OData services locally without needing live cloud connections.',
  estimatedHours: 12,
  suggestedWeeks: 'Weeks 5-6',
  badgeCategory: 'core',
  capstone: PHASE_CAPSTONES[2]!,
  modules: [
    {
      id: 'mod-2-1',
      code: '2.1',
      phaseId: 'phase-2',
      title: 'Business Application Studio',
      tagline: 'Cloud-Based Development, Dev Spaces, and Visual CDS Modelers',
      summary:
        'Master SAP Business Application Studio (BAS), SAP flagship browser-based development environment built on open-source Eclipse Theia. Learn how specialized Dev Spaces provide turnkey pre-configured tooling for CAP, Fiori, and mobile development.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Evolution from SAP Web IDE to SAP Business Application Studio (BAS).',
        'Architecture of BAS: Eclipse Theia container foundation running on Kubernetes/Cloud Foundry.',
        'Dev Spaces concept: Isolated virtual development containers tailored for specific workloads (Full Stack Cloud Application, SAP Fiori, Mobile Applications, SAP Build).',
        'Key BAS Productivity Tools: CDS Graphical Modeler, Storyboard view, Service Center (browsing S/4HANA APIs directly from BAS), and Layout Editor.',
        'Integrated tools: Terminal CLI, Git source control integration, Run Configurations, and direct deployment to BTP spaces.',
        'BAS vs Local VS Code: Trade-offs, corporate firewall advantages, zero-install onboarding, and performance comparisons.',
      ],
      practicalImplementation:
        'Create a "Full Stack Cloud Application" Dev Space in BAS. Use the Storyboard and CDS Graphical Modeler to visualize an enterprise schema, test services using the integrated Run Configuration, and commit changes via the Git panel.',
      masteryCheck:
        'Explain why Dev Spaces eliminate corporate laptop onboarding friction. Successfully navigate Service Center to explore standard S/4HANA OData services and bind an enterprise destination to a BAS development project.',
      learningObjectives: [
        'Explain the architectural evolution from legacy Web IDE to modern Business Application Studio.',
        'Configure and launch specialized Dev Spaces tailored for CAP and Fiori development.',
        'Use visual accelerators (Storyboard, CDS Graphical Modeler) alongside pro-code text editors.',
        'Compare the benefits and limitations of cloud-based BAS versus local VS Code desktop tooling.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Evolution to SAP Business Application Studio',
          subtitle: 'From proprietary Web IDE to modern open standards',
          explanation:
            'For years, SAP developers used SAP Web IDE on the legacy Neo platform. Web IDE had severe limitations: proprietary project structures, lack of standard npm tooling, and no access to a real Linux command-line terminal. In 2020, SAP introduced SAP Business Application Studio (BAS). Built on the open-source Eclipse Theia framework, BAS provides an identical user experience and keyboard shortcuts to Visual Studio Code, but runs entirely in modern web browsers as a managed cloud service hosted on SAP BTP.',
          keyIdea:
            'BAS provides a full VS Code-compatible developer experience in your browser, pre-loaded with certified SAP enterprise tools and CLI runtimes.',
          taskInstruction: 'Launch BAS from your BTP Subaccount Service Marketplace or Subaccount Subscriptions.',
          hint: 'BAS requires zero software installation on your corporate computer; it runs in Google Chrome, Edge, and Firefox.',
        },
        {
          stepNumber: 2,
          title: 'Dev Spaces: Turnkey Containerized Workspaces',
          subtitle: 'Eliminating the "configure your laptop for 2 weeks" nightmare',
          explanation:
            'When a new software engineer joins an enterprise, configuring their corporate laptop often takes days: installing Node.js, Java SDKs, Python, SQLite, Git, Docker, and enterprise certificates through strict corporate VPNs and proxies. BAS solves this through "Dev Spaces": 1) A Dev Space is a private, containerized virtual machine pre-configured with exact runtime versions, compilers, and extensions. 2) You select a space preset: "Full Stack Cloud Application" (includes Node.js, Java, CAP tools, SQLite, and MTA build tools) or "SAP Fiori" (includes UI5 tooling and Fiori generators). 3) In 30 seconds, your complete developer workstation is running in the cloud.',
          keyIdea:
            'Dev Spaces package runtimes and SAP extensions into disposable, cloud-hosted containers that spin up in seconds.',
          taskInstruction: 'Create a new Dev Space choosing the "Full Stack Cloud Application" preset.',
          hint: 'Unused Dev Spaces enter "Stopped" state automatically to conserve corporate cloud compute quotas.',
        },
        {
          stepNumber: 3,
          title: 'Visual Productivity Tools: Storyboard and CDS Modeler',
          subtitle: 'Visual accelerators that edit standard pro-code artifacts',
          explanation:
            'BAS bridges visual low-code modeling and professional pro-code editing: 1) CDS Graphical Modeler: Allows dragging and dropping entities, associations, and fields visually; it automatically updates the underlying text `db/schema.cds` file in real-time with clean, human-readable code. 2) Storyboard: A 360-degree visual map showing how frontend UI applications, backend services, database tables, and external S/4HANA destinations interconnect. 3) Service Center: A built-in catalog browser that allows searching SAP Business Accelerator Hub or connected S/4HANA systems and pulling live API definitions into your project with one click.',
          keyIdea:
            'Visual tools in BAS never generate proprietary hidden lock-in code; they edit standard, human-readable CDS and JavaScript files.',
          taskInstruction: 'Open a project in Storyboard view to inspect entity-service relationships.',
          hint: 'You can switch between text code and visual modelers seamlessly at any moment.',
        },
        {
          stepNumber: 4,
          title: 'Integrated Terminal, Git, and Cloud Deployment',
          subtitle: 'Complete DevOps lifecycle inside the browser',
          explanation:
            'Inside your BAS Dev Space, you have access to a full Linux bash terminal: 1) You can run any standard CLI command: `cds watch`, `npm test`, `git commit`. 2) Git Source Control: Built-in side pane for staging, diffing, branching, and pushing to GitHub or corporate GitLab instances using SSH keys or Personal Access Tokens. 3) Cloud Foundry integration: BAS is pre-logged into your BTP subaccount, allowing you to deploy applications with `cf push` or bind live cloud databases with a single command.',
          keyIdea:
            'BAS is not a toy editor; it provides a full Linux terminal, complete Git workflow, and direct integration with your BTP spaces.',
          taskInstruction: 'Open the integrated terminal in BAS (Ctrl+` or Terminal > New Terminal).',
          warning: 'Do not store personal API keys or unencrypted passwords in terminal command histories.',
        },
        {
          stepNumber: 5,
          title: 'BAS vs Local VS Code: The Decision Matrix',
          subtitle: 'Choosing the right environment for your enterprise workflow',
          explanation:
            'Enterprise teams frequently ask: "Should we use BAS or local VS Code?" 1) Choose BAS when: You have strict corporate laptop lockdown policies (no admin rights to install Node.js/Docker), need immediate onboarding for contractors, or want pre-configured SAP extensions without manual version conflicts. 2) Choose Local VS Code when: You have complete admin rights, need to work offline while traveling without internet access, or have powerful local CPU/GPU hardware. Because CAP and UI5 use standard open-source file structures, developers can switch between BAS and local VS Code on the exact same Git repository at any time.',
          keyIdea:
            'BAS and VS Code share identical project structures; you can work on BAS in the morning and local VS Code in the afternoon on the same Git branch.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Both tools use the exact same `@sap/cds` commands and project folders.',
        },
      ],
      diagramType: 'cap-architecture',
      analogy: {
        concept: 'SAP Business Application Studio and Dev Spaces',
        analogy: 'The Fully Equipped Rental Master Workshop',
        explanation:
          'Setting up local developer tooling is like buying an empty garage: you have to spend two weeks driving to hardware stores, buying saws, drills, safety glasses, wiring electrical outlets, and calibrating equipment before you can build your first chair. SAP Business Application Studio is like walking into a premier rented master woodworking studio: you turn on the lights, and every professional Japanese chisel, CNC router, dust collector, and calibrated table saw is already sharpened, plugged in, and laid out on the workbench in perfect order. If you want to switch from woodworking to metal fabrication, you simply walk into the Metalwork Suite next door (a different Dev Space) with specialized welding equipment ready to go.',
        transition:
          'Where the master workshop provides pre-calibrated tools for craftsmanship, BAS provides pre-configured developer runtimes for SAP BTP applications.',
      },
      conceptExplanation: {
        whatItIs:
          'SAP Business Application Studio (BAS) is a cloud-based Integrated Development Environment (IDE) hosted on SAP BTP that provides containerized developer workspaces tailored for full-stack cloud applications, SAP Fiori, and enterprise integrations.',
        whyItExists:
          'Enterprise developers face severe local laptop configuration barriers: restrictive corporate IT policies, complex proxy settings, incompatible Node.js versions, and lengthy onboarding times.',
        problemSolved:
          'Eliminates local setup friction, centralizes development environments in secure enterprise cloud regions, and provides specialized visual productivity accelerators for SAP CAP and Fiori development.',
        howItWorks:
          'Users access BAS through a web browser. Administrators allocate compute quotas. Developers spin up containerized Dev Spaces based on Eclipse Theia. Projects are version-controlled via Git and deployed directly to BTP Cloud Foundry or Kyma spaces.',
        btpFit:
          'BAS is SAP\'s premier strategic cloud IDE for all modern enterprise extension development on SAP BTP.',
      },
      jargonTerms: [
        {
          term: 'Dev Space',
          simpleMeaning: 'A private virtual cloud container pre-loaded with specific runtimes, tools, and extensions.',
          familiarEquivalent: 'A specialized workshop room equipped specifically for carpentry, pottery, or welding.',
        },
        {
          term: 'Eclipse Theia',
          simpleMeaning: 'The open-source cloud IDE framework upon which SAP Business Application Studio is built.',
          familiarEquivalent: 'The engine and chassis of an automobile customized by a specific brand.',
        },
        {
          term: 'Storyboard',
          simpleMeaning: 'A graphical 360-degree view in BAS mapping how UI views, backend services, and database models connect.',
          familiarEquivalent: 'A movie director\'s scene-by-scene storyboard visual diagram.',
        },
        {
          term: 'Service Center',
          simpleMeaning: 'A built-in tool in BAS for exploring and consuming SAP S/4HANA APIs and enterprise destinations.',
          familiarEquivalent: 'An in-app app store where you browse and connect live data sources.',
        },
      ],
      technicalExample: {
        title: 'Project Structure and Dev Space devspace.json Configuration',
        language: 'json',
        code: `{
  "devSpace": {
    "name": "CapFullStackDev",
    "pack": "FullStackCloudApplication",
    "status": "RUNNING",
    "extensions": [
      "sap.sap-cds-language-support",
      "sap.fiori-tools",
      "sap.cds-graphical-modeler",
      "sap.service-center"
    ],
    "storage": {
      "allocated_gb": 10,
      "used_gb": 1.4
    },
    "runtime": {
      "node_version": "v20.18.0",
      "java_version": "openjdk 17.0.9",
      "cds_version": "8.5.0"
    }
  }
}`,
        purpose:
          'Illustrates the internal container configuration of a BAS Dev Space: allocated disk storage, installed SAP extensions, and pre-configured Node.js and Java LTS runtimes.',
        lineExplanations: [
          { lines: '4', explanation: 'pack: Dev space template providing pre-installed CAP tools and compilers.' },
          { lines: '7-11', explanation: 'extensions: Certified SAP productivity tools enabled out-of-the-box.' },
          { lines: '17-21', explanation: 'runtime: Managed enterprise runtimes maintained and updated automatically by SAP.' },
        ],
        expectedOutput:
          'Instant browser-based development environment ready for enterprise CAP and UI5 development in 30 seconds.',
        commonMistakes: [
          'Selecting the "Basic" dev space preset instead of "Full Stack Cloud Application", resulting in missing CDS and MTA compilers.',
          'Not committing changes to remote Git before deleting a Dev Space.',
        ],
      },
      businessScenario: {
        title: 'Rapid Contractor Onboarding for Global Supply Chain Program',
        context:
          'A consumer packaged goods enterprise hires 25 external software contractors across 4 countries to build an urgent supplier portal extension on SAP BTP.',
        workflowSteps: [
          'IT Administrator assigns BAS developer subscriptions to the 25 contractor email accounts.',
          'Contractors log into BTP Cockpit and launch BAS in Google Chrome without installing any local software.',
          'Contractors create "Full Stack Cloud Application" Dev Spaces and clone the corporate Git repository.',
          'Within 15 minutes of receiving their email invites, all 25 contractors are writing verified code and running local tests.',
        ],
        businessImpact:
          'Reduces developer onboarding time from 10 business days to under 20 minutes, saving €65,000 in onboarding overhead.',
      },
      practicalActivity:
        'Log in to SAP BTP, launch Business Application Studio, and create a Dev Space named "CAP-Learning-Space".',
      keyTakeaways: [
        'BAS is SAP\'s browser-based IDE built on Eclipse Theia, providing a full VS Code-compatible experience.',
        'Dev Spaces package complete runtimes and tools into turnkey cloud containers, eliminating laptop setup friction.',
        'Visual tools like Storyboard and CDS Graphical Modeler edit standard human-readable code files with zero lock-in.',
      ],
      quizQuestions: [
        {
          id: 'mod-2-1-q1',
          question:
            'What is the primary operational advantage of using specialized "Dev Spaces" in SAP Business Application Studio compared to configuring a local laptop from scratch?',
          options: [
            {
              id: 'a',
              text: 'Dev Spaces provide containerized virtual environments with pre-installed Node.js, Java, CAP tools, and extensions, allowing developers to start writing code in 30 seconds without local installation hurdles.',
              isCorrect: true,
              explanation:
                'Correct. Dev Spaces eliminate corporate laptop configuration delays, proxy issues, and software version conflicts.',
            },
            {
              id: 'b',
              text: 'Dev Spaces automatically write your entire application without human intervention.',
              isCorrect: false,
              explanation:
                'Incorrect. Dev Spaces are developer tools, not autonomous AI replacements for developers.',
            },
            {
              id: 'c',
              text: 'Dev Spaces can only be accessed using an Apple iPad.',
              isCorrect: false,
              explanation:
                'Incorrect. BAS runs in standard modern web browsers on Windows, Mac, Linux, and ChromeOS.',
            },
            {
              id: 'd',
              text: 'Dev Spaces delete your code every 10 minutes to protect company secrets.',
              isCorrect: false,
              explanation:
                'Incorrect. Code is stored persistently on the Dev Space disk and synchronized with Git.',
            },
          ],
        },
        {
          id: 'mod-2-1-q2',
          question:
            'When you use the visual "CDS Graphical Modeler" in BAS to add a new entity to your data model, what happens behind the scenes to your source code?',
          options: [
            {
              id: 'a',
              text: 'The modeler automatically updates the human-readable text in "db/schema.cds" in real-time with standard CDS syntax.',
              isCorrect: true,
              explanation:
                'Correct. Visual tools in BAS directly edit standard text files; there is zero hidden proprietary metadata.',
            },
            {
              id: 'b',
              text: 'The modeler generates an encrypted binary file that cannot be opened in VS Code.',
              isCorrect: false,
              explanation:
                'Incorrect. All files remain plain text CDS.',
            },
            {
              id: 'c',
              text: 'The modeler sends an email to SAP requesting database approval.',
              isCorrect: false,
              explanation:
                'Incorrect. Changes are immediate and local to your workspace.',
            },
            {
              id: 'd',
              text: 'The modeler permanently disables text editing for that file.',
              isCorrect: false,
              explanation:
                'Incorrect. You can toggle between graphical and text editing at any time.',
            },
          ],
        },
        {
          id: 'mod-2-1-q3',
          question:
            'Which open-source framework serves as the underlying architectural foundation for SAP Business Application Studio?',
          options: [
            {
              id: 'a',
              text: 'Eclipse Theia',
              isCorrect: true,
              explanation:
                'Correct. Eclipse Theia is the modern open-source cloud IDE framework that provides VS Code compatibility in web browsers.',
            },
            {
              id: 'b',
              text: 'WordPress',
              isCorrect: false,
              explanation:
                'Incorrect. WordPress is a content management blogging platform.',
            },
            {
              id: 'c',
              text: 'Adobe Flash Player',
              isCorrect: false,
              explanation:
                'Incorrect. Flash is obsolete legacy technology.',
            },
            {
              id: 'd',
              text: 'Apache OpenOffice',
              isCorrect: false,
              explanation:
                'Incorrect. OpenOffice is an office suite, not a cloud IDE framework.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-2-2',
      code: '2.2',
      phaseId: 'phase-2',
      title: 'Local Tooling',
      tagline: 'VS Code, @sap/cds-dk CLI, SQLite3, and Local Rapid Prototyping',
      summary:
        'Master the professional local developer setup on your desktop. Configure Visual Studio Code with official SAP extensions, master the @sap/cds-dk development kit, and achieve sub-second development feedback loops using "cds watch" and SQLite in-memory databases.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Local developer prerequisites: Node.js LTS (v20), npm, Git, SQLite3, and Visual Studio Code.',
        'The SAP CAP Development Kit: Installing and mastering the global CLI (@sap/cds-dk).',
        'Essential VS Code extensions: SAP CDS Language Support, SAP Fiori Tools Extension Pack, REST Client, and ESLint.',
        'Project scaffolding: Initializing production-ready enterprise templates with "cds init my-project".',
        'The rapid prototyping loop: "cds watch" (live reload, auto-compilation, mock data seeding, and test endpoint serving).',
        'Database abstraction: Developing locally against lightweight SQLite without needing a live cloud HANA database.',
        'Multi-Apps CLI: Installing the "multiapps" plugin for Cloud Foundry to deploy MTAs from your local terminal.',
      ],
      practicalImplementation:
        'Initialize a local CAP project with `cds init bookstore --add sample`. Launch the local server with `cds watch`, test OData queries in your browser, and inspect auto-generated SQLite database tables.',
      masteryCheck:
        'Demonstrate a complete local workflow: initialize a CAP project, define an entity, add CSV mock data, launch "cds watch", and test an OData GET query using the REST Client extension.',
      learningObjectives: [
        'Install and configure the complete local SAP CAP development toolchain.',
        'Use the @sap/cds-dk CLI to initialize, build, and run enterprise services locally.',
        'Leverage "cds watch" for rapid local prototyping with instant live-reloading.',
        'Explain how SQLite in-memory databases accelerate local development before deploying to SAP HANA Cloud.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Local Development Philosophy',
          subtitle: 'Why top cloud developers test locally before deploying',
          explanation:
            'Deploying an application to the cloud (`cf push`) takes 1 to 3 minutes: uploading code, building containers, and registering routes. If a developer had to deploy to the cloud every time they changed a single line of JavaScript, they would spend half their working day waiting for deployment pipelines. The SAP CAP philosophy mandates: "Grow as you go; run locally first." Developers build, test, and debug their entire data model, business logic, and UI locally on their desktop in sub-seconds. Only after the application passes local unit and integration tests is it built into an MTA archive and deployed to the cloud.',
          keyIdea:
            'CAP is designed for local development: build and test 100% of your business logic locally in milliseconds before touching the cloud.',
          taskInstruction: 'Review the local toolchain checklist in the concept explanation.',
          hint: 'Local testing uses zero cloud credits and requires zero internet connection.',
        },
        {
          stepNumber: 2,
          title: 'Installing the Global @sap/cds-dk CLI',
          subtitle: 'The primary command-line tool for SAP developers',
          explanation:
            'The core tool of any CAP developer is the SAP Cloud Application Programming Development Kit (`@sap/cds-dk`). Installed globally via npm (`npm install -g @sap/cds-dk`), it provides the `cds` command: 1) `cds init`: Scaffolds standard enterprise project structures with `db/`, `srv/`, and `app/` folders. 2) `cds compile`: Translates CDS definitions into SQL DDL, OData $metadata XML, or OpenAPI JSON. 3) `cds build`: Prepares production compilation artifacts for Cloud Foundry. 4) `cds add`: Adds capabilities like sample data, HANA database configs, or XSUAA security descriptors.',
          keyIdea:
            '`@sap/cds-dk` is the command-line Swiss Army knife that scaffolds, compiles, tests, and builds SAP applications.',
          taskInstruction: 'Verify your local installation by running `cds --version` in your terminal.',
          hint: 'Keep `@sap/cds-dk` updated to access the latest SAP features and performance improvements.',
        },
        {
          stepNumber: 3,
          title: 'VS Code Extensions for Enterprise SAP Development',
          subtitle: 'Transforming VS Code into an SAP engineering powerhouse',
          explanation:
            'Visual Studio Code becomes an SAP-certified IDE by installing three essential extensions from the VS Code Marketplace: 1) SAP CDS Language Support: Provides syntax highlighting, auto-completion, jump-to-definition, and live compiler diagnostics for `.cds` files. 2) SAP Fiori Tools Extension Pack: Adds graphical generators for Fiori Elements apps, guided annotation modelers, and page map visualizers. 3) REST Client (by Huachao Mao): Allows writing and executing `.http` test files directly inside the editor without switching to external apps like Postman.',
          keyIdea:
            'These three extensions give VS Code complete parity with the cloud-based Business Application Studio.',
          taskInstruction: 'Install "SAP CDS Language Support" from the VS Code Extensions pane (`Ctrl+Shift+X`).',
          hint: 'Search for "SAP" in the extensions marketplace to find officially verified publisher plugins.',
        },
        {
          stepNumber: 4,
          title: 'The Magic of "cds watch"',
          subtitle: 'Instant live-reloading and automated test server',
          explanation:
            'When you run `cds watch` in your project terminal, CAP launches an intelligent local development server: 1) It detects your data models in `db/` and service definitions in `srv/`. 2) It automatically spins up an in-memory SQLite database, generates database tables, and seeds them with mock CSV data. 3) It serves OData v4 and REST endpoints at `http://localhost:4004`. 4) It monitors your files: the moment you edit a line of code or change a data model, `cds watch` restarts the server and re-compiles models in 200 milliseconds.',
          keyIdea:
            '`cds watch` provides instant live-reloading: save a file and your updated OData API is live in under 300 milliseconds.',
          taskInstruction: 'Run `cds watch` and open `http://localhost:4004` in your browser.',
          hint: 'The local landing page provides clickable links to inspect raw JSON data and OData $metadata.',
        },
        {
          stepNumber: 5,
          title: 'SQLite: Zero-Config In-Memory Database',
          subtitle: 'Why you do not need HANA Cloud for local coding',
          explanation:
            'SAP HANA Cloud is a powerful, distributed, enterprise in-memory database—but running a cloud database for quick local syntax checks is unnecessary. CAP abstracts the database layer: you write standard Core Data Services (CDS) models. During local development, CAP translates your CDS models into SQLite SQL automatically. When you deploy to production, the exact same CDS models are compiled into SAP HANA SQL. This database independence allows developers to prototype complex business models on laptops with zero cloud database fees.',
          keyIdea:
            'CAP abstracts the database: develop locally on lightweight SQLite; deploy to production on SAP HANA Cloud with zero code changes.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Use `sqlite3` or the default CAP in-memory SQLite runner during initial prototyping.',
        },
      ],
      diagramType: 'cap-architecture',
      analogy: {
        concept: 'Local Rapid Prototyping with "cds watch" and SQLite',
        analogy: 'The Flight Simulator vs Commercial Jet Flight',
        explanation:
          'Before an airline pilot flies a $200 million Boeing 787 across the Atlantic (deploying to SAP HANA Cloud on BTP), they spend hundreds of hours in a high-fidelity flight simulator (local VS Code with `cds watch` and SQLite). In the simulator, the controls, cockpit instruments, and aerodynamics behave identically to the real aircraft. If the pilot makes an error and crashes into a mountain during a crosswind landing simulation, they press a single red button: the simulator resets in 2 seconds, no fuel was burned, no passengers were endangered, and the pilot tries again immediately. Only after mastering the flight in the simulator do they board the real jet.',
        transition:
          'Where the flight simulator lets pilots train risk-free, local CAP tools let developers test business logic risk-free before deploying to production cloud infrastructure.',
      },
      conceptExplanation: {
        whatItIs:
          'Local development tooling refers to the desktop software stack—Node.js, VS Code, @sap/cds-dk, Git, and SQLite—that allows software engineers to build, test, and debug SAP applications locally on their own computers.',
        whyItExists:
          'Cloud deployment cycles are slow and consume metered cloud resources. Local development delivers instantaneous feedback loops (under 300ms), enables offline work, and maximizes developer productivity.',
        problemSolved:
          'Eliminates deployment waiting lag, allows safe experimentation without risking shared cloud databases, and drastically reduces cloud consumption costs during early project phases.',
        howItWorks:
          'The developer writes CDS models and Node.js logic in VS Code. `cds watch` monitors the file system, auto-generates an in-memory SQLite database, loads mock CSV data, and serves live OData v4 endpoints on `localhost:4004`.',
        btpFit:
          'All production SAP CAP and Fiori applications are developed locally or in BAS using this exact toolchain before being compiled into MTAs and pushed to SAP BTP.',
      },
      jargonTerms: [
        {
          term: '@sap/cds-dk',
          simpleMeaning: 'The official global command-line development kit for the SAP Cloud Application Programming Model.',
          familiarEquivalent: 'The master toolkit that creates, builds, and runs your project.',
        },
        {
          term: 'cds watch',
          simpleMeaning: 'A command that starts a local server and restarts it in 200ms whenever you save any file.',
          familiarEquivalent: 'An automated assistant that instantly refreshes your web preview every time you press Ctrl+S.',
        },
        {
          term: 'SQLite',
          simpleMeaning: 'A lightweight, zero-configuration in-memory SQL database used for rapid local testing.',
          familiarEquivalent: 'A digital scratchpad database that lives in your computer RAM during testing.',
        },
        {
          term: 'Mock Data',
          simpleMeaning: 'Fictional test records stored in CSV or JSON files used to simulate real ERP data locally.',
          familiarEquivalent: 'Monopoly play money used to test banking software before handling real currency.',
        },
      ],
      technicalExample: {
        title: 'Local CAP Project Initialization and REST Client Test Script',
        language: 'bash',
        code: `# 1. INITIALIZE NEW CAP PROJECT WITH SAMPLE FILES
cds init bookshop --add sample
cd bookshop

# 2. INSTALL LOCAL DEPENDENCIES
npm install

# 3. LAUNCH LOCAL DEVELOPMENT SERVER WITH LIVE-RELOAD
cds watch

# Output:
# [cds] - loaded model from 2 file(s):
#   db/schema.cds
#   srv/cat-service.cds
# [cds] - connect to db > sqlite { database: ':memory:' }
# > filled catalog with 3 books
# [cds] - serving CatalogService { at: '/odata/v4/catalog' }
# [cds] - server listening on { url: 'http://localhost:4004' }
# [cds] - [ready] in 242 ms

# 4. LOCAL HTTP TEST SCRIPT (test.http for VS Code REST Client)
### Query all Books via OData v4
GET http://localhost:4004/odata/v4/catalog/Books?$select=ID,title,stock

### Create a new Book locally
POST http://localhost:4004/odata/v4/catalog/Books
Content-Type: application/json

{
  "ID": 5,
  "title": "SAP BTP Architecture Blueprint",
  "stock": 100
}`,
        purpose:
          'Demonstrates the end-to-end local developer workflow: scaffolding a project with sample data, launching the sub-second in-memory server with cds watch, and executing HTTP requests using the VS Code REST Client.',
        lineExplanations: [
          { lines: '2', explanation: 'cds init: Scaffolds complete directory structure with schema and service files.' },
          { lines: '9', explanation: 'cds watch: Starts live-reloading development server in 242 milliseconds.' },
          { lines: '13', explanation: 'connect to db: Automatically provisions an in-memory SQLite database and seeds sample books.' },
          { lines: '19-29', explanation: 'test.http: Executable HTTP test file executed directly inside VS Code via REST Client.' },
        ],
        expectedOutput:
          'OData v4 service responds with HTTP 200 OK and clean JSON payload in 15 milliseconds on localhost:4004.',
        commonMistakes: [
          'Forgetting to run "npm install" after creating or pulling a CAP project, leading to missing module errors.',
          'Opening port 4004 in a browser while another application is already running on port 4004.',
        ],
      },
      businessScenario: {
        title: 'Rapid Prototype Delivery for Executive Innovation Showcase',
        context:
          'A retail corporation needs to demonstrate a proof-of-concept AI inventory re-ordering application to executive board members on short notice.',
        workflowSteps: [
          'Developer creates local CAP project on desktop laptop using `cds init inventory-ai`.',
          'Defines product stock data model in `db/schema.cds` and loads 1,000 mock products via CSV.',
          'Runs `cds watch` locally; writes business logic handler in JavaScript calculating stock re-order thresholds.',
          'Demonstrates fully functional, interactive Fiori UI and OData API to executives running on localhost.',
          'Executives approve the budget; developer runs `cds add hana` and deploys the identical codebase to SAP BTP.',
        ],
        businessImpact:
          'Delivers working proof-of-concept in 3 hours with zero cloud infrastructure expenditure, securing a €500,000 project sponsorship.',
      },
      practicalActivity:
        'Open your terminal and run `cds init test-project` to inspect the generated `db/`, `srv/`, and `app/` folder structure.',
      keyTakeaways: [
        'CAP mandates local-first development: build and test business logic locally in milliseconds before touching the cloud.',
        '@sap/cds-dk is the core CLI that initializes, builds, and runs CAP projects.',
        '"cds watch" provides live-reloading, auto-compilation, and automatic in-memory SQLite database provisioning.',
      ],
      quizQuestions: [
        {
          id: 'mod-2-2-q1',
          question:
            'What is the primary benefit of using "cds watch" during local SAP CAP development?',
          options: [
            {
              id: 'a',
              text: 'It automatically starts a local test server, provisions an in-memory SQLite database, loads mock data, and reloads code in under 300ms whenever any file is saved.',
              isCorrect: true,
              explanation:
                'Correct. "cds watch" delivers sub-second feedback loops by monitoring files and restarting instantly.',
            },
            {
              id: 'b',
              text: 'It records your screen and uploads videos to YouTube.',
              isCorrect: false,
              explanation:
                'Incorrect. cds watch is a development server, not screen recording software.',
            },
            {
              id: 'c',
              text: 'It charges €50 to your credit card every time you save a file.',
              isCorrect: false,
              explanation:
                'Incorrect. cds watch is completely free and runs locally on your machine.',
            },
            {
              id: 'd',
              text: 'It deletes your database permanently whenever an error occurs.',
              isCorrect: false,
              explanation:
                'Incorrect. cds watch refreshes in-memory test databases without harming source files.',
            },
          ],
        },
        {
          id: 'mod-2-2-q2',
          question:
            'Why does SAP CAP use an in-memory SQLite database for local desktop development instead of requiring a live connection to SAP HANA Cloud?',
          options: [
            {
              id: 'a',
              text: 'Because SQLite requires zero installation, spins up in milliseconds, runs entirely in RAM, and allows rapid local prototyping without incurring cloud costs or requiring an internet connection.',
              isCorrect: true,
              explanation:
                'Correct. SQLite provides instant local persistence, letting developers test logic before deploying to HANA.',
            },
            {
              id: 'b',
              text: 'Because SAP HANA Cloud is no longer supported by SAP.',
              isCorrect: false,
              explanation:
                'Incorrect. HANA Cloud is SAP\'s premier flagship database engine.',
            },
            {
              id: 'c',
              text: 'Because SQLite is faster than SAP HANA for storing 50 petabytes of enterprise data.',
              isCorrect: false,
              explanation:
                'Incorrect. SQLite is designed for lightweight local prototyping, not multi-terabyte production data.',
            },
            {
              id: 'd',
              text: 'Because CAP does not know how to communicate with SAP HANA.',
              isCorrect: false,
              explanation:
                'Incorrect. CAP integrates natively with SAP HANA Cloud via @sap/hana-client.',
            },
          ],
        },
        {
          id: 'mod-2-2-q3',
          question:
            'Which npm package must be installed globally on a developer machine to provide the "cds" command-line interface?',
          options: [
            {
              id: 'a',
              text: '@sap/cds-dk',
              isCorrect: true,
              explanation:
                'Correct. @sap/cds-dk is the official development kit containing the global cds command and compilers.',
            },
            {
              id: 'b',
              text: 'express',
              isCorrect: false,
              explanation:
                'Incorrect. Express is a standard web framework, not the CAP development kit.',
            },
            {
              id: 'c',
              text: 'react',
              isCorrect: false,
              explanation:
                'Incorrect. React is a frontend UI library.',
            },
            {
              id: 'd',
              text: 'jquery',
              isCorrect: false,
              explanation:
                'Incorrect. jQuery is a legacy DOM manipulation library.',
            },
          ],
        },
      ],
    },
  ],
};
