import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Check, 
  Copy, 
  ExternalLink, 
  Zap, 
  Lock, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Scale
} from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface ApexAuthorityBannerProps {
  onSelectInterceptorCase: (title: string, scopeText: string, hours: number) => void;
  hourlyRate: number;
}

const COMMON_DISPUTE_PRESETS = [
  {
    id: 'payment_gateway',
    label: '💳 "Just add Stripe / PayPal real quick"',
    title: 'Uncontracted Multi-Gateway Payment Architecture',
    hours: 28,
    scopeText: '1. Production Stripe & PayPal Webhook orchestration\n2. Idempotency handling, PCI-DSS compliance & refund logic\n3. Tax calculation, multi-currency conversion & dispute notifications',
    statute: 'UCC § 2-209 (Financial Gateway Exclusion Clause)',
    severity: 'Critical Loss ($3,500+ unbilled)'
  },
  {
    id: 'mobile_app',
    label: '📱 "We assumed iOS & Android app was included"',
    title: 'Responsive Web vs. Native Mobile Container Scope Bleed',
    hours: 95,
    scopeText: '1. Complete React Native / Flutter mobile build alongside web deliverable\n2. Apple App Store & Google Play Store submission compliance\n3. Push notification server pipeline & device biometric permissions',
    statute: 'Four-Corners Rule: SOW Exhibit A Web Deliverable Restriction',
    severity: 'Catastrophic Bleed ($11,875+ unbilled)'
  },
  {
    id: 'chatgpt_ai',
    label: '🤖 "Connect ChatGPT / Claude bot for free"',
    title: 'Generative AI Vector Pipeline & LLM Rate-Limit Security',
    hours: 36,
    scopeText: '1. OpenAI / Anthropic streaming API backend proxy integration\n2. RAG vector embeddings, rate limiting, and prompt injection firewall\n3. Operational token consumption tracking and fallback models',
    statute: 'UCC § 2-209 (Operational AI Token & Infrastructure Addendum)',
    severity: 'High Leakage ($4,500+ unbilled)'
  },
  {
    id: 'endless_tweaks',
    label: '🔄 "Just one more small tweak before launch"',
    title: 'Subjective Aesthetic Overhaul Following Milestone Acceptance',
    hours: 18,
    scopeText: '1. Post-approval full-page UI redesign and component restructuring\n2. Uncontracted third-party font licensing and custom dark mode themes\n3. Rework of approved wireframe layout without timeline extension',
    statute: 'UCC § 2-606 (Constructive Acceptance Finality Rider)',
    severity: 'Daily Margin Drain ($2,250+ unbilled)'
  },
  {
    id: 'upwork_escrow',
    label: '🛡️ "Client refusing Upwork / Fiverr milestone"',
    title: 'Client Dispute Escalation & Statutory Scope-Freeze Order',
    hours: 22,
    scopeText: '1. Scope variance audit for Upwork / Fiverr contract arbitration\n2. Formal delivery checklist mapping against baseline milestone description\n3. Statutory demand letter requiring full escrow release before additional revisions',
    statute: 'B2B Mediation Protocol & Work Suspension Covenant',
    severity: 'Escrow Risk ($2,750+ held hostage)'
  }
];

export const ApexAuthorityBanner: React.FC<ApexAuthorityBannerProps> = ({
  onSelectInterceptorCase,
  hourlyRate
}) => {
  const [copiedCli, setCopiedCli] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleCopyCli = async () => {
    await copyToClipboard('npx scopelock-audit');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2500);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-4 sm:p-6 shadow-2xl shadow-indigo-950/40">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-indigo-500/10 via-purple-500/15 to-indigo-500/10 blur-2xl pointer-events-none" />

      {/* Apex Institutional Badges Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800/80 text-[11px]">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-semibold">
            <Scale className="w-3 h-3 text-indigo-400" />
            <span>Statutory UCC § 2-209 Engine</span>
          </span>
          <a
            href="https://github.com/marketplace/actions/scopelock-ai-autonomous-scope-creep-auditor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>GitHub Marketplace Action v1.0.0 ↗</span>
          </a>
          <a
            href="https://www.npmjs.com/package/scopelock-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950/60 hover:bg-rose-900/60 border border-rose-600/40 text-rose-300 font-semibold transition-colors"
          >
            <span>NPM CLI: scopelock-audit</span>
          </a>
          <a
            href="https://github.com/ahirwardhanmanti83-bit/scopelock-ai/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-semibold transition-colors"
          >
            <span>★ Starred on GitHub</span>
          </a>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            <Lock className="w-2.5 h-2.5" /> 100% Client-Side Privacy • Zero Server Leaks
          </span>
        </div>
      </div>

      {/* Main Unforgiving Hook */}
      <div className="pt-4 space-y-3">
        <div className="flex items-start gap-3 bg-rose-950/30 border border-rose-500/30 rounded-xl p-3.5 sm:p-4">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-rose-200 tracking-wide">
              LEGAL REALITY WARNING: The "Quick Favor" Trap Waives 100% of Your Billable Rights.
            </p>
            <p className="text-rose-300/80 leading-relaxed text-xs">
              Under statutory contract law (<strong>Uniform Commercial Code § 2-209</strong>), if you build out-of-scope client requests without a formal written amendment, courts consider it a <strong>voluntary gift</strong>. The client owes you exactly <strong className="text-white">$0.00</strong>.
            </p>
          </div>
        </div>

        {/* Action Bar: Terminal Run + Instant Audit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Terminal className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Run Zero-Install Terminal CLI Audit</span>
                <span className="text-[10px] text-emerald-400 font-mono">3-sec scan</span>
              </div>
              <p className="text-[11px] text-slate-400">Scans git diffs, computes unbilled hours, generates UCC § 2-209 notice.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyCli}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-700 hover:border-indigo-500 font-mono text-xs text-indigo-300 font-semibold transition-all shadow-md cursor-pointer"
            >
              {copiedCli ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <span className="text-emerald-400 font-bold">$</span>
                  <span>npx scopelock-audit</span>
                  <Copy className="w-3 h-3 text-slate-400 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1-Click Client Excuse Interceptor Matrix */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Scope Interceptor: Select What Your Client Demanded</span>
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">Click any case to auto-calculate unbilled cash loss</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {COMMON_DISPUTE_PRESETS.map((preset) => {
              const estimatedLoss = preset.hours * hourlyRate;
              const isSelected = activePreset === preset.id;

              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setActivePreset(preset.id);
                    onSelectInterceptorCase(preset.title, preset.scopeText, preset.hours);
                  }}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                      : 'bg-slate-950/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 text-xs font-bold text-slate-200">
                    <span className="truncate">{preset.label}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-900">
                    <span className="text-rose-400 font-mono font-semibold flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      -${estimatedLoss.toLocaleString()} bleed
                    </span>
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      +{preset.hours}h leaked
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-500 truncate">
                    {preset.statute}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
