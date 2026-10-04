import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Copy, Check, Globe, CreditCard, Building2, Zap, Lock } from 'lucide-react';
import { recordTelemetryEvent } from '../utils/telemetry';
import { copyToClipboard } from '../utils/clipboard';
import { saveLead } from '../utils/leadCapture';

interface UnlockPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  potentialSavedCost: number;
}

export const UnlockPaymentModal: React.FC<UnlockPaymentModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
  potentialSavedCost,
}) => {
  const [payoneerEmail] = useState('ahirwardhanmanti83@gmail.com');
  const [transactionRef, setTransactionRef] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    await copyToClipboard(payoneerEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim() || transactionRef.trim().length < 4) {
      setError('Please enter your Patreon / Payoneer Transaction ID or Work Email');
      return;
    }

    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      localStorage.setItem('scopelock_unlocked', 'true');
      
      // Save user reference/email in permanent lead vault
      if (transactionRef.includes('@')) {
        saveLead(transactionRef, 'payment_unlock_email');
      } else {
        saveLead(`customer_${transactionRef}@verified-pay.local`, 'payment_unlock_ref');
      }

      recordTelemetryEvent('payment_completed', `Instant Change Order Unlocked ($3 USD) - Ref: ${transactionRef}`, {
        revenueAmount: 3,
        currency: 'USD',
        tier: 'micro_unlock'
      });
      onUnlockSuccess();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-indigo-500/10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-slate-900 p-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
              <Globe className="w-3.5 h-3.5" />
              <span>International B2B Settlement</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>
          <h2 className="text-lg font-extrabold text-white mt-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <span>Unlock Formal Legal Change Order</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Bill your client for the extra <span className="text-emerald-400 font-bold">${potentialSavedCost.toLocaleString()}</span> in uncontracted scope.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Direct Card / Instant $3 Paywall CTA (PRIMARY NO-FRICTION RAIL) */}
          <div className="p-4 bg-gradient-to-b from-indigo-950/80 to-slate-950 border-2 border-emerald-500 rounded-xl space-y-3 relative shadow-lg shadow-emerald-500/10">
            <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow">
              ⚡ INSTANT 1-CLICK CARD UNLOCK
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <div className="text-white font-extrabold text-sm flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Instant UCC Demand Notice ($3 USD)</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                  Apple Pay, Google Pay, Visa, Mastercard, PayPal
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">$3</span>
                <span className="text-[10px] text-slate-400 block font-bold">ONE-TIME</span>
              </div>
            </div>

            <a
              href="https://www.patreon.com/posts/single-ucc-ss-2-170903732"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/25 cursor-pointer uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Pay $3 USD & Download Certified PDF →</span>
            </a>
          </div>

          {/* High Priority: $199/mo Agency Subscription Enforcer */}
          <div className="w-full p-3.5 rounded-xl border border-indigo-500/60 bg-gradient-to-r from-indigo-950/60 via-purple-950/30 to-slate-950 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>Agency Enforceable Shield ($199/mo)</span>
              </div>
              <span className="text-indigo-400 font-black text-xs">$199/mo</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Remove all watermarks, automated GitHub PR blocking, unlimited client audits.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href="https://patreon.com/c/scopelock"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Subscribe on Patreon ($199/mo) →</span>
              </a>
            </div>
          </div>

          {/* Payoneer / Direct Settlement Option */}
          <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Payoneer Direct Beneficiary</span>
              <span className="text-[10px] text-emerald-400 font-semibold font-mono">Dhanmanti Ahirwar</span>
            </div>
            <div className="flex items-center justify-between gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
              <div className="font-mono text-emerald-400 select-all text-xs font-bold truncate">{payoneerEmail}</div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Transaction Clearance Form */}
          <form onSubmit={handleVerifyPayment} className="space-y-2 pt-1">
            <label className="block text-[11px] font-semibold text-slate-300">
              Already paid on Patreon or Payoneer? Enter Email or TxID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="e.g. patreon-user@gmail.com or TxID"
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer shrink-0"
              >
                {isVerifying ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify</span>
                  </>
                )}
              </button>
            </div>
            {error && <p className="text-[11px] text-rose-400">{error}</p>}
          </form>

          <div className="flex items-center gap-2 justify-center text-[10px] text-slate-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authorized Legal Signatory: Dhanmanti Ahirwar • Instant Delivery</span>
          </div>

        </div>
      </div>
    </div>
  );
};
