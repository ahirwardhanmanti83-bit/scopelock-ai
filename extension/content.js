// ScopeLock AI - Autonomous In-Browser Scope Guard
// Real-time forensic scanner for Upwork, Gmail, Slack, and Fiverr client chats

console.log('[ScopeLock AI] Active Scope Creep Shield Guard Initialized.');

const SCOPE_KEYWORDS = [
  'quick favor',
  'small change',
  'just one more thing',
  'while you are at it',
  'minor revision',
  'add this feature',
  'not in the contract',
  'quick tweak',
  'can we also add',
  'can you also add',
  'simple change',
  'little addition',
  "won't take long",
  'urgent change',
  'extra feature'
];

let alertShown = false;

function createFloatingAlert(keyword, snippet) {
  if (document.getElementById('scopelock-guard-badge')) return;

  const badge = document.createElement('div');
  badge.id = 'scopelock-guard-badge';
  badge.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2147483647;
    background: #090d16;
    border: 2px solid #ef4444;
    border-radius: 12px;
    padding: 16px;
    width: 340px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(239, 68, 68, 0.3);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #f8fafc;
    animation: scopelockSlideIn 0.3s ease-out;
  `;

  badge.innerHTML = `
    <style>
      @keyframes scopelockSlideIn {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    </style>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 18px;">🛡️</span>
        <strong style="font-size: 13px; color: #f87171; letter-spacing: 0.5px;">SCOPE CREEP TRIGGER DETECTED!</strong>
      </div>
      <button id="scopelock-close-btn" style="background: none; border: none; color: #94a3b8; font-size: 16px; cursor: pointer; padding: 0 4px;">✕</button>
    </div>
    <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 6px 10px; margin-bottom: 10px; border-radius: 4px; font-size: 11px; color: #fca5a5;">
      Trigger: <strong>"${keyword}"</strong><br>
      <span style="font-size: 10px; color: #cbd5e1; font-style: italic;">"${snippet.substring(0, 80)}..."</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 12px; color: #cbd5e1;">
      <span>Estimated Variance:</span>
      <strong style="color: #34d399;">+4.0 hrs (~$500 USD)</strong>
    </div>
    <div style="font-size: 10px; color: #94a3b8; margin-bottom: 12px;">
      ⚠️ Statutory UCC § 2-209 Contract Amendment required prior to execution.
    </div>
    <a href="https://ahirwardhanmanti83-bit.github.io/scopelock-ai/?ref=chrome_ext" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background: #059669; color: #ffffff; text-align: center; font-weight: 700; font-size: 12px; padding: 10px; border-radius: 8px; text-decoration: none; transition: background 0.2s;">
      ⚡ Generate UCC § 2-209 Change Order ($3)
    </a>
  `;

  document.body.appendChild(badge);

  document.getElementById('scopelock-close-btn').addEventListener('click', () => {
    badge.remove();
  });
}

function scanDOM() {
  if (alertShown) return;

  const bodyText = document.body ? document.body.innerText : '';
  if (!bodyText) return;

  const lower = bodyText.toLowerCase();

  for (const keyword of SCOPE_KEYWORDS) {
    const idx = lower.indexOf(keyword);
    if (idx !== -1) {
      alertShown = true;
      const snippet = bodyText.substring(Math.max(0, idx - 20), Math.min(bodyText.length, idx + 60)).trim();
      createFloatingAlert(keyword, snippet);
      break;
    }
  }
}

// Initial scan after page load
setTimeout(scanDOM, 2500);

// Throttled MutationObserver for live chats
let timeoutId = null;
const observer = new MutationObserver(() => {
  if (alertShown) return;
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(scanDOM, 2000);
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

