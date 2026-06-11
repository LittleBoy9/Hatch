import { Palette } from './palette/Palette';
import { initClipboardListener } from './commands/clipboard';

// ─── Initialize Hatch ───────────────────────────────────────

let palette: Palette | null = null;

function init(): void {
  if (palette) return;
  palette = new Palette();
}

// ─── Known Conflicting Sites ────────────────────────────────
// These sites use Cmd+K natively: Slack, Notion, GitHub, Linear, Figma, etc.
// We intercept at capture phase + stopImmediatePropagation to always win.

const CONFLICT_SITES = [
  'slack.com',
  'notion.so',
  'github.com',
  'linear.app',
  'figma.com',
  'discord.com',
  'youtube.com',
  'twitter.com',
  'x.com',
  'reddit.com',
  'mail.google.com',
  'docs.google.com',
];

function isConflictSite(): boolean {
  return CONFLICT_SITES.some((site) => window.location.hostname.includes(site));
}

// ─── Per-Site Disable ───────────────────────────────────────
// Users can hand Cmd+K back to a site via the "Disable ⌘K on <site>"
// palette command. The keydown check must be synchronous, so the list
// is cached here and kept fresh through storage.onChanged.

let siteDisabled = false;

function syncSiteDisabled(sites: string[] | undefined): void {
  siteDisabled = !!sites && sites.includes(window.location.hostname);
}

if (chrome.runtime?.id) {
  chrome.storage.local.get('disabledSites', (data) => {
    if (!chrome.runtime.lastError) syncSiteDisabled(data.disabledSites as string[] | undefined);
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.disabledSites) {
      syncSiteDisabled(changes.disabledSites.newValue as string[] | undefined);
    }
  });
}

// ─── Keyboard Shortcut (Cmd+K / Ctrl+K) ─────────────────────

document.addEventListener('keydown', (e: KeyboardEvent) => {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const modifier = isMac ? e.metaKey : e.ctrlKey;

  if (modifier && e.key === 'k') {
    // Site's own Cmd+K wins when the user disabled Hatch here
    // (palette stays reachable via toolbar icon / Cmd+Shift+K)
    if (siteDisabled) return;

    e.preventDefault();
    e.stopPropagation();
    // stopImmediatePropagation prevents other capture-phase listeners (Slack, Notion)
    e.stopImmediatePropagation();

    if (!palette) init();
    palette!.toggle();

    // On conflict sites, show a subtle indicator on first use
    if (isConflictSite()) {
      showConflictHint();
    }
  }
}, true); // capture phase to intercept before page handlers

let conflictHintShown = false;
function showConflictHint(): void {
  if (conflictHintShown) return;
  if (!chrome.runtime?.id) return; // Extension context invalidated
  chrome.storage.local.get('conflictHintDismissed', (data) => {
    if (chrome.runtime.lastError || data.conflictHintDismissed) return;
    conflictHintShown = true;
    chrome.storage.local.set({ conflictHintDismissed: true });
    renderConflictHint();
  });
}

function renderConflictHint(): void {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const shortcut = isMac ? '⌘K' : 'Ctrl+K';

  const host = document.createElement('div');
  host.id = 'hatch-conflict-hint';
  const shadow = host.attachShadow({ mode: 'closed' });

  shadow.innerHTML = `
    <style>
      .hatch-hint {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 2147483645;
        background: #1a1a2e;
        color: #e2e8f0;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 14px 18px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 13px;
        line-height: 1.4;
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 360px;
        opacity: 0;
        transform: translateY(12px);
        animation: hatch-hint-in 0.4s ease forwards;
      }
      @keyframes hatch-hint-in {
        to { opacity: 1; transform: translateY(0); }
      }
      .hatch-hint-kbd {
        display: inline-block;
        font-weight: 700;
        background: rgba(99,102,241,0.2);
        border: 1px solid rgba(99,102,241,0.3);
        border-radius: 5px;
        padding: 1px 6px;
        font-size: 12px;
      }
      .hatch-hint-close {
        flex-shrink: 0;
        background: transparent;
        border: none;
        color: #64748b;
        font-size: 15px;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
      }
      .hatch-hint-close:hover { color: #e2e8f0; }
      @media (prefers-color-scheme: light) {
        .hatch-hint {
          background: #ffffff;
          color: #0f172a;
          border-color: rgba(0,0,0,0.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .hatch-hint-kbd { background: rgba(99,102,241,0.1); }
      }
    </style>
    <div class="hatch-hint">
      <span>Hatch now answers <span class="hatch-hint-kbd">${shortcut}</span> on this site, replacing the site's own shortcut. To give it back, run "Disable ${shortcut} on this site" from the palette.</span>
      <button class="hatch-hint-close" aria-label="Dismiss">✕</button>
    </div>
  `;

  document.body.appendChild(host);

  const dismiss = () => {
    host.style.transition = 'opacity 0.3s';
    host.style.opacity = '0';
    setTimeout(() => host.remove(), 300);
  };
  shadow.querySelector('.hatch-hint-close')!.addEventListener('click', dismiss);
  setTimeout(() => { if (host.parentElement) dismiss(); }, 8000);
}

// ─── Init on Load ────────────────────────────────────────────

// Lazy init — only create the palette DOM when first needed
// But set up message listener immediately for toolbar button clicks
if (chrome.runtime?.id) {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'OPEN_PALETTE') {
      if (!palette) init();
      palette!.toggle();
    }
  });
}

// ─── Onboarding Tooltip ─────────────────────────────────────

function showOnboardingTooltip(): void {
  if (!chrome.runtime?.id) return;
  chrome.storage.local.get('onboardingDone', (data) => {
    if (data.onboardingDone) return;
    chrome.storage.local.set({ onboardingDone: true });

    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const shortcut = isMac ? '⌘+K' : 'Ctrl+K';

    const tip = document.createElement('div');
    tip.id = 'hatch-onboarding';
    const shadow = tip.attachShadow({ mode: 'closed' });

    shadow.innerHTML = `
      <style>
        .hatch-tip {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 2147483645;
          background: #1a1a2e;
          color: #e2e8f0;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(12px);
          animation: hatch-tip-in 0.4s ease forwards 0.5s;
          max-width: 340px;
        }
        @keyframes hatch-tip-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .hatch-tip-icon {
          font-size: 24px;
          flex-shrink: 0;
        }
        .hatch-tip-text {
          flex: 1;
          line-height: 1.4;
        }
        .hatch-tip-title {
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 2px;
          color: #6366f1;
        }
        .hatch-tip-desc {
          font-size: 13px;
          color: #94a3b8;
        }
        .hatch-tip-kbd {
          display: inline-block;
          font-weight: 700;
          color: #e2e8f0;
          background: rgba(99,102,241,0.2);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 5px;
          padding: 1px 7px;
          font-size: 12px;
        }
        .hatch-tip-close {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 16px;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.15s;
        }
        .hatch-tip-close:hover {
          background: rgba(255,255,255,0.1);
          color: #e2e8f0;
        }
        @media (prefers-color-scheme: light) {
          .hatch-tip {
            background: #ffffff;
            color: #0f172a;
            border-color: rgba(0,0,0,0.1);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
          .hatch-tip-desc { color: #64748b; }
          .hatch-tip-kbd {
            color: #0f172a;
            background: rgba(99,102,241,0.1);
          }
          .hatch-tip-close { color: #94a3b8; }
          .hatch-tip-close:hover {
            background: rgba(0,0,0,0.05);
            color: #0f172a;
          }
        }
      </style>
      <div class="hatch-tip">
        <span class="hatch-tip-icon">⌘</span>
        <div class="hatch-tip-text">
          <div class="hatch-tip-title">Hatch Installed!</div>
          <div class="hatch-tip-desc">Press <span class="hatch-tip-kbd">${shortcut}</span> anywhere to open the command palette</div>
        </div>
        <button class="hatch-tip-close" aria-label="Dismiss">✕</button>
      </div>
    `;

    document.body.appendChild(tip);

    // Close button
    shadow.querySelector('.hatch-tip-close')!.addEventListener('click', () => {
      tip.style.transition = 'opacity 0.3s';
      tip.style.opacity = '0';
      setTimeout(() => tip.remove(), 300);
    });

    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      if (tip.parentElement) {
        tip.style.transition = 'opacity 0.3s';
        tip.style.opacity = '0';
        setTimeout(() => tip.remove(), 300);
      }
    }, 8000);
  });
}

// Show onboarding after a brief delay (let the page settle)
setTimeout(showOnboardingTooltip, 1500);

// ─── Clipboard History ──────────────────────────────────────
initClipboardListener();
