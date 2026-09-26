import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';
import { recordTelemetryEvent } from '../utils/telemetry';
import { copyToClipboard } from '../utils/clipboard';

export function CliIntegrationSection() {
  const [activeCommand, setActiveCommand] = useState<'audit' | 'generate' | 'hook' | 'badge' | 'vscode'>('audit');
  const [copied, setCopied] = useState(false);

  const commands = {
    audit: 'npx scopelock',
    generate: 'npx scopelock --generate',
    hook: 'npx scopelock --install-hook',
    badge: '[![ScopeLock Protected](https://img.shields.io/badge/ScopeLock-UCC%20§2--209%20Protected-10b981?style=for-the-badge&logo=shield)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)',
    vscode: 'code --install-extension scopelock-ai'
  };

  const handleCopy = async (cmd: string) => {
    await copyToClipboard(cmd);
    setCopied(true);
    recordTelemetryEvent('cli_copy', `Developer copied command/badge: "${cmd.substring(0, 30)}..."`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>ScopeLock Developer CLI • Git Pre-Commit & Statutory Engine</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Freeze Scope Creep & Generate Change Orders in Terminal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Execute directly inside any client repo. Automatically audit commits, install a pre-commit freeze hook, or generate statutory UCC § 2-209 change orders in seconds.
          </p>
          
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setActiveCommand('audit')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                activeCommand === 'audit' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Audit Commits
            </button>
            <button
              onClick={() => setActiveCommand('generate')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                activeCommand === 'generate' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Generate .md Order
            </button>
            <button
              onClick={() => setActiveCommand('hook')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                activeCommand === 'hook' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Install Git Hook
            </button>
            <button
              onClick={() => setActiveCommand('badge')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                activeCommand === 'badge' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              GitHub README Badge
            </button>
            <button
              onClick={() => setActiveCommand('vscode')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                activeCommand === 'vscode' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              VS Code Extension
            </button>
          </div>
        </div>

        {/* Terminal Command Box */}
        <div className="w-full lg:w-auto flex-1 max-w-lg space-y-3">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs sm:text-sm flex items-center justify-between gap-3 text-slate-200 shadow-inner">
            <div className="flex items-center gap-2 truncate">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-slate-100 font-semibold">{commands[activeCommand]}</span>
            </div>
            <button
              onClick={() => handleCopy(commands[activeCommand])}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer shrink-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              100% Client-Side / Zero-Telemetry Privacy
            </span>
            <a
              href="https://www.npmjs.com/package/scopelock-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 hover:underline"
            >
              <span>Verified on npmjs.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
