import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Sparkles, 
  Send, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Copy, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Zap,
  RefreshCw,
  Lock
} from 'lucide-react';
import { ScopeAuditReport } from '../types';
import { recordTelemetryEvent } from '../utils/telemetry';
import { copyToClipboard } from '../utils/clipboard';

interface ChatScopeScannerProps {
  onApplyToAudit?: (detectedTitle: string, detectedScope: string, estHours: number) => void;
  onOpenLicense?: () => void;
  hourlyRate?: number;
}

const SAMPLE_CLIENT_MESSAGES = [
  {
    label: "Quick Tweak Disguise",
    text: "Hey! Can you quickly add a quick social login toggle and just export everything to PDF? It should only take 10 minutes since you already built the dashboard. Need it by tomorrow morning!"
  },
  {
    label: "Platform Expansion",
    text: "We were thinking instead of just web, could we also deploy this to iOS App Store and Google Play as native apps? We assumed responsive meant it works everywhere."
  },
  {
    label: "Third-Party Integration",
    text: "Can we also sync all user leads into Salesforce and HubSpot in real-time? Our marketing team says this is critical for launch."
  }
];

export const ChatScopeScanner: React.FC<ChatScopeScannerProps> = ({
  onApplyToAudit,
  onOpenLicense,
  hourlyRate = 125
}) => {
  const [inputText, setInputText] = useState(SAMPLE_CLIENT_MESSAGES[0].text);
  const [isScanning, setIsScanning] = useState(false);
  const [copiedReply, setCopiedReply] = useState<string | null>(null);

  // Analysis state
  const [detectedCreep, setDetectedCreep] = useState<{
    severity: 'High' | 'Critical' | 'Moderate';
    estimatedHours: number;
    financialLoss: number;
    delayDays: number;
    detectedTriggers: string[];
    diplomaticReply: string;
    firmReply: string;
  }>(() => analyzeMessage(SAMPLE_CLIENT_MESSAGES[0].text, hourlyRate));

  function analyzeMessage(text: string, rate: number) {
    const lower = text.toLowerCase();
    let hours = 8;
    const triggers: string[] = [];
    let severity: 'High' | 'Critical' | 'Moderate' = 'Moderate';

    if (lower.includes('quick') || lower.includes('quickly') || lower.includes('10 min')) {
      triggers.push('Disguised Complexity ("Quick / Minor")');
      hours += 6;
    }
    if (lower.includes('ios') || lower.includes('android') || lower.includes('mobile') || lower.includes('native') || lower.includes('app store')) {
      triggers.push('Architecture Shift (Native Mobile Build)');
      hours += 40;
      severity = 'Critical';
    }
    if (lower.includes('salesforce') || lower.includes('hubspot') || lower.includes('crm') || lower.includes('sync') || lower.includes('api')) {
      triggers.push('Unvetted 3rd-Party API Synchronization');
      hours += 24;
      if (severity !== 'Critical') severity = 'High';
    }
    if (lower.includes('pdf') || lower.includes('export') || lower.includes('report')) {
      triggers.push('Uncontracted Document Engine');
      hours += 12;
    }
    if (lower.includes('tomorrow') || lower.includes('urgent') || lower.includes('asap')) {
      triggers.push('Unscheduled Expedited Rush Delivery');
      hours += 8;
      if (severity !== 'Critical') severity = 'High';
    }

    if (triggers.length === 0) {
      triggers.push('Out-of-Scope Milestone Expansion');
      hours = 14;
    }

    const loss = hours * rate;
    const delayDays = Math.ceil(hours / 6);

    const diplomaticReply = `Hi team! Thanks for reaching out with this idea. We'd love to implement this! Because this feature requires approximately ${hours} engineering hours that aren't included in our initial Statement of Work, we've drafted an add-on milestone Change Order for $${loss.toLocaleString()} (+${delayDays} days timeline). Let us know if you'd like us to queue this into sprint release or keep it for Phase 2!`;

    const firmReply = `Pursuant to our signed Statement of Work and UCC § 2-209, this requested deliverable constitutes an unbudgeted scope variance requiring a formal bilateral Change Order. Estimated impact: $${loss.toLocaleString()} (${hours} billable hours) and +${delayDays} calendar days adjustment. Work on this item will commence immediately upon countersignature.`;

    return {
      severity,
      estimatedHours: hours,
      financialLoss: loss,
      delayDays,
      detectedTriggers: triggers,
      diplomaticReply,
      firmReply
    };
  }

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const result = analyzeMessage(inputText, hourlyRate);
      setDetectedCreep(result);
      setIsScanning(false);
      recordTelemetryEvent('chat_scan', `Scanned client message: ${result.estimatedHours}h variance detected`);
    }, 350);
  };

  const handleCopy = async (text: string, type: string) => {
    await copyToClipboard(text);
    setCopiedReply(type);
    setTimeout(() => setCopiedReply(null), 2000);
  };

  const handleConvert = () => {
    if (onApplyToAudit) {
      onApplyToAudit(
        'Client Message Scope Variance',
        inputText,
        detectedCreep.estimatedHours
      );
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30">
              COMMUNICATION DEFENSE SCANNER
            </span>
            <span className="text-xs font-semibold text-slate-400">Slack • Email • WhatsApp • Jira</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-violet-400" />
            <span>Chat Scope-Creep Scanner</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Paste ambiguous client messages to auto-calculate unbilled developer variance and generate executive diplomatic replies.
          </p>
        </div>

        {/* Preset sample buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_CLIENT_MESSAGES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(sample.text);
                const res = analyzeMessage(sample.text, hourlyRate);
                setDetectedCreep(res);
              }}
              className="px-2.5 py-1 text-[11px] font-medium bg-slate-850 hover:bg-slate-800 border border-slate-750 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-300">
          Client Message or Email Transcript:
        </label>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-violet-500 font-sans leading-relaxed"
            placeholder="Paste client Slack message or email here..."
          />
          <button
            type="button"
            onClick={handleScan}
            disabled={isScanning || !inputText.trim()}
            className="absolute right-3 bottom-3 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-violet-600/20 transition-all cursor-pointer"
          >
            {isScanning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{isScanning ? 'Auditing...' : 'Scan Creep & Generate Reply'}</span>
          </button>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Metric breakdown card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
            <span className="text-xs font-bold text-slate-400">Forensic Creep Risk</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              detectedCreep.severity === 'Critical' 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              {detectedCreep.severity} Variance
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-slate-500 block">Unbilled Dev Loss</span>
              <span className="text-lg font-black text-rose-400">${detectedCreep.financialLoss.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Unbilled Hours</span>
              <span className="text-lg font-black text-white">{detectedCreep.estimatedHours} hrs</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-850">
            <span className="text-[11px] font-semibold text-slate-400 block">Triggered Forensic Red Flags:</span>
            {detectedCreep.detectedTriggers.map((trig, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-amber-300">
                <ShieldAlert className="w-3 h-3 shrink-0 text-amber-400" />
                <span className="truncate">{trig}</span>
              </div>
            ))}
          </div>

          {onApplyToAudit && (
            <button
              type="button"
              onClick={handleConvert}
              className="w-full py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Load into Main Audit Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Diplomatic Partner Reply */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Diplomatic Partner Reply (Recommended)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Relationship-Safe</span>
            </div>
            <p className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800/80 leading-relaxed font-sans">
              {detectedCreep.diplomaticReply}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const saved = localStorage.getItem('scopelock_unlocked');
              if (saved !== 'true') {
                if (onApplyToAudit) {
                  onApplyToAudit('Client Scope Variance', inputText, detectedCreep.estimatedHours);
                }
                if (onOpenLicense) {
                  onOpenLicense();
                } else {
                  const modalTrigger = document.getElementById('open-license-btn');
                  if (modalTrigger) modalTrigger.click();
                }
                return;
              }
              handleCopy(detectedCreep.diplomaticReply, 'diplomatic');
            }}
            className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Unlock Executive Reply ($2 / Subscription)</span>
          </button>
        </div>

        {/* Firm Legal UCC Reply */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Firm Statutory UCC § 2-209 Reply</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Enforceable</span>
            </div>
            <p className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800/80 leading-relaxed font-sans">
              {detectedCreep.firmReply}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const saved = localStorage.getItem('scopelock_unlocked');
              if (saved !== 'true') {
                if (onApplyToAudit) {
                  onApplyToAudit('Client Scope Variance', inputText, detectedCreep.estimatedHours);
                }
                if (onOpenLicense) {
                  onOpenLicense();
                } else {
                  const modalTrigger = document.getElementById('open-license-btn');
                  if (modalTrigger) modalTrigger.click();
                }
                return;
              }
              handleCopy(detectedCreep.firmReply, 'firm');
            }}
            className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Unlock Statutory UCC Reply ($2 / Subscription)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
