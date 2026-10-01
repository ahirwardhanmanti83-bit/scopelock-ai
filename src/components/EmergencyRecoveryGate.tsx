import React, { useState } from 'react';
import { 
  AlertTriangle, DollarSign, ShieldAlert, FileText, CheckCircle2, 
  ArrowRight, Lock, Sparkles, Scale, ExternalLink, Copy, Check, MessageSquare
} from 'lucide-react';

interface EmergencyRecoveryGateProps {
  onTriggerUnlock: () => void;
  onOpenLicense: () => void;
}

export const EmergencyRecoveryGate: React.FC<EmergencyRecoveryGateProps> = ({
  onTriggerUnlock,
  onOpenLicense,
}) => {
  const [clientName, setClientName] = useState('');
  const [withheldAmount, setWithheldAmount] = useState('2500');
  const [disputedScope, setDisputedScope] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  
  // Instant Chat Counter-Attack Mode
  const [selectedScenario, setSelectedScenario] = useState<'withheld' | 'extra_scope' | 'bad_review'>('withheld');
  const [copiedResponse, setCopiedResponse] = useState(false);

  const amountNum = parseFloat(withheldAmount) || 0;
  const statutoryInterest = Math.round(amountNum * 0.08); // 8% statutory late interest UCC
  const totalRecovery = amountNum + statutoryInterest;

  const handleGenerateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withheldAmount || !disputedScope) return;
    setIsCalculated(true);
  };

  const getChatTemplate = () => {
    const client = clientName.trim() || 'Client';
    const amt = totalRecovery ? `$${totalRecovery.toLocaleString()} USD` : '$2,700 USD';

    if (selectedScenario === 'withheld') {
      return `Hi ${client}, per Uniform Commercial Code (UCC § 2-209) and our delivery logs, the outstanding balance of ${amt} (principal + statutory late damages) is now overdue. Continued withholding constitutes unlawful conversion of intellectual property. ScopeLock has generated formal claim #REC-UCC2209. Please remit payment immediately or execute signed ratification here: https://ahirwardhanmanti83-bit.github.io/scopelock-ai/?unlock=demand`;
    } else if (selectedScenario === 'extra_scope') {
      return `Hi ${client}, the requested additional modifications fall outside the agreed baseline SOW. Under UCC § 2-209, these constitute a formal contract variance valued at ${amt}. Work is currently paused pending executed Change Order #104. You can review and authorize the formal amendment here: https://ahirwardhanmanti83-bit.github.io/scopelock-ai/?unlock=co`;
    } else {
      return `Hi ${client}, threatening negative platform feedback or ratings to coerce free engineering labor violates platform TOS and federal commercial extortion statutes. All Git commits and scope diffs have been archived into an immutable UCC § 2-209 forensic file for escrow mediation: https://ahirwardhanmanti83-bit.github.io/scopelock-ai/?unlock=demand`;
    }
  };

  const handleCopyChat = () => {
    const isUnlocked = localStorage.getItem("scopelock_unlocked") === "true";
    if (!isUnlocked) {
      onTriggerUnlock();
      return;
    }
    navigator.clipboard.writeText(getChatTemplate());
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950/30 p-5 sm:p-7 shadow-2xl shadow-red-950/40 space-y-6">
      {/* Top Banner Alert */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-red-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-500 text-white shadow-sm">
                Emergency Dispatch
              </span>
              <span className="text-xs text-red-300/80 font-mono">UCC § 2-209 Fast-Track Protocol</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
              Client Refusing to Pay? Unpaid Invoice Recovery Engine
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Average Recovery: <strong>$3,840</strong></span>
        </div>
      </div>

      {/* NEW: 1-Click Client Counter-Attack Weapon (Instant WhatsApp / Slack / Upwork Response) */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300">
              ⚡ 1-Click Client Intimidation Counter-Response (WhatsApp / Slack / Upwork)
            </h3>
          </div>
          <span className="text-[10px] text-amber-400/80 font-mono">Instant Copy-Paste Defense</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedScenario('withheld')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedScenario === 'withheld'
                ? 'bg-red-600 text-white shadow-sm shadow-red-600/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            🚨 Client Delaying / Refusing Payment
          </button>
          <button
            type="button"
            onClick={() => setSelectedScenario('extra_scope')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedScenario === 'extra_scope'
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            🛑 Demanding "Free Revisions" & Scope Creep
          </button>
          <button
            type="button"
            onClick={() => setSelectedScenario('bad_review')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedScenario === 'bad_review'
                ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            ⚠️ Threatening 1-Star Review / Extortion
          </button>
        </div>

        <div className="relative rounded-lg bg-slate-950/90 border border-slate-800 p-3">
          <p className="text-xs text-slate-200 font-mono leading-relaxed pr-24 select-all">
            {getChatTemplate()}
          </p>
          <button
            type="button"
            onClick={handleCopyChat}
            className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
          >
            {copiedResponse ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedResponse ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Input Form Column */}
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Did a client withhold milestone payouts, demand unpaid revision sprints, or ghost after code delivery? Generate an enforceable <strong>Formal UCC Legal Demand Notice</strong> in 10 seconds.
          </p>

          <form onSubmit={handleGenerateNotice} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Client / Company Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Apex Global Ventures LLC / John Client"
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-red-500 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Withheld Amount or Unpaid Invoices ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 text-sm font-bold">$</span>
                <input
                  type="number"
                  value={withheldAmount}
                  onChange={(e) => setWithheldAmount(e.target.value)}
                  placeholder="2500"
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-red-500 rounded-lg pl-8 pr-3 py-2 text-sm font-bold text-white placeholder-slate-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Unbilled Work / Scope Demanded Beyond Contract
              </label>
              <textarea
                value={disputedScope}
                onChange={(e) => setDisputedScope(e.target.value)}
                placeholder="e.g. Client demanded Stripe Connect integration + complete dark mode rewrite + iOS mobile responsive fixes that were never in the original 5-page SOW."
                rows={2}
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-red-500 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-black text-sm text-white bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-[0.99]"
            >
              <FileText className="w-4 h-4" />
              <span>Compile UCC Legal Notice & Recovery Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Live Output & Instant Pay Gate Column */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="relative rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                OFFICIAL DEMAND ARTIFACT #REC-UCC2209
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Statutory Interest Enforced
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Principal Unbilled Work:</span>
                <span className="text-white font-mono font-bold">${amountNum.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Statutory 8% Late Liquidated Damages:</span>
                <span className="text-amber-400 font-mono font-bold">+${statutoryInterest.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-800">
                <span className="text-white font-bold">Total Enforceable Demand:</span>
                <span className="text-emerald-400 font-mono font-extrabold text-base">${totalRecovery.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Blurred Document Preview with Direct Unlock Button */}
            <div className="relative mt-3 rounded-lg border border-slate-800/80 bg-slate-900/90 p-3 overflow-hidden">
              <div className="select-none filter blur-[3.5px] opacity-60 text-[10px] font-mono text-slate-300 space-y-1 leading-relaxed">
                <p><strong>FORMAL NOTICE OF LIEN AND UCC § 2-209 CONTRACT VARIANCE DEMAND</strong></p>
                <p>TO: {clientName || 'CLIENT LEGAL COUNSEL / FOUNDER'}</p>
                <p>RE: UNPAID SCOPE BALANCE OF ${totalRecovery.toLocaleString()} USD FOR CODE SERVICES RENDERED</p>
                <p>Pursuant to Article 2 of the Uniform Commercial Code (UCC § 2-209) and customary engineering standards, the additional unauthorized features detailed below constitute an executed unilateral contract variance with full consideration required...</p>
                <p>Failure to settle this balance within 5 business days will result in automated IP assignment revocation and third-party escrow liens.</p>
              </div>

              {/* Direct Card Swipe Overlay */}
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2 shadow-lg">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">
                  Ready to Dispatch to Client
                </h4>
                <p className="text-[11px] text-slate-300 max-w-xs mb-3">
                  Unlock the un-blurred, legally certified PDF demand notice with statutory citations and IP revocation clauses.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xs">
                  <button
                    onClick={onTriggerUnlock}
                    className="w-full py-2 px-3 rounded-lg font-black text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all transform active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Unlock This Notice ($3)</span>
                  </button>
                  <button
                    onClick={onOpenLicense}
                    className="w-full py-2 px-3 rounded-lg font-bold text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>Pro Member ($19/mo)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Enforceable in US, EU, UK, CA & Worldwide
              </span>
              <a
                href="https://patreon.com/c/scopelock"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-0.5 text-[10px] font-mono"
              >
                <span>Direct Rail</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
