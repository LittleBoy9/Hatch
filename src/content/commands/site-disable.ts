import type { HatchCommand, CommandContext } from '../../types';

// ─── Per-Site Shortcut Disable ───────────────────────────────
// Lets users hand Cmd+K / Ctrl+K back to sites that use it natively
// (Slack, Notion, GitHub, ...). The palette stays reachable via the
// toolbar icon and the Cmd+Shift+K command shortcut.

function getDisabledSites(): Promise<string[]> {
  return new Promise((resolve) => {
    if (!chrome.runtime?.id) return resolve([]);
    chrome.storage.local.get('disabledSites', (data) => {
      if (chrome.runtime.lastError) return resolve([]);
      resolve((data.disabledSites as string[]) || []);
    });
  });
}

function setDisabledSites(sites: string[]): Promise<void> {
  return new Promise((resolve) => {
    if (!chrome.runtime?.id) return resolve();
    chrome.storage.local.set({ disabledSites: sites }, () => resolve());
  });
}

export async function getSiteDisableCommands(): Promise<HatchCommand[]> {
  const host = window.location.hostname;
  if (!host) return [];

  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const shortcut = isMac ? '⌘K' : 'Ctrl+K';
  const altShortcut = isMac ? '⌘⇧K' : 'Ctrl+Shift+K';

  const sites = await getDisabledSites();
  const disabled = sites.includes(host);

  if (disabled) {
    return [
      {
        id: 'enable-site-shortcut',
        name: `Enable ${shortcut} on ${host}`,
        description: `Hatch will answer ${shortcut} on this site again`,
        keywords: ['enable', 'hatch', 'shortcut', 'site', host],
        icon: '🔓',
        category: 'command',
        action: async (ctx: CommandContext) => {
          await setDisabledSites(sites.filter((s) => s !== host));
          ctx.close();
        },
      },
    ];
  }

  return [
    {
      id: 'disable-site-shortcut',
      name: `Disable ${shortcut} on ${host}`,
      description: `Let this site keep its own ${shortcut} — reopen Hatch via the toolbar icon or ${altShortcut}`,
      keywords: ['disable', 'hatch', 'shortcut', 'site', 'conflict', host],
      icon: '🔒',
      category: 'command',
      action: async (ctx: CommandContext) => {
        await setDisabledSites([...sites, host]);
        ctx.close();
      },
    },
  ];
}
