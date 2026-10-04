import React from 'react';
import { ShieldCheck, ArrowRight, Zap, Building2, CreditCard } from 'lucide-react';

export const LeadCaptureBanner: React.FC = () => {
  return (
    <div className="w-full my-6 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 border-2 border-emerald-500/60 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-black tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>STATUTORY CLIENT RECOVERY RAILS</span>
          </div>
          <h3 className="text-base md:text-xl font-black text-white tracking-tight">
            Stop Doing Unpaid Client Work. Enforce Formal UCC § 2-209 Change Orders.
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every out-of-scope Slack message or ticket is billable. Lock your contract, block rogue client PRs, and demand immediate settlement under Uniform Commercial Code § 2-209.
          </p>
        </div>

        <div className="w-full lg:w-auto flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <a
              href="https://www.patreon.com/posts/single-ucc-ss-2-170903732"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer active:scale-95 group uppercase tracking-wider"
            >
              <CreditCard className="w-4 h-4 text-slate-950" />
              <span>Unlock Single Notice ($3 USD)</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://patreon.com/c/scopelock"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/50 text-white font-black text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-indigo-300" />
              <span>Agency Pro ($199/mo)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
