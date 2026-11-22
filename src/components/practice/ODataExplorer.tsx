import React, { useState } from 'react';
import { Send, RefreshCw, Copy, Check, Terminal, Sparkles, Database } from 'lucide-react';
import { executeODataRequest, resetODataDatabase } from '../../lib/practice/odataSimulator';
import { ODataHttpMethod, ODataResponse } from '../../types/practice';
import { Button } from '../common/Button';
import { SimulationBadge } from '../common/SimulationBadge';

interface ODataPreset {
  label: string;
  method: ODataHttpMethod;
  path: string;
  body?: string;
}

const PRESETS: ODataPreset[] = [
  {
    label: 'All Employees',
    method: 'GET',
    path: '/odata/v4/catalog/Employees',
  },
  {
    label: 'Filter Cloud Engineers',
    method: 'GET',
    path: "/odata/v4/catalog/Employees?$select=name,role,salary&$filter=department eq 'Cloud Engineering'",
  },
  {
    label: 'Pending Leave ($expand)',
    method: 'GET',
    path: "/odata/v4/catalog/LeaveRequests?$filter=status eq 'Pending'&$expand=employee",
  },
  {
    label: 'Active Vendors',
    method: 'GET',
    path: "/odata/v4/catalog/Vendors?$filter=status eq 'Active'",
  },
  {
    label: 'Confirmed Orders ($expand)',
    method: 'GET',
    path: "/odata/v4/catalog/PurchaseOrders?$expand=vendor&$filter=status eq 'Confirmed'",
  },
  {
    label: 'POST New Leave Request',
    method: 'POST',
    path: '/odata/v4/catalog/LeaveRequests',
    body: JSON.stringify(
      {
        employee_ID: 'e101',
        startDate: '2027-02-01',
        endDate: '2027-02-05',
        leaveType: 'Vacation',
        days: 4,
        status: 'Pending',
        comments: 'Sprint break recharge',
      },
      null,
      2
    ),
  },
  {
    label: 'PATCH Approve Leave',
    method: 'PATCH',
    path: "/odata/v4/catalog/LeaveRequests('lr-502')",
    body: JSON.stringify(
      {
        status: 'Approved',
      },
      null,
      2
    ),
  },
];

export const ODataExplorer: React.FC = () => {
  const [method, setMethod] = useState<ODataHttpMethod>('GET');
  const [url, setUrl] = useState('/odata/v4/catalog/Employees');
  const [requestBody, setRequestBody] = useState('{\n  \n}');
  const [simulateAuth, setSimulateAuth] = useState<'normal' | '401' | '403' | '500'>('normal');
  const [response, setResponse] = useState<ODataResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'body' | 'headers'>('body');

  const handleSend = () => {
    // Parse query params from URL
    const urlParts = url.split('?');
    const path = urlParts[0] || '';
    const queryParams: Record<string, string> = {};

    if (urlParts[1]) {
      const searchParams = new URLSearchParams(urlParts[1]);
      searchParams.forEach((val, key) => {
        queryParams[key] = val;
      });
    }

    if (simulateAuth !== 'normal') {
      queryParams['simulateAuth'] = simulateAuth;
    }

    const res = executeODataRequest({
      method,
      path,
      queryParams,
      body: method === 'POST' || method === 'PATCH' ? requestBody : undefined,
    });

    setResponse(res);
  };

  const handlePresetSelect = (preset: ODataPreset) => {
    setMethod(preset.method);
    setUrl(preset.path);
    if (preset.body) {
      setRequestBody(preset.body);
    }
  };

  const handleResetDb = () => {
    resetODataDatabase();
    setResponse(null);
  };

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
    if (status >= 400 && status < 500) return 'text-amber-400 bg-amber-950/60 border-amber-800';
    return 'text-rose-400 bg-rose-950/60 border-rose-800';
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">OData v4 Live Query Explorer</h2>
            <SimulationBadge />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Query, create, and modify mock SAP BTP enterprise entities with real OData v4 protocol semantics ($select, $filter, $expand).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDb}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset Mock DB
          </Button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Database className="w-3.5 h-3.5" />
            <span>In-Memory OData v4</span>
          </div>
        </div>
      </div>

      {/* Preset Chips */}
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sap-blue-500" />
          <span>Quick Query Presets</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetSelect(p)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  p.method === 'GET'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    : p.method === 'POST'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {p.method}
              </span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* URL Request Bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as ODataHttpMethod)}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs font-bold focus:ring-2 focus:ring-sap-blue-500"
          aria-label="HTTP Method"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/odata/v4/catalog/Employees"
            className="w-full px-3 py-2 font-mono text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-sap-blue-500"
            aria-label="OData Request URL"
          />
        </div>

        {/* Auth Simulation Dropdown */}
        <select
          value={simulateAuth}
          onChange={(e) => setSimulateAuth(e.target.value as 'normal' | '401' | '403' | '500')}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans text-xs focus:ring-2 focus:ring-sap-blue-500"
          aria-label="Simulation Auth Condition"
        >
          <option value="normal">Auth: Valid Bearer Token (200)</option>
          <option value="401">Simulate 401 Unauthorized (Missing Token)</option>
          <option value="403">Simulate 403 Forbidden (Missing Scope)</option>
          <option value="500">Simulate 500 Internal Error</option>
        </select>

        <Button
          variant="primary"
          onClick={handleSend}
          leftIcon={<Send className="w-3.5 h-3.5" />}
        >
          Send Request
        </Button>
      </div>

      {/* Request Body (for POST / PATCH) */}
      {(method === 'POST' || method === 'PATCH') && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden">
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold">Request Body (application/json)</span>
            <span className="text-slate-500 font-mono text-[11px]">Valid JSON required</span>
          </div>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            rows={5}
            className="w-full p-3 bg-transparent text-slate-100 font-mono text-xs focus:outline-none resize-y"
            spellCheck={false}
            aria-label="JSON Request Body"
          />
        </div>
      )}

      {/* Response Panel */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        {/* Response Status Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-300">Response</span>
            {response ? (
              <span
                className={`px-2 py-0.5 rounded-full border text-[11px] font-mono font-bold ${getStatusColor(
                  response.status
                )}`}
              >
                {response.status} {response.statusText}
              </span>
            ) : (
              <span className="text-slate-500 italic">No request sent yet</span>
            )}
            {response && (
              <span className="text-slate-400 font-mono text-[11px]">{response.executionTimeMs} ms</span>
            )}
          </div>

          {response && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('body')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  activeTab === 'body'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Body
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('headers')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  activeTab === 'headers'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Headers ({Object.keys(response.headers).length})
              </button>
              <button
                type="button"
                onClick={() => handleCopy(JSON.stringify(response.data, null, 2))}
                className="px-2.5 py-1 rounded text-xs text-slate-400 hover:text-white flex items-center gap-1 border border-slate-800"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Response Content */}
        <div className="p-4 min-h-[240px] max-h-[420px] overflow-auto font-mono text-xs text-slate-100">
          {!response ? (
            <div className="h-48 flex flex-col items-center justify-center text-slate-500 space-y-2">
              <Terminal className="w-8 h-8 opacity-40" />
              <p>Select a preset or enter an endpoint URL and click "Send Request"</p>
            </div>
          ) : activeTab === 'body' ? (
            <pre className="text-emerald-300 leading-relaxed whitespace-pre overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          ) : (
            <div className="space-y-1.5 text-slate-300">
              {Object.entries(response.headers).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-sap-blue-400 font-semibold">{k}:</span>
                  <span className="text-slate-200">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
