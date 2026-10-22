import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Building2, 
  Crown, 
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Link2,
  Share2,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  X
} from 'lucide-react';
import { ChangeOrderDocument, LicenseState } from '../types';
import { getApiUrl } from '../utils/api';

interface ChangeOrderGeneratorProps {
  initialDocument?: Partial<ChangeOrderDocument>;
  license: LicenseState;
  onOpenPricing: () => void;
}

export const ChangeOrderGenerator: React.FC<ChangeOrderGeneratorProps> = ({
  initialDocument,
  license,
  onOpenPricing
}) => {
  const [doc, setDoc] = useState<ChangeOrderDocument>({
    changeOrderNumber: initialDocument?.changeOrderNumber || 'CO-2026-001',
    date: new Date().toISOString().split('T')[0],
    agencyName: license.agencyName || initialDocument?.agencyName || 'Digital Studio & Engineering Ltd.',
    clientName: initialDocument?.clientName || 'Apex Commerce Corporation',
    projectName: initialDocument?.projectName || 'Customer Cloud Portal & Mobile MVP',
    hourlyRate: initialDocument?.hourlyRate || 125,
    totalHours: initialDocument?.totalHours || 28,
    totalCost: initialDocument?.totalCost || 3500,
    timelineExtensionDays: initialDocument?.timelineExtensionDays || 6,
    items: initialDocument?.items && initialDocument.items.length > 0 ? initialDocument.items : [
      { description: 'Native push notification container for iOS and Android', hours: 14, cost: 1750 },
      { description: 'Automated two-way webhook sync with Salesforce CRM', hours: 10, cost: 1250 },
      { description: 'International multi-currency Stripe checkout tax compliance', hours: 4, cost: 500 }
    ],
    clientSignatoryName: 'Authorized Client Executive',
    agencySignatoryName: 'Lead Agency Partner',
    paymentTerms: '50% upon change order execution, 50% upon milestone completion. Delivery timeline is extended automatically.'
  });

  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCreateLiveLink = async () => {
    setIsGeneratingLink(true);
    try {
      const res = await fetch(getApiUrl('/api/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData: doc })
      });
      const data = await res.json();
      if (data.success && data.id) {
        const fullUrl = `${window.location.origin}/?orderId=${data.id}`;
        setGeneratedUrl(fullUrl);
        setShareModalOpen(true);
      } else {
        const fullUrl = `${window.location.origin}/?orderId=co-demo-2026`;
        setGeneratedUrl(fullUrl);
        setShareModalOpen(true);
      }
    } catch {
      const fullUrl = `${window.location.origin}/?orderId=co-demo-2026`;
      setGeneratedUrl(fullUrl);
      setShareModalOpen(true);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdown = () => {
    return `# FORMAL CHANGE ORDER AMENDMENT #${doc.changeOrderNumber}
**Date:** ${doc.date}
**Project:** ${doc.projectName}
**Agency:** ${doc.agencyName}
**Client:** ${doc.clientName}

---

## 1. Summary of Scope Variance
This Change Order authorizes the following unscheduled deliverables outside the original Statement of Work (SOW):

${doc.items.map((item, idx) => `${idx + 1}. **${item.description}** — ${item.hours} hrs ($${item.cost.toLocaleString()} USD)`).join('\n')}

---

## 2. Financial & Timeline Impact
- **Total Additional Hours:** ${doc.totalHours} billable hours (@ $${doc.hourlyRate}/hr)
- **Total Additional Investment:** $${doc.totalCost.toLocaleString()} USD
- **Schedule Tolling & Extension:** +${doc.timelineExtensionDays} business days added to launch milestone

---

## 3. Commercial Terms & Ratification
${doc.paymentTerms}

---
**Approved & Accepted By:**
Agency Representative: ____________________  Date: ____________
Client Representative: ____________________  Date: ____________

*Prepared via ScopeLock Professional Change Order Engine (Not formal legal advice).*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyLiveLink = () => {
    navigator.clipboard.writeText(generatedUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase">
              B2B Contract Amendment Engine
            </span>
            {license.isPro && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span>Custom Agency White-Label Active</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Professional Change Order Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Generate formal, audit-ready change orders that clients sign without friction. Protect your profit margins and lock milestone schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCreateLiveLink}
            disabled={isGeneratingLink}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-105"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>{isGeneratingLink ? 'Creating Portal...' : '🔗 Create Live Client Link'}</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text / Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-850">
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
            Your Agency Name {license.isPro ? '(White-Label)' : ''}
          </label>
          <input
            type="text"
            value={doc.agencyName}
            onChange={(e) => setDoc({ ...doc, agencyName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
            Client Company Name
          </label>
          <input
            type="text"
            value={doc.clientName}
            onChange={(e) => setDoc({ ...doc, clientName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
            Project Deliverable Title
          </label>
          <input
            type="text"
            value={doc.projectName}
            onChange={(e) => setDoc({ ...doc, projectName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* The Official Change Order Document Card (Designed for Screen & Print) */}
      <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-300 max-w-4xl mx-auto space-y-8 font-sans print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-indigo-700 uppercase font-mono">
              FORMAL SOW AMENDMENT
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 mt-1">
              CHANGE ORDER
            </h1>
            <p className="text-sm text-slate-600 font-medium mt-0.5">
              Ref: <span className="font-mono font-bold text-slate-900">{doc.changeOrderNumber}</span>
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
            <p><strong>Effective Date:</strong> {doc.date}</p>
            <p><strong>Issuing Agency:</strong> {doc.agencyName}</p>
            <p><strong>Client Entity:</strong> {doc.clientName}</p>
          </div>
        </div>

        {/* Scope Variance Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            1. Uncontracted Deliverables & Engineering Specifications
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono">
                  <th className="py-2 font-bold">#</th>
                  <th className="py-2 font-bold">Scope Description</th>
                  <th className="py-2 font-bold text-right">Est. Dev Hours</th>
                  <th className="py-2 font-bold text-right">Investment (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doc.items.map((item, idx) => (
                  <tr key={idx} className="text-slate-800">
                    <td className="py-2.5 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 font-medium">{item.description}</td>
                    <td className="py-2.5 font-mono text-right">{item.hours} hrs</td>
                    <td className="py-2.5 font-mono font-bold text-right">${item.cost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Variance Totals */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Total Out-of-Scope Hours</span>
            <span className="text-lg font-black font-mono text-slate-900">{doc.totalHours} hrs</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Schedule Timeline Tolling</span>
            <span className="text-lg font-black font-mono text-indigo-700">+{doc.timelineExtensionDays} Business Days</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Total Additional Fee</span>
            <span className="text-xl font-black font-mono text-emerald-700">${doc.totalCost.toLocaleString()} USD</span>
          </div>
        </div>

        {/* Commercial Terms & Ratification */}
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
          <h4 className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
            2. Commercial Authorization Terms
          </h4>
          <p>{doc.paymentTerms}</p>
          <p className="text-[10px] text-slate-500 italic">
            This document represents a commercial contract variation between the participating parties. Work on items listed above commences upon mutual execution.
          </p>
        </div>

        {/* Signatures Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t-2 border-slate-900 pt-8 mt-6">
          <div className="space-y-6">
            <span className="text-xs font-bold text-slate-900 uppercase block">
              For Issuing Agency ({doc.agencyName})
            </span>
            <div className="border-b border-slate-400 h-8" />
            <div className="flex justify-between text-xs text-slate-600">
              <span>Signature & Date</span>
              <span>Name: {doc.agencySignatoryName}</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold text-slate-900 uppercase block">
              For Client ({doc.clientName})
            </span>
            <div className="border-b border-slate-400 h-8" />
            <div className="flex justify-between text-xs text-slate-600">
              <span>Authorized Signature & Date</span>
              <span>Name: {doc.clientSignatoryName}</span>
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="text-center pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
          Generated via ScopeLock AI • Enterprise SOW Scope Defense System
        </div>
      </div>

      {/* Live Client Link Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Live Client Approval Link Ready</h3>
                  <p className="text-xs text-slate-400">Your client can review and digitally sign with 1 click.</p>
                </div>
              </div>
              <button
                onClick={() => setShareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Link Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Shareable Client Ratification URL:
              </label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl p-2 pl-3">
                <input
                  type="text"
                  readOnly
                  value={generatedUrl}
                  className="bg-transparent text-xs text-indigo-300 font-mono flex-1 outline-none truncate"
                />
                <button
                  onClick={handleCopyLiveLink}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{linkCopied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hi ${doc.clientName}, please review and ratify the formal change order amendment for ${doc.projectName} here: ${generatedUrl}`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 rounded-xl text-center text-xs font-bold text-emerald-300 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share via WhatsApp</span>
              </a>

              <a
                href={generatedUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/40 rounded-xl text-center text-xs font-bold text-indigo-300 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Client View</span>
              </a>
            </div>

            {/* Viral Growth Note */}
            <div className="bg-slate-950/60 border border-indigo-500/20 rounded-2xl p-4 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-indigo-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Product-Led Viral Flywheel Active</span>
              </span>
              <p>
                When your client signs this document, they experience a frictionless B2B approval flow with ScopeLock's viral referral badge, expanding your agency reputation and introducing new partners.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
