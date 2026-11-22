import React from 'react';
import { Boxes, Database, Server, Smartphone, Globe, ArrowRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SimulationBadge } from '../components/common/SimulationBadge';

export const DesignLabPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="purple">Architecture Workspace</Badge>
          <SimulationBadge />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Visual Architecture Design Lab
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Design, connect, and validate complete SAP BTP architectures on an interactive topology canvas. Validate enterprise security boundaries and generate deployment descriptors.
        </p>
      </div>

      {/* Interactive Blueprint Preview */}
      <Card className="border-dashed border-2 border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-sap-slate-900/40 p-8">
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 mx-auto mb-3">
            <Boxes className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Interactive Architecture Canvas
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Drag-and-drop enterprise components, connect data flows, and let the real-time linter verify your configuration against SAP best practices.
          </p>
        </div>

        {/* Visual Component Topology Nodes Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-xs dark:border-slate-700 dark:bg-slate-800">
            <Smartphone className="h-5 w-5 text-sap-blue-500 mx-auto mb-1" />
            <div className="text-xs font-semibold text-slate-800 dark:text-white">Fiori App</div>
            <div className="text-[10px] text-slate-500">HTML5 Frontend</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-xs dark:border-slate-700 dark:bg-slate-800">
            <Globe className="h-5 w-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xs font-semibold text-slate-800 dark:text-white">Approuter</div>
            <div className="text-[10px] text-slate-500">Reverse Proxy & Auth</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-xs dark:border-slate-700 dark:bg-slate-800">
            <Server className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
            <div className="text-xs font-semibold text-slate-800 dark:text-white">CAP Service</div>
            <div className="text-[10px] text-slate-500">Node.js / OData v4</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-xs dark:border-slate-700 dark:bg-slate-800">
            <Database className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <div className="text-xs font-semibold text-slate-800 dark:text-white">HANA Cloud</div>
            <div className="text-[10px] text-slate-500">Relational DB</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Launch Canvas Studio
          </Button>
        </div>
      </Card>
    </div>
  );
};
