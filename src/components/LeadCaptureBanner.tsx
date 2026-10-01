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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PERMANENT DEVELOPER LEGAL VAULT</span>
          </div>
          <h3 className="text-base md:text-lg font-extrabold text-white tracking-tight">
            Get 10 Free UCC § 2-209 Contract Amendments & Scope Creep Alerts
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Never get trapped by demanding clients. Enter your work email to receive enforceable legal change order templates, hourly variance worksheets, and automatic scope-creep defense updates.
          </p>
        </div>

        <div className="w-full lg:w-auto flex-shrink-0">
          {submitted ? (
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-extrabold text-white">VIP Access Granted & Templates Dispatched!</p>
                <p className="text-[11px] text-emerald-400/80 font-mono">Check your inbox for the legal contract bundle.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email (e.g. dev@agency.com)"
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <span>Locking...</span>
                ) : (
                  <>
                    <span>Get Free Templates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
