import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface ScopeLockLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScopeLockLogo: React.FC<ScopeLockLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-extrabold tracking-tight',
  };

  return (
    <div id="scopelock-brand-logo" className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-sm shadow-cyan-500/20">
        <ShieldAlert className={iconSizes[size]} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`${textSizes[size]} text-white font-mono`}>ScopeLock</span>
          <span className="text-xs px-1.5 py-0.5 rounded font-mono font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">AI</span>
        </div>
      </div>
    </div>
  );
};
