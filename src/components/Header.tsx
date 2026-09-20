import React, { useState } from 'react';
import { Shield, Sparkles, Building2, SlidersHorizontal, KeyRound, ExternalLink } from 'lucide-react';
import { AgencyBranding } from '../types';

interface HeaderProps {
  branding: AgencyBranding;
  onOpenBranding: () => void;
  onOpenLicense: () => void;
  onOpenRedeem: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  branding, 
  onOpenBranding, 
  onOpenLicense,
  onOpenRedeem 
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-tight">ScopeLock <span className="text-indigo-400">AI</span></span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">ENTERPRISE</span>
            </div>
            <p className="text-[11px] text-slate-400">Scope-Creep Detection & Instant Change Orders</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={onOpenLicense}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg whitespace-nowrap transition-colors shadow-sm shadow-emerald-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span>Pricing & Plans ($2 • $19 • $199 • $499)</span>
          </button>

          <button
            onClick={onOpenBranding}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg whitespace-nowrap transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate max-w-[110px]">{branding.agencyName}</span>
          </button>

          <a
            href="/release/scopelock-ai-v1.0.0-standalone.zip"
            download="scopelock-ai-v1.0.0-standalone.zip"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg whitespace-nowrap transition-colors"
            title="Download Offline HTML/JS Standalone Release"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Download ZIP</span>
          </a>

          <button
            onClick={onOpenLicense}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-lg shadow-md shadow-indigo-500/20 whitespace-nowrap transition-all"
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span>Agency Plans ($199/mo)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
