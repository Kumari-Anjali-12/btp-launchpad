import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_7: SyllabusPhase = {
  id: 'phase-7',
  number: 7,
  title: 'AI Layer on BTP',
  tagline: 'Phase 7 · Weeks 1-2 · ~36 Hours',
  description:
    "Master SAP's enterprise Business AI architecture. Deploy custom ML workloads on SAP AI Core, leverage foundation models through the Generative AI Hub, build Retrieval-Augmented Generation (RAG) with SAP HANA Cloud's Vector Engine, engineer Joule Copilot skills and autonomous agent loops, and enforce Clean Core extensibility principles.",
  coreObjective:
    'Design, develop, and integrate secure enterprise AI capabilities on SAP BTP. Build RAG pipelines connecting CAP services to HANA Cloud REAL_VECTOR columns, orchestrate foundation models with @sap-ai-sdk/foundation-models, implement tool-calling agent loops, and uphold strict enterprise data privacy, content filtering, and Clean Core extension rules.',
  estimatedHours: 36,
  suggestedWeeks: 'Weeks 19-21',
  badgeCategory: 'ai-layer',
  capstone: PHASE_CAPSTONES[7]!,
  modules: [
    {
      id: 'mod-7-1',
      code: '7.1',
      phaseId: 'phase-7',
      title: 'SAP Business AI Overview',
      tagline: 'SAP AI Strategy, Joule Copilot, and Enterprise Use Cases',
      summary:
        'Understand SAP Business AI strategy and architecture. Explore the three layers: embedded AI in standard SAP applications, Joule conversational copilot, and the SAP BTP AI Foundation. Master the decision matrix for build versus use, responsible AI ethics, data privacy, and enterprise governance.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'The three layers of SAP Business AI: Embedded AI, Joule Copilot, and BTP AI Foundation',
        'BTP AI Foundation components: AI Core, AI Launchpad, Generative AI Hub, and HANA Cloud Vector Engine',
        'Build vs. Buy vs. Extend: decision criteria for choosing between standard embedded AI, BTP extensions, and custom models',
        'Foundational AI vocabulary: token, context window, embeddings, similarity search, RAG, temperature, and hallucinations',
        'Responsible AI at SAP: data privacy, zero data retention agreements, data masking, and content safety filters',
        'Enterprise AI use cases: intelligent invoice matching, automated order summarization, and predictive supply re-routing',
      ],
      practicalImplementation:
        'Architect a multi-tier enterprise AI evaluation matrix. Analyze 5 classic S/4HANA business processes (Procure-to-Pay, Order-to-Cash, Record-to-Report) and classify their AI enhancement potential as embedded, side-by-side extension on BTP, or custom build. Formulate an enterprise data privacy and model governance checklist.',
      masteryCheck:
        'Explain the three layers of SAP Business AI (Embedded AI, Joule, BTP AI Foundation) and provide a concrete example of each. Explain how SAP Zero Data Retention agreements protect enterprise intellectual property.',
      learningObjectives: [
        'Articulate the three tiers of SAP Business AI: Embedded AI, Joule Copilot, and the BTP AI Foundation.',
        'Apply the Build vs. Use decision framework to evaluate enterprise AI use cases objectively.',
        'Define key generative AI terms (tokens, context window, vector embeddings, grounding, RAG) in an enterprise context.',
        'Explain SAP responsible AI principles, including data masking, zero data retention, and enterprise compliance.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Classify Enterprise AI Requirements into the Three Tiers',
          subtitle: 'Separating out-of-the-box features from custom BTP engineering',
          explanation:
            'Review incoming business requirements. Determine whether the need is already met by standard embedded S/4HANA AI features, whether it can be served conversationally through Joule Copilot, or whether it requires custom development on the BTP AI Foundation.',
          keyIdea:
            'Always maximize standard out-of-the-box SAP capabilities before committing engineering budget to custom development.',
        },
        {
          stepNumber: 2,
          title: 'Apply the Build vs. Extend Decision Matrix',
          subtitle: 'Deciding when custom business logic justifies BTP side-by-side extensions',
          explanation:
            'Evaluate the unique business differentiation of the feature. If proprietary company data, custom business rules, or unique workflows are central to competitive advantage, design a side-by-side BTP extension rather than attempting in-app modifications.',
          keyIdea:
            'Side-by-side BTP extensions maintain clean core principles while delivering custom AI capabilities.',
        },
        {
          stepNumber: 3,
          title: 'Establish Enterprise Data Privacy and Masking Controls',
          subtitle: 'Protecting sensitive employee and financial records from model exposure',
          explanation:
            'Identify all personally identifiable information (PII) and sensitive financial figures in the data flow. Configure data masking layers in CAP services or BTP safety filters to anonymize names, phone numbers, and bank accounts before prompting LLMs.',
          keyIdea:
            'Data masking prevents sensitive PII leaks while preserving the semantic structure needed for LLM reasoning.',
        },
        {
          stepNumber: 4,
          title: 'Select Foundation Models via Generative AI Hub',
          subtitle: 'Evaluating latency, cost per token, and context window requirements',
          explanation:
            'Compare available models in the Generative AI Hub (e.g. GPT-4o for complex reasoning, Claude 3.5 Sonnet for document analysis, Gemini 1.5 Pro for multimodal tasks, lightweight models for classification) based on latency, cost per token, and context window requirements.',
          keyIdea:
            'Generative AI Hub abstracts model vendors behind a single unified SAP SDK, avoiding vendor lock-in.',
        },
        {
          stepNumber: 5,
          title: 'Implement Grounding and Human-in-the-Loop Safeguards',
          subtitle: 'Anchoring responses in verified facts and requiring approval for writes',
          explanation:
            'Design the application to ground all responses in verified SAP database records (using RAG or direct ERP lookups). For write operations (e.g. creating purchase orders or issuing refunds), require an interactive human confirmation step rather than autonomous execution.',
          keyIdea:
            'Human-in-the-loop validation protects enterprise systems from costly transactional hallucinations.',
        },
      ],
      diagramType: 'ai-core-rag',
      analogy: {
        concept: 'SAP Business AI Architecture and Strategy',
        analogy: 'Construction Power Tools, Master Builder Consultant, and Industrial Workshop',
        explanation:
          'Think of power tools in home construction. A modern drill might come with a built-in LED flashlight and clutch torque limiter that work out of the box without setup (Embedded AI). You also have an experienced master contractor walking beside you on the job site who answers your questions, explains blueprints, and suggests next steps in plain English (Joule Copilot). Finally, you have an industrial-grade workshop in the truck with CNC routers, 3D printers, and welding rigs where your team can design completely custom fixtures for unique architectural challenges (BTP AI Foundation). You do not build a custom welding rig when turning on the drill flashlight is all you need, but when standard tools cannot solve a unique structure, the workshop gives you limitless capability.',
        transition:
          'Where the contractor uses standard tools first, SAP architects leverage embedded ERP AI and Joule before building custom AI models on BTP AI Foundation.',
      },
      conceptExplanation: {
        whatItIs:
          'SAP Business AI is the comprehensive suite of artificial intelligence capabilities across SAP software, comprising AI embedded natively in cloud ERP applications, Joule as the natural-language copilot, and the BTP AI Foundation providing runtime infrastructure and model gateways for custom enterprise extensions.',
        whyItExists:
          'Enterprises cannot safely use consumer AI tools with proprietary financial, employee, and customer data due to IP leakage, hallucination risks, and compliance regulations. SAP Business AI delivers relevant, reliable, and responsible AI grounded in core business context.',
        problemSolved:
          'Eliminates data leakage risks, guarantees zero vendor training on corporate prompts, automates routine ERP tasks, and provides sovereign developer tools for custom AI extensions.',
        howItWorks:
          'Standard tasks use pre-trained embedded models in S/4HANA. Conversational navigation uses Joule. Custom tasks use BTP AI Foundation: AI Core manages deployments, Generative AI Hub routes prompts securely under Zero Data Retention terms, and SAP HANA Cloud stores vector embeddings.',
        btpFit:
          'Acts as the AI innovation layer of SAP BTP, allowing clean core extensions to incorporate machine learning and generative LLM capabilities seamlessly.',
      },
      jargonTerms: [
        {
          term: 'Generative AI Hub',
          simpleMeaning: 'A single secure BTP doorway that lets SAP apps safely talk to top AI models like OpenAI, Anthropic, and Google.',
          familiarEquivalent: 'A multi-brand digital concierge desk that calls specialists on your behalf.',
        },
        {
          term: 'Joule Copilot',
          simpleMeaning: 'SAP\'s official AI digital assistant that understands business terms and helps users work across all SAP apps.',
          familiarEquivalent: 'An experienced executive assistant sitting beside you during work.',
        },
        {
          term: 'Context Window',
          simpleMeaning: 'The maximum amount of text (memory span) an AI model can read and think about at one time.',
          familiarEquivalent: 'The size of a student\'s desk; how many pages of notes they can lay out simultaneously during an open-book exam.',
        },
        {
          term: 'Grounding',
          simpleMeaning: 'Supplying real facts and real database numbers in the prompt so the AI does not make up false information.',
          familiarEquivalent: 'Handing a witness the signed contract before asking them to testify in court.',
        },
      ],
      technicalExample: {
        title: 'Enterprise AI Architecture Decision Matrix for S/4HANA Use Cases',
        language: 'json',
        code: `{
  "evaluationFramework": "SAP Business AI Architecture Decision Matrix",
  "version": "2026.1",
  "useCases": [
    {
      "id": "UC-01",
      "businessProcess": "Customer Payment Reconciliation",
      "requirement": "Automatically match incoming bank statement line items with open customer receivables invoices.",
      "recommendedTier": "Embedded AI",
      "sapSolution": "SAP S/4HANA Cash Application (standard embedded ML)",
      "technicalReasoning": "Pre-trained machine learning models already exist natively within S/4HANA Finance; zero custom code or BTP integration required."
    },
    {
      "id": "UC-02",
      "businessProcess": "Procurement Vendor Risk Analysis",
      "requirement": "Analyze unstructured vendor sustainability reports (PDFs) and correlate findings with internal S/4HANA purchase order spend.",
      "recommendedTier": "BTP AI Foundation (Side-by-Side Extension)",
      "sapSolution": "CAP Application + Generative AI Hub + HANA Cloud Vector Engine",
      "technicalReasoning": "Requires parsing proprietary external supplier documents, storing high-dimensional vector embeddings, and executing RAG prompts via Claude 3.5 Sonnet."
    },
    {
      "id": "UC-03",
      "businessProcess": "Warehouse Stock Inquiry",
      "requirement": "Allow forklift operators to ask 'Where is shipment SHP-90210 located?' via speech or natural language chat.",
      "recommendedTier": "Joule Copilot",
      "sapSolution": "SAP Joule with S/4HANA Extended Warehouse Management skill",
      "technicalReasoning": "Standard conversational capability natively integrated into the SAP Mobile Start and Fiori Launchpad interfaces."
    }
  ]
}`,
        purpose:
          'Illustrates the standard architectural decision tree used by SAP Solution Architects to select the optimal AI tier for business requirements.',
        lineExplanations: [
          { lines: '4-11', explanation: 'Classifies standard finance reconciliation as Embedded AI, avoiding unnecessary custom development costs.' },
          { lines: '12-19', explanation: 'Classifies custom PDF analysis and spend correlation as BTP AI Foundation, leveraging CAP and HANA Vector Engine.' },
          { lines: '20-27', explanation: 'Classifies natural language inventory lookup as Joule Copilot, utilizing standard conversational interfaces.' },
        ],
        expectedOutput:
          'A structured architectural justification document adopted by enterprise change boards before project approval.',
        commonMistakes: [
          'Attempting to build custom LLM pipelines for standard problems already solved natively by embedded S/4HANA features.',
          'Sending unmasked customer personally identifiable data (PII) to public third-party consumer AI tools.',
          'Failing to establish a human-in-the-loop review step for automated transactional actions.',
        ],
      },
      businessScenario: {
        title: 'Retail Supplier Contract Analysis Transformation',
        context:
          'Nordic Supermarkets received 15,000 supplier price increase requests per month via email and PDF attachments. Procurement managers were overwhelmed, leading to delayed invoice approvals and missed early-payment discounts of $3.5M annually.',
        workflowSteps: [
          'Supplier submits pricing revision PDF via supplier email.',
          'Side-by-side CAP application on BTP parses document and masks supplier tax ID.',
          'Generative AI Hub foundation model extracts proposed price changes by line item.',
          'Application queries S/4HANA via released OData API to compare against historic purchase volumes.',
          'Procurement officer reviews structured comparison report and approves with one click.',
        ],
        businessImpact:
          'Contract analysis time dropped from 14 days to 4 hours with 100% data privacy compliance, capturing $3.2M in annual early-payment discounts.',
      },
      quizQuestions: [
        {
          id: 'mod-7-1-q1',
          question: 'What is the primary difference between Embedded AI and the BTP AI Foundation in SAP architecture?',
          options: [
            {
              id: 'a',
              text: 'Embedded AI runs only on smartphones, while BTP runs only on mainframe tape drives.',
              isCorrect: false,
              explanation: 'Incorrect. Embedded AI runs directly within SAP cloud applications; it has nothing to do with tape drives.',
            },
            {
              id: 'b',
              text: 'Embedded AI provides pre-built ML capabilities inside standard SAP applications, while BTP AI Foundation offers developer infrastructure for custom AI extensions.',
              isCorrect: true,
              explanation: 'Correct. Embedded AI solves standard ERP tasks out-of-the-box, while BTP AI Foundation provides the runtime for custom models and RAG pipelines.',
            },
            {
              id: 'c',
              text: 'Embedded AI requires developers to write 10,000 lines of Python code for every calculation.',
              isCorrect: false,
              explanation: 'Incorrect. Embedded AI requires zero custom code; it is configured natively in application settings.',
            },
            {
              id: 'd',
              text: 'BTP AI Foundation is only for editing photos, not business data.',
              isCorrect: false,
              explanation: 'Incorrect. BTP AI Foundation is an enterprise cloud platform for enterprise business data and generative AI.',
            },
          ],
        },
        {
          id: 'mod-7-1-q2',
          question: 'What does SAP\'s "Zero Data Retention" (ZDR) guarantee ensure for enterprise customers using the Generative AI Hub?',
          options: [
            {
              id: 'a',
              text: 'Customer prompts and business data are never saved to disk or used to train third-party foundation models by vendors like OpenAI or Google.',
              isCorrect: true,
              explanation: 'Correct. Under ZDR agreements, foundation model vendors process requests in-memory and immediately discard prompts after response delivery.',
            },
            {
              id: 'b',
              text: 'The enterprise database is deleted every night at midnight.',
              isCorrect: false,
              explanation: 'Incorrect. ZDR applies strictly to the AI model gateway and prompt retention, not corporate databases.',
            },
            {
              id: 'c',
              text: 'Users are not allowed to save files to their local desktop computers.',
              isCorrect: false,
              explanation: 'Incorrect. ZDR governs model provider data handling contracts.',
            },
            {
              id: 'd',
              text: 'All AI responses are generated in zero seconds without any latency.',
              isCorrect: false,
              explanation: 'Incorrect. Zero data retention refers to data privacy and compliance, not processing latency.',
            },
          ],
        },
        {
          id: 'mod-7-1-q3',
          question: 'Why is "Human-in-the-Loop" a mandatory design pattern for high-impact enterprise AI transactions?',
          options: [
            {
              id: 'a',
              text: 'Because computers are legally prohibited from executing any math calculations.',
              isCorrect: false,
              explanation: 'Incorrect. Computers execute deterministic mathematical transactions every millisecond.',
            },
            {
              id: 'b',
              text: 'To ensure a qualified human employee reviews and approves irreversible financial or physical ERP actions before execution, mitigating AI hallucination risks.',
              isCorrect: true,
              explanation: 'Correct. High-impact operations (e.g. paying invoices, altering production schedules) require human oversight to prevent costly automated errors.',
            },
            {
              id: 'c',
              text: 'Because cloud networks disconnect if a keyboard is not touched every 30 seconds.',
              isCorrect: false,
              explanation: 'Incorrect. Cloud services run autonomously 24/7.',
            },
            {
              id: 'd',
              text: 'To force developers to manually type out every database query in production.',
              isCorrect: false,
              explanation: 'Incorrect. Human-in-the-loop applies to business approval decisions, not manual query typing.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'SAP Business AI comprises Embedded AI, Joule Copilot, and the BTP AI Foundation.',
        'Always evaluate whether standard embedded AI or Joule solves the problem before building custom BTP extensions.',
        'Zero Data Retention and data masking are essential to safeguarding enterprise proprietary data when using generative AI.',
      ],
      practicalActivity:
        'Draft an architectural evaluation comparing Embedded AI vs Joule vs BTP AI Foundation for your capstone business domain. Document the data masking and responsible AI requirements.',
    },
    {
      id: 'mod-7-2',
      code: '7.2',
      phaseId: 'phase-7',
      title: 'SAP AI Core',
      tagline: 'SAP AI Core Serving Templates, Docker Images & Deployments',
      summary:
        'Master the operational architecture of SAP AI Core and SAP AI Launchpad. Learn how to configure resource groups, register Git repositories and Docker registries, author Argo Workflows serving templates, execute batch machine learning training jobs, and manage live inference model deployments at scale.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'SAP AI Core architecture: managed Kubernetes runtime, tenant isolation, and resource groups',
        'SAP AI Launchpad: unified multi-tenant administrative interface for managing AI assets',
        'GitOps workflow: synchronizing repositories, execution templates, and workflow definitions',
        'Containerization: building OCI-compliant Docker images for training and inference serving',
        'Argo Workflows templates: defining input artifacts, parameters, resource requirements, and containers',
        'Deployments & Servings: provisioning dedicated compute (CPU/GPU) endpoints with auto-scaling',
        'Cost management: stopping idle deployments, tracking compute units, and managing quotas',
      ],
      practicalImplementation:
        'Set up an AI Core connection via SAP AI Launchpad. Register an object store secret (AWS S3 or Azure Blob) and a Docker registry secret. Author an Argo Workflows serving template YAML. Create an AI Core deployment for a containerized Scikit-learn or PyTorch inference service, inspect its health endpoints, and send a prediction payload via curl.',
      masteryCheck:
        'Author an Argo ServingTemplate YAML file for SAP AI Core specifying container image, port 9001, and resource limits. Explain the purpose of Resource Groups and GitOps repository synchronization in SAP AI Launchpad.',
      learningObjectives: [
        'Navigate and configure SAP AI Launchpad to manage AI Core infrastructure and resource groups.',
        'Connect Git repositories, object stores, and Docker registries to SAP AI Core using Kubernetes secrets.',
        'Author valid Argo Workflows execution and serving templates specifying container images and compute tiers.',
        'Deploy, scale, monitor, and decommission live inference endpoints using the SAP AI Core REST API.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Provision Resource Group in SAP AI Launchpad',
          subtitle: 'Establishing tenant isolation and quota boundaries',
          explanation:
            'Access SAP AI Launchpad. Navigate to the AI Core administration workspace. Create a dedicated Resource Group (e.g. `logistics-dev`). This defines the tenant boundary for all subsequent secrets, templates, and deployments.',
          keyIdea:
            'Resource groups prevent cross-project resource contamination and enforce fine-grained access control.',
        },
        {
          stepNumber: 2,
          title: 'Register Object Store and Docker Registry Secrets',
          subtitle: 'Securely configuring artifact storage and container credentials',
          explanation:
            'Configure credentials for cloud storage and container registries. Create a secret of type `docker-registry` providing access to your container image repository, and a secret of type `s3` providing access to the model weight artifact storage.',
          keyIdea:
            'AI Core securely injects these credentials into Kubernetes pods without exposing secrets to application code.',
        },
        {
          stepNumber: 3,
          title: 'Connect Git Repository with Serving Template',
          subtitle: 'Version-controlled GitOps pipeline synchronization',
          explanation:
            'Register your Git repository URL and personal access token in AI Core. Author an Argo serving template YAML file in the repository defining container image, port 9001, environment variables, and memory limits. Verify synchronization in AI Launchpad.',
          keyIdea:
            'GitOps ensures all serving configurations are version-controlled, reviewed, and audited.',
        },
        {
          stepNumber: 4,
          title: 'Create and Launch the Model Deployment',
          subtitle: 'Spinning up live Kubernetes pods and HTTPS inference endpoints',
          explanation:
            'In AI Launchpad or via the AI Core REST API (`POST /v2/lm/deployments`), submit a deployment request referencing the registered template and target resource group. Monitor the deployment status transition from `PENDING` to `RUNNING`.',
          keyIdea:
            'Deployments provision dedicated cloud pods and expose an authenticated inference endpoint URL.',
        },
        {
          stepNumber: 5,
          title: 'Execute Predictions and Manage Lifecycle',
          subtitle: 'Querying models securely and stopping idle compute resources',
          explanation:
            'Fetch an XSUAA bearer token. Send an HTTP POST prediction request to `<deployment-url>/v2/predict` containing JSON feature vectors. Assert the predicted response. When testing is complete, delete or stop the deployment to halt compute unit billing.',
          keyIdea:
            'Always decommission non-production deployments promptly to maintain cloud cost hygiene.',
        },
      ],
      diagramType: 'ai-core-rag',
      analogy: {
        concept: 'SAP AI Core Container Execution and Serving',
        analogy: 'Commercial Industrial Bakery with Automated Conveyors and Ovens',
        explanation:
          'Think of an industrial commercial bakery. You have a recipe book stored in a central binder (your Git repository with workflow templates). You have standardized pre-mixed ingredient containers sealed and labeled in a secure warehouse (Docker images in a container registry). The master bakery floor (SAP AI Core) has specialized ovens with precise temperature controls (Kubernetes nodes with CPUs and GPUs). When a big order comes in, the head baker (Argo Workflows) pulls the recipe, grabs the container from the warehouse, assigns it to Oven #4 (the deployment), and turns on the conveyor belt to bake 1,000 loaves an hour (inference endpoint). When the rush is over, the baker turns off the oven to stop wasting gas and electricity (stopping the deployment).',
        transition:
          'Where the industrial bakery coordinates recipes and ovens, SAP AI Core coordinates Argo templates and Kubernetes compute pods to serve ML predictions.',
      },
      conceptExplanation: {
        whatItIs:
          'SAP AI Core is a managed cloud infrastructure service on SAP BTP built on Kubernetes and Argo Workflows designed to execute machine learning training pipelines and serve real-time AI inference endpoints securely and scalably within enterprise tenancy boundaries.',
        whyItExists:
          'Managing custom AI infrastructure involves complex GPU provisioning, security patching, Docker orchestration, and audit logging. SAP AI Core abstracts these operational headaches into a standardized enterprise runtime.',
        problemSolved:
          'Automates machine learning model deployment, manages cloud GPU resources, isolates multi-tenant workloads, and connects AI inference with BTP security and identity services.',
        howItWorks:
          'Data scientists author Docker images and Argo templates in Git. AI Core synchronizes via GitOps. Deployments instantiate pods on Kubernetes listening on port 9001, authenticated via XSUAA, and scale horizontally based on request load.',
        btpFit:
          'Provides the core machine learning compute and execution engine for all custom AI and deep learning extensions across SAP BTP.',
      },
      jargonTerms: [
        {
          term: 'Resource Group',
          simpleMeaning: 'A private room inside AI Core where a specific team keeps their models and passwords separate from other teams.',
          familiarEquivalent: 'A secure partitioned department floor inside a corporate headquarters.',
        },
        {
          term: 'Argo Workflows',
          simpleMeaning: 'A smart coordinator program that reads step-by-step instructions to run containers in order.',
          familiarEquivalent: 'An automated assembly line conductor orchestrating robot arms in an automotive plant.',
        },
        {
          term: 'Inference',
          simpleMeaning: 'Asking a trained AI model to make a prediction on brand new live data.',
          familiarEquivalent: 'A certified doctor examining a new patient\'s X-ray and diagnosing the fracture.',
        },
        {
          term: 'AI Launchpad',
          simpleMeaning: 'The visual web portal on BTP where you can see all your AI models, check their status, and view logs.',
          familiarEquivalent: 'An airport control tower monitor showing all incoming and departing aircraft.',
        },
      ],
      technicalExample: {
        title: 'Argo Workflows Serving Template YAML for SAP AI Core Custom Model',
        language: 'yaml',
        code: `apiVersion: ai.sap.com/v1alpha1
kind: ServingTemplate
metadata:
  name: logistics-delay-predictor-template
  annotations:
    scenarios.ai.sap.com/name: "Logistics Optimization"
    executables.ai.sap.com/name: "delay-predictor-serving"
  labels:
    ai.sap.com/version: "1.0.0"
spec:
  inputs:
    parameters:
      - name: thresholdProbability
        default: "0.75"
        description: "Confidence threshold for flagging shipment delay"
  template:
    apiVersion: "serving.kserve.io/v1beta1"
    metadata:
      annotations: |
        autoscaling.knative.dev/minScale: "1"
        autoscaling.knative.dev/maxScale: "3"
    spec:
      predictor:
        minReplicas: 1
        maxReplicas: 3
        containers:
          - name: kserve-container
            image: "docker.io/transglobal/delay-predictor:v1.0"
            ports:
              - containerPort: 9001
                protocol: TCP
            resources:
              requests:
                cpu: "500m"
                memory: "1Gi"
              limits:
                cpu: "1000m"
                memory: "2Gi"
            env:
              - name: THRESHOLD
                value: "{{inputs.parameters.thresholdProbability}}"`,
        purpose:
          'Defines a Kubernetes KServe-based serving template for SAP AI Core specifying container image, autoscaling boundaries, and memory limits.',
        lineExplanations: [
          { lines: '1-3', explanation: 'Declares the custom Kubernetes API version and ServingTemplate resource kind.' },
          { lines: '4-10', explanation: 'Configures scenario and executable metadata visible within SAP AI Launchpad.' },
          { lines: '11-15', explanation: 'Declares input parameters passed into the container at deployment initialization.' },
          { lines: '24-34', explanation: 'Specifies Docker image, internal TCP port 9001, and CPU/memory resource allocations.' },
        ],
        expectedOutput:
          'When synchronized in AI Core, this template appears as an executable option in AI Launchpad for instant deployment.',
        commonMistakes: [
          'Using a container port other than 9001; SAP AI Core expects inference containers to listen strictly on port 9001.',
          'Failing to specify image pull secrets when using private Docker registries, causing ImagePullBackOff crashes.',
          'Leaving minReplicas > 0 in trial or development environments, incurring continuous compute capacity unit charges.',
        ],
      },
      businessScenario: {
        title: 'Aviation Turbine Predictive Maintenance Deployment',
        context:
          'AeroJet Global experienced unplanned aircraft groundings costing $120,000 per hour due to unexpected jet turbine bearing failures that standard scheduled maintenance checks failed to predict.',
        workflowSteps: [
          'Data science team trains PyTorch predictive maintenance model using historic sensor telemetry.',
          'Model packaged into an OCI container and pushed to private container registry.',
          'Cloud engineer registers GitOps serving template in SAP AI Core.',
          'AI Core launches deployment pod on GPU compute tier listening on port 9001.',
          'In-flight telemetry streams to prediction endpoint; early bearing degradation detected 50 flight hours in advance.',
        ],
        businessImpact:
          'Unplanned aircraft groundings dropped by 64%, saving $14M in fleet delay penalties and maintenance overtime.',
      },
      quizQuestions: [
        {
          id: 'mod-7-2-q1',
          question: 'What is the standard internal container port that inference microservices must listen on in SAP AI Core?',
          options: [
            {
              id: 'a',
              text: 'Port 80',
              isCorrect: false,
              explanation: 'Incorrect. Port 80 is standard HTTP, but AI Core expects inference containers on 9001.',
            },
            {
              id: 'b',
              text: 'Port 9001',
              isCorrect: true,
              explanation: 'Correct. SAP AI Core and KServe proxy routing conventions strictly mandate port 9001 for inference containers.',
            },
            {
              id: 'c',
              text: 'Port 3306',
              isCorrect: false,
              explanation: 'Incorrect. Port 3306 is the standard default port for MySQL databases.',
            },
            {
              id: 'd',
              text: 'Port 443',
              isCorrect: false,
              explanation: 'Incorrect. External requests use 443, but internal container endpoints must listen on 9001.',
            },
          ],
        },
        {
          id: 'mod-7-2-q2',
          question: 'What workflow engine powers batch training and serving execution templates in SAP AI Core?',
          options: [
            {
              id: 'a',
              text: 'Argo Workflows',
              isCorrect: true,
              explanation: 'Correct. SAP AI Core leverages Argo Workflows to orchestrate container-native pipelines on Kubernetes.',
            },
            {
              id: 'b',
              text: 'Windows Task Scheduler',
              isCorrect: false,
              explanation: 'Incorrect. SAP AI Core runs on Linux Kubernetes clusters, not Windows desktop operating systems.',
            },
            {
              id: 'c',
              text: 'Adobe Flash Player',
              isCorrect: false,
              explanation: 'Incorrect. Adobe Flash is a deprecated multimedia plugin, not a cloud workflow engine.',
            },
            {
              id: 'd',
              text: 'Apache Ant',
              isCorrect: false,
              explanation: 'Incorrect. Apache Ant is an older Java build tool.',
            },
          ],
        },
        {
          id: 'mod-7-2-q3',
          question: 'Why is it critical to stop or delete unused deployments in SAP AI Core development environments?',
          options: [
            {
              id: 'a',
              text: 'Because running deployments continuously consume compute capacity units (CUs) and generate cloud billing charges.',
              isCorrect: true,
              explanation: 'Correct. Active deployments maintain allocated CPU/GPU memory and pods, accumulating ongoing cloud costs.',
            },
            {
              id: 'b',
              text: 'Because containers delete all source code if left running for more than 2 hours.',
              isCorrect: false,
              explanation: 'Incorrect. Source code is preserved in Git repositories; containers do not delete source repositories.',
            },
            {
              id: 'c',
              text: 'Because the internet stops functioning when an AI deployment is active.',
              isCorrect: false,
              explanation: 'Incorrect. Deployments have no adverse impact on internet infrastructure.',
            },
            {
              id: 'd',
              text: 'Because SAP AI Core can only run one container per calendar year.',
              isCorrect: false,
              explanation: 'Incorrect. AI Core runs dozens of concurrent deployments across multiple resource groups.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'SAP AI Core provides a managed Kubernetes and Argo Workflows runtime for enterprise AI workloads.',
        'Inference containers must listen on port 9001 and be described by declarative ServingTemplates.',
        'Decommissioning idle deployments is essential to maintaining sound cloud financial governance and avoiding waste.',
      ],
      practicalActivity:
        'Log into SAP AI Launchpad. Inspect existing Resource Groups and Configurations. Create a test configuration using a mock serving executable. Inspect the YAML descriptor.',
    },
    {
      id: 'mod-7-3',
      code: '7.3',
      phaseId: 'phase-7',
      title: 'Generative AI Hub',
      tagline: 'Multi-Model Gateway, Prompt Engineering & Safety Filtering',
      summary:
        'Master the Generative AI Hub on SAP BTP. Seamlessly access top commercial foundation models (OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini 1.5, Meta Llama 3) via a single unified API and the official @sap-ai-sdk/foundation-models library. Implement robust prompt engineering, enforce structured JSON schema outputs, and configure enterprise safety filters.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'Generative AI Hub architecture: unified API gateway, foundation model access, and zero data retention',
        'Available model catalog: OpenAI (GPT-4o, GPT-4o-mini), Anthropic (Claude 3.5 Sonnet), Google (Gemini 1.5 Pro), Meta (Llama 3)',
        'The SAP Cloud SDK for AI: @sap-ai-sdk/foundation-models, authentication, and client abstractions',
        'Prompt engineering for enterprise ERP: system instructions, few-shot examples, and context injection',
        'Enforcing structured outputs: JSON schema mode, deterministic formatting, and validation',
        'Responsible AI filters: content safety checks, toxicity detection, data masking, and PII anonymization',
        'Cost and performance optimization: token tracking, model selection trade-offs, and caching strategies',
      ],
      practicalImplementation:
        'Use the Prompt Editor in SAP AI Launchpad to test prompts interactively across 3 foundation models. Install `@sap-ai-sdk/foundation-models` in a CAP service. Implement a custom CAP action `summarizePurchaseOrder` that sends transactional data to an LLM, enforces strict JSON schema validation on the response, and handles token quota errors gracefully.',
      masteryCheck:
        'Write a CAP service handler that calls the Generative AI Hub using @sap-ai-sdk/foundation-models. Enforce structured JSON schema output, handle potential API errors, and explain how safety filters mitigate enterprise content risks.',
      learningObjectives: [
        'Connect to the Generative AI Hub using BTP service bindings and the official @sap-ai-sdk/foundation-models.',
        'Craft robust, reproducible prompts tailored for enterprise ERP data summarization and classification.',
        'Enforce structured, machine-parsable JSON outputs from LLMs conforming to strict JSON Schema specifications.',
        'Configure and test enterprise safety filters, data masking, and content moderation in SAP AI Launchpad.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Explore and Compare Models in SAP AI Launchpad Prompt Editor',
          subtitle: 'Comparing output quality, response latency, and token consumption',
          explanation:
            'Open SAP AI Launchpad and navigate to the Generative AI Hub Prompt Editor. Select GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro. Enter an enterprise prompt (e.g. summarizing a multi-item purchase requisition). Compare the output quality, latency, and token consumption across all three models.',
          keyIdea:
            'Visual prompt testing identifies the optimal balance between accuracy, response speed, and cost.',
        },
        {
          stepNumber: 2,
          title: 'Install the SAP Cloud SDK for AI in your CAP Project',
          subtitle: 'Adding official typed SDK abstractions and authentication handlers',
          explanation:
            'In your CAP project terminal, install the official package: `npm install @sap-ai-sdk/foundation-models @sap-ai-sdk/ai-api`. Add the `aicore` service binding to your `default-env.json` for local development or bind it via `mta.yaml` for cloud deployment.',
          keyIdea:
            'The SDK automatically handles XSUAA OAuth token exchanges, destination lookups, and retry logic.',
        },
        {
          stepNumber: 3,
          title: 'Craft System Instructions and Inject Enterprise Context',
          subtitle: 'Setting strict behavioral boundaries, personas, and constraints',
          explanation:
            'Define clear system instructions establishing the AI\'s persona, constraints, and business domain rules. For example: "You are an SAP Enterprise Procurement Auditor. Analyze the supplied purchase order and flag any compliance anomalies. Respond strictly in valid JSON."',
          keyIdea:
            'Strong system prompts anchor model behavior and significantly reduce off-topic or conversational drift.',
        },
        {
          stepNumber: 4,
          title: 'Enforce Strict JSON Schema Response Formatting',
          subtitle: 'Guaranteeing deterministic, machine-parsable responses',
          explanation:
            'Pass a JSON Schema or use OpenAI response_format `{ type: "json_object" }` in your SDK request. In your CAP handler, parse the returned string with `JSON.parse()`. Wrap parsing in a try/catch block with fallback logic to handle schema validation edge cases.',
          keyIdea:
            'Enterprise microservices require deterministic structured JSON, not conversational prose.',
        },
        {
          stepNumber: 5,
          title: 'Enable Content Safety Filters and Token Tracking',
          subtitle: 'Configuring safety thresholds and monitoring cloud consumption',
          explanation:
            'In AI Launchpad, configure content filtering thresholds (Low, Medium, High) for Hate, Self-Harm, Sexual, and Violence categories. In your application code, log prompt tokens, completion tokens, and estimated cost per transaction for continuous financial governance.',
          keyIdea:
            'Automated safety filters protect brand reputation while token tracking enforces departmental budgets.',
        },
      ],
      diagramType: 'genai-hub',
      analogy: {
        concept: 'Generative AI Hub Unified Model Gateway',
        analogy: 'International Luxury Hotel Multi-Lingual Concierge Desk',
        explanation:
          'Think of a five-star international luxury hotel concierge desk. As a guest, you do not need to speak French to call a Parisian bakery, or Japanese to reserve a table in Tokyo, or Italian to hire a private boat in Venice. You simply walk up to the hotel concierge (the Generative AI Hub) and state your request in your language. The concierge translates your request, contacts the right specialist around the world, handles all currency conversions, verifies that the vendor is thoroughly vetted and safe, and returns to you with the exact confirmation ticket you requested. If you change your mind and want a different restaurant, you speak to the same concierge, not a new agency.',
        transition:
          'In SAP BTP, the Generative AI Hub acts as that universal concierge for foundation models, letting apps switch between GPT-4o, Claude, and Gemini with one unified API.',
      },
      conceptExplanation: {
        whatItIs:
          'The Generative AI Hub is a managed capability of SAP AI Core on SAP BTP providing a unified multi-model API gateway, centralized credential governance, prompt management, and built-in enterprise safety filtering across leading foundation models.',
        whyItExists:
          'Enterprises cannot allow software teams to disperse corporate credit cards to register ad-hoc accounts with multiple consumer AI vendors. The Generative AI Hub centralizes procurement, billing, security compliance, prompt evaluation, and audit logging into a single sovereign SAP cloud service.',
        problemSolved:
          'Prevents vendor lock-in, eliminates prompt data retention risks, guarantees corporate billing governance, and filters toxic or non-compliant content.',
        howItWorks:
          'CAP services use @sap-ai-sdk/foundation-models. The SDK resolves BTP credentials and calls the GenAI Hub gateway. The Hub applies moderation filters, forwards prompts to model providers under Zero Data Retention terms, and returns validated responses.',
        btpFit:
          'Serves as the central generative AI gateway on SAP BTP, natively accessible to CAP applications and SAP Build tools.',
      },
      jargonTerms: [
        {
          term: 'Generative AI Hub',
          simpleMeaning: 'SAP\'s central gateway on BTP that lets your code talk safely to OpenAI, Anthropic, Google, and Meta models.',
          familiarEquivalent: 'A universal power adapter allowing any appliance to plug into any international electrical outlet safely.',
        },
        {
          term: 'Prompt Engineering',
          simpleMeaning: 'Carefully wording your instructions and examples so the AI gives you the exact answer and format you need.',
          familiarEquivalent: 'Writing an unambiguous, crystal-clear legal contract for a contractor.',
        },
        {
          term: 'Structured Output (JSON Mode)',
          simpleMeaning: 'Forcing the AI to reply only in strict computer code (JSON) without polite chit-chat.',
          familiarEquivalent: 'A bank teller demanding you fill in the deposit slip rather than chatting about the weather.',
        },
        {
          term: 'Safety Filters',
          simpleMeaning: 'Digital guardrails that scan questions and answers to block toxic, offensive, or illegal text.',
          familiarEquivalent: 'An automated security scanner at airport baggage control that detects hazardous materials.',
        },
      ],
      technicalExample: {
        title: 'Calling Generative AI Hub with @sap-ai-sdk/foundation-models in a CAP Service',
        language: 'typescript',
        code: `import cds from '@sap/cds';
// Official SAP AI SDK for Foundation Models
import { AzureOpenAiChatClient } from '@sap-ai-sdk/foundation-models';

export default class ProcurementService extends cds.ApplicationService {
  async init() {
    const { PurchaseOrders } = this.entities;

    // Custom CAP action to generate an AI executive summary of an order
    this.on('summarizeOrder', async (req) => {
      const { orderId } = req.data;

      // 1. Fetch live order data from database
      const order = await SELECT.one.from(PurchaseOrders)
        .where({ ID: orderId })
        .columns('ID', 'supplierName', 'totalAmount', 'currency', 'items');

      if (!order) {
        return req.reject(404, \`Purchase Order \${orderId} was not found.\`);
      }

      // 2. Initialize the Generative AI Hub client for GPT-4o
      const client = new AzureOpenAiChatClient('gpt-4o');

      // 3. Construct prompt with system instructions and JSON response constraints
      const systemMessage = \`You are an SAP Procurement Auditor. Analyze the order data and return a JSON object with:
- "riskScore": integer from 1 (lowest) to 5 (highest)
- "summary": concise 2-sentence executive summary
- "recommendedAction": "APPROVE" | "REVIEW" | "REJECT"
Output strictly valid JSON. Do not include markdown code fences or conversational text.\`;

      const userMessage = \`Order Data:
Supplier: \${order.supplierName}
Total Amount: \${order.totalAmount} \${order.currency}
Item Count: \${order.items?.length || 1}\`;

      try {
        // 4. Send request to Generative AI Hub
        const response = await client.run({
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userMessage }
          ],
          response_format: { type: 'json_object' }
        });

        // 5. Parse and return structured JSON result
        const rawContent = response.getContent() || '{}';
        const parsedAnalysis = JSON.parse(rawContent);

        return {
          orderId: order.ID,
          analysis: parsedAnalysis,
          tokensUsed: response.getUsage()?.total_tokens || 0
        };
      } catch (err: any) {
        req.error(500, \`Generative AI Hub call failed: \${err.message}\`);
      }
    });

    await super.init();
  }
}`,
        purpose:
          'Demonstrates how to integrate the Generative AI Hub into a CAP service handler using the official SAP SDK, enforcing JSON outputs.',
        lineExplanations: [
          { lines: '3', explanation: 'Imports the official AzureOpenAiChatClient provided by @sap-ai-sdk/foundation-models.' },
          { lines: '11-18', explanation: 'Queries the target purchase order from the CAP database, rejecting missing entities with 404.' },
          { lines: '21', explanation: 'Instantiates the typed client bound to the gpt-4o deployment in AI Core.' },
          { lines: '24-30', explanation: 'Defines strict system instructions mandating specific JSON fields and prohibiting conversational prose.' },
          { lines: '40-47', explanation: 'Dispatches the API request to Generative AI Hub with response_format: { type: "json_object" }.' },
          { lines: '50-57', explanation: 'Parses the verified JSON output and returns the analysis along with token telemetry.' },
        ],
        expectedOutput:
          'Returns a clean JSON response containing riskScore: 2, summary string, recommendedAction: "APPROVE", and token usage count.',
        commonMistakes: [
          'Missing the aicore service binding in default-env.json, causing authentication errors when instantiating the client.',
          'Parsing raw content without try/catch blocks; if an LLM returns invalid JSON due to token truncation, unhandled crashes occur.',
          'Neglecting token usage tracking; unbounded enterprise prompt loops can exhaust monthly token quotas unexpectedly.',
        ],
      },
      businessScenario: {
        title: 'Energy Infrastructure Multi-Lingual Invoice Automation',
        context:
          'NorthSea Energy managed 85,000 procurement invoices per year across 40 worldwide drilling platforms. Invoices arrived in multiple languages with non-standard line-item descriptions, requiring 25 full-time procurement clerks to review and reconcile items manually.',
        workflowSteps: [
          'Invoice received in Norwegian or Arabic attached to vendor email.',
          'CAP action extracts line items and normalizes numbers.',
          'Generative AI Hub translates, classifies GL accounts, and checks against contract terms.',
          'Model returns structured JSON risk evaluation to CAP backend.',
          'Low-risk invoices auto-approved; high-risk flagged for human review in Fiori Horizon dashboard.',
        ],
        businessImpact:
          '72% of invoices reconciled automatically in seconds, cutting invoice cycle times from 11 days to under 4 hours.',
      },
      quizQuestions: [
        {
          id: 'mod-7-3-q1',
          question: 'What is the primary benefit of using the @sap-ai-sdk/foundation-models library over direct HTTP fetch calls to model vendors?',
          options: [
            {
              id: 'a',
              text: 'It connects directly to personal consumer credit cards to buy retail gift cards.',
              isCorrect: false,
              explanation: 'Incorrect. The SDK connects to enterprise BTP AI Core instances, not personal credit cards.',
            },
            {
              id: 'b',
              text: 'It automatically handles BTP XSUAA authentication, destination resolution, unified multi-model APIs, and token telemetry.',
              isCorrect: true,
              explanation: 'Correct. The official SAP AI SDK encapsulates all enterprise BTP connectivity, authentication, and model abstractions.',
            },
            {
              id: 'c',
              text: 'It translates all programming languages into Cobol.',
              isCorrect: false,
              explanation: 'Incorrect. The SDK is a TypeScript/JavaScript library for modern Node.js and CAP runtimes.',
            },
            {
              id: 'd',
              text: 'It makes all AI queries completely free of charge regardless of volume.',
              isCorrect: false,
              explanation: 'Incorrect. Token usage is tracked and billed against your BTP enterprise quota.',
            },
          ],
        },
        {
          id: 'mod-7-3-q2',
          question: 'Why should enterprise applications require foundation models to respond in structured JSON format (e.g. response_format: { type: "json_object" })?',
          options: [
            {
              id: 'a',
              text: 'Because automated software systems and CAP services require deterministic, machine-parsable fields rather than unpredictable conversational text.',
              isCorrect: true,
              explanation: 'Correct. Enterprise business logic cannot parse arbitrary natural language prose reliably; it requires structured JSON data.',
            },
            {
              id: 'b',
              text: 'Because JSON format uses 0 bytes of memory on disk.',
              isCorrect: false,
              explanation: 'Incorrect. JSON text consumes standard memory and disk space.',
            },
            {
              id: 'c',
              text: 'Because SAP S/4HANA only accepts Morse code.',
              isCorrect: false,
              explanation: 'Incorrect. S/4HANA uses standard OData and REST APIs with JSON payloads.',
            },
            {
              id: 'd',
              text: 'Because foundation models refuse to answer questions unless formatted in JSON.',
              isCorrect: false,
              explanation: 'Incorrect. Foundation models default to natural conversational text unless instructed otherwise.',
            },
          ],
        },
        {
          id: 'mod-7-3-q3',
          question: 'What role do safety filters play within the Generative AI Hub on SAP BTP?',
          options: [
            {
              id: 'a',
              text: 'They reboot the physical data center if room temperature exceeds 80 degrees Celsius.',
              isCorrect: false,
              explanation: 'Incorrect. Safety filters evaluate prompt content, not physical server temperatures.',
            },
            {
              id: 'b',
              text: 'They scan prompts and completions to detect and block hate speech, toxicity, violence, and sensitive personal information (PII).',
              isCorrect: true,
              explanation: 'Correct. Content safety filters evaluate textual inputs and outputs to ensure enterprise compliance and prevent harmful generation.',
            },
            {
              id: 'c',
              text: 'They prevent developers from saving files without running git commit.',
              isCorrect: false,
              explanation: 'Incorrect. Version control rules are managed by Git, not AI safety filters.',
            },
            {
              id: 'd',
              text: 'They delete all emails sent to customer support.',
              isCorrect: false,
              explanation: 'Incorrect. Safety filters protect generative AI interactions within application boundaries.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'The Generative AI Hub provides a single unified gateway to leading commercial foundation models under Zero Data Retention terms.',
        '@sap-ai-sdk/foundation-models streamlines authentication, prompt execution, and model swapping in Node.js and CAP.',
        'Always enforce structured JSON outputs and implement error-handling wrappers when integrating LLMs into transactional workflows.',
      ],
      practicalActivity:
        'Install @sap-ai-sdk/foundation-models in a test script. Instantiate AzureOpenAiChatClient, execute a completion prompt with response_format json_object, and inspect the parsed JSON result.',
    },
    {
      id: 'mod-7-4',
      code: '7.4',
      phaseId: 'phase-7',
      title: 'HANA Vector Engine and RAG',
      tagline: 'REAL_VECTOR Search, Grounded RAG, and HANA Vector Engine',
      summary:
        'Master Retrieval-Augmented Generation (RAG) using SAP HANA Cloud Vector Engine. Learn how vector embeddings work, store high-dimensional embeddings in REAL_VECTOR columns, execute high-speed cosine similarity search queries ($COSINE_SIMILARITY), ground LLM prompts in verified enterprise facts, and implement role-based access control on vector chunks.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'Retrieval-Augmented Generation (RAG) architecture: solving hallucination and knowledge cutoff limitations',
        'Vector embeddings: transforming text into mathematical high-dimensional vectors (e.g. text-embedding-ada-002, text-embedding-3-small)',
        'SAP HANA Cloud Vector Engine: the REAL_VECTOR data type, vector dimensions, and indexing',
        'Vector similarity search: COSINE_SIMILARITY, L2DISTANCE, and top-k retrieval in SQL and CDS',
        'Document chunking strategies: fixed size, sliding window, semantic chunking, and metadata tagging',
        'CAP integration: querying vector tables, enriching prompts with retrieved chunks, and generating cited answers',
        'Enterprise security in RAG: role-based access filtering ensuring users only retrieve authorized document chunks',
      ],
      practicalImplementation:
        'Create a CDS entity DocumentChunks with a REAL_VECTOR column in SAP HANA Cloud. Ingest 25 enterprise policy documents, chunk them with metadata, and generate vector embeddings via Generative AI Hub. Add a CAP custom action `askKnowledgeBase(question)` that generates an embedding for the question, executes a COSINE_SIMILARITY search in HANA Cloud, enriches a prompt with top-3 chunks, and returns an answer with source citations.',
      masteryCheck:
        'Model a CDS entity containing a Vector(1536) column. Explain how to execute a cosine similarity search in SAP HANA Cloud, how to filter by user security roles, and how to construct a grounded RAG prompt that cites source documents.',
      learningObjectives: [
        'Explain the architectural principles and enterprise necessity of Retrieval-Augmented Generation (RAG).',
        'Model CDS entities with REAL_VECTOR columns and store embeddings in SAP HANA Cloud.',
        'Execute vector similarity SQL queries using COSINE_SIMILARITY to retrieve contextually relevant document chunks.',
        'Enforce security filtering in vector queries so users only retrieve chunks they are authorized to access.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Model Document Chunk Entity with REAL_VECTOR in CDS',
          subtitle: 'Defining native vector storage alongside enterprise metadata',
          explanation:
            'Define a CDS entity in `db/schema.cds`: `entity DocumentChunks { key ID: UUID; text: LargeString; category: String(50); accessRole: String(50); embedding: Vector(1536); }`. Note that CDS compiles `Vector(1536)` directly into HANA Cloud\'s native `REAL_VECTOR(1536)`.',
          keyIdea:
            'Native vector support in CDS allows seamless relational and vector modeling in a single schema.',
        },
        {
          stepNumber: 2,
          title: 'Chunk Documents and Ingest Embeddings',
          subtitle: 'Slicing text and generating mathematical semantic representations',
          explanation:
            'Implement an ingestion script. Read source markdown or PDF files, chunk text into ~400-word segments with 50-word overlap, call the embedding model in Generative AI Hub (`text-embedding-3-small`), and insert the resulting vector arrays into the HANA database.',
          keyIdea:
            'Overlapping chunks prevent critical sentences from being split in half at chunk boundaries.',
        },
        {
          stepNumber: 3,
          title: 'Execute In-Memory Cosine Similarity Search in HANA',
          subtitle: 'High-speed SIMD mathematical ranking directly in RAM',
          explanation:
            'When a query arrives, generate its vector embedding. In your CAP handler, execute a raw or CDS query using HANA\'s built-in vector function: `SELECT TOP 3 text, COSINE_SIMILARITY(embedding, TO_REAL_VECTOR(?)) AS score FROM DocumentChunks ORDER BY score DESC`.',
          keyIdea:
            'HANA Cloud calculates vector similarity directly in RAM with hardware-accelerated vector instructions.',
        },
        {
          stepNumber: 4,
          title: 'Enforce Role-Based Access Control Filtering',
          subtitle: 'Combining vector math with relational authorization gates',
          explanation:
            'Add security restrictions directly to the SQL query: `WHERE accessRole IN (:userRoles)`. This guarantees that unauthorized document chunks are mathematically excluded from the similarity ranking before reaching the LLM prompt.',
          keyIdea:
            'Pre-retrieval security filtering prevents data leakage across organizational hierarchies.',
        },
        {
          stepNumber: 5,
          title: 'Assemble Grounded Prompt and Generate Cited Response',
          subtitle: 'Injecting verified context and requiring strict source attribution',
          explanation:
            'Inject the retrieved text chunks into the system prompt: "Context:\\n" + chunks.map(c => c.text).join("\\n\\n") + "\\nAnswer the question using strictly this context. Cite sources." Send to Generative AI Hub and return the verified answer to the client.',
          keyIdea:
            'Strict prompt constraints eliminate hallucinations and provide verifiable audit trails.',
        },
      ],
      diagramType: 'ai-core-rag',
      analogy: {
        concept: 'Retrieval-Augmented Generation (RAG) and Vector Databases',
        analogy: 'Legal Trial Defense: Corporate Archive Librarian and Junior Associate',
        explanation:
          'Imagine you are an attorney preparing for a high-stakes corporate trial. You have a brilliant junior legal researcher (the LLM) who graduated top of their class and understands all legal principles and rhetoric. However, the researcher has never seen your client\'s private internal company contracts, board meeting minutes, and financial spreadsheets. If you ask them to guess what happened, they might invent a plausible-sounding story that is completely fictitious (a hallucination). Instead, your firm maintains an indexed filing archive where every document is tagged with subject keywords and index numbers (the Vector Database). When you ask a question, the head librarian pulls the exact 3 relevant contract pages from the filing cabinet (retrieval) and places them on the junior researcher\'s desk with a note: "Answer the attorney\'s question using strictly these 3 pages, and cite the page numbers" (grounded generation).',
        transition:
          'Where the librarian pulls relevant physical pages, SAP HANA Cloud Vector Engine retrieves relevant text chunks via cosine similarity to ground the LLM prompt in factual data.',
      },
      conceptExplanation: {
        whatItIs:
          'Retrieval-Augmented Generation (RAG) is an enterprise architectural pattern that combines information retrieval from a vector database (such as the SAP HANA Cloud Vector Engine) with foundation language models to ground generated responses in accurate, up-to-date, and access-controlled enterprise knowledge.',
        whyItExists:
          'Public LLMs hallucinate false facts, have fixed knowledge cutoff dates, and have zero knowledge of private corporate documents. Fine-tuning models is expensive, slow, and bakes static data into neural network weights. RAG solves these challenges dynamically, securely, and cost-effectively.',
        problemSolved:
          'Eliminates AI hallucinations, dynamically updates knowledge without model retraining, grounds responses in verified corporate documents, and enforces role-based security.',
        howItWorks:
          'Documents are chunked and converted into vector embeddings stored in REAL_VECTOR columns in HANA Cloud. User questions are embedded, compared using COSINE_SIMILARITY with relational security filters, and the top matching chunks are injected into the prompt.',
        btpFit:
          'Native feature of SAP HANA Cloud on BTP, providing in-memory vector calculations side-by-side with standard ERP relational tables.',
      },
      jargonTerms: [
        {
          term: 'Vector Embedding',
          simpleMeaning: 'A long list of numbers (coordinates) that represents the deep meaning of a sentence in mathematical space.',
          familiarEquivalent: 'GPS coordinates that place words with similar meanings close together on a map.',
        },
        {
          term: 'REAL_VECTOR',
          simpleMeaning: 'A special high-speed column in SAP HANA Cloud made specifically to store lists of numbers for AI search.',
          familiarEquivalent: 'A specialized filing tray engineered to hold coordinate cards in computer memory.',
        },
        {
          term: 'Cosine Similarity',
          simpleMeaning: 'A math formula that measures how closely two sentences match in meaning on a scale from 0 to 1.',
          familiarEquivalent: 'A compass measuring the angle between two pointing needles to see if they point in the same direction.',
        },
        {
          term: 'Retrieval-Augmented Generation (RAG)',
          simpleMeaning: 'Searching your company documents for real facts first, and pasting those facts into the AI\'s prompt before asking it to write.',
          familiarEquivalent: 'An open-book exam where the student must point to the exact paragraph in the textbook.',
        },
      ],
      technicalExample: {
        title: 'Full CAP Service Implementation of Grounded RAG with SAP HANA Cloud Vector Engine',
        language: 'typescript',
        code: `import cds from '@sap/cds';
import { AzureOpenAiChatClient, AzureOpenAiEmbeddingClient } from '@sap-ai-sdk/foundation-models';

export default class KnowledgeService extends cds.ApplicationService {
  async init() {
    const { DocumentChunks } = this.entities;

    // Custom CAP action to execute grounded RAG query
    this.on('askAssistant', async (req) => {
      const { queryText } = req.data;
      const userRoles = req.user.roles || [];

      if (!queryText || queryText.trim().length === 0) {
        return req.reject(400, 'Search query text cannot be empty.');
      }

      try {
        // 1. Generate 1536-dimension vector embedding for the incoming user query
        const embeddingClient = new AzureOpenAiEmbeddingClient('text-embedding-3-small');
        const embeddingResponse = await embeddingClient.run({ input: queryText });
        const queryVector = embeddingResponse.getEmbedding(); // Array of 1536 floats

        // 2. Query SAP HANA Cloud Vector Engine using native COSINE_SIMILARITY
        // Enforce RBAC security filter so users only search accessible chunks
        const vectorString = '[' + queryVector.join(',') + ']';
        const topChunks = await cds.run(\`
          SELECT TOP 3 
            ID, 
            title, 
            content, 
            sourceDocument,
            COSINE_SIMILARITY(embedding, TO_REAL_VECTOR(?)) AS similarityScore
          FROM \${DocumentChunks}
          WHERE accessRole IN ('PUBLIC', ?)
            AND COSINE_SIMILARITY(embedding, TO_REAL_VECTOR(?)) > 0.65
          ORDER BY similarityScore DESC
        \`, [vectorString, userRoles[0] || 'PUBLIC', vectorString]);

        if (!topChunks || topChunks.length === 0) {
          return {
            answer: 'No relevant internal enterprise documentation was found to answer your inquiry.',
            sources: []
          };
        }

        // 3. Construct grounded prompt with retrieved context
        const contextText = topChunks.map((c: any, i: number) => 
          \`[Source \${i + 1}: \${c.sourceDocument} - \${c.title}]\\n\${c.content}\`
        ).join('\\n\\n');

        const systemPrompt = \`You are an SAP Enterprise Knowledge Assistant. 
Answer the user's question STRICTLY using the verified context provided below.
If the context does not contain enough information to answer truthfully, state that the information is unavailable.
Cite the relevant source documents in brackets when stating facts.

Context:
\${contextText}\`;

        // 4. Send grounded prompt to Generative AI Hub
        const chatClient = new AzureOpenAiChatClient('gpt-4o');
        const chatResponse = await chatClient.run({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: queryText }
          ]
        });

        // 5. Return grounded answer with citations
        return {
          answer: chatResponse.getContent(),
          sources: topChunks.map((c: any) => ({
            document: c.sourceDocument,
            title: c.title,
            confidence: Math.round(c.similarityScore * 100) / 100
          }))
        };
      } catch (err: any) {
        req.error(500, \`RAG Assistant execution failed: \${err.message}\`);
      }
    });

    await super.init();
  }
}`,
        purpose:
          'Implements end-to-end RAG inside a CAP service, executing vector similarity search in HANA Cloud and generating cited answers via GenAI Hub.',
        lineExplanations: [
          { lines: '2', explanation: 'Imports official SAP AI SDK embedding and chat clients.' },
          { lines: '18-21', explanation: 'Converts user query string into a 1536-dimension vector embedding via text-embedding-3-small.' },
          { lines: '24-38', explanation: 'Executes raw HANA SQL calculating COSINE_SIMILARITY with relational WHERE role filtering.' },
          { lines: '48-59', explanation: 'Constructs system prompt anchoring the model to the retrieved text passages and demanding citations.' },
          { lines: '62-79', explanation: 'Dispatches to GPT-4o and returns the grounded answer alongside verifiable document citations.' },
        ],
        expectedOutput:
          'A structured JSON response with grounded text explaining the enterprise policy, citing [Source 1: HR_Handbook_2026.pdf], with 89% confidence.',
        commonMistakes: [
          'Passing raw vector arrays without converting to TO_REAL_VECTOR() in SQL, causing HANA type mismatch errors.',
          'Omitting similarity score thresholds (e.g. > 0.65), causing irrelevant chunks to be injected when queries are off-topic.',
          'Forgetting role-based access filters in the SQL WHERE clause, allowing unprivileged users to discover confidential vector chunks.',
        ],
      },
      businessScenario: {
        title: 'Aerospace Regulatory Manual Lookup Acceleration',
        context:
          'AeroEngines International technicians took an average of 4.5 hours per incident searching through 120,000 pages of FAA regulatory directives and aircraft engine maintenance manuals, causing costly flight departure delays.',
        workflowSteps: [
          'Technician asks natural-language repair clearance question in mobile app.',
          'CAP microservice creates query embedding and queries HANA Vector Engine.',
          'HANA Cloud executes in-memory vector search with > 0.65 similarity filter.',
          'Generative AI Hub synthesizes precise manual section with citations.',
          'Technician completes certified repair in 20 minutes with zero manual searching.',
        ],
        businessImpact:
          'Manual lookup time plummeted from 4.5 hours to 30 seconds with 100% citation compliance, saving $8M in aircraft delay penalties.',
      },
      quizQuestions: [
        {
          id: 'mod-7-4-q1',
          question: 'What is the primary technical purpose of the REAL_VECTOR data type in SAP HANA Cloud?',
          options: [
            {
              id: 'a',
              text: 'To store raster graphics and JPG photo images on disk.',
              isCorrect: false,
              explanation: 'Incorrect. REAL_VECTOR stores mathematical numeric arrays for vector search, not image files.',
            },
            {
              id: 'b',
              text: 'To store and index high-dimensional numeric arrays in memory for ultra-fast semantic similarity searches.',
              isCorrect: true,
              explanation: 'Correct. REAL_VECTOR enables high-performance in-memory vector similarity searches directly inside SAP HANA Cloud.',
            },
            {
              id: 'c',
              text: 'To calculate employee payroll taxes automatically.',
              isCorrect: false,
              explanation: 'Incorrect. Payroll taxes use standard arithmetic and payroll logic, not vector engines.',
            },
            {
              id: 'd',
              text: 'To replace all relational foreign keys in SAP ERP.',
              isCorrect: false,
              explanation: 'Incorrect. Vectors complement relational tables; they do not replace relational integrity.',
            },
          ],
        },
        {
          id: 'mod-7-4-q2',
          question: 'How does Retrieval-Augmented Generation (RAG) eliminate foundation model hallucinations?',
          options: [
            {
              id: 'a',
              text: 'By retraining the neural network from scratch every 15 minutes.',
              isCorrect: false,
              explanation: 'Incorrect. Retraining foundation models takes weeks and millions of dollars; RAG operates at inference time.',
            },
            {
              id: 'b',
              text: 'By retrieving verified enterprise database records and forcing the model to answer strictly using that provided context.',
              isCorrect: true,
              explanation: 'Correct. Grounding prompts in verified reference documents ensures answers are factual and traceable.',
            },
            {
              id: 'c',
              text: 'By turning off the computer monitor during calculation.',
              isCorrect: false,
              explanation: 'Incorrect. Hardware monitors have zero influence on AI model outputs.',
            },
            {
              id: 'd',
              text: 'By encrypting all text files with a password before sending to the model.',
              isCorrect: false,
              explanation: 'Incorrect. Models must read decrypted text context to generate meaningful answers.',
            },
          ],
        },
        {
          id: 'mod-7-4-q3',
          question: 'Why is combining vector search with relational SQL WHERE clauses (hybrid query) critical in enterprise BTP applications?',
          options: [
            {
              id: 'a',
              text: 'It ensures users can only retrieve document chunks that their user roles, tenant IDs, and security authorizations permit.',
              isCorrect: true,
              explanation: 'Correct. Relational WHERE filters enforce enterprise multi-tenancy and role-based access control on vector search results.',
            },
            {
              id: 'b',
              text: 'It prevents the SQL database from using computer memory.',
              isCorrect: false,
              explanation: 'Incorrect. HANA is an in-memory database; queries execute in RAM.',
            },
            {
              id: 'c',
              text: 'It allows anonymous hackers to view all company files.',
              isCorrect: false,
              explanation: 'Incorrect. Relational security filters explicitly prevent unauthorized data access.',
            },
            {
              id: 'd',
              text: 'It converts all English documents into Spanish.',
              isCorrect: false,
              explanation: 'Incorrect. SQL WHERE clauses filter records; they do not translate languages.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'SAP HANA Cloud Vector Engine stores embeddings in native REAL_VECTOR columns for blazing-fast in-memory similarity search.',
        'RAG eliminates LLM hallucinations by retrieving factual document chunks and injecting them into the inference prompt.',
        'Enterprise RAG must combine vector similarity search with relational SQL WHERE filters to enforce role-based access control.',
      ],
      practicalActivity:
        'In schema.cds, declare an entity with a Vector(1536) column. In a test script, construct a vector query using COSINE_SIMILARITY and observe the ranked similarity results.',
    },
    {
      id: 'mod-7-5',
      code: '7.5',
      phaseId: 'phase-7',
      title: 'Joule and Agents',
      tagline: 'Joule Studio Skills, Autonomous Tool Calling & Guardrails',
      summary:
        'Master autonomous agent architectures and SAP Joule Copilot extensibility. Understand the mechanics of multi-turn autonomous agent loops (ReAct pattern), author custom conversational skills in Joule Studio, implement native tool-calling with foundation models, connect agents to CAP endpoints, and enforce enterprise guardrails.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'Autonomous agent architecture: perception, reasoning, planning, memory, and tool execution (ReAct pattern)',
        'SAP Joule Copilot extensibility: Joule Studio, custom skills, intents, entities, and dialog flows',
        'Function calling / Tool calling: defining JSON Schema tool specifications for LLM consumption',
        'Multi-turn agent loops: executing tool calls, returning observation data, and continuing reasoning',
        'Connecting agents to CAP services: exposing safe, transactional OData actions as agent tools',
        'Enterprise safety guardrails: loop iteration caps, budget limits, user confirmation for write operations, and prompt injection defense',
        'Testing and evaluating agents: deterministic test suites, adversarial red-teaming, and trace debugging',
      ],
      practicalImplementation:
        'Design an "Order Management Assistant" agent. Define 3 tools in JSON Schema: `getOrderStatus(orderId)`, `listDelayedOrders()`, and `draftSupplierEscalationEmail(orderId, reason)`. Implement an agent execution loop in Node.js using Generative AI Hub that parses model tool calls, invokes local CAP handlers, feeds tool results back to the model, and enforces a mandatory human confirmation step before sending emails.',
      masteryCheck:
        'Explain the ReAct agent execution loop. Define a tool in JSON Schema, describe how an agent loop intercepts the tool call and feeds the result back to the model, and explain why human confirmation gates are mandatory for transactional write operations.',
      learningObjectives: [
        'Explain the architectural lifecycle of autonomous AI agents utilizing the Reason + Act (ReAct) pattern.',
        'Author JSON Schema function/tool definitions that enable foundation models to invoke enterprise APIs.',
        'Implement an asynchronous tool-calling loop connecting language models to live CAP microservice endpoints.',
        'Implement safety guardrails (loop bounds, confirmation gates, adversarial validation) to prevent runaway agent actions.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Define Tool Specifications in JSON Schema',
          subtitle: 'Giving foundation models structural API blueprints',
          explanation:
            'Author precise JSON Schema definitions for each enterprise tool. Clearly document the tool name, description, required parameters, data types, and enum constraints. The foundation model uses these descriptions to decide when and how to call the tool.',
          keyIdea:
            'Clear parameter descriptions are the single most important factor in accurate model tool selection.',
        },
        {
          stepNumber: 2,
          title: 'Connect Tools to CAP Service Endpoints',
          subtitle: 'Executing backend business queries upon tool invocation',
          explanation:
            'Implement local or remote handler functions that execute when a tool is called. For example, `getOrderStatus(orderId)` queries your CAP OData service via `SELECT.one.from(Orders).where({ ID: orderId })` and returns the sanitized record.',
          keyIdea:
            'Tools must return concise, relevant JSON data to avoid flooding the model context window.',
        },
        {
          stepNumber: 3,
          title: 'Implement the Multi-Turn Agent Loop',
          subtitle: 'Handling the recursive ReAct cycle until task completion',
          explanation:
            'Construct an asynchronous `while` loop that calls the Generative AI Hub. If the model returns `finish_reason === "tool_calls"`, iterate through each requested tool, execute the handler, append the result to the message history, and re-invoke the model.',
          keyIdea:
            'The loop continues until the model decides it has sufficient information to generate a final answer.',
        },
        {
          stepNumber: 4,
          title: 'Enforce Execution Guardrails and Loop Limits',
          subtitle: 'Preventing runaway recursion, infinite loops, and cost spikes',
          explanation:
            'Initialize an iteration counter `let iterations = 0;`. If `iterations >= 5`, break the loop, log a diagnostic warning, and inform the user that the task required too many steps. This prevents runaway loops and token billing exhaustion.',
          keyIdea:
            'Strict iteration bounds guarantee system stability and cost predictability.',
        },
        {
          stepNumber: 5,
          title: 'Implement Human-in-the-Loop Confirmation Gates',
          subtitle: 'Requiring human authority for transactional mutations',
          explanation:
            'Categorize tools into `READ` (safe for automated execution) and `WRITE` (requires human approval). When the model invokes a WRITE tool (e.g. `cancelOrder`), halt execution, return the proposed parameters to the user UI, and require explicit approval before execution.',
          keyIdea:
            'Irreversible enterprise business transactions must always remain under human authority.',
        },
      ],
      diagramType: 'joule-agents',
      analogy: {
        concept: 'Autonomous Agent Tool-Calling and Safety Guardrails',
        analogy: 'Executive Assistant with Access to Corporate Applications and Approval Checkpoints',
        explanation:
          'Think of hiring a skilled executive assistant. You do not give them micromanaged instructions for every keystroke. Instead, you say: "Please find out why our shipment from Frankfurt is late, and draft a polite inquiry to the supplier." The assistant does not guess; they open their computer and use specific tools: first, they check the ERP tracking portal (Tool 1: getOrderStatus). They see the shipment is stuck in customs due to a missing bill of lading. Next, they open their email client and draft a message with the exact tracking number and required document (Tool 2: draftEmail). Crucially, before clicking Send, they bring the draft to your desk and say: "Here is what happened and the email I prepared. Shall I send it?" (Human-in-the-Loop Confirmation Gate). You review it, nod, and they send it.',
        transition:
          'In SAP BTP, autonomous agents dynamically call CAP endpoints as tools, iterating through the ReAct loop while respecting human confirmation guardrails for write operations.',
      },
      conceptExplanation: {
        whatItIs:
          'An AI Agent is an autonomous system powered by a foundation model that perceives user intent, formulates a multi-step execution plan, dynamically selects and invokes external software tools (APIs, databases), inspects intermediate results, and iterates until the objective is accomplished.',
        whyItExists:
          'Traditional software requires human users to navigate multiple screens, copy-paste data between apps, and manually orchestrate multi-step business transactions. Autonomous agents automate complex, cross-system workflows end-to-end.',
        problemSolved:
          'Eliminates repetitive cross-application manual tasks, orchestrates multi-step workflows conversationally, and grounds actions in enterprise data under safety guardrails.',
        howItWorks:
          'LLM receives prompt and JSON Schema tool specifications. If tools are needed, it returns tool_calls. The application executes local handlers, appends results with role: "tool", and re-invokes the LLM until a final response is generated.',
        btpFit:
          'Integrates with SAP Joule via Joule Studio skills, or runs as custom multi-agent orchestration loops in CAP microservices.',
      },
      jargonTerms: [
        {
          term: 'Tool Calling (Function Calling)',
          simpleMeaning: 'The AI telling the software: "I need you to run this specific function with these specific numbers to get the answer."',
          familiarEquivalent: 'A carpenter asking an apprentice to hand them the 3/4-inch socket wrench.',
        },
        {
          term: 'ReAct Pattern',
          simpleMeaning: 'The thinking loop where an AI Thinks, Takes an Action, Looks at what happened, and Thinks again until finished.',
          familiarEquivalent: 'A chef tasting the soup, adding a pinch of salt, tasting again, and then serving.',
        },
        {
          term: 'Guardrails',
          simpleMeaning: 'Safety rules and speed limits programmed into the app to stop the AI from making mistakes or spending too much money.',
          familiarEquivalent: 'Guardrails on a mountain highway preventing cars from steering off the road.',
        },
        {
          term: 'Joule Studio',
          simpleMeaning: 'The visual design studio in SAP Build where developers teach Joule new skills and link it to business systems.',
          familiarEquivalent: 'A training workshop where apprentices are taught company procedures and given system keycards.',
        },
      ],
      technicalExample: {
        title: 'Autonomous Tool-Calling Agent Loop with Enterprise Guardrails in Node.js',
        language: 'typescript',
        code: `import { AzureOpenAiChatClient } from '@sap-ai-sdk/foundation-models';

// 1. Define enterprise tools in standard JSON Schema format
const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'getOrderStatus',
      description: 'Look up the live fulfillment status and delay notes for a specific purchase order.',
      parameters: {
        type: 'object',
        properties: {
          orderId: { type: 'string', description: 'The unique purchase order ID, e.g. PO-1001' }
        },
        required: ['orderId']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'draftSupplierEmail',
      description: 'Draft an escalation inquiry email to a supplier regarding an order delay.',
      parameters: {
        type: 'object',
        properties: {
          orderId: { type: 'string' },
          supplierEmail: { type: 'string' },
          bodyText: { type: 'string' }
        },
        required: ['orderId', 'supplierEmail', 'bodyText']
      }
    }
  }
];

// Mock database tool implementation
async function executeTool(name: string, args: any): Promise<string> {
  if (name === 'getOrderStatus') {
    return JSON.stringify({
      orderId: args.orderId,
      status: 'DELAYED',
      supplier: 'Acme Heavy Machinery',
      supplierEmail: 'dispatch@acme.de',
      delayReason: 'Customs clearance pending at Port of Hamburg',
      etaDays: 7
    });
  }
  if (name === 'draftSupplierEmail') {
    // Write tool: Flag for human confirmation
    return JSON.stringify({
      status: 'DRAFT_CREATED',
      requiresUserApproval: true,
      draftDetails: args
    });
  }
  throw new Error(\`Unknown tool: \${name}\`);
}

// 2. Multi-turn Agent Execution Loop with Guardrails
export async function runEnterpriseAgent(userPrompt: string): Promise<string> {
  const client = new AzureOpenAiChatClient('gpt-4o');
  const messages: any[] = [
    {
      role: 'system',
      content: 'You are an SAP Autonomous Logistics Agent. Use the supplied tools to investigate orders and draft communications. Never make up facts.'
    },
    { role: 'user', content: userPrompt }
  ];

  const MAX_ITERATIONS = 5; // Guardrail: Prevent runaway recursion
  let iteration = 0;

  while (iteration < MAX_ITERATIONS) {
    iteration++;

    // Call Generative AI Hub with available tools
    const response = await client.run({
      messages: messages,
      tools: tools,
      tool_choice: 'auto'
    });

    const choice = response.data?.choices?.[0];
    const message = choice?.message;

    if (!message) break;
    messages.push(message);

    // Check if model wants to call tools
    if (message.tool_calls && message.tool_calls.length > 0) {
      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        // Execute local tool handler
        const toolResult = await executeTool(functionName, functionArgs);

        // Append tool result message to conversation history
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: toolResult
        });
      }
    } else {
      // Model produced final answer without further tool calls
      return message.content || 'Task completed.';
    }
  }

  return 'Agent reached maximum iteration limit before completing the task. Manual intervention required.';
}`,
        purpose:
          'Demonstrates how to build a production-grade tool-calling agent loop in Node.js with iteration limits and human confirmation flags.',
        lineExplanations: [
          { lines: '4-33', explanation: 'Defines tools in standard JSON Schema, explicitly defining parameter names and validation constraints.' },
          { lines: '36-54', explanation: 'Mock handler executing backend logic, returning JSON strings representing database query responses.' },
          { lines: '57-67', explanation: 'Initializes the conversation context with system instructions and user request.' },
          { lines: '69-70', explanation: 'Implements the MAX_ITERATIONS guardrail to prevent infinite execution loops.' },
          { lines: '75-80', explanation: 'Dispatches to Generative AI Hub with tool definitions, letting the model select actions.' },
          { lines: '87-101', explanation: 'Iterates through requested tool calls, invokes local functions, and appends results with role: "tool".' },
        ],
        expectedOutput:
          'The agent calls getOrderStatus, receives delay context, drafts an escalation email, and returns the formatted response.',
        commonMistakes: [
          'Omitting an iteration limit counter, causing infinite loops that burn through hundreds of dollars in API tokens.',
          'Failing to parse tool arguments with JSON.parse in a try/catch block, crashing the server on malformed JSON.',
          'Allowing autonomous agents to execute destructive database updates without human review and confirmation.',
        ],
      },
      businessScenario: {
        title: 'Maritime Freight Port Disruption Autonomous Rerouting',
        context:
          'Atlantic Maritime operations coordinators spent 6 hours per shift manually checking 15 different port scheduling websites and S/4HANA shipment tables to detect delayed cargo containers and draft rerouting notices.',
        workflowSteps: [
          'Coordinator asks "Check delayed containers at Rotterdam and prepare trucker reroutes".',
          'Agent autonomously invokes getPortDelays("RTM") and getContainerManifests().',
          'Agent correlates 42 impacted shipments and drafts carrier notices.',
          'Agent pauses at Confirmation Gate, displaying summary table for coordinator review.',
          'Coordinator clicks "Approve All"; carrier reroute orders dispatched.',
        ],
        businessImpact:
          'Triage time dropped by 80%, averting $2.4M annually in port container demurrage storage penalties.',
      },
      quizQuestions: [
        {
          id: 'mod-7-5-q1',
          question: 'What is the role of JSON Schema in LLM function / tool calling?',
          options: [
            {
              id: 'a',
              text: 'It translates JavaScript into C++ machine assembly code.',
              isCorrect: false,
              explanation: 'Incorrect. JSON Schema is a data modeling standard, not a binary compiler.',
            },
            {
              id: 'b',
              text: 'It tells the foundation model the exact names, descriptions, and parameter types of available software functions so it can construct valid tool calls.',
              isCorrect: true,
              explanation: 'Correct. JSON Schema provides the structural blueprint that guides the LLM on which tools exist and how to invoke them.',
            },
            {
              id: 'c',
              text: 'It automatically encrypts the developer\'s computer monitor.',
              isCorrect: false,
              explanation: 'Incorrect. JSON Schema defines data schemas for software interfaces.',
            },
            {
              id: 'd',
              text: 'It deletes all unit tests that fail to pass.',
              isCorrect: false,
              explanation: 'Incorrect. JSON Schema has nothing to do with test deletion.',
            },
          ],
        },
        {
          id: 'mod-7-5-q2',
          question: 'Why is an iteration limit counter (e.g. MAX_ITERATIONS = 5) a mandatory guardrail in autonomous agent loops?',
          options: [
            {
              id: 'a',
              text: 'To prevent infinite recursion loops that exhaust token budgets and hang system resources if the model gets confused.',
              isCorrect: true,
              explanation: 'Correct. Without an iteration cap, unexpected tool outputs could cause an agent to cycle indefinitely, consuming massive cloud resources.',
            },
            {
              id: 'b',
              text: 'Because cloud networks can only transmit 5 bytes of data per week.',
              isCorrect: false,
              explanation: 'Incorrect. Cloud networks transmit gigabytes of data per second.',
            },
            {
              id: 'c',
              text: 'Because SAP Joule only works for 5 seconds before going to sleep.',
              isCorrect: false,
              explanation: 'Incorrect. Joule operates continuously across all enterprise sessions.',
            },
            {
              id: 'd',
              text: 'Because computers cannot count higher than the number 5.',
              isCorrect: false,
              explanation: 'Incorrect. Computers perform billions of arithmetic operations per second.',
            },
          ],
        },
        {
          id: 'mod-7-5-q3',
          question: 'In enterprise agent design, what is the purpose of a "Human-in-the-Loop Confirmation Gate"?',
          options: [
            {
              id: 'a',
              text: 'To force an employee to manually type out all machine learning weights.',
              isCorrect: false,
              explanation: 'Incorrect. Weights are internal mathematical parameters of neural networks.',
            },
            {
              id: 'b',
              text: 'To require a human user to review and explicitly authorize irreversible financial, physical, or transactional writes before execution.',
              isCorrect: true,
              explanation: 'Correct. Confirmation gates ensure that high-stakes operations (releasing payments, cancelling orders) remain under human control.',
            },
            {
              id: 'c',
              text: 'To prevent users from logging out of the application.',
              isCorrect: false,
              explanation: 'Incorrect. Users can log out at any time.',
            },
            {
              id: 'd',
              text: 'To convert all JSON documents into PDF files.',
              isCorrect: false,
              explanation: 'Incorrect. Confirmation gates govern execution approval, not file format conversion.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'AI agents combine LLM reasoning with external tool calling to accomplish multi-step goals autonomously.',
        'Tools must be described precisely using standard JSON Schema definitions detailing parameter requirements.',
        'Enterprise agents must enforce iteration limits, read/write segregation, and human confirmation approval gates.',
      ],
      practicalActivity:
        'Author a tool definition in JSON Schema for an inventory lookup function. Write a mock function that handles the tool call and prints the parsed arguments to the console.',
    },
    {
      id: 'mod-7-6',
      code: '7.6',
      phaseId: 'phase-7',
      title: 'Extensibility and Clean Core',
      tagline: 'Clean Core Principles, Extension Points & Upgrade-Safe Design',
      summary:
        'Master the definitive Clean Core extensibility strategy for SAP systems. Differentiate between in-app key-user extensibility, developer extensibility (ABAP Cloud), and side-by-side extensibility on SAP BTP. Enforce released APIs from SAP Business Accelerator Hub, event-driven decoupling, and zero core modification rules to ensure seamless cloud upgrades.',
      estimatedMinutes: 45,
      level: 'Advanced',
      subtopics: [
        'Clean Core definition: separating custom code from standard ERP logic to guarantee frictionless upgrades',
        'The three extension tiers: In-App Key-User Extensibility, Developer Extensibility (ABAP Cloud), and Side-by-Side Extensibility on BTP',
        'The Clean Core Extensibility Matrix: decision criteria for choosing the right extension tier for every business requirement',
        'Integration contracts: consuming strictly Released APIs and Business Events from SAP Business Accelerator Hub',
        'Prohibited patterns: why modifying standard SAP tables, using unreleased BAPIs, and direct database access violate Clean Core',
        'Event-driven architecture: decoupling BTP extensions from S/4HANA via SAP Event Mesh and standard cloud events',
        'Upgrade resilience: contract testing, API versioning, and minimal data replication design',
      ],
      practicalImplementation:
        'Analyze 8 enterprise change scenarios and classify each into the Clean Core Extensibility Matrix (In-App, ABAP Cloud, or Side-by-Side on BTP). Design a side-by-side extension architecture on BTP for an S/4HANA system: identify the released OData API on SAP Business Accelerator Hub, specify the SAP Event Mesh subscription topic, and author an architectural justification document.',
      masteryCheck:
        'Explain the three extension tiers of Clean Core (In-App, ABAP Cloud, Side-by-Side BTP). Describe how released APIs and event-driven decoupling guarantee upgrade resilience, and explain why direct database table modifications are strictly prohibited.',
      learningObjectives: [
        'Articulate the core philosophy and financial business value of the SAP Clean Core strategy.',
        'Classify enterprise functional requirements into the 3 extension styles: In-App, ABAP Cloud, or BTP Side-by-Side.',
        'Identify and consume officially released APIs and business events from the SAP Business Accelerator Hub.',
        'Design upgrade-resilient side-by-side architectures that completely decouple custom logic from ERP release cycles.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Consult the Clean Core Extensibility Decision Matrix',
          subtitle: 'Selecting the optimal extension tier for each requirement',
          explanation:
            'Evaluate incoming functional requirements against the 3 tiers. Choose In-App for simple field and UI adaptations. Choose ABAP Cloud for high-performance transactional logic tightly coupled to S/4HANA tables. Choose BTP Side-by-Side for independent UI, multi-system integration, external users, and AI.',
          keyIdea:
            'The right extension tier balances execution performance, upgrade safety, and user reach.',
        },
        {
          stepNumber: 2,
          title: 'Verify API Release Status on SAP Business Accelerator Hub',
          subtitle: 'Ensuring integration contracts carry formal backward-compatibility guarantees',
          explanation:
            'Never connect to unreleased tables or internal RFCs. Open `api.sap.com`. Search for the target S/4HANA object (e.g. Business Partner, Sales Order). Verify that the API is marked as "Released" and inspect its supported entity sets, query parameters, and deprecation policies.',
          keyIdea:
            'Released APIs carry SAP contracts guaranteeing they will not break during quarterly cloud upgrades.',
        },
        {
          stepNumber: 3,
          title: 'Decouple Architecture with Asynchronous Business Events',
          subtitle: 'Eliminating ERP database polling through event subscriptions',
          explanation:
            'Instead of writing synchronous polling batch jobs that hammer S/4HANA with queries every 5 minutes, subscribe your BTP CAP application to standard SAP Business Events (e.g. `sap.s4.beh.purchaseorder.v1.PurchaseOrder.Created.v1`) via SAP Event Mesh.',
          keyIdea:
            'Event-driven integration eliminates ERP server load and provides real-time responsiveness.',
        },
        {
          stepNumber: 4,
          title: 'Enforce Minimal Data Replication Principles',
          subtitle: 'Preventing duplicate databases and synchronization drift',
          explanation:
            'Do not replicate entire S/4HANA master data tables into your BTP HANA Cloud database. Only store the minimum operational fields required for your custom extension (e.g. Order ID, custom status, vector embedding), referencing S/4HANA as the single system of record.',
          keyIdea:
            'Minimal data replication avoids dual-maintenance overhead and prevents data synchronization drift.',
        },
        {
          stepNumber: 5,
          title: 'Establish Contract Tests for Remote API Dependencies',
          subtitle: 'Verifying upstream API compatibility in automated pipelines',
          explanation:
            'In your CAP automated test suite, implement API contract tests against mock S/4HANA schemas generated from EDMX metadata. Verify that if SAP releases an updated API version, your application detects contract discrepancies during CI testing before production deployment.',
          keyIdea:
            'Contract testing guarantees complete upgrade resilience across distributed cloud boundaries.',
        },
      ],
      diagramType: 'clean-core',
      analogy: {
        concept: 'Clean Core Extensibility Principles',
        analogy: 'Modern Smartphone Sandboxed Operating Systems vs Legacy Monolithic OS DLLs',
        explanation:
          'Think of modern smartphone operating systems (Apple iOS or Google Android). In the early days of personal computers, software programs installed custom drivers, replaced system DLLs in `C:\\Windows\\System32`, and modified the central registry directly. When Windows updated, third-party software broke, blue screens occurred, and upgrades took days. Modern smartphone OSs enforce a "Clean Core": the operating system core is sealed and read-only. Apps install in sandboxed spaces (Side-by-Side), communicate strictly through published, versioned APIs (Released APIs), and listen for operating system notifications (Events). Because the core is untouched, you update your phone\'s OS every month with a single tap while eating breakfast, and every app continues running smoothly.',
        transition:
          'In SAP S/4HANA, Clean Core keeps standard ERP code sealed and unmodified, placing custom extensions side-by-side on BTP to ensure zero-downtime quarterly cloud updates.',
      },
      conceptExplanation: {
        whatItIs:
          'Clean Core is an architectural discipline in SAP system management where standard ERP application code and database structures remain completely unmodified, custom functionality is strictly isolated across defined extension tiers, and integrations rely exclusively on officially released, upgrade-stable public APIs and business events.',
        whyItExists:
          'Modifying core ERP systems creates technical debt that paralyzes enterprise agility, delays security patches, and inflates upgrade costs to tens of millions of dollars. Clean Core guarantees that an enterprise can continuously adopt new cloud innovations and quarterly updates.',
        problemSolved:
          'Eliminates expensive multi-year upgrade projects, prevents breaking changes during quarterly releases, protects ERP database performance, and accelerates time-to-market.',
        howItWorks:
          'Simple field changes use In-App tools. Tight database transactions use ABAP Cloud. Enterprise user apps, multi-system workflows, and AI extensions live side-by-side on BTP using CAP, connecting strictly via released OData APIs and SAP Event Mesh.',
        btpFit:
          'SAP BTP is the primary platform for Side-by-Side Extensibility, providing the developer runtimes, integration services, and AI foundation for clean core architectures.',
      },
      jargonTerms: [
        {
          term: 'Clean Core',
          simpleMeaning: 'Keeping the standard SAP system completely untouched so you can install updates in minutes with zero broken code.',
          familiarEquivalent: 'A sealed smartphone operating system that never lets third-party apps touch system firmware.',
        },
        {
          term: 'Released API',
          simpleMeaning: 'An official door built by SAP with a guarantee that they will never change or break it without warning.',
          familiarEquivalent: 'A standard international electrical plug socket guaranteed to fit across all appliances.',
        },
        {
          term: 'ABAP Cloud',
          simpleMeaning: 'A modern, clean version of the ABAP language that prevents developers from touching forbidden system tables.',
          familiarEquivalent: 'A modern building code that prohibits drilling through load-bearing concrete walls.',
        },
        {
          term: 'Side-by-Side Extensibility',
          simpleMeaning: 'Building your custom app in its own separate cloud space (on BTP) that talks to SAP through official network cables.',
          familiarEquivalent: 'Building an annex building connected to the main house by a covered glass walkway.',
        },
      ],
      technicalExample: {
        title: 'Clean Core Extensibility Architectural Classification Matrix',
        language: 'json',
        code: `{
  "policy": "Enterprise Clean Core Extensibility Framework",
  "complianceRules": [
    "ZERO modifications to standard SAP namespace objects (no SE38, no modifications)",
    "Strictly consume Released APIs cataloged on SAP Business Accelerator Hub",
    "Decouple state changes using asynchronous SAP Event Mesh business events"
  ],
  "decisions": [
    {
      "requirement": "Add a custom 'Carbon Footprint Rating' dropdown field to the standard S/4HANA Purchase Order header screen.",
      "selectedTier": "In-App Key-User Extensibility",
      "implementation": "Custom Fields and Logic Fiori App in S/4HANA",
      "cleanCoreJustification": "Standard SAP key-user tool creates custom field with upgrade safety; zero code or BTP infrastructure needed."
    },
    {
      "requirement": "Calculate complex real-time depreciation for chemical refinery equipment during the core GL posting transaction.",
      "selectedTier": "Developer Extensibility (ABAP Cloud)",
      "implementation": "Custom BAdI implementation using ABAP Cloud on S/4HANA stack",
      "cleanCoreJustification": "Requires synchronous sub-second database execution inside the LUW (Logical Unit of Work); uses released ABAP Cloud BAdI interface."
    },
    {
      "requirement": "Build a public supplier portal where 5,000 global vendors submit delivery dispatch times and chat with an AI assistant.",
      "selectedTier": "Side-by-Side Extensibility on SAP BTP",
      "implementation": "Full-stack CAP Node.js + Fiori Elements + Generative AI Hub on Cloud Foundry",
      "cleanCoreJustification": "External user traffic is kept off the core ERP system, scalable cloud computing is utilized, and integrations use released OData APIs."
    }
  ]
}`,
        purpose:
          'Provides an enterprise-ready decision matrix for evaluating and assigning business requirements to the correct Clean Core extension tier.',
        lineExplanations: [
          { lines: '3-7', explanation: 'Defines the mandatory enterprise compliance rules governing all software changes.' },
          { lines: '9-15', explanation: 'Assigns simple field extensions to In-App Extensibility, preserving simplicity.' },
          { lines: '16-22', explanation: 'Assigns tight database posting logic to ABAP Cloud developer extensibility via released BAdIs.' },
          { lines: '23-29', explanation: 'Assigns external-facing user portals and AI workloads to BTP Side-by-Side, protecting ERP stability.' },
        ],
        expectedOutput:
          'A documented architectural decision matrix approved by enterprise architecture review boards.',
        commonMistakes: [
          'Attempting to query internal S/4HANA database tables directly from BTP via JDBC, which violates Clean Core and voids SAP support.',
          'Using deprecated or unreleased RFC function modules instead of official OData v4 released APIs.',
          'Building massive batch replication jobs that duplicate entire ERP databases on BTP instead of querying on-demand or using events.',
        ],
      },
      businessScenario: {
        title: 'Industrial Heavy Machinery Clean Core Modernization',
        context:
          'Caterpillar-partner HeavyMach Global was stuck on a 9-year-old SAP ECC release because they had over 1,400 core modifications in standard SAP programs. A routine security patch took 6 months of testing, costing $8M annually.',
        workflowSteps: [
          'Enterprise architecture board audits 1,400 legacy core modifications.',
          '80% decommissioned and replaced with standard S/4HANA features.',
          '15% migrated to In-App Key-User extensions in S/4HANA.',
          '5% unique differentiating apps re-architected as CAP side-by-side apps on BTP.',
          'S/4HANA core migrated to Cloud Public Edition; quarterly updates install seamlessly in minutes.',
        ],
        businessImpact:
          'Eliminated all 1,400 core modifications, slashing annual IT maintenance spend by $6.2M and accelerating new feature releases by 400%.',
      },
      quizQuestions: [
        {
          id: 'mod-7-6-q1',
          question: 'What is the core objective of the SAP Clean Core strategy?',
          options: [
            {
              id: 'a',
              text: 'To completely delete all custom code and force every company to run identical software with zero customization.',
              isCorrect: false,
              explanation: 'Incorrect. Clean Core allows unlimited customization across structured tiers; it does not eliminate customization.',
            },
            {
              id: 'b',
              text: 'To keep standard ERP system code and database structures unmodified so that quarterly cloud updates and innovations install seamlessly.',
              isCorrect: true,
              explanation: 'Correct. Clean Core isolates custom code so standard ERP software upgrades without breaking custom extensions.',
            },
            {
              id: 'c',
              text: 'To physically clean computer servers with disinfectant wipes every morning.',
              isCorrect: false,
              explanation: 'Incorrect. Clean Core is an enterprise software architecture standard, not physical janitorial work.',
            },
            {
              id: 'd',
              text: 'To replace all relational databases with text files.',
              isCorrect: false,
              explanation: 'Incorrect. Clean Core runs on advanced SAP HANA Cloud databases.',
            },
          ],
        },
        {
          id: 'mod-7-6-q2',
          question: 'Which extension tier should be selected for an external supplier portal with 10,000 external users requiring generative AI capabilities?',
          options: [
            {
              id: 'a',
              text: 'Modifying standard SAP ECC programs in transaction SE38.',
              isCorrect: false,
              explanation: 'Incorrect. Modifying standard SAP code directly violates Clean Core and creates massive upgrade technical debt.',
            },
            {
              id: 'b',
              text: 'Side-by-Side Extensibility on SAP BTP using CAP and the Generative AI Hub.',
              isCorrect: true,
              explanation: 'Correct. External users, high concurrency, and AI capabilities belong side-by-side on BTP to keep the ERP core protected.',
            },
            {
              id: 'c',
              text: 'In-App key user custom fields in S/4HANA.',
              isCorrect: false,
              explanation: 'Incorrect. In-App extensibility handles simple screen adjustments, not external AI portals.',
            },
            {
              id: 'd',
              text: 'Writing an Excel macro on a local laptop.',
              isCorrect: false,
              explanation: 'Incorrect. Enterprise supplier portals require robust, scalable cloud infrastructure.',
            },
          ],
        },
        {
          id: 'mod-7-6-q3',
          question: 'Where should developers discover officially released, upgrade-safe APIs for integrating with SAP S/4HANA?',
          options: [
            {
              id: 'a',
              text: 'SAP Business Accelerator Hub (api.sap.com)',
              isCorrect: true,
              explanation: 'Correct. SAP Business Accelerator Hub is the authoritative public catalog of released APIs, CDS views, and events.',
            },
            {
              id: 'b',
              text: 'Random social media message boards.',
              isCorrect: false,
              explanation: 'Incorrect. Social media is not an official source for enterprise API specifications.',
            },
            {
              id: 'c',
              text: 'By guessing random URLs in a web browser address bar.',
              isCorrect: false,
              explanation: 'Incorrect. Guessing URLs violates security protocols and leads to broken integrations.',
            },
            {
              id: 'd',
              text: 'Printed computer magazines from 1995.',
              isCorrect: false,
              explanation: 'Incorrect. Modern cloud APIs are documented live on api.sap.com.',
            },
          ],
        },
      ],
      keyTakeaways: [
        'Clean Core protects ERP stability by strictly separating custom code from standard core software.',
        'Choose In-App for simple adjustments, ABAP Cloud for close transactional logic, and BTP Side-by-Side for scalable apps and AI.',
        'Always consume officially released APIs from SAP Business Accelerator Hub and decouple systems using business events.',
      ],
      practicalActivity:
        'Visit api.sap.com. Search for "Purchase Order (OData v4)". Verify its released status and examine the available entity sets and business documentation.',
    },
  ],
};
