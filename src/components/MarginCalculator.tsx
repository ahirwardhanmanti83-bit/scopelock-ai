import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Crown,
  AlertCircle
} from 'lucide-react';

interface MarginCalculatorProps {
  onOpenPricing: () => void;
}

export const MarginCalculator: React.FC<MarginCalculatorProps> = ({ onOpenPricing }) => {
  const [activeProjects, setActiveProjects] = useState<number>(6);
  const [hourlyRate, setHourlyRate] = useState<number>(125);
  const [unbilledHoursPerProject, setUnbilledHoursPerProject] = useState<number>(18);

  const monthlyHoursLost = activeProjects * unbilledHoursPerProject;
  const monthlyCashBleed = monthlyHoursLost * hourlyRate;
  const annualCashBleed = monthlyCashBleed * 12;

  const agencyProAnnualCost = 199 * 12; // $2,388
  const netSavingsAnnual = annualCashBleed - agencyProAnnualCost;
  const roiMultiplier = Math.round((annualCashBleed / agencyProAnnualCost) * 10) / 10;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Agency Cash Bleed Forensics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Agency Scope Creep Margin Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Calculate the true financial drain of "just a quick favor" requests across your engineering roster.
              See how many billable agency hours slip away unbilled every month.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/50 text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Annual Margin Loss</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
              -${annualCashBleed.toLocaleString()} USD
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Column */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>Interactive Variables</span>
          </h3>

          {/* Active Projects Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Active Client Projects</span>
              <span className="font-mono font-bold text-indigo-400 text-sm">{activeProjects} accounts</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={activeProjects}
              onChange={(e) => setActiveProjects(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 project</span>
              <span>25 projects</span>
            </div>
          </div>

          {/* Hourly Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Average Billable Rate ($/hr)</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">${hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="40"
              max="300"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$40/hr</span>
              <span>$300/hr</span>
            </div>
          </div>

          {/* Unbilled Hours per Project */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Unbilled Revision Hours / Project</span>
              <span className="font-mono font-bold text-rose-400 text-sm">{unbilledHoursPerProject} hrs/mo</span>
            </div>
            <input
              type="range"
              min="2"
              max="60"
              step="2"
              value={unbilledHoursPerProject}
              onChange={(e) => setUnbilledHoursPerProject(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>2 hrs (minor tweaks)</span>
              <span>60 hrs (feature bloat)</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-1">
              <span className="text-[10px] font-mono text-rose-300 uppercase block">Monthly Billable Drain</span>
              <p className="text-2xl font-black text-rose-400 font-mono">
                {monthlyHoursLost} hrs
              </p>
              <p className="text-[11px] text-slate-400">Hours spent on unpaid tweaks</p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-1">
              <span className="text-[10px] font-mono text-rose-300 uppercase block">Monthly Revenue Bleed</span>
              <p className="text-2xl font-black text-rose-400 font-mono">
                ${monthlyCashBleed.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400">Cash lost without Change Orders</p>
            </div>
          </div>

          {/* ROI Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">The ScopeLock ROI Solution</span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {roiMultiplier}x RETURN
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              By enforcing formal AI change orders and capturing just <strong>80%</strong> of these unbilled hours, your agency recovers approximately 
              <strong className="text-emerald-400"> ${Math.round(annualCashBleed * 0.8).toLocaleString()} USD</strong> every year.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Agency Pro Subscription</span>
                <span className="text-sm font-bold text-white">$199 / month</span>
              </div>

              <button
                onClick={onOpenPricing}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:scale-105"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Protect Margins ($199/mo)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
