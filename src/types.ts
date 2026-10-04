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
  cost?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export interface ProjectScope {
  id: string;
  name: string;
  clientName: string;
  createdAt: string;
  items: ScopeItem[];
}

export interface ChangeOrder {
  id: string;
  projectId?: string;
  orderNumber: string;
  projectName?: string;
  clientName?: string;
  clientEmail?: string;
  createdAt?: string;
  totalCost?: number;
  totalHours?: number;
  totalExtraHours?: number;
  totalExtraCost?: number;
  currency?: string;
  revisedValue?: number;
  agencyName?: string;
  agencyEmail?: string;
  items?: ScopeItem[];
}

export interface BrandingSettings {
  agencyName: string;
  agencyEmail: string;
  currency: string;
  defaultHourlyRate: number;
  primaryColor: string;
  paymentNotice: string;
}

export interface ScopeAuditReport {
  id: string;
  registryId?: string;
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
