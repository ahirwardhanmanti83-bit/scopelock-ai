import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Crown, 
  Building2, 
  ShieldCheck, 
  ExternalLink,
  Key,
  GitBranch,
  FileText,
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

  const handleSelectFree = () => {
    const freeLicense: LicenseState = {
      isPro: false,
      tier: 'free',
      tierName: 'Free Community Tier',
      scansUsedThisMonth: 0,
    };
    localStorage.setItem('scopelock_license', JSON.stringify(freeLicense));
    onActivateLicense(freeLicense);
    setStatusMsg({ type: 'success', text: 'Free Tier activated. 1 repository scan available this month.' });
    setTimeout(() => onClose(), 1200);
  };

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
          const isAgency = data.tier === 'agency' || data.tier === 'agency_pro' || data.tier === 'enterprise';
          const newLicense: LicenseState = {
            isPro: true,
            tier: isAgency ? 'agency' : 'pro',
            tierName: data.tierName || (isAgency ? 'Agency ($199/mo)' : 'Pro ($19/mo)'),
            agencyName: agencyNameInput.trim() || 'Verified Software Partner',
          };
          localStorage.setItem('scopelock_license', JSON.stringify(newLicense));
          onActivateLicense(newLicense);
          setStatusMsg({ type: 'success', text: `Success! ${newLicense.tierName} unlocked.` });
          setTimeout(() => onClose(), 1500);
          return;
        } else {
          setStatusMsg({ type: 'error', text: data.error || 'Invalid license key.' });
          return;
        }
      }
      throw new Error('Fallback activation');
    } catch {
      // Client-side fallback for static deployments (e.g. GitHub Pages)
      const cleanKey = licenseKeyInput.trim().toUpperCase();
      const isAgency = cleanKey.startsWith('AGENCY') || cleanKey.includes('199') || cleanKey.includes('APPSUMO') || cleanKey.includes('DEMO-PRO-2026');
      const isPro = cleanKey.startsWith('PRO') || cleanKey.includes('19') || cleanKey.includes('SOLO');

      if (isAgency || isPro || cleanKey.length >= 6) {
        const tier = isAgency ? 'agency' : 'pro';
        const tierName = isAgency ? 'Agency ($199/mo)' : 'Pro ($19/mo)';
        const newLicense: LicenseState = {
          isPro: true,
          tier,
          tierName,
          agencyName: agencyNameInput.trim() || 'Verified Software Partner',
        };
        localStorage.setItem('scopelock_license', JSON.stringify(newLicense));
        onActivateLicense(newLicense);
        setStatusMsg({ type: 'success', text: `Success! ${tierName} unlocked.` });
        setTimeout(() => onClose(), 1500);
      } else {
        setStatusMsg({ type: 'error', text: 'Invalid license key. Use DEMO-PRO-2026 for Agency or PRO-DEMO-2026 for Pro.' });
      }
    } finally {
      setActivating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="text-xs font-semibold text-indigo-400 mb-1">
              Transparent Pricing · Cancel Anytime
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ScopeLock AI Plans & Licensing
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Detect unbilled scope creep in your Git repositories, protect profit margins, and deliver professional change orders.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close pricing modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards Grid (Free, Pro, Agency) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Free Tier */}
          <div className={`p-6 rounded-2xl bg-slate-950/70 border flex flex-col justify-between space-y-6 transition-all ${
            license.tier === 'free' && !license.isPro ? 'border-slate-600 ring-1 ring-slate-600' : 'border-slate-800'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Free Tier</span>
                {license.tier === 'free' && !license.isPro && (
                  <span className="text-[11px] font-medium text-emerald-400">Current Plan</span>
                )}
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">$0</span>
                <span className="text-xs text-slate-500 font-medium"> / month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ideal for trying out repository auditing on a single project.
              </p>
              <ul className="text-xs text-slate-300 space-y-2.5 mt-5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>1 repo scan</strong> per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Basic scope-creep report</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Basic unbilled hour estimation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleSelectFree}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Select Free Plan
            </button>
          </div>

          {/* Pro Tier ($19/month) */}
          <div className={`p-6 rounded-2xl bg-slate-950/90 border flex flex-col justify-between space-y-6 transition-all relative ${
            license.tier === 'pro' ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-800 hover:border-slate-700'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">Pro</span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-400">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>For Freelancers & Solo Devs</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">$19</span>
                <span className="text-xs text-slate-500 font-medium"> / month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                For active developers who want automatic repo protection & change orders.
              </p>
              <ul className="text-xs text-slate-200 space-y-2.5 mt-5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Unlimited repository scans</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>PDF change order exports</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Git pre-push hook</strong> integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Diplomatic client response drafts</span>
                </li>
              </ul>
            </div>

            <a
              href="https://patreon.com/c/scopelock"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <span>Subscribe to Pro ($19/mo)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Agency Tier ($199/month) */}
          <div className={`p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 border-2 border-indigo-500 flex flex-col justify-between space-y-6 shadow-xl shadow-indigo-600/10 relative ${
            license.tier === 'agency' ? 'ring-2 ring-indigo-400' : ''
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-indigo-300">Agency</span>
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-[11px] font-semibold text-indigo-300">Most Popular for Teams</span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">$199</span>
                <span className="text-xs text-slate-500 font-medium"> / month</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                For dev agencies, software studios, and multi-team consultancies.
              </p>
              <ul className="text-xs text-slate-200 space-y-2.5 mt-5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Multi-repository scanning</strong> (unlimited repos)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>White-label branding</strong> on all exports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom agency logo on client portals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Shareable 1-click client signature links</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Team-wide Git hooks & CI/CD scanner</span>
                </li>
              </ul>
            </div>

            <a
              href="https://patreon.com/c/scopelock"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Activate Agency ($199/mo)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* License Key & AppSumo Code Activation Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <div className="flex items-center gap-2 font-medium text-slate-200">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Already have a license key or subscription?</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Agency Demo: <code className="text-emerald-400 font-mono">DEMO-PRO-2026</code> · Pro Demo: <code className="text-emerald-400 font-mono">PRO-DEMO-2026</code>
            </span>
          </div>

          <form onSubmit={handleVerifyKey} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Paste license key or redemption code..."
              value={licenseKeyInput}
              onChange={(e) => setLicenseKeyInput(e.target.value)}
              className="w-full sm:flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white uppercase placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Agency / Studio Name (Optional)"
              value={agencyNameInput}
              onChange={(e) => setAgencyNameInput(e.target.value)}
              className="w-full sm:w-56 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={activating}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
            >
              <span>{activating ? 'Verifying...' : 'Activate License'}</span>
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
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
