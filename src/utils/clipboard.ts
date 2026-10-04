/**
 * Safe clipboard copy utility with fallback for iframe / un-focused document environments.
 * Prevents "Failed to execute 'writeText' on 'Clipboard': Document is not focused" errors.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first if document is focused
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback
    }
  }

  // Robust fallback using textarea element
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.warn('Fallback copy failed', err);
    return false;
  }
}
