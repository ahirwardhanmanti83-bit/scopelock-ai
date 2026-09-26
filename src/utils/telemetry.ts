// ScopeLock AI - Autonomous Global Telemetry, Geolocation Radar & Real-Time Notification Engine
// Architect: Krishna Ahirwar
// Corporate Signatory: Dhanmanti Ahirwar (ahirwardhanmanti83@gmail.com)

export interface ClientGeoInfo {
  country: string;
  countryCode: string;
  flag: string;
  city?: string;
  region?: string;
}

export interface ClientEnvironmentInfo {
  browser: string;
  os: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  timezone: string;
  screen: string;
  geo?: ClientGeoInfo;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: 
    | 'visit' 
    | 'run_audit' 
    | 'chat_scan' 
    | 'calculator_calc' 
    | 'template_select' 
    | 'cli_copy' 
    | 'change_order_copy' 
    | 'registry_verify' 
    | 'checkout_click' 
    | 'payment_completed' 
    | 'plan_redeem' 
    | 'bridge_export'
    | string;
  description: string;
  source: 
    | 'Google Search'
    | 'GitHub' 
    | 'NPM Registry'
    | 'VS Code Extension'
    | 'GitHub Actions CI'
    | 'NPX CLI Terminal'
    | 'Bing / IndexNow'
    | 'SourceForge' 
    | 'AlternativeTo' 
    | 'Organic LLM' 
    | 'Freelance Platform'
    | 'Direct' 
    | 'Other';
  referrerUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  revenueAmount?: number;
  currency?: 'USD';
  tier?: 'micro_unlock' | 'solo_19' | 'agency_199' | 'enterprise_499' | string;
  clientInfo?: ClientEnvironmentInfo;
}

export interface RevenueLedger {
  realizedRevenueUSD: number;
  totalMicroUnlocksCount: number; // $2 instant unlocks
  totalTierSoloCount: number;     // $19/mo
  totalTierAgencyCount: number;   // $199/mo
  totalTierEnterpriseCount: number; // $499/mo
  pipelineIntentUSD: number;
}

export interface SourceTrafficMetrics {
  googleVisits: number;
  githubVisits: number;
  npmVisits: number;
  vscodeVisits: number;
  githubActionVisits: number;
  cliVisits: number;
  bingVisits: number;
  sourceforgeVisits: number;
  alternativetoVisits: number;
  organicLlmVisits: number;
  freelanceVisits: number;
  directVisits: number;
  otherVisits: number;
}

export interface CountryTrafficMetric {
  country: string;
  countryCode: string;
  flag: string;
  count: number;
  percentage: number;
}

export interface TelemetrySummary {
  totalVisits: number;
  totalAuditsRun: number;
  totalChatScans: number;
  totalCalculations: number;
  totalCheckoutClicks: number;
  totalCliCopies: number;
  totalExports: number;
  totalScopeCreepProtectedUSD: number;
  revenue: RevenueLedger;
  sources: SourceTrafficMetrics;
  countries: CountryTrafficMetric[];
  recentEvents: TelemetryEvent[];
  activeSessionDurationSec: number;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
}

const STORAGE_EVENTS_KEY = 'scopelock_telemetry_events_v4';
const STORAGE_REVENUE_KEY = 'scopelock_revenue_ledger_v4';
const SESSION_START_KEY = 'scopelock_session_start_ts';
const STORAGE_SOUND_KEY = 'scopelock_radar_sound_enabled';
const STORAGE_PUSH_KEY = 'scopelock_radar_push_enabled';
const STORAGE_FOUNDER_FILTER_KEY = 'scopelock_founder_filter_active';

// Fast Client-Side Timezone to Country & Flag Resolver (0ms, 100% offline, covers all major developer markets)
export function resolveGeoFromTimezone(tz: string): ClientGeoInfo {
  const normalized = tz.toLowerCase();

  if (normalized.includes('calcutta') || normalized.includes('kolkata') || normalized.includes('india')) {
    return { country: 'India', countryCode: 'IN', flag: '🇮🇳', city: 'Bengaluru / Mumbai / Delhi' };
  }
  if (normalized.includes('new_york') || normalized.includes('detroit') || normalized.includes('indiana')) {
    return { country: 'United States', countryCode: 'US', flag: '🇺🇸', city: 'New York (East)' };
  }
  if (normalized.includes('los_angeles') || normalized.includes('pacific') || normalized.includes('seattle')) {
    return { country: 'United States', countryCode: 'US', flag: '🇺🇸', city: 'California / West' };
  }
  if (normalized.includes('chicago') || normalized.includes('central') || normalized.includes('houston')) {
    return { country: 'United States', countryCode: 'US', flag: '🇺🇸', city: 'Texas / Midwest' };
  }
  if (normalized.includes('denver') || normalized.includes('phoenix') || normalized.includes('mountain')) {
    return { country: 'United States', countryCode: 'US', flag: '🇺🇸', city: 'Mountain / West' };
  }
  if (normalized.includes('london') || normalized.includes('belfast')) {
    return { country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', city: 'London' };
  }
  if (normalized.includes('berlin') || normalized.includes('frankfurt') || normalized.includes('germany')) {
    return { country: 'Germany', countryCode: 'DE', flag: '🇩🇪', city: 'Berlin / Frankfurt' };
  }
  if (normalized.includes('paris')) {
    return { country: 'France', countryCode: 'FR', flag: '🇫🇷', city: 'Paris' };
  }
  if (normalized.includes('toronto') || normalized.includes('vancouver') || normalized.includes('montreal')) {
    return { country: 'Canada', countryCode: 'CA', flag: '🇨🇦', city: 'Toronto / Vancouver' };
  }
  if (normalized.includes('sydney') || normalized.includes('melbourne') || normalized.includes('brisbane')) {
    return { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', city: 'Sydney / Melbourne' };
  }
  if (normalized.includes('amsterdam')) {
    return { country: 'Netherlands', countryCode: 'NL', flag: '🇳🇱', city: 'Amsterdam' };
  }
  if (normalized.includes('singapore')) {
    return { country: 'Singapore', countryCode: 'SG', flag: '🇸🇬', city: 'Singapore' };
  }
  if (normalized.includes('tokyo')) {
    return { country: 'Japan', countryCode: 'JP', flag: '🇯🇵', city: 'Tokyo' };
  }
  if (normalized.includes('seoul')) {
    return { country: 'South Korea', countryCode: 'KR', flag: '🇰🇷', city: 'Seoul' };
  }
  if (normalized.includes('dubai')) {
    return { country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪', city: 'Dubai' };
  }
  if (normalized.includes('zurich') || normalized.includes('bern')) {
    return { country: 'Switzerland', countryCode: 'CH', flag: '🇨🇭', city: 'Zurich' };
  }
  if (normalized.includes('stockholm')) {
    return { country: 'Sweden', countryCode: 'SE', flag: '🇸🇪', city: 'Stockholm' };
  }
  if (normalized.includes('dublin')) {
    return { country: 'Ireland', countryCode: 'IE', flag: '🇮🇪', city: 'Dublin' };
  }
  if (normalized.includes('warsaw')) {
    return { country: 'Poland', countryCode: 'PL', flag: '🇵🇱', city: 'Warsaw' };
  }
  if (normalized.includes('sao_paulo')) {
    return { country: 'Brazil', countryCode: 'BR', flag: '🇧🇷', city: 'São Paulo' };
  }
  if (normalized.includes('israel') || normalized.includes('jerusalem') || normalized.includes('tel_aviv')) {
    return { country: 'Israel', countryCode: 'IL', flag: '🇮🇱', city: 'Tel Aviv' };
  }

  // Generic fallback using timezone continent
  const parts = tz.split('/');
  const region = parts[0] || 'Global';
  const loc = parts[1] ? parts[1].replace(/_/g, ' ') : 'Worldwide';
  return { country: region, countryCode: 'UN', flag: '🌐', city: loc };
}

// Check if current device is internal development preview
export function isInternalDevPreview(): boolean {
  if (typeof window === 'undefined') return true;
  const host = (window.location.hostname || '').toLowerCase();
  const ref = (document.referrer || '').toLowerCase();
  const userAgent = (navigator.userAgent || '').toLowerCase();

  return (
    ref.includes('aistudio.google.com') ||
    ref.includes('googleusercontent.com') ||
    host.includes('run.app') ||
    host.includes('webcontainer') ||
    host === 'localhost' ||
    host === '127.0.0.1' ||
    userAgent.includes('headless')
  );
}

// Sound synthesizer using Web Audio API (Crystal clear dual-tone alert chime)
export function playRadarSoundChime(): void {
  try {
    if (typeof window === 'undefined') return;
    const soundEnabled = localStorage.getItem(STORAGE_SOUND_KEY) !== 'false';
    if (!soundEnabled) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    
    // Tone 1: 587.33 Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Tone 2: 880 Hz (A5 - High notification chime)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.08);
    gain2.gain.setValueAtTime(0.12, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.45);
  } catch {
    // Graceful silent fallback if Web Audio is restricted
  }
}

// Fire a Browser Push Notification
export function fireBrowserPushNotification(title: string, body: string): void {
  try {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    const pushEnabled = localStorage.getItem(STORAGE_PUSH_KEY) !== 'false';
    if (!pushEnabled) return;

    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2310b981" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="m7 11V7a5 5 0 0 1 10 0v4"/></svg>',
        tag: 'scopelock-radar-' + Date.now()
      });
    }
  } catch {
    // Ignore notification error
  }
}

// Helper to detect traffic source accurately from document.referrer and query parameters
export function detectTrafficSource(): {
  source: TelemetryEvent['source'];
  referrerUrl: string;
  utmSource?: string;
  utmMedium?: string;
} {
  const ref = typeof document !== 'undefined' ? (document.referrer || '') : '';
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const params = new URLSearchParams(search);

  const utmSource = params.get('utm_source') || params.get('ref') || params.get('source') || undefined;
  const utmMedium = params.get('utm_medium') || undefined;

  let source: TelemetryEvent['source'] = 'Direct';
  const lowerRef = ref.toLowerCase();
  const lowerUtm = (utmSource || '').toLowerCase();

  if (lowerRef.includes('vscode') || lowerUtm.includes('vscode')) {
    source = 'VS Code Extension';
  } else if (lowerUtm.includes('github_action') || lowerUtm.includes('action')) {
    source = 'GitHub Actions CI';
  } else if (lowerUtm.includes('npx') || lowerUtm.includes('cli') || lowerRef.includes('cli')) {
    source = 'NPX CLI Terminal';
  } else if (lowerRef.includes('google.') || lowerUtm.includes('google')) {
    source = 'Google Search';
  } else if (lowerRef.includes('github.com') || lowerRef.includes('github.io') || lowerUtm.includes('github')) {
    source = 'GitHub';
  } else if (lowerRef.includes('npmjs.com') || lowerRef.includes('npm') || lowerUtm.includes('npm')) {
    source = 'NPM Registry';
  } else if (lowerRef.includes('bing.com') || lowerRef.includes('indexnow') || lowerUtm.includes('bing') || lowerUtm.includes('indexnow')) {
    source = 'Bing / IndexNow';
  } else if (lowerRef.includes('sourceforge.net') || lowerUtm.includes('sourceforge')) {
    source = 'SourceForge';
  } else if (lowerRef.includes('alternativeto.net') || lowerUtm.includes('alternativeto')) {
    source = 'AlternativeTo';
  } else if (
    lowerRef.includes('chatgpt.com') || 
    lowerRef.includes('openai.com') || 
    lowerRef.includes('claude.ai') || 
    lowerRef.includes('anthropic.com') || 
    lowerRef.includes('perplexity.ai') || 
    lowerRef.includes('x.ai') ||
    lowerRef.includes('copilot.microsoft.com') ||
    lowerUtm.includes('chatgpt') ||
    lowerUtm.includes('claude') ||
    lowerUtm.includes('perplexity')
  ) {
    source = 'Organic LLM';
  } else if (lowerRef.includes('upwork.com') || lowerRef.includes('fiverr.com') || lowerRef.includes('freelancer.com')) {
    source = 'Freelance Platform';
  } else if (ref.length > 0) {
    source = 'Other';
  }

  return {
    source,
    referrerUrl: ref || 'Direct / Bookmark',
    utmSource,
    utmMedium
  };
}

// Get client environment and geolocation info
export function getClientEnvironmentInfo(): ClientEnvironmentInfo {
  if (typeof window === 'undefined') {
    return {
      browser: 'Chrome',
      os: 'Linux',
      device: 'Desktop',
      timezone: 'UTC',
      screen: '1920x1080',
      geo: { country: 'Global', countryCode: 'UN', flag: '🌐' }
    };
  }

  const ua = navigator.userAgent;
  let browser = 'Chrome';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('curl') || ua.includes('node') || ua.includes('npm')) browser = 'CLI/Developer Client';

  let os = 'Windows';
  if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux / Server';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  const width = window.innerWidth;
  const device: 'Desktop' | 'Mobile' | 'Tablet' = 
    width < 640 ? 'Mobile' : width < 1024 ? 'Tablet' : 'Desktop';

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const screen = `${window.screen.width}x${window.screen.height}`;
  const geo = resolveGeoFromTimezone(timezone);

  return { browser, os, device, timezone, screen, geo };
}

// Get revenue ledger
export function getRevenueLedger(): RevenueLedger {
  try {
    const raw = localStorage.getItem(STORAGE_REVENUE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore error
  }
  return {
    realizedRevenueUSD: 0,
    totalMicroUnlocksCount: 0,
    totalTierSoloCount: 0,
    totalTierAgencyCount: 0,
    totalTierEnterpriseCount: 0,
    pipelineIntentUSD: 0
  };
}

// Record an event into local telemetry store
export function recordTelemetryEvent(
  type: TelemetryEvent['type'],
  description: string,
  extra?: {
    revenueAmount?: number;
    currency?: 'USD';
    tier?: string;
    scopeProtectedAmount?: number;
    customSource?: TelemetryEvent['source'];
    isSimulatedPing?: boolean;
  }
): void {
  try {
    const isFilterActive = localStorage.getItem(STORAGE_FOUNDER_FILTER_KEY) === 'true';
    const isDev = isInternalDevPreview();

    // If dev preview and not explicit simulation, do not pollute production records
    if (isDev && !extra?.isSimulatedPing && type !== 'payment_completed') {
      return;
    }

    if (isFilterActive && !extra?.isSimulatedPing && type !== 'payment_completed') {
      return;
    }

    const { source, referrerUrl, utmSource, utmMedium } = detectTrafficSource();
    const clientInfo = getClientEnvironmentInfo();

    const raw = localStorage.getItem(STORAGE_EVENTS_KEY);
    const events: TelemetryEvent[] = raw ? JSON.parse(raw) : [];

    const effectiveSource = extra?.customSource || source;

    const newEvent: TelemetryEvent = {
      id: 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      type,
      description,
      source: effectiveSource,
      referrerUrl,
      utmSource,
      utmMedium,
      revenueAmount: extra?.revenueAmount,
      currency: 'USD',
      tier: extra?.tier,
      clientInfo
    };

    // Update revenue ledger if revenue was generated or checkout intent triggered
    if (extra?.revenueAmount && extra.revenueAmount > 0) {
      const ledger = getRevenueLedger();
      const amount = extra.revenueAmount;
      ledger.realizedRevenueUSD += amount;

      if (extra.tier === 'micro_unlock') ledger.totalMicroUnlocksCount++;
      else if (extra.tier === 'solo_19') ledger.totalTierSoloCount++;
      else if (extra.tier === 'agency_199') ledger.totalTierAgencyCount++;
      else if (extra.tier === 'enterprise_499') ledger.totalTierEnterpriseCount++;

      localStorage.setItem(STORAGE_REVENUE_KEY, JSON.stringify(ledger));
    } else if (type === 'checkout_click') {
      const ledger = getRevenueLedger();
      ledger.pipelineIntentUSD += extra?.revenueAmount || 199;
      localStorage.setItem(STORAGE_REVENUE_KEY, JSON.stringify(ledger));
    }

    // Keep last 300 events
    events.unshift(newEvent);
    if (events.length > 300) {
      events.pop();
    }

    localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(events));

    // TRIGGER SOUND & PUSH NOTIFICATIONS
    playRadarSoundChime();
    const geoDesc = clientInfo.geo ? `${clientInfo.geo.flag} ${clientInfo.geo.country}` : 'Global';
    if (type === 'visit') {
      fireBrowserPushNotification(
        `🛡️ Inbound Visitor: ${effectiveSource}`,
        `New customer arrived from ${geoDesc} via ${effectiveSource} (${clientInfo.device})`
      );
    } else if (type === 'checkout_click' || type === 'payment_completed') {
      fireBrowserPushNotification(
        `💰 High-Intent Revenue Event!`,
        `${description} from ${geoDesc}`
      );
    }

    // Cross-tab / window sync
    window.dispatchEvent(new Event('scopelock-telemetry-updated'));
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('scopelock_founder_radar');
        channel.postMessage({ type: 'NEW_EVENT', event: newEvent });
        channel.close();
      }
    } catch {
      // Ignore broadcast errors
    }
  } catch (err) {
    console.error('Failed to record telemetry event:', err);
  }
}

// Manually log a realized payment
export function recordRealizedPayment(
  tier: 'micro_unlock' | 'solo_19' | 'agency_199' | 'enterprise_499' | 'custom',
  amountUSD: number,
  notes: string
): void {
  const ledger = getRevenueLedger();
  ledger.realizedRevenueUSD += amountUSD;

  if (tier === 'micro_unlock') ledger.totalMicroUnlocksCount++;
  else if (tier === 'solo_19') ledger.totalTierSoloCount++;
  else if (tier === 'agency_199') ledger.totalTierAgencyCount++;
  else if (tier === 'enterprise_499') ledger.totalTierEnterpriseCount++;

  localStorage.setItem(STORAGE_REVENUE_KEY, JSON.stringify(ledger));

  recordTelemetryEvent('payment_completed', `Verified payment received: $${amountUSD} USD (${notes})`, {
    revenueAmount: amountUSD,
    currency: 'USD',
    tier
  });
}

// Get comprehensive telemetry metrics summary
export function getTelemetryData(): TelemetrySummary {
  try {
    const raw = localStorage.getItem(STORAGE_EVENTS_KEY);
    const events: TelemetryEvent[] = raw ? JSON.parse(raw) : [];
    const revenue = getRevenueLedger();

    let totalAudits = 0;
    let totalChatScans = 0;
    let totalCalculations = 0;
    let totalCheckouts = 0;
    let totalCli = 0;
    let totalExports = 0;
    let totalVisits = 0;
    let totalScopeProtected = 0;

    const sources: SourceTrafficMetrics = {
      googleVisits: 0,
      githubVisits: 0,
      npmVisits: 0,
      vscodeVisits: 0,
      githubActionVisits: 0,
      cliVisits: 0,
      bingVisits: 0,
      sourceforgeVisits: 0,
      alternativetoVisits: 0,
      organicLlmVisits: 0,
      freelanceVisits: 0,
      directVisits: 0,
      otherVisits: 0
    };

    const countryMap: Record<string, { country: string; countryCode: string; flag: string; count: number }> = {};

    events.forEach(e => {
      if (e.type === 'visit') {
        totalVisits++;
        if (e.source === 'Google Search') sources.googleVisits++;
        else if (e.source === 'GitHub') sources.githubVisits++;
        else if (e.source === 'NPM Registry') sources.npmVisits++;
        else if (e.source === 'VS Code Extension') sources.vscodeVisits++;
        else if (e.source === 'GitHub Actions CI') sources.githubActionVisits++;
        else if (e.source === 'NPX CLI Terminal') sources.cliVisits++;
        else if (e.source === 'Bing / IndexNow') sources.bingVisits++;
        else if (e.source === 'SourceForge') sources.sourceforgeVisits++;
        else if (e.source === 'AlternativeTo') sources.alternativetoVisits++;
        else if (e.source === 'Organic LLM') sources.organicLlmVisits++;
        else if (e.source === 'Freelance Platform') sources.freelanceVisits++;
        else if (e.source === 'Direct') sources.directVisits++;
        else sources.otherVisits++;

        // Track country distribution
        const geo = e.clientInfo?.geo;
        const countryKey = geo?.country || 'Global';
        if (!countryMap[countryKey]) {
          countryMap[countryKey] = {
            country: countryKey,
            countryCode: geo?.countryCode || 'UN',
            flag: geo?.flag || '🌐',
            count: 0
          };
        }
        countryMap[countryKey].count++;
      } else if (e.type === 'run_audit') {
        totalAudits++;
        const match = e.description.match(/\$([0-9,]+)/);
        if (match && match[1]) {
          const val = parseInt(match[1].replace(/,/g, ''), 10);
          if (!isNaN(val)) totalScopeProtected += val;
        }
      } else if (e.type === 'chat_scan') totalChatScans++;
      else if (e.type === 'calculator_calc') totalCalculations++;
      else if (e.type === 'checkout_click') totalCheckouts++;
      else if (e.type === 'cli_copy') totalCli++;
      else if (e.type === 'bridge_export' || e.type === 'change_order_copy') totalExports++;
    });

    const countriesList: CountryTrafficMetric[] = Object.values(countryMap)
      .map(c => ({
        ...c,
        percentage: totalVisits > 0 ? Math.round((c.count / totalVisits) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);

    let sessionStart = sessionStorage.getItem(SESSION_START_KEY);
    if (!sessionStart) {
      sessionStart = Date.now().toString();
      sessionStorage.setItem(SESSION_START_KEY, sessionStart);
    }
    const sessionDurationSec = Math.max(0, Math.floor((Date.now() - parseInt(sessionStart, 10)) / 1000));

    const soundEnabled = localStorage.getItem(STORAGE_SOUND_KEY) !== 'false';
    const notificationsEnabled = typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';

    return {
      totalVisits,
      totalAuditsRun: totalAudits,
      totalChatScans,
      totalCalculations,
      totalCheckoutClicks: totalCheckouts,
      totalCliCopies: totalCli,
      totalExports,
      totalScopeCreepProtectedUSD: totalScopeProtected,
      revenue,
      sources,
      countries: countriesList,
      recentEvents: events,
      activeSessionDurationSec: sessionDurationSec,
      notificationsEnabled,
      soundEnabled
    };
  } catch (err) {
    console.error(err);
    return {
      totalVisits: 0,
      totalAuditsRun: 0,
      totalChatScans: 0,
      totalCalculations: 0,
      totalCheckoutClicks: 0,
      totalCliCopies: 0,
      totalExports: 0,
      totalScopeCreepProtectedUSD: 0,
      revenue: getRevenueLedger(),
      sources: {
        googleVisits: 0,
        githubVisits: 0,
        npmVisits: 0,
        vscodeVisits: 0,
        cliVisits: 0,
        bingVisits: 0,
        sourceforgeVisits: 0,
        alternativetoVisits: 0,
        saashubVisits: 0,
        organicLlmVisits: 0,
        freelanceVisits: 0,
        directVisits: 0,
        otherVisits: 0
      },
      countries: [],
      recentEvents: [],
      activeSessionDurationSec: 0,
      notificationsEnabled: false,
      soundEnabled: true
    };
  }
}

// Reset telemetry logs
export function clearTelemetryEvents(clearRevenue: boolean = false): void {
  localStorage.removeItem(STORAGE_EVENTS_KEY);
  if (clearRevenue) {
    localStorage.removeItem(STORAGE_REVENUE_KEY);
  }
  window.dispatchEvent(new Event('scopelock-telemetry-updated'));
}

// Set sound preference
export function setRadarSoundEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_SOUND_KEY, enabled ? 'true' : 'false');
  window.dispatchEvent(new Event('scopelock-telemetry-updated'));
}

// Set founder filter toggle
export function setFounderFilterActive(active: boolean): void {
  localStorage.setItem(STORAGE_FOUNDER_FILTER_KEY, active ? 'true' : 'false');
  window.dispatchEvent(new Event('scopelock-telemetry-updated'));
}

// Request Push Notification Permission
export async function requestRadarPushPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  try {
    const perm = await Notification.requestPermission();
    localStorage.setItem(STORAGE_PUSH_KEY, perm === 'granted' ? 'true' : 'false');
    window.dispatchEvent(new Event('scopelock-telemetry-updated'));
    return perm === 'granted';
  } catch {
    return false;
  }
}

// Simulate test ping for the founder to verify notifications and sound immediately
export function triggerTestPing(): void {
  recordTelemetryEvent(
    'visit',
    'Radar Test Verification Ping: Inbound developer arrived via Google Search',
    {
      customSource: 'Google Search',
      isSimulatedPing: true
    }
  );
}

// Initialize session telemetry on app launch
export function initSessionTelemetry(): void {
  if (typeof window === 'undefined') return;

  // On production GitHub Pages, log every visitor session once per browser tab session
  const sessionLogged = sessionStorage.getItem('scopelock_session_visit_logged');
  if (!sessionLogged) {
    const { source, referrerUrl, utmSource } = detectTrafficSource();
    const utmStr = utmSource ? ` (utm: ${utmSource})` : '';
    recordTelemetryEvent(
      'visit',
      `Inbound customer arrived from ${source} via "${referrerUrl}"${utmStr}`
    );
    sessionStorage.setItem('scopelock_session_visit_logged', 'true');
  }
}
