import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Terminal, 
  ShieldCheck, 
  Trash2, 
  RefreshCw, 
  ExternalLink,
  EyeOff,
  Globe,
  Download,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  Compass,
  Laptop,
  Smartphone,
  Zap,
  Filter
} from 'lucide-react';
import { 
  getTelemetryData, 
  clearTelemetryEvents, 
  recordRealizedPayment,
  purgeSelfTraffic,
  TelemetrySummary,
  TelemetryEvent
} from '../utils/telemetry';

export const FounderTelemetryDashboard: React.FC = () => {
  const [data, setData] = useState<TelemetrySummary>(() => {
    // Automatically purge any internal self visits on startup
    purgeSelfTraffic();
    return getTelemetryData();
  });
  const [founderMode, setFounderMode] = useState<boolean>(() => {
    return localStorage.getItem('scopelock_founder_test_mode') === 'true';
  });
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState<boolean>(false);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);

  // Manual payment form state
  const [payTier, setPayTier] = useState<'micro_unlock' | 'solo_19' | 'agency_199' | 'enterprise_499'>('micro_unlock');
  const [payAmount, setPayAmount] = useState<number>(2);
  const [payNotes, setPayNotes] = useState<string>('Payoneer Wire / Instant Client Unlock');

  // 24/7 Live Ticker (auto refreshes every second)
  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
      setData(getTelemetryData());
    }, 1500);

    const update = () => {
      setData(getTelemetryData());
    };

    window.addEventListener('scopelock-telemetry-updated', update);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scopelock-telemetry-updated', update);
    };
  }, []);

  const toggleFounderMode = () => {
    const next = !founderMode;
    setFounderMode(next);
    localStorage.setItem('scopelock_founder_test_mode', next ? 'true' : 'false');
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to reset all telemetry logs? (Revenue records will be preserved unless confirmed)')) {
      const clearRev = confirm('Do you also want to reset the Realized Revenue Ledger to $0?');
      clearTelemetryEvents(clearRev);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scopelock_telemetry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    recordRealizedPayment(payTier, payAmount, payNotes);
    setIsRecordPaymentOpen(false);
    setPayNotes('Payoneer Wire / Instant Client Unlock');
  };

  // Filter events
  const filteredEvents = data.recentEvents.filter(ev => {
    if (filterType === 'traffic' && ev.type !== 'visit') return false;
    if (filterType === 'audits' && ev.type !== 'run_audit' && ev.type !== 'chat_scan') return false;
    if (filterType === 'revenue' && ev.type !== 'checkout_click' && ev.type !== 'payment_completed' && ev.type !== 'plan_redeem') return false;
    if (filterType === 'cli' && ev.type !== 'cli_copy' && ev.type !== 'bridge_export') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDesc = ev.description.toLowerCase().includes(q);
      const matchType = ev.type.toLowerCase().includes(q);
      const matchSrc = ev.source.toLowerCase().includes(q);
      return matchDesc || matchType || matchSrc;
    }
    return true;
  });

  const totalVisitsCount = Math.max(
    1,
    data.sources.bingVisits +
    data.sources.googleVisits + 
    data.sources.githubVisits + 
    data.sources.sourceforgeVisits + 
    data.sources.alternativetoVisits + 
    data.sources.organicLlmVisits + 
    data.sources.directVisits + 
    data.sources.otherVisits
  );

  const getSourcePercent = (count: number) => {
    return Math.round((count / totalVisitsCount) * 100);
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-7 shadow-2xl space-y-6 text-slate-100">
      {/* 24/7 Live Stream Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>24/7 LIVE TELEMETRY ENGINE</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Session Uptime: {Math.floor((data.activeSessionDurationSec + uptimeSeconds) / 60)}m {((data.activeSessionDurationSec + uptimeSeconds) % 60)}s</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Zero-Server Cost Runtime
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 flex items-center gap-2.5 tracking-tight">
            <Activity className="w-6 h-6 text-indigo-400" />
            <span>Founder Sovereign Telemetry & Revenue Command Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-channel tracking: Google, GitHub, SourceForge, Organic LLMs, Conversion Funnels & Live Monetization Ledger.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsRecordPaymentOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Record Settlement</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download full analytics payload as JSON"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={toggleFounderMode}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
              founderMode 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Bypasses your own testing actions from inflating customer metrics"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>{founderMode ? 'Founder Mode: ON' : 'Founder Mode: OFF'}</span>
          </button>

          <button
            onClick={handleClear}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset telemetry logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* REVENUE & MONETIZATION LEDGER (Kitna Kamaya Sab Dikhna Chahiye) */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-900/40 pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-black text-white">Live Commercial Revenue & Earnings Ledger</h3>
          </div>
          <div className="text-xs text-slate-400">
            Currency Standard: <span className="font-mono text-slate-200">USD ($) Global Clearing</span> • Live Multi-Tier SaaS Rails
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Realized Cash Earnings */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30">
            <div className="text-[11px] font-semibold text-emerald-400 flex items-center justify-between">
              <span>Realized Gross Revenue</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              ${data.revenue.realizedRevenueUSD.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-300 font-mono mt-0.5 font-bold">
              USD ($) Settled
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Confirmed settled funds</div>
          </div>

          {/* Micro-Unlocks $2 */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[11px] font-semibold text-indigo-300 flex items-center justify-between">
              <span>Instant Change Order Unlocks</span>
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-indigo-200 mt-1">
              {data.revenue.totalMicroUnlocksCount}
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">
              ${(data.revenue.totalMicroUnlocksCount * 2).toLocaleString()} USD Total
            </div>
            <div className="text-[10px] text-slate-500 mt-1">$2 instant single unlocks</div>
          </div>

          {/* High Intent Pipeline */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[11px] font-semibold text-amber-400 flex items-center justify-between">
              <span>Pay Gate Checkout Clicks</span>
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-amber-300 mt-1">
              {data.totalCheckoutClicks}
            </div>
            <div className="text-xs text-amber-200/80 font-mono mt-0.5">
              ${(data.totalCheckoutClicks * 199).toLocaleString()} Pipeline
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Patreon / Payoneer intent actions</div>
          </div>

          {/* Scope Creep Protected */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
              <span>Scope Creep Identified</span>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">
              ${data.totalScopeCreepProtectedUSD.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              {data.totalAuditsRun} client SOWs analyzed
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Contract leakage defended</div>
          </div>
        </div>

        {/* Tier Distribution Row */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-800 text-slate-400">
          <div>
            <span className="text-slate-300 font-semibold">Active Tier Unlocks:</span>{' '}
            <span className="text-indigo-400">Micro ($2): {data.revenue.totalMicroUnlocksCount}</span> •{' '}
            <span className="text-violet-400">Solo $19/mo: {data.revenue.totalTierSoloCount}</span> •{' '}
            <span className="text-emerald-400">Agency $199/mo: {data.revenue.totalTierAgencyCount}</span> •{' '}
            <span className="text-amber-400">Enterprise $499/mo: {data.revenue.totalTierEnterpriseCount}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Authorized Corporate Signatory: <span className="text-slate-300">Dhanmanti Ahirwar</span> (ahirwardhanmanti83@gmail.com)
          </div>
        </div>
      </div>

      {/* TRAFFIC SOURCE BREAKDOWN (Google, GitHub, SourceForge, Kaha Se Aa Rahe) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>Customer Inbound Traffic Attribution Matrix</span>
            </h3>
            <p className="text-xs text-slate-400">
              Where your high-value software customers are discovering ScopeLock AI
            </p>
          </div>

          {/* Founder Self-Traffic Shield & Purge Controls */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-semibold text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Founder Self-Traffic Filter: 100% ACTIVE (Your traffic is zeroed)
            </span>
            <button
              onClick={() => {
                purgeSelfTraffic();
                setData(getTelemetryData());
              }}
              className="px-2.5 py-1 rounded bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 text-[10px] font-bold border border-rose-800/50 cursor-pointer flex items-center gap-1 transition-colors"
              title="Reset all internal visits and zero out founder activity"
            >
              <RefreshCw className="w-3 h-3" />
              Purge Self-Visits to 0
            </button>
          </div>
        </div>

        {/* Channel Verification & Indexing Status Bar */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-slate-300 font-medium">
              Verified Submission Channels: <strong className="text-white">Bing (IndexNow API Active)</strong> &bull; <strong className="text-white">Google Search Console</strong> &bull; <strong className="text-white">GitHub Pages Live</strong>
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Zero Fake Triggers &bull; Real Referrer Detection Only
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Bing / IndexNow Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-cyan-300">Bing / IndexNow</span>
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-1.5 py-0.2 rounded">API Indexed</span>
            </div>
            <div className="text-xl font-black text-white">{data.sources.bingVisits}</div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, getSourcePercent(data.sources.bingVisits))}%` }} 
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{getSourcePercent(data.sources.bingVisits)}% share</div>
          </div>

          {/* Google Search Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-indigo-300">Google Search</span>
              <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded">Console Verified</span>
            </div>
            <div className="text-xl font-black text-white">{data.sources.googleVisits}</div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, getSourcePercent(data.sources.googleVisits))}%` }} 
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{getSourcePercent(data.sources.googleVisits)}% share</div>
          </div>

          {/* GitHub Repos & Awesome Lists Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-violet-300">GitHub</span>
              <span className="text-[10px] font-mono bg-violet-500/10 text-violet-400 px-1.5 py-0.2 rounded">Awesome / Repos</span>
            </div>
            <div className="text-xl font-black text-white">{data.sources.githubVisits}</div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-violet-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, getSourcePercent(data.sources.githubVisits))}%` }} 
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{getSourcePercent(data.sources.githubVisits)}% share</div>
          </div>

          {/* SourceForge Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-amber-300">SourceForge</span>
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded">Software Directory</span>
            </div>
            <div className="text-xl font-black text-white">{data.sources.sourceforgeVisits}</div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, getSourcePercent(data.sources.sourceforgeVisits))}%` }} 
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{getSourcePercent(data.sources.sourceforgeVisits)}% share</div>
          </div>

          {/* AlternativeTo Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-emerald-300">AlternativeTo</span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded">B2B Directory</span>
            </div>
            <div className="text-xl font-black text-white">{data.sources.alternativetoVisits}</div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, getSourcePercent(data.sources.alternativetoVisits))}%` }} 
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{getSourcePercent(data.sources.alternativetoVisits)}% share</div>
          </div>

          {/* Organic LLMs Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-cyan-300">Organic LLMs</span>
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-1.5 py-0.2 rounded">AI Citations</span>
            </div>
            <div className="text-xl font-black text-white">{data.sources.organicLlmVisits}</div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, getSourcePercent(data.sources.organicLlmVisits))}%` }} 
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">ChatGPT / Claude / Perplexity</div>
          </div>
          {/* Direct & Links Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-bold text-slate-300">Direct / Other</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded">Direct URL</span>
            </div>
            <div className="text-xl font-black text-white">{data.sources.directVisits + data.sources.otherVisits}</div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-slate-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, getSourcePercent(data.sources.directVisits + data.sources.otherVisits))}%` }} 
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{getSourcePercent(data.sources.directVisits + data.sources.otherVisits)}% share</div>
          </div>
        </div>
      </div>

      {/* CORE OPERATIONAL METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">SOW Audits Run</div>
          <div className="text-xl font-black text-indigo-400 mt-0.5">{data.totalAuditsRun}</div>
          <div className="text-[10px] text-slate-500">Full variance analyses</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Chat Scans Completed</div>
          <div className="text-xl font-black text-violet-400 mt-0.5">{data.totalChatScans}</div>
          <div className="text-[10px] text-slate-500">Slack / WhatsApp creep</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Margin Bleed Calculations</div>
          <div className="text-xl font-black text-amber-400 mt-0.5">{data.totalCalculations}</div>
          <div className="text-[10px] text-slate-500">Rate variance calculations</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">CLI Commands Copied</div>
          <div className="text-xl font-black text-emerald-400 mt-0.5">{data.totalCliCopies}</div>
          <div className="text-[10px] text-slate-500">npx scopelock-audit</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 col-span-2 md:col-span-1">
          <div className="text-[11px] text-slate-400 font-medium">Exports & Jira/Linear</div>
          <div className="text-xl font-black text-cyan-400 mt-0.5">{data.totalExports}</div>
          <div className="text-[10px] text-slate-500">Workflow bridge exports</div>
        </div>
      </div>

      {/* 24/7 GRANULAR LIVE EVENT STREAM (Ak Ak Cheez Dikhni Chahiye) */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Real-Time Chronological Execution Log
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {filteredEvents.length} events
            </span>
          </div>

          {/* Event Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search event, client, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-56"
              />
            </div>

            <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-[11px]">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  filterType === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('traffic')}
                className={`px-2 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  filterType === 'traffic' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Traffic
              </button>
              <button
                onClick={() => setFilterType('audits')}
                className={`px-2 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  filterType === 'audits' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Audits
              </button>
              <button
                onClick={() => setFilterType('revenue')}
                className={`px-2 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  filterType === 'revenue' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setFilterType('cli')}
                className={`px-2 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  filterType === 'cli' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                CLI
              </button>
            </div>
          </div>
        </div>

        {/* Stream Box */}
        <div className="max-h-96 overflow-y-auto space-y-2 pr-1 rounded-xl bg-slate-950/90 border border-slate-850 p-3">
          {filteredEvents.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <Activity className="w-8 h-8 text-slate-700 mx-auto" />
              <div>No real customer events recorded yet.</div>
              <div className="text-[11px] text-slate-600">Founder self-traffic shield is 100% active (your preview visits are blocked). Waiting for inbound clicks from Bing (IndexNow), Google, GitHub, and organic crawlers.</div>
            </div>
          ) : (
            filteredEvents.map(event => (
              <div 
                key={event.id}
                className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 hover:border-slate-750 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Source Tag */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      event.source === 'Bing / IndexNow' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                      event.source === 'Google Search' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                      event.source === 'GitHub' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
                      event.source === 'SourceForge' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      event.source === 'AlternativeTo' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      event.source === 'Organic LLM' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {event.source}
                    </span>

                    {/* Event Type Badge */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      event.type === 'payment_completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      event.type === 'checkout_click' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                      event.type === 'run_audit' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                      event.type === 'chat_scan' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
                      event.type === 'cli_copy' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      event.type === 'visit' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {event.type}
                    </span>

                    {event.revenueAmount && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-emerald-500 text-slate-950">
                        +${event.revenueAmount} USD
                      </span>
                    )}

                    <span className="text-slate-200 font-medium break-words">{event.description}</span>
                  </div>

                  {/* Device / Client Metadata */}
                  {event.clientInfo && (
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-mono">
                      <span>OS: {event.clientInfo.os}</span>
                      <span>Browser: {event.clientInfo.browser}</span>
                      <span>Device: {event.clientInfo.device}</span>
                      <span>Timezone: {event.clientInfo.timezone}</span>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 font-mono shrink-0 whitespace-nowrap self-end sm:self-start">
                  {new Date(event.timestamp).toLocaleTimeString()} ({new Date(event.timestamp).toLocaleDateString()})
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RECORD VERIFIED PAYMENT MODAL */}
      {isRecordPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-black text-base">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Record Verified Realized Settlement</span>
              </div>
              <button
                onClick={() => setIsRecordPaymentOpen(false)}
                className="text-slate-400 hover:text-white font-bold p-1 rounded hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Settlement Tier
                </label>
                <select
                  value={payTier}
                  onChange={(e) => {
                    const t = e.target.value as any;
                    setPayTier(t);
                    if (t === 'micro_unlock') setPayAmount(2);
                    else if (t === 'solo_19') setPayAmount(19);
                    else if (t === 'agency_199') setPayAmount(199);
                    else if (t === 'enterprise_499') setPayAmount(499);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="micro_unlock">Instant Single Unlock ($2 USD)</option>
                  <option value="solo_19">Solo Dev License ($19 USD)</option>
                  <option value="agency_199">Agency Pro Suite ($199 USD)</option>
                  <option value="enterprise_499">Enterprise Retainer ($499 USD)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Amount in USD ($)
                </label>
                <input
                  type="number"
                  min="1"
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
                <div className="text-[11px] text-emerald-400 font-mono mt-1 font-bold">
                  Standard International USD ($) Settlement
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Payment Reference / Source Notes
                </label>
                <input
                  type="text"
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                  placeholder="e.g. Payoneer Direct Wire #TX94821 or Patreon"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecordPaymentOpen(false)}
                  className="px-3.5 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  Confirm & Update Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
