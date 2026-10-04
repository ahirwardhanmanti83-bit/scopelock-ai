import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, Download, Sparkles } from 'lucide-react';
import { saveLead } from '../utils/leadCapture';

export const LeadCaptureBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      saveLead(email, 'hero_lead_magnet_banner');
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="w-full my-6 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border border-indigo-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GITHUB TRENDING COMMUNITY ENGINE</span>
          </div>
          <h3 className="text-base md:text-lg font-extrabold text-white tracking-tight">
            🔥 Push ScopeLock to #1 on GitHub Trending & Unlock Court-Ready SOW Arsenal
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Star our repository on GitHub to join 1,000+ software founders, unlock 10 statutory UCC § 2-209 legal change-order templates, and get instant access to the $199/mo Agency Defense Suite.
          </p>
        </div>

        <div className="w-full lg:w-auto flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <a
              href="https://github.com/ahirwardhanmanti83-bit/scopelock-ai"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer active:scale-95 group"
            >
              <span className="text-base group-hover:scale-125 transition-transform">⭐</span>
              <span>Star ScopeLock on GitHub (1-Click)</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>
            <a
              href="https://patreon.com/c/scopelock"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/50 text-indigo-300 font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer"
            >
              <span>Agency Pro ($199/mo)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
