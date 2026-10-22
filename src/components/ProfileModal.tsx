import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  Github, 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  X, 
  Key, 
  Award,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile?: (profile: UserProfile) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Dhanmanti Ahirwar',
  email: 'ahirwardhanmanti83@gmail.com',
  title: 'Founder & Chief Architect',
  companyName: 'ScopeLock Systems',
  githubUsername: 'ahirwardhanmanti83-bit',
  githubRepoUrl: 'https://github.com/ahirwardhanmanti83-bit/scopelock-ai',
  portfolioUrl: 'https://ahirwardhanmanti83-bit.github.io/scopelock-ai/',
  patreonUrl: 'https://patreon.com/c/scopelock',
  payoneerEmail: 'ahirwardhanmanti83@gmail.com',
  upiId: 'ahirwardhanmanti83@okaxis',
  wireDetails: 'SWIFT / Commercial Wire Routing Active',
  jurisdiction: 'Global Commercial Standards',
  isProfileComplete: true,
  creatorId: 'SCOPELOCK-VERIFIED-DHANMANTI-83'
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile
}) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('scopelock_user_profile');
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, isProfileComplete: true };
    localStorage.setItem('scopelock_user_profile', JSON.stringify(updated));
    setProfile(updated);
    if (onSaveProfile) onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 font-black text-xl">
              DA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Owner & Signatory Profile</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  VERIFIED CREATOR
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Signatory credentials, Payout Remittance & Contract Authority
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Status Banner */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Official System Authority Status: 100% Complete</span>
              <span className="text-slate-400 text-[11px] font-mono">
                ID: {profile.creatorId}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px]">
            ACTIVE SIGNATORY
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: Signatory & Identity */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Signatory & Identity Details</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Full Legal Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Primary Business Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-600 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Organization / Entity Name</label>
                <input
                  type="text"
                  value={profile.companyName}
                  onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Corporate Title / Role</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payout & Monetization Settings */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Payout & Customer Payment Rails ($3, $19, $199, $499)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Patreon Licensing URL</label>
                <input
                  type="text"
                  value={profile.patreonUrl}
                  onChange={(e) => setProfile({ ...profile, patreonUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Payoneer / Wire Receiving Account</label>
                <input
                  type="text"
                  value={profile.payoneerEmail}
                  onChange={(e) => setProfile({ ...profile, payoneerEmail: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">UPI ID (Indian Agencies)</label>
                <input
                  type="text"
                  value={profile.upiId || ''}
                  onChange={(e) => setProfile({ ...profile, upiId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Legal Jurisdiction Code</label>
                <input
                  type="text"
                  value={profile.jurisdiction}
                  onChange={(e) => setProfile({ ...profile, jurisdiction: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Live Ecosystem URLs */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Live Endpoints & Codebase</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 truncate">
                  <Github className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-300 font-mono text-[11px] truncate">{profile.githubRepoUrl}</span>
                </div>
                <a
                  href={profile.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 p-1 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 truncate">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-300 font-mono text-[11px] truncate">{profile.portfolioUrl}</span>
                </div>
                <a
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 p-1 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Profile details auto-bind to all PDF Change Orders
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save & Update Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
