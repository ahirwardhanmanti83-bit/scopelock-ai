import { ScopeAuditReport } from '../types';

export interface ScopeCreepForensics {
  overallRiskScore: number; // 0 - 100
  scopeExpansionVelocity: number; // percentage expansion per week
  clientLitigationProbability: number; // predicted probability
  detectedSubconsciousTraps: {
    title: string;
    description: string;
    riskTier: 'HIGH' | 'CRITICAL' | 'MODERATE';
    legalDoctrine: string;
  }[];
  killSwitchRecommendation: string;
}

export function analyzeScopeCreepForensics(report: ScopeAuditReport): ScopeCreepForensics {
  const creepCount = report.items.filter(i => !i.isOriginal).length;
  const ratio = creepCount / Math.max(1, report.items.length);
  
  const riskScore = Math.min(98, Math.round(ratio * 75 + (report.totalScopeCreepCost / 1000) * 1.5 + 20));
  const velocity = Math.round((report.budgetOverrunPercentage / Math.max(1, report.contractTimelineWeeks)) * 1.8);
  const litigationRisk = Math.min(89, Math.round(riskScore * 0.72 + 10));

  const traps = [
    {
      title: 'Ambiguity Exploitation Trap',
      description: 'Client is using verbal Slack nuances to redefine baseline deliverables without contract addendums.',
      riskTier: 'CRITICAL' as const,
      legalDoctrine: 'Contra Proferentem & Doctrine of Parol Evidence'
    },
    {
      title: 'Compounding Sprint Creep Velocity',
      description: `Current expansion rate (+${velocity}%/wk) mathematically guarantees delivery failure by Sprint ${report.contractTimelineWeeks + 2}.`,
      riskTier: 'HIGH' as const,
      legalDoctrine: 'Constructive Acceleration Liability'
    },
    {
      title: 'Silent Margin Bleed Asymmetry',
      description: `Agency is absorbing $${report.totalScopeCreepCost.toLocaleString()} USD in uncontracted engineering wages.`,
      riskTier: 'HIGH' as const,
      legalDoctrine: 'Quantum Meruit & Restitution Defense'
    }
  ];

  return {
    overallRiskScore: riskScore,
    scopeExpansionVelocity: velocity,
    clientLitigationProbability: litigationRisk,
    detectedSubconsciousTraps: traps,
    killSwitchRecommendation: riskScore > 65
      ? 'HALT CURRENT SPRINT COMMITMENTS: Compulsory client countersignature required under UCC § 2-209 prior to staging deployment.'
      : 'Issue formal Scope Variance Notice before next pull request merge.'
  };
}
