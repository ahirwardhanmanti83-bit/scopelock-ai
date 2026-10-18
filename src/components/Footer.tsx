import React from 'react';
import { Shield, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>ScopeLock AI</span>
            <span className="text-slate-600 font-normal">| Enterprise SOW Governance</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://patreon.com/c/scopelock"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Patreon Licensing
            </a>
            <a
              href="mailto:ahirwardhanmanti83@gmail.com"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Enterprise Contact</span>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Zero Liability Notice */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong>Professional Notice & Safe Harbor:</strong> ScopeLock AI is an engineering cost-variance calculator and professional client communication management suite. 
            Deliverable estimates and Change Order templates are generated algorithmically for project coordination. 
            ScopeLock is not an attorney or law firm and does not provide formal legal counsel. 
            Agencies and contractors should review contractual modifications with their corporate legal counsel for jurisdiction-specific compliance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} ScopeLock Systems. Built for software agencies and freelancers worldwide.</p>
          <p className="flex items-center gap-1">
            <span>Corporate Signatory: Dhanmanti Ahirwar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
