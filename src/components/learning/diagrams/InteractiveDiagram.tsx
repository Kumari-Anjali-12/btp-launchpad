import React from 'react';
import {
  Building2,
  Database,
  Server,
  Layers,
  ArrowRight,
  ShieldCheck,
  Globe,
  Radio,
  FileCode,
  AlertTriangle,
  CheckCircle2,
  Workflow,
} from 'lucide-react';

export interface InteractiveDiagramProps {
  type: string;
  caption?: string;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ type, caption }) => {

  const renderContent = () => {
    switch (type) {
      case 'erp-architecture':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-lg border border-sap-blue-200 bg-sap-blue-50/80 p-3 dark:border-sap-blue-900 dark:bg-sap-blue-950/40">
                <div className="text-xs font-bold text-sap-blue-700 dark:text-sap-blue-300">Sales & Orders</div>
                <div className="text-[11px] text-slate-500">Customer requests & quotes</div>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Warehouse & Stock</div>
                <div className="text-[11px] text-slate-500">Real-time inventory levels</div>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50/80 p-3 dark:border-purple-900 dark:bg-purple-950/40">
                <div className="text-xs font-bold text-purple-700 dark:text-purple-300">Procurement</div>
                <div className="text-[11px] text-slate-500">Vendor purchase orders</div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-900 dark:bg-amber-950/40">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300">Finance & GL</div>
                <div className="text-[11px] text-slate-500">Accounts & tax ledger</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400">
              <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
              <span className="text-xs font-mono font-medium">All synchronized instantaneously via</span>
              <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
            </div>

            <div className="rounded-xl border-2 border-sap-blue-500 bg-gradient-to-r from-sap-blue-500/10 via-sap-blue-500/5 to-sap-blue-500/10 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-sap-blue-600 dark:text-sap-blue-400">
                <Database className="h-4 w-4" />
                <span>SAP S/4HANA In-Memory Digital Core (Single Source of Truth)</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Zero data duplication. When a sale occurs, stock decreases, procurement alerts fire, and financial journals balance immediately.
              </p>
            </div>
          </div>
        );

      case 'clean-core':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Modern Clean Core (BTP Side-by-Side)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Standard ERP remains unmodified. Custom business apps run independently on SAP BTP and consume stable, versioned APIs.
              </p>
              <div className="rounded bg-white/80 dark:bg-slate-900 p-2 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                ERP upgrades take days, zero custom regression bugs.
              </div>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-900/60 dark:bg-rose-950/30">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300 mb-2">
                <AlertTriangle className="h-4 w-4 text-rose-600" />
                <span>Legacy Modifications (Technical Debt)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Directly altering core SAP database tables and standard ABAP routines.
              </p>
              <div className="rounded bg-white/80 dark:bg-slate-900 p-2 text-[11px] font-mono text-rose-700 dark:text-rose-400">
                ERP upgrades take 18 months and millions in consulting costs.
              </div>
            </div>
          </div>
        );

      case 'btp-hierarchy':
        return (
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-300 bg-slate-100 p-3 text-center dark:border-slate-700 dark:bg-slate-800">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">1. Global Account</div>
              <div className="text-[11px] text-slate-500">Master Enterprise Contract & Global Quotas</div>
            </div>
            <div className="pl-6 border-l-2 border-sap-blue-400 space-y-3">
              <div className="rounded-lg border border-sap-blue-200 bg-sap-blue-50/60 p-3 dark:border-sap-blue-900 dark:bg-sap-blue-950/30">
                <div className="text-xs font-bold text-sap-blue-800 dark:text-sap-blue-300">2. Subaccount (e.g., Development - AWS Frankfurt)</div>
                <div className="text-[11px] text-slate-500">Region-bound environment with allocated service entitlements</div>
                <div className="pl-4 mt-2 border-l border-slate-300 dark:border-slate-700 space-y-1.5">
                  <div className="rounded bg-white dark:bg-slate-900 p-2 text-xs border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Space: dev</span>
                    <span className="text-[10px] text-slate-400">Running CAP Apps & HANA DB</span>
                  </div>
                  <div className="rounded bg-white dark:bg-slate-900 p-2 text-xs border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Space: test</span>
                    <span className="text-[10px] text-slate-400">QA testing & validation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cap-architecture':
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
            <div className="w-full rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950/40">
              <FileCode className="h-5 w-5 text-purple-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-purple-800 dark:text-purple-300">db/schema.cds</div>
              <div className="text-[10px] text-slate-500">Declarative Entities</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
            <div className="w-full rounded-lg border border-sap-blue-200 bg-sap-blue-50 p-3 dark:border-sap-blue-900 dark:bg-sap-blue-950/40">
              <Layers className="h-5 w-5 text-sap-blue-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-sap-blue-800 dark:text-sap-blue-300">srv/service.cds</div>
              <div className="text-[10px] text-slate-500">Exposed Projections</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
            <div className="w-full rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
              <Server className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">srv/service.js</div>
              <div className="text-[10px] text-slate-500">Node.js Event Logic</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
            <div className="w-full rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/40">
              <Database className="h-5 w-5 text-amber-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">HANA Cloud</div>
              <div className="text-[10px] text-slate-500">Auto-generated DDL</div>
            </div>
          </div>
        );

      case 'odata-flow':
        return (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 w-full text-center">
                <span className="font-bold text-slate-800 dark:text-slate-100">Fiori UI Client</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Wants specific columns & filtered rows</p>
              </div>
              <div className="text-[11px] font-mono text-sap-blue-600 dark:text-sap-blue-400 text-center px-2">
                GET /odata/v4/catalog/Books?$select=title&amp;$filter=price lt 50
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 w-full text-center">
                <span className="font-bold text-slate-800 dark:text-slate-100">CAP OData Service</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Executes SQL & returns formatted JSON</p>
              </div>
            </div>
            <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-slate-300">
              <span className="text-emerald-400">Response:</span> &#123; &quot;@odata.context&quot;: &quot;...&quot;, &quot;value&quot;: [&#123; &quot;title&quot;: &quot;SAP BTP Guide&quot; &#125;] &#125;
            </div>
          </div>
        );

      case 'event-handlers':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900 dark:bg-amber-950/40">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">srv.before(&apos;CREATE&apos;)</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Validation &amp; sanitization (reject negative stock or bad dates)</div>
            </div>
            <div className="rounded-lg border border-sap-blue-200 bg-sap-blue-50/70 p-3 dark:border-sap-blue-900 dark:bg-sap-blue-950/40">
              <div className="text-xs font-bold text-sap-blue-800 dark:text-sap-blue-300">srv.on(&apos;CREATE&apos;)</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Actual persistence logic into database (default or custom)</div>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">srv.after(&apos;CREATE&apos;)</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Side effects (send confirmation email, emit event mesh topic)</div>
            </div>
          </div>
        );

      case 'fiori-horizon':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="rounded border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
              <span className="font-bold text-sap-blue-600 block">1. Role-Based</span>
              <span className="text-[10px] text-slate-400">Tailored to user tasks</span>
            </div>
            <div className="rounded border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
              <span className="font-bold text-sap-blue-600 block">2. Adaptive</span>
              <span className="text-[10px] text-slate-400">Mobile, tablet &amp; PC</span>
            </div>
            <div className="rounded border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
              <span className="font-bold text-sap-blue-600 block">3. Simple</span>
              <span className="text-[10px] text-slate-400">Focus on the essential</span>
            </div>
            <div className="rounded border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
              <span className="font-bold text-sap-blue-600 block">4. Coherent</span>
              <span className="text-[10px] text-slate-400">Same feel everywhere</span>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
              <span className="font-bold text-sap-blue-600 block">5. Delightful</span>
              <span className="text-[10px] text-slate-400">Clean micro-interactions</span>
            </div>
          </div>
        );

      case 'fiori-elements-annotations':
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
            <div className="w-full rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950/40">
              <div className="text-xs font-bold text-purple-800 dark:text-purple-300">CDS Annotations</div>
              <div className="text-[10px] text-slate-500 font-mono">@UI.LineItem: [...]</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
            <div className="w-full rounded-lg border border-sap-blue-200 bg-sap-blue-50 p-3 dark:border-sap-blue-900 dark:bg-sap-blue-950/40">
              <div className="text-xs font-bold text-sap-blue-800 dark:text-sap-blue-300">Fiori Generator</div>
              <div className="text-[10px] text-slate-500">Reads OData $metadata</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
            <div className="w-full rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Live Application</div>
              <div className="text-[10px] text-slate-500">Interactive List Report &amp; Filters</div>
            </div>
          </div>
        );

      case 'xsuaa-oauth':
        return (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="rounded border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
                <span className="font-bold text-slate-700 dark:text-slate-200 block">1. User Login</span>
                <span className="text-[10px] text-slate-400">Authenticates with Corporate IDP</span>
              </div>
              <div className="rounded border border-sap-blue-200 bg-sap-blue-50 p-2.5 dark:border-sap-blue-900 dark:bg-sap-blue-950/40">
                <span className="font-bold text-sap-blue-700 dark:text-sap-blue-300 block">2. XSUAA Grants JWT</span>
                <span className="text-[10px] text-slate-500">Includes scopes (e.g. Employee.Read)</span>
              </div>
              <div className="rounded border border-emerald-200 bg-emerald-50 p-2.5 dark:border-emerald-900 dark:bg-emerald-950/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block">3. Microservice Verifies</span>
                <span className="text-[10px] text-slate-500">Validates cryptographic signature</span>
              </div>
            </div>
            <div className="rounded bg-slate-900 p-2.5 text-[11px] font-mono text-slate-300">
              <span className="text-amber-400">JWT Payload:</span> &#123; &quot;user&quot;: &quot;alice@corp.com&quot;, &quot;scope&quot;: [&quot;LeaveApp.Approve&quot;] &#125;
            </div>
          </div>
        );

      case 'cloud-connector-tunnel':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-lg border border-sap-blue-200 bg-sap-blue-50 p-3 dark:border-sap-blue-900 dark:bg-sap-blue-950/40">
              <Globe className="h-5 w-5 text-sap-blue-500 mx-auto mb-1" />
              <span className="font-bold text-sap-blue-800 dark:text-sap-blue-300 block">SAP BTP Cloud</span>
              <span className="text-[10px] text-slate-500">Calls Destination &quot;S4_ONPREM&quot;</span>
            </div>
            <div className="rounded-lg border-2 border-dashed border-emerald-400 bg-emerald-50/50 p-3 dark:bg-emerald-950/30">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Cloud Connector</span>
              <span className="text-[10px] text-slate-500">Outbound reverse TLS tunnel (No open inbound ports)</span>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950/40">
              <Building2 className="h-5 w-5 text-purple-600 mx-auto mb-1" />
              <span className="font-bold text-purple-800 dark:text-purple-300 block">On-Premise ERP</span>
              <span className="text-[10px] text-slate-500">Private corporate data center</span>
            </div>
          </div>
        );

      case 'event-mesh-pubsub':
        return (
          <div className="space-y-3 text-xs text-center">
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-2.5 dark:border-purple-900 dark:bg-purple-950/40 max-w-sm mx-auto">
              <span className="font-bold text-purple-800 dark:text-purple-300 block">Publisher: S/4HANA</span>
              <span className="text-[10px] text-slate-500">Emits topic: sap/s4/order/created</span>
            </div>
            <div className="rounded-xl border-2 border-sap-blue-400 bg-sap-blue-50/60 p-3 dark:border-sap-blue-800 dark:bg-sap-blue-950/30">
              <Radio className="h-5 w-5 text-sap-blue-500 mx-auto mb-1" />
              <span className="font-bold text-sap-blue-800 dark:text-sap-blue-300 block">SAP Event Mesh (Message Broker)</span>
              <span className="text-[10px] text-slate-500">Guaranteed queue buffering (No message lost if receiver is sleeping)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              <div className="rounded border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">Consumer A</span>
                <span className="text-[10px] text-slate-400">Inventory deduction</span>
              </div>
              <div className="rounded border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">Consumer B</span>
                <span className="text-[10px] text-slate-400">Customer SMS notifier</span>
              </div>
            </div>
          </div>
        );

      case 'mta-lifecycle':
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs">
            <div className="w-full rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <span className="font-bold text-slate-800 dark:text-slate-100 block">1. mta.yaml</span>
              <span className="text-[10px] text-slate-400">Deployment Blueprint</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
            <div className="w-full rounded border border-sap-blue-200 bg-sap-blue-50 p-3 dark:border-sap-blue-900 dark:bg-sap-blue-950/40">
              <span className="font-bold text-sap-blue-800 dark:text-sap-blue-300 block">2. mbt build</span>
              <span className="text-[10px] text-slate-500">Packs into archive.mtar</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
            <div className="w-full rounded border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block">3. cf deploy</span>
              <span className="text-[10px] text-slate-500">Orchestrated Cloud Launch</span>
            </div>
          </div>
        );

      case 'http-troubleshooting':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="rounded border border-amber-200 bg-amber-50/60 p-2.5 dark:border-amber-900 dark:bg-amber-950/30">
              <div className="font-bold text-amber-800 dark:text-amber-300">401 vs 403</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                <strong>401:</strong> Missing or expired JWT.<br />
                <strong>403:</strong> Logged in, but lacking required Scope/Role.
              </div>
            </div>
            <div className="rounded border border-rose-200 bg-rose-50/60 p-2.5 dark:border-rose-900 dark:bg-rose-950/30">
              <div className="font-bold text-rose-800 dark:text-rose-300">500 Internal Error</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Unhandled exception in Node.js service code. Check <code>cf logs app --recent</code>.
              </div>
            </div>
            <div className="rounded border border-purple-200 bg-purple-50/60 p-2.5 dark:border-purple-900 dark:bg-purple-950/30">
              <div className="font-bold text-purple-800 dark:text-purple-300">502 / 503 Gateway</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Approuter cannot reach backend container. App crashed on startup or ran out of memory.
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center p-4 text-xs text-slate-500">
            <span>Interactive Process Diagram</span>
          </div>
        );
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-sap-slate-900/40">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Workflow className="h-3.5 w-3.5 text-sap-blue-500" />
          <span>Interactive Visual Architecture</span>
        </div>
        <span className="text-[10px] text-slate-400">Click or view nodes to inspect</span>
      </div>

      <div className="py-2">{renderContent()}</div>

      {caption && (
        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400 text-center italic">
          {caption}
        </div>
      )}
    </div>
  );
};
