import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Terminal, 
  ShieldCheck, 
  Trash2, 
  RefreshCw, 
  Globe, 
  Download, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  Laptop, 
  Smartphone, 
  Volume2, 
  VolumeX, 
  Bell, 
  BellRing, 
  Radio, 
  MapPin, 
  Zap, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { 
  getTelemetryData, 
  clearTelemetryEvents, 
  recordRealizedPayment,
  setRadarSoundEnabled,
  requestRadarPushPermission,
  triggerTestPing,
  TelemetrySummary,
  TelemetryEvent,
  CountryTrafficMetric
} from '../utils/telemetry';

export const FounderTelemetryDashboard: React.FC = () => {
  const [data, setData] = useState<TelemetrySummary>(() => getTelemetryData());
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState<boolean>(false);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);
  const [lastAlertEvent, setLastAlertEvent] = useState<TelemetryEvent | null>(null);

  // Manual payment form state
  const [payTier, setPayTier] = useState<'micro_unlock' | 'solo_19' | 'agency_199' | 'enterprise_499'>('micro_unlock');
  const [payAmount, setPayAmount] = useState<number>(2);
  const [payNotes, setPayNotes] = useState<string>('Payoneer Wire / Instant Client Unlock');

  const refreshData = useCallback(() => {
    const current = getTelemetryData();
    setData(current);
    if (current.recentEvents.length > 0) {
      setLastAlertEvent(current.recentEvents[0]);
    }
  }, []);

  // 24/7 Live Ticker & Real-time Event Listener
  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
      refreshData();
    }, 1500);

    const update = () => {
      refreshData();
    };

    window.addEventListener('scopelock-telemetry-updated', update);

    // Cross-tab broadcast receiver
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('scopelock_founder_radar');
        channel.onmessage = () => {
          refreshData();
        };
      }
    } catch {
      // Ignore broadcast errors
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('scopelock-telemetry-updated', update);
      if (channel) channel.close();
    };
  }, [refreshData]);

  const toggleSound = () => {
    const next = !data.soundEnabled;
    setRadarSoundEnabled(next);
  };

  const handleEnablePush = async () => {
    const granted = await requestRadarPushPermission();
    if (granted) {
      alert('✅ Desktop & Mobile Push Notifications enabled! You will now receive instant alerts whenever visitors arrive.');
    } else {
      alert('ℹ️ Notification permission was not granted. Check browser address bar settings to allow notifications.');
    }
  };

  const handleTriggerTest = () => {
    triggerTestPing();
    refreshData();
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to reset all telemetry logs? (Revenue records will be preserved unless confirmed)')) {
      const clearRev = confirm('Do you also want to reset the Realized Revenue Ledger to $0?');
      clearTelemetryEvents(clearRev);
      refreshData();
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
    refreshData();
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
      const matchCountry = ev.clientInfo?.geo?.country.toLowerCase().includes(q) || false;
      return matchDesc || matchType || matchSrc || matchCountry;
    }
    return true;
  });

  const totalVisitsCount = Math.max(
    1,
    data.sources.googleVisits + 
    data.sources.githubVisits + 
    data.sources.npmVisits +
    data.sources.vscodeVisits +
    data.sources.cliVisits +
    data.sources.bingVisits +
    data.sources.sourceforgeVisits + 
    data.sources.alternativetoVisits + 
    data.sources.saashubVisits +
    data.sources.organicLlmVisits + 
    data.sources.freelanceVisits +
    data.sources.directVisits + 
    data.sources.otherVisits
  );

  const getSourcePercent = (count: number) => {
    return Math.round((count / totalVisitsCount) * 100);
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-7 shadow-2xl space-y-6 text-slate-100">
      {/* 24/7 Global Radar Command Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              GLOBAL RADAR ARMED • 24/7 AUTO-LISTENER ACTIVE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Live Ticker: {uptimeSeconds}s
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-1.5">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            Global Customer Intelligence & Notification Radar
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time origin radar: Google Search, GitHub, NPM, Bing, ChatGPT/Claude LLMs, and worldwide developers.
          </p>
        </div>

        {/* Live Notification & Sound Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sound Alert Toggle */}
          <button
            onClick={toggleSound}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              data.soundEnabled 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
            title="Play high-clarity alert chime whenever an inbound visitor arrives"
          >
            {data.soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span>Sound Alert: {data.soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Browser Push Notifications */}
          <button
            onClick={handleEnablePush}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              data.notificationsEnabled 
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20' 
                : 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 animate-pulse'
            }`}
            title="Send OS desktop / mobile push notification when a customer arrives"
          >
            {data.notificationsEnabled ? <Bell className="w-3.5 h-3.5 text-indigo-400" /> : <BellRing className="w-3.5 h-3.5 text-amber-400" />}
            <span>{data.notificationsEnabled ? 'Push: Armed' : 'Enable Push Alerts'}</span>
          </button>

          {/* Test Alert Ping */}
          <button
            onClick={handleTriggerTest}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all cursor-pointer"
            title="Simulate an inbound customer arrival to test sound chime and push notifications"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Sound & Ping</span>
          </button>

          {/* Record Manual Payment */}
          <button
            onClick={() => setIsRecordPaymentOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Verified Payment</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all cursor-pointer"
            title="Export full telemetry log as JSON"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Reset Logs */}
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 hover:border-rose-700 text-slate-400 hover:text-rose-300 transition-all cursor-pointer"
            title="Reset telemetry logs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Live Activity Pulse Banner */}
      {lastAlertEvent && (
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-white">LATEST DETECTED RADAR ACTIVITY:</span>
            <span className="text-slate-300">{lastAlertEvent.description}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span>{lastAlertEvent.clientInfo?.geo?.flag} {lastAlertEvent.clientInfo?.geo?.country || 'Worldwide'}</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{lastAlertEvent.source}</span>
            <span>•</span>
            <span>{new Date(lastAlertEvent.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      )}

      {/* Revenue Clearance & Unit Economics KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Realized Revenue */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Verified Cash Cleared</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            ${data.revenue.realizedRevenueUSD.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 ml-1">USD</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Payoneer Wire & Patreon Rails</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
        </div>

        {/* Global Visitors */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Inbound Traffic</span>
            <Globe className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2">
            {data.totalVisits.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 ml-1">sessions</span>
          </div>
          <div className="text-[11px] text-indigo-300 mt-1 flex items-center gap-1">
            <Radio className="w-3 h-3 text-indigo-400" />
            <span>Global distribution active</span>
          </div>
        </div>

        {/* Audits Run */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Scope Audits Performed</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-2">
            {(data.totalAuditsRun + data.totalChatScans).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            CLI, Web & Chat Scope Scans
          </div>
        </div>

        {/* Scope Dollars Protected */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Protected Client Leakage</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 mt-2">
            ${data.totalScopeCreepProtectedUSD.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Statutory UCC § 2-209 orders
          </div>
        </div>
      </div>

      {/* Worldwide Visitor Origin Matrix & Country Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Traffic Source Automatic Infiltration Breakdown */}
        <div className="lg:col-span-2 bg-slate-950/60 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Automated Traffic Source Breakdown (Where Customers Come From)
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Total Inbound: {data.totalVisits}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* VS Code Extension - PRIMARY INBOUND CHANNEL */}
            <div className="bg-slate-900/90 border-2 border-cyan-500/50 rounded-lg p-3 shadow-lg shadow-cyan-950/40 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-cyan-300 flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                  VS Code Extension
                </span>
                <span className="font-mono text-cyan-300 font-bold">{getSourcePercent(data.sources.vscodeVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.vscodeVisits}</div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Marketplace Plugin</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(data.sources.vscodeVisits > 0 ? 10 : 0, getSourcePercent(data.sources.vscodeVisits))}%` }}></div>
              </div>
            </div>

            {/* NPX CLI Terminal */}
            <div className="bg-slate-900/90 border border-teal-500/40 rounded-lg p-3 shadow-md shadow-teal-950/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-teal-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  NPX CLI Terminal
                </span>
                <span className="font-mono text-teal-300 font-bold">{getSourcePercent(data.sources.cliVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.cliVisits}</div>
              <div className="text-[10px] text-teal-400 font-mono mt-0.5">npx scopelock-audit</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(data.sources.cliVisits > 0 ? 10 : 0, getSourcePercent(data.sources.cliVisits))}%` }}></div>
              </div>
            </div>

            {/* Google Search */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-emerald-300">Google Search</span>
                <span className="font-mono text-emerald-400">{getSourcePercent(data.sources.googleVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.googleVisits}</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Organic Intent</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${getSourcePercent(data.sources.googleVisits)}%` }}></div>
              </div>
            </div>

            {/* GitHub Repos */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-indigo-300">GitHub Repos</span>
                <span className="font-mono text-indigo-400">{getSourcePercent(data.sources.githubVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.githubVisits}</div>
              <div className="text-[10px] text-indigo-400 font-mono mt-0.5">Repo & Marketplace</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${getSourcePercent(data.sources.githubVisits)}%` }}></div>
              </div>
            </div>

            {/* NPM Registry */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-rose-300">NPM Registry</span>
                <span className="font-mono text-rose-400">{getSourcePercent(data.sources.npmVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.npmVisits}</div>
              <div className="text-[10px] text-rose-400 font-mono mt-0.5">npmjs.com/package</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${getSourcePercent(data.sources.npmVisits)}%` }}></div>
              </div>
            </div>

            {/* Bing / IndexNow */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-sky-300">Bing / IndexNow</span>
                <span className="font-mono text-sky-400">{getSourcePercent(data.sources.bingVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.bingVisits}</div>
              <div className="text-[10px] text-sky-400 font-mono mt-0.5">IndexNow Protocol</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: `${getSourcePercent(data.sources.bingVisits)}%` }}></div>
              </div>
            </div>

            {/* AI Search & LLMs */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-purple-300">ChatGPT / Claude</span>
                <span className="font-mono text-purple-400">{getSourcePercent(data.sources.organicLlmVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.organicLlmVisits}</div>
              <div className="text-[10px] text-purple-400 font-mono mt-0.5">AI Citations (llms.txt)</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${getSourcePercent(data.sources.organicLlmVisits)}%` }}></div>
              </div>
            </div>

            {/* Direct / Bookmarks */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-300">Direct / Other</span>
                <span className="font-mono text-slate-400">{getSourcePercent(data.sources.directVisits)}%</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">{data.sources.directVisits}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Direct Traffic</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-slate-500 h-full rounded-full transition-all duration-500" style={{ width: `${getSourcePercent(data.sources.directVisits)}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Worldwide Country Geolocation Radar */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              Global Origin Map
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              {data.countries.length} countries
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {data.countries.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs">
                <Globe className="w-6 h-6 mx-auto mb-1 text-slate-600 opacity-50" />
                No global traffic recorded yet.
                <br />
                <button
                  onClick={handleTriggerTest}
                  className="text-indigo-400 hover:underline mt-1 inline-block"
                >
                  Click here to run test ping
                </button>
              </div>
            ) : (
              data.countries.map((c: CountryTrafficMetric, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-medium text-slate-200">{c.country}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400">{c.count}</span>
                    <span className="text-emerald-400 text-[10px] font-bold">({c.percentage}%)</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Live Event Log with Search & Filter Tabs */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Live Inbound Event Stream ({filteredEvents.length})
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search event, country, source..."
                className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-44 sm:w-56"
              />
            </div>

            {/* Filter Buttons */}
            <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterType === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('traffic')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterType === 'traffic' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Visits
              </button>
              <button
                onClick={() => setFilterType('revenue')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterType === 'revenue' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setFilterType('audits')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterType === 'audits' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Audits
              </button>
            </div>
          </div>
        </div>

        {/* Live Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="pb-2 font-medium">Timestamp</th>
                <th className="pb-2 font-medium">Origin / Country</th>
                <th className="pb-2 font-medium">Source Channel</th>
                <th className="pb-2 font-medium">Action / Details</th>
                <th className="pb-2 font-medium">Device / Client</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No matching events recorded yet.
                  </td>
                </tr>
              ) : (
                filteredEvents.slice(0, 50).map((ev: TelemetryEvent) => (
                  <tr key={ev.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-2.5 pr-3 font-mono text-slate-400 whitespace-nowrap">
                      {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-200">
                        <span>{ev.clientInfo?.geo?.flag || '🌐'}</span>
                        <span>{ev.clientInfo?.geo?.country || 'Global'}</span>
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        ev.source === 'Google Search' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        ev.source === 'GitHub' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        ev.source === 'NPM Registry' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        ev.source === 'VS Code Extension' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse' :
                        ev.source === 'NPX CLI Terminal' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' :
                        ev.source === 'Bing / IndexNow' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        ev.source === 'Organic LLM' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {ev.source}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-slate-300 max-w-xs truncate">
                      {ev.description}
                    </td>
                    <td className="py-2.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {ev.clientInfo ? `${ev.clientInfo.device} • ${ev.clientInfo.os}` : 'Client'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Log Verified Realized Payment */}
      {isRecordPaymentOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Record Verified Cash Realization
              </h3>
              <button
                onClick={() => setIsRecordPaymentOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Select Revenue Tier</label>
                <select
                  value={payTier}
                  onChange={e => {
                    const t = e.target.value as 'micro_unlock' | 'solo_19' | 'agency_199' | 'enterprise_499';
                    setPayTier(t);
                    if (t === 'micro_unlock') setPayAmount(2);
                    else if (t === 'solo_19') setPayAmount(19);
                    else if (t === 'agency_199') setPayAmount(199);
                    else if (t === 'enterprise_499') setPayAmount(499);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="micro_unlock">$2 Instant Watermark-Free Unlock</option>
                  <option value="solo_19">$19/mo Solo Engineer Plan (Patreon)</option>
                  <option value="agency_199">$199/mo Agency Pro Suite (Patreon)</option>
                  <option value="enterprise_499">$499/mo Enterprise Custom (Payoneer / Patreon)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Cleared Amount (USD)</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={e => setPayAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Verification Notes / Rail</label>
                <input
                  type="text"
                  value={payNotes}
                  onChange={e => setPayNotes(e.target.value)}
                  placeholder="e.g. Payoneer Direct Wire / Patreon Gateway"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRecordPaymentOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Confirm & Seal Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
