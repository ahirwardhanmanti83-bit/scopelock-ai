import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';
import { recordTelemetryEvent } from '../utils/telemetry';
import { copyToClipboard } from '../utils/clipboard';

export function CliIntegrationSection() {
  const [copied, setCopied] = useState(false);
  const command = 'npx scopelock-audit';

  const handleCopy = async () => {
    await copyToClipboard(command);
    setCopied(true);
    recordTelemetryEvent('cli_copy', `Developer copied CLI command: "${command}" (Zero-install local git audit)`);
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
            <span>Developer CLI Trojan Horse • Zero-Install Local Audit</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Audit Unbilled Scope Directly in Your Terminal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Run inside any client git repository or dev folder. Instantly calculates uncontracted git commits, detects scope creep bleeding, and bridges to statutory UCC § 2-209 change orders.
          </p>
        </div>

        {/* Terminal Command Box */}
        <div className="w-full lg:w-auto flex-1 max-w-lg space-y-3">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs sm:text-sm flex items-center justify-between gap-3 text-slate-200 shadow-inner">
            <div className="flex items-center gap-2 truncate">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-slate-100 font-semibold">{command}</span>
            </div>
            <button
              onClick={handleCopy}
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
