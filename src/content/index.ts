import { Palette } from './palette/Palette';
import { initClipboardListener } from './commands/clipboard';

// ─── Initialize Hatch ───────────────────────────────────────

let palette: Palette | null = null;

function init(): void {
  if (palette) return;
  palette = new Palette();
}

// ─── Keyboard Shortcut (Cmd+K / Ctrl+K) ─────────────────────

document.addEventListener('keydown', (e: KeyboardEvent) => {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const modifier = isMac ? e.metaKey : e.ctrlKey;

  if (modifier && e.key === 'k') {
    e.preventDefault();
    e.stopPropagation();

    if (!palette) init();
    palette!.toggle();
  }
}, true); // capture phase to intercept before page handlers

// ─── Init on Load ────────────────────────────────────────────

// Lazy init — only create the palette DOM when first needed
// But set up message listener immediately for toolbar button clicks
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'OPEN_PALETTE') {
    if (!palette) init();
    palette!.toggle();
  }
});

// ─── Clipboard History ──────────────────────────────────────
initClipboardListener();
