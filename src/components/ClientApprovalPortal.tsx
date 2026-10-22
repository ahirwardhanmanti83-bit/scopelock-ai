import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Building2, 
  Printer, 
  Sparkles,
  AlertCircle,
  Share2
} from 'lucide-react';
import { ChangeOrderDocument } from '../types';
import { getApiUrl } from '../utils/api';

interface ClientApprovalPortalProps {
  orderId: string;
  onExitToDashboard: () => void;
}

export const ClientApprovalPortal: React.FC<ClientApprovalPortalProps> = ({
  orderId,
  onExitToDashboard
}) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [signatoryName, setSignatoryName] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signedState, setSignedState] = useState<{
    signed: boolean;
    hash?: string;
    signedAt?: string;
    name?: string;
  }>({ signed: false });

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(getApiUrl(`/api/orders/${orderId}`));
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order.data);
        if (data.order.status === 'signed') {
          setSignedState({
            signed: true,
            hash: data.order.signatureHash,
            signedAt: data.order.signedAt,
            name: data.order.signedByName
          });
          setSignatoryName(data.order.signedByName || '');
        } else {
          setSignatoryName(data.order.data.clientSignatoryName || '');
        }
      } else {
        setError(data.error || 'Change order could not be located.');
      }
    } catch (err: any) {
      setError('Unable to load change order details. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatoryName.trim()) {
      alert('Please enter your full legal name or title for authorization.');
      return;
    }
    if (!agreedTerms) {
      alert('Please check the confirmation box to ratify the change order.');
      return;
    }

    setSigning(true);
    try {
      const res = await fetch(getApiUrl(`/api/orders/${orderId}/sign`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signatoryName })
      });
      const data = await res.json();
      if (data.success) {
        setSignedState({
          signed: true,
          hash: data.signatureHash,
          signedAt: data.signedAt,
          name: signatoryName
        });
      } else {
        alert(data.error || 'Failed to sign order.');
      }
    } catch (err) {
      alert('Error during signature submission.');
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-slate-400">Loading Secure Change Order Portal...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Document Not Available</h2>
          <p className="text-xs text-slate-400">{error || 'This change order link may have expired or is invalid.'}</p>
          <button
            onClick={onExitToDashboard}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Go to ScopeLock Home
          </button>
        </div>
      </div>
    );
  }

  const doc: ChangeOrderDocument = order;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Floating Security & Verification Bar */}
        <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  ScopeLock Enterprise Verification Portal
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SSL Encrypted
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official Statement of Work (SOW) Contract Amendment • Ref: <span className="font-mono text-slate-300">{doc.changeOrderNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onExitToDashboard}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Agency Workspace
            </button>
          </div>
        </div>

        {/* Status Alert Banner */}
        {signedState.signed ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 flex items-start gap-4 shadow-lg shadow-emerald-950/30">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-emerald-200">
                Change Order Executed & Ratified
              </h3>
              <p className="text-xs text-emerald-300/80">
                Authorized by <strong>{signedState.name}</strong> on {signedState.signedAt ? new Date(signedState.signedAt).toLocaleString() : 'Executed'}.
              </p>
              <p className="text-[10px] font-mono text-emerald-400/90 pt-1">
                Cryptographic Audit Hash: <span className="bg-emerald-900/50 px-1.5 py-0.5 rounded">{signedState.hash}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-amber-200">Pending Client Authorization:</span>{' '}
                <span className="text-amber-300/80">Please review the itemized scope variations below and ratify.</span>
              </div>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Awaiting Signature
            </span>
          </div>
        )}

        {/* The Clean White Official Legal Document Container */}
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 space-y-8 font-sans">
          
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
              <p><strong>Issuing Agency / Partner:</strong> {doc.agencyName}</p>
              <p><strong>Client Entity:</strong> {doc.clientName}</p>
              <p><strong>Project:</strong> {doc.projectName}</p>
            </div>
          </div>

          {/* Section 1: Itemized Scope Variance */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              1. Authorized Unbudgeted Deliverables
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Scope Item Description</th>
                    <th className="py-2.5 px-3 text-right">Engineering Hours</th>
                    <th className="py-2.5 px-3 text-right">Investment (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {doc.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-3 font-medium text-slate-900">{item.description}</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700">{item.hours} hrs</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                        ${item.cost.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Impact Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Total Billable Hours
              </span>
              <span className="text-2xl font-black font-mono text-slate-900">
                +{doc.totalHours} hrs
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Schedule Tolling Extension
              </span>
              <span className="text-2xl font-black font-mono text-slate-900">
                +{doc.timelineExtensionDays} business days
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Total Additional Investment
              </span>
              <span className="text-2xl font-black font-mono text-indigo-700">
                ${doc.totalCost.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* Commercial Terms */}
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-5">
            <h4 className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
              2. Commercial Authorization Terms
            </h4>
            <p>{doc.paymentTerms}</p>
            <p className="text-[10px] text-slate-500 italic">
              Execution of this document constitutes authorization to commence the extra deliverables and extend the milestone delivery timeline accordingly.
            </p>
          </div>

          {/* Interactive Ratification / Signatures Block */}
          <div className="border-t-2 border-slate-900 pt-6">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-xs mb-4">
              3. Mutual Execution & Digital Ratification
            </h4>

            {signedState.signed ? (
              <div className="bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-base font-black text-slate-900">
                  Change Order Digitally Executed
                </h5>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Signed on behalf of <strong>{doc.clientName}</strong> by <strong>{signedState.name}</strong>.
                </p>
                <div className="inline-block px-3 py-1 bg-white border border-emerald-300 rounded-lg text-[10px] font-mono text-emerald-800 font-bold">
                  Certified SHA-256 Stamp: {signedState.hash}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSignOrder} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Client Representative Full Name & Title
                  </label>
                  <input
                    type="text"
                    required
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    placeholder="e.g. John Doe, VP Technology"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-medium"
                  />
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="terms-check"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="terms-check" className="text-xs text-slate-700 cursor-pointer">
                    I confirm that I am an authorized representative of <strong>{doc.clientName}</strong> and ratify the scope variance, investment of <strong>${doc.totalCost.toLocaleString()} USD</strong>, and milestone schedule adjustment.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={signing}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {signing ? (
                    <span>Authenticating & Signing...</span>
                  ) : (
                    <>
                      <FileCheck2 className="w-4 h-4" />
                      <span>Authorize & Digitally Sign Change Order</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer watermark seal */}
          <div className="text-center pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
            Certified via ScopeLock AI • Enterprise Scope Defense & SOW Governance Protocol
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE BILATERAL VIRAL LOOP BANNER (The Calendly / DocuSign Acquisition Flywheel) */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 p-8 rounded-3xl text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by ScopeLock AI</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Are You a Software Agency, Dev Studio or Contractor?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop losing thousands of dollars every month to unbilled client revisions. Generate audit-ready change orders that clients sign in 60 seconds and lock your milestone profit margins.
          </p>

          <div className="pt-2">
            <button
              onClick={onExitToDashboard}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-indigo-500/40 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Create Your Free Agency ScopeLock Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            Zero friction • 100% Free Forever Tier • Used by top engineering contractors
          </p>
        </div>

      </div>
    </div>
  );
};
