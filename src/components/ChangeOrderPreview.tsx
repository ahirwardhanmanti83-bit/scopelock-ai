import React, { useState, useEffect } from 'react';
import { Copy, Download, Check, FileSignature, Send, ShieldCheck, Lock, Sparkles, Share2, Printer, ExternalLink, Award } from 'lucide-react';
import { ScopeAuditReport } from '../types';
import { generateFormalChangeOrderText } from '../utils/changeOrderGenerator';
import { UnlockPaymentModal } from './UnlockPaymentModal';
import { ShareAuditModal } from './ShareAuditModal';
import { VerificationRegistryModal } from './VerificationRegistryModal';
import { recordTelemetryEvent } from '../utils/telemetry';
import { copyToClipboard } from '../utils/clipboard';

interface ChangeOrderPreviewProps {
  report: ScopeAuditReport;
  onSendEmail: () => void;
}

export const ChangeOrderPreview: React.FC<ChangeOrderPreviewProps> = ({ report, onSendEmail }) => {
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRegistryModalOpen, setIsRegistryModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('scopelock_unlocked');
    if (saved === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const changeOrderText = generateFormalChangeOrderText(report);

  // Masked preview for locked users
  const lines = changeOrderText.split('\n');
  const previewLines = lines.slice(0, 8).join('\n');

  const handleCopy = async () => {
    if (!isUnlocked) {
      recordTelemetryEvent('checkout_click', `User encountered Change Order paywall ($2 unlock modal opened)`);
      setIsUnlockModalOpen(true);
      return;
    }
    await copyToClipboard(changeOrderText);
    setCopied(true);
    recordTelemetryEvent('change_order_copy', `User copied statutory Change Order for "${report.projectName}" ($${report.totalScopeCreepCost.toLocaleString()})`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!isUnlocked) {
      recordTelemetryEvent('checkout_click', `User encountered Change Order download paywall ($2 unlock modal opened)`);
      setIsUnlockModalOpen(true);
      return;
    }
    recordTelemetryEvent('bridge_export', `User downloaded Change Order text document for "${report.projectName}"`);
    const element = document.createElement('a');
    const file = new Blob([changeOrderText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ChangeOrder-${report.projectName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    if (!isUnlocked) {
      recordTelemetryEvent('checkout_click', `User encountered Change Order print paywall ($2 unlock modal opened)`);
      setIsUnlockModalOpen(true);
      return;
    }
    recordTelemetryEvent('bridge_export', `User printed / exported PDF of Change Order for "${report.projectName}"`);
    window.print();
  };

  const handleDispatch = () => {
    if (!isUnlocked) {
      setIsUnlockModalOpen(true);
      return;
    }
    onSendEmail();
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileSignature className="w-4 h-4 text-indigo-400" />
            <span>Generated Legally-Binding Change Order</span>
            {isUnlocked ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                ✓ Full Access Unlocked
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked Preview
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ready for client countersignature to bill <span className="text-emerald-400 font-semibold">${report.totalScopeCreepCost.toLocaleString()}</span> in uncontracted scope.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              recordTelemetryEvent('registry_verify', `User verified UCC Statutory Registry Seal for "${report.projectName}" (ID: ${report.registryId})`);
              setIsRegistryModalOpen(true);
            }}
            className="px-3 py-1.5 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/60 border border-emerald-500/40 hover:border-emerald-400 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verify UCC Registry Seal</span>
          </button>

          <button
            onClick={() => {
              recordTelemetryEvent('bridge_export', `User generated client shareable link for "${report.projectName}"`);
              setIsShareModalOpen(true);
            }}
            className="px-3 py-1.5 text-xs font-bold text-indigo-300 hover:text-white bg-indigo-950/60 border border-indigo-500/40 hover:border-indigo-400 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Share Client Portal</span>
          </button>

            {!isUnlocked ? (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsUnlockModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:opacity-95 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer animate-pulse"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Unlock Statutory Change Order ($2 USD)</span>
                </button>
              </div>
            ) : (
            <>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
              <button
                onClick={handleDispatch}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch to Client</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Contract Content Box */}
      <div className="mt-4 relative">
        <div className={`bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre ${!isUnlocked ? 'max-h-[220px] select-none overflow-hidden blur-[1px]' : 'max-h-[380px] select-text'}`}>
          {isUnlocked ? changeOrderText : `${previewLines}\n\n[... FULL LEGAL CLAUSES, PRICING BREAKDOWN, DIGITAL COUNTERSIGNATURE BLOCK, AND SCOPE ADJUSTMENT MATRIX LOCKED ...]\n\n[UNLOCK AUDIT PASS ($19 USD VIA PAYONEER / CARD) FOR CLIENT-READY EDITABLE CONTRACT]`}
        </div>

        {/* Lock Overlay when not unlocked */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-[2px] rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Formal Legal Change Order Locked</h4>
            <p className="text-xs text-slate-400 max-w-md mb-4">
              Bill your client for the extra <span className="text-emerald-400 font-bold">${report.totalScopeCreepCost.toLocaleString()}</span> with full legal protection and signature blocks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsUnlockModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white text-xs font-black rounded-xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer animate-pulse"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Recover ${report.totalScopeCreepCost.toLocaleString()} • Unlock Statutory Change Order ($2 USD)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Viral Loop Footer */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3.5">
        <div className="flex items-center gap-2 text-xs text-indigo-300">
          <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>ScopeLock AI™ Verification Seal:</strong> Client change orders include built-in viral referrals for agencies.
          </span>
        </div>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>View Public Client Link</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Enterprise compliance standard: Includes explicit payment schedule terms, client digital countersignature block, and schedule extension waivers.</span>
      </div>

      <UnlockPaymentModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlockSuccess={() => setIsUnlocked(true)}
        potentialSavedCost={report.totalScopeCreepCost}
      />

      <ShareAuditModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        report={report}
      />

      <VerificationRegistryModal
        isOpen={isRegistryModalOpen}
        onClose={() => setIsRegistryModalOpen(false)}
        report={report}
      />
    </div>
  );
};
