import React, { useState } from 'react';
import { ArrowDown, DollarSign, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, FileText, Send } from 'lucide-react';

interface InteractiveFlowHeroProps {
  onCalculateLoss: (sampleText: string, title: string, hours: number) => void;
  onOpenUnlockModal: () => void;
  hourlyRate?: number;
}

const PRESET_CASES = [
  {
    id: 'stripe',
    badge: '⚡ Most Common Trap',
    label: '"Just add Stripe / PayPal real quick"',
    clientText: "Hey! Can you just quickly hook up Stripe and PayPal checkout before we push live? It shouldn't take more than an hour since you already built the checkout screen.",
    risk: 'Financial Gateway Omission',
    hours: 28,
    loss: 3500,
    diplomaticReply: "Hi! We'd love to implement payment gateway processing! Because production Stripe/PayPal webhooks, PCI-DSS compliance, and refund edge cases require approx 28 engineering hours not covered under our initial baseline SOW, we've drafted an add-on Change Order for $3,500. Let us know if you'd like us to queue this into sprint release!"
  },
  {
    id: 'mobile',
    badge: '📱 Enterprise Bleed',
    label: '"We assumed iOS & Android app was included"',
    clientText: "We reviewed the web app, it looks great. But when we download the APK or iOS test flight, where is the mobile version? We assumed mobile was part of this milestone.",
    risk: 'Four-Corners SOW Boundary Breach',
    hours: 95,
    loss: 11875,
    diplomaticReply: "Hi! Per Exhibit A of our executed Statement of Work, our deliverable scope specifies responsive web application architecture. Native mobile compilation (iOS TestFlight & Android APK) represents an independent multi-platform build requiring approx 95 engineering hours ($11,875). We can issue a supplementary Phase 2 contract immediately."
  },
  {
    id: 'chatgpt',
    badge: '🤖 AI Scope Trap',
    label: '"Connect ChatGPT / Claude bot for free"',
    clientText: "Can we add an AI chatbot in the sidebar that answers user questions from our database? All other apps have AI now so it should just be an API key connection.",
    risk: 'Uncontracted Vector RAG & Token Overhead',
    hours: 36,
    loss: 4500,
    diplomaticReply: "Hi! Adding LLM intelligence requires vector indexing, context window throttling, error fallback handling, and backend proxy architecture (~36 hours). Per statutory guidelines, we've drafted a Change Order for $4,500. Should we attach this to the current billing cycle?"
  }
];

export function InteractiveFlowHero({ onCalculateLoss, onOpenUnlockModal, hourlyRate = 125 }: InteractiveFlowHeroProps) {
  const [selectedCase, setSelectedCase] = useState(PRESET_CASES[0]);
  const [customInput, setCustomInput] = useState('');
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(2);
  const [copiedReply, setCopiedReply] = useState(false);

  const currentLoss = (selectedCase.hours * hourlyRate);

  const handleCopyReply = () => {
    navigator.clipboard.writeText(selectedCase.diplomaticReply);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 3000);
  };

  const handleAnalyzeCustom = () => {
    if (!customInput.trim()) return;
    onCalculateLoss(customInput, "Custom Client Request Variance", 32);
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Scope Loss Engine — 100% Free & No Sign-Up</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Stop Doing Free Work. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-300">
            For Freelancers & Software Agencies
          </span>
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
          Find out exactly how much unpaid scope creep is costing you in billable dollars ($/hr), and get an unassailable legal defense in seconds.
        </p>
      </div>

      {/* 4-Step Interactive Visual Journey (Like the competitor, but 10x more powerful) */}
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 relative">
          
          {/* Step 1 */}
          <button
            onClick={() => setActiveStep(1)}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
              activeStep === 1 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30 scale-102' 
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-lg">📩</span>
            <span className="text-xs font-extrabold">1. Client Request</span>
            <span className="text-[10px] opacity-75">Message or Email</span>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => setActiveStep(2)}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
              activeStep === 2 
                ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-500/30 scale-102' 
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-lg">🔍</span>
            <span className="text-xs font-extrabold">2. AI Checks SOW</span>
            <span className="text-[10px] opacity-75">Forensic Audit</span>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => setActiveStep(3)}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
              activeStep === 3 
                ? 'bg-violet-600 text-white border-violet-400 shadow-lg shadow-violet-500/30 scale-102' 
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-lg">✉️</span>
            <span className="text-xs font-extrabold">3. Diplomatic Reply</span>
            <span className="text-[10px] opacity-75">3 Options Ready</span>
          </button>

          {/* Step 4 */}
          <button
            onClick={() => setActiveStep(4)}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
              activeStep === 4 
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-500/30 scale-102' 
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-lg">💰</span>
            <span className="text-xs font-extrabold">4. Paid Change Order</span>
            <span className="text-[10px] opacity-75">UCC § 2-209 Legal</span>
          </button>
        </div>
      </div>

      {/* Interactive Playable Box */}
      <div className="mt-6 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-inner max-w-3xl mx-auto space-y-5">
        
        {/* Quick Click Preset Pills */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Select a Real Client Scope-Trap to Test:</span>
            <span className="text-[11px] text-amber-400 font-normal">Click any pill to calculate loss</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCase(c);
                  setActiveStep(2);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                  selectedCase.id === c.id
                    ? 'bg-indigo-950/90 border-indigo-400 text-indigo-200 ring-2 ring-indigo-500/40'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-bold text-amber-400 uppercase">{c.badge}</div>
                <div className="truncate mt-0.5">{c.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Client Message Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <span>📩</span> Client Email / Slack Message:
            </span>
            <span className="text-[10px] bg-red-950/80 border border-red-800/80 text-red-300 px-2 py-0.5 rounded-full font-bold">
              Uncontracted Demand
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 italic font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            "{selectedCase.clientText}"
          </p>
        </div>

        {/* The Result Card: Loss + Legal Protection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-xl p-4">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Unbilled Cash Loss ($)</div>
            <div className="text-3xl font-black text-rose-400 flex items-center gap-1">
              <span>-${currentLoss.toLocaleString()}</span>
              <span className="text-xs font-normal text-slate-400 ml-1">({selectedCase.hours} hrs @ ${hourlyRate}/hr)</span>
            </div>
            <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1 pt-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Statutory Risk: {selectedCase.risk}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <button
              onClick={() => onCalculateLoss(selectedCase.clientText, selectedCase.label, selectedCase.hours)}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Calculate & Open Defense Engine</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Generates UCC § 2-209 formal legal change order notice
            </p>
          </div>
        </div>

        {/* Ready Diplomatic Reply (Instantly Usable) */}
        <div className="bg-slate-900/90 border border-violet-500/30 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-violet-300 flex items-center gap-1.5">
              <span>✉️</span> One-Click Diplomatic Client Reply:
            </span>
            <button
              onClick={handleCopyReply}
              className="text-[11px] px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>{copiedReply ? "COPIED TO CLIPBOARD!" : "Copy Reply"}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 font-sans bg-slate-950/70 p-3 rounded-lg border border-slate-800 leading-relaxed">
            {selectedCase.diplomaticReply}
          </p>
        </div>

        {/* Custom Input Option for User */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Or paste your client's exact message here (e.g., 'Can you quickly add login?')..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAnalyzeCustom}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Scan Message</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
