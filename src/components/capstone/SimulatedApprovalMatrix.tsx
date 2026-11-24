import React, { useState } from 'react';
import { User, CheckCircle2, XCircle, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { CapstoneSimulationBanner } from './CapstoneSimulationBanner';

type Persona = 'alice' | 'bob' | 'carol';

interface LeaveRequestItem {
  id: string;
  requestNumber: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
}

interface BalanceItem {
  type: string;
  entitlement: number;
  used: number;
  pending: number;
  available: number;
}

export const SimulatedApprovalMatrix: React.FC = () => {
  const [activePersona, setActivePersona] = useState<Persona>('alice');
  const [managerComments, setManagerComments] = useState('');
  const [formError, setFormError] = useState('');
  const [auditLogs, setAuditLogs] = useState<string[]>([
    '2026-11-20: System initialized balance of 25 days for Alice Smith.',
  ]);

  // Initial mock state
  const [balances, setBalances] = useState<BalanceItem>({
    type: 'Annual Leave',
    entitlement: 25.0,
    used: 5.0,
    pending: 0.0,
    available: 20.0,
  });

  const [requests, setRequests] = useState<LeaveRequestItem[]>([
    {
      id: 'req-1001',
      requestNumber: 1001,
      employeeName: 'Alice Smith',
      leaveType: 'Annual Leave',
      startDate: '2026-03-10',
      endDate: '2026-03-14',
      totalDays: 5.0,
      reason: 'Spring Break',
      status: 'Approved',
    },
  ]);

  // Form inputs for Alice
  const [newStartDate, setNewStartDate] = useState('2026-07-06');
  const [newEndDate, setNewEndDate] = useState('2026-07-10');
  const [newReason, setNewReason] = useState('Family summer vacation');

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation 1: Date chronology
    if (new Date(newStartDate) > new Date(newEndDate)) {
      setFormError('Validation Error (400): Start date cannot be after end date.');
      return;
    }

    // Days calculation (rough calendar)
    const diff =
      Math.floor(
        (new Date(newEndDate).getTime() - new Date(newStartDate).getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    // Validation 2: Overlap check
    const hasOverlap = requests.some(
      (r) =>
        (r.status === 'Pending' || r.status === 'Approved') &&
        newStartDate <= r.endDate &&
        newEndDate >= r.startDate
    );
    if (hasOverlap) {
      setFormError('Conflict Error (409): Overlaps with an existing leave request.');
      return;
    }

    // Validation 3: Balance check
    if (diff > balances.available) {
      setFormError(`Insufficient Balance (400): Requested ${diff} days, but only ${balances.available} available.`);
      return;
    }

    // Create & Submit
    const newReq: LeaveRequestItem = {
      id: `req-${Date.now()}`,
      requestNumber: requests.length + 1001,
      employeeName: 'Alice Smith',
      leaveType: 'Annual Leave',
      startDate: newStartDate,
      endDate: newEndDate,
      totalDays: diff,
      reason: newReason,
      status: 'Pending',
    };

    setRequests([newReq, ...requests]);
    setBalances((prev) => ({
      ...prev,
      pending: prev.pending + diff,
      available: prev.available - diff,
    }));

    setAuditLogs((prev) => [
      `Just now: Alice Smith submitted Request #${newReq.requestNumber} for ${diff} days (Pending Manager Approval).`,
      ...prev,
    ]);
  };

  const handleApprove = (reqId: string) => {
    const target = requests.find((r) => r.id === reqId);
    if (!target) return;

    setRequests(
      requests.map((r) => (r.id === reqId ? { ...r, status: 'Approved' } : r))
    );

    // Atomically shift pending to used
    setBalances((prev) => ({
      ...prev,
      pending: Math.max(0, prev.pending - target.totalDays),
      used: prev.used + target.totalDays,
    }));

    setAuditLogs((prev) => [
      `Just now: Bob Jones (Manager) APPROVED Request #${target.requestNumber}. Comments: "${
        managerComments || 'Approved'
      }".`,
      ...prev,
    ]);
    setManagerComments('');
  };

  const handleReject = (reqId: string) => {
    const target = requests.find((r) => r.id === reqId);
    if (!target) return;

    setRequests(
      requests.map((r) => (r.id === reqId ? { ...r, status: 'Rejected' } : r))
    );

    // Release pending balance
    setBalances((prev) => ({
      ...prev,
      pending: Math.max(0, prev.pending - target.totalDays),
      available: prev.available + target.totalDays,
    }));

    setAuditLogs((prev) => [
      `Just now: Bob Jones (Manager) REJECTED Request #${target.requestNumber}. Comments: "${
        managerComments || 'Rejected'
      }".`,
      ...prev,
    ]);
    setManagerComments('');
  };

  return (
    <div className="space-y-4">
      <CapstoneSimulationBanner sourceFilePath="projects/employee-leave-management/srv/manager-service.js" />

      <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/90">
        {/* Persona Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4 dark:border-stone-800">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Role-Based Approval Workflow Simulator
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Switch personas to experience end-to-end request submission, validation checks, and manager approval.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-stone-100 p-1 dark:bg-stone-800">
            <button
              onClick={() => setActivePersona('alice')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activePersona === 'alice'
                  ? 'bg-white text-indigo-700 shadow-sm dark:bg-stone-700 dark:text-white'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Alice (Employee)</span>
            </button>
            <button
              onClick={() => setActivePersona('bob')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activePersona === 'bob'
                  ? 'bg-white text-indigo-700 shadow-sm dark:bg-stone-700 dark:text-white'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Bob (Manager)</span>
              {requests.some((r) => r.status === 'Pending') && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                  {requests.filter((r) => r.status === 'Pending').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActivePersona('carol')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activePersona === 'carol'
                  ? 'bg-white text-indigo-700 shadow-sm dark:bg-stone-700 dark:text-white'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300'
              }`}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Carol (Admin)</span>
            </button>
          </div>
        </div>

        {/* Live Balance Dashboard */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">Total Entitlement</span>
            <div className="mt-1 text-lg font-bold text-stone-900 dark:text-stone-100">{balances.entitlement} Days</div>
          </div>
          <div className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">Used Days</span>
            <div className="mt-1 text-lg font-bold text-stone-900 dark:text-stone-100">{balances.used} Days</div>
          </div>
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
            <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400">Pending Approval</span>
            <div className="mt-1 text-lg font-bold text-amber-900 dark:text-amber-200">{balances.pending} Days</div>
          </div>
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">Available Days</span>
            <div className="mt-1 text-lg font-bold text-emerald-900 dark:text-emerald-200">{balances.available} Days</div>
          </div>
        </div>

        {/* Persona Views */}
        <div className="mt-6">
          {activePersona === 'alice' && (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-950 dark:bg-indigo-950/20">
              <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
                Alice Smith — Apply for Leave
              </h4>
              <form onSubmit={handleApplyLeave} className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="alice-start-date" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Start Date
                  </label>
                  <input
                    id="alice-start-date"
                    type="date"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-300 bg-white p-2 text-xs dark:border-stone-700 dark:bg-stone-800"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="alice-end-date" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    End Date
                  </label>
                  <input
                    id="alice-end-date"
                    type="date"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-300 bg-white p-2 text-xs dark:border-stone-700 dark:bg-stone-800"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="alice-reason" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Reason
                  </label>
                  <input
                    id="alice-reason"
                    type="text"
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-300 bg-white p-2 text-xs dark:border-stone-700 dark:bg-stone-800"
                    required
                  />
                </div>
                <div className="sm:col-span-3 flex items-center justify-between pt-2">
                  {formError ? (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>{formError}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-stone-500">
                      Submitting triggers canonical overlap & balance validation.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Submit for Approval
                  </button>
                </div>
              </form>
            </div>
          )}

          {activePersona === 'bob' && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-950 dark:bg-emerald-950/20">
              <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                Bob Jones (Manager) — Pending Approvals Inbox
              </h4>
              <div className="mt-3 space-y-3">
                {requests.filter((r) => r.status === 'Pending').length === 0 ? (
                  <p className="text-xs text-stone-500">No requests pending your approval right now.</p>
                ) : (
                  requests
                    .filter((r) => r.status === 'Pending')
                    .map((req) => (
                      <div
                        key={req.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-3 shadow-sm dark:border-stone-700 dark:bg-stone-800"
                      >
                        <div>
                          <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                            {req.employeeName} — {req.leaveType} ({req.totalDays} Days)
                          </div>
                          <div className="text-xs text-stone-500">
                            {req.startDate} to {req.endDate} | Reason: &quot;{req.reason}&quot;
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor={`manager-comment-${req.id}`} className="sr-only">
                            Manager Comments
                          </label>
                          <input
                            id={`manager-comment-${req.id}`}
                            type="text"
                            placeholder="Approval notes (optional)"
                            value={managerComments}
                            onChange={(e) => setManagerComments(e.target.value)}
                            className="rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-1 text-xs dark:border-stone-700 dark:bg-stone-900"
                          />
                          <button
                            onClick={() => handleApprove(req.id)}
                            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(req.id)}
                            className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-500"
                          >
                            <XCircle className="h-3 w-3" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {activePersona === 'carol' && (
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Carol White (HR Admin) — Policy & Accrual Administration
              </h4>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Trigger company-wide annual entitlement allocation runs for the 2026 fiscal year.
              </p>
              <div className="mt-3">
                <button
                  onClick={() => {
                    setAuditLogs((prev) => [
                      'Just now: Carol White triggered annual accrual run for year 2026: 3 employee balances synchronized.',
                      ...prev,
                    ]);
                  }}
                  className="rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
                >
                  Run 2026 Annual Accrual
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Audit Log Stream */}
        <div className="mt-6 border-t border-stone-100 pt-4 dark:border-stone-800">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Immutable Audit Trail (ApprovalLogs)
          </div>
          <div className="mt-2 max-h-32 overflow-y-auto space-y-1 font-mono text-[11px] text-stone-600 dark:text-stone-400">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-indigo-500">›</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
