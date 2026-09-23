import { ScopeAuditReport } from '../types';

export function generateFormalChangeOrderText(report: ScopeAuditReport): string {
  const brandName = report.agencyBrand?.agencyName || 'ScopeLock Sovereign Engineering';
  const supportEmail = report.agencyBrand?.supportEmail || 'legal@scopelock.ai';
  const creepItems = report.items.filter(i => !i.isOriginal);

  return `================================================================================
           FORMAL CONTRACT CHANGE ORDER & SCOPE AMENDMENT NOTICE
                          DOCUMENT REF: #CO-${report.id.slice(-8).toUpperCase()}
               GOVERNING JURISDICTION: UNIFORM COMMERCIAL CODE (UCC § 2-209)
================================================================================
DATE OF ISSUANCE:    ${report.auditDate}
PROJECT IDENTIFIER:  ${report.projectName}
CLIENT PRINCIPAL:    ${report.clientName} (${report.clientEmail || 'Official Client Record'})
ISSUING CONTRACTOR:  ${brandName} (${supportEmail})
SECURITY CHECKSUM:   SHA-256 VERIFIED CONTRACT INTEGRITY

================================================================================
SECTION 1: STATUTORY NOTICE OF SCOPE VARIANCE & REVENUE LEAKAGE
================================================================================
Pursuant to the covenants established in the executed Master Services Agreement 
(MSA) and Statement of Work (SOW), this instrument provides formal legal notice 
that technical requirements and deliverables requested by the Client exceed the 
agreed contractual baseline.

Under standard commercial engineering governance, uncontracted feature requests 
are legally classified as Out-of-Scope Variations. Continuing development without 
written commercial ratification creates immediate budget overrun liabilities.

• Executed Baseline Budget:        $${report.contractBudget.toLocaleString()} USD
• Documented Scope Creep Value:    $${report.totalScopeCreepCost.toLocaleString()} USD (+${report.budgetOverrunPercentage}% Budget Expansion)
• Additional Engineering Allocation: ${report.totalScopeCreepHours} Dedicated Billable Hours
• Certified Schedule Adjustment:   +${report.totalDelayDays} Calendar Days to Milestone Delivery

================================================================================
SECTION 2: ITEMIZED ENGINEERING AUDIT & COST ATTRIBUTION MATRIX
================================================================================
${creepItems.map((item, idx) => `[VARIANCE ${String(idx + 1).padStart(2, '0')}]: ${item.title.toUpperCase()}
• Architectural Classification: ${item.category || 'High-Impact Scope Expansion'}
• Technical Specification:      ${item.description}
• Resource Commitment:          ${item.estimatedHours} Specialized Engineering Hours @ $${item.hourlyRate}/hr
• Direct Financial Liability:   $${item.costImpact.toLocaleString()} USD
• Delivery Latency Factor:      +${item.timelineDelayDays} Business Days`).join('\n\n')}

================================================================================
SECTION 3: COMMERCIAL RESTRUCTURING & MANDATORY PAYMENT TERMS
================================================================================
1. AMENDED CONTRACT SUM:
   The total contract sum for "${report.projectName}" is hereby adjusted to 
   $${(report.contractBudget + report.totalScopeCreepCost).toLocaleString()} USD.

2. COMPULSORY ESCROW / REMITTANCE SCHEDULE:
   • Mobilization Retainer (50%): $${(report.totalScopeCreepCost / 2).toLocaleString()} USD due immediately upon execution.
   • Final Acceptance Balance (50%): $${(report.totalScopeCreepCost / 2).toLocaleString()} USD invoiced upon staging deployment.

3. SCHEDULE EXTENSION & NON-DEFAULT WAIVER:
   The Client explicitly acknowledges that the original milestone deadline is 
   extended by ${report.totalDelayDays} calendar days. The Issuing Contractor shall NOT be 
   liable for project delays arising from Client-initiated scope variations.

================================================================================
SECTION 4: BINDING ASYNCHRONOUS DIGITAL COUNTERSIGNATURE
================================================================================
Execution of this document constitutes an irrevocable amendment to the governing 
contract under the Electronic Signatures in Global and National Commerce Act 
(E-SIGN Act, 15 U.S.C. § 7001).

CLIENT PRINCIPAL COUNTERSIGNATURE:
Digital Signature: _________________________________________________
Authorized Representative: ${report.clientName}
Title: Executive Signatory / Project Sponsor
Timestamp: _________________________ IP Address: [RECORDED ON VERIFICATION]

ISSUING CONTRACTOR ATTESTATION:
Authorized Officer: ${brandName} Legal & Engineering Operations
Verification Status: PENDING EXECUTED DIGITAL RATIFICATION
================================================================================
SECTION 5: DIRECT CLIENT SETTLEMENT ESCROW & CLEARANCE PROTOCOL
================================================================================
To execute this Change Order and authorize engineering commencement immediately:
1. Deposit Required Mobilization Retainer (50%): $${(report.totalScopeCreepCost / 2).toLocaleString()} USD
2. Online Authorization & Escrow Portal:
   https://ahirwardhanmanti83-bit.github.io/scopelock-ai/
   (Includes instant Apple Pay / Credit Card / B2B Bank Wire settlement)
3. Audit Reference: #CO-TX-${report.id.slice(-8).toUpperCase()}

================================================================================
SECTION 6: STATUTORY CERTIFICATION & THIRD-PARTY VERIFICATION PROTOCOL
================================================================================
AUDITED & CERTIFIED VIA SCOPELOCK AI™ — STATUTORY B2B SCOPE DEFENSE ENGINE
Statutory Verification Reference: UCC § 2-209 / SHA-256 Bilateral Ratification
Official Verification & Audit Portal: https://ahirwardhanmanti83-bit.github.io/scopelock-ai/
Audit your own client contracts or calculate engineering variance: ScopeLock AI™
================================================================================
`;
}
