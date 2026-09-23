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
    | 'Bing / IndexNow'
    | 'Google Search'
    | 'GitHub' 
    | 'SourceForge' 
    | 'AlternativeTo' 
    | 'Organic LLM' 
    | 'Direct' 
    | 'Other';
  referrerUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  revenueAmount?: number;
  currency?: 'USD';
  tier?: 'micro_unlock' | 'solo_19' | 'agency_199' | 'enterprise_499' | string;
  clientInfo?: {
    browser?: string;
    os?: string;
    device?: 'Desktop' | 'Mobile' | 'Tablet';
    timezone?: string;
    screen?: string;
  };
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
  bingVisits: number;
  googleVisits: number;
  githubVisits: number;
  sourceforgeVisits: number;
  alternativetoVisits: number;
  organicLlmVisits: number;
  directVisits: number;
  otherVisits: number;
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
  recentEvents: TelemetryEvent[];
  activeSessionDurationSec: number;
}

const STORAGE_EVENTS_KEY = 'scopelock_telemetry_events_v3';
const STORAGE_REVENUE_KEY = 'scopelock_revenue_ledger_v3';
const SESSION_START_KEY = 'scopelock_session_start_ts';

// Founder Device & Self-Traffic Filter (Guarantees zero false positives from Krishna's devices)
export function isFounderDeviceOrInternal(): boolean {
  if (typeof window === 'undefined') return true;
  
  // Explicitly marked founder device
  if (localStorage.getItem('scopelock_founder_device') === 'true') {
    return true;
  }

  const host = (window.location.hostname || '').toLowerCase();
  const ref = (document.referrer || '').toLowerCase();
  const userAgent = (navigator.userAgent || '').toLowerCase();

  // AI Studio preview iframe, Cloud Run preview, localhost, Google AI Studio, or dev environment
  if (
    ref.includes('aistudio.google.com') || 
    ref.includes('googleusercontent.com') ||
    ref.includes('ahirwardhanmanti83') ||
    host.includes('run.app') ||
    host.includes('webcontainer') ||
    host === 'localhost' ||
    host === '127.0.0.1' ||
    userAgent.includes('headless')
  ) {
    // Automatically flag this browser/device as founder device so future visits/actions are never tracked as customer traffic
    try {
      localStorage.setItem('scopelock_founder_device', 'true');
    } catch (e) {
      // ignore
    }
    return true;
  }

  return false;
}

// Helper to detect traffic source accurately from document.referrer and query parameters
export function detectTrafficSource(): {
  source: TelemetryEvent['source'];
  referrerUrl: string;
  utmSource?: string;
  utmMedium?: string;
  isSelfTraffic: boolean;
} {
  const ref = typeof document !== 'undefined' ? (document.referrer || '') : '';
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const params = new URLSearchParams(search);

  const utmSource = params.get('utm_source') || params.get('ref') || params.get('source') || undefined;
  const utmMedium = params.get('utm_medium') || undefined;

  const isSelf = isFounderDeviceOrInternal();

  let source: TelemetryEvent['source'] = 'Direct';

  const lowerRef = ref.toLowerCase();
  const lowerUtm = (utmSource || '').toLowerCase();

  // STRICT RULE: aistudio.google.com or Cloud Run is NOT customer traffic
  if (lowerRef.includes('aistudio.google.com') || lowerRef.includes('googleusercontent.com') || lowerRef.includes('run.app')) {
    source = 'Direct';
  } else if (
    lowerRef.includes('bing.com') || 
    lowerRef.includes('indexnow') ||
    lowerUtm.includes('bing') ||
    lowerUtm.includes('indexnow')
  ) {
    source = 'Bing / IndexNow';
  } else if (
    (lowerRef.includes('google.') || lowerUtm.includes('google')) &&
    !lowerRef.includes('aistudio')
  ) {
    source = 'Google Search';
  } else if (
    (lowerRef.includes('github.com') || lowerUtm.includes('github') || lowerRef.includes('raw.githubusercontent')) &&
    !lowerRef.includes('ahirwardhanmanti83') // Ignore founder's own repo edits
  ) {
    source = 'GitHub';
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
    lowerUtm.includes('chatgpt') ||
    lowerUtm.includes('claude')
  ) {
    source = 'Organic LLM';
  } else if (ref.length > 0) {
    source = 'Other';
  }

  return {
    source,
    referrerUrl: ref || 'Direct / Bookmark',
    utmSource,
    utmMedium,
    isSelfTraffic: isSelf
  };
}

// Helper to detect client device & environment
export function getClientEnvironmentInfo() {
  if (typeof window === 'undefined') return {};
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

  return { browser, os, device, timezone, screen };
}

// Get or initialize revenue ledger
export function getRevenueLedger(): RevenueLedger {
  try {
    const raw = localStorage.getItem(STORAGE_REVENUE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
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
  }
): void {
  try {
    const isFounder = isFounderDeviceOrInternal();

    // STRICT SOVEREIGN LAW: Founder device, preview iframe, localhost, or dev session
    // MUST NEVER contaminate customer traffic or audit counts.
    // Zero tolerance for self-traffic or simulated triggers.
    if (isFounder) {
      // Allow deliberate manual payment logging to work, but drop automatic visit/audit/scan events
      if (type !== 'payment_completed') {
        return;
      }
    }

    const isFounderMode = localStorage.getItem('scopelock_founder_test_mode') === 'true';
    if (isFounderMode) {
      console.log('[Telemetry Founder Mode Active]:', type, description, extra);
      return;
    }

    const { source, referrerUrl, utmSource, utmMedium, isSelfTraffic } = detectTrafficSource();
    if (isSelfTraffic) {
      if (type !== 'payment_completed') {
        return;
      }
    }

    const clientInfo = getClientEnvironmentInfo();

    const raw = localStorage.getItem(STORAGE_EVENTS_KEY);
    const events: TelemetryEvent[] = raw ? JSON.parse(raw) : [];

    const newEvent: TelemetryEvent = {
      id: 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      type,
      description,
      source: extra?.customSource || source,
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
    window.dispatchEvent(new Event('scopelock-telemetry-updated'));
  } catch (err) {
    console.error('Failed to record telemetry event:', err);
  }
}

// Manually log a realized payment into the ledger (e.g. founder confirming direct wire or Patreon)
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

  recordTelemetryEvent('payment_completed', `Realized verified payment received: $${amountUSD} USD (${notes})`, {
    revenueAmount: amountUSD,
    currency: 'USD',
    tier
  });
}

// Get comprehensive telemetry metrics summary
export function getTelemetryData(): TelemetrySummary {
  try {
    const raw = localStorage.getItem(STORAGE_EVENTS_KEY);
    const allEvents: TelemetryEvent[] = raw ? JSON.parse(raw) : [];
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
      bingVisits: 0,
      googleVisits: 0,
      githubVisits: 0,
      sourceforgeVisits: 0,
      alternativetoVisits: 0,
      organicLlmVisits: 0,
      directVisits: 0,
      otherVisits: 0
    };

    // Filter out internal / self / simulated visits from real customer traffic metrics
    const events = allEvents.filter(e => {
      const desc = (e.description || '').toLowerCase();
      const ref = (e.referrerUrl || '').toLowerCase();
      // Purge any internal preview hits or internal dev triggers
      if (
        ref.includes('aistudio.google.com') ||
        ref.includes('googleusercontent.com') ||
        ref.includes('run.app') ||
        ref.includes('webcontainer') ||
        ref.includes('localhost') ||
        desc.includes('aistudio') ||
        desc.includes('simulated internal') ||
        desc.includes('test simulate')
      ) {
        return false;
      }
      return true;
    });

    events.forEach(e => {
      // Traffic sources (only count real customer visits)
      if (e.type === 'visit') {
        totalVisits++;
        if (e.source === 'Bing / IndexNow') sources.bingVisits++;
        else if (e.source === 'Google Search') sources.googleVisits++;
        else if (e.source === 'GitHub') sources.githubVisits++;
        else if (e.source === 'SourceForge') sources.sourceforgeVisits++;
        else if (e.source === 'AlternativeTo') sources.alternativetoVisits++;
        else if (e.source === 'Organic LLM') sources.organicLlmVisits++;
        else if (e.source === 'Direct') sources.directVisits++;
        else sources.otherVisits++;
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

    let sessionStart = sessionStorage.getItem(SESSION_START_KEY);
    if (!sessionStart) {
      sessionStart = Date.now().toString();
      sessionStorage.setItem(SESSION_START_KEY, sessionStart);
    }
    const sessionDurationSec = Math.max(0, Math.floor((Date.now() - parseInt(sessionStart, 10)) / 1000));

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
      recentEvents: events,
      activeSessionDurationSec: sessionDurationSec
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
        sourceforgeVisits: 0,
        alternativetoVisits: 0,
        saashubVisits: 0,
        slantVisits: 0,
        libhuntVisits: 0,
        organicLlmVisits: 0,
        directVisits: 0,
        otherVisits: 0
      },
      recentEvents: [],
      activeSessionDurationSec: 0
    };
  }
}

// Reset all self-generated test traffic and permanently exclude founder device
export function purgeSelfTraffic(): void {
  try {
    localStorage.setItem('scopelock_founder_device', 'true');
    const raw = localStorage.getItem(STORAGE_EVENTS_KEY);
    if (!raw) return;
    const events: TelemetryEvent[] = JSON.parse(raw);
    const cleaned = events.filter(e => {
      const desc = (e.description || '').toLowerCase();
      const ref = (e.referrerUrl || '').toLowerCase();
      if (
        desc.includes('simulated') ||
        desc.includes('acquisition test') ||
        desc.includes('test simulate') ||
        ref.includes('aistudio.google.com') ||
        ref.includes('googleusercontent.com') ||
        ref.includes('run.app') ||
        ref.includes('webcontainer') ||
        ref.includes('localhost') ||
        desc.includes('aistudio')
      ) {
        return false;
      }
      return true;
    });
    localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(cleaned));
    window.dispatchEvent(new Event('scopelock-telemetry-updated'));
  } catch (e) {
    console.error('Failed to purge self traffic:', e);
  }
}

// Reset telemetry logs (retains confirmed revenue ledger unless confirmed)
export function clearTelemetryEvents(clearRevenue: boolean = false): void {
  localStorage.removeItem(STORAGE_EVENTS_KEY);
  if (clearRevenue) {
    localStorage.removeItem(STORAGE_REVENUE_KEY);
  }
  window.dispatchEvent(new Event('scopelock-telemetry-updated'));
}

// Initialize session telemetry on app launch
export function initSessionTelemetry(): void {
  if (typeof window === 'undefined') return;

  // STRICT LAW: If founder device/preview or internal session, NEVER log a visit
  if (isFounderDeviceOrInternal()) {
    // Run auto-purge on founder load to clean up any past false positives
    purgeSelfTraffic();
    return;
  }

  const sessionLogged = sessionStorage.getItem('scopelock_session_visit_logged');
  if (!sessionLogged) {
    const { source, referrerUrl, utmSource, isSelfTraffic } = detectTrafficSource();
    if (isSelfTraffic) return;

    const utmStr = utmSource ? ` (utm: ${utmSource})` : '';
    recordTelemetryEvent(
      'visit',
      `Inbound customer arrived from ${source} via "${referrerUrl}"${utmStr}`
    );
    sessionStorage.setItem('scopelock_session_visit_logged', 'true');
  }
}
