import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  BookOpen, 
  Crown, 
  CheckCircle2, 
  Download, 
  Star, 
  Share2, 
  Chrome, 
  Check, 
  Zap,
  MessageSquare,
  Trash2,
  GitBranch,
  FileCheck2
} from 'lucide-react';
import { LicenseState } from '../types';

interface NavbarProps {
  activeTab: 'daily_quoter' | 'auditor' | 'change_order' | 'margin' | 'vault' | 'chat';
  setActiveTab: (tab: 'daily_quoter' | 'auditor' | 'change_order' | 'margin' | 'vault' | 'chat') => void;
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
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0 text-base">
            📦
          </div>
          <div>
            <div className="font-bold text-white text-xs sm:text-sm">
              Microsoft Visual Studio Code Extension (.vsix) Direct Download
            </div>
            <div className="text-slate-400 text-[11px] leading-tight">
              Official extension package for Microsoft VS Code & Cursor IDEs
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadVsix}
          className="px-4 py-1.5 rounded-lg bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap border border-white"
        >
          <Download className="w-3.5 h-3.5 text-amber-600 font-black" />
          <span>DOWNLOAD VS CODE .VSIX</span>
        </button>
      </div>

      {/* 2. Main Header Bar */}
      <header className="border-b border-slate-900 bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-600/10 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">ScopeLock AI</span>
                <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                  GIT AUDIT
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Git Repo Scope Creep Detection & Change Orders
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <a
              href="https://github.com/ahirwardhanmanti83-bit/scopelock-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 rounded-lg whitespace-nowrap transition-all cursor-pointer group"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:scale-125 transition-transform shrink-0" />
              <span>Star on GitHub</span>
            </a>

            <button
              onClick={handleShareApp}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 rounded-lg whitespace-nowrap transition-all cursor-pointer"
              title="Share ScopeLock AI / Copy Link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>Share App</span>
                </>
              )}
            </button>

            <button
              onClick={() => setActiveTab('daily_quoter')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-lg whitespace-nowrap transition-all cursor-pointer"
            >
              <Chrome className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
              <span>Extension Simulator</span>
            </button>

            {license.isPro ? (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{license.tierName}</span>
              </span>
            ) : (
              <button
                onClick={onOpenPricing}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-300 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/50 rounded-lg whitespace-nowrap transition-all cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 shrink-0 text-purple-400" />
                <span>Upgrade / Pricing</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. Hero Sub-Banner with Required New Headline */}
      <div className="border-b border-slate-900 bg-slate-950 px-4 sm:px-6 py-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>B2B Scope Defense & Developer Margin Protection</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
          Stop doing free work. Detect scope creep in your Git repo before you ship it.
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Compare Git commits, pull requests, and incoming client requests against your agreed Statement of Work. Flag out-of-scope code, quantify unbilled developer hours, and issue clean change orders before you merge.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">$</span>
            <span>npx scopelock-audit</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 rounded text-emerald-300 font-sans font-medium">NPM Live</span>
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
            <span>Git Hook Ready</span>
          </span>

          <button
            onClick={onOpenPricing}
            className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/40 text-indigo-300 flex items-center gap-1.5 cursor-pointer font-sans text-xs transition-colors"
          >
            <span>Free Tier (1 scan/mo)</span>
            <span className="text-slate-500">·</span>
            <span className="font-semibold text-white">Pro $19/mo</span>
          </button>
        </div>
      </div>

      {/* 4. Subnav Tabs */}
      <div className="bg-slate-950 border-b border-slate-900 px-3 sm:px-6 py-2.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('daily_quoter')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'daily_quoter'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-400 hover:text-white hover:bg-emerald-950/40 border border-emerald-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Daily Quoter & Standup</span>
            </button>

            <button
              onClick={() => setActiveTab('auditor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'auditor'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Git Repo & Scope Auditor</span>
            </button>

            <button
              onClick={() => setActiveTab('change_order')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'change_order'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Change Order Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scope Defense Knowledge Base</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Scanner</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all standup inputs to default?')) {
                window.location.reload();
              }
            }}
            title="Reset to default"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
