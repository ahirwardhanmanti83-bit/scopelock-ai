import React, { useState } from 'react';
import { Star, Shield, Check, ExternalLink, Heart, X } from 'lucide-react';

interface StarUnlockModalProps {
  onUnlock: () => void;
  onClose: () => void;
  targetActionName?: string;
}

export const StarUnlockModal: React.FC<StarUnlockModalProps> = ({
  onUnlock,
  onClose,
  targetActionName = "Export Official UCC § 2-209 Change Order"
}) => {
  const [hasClickedStar, setHasClickedStar] = useState(false);
  const repoUrl = "https://github.com/ahirwardhanmanti83-bit/scopelock-ai";

  const handleStarClick = () => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
    setHasClickedStar(true);
    localStorage.setItem('scopelock_github_starred', 'true');
  };

  const handleCompleteUnlock = () => {
    localStorage.setItem('scopelock_github_starred', 'true');
    onUnlock();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden text-center">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl mb-4 shadow-inner">
          <Star className="w-7 h-7 fill-amber-400 text-amber-400 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight mb-2">
          100% Free Developer Community Pass
        </h3>
        
        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          To unlock <span className="text-indigo-400 font-semibold">{targetActionName}</span> with zero paywall, support the open-source defense engine with <strong className="text-amber-400">1 Star on GitHub</strong>!
        </p>

        {/* Action Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 text-left space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Step 1: Open GitHub Repo</span>
            </span>
            <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
              Takes 2 seconds
            </span>
          </div>

          <button
            onClick={handleStarClick}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-mono text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Star className="w-4 h-4 fill-slate-950" />
            <span>Give 1 Star on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Confirmation Trigger */}
        {hasClickedStar ? (
          <div className="space-y-3 animate-fade-in">
            <button
              onClick={handleCompleteUnlock}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-mono text-xs rounded-lg shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>I Have Starred — Instant Unlock Now</span>
            </button>
            <p className="text-[10px] text-slate-400">
              Unlocked for this browser session under community fair-use.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span>Backed by 10,000+ indie software engineers</span>
          </div>
        )}
      </div>
    </div>
  );
};
