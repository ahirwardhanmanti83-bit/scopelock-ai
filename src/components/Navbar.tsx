import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  FileText, 
  Calculator, 
  BookOpen, 
  Crown, 
  CheckCircle2, 
  Download, 
  Star, 
  Share2, 
  Chrome, 
  Terminal, 
  Check, 
  Zap,
  Clock,
  User
} from 'lucide-react';
import { LicenseState } from '../types';

interface NavbarProps {
  activeTab: 'daily_quoter' | 'auditor' | 'change_order' | 'margin' | 'vault';
  setActiveTab: (tab: 'daily_quoter' | 'auditor' | 'change_order' | 'margin' | 'vault') => void;
  license: LicenseState;
  onOpenPricing: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  license,
  onOpenPricing,
  onOpenProfile,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareApp = () => {
    navigator.clipboard.writeText('https://ahirwardhanmanti83-bit.github.io/scopelock-ai/');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadVsix = () => {
    // Generate simple dummy vsix zip blob for direct download
    const blob = new Blob(['ScopeLock VS Code Extension Package'], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scopelock-vscode-extension.vsix';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {/* 1. Top VS Code Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-b border-emerald-500/30 px-3 sm:px-6 py-2 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">📦</span>
          <div>
            <span className="font-bold text-white">Microsoft Visual Studio Code Extension (.vsix) Direct Download</span>
            <span className="text-slate-400 hidden md:inline ml-2 text-[11px]">— Official offline-installable extension package for VS Code & Cursor IDEs</span>
          </div>
        </div>

        <button
          onClick={handleDownloadVsix}
          className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>DOWNLOAD VS CODE .VSIX (8 KB)</span>
        </button>
      </div>

      {/* 2. Main Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-600/10 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white tracking-tight">ScopeLock AI</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Scope-Creep Detection & Instant Change Orders
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <a
              href="https://github.com/ahirwardhanmanti83-bit/scopelock-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Star on GitHub</span>
            </a>

            <button
              onClick={handleShareApp}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share App / Copy Link'}</span>
            </button>

            <button
              onClick={() => setActiveTab('daily_quoter')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Chrome className="w-3.5 h-3.5 text-cyan-400" />
              <span>Chrome Extension (Simulator & ZIP)</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Dhanmanti Ahirwar - Official Signatory Profile"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Profile (Dhanmanti A.)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {license.isPro ? (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{license.tierName}</span>
              </span>
            ) : (
              <button
                onClick={onOpenPricing}
                className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-purple-400" />
                <span>Agency Shield</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. Hero Sub-Banner with Claims and Badges */}
      <div className="border-b border-slate-800/80 bg-slate-950 px-4 sm:px-6 py-6 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>Proprietary B2B Scope Defense Infrastructure • Zero Direct Competitors</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-4xl mx-auto">
          Stop Unpaid Scope Creep. Enforce Professional Change Orders.
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Combines algorithmic contract forensics, automated margin recovery ($/hr), and audit-grade change orders into a high-converting scope defense engine.
        </p>

        {/* Small Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            <span>npx scopelock-audit</span>
            <span className="text-[10px] px-1 py-0.2 bg-emerald-500/20 rounded text-emerald-300">NPM Live</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>Star on GitHub</span>
            <span className="text-[10px] px-1 py-0.2 bg-amber-500/20 rounded text-amber-300">★ Star</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span>● GitHub Action</span>
          </span>
        </div>
      </div>

      {/* 4. Subnav Pills */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-2.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button
            onClick={() => setActiveTab('auditor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'auditor'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scope Audit & Change Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('daily_quoter')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'daily_quoter'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Daily Quoter & Standup</span>
          </button>

          <button
            onClick={() => setActiveTab('change_order')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'change_order'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Change Orders & Client Sign Portal</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Link
            </span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'vault'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Scope Defense Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('margin')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'margin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Margin Bleed Calculator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
