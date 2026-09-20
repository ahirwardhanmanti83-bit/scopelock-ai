import React, { useState } from 'react';
import { CreditCard, Check, Copy, ArrowRight, Sparkles, Building2, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { recordTelemetryEvent } from '../utils/telemetry';

interface CommercialLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommercialLicenseModal: React.FC<CommercialLicenseModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'micro' | 'solo' | 'agency' | 'enterprise'>('agency');
  const [showPayoneerDetails, setShowPayoneerDetails] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const payoneerEmail = 'ahirwardhanmanti83@gmail.com';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(payoneerEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getPlanPrice = () => {
    if (selectedPlan === 'micro') return '$2 USD';
    if (selectedPlan === 'solo') return '$19';
    if (selectedPlan === 'agency') return '$199';
    return '$499';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl w-full max-w-xl p-5 sm:p-6 shadow-2xl relative text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-3 h-3" />
              <span>Commercial Software Licensing</span>
            </div>
            <h2 className="text-lg font-black text-white">Select Your Tier & B2B Commercial License</h2>
            <p className="text-xs text-slate-400">Recurring Access for Solo Devs, Digital Agencies & Software Teams</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Pricing Selection - 4 Tiers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          <button
            type="button"
            onClick={() => { setSelectedPlan('micro'); setShowPayoneerDetails(false); }}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedPlan === 'micro'
                ? 'bg-emerald-600/10 border-emerald-500 ring-1 ring-emerald-500/50'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              Instant Pass
            </span>
            <span className="text-xs font-bold block text-white mt-1">1-AUDIT PASS</span>
            <span className="text-lg font-black text-white mt-0.5 block">
              $2 <span className="text-[10px] text-slate-400 font-normal">USD</span>
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block leading-tight">
              Instant single client Change Order unlock
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedPlan('solo'); setShowPayoneerDetails(false); }}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedPlan === 'solo'
                ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/50'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              Solo Dev
            </span>
            <span className="text-xs font-bold block text-white mt-1">STARTER</span>
            <span className="text-lg font-black text-white mt-0.5 block">
              $19 <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block leading-tight">
              Single developer, 3 active projects
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedPlan('agency'); setShowPayoneerDetails(false); }}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedPlan === 'agency'
                ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
              Popular
            </span>
            <span className="text-xs font-bold block text-white mt-1">AGENCY PRO</span>
            <span className="text-lg font-black text-white mt-0.5 block">
              $199 <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block leading-tight">
              Unlimited PMs & custom branding
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedPlan('enterprise'); setShowPayoneerDetails(false); }}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedPlan === 'enterprise'
                ? 'bg-violet-600/20 border-violet-500 ring-1 ring-violet-500/50'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">
              Enterprise
            </span>
            <span className="text-xs font-bold block text-white mt-1">SOVEREIGN</span>
            <span className="text-lg font-black text-white mt-0.5 block">
              $499 <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block leading-tight">
              Full white-label & custom SLA terms
            </span>
          </button>
        </div>

        {/* Plan Feature Bullets */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800 pb-2">
            <span>Selected Tier Features:</span>
            <span className="text-emerald-400 font-mono font-bold">
              {selectedPlan === 'micro' ? '$2 USD One-Time' : `${getPlanPrice()}/month Recurring Access`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px] pt-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Automated Scope-Creep Detection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full Legal Indemnity & Signature Blocks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Formal Change Order PDF & Copy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Client Countersignature Ready</span>
            </div>
          </div>
        </div>

        {/* Payoneer Details Dropdown */}
        {showPayoneerDetails ? (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>B2B Commercial Settlement Details</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-semibold">
                Official Payoneer Receiving Account
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Corporate Signatory / Beneficiary:</span>
                <span className="text-white font-mono font-semibold">Dhanmanti Ahirwar</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Payoneer Account ID / Email:</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono font-bold text-xs select-all">{payoneerEmail}</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>International Settlement Currency:</span>
                <span className="text-white font-mono font-bold">USD (United States Dollar)</span>
              </div>
            </div>

            {/* Instant Patreon Gateway Alternative */}
            <div className="pt-2 border-t border-slate-800/80">
              <a
                href="https://patreon.com/c/AestheticFindsUSA"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  const amount = selectedPlan === 'micro' ? 2 : selectedPlan === 'solo' ? 19 : selectedPlan === 'agency' ? 199 : 499;
                  recordTelemetryEvent('checkout_click', `High-intent Patreon checkout initiated for ${selectedPlan.toUpperCase()} tier ($${amount})`, {
                    revenueAmount: amount,
                    currency: 'USD',
                    tier: selectedPlan
                  });
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent hover:bg-amber-500/30 text-amber-200 text-xs font-bold flex items-center justify-between transition-all group cursor-pointer"
              >
                <span>💳 Pay Subscription via Patreon (Credit Card / PayPal)</span>
                <span className="text-[10px] font-bold text-amber-400">Card Checkout →</span>
              </a>
            </div>
          </div>
        ) : null}

        {/* Modal Actions */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          
          {!showPayoneerDetails ? (
            <button
              onClick={() => {
                setShowPayoneerDetails(true);
                const amount = selectedPlan === 'micro' ? 2 : selectedPlan === 'solo' ? 19 : selectedPlan === 'agency' ? 199 : 499;
                recordTelemetryEvent('checkout_click', `User viewed B2B payment details for ${selectedPlan.toUpperCase()} tier ($${amount})`, {
                  revenueAmount: amount,
                  currency: 'USD',
                  tier: selectedPlan
                });
              }}
              className="flex-1 py-2.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {selectedPlan === 'micro' ? 'Pay $2 USD via Card / Payoneer' : `Subscribe via Payoneer / Card (${getPlanPrice()}/mo)`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <a
              href={`mailto:${payoneerEmail}?subject=B2B%20License%20Invoice%20Request%20(${getPlanPrice()})&body=Hello,%0D%0A%0D%0AWe%20would%20like%20to%20activate%20our%20${selectedPlan === 'micro' ? '1-Audit%20Pass%20($2%20USD)' : selectedPlan === 'solo' ? 'Starter%20($19/mo)' : selectedPlan === 'agency' ? 'Agency%20Pro%20($199/mo)' : 'Sovereign%20Enterprise%20($499/mo)'}%20access%20for%20ScopeLock%20AI.%0D%0A%0D%0AAgency/User%20Name:%20%0D%0APayoneer/Wire%20Reference:%20%0D%0A%0D%0AThank%20you.`}
              onClick={() => {
                const amount = selectedPlan === 'micro' ? 2 : selectedPlan === 'solo' ? 19 : selectedPlan === 'agency' ? 199 : 499;
                recordTelemetryEvent('checkout_click', `Payoneer direct wire email receipt requested for ${selectedPlan.toUpperCase()} ($${amount})`, {
                  revenueAmount: amount,
                  currency: 'USD',
                  tier: selectedPlan
                });
              }}
              className="flex-1 py-2.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {selectedPlan === 'micro' ? 'Request $2 USD Payoneer Receipt' : `Request Direct Payoneer Invoice (${getPlanPrice()}/mo)`}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
