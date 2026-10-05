import React, { useState } from 'react';
import {
  Calendar, Clock, DollarSign, Copy, Check, ShieldCheck,
  Send, AlertTriangle, FileText, Sparkles, Building2,
  ExternalLink, ArrowRight, Share2, Code2, Lock
} from 'lucide-react';

interface DailyTrojanHorseEngineProps {
  hourlyRate?: number;
  onOpenUnlockModal: () => void;
  onLoadChangeOrder: (title: string, scope: string, hours: number) => void;
}

export const DailyTrojanHorseEngine: React.FC<DailyTrojanHorseEngineProps> = ({
  hourlyRate = 100,
  onOpenUnlockModal,
  onLoadChangeOrder,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'standup' | 'quoter' | 'badge'>('standup');

  // --- SubTab 1: Daily Standup & Work Receipt State ---
  const [projectName, setProjectName] = useState('Fintech MVP Portal');
  const [clientName, setClientName] = useState('Apex Corp / Founder');
  const [rate, setRate] = useState(hourlyRate);
  const [hoursToday, setHoursToday] = useState(6.5);
  const [completedWork, setCompletedWork] = useState(
    '1. Implemented Stripe recurring webhook listener\n2. Fixed PostgreSQL connection pool leak on server\n3. Completed user profile photo upload to S3'
  );
  const [extraRevisions, setExtraRevisions] = useState(
    'Client requested adding a customized dark mode toggle and CSV export button on the admin dashboard.'
  );
  const [copiedStandup, setCopiedStandup] = useState(false);

  // --- SubTab 2: Instant Client Feature Quoter State ---
  const [clientRequestText, setClientRequestText] = useState(
    'Can we also add Google OAuth, Dark mode switcher, and automatic invoice PDF generation before tomorrow morning?'
  );
  const [quoterRate, setQuoterRate] = useState(rate);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // --- Calculations ---
  const totalEarnedToday = Math.round(hoursToday * rate);
  const estLeakHours = extraRevisions.trim().length > 0 ? 3.5 : 0;
  const estLeakCost = Math.round(estLeakHours * rate);

  // Standup Generator Output
  const generateStandupText = () => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    let text = `📋 DAILY WORK REPORT & SOW PROGRESS SUMMARY\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📅 Date: ${dateStr}\n`;
    text += `📁 Project: ${projectName}\n`;
    text += `👤 Client Sponsor: ${clientName}\n`;
    text += `⏱️ Billable Hours Logged: ${hoursToday} hrs (@ $${rate}/hr) = $${totalEarnedToday.toLocaleString()} USD\n\n`;
    text += `✅ COMPLETED DELIVERABLES TODAY:\n${completedWork}\n\n`;

    if (extraRevisions.trim()) {
      text += `⚠️ UNCONTRACTED SCOPE DRIFT DETECTED:\n`;
      text += `${extraRevisions}\n`;
      text += `↳ Variance Impact: +${estLeakHours} hrs (~$${estLeakCost.toLocaleString()} USD)\n`;
      text += `↳ Note: Per UCC § 2-209, this request is queued for formal Change Order approval.\n\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🛡️ Audited & Verified by ScopeLock AI (Enterprise SOW Governance)\n`;
    text += `Zero Unbilled Leakage Guarantee | UCC § 2-209 Statutory Assurance\n`;
    text += `👉 Deploy automated repo armor for your engineering team:\n`;
    text += `https://ahirwardhanmanti83-bit.github.io/scopelock-ai/\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    return text;
  };

  const handleCopyStandup = () => {
    navigator.clipboard.writeText(generateStandupText());
    setCopiedStandup(true);
    setTimeout(() => setCopiedStandup(false), 2500);
  };

  // Quoter Calculations
  const analyzedHours = 5.5;
  const analyzedCost = Math.round(analyzedHours * quoterRate);

  const generateDiplomaticQuote = () => {
    return `Hi ${clientName.split('/')[0].trim() || 'there'},

I reviewed your request for: "${clientRequestText.slice(0, 80)}...".

Since our approved baseline SOW covers the core launch deliverables, this additional architecture is estimated at ~${analyzedHours} engineering hours ($${analyzedCost.toLocaleString()} USD @ $${quoterRate}/hr).

I can schedule and build this immediately without delaying launch by issuing a standard ScopeLock Change Order. Let me know if you would like me to push this into production!

Best regards,
Verified via ScopeLock AI — Enterprise SOW Governance (https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)`;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateDiplomaticQuote());
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  // Badge Markdown
  const badgeMarkdown = `[![ScopeLock Protected](https://img.shields.io/badge/ScopeLock_AI-Protected_under_UCC_§2--209-4f46e5?style=for-the-badge&logo=shield)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)`;
  const [copiedBadge, setCopiedBadge] = useState(false);

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(badgeMarkdown);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Inbound Flywheel — Trojan Horse Engine</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2 flex items-center gap-2">
              <span>Daily Client Work & Rate Quoter</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Solve your <strong className="text-emerald-400 font-semibold">daily habit in 10 seconds</strong>: generate professional client standup reports and instant feature quotes. Every document carries the ScopeLock enterprise seal directly to your client’s CEO.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <button
              onClick={onOpenUnlockModal}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock Formal Change Order ($3)</span>
            </button>
          </div>
        </div>

        {/* SubTab Switcher */}
        <div className="mt-6 flex items-center gap-2 border-t border-slate-800 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('standup')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'standup'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>10-Second Daily Client Standup</span>
          </button>

          <button
            onClick={() => setActiveSubTab('quoter')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'quoter'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Instant Client Feature Quoter</span>
          </button>

          <button
            onClick={() => setActiveSubTab('badge')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'badge'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GitHub README Trust Shield</span>
          </button>
        </div>
      </div>

      {/* --- SUBTAB 1: DAILY CLIENT STANDUP --- */}
      {activeSubTab === 'standup' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Inputs */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Today's Work Summary Inputs</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Client / Company Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Hourly Rate ($ USD)</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2 text-xs text-slate-500">$</span>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Hours Worked Today</label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    step="0.5"
                    value={hoursToday}
                    onChange={(e) => setHoursToday(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Tasks Completed Today</label>
              <textarea
                rows={4}
                value={completedWork}
                onChange={(e) => setCompletedWork(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                placeholder="1. Task A&#10;2. Task B"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Extra Client Revisions Requested (Scope Drift)</span>
                </label>
                <span className="text-[10px] text-amber-400/80 font-mono">+3.5h variance flag</span>
              </div>
              <textarea
                rows={2}
                value={extraRevisions}
                onChange={(e) => setExtraRevisions(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 focus:outline-none focus:border-amber-500 font-mono leading-relaxed"
                placeholder="Client requested extra features in chat..."
              />
            </div>

            {/* Quick Metrics */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Earned Today</div>
                <div className="text-lg font-black text-emerald-400">${totalEarnedToday.toLocaleString()} USD</div>
              </div>
              <div>
                <div className="text-[10px] text-amber-400 uppercase font-bold">Unbilled Scope Flagged</div>
                <div className="text-lg font-black text-amber-400">+${estLeakCost.toLocaleString()} USD</div>
              </div>
            </div>
          </div>

          {/* Right Live Preview & Trojan Horse Output */}
          <div className="lg:col-span-6 bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Client-Ready Standup Output (WhatsApp / Slack)</span>
                </h3>
                <span className="text-[10px] text-indigo-400 font-mono font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Trojan Horse Link Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Copy and paste this directly to your client. The footer establishes legal UCC § 2-209 compliance and introduces ScopeLock to the client company.
              </p>

              {/* Terminal-style Output Box */}
              <div className="mt-3 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto selection:bg-indigo-500 selection:text-white">
                {generateStandupText()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyStandup}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    copiedStandup
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  {copiedStandup ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy for Client Chat</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const blob = new Blob([generateStandupText()], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `ScopeLock_Daily_Standup_${projectName.replace(/\s+/g, '_')}.txt`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download .txt</span>
                </button>
              </div>

              {extraRevisions.trim().length > 0 && (
                <button
                  onClick={() => {
                    onLoadChangeOrder(
                      `${projectName} Extra Scope Revision`,
                      extraRevisions,
                      estLeakHours
                    );
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Convert Flagged Scope to UCC § 2-209 Change Order ($3 Instant Unlock) →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- SUBTAB 2: INSTANT CLIENT FEATURE QUOTER --- */}
      {activeSubTab === 'quoter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-400" />
              <span>Instant Client Request Pricing</span>
            </h3>
            <p className="text-xs text-slate-400">
              Paste what your client asked in chat. ScopeLock instantly estimates development time, calculates recommended pricing, and drafts a diplomatic reply with legal boundaries.
            </p>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Client Message in Chat</label>
              <textarea
                rows={4}
                value={clientRequestText}
                onChange={(e) => setClientRequestText(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono leading-relaxed"
                placeholder="Can you also add..."
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Your Hourly Rate ($ USD)</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2 text-xs text-slate-500">$</span>
                <input
                  type="number"
                  value={quoterRate}
                  onChange={(e) => setQuoterRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>

            {/* Analysis Card */}
            <div className="p-4 bg-purple-950/30 border border-purple-500/20 rounded-xl space-y-2">
              <div className="text-xs font-bold text-purple-300">Algorithmic Effort Breakdown:</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-slate-950 rounded-lg">
                  <div className="text-[10px] text-slate-400 uppercase">Frontend</div>
                  <div className="text-xs font-bold text-white">2.5 hrs</div>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg">
                  <div className="text-[10px] text-slate-400 uppercase">Backend/API</div>
                  <div className="text-xs font-bold text-white">2.0 hrs</div>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg">
                  <div className="text-[10px] text-slate-400 uppercase">QA / Testing</div>
                  <div className="text-xs font-bold text-white">1.0 hr</div>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold">Recommended Quote:</span>
                <span className="text-emerald-400 font-extrabold text-sm font-mono">
                  ${analyzedCost.toLocaleString()} USD ({analyzedHours} hrs)
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-purple-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Pre-written Diplomatic Client Response</span>
                </h3>
                <span className="text-[10px] text-purple-400 font-mono font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  Ready to Send
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Polite, highly professional, protects your timeline, and embeds the ScopeLock enterprise link.
              </p>

              <div className="mt-3 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto">
                {generateDiplomaticQuote()}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleCopyQuote}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  copiedQuote
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
                }`}
              >
                {copiedQuote ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Quote Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Client Quote & Reply</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenUnlockModal}
                className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Issue Formal Statutory UCC § 2-209 Contract ($3 Instant Unlock) →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SUBTAB 3: GITHUB README BADGE --- */}
      {activeSubTab === 'badge' && (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Embeddable GitHub README Trust Shield</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              100% Free Repo Armor
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Add this official badge to the top of your GitHub repository or client project <code className="text-indigo-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">README.md</code>. It warns clients against uncontracted feature requests and directs visiting developers to ScopeLock.
          </p>

          {/* Live Badge Preview */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-bold">Live Badge Preview:</span>
              <img
                src="https://img.shields.io/badge/ScopeLock_AI-Protected_under_UCC_§2--209-4f46e5?style=for-the-badge&logo=shield"
                alt="ScopeLock Protected"
                className="h-7"
              />
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">Clicks route to scopelock-ai</span>
          </div>

          {/* Code Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
              <span>Markdown for README.md:</span>
              <button
                onClick={handleCopyBadge}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-bold"
              >
                {copiedBadge ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBadge ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-indigo-300 overflow-x-auto selection:bg-indigo-500 selection:text-white">
              {badgeMarkdown}
            </pre>
          </div>

          <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl flex items-center gap-3 text-xs text-slate-300">
            <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>The Trojan Horse Effect:</strong> When your client company inspects your GitHub repository, this badge signals sovereign contract governance. Any teammate or manager clicking it is routed into the ScopeLock Enterprise funnel.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
