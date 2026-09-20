import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, ShieldCheck, Mail, Sparkles, Send, Lock, ArrowUpRight } from 'lucide-react';
import { ScopeAuditReport } from '../types';

interface ShareAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ScopeAuditReport;
}

export const ShareAuditModal: React.FC<ShareAuditModalProps> = ({ isOpen, onClose, report }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.origin;
  const shareableUrl = `${currentUrl}/?ref=co_${report.id.slice(-8)}#audit-preview`;

  const agencyPitchText = `Hi ${report.clientName},\n\nWe have completed the statutory Scope Audit for "${report.projectName}". Uncontracted feature requests total $${report.totalScopeCreepCost.toLocaleString()} USD with +${report.totalDelayDays} days delivery extension.\n\nReview & digitally ratify the Change Order here:\n${shareableUrl}\n\nCertified via ScopeLock AI™ Legal Defense Infrastructure.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(agencyPitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-white">Client Portal & Viral Growth Link</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                Viral Loop Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Share directly with client. Every shared link showcases ScopeLock AI to potential new agencies.
            </p>
          </div>
        </div>

        {/* Shareable URL Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 my-4">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Direct Client Verification & Ratification URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-indigo-300 px-3 py-2 rounded-lg font-mono truncate select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Viral Referral Banner (What the client and partner sees) */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-950 border border-indigo-500/30 rounded-xl p-4 my-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Embedded Viral Acquisition Engine</span>
                <span className="text-[10px] text-indigo-400 font-normal">($0 CAC organic loop)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                When your client or their enterprise partners inspect this change order, the document footer displays:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[11px] font-mono text-slate-300">
                "🛡️ Audited & Certified by ScopeLock AI™ — B2B Scope Defense Engine. Are you a digital agency losing billable hours? <span className="text-indigo-400 underline">Start Free Forensic Audit →</span>"
              </div>
            </div>
          </div>
        </div>

        {/* One-Click Executive Client Email Copy */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pre-Crafted Executive Notice to Client
            </label>
            <button
              onClick={handleCopyPitch}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              {copiedPitch ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPitch ? 'Copied to Clipboard' : 'Copy Message'}</span>
            </button>
          </div>
          <textarea
            readOnly
            rows={5}
            value={agencyPitchText}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 p-3 rounded-xl font-mono leading-relaxed select-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Client Link with Viral Referral</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
