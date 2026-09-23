// ScopeLock AI - Content Script
// Detects scope creep triggers in client communications (Upwork, Gmail, Slack)
console.log('[ScopeLock AI] Active Scope Guard Initialized.');

const SCOPE_KEYWORDS = [
  'quick favor',
  'small change',
  'just one more thing',
  'while you are at it',
  'minor revision',
  'add this feature',
  'not in the contract',
  'quick tweak',
  'can we also add'
];

function scanText(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return SCOPE_KEYWORDS.some(k => lower.includes(k));
}
