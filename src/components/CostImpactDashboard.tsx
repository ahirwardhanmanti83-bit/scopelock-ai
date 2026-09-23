import React from 'react';
import { DollarSign, Clock, Calendar, AlertTriangle, TrendingUp, ShieldCheck, Scale, Award } from 'lucide-react';
import { ScopeAuditReport } from '../types';

interface CostImpactDashboardProps {
  report: ScopeAuditReport;
  onTriggerUnlock?: () => void;
  onOpenLicense?: () => void;
}

export const CostImpactDashboard: React.FC<CostImpactDashboardProps> = ({ report, onTriggerUnlock, onOpenLicense }) => {
  const creepItems = report.items.filter(i => !i.isOriginal);
  const baselineItems = report.items.filter(i => i.isOriginal);

  // Agency Profit Protection & ROI Calculation
  const agencyNetRecovered = report.totalScopeCreepCost;
  const annualBleedRate = report.totalScopeCreepCost * 12; // annualized agency leak

  return (
    <div className="space-y-6">
      {/* Executive ROI & Monopoly Proof Banner with Direct Pay Rails */}
      <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-indigo-950/50 border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ScopeLock Verified Agency Capital Recovery</span>
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>This Audit Recovers ${agencyNetRecovered.toLocaleString()} USD in Billable Revenue</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Without formal countersigned change orders, the agency absorbs this cost directly from net operating margins.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3 text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Annualized Margin Bleed</div>
              <div className="text-xl font-black text-emerald-400">
                ${annualBleedRate.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ yr</span>
              </div>
              <div className="text-[10px] text-emerald-400/90 font-medium">100% Margin Retention</div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onTriggerUnlock}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
              >
                <span>⚡ Bill Client: $2 Instant Pass</span>
              </button>
              <button
                type="button"
                onClick={onOpenLicense}
                className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <span>B2B Agency Pass ($199)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Uncontracted Cost</span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-400">${report.totalScopeCreepCost.toLocaleString()}</span>
            <span className="text-xs font-medium text-rose-400/80">+{report.budgetOverrunPercentage}%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Direct cash leakage if not billed</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Unplanned Dev Hours</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{report.totalScopeCreepHours} hrs</span>
            <span className="text-xs font-medium text-slate-400">@ ${report.hourlyRate}/hr</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Engineering capacity diversion</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Timeline Slippage</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-400">+{report.totalDelayDays} Days</span>
            <span className="text-xs font-medium text-slate-400">Delay</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Client-caused milestone postponement</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Scope Creep Ratio</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{creepItems.length} Tasks</span>
            <span className="text-xs font-medium text-slate-400">vs {baselineItems.length} base</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Uncontracted client feature requests</p>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Detected Scope-Creep Variations ({creepItems.length})</span>
          </h3>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Statutory Financial Liability Matrix</span>
          </span>
        </div>

        <div className="space-y-3">
          {creepItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-rose-900/30 hover:border-rose-700/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block">Engineering</span>
                  <span className="font-semibold text-slate-200">{item.estimatedHours} hrs</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block">Delay</span>
                  <span className="font-semibold text-amber-400">+{item.timelineDelayDays}d</span>
                </div>
                <div className="text-right pl-3 border-l border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Chargeable</span>
                  <span className="font-bold text-rose-400 text-sm">${item.costImpact.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
