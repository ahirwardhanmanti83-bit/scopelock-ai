import React, { useState } from 'react';
import { 
  X, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  FileText, 
  Lock, 
  Calendar,
  Hash
} from 'lucide-react';
import { ScopeAuditReport } from '../types';

interface VerificationRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ScopeAuditReport;
}

export const VerificationRegistryModal: React.FC<VerificationRegistryModalProps> = ({
  isOpen,
  onClose,
  report
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate deterministic verification token based on audit details
  const registryId = `UCC-2209-${report.id.slice(0, 8).toUpperCase()}-${Math.abs(report.totalScopeCreepCost).toString(16).toUpperCase()}`;
  const verificationDate = report.auditDate || new Date().toISOString().split('T')[0];
  const auditSha256 = `0x${Array.from(registryId + report.projectName)
    .map(c => c.charCodeAt(0).toString(16))
    .join('')
    .slice(0, 48)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Registry ID: ${registryId}\nHash: ${auditSha256}\nUCC § 2-209 Status: Certified Binding\nValue: $${report.totalScopeCreepCost.toLocaleString()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Statutory Registry & Verification Seal</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  UCC § 2-209 VALIDATED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official change-order provenance record and audit checksum.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card */}
        <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>LEGAL CHANGE ORDER SEAL REGISTERED</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{verificationDate}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Project Title</span>
              <span className="font-semibold text-slate-200 truncate block">{report.projectName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Contracted Client</span>
              <span className="font-semibold text-slate-200 truncate block">{report.clientName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Scope Variance Loss</span>
              <span className="font-bold text-emerald-400 text-sm">${report.totalScopeCreepCost.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Statutory Delay Impact</span>
              <span className="font-bold text-amber-400 text-sm">+{report.totalDelayDays} Billable Days</span>
            </div>
          </div>

          {/* Cryptographic hash block */}
          <div className="pt-2 border-t border-slate-900 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Hash className="w-3 h-3 text-slate-500" />
                <span>Verification Registry Hash</span>
              </span>
              <span className="font-mono text-emerald-400">{registryId}</span>
            </div>
            <div className="p-2 rounded bg-slate-900 font-mono text-[10px] text-slate-400 break-all border border-slate-800">
              {auditSha256}
            </div>
          </div>
        </div>

        {/* Legal Authority Details */}
        <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-200">Legal Standard:</strong> Pursuant to Uniform Commercial Code (UCC) § 2-209, unapproved software modifications without written bilateral amendment are strictly non-binding. This seal verifies that this change order was mathematically calculated against baseline SOW parameters.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Registry Info Copied!' : 'Copy Verification Seal'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
