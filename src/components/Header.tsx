import React, { useState } from 'react';
import { Shield, Sparkles, Building2, SlidersHorizontal, Laptop, ExternalLink, Share2, Check, Github } from 'lucide-react';
import { AgencyBranding } from '../types';

import { copyToClipboard } from '../utils/clipboard';
import { VSIX_BASE64, VSIX_FILENAME } from '../data/vsixBase64';

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
  const [downloadedVsix, setDownloadedVsix] = useState(false);

  const handleDownloadVsix = () => {
    try {
      const byteCharacters = atob(VSIX_BASE64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = VSIX_FILENAME;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadedVsix(true);
      setTimeout(() => setDownloadedVsix(false), 3000);
    } catch (e) {
      console.error("Download failed", e);
    }
  };


  const handleShare = async () => {
    const shareData = {
      title: 'ScopeLock AI - Free Scope-Creep Calculator & SOW Change-Order Generator',
      text: 'Stop working for free. Audit unbilled client feature requests & issue statutory UCC § 2-209 change orders in seconds.',
      url: 'https://ahirwardhanmanti83-bit.github.io/scopelock-ai/'
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
          <a
            href="https://github.com/ahirwardhanmanti83-bit/scopelock-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-slate-500 rounded-lg whitespace-nowrap transition-all shadow-sm cursor-pointer"
            title="View ScopeLock AI on Official GitHub Repository"
          >
            <Github className="w-3.5 h-3.5 text-white shrink-0" />
            <span>GitHub</span>
          </a>

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
            onClick={handleDownloadVsix}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400 rounded-lg whitespace-nowrap transition-all shadow-sm shadow-emerald-950"
            title="Download official scopelock-ai-1.0.0.vsix for Microsoft Marketplace"
          >
            {downloadedVsix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Laptop className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{downloadedVsix ? "Downloaded .VSIX!" : "Download VS Code .VSIX (8KB)"}</span>
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

