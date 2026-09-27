import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Copy, 
  Check, 
  Lock, 
  AlertTriangle, 
  ArrowUpRight,
  TrendingDown,
  DollarSign,
  Clock,
  BookOpen
} from 'lucide-react';
import { PUBLIC_VAULT_CASES, PublicVaultCase } from '../data/publicVaultData';
import { copyToClipboard } from '../utils/clipboard';

interface OpenVaultDirectoryProps {
  onLoadCaseToAudit: (caseItem: PublicVaultCase) => void;
  onOpenLicense: () => void;
  hourlyRate?: number;
}

export const OpenVaultDirectory: React.FC<OpenVaultDirectoryProps> = ({
  onLoadCaseToAudit,
  onOpenLicense,
  hourlyRate = 125
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<PublicVaultCase>(PUBLIC_VAULT_CASES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCases = PUBLIC_VAULT_CASES.filter(c => 
    c.clientMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.disguisedTrap.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.searchIntentKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyReply = async (text: string, id: string) => {
    await copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const avgHours = Math.round((selectedCase.unbilledHoursMin + selectedCase.unbilledHoursMax) / 2);
  const estimatedFinancialLoss = avgHours * hourlyRate;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-sm">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/30 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              Open Public Directory • 100% Free Organic Index
            </span>
            <span className="text-slate-500 text-xs font-mono">• UCC § 2-209 Legal Defenses</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>The Developer Scope-Creep Defense Vault</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Free public repository of common disguised client scope requests, unbilled developer cost variance formulas, and legally fortified responses indexed for software engineers worldwide.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trap (e.g. mobile app, AI, CRM)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid Layout: Case Selector + Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Column: Quick Trap Selector */}
        <div className="lg:col-span-5 p-3 sm:p-4 space-y-2 max-h-[620px] overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
            <span>Disguised Client Traps ({filteredCases.length})</span>
            <span className="text-indigo-400 font-mono">Live Public Index</span>
          </div>

          {filteredCases.map((c) => {
            const isSelected = selectedCase.id === c.id;
            const itemLoss = Math.round((c.unbilledHoursMin + c.unbilledHoursMax) / 2) * hourlyRate;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/10 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-200 line-clamp-1 flex items-center gap-1.5">
                    <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-amber-400'}`} />
                    <span>{c.searchIntentKeywords[0]}</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-rose-400 shrink-0">
                    -${itemLoss.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 italic mb-2">
                  {c.clientMessage}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{c.unbilledHoursMin}–{c.unbilledHoursMax} uncontracted hrs</span>
                  <span className="text-indigo-400 flex items-center gap-0.5">
                    Inspect defense <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Full Public Case Breakdown + Free Reply & Locked UCC Addendum */}
        <div className="lg:col-span-7 p-5 sm:p-6 space-y-5 bg-slate-950/40">
          {/* Header Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Statutory Scope Forensic Breakdown</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 border border-rose-500/30 text-rose-400">
                  Margin Bleed: ~${estimatedFinancialLoss.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                  {avgHours} Dev Hours
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Incoming Client Message:</span>
              <p className="mt-1 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 italic font-sans">
                {selectedCase.clientMessage}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Disguised Trap</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedCase.disguisedTrap}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Statutory Risk</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedCase.contractRisk}
                </p>
              </div>
            </div>
          </div>

          {/* FREE Public Diplomatic Reply (The Organic Hook for Developers & AI Crawlers) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Open Diplomatic Reply (Copy & Paste)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">Zero-Friction Hook</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 bg-slate-900 p-3.5 rounded-lg border border-slate-800 leading-relaxed font-sans">
              {selectedCase.freeDiplomaticReply}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleCopyReply(selectedCase.freeDiplomaticReply, selectedCase.id)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
              >
                {copiedId === selectedCase.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Free Reply</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onLoadCaseToAudit(selectedCase)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Generate Official UCC Change Order</span>
              </button>
            </div>
          </div>

          {/* Hard Locked Legal Binding Section (The Revenue Conversion Gate) */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Statutory UCC § 2-209 Enforceable Addendum & Client Waiver</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO / COMMERCIAL LOCK
              </span>
            </div>

            <div className="relative">
              <p className="text-xs text-slate-400 font-mono bg-slate-900/90 p-3 rounded-lg border border-slate-800 blur-[3px] select-none">
                "Pursuant to Uniform Commercial Code § 2-209, Client explicitly acknowledges that {selectedCase.searchIntentKeywords[0]} constitutes a material variance of {avgHours} hours ($ {estimatedFinancialLoss.toLocaleString()}). Contractor shall not commence work until executed bilateral consideration is received."
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenLicense}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-indigo-500/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Enforceable Legal Addendum ($2 / Subscription)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
