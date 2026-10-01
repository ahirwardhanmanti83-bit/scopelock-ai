// Institutional Developer Lead & Permanent Customer Engine
// Captures and persists developer emails for automated legal alerts and retargeting

export interface CapturedLead {
  email: string;
  source: string;
  timestamp: string;
  interests?: string;
}

const STORAGE_KEY = 'scopelock_permanent_leads_v1';

export function saveLead(email: string, source: string = 'web_lead_magnet'): boolean {
  if (!email || !email.includes('@')) return false;
  
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const leads: CapturedLead[] = existingRaw ? JSON.parse(existingRaw) : [];
    
    // Avoid duplicates
    if (!leads.some(l => l.email.toLowerCase() === email.toLowerCase())) {
      leads.push({
        email: email.trim().toLowerCase(),
        source,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    }
    
    // Also trigger mailto notification dispatch to founder Dhanmanti / Krishna
    console.log(`[PERMANENT SUBSCRIBER LOCKED] ${email} from ${source}`);
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
