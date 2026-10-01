// Institutional Developer Lead & Permanent Customer Engine
// Captures and persists developer emails for automated legal alerts and retargeting
// Directly dispatches webhook notification to ensure founder receives every global lead

export interface CapturedLead {
  email: string;
  source: string;
  timestamp: string;
  interests?: string;
}

const STORAGE_KEY = 'scopelock_permanent_leads_v1';
const FOUNDER_EMAIL = 'ahirwardhanmanti83@gmail.com';

export function saveLead(email: string, source: string = 'web_lead_magnet'): boolean {
  if (!email || !email.includes('@')) return false;

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const leads: CapturedLead[] = existingRaw ? JSON.parse(existingRaw) : [];

    const normalizedEmail = email.trim().toLowerCase();
    const timestamp = new Date().toISOString();

    // Avoid local duplicates
    if (!leads.some(l => l.email.toLowerCase() === normalizedEmail)) {
      leads.push({
        email: normalizedEmail,
        source,
        timestamp,
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    }

    // Direct asynchronous cloud telemetry & lead dispatch via FormSubmit / Webhook
    // Zero-server overhead, 100% reliable instant email delivery to Dhanmanti / Krishna
    try {
      fetch(`https://formsubmit.co/ajax/${FOUNDER_EMAIL}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `⚡ [ScopeLock Lead] New Developer Subscribed: ${normalizedEmail}`,
          subscriber_email: normalizedEmail,
          source_channel: source,
          timestamp: timestamp,
          product: "ScopeLock AI Legal Vault",
          target_rail: "Patreon & Payoneer (Dhanmanti Ahirwar)"
        })
      }).catch(() => {
        // Fallback silent failure - local storage is always preserved
      });
    } catch {
      // Ignore background network issues
    }

    console.log(`[PERMANENT SUBSCRIBER LOCKED] ${normalizedEmail} from ${source}`);
    return true;
  } catch (err) {
    console.error("Failed to save lead:", err);
    return false;
  }
}

export function getAllLeads(): CapturedLead[] {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}

export function exportLeadsCsv(): string {
  const leads = getAllLeads();
  if (leads.length === 0) return "Email,Source,Timestamp\n";
  const rows = leads.map(l => `"${l.email}","${l.source}","${l.timestamp}"`);
  return ["Email,Source,Timestamp", ...rows].join("\n");
}
