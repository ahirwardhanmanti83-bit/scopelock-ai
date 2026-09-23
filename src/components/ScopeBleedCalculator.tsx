import React, { useState } from 'react';
import { Calculator, TrendingDown, DollarSign, AlertCircle, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ScopeBleedCalculatorProps {
  onLoadTemplate: (rate: number, budget: number, hours: number) => void;
  onOpenLicense: () => void;
}

export const ScopeBleedCalculator: React.FC<ScopeBleedCalculatorProps> = ({ onLoadTemplate, onOpenLicense }) => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [activeProjects, setActiveProjects] = useState<number>(6);
  const [hourlyRate, setHourlyRate] = useState<number>(125);
  const [freeHoursPerProject, setFreeHoursPerProject] = useState<number>(18);

  // Mathematical Calculations
  const monthlyFreeHours = activeProjects * freeHoursPerProject;
  const monthlyCashBleed = monthlyFreeHours * hourlyRate;
  const annualCashBleed = monthlyCashBleed * 12;
  const agencyProCostAnnual = 199 * 12; // $2,388/yr
  const netSavedWithScopeLock = annualCashBleed - agencyProCostAnnual;
  const roiMultiplier = Math.max(1, Math.round(annualCashBleed / agencyProCostAnnual));

  return (
    <section id="scope-bleed-calculator" className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-indigo-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-2">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Interactive Margin Recovery Tool • Free Agency Diagnostic</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <span>Scope Creep Cash Bleed & Margin Diagnostic</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Calculate exactly how much billable revenue your agency loses each month to unbilled client revision requests ("just one quick change").
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLicense}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lock Agency Pro ($199/mo)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Sliders Input Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Projects Slider */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-200">Active Client Projects per Month</label>
              <span className="text-sm font-black text-indigo-400 px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                {activeProjects} Projects
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={activeProjects}
              onChange={(e) => setActiveProjects(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>1 Solo Gig</span>
              <span>10 Mid-Agency</span>
              <span>25+ Dev Shop</span>
            </div>
          </div>

          {/* Hourly Billing Rate Slider */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-200">Blended Agency Hourly Billing Rate</label>
              <span className="text-sm font-black text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                ${hourlyRate} / hour
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>$50/hr (Offshore)</span>
              <span>$125/hr (Standard)</span>
              <span>$350/hr (Specialized AI/Fintech)</span>
            </div>
          </div>

          {/* Unbilled Scope Creep Hours per Project */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-200">Uncontracted Revision Hours per Project</label>
              <span className="text-sm font-black text-rose-400 px-2.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                {freeHoursPerProject} unbilled hrs / project
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="60"
              step="2"
              value={freeHoursPerProject}
              onChange={(e) => setFreeHoursPerProject(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>2 hrs (Minor tweaks)</span>
              <span>18 hrs (Average agency leak)</span>
              <span>60 hrs (Severe project derailment)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onLoadTemplate(hourlyRate, 15000, monthlyFreeHours)}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-850 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Load These Numbers into Scope Forensic Auditor</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Financial Bleed Results Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-950/30 via-slate-950 to-indigo-950/40 border border-rose-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Diagnostic Assessment: Active Financial Leakage</span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] text-slate-400 font-semibold">Unbilled Engineering Donated Monthly</div>
                <div className="text-2xl font-black text-rose-400 flex items-baseline gap-1 mt-0.5">
                  <span>{monthlyFreeHours} Hours</span>
                  <span className="text-xs text-slate-400 font-normal">/ month free work</span>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] text-slate-400 font-semibold">Monthly Cash Bleed Absorbed by Agency</div>
                <div className="text-2xl font-black text-white flex items-baseline gap-1 mt-0.5">
                  <span>${monthlyCashBleed.toLocaleString()}</span>
                  <span className="text-xs text-rose-400 font-normal">USD / mo lost margin</span>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-rose-500/40 rounded-xl p-3.5 shadow-lg shadow-rose-950/50">
                <div className="text-[11px] text-rose-300 font-bold uppercase tracking-wider">Annual Net Margin Destruction</div>
                <div className="text-3xl font-black text-rose-400 flex items-baseline gap-1 mt-0.5">
                  <span>${annualCashBleed.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-normal">USD / year</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  This money comes directly out of founder profits and developer bonus pools.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">ScopeLock Agency Pro ($199/mo):</span>
              <span className="text-emerald-400 font-black">{roiMultiplier}x Net Annual ROI</span>
            </div>
            <div className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Recovers up to <strong>${netSavedWithScopeLock.toLocaleString()} USD</strong> in billable revenue this year.</span>
            </div>
            <button
              onClick={onOpenLicense}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Stop Margin Bleed — Activate Agency Pro ($199/mo)</span>
              <CheckCircle2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
