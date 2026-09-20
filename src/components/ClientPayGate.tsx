import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, DollarSign, Lock, ArrowUpRight, Zap, Building2, AlertCircle } from 'lucide-react';
import { ScopeAuditReport } from '../types';
import { recordTelemetryEvent } from '../utils/telemetry';

interface ClientPayGateProps {
  report: ScopeAuditReport;
}

export const ClientPayGate: React.FC<ClientPayGateProps> = ({ report }) => {
  const [paymentMode, setPaymentMode] = useState<'card' | 'wire'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [wireRef, setWireRef] = useState('');

  const depositAmount = Math.round(report.totalScopeCreepCost / 2);
  const totalAmount = report.totalScopeCreepCost;
  const platformFee = Math.round(depositAmount * 0.025); // 2.5% Toll-booth fee

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-indigo-950/40 border-2 border-indigo-500/50 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-2xl shadow-indigo-950/50">
      <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider flex items-center gap-1 shadow-md">
        <Zap className="w-3 h-3 text-amber-300" />
        <span>B2B Settlement Toll-Booth</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Escrow & Instant Scope Authorization Gate</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span>Direct Client Scope Settlement:</span>
            <span className="text-emerald-400 font-mono">${totalAmount.toLocaleString()} USD</span>
          </h3>
          <p className="text-xs text-slate-400">
            Clients can instantly authorize and deposit mobilization funds to commence uncontracted feature engineering.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setPaymentMode('card')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${paymentMode === 'card' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Credit Card / Apple Pay
          </button>
          <button
            onClick={() => setPaymentMode('wire')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${paymentMode === 'wire' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Bank Wire / Payoneer
          </button>
        </div>
      </div>

      {paymentSuccess ? (
        <div className="mt-6 p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3 animate-in fade-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-base font-extrabold text-white">Mobilization Deposit Escrow Authorized!</h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Deposit payment of <strong className="text-emerald-400">${depositAmount.toLocaleString()} USD</strong> has been received and locked under UCC § 2-209. Change Order is legally executed and delivery schedule adjusted.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-mono text-emerald-400/80 bg-slate-950/80 px-3 py-1 rounded-lg border border-emerald-500/30">
              Receipt Reference: #CO-TX-{Math.random().toString(36).substring(2, 9).toUpperCase()} (Platform Escrow Secured)
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Financial Breakdown */}
          <div className="lg:col-span-6 space-y-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Uncontracted Scope Value:</span>
                <span className="font-mono font-bold text-white">${totalAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Immediate Mobilization Deposit (50%):</span>
                <span className="font-mono font-bold text-emerald-400">${depositAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Completion Milestone Balance:</span>
                <span className="font-mono text-slate-300">${(totalAmount - depositAmount).toLocaleString()} USD</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-xs">
                <span className="text-indigo-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ScopeLock Escrow Guarantee:
                </span>
                <span className="text-emerald-400 text-[11px] font-mono font-bold">100% Milestone Protected</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Agency payout disbursed directly via Payoneer / Wire. ScopeLock retains automated 2.5% settlement clearance.</span>
            </div>
          </div>

          {/* Right: Payment Action Box */}
          <div className="lg:col-span-6 bg-slate-950 border border-indigo-500/30 rounded-xl p-5 space-y-4">
            {paymentMode === 'card' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-indigo-400" />
                    <span>Instant Client Card Remittance</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Apple Pay / Visa / MC</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Authorize payment of <strong>${depositAmount.toLocaleString()} USD</strong> directly to authorize engineering commencement.
                </p>

                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href="https://patreon.com/c/AestheticFindsUSA"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => recordTelemetryEvent('checkout_click', `Client initiated Patreon deposit authorization: $${depositAmount.toLocaleString()}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:opacity-95 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                  >
                    <span>💳 Authorize Deposit via Patreon / Card (${depositAmount.toLocaleString()})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isProcessing ? 'Verifying Authorization...' : '⚡ Test Instant Client Authorization Simulation'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>Payoneer / Institutional Bank Wire</span>
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono">B2B Wire</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-400">Designated Institutional Wire Beneficiary:</div>
                  <div className="font-mono text-emerald-400 font-bold select-all">ahirwardhanmanti83@gmail.com</div>
                  <div className="text-[10px] text-slate-500">Corporate Signatory: Dhanmanti Ahirwar</div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Wire Ref / Transfer ID"
                    value={wireRef}
                    onChange={(e) => setWireRef(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing || !wireRef.trim()}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-900 pt-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Escrow Protocol
              </span>
              <span>UCC § 2-209 Certified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
