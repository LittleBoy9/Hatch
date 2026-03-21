import type { MessageType, TabInfo, TabGroupInfo, BookmarkInfo, HistoryItem, ClosedTabInfo, FrecencyEntry } from '../types';

// ─── Message Handler ─────────────────────────────────────────

chrome.runtime.onMessage.addListener(
  (message: MessageType, _sender, sendResponse: (response: unknown) => void) => {
    handleMessage(message).then(sendResponse).catch((err) => {
      console.error('[Hatch] Service worker error:', err);
      sendResponse(null);
    });
    return true; // keep channel open for async
  }
);

async function handleMessage(msg: MessageType): Promise<unknown> {
  switch (msg.type) {
    // ─── Tabs ────────────────────────────────────────────
    case 'GET_ALL_TABS':
      return getAllTabs();

    case 'SWITCH_TAB':
      await chrome.tabs.update(msg.tabId, { active: true });
      await chrome.windows.update(msg.windowId, { focused: true });
      return;

    case 'CLOSE_TAB':
      await chrome.tabs.remove(msg.tabId);
      return;

    case 'CREATE_TAB': {
      const tab = await chrome.tabs.create({ url: msg.url || 'chrome://newtab' });
      return tabToInfo(tab);
    }

    case 'DUPLICATE_TAB': {
      const tab = await chrome.tabs.duplicate(msg.tabId);
      return tab ? tabToInfo(tab) : null;
    }

    case 'GET_CURRENT_TAB': {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab ? tabToInfo(tab) : null;
    }

    case 'PIN_TAB':
      await chrome.tabs.update(msg.tabId, { pinned: msg.pinned });
      return;

    case 'MUTE_TAB':
      await chrome.tabs.update(msg.tabId, { muted: msg.muted });
      return;

    case 'MOVE_TAB':
      await chrome.tabs.move(msg.tabId, { index: msg.index });
      return;

    case 'MOVE_TAB_TO_WINDOW': {
      await chrome.windows.create({ tabId: msg.tabId });
      return;
    }

    case 'CLOSE_OTHER_TABS': {
      const allTabs = await chrome.tabs.query({ currentWindow: true });
      const toClose = allTabs.filter((t) => t.id !== msg.tabId && !t.pinned).map((t) => t.id!);
      if (toClose.length > 0) await chrome.tabs.remove(toClose);
      return { closed: toClose.length };
    }

    case 'CLOSE_TABS_RIGHT': {
      const allTabs = await chrome.tabs.query({ currentWindow: true });
      const toClose = allTabs
        .filter((t) => t.index > msg.index && !t.pinned)
        .map((t) => t.id!);
      if (toClose.length > 0) await chrome.tabs.remove(toClose);
      return { closed: toClose.length };
    }

    case 'CLOSE_DUPLICATE_TABS': {
      const allTabs = await chrome.tabs.query({});
      const seen = new Map<string, number>();
      const toClose: number[] = [];
      for (const tab of allTabs) {
        if (!tab.url || !tab.id) continue;
        if (seen.has(tab.url)) {
          // Keep the first one, close duplicates (but never close active or pinned)
          if (!tab.active && !tab.pinned) {
            toClose.push(tab.id);
          }
        } else {
          seen.set(tab.url, tab.id);
        }
      }
      if (toClose.length > 0) await chrome.tabs.remove(toClose);
      return { closed: toClose.length };
    }

    // ─── Bookmarks ───────────────────────────────────────
    case 'SEARCH_BOOKMARKS':
      return searchBookmarks(msg.query);

    case 'GET_ALL_BOOKMARKS':
      return getAllBookmarks();

    // ─── History ─────────────────────────────────────────
    case 'SEARCH_HISTORY':
      return searchHistory(msg.query, msg.maxResults || 30);

    // ─── Sessions (Recently Closed) ─────────────────────
    case 'GET_RECENTLY_CLOSED':
      return getRecentlyClosed(msg.maxResults || 25);

    case 'RESTORE_SESSION':
      await chrome.sessions.restore(msg.sessionId);
      return;

    // ─── Tab Groups ──────────────────────────────────────
    case 'GET_TAB_GROUPS':
      return getTabGroups();

    case 'CREATE_TAB_GROUP': {
      const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!currentTab?.id) return null;
      const groupId = await chrome.tabs.group({ tabIds: [currentTab.id] });
      await chrome.tabGroups.update(groupId, {
        title: msg.title,
        color: msg.color as chrome.tabGroups.Color,
      });
      return { groupId };
    }

    case 'ADD_TAB_TO_GROUP':
      await chrome.tabs.group({ tabIds: [msg.tabId], groupId: msg.groupId });
      return;

    case 'REMOVE_TAB_FROM_GROUP':
      await chrome.tabs.ungroup(msg.tabId);
      return;

    case 'TOGGLE_GROUP_COLLAPSE':
      await chrome.tabGroups.update(msg.groupId, { collapsed: msg.collapsed });
      return;

    case 'RENAME_GROUP': {
      const update: chrome.tabGroups.UpdateProperties = { title: msg.title };
      if (msg.color) update.color = msg.color as chrome.tabGroups.Color;
      await chrome.tabGroups.update(msg.groupId, update);
      return;
    }

    case 'UNGROUP': {
      const groupTabs = await chrome.tabs.query({ groupId: msg.groupId });
      const tabIds = groupTabs.map((t) => t.id!).filter(Boolean);
      if (tabIds.length > 0) {
        for (const id of tabIds) {
          await chrome.tabs.ungroup(id);
        }
      }
      return;
    }

    // ─── Tab Suspend ────────────────────────────────────
    case 'SUSPEND_TAB':
      await chrome.tabs.discard(msg.tabId);
      return;

    case 'SUSPEND_OTHER_TABS': {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const allTabs = await chrome.tabs.query({ currentWindow: true });
      let count = 0;
      for (const t of allTabs) {
        if (t.id && t.id !== activeTab?.id && !t.active && !t.pinned && !t.discarded) {
          try { await chrome.tabs.discard(t.id); count++; } catch { /* skip */ }
        }
      }
      return { suspended: count };
    }

    case 'SUSPEND_ALL_TABS': {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      let count = 0;
      for (const t of tabs) {
        if (t.id && !t.active && !t.discarded) {
          try { await chrome.tabs.discard(t.id); count++; } catch { /* skip */ }
        }
      }
      return { suspended: count };
    }

    // ─── Snippets ─────────────────────────────────────────
    case 'GET_SNIPPETS':
      return storageGet<import('../types').Snippet[]>('snippets', []);

    case 'SAVE_SNIPPET': {
      const snippets = await storageGet<import('../types').Snippet[]>('snippets', []);
      const idx = snippets.findIndex((s) => s.id === msg.snippet.id);
      if (idx >= 0) snippets[idx] = msg.snippet;
      else snippets.push(msg.snippet);
      await storageSet('snippets', snippets);
      return;
    }

    case 'DELETE_SNIPPET': {
      const snippets = await storageGet<import('../types').Snippet[]>('snippets', []);
      await storageSet('snippets', snippets.filter((s) => s.id !== msg.id));
      return;
    }

    // ─── Notes ────────────────────────────────────────────
    case 'GET_NOTES':
      return storageGet<import('../types').Note[]>('notes', []);

    case 'SAVE_NOTE': {
      const notes = await storageGet<import('../types').Note[]>('notes', []);
      notes.unshift(msg.note);
      // Keep max 200 notes
      if (notes.length > 200) notes.length = 200;
      await storageSet('notes', notes);
      return;
    }

    case 'DELETE_NOTE': {
      const notes = await storageGet<import('../types').Note[]>('notes', []);
      await storageSet('notes', notes.filter((n) => n.id !== msg.id));
      return;
    }

    // ─── Clipboard History ────────────────────────────────
    case 'GET_CLIPBOARD_HISTORY':
      return getClipboardHistory();

    case 'SAVE_CLIPBOARD_ITEM': {
      const history = await storageGet<import('../types').ClipboardEntry[]>('clipboardHistory', []);
      // Don't save duplicates of the last item
      if (history.length > 0 && history[0].text === msg.item.text) return;
      history.unshift(msg.item);
      // Keep max 50, remove expired (7 days) unpinned items
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const filtered = history.filter((h) => h.pinned || h.timestamp > sevenDaysAgo);
      if (filtered.length > 50) filtered.length = 50;
      await storageSet('clipboardHistory', filtered);
      return;
    }

    case 'CLEAR_CLIPBOARD_HISTORY':
      await storageSet('clipboardHistory', []);
      return;

    case 'PIN_CLIPBOARD_ITEM': {
      const history = await storageGet<import('../types').ClipboardEntry[]>('clipboardHistory', []);
      const item = history.find((h) => h.id === msg.id);
      if (item) item.pinned = msg.pinned;
      await storageSet('clipboardHistory', history);
      return;
    }

    // ─── Aliases ──────────────────────────────────────────
    case 'GET_ALIASES':
      return storageGet<import('../types').Alias[]>('aliases', []);

    case 'SAVE_ALIAS': {
      const aliases = await storageGet<import('../types').Alias[]>('aliases', []);
      const aIdx = aliases.findIndex((a) => a.id === msg.alias.id);
      if (aIdx >= 0) aliases[aIdx] = msg.alias;
      else aliases.push(msg.alias);
      await storageSet('aliases', aliases);
      return;
    }

    case 'DELETE_ALIAS': {
      const aliases = await storageGet<import('../types').Alias[]>('aliases', []);
      await storageSet('aliases', aliases.filter((a) => a.id !== msg.id));
      return;
    }

    // ─── Frecency ────────────────────────────────────────
    case 'TRACK_USAGE':
      return trackUsage(msg.commandId);

    case 'GET_FRECENCY':
      return getFrecency();

    // ─── Options ───────────────────────────────────────
    case 'OPEN_OPTIONS':
      chrome.runtime.openOptionsPage();
      return;

    default:
      return null;
  }
}

// ─── Storage Helpers ─────────────────────────────────────────

async function storageGet<T>(key: string, defaultValue: T): Promise<T> {
  const data = await chrome.storage.local.get(key);
  return (data[key] as T) ?? defaultValue;
}

async function storageSet(key: string, value: unknown): Promise<void> {
  await chrome.storage.local.set({ [key]: value });
}

async function getClipboardHistory(): Promise<import('../types').ClipboardEntry[]> {
  const history = await storageGet<import('../types').ClipboardEntry[]>('clipboardHistory', []);
  // Clean up expired unpinned items
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return history.filter((h) => h.pinned || h.timestamp > sevenDaysAgo);
}

// ─── Tab Helpers ─────────────────────────────────────────────

async function getTabGroups(): Promise<TabGroupInfo[]> {
  const groups = await chrome.tabGroups.query({});
  return groups.map((g) => ({
    id: g.id,
    title: g.title ?? '',
    color: g.color,
    collapsed: g.collapsed,
    windowId: g.windowId,
  }));
}

async function getAllTabs(): Promise<TabInfo[]> {
  const tabs = await chrome.tabs.query({});
  return tabs.map(tabToInfo);
}

function tabToInfo(tab: chrome.tabs.Tab): TabInfo {
  return {
    id: tab.id ?? -1,
    windowId: tab.windowId ?? -1,
    title: tab.title ?? 'Untitled',
    url: tab.url ?? '',
    favIconUrl: tab.favIconUrl,
    active: tab.active ?? false,
    pinned: tab.pinned ?? false,
    mutedInfo: tab.mutedInfo ? { muted: tab.mutedInfo.muted ?? false } : undefined,
    groupId: tab.groupId,
    index: tab.index,
  };
}

// ─── Bookmark Helpers ────────────────────────────────────────

async function searchBookmarks(query: string): Promise<BookmarkInfo[]> {
  if (!query.trim()) return getAllBookmarks();
  const results = await chrome.bookmarks.search(query);
  return results
    .filter((b) => b.url) // exclude folders
    .slice(0, 30)
    .map((b) => ({
      id: b.id,
      title: b.title || 'Untitled',
      url: b.url!,
      folderPath: '', // will be resolved below
    }));
}

async function getAllBookmarks(): Promise<BookmarkInfo[]> {
  const tree = await chrome.bookmarks.getTree();
  const results: BookmarkInfo[] = [];
  flattenBookmarks(tree, '', results);
  return results;
}

function flattenBookmarks(
  nodes: chrome.bookmarks.BookmarkTreeNode[],
  path: string,
  results: BookmarkInfo[]
): void {
  for (const node of nodes) {
    const currentPath = path ? `${path} / ${node.title}` : node.title;
    if (node.url) {
      results.push({
        id: node.id,
        title: node.title || 'Untitled',
        url: node.url,
        folderPath: path,
      });
    }
    if (node.children) {
      flattenBookmarks(node.children, currentPath, results);
    }
  }
}

// ─── History Helpers ─────────────────────────────────────────

async function searchHistory(query: string, maxResults: number): Promise<HistoryItem[]> {
  const results = await chrome.history.search({
    text: query,
    maxResults,
    startTime: Date.now() - 30 * 24 * 60 * 60 * 1000, // last 30 days
  });

  return results
    .filter((h) => h.url)
    .map((h) => ({
      id: h.id || '',
      title: h.title || 'Untitled',
      url: h.url!,
      lastVisitTime: h.lastVisitTime || 0,
      visitCount: h.visitCount || 0,
    }));
}

// ─── Sessions (Recently Closed) ──────────────────────────────

async function getRecentlyClosed(maxResults: number): Promise<ClosedTabInfo[]> {
  const sessions = await chrome.sessions.getRecentlyClosed({ maxResults });
  const results: ClosedTabInfo[] = [];

  for (const session of sessions) {
    if (session.tab) {
      const tab = session.tab;
      results.push({
        tabId: tab.tabId ?? -1,
        windowId: tab.windowId ?? -1,
        sessionId: tab.sessionId ?? '',
        title: tab.title ?? 'Untitled',
        url: tab.url ?? '',
        favIconUrl: tab.favIconUrl,
        closedAt: session.lastModified * 1000, // convert to ms
      });
    }
  }

  return results;
}

// ─── Frecency ────────────────────────────────────────────────

async function trackUsage(commandId: string): Promise<void> {
  const data = await chrome.storage.local.get('frecency');
  const frecency: Record<string, FrecencyEntry> = data.frecency || {};

  const existing = frecency[commandId];
  frecency[commandId] = {
    count: (existing?.count || 0) + 1,
    lastUsed: Date.now(),
  };

  await chrome.storage.local.set({ frecency });
}

async function getFrecency(): Promise<Record<string, FrecencyEntry>> {
  const data = await chrome.storage.local.get('frecency');
  return data.frecency || {};
}

// ─── Extension Icon Click → Open Palette ─────────────────────

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'OPEN_PALETTE' });
    } catch {
      // Content script not loaded on this page (e.g., chrome:// pages)
    }
  }
});

// ─── Keyboard Shortcut (commands API) ────────────────────────

chrome.commands.onCommand.addListener(async (command) => {
  if (command === '_execute_action') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      try {
        await chrome.tabs.sendMessage(tab.id, { type: 'OPEN_PALETTE' });
      } catch {
        // Content script not loaded
      }
    }
  }
});
