export interface ScopeItem {
  id: string;
  title: string;
  description: string;
  isOriginal: boolean;
  estimatedHours: number;
  hourlyRate: number;
  status: 'approved' | 'scope_creep' | 'pending_change_order';
  costImpact: number;
  timelineDelayDays: number;
  category?: string;
  detectedAt?: string;
}

export interface ScopeAuditReport {
  id: string;
  projectName: string;
  clientName: string;
  clientEmail?: string;
  contractBudget: number;
  contractTimelineWeeks: number;
  hourlyRate: number;
  items: ScopeItem[];
  totalScopeCreepCost: number;
  totalScopeCreepHours: number;
  totalDelayDays: number;
  budgetOverrunPercentage: number;
  auditDate: string;
  agencyBrand?: AgencyBranding;
}

export interface AgencyBranding {
  agencyName: string;
  supportEmail: string;
  logoUrl?: string;
  customDisclaimer?: string;
  paymentLink?: string;
}
