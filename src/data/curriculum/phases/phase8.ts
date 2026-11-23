import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_8: SyllabusPhase = {
  id: 'phase-8',
  number: 8,
  title: 'Capstone and Career',
  tagline: 'Phase 8 · Weeks 1-2 · ~24 Hours',
  description:
    'Deliver one comprehensive, production-grade, deployed portfolio application that synthesizes everything from Phases 0 to 7 into a single cohesive architecture. Turn your hands-on engineering accomplishments into compelling portfolio evidence, technical write-ups, and interview mastery.',
  coreObjective:
    'Design, develop, test, and deploy a full-stack enterprise cloud application integrating SAP CAP, SAP HANA Cloud Vector Engine, Generative AI Hub, Fiori Elements Horizon UI, XSUAA security, and CI/CD pipelines. Document architectural decision records (ADRs), publish technical case studies, and master SAP BTP developer technical interviews.',
  estimatedHours: 24,
  suggestedWeeks: 'Weeks 22-23',
  badgeCategory: 'capstone',
  capstone: PHASE_CAPSTONES[8]!,
  modules: [
    {
      id: 'mod-8-1',
      code: '8.1',
      phaseId: 'phase-8',
      title: 'Capstone: AI + CAP App',
      tagline: 'Production Full-Stack Cloud Product Integrating CAP, Fiori & AI',
      summary:
        'Architect, implement, and deploy the definitive end-to-end BTP capstone application. Synthesize CAP backend services, SAP HANA Cloud Vector Engine embeddings, Generative AI Hub LLM orchestration, Fiori Elements Horizon user interfaces, XSUAA role-based security, automated GitHub Actions CI/CD pipelines, and cloud cost governance into an immutable production release.',
      estimatedMinutes: 60,
      level: 'Advanced',
      subtopics: [
        'End-to-end architecture synthesis: connecting UI, App Router, CAP backend, HANA Vector Engine, and GenAI Hub',
        'Architecture Decision Records (ADRs): documenting runtime choices, security boundaries, and trade-offs',
        'C4 model diagrams: system context and container views detailing network protocols and authentication flows',
        'Enterprise API contracts: strict OData v4 schemas, draft handling, RFC 7807 error envelopes, and semantic versioning',
        'Non-functional requirements (NFRs): response time SLAs, availability targets, and monthly cloud budget limits',
        'Agile delivery management: GitHub Projects backlog, milestone tracking, definition of done, and automated release tagging',
        'Cloud cost hygiene: stopping or decommissioning idle AI deployments, HANA instances, and orphan service bindings',
      ],
      practicalImplementation:
        'Author 5 Architecture Decision Records (ADRs) for your capstone. Draw C4 System Context and Container architecture diagrams. Assemble a monorepo integrating your CAP service, HANA REAL_VECTOR embeddings, GenAI Hub actions, and Fiori Elements frontend. Configure an automated GitHub Actions CI/CD pipeline that runs tests, builds an MTAR archive, and deploys to Cloud Foundry with zero downtime. Record a 5-minute technical walkthrough video.',
      masteryCheck:
        'A reviewer who has never seen your project can clone your repository, follow the README, and successfully build and deploy the complete application in under 45 minutes. Every user story traces to an automated test or a verifiable demo step.',
      learningObjectives: [
        'Synthesize all technical disciplines of SAP BTP into an end-to-end, production-grade enterprise application.',
        'Author clear, professional Architecture Decision Records (ADRs) explaining technical trade-offs and rationale.',
        'Produce standard C4 architecture diagrams illustrating container boundaries, protocols, and security tokens.',
        'Execute full-stack MTA deployments with automated CI/CD pipelines and proactive cloud cost management.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Author the Project Specification and 5 ADRs',
          subtitle: 'Documenting deliberate architectural decisions and trade-offs',
          explanation:
            'Draft a one-page product specification detailing target personas, problem statement, user stories, and acceptance criteria. Author 5 formal Architecture Decision Records (ADRs) covering: 1) Runtime (Node.js CAP vs Java), 2) Database (HANA Cloud vs SQLite), 3) Frontend (Fiori Elements vs Freestyle), 4) AI Architecture (RAG vs fine-tuning), and 5) CI/CD tooling.',
          keyIdea:
            'ADRs communicate the deliberate technical reasoning behind every major architectural choice.',
        },
        {
          stepNumber: 2,
          title: 'Draw System Context and Container C4 Diagrams',
          subtitle: 'Visualizing container boundaries, network protocols, and tokens',
          explanation:
            'Create two C4 diagrams. The System Context diagram shows external users, the BTP application, and connected enterprise systems (S/4HANA). The Container diagram shows the browser, App Router, CAP Node.js backend, HANA Cloud database, AI Core, and Generative AI Hub, labeling authentication tokens (JWT) on every arrow.',
          keyIdea:
            'Clear diagrams eliminate architectural ambiguity for reviewers and security auditors.',
        },
        {
          stepNumber: 3,
          title: 'Implement Full-Stack Data Models, Logic, and AI Handlers',
          subtitle: 'Unifying CDS schemas, custom handlers, and vector embeddings',
          explanation:
            'Model CDS schemas in `db/schema.cds` with proper entity relationships and `REAL_VECTOR(1536)` columns. Implement custom handlers in `srv/service.js` for transactional validations, vector search queries, and Generative AI Hub completions using the official SAP SDK. Secure all endpoints with `@requires` and `@restrict`.',
          keyIdea:
            'CAP acts as the enterprise backbone unifying data persistence, business rules, and AI inference.',
        },
        {
          stepNumber: 4,
          title: 'Build Fiori Elements Horizon UI and Configure App Router',
          subtitle: 'Authentic enterprise UX with declarative metadata annotations',
          explanation:
            'Generate a Fiori Elements List Report and Object Page application using UI5 Tooling and CDS UI annotations (`@UI.LineItem`, `@UI.HeaderInfo`). Configure the App Router in `app/resources/xs-app.json` to route traffic to the CAP backend with `forwardAuthToken: true` and serve static UI assets.',
          keyIdea:
            'Fiori Elements delivers an authentic SAP user experience with minimal custom frontend code.',
        },
        {
          stepNumber: 5,
          title: 'Automate CI/CD Pipeline and Enforce Cost Hygiene',
          subtitle: 'Continuous delivery with quality gates and cloud resource management',
          explanation:
            'Configure `.github/workflows/deploy.yml` to lint, test with Vitest (requiring >80% coverage), build the MTAR with MBT, and deploy via `cf bg-deploy`. Verify zero-downtime routing. Document cloud cost hygiene procedures: schedule stopping of idle HANA instances and terminate inactive AI Core deployments.',
          keyIdea:
            'Professional engineering includes operational discipline, automated delivery, and cloud cost control.',
        },
      ],
      diagramType: 'cap-architecture',
      analogy: {
        concept: 'Capstone Architectural Synthesis and Delivery',
        analogy: 'Ocean-Going Cargo Vessel Construction and Sea Trials',
        explanation:
          'Think of building an ocean-going commercial cargo vessel. In trade school, you learned about naval architecture, marine diesel engines, navigation radar, electrical wiring, ballast systems, and hull hydrodynamics individually. However, an engine sitting on a wooden pallet does not move cargo across the Atlantic. The capstone project is the shipyard drydock where all these separate systems are bolted together into a seaworthy vessel. The hull (HANA Cloud) supports the engine rooms (CAP backend), the navigation bridge (Fiori Elements UI), the radio communications suite (Generative AI Hub), and the watertight bulkheads (XSUAA security). Only when sea trials are successfully completed under real stormy conditions (automated CI/CD test suites) is the ship certified for international commercial service.',
        transition:
          'Where the shipyard drydock combines individual systems into an ocean-going vessel, the capstone synthesizes CAP, HANA Vector Engine, Fiori, and XSUAA into a deployed enterprise product.',
      },
      conceptExplanation: {
        whatItIs:
          'The Capstone AI + CAP Application is an integrated, production-grade enterprise cloud product built on SAP BTP that combines modern full-stack development (CAP, SAP HANA Cloud, SAP Fiori Elements) with advanced Business AI capabilities (Generative AI Hub, Vector Search), packaged as an MTA and deployed via CI/CD pipelines following Clean Core principles.',
        whyItExists:
          'Enterprise IT organizations do not hire developers who merely memorize documentation; they hire engineers who can independently architect, deliver, secure, and operate working software systems that reduce costs or drive new business value. The capstone provides undeniable tangible proof of technical competence.',
        problemSolved:
          'Bridges the gap between theoretical knowledge and production execution, proving competence across architecture, coding, security, AI integration, automated deployment, and cost governance.',
        howItWorks:
          'Combines an App Router, CAP Node.js backend, HANA Cloud HDI container with vector engine, and Generative AI Hub integration, packaged as an MTAR archive and deployed continuously via GitHub Actions.',
        btpFit:
          'Synthesizes all core runtime, data, integration, security, and AI capabilities of the SAP Business Technology Platform into a single coherent solution.',
      },
      jargonTerms: [
        {
          term: 'Architecture Decision Record (ADR)',
          simpleMeaning: 'A short one-page note explaining why you picked a certain technology and what trade-offs you accepted.',
          familiarEquivalent: 'A builder\'s structural justification note explaining why steel was used instead of wood for the main roof beam.',
        },
        {
          term: 'C4 Model',
          simpleMeaning: 'A simple way of drawing software maps that zoom in like Google Maps (from world view down to street view).',
          familiarEquivalent: 'An atlas with world maps, regional state maps, city maps, and building blueprints.',
        },
        {
          term: 'Non-Functional Requirements (NFRs)',
          simpleMeaning: 'System qualities like how fast it responds, how secure it is, and how much it costs per month to run.',
          familiarEquivalent: 'A car\'s top speed, fuel efficiency, safety crash rating, and maintenance cost.',
        },
        {
          term: 'Cost Hygiene',
          simpleMeaning: 'Turning off cloud servers you are not using so you do not get an expensive surprise bill at the end of the month.',
          familiarEquivalent: 'Turning off all lights and air conditioning in an office over the weekend.',
        },
      ],
      technicalExample: {
        title: 'Standard Architecture Decision Record (ADR-004): Selecting RAG over Fine-Tuning',
        language: 'markdown',
        code: `# ADR-004: Grounding AI Assistance via RAG on SAP HANA Cloud Vector Engine

## Status
Accepted

## Context
Our enterprise procurement extension requires natural language search across internal supplier contracts, hazardous material handling guidelines, and company procurement policies. The documents change weekly as new vendor contracts are signed. We evaluated two primary approaches:
1. Fine-tuning an open-source foundation model (e.g. Llama 3) on our internal document corpus.
2. Implementing Retrieval-Augmented Generation (RAG) using SAP HANA Cloud Vector Engine and the Generative AI Hub.

## Decision
We decided to implement Retrieval-Augmented Generation (RAG) on SAP HANA Cloud Vector Engine using text-embedding-3-small and GPT-4o via Generative AI Hub.

## Rationale
- **Dynamic Updates:** RAG allows new document chunks and vector embeddings to be inserted into SAP HANA Cloud immediately via standard SQL INSERT queries without requiring days of GPU retraining.
- **Enterprise Security (RBAC):** RAG queries execute in HANA Cloud, allowing us to combine vector cosine similarity with standard relational SQL WHERE clauses (WHERE accessRole IN (:userRoles)), preventing unauthorized data leakage.
- **Zero Hallucination with Verifiable Citations:** Grounded prompts require the foundation model to cite specific source document IDs, providing an audit trail for regulatory compliance.
- **Cost Efficiency:** Fine-tuning requires expensive high-memory GPU compute clusters on SAP AI Core. RAG uses our existing SAP HANA Cloud database memory and low-cost embedding API calls.

## Consequences
- **Positive:** Immediate document indexing, strict access control enforcement, verifiable audit citations, lower operational compute costs.
- **Negative:** Retrieval latency adds approximately 250-400ms to end-to-end response times; document chunking strategy must be maintained.`,
        purpose:
          'Provides an authentic example of an enterprise Architecture Decision Record documenting the technical rationale for choosing RAG over fine-tuning.',
        lineExplanations: [
          { lines: '1-5', explanation: 'Documents ADR title, unique identification number, and current acceptance status.' },
          { lines: '7-12', explanation: 'Clearly defines the business problem context and the two technological options evaluated.' },
          { lines: '14-16', explanation: 'Declares the final architectural decision reached by the engineering team.' },
          { lines: '18-24', explanation: 'Details the objective technical and financial rationale (dynamic updates, RBAC, citations, cost).' },
          { lines: '26-29', explanation: 'Transparently documents both positive outcomes and negative architectural consequences/trade-offs.' },
        ],
        expectedOutput:
          'A markdown ADR document committed to docs/adr/ in the project repository, referenced during architectural reviews.',
        commonMistakes: [
          'Writing ADRs after implementation merely as retroactive justification rather than as deliberate design tools.',
          'Omitting negative consequences; every genuine architectural decision carries technical trade-offs.',
          'Failing to link ADRs to user stories and acceptance criteria in project tracking systems.',
        ],
      },
      businessScenario: {
        title: 'Solar Energy Array Maintenance Copilot Delivery',
        context:
          'Helios Clean Energy operated 1,200 solar panel farms globally. Operations teams struggled with disjointed systems: maintenance tickets were in S/4HANA, equipment manuals were in PDF folders, and field technicians lacked mobile access to diagnose inverter faults, leading to $9M in lost power generation annually.',
        workflowSteps: [
          'Field service technician opens mobile Fiori Elements application on BTP.',
          'Technician scans inverter alarm code; mobile app initiates RAG query.',
          'CAP backend queries SAP HANA Cloud REAL_VECTOR embeddings of technical manuals.',
          'Generative AI Hub foundation model generates step-by-step grounded repair instructions.',
          'Technician repairs inverter in 15 minutes and updates work order via BTP Destination to S/4HANA.',
        ],
        businessImpact:
          'Reduced solar array downtime by 75%, generating $6.8M in recovered clean electricity within 9 months of deployment.',
      },
      quizQuestions: [
        {
          id: 'mod-8-1-q1',
          question: 'What is the primary purpose of an Architecture Decision Record (ADR)?',
          options: [
            {
              id: 'a',
              text: 'To record employee vacation requests.',
              isCorrect: false,
              explanation: 'Incorrect. ADRs document software architectural decisions, not human resource schedules.',
            },
            {
              id: 'b',
              text: 'To capture important architectural choices, evaluated alternatives, technical rationale, and trade-offs for future engineers and auditors.',
              isCorrect: true,
              explanation: 'Correct. ADRs document why a technical choice was made, preserving institutional knowledge and preventing repeated debates.',
            },
            {
              id: 'c',
              text: 'To replace all compiled source code with plain text documentation.',
              isCorrect: false,
              explanation: 'Incorrect. ADRs complement source code; they do not replace executable programs.',
            },
            {
              id: 'd',
              text: 'To generate fake marketing brochures for non-existent software.',
              isCorrect: false,
              explanation: 'Incorrect. ADRs are rigorous technical engineering documents.',
            },
          ],
        },
        {
          id: 'mod-8-1-q2',
          question: 'In a C4 Container architecture diagram of an SAP BTP application, what should be explicitly labeled on communication arrows?',
          options: [
            {
              id: 'a',
              text: 'Only the color of the Ethernet cables in the data center.',
              isCorrect: false,
              explanation: 'Incorrect. Physical cable colors have no bearing on software container diagrams.',
            },
            {
              id: 'b',
              text: 'The communication protocol (e.g. HTTPS, OData v4, WebSocket) and the authentication mechanism (e.g. JWT / Bearer Token, Mutual TLS).',
              isCorrect: true,
              explanation: 'Correct. Explicitly labeling protocols and security tokens ensures complete architectural transparency.',
            },
            {
              id: 'c',
              text: 'The personal home address of the developer.',
              isCorrect: false,
              explanation: 'Incorrect. Personal addresses violate privacy policies and have zero architectural relevance.',
            },
            {
              id: 'd',
              text: 'A list of English dictionary words starting with the letter Z.',
              isCorrect: false,
              explanation: 'Incorrect. Diagrams must contain accurate technical metadata.',
            },
          ],
        },
        {
          id: 'mod-8-1-q3',
          question: 'Why is proactive cloud cost hygiene essential when operating SAP BTP capstone projects?',
          options: [
            {
              id: 'a',
              text: 'Because cloud providers automatically delete all source code if a bill is less than $1,000.',
              isCorrect: false,
              explanation: 'Incorrect. Cloud providers do not delete code based on low bills.',
            },
            {
              id: 'b',
              text: 'To prevent idle AI Core deployments and unneeded database instances from continuously consuming subscription capacity units and incurring unnecessary charges.',
              isCorrect: true,
              explanation: 'Correct. Cloud resources consume capacity units while running; stopping idle services maintains budget discipline.',
            },
            {
              id: 'c',
              text: 'Because SAP BTP only operates on solar power during daylight hours.',
              isCorrect: false,
              explanation: 'Incorrect. Enterprise cloud data centers operate 24/7/365 with redundant power grids.',
            },
            {
              id: 'd',
              text: 'Because developers are legally required to delete their applications every Friday evening.',
              isCorrect: false,
              explanation: 'Incorrect. Cost hygiene means stopping idle resources, not deleting applications.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'The capstone synthesizes CAP, HANA Cloud Vector Engine, Generative AI Hub, and Fiori into one unified architecture.',
        'Architecture Decision Records (ADRs) document technical choices, rationale, and trade-offs professionally.',
        'Rigorous automated CI/CD pipelines and cloud cost hygiene distinguish senior enterprise developers from beginners.',
      ],
      practicalActivity:
        'Create a docs/adr/ folder in your project repository. Author ADR-001 recording your choice of CAP runtime (Node.js vs Java). Validate your mta.yaml and run mbt build to confirm error-free packaging.',
    },
    {
      id: 'mod-8-2',
      code: '8.2',
      phaseId: 'phase-8',
      title: 'Portfolio and Career',
      tagline: 'Technical Curation, Architecture Write-Ups & Career Strategy',
      summary:
        'Transform your technical capabilities into career acceleration. Master technical documentation curation, repository hygiene, secret scanning, and public architectural write-ups. Build an interview question bank covering core BTP topics, prepare for official SAP certification exams, and articulate your unique engineering value at the intersection of enterprise ERP and artificial intelligence.',
      estimatedMinutes: 60,
      level: 'Advanced',
      subtopics: [
        'Technical public writing: publishing phase technical summaries structured by problem, approach, pitfalls, and results',
        'Repository hygiene: professional README structure, C4 architecture diagrams, open-source licensing, and automated secret scanning',
        'CV and LinkedIn evidence: transforming project work into measurable engineering outcomes (test counts, latency, cost savings)',
        'SAP certification roadmap: navigating SAP Learning journeys and preparing for official BTP developer certifications',
        'SAP Community engagement: contributing technical answers, publishing blogs, and participating in SAP Developer challenges',
        'Technical interview mastery: deep-dive interview preparation across BTP account models, CAP, XSUAA, MTA, RAG, and Clean Core',
        'Narrative positioning: explaining how prior software experience, ERP domain knowledge, and modern BTP AI skills combine for senior roles',
      ],
      practicalImplementation:
        'Perform a comprehensive security and secret scan on your public GitHub repository using git-secrets or Trufflehog. Create a professional README with embedded architecture diagrams, setup instructions, and demo GIFs. Author a technical case study detailing your capstone architecture. Compile a question bank of 40 technical interview questions across all 9 phases and conduct a recorded mock technical interview.',
      masteryCheck:
        'Your public repository passes your own hygiene checklist, including an automated secret scan. You can confidently answer 10 randomly chosen technical questions from the interview bank in under 2 minutes each without notes.',
      learningObjectives: [
        'Curate a professional, public GitHub portfolio demonstrating strict repository hygiene and zero committed secrets.',
        'Write high-impact technical case studies explaining architecture decisions, engineering hurdles, and measurable outcomes.',
        'Navigate the official SAP Certification ecosystem and identify relevant BTP and AI developer credentials.',
        'Confidently answer advanced technical interview questions across all layers of the SAP BTP and Business AI stack.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Execute Automated Secret Scanning and Hygiene Audit',
          subtitle: 'Ensuring zero leaked credentials in public version control',
          explanation:
            'Run an automated secret scanner across your entire git commit history: `npx trufflehog git file://. --only-verified`. Ensure zero API keys, passwords, or BTP service keys were ever committed. Add `.env`, `default-env.json`, and `*.mtar` to `.gitignore`.',
          keyIdea:
            'A single committed password or API key in public git history immediately disqualifies a candidate.',
        },
        {
          stepNumber: 2,
          title: 'Author a World-Class Repository README.md',
          subtitle: 'Creating an impeccable technical front door for your project',
          explanation:
            'Structure your README with: 1) Project Title and Badges (Build passing, test coverage >80%), 2) Executive Summary, 3) Architecture Diagram (C4 Container view), 4) Key Features, 5) Prerequisites, 6) Step-by-Step Local Setup, 7) Cloud Deployment Commands, and 8) License.',
          keyIdea:
            'The README is your software\'s front door; it must enable any developer to run the project in minutes.',
        },
        {
          stepNumber: 3,
          title: 'Draft Measurable CV and LinkedIn Bullet Points',
          subtitle: 'Communicating tangible business impact using the XYZ formula',
          explanation:
            'Rewrite your resume bullet points using the Google XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]". Example: "Architected and deployed full-stack SAP CAP and Fiori logistics application with HANA Vector RAG, achieving 92% retrieval accuracy and zero-downtime blue-green deployments via GitHub Actions."',
          keyIdea:
            'Metrics-driven bullet points prove tangible business value and technical execution.',
        },
        {
          stepNumber: 4,
          title: 'Master the 40-Question BTP Technical Interview Bank',
          subtitle: 'Building verbal fluency across all BTP architectural domains',
          explanation:
            'Practice answering core technical interview questions covering: Global Accounts vs Subaccounts, Cloud Foundry vs Kyma, CAP lifecycle hooks, XSUAA JWT validation, Destination Service, SAP Cloud Connector reverse tunnels, MTA descriptors, Generative AI Hub Zero Data Retention, HANA REAL_VECTOR search, and Clean Core extensibility.',
          keyIdea:
            'Fluency in technical explanations demonstrates true conceptual mastery without reliance on buzzwords.',
        },
        {
          stepNumber: 5,
          title: 'Pursue SAP Certification and Community Engagement',
          subtitle: 'Validating expertise through official credentials and community contribution',
          explanation:
            'Review current exam codes on SAP Training Shop (e.g. C_CPE_2409 for SAP Certified Associate - Backend Developer - SAP Cloud Application Programming Model). Complete official SAP Learning Journeys. Publish your technical case study on SAP Community Blogs and share insights on LinkedIn.',
          keyIdea:
            'Combining open-source portfolio proof with official SAP credentials maximizes career marketability.',
        },
      ],
      diagramType: 'btp-hierarchy',
      analogy: {
        concept: 'Technical Portfolio Curation and Career Strategy',
        analogy: 'Master Architectural Portfolio Presentation vs Laying Bricks',
        explanation:
          'Think of a master architect applying to design a landmark international airport terminal. They do not walk into the client presentation with a bucket of wet cement and a trowel to prove they can lay bricks. Instead, they present an impeccably bound leather portfolio. Inside are high-resolution architectural renderings, structural engineering calculations, seismic stress analysis reports, environmental sustainability certifications, and documented case studies of previous bridges and terminals they designed. When the client asks tough questions about wind shear or passenger bottlenecks, the architect answers with calm, precise technical authority. The client awards the $500 million contract not because the architect claims to work hard, but because their portfolio provides irrefutable proof of mastery.',
        transition:
          'Where the architect proves capability through verified engineering portfolios and blueprints, software developers prove capability through clean GitHub repositories, passing test suites, and live deployed applications.',
      },
      conceptExplanation: {
        whatItIs:
          'Portfolio and Career Strategy in SAP BTP is the professional practice of curating verifiable engineering evidence, adhering to software repository standards, publishing technical architecture write-ups, and demonstrating deep domain expertise to secure senior enterprise development and architecture roles.',
        whyItExists:
          'Enterprise clients and IT consulting firms face immense risks when hiring developers for multi-million dollar cloud transformations. Candidates who demonstrate verified competence through high-quality code, clean architecture, and rigorous communication reduce hiring risk and command premium compensation.',
        problemSolved:
          'Eliminates credential skepticism, proves hands-on coding ability beyond resume buzzwords, demonstrates architectural communication, and accelerates executive hiring decisions.',
        howItWorks:
          'Developers clean and scan repositories for secrets, write comprehensive READMEs with C4 diagrams, publish technical case studies, master verbal technical interview question banks, and complete official SAP certification exams.',
        btpFit:
          'Aligns with the global SAP partner ecosystem, SAP Certification pathways, and SAP Community knowledge sharing.',
      },
      jargonTerms: [
        {
          term: 'Repository Hygiene',
          simpleMeaning: 'Keeping your code project clean, well-organized, properly licensed, and completely free of leaked passwords.',
          familiarEquivalent: 'An impeccably clean master craftsperson\'s workshop where every tool has a marked place.',
        },
        {
          term: 'Secret Scanning',
          simpleMeaning: 'Using a robot scanner to inspect your entire code history to make sure you never accidentally saved a password online.',
          familiarEquivalent: 'A security guard with a metal detector inspecting bags before entry into a secure building.',
        },
        {
          term: 'SAP Learning Journey',
          simpleMeaning: 'Official free online training roadmaps published by SAP to guide students through certification topics.',
          familiarEquivalent: 'A university curriculum guide outlining all mandatory and elective courses for a degree.',
        },
        {
          term: 'XYZ Resume Formula',
          simpleMeaning: 'Writing resume points by stating what you achieved, the numbers that prove it, and the technical tools you used.',
          familiarEquivalent: 'A pilot logging: "Completed 500 safe landings (Y) across Airbus A320 aircraft (Z) during severe weather flights (X)".',
        },
      ],
      technicalExample: {
        title: 'Comprehensive BTP Developer Technical Interview Bank (Core Sample)',
        language: 'markdown',
        code: `# SAP BTP & CAP Senior Developer Technical Interview Bank

## Q1: Explain the difference between an SAP BTP Global Account, Subaccount, and Space.
**Answer:** 
- **Global Account:** The commercial and billing contract between the customer and SAP. It holds entitlements, quotas, and global administrators.
- **Subaccount:** An independent administrative, regional, and security boundary within a Global Account (e.g., Development in Frankfurt, Production in Virginia). Backing services (HANA Cloud, XSUAA) and role collections are managed here.
- **Space:** An environment runtime boundary within Cloud Foundry inside a subaccount where application containers actually run and bind to service instances.

## Q2: How does the XSUAA service validate an incoming JWT token in a CAP backend?
**Answer:**
When a Fiori app makes a request via the App Router, the App Router forwards the user's JWT Bearer token in the \`Authorization\` header. The CAP backend (using \`@sap/xssec\`) decodes the JWT header, inspects the \`jku\` (JWKS URL) or uses its bound XSUAA public verification key to cryptographically verify the digital signature, checks token expiration (\`exp\`), validates the issuer (\`iss\`), and extracts user scopes to enforce \`@requires\` and \`@restrict\` authorization annotations.

## Q3: What is the purpose of the SAP Cloud Connector and why doesn't it require opening inbound firewall ports?
**Answer:**
SAP Cloud Connector runs as an on-premise proxy inside the corporate DMZ. When started, it initiates an encrypted outbound reverse TLS tunnel over port 443 to the SAP BTP Connectivity service. Because enterprise firewalls allow outbound connections to trusted destinations, zero inbound firewall ports need to be opened on corporate infrastructure, protecting the internal network from external internet penetration.

## Q4: How does SAP HANA Cloud execute vector similarity search on REAL_VECTOR columns?
**Answer:**
Text embeddings (e.g. 1536 floating-point numbers) are stored in native \`REAL_VECTOR(1536)\` columns. SAP HANA Cloud executes in-memory vector calculations using SIMD hardware acceleration. Queries utilize built-in SQL functions like \`COSINE_SIMILARITY(embedding, TO_REAL_VECTOR(?))\` and can combine vector ranking with standard relational SQL \`WHERE\` clauses in a single atomic query to enforce multi-tenancy and role-based access control.

## Q5: What is the core rule of the SAP Clean Core extensibility strategy?
**Answer:**
Clean Core strictly prohibits modifying standard SAP ERP core source code, tables, or unreleased internals. Custom functionality must be built side-by-side on SAP BTP using CAP or via restricted ABAP Cloud developer extensibility, integrating exclusively through officially released APIs and business events cataloged on SAP Business Accelerator Hub to guarantee frictionless quarterly cloud upgrades.`,
        purpose:
          'Provides a concise, technically rigorous interview reference bank covering the entire enterprise BTP architectural stack.',
        lineExplanations: [
          { lines: '3-7', explanation: 'Details the precise hierarchical distinctions between Global Accounts, Subaccounts, and CF Spaces.' },
          { lines: '9-13', explanation: 'Explains the cryptographic mechanics of XSUAA JWT signature validation in CAP services.' },
          { lines: '15-19', explanation: 'Explains reverse TLS tunnels in SAP Cloud Connector and why inbound firewall ports remain closed.' },
          { lines: '21-25', explanation: 'Explains in-memory SIMD acceleration and hybrid SQL querying in SAP HANA Cloud Vector Engine.' },
          { lines: '27-31', explanation: 'Articulates the definitive Clean Core rule regarding standard code modifications and released APIs.' },
        ],
        expectedOutput:
          'A candidate who can fluently articulate these technical answers will comfortably pass senior SAP BTP technical interviews.',
        commonMistakes: [
          'Memorizing answers word-for-word without understanding the underlying architectural mechanics.',
          'Using generic cloud terms (e.g. "it runs in the cloud") without naming specific SAP BTP components and protocols.',
          'Failing to connect theoretical knowledge to real personal debugging experiences from the capstone project.',
        ],
      },
      businessScenario: {
        title: 'Enterprise Consulting Architect Technical Interview Delivery',
        context:
          'A leading global enterprise systems integrator needed 15 senior SAP BTP Cloud Architects for a major transformation program. Out of 120 applicants who claimed BTP experience, 110 failed basic questions on JWT validation, Cloud Connector tunnels, and Clean Core extension rules.',
        workflowSteps: [
          'Candidate submits CV with metrics and public GitHub portfolio link.',
          'Technical reviewer clones repository, runs test suites, and inspects clean C4 architecture diagrams and ADRs.',
          'Technical interview focuses on candidate\'s live capstone architecture and engineering decisions.',
          'Candidate explains XSUAA authentication, HANA Vector Engine, and Clean Core trade-offs fluently.',
          'Candidate receives formal offer for Lead BTP Solution Architect role within 48 hours.',
        ],
        businessImpact:
          'The candidate differentiated themselves from 90% of applicants by providing verified, reproducible proof of enterprise cloud engineering competence.',
      },
      quizQuestions: [
        {
          id: 'mod-8-2-q1',
          question: 'What is the most critical security step before publishing an SAP BTP project repository to a public GitHub account?',
          options: [
            {
              id: 'a',
              text: 'Renaming all JavaScript files to uppercase letters.',
              isCorrect: false,
              explanation: 'Incorrect. File naming case has no impact on repository security.',
            },
            {
              id: 'b',
              text: 'Performing an automated secret scan to ensure no service keys, passwords, API tokens, or credentials exist anywhere in the git commit history.',
              isCorrect: true,
              explanation: 'Correct. Committing credentials to public repositories creates severe security vulnerabilities and cloud billing liability.',
            },
            {
              id: 'c',
              text: 'Deleting all README documentation so competitors cannot read it.',
              isCorrect: false,
              explanation: 'Incorrect. Professional portfolios require comprehensive, clear documentation.',
            },
            {
              id: 'd',
              text: 'Changing your computer monitor brightness to 100%.',
              isCorrect: false,
              explanation: 'Incorrect. Monitor brightness has nothing to do with git security scanning.',
            },
          ],
        },
        {
          id: 'mod-8-2-q2',
          question: 'How should technical accomplishments be formatted on a professional software engineering CV for maximum impact?',
          options: [
            {
              id: 'a',
              text: 'Using the XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]" with concrete metrics and technologies.',
              isCorrect: true,
              explanation: 'Correct. Concrete metrics (test counts, latency reduction, cost savings) provide tangible proof of impact.',
            },
            {
              id: 'b',
              text: 'Copying and pasting the entire dictionary of computer acronyms.',
              isCorrect: false,
              explanation: 'Incorrect. Keyword stuffing without context looks amateurish to experienced hiring managers.',
            },
            {
              id: 'c',
              text: 'Listing only your elementary school grades.',
              isCorrect: false,
              explanation: 'Incorrect. Technical resumes must highlight relevant software engineering accomplishments.',
            },
            {
              id: 'd',
              text: 'Leaving the resume completely blank to build mystery.',
              isCorrect: false,
              explanation: 'Incorrect. Blank resumes are rejected immediately by applicant tracking systems.',
            },
          ],
        },
        {
          id: 'mod-8-2-q3',
          question: 'In a technical interview, what is the best strategy when an interviewer asks how you solved a challenging software defect?',
          options: [
            {
              id: 'a',
              text: 'Claim that you never make mistakes and that your code has always worked perfectly on the first try.',
              isCorrect: false,
              explanation: 'Incorrect. Claiming perfection demonstrates a lack of real-world development experience and damages credibility.',
            },
            {
              id: 'b',
              text: 'Use the STAR method: describe the Situation, Task, diagnostic Actions taken (logs, traces, tools), and the measurable Result achieved.',
              isCorrect: true,
              explanation: 'Correct. The STAR method communicates structured problem-solving, resilience, and operational maturity.',
            },
            {
              id: 'c',
              text: 'Blame your previous teammates for being incompetent.',
              isCorrect: false,
              explanation: 'Incorrect. Blaming colleagues displays poor teamwork and unprofessionalism.',
            },
            {
              id: 'd',
              text: 'Pretend the question was not asked and change the subject to the weather.',
              isCorrect: false,
              explanation: 'Incorrect. Directly and confidently answering technical questions is essential to interview success.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'Strict repository hygiene, automated secret scanning, and clear README documentation establish credibility.',
        'Metrics-driven case studies and resume bullet points prove tangible business and engineering value.',
        'Fluency in explaining core BTP and AI concepts under interview conditions sets you apart as a senior cloud professional.',
      ],
      practicalActivity:
        'Perform a secret audit on your repository using git log search or Trufflehog. Review your README and ensure it includes architecture diagrams, local setup commands, and demo steps.',
    },
  ],
};
