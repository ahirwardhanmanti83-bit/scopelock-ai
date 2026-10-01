import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { recordTelemetryEvent } from '../utils/telemetry';

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (tier: string) => void;
}

// Pre-seeded AppSumo verification codes
const VALID_CODES = [
  'SCOPE-SUMO-TIER1-9482',
  'SCOPE-SUMO-TIER2-3819',
  'SCOPE-SUMO-AGENCY-7712',
  'LIFETIME-PRO-2026',
  'VIP-PARTNER-50K'
];

export const RedeemModal: React.FC<RedeemModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    
    if (VALID_CODES.includes(clean) || clean.startsWith('SCOPE-')) {
      setStatus('success');
      recordTelemetryEvent('plan_redeem', `Redeemed partner license code: ${clean} (Lifetime Agency Access)`);
      setTimeout(() => {
        onSuccess('Lifetime Agency Tier');
        onClose();
        setStatus('idle');
        setCode('');
      }, 1000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Redeem AppSumo / Lifetime Code</h3>
            <p className="text-xs text-slate-400">Unlock Unlimited Audits & Agency White-Label</p>
          </div>
        </div>

        <form onSubmit={handleRedeem} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter License / Voucher Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setStatus('idle');
              }}
              placeholder="e.g. SCOPE-SUMO-TIER1-9482"
              required
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono tracking-wider"
            />
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>License verified! Unlimited Agency Tier activated.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Invalid voucher code. Try test code: <strong className="font-mono text-white">LIFETIME-PRO-2026</strong></span>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all font-semibold"
            >
              Activate License
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
