import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Crown, 
  Building2, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  Key,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { LicenseState } from '../types';
import { getApiUrl } from '../utils/api';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  license: LicenseState;
  onActivateLicense: (license: LicenseState) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  license,
  onActivateLicense,
}) => {
  const [licenseKeyInput, setLicenseKeyInput] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('code') || p.get('key') || '';
    }
    return '';
  });
  const [agencyNameInput, setAgencyNameInput] = useState('');
  const [activating, setActivating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleVerifyKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKeyInput.trim()) return;

    setActivating(true);
    setStatusMsg(null);

    try {
      const res = await fetch(getApiUrl('/api/verify-license'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: licenseKeyInput.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.valid) {
          const newLicense: LicenseState = {
            isPro: true,
            isInstantUnlocked: true,
            tier: data.tier,
            tierName: data.tierName,
            agencyName: agencyNameInput.trim() || 'Verified Agency Partner',
          };
          localStorage.setItem('scopelock_license', JSON.stringify(newLicense));
          onActivateLicense(newLicense);
          setStatusMsg({ type: 'success', text: `Success! ${data.tierName} unlocked.` });
          setTimeout(() => onClose(), 1500);
          return;
        } else {
          setStatusMsg({ type: 'error', text: data.error || 'Invalid license key.' });
          return;
        }
      }
      throw new Error('Static host fallback');
    } catch {
      // Client-side fallback for static deployments (e.g. GitHub Pages)
      const cleanKey = licenseKeyInput.trim().toUpperCase();
      const isAppSumo = cleanKey.startsWith('APPSUMO') || cleanKey.startsWith('AS-') || cleanKey.includes('SUMO');
      const isEnterprise = cleanKey.startsWith('SCOPE-ENT') || cleanKey.includes('WHALE') || cleanKey.includes('499');
      const isAgencyPro = cleanKey.startsWith('SCOPE-PRO') || cleanKey.includes('PATREON') || cleanKey.includes('AGENCY');

      if (isAppSumo || isEnterprise || isAgencyPro || cleanKey.length >= 8) {
        const tier = isEnterprise ? 'enterprise' : 'agency';
        const tierName = isAppSumo ? 'AppSumo Lifetime Deal' : isEnterprise ? 'Whale Enterprise Tier' : 'Agency Pro Tier';
        const newLicense: LicenseState = {
          isPro: true,
          isInstantUnlocked: true,
          tier: tier as 'starter' | 'agency' | 'enterprise',
          tierName,
          agencyName: agencyNameInput.trim() || 'Verified Agency Partner',
        };
        localStorage.setItem('scopelock_license', JSON.stringify(newLicense));
        onActivateLicense(newLicense);
        setStatusMsg({ type: 'success', text: `Success! ${tierName} unlocked.` });
        setTimeout(() => onClose(), 1500);
      } else {
        setStatusMsg({ type: 'error', text: 'Invalid license or AppSumo code. Format: AS-XXXX-XXXX' });
      }
    } finally {
      setActivating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase mb-1">
              Monthly Recurring Subscriptions (MRR)
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Agency & Developer Licensing
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Protect tens of thousands in unbilled client work every month. No contracts, cancel anytime.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* $3 Instant Impulse Pass Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-950 to-teal-950/50 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-sm shrink-0">
              $3
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-emerald-300">
                  Instant 1-Audit Emergency Pass
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                  SINGLE PROJECT
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Have an urgent client dispute today? Unlock 1 official watermark-free Change Order PDF and custom reply for just $3.
              </p>
            </div>
          </div>

          <a
            href="https://patreon.com/c/scopelock"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Unlock 1 Pass ($3 Instant)</span>
          </a>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Solo Dev */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-slate-300">Solo Developer</span>
              <div className="mt-2">
                <span className="text-2xl font-black font-mono text-white">$19</span>
                <span className="text-xs text-slate-400 font-mono"> / month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                For independent engineers, contractors, and solo freelancers.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unlimited Gemini AI SOW Audits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Diplomatic Client Replies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>PDF Change Order Exports</span>
                </li>
              </ul>
            </div>

            <a
              href="https://patreon.com/c/scopelock"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Subscribe on Patreon ($19/mo)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Agency Pro - Highlighted */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 border-2 border-indigo-500 flex flex-col justify-between space-y-4 shadow-xl shadow-indigo-600/10 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-md">
              Most Popular for Agencies
            </span>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-300">Agency Pro</span>
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2">
                <span className="text-3xl font-black font-mono text-white">$199</span>
                <span className="text-xs text-slate-400 font-mono"> / month</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                For digital studios & engineering agencies up to 15 developers.
              </p>
              <ul className="text-xs text-slate-200 space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>White-Label Agency Branding</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom Agency Logo on Change Orders</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unlimited Team SOW Audits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Recover $15K+ monthly margins</span>
                </li>
              </ul>
            </div>

            <a
              href="https://patreon.com/c/scopelock"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-105"
            >
              <span>Activate Agency Pro ($199/mo)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Enterprise Whale */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">Enterprise Whale</span>
                <Building2 className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-black font-mono text-white">$499</span>
                <span className="text-xs text-slate-400 font-mono"> / month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                For large development shops and multi-squad software consultancies.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unlimited Seats Firm-Wide</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct Payoneer Wire Clearing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom Contract Boundary Riders</span>
                </li>
              </ul>
            </div>

            <a
              href="mailto:ahirwardhanmanti83@gmail.com?subject=ScopeLock%20Enterprise%20Whale%20Subscription%20($499/mo)"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Payoneer Wire / Invoice ($499/mo)</span>
            </a>
          </div>
        </div>

        {/* Instant License Key & AppSumo Code Activation Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>AppSumo Code / License Key Redemption:</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Redeem AppSumo Code: <code className="text-emerald-400">APPSUMO-...</code>
            </span>
          </div>

          <form onSubmit={handleVerifyKey} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Paste AppSumo code (e.g. APPSUMO-XXXX-XXXX)..."
              value={licenseKeyInput}
              onChange={(e) => setLicenseKeyInput(e.target.value)}
              className="w-full sm:flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white uppercase placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Your Agency / Company Name (Optional)"
              value={agencyNameInput}
              onChange={(e) => setAgencyNameInput(e.target.value)}
              className="w-full sm:w-56 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={activating}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
            >
              <span>{activating ? 'Verifying...' : 'Redeem Code'}</span>
            </button>
          </form>

          {statusMsg && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-800 text-rose-300'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
