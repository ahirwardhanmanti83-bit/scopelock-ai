import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ShieldAlert, 
  DollarSign, 
  Clock, 
  ExternalLink, 
  Check, 
  Copy, 
  Sparkles, 
  Terminal, 
  Layers, 
  Smartphone, 
  Laptop,
  Coins,
  ShieldCheck
} from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface ChromeExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPayment: () => void;
}

export const ChromeExtensionModal: React.FC<ChromeExtensionModalProps> = ({
  isOpen,
  onClose,
  onOpenPayment
}) => {
  const [hourlyRate, setHourlyRate] = useState(125);
  const [scopeHours, setScopeHours] = useState(18);
  const [delayDays, setDelayDays] = useState(5);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'simulator' | 'install'>('simulator');

  if (!isOpen) return null;

  const totalBleed = hourlyRate * scopeHours;
  const sampleNotice = `FORMAL CHANGE ORDER & SCOPE ADVISORY (UCC § 2-209)
Contract SOW Baseline: Milestone Deliverables
Uncontracted Scope: ${scopeHours} hours requested out-of-scope revisions
Calculated Margin Bleed: $${totalBleed.toLocaleString()} USD (Rate: $${hourlyRate}/hr)
Schedule Tolling Delay: +${delayDays} business days

Per standard commercial engineering governance, all milestone deadlines are automatically tolled pending approved change order documentation.`;

  const handleCopyNotice = async () => {
    await copyToClipboard(sampleNotice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">ScopeLock AI Chrome Extension</h3>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                  MANIFEST V3
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Live In-Browser Simulator & Production ZIP Bundle</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-5 pt-2">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Live Extension Popup (Mobile & Desktop Simulator)
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'install'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Download ZIP & Install Guide
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">
          {activeTab === 'simulator' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Yahi exact screen developer ke browser me Upwork, Gmail aur Slack par click karne par khulti hai. Isme calculated loss aur instant payment unlock rails integrated hain:
              </p>

              {/* Extension Simulator Mockup Card */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-indigo-500/30 shadow-xl shadow-indigo-950/30">
                {/* Simulator Mini Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-extrabold text-white">ScopeLock <span className="text-indigo-400">Mini</span></span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                    ● Active Guard
                  </span>
                </div>

                {/* Inputs in Simulator */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Rate ($/hr)</label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white text-center focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Extra Hours</label>
                    <input
                      type="number"
                      value={scopeHours}
                      onChange={(e) => setScopeHours(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white text-center focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Delay (Days)</label>
                    <input
                      type="number"
                      value={delayDays}
                      onChange={(e) => setDelayDays(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white text-center focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bleed Metric Display */}
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-800/40 mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-red-300 font-medium block">Unbudgeted Margin Bleed:</span>
                      <span className="text-base font-black text-red-400 font-mono">
                        ${totalBleed.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-900/40 text-red-200 px-2 py-1 rounded border border-red-700/50 font-mono">
                    +{delayDays}d Tolling
                  </span>
                </div>

                {/* Notice Preview */}
                <div className="p-2 rounded bg-slate-900 border border-slate-800 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400">LEGAL SOW NOTICE (UCC § 2-209)</span>
                    <button
                      onClick={handleCopyNotice}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy Notice'}
                    </button>
                  </div>
                  <p className="text-[10px] font-mono text-slate-300 leading-tight line-clamp-3">
                    {sampleNotice}
                  </p>
                </div>

                {/* Live Monetization Rails */}
                <div className="space-y-2">
                  <a
                    href="https://patreon.com/c/AestheticFindsUSA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Unlock Watermark-Free Notice ($2)</span>
                  </a>

                  <a
                    href="https://patreon.com/c/AestheticFindsUSA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-500/40 text-indigo-300 font-semibold text-xs transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Unlimited Agency Tier ($19/mo)</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Direct Download Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-400" />
                    scopelock-extension.zip
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Production-ready bundle with Manifest V3, icons, popup, background service worker and content script.
                  </p>
                </div>
                <a
                  href="./scopelock-extension.zip"
                  download="scopelock-extension.zip"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold whitespace-nowrap shadow-md transition-all shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download ZIP
                </a>
              </div>

              {/* Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Desktop Chrome */}
                <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-slate-200 mb-2">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    <span>PC / Laptop Chrome (1 Min)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
                    <li>Downloaded ZIP ko apne computer me extract (unzip) karein.</li>
                    <li>Chrome me type karein: <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">chrome://extensions</code></li>
                    <li>Top right me <b>Developer mode</b> ON karein.</li>
                    <li><b>Load unpacked</b> par click karke extracted folder select karein.</li>
                  </ol>
                </div>

                {/* Mobile Android */}
                <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-slate-200 mb-2">
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>Android Mobile Phone</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
                    <li>Mobile Chrome extensions block karta hai.</li>
                    <li>Play Store se <b>Kiwi Browser</b> ya <b>Mises Browser</b> install karein.</li>
                    <li>Us browser me <code className="text-purple-300 bg-slate-900 px-1 py-0.5 rounded">chrome://extensions</code> kholkar ZIP load karein.</li>
                    <li>Ya fir upar diya hua <b>Live Simulator Tab</b> use karein!</li>
                  </ol>
                </div>
              </div>

              {/* Web Store Submission Info */}
              <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 text-[11px] text-slate-400">
                <span className="font-bold text-slate-200 block mb-1">Official Chrome Web Store Listing:</span>
                Google Chrome Web Store Developer Console (<code className="text-slate-300">chrome.google.com/webstore/devcenter</code>) par yeh ZIP direct upload karke public kar sakte hain. Wahan se lakho log ise direct 1-click me apne browser me add kar lenge!
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Live Rails: Payoneer & Patreon
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Close
            </button>
            <a
              href="./scopelock-extension.zip"
              download="scopelock-extension.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download ZIP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
