import React from 'react';
import { Play, Terminal, FileCode } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SimulationBadge } from '../components/common/SimulationBadge';

export const PracticePage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <SimulationBadge showExplanation />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Hands-On Practice Sandboxes
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Learn by writing real Core Data Services (CDS) models, CAP service handlers, and executing live OData v4 queries in safe, browser-simulated environments.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sandbox 1: CDS & CAP Sandbox */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sap-blue-600 dark:text-sap-blue-400">
              <FileCode className="w-4 h-4" />
              <span>Interactive Modeler</span>
            </div>
            <CardTitle className="text-lg">Core Data Services (CDS) Sandbox</CardTitle>
            <CardDescription>
              Model entities, define associations, and compile to database DDL in real-time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="text-slate-500">// Example: db/schema.cds</div>
              <div><span className="text-purple-400">namespace</span> sap.launchpad;</div>
              <div className="mt-1"><span className="text-blue-400">entity</span> <span className="text-amber-300">Books</span> &#123;</div>
              <div className="pl-4"><span className="text-rose-400">key</span> id : <span className="text-teal-300">UUID</span>;</div>
              <div className="pl-4">title : <span className="text-teal-300">String(100)</span>;</div>
              <div className="pl-4">stock : <span className="text-teal-300">Integer</span>;</div>
              <div>&#125;</div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The in-browser parser verifies your syntax and previews the auto-generated relational tables and OData metadata.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
                Launch CDS Interactive Workspace
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sandbox 2: OData Query Explorer */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Terminal className="w-4 h-4" />
              <span>Query Explorer</span>
            </div>
            <CardTitle className="text-lg">OData v4 Query Explorer</CardTitle>
            <CardDescription>
              Execute `$select`, `$filter`, and `$expand` against mock BTP services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="text-slate-500">// Simulated Endpoint</div>
              <div className="text-emerald-400">GET /odata/v4/catalog/Books</div>
              <div className="text-slate-400 pl-4">?$select=title,stock</div>
              <div className="text-slate-400 pl-4">&amp;$filter=stock gt 10</div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Inspect real OData v4 JSON payloads and see how frontend Fiori apps consume backend CAP APIs.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
                Launch OData Query Runner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Notice Card */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-6 dark:border-sky-900/60 dark:bg-sky-950/20">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
          Zero-Cost, Zero-Configuration Sandbox Promise
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          In standard enterprise training, students frequently get stuck during trial account creation, quota exhaustion, or credit card verification.
          BTP Launchpad provides fully functional client-side mock execution so you can learn core development concepts with zero friction.
        </p>
      </div>
    </div>
  );
};
