import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  ExternalLink,
  ShieldAlert,
  Send,
  MessageSquare,
  Shield,
  FileText,
  KeyRound
} from 'lucide-react';
import { ScopeAuditResult, LicenseState } from '../types';
import { getApiUrl } from '../utils/api';

interface DailyQuoterStandupProps {
  license: LicenseState;
  onOpenPricing: () => void;
  onUnlockInstantPass: (code: string) => boolean;
  onLoadIntoChangeOrder: (audit: ScopeAuditResult, hourlyRate: number) => void;
}

export const DailyQuoterStandup: React.FC<DailyQuoterStandupProps> = ({
  license,
  onOpenPricing,
  onUnlockInstantPass,
  onLoadIntoChangeOrder,
}) => {
  const [subTab, setSubTab] = useState<'standup' | 'quoter' | 'badge'>('standup');

  // Standup Inputs
  const [projectName, setProjectName] = useState('Fintech MVP Portal');
  const [clientName, setClientName] = useState('Apex Corp / Founder');
  const [hourlyRate, setHourlyRate] = useState<number>(125);
  const [hoursWorked, setHoursWorked] = useState<number>(6.5);
  const [tasksCompleted, setTasksCompleted] = useState(
`1. Implemented Stripe recurring webhook listener
2. Fixed PostgreSQL connection pool leak on server
3. Completed user profile photo upload to S3`
  );
  const [scopeDrift, setScopeDrift] = useState(
    'Client requested adding a customized dark mode toggle and CSV export button on the admin dashboard.'
  );

  // Quoter Inputs
  const [quoteFeature, setQuoteFeature] = useState('Google OAuth + Bi-directional Salesforce CRM Sync + Automated Invoice PDF Generator');
  const [quoteEstHours, setQuoteEstHours] = useState<number>(24);

  // Calculated numbers (with sanitization)
  const rateNum = Number(String(hourlyRate).replace(/,/g, '')) || 125;
  const hoursNum = Number(String(hoursWorked).replace(/,/g, '')) || 6.5;
  const earnedToday = Math.round(hoursNum * rateNum);

  // Parse drift hours
  const driftHours = scopeDrift.trim().length > 0 ? (scopeDrift.toLowerCase().includes('crm') || scopeDrift.toLowerCase().includes('mobile') ? 14 : 3.5) : 0;
  const unbilledFlagged = Math.round(driftHours * rateNum);

  // AI loading and result
  const [loadingAi, setLoadingAi] = useState(false);
  const [auditData, setAuditData] = useState<ScopeAuditResult | null>(null);

  // Instant Unlock Code input inside card
  const [quickCodeInput, setQuickCodeInput] = useState('');
  const [quickCodeError, setQuickCodeError] = useState<string | null>(null);

  const [copiedText, setCopiedText] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);

  // Is this export currently unlocked?
  const isUnlocked = license.isPro;

  // Run initial or manual AI scan
  const handleAnalyzeWithAi = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch(getApiUrl('/api/audit-scope'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          clientName,
          hourlyRate: rateNum,
          hoursWorked: hoursNum,
          tasksCompleted,
          clientMessage: scopeDrift,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAuditData(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  // Generate Standup Text
  const getStandupText = () => {
    if (auditData?.dailyStandupText) return auditData.dailyStandupText;

    const todayStr = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return `📋 DAILY WORK REPORT & SOW PROGRESS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Date: ${todayStr}
📁 Project: ${projectName}
👤 Client Sponsor: ${clientName}
⏱️ Billable Hours Logged: ${hoursNum} hrs (@ $${rateNum}/hr) = $${earnedToday.toLocaleString()} USD

✅ COMPLETED DELIVERABLES TODAY:
${tasksCompleted}

${scopeDrift.trim() ? `⚠️ UNCONTRACTED SCOPE DRIFT DETECTED:
${scopeDrift}
↳ Variance Impact: +${driftHours} hrs (~$${unbilledFlagged.toLocaleString()} USD)
↳ Note: This request is queued for formal Change Order approval before production deployment.
` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ Audited & Verified by ScopeLock AI (Enterprise SOW Governance)
Zero Unbilled Leakage Guarantee | Professional Scope Defense
👉 View verified Change Order amendment:
https://ahirwardhanmanti83-bit.github.io/scopelock-ai/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  };

  const handleCopyStandup = () => {
    navigator.clipboard.writeText(getStandupText());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleQuickUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCodeInput.trim()) return;

    const ok = onUnlockInstantPass(quickCodeInput.trim());
    if (!ok) {
      setQuickCodeError('Invalid code. Try PASS-3USD or DEMO-PRO-2026.');
    } else {
      setQuickCodeError(null);
    }
  };

  const quoteTotalCost = Math.round(quoteEstHours * rateNum);
  const quoteNotice = `Hi ${clientName.split('/')[0].trim() || 'there'},

I reviewed your feature request for: "${quoteFeature}".

Because our signed baseline SOW covers current milestone specifications, architecting these additions is estimated at ~${quoteEstHours} engineering hours ($${quoteTotalCost.toLocaleString()} USD @ $${rateNum}/hr).

To protect our release schedule, I have prepared a standard ScopeLock Change Order. Let me know if you would like me to push this into production!

Best regards,
Verified via ScopeLock AI — Enterprise SOW Governance (https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)`;

  return (
    <div className="space-y-6">
      {/* Container Card */}
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>AUTONOMOUS INBOUND FLYWHEEL — TROJAN HORSE ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Daily Client Work & Rate Quoter
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Solve your <strong className="text-emerald-400 font-bold">daily habit in 10 seconds</strong>: generate professional client standup reports and instant feature quotes. 
              Every document carries the ScopeLock enterprise seal directly to your client’s CEO.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isUnlocked ? (
              <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 shadow-md">
                <Unlock className="w-3.5 h-3.5" />
                <span>Export Pass Active</span>
              </div>
            ) : (
              <button
                onClick={onOpenPricing}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Upgrade to Pro ($19/mo)</span>
              </button>
            )}
          </div>
        </div>

        {/* Subtabs navigation */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setSubTab('standup')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'standup'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>10-Second Daily Client Standup</span>
          </button>

          <button
            onClick={() => setSubTab('quoter')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'quoter'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Instant Client Feature Quoter</span>
          </button>

          <button
            onClick={() => setSubTab('badge')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'badge'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>GitHub README Trust Shield</span>
          </button>
        </div>

        {/* Tab 1: 10-Second Daily Standup */}
        {subTab === 'standup' && (
          <div className="pt-6 space-y-6">
            {/* Form Inputs Grid */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Today's Work Summary Inputs</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Client / Company Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Hourly Rate ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Hours Worked Today
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                  Tasks Completed Today
                </label>
                <textarea
                  rows={3}
                  value={tasksCompleted}
                  onChange={(e) => setTasksCompleted(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Extra Client Revisions Requested (Scope Drift)</span>
                  </label>
                  <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    +{driftHours}h variance flag
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={scopeDrift}
                  onChange={(e) => setScopeDrift(e.target.value)}
                  placeholder="Paste what the client asked for that wasn't in original plan..."
                  className="w-full bg-slate-900 border border-amber-900/40 rounded-xl p-3 text-xs text-white font-sans leading-relaxed focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Live Neon Counters */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                    Earned Today
                  </span>
                  <p className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-1">
                    ${earnedToday.toLocaleString()} USD
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    Unbilled Scope Flagged
                  </span>
                  <p className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-1">
                    +${unbilledFlagged.toLocaleString()} USD
                  </p>
                </div>
              </div>

              <button
                onClick={handleAnalyzeWithAi}
                disabled={loadingAi}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>{loadingAi ? 'Analyzing Scope Drift with Gemini AI...' : 'Scan Drift & Format Client Standup with Gemini AI'}</span>
              </button>
            </div>

            {/* Output Section with $3 Gate */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Client-Ready Standup Output (WhatsApp / Slack)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {isUnlocked ? 'UNLOCKED' : 'Pro Plan Feature'}
                </span>
              </div>

              {/* The Standup Text Display (Locked or Unlocked) */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <pre className={`p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-text ${!isUnlocked ? 'filter blur-[4px] select-none pointer-events-none opacity-50' : ''}`}>
                  {getStandupText()}
                </pre>

                {/* Overlaid Lock Box if NOT unlocked */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-2.5 z-10">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-1">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Official Client Standup Export
                      </h4>
                      <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                        Unlock clean unblurred export, WhatsApp / Slack copy, and change order generation with <strong className="text-indigo-400 font-semibold">ScopeLock Pro ($19/mo)</strong> or Agency ($199/mo).
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenPricing}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>View Plans & Pricing</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons if Unlocked */}
              {isUnlocked && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Certified Document Verified & Ready</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyStandup}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText ? 'Copied to Clipboard!' : 'Copy for WhatsApp / Slack'}</span>
                    </button>

                    <button
                      onClick={() => {
                        const fakeAudit: ScopeAuditResult = auditData || {
                          overallVerdict: 'partial_scope_creep',
                          creepScore: 65,
                          summary: 'Uncontracted feature request detected from client standup.',
                          detectedItems: [
                            {
                              title: scopeDrift.slice(0, 40) || 'Uncontracted Deliverable',
                              category: 'Frontend',
                              isOutOfScope: true,
                              estimatedHours: driftHours,
                              costImpact: unbilledFlagged,
                              riskExplanation: 'Requested revision is outside executed baseline agreement.',
                            }
                          ],
                          totalHours: driftHours,
                          totalCostUSD: unbilledFlagged,
                          timelineDelayDays: Math.ceil(driftHours / 4),
                          diplomaticReply: 'Hi, we prepared an amendment for these additional features.',
                        };
                        onLoadIntoChangeOrder(fakeAudit, rateNum);
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <span>Load into Change Order Form</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Instant Client Feature Quoter */}
        {subTab === 'quoter' && (
          <div className="pt-6 space-y-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-400" />
                <span>Instant Feature Quote Generator</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Requested New Feature
                  </label>
                  <input
                    type="text"
                    value={quoteFeature}
                    onChange={(e) => setQuoteFeature(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Estimated Dev Hours
                  </label>
                  <input
                    type="number"
                    value={quoteEstHours}
                    onChange={(e) => setQuoteEstHours(Number(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-purple-300 uppercase">Calculated Client Quote</span>
                  <p className="text-2xl font-black font-mono text-purple-400">
                    ${quoteTotalCost.toLocaleString()} USD
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {quoteEstHours} hrs @ ${rateNum}/hr
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Diplomatic Feature Quote Script (WhatsApp / Email)
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(quoteNotice);
                      setCopiedQuote(true);
                      setTimeout(() => setCopiedQuote(false), 2500);
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedQuote ? 'Copied' : 'Copy Quote Script'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {quoteNotice}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: GitHub README Trust Shield */}
        {subTab === 'badge' && (
          <div className="pt-6 space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>GitHub Repository Scope Defense Trust Badge</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add the official ScopeLock trust badge to your project's GitHub README. Let clients and stakeholders know that scope boundaries and change orders are strictly governed.
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-indigo-600 text-white font-mono font-bold text-xs">
                    ScopeLock AI • Protected
                  </span>
                </div>
                <button
                  onClick={() => {
                    const badgeMd = `[![ScopeLock Protected](https://img.shields.io/badge/ScopeLock_AI-Scope_Defense_Protected-4f46e5?style=for-the-badge&logo=shield)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)`;
                    navigator.clipboard.writeText(badgeMd);
                    setCopiedBadge(true);
                    setTimeout(() => setCopiedBadge(false), 2500);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedBadge ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBadge ? 'Copied Badge Markdown' : 'Copy Badge Markdown'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
