import React, { useState } from 'react';
import { Building2, Users, CheckCircle2, Sparkles, X, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface AgencyPortalModalProps {
  onClose: () => void;
}

export const AgencyPortalModal: React.FC<AgencyPortalModalProps> = ({ onClose }) => {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [hourlyRate] = useState<number>(95);
  const [copiedWire, setCopiedWire] = useState(false);
  
  // Mathematical Scope Leakage in Agency:
  // Avg 3.5 hrs/week leaked per developer on unbilled scope adjustments
  const monthlyLeakedHours = Math.round(teamSize * 3.5 * 4);
  const monthlyLeakedLoss = monthlyLeakedHours * hourlyRate;
  const annualLeakedLoss = monthlyLeakedLoss * 12;

  const handleOpenPatreonAgency = () => {
    window.open('https://patreon.com/c/AestheticFindsUSA', '_blank', 'noopener,noreferrer');
  };

  const handlePayoneerWire = async () => {
    await copyToClipboard('ahirwardhanmanti83@gmail.com');
    setCopiedWire(true);
    setTimeout(() => setCopiedWire(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Agency Multi-Seat Sovereign Suite
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold">
                  $199 / $499 Tier
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Stop firm-wide developer scope leakage. Protect $100K+ in annual billable margins.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Loss Calculator for Agencies */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Active Developers in Studio: <strong>{teamSize} engineers</strong></span>
            </span>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-32 accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
            <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-lg">
              <span className="text-[10px] font-mono uppercase text-rose-400">Unbilled Hours Bleed / Mo</span>
              <p className="text-lg font-bold font-mono text-rose-300">~{monthlyLeakedHours.toLocaleString()} hrs/mo</p>
            </div>
            <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-lg">
              <span className="text-[10px] font-mono uppercase text-rose-400">Estimated Annual Loss</span>
              <p className="text-lg font-bold font-mono text-rose-300">${annualLeakedLoss.toLocaleString()} USD</p>
            </div>
          </div>
        </div>

        {/* Enterprise Rails Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Pro Studio Seat */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold text-slate-200">Agency Pro (Up to 15 Devs)</span>
                <span className="text-sm font-mono font-bold text-indigo-400">$199<span className="text-[10px] text-slate-500">/mo</span></span>
              </div>
              <ul className="text-xs text-slate-400 space-y-2 mb-4 font-sans">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unlimited UCC § 2-209 change orders</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom Agency Branding & Logo export</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Slack & Jira Integration Webhooks</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleOpenPatreonAgency}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Activate Pro Seat ($199/mo)
            </button>
          </div>

          {/* Sovereign Studio Enterprise */}
          <div className="bg-gradient-to-b from-indigo-950/30 to-slate-950 border border-indigo-500/40 p-4 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enterprise Whale (Unlimited)</span>
                </span>
                <span className="text-sm font-mono font-bold text-amber-400">$499<span className="text-[10px] text-slate-500">/mo</span></span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 mb-4 font-sans">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unlimited developer seats firm-wide</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Statutory Court-Admissible legal affidavits</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct Payoneer Wire Clearing</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handlePayoneerWire}
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5"
            >
              {copiedWire ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Wire Email Copied!</span>
                </>
              ) : (
                <span>Direct Corporate Clearing ($499/mo)</span>
              )}
            </button>
          </div>
        </div>

        {/* Footnote */}
        <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Authorized Corporate Signatory: Dhanmanti Ahirwar</span>
          <span className="text-indigo-400">ahirwardhanmanti83@gmail.com</span>
        </div>
      </div>
    </div>
  );
};
