import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Sparkles, Terminal, ExternalLink } from 'lucide-react';

export function ViralShieldBadge() {
  const [copied, setCopied] = useState(false);
  const [repoName, setRepoName] = useState('my-agency-repo');

  const badgeMarkdown = `[![ScopeLock Protected](https://img.shields.io/badge/ScopeLock-Protected-059669?style=for-the-badge&logo=shield&logoColor=white)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/?ref=badge_${encodeURIComponent(repoName)})`;
  const badgeHtml = `<a href="https://ahirwardhanmanti83-bit.github.io/scopelock-ai/?ref=badge_${encodeURIComponent(repoName)}"><img src="https://img.shields.io/badge/ScopeLock-Protected-059669?style=for-the-badge&logo=shield&logoColor=white" alt="ScopeLock Protected" /></a>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(badgeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden my-4 max-w-4xl mx-auto">
      <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-mono px-3 py-1 rounded-bl-xl border-l border-b border-emerald-500/30 flex items-center gap-1 font-bold">
        <Sparkles className="w-3 h-3 text-emerald-400" />
        Zero-Cost Agency Protection Badge
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Stop Unpaid Client Demands Before They Start
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-black text-white flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Add the Official ScopeLock Shield to your GitHub Repo
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Warns clients and product managers upfront: <em>"This repository is algorithmically audited under UCC § 2-209. Out-of-scope tasks require an approved Change Order."</em>
          </p>
        </div>

        {/* Live Interactive Badge Preview & 1-Click Copy */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2 shrink-0">
          <div className="bg-slate-950/90 border border-slate-800 p-2 rounded-xl flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">Live Preview:</span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-mono text-xs px-2.5 py-1 rounded-md font-bold shadow-md tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              SCOPELOCK PROTECTED
            </span>
          </div>

          <button
            onClick={copyToClipboard}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Copied Badge Markdown to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy README.md Badge (1-Click)</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>Paste into your repo's <code>README.md</code> header</span>
        </div>
        <div className="text-emerald-400/90 font-sans">
          ⚡ 100% Free • Protects 10,000+ freelance & agency commits
        </div>
      </div>
    </div>
  );
}
