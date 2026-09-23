import { ScopeItem } from '../types';

export function calculateTotalHours(items: ScopeItem[]): number {
  return items.reduce((acc, item) => (item.category === 'out_of_scope' ? acc + item.estimatedHours : acc), 0);
}

export function calculateTotalCost(items: ScopeItem[], hourlyRate: number): number {
  return items.reduce((acc, item) => {
    if (item.category === 'out_of_scope') {
      return acc + (item.cost || item.estimatedHours * hourlyRate);
    }
    return acc;
  }, 0);
}

export function calculateRiskScore(items: ScopeItem[]): number {
  if (items.length === 0) return 0;
  const outOfScopeCount = items.filter(i => i.category === 'out_of_scope').length;
  const highRiskCount = items.filter(i => i.riskLevel === 'high' || i.riskLevel === 'critical').length;
  const rawScore = (outOfScopeCount * 15) + (highRiskCount * 25);
  return Math.min(100, Math.max(10, rawScore));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount.toLocaleString()}`;
  }
}
