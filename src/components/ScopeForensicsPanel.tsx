import React from 'react';
import { ShieldAlert, BrainCircuit, Scale, Zap, Flame, Fingerprint, Lock } from 'lucide-react';
import { ScopeAuditReport } from '../types';
import { analyzeScopeCreepForensics } from '../utils/scopeIntelligenceEngine';

interface ScopeForensicsPanelProps {
  report: ScopeAuditReport;
}

export const ScopeForensicsPanel: React.FC<ScopeForensicsPanelProps> = ({ report }) => {
  const forensics = analyzeScopeCreepForensics(report);

  return (
    <div className="bg-slate-900/90 border-2 border-indigo-500/40 rounded-2xl p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-md relative overflow-hidden">
      {/* Background Neural Glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-1">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>ScopeLock Proprietary Defense Matrix</span>
          </div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <span>AI Forensic Scope Creep Diagnostics & Risk Modeling</span>
          </h3>
          <p className="text-xs text-slate-400">
            Automated legal-grade forensics detecting client subconscious scope traps and litigation vulnerabilities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500">Contract Risk Score</div>
            <div className="text-xl font-black text-rose-400 flex items-center justify-end gap-1">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>{forensics.overallRiskScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Scope Expansion Velocity</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">+{forensics.scopeExpansionVelocity}%</div>
          <div className="text-[11px] text-amber-400 mt-1">Velocity per active sprint</div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Client Dispute Probability</span>
            <Scale className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-1">{forensics.clientLitigationProbability}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Probability without written addendum</div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Legal Enforcement Readiness</span>
            <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">UCC § 2-209</div>
          <div className="text-[11px] text-emerald-500/80 mt-1">E-SIGN Act 15 U.S.C. Compliant</div>
        </div>
      </div>

      {/* Subconscious Traps Detected */}
      <div className="mt-5 space-y-3">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Detected Subconscious Scope Traps & Breach Vectors:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {forensics.detectedSubconsciousTraps.map((trap, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${
                  trap.riskTier === 'CRITICAL'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {trap.riskTier} RISK
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{trap.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{trap.description}</p>
              <div className="text-[10px] text-indigo-400 font-mono pt-1 border-t border-slate-900">
                Doctrine: {trap.legalDoctrine}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Kill Switch Recommendation */}
      <div className="mt-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-rose-300">Mandatory Technical Recommendation:</div>
          <p className="text-xs text-rose-200/90 mt-0.5">
            {forensics.killSwitchRecommendation}
          </p>
        </div>
      </div>
    </div>
  );
};
