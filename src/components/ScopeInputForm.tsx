import React, { useState } from 'react';
import { Play, Sparkles, RefreshCw, Clock, DollarSign, FileText, UploadCloud, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ScopeAuditReport, AgencyBranding } from '../types';
import { parseScopeComparison } from '../utils/parser';
import { recordTelemetryEvent } from '../utils/telemetry';

interface ScopeInputFormProps {
  onAuditComplete: (report: ScopeAuditReport) => void;
  branding?: AgencyBranding;
}

const SAMPLE_CONTRACT = `1. Responsive Web Application with Next.js & Tailwind CSS
2. User Authentication (Google & Email/Password)
3. Stripe Standard Subscription Checkout Integration
4. PostgreSQL Database with Prisma ORM on Supabase
5. Automated CI/CD deployment on Vercel with Custom Domain setup`;

const SAMPLE_REQUESTS = `1. Add complete native iOS and Android Mobile App alongside web version
2. Integrate ChatGPT API for automated content generation in client dashboard
3. Add Salesforce and HubSpot Bi-directional Two-way CRM sync
4. Complete UI redesign with customized Dark Mode and Theme Switcher
5. Send Real-time SMS notifications to users via Twilio on every account event
6. Full Multi-lingual support (Spanish, French, German, Japanese translations)`;

export const ScopeInputForm: React.FC<ScopeInputFormProps> = ({ onAuditComplete, branding }) => {
  const [projectName, setProjectName] = useState('Fintech Web Portal MVP');
  const [clientName, setClientName] = useState('Apex Horizon Ventures LLC');
  const [clientEmail, setClientEmail] = useState('founder@apexventures.io');
  const [contractBudget, setContractBudget] = useState(15000);
  const [hourlyRate, setHourlyRate] = useState(125);
  const [contractWeeks, setContractWeeks] = useState(6);
  const [contractText, setContractText] = useState(SAMPLE_CONTRACT);
  const [requestsText, setRequestsText] = useState(SAMPLE_REQUESTS);
  const [isAuditing, setIsAuditing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploaded'>('idle');

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);

    setTimeout(() => {
      const report = parseScopeComparison(
        contractText,
        requestsText,
        hourlyRate,
        contractBudget,
        contractWeeks,
        projectName,
        clientName,
        clientEmail,
        branding
      );
      onAuditComplete(report);
      recordTelemetryEvent('run_audit', `Analyzed "${projectName}" for client "${clientName}" — $${report.totalScopeCreepCost.toLocaleString()} scope creep detected`);
      setIsAuditing(false);
    }, 450);
  };

  const handleLoadDemo = () => {
    setProjectName('E-Commerce Cloud Engine');
    setClientName('Vanguard Global Brands');
    setContractBudget(22000);
    setHourlyRate(140);
    setContractWeeks(8);
    setContractText(SAMPLE_CONTRACT);
    setRequestsText(SAMPLE_REQUESTS);
    setUploadStatus('idle');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'contract' | 'requests') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (target === 'contract') {
        setContractText(content.slice(0, 3000));
      } else {
        setRequestsText(content.slice(0, 3000));
      }
      setUploadStatus('uploaded');
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Audit Scope Creep & Auto-Detect Unbudgeted Tasks</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare contracted Statement of Work (SOW) against unvetted client Slack/email requests to produce legally-enforceable change orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadDemo}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 self-start sm:self-auto font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Load Real Agency Sample
          </button>
        </div>
      </div>

      <form onSubmit={handleRunAudit} className="mt-5 space-y-5">
        {/* Project Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Client Entity / Principal</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contract Baseline ($ USD)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 text-xs">$</span>
              <input
                type="number"
                value={contractBudget}
                onChange={(e) => setContractBudget(Number(e.target.value))}
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg pl-7 pr-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Agency Hourly Rate ($/hr)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 text-xs">$</span>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg pl-7 pr-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Comparison Engine with Instant File Drop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Baseline SOW */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Original Contract SOW (Items Included)
              </label>
              <label className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer flex items-center gap-1">
                <UploadCloud className="w-3 h-3" />
                <span>Upload SOW</span>
                <input
                  type="file"
                  accept=".txt,.md,.json"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'contract')}
                />
              </label>
            </div>
            <textarea
              rows={6}
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Paste original deliverables from agreed contract..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg p-3 text-xs text-slate-200 font-mono resize-none leading-relaxed"
            />
          </div>

          {/* Uncontracted Requests */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Current Client Requests / Slack Messages
              </label>
              <label className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer flex items-center gap-1">
                <UploadCloud className="w-3 h-3" />
                <span>Upload Chat/Reqs</span>
                <input
                  type="file"
                  accept=".txt,.md,.json"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'requests')}
                />
              </label>
            </div>
            <textarea
              rows={6}
              value={requestsText}
              onChange={(e) => setRequestsText(e.target.value)}
              placeholder="Paste recent client messages or feature requests..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg p-3 text-xs text-slate-200 font-mono resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Detects out-of-scope variations under statutory contract baseline standards.</span>
          </div>

          <button
            type="submit"
            disabled={isAuditing}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Statutory Audit...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run ScopeLock AI Audit</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
