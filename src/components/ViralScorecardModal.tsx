import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Flame, 
  DollarSign, 
  Clock, 
  Calendar, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ScopeAuditResult } from '../types';

interface ViralScorecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: ScopeAuditResult | null;
  clientMessage: string;
  projectName?: string;
  hourlyRate?: number;
}

export const ViralScorecardModal: React.FC<ViralScorecardModalProps> = ({
  isOpen,
  onClose,
  audit,
  clientMessage,
  projectName = 'Client Deliverable',
  hourlyRate = 125,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen || !audit) return null;

  const creepScore = audit.creepScore || 85;
  const totalCost = audit.totalCostUSD || Math.round((audit.totalHours || 25) * hourlyRate);
  const totalHours = audit.totalHours || 25;
  const delayDays = audit.timelineDelayDays || 5;

  const redditMarkdown = `### 🚨 My client just hit me with "just a small 5-minute tweak"...

**Client Message:**
> "${clientMessage.slice(0, 300)}${clientMessage.length > 300 ? '...' : ''}"

I ran it through **ScopeLock AI** forensic scope audit before saying yes. Here is what came back:

* ⏱️ **Actual Extra Work:** +${totalHours} unbilled engineering hours
* 💸 **Revenue Leakage / Value:** $${totalCost.toLocaleString()} USD
* ⏳ **Milestone Delay:** +${delayDays} business days
* 🚨 **Scope Creep Danger Score:** ${creepScore}% (${audit.overallVerdict.replace('_', ' ').toUpperCase()})

**Lesson for fellow devs:** Never say "sure, no problem" on a client call. Send an itemized Change Order or you will end up working the whole weekend for free.

*(Audited via ScopeLock AI - scopelock.ai)*`;

  const linkedInPost = `A client told me this morning: "Can you quickly tweak this before launch? It should only take 10 minutes." 🤦‍♂️

Instead of absorbing the extra work, I ran the request through ScopeLock AI:
↳ ⏱️ Unbilled Work: +${totalHours} hours
↳ 💰 Uncovered Financial Variance: $${totalCost.toLocaleString()} USD
↳ 📅 Milestone Impact: +${delayDays} days

Most agencies don't lose clients because of bad code — they lose profit margins because of unbilled "quick fixes".

How does your team handle scope creep when clients ask for "tiny" changes?

#AgencyLife #SoftwareEngineering #ScopeCreep #Freelancing #ScopeLock`;

  const tweetText = `Client: "It's just a tiny 5-minute tweak before launch!" 💀

ScopeLock AI Forensic Audit:
⏱️ +${totalHours} unbilled hours
💸 $${totalCost.toLocaleString()} revenue leakage
🚨 ${creepScore}% Scope Creep Risk

Always send a Change Order: https://scopelock.app #ScopeCreep #webdev`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                Viral Client Horror Story & Scorecard
              </h3>
              <p className="text-xs text-slate-400">
                Turn scope creep into high-engagement Reddit, X, and LinkedIn posts that drive viral traffic.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Viral Visual Card Preview */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge & Danger Meter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase font-mono tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>🚨 SCOPE CREEP DANGER SCORE: {creepScore}%</span>
            </span>

            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>ScopeLock AI Forensic Seal</span>
            </span>
          </div>

          {/* Client Quote Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              "Quick 5-Minute Request" from Client:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 italic font-mono leading-relaxed line-clamp-3">
              "{clientMessage}"
            </p>
          </div>

          {/* Forensic Damage Stats */}
          <div className="grid grid-cols-3 gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Unbilled Hours</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-amber-400">
                +{totalHours}h
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Revenue Leakage</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-rose-400">
                ${totalCost.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Launch Delay</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-indigo-400">
                +{delayDays}d
              </span>
            </div>
          </div>

          {/* Card Footer Watermark */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
            <span>Audit: {audit.summary}</span>
            <span className="font-mono font-bold text-indigo-400">scopelock.ai</span>
          </div>
        </div>

        {/* 1-Click Viral Distribution Channels */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            1-Click Viral Post Templates
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Share to X (Twitter) */}
            <button
              onClick={handleShareTwitter}
              className="p-3.5 bg-slate-850 hover:bg-slate-800 border border-slate-750 rounded-2xl text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                  Post on X (Twitter)
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400">
                Opens pre-filled tweet with quote, stats, and #ScopeCreep tag.
              </p>
            </button>

            {/* Reddit Markdown Format */}
            <button
              onClick={() => handleCopy(redditMarkdown, 'reddit')}
              className="p-3.5 bg-slate-850 hover:bg-slate-800 border border-slate-750 rounded-2xl text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                  {copiedType === 'reddit' ? 'Copied to Clipboard!' : 'Copy for Reddit'}
                </span>
                {copiedType === 'reddit' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Formatted for r/freelance & r/webdev client horror stories.
              </p>
            </button>

            {/* LinkedIn Format */}
            <button
              onClick={() => handleCopy(linkedInPost, 'linkedin')}
              className="p-3.5 bg-slate-850 hover:bg-slate-800 border border-slate-750 rounded-2xl text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                  {copiedType === 'linkedin' ? 'Copied!' : 'Copy for LinkedIn'}
                </span>
                {copiedType === 'linkedin' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Engaging B2B thought leadership post format for agency founders.
              </p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
