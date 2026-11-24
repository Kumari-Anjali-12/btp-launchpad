import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_1: SyllabusPhase = {
  id: 'phase-1',
  number: 1,
  title: 'BTP Foundations',
  tagline: 'Phase 1 · Weeks 3-4 · ~25 Hours',
  description:
    'Master the cloud architecture and account administration of SAP Business Technology Platform. Understand global accounts, directories, subaccounts, Cloud Foundry runtime environments, service entitlements, and enterprise identity federation.',
  coreObjective:
    'Navigate the SAP BTP Cockpit with confidence. Provision subaccounts, configure multi-cloud hyperscaler regions (AWS, Azure, GCP), allocate service entitlements, configure custom identity trust with SAP Cloud Identity Services, and deploy applications to Cloud Foundry spaces.',
  estimatedHours: 25,
  suggestedWeeks: 'Weeks 3-4',
  badgeCategory: 'core',
  capstone: PHASE_CAPSTONES[1]!,
  modules: [
    {
      id: 'mod-1-1',
      code: '1.1',
      phaseId: 'phase-1',
      title: 'Cloud Concepts',
      tagline: 'IaaS, PaaS, SaaS, Shared Responsibility, and Multi-Cloud Hyperscalers',
      summary:
        'Understand cloud computing models, the shared responsibility security framework, how SAP BTP runs on top of global hyperscalers (AWS, Azure, GCP), and how availability zones ensure high availability.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Cloud computing delivery models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS).',
        'Shared responsibility security model: What the hyperscaler secures, what SAP BTP manages, and what the customer application developer owns.',
        'Multi-cloud strategy: How SAP BTP leverages AWS, Microsoft Azure, Google Cloud Platform, and Alibaba Cloud infrastructure.',
        'Geographic resiliency: Data centers, regions (e.g., eu10 Frankfurt, us10 Virginia), and Availability Zones (AZs) for active-active failover.',
        'Enterprise Service Level Agreements (SLAs), recovery time objectives (RTO), and recovery point objectives (RPO).',
      ],
      practicalImplementation:
        'Inspect hyperscaler regions across the SAP BTP service catalog. Calculate the shared responsibility boundary for a custom CAP application versus an on-premise ABAP server.',
      masteryCheck:
        'Classify 6 cloud security incidents into Customer responsibility, SAP PaaS responsibility, or Hyperscaler IaaS responsibility. Explain why deploying across multiple availability zones prevents regional cloud outages.',
      learningObjectives: [
        'Differentiate between IaaS, PaaS, and SaaS, identifying where SAP BTP fits.',
        'Analyze the Shared Responsibility Model to understand security ownership boundaries.',
        'Explain how SAP BTP abstracts underlying hyperscalers (AWS, Azure, GCP).',
        'Describe how multi-zone deployments achieve 99.95%+ uptime SLAs.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Cloud Service Models: IaaS vs PaaS vs SaaS',
          subtitle: 'The pizza-as-a-service breakdown',
          explanation:
            'Cloud computing categorizes software hosting into three primary tiers: 1) IaaS (Infrastructure as a Service): Renting raw virtual machines, storage, and networking (e.g., AWS EC2, Azure VMs). The customer must patch the operating system and manage runtimes. 2) PaaS (Platform as a Service): Managed runtime environments where the cloud provider manages operating systems, runtimes, and databases, allowing developers to focus solely on writing application code. SAP BTP is fundamentally an enterprise PaaS. 3) SaaS (Software as a Service): Fully managed end-user applications (e.g., SAP SuccessFactors, S/4HANA Cloud Public Edition, Salesforce).',
          keyIdea:
            'SAP BTP is an enterprise Platform as a Service (PaaS): you write business code and data models; SAP handles operating system patches, container orchestration, and runtime security.',
          taskInstruction: 'Review the pizza analogy to internalize who manages which layer of the technology stack.',
          hint: 'On IaaS you manage the OS; on PaaS you manage your code; on SaaS you just log in.',
        },
        {
          stepNumber: 2,
          title: 'The Shared Responsibility Security Model',
          subtitle: 'Understanding who is accountable when things go wrong',
          explanation:
            'Security in the cloud is a shared partnership: 1) The Hyperscaler (AWS/Azure/GCP) secures physical data center security, hardware maintenance, power, and physical disk destruction. 2) SAP manages the PaaS virtualization layer, container runtime hardening, automated platform patches, and network firewall isolation. 3) The Customer Developer is strictly responsible for application code security, customer data classification, user role assignments, input sanitization, and protecting OAuth client secrets.',
          keyIdea:
            'Even though SAP BTP is highly secure, a developer who writes vulnerable code (e.g., leaving an API endpoint unauthenticated) is responsible for any resulting data breach.',
          taskInstruction: 'Review the security boundary table in the concept explanation.',
          warning: 'Never assume the cloud platform automatically fixes bad application security logic.',
        },
        {
          stepNumber: 3,
          title: 'SAP Multi-Cloud Hyperscaler Architecture',
          subtitle: 'Why SAP BTP does not build its own physical data centers',
          explanation:
            'In earlier decades, SAP operated private data centers. Today, SAP partners with global hyperscalers (Amazon Web Services, Microsoft Azure, Google Cloud Platform, and Alibaba Cloud). When you create an SAP BTP subaccount, you choose both an underlying hyperscaler and a geographic region (e.g., `cf-eu10` runs on AWS Frankfurt; `cf-eu20` runs on Azure Amsterdam; `cf-us30` runs on GCP Iowa). This gives enterprise clients complete data sovereignty, letting them comply with local regulations (GDPR in Europe, HIPAA in the US) while retaining low-latency connections to their existing corporate clouds.',
          keyIdea:
            'SAP BTP runs on top of AWS, Azure, and GCP, providing a consistent enterprise layer across any cloud infrastructure.',
          taskInstruction: 'Check available hyperscalers in the SAP Discovery Center (discovery-center.cloud.sap).',
          hint: 'Select the hyperscaler that matches your corporate cloud provider to minimize cross-cloud data egress fees.',
        },
        {
          stepNumber: 4,
          title: 'Regions and Availability Zones (AZs)',
          subtitle: 'Building fault-tolerant enterprise architectures',
          explanation:
            'A cloud Region is a specific physical geographic location (e.g., Frankfurt, Germany). Inside each region, modern cloud providers operate multiple distinct Availability Zones (AZs)—separate physical data centers located miles apart with isolated power, cooling, and networking. SAP BTP Cloud Foundry spaces distribute application instances across multiple availability zones automatically. If a physical transformer fails or a fiber cable is cut at Data Center A, traffic immediately routes to instances running in Data Center B with zero downtime.',
          keyIdea:
            'High Availability is achieved by running at least two instances of your application so BTP distributes them across separate physical availability zones.',
          taskInstruction: 'Inspect the BTP hierarchy diagram to see how subaccounts map to regional data centers.',
          hint: 'Always configure minimum 2 instances in production manifests (`instances: 2`).',
        },
        {
          stepNumber: 5,
          title: 'Enterprise SLAs and Disaster Recovery',
          subtitle: 'Measuring reliability in business terms',
          explanation:
            'Enterprise contracts depend on Service Level Agreements (SLAs). An SLA of 99.9% allows 8.7 hours of downtime per year; 99.95% allows 4.3 hours; 99.99% ("four nines") allows only 52 minutes. Disaster recovery measures two critical metrics: 1) RPO (Recovery Point Objective): The maximum acceptable age of data lost during a disaster (e.g., "we can tolerate losing up to 15 minutes of transactions"). 2) RTO (Recovery Time Objective): The maximum acceptable duration to restore services after an outage (e.g., "the portal must be back online within 2 hours").',
          keyIdea:
            'RPO is about data loss; RTO is about downtime duration.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Smaller RPO and RTO numbers require higher infrastructure investment.',
        },
      ],
      diagramType: 'btp-hierarchy',
      analogy: {
        concept: 'Cloud Service Models (IaaS, PaaS, SaaS)',
        analogy: 'Pizza as a Service',
        explanation:
          'Traditional on-premise IT is making pizza from scratch at home: you buy flour, yeast, cheese, bake it in your oven, and wash the dishes. IaaS (Infrastructure as a Service) is buying a frozen pizza at the grocery store: someone else made the dough and sauce, but you still supply the oven, electricity, and clean the dining table. PaaS (Platform as a Service - SAP BTP) is pizza delivery: you order the exact pizza you want, the restaurant cooks it in their professional pizza oven, and delivers it hot to your door in a box; you just provide the appetite and enjoy it. SaaS (Software as a Service - SAP S/4HANA Public Cloud) is dining out at an Italian restaurant: you sit at a table, eat, pay the bill, and leave; you do not touch an oven, pizza box, or dish.',
        transition:
          'Where pizza delivery lets you eat without owning a pizza oven, SAP BTP lets you build enterprise software without managing physical servers or operating systems.',
      },
      conceptExplanation: {
        whatItIs:
          'Cloud computing is the on-demand delivery of computing power, database storage, applications, and IT resources over the internet with pay-as-you-go pricing.',
        whyItExists:
          'Building physical on-premise data centers requires millions in upfront capital expenditure (CapEx), months of hardware procurement lead times, and continuous physical maintenance.',
        problemSolved:
          'Replaces massive upfront capital expenditures with operational expenditures (OpEx), provides infinite elastic scaling, and delivers global multi-region redundancy in minutes.',
        howItWorks:
          'Hyperscalers maintain massive global facilities. SAP installs its enterprise software platform (BTP) on top of this physical infrastructure. Customers spin up virtual cloud environments in minutes via the web-based SAP BTP Cockpit.',
        btpFit:
          'SAP BTP is an enterprise Platform as a Service (PaaS) that runs multi-cloud across AWS, Azure, GCP, and Alibaba Cloud regions.',
      },
      jargonTerms: [
        {
          term: 'IaaS / PaaS / SaaS',
          simpleMeaning: 'The 3 cloud layers: Infrastructure (raw VMs), Platform (developer runtimes), Software (ready apps).',
          familiarEquivalent: 'Buying land (IaaS) vs renting a furnished office (PaaS) vs booking a hotel room (SaaS).',
        },
        {
          term: 'Hyperscaler',
          simpleMeaning: 'Massive global public cloud infrastructure providers (AWS, Microsoft Azure, Google Cloud).',
          familiarEquivalent: 'Global electric utility power plants.',
        },
        {
          term: 'Availability Zone (AZ)',
          simpleMeaning: 'One or more discrete physical data centers within a cloud region with independent power and cooling.',
          familiarEquivalent: 'Having a backup generator and dual power feeds in a separate building.',
        },
        {
          term: 'SLA (Service Level Agreement)',
          simpleMeaning: 'A contractual commitment specifying the percentage of time a cloud service will remain available.',
          familiarEquivalent: 'An airline guaranteeing on-time flight arrivals with monetary compensation for delays.',
        },
      ],
      technicalExample: {
        title: 'Multi-Cloud Cloud Foundry Region Endpoint Configuration in BTP',
        language: 'json',
        code: `{
  "subaccounts": [
    {
      "name": "Production Europe",
      "subaccount_id": "eu10-prod-subaccount-guid",
      "hyperscaler": "AWS",
      "region": "eu10",
      "api_endpoint": "https://api.cf.eu10.hana.ondemand.com",
      "data_sovereignty": "EU GDPR Compliant",
      "high_availability": {
        "multi_zone": true,
        "availability_zones": ["eu-central-1a", "eu-central-1b", "eu-central-1c"]
      }
    },
    {
      "name": "Production North America",
      "subaccount_id": "us10-prod-subaccount-guid",
      "hyperscaler": "AWS",
      "region": "us10",
      "api_endpoint": "https://api.cf.us10.hana.ondemand.com",
      "data_sovereignty": "US FedRAMP Certified",
      "high_availability": {
        "multi_zone": true,
        "availability_zones": ["us-east-1a", "us-east-1b"]
      }
    }
  ]
}`,
        purpose:
          'Illustrates how an enterprise partitions global subaccounts across different hyperscalers and geographic regions for low latency and data privacy compliance.',
        lineExplanations: [
          { lines: '5', explanation: 'hyperscaler: Underlying cloud provider hosting the physical hardware (AWS).' },
          { lines: '6', explanation: 'region: SAP BTP regional identifier (eu10 = Frankfurt; us10 = Virginia).' },
          { lines: '7', explanation: 'api_endpoint: The Cloud Foundry target URL used by CLI tools (cf login -a).' },
          { lines: '10-12', explanation: 'high_availability: Automatic multi-zone instance distribution across 3 physical data centers.' },
        ],
        expectedOutput:
          'Subaccounts achieve independent failover and complete legal data isolation across regional jurisdictions.',
        commonMistakes: [
          'Selecting a US region for European citizen personal data, violating GDPR statutory residency requirements.',
          'Configuring only 1 instance for production workloads, preventing multi-zone automatic failover.',
        ],
      },
      businessScenario: {
        title: 'Global Retailer Black Friday High-Availability Architecture',
        context:
          'A global luxury retailer expects a 50x surge in order processing traffic during Black Friday sales across 12 countries.',
        workflowSteps: [
          'Enterprise deploys customer checkout application to SAP BTP subaccounts across Europe and North America.',
          'Cloud Foundry autoscaler detects CPU load exceeding 70% and scales app instances from 4 to 24 automatically.',
          'Traffic is load-balanced across multiple availability zones using the BTP Gorouter.',
          'One hyperscaler data center experiences a local power failure; traffic redirects to remaining zones with zero dropped carts.',
        ],
        businessImpact:
          'Processes €42,000,000 in transactions with 100% uptime during the most critical shopping weekend of the year.',
      },
      practicalActivity:
        'Open your command line and query Cloud Foundry API health: `curl -I https://api.cf.eu10.hana.ondemand.com/v3/info`.',
      keyTakeaways: [
        'SAP BTP is an enterprise PaaS running on top of hyperscalers (AWS, Azure, GCP).',
        'In PaaS, SAP manages the operating systems and runtimes; you are responsible for application code and data security.',
        'Multi-zone deployments prevent downtime if an individual physical data center experiences a disaster.',
      ],
      quizQuestions: [
        {
          id: 'mod-1-1-q1',
          question:
            'Under the cloud Shared Responsibility Model for an application deployed on SAP BTP Cloud Foundry (PaaS), who is responsible if an application endpoint is left unprotected without authentication, allowing data leakage?',
          options: [
            {
              id: 'a',
              text: 'The Customer Application Developer, because application code, security scope checks, and access controls are customer responsibilities.',
              isCorrect: true,
              explanation:
                'Correct. In PaaS, SAP secures the underlying platform and runtime, but application logic, authentication configuration, and data access policies are strictly customer responsibilities.',
            },
            {
              id: 'b',
              text: 'Amazon Web Services (AWS), because they own the physical server hardware.',
              isCorrect: false,
              explanation:
                'Incorrect. Hyperscalers only secure physical facilities and low-level virtualization.',
            },
            {
              id: 'c',
              text: 'The regional government where the data center is located.',
              isCorrect: false,
              explanation:
                'Incorrect. Governments enforce regulations; they do not write software security rules.',
            },
            {
              id: 'd',
              text: 'Nobody is responsible because cloud providers guarantee 100% immunity from security errors.',
              isCorrect: false,
              explanation:
                'Incorrect. No cloud provider claims immunity from developer security misconfigurations.',
            },
          ],
        },
        {
          id: 'mod-1-1-q2',
          question:
            'Why does SAP BTP deploy application instances across multiple Availability Zones (AZs) within a region?',
          options: [
            {
              id: 'a',
              text: 'To guarantee that if one physical data center suffers a power or network failure, traffic automatically fails over to instances in another data center without downtime.',
              isCorrect: true,
              explanation:
                'Correct. Availability Zones provide physical fault isolation within a geographic region.',
            },
            {
              id: 'b',
              text: 'To translate your JavaScript code into 5 foreign languages simultaneously.',
              isCorrect: false,
              explanation:
                'Incorrect. AZs are physical data centers, not language translation services.',
            },
            {
              id: 'c',
              text: 'To avoid paying internet service providers for fiber optic cables.',
              isCorrect: false,
              explanation:
                'Incorrect. High-speed private fiber connects all availability zones.',
            },
            {
              id: 'd',
              text: 'Because cloud databases can only hold 50 records per building.',
              isCorrect: false,
              explanation:
                'Incorrect. Databases hold billions of records; AZs provide operational redundancy.',
            },
          ],
        },
        {
          id: 'mod-1-1-q3',
          question:
            'What is the fundamental difference between Recovery Point Objective (RPO) and Recovery Time Objective (RTO)?',
          options: [
            {
              id: 'a',
              text: 'RPO measures acceptable data loss (time of lost transactions), while RTO measures acceptable downtime duration (time to bring systems back online).',
              isCorrect: true,
              explanation:
                'Correct. RPO is about data preservation; RTO is about service restoration speed.',
            },
            {
              id: 'b',
              text: 'RPO is measured in dollars, while RTO is measured in euros.',
              isCorrect: false,
              explanation:
                'Incorrect. Both are time-based engineering metrics (minutes or hours).',
            },
            {
              id: 'c',
              text: 'RPO applies only to mobile apps, while RTO applies only to mainframes.',
              isCorrect: false,
              explanation:
                'Incorrect. Both metrics apply universally across all cloud and enterprise architectures.',
            },
            {
              id: 'd',
              text: 'RTO measures CPU temperature; RPO measures RAM consumption.',
              isCorrect: false,
              explanation:
                'Incorrect. Neither metric has anything to do with hardware temperature.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-1-2',
      code: '1.2',
      phaseId: 'phase-1',
      title: 'SAP BTP Overview',
      tagline: 'Platform Architecture, Four Pillars, and Commercial Licensing Models',
      summary:
        'Explore the comprehensive architecture of SAP Business Technology Platform. Master the four core pillars, navigate the BTP Cockpit, and understand commercial subscription models including Pay-As-You-Go, CPEA, and Free Tier.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'The SAP BTP vision: The unified business-centric platform for extending, integrating, and innovating around the intelligent enterprise.',
        'Pillar 1: Application Development and Automation (SAP Build, CAP Model, Pro-Code runtimes).',
        'Pillar 2: Integration Suite (API Management, Cloud Integration, Open Connectors, Event Mesh).',
        'Pillar 3: Data and Analytics (SAP HANA Cloud, SAP Datasphere, SAP Analytics Cloud).',
        'Pillar 4: Business AI (SAP AI Core, Generative AI Hub, Joule Copilot, AI Foundation).',
        'BTP Commercial Models: Subscription (fixed annual commitments), Consumption-Based (Pay-As-You-Go vs Cloud Platform Enterprise Agreement - CPEA).',
        'Free Tier vs Trial Accounts: Why Free Tier on production global accounts is superior to disposable 30-day trial accounts for real projects.',
      ],
      practicalImplementation:
        'Navigate the SAP BTP Cockpit interface. Inspect the global account directory tree, review allocated cloud credits, and compare service plan tiers in the Service Marketplace.',
      masteryCheck:
        'Explain the commercial differences between Subscription, CPEA, and Pay-As-You-Go models. Given a business requirement for an automated invoice approval workflow, identify which services across the 4 pillars must be combined.',
      learningObjectives: [
        'Describe the 4 core pillars of SAP BTP and map specific business challenges to each pillar.',
        'Navigate the SAP BTP Cockpit to locate global accounts, subaccounts, and services.',
        'Differentiate between Subscription, CPEA, and Pay-As-You-Go commercial models.',
        'Understand the operational benefits of BTP Free Tier service plans over temporary Trial accounts.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Unified BTP Architectural Vision',
          subtitle: 'Why enterprises need a business-centric platform',
          explanation:
            'Generic public cloud platforms (AWS, Azure, GCP) provide raw infrastructure: generic object storage, raw databases, and generic Kubernetes clusters. However, a business developer wanting to build an enterprise application must spend months coding standard business concepts: business partner validation, currency conversions, SAP single sign-on, and ERP integration. SAP BTP bridges this gap: it is an enterprise platform pre-wired with deep business context. It provides pre-built business services, connectors to SAP S/4HANA, standard UI components adhering to SAP Fiori, and metadata models that understand ERP transactions natively.',
          keyIdea:
            'BTP is business-centric cloud: it includes built-in understanding of enterprise data models, security, and ERP workflows.',
          taskInstruction: 'Review the 4-pillar diagram to understand how BTP services categorize.',
          hint: 'Generic clouds provide tech tools; BTP provides enterprise business capabilities.',
        },
        {
          stepNumber: 2,
          title: 'Pillars 1 & 2: App Development and Integration Suite',
          subtitle: 'Building and connecting modern cloud apps',
          explanation:
            '1) Application Development and Automation: Houses tools for both professional developers (SAP Cloud Application Programming Model - CAP, SAPUI5, Cloud Foundry) and citizen developers (SAP Build Apps, SAP Build Process Automation). It enables building custom full-stack web and mobile apps rapidly. 2) Integration Suite: The universal enterprise middleware. It connects cloud-to-cloud and cloud-to-on-premise systems using standard integration flows, API Management, pre-packaged integration content, and asynchronous event messaging via SAP Event Mesh.',
          keyIdea:
            'App Dev is where you build new applications; Integration Suite is how those applications communicate seamlessly with S/4HANA and third-party systems.',
          taskInstruction: 'Explore how CAP services connect to S/4HANA via Integration Suite.',
          hint: 'Integration Suite prevents direct database coupling between disparate systems.',
        },
        {
          stepNumber: 3,
          title: 'Pillars 3 & 4: Data & Analytics and Business AI',
          subtitle: 'Gaining real-time intelligence and autonomous reasoning',
          explanation:
            '3) Data and Analytics: Anchored by SAP HANA Cloud—the enterprise in-memory relational and vector database engine. Accompanied by SAP Datasphere (semantic business data fabric) and SAP Analytics Cloud (enterprise planning and predictive dashboards). 4) Business AI: Incorporates SAP AI Core (scalable infrastructure for deploying machine learning models), Generative AI Hub (secure multi-model gateway connecting to GPT-4o, Claude 3.5, Gemini), and Joule (SAP natural language generative AI copilot embedded across all SAP applications).',
          keyIdea:
            'HANA Cloud provides the in-memory data foundation; Business AI grounds large language models in verified corporate data.',
          taskInstruction: 'Review the AI Core RAG diagram to preview how HANA Vector Engine grounds generative AI.',
          hint: 'SAP Business AI is always relevant, reliable, and responsible—it never trains public models on your private data.',
        },
        {
          stepNumber: 4,
          title: 'Commercial Models: Subscription vs Consumption (CPEA & PAYG)',
          subtitle: 'How enterprises procure and pay for BTP services',
          explanation:
            'SAP provides two fundamental commercial models: 1) Subscription Model: A fixed-term contract (typically 1 to 3 years) granting unlimited or capped access to specific named services for a fixed monthly fee, whether you use them or not. 2) Consumption-Based Models: You only pay for the exact services, memory, and API calls you consume: a) CPEA (Cloud Platform Enterprise Agreement): The enterprise commits to an annual cloud credit budget upfront at a discounted rate, and usage burns down credits monthly. b) Pay-As-You-Go (PAYG): No upfront financial commitment; you enter a credit card or billing agreement and are invoiced at standard rates for actual usage.',
          keyIdea:
            'CPEA provides prepaid volume discounts; Pay-As-You-Go provides maximum flexibility with zero upfront commitment.',
          taskInstruction: 'Understand which model fits a startup (PAYG) vs a Fortune 500 company (CPEA).',
          hint: 'Both consumption models give access to all BTP services under a single contract.',
        },
        {
          stepNumber: 5,
          title: 'Free Tier vs Trial Accounts: The Professional Choice',
          subtitle: 'Why production-ready Free Tier replaces disposable trial accounts',
          explanation:
            'Historically, learners used SAP BTP Trial accounts. However, Trial accounts have major limitations: they are hosted in shared test regions, expire after 30 to 90 days, delete your data automatically, and cannot be upgraded to production. SAP now offers BTP Free Tier under Pay-As-You-Go or CPEA accounts. With Free Tier, you operate in real enterprise production data centers with real service plans. When your application is ready for production, you change the service plan dropdown from "free" to "standard" in the Cockpit with zero data migration and zero downtime.',
          keyIdea:
            'Free Tier allows you to build real production-ready apps without credit card charges until you exceed free tier quota limits.',
          taskInstruction: 'Complete the knowledge check questions below.',
          warning: 'Never use disposable trial accounts for real corporate proof-of-concept projects.',
        },
      ],
      diagramType: 'btp-hierarchy',
      analogy: {
        concept: 'BTP Four Pillars and Commercial Models',
        analogy: 'The Modern Industrial Industrial Park and Utility Metering',
        explanation:
          'SAP BTP is like a premier industrial business park. The park management supplies paved roads, high-voltage electricity, and water lines (PaaS infrastructure). Inside the park, there are 4 specialized service districts: 1) The Workshop District (App Dev): where carpenters and engineers build custom furniture. 2) The Transit Terminal (Integration Suite): where shipping trucks, trains, and couriers move materials between factories. 3) The Central Library & Laboratory (Data & Analytics): where master records, maps, and blueprints are cataloged. 4) The Research Center (Business AI): where automated robotics and analytical advisors optimize operations. To pay for the park, you can either sign a long-term lease for Building 4 (Subscription) or install a smart digital utility meter (Consumption/CPEA) where you pay only for the exact kilowatt-hours of power your machines consume.',
        transition:
          'Where the industrial park provides shared utilities for manufacturing, SAP BTP provides shared enterprise cloud services for global business applications.',
      },
      conceptExplanation: {
        whatItIs:
          'SAP Business Technology Platform (BTP) is the unified cloud platform that brings together application development, data and analytics, integration, and AI capabilities into one unified environment tailored for enterprise business processes.',
        whyItExists:
          'Modern enterprises must innovate at cloud speed while keeping their core ERP systems clean and stable. BTP provides the pre-integrated enterprise capabilities required to extend S/4HANA without modifying core ABAP tables.',
        problemSolved:
          'Eliminates fragmented integration tooling, provides a single pane of glass for cloud administration, and offers pre-packaged business content that accelerates project delivery.',
        howItWorks:
          'Administrators manage services through the web-based BTP Cockpit. Developers build using the CAP model, deploy to Cloud Foundry or Kyma runtimes, connect to on-premise ERP via Cloud Connector, and query in-memory data using SAP HANA Cloud.',
        btpFit:
          'BTP is the central foundation for the entire SAP Intelligent Enterprise suite, uniting S/4HANA, SuccessFactors, Ariba, and third-party SaaS solutions.',
      },
      jargonTerms: [
        {
          term: 'BTP Cockpit',
          simpleMeaning: 'The web-based administration console used to manage accounts, security, and cloud services.',
          familiarEquivalent: 'The AWS Management Console or Azure Portal for SAP systems.',
        },
        {
          term: 'CPEA',
          simpleMeaning: 'Cloud Platform Enterprise Agreement: pre-paid cloud credits consumed monthly at a discount.',
          familiarEquivalent: 'Buying a prepaid transit card with $1,000 credit that burns down each time you take a train.',
        },
        {
          term: 'Free Tier',
          simpleMeaning: 'Service plans on production BTP accounts that cost $0 until you upgrade to paid tiers.',
          familiarEquivalent: 'A free mobile phone plan with 5GB data that lets you upgrade to unlimited with one click.',
        },
        {
          term: 'Kyma',
          simpleMeaning: 'A fully managed Kubernetes runtime environment on SAP BTP based on open-source project Kyma.',
          familiarEquivalent: 'An enterprise container shipping port for deploying Dockerized microservices.',
        },
      ],
      technicalExample: {
        title: 'BTP Resource Consumption and Service Plan Descriptor',
        language: 'json',
        code: `{
  "commercial_model": "CPEA",
  "contract_currency": "EUR",
  "monthly_cloud_credit_burn": 1420.50,
  "allocated_services": [
    {
      "service_name": "hana-cloud",
      "plan": "free",
      "quota": 1,
      "environment": "eu10-aws",
      "cost_per_month": 0.00
    },
    {
      "service_name": "destination",
      "plan": "lite",
      "quota": 1,
      "environment": "eu10-aws",
      "cost_per_month": 0.00
    },
    {
      "service_name": "connectivity",
      "plan": "lite",
      "quota": 1,
      "environment": "eu10-aws",
      "cost_per_month": 0.00
    },
    {
      "service_name": "aicore",
      "plan": "extended",
      "quota": 2,
      "environment": "eu10-aws",
      "cost_per_month": 340.00
    }
  ]
}`,
        purpose:
          'Illustrates how an enterprise combines Free Tier developer services with paid enterprise production plans under a single consumption agreement.',
        lineExplanations: [
          { lines: '2', explanation: 'commercial_model: Cloud Platform Enterprise Agreement with monthly credit burndown.' },
          { lines: '7-12', explanation: 'hana-cloud free plan: Provides full SAP HANA Cloud in-memory database with zero monthly charges.' },
          { lines: '25-30', explanation: 'aicore extended plan: Billable enterprise AI quota for running generative AI models.' },
        ],
        expectedOutput:
          'Enables instant development without upfront licensing friction while maintaining centralized budget controls.',
        commonMistakes: [
          'Confusing a Trial account with a Free Tier account: Trial accounts delete data after 30-90 days; Free Tier accounts persist permanently.',
          'Allocating expensive paid service quotas to developer sandbox subaccounts without setting budget threshold alerts.',
        ],
      },
      businessScenario: {
        title: 'Global Manufacturing Enterprise Digital Transformation Strategy',
        context:
          'A multi-billion euro industrial equipment manufacturer needs to extend SAP S/4HANA with an IoT predictive maintenance portal and mobile supplier app.',
        workflowSteps: [
          'Enterprise signs a CPEA consumption agreement for SAP BTP.',
          'Platform team sets up Global Account with directories for Development, QA, and Production.',
          'Developers build IoT portal using CAP (App Dev Pillar) and connect to S/4HANA via Cloud Integration (Integration Pillar).',
          'Equipment sensor telemetry streams into SAP HANA Cloud Vector Engine (Data & Analytics Pillar).',
          'SAP Joule Copilot summarizes equipment failure risks for field service technicians (Business AI Pillar).',
        ],
        businessImpact:
          'Combines all four BTP pillars under one unified contract, saving €1.2M in annual third-party software licensing.',
      },
      practicalActivity:
        'Log in to your BTP Cockpit, navigate to the Entitlements tab, and inspect the difference between "Service Plans" and "Quotas".',
      keyTakeaways: [
        'SAP BTP unites Application Development, Integration, Data & Analytics, and Business AI into one business platform.',
        'Consumption models (CPEA and Pay-As-You-Go) allow paying only for what you consume with zero license lock-in.',
        'Always choose Free Tier over temporary Trial accounts for professional proof-of-concept projects.',
      ],
      quizQuestions: [
        {
          id: 'mod-1-2-q1',
          question:
            'Which of the following describes the primary advantage of SAP BTP Free Tier over traditional SAP BTP Trial accounts?',
          options: [
            {
              id: 'a',
              text: 'Free Tier accounts operate in real production data centers, never expire automatically, and can be seamlessly upgraded to paid production plans with zero data loss or re-migration.',
              isCorrect: true,
              explanation:
                'Correct. Free Tier provides production infrastructure that you simply flip to paid when ready to launch.',
            },
            {
              id: 'b',
              text: 'Free Tier gives unlimited free access to 500 terabytes of HANA memory.',
              isCorrect: false,
              explanation:
                'Incorrect. Free Tier has strict memory and CPU quotas (e.g. 1 HANA instance with 32GB RAM).',
            },
            {
              id: 'c',
              text: 'Free Tier accounts do not require any user login or email address.',
              isCorrect: false,
              explanation:
                'Incorrect. Free Tier requires standard SAP user identity credentials.',
            },
            {
              id: 'd',
              text: 'Free Tier is only available to employees who work directly at SAP headquarters.',
              isCorrect: false,
              explanation:
                'Incorrect. Free Tier is publicly available to any customer, partner, or independent developer.',
            },
          ],
        },
        {
          id: 'mod-1-2-q2',
          question:
            'Under which SAP BTP pillar does the SAP Cloud Application Programming (CAP) Model reside?',
          options: [
            {
              id: 'a',
              text: 'Application Development and Automation',
              isCorrect: true,
              explanation:
                'Correct. CAP is the core framework in the Application Development pillar for building enterprise cloud services.',
            },
            {
              id: 'b',
              text: 'Data and Analytics',
              isCorrect: false,
              explanation:
                'Incorrect. Data and Analytics houses HANA Cloud, Datasphere, and SAC.',
            },
            {
              id: 'c',
              text: 'Integration Suite',
              isCorrect: false,
              explanation:
                'Incorrect. Integration Suite houses Cloud Integration, API Management, and Event Mesh.',
            },
            {
              id: 'd',
              text: 'Business AI',
              isCorrect: false,
              explanation:
                'Incorrect. Business AI houses Generative AI Hub and Joule Copilot.',
            },
          ],
        },
        {
          id: 'mod-1-2-q3',
          question:
            'How does the Cloud Platform Enterprise Agreement (CPEA) consumption model function commercially?',
          options: [
            {
              id: 'a',
              text: 'Customers commit to an annual cloud credit budget upfront at a volume discount, and monthly service usage burns down the prepaid credits.',
              isCorrect: true,
              explanation:
                'Correct. CPEA is a prepaid consumption contract that provides financial flexibility and volume discounts.',
            },
            {
              id: 'b',
              text: 'Customers must pay €10,000 every time an HTTP request is made to an API.',
              isCorrect: false,
              explanation:
                'Incorrect. APIs cost fractions of a cent per thousand calls.',
            },
            {
              id: 'c',
              text: 'Customers receive free hardware servers shipped to their corporate headquarters.',
              isCorrect: false,
              explanation:
                'Incorrect. BTP is cloud software; no physical servers are shipped.',
            },
            {
              id: 'd',
              text: 'Customers cannot change which services they use for 5 years.',
              isCorrect: false,
              explanation:
                'Incorrect. CPEA allows spinning up and shutting down any BTP service dynamically.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-1-3',
      code: '1.3',
      phaseId: 'phase-1',
      title: 'Account Navigation',
      tagline: 'Global Accounts, Directories, Subaccounts, Spaces, and Entitlements',
      summary:
        'Master the multi-tenant hierarchical account model of SAP BTP. Learn how Global Accounts, Directories, Subaccounts, and Spaces partition workloads, manage service quotas, and isolate enterprise environments.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'The 4-level account hierarchy: Global Account &rarr; Directories &rarr; Subaccounts &rarr; Cloud Foundry Spaces.',
        'Global Account: Enterprise commercial contract, customer ID, global quotas, and administrative root.',
        'Directories: Grouping subaccounts by business unit (e.g., HR vs Supply Chain) or region, enabling shared quota management and billing attribution.',
        'Subaccounts: Region-bound, hyperscaler-specific tenant environments providing independent security, entitlements, and user trust configurations.',
        'Cloud Foundry Spaces: Granular execution environments within a subaccount (e.g., "dev", "qa", "prod") where microservices run.',
        'Entitlement Management: How administrators distribute platform quotas (e.g., 2 units of HANA, 8GB Cloud Foundry memory) from the global pool to specific subaccounts.',
        'The btp CLI and cf CLI: Command-line navigation and automation of the account hierarchy.',
      ],
      practicalImplementation:
        'Use the `btp` CLI and `cf` CLI to target a subaccount and space. Check allocated memory quotas using `cf org` and list assigned service plans with `cf marketplace`.',
      masteryCheck:
        'Explain why a company needs separate subaccounts for Development, QA, and Production. Given a quota allocation error during `cf push`, diagnose the missing entitlement in the BTP Cockpit.',
      learningObjectives: [
        'Draw and explain the 4-tier SAP BTP account structure.',
        'Distinguish between the purpose of a Subaccount (region/security bound) and a Space (application runtime bound).',
        'Configure and manage Entitlements and Service Quotas in the BTP Cockpit.',
        'Target environments using the btp CLI and cf CLI.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Four-Tier Account Architecture',
          subtitle: 'How enterprises organize resources securely',
          explanation:
            'To prevent developers from accidentally altering production databases and to attribute cloud costs accurately, SAP BTP structures resources into four hierarchical levels: 1) Global Account: Represents the master corporate contract with SAP. 2) Directories: Optional structural folders inside the global account to group subaccounts by geography or business line. 3) Subaccount: The fundamental operational unit. A subaccount is bound to a single geographic region (e.g., AWS Frankfurt) and contains its own service entitlements, custom identity trust, and network connections. 4) Spaces: Partitioning inside the Cloud Foundry runtime (e.g., "dev", "test") where microservices, routes, and database bindings exist.',
          keyIdea:
            'A Global Account holds the contract; Subaccounts hold the cloud region and entitlements; Spaces run the applications.',
          taskInstruction: 'Review the hierarchical diagram below to see how environments nest.',
          hint: 'Development, Quality Assurance, and Production should always live in separate subaccounts, not just separate spaces.',
        },
        {
          stepNumber: 2,
          title: 'Directories: Centralized Governance and Cost Attribution',
          subtitle: 'Managing multi-team cloud footprints',
          explanation:
            'In a massive multinational enterprise with 50 subaccounts across 10 business divisions (Logistics, Human Resources, Retail, Manufacturing), managing individual subaccounts becomes overwhelming. Directories solve this by grouping related subaccounts. Furthermore, administrators can enable "Directory Entitlements," assigning a block of cloud credits and memory quotas to a Directory (e.g., "European Logistics Division"). The division administrator can then distribute those quotas among their own development and testing subaccounts without needing Global Account administrator rights.',
          keyIdea:
            'Directories enable decentralized governance: division leads manage their own quotas within a central corporate boundary.',
          taskInstruction: 'Understand how directories partition corporate billing.',
          hint: 'Directories can be nested up to 7 levels deep in enterprise accounts.',
        },
        {
          stepNumber: 3,
          title: 'Subaccounts: Regional and Security Isolation',
          subtitle: 'The primary building block of BTP workloads',
          explanation:
            'Every subaccount is physically deployed in a single cloud region (e.g., `eu10` AWS Frankfurt, `us10` Azure US East). Crucially, subaccounts provide complete security isolation: 1) Identity Trust: Subaccount A can connect to Corporate Entra ID, while Subaccount B connects to a separate partner directory. 2) Cloud Connector: An on-premise ERP can be linked exclusively to Subaccount Prod without exposing it to Subaccount Dev. 3) Entitlements: If Subaccount Dev runs out of memory, it has zero impact on Subaccount Prod.',
          keyIdea:
            'Never mix Development and Production workloads in the same subaccount; subaccounts are the ultimate security and compliance boundary.',
          taskInstruction: 'Inspect the subaccount properties in your BTP Cockpit.',
          warning: 'Once created, you cannot change the geographic region of a subaccount; you must create a new subaccount in the desired region.',
        },
        {
          stepNumber: 4,
          title: 'Entitlements and Quotas: Allocating Platform Fuel',
          subtitle: 'Why services do not appear in the marketplace automatically',
          explanation:
            'A common beginner mistake is logging into a brand-new subaccount, opening the Service Marketplace, and wondering why SAP HANA Cloud or CAP runtimes are missing. Before a subaccount can use any service, a Global Account Administrator must explicitly assign an "Entitlement" (and a numerical Quota) to that subaccount. For example, if your company purchased 4 units of SAP HANA Cloud, the Global Account has 4 units in its pool. The administrator assigns 1 unit to Subaccount Dev and 3 units to Subaccount Prod. Only after the entitlement is saved will the service appear in that subaccount\'s Service Marketplace.',
          keyIdea:
            'If a service is missing from your subaccount Service Marketplace, you are missing the entitlement in the BTP Cockpit.',
          taskInstruction: 'Review the entitlement configuration in the code example below.',
          hint: 'Always allocate entitlements before attempting to deploy Multi-Target Applications (MTAs).',
        },
        {
          stepNumber: 5,
          title: 'CLI Navigation: The btp CLI and cf CLI',
          subtitle: 'Automating account operations from your terminal',
          explanation:
            'While administrators use the web Cockpit, automated CI/CD pipelines use command-line tools: 1) `btp CLI`: Operates at the Global Account, Directory, and Subaccount level (e.g., `btp list accounts/subaccount`, `btp assign security/role-collection`). 2) `cf CLI`: Operates inside a specific subaccount\'s Cloud Foundry runtime at the Org and Space level (e.g., `cf login -a https://api.cf.eu10.hana.ondemand.com`, `cf target -o my-org -s dev`, `cf apps`).',
          keyIdea:
            'Use `btp CLI` to manage subaccounts and entitlements; use `cf CLI` to deploy apps and manage microservices.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Run `cf target` to quickly check which Organization and Space you are currently logged into.',
        },
      ],
      diagramType: 'btp-hierarchy',
      analogy: {
        concept: 'The 4-Tier BTP Account Hierarchy',
        analogy: 'Corporate Headquarters, Skyscrapers, Floors, and Offices',
        explanation:
          'A Global Account is like the Corporate Headquarters holding the commercial deed to real estate across the world. A Directory is an individual Skyscraper owned by the company (e.g., "The Tokyo Operations Tower" or "The Frankfurt Logistics Tower"). A Subaccount is an individual secured Floor in that skyscraper (e.g., Floor 14: Manufacturing Development, with its own electronic card key reader, regional power supply, and fire doors). Inside that floor, Spaces are individual office rooms (e.g., Room 14A: "dev team cubicles", Room 14B: "qa test lab"). The workers in Room 14A can collaborate freely, but they cannot enter Floor 18 (Production) without separate security clearance.',
        transition:
          'Where secured floors isolate corporate departments, SAP BTP subaccounts isolate development, testing, and production environments across global regions.',
      },
      conceptExplanation: {
        whatItIs:
          'The SAP BTP account structure is a multi-tier governance model comprising Global Accounts, Directories, Subaccounts, and Runtime Spaces that allows organizations to isolate workloads, delegate administration, and manage cloud spending.',
        whyItExists:
          'Enterprises must adhere to strict regulatory compliance: development code must never touch production data, and different subsidiaries must receive itemized cloud billing statements.',
        problemSolved:
          'Prevents accidental production outages caused by development errors, enforces least-privilege security administration, and provides granular visibility into cloud resource consumption.',
        howItWorks:
          'The customer signs a contract resulting in a Global Account. Administrators create subaccounts in specific hyperscaler regions, allocate entitlements from the central pool, and enable runtime environments (Cloud Foundry or Kyma). Inside Cloud Foundry, spaces provide isolated execution sandboxes for microservices.',
        btpFit:
          'All resources, databases, user roles, destinations, and applications on SAP BTP are scoped to specific subaccounts and spaces.',
      },
      jargonTerms: [
        {
          term: 'Global Account',
          simpleMeaning: 'The top-level commercial account representing your enterprise contract with SAP.',
          familiarEquivalent: 'The master corporate credit line and headquarters lease.',
        },
        {
          term: 'Subaccount',
          simpleMeaning: 'A region-specific cloud environment with isolated security and allocated service quotas.',
          familiarEquivalent: 'A secure regional branch office with its own bank account and staff.',
        },
        {
          term: 'Space',
          simpleMeaning: 'A work area inside a Cloud Foundry environment where applications and services run.',
          familiarEquivalent: 'A room or department inside an office building (e.g., Development Room vs Test Room).',
        },
        {
          term: 'Entitlement',
          simpleMeaning: 'Permission granted to a subaccount to use a specific service plan up to a defined quota.',
          familiarEquivalent: 'A fuel allowance voucher permitting a branch office to pump 100 gallons of gas.',
        },
      ],
      technicalExample: {
        title: 'Command Line Session: Navigating BTP Hierarchy with cf CLI',
        language: 'bash',
        code: `# 1. Authenticate against the regional Cloud Foundry API endpoint
cf login -a https://api.cf.eu10.hana.ondemand.com -u developer@enterprise.com

# 2. Select the Organization (mapped 1:1 to Subaccount) and Space
cf target -o my-enterprise-subaccount_org -s dev

# 3. Verify current targeting context
cf target
# Output:
# API endpoint:   https://api.cf.eu10.hana.ondemand.com
# User:           developer@enterprise.com
# Org:            my-enterprise-subaccount_org
# Space:          dev

# 4. Check available service plans and quotas in this space
cf marketplace

# 5. List running microservices and memory consumption
cf apps`,
        purpose:
          'Demonstrates professional terminal commands used by DevOps engineers to target Cloud Foundry subaccounts, inspect spaces, and review service entitlements.',
        lineExplanations: [
          { lines: '2', explanation: 'cf login: Authenticates developer against the regional AWS Frankfurt endpoint (eu10).' },
          { lines: '5', explanation: 'cf target: Sets active context to the target Org (subaccount) and Space (dev).' },
          { lines: '14', explanation: 'cf marketplace: Displays services entitled to this subaccount by the Global Administrator.' },
          { lines: '17', explanation: 'cf apps: Lists all deployed container instances, health states, and memory allocations.' },
        ],
        expectedOutput:
          'Terminal context set to target space; ready to deploy or inspect microservices.',
        commonMistakes: [
          'Attempting to deploy without targeting a space first, resulting in "No space targeted" errors.',
          'Logging into the wrong regional endpoint (e.g. logging into us10 when your subaccount is in eu10).',
        ],
      },
      businessScenario: {
        title: 'Enterprise Multi-Tier DTAP Environment Setup',
        context:
          'A pharmaceutical multinational must establish a strictly regulated DTAP (Development, Testing, Acceptance, Production) architecture for an FDA-regulated drug trial portal.',
        workflowSteps: [
          'Global Administrator creates 3 separate subaccounts: `Pharma-Dev` (AWS Frankfurt), `Pharma-QA` (AWS Frankfurt), `Pharma-Prod` (AWS Frankfurt).',
          'Production subaccount is allocated 32GB Cloud Foundry memory and 1 HANA Cloud unit; Dev is allocated 8GB memory and Free Tier HANA.',
          'Production subaccount enables strict corporate Entra ID trust and audit logging; Dev subaccount allows developer test users.',
          'CI/CD pipeline builds tested code from Dev, validates in QA, and deploys to Prod with zero possibility of cross-contamination.',
        ],
        businessImpact:
          'Achieves 100% regulatory compliance with FDA electronic records mandates and prevents untested development experiments from impacting production drug delivery.',
      },
      practicalActivity:
        'Open your terminal and execute `cf target` to inspect your active Cloud Foundry Organization and Space.',
      keyTakeaways: [
        'Global Account holds the contract; Subaccounts provide regional and security boundaries; Spaces run apps.',
        'Always maintain separate subaccounts for Development, QA, and Production.',
        'Services will not appear in a subaccount marketplace until an administrator assigns the Entitlement and Quota.',
      ],
      quizQuestions: [
        {
          id: 'mod-1-3-q1',
          question:
            'A developer opens the Service Marketplace inside their BTP Subaccount to create an SAP HANA Cloud database, but the HANA Cloud tile is completely missing. What is the root cause?',
          options: [
            {
              id: 'a',
              text: 'The Global Account Administrator has not yet allocated an Entitlement (quota) for SAP HANA Cloud to this specific Subaccount.',
              isCorrect: true,
              explanation:
                'Correct. In BTP, services only appear in a subaccount\'s marketplace after an administrator allocates an entitlement from the global pool.',
            },
            {
              id: 'b',
              text: 'The developer web browser has an ad-blocker that blocks databases.',
              isCorrect: false,
              explanation:
                'Incorrect. Ad-blockers do not filter BTP marketplace services.',
            },
            {
              id: 'c',
              text: 'SAP HANA Cloud can only be created using the Linux command line.',
              isCorrect: false,
              explanation:
                'Incorrect. HANA Cloud is routinely created via both the BTP Cockpit UI and the CLI.',
            },
            {
              id: 'd',
              text: 'The developer computer does not have enough physical RAM to display the icon.',
              isCorrect: false,
              explanation:
                'Incorrect. The Cockpit runs in the cloud; local RAM has zero impact on available services.',
            },
          ],
        },
        {
          id: 'mod-1-3-q2',
          question:
            'Why is it considered a dangerous anti-pattern to deploy both Development and Production applications inside the same BTP Subaccount?',
          options: [
            {
              id: 'a',
              text: 'Because subaccounts share service entitlements, destinations, and identity trust: a crash or quota exhaustion in development could bring down production, and developers might accidentally access real production databases.',
              isCorrect: true,
              explanation:
                'Correct. Subaccounts are the primary security and resource boundary. Production should always be completely isolated in its own subaccount.',
            },
            {
              id: 'b',
              text: 'Because BTP subaccounts can only hold a maximum of 1 application.',
              isCorrect: false,
              explanation:
                'Incorrect. A subaccount can hold dozens of applications.',
            },
            {
              id: 'c',
              text: 'Because Cloud Foundry deletes all applications at midnight if they share a subaccount.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud Foundry never deletes applications automatically.',
            },
            {
              id: 'd',
              text: 'Because development code runs 10 times slower if placed near production code.',
              isCorrect: false,
              explanation:
                'Incorrect. Execution speed is governed by container CPU allocation, not proximity.',
            },
          ],
        },
        {
          id: 'mod-1-3-q3',
          question:
            'Which command-line interface tool is used to target Cloud Foundry Organizations and Spaces to push application containers?',
          options: [
            {
              id: 'a',
              text: 'cf CLI (Cloud Foundry CLI)',
              isCorrect: true,
              explanation:
                'Correct. The cf CLI manages Cloud Foundry runtimes, apps, spaces, and services.',
            },
            {
              id: 'b',
              text: 'git CLI',
              isCorrect: false,
              explanation:
                'Incorrect. Git manages source code version control, not Cloud Foundry runtime targeting.',
            },
            {
              id: 'c',
              text: 'npm CLI',
              isCorrect: false,
              explanation:
                'Incorrect. npm manages Node.js JavaScript packages.',
            },
            {
              id: 'd',
              text: 'docker CLI',
              isCorrect: false,
              explanation:
                'Incorrect. While Docker builds container images, the cf CLI is the standard tool for managing Cloud Foundry environments on BTP.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-1-4',
      code: '1.4',
      phaseId: 'phase-1',
      title: 'Identity and Access',
      tagline: 'SAP Cloud Identity Services (IAS), IdP Federation, and Role Collections',
      summary:
        'Master enterprise identity and access management on SAP BTP. Understand user types, the role of SAP Cloud Identity Services (IAS), Single Sign-On (SSO) via SAML 2.0 and OpenID Connect, and how to assign Role Collections for authorization.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'User classification in SAP BTP: Platform users (developers/admins managing BTP resources) vs Business users (end-users consuming applications).',
        'Shadow users: How BTP creates local shadow records to map external identity tokens to local authorization assignments.',
        'SAP Cloud Identity Services: Identity Authentication (IAS - the corporate IdP proxy) and Identity Provisioning (IPS - automated user syncing).',
        'Identity Federation: Connecting corporate directories (Microsoft Entra ID, Okta, Ping Federate) to SAP BTP via SAML 2.0 and OpenID Connect (OIDC).',
        'Authorization mechanics: Scopes (code level) &rarr; Role Templates &rarr; Roles &rarr; Role Collections (assigned to users or user groups).',
        'Emergency access: The Default Identity Provider (SAP ID Service) and emergency break-glass administrator procedures.',
      ],
      practicalImplementation:
        'Configure a custom Trust Configuration in the BTP Cockpit. Create a custom Role Collection, add technical application roles to it, and map a corporate user group to the Role Collection.',
      masteryCheck:
        'Explain the exact authentication flow when an employee logs into a BTP Fiori Launchpad using corporate Microsoft Entra ID via SAP IAS. Diagnose why a user who successfully logged in sees an empty Launchpad with zero application tiles.',
      learningObjectives: [
        'Distinguish between Platform Users and Business Users in SAP BTP.',
        'Explain the role of SAP Cloud Identity Services (IAS) as an enterprise IdP proxy.',
        'Map technical application scopes to user Role Collections.',
        'Troubleshoot missing authorization errors where users authenticate successfully but lack access permissions.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Platform Users vs Business Users',
          subtitle: 'The two fundamentally different user categories in BTP',
          explanation:
            'A critical distinction in SAP BTP administration is between: 1) Platform Users: Developers, system administrators, and DevOps engineers who log into the BTP Cockpit or use the CLI to deploy microservices, allocate entitlements, create databases, and configure destinations. 2) Business Users: Employees, managers, customers, and suppliers who never see the BTP Cockpit; they log into the actual custom web applications (e.g., an Employee Leave Portal or Supplier Invoice App) running on BTP. By default, Platform users authenticate via SAP ID Service, while Business users authenticate via Corporate Identity Providers.',
          keyIdea:
            'Platform users manage the infrastructure in the BTP Cockpit; Business users consume business applications running on the platform.',
          taskInstruction: 'Review the user type classification table in the concept explanation.',
          hint: 'Never give business users platform administrator privileges.',
        },
        {
          stepNumber: 2,
          title: 'SAP Cloud Identity Services: IAS and IPS',
          subtitle: 'The modern enterprise identity broker',
          explanation:
            'Enterprise clients already have corporate directories (Microsoft Entra ID/Azure AD, Okta, Ping Identity). If a company has 20 BTP subaccounts, configuring SAML trust between every subaccount and Entra ID requires 20 separate connections. SAP Cloud Identity Services solves this by acting as a central broker: 1) Identity Authentication Service (IAS): A single proxy IdP. All BTP subaccounts trust IAS once, and IAS federates outward to Microsoft Entra ID. 2) Identity Provisioning Service (IPS): Automatically synchronizes users and groups from HR systems (SAP SuccessFactors or Active Directory) into cloud applications on schedule using SCIM protocols.',
          keyIdea:
            'SAP IAS acts as the single enterprise identity broker between all BTP applications and your corporate identity provider.',
          taskInstruction: 'Trace the identity federation flow in the diagram below.',
          hint: 'Using IAS means corporate employees use their existing company password and multi-factor authentication (MFA).',
        },
        {
          stepNumber: 3,
          title: 'Shadow Users: Local Authorization Mapping',
          subtitle: 'How BTP knows who you are after external login',
          explanation:
            'When an external corporate user logs into SAP BTP via Microsoft Entra ID, BTP does not copy the user\'s password. Instead, after Entra ID validates the login, it issues a signed SAML or OIDC token containing the user\'s email. When BTP receives this token, it automatically generates a lightweight "Shadow User" record in the subaccount database. This shadow user stores zero passwords; it merely holds the user\'s email and links them to local BTP Role Collections.',
          keyIdea:
            'Shadow users allow BTP to attach local application authorization roles to external corporate identities.',
          taskInstruction: 'Inspect the shadow user list under Security > Users in your BTP Cockpit.',
          warning: 'Deleting a shadow user revokes their local role assignments without deleting their corporate Active Directory account.',
        },
        {
          stepNumber: 4,
          title: 'Authorization Architecture: From Scopes to Role Collections',
          subtitle: 'How permissions flow from developer code to human users',
          explanation:
            'Permissions on SAP BTP follow a 4-step hierarchy: 1) Scope (Code level): Developers define technical permissions in `xs-security.json` (e.g., `$XSAPPNAME.Viewer`, `$XSAPPNAME.Approver`). 2) Role Template: Groups related scopes in code. 3) Role: An instance of a template within a subaccount. 4) Role Collection (Cockpit level): A composite bundle of roles given a user-friendly name (e.g., "Purchasing_Manager_Collection"). System administrators assign Role Collections either directly to individual users or dynamically to corporate user groups (e.g., all members of Entra ID group "Finance-EU").',
          keyIdea:
            'Developers define technical scopes in code; administrators assign business Role Collections in the BTP Cockpit.',
          taskInstruction: 'Review the technical example below to see how a role collection is defined.',
          hint: 'Mapping Role Collections to corporate user groups automates onboarding when new employees join the company.',
        },
        {
          stepNumber: 5,
          title: 'Diagnosing Common Authorization Defects',
          subtitle: 'Solving "I logged in, but my screen is completely blank"',
          explanation:
            'The single most common support ticket in new BTP deployments is: "A user successfully entered their password and passed multi-factor authentication, but when they open the Fiori Launchpad, the screen is completely empty with no tiles." The root cause is almost always an authorization gap: the user was successfully Authenticated by the IdP (identity verified), but the administrator forgot to assign the required Role Collection to their shadow user. The app checks for required scopes, finds none, and hides all application tiles.',
          keyIdea:
            'Successful login proves Authentication; seeing application data requires Authorization (Role Collection assignment).',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Always verify both authentication status and role collection assignments during user onboarding.',
        },
      ],
      diagramType: 'xsuaa-oauth',
      analogy: {
        concept: 'Identity Federation and Role Collections',
        analogy: 'Corporate Office Security Badge and Floor Access Keys',
        explanation:
          'Imagine visiting a secure corporate headquarters. The Main Lobby Receptionist is the Identity Provider (IAS / Entra ID): you show your government passport, they verify your identity, and hand you a photo visitor badge (Authentication). Now you approach the elevators to Floor 8 (Finance). The elevator scanner does not care who you are; it checks whether your badge has the "Floor 8" radio frequency chip active (Authorization / Scopes). If the receptionist forgot to encode the "Finance Floor Collection" onto your badge, the elevator refuses to move, even though your badge has your verified photo on it. Role Collections are the encoded floor permissions loaded onto your digital badge.',
        transition:
          'Where the elevator checks badge radio chips, SAP BTP microservices check scopes inside your JWT token before granting access to enterprise data.',
      },
      conceptExplanation: {
        whatItIs:
          'Identity and Access Management (IAM) on SAP BTP is the framework of policies and technologies that ensures corporate users have appropriate identity verification (Single Sign-On) and authorized access to enterprise applications and data.',
        whyItExists:
          'Large corporations cannot manage individual usernames and passwords across hundreds of separate cloud applications; doing so causes security vulnerabilities, credential fatigue, and severe compliance violations.',
        problemSolved:
          'Enables Single Sign-On (SSO) using existing corporate credentials, automates user lifecycle provisioning, and enforces least-privilege role-based access control (RBAC).',
        howItWorks:
          'When a user opens an application, the SAP Approuter redirects the browser to SAP Cloud Identity Services (IAS). IAS federates with the corporate IdP (e.g., Microsoft Entra ID). Upon successful login, an OAuth JWT token carrying user claims is generated. The BTP Authorization service matches these claims against assigned Role Collections and authorizes access to backend services.',
        btpFit:
          'Security in BTP is enforced through the SAP Authorization and Trust Management service (XSUAA) and SAP Cloud Identity Services.',
      },
      jargonTerms: [
        {
          term: 'Identity Provider (IdP)',
          simpleMeaning: 'The trusted service that stores user credentials and authenticates identities (e.g., Microsoft Entra ID).',
          familiarEquivalent: 'The government passport issuing office.',
        },
        {
          term: 'Role Collection',
          simpleMeaning: 'A bundle of individual technical roles assigned to users in the BTP Cockpit.',
          familiarEquivalent: 'A master key ring holding keys to the office, conference room, and supply closet.',
        },
        {
          term: 'Single Sign-On (SSO)',
          simpleMeaning: 'Logging in once with corporate credentials and accessing all permitted applications without re-typing passwords.',
          familiarEquivalent: 'A universal season pass that enters all rides at a theme park.',
        },
        {
          term: 'Shadow User',
          simpleMeaning: 'A local user reference record in BTP used to attach authorization roles to external corporate logins.',
          familiarEquivalent: 'A local library card linked to your primary government ID.',
        },
      ],
      technicalExample: {
        title: 'BTP Application Security Descriptor (xs-security.json)',
        language: 'json',
        code: `{
  "xsappname": "employee-expenses",
  "tenant-mode": "dedicated",
  "description": "Security descriptor for Employee Expense Management App",
  "scopes": [
    {
      "name": "$XSAPPNAME.ExpenseViewer",
      "description": "Permission to view submitted expense reports"
    },
    {
      "name": "$XSAPPNAME.ExpenseApprover",
      "description": "Permission to approve or reject executive expense reports"
    }
  ],
  "role-templates": [
    {
      "name": "ExpenseViewerRole",
      "description": "Role for staff employees",
      "scope-references": ["$XSAPPNAME.ExpenseViewer"]
    },
    {
      "name": "ExpenseApproverRole",
      "description": "Role for department managers",
      "scope-references": [
        "$XSAPPNAME.ExpenseViewer",
        "$XSAPPNAME.ExpenseApprover"
      ]
    }
  ],
  "role-collections": [
    {
      "name": "Expense_Manager_Collection",
      "description": "Role collection assigned to corporate managers",
      "role-template-references": ["$XSAPPNAME.ExpenseApproverRole"]
    }
  ]
}`,
        purpose:
          'Illustrates a production xs-security.json descriptor defining technical scopes, packaging them into role templates, and pre-defining role collections for Cockpit administrators.',
        lineExplanations: [
          { lines: '2', explanation: 'xsappname: Unique identifier for this security microservice instance.' },
          { lines: '5-14', explanation: 'scopes: Granular technical permissions checked by backend Node.js CAP handlers.' },
          { lines: '15-28', explanation: 'role-templates: Packages scopes into functional roles.' },
          { lines: '29-35', explanation: 'role-collections: Creates the administrator-assignable bundle in the BTP Cockpit.' },
        ],
        expectedOutput:
          'BTP Cockpit automatically displays "Expense_Manager_Collection" under Role Collections, ready for user assignment.',
        commonMistakes: [
          'Using spaces or special characters in scope names.',
          'Hardcoding specific user emails inside code instead of using abstract Role Collections.',
        ],
      },
      businessScenario: {
        title: 'Corporate Merger Single Sign-On Integration',
        context:
          'An aerospace corporation acquires a subsidiary company with 10,000 employees and needs to grant them access to BTP procurement systems immediately.',
        workflowSteps: [
          'IT Administrator connects acquired company\'s Okta directory to SAP Cloud Identity Services (IAS) via SAML 2.0.',
          'Employees log in using their existing email addresses without creating new passwords.',
          'IAS passes the SAML assertion to SAP BTP, generating shadow user records.',
          'Administrator maps the Okta user group "Procurement-Staff" directly to the BTP Role Collection "Buyer_Collection".',
          'All 10,000 employees gain immediate, secure access to approved procurement catalogs on day one.',
        ],
        businessImpact:
          'Eliminates weeks of manual user account creation and maintains 100% centralized security compliance during corporate integration.',
      },
      practicalActivity:
        'Launch Practice Drill "Securing Routes with JWT" (/practice?tab=drills&id=sec-jwt-xsuaa) to test role-based access control.',
      keyTakeaways: [
        'Platform users manage BTP infrastructure; Business users consume business applications.',
        'SAP Cloud Identity Services (IAS) acts as a universal broker between BTP and corporate identity providers.',
        'Scopes are defined in code; Role Collections are assigned to users in the BTP Cockpit.',
      ],
      quizQuestions: [
        {
          id: 'mod-1-4-q1',
          question:
            'A company employee logs into an SAP BTP application using their corporate email and password via Microsoft Entra ID. The login is successful, but the application displays an error: "403 Forbidden: Missing required scope". What is the most likely cause?',
          options: [
            {
              id: 'a',
              text: 'The employee authenticated successfully, but the BTP administrator has not assigned the required Role Collection containing the application scopes to their shadow user.',
              isCorrect: true,
              explanation:
                'Correct. Login proves identity (Authentication), but accessing data requires authorization roles (Role Collections) assigned to the user.',
            },
            {
              id: 'b',
              text: 'The employee typed their corporate password backwards.',
              isCorrect: false,
              explanation:
                'Incorrect. If the password was wrong, login would fail with an authentication error (401).',
            },
            {
              id: 'c',
              text: 'The Cloud Foundry router ran out of IP addresses.',
              isCorrect: false,
              explanation:
                'Incorrect. Router issues cause 502/503 errors, not 403 Forbidden.',
            },
            {
              id: 'd',
              text: 'BTP applications do not allow employees to use Microsoft software.',
              isCorrect: false,
              explanation:
                'Incorrect. BTP fully federates with Microsoft Entra ID.',
            },
          ],
        },
        {
          id: 'mod-1-4-q2',
          question:
            'What is the function of a "Shadow User" in SAP BTP subaccount security?',
          options: [
            {
              id: 'a',
              text: 'It is a local reference record in the subaccount that stores zero passwords but links an external corporate identity to local BTP Role Collections.',
              isCorrect: true,
              explanation:
                'Correct. Shadow users represent authenticated external identities locally to assign authorization permissions.',
            },
            {
              id: 'b',
              text: 'It is a hidden hacker account installed by malicious software.',
              isCorrect: false,
              explanation:
                'Incorrect. Shadow user is official standard SAP BTP identity terminology.',
            },
            {
              id: 'c',
              text: 'It is an anonymous account used for public website browsing.',
              isCorrect: false,
              explanation:
                'Incorrect. Shadow users represent explicitly authenticated corporate users.',
            },
            {
              id: 'd',
              text: 'It is a backup copy of the database administrator password.',
              isCorrect: false,
              explanation:
                'Incorrect. Shadow users have zero to do with database passwords.',
            },
          ],
        },
        {
          id: 'mod-1-4-q3',
          question:
            'How are technical application scopes (defined in xs-security.json) connected to human corporate users in SAP BTP?',
          options: [
            {
              id: 'a',
              text: 'Scopes are grouped into Role Templates, which form Roles, which are packaged into Role Collections and assigned to users or corporate user groups in the BTP Cockpit.',
              isCorrect: true,
              explanation:
                'Correct. The hierarchy is: Scope &rarr; Role Template &rarr; Role &rarr; Role Collection &rarr; User.',
            },
            {
              id: 'b',
              text: 'Developers hardcode each employee personal email address directly inside the JavaScript source code.',
              isCorrect: false,
              explanation:
                'Incorrect. Hardcoding user emails in source code is a major security violation.',
            },
            {
              id: 'c',
              text: 'Users must type their required scopes into the browser URL bar every morning.',
              isCorrect: false,
              explanation:
                'Incorrect. Scopes are cryptographically embedded inside the JWT token by the server.',
            },
            {
              id: 'd',
              text: 'Scopes can only be assigned by printing a paper form and mailing it to SAP headquarters.',
              isCorrect: false,
              explanation:
                'Incorrect. Assignments are completely digital and managed via the BTP Cockpit or CLI.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-1-5',
      code: '1.5',
      phaseId: 'phase-1',
      title: 'Cloud Foundry (only)',
      tagline: 'Architecture, Diego Cells, Buildpacks, Droplets, and App Lifecycles',
      summary:
        'Master the Cloud Foundry runtime environment on SAP BTP. Understand Diego cell container orchestration, how buildpacks compile Node.js and Java code into immutable droplets, memory scaling, and application routing.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'Cloud Foundry runtime architecture: Cloud Controller (CC), Diego Brain and Auctioneer, Diego Cells (Garden containers), and Gorouter.',
        'The "cf push" deployment lifecycle: Source code upload &rarr; Buildpack staging &rarr; Droplet creation &rarr; Container execution &rarr; Health checks &rarr; Route registration.',
        'System buildpacks: How Cloud Foundry auto-detects Node.js (`package.json`) and Java (`pom.xml`), downloads runtimes, and compiles dependencies.',
        'Droplet anatomy: The compiled, immutable, runnable archive containing your application code, dependencies, and configured runtime.',
        'Application configuration: manifest.yml anatomy, memory limits (512M, 1G), CPU allocation, environment variables, and random-route generation.',
        'Scaling mechanics: Vertical scaling (increasing container RAM/disk) vs Horizontal scaling (increasing container instance count for high availability).',
        'Gorouter and network traffic: How incoming HTTPS requests are SSL-terminated and load-balanced across healthy container instances.',
        'Log aggregation: Inspecting live application output and system events using `cf logs app-name --recent`.',
      ],
      practicalImplementation:
        'Author an enterprise `manifest.yml` descriptor for a Cloud Foundry Node.js application specifying memory limits, environment variables, service bindings, and multiple instances. Execute `cf push` and inspect droplet staging logs.',
      masteryCheck:
        'Diagnose a failed Cloud Foundry deployment from terminal logs: identify whether an application crashed due to an out-of-memory (OOM) error, a missing buildpack, a missing service binding, or a health-check timeout.',
      learningObjectives: [
        'Trace the end-to-end lifecycle of an application from "cf push" to a live public URL.',
        'Explain how buildpacks construct immutable droplets from raw source code.',
        'Author production-ready manifest.yml configuration files with appropriate memory and instance quotas.',
        'Scale microservices horizontally and vertically using the cf CLI.',
        'Diagnose application startup crashes using cf logs and health checks.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Cloud Foundry Engine: Key Architectural Components',
          subtitle: 'What happens behind the scenes in BTP PaaS',
          explanation:
            'Cloud Foundry is the mature, enterprise-grade Platform as a Service (PaaS) engine powering SAP BTP. It consists of four core components: 1) Cloud Controller (CC): The brain that receives API commands (`cf push`), manages metadata, and coordinates deployment. 2) Diego Auctioneer and Brain: The scheduler that decides which physical server has available CPU and RAM to run your application. 3) Diego Cells: The worker servers running lightweight, isolated Garden Linux containers where your microservices actually execute. 4) Gorouter: The high-speed reverse proxy that receives incoming public HTTPS traffic, terminates SSL certificates, and load-balances requests across all healthy running container instances.',
          keyIdea:
            'You do not manage virtual machines; Cloud Foundry automatically schedules, runs, and load-balances your containers on Diego worker cells.',
          taskInstruction: 'Review the Cloud Foundry deployment diagram below to visualize the five stages.',
          hint: 'If a Diego Cell server catches fire, Cloud Foundry automatically restarts your containers on a different healthy cell.',
        },
        {
          stepNumber: 2,
          title: 'The "cf push" Lifecycle: From Source Code to Live URL',
          subtitle: 'The five mandatory staging phases',
          explanation:
            'When you type `cf push`, Cloud Foundry executes five precise stages: 1) Upload: Your local project code (excluding files in `.cfignore`) is compressed and uploaded to the Cloud Controller blobstore. 2) Staging (Buildpack): The Cloud Controller assigns a temporary staging container. An auto-detected Buildpack (e.g., Node.js buildpack) inspects `package.json`, installs production dependencies via `npm ci`, and compiles TypeScript. 3) Droplet Creation: The compiled code and runtime are packaged into an immutable tarball called a "Droplet." 4) Execution: Diego cells pull the droplet, unpack it into an isolated container, and execute the startup command (e.g., `npm start`). 5) Health Check & Route: The Gorouter polls the container port. Once the app responds with HTTP 200, the public URL is mapped and begins accepting traffic.',
          keyIdea:
            'A Droplet is the golden, immutable deployment artifact: it contains everything needed to launch container copies in seconds.',
          taskInstruction: 'Follow the terminal logs in the code example to identify where staging ends and droplet launch begins.',
          warning: 'If your application fails to bind to the assigned PORT within the health check timeout (typically 60-120 seconds), Cloud Foundry crashes and restarts the container.',
        },
        {
          stepNumber: 3,
          title: 'Application Manifests: manifest.yml Mastery',
          subtitle: 'Declarative deployment automation',
          explanation:
            'While you can pass flags to `cf push` on the command line, enterprise deployments automate settings using a `manifest.yml` file. Key attributes include: 1) `name`: The unique application name in the space. 2) `memory`: RAM allocated per container instance (e.g., `256M`, `1G`). 3) `instances`: Number of identical container copies (always >= 2 in production for high availability). 4) `buildpack`: Explicitly specifies the runtime (e.g., `nodejs_buildpack`). 5) `services`: Bound backing services (e.g., XSUAA, HANA database, destinations). 6) `env`: Environment variables passed to the application process.',
          keyIdea:
            'Always use a manifest.yml file so your deployment parameters are version-controlled and reproducible in CI/CD pipelines.',
          taskInstruction: 'Inspect the production manifest.yml file in the technical example below.',
          hint: 'Use `random-route: true` during development to prevent URL naming collisions with other developers.',
        },
        {
          stepNumber: 4,
          title: 'Scaling: Horizontal vs Vertical',
          subtitle: 'Adapting to fluctuating enterprise workloads',
          explanation:
            'When application traffic spikes, Cloud Foundry provides two scaling mechanisms: 1) Horizontal Scaling: Adding more container instances (`cf scale my-app -i 4`). This adds more parallel workers; Gorouter distributes traffic evenly across all 4 instances. Horizontal scaling provides zero downtime and high fault tolerance. 2) Vertical Scaling: Increasing the memory or disk capacity of each container (`cf scale my-app -m 1G`). Vertical scaling requires restarting the container so Diego can reallocate physical memory boundaries.',
          keyIdea:
            'Prefer Horizontal scaling (`-i`) for traffic surges; use Vertical scaling (`-m`) only when a single process requires more memory cache.',
          taskInstruction: 'Practice scaling an application using `cf scale`.',
          hint: 'Horizontal scaling is instant because new containers simply spin up from the existing cached droplet.',
        },
        {
          stepNumber: 5,
          title: 'Troubleshooting and Log Diagnostics',
          subtitle: 'The essential triage commands when deployments fail',
          explanation:
            'When an application fails to start (`crash` or `0/1 running`), professional developers run four diagnostic commands: 1) `cf logs app-name --recent`: Dumps the most recent stdout/stderr output from the container, revealing unhandled exceptions or missing environment variables. 2) `cf events app-name`: Displays system-level lifecycle events, highlighting out-of-memory (OOM) terminations (exit code 137). 3) `cf app app-name`: Shows current instance health, memory usage, and URL routes. 4) `cf env app-name`: Displays all bound credentials (`VCAP_SERVICES`) and environment variables.',
          keyIdea:
            'Always run `cf logs app-name --recent` first when an app crashes; it reveals the exact line of code that threw an unhandled exception.',
          taskInstruction: 'Complete the knowledge check questions below.',
          warning: 'Do not use `cf logs` without `--recent` unless you want to stream live logs in real-time.',
        },
      ],
      diagramType: 'cf-deployment',
      analogy: {
        concept: 'Cloud Foundry Staging, Buildpacks, and Droplets',
        analogy: 'The Commercial Bakery and Frozen Dough Kits',
        explanation:
          'When you type `cf push`, you are handing a recipe card (package.json) and dry ingredients (source code) to a master commercial bakery (Cloud Foundry Staging). The bakery chef (the Node.js Buildpack) inspects the recipe, realizes it needs specialized yeast and chocolate chips (npm dependencies), mixes the batter, bakes it to perfection, and freeze-dries it into a compact, sealed bakery kit (a Droplet). This frozen kit is shipped to 5 franchise stores across the city (Diego Cells). Each franchise can pop the kit into their microwave oven (Garden Container) and serve hot cookies in 10 seconds. If a franchise gets crowded with 1,000 customers, the manager orders 10 more frozen kits and opens 10 more counters instantly (horizontal scaling) without ever having to re-bake from scratch.',
        transition:
          'Where the frozen dough kit standardizes fast baking, the Cloud Foundry droplet standardizes instant container launching across global SAP BTP data centers.',
      },
      conceptExplanation: {
        whatItIs:
          'Cloud Foundry is an open-source, multi-cloud application Platform as a Service (PaaS) governed by the Cloud Foundry Foundation that automates the deployment, scaling, health-monitoring, and management of cloud applications.',
        whyItExists:
          'Manually provisioning virtual machines, configuring web server proxies (Nginx/Apache), installing runtime language patches, and setting up load balancers for dozens of microservices requires immense DevOps overhead.',
        problemSolved:
          'Allows developers to deploy code with a single command (`cf push`), automatically packages containers via buildpacks, provides automated self-healing and zero-downtime routing, and scales microservices on demand.',
        howItWorks:
          'Developers write code and declare dependencies. `cf push` uploads the code to the Cloud Controller. An automated buildpack downloads the runtime (Node.js/Java), installs packages, and compiles the code into an immutable Droplet. Diego cells launch the droplet inside isolated Garden Linux containers, and the Gorouter maps traffic to healthy instances.',
        btpFit:
          'Cloud Foundry is the primary and most widely adopted runtime environment on SAP BTP for hosting SAP CAP services, SAP Fiori applications, and enterprise microservices.',
      },
      jargonTerms: [
        {
          term: 'Buildpack',
          simpleMeaning: 'An automated compilation script that detects your programming language, downloads the runtime, and prepares the app.',
          familiarEquivalent: 'An automated assembly line worker who prepares ingredients for a chef.',
        },
        {
          term: 'Droplet',
          simpleMeaning: 'The compiled, immutable archive of your application ready to execute inside a container.',
          familiarEquivalent: 'A sealed frozen meal ready to be heated and served anywhere.',
        },
        {
          term: 'Diego Cell',
          simpleMeaning: 'A physical or virtual worker server that hosts and runs the actual application containers.',
          familiarEquivalent: 'A factory floor where multiple workers operate independent machine stations.',
        },
        {
          term: 'Gorouter',
          simpleMeaning: 'The high-speed networking router that routes incoming public web traffic to healthy containers.',
          familiarEquivalent: 'A traffic cop directing cars to open parking spaces.',
        },
        {
          term: 'manifest.yml',
          simpleMeaning: 'The YAML configuration file that defines deployment settings (memory, instances, services).',
          familiarEquivalent: 'The shipping manifest and assembly instructions for an overseas crate.',
        },
      ],
      technicalExample: {
        title: 'Production Cloud Foundry manifest.yml for SAP CAP Node.js Service',
        language: 'yaml',
        code: `# Production-Grade Cloud Foundry Manifest
---
applications:
  - name: sap-btp-order-service
    path: gen/srv
    buildpacks:
      - nodejs_buildpack
    memory: 512M
    disk_quota: 1024M
    instances: 2
    random-route: false
    routes:
      - route: order-service-prod.cfapps.eu10.hana.ondemand.com
    services:
      - xsuaa-auth-service
      - hana-cloud-db
      - destination-service
    env:
      NODE_ENV: production
      CDS_ENV: production
      OPTIMIZE_MEMORY: true
    health-check-type: http
    health-check-http-endpoint: /health
    timeout: 120`,
        purpose:
          'Demonstrates an enterprise production manifest.yml file configuring 2 instances for high availability, 512MB RAM, HTTP health checks, and bindings to XSUAA, HANA, and Destination services.',
        lineExplanations: [
          { lines: '4', explanation: 'name: Unique identifier for the microservice within the Cloud Foundry space.' },
          { lines: '5', explanation: 'path: Points to pre-compiled production build directory (gen/srv) generated by "cds build".' },
          { lines: '8', explanation: 'memory: Allocates 512MB RAM; prevents process from exceeding container boundaries.' },
          { lines: '10', explanation: 'instances: 2 enforces multi-zone redundancy so Gorouter can route around single container restarts.' },
          { lines: '14-17', explanation: 'services: Cloud Foundry binds credentials (VCAP_SERVICES) for XSUAA, HANA, and Destinations automatically.' },
          { lines: '22-24', explanation: 'health-check-http-endpoint: Gorouter will not route public traffic until /health responds with 200 OK.' },
        ],
        expectedOutput:
          'Microservice deploys with zero downtime across 2 independent Diego cells in < 90 seconds.',
        commonMistakes: [
          'Setting instances to 1 in production, which causes downtime whenever Cloud Foundry performs rolling platform updates.',
          'Not setting health-check-http-endpoint, allowing broken containers to receive customer traffic.',
          'Allocating too little memory (e.g., 64M), causing immediate container crashes with exit code 137 (Out Of Memory).',
        ],
      },
      businessScenario: {
        title: 'Zero-Downtime Rolling Update for Airline Reservation Microservice',
        context:
          'A global airline needs to release a critical hotfix to its seat-reservation microservice running on SAP BTP without disconnecting thousands of active booking passengers.',
        workflowSteps: [
          'Developer commits hotfix to Git; CI/CD pipeline runs tests and executes `cf push --strategy rolling`.',
          'Cloud Foundry stages the new droplet and launches a 3rd temporary container instance running the new version.',
          'Gorouter waits for the new container to pass HTTP health checks at `/health`.',
          'Once healthy, Gorouter begins routing 50% of new traffic to the new container and terminates an old container.',
          'Process repeats for the second container until 100% of traffic is on the new code with zero dropped user sessions.',
        ],
        businessImpact:
          'Eliminates maintenance windows, prevents €180,000 in lost flight booking revenue, and delivers zero-downtime continuous deployment.',
      },
      practicalActivity:
        'Launch Practice Drill "Securing Cloud Routes" (/practice?tab=drills&id=sec-route-protection) to inspect enterprise routing and security.',
      keyTakeaways: [
        'Cloud Foundry automates container compilation, staging, deployment, and routing through "cf push".',
        'Droplets are immutable packages that allow launching multiple container instances instantly.',
        'Always configure at least 2 instances in production manifest.yml files for high availability and rolling updates.',
        'Use "cf logs app-name --recent" as your primary triage tool when microservices crash or fail startup checks.',
      ],
      quizQuestions: [
        {
          id: 'mod-1-5-q1',
          question:
            'A developer executes "cf push", but the deployment fails after 2 minutes with message "Start unsuccessful: App instance exited with exit code 137". What caused this failure?',
          options: [
            {
              id: 'a',
              text: 'The application exceeded its allocated memory quota (Out of Memory - OOM), causing the Linux kernel inside the container to terminate the process.',
              isCorrect: true,
              explanation:
                'Correct. In Linux and Cloud Foundry, exit code 137 (128 + signal 9 SIGKILL) indicates the process was killed for exceeding its allocated memory limit. The solution is to increase memory in manifest.yml.',
            },
            {
              id: 'b',
              text: 'The developer entered an incorrect password for their GitHub repository.',
              isCorrect: false,
              explanation:
                'Incorrect. Git credentials are not checked by the container runtime during execution.',
            },
            {
              id: 'c',
              text: 'The SAP BTP Cockpit web server ran out of disk space.',
              isCorrect: false,
              explanation:
                'Incorrect. Exit code 137 is a container-specific memory termination, not Cockpit disk failure.',
            },
            {
              id: 'd',
              text: 'Cloud Foundry does not permit applications to run on Tuesdays.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud Foundry runs continuously 24/7/365.',
            },
          ],
        },
        {
          id: 'mod-1-5-q2',
          question:
            'What is the role of a Buildpack during the Cloud Foundry staging process?',
          options: [
            {
              id: 'a',
              text: 'It automatically detects the application programming language, downloads the appropriate runtime (Node.js/Java), installs production dependencies, and compiles the project into an immutable Droplet.',
              isCorrect: true,
              explanation:
                'Correct. Buildpacks provide framework and runtime support for applications running on Cloud Foundry.',
            },
            {
              id: 'b',
              text: 'It converts your web application into a native mobile app for Android and iOS.',
              isCorrect: false,
              explanation:
                'Incorrect. Buildpacks compile server-side runtimes, not mobile phone binaries.',
            },
            {
              id: 'c',
              text: 'It calculates corporate income taxes for European subsidiaries.',
              isCorrect: false,
              explanation:
                'Incorrect. Buildpacks are software compilation scripts, not tax calculators.',
            },
            {
              id: 'd',
              text: 'It permanently deletes your local source code files after uploading them.',
              isCorrect: false,
              explanation:
                'Incorrect. Buildpacks never modify or delete local source files.',
            },
          ],
        },
        {
          id: 'mod-1-5-q3',
          question:
            'Why does the Cloud Foundry Gorouter wait for an application HTTP health check to succeed before routing public traffic to a new container instance?',
          options: [
            {
              id: 'a',
              text: 'To ensure the container process has fully booted, initialized database connections, and is ready to process requests, preventing end-users from receiving 502 Bad Gateway errors.',
              isCorrect: true,
              explanation:
                'Correct. Health checks ensure traffic is only directed to completely initialized, responsive instances.',
            },
            {
              id: 'b',
              text: 'Because HTTP health checks are legally required by the United Nations.',
              isCorrect: false,
              explanation:
                'Incorrect. Health checks are standard technical reliability practices, not international treaties.',
            },
            {
              id: 'c',
              text: 'To download music files to the server.',
              isCorrect: false,
              explanation:
                'Incorrect. Health checks test endpoint availability.',
            },
            {
              id: 'd',
              text: 'Because Gorouter can only connect to applications that have zero lines of JavaScript.',
              isCorrect: false,
              explanation:
                'Incorrect. Gorouter routinely routes traffic to complex JavaScript and Java applications.',
            },
          ],
        },
      ],
    },
  ],
};
