import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  X, 
  ShieldCheck, 
  Clock, 
  FileCheck,
  Send,
  Zap,
  Mail
} from 'lucide-react';
import { LicenseState } from '../types';

interface LandingSectionsProps {
  onOpenPricing: () => void;
  onStartScanning: () => void;
  license: LicenseState;
  onEmailSignupSuccess?: (email: string) => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({
  onOpenPricing,
  onStartScanning,
  license,
  onEmailSignupSuccess
}) => {
  // Screenshots state & lightbox modal
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Email signup state
  const [emailInput, setEmailInput] = useState('');
  const [emailStatus, setEmailStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({
    type: 'idle'
  });

  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  const screenshots = [
    {
      url: `${cleanBase}metadata/scopelock-1.png`,
      title: 'Daily Standup & SOW Variance Detector',
      subtitle: 'Identify unbilled client requests and generate daily engineering reports in 10 seconds.'
    },
    {
      url: `${cleanBase}metadata/scopelock-2.png`,
      title: 'Git Repo & Pull Request Scope Auditor',
      subtitle: 'Scan commits and diffs against contract specifications before code gets merged.'
    },
    {
      url: `${cleanBase}metadata/scopelock-3.png`,
      title: 'Formal Change Order & Client Sign-off Portal',
      subtitle: 'Generate audit-ready change orders and share 1-click digital signature links.'
    }
  ];

  const faqs = [
    {
      question: 'How does ScopeLock AI detect scope creep in a Git repository?',
      answer: 'ScopeLock connects to your GitHub repository (public or private via personal access token) and retrieves recent commits, commit messages, and file change summaries. It uses Gemini AI to compare these changes against your agreed Statement of Work (SOW). When it spots features not scheduled in the baseline—such as unexpected third-party APIs, native mobile bridges, or deep structural rewrites—it flags the variance, estimates developer hours, and calculates the monetary impact.'
    },
    {
      question: 'How does the Git pre-push hook prevent shipping unpaid work?',
      answer: 'The Git pre-push hook runs locally on your machine or in your CI/CD pipeline. Whenever a developer pushes commits to main or opens a pull request, the hook evaluates the diff against the contract boundary. If high-variance out-of-scope code is detected, it flags the commits and alerts your team before the code ships to production without a signed change order.'
    },
    {
      question: 'What if a client claims that extra requests were "implied" in the project?',
      answer: 'This is the most common form of scope drift. ScopeLock provides an objective comparison between your written Statement of Work and the incoming request. It outputs diplomatic, win-win client replies that acknowledge the feature idea while clearly explaining the additional engineering hours and schedule impact, offering a clean change order or staging for Phase 2.'
    },
    {
      question: 'Does ScopeLock AI provide legal advice?',
      answer: 'No. ScopeLock is an engineering governance and commercial contract management tool. It produces structured documentation, variance calculations, and professional change orders to facilitate transparent communication between developers and clients. For formal legal disputes, always consult qualified legal counsel.'
    },
    {
      question: 'Can I connect private GitHub repositories?',
      answer: 'Yes. ScopeLock supports private repository auditing using GitHub Personal Access Tokens (PAT). Your token is used directly to authenticate API queries and is not shared with third parties. You can audit repositories directly in the browser or via our backend proxy.'
    },
    {
      question: 'What is included in the Agency Pro plan ($199/month)?',
      answer: 'Agency Pro is designed for software studios and agencies managing multiple client projects. It includes unlimited repository scans across unlimited projects, white-label branding (your agency logo and custom footer on all change orders and client approval portals), team-wide pre-push hooks, and priority AI processing.'
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setEmailStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    try {
      localStorage.setItem('scopelock_user_email', cleanEmail);
      const currentLicense = JSON.parse(localStorage.getItem('scopelock_license') || '{}');
      const updatedLicense = {
        ...currentLicense,
        email: cleanEmail,
        tier: currentLicense.tier || 'free',
        tierName: currentLicense.tierName || 'Free Community Tier',
        isPro: currentLicense.isPro || false,
      };
      localStorage.setItem('scopelock_license', JSON.stringify(updatedLicense));
      if (onEmailSignupSuccess) {
        onEmailSignupSuccess(cleanEmail);
      }
    } catch {
      // ignore
    }

    setEmailStatus({
      type: 'success',
      message: 'Welcome! Free access unlocked (1 repository scan/month). You can now run your first scan.'
    });
    setEmailInput('');
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Screenshots Showcase Section */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Product Walkthrough
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            See ScopeLock AI in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            From commit inspection to client approval: an end-to-end workflow designed to protect developer hours and eliminate unbilled work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screenshots.map((s, idx) => (
            <div
              key={idx}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div 
                className="relative overflow-hidden cursor-pointer bg-slate-950 aspect-[16/10]"
                onClick={() => setActiveImageIndex(idx)}
              >
                <img
                  src={s.url}
                  alt={s.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback container if local asset failed
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-950 text-slate-400">
                          <span class="text-xs font-mono font-bold text-indigo-400 mb-1">Preview Slot ${idx + 1}</span>
                          <span class="text-xs">${s.title}</span>
                        </div>
                      `;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg border border-slate-700">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Screenshot</span>
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>{s.title}</span>
                  <span className="text-[11px] text-slate-500 font-mono">0{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {s.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal for Screenshots */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          onClick={() => setActiveImageIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 overflow-hidden space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {screenshots[activeImageIndex].title}
                </h3>
                <p className="text-xs text-slate-400">
                  {screenshots[activeImageIndex].subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveImageIndex(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-[75vh] flex items-center justify-center">
              <img
                src={screenshots[activeImageIndex].url}
                alt={screenshots[activeImageIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Screenshot {activeImageIndex + 1} of 3</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveImageIndex((activeImageIndex + 2) % 3)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveImageIndex((activeImageIndex + 1) % 3)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. How It Works — 3 Simple Steps */}
      <section className="space-y-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Streamlined Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Stop giving away unbilled hours. Protect your contract baseline in 3 straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-3 relative">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-bold text-white">
              Connect Git Repo or Add SOW Baseline
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste your GitHub repository link or agreed project Statement of Work (SOW). ScopeLock establishes your delivery perimeter and billable hourly rate.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-3 relative">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-bold text-white">
              AI Detects Scope Creep & Calculates Loss
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini AI scans incoming commits, PR diffs, and client messages. It immediately identifies out-of-scope tasks and calculates exact unbilled developer hours and dollar leakage.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-3 relative">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-bold text-white">
              Issue Change Order & Ship with Confidence
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export an audit-ready PDF change order or send a 1-click digital signature link to your client before merging code. Get paid for extra work without confrontation.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onStartScanning}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <span>Try an Audit Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. Email Signup for Free Access */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 space-y-5">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Free Access</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Sign up for Free Access (1 Repo Scan/Month)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Enter your work or developer email to unlock your free monthly repository audit and basic scope report. No credit card required.
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="developer@agency.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Get Free Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {emailStatus.type !== 'idle' && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              emailStatus.type === 'success' 
                ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300' 
                : 'bg-rose-950/50 border border-rose-800 text-rose-300'
            }`}>
              {emailStatus.type === 'success' ? (
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : null}
              <span>{emailStatus.message}</span>
            </div>
          )}

          <div className="text-[11px] text-slate-500 text-center">
            Includes 1 repo scan per month + basic change order generator. Upgrade to Pro ($19/mo) anytime for unlimited scans.
          </div>
        </form>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) Section */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Answers & Clarity
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Everything you need to know about Git repository scanning, change orders, and subscription plans.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
