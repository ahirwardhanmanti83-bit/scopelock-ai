import { ScopeItem, ScopeAuditReport, AgencyBranding } from '../types';

export function parseScopeComparison(
  originalContractText: string,
  currentRequestsText: string,
  hourlyRate: number,
  contractBudget: number,
  contractWeeks: number,
  projectName: string,
  clientName: string,
  clientEmail: string = '',
  branding?: AgencyBranding
): ScopeAuditReport {
  const originalLines = originalContractText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 5);

  const requestLines = currentRequestsText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 5);

  const items: ScopeItem[] = [];

  // Add baseline contract items
  originalLines.forEach((line, idx) => {
    items.push({
      id: `orig-${idx + 1}`,
      title: line.replace(/^[-*•\d.)\s]+/, '').slice(0, 70),
      description: line,
      isOriginal: true,
      estimatedHours: 12,
      hourlyRate,
      status: 'approved',
      costImpact: 0,
      timelineDelayDays: 0,
      category: 'Contract Baseline',
      detectedAt: new Date().toISOString()
    });
  });

  // Keywords that signal major scope creep
  const scopeCreepKeywords = [
    { word: 'mobile app', hours: 60, delay: 14, cat: 'Platform Expansion' },
    { word: 'ios', hours: 45, delay: 10, cat: 'Platform Expansion' },
    { word: 'android', hours: 45, delay: 10, cat: 'Platform Expansion' },
    { word: 'payment', hours: 25, delay: 5, cat: 'Financial Integration' },
    { word: 'stripe', hours: 20, delay: 4, cat: 'Financial Integration' },
    { word: 'ai', hours: 35, delay: 8, cat: 'AI / Algorithm' },
    { word: 'chatgpt', hours: 30, delay: 7, cat: 'AI / Algorithm' },
    { word: 'recommendation', hours: 28, delay: 6, cat: 'Complex Algorithm' },
    { word: 'export', hours: 14, delay: 3, cat: 'Data Management' },
    { word: 'pdf', hours: 12, delay: 3, cat: 'Document Generation' },
    { word: 'analytics', hours: 22, delay: 5, cat: 'Reporting & Dashboards' },
    { word: 'notification', hours: 16, delay: 4, cat: 'User Communication' },
    { word: 'sms', hours: 18, delay: 4, cat: 'User Communication' },
    { word: 'redesign', hours: 40, delay: 9, cat: 'UI/UX Overhaul' },
    { word: 'multilingual', hours: 30, delay: 7, cat: 'Localization' },
    { word: 'translation', hours: 24, delay: 5, cat: 'Localization' },
    { word: 'dark mode', hours: 12, delay: 2, cat: 'UI Enhancement' },
    { word: 'crm', hours: 35, delay: 8, cat: 'Enterprise Integration' },
    { word: 'salesforce', hours: 40, delay: 9, cat: 'Enterprise Integration' },
  ];

  requestLines.forEach((req, idx) => {
    const cleanReq = req.replace(/^[-*•\d.)\s]+/, '');
    const lower = cleanReq.toLowerCase();

    // Check if matched in original
    const matchedInContract = originalLines.some(orig => 
      orig.toLowerCase().includes(lower) || lower.includes(orig.toLowerCase().slice(0, 30))
    );

    if (!matchedInContract) {
      let matchedKeyword = scopeCreepKeywords.find(k => lower.includes(k.word));
      const hours = matchedKeyword ? matchedKeyword.hours : Math.floor(Math.random() * 12 + 10);
      const delay = matchedKeyword ? matchedKeyword.delay : Math.ceil(hours / 6);
      const category = matchedKeyword ? matchedKeyword.cat : 'Uncontracted Request';

      items.push({
        id: `creep-${idx + 1}`,
        title: cleanReq.slice(0, 75),
        description: cleanReq,
        isOriginal: false,
        estimatedHours: hours,
        hourlyRate,
        status: 'scope_creep',
        costImpact: hours * hourlyRate,
        timelineDelayDays: delay,
        category,
        detectedAt: new Date().toISOString()
      });
    }
  });

  const scopeCreepItems = items.filter(i => !i.isOriginal);
  const totalScopeCreepCost = scopeCreepItems.reduce((acc, curr) => acc + curr.costImpact, 0);
  const totalScopeCreepHours = scopeCreepItems.reduce((acc, curr) => acc + curr.estimatedHours, 0);
  const totalDelayDays = scopeCreepItems.reduce((acc, curr) => acc + curr.timelineDelayDays, 0);
  const budgetOverrunPercentage = contractBudget > 0 
    ? Math.round((totalScopeCreepCost / contractBudget) * 100) 
    : 0;

  return {
    id: `audit-${Date.now()}`,
    projectName: projectName || 'Untitled Project',
    clientName: clientName || 'Valued Client',
    clientEmail,
    contractBudget,
    contractTimelineWeeks: contractWeeks,
    hourlyRate,
    items,
    totalScopeCreepCost,
    totalScopeCreepHours,
    totalDelayDays,
    budgetOverrunPercentage,
    auditDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    agencyBrand: branding
  };
}
