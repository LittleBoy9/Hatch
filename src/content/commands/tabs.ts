import type { HatchCommand, TabInfo, CommandContext } from '../../types';

// ─── Helpers ─────────────────────────────────────────────────

export function sendMessage<T>(msg: unknown): Promise<T> {
  return new Promise((resolve) => {
    if (!chrome.runtime?.id) {
      // Extension context invalidated (reloaded) — fail silently
      resolve(undefined as T);
      return;
    }
    try {
      chrome.runtime.sendMessage(msg, (response: T) => {
        if (chrome.runtime.lastError) {
          resolve(undefined as T);
          return;
        }
        resolve(response);
      });
    } catch {
      resolve(undefined as T);
    }
  });
}

function getFaviconUrl(tab: TabInfo): string {
  if (tab.favIconUrl && tab.favIconUrl.startsWith('http')) {
    return tab.favIconUrl;
  }
  try {
    const url = new URL(tab.url);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
  } catch {
    return '';
  }
}

function truncateUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname === '/' ? '' : u.pathname;
    const full = u.hostname + path;
    return full.length > 60 ? full.slice(0, 57) + '...' : full;
  } catch {
    return url.slice(0, 60);
  }
}

// ─── Dynamic Tab Commands (switch to tab) ────────────────────

export async function getTabCommands(): Promise<HatchCommand[]> {
  const tabs = await sendMessage<TabInfo[]>({ type: 'GET_ALL_TABS' });
  if (!tabs) return [];

  return tabs.map((tab) => ({
    id: `switch-tab-${tab.id}`,
    name: tab.title || 'Untitled',
    description: truncateUrl(tab.url),
    keywords: [tab.title, tab.url].filter(Boolean) as string[],
    icon: getFaviconUrl(tab),
    category: 'tab' as const,
    prefix: '@',
    action: (ctx: CommandContext) => {
      if (ctx.metaKey) {
        sendMessage({ type: 'DUPLICATE_TAB', tabId: tab.id });
      } else {
        sendMessage({ type: 'SWITCH_TAB', tabId: tab.id, windowId: tab.windowId });
      }
      ctx.close();
    },
  }));
}

// ─── Static Tab Action Commands ──────────────────────────────

export const staticTabCommands: HatchCommand[] = [
  {
    id: 'new-tab',
    name: 'New Tab',
    description: 'Open a new blank tab',
    keywords: ['new', 'tab', 'create', 'open'],
    icon: '➕',
    category: 'tab',
    action: (ctx) => {
      sendMessage({ type: 'CREATE_TAB' });
      ctx.close();
    },
  },
  {
    id: 'close-tab',
    name: 'Close Current Tab',
    description: 'Close the active tab',
    keywords: ['close', 'tab', 'remove', 'kill'],
    icon: '✕',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'CLOSE_TAB', tabId: tab.id });
      }
      ctx.close();
    },
  },
  {
    id: 'duplicate-tab',
    name: 'Duplicate Tab',
    description: 'Duplicate the current tab',
    keywords: ['duplicate', 'clone', 'copy', 'tab'],
    icon: '⧉',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'DUPLICATE_TAB', tabId: tab.id });
      }
      ctx.close();
    },
  },
  {
    id: 'pin-tab',
    name: 'Pin / Unpin Tab',
    description: 'Toggle pin on the current tab',
    keywords: ['pin', 'unpin', 'tab', 'lock'],
    icon: '📌',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'PIN_TAB', tabId: tab.id, pinned: !tab.pinned });
      }
      ctx.close();
    },
  },
  {
    id: 'mute-tab',
    name: 'Mute / Unmute Tab',
    description: 'Toggle mute on the current tab',
    keywords: ['mute', 'unmute', 'sound', 'audio', 'silence', 'tab'],
    icon: '🔇',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        const isMuted = tab.mutedInfo?.muted ?? false;
        sendMessage({ type: 'MUTE_TAB', tabId: tab.id, muted: !isMuted });
      }
      ctx.close();
    },
  },
  {
    id: 'move-tab-start',
    name: 'Move Tab to Start',
    description: 'Move current tab to the beginning',
    keywords: ['move', 'tab', 'start', 'first', 'beginning', 'left'],
    icon: '⇤',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'MOVE_TAB', tabId: tab.id, index: 0 });
      }
      ctx.close();
    },
  },
  {
    id: 'move-tab-end',
    name: 'Move Tab to End',
    description: 'Move current tab to the end',
    keywords: ['move', 'tab', 'end', 'last', 'right'],
    icon: '⇥',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'MOVE_TAB', tabId: tab.id, index: -1 });
      }
      ctx.close();
    },
  },
  {
    id: 'move-tab-new-window',
    name: 'Move Tab to New Window',
    description: 'Detach current tab into its own window',
    keywords: ['move', 'tab', 'window', 'detach', 'separate'],
    icon: '↗',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'MOVE_TAB_TO_WINDOW', tabId: tab.id });
      }
      ctx.close();
    },
  },
  {
    id: 'close-other-tabs',
    name: 'Close Other Tabs',
    description: 'Close all tabs except the current one (keeps pinned)',
    keywords: ['close', 'other', 'tabs', 'all', 'clean'],
    icon: '🧹',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'CLOSE_OTHER_TABS', tabId: tab.id });
      }
      ctx.close();
    },
  },
  {
    id: 'close-tabs-right',
    name: 'Close Tabs to the Right',
    description: 'Close all tabs after the current one (keeps pinned)',
    keywords: ['close', 'tabs', 'right', 'after'],
    icon: '⟹',
    category: 'tab',
    action: async (ctx) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'CLOSE_TABS_RIGHT', tabId: tab.id, index: tab.index });
      }
      ctx.close();
    },
  },
  {
    id: 'close-duplicate-tabs',
    name: 'Close Duplicate Tabs',
    description: 'Close tabs with the same URL (keeps one of each)',
    keywords: ['close', 'duplicate', 'tabs', 'dedupe', 'clean'],
    icon: '♻',
    category: 'tab',
    action: (ctx) => {
      sendMessage({ type: 'CLOSE_DUPLICATE_TABS' });
      ctx.close();
    },
  },
];
