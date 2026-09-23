import React, { useState } from 'react';
import { Shield, Sparkles, Building2, SlidersHorizontal, Laptop, ExternalLink, Share2, Check } from 'lucide-react';
import { AgencyBranding } from '../types';

import { copyToClipboard } from '../utils/clipboard';

interface HeaderProps {
  branding: AgencyBranding;
  onOpenBranding: () => void;
  onOpenLicense: () => void;
  onOpenRedeem: () => void;
  onOpenExtension: () => void;
  onOpenAgencyPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  branding, 
  onOpenBranding, 
  onOpenLicense,
  onOpenRedeem,
  onOpenExtension,
  onOpenAgencyPortal
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'ScopeLock AI - Free Scope-Creep Calculator & SOW Change-Order Generator',
      text: 'Stop working for free. Audit unbilled client feature requests & issue statutory UCC § 2-209 change orders in seconds.',
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    await copyToClipboard(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };
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
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 rounded-lg whitespace-nowrap transition-all shadow-sm shadow-amber-500/10 cursor-pointer"
            title="Share ScopeLock AI across WhatsApp, Slack, LinkedIn, or Copy Link"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>Share App / Copy Link</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenExtension}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-lg whitespace-nowrap transition-all shadow-sm shadow-cyan-500/10"
          >
            <Laptop className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
            <span>Chrome Extension (Simulator & ZIP)</span>
          </button>

          <button
            id="open-license-btn"
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
            href="./release/scopelock-ai-v1.0.0-standalone.zip"
            download="scopelock-ai-v1.0.0-standalone.zip"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg whitespace-nowrap transition-colors"
            title="Download Offline HTML/JS Standalone Release"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Download ZIP</span>
          </a>

          <button
            onClick={onOpenAgencyPortal || onOpenLicense}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:opacity-95 rounded-lg shadow-md shadow-indigo-500/25 whitespace-nowrap transition-all cursor-pointer ring-1 ring-indigo-400/40"
          >
            <Building2 className="w-3.5 h-3.5 shrink-0 text-amber-300" />
            <span>Whale / Agency Seats ($199 • $499)</span>
          </button>
        </div>
      </div>
    </header>
  );
};

