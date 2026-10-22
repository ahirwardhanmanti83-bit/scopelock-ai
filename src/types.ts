export interface ScopeDetectedItem {
  title: string;
  category: 'Architecture' | 'Frontend' | 'Backend/API' | 'Third-Party' | 'Design Revision';
  isOutOfScope: boolean;
  estimatedHours: number;
  costImpact: number;
  riskExplanation: string;
}

export interface ScopeAuditResult {
  overallVerdict: 'in_scope' | 'partial_scope_creep' | 'severe_scope_creep';
  creepScore: number;
  summary: string;
  detectedItems: ScopeDetectedItem[];
  totalHours: number;
  totalCostUSD: number;
  timelineDelayDays: number;
  diplomaticReply: string;
  changeOrderNotice?: string;
  dailyStandupText?: string;
  agencyActionTip?: string;
  gitCommitAudit?: {
    commitHash?: string;
    commitMessage?: string;
    flaggedFiles?: string[];
  };
}

export interface LicenseState {
  isPro: boolean;
  tier: 'free' | 'pro' | 'agency' | 'enterprise';
  tierName: string;
  agencyName?: string;
  agencyLogo?: string;
  email?: string;
  scansUsedThisMonth?: number;
}

export interface ChangeOrderDocument {
  changeOrderNumber: string;
  date: string;
  agencyName: string;
  clientName: string;
  projectName: string;
  hourlyRate: number;
  totalHours: number;
  totalCost: number;
  timelineExtensionDays: number;
  items: { description: string; hours: number; cost: number }[];
  clientSignatoryName: string;
  agencySignatoryName: string;
  paymentTerms: string;
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  companyName: string;
  githubUsername: string;
  githubRepoUrl: string;
  githubToken?: string;
  portfolioUrl: string;
  patreonUrl: string;
  payoneerEmail: string;
  upiId?: string;
  wireDetails?: string;
  jurisdiction: string;
  isProfileComplete: boolean;
  creatorId: string;
}
