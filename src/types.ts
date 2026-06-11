// ─── Core Types ──────────────────────────────────────────────

export interface HatchCommand {
  id: string;
  name: string;
  description?: string;
  keywords?: string[];
  icon?: string;
  category: CommandCategory;
  action: (ctx: CommandContext) => void | Promise<void>;
  /** If true, keeps the palette open after execution */
  keepOpen?: boolean;
  /** Only show this command when prefix matches */
  prefix?: string;
}

export type CommandCategory = 'tab' | 'navigation' | 'bookmark' | 'history' | 'snippet' | 'command' | 'search' | 'session' | 'note' | 'alias' | 'clipboard' | 'recent';

export type EditorType = 'snippet' | 'alias' | 'engine';

export interface CommandContext {
  /** The current query text */
  query: string;
  /** Whether Cmd/Ctrl was held when executing */
  metaKey: boolean;
  /** Close the palette */
  close: () => void;
  /** Switch palette to an editor form view */
  showEditor: (type: EditorType) => void;
}

export interface TabInfo {
  id: number;
  windowId: number;
  title: string;
  url: string;
  favIconUrl?: string;
  active: boolean;
  pinned: boolean;
  mutedInfo?: { muted: boolean };
  groupId?: number;
  index: number;
}

export interface BookmarkInfo {
  id: string;
  title: string;
  url: string;
  folderPath: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  lastVisitTime: number;
  visitCount: number;
}

export interface TabGroupInfo {
  id: number;
  title: string;
  color: string;
  collapsed: boolean;
  windowId: number;
}

export interface ClosedTabInfo {
  tabId: number;
  windowId: number;
  sessionId: string;
  title: string;
  url: string;
  favIconUrl?: string;
  closedAt: number;
}

// ─── Message Types (Content ↔ Background) ────────────────────

export type MessageType =
  // Tabs
  | { type: 'GET_ALL_TABS' }
  | { type: 'SWITCH_TAB'; tabId: number; windowId: number }
  | { type: 'CLOSE_TAB'; tabId: number }
  | { type: 'CREATE_TAB'; url?: string }
  | { type: 'DUPLICATE_TAB'; tabId: number }
  | { type: 'GET_CURRENT_TAB' }
  | { type: 'PIN_TAB'; tabId: number; pinned: boolean }
  | { type: 'MUTE_TAB'; tabId: number; muted: boolean }
  | { type: 'MOVE_TAB'; tabId: number; index: number }
  | { type: 'MOVE_TAB_TO_WINDOW'; tabId: number }
  | { type: 'CLOSE_OTHER_TABS'; tabId: number }
  | { type: 'CLOSE_TABS_RIGHT'; tabId: number; index: number }
  | { type: 'CLOSE_DUPLICATE_TABS' }
  // Bookmarks
  | { type: 'SEARCH_BOOKMARKS'; query: string }
  | { type: 'GET_ALL_BOOKMARKS' }
  // History
  | { type: 'SEARCH_HISTORY'; query: string; maxResults?: number }
  // Sessions
  | { type: 'GET_RECENTLY_CLOSED'; maxResults?: number }
  | { type: 'RESTORE_SESSION'; sessionId: string }
  // Tab Groups
  | { type: 'GET_TAB_GROUPS' }
  | { type: 'CREATE_TAB_GROUP'; title: string; color: string }
  | { type: 'ADD_TAB_TO_GROUP'; tabId: number; groupId: number }
  | { type: 'REMOVE_TAB_FROM_GROUP'; tabId: number }
  | { type: 'TOGGLE_GROUP_COLLAPSE'; groupId: number; collapsed: boolean }
  | { type: 'RENAME_GROUP'; groupId: number; title: string; color?: string }
  | { type: 'UNGROUP'; groupId: number }
  // Tab Suspend
  | { type: 'SUSPEND_TAB'; tabId: number }
  | { type: 'SUSPEND_OTHER_TABS' }
  | { type: 'SUSPEND_ALL_TABS' }
  // Snippets
  | { type: 'GET_SNIPPETS' }
  | { type: 'SAVE_SNIPPET'; snippet: Snippet }
  | { type: 'DELETE_SNIPPET'; id: string }
  // Notes
  | { type: 'GET_NOTES' }
  | { type: 'SAVE_NOTE'; note: Note }
  | { type: 'DELETE_NOTE'; id: string }
  // Clipboard History
  | { type: 'GET_CLIPBOARD_HISTORY' }
  | { type: 'SAVE_CLIPBOARD_ITEM'; item: ClipboardEntry }
  | { type: 'CLEAR_CLIPBOARD_HISTORY' }
  | { type: 'PIN_CLIPBOARD_ITEM'; id: string; pinned: boolean }
  // Aliases
  | { type: 'GET_ALIASES' }
  | { type: 'SAVE_ALIAS'; alias: Alias }
  | { type: 'DELETE_ALIAS'; id: string }
  // Frecency
  | { type: 'TRACK_USAGE'; commandId: string }
  | { type: 'GET_FRECENCY' }
  // Bookmarks (write)
  | { type: 'SAVE_TABS_AS_BOOKMARKS' }
  // Options
  | { type: 'OPEN_OPTIONS' }
  // Palette
  | { type: 'OPEN_PALETTE' };

// ─── Data Models ─────────────────────────────────────────────

export interface Snippet {
  id: string;
  trigger: string;
  name: string;
  body: string;
}

export interface Note {
  id: string;
  text: string;
  url: string;
  title: string;
  createdAt: number;
}

export interface ClipboardEntry {
  id: string;
  text: string;
  timestamp: number;
  source: string;
  pinned?: boolean;
}

export interface Alias {
  id: string;
  keyword: string;
  name: string;
  url: string; // supports %s for parameterized quicklinks
}

// ─── Storage ─────────────────────────────────────────────────

export interface FrecencyEntry {
  count: number;
  lastUsed: number;
}

export interface HatchSettings {
  theme: 'auto' | 'dark' | 'light';
  maxResults: number;
  searchEngineUrl: string;
}

export const DEFAULT_SETTINGS: HatchSettings = {
  theme: 'auto',
  maxResults: 8,
  searchEngineUrl: 'https://www.google.com/search?q=%s',
};
