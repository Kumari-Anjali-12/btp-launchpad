import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardTitle } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

interface GlossaryTerm {
  term: string;
  acronym?: string;
  category: 'Architecture' | 'Backend' | 'Frontend' | 'Security' | 'Integration';
  plainEnglish: string;
  officialDefinition: string;
  webEquivalent: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Business Technology Platform',
    acronym: 'BTP',
    category: 'Architecture',
    plainEnglish: 'SAP’s cloud platform that provides database, runtime, integration, and AI services so you can build apps without touching the core ERP.',
    officialDefinition: 'An integrated offering comprised of data and analytics, application development and integration, and artificial intelligence.',
    webEquivalent: 'AWS / Google Cloud / Azure combined with Firebase-like managed enterprise services.',
  },
  {
    term: 'Cloud Application Programming Model',
    acronym: 'CAP',
    category: 'Backend',
    plainEnglish: 'A framework for building enterprise services with Node.js or Java, where you define data models in CDS and CAP creates the database and APIs automatically.',
    officialDefinition: 'An opinionated, multi-target framework of languages, libraries, and tools for building enterprise-grade services and applications.',
    webEquivalent: 'Express / NestJS + Prisma ORM + GraphQL / OData auto-generator.',
  },
  {
    term: 'Core Data Services',
    acronym: 'CDS',
    category: 'Backend',
    plainEnglish: 'A clean, readable modeling language where you declare what your data entities look like and who is allowed to access them.',
    officialDefinition: 'A declarative domain-specific modeling language for data and service models.',
    webEquivalent: 'Prisma schema file (`schema.prisma`) or SQL DDL + TypeScript interfaces.',
  },
  {
    term: 'Multi-Target Application',
    acronym: 'MTA',
    category: 'Architecture',
    plainEnglish: 'A packaging standard that bundles frontend, backend, and database modules into a single `.mtar` archive with a deployment blueprint (`mta.yaml`).',
    officialDefinition: 'A single package composed of multiple modules created with different technologies but sharing the same lifecycle.',
    webEquivalent: 'Docker Compose (`docker-compose.yml`) or a Helm chart for Kubernetes.',
  },
  {
    term: 'Extended Services for UAA',
    acronym: 'XSUAA',
    category: 'Security',
    plainEnglish: 'The security bouncer for your BTP applications that inspects JWT tokens and checks what roles/permissions a user holds.',
    officialDefinition: 'An SAP-specific extension of Cloud Foundry User Account and Authentication service providing OAuth 2.0 authorization.',
    webEquivalent: 'Auth0 / Keycloak / Clerk with role-based JWT validation middleware.',
  },
  {
    term: 'Destination Service',
    acronym: 'Destination',
    category: 'Integration',
    plainEnglish: 'A secure cloud address book that stores connection URLs, credentials, and token configurations so your code never contains hardcoded secrets.',
    officialDefinition: 'A service that stores configuration information for connecting to remote systems and services.',
    webEquivalent: 'Managed Axios/Fetch environment config with automatic OAuth2 token exchange.',
  },
  {
    term: 'Cloud Connector',
    acronym: 'SCC',
    category: 'Integration',
    plainEnglish: 'An agent installed inside a corporate firewall that makes a secure outbound call to BTP so cloud apps can reach on-premise systems safely.',
    officialDefinition: 'A link between SAP BTP applications and on-premise systems behind corporate firewalls.',
    webEquivalent: 'Cloudflare Tunnel / ngrok / reverse SSH tunnel.',
  },
  {
    term: 'SAP Fiori',
    acronym: 'Fiori',
    category: 'Frontend',
    plainEnglish: 'SAP’s design system and user experience guidelines aimed at making business applications clean, intuitive, and consistent.',
    officialDefinition: 'The design language and user experience paradigm for SAP software.',
    webEquivalent: 'Material Design or Apple Human Interface Guidelines applied to enterprise software.',
  },
  {
    term: 'SAPUI5',
    acronym: 'UI5',
    category: 'Frontend',
    plainEnglish: 'The JavaScript/TypeScript framework used to build enterprise Fiori web applications with rich enterprise controls.',
    officialDefinition: 'A collection of libraries for building desktop and mobile web applications based on HTML5.',
    webEquivalent: 'React / Angular + an enterprise UI component library (e.g. Ant Design).',
  },
  {
    term: 'Kyma',
    acronym: 'Kyma',
    category: 'Architecture',
    plainEnglish: 'A managed Kubernetes runtime inside SAP BTP designed for running custom microservices, serverless functions, and event listeners.',
    officialDefinition: 'An open-source cloud-native application runtime based on Kubernetes, Istio, and Knative.',
    webEquivalent: 'Managed Kubernetes (EKS / GKE) with Istio service mesh pre-configured.',
  },
];

export const CheatsheetPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Architecture', 'Backend', 'Frontend', 'Security', 'Integration'];

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.plainEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.webEquivalent.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <Badge variant="info" className="mb-1">
          Acronym Decoder
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          SAP Terminology & Cheatsheet
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Translate enterprise SAP jargon into plain English and modern web technology equivalents.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search terms, acronyms (e.g. CAP, XSUAA, Destination) or web equivalents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 dark:border-slate-800 dark:bg-sap-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-sap-blue-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((t) => (
          <Card key={t.term} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t.category}
                </span>
                {t.acronym && (
                  <Badge variant="purple" size="sm" className="font-mono font-bold">
                    {t.acronym}
                  </Badge>
                )}
              </div>

              <CardTitle className="text-lg">{t.term}</CardTitle>

              {/* Plain English */}
              <div className="mt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400 block mb-0.5">
                  Plain English:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t.plainEnglish}
                </p>
              </div>

              {/* Modern Web Tech Equivalent */}
              <div className="mt-3 rounded-md bg-slate-50 p-2.5 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                  Modern Web Equivalent:
                </span>
                <p className="text-xs font-mono text-slate-800 dark:text-slate-200">
                  {t.webEquivalent}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
