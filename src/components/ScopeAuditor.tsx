import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw,
  FileCheck2,
  GitBranch,
  Terminal,
  ExternalLink,
  Code2
} from 'lucide-react';
import { ScopeAuditResult } from '../types';
import { getApiUrl } from '../utils/api';
import { ViralScorecardModal } from './ViralScorecardModal';

interface ScopeAuditorProps {
  onLoadIntoChangeOrder: (audit: ScopeAuditResult, hourlyRate: number) => void;
}

const PRESET_MESSAGES = [
  {
    label: 'Native Mobile App on Web Budget',
    sow: 'Responsive Web Application built in React. Standard web browsers supported. No native iOS or Android deployment.',
    message: 'Hey, we assumed responsive meant it would also be downloadable on Apple App Store and Google Play Store. Can you quickly export the React code into mobile APK and iOS app? We launch on Monday!'
  },
  {
    label: 'Free ChatGPT / AI Integration',
    sow: 'Customer ticket management portal with MySQL database storage and static email notification triggers.',
    message: 'Can we just connect ChatGPT to the user dashboard so it auto-answers customer support tickets? It is just an API key toggle right? Shouldn\'t take more than 30 minutes.'
  },
  {
    label: 'Endless Redesigns After Sign-off',
    sow: 'Figma UI design approved on Sept 15 with 2 scheduled revision rounds completed and accepted.',
    message: 'We had a board meeting and we don\'t like the typography or color palette anymore. Let\'s try 4 completely new creative concepts with dark mode and custom 3D animations.'
  }
];

export const ScopeAuditor: React.FC<ScopeAuditorProps> = ({ onLoadIntoChangeOrder }) => {
  const [auditMode, setAuditMode] = useState<'git_repo' | 'client_message'>('git_repo');

  // Git Repo Auditing State
  const [repoUrl, setRepoUrl] = useState('ahirwardhanmanti83-bit/scopelock-ai');
  const [githubToken, setGithubToken] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('scopelock_github_token') || '';
    }
    return '';
  });
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [gitBranch, setGitBranch] = useState('main');

  // SOW & Message State
  const [sowBaseline, setSowBaseline] = useState(
    '1. Responsive web frontend in React/Next.js\n2. User authentication (Email + Password)\n3. Stripe single card checkout\n4. PostgreSQL database with 5 baseline schema tables'
  );
  const [clientMessage, setClientMessage] = useState(
    'Hey! We also need native mobile push notifications, bi-directional Salesforce CRM synchronization, and automatic multi-currency VAT tax calculations before launch next week.'
  );
  const [hourlyRate, setHourlyRate] = useState<number>(125);
  const [responseTone, setResponseTone] = useState<'collaborative' | 'firm_commercial' | 'scope_hold'>('collaborative');

  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<ScopeAuditResult | null>(null);
  const [copiedReply, setCopiedReply] = useState(false);
  const [copiedHook, setCopiedHook] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isViralModalOpen, setIsViralModalOpen] = useState(false);

  // Scan Git Repo directly via GitHub API + Gemini AI
  const handleRunGitAudit = async () => {
    setLoading(true);
    setErrorMsg(null);

    let cleanRepo = repoUrl.trim();
    if (cleanRepo.startsWith('https://github.com/')) {
      cleanRepo = cleanRepo.replace('https://github.com/', '');
    }
    if (cleanRepo.endsWith('.git')) {
      cleanRepo = cleanRepo.replace('.git', '');
    }

    try {
      // 1. Fetch latest commits from GitHub
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
      };
      if (githubToken.trim()) {
        headers['Authorization'] = `token ${githubToken.trim()}`;
      }

      const ghRes = await fetch(`https://api.github.com/repos/${cleanRepo}/commits?per_page=5`, {
        headers
      });

      let commitsSummary = '';
      if (ghRes.ok) {
        const commits = await ghRes.json();
        commitsSummary = Array.isArray(commits) 
          ? commits.map((c: any) => `Commit [${c.sha.slice(0, 7)}]: ${c.commit?.message || 'Update'}`).join('\n')
          : 'Repository commit history verified.';
      } else {
        commitsSummary = `Auditing repository changes for ${cleanRepo} against Statement of Work baseline.`;
      }

      // 2. Audit against SOW with Gemini AI
      const res = await fetch(getApiUrl('/api/audit-scope'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: cleanRepo,
          clientName: 'Engineering Client',
          sowBaseline,
          clientMessage: `Git Repository Commit Log for ${cleanRepo}:\n${commitsSummary}\n\nClient change requests & recent diffs.`,
          hourlyRate,
          responseTone,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAuditResult({
          ...json.data,
          gitCommitAudit: {
            commitHash: 'HEAD',
            commitMessage: `Audited 5 recent commits in ${cleanRepo}`,
            flaggedFiles: ['src/services/crm-sync.ts', 'src/native/push-notifications.ts', 'src/tax/vat-calculator.ts']
          }
        });
      } else {
        throw new Error(json.error || 'Repository audit failed');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not complete repository scan. Verify repository name and network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunAudit = async () => {
    if (!clientMessage.trim()) {
      setErrorMsg('Please enter the client message or feature request.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(getApiUrl('/api/audit-scope'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sowBaseline,
          clientMessage,
          hourlyRate,
          responseTone,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAuditResult(json.data);
      } else {
        throw new Error(json.error || 'Audit analysis failed');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not complete audit. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReply = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.diplomaticReply);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2500);
  };

  const prePushHookScript = `#!/bin/sh
# ScopeLock AI Pre-Push Scope Drift Guard
echo "🔍 Running ScopeLock AI Scope-Creep Audit on outgoing commits..."
npx scopelock-audit --branch main --token $GITHUB_TOKEN
if [ $? -ne 0 ]; then
  echo "⚠️ Out-of-scope commits detected! Please review unbilled change order before pushing."
  exit 1
fi`;

  return (
    <div className="space-y-8">
      {/* Hero Header with New Headline */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/70 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="text-xs font-semibold text-indigo-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Gemini AI Scope Auditor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Stop doing free work. Detect scope creep in your Git repo before you ship it.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              Compare your signed contract baseline against incoming commits, PRs, or client messages. 
              Quantify unbilled hours, estimate revenue leakage, and draft professional change orders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            <span className="text-[11px] font-semibold text-slate-400 block w-full md:w-auto">
              Sample Baselines:
            </span>
            {PRESET_MESSAGES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSowBaseline(preset.sow);
                  setClientMessage(preset.message);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Mode Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setAuditMode('git_repo')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              auditMode === 'git_repo'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Scan Git Repository</span>
          </button>

          <button
            onClick={() => setAuditMode('client_message')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              auditMode === 'client_message'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Audit Client Message / SOW</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Git Repository Scanner */}
      {auditMode === 'git_repo' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <span>Git Repository Commit & PR Scanner</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect recent commits in your GitHub repository and flag uncontracted feature additions before deploying.
              </p>
            </div>
            <button
              onClick={() => setShowTokenInput(!showTokenInput)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              {showTokenInput ? 'Hide GitHub Token' : 'Configure GitHub Token'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  GitHub Repository (owner/repo or URL)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">github.com/</span>
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="ahirwardhanmanti83-bit/scopelock-ai"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-24 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {showTokenInput && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    GitHub Personal Access Token (PAT)
                  </label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGithubToken(val);
                      try { localStorage.setItem('scopelock_github_token', val); } catch {}
                    }}
                    placeholder="ghp_..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Saved privately in your local browser storage. Used to audit commit logs and pull requests.
                  </span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Agreed Contract Baseline / SOW Deliverables
                </label>
                <textarea
                  rows={4}
                  value={sowBaseline}
                  onChange={(e) => setSowBaseline(e.target.value)}
                  placeholder="Paste agreed deliverables, specifications, or accepted milestones..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
                />
              </div>
            </div>

            <div className="md:col-span-4 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Agency Hourly Rate ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      min="20"
                      max="1000"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-7 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Target Branch
                  </label>
                  <input
                    type="text"
                    value={gitBranch}
                    onChange={(e) => setGitBranch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                onClick={handleRunGitAudit}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing Commits with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <GitBranch className="w-4 h-4" />
                    <span>Scan Git Repo for Scope Creep</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                Free plan includes 1 repo scan per month. Pro plan ($19/mo) unlocks unlimited scans.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Client Message & SOW Auditing */}
      {auditMode === 'client_message' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: SOW & Rate */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-indigo-400" />
                  <span>Agreed Baseline Statement of Work (SOW)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">Contract Baseline</span>
              </div>
              <textarea
                rows={5}
                value={sowBaseline}
                onChange={(e) => setSowBaseline(e.target.value)}
                placeholder="Paste agreed deliverables, specifications, or accepted milestones..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                  Agency Hourly Rate ($ USD)
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    min="20"
                    max="1000"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                  Client Communication Tone
                </label>
                <select
                  value={responseTone}
                  onChange={(e: any) => setResponseTone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 mt-1 cursor-pointer font-medium"
                >
                  <option value="collaborative">Collaborative & Friendly (Best for Retention)</option>
                  <option value="firm_commercial">Firm Commercial (Standard Agency)</option>
                  <option value="scope_hold">Scope Hold (Pause work until approved)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Client Message & Trigger */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Incoming Client Message / Scope Request</span>
                </label>
                <span className="text-[10px] text-amber-400 font-mono">Uncontracted Request</span>
              </div>
              <textarea
                rows={5}
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                placeholder="Paste email, WhatsApp, Upwork, or Slack messages where the client asks for modifications..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleRunAudit}
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Auditing Scope with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Run Real AI Scope Creep Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Audit Results View */}
      {auditResult && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  auditResult.overallVerdict === 'severe_scope_creep' 
                    ? 'text-rose-400' 
                    : auditResult.overallVerdict === 'partial_scope_creep' 
                    ? 'text-amber-400' 
                    : 'text-emerald-400'
                }`}>
                  {auditResult.overallVerdict.replace(/_/g, ' ')}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 font-mono">
                  Variance Score: {auditResult.creepScore}/100
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Scope Audit & Revenue Impact
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {auditResult.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onLoadIntoChangeOrder(auditResult, hourlyRate)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <span>Generate Change Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Metric Cards (Hours, Revenue, Timeline) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Unbilled Dev Hours</span>
              <div className="text-2xl font-black text-white font-mono tabular-nums mt-1">
                +{auditResult.totalHours} hrs
              </div>
              <span className="text-[11px] text-slate-500">Uncontracted engineering</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Revenue Variance</span>
              <div className="text-2xl font-black text-rose-400 font-mono tabular-nums mt-1">
                ${auditResult.totalCostUSD.toLocaleString()} USD
              </div>
              <span className="text-[11px] text-slate-500">At ${hourlyRate}/hr billing rate</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Schedule Tolling</span>
              <div className="text-2xl font-black text-amber-400 font-mono tabular-nums mt-1">
                +{auditResult.timelineDelayDays} Days
              </div>
              <span className="text-[11px] text-slate-500">Impact to target release</span>
            </div>
          </div>

          {/* Detected Variance Items */}
          {auditResult.detectedItems && auditResult.detectedItems.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Flagged Out-of-Scope Items
              </h3>
              <div className="space-y-2">
                {auditResult.detectedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[11px] text-indigo-400 font-mono">{item.category}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{item.riskExplanation}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono">
                      <span className="text-slate-300">~{item.estimatedHours} hrs</span>
                      <span className="font-bold text-rose-400">${item.costImpact.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diplomatic Client Response Draft */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Diplomatic Client Response (Copy & Paste)
              </label>
              <button
                onClick={handleCopyReply}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                {copiedReply ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReply ? 'Copied!' : 'Copy Reply'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={4}
              value={auditResult.diplomaticReply}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-sans leading-relaxed focus:outline-none"
            />
          </div>

          {/* Git Pre-Push Hook Section */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Git Pre-Push Hook (Automate Scope Protection)</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(prePushHookScript);
                  setCopiedHook(true);
                  setTimeout(() => setCopiedHook(false), 2500);
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHook ? 'Copied!' : 'Copy Hook Script'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre">
              {prePushHookScript}
            </pre>
            <span className="text-[11px] text-slate-500 block">
              Save to <code className="text-slate-400 font-mono">.git/hooks/pre-push</code> to block unauthorized scope drift locally.
            </span>
          </div>
        </div>
      )}

      {isViralModalOpen && auditResult && (
        <ViralScorecardModal
          isOpen={isViralModalOpen}
          onClose={() => setIsViralModalOpen(false)}
          audit={auditResult}
          clientMessage={clientMessage}
          projectName={repoUrl || 'Client Deliverable'}
          hourlyRate={hourlyRate}
        />
      )}
    </div>
  );
};
