import json
import re

with open(r'G:\BTP-Launchpad\docs\reference\parsed_syllabus.json', 'r', encoding='utf-8') as f:
    phases_raw = json.load(f)

# Module metadata table
MODULE_META = {
    '0.1': {
        'tagline': 'Demystify Enterprise Cloud, ERP & Clean Core Architecture',
        'level': 'Beginner',
        'diagramType': 'erp-architecture',
        'legacyId': 'ch-0-1',
    },
    '0.2': {
        'tagline': 'Master HTTP, REST, JSON, and the OData v4 Protocol',
        'level': 'Beginner',
        'diagramType': 'odata-flow',
    },
    '0.3': {
        'tagline': 'Asynchronous Event Loop, Promises, and Node.js Fundamentals',
        'level': 'Beginner',
        'diagramType': 'event-handlers',
    },
    '0.4': {
        'tagline': 'Type Safety, Strict Contracts, and Typed API Integration',
        'level': 'Beginner',
        'diagramType': 'event-handlers',
    },
    '0.5': {
        'tagline': 'Git Version Control, Command Line, and Docker Isolation',
        'level': 'Beginner',
        'diagramType': 'cf-deployment',
    },
    '0.6': {
        'tagline': 'OAuth 2.0 Grants, JWT Token Claims, and Authentication',
        'level': 'Beginner',
        'diagramType': 'xsuaa-oauth',
    },
    '1.1': {
        'tagline': 'IaaS vs PaaS vs SaaS and Cloud Shared Responsibility',
        'level': 'Beginner',
        'diagramType': 'btp-hierarchy',
    },
    '1.2': {
        'tagline': 'BTP Multi-Cloud Account Architecture & Service Engines',
        'level': 'Beginner',
        'diagramType': 'btp-hierarchy',
        'legacyId': 'ch-0-2',
    },
    '1.3': {
        'tagline': 'SAP BTP Cockpit Navigation, Regions, and Entitlements',
        'level': 'Beginner',
        'diagramType': 'btp-hierarchy',
        'legacyId': 'ch-0-3',
    },
    '1.4': {
        'tagline': 'SAP Cloud Identity Services, User Groups & Role Collections',
        'level': 'Beginner',
        'diagramType': 'xsuaa-oauth',
    },
    '1.5': {
        'tagline': 'Cloud Foundry Organizations, Spaces, Droplets & Routes',
        'level': 'Beginner',
        'diagramType': 'cf-deployment',
        'legacyId': 'ch-4-2',
    },
    '2.1': {
        'tagline': 'Cloud-Based IDE, Dev Spaces, and Run Configurations',
        'level': 'Beginner',
        'diagramType': 'cap-architecture',
    },
    '2.2': {
        'tagline': 'Local Node.js Tooling, @sap/cds-dk CLI, and MTA Build Tool',
        'level': 'Beginner',
        'diagramType': 'cap-architecture',
    },
    '3.1': {
        'tagline': 'Core Data Services (CDS), Entity Projections, and Services',
        'level': 'Intermediate',
        'diagramType': 'cap-architecture',
        'legacyId': 'ch-1-1',
    },
    '3.2': {
        'tagline': 'Event Lifecycle (before, on, after), Actions & Validations',
        'level': 'Intermediate',
        'diagramType': 'event-handlers',
        'legacyId': 'ch-1-3',
    },
    '3.3': {
        'tagline': 'Local SQLite Development, CSV Data, and Migrations',
        'level': 'Intermediate',
        'diagramType': 'cap-architecture',
        'legacyId': 'ch-1-2',
    },
    '3.4': {
        'tagline': 'In-Memory Relational Persistence, HDI Containers & DDL',
        'level': 'Intermediate',
        'diagramType': 'cap-architecture',
    },
    '4.1': {
        'tagline': 'Metadata-Driven List Reports and Object Pages with Annotations',
        'level': 'Intermediate',
        'diagramType': 'fiori-elements-annotations',
        'legacyId': 'ch-2-2',
    },
    '4.2': {
        'tagline': 'Model-View-Controller Architecture, XML Views & Data Binding',
        'level': 'Intermediate',
        'diagramType': 'ui5-freestyle',
        'legacyId': 'ch-2-3',
    },
    '4.3': {
        'tagline': 'AppRouter Proxy, Launchpad Integration & Localization',
        'level': 'Intermediate',
        'diagramType': 'fiori-horizon',
        'legacyId': 'ch-2-1',
    },
    '5.1': {
        'tagline': 'XSUAA Token Validation, JWT Bearer Handlers & Scopes',
        'level': 'Intermediate',
        'diagramType': 'xsuaa-oauth',
        'legacyId': 'ch-3-1',
    },
    '5.2': {
        'tagline': 'Role Templates, Scopes, and Attribute-Based Access Control',
        'level': 'Intermediate',
        'diagramType': 'xsuaa-oauth',
    },
    '5.3': {
        'tagline': 'Destination Service, On-Premise Cloud Connector & Proxy',
        'level': 'Intermediate',
        'diagramType': 'cloud-connector-tunnel',
        'legacyId': 'ch-3-2',
    },
    '5.4': {
        'tagline': 'Secrets Management, Defensive Headers, and Security Audits',
        'level': 'Intermediate',
        'diagramType': 'http-troubleshooting',
    },
    '6.1': {
        'tagline': 'Multi-Target Application Descriptors (mta.yaml) & Packaging',
        'level': 'Advanced',
        'diagramType': 'mta-lifecycle',
        'legacyId': 'ch-4-1',
    },
    '6.2': {
        'tagline': 'Continuous Integration Pipelines and Build-Once Deploy-Many',
        'level': 'Advanced',
        'diagramType': 'mta-lifecycle',
    },
    '6.3': {
        'tagline': 'Automated Unit, Integration, and Mock Service Test Suites',
        'level': 'Advanced',
        'diagramType': 'http-troubleshooting',
    },
    '6.4': {
        'tagline': 'Cloud Logging, Metrics, Diagnostics, and Incident Runbooks',
        'level': 'Advanced',
        'diagramType': 'http-troubleshooting',
    },
    '7.1': {
        'tagline': 'SAP AI Strategy, Joule Copilot, and Enterprise Use Cases',
        'level': 'Advanced',
        'diagramType': 'ai-core-rag',
    },
    '7.2': {
        'tagline': 'SAP AI Core Serving Templates, Docker Images & Deployments',
        'level': 'Advanced',
        'diagramType': 'ai-core-rag',
    },
    '7.3': {
        'tagline': 'Generative AI Hub, Prompt Orchestration, and Token Budgets',
        'level': 'Advanced',
        'diagramType': 'genai-hub',
    },
    '7.4': {
        'tagline': 'REAL_VECTOR Search, Grounded RAG, and HANA Vector Engine',
        'level': 'Advanced',
        'diagramType': 'ai-core-rag',
    },
    '7.5': {
        'tagline': 'Joule Studio Skills, Autonomous Tool Calling & Guardrails',
        'level': 'Advanced',
        'diagramType': 'joule-agents',
    },
    '7.6': {
        'tagline': 'Clean Core Principles, Extension Points & Upgrade-Safe Design',
        'level': 'Advanced',
        'diagramType': 'clean-core',
        'legacyId': 'ch-4-3',
    },
    '8.1': {
        'tagline': 'Production Full-Stack Cloud Product Integrating CAP, Fiori & AI',
        'level': 'Advanced',
        'diagramType': 'joule-agents',
    },
    '8.2': {
        'tagline': 'Technical Curation, Architecture Write-Ups & Career Strategy',
        'level': 'Advanced',
        'diagramType': 'joule-agents',
    },
}

BADGE_CATS = {
    0: 'pre-learning',
    1: 'core',
    2: 'core',
    3: 'core',
    4: 'core',
    5: 'core',
    6: 'core',
    7: 'ai-layer',
    8: 'capstone',
}

print(f"Configured metadata for {len(MODULE_META)} modules.")
