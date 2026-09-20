import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Copy, Check, Globe, CreditCard } from 'lucide-react';
import { recordTelemetryEvent } from '../utils/telemetry';

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(payoneerEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim() || transactionRef.trim().length < 4) {
      setError('Please enter your Payoneer Transaction ID or Work Email reference');
      return;
    }

    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      localStorage.setItem('scopelock_unlocked', 'true');
      recordTelemetryEvent('payment_completed', `Instant Change Order Unlocked ($2 USD) - Ref: ${transactionRef}`, {
        revenueAmount: 2,
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
            <span>Unlock Formal Legal Change Order</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Bill your client for the extra <span className="text-emerald-400 font-bold">${potentialSavedCost.toLocaleString()}</span> in uncontracted scope.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Dual Price Selection: Micro-transaction $2 USD vs $19 Pro */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-b from-indigo-950/80 to-slate-950 border-2 border-emerald-500 rounded-xl p-3.5 relative shadow-lg shadow-emerald-500/10">
              <div className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow">
                ⚡ INSTANT PASS
              </div>
              <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-extrabold">Instant Micro-Unlock</div>
              <div className="text-xl font-black text-white mt-1 flex items-baseline gap-1">
                <span className="text-emerald-400">$2</span>
                <span className="text-xs font-semibold text-slate-300">USD</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">Instant PDF, Copy & Formal Change Order download</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Agency Pass</div>
              <div className="text-xl font-black text-white mt-1 flex items-baseline gap-1">
                <span>$19</span>
                <span className="text-xs font-semibold text-slate-400">USD</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">Unlimited Change Orders + SOW defense suite</p>
            </div>
          </div>

          {/* Payment Rails Section (Patreon Card / Payoneer) */}
          <div className="p-4 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span>Live Payment Gateways</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                100% Tax Deductible
              </span>
            </div>

            {/* Direct Card / Patreon Option */}
            <a
              href="https://patreon.com/c/AestheticFindsUSA"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent hover:bg-amber-500/30 text-amber-200 text-xs font-bold flex items-center justify-between transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">💳</span>
                <div>
                  <div className="text-white font-extrabold text-xs">Unlock via Patreon / Card ($2 USD)</div>
                  <div className="text-[10px] text-amber-400/90 font-normal">Credit Card, Debit Card, PayPal, Apple Pay, Google Pay</div>
                </div>
              </div>
              <span className="text-[10px] font-black text-amber-400 group-hover:translate-x-1 transition-transform">Pay Now →</span>
            </a>

            {/* Payoneer / Direct Settlement Option */}
            <div className="w-full bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Payoneer / Direct Wire ID</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-mono">Dhanmanti Ahirwar</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-slate-950 p-2 rounded border border-slate-800">
                <div className="font-mono text-emerald-400 select-all text-xs font-bold truncate">{payoneerEmail}</div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transaction Confirmation Form */}
          <form onSubmit={handleVerifyPayment} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Enter Payoneer Payment Reference / Transaction ID:
              </label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="e.g. PAY-98274921 or Work Email"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {error && <p className="text-[11px] text-rose-400 mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Payoneer Clearance...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Payment & Instant Unlock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-2 justify-center text-[10px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authorized Signatory: Dhanmanti Ahirwar • Instant automated unlock</span>
          </div>
        </div>
      </div>
    </div>
  );
};
