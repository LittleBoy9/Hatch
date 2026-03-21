# CLAUDE.md — Hatch (Chrome Extension)

## Project Vision

A universal `Cmd+K` / `Ctrl+K` command palette for the browser — like Raycast, but living inside Chrome. The goal is to be the **best command palette extension on the market**, replacing abandoned competitors (Omni, etc.) with something actively maintained, extensible, and blazing fast. Zero server. Zero database. Everything runs locally using Chrome Extension APIs and `chrome.storage`.

---

## Core Philosophy

- **Keyboard-first.** Mouse is never required for anything.
- **Instant.** Palette opens in <50ms. Results appear as you type with fuzzy search.
- **Extensible.** Users can create aliases, quicklinks, snippets, and custom commands.
- **Local-only.** No telemetry, no accounts, no sync unless the user opts in via Chrome Sync.
- **Non-intrusive.** The extension only activates on user intent (`Cmd+K`). Never injects persistent UI.
- **Opinionated.** Good defaults over settings bloat. Three themes. One shortcut. It just works.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Extension APIs | Chrome Manifest V3 | Required for modern Chrome extensions |
| UI Framework | Vanilla JS + CSS (no React) | Faster load in content script, ~29KB bundle |
| Fuzzy Search | `quickfuzz` (our own library) | Zero-dep, ~7x faster than Fuse.js, built-in match highlighting |
| Storage | `chrome.storage.local` + `chrome.storage.sync` | Local-first, optional sync |
| Build Tool | `esbuild` | Fast, simple, MV3 compatible |
| Language | TypeScript | Type safety for command registry |

> **No React.** Content scripts that inject UI must be lean. React adds ~40KB and startup cost.
> **No Fuse.js.** We use `quickfuzz` — our own zero-dependency fuzzy search library with built-in match highlighting.

---

## Architecture

```
hatch/
├── manifest.json
├── src/
│   ├── types.ts                     # Shared types (HatchCommand, TabInfo, messages)
│   ├── background/
│   │   └── service-worker.ts        # Handles tab/bookmark/history queries, message hub
│   ├── content/
│   │   ├── index.ts                 # Injected into every page, listens for Cmd+K
│   │   ├── palette/
│   │   │   ├── Palette.ts           # Core palette UI class (Shadow DOM)
│   │   │   ├── CommandRegistry.ts   # Gathers all commands, handles prefix filtering
│   │   │   ├── fuzzy.ts             # quickfuzz wrapper with FuzzyResult type
│   │   │   └── palette.css.ts       # Scoped styles as TS string (injected into shadow DOM)
│   │   └── commands/
│   │       ├── tabs.ts              # Switch, close, duplicate, pin, mute, move tabs
│   │       ├── bookmarks.ts         # Search and open bookmarks
│   │       ├── history.ts           # Search browser history
│   │       ├── sessions.ts          # Recently closed tabs
│   │       ├── site-search.ts       # Quick site search (gh, yt, npm, etc.)
│   │       ├── snippets.ts          # Text snippet expansion
│   │       ├── notes.ts             # Quick scratchpad notes
│   │       ├── clipboard.ts         # Clipboard history
│   │       ├── page-actions.ts      # Copy as markdown, find on page, reader mode
│   │       ├── dev-tools.ts         # Developer quick actions
│   │       └── navigation.ts        # Go to URL, search Google, reload, scroll
│   ├── storage/
│   │   └── frecency.ts             # Frecency scoring engine
│   ├── popup/
│   │   ├── popup.html
│   │   └── popup.ts
│   └── options/
│       ├── options.html             # Full options page
│       └── options.ts               # Alias editor, snippet manager, site search config
├── public/
│   └── icons/
├── package.json
└── esbuild.config.js
```

---

## Manifest V3 Permissions

```json
{
  "permissions": [
    "tabs",
    "tabGroups",
    "bookmarks",
    "history",
    "sessions",
    "storage",
    "activeTab",
    "clipboardRead",
    "clipboardWrite"
  ],
  "host_permissions": ["<all_urls>"]
}
```

---

## Build Status

### Phase 1 — Core Palette ✅ SHIPPED
- [x] `Cmd+K` / `Ctrl+K` triggers palette on any page
- [x] Palette rendered in **Shadow DOM** (closed mode, full style isolation)
- [x] Fuzzy search across all open tabs (title + URL) via `quickfuzz`
- [x] Match highlighting — matched characters light up in results
- [x] Keyboard navigation: `↑↓` to move, `Enter` to execute, `Esc` to close
- [x] `Tab` to autocomplete selected result name
- [x] `Cmd+Enter` to open in new tab (most-requested missing feature across competitors)
- [x] Switch to tab (across all windows)
- [x] Close tab, new tab, duplicate tab commands
- [x] Navigation: reload, back, forward, scroll top/bottom, copy URL
- [x] URL detection — type `github.com` and it offers direct navigation
- [x] Google search fallback (if no results match, `Enter` searches Google)
- [x] Auto dark/light theme (`prefers-color-scheme`)
- [x] Premium UI: blurred backdrop, smooth scale animation, indigo accent, footer hints
- [x] Lazy initialization — palette DOM only created on first use
- [x] Extension icon + keyboard shortcut both trigger palette
- [x] Tabs shown first in default view (most useful)

---

### Phase 2 — Tab Power Actions ✅ SHIPPED
- [x] Pin / Unpin current tab (`chrome.tabs.update`)
- [x] Mute / Unmute tab
- [x] Move tab to start / end of tab bar (`chrome.tabs.move`)
- [x] Move tab to new window (`chrome.windows.create`)
- [x] Close other tabs (all except active)
- [x] Close tabs to the right
- [x] Close duplicate tabs (same URL)
- [x] Recently closed tabs — searchable undo close (`chrome.sessions.getRecentlyClosed`)
- [x] Frecency tracking — every command execution logged, results sorted by usage

### Phase 3 — Bookmarks & History ✅ SHIPPED
- [x] Search bookmarks (title + URL + folder path in description)
- [x] Search history with relative timestamps ("2h ago", "Yesterday")
- [x] Prefix filters fully wired: `@` tabs, `#` bookmarks, `/` history, `>` commands, `;` snippets

### Phase 4 — Quick Site Search ✅ SHIPPED
- [x] Type keyword + query to search within sites: `gh react` → GitHub search
- [x] 18 built-in engines: `g` `yt` `gh` `npm` `mdn` `so` `w` `r` `tw` `amz` `maps` `drive` `img` `news` `arxiv` `pypi` `crates` `imdb`
- [x] Keyword hints — type just `gh` and see "gh: Search GitHub"
- [x] `Cmd+Enter` opens search in new tab

### Phase 5 — Tab Groups ✅ SHIPPED
- [x] List all tab groups with color indicators
- [x] Collapse / expand group
- [x] Create new tab group (name from query)
- [x] Add current tab to existing group
- [x] Remove tab from group
- [x] Ungroup (dissolve a group)

### Phase 6 — Snippets & Notes ✅ SHIPPED
- [x] Text snippets with trigger keywords (`;sig` → email signature)
- [x] Snippets stored in `chrome.storage.local`
- [x] Dynamic variables: `{{date}}`, `{{time}}`, `{{url}}`, `{{title}}`, `{{domain}}`, `{{year}}`, `{{month}}`, `{{day}}`, `{{iso}}`, `{{datetime}}`
- [x] Snippet fires by selecting → pastes into focused input on page
- [x] Create snippets inline: `trigger | name | body`
- [x] Quick notes: `/note buy milk` saves with timestamp + page URL
- [x] `/notes` lists all notes, searchable
- [x] Copy note text to clipboard on selection

### Phase 7 — Power Features ✅ SHIPPED
- [x] **Custom aliases**: `/alias mail https://mail.google.com`
- [x] **Parameterized quicklinks**: `/alias jira https://company.atlassian.net/browse/%s`
- [x] **Clipboard history**: last 50 copied items, stored locally, auto-expire 7 days, pin support
- [x] **Tab suspend**: `chrome.tabs.discard()` — suspend inactive tabs
- [x] **Multi-tab selection**: Space to toggle select on tabs, batch close/group/pin/suspend
- [x] **Page actions**: copy as markdown `[Title](URL)`, copy all tab URLs, copy metadata (OG, Twitter), copy selection as blockquote, print, fullscreen
- [x] **Developer tools**: view source, copy as cURL, page performance timing, DOM analysis, CSS variables, page links, cookies summary, localStorage keys, list scripts
- [x] **Workflow chains**: Clean Up, Focus Mode, Share Session, Research Mode, Save All Tabs, Morning Routine
- [x] **Per-site commands**: GitHub (PRs, issues, notifications, new repo), YouTube (subscriptions, watch later, history), Google (Gmail, Drive, Calendar), Reddit (saved posts)
- [x] **Import/export**: aliases, snippets, notes as JSON (copy to clipboard / import from clipboard)

---

## Key Implementation Details

### Shadow DOM (Closed Mode)
```typescript
const host = document.createElement('div');
host.id = 'hatch-host';
const shadow = host.attachShadow({ mode: 'closed' });
document.body.appendChild(host);
```

### Message Passing (Content ↔ Background)
All Chrome API calls (tabs, bookmarks, history, sessions) go through the background service worker via `chrome.runtime.sendMessage`. Content scripts cannot access these APIs directly.

### Fuzzy Search (quickfuzz)
```typescript
import { createFuzzySearch } from 'quickfuzz';
const search = createFuzzySearch(items, { threshold: 4, maxResults: 8 });
const results = search.search(query);
// Returns: { item, score, matches[] } — matches are character indices for highlighting
```

### Frecency Algorithm
Score = `frequency * recency_weight`
- Each command execution increments frequency count
- Recency weight decays: last hour = 1.0, today = 0.8, this week = 0.5, older = 0.2
- Stored in `chrome.storage.local` as `{ [commandId]: { count, lastUsed } }`
- Applied as a boost multiplier on fuzzy search scores

### Storage Schema
```typescript
interface StorageSchema {
  // Phase 2
  frecency: Record<string, { count: number; lastUsed: number }>;

  // Phase 4
  siteSearchEngines: SiteSearchEngine[];

  // Phase 6
  snippets: Snippet[];
  notes: Note[];

  // Phase 7
  aliases: Alias[];
  clipboardHistory: ClipboardEntry[];

  // Settings
  settings: HatchSettings;
}
```

---

## UI/UX Spec

### Palette Appearance
- Centered modal, `640px` wide, max `70vh` tall
- Auto dark/light theme via `prefers-color-scheme`
- Blurred backdrop (`backdrop-filter: blur(4px)`)
- Input at top with search icon + ESC hint
- Results list with: icon + name (highlighted matches) + description + category badge
- Footer with keyboard hints + "HATCH" brand
- Smooth open: scale from 0.96 + fade in, 150ms cubic-bezier

### Keyboard Shortcuts
| Key | Action |
|---|---|
| `Cmd+K` / `Ctrl+K` | Open/close palette |
| `↑` / `↓` | Navigate results |
| `Enter` | Execute selected |
| `Cmd+Enter` | Open in new tab |
| `Tab` | Autocomplete selected |
| `Esc` | Close palette |
| `Space` | Toggle select (multi-select mode, Phase 7) |
| `Backspace` (empty input) | Go back to previous context |

### Prefix Filters
| Prefix | Category |
|---|---|
| (none) | All results, frecency-sorted |
| `>` | Commands only |
| `@` | Open tabs only |
| `#` | Bookmarks only |
| `/` | History only |
| `;` | Snippets only |

---

## What NOT to Build

- ❌ No third-party integrations (Notion, Figma, Asana) — they break and need OAuth
- ❌ No AI features — kills the "instant" promise, adds API key dependency
- ❌ No Firefox port yet — nail Chrome first
- ❌ No settings bloat — opinionated defaults, minimal config
- ❌ No persistent sidebar or always-on UI
- ❌ No onboarding wizard — discoverable through use
- ❌ No cloud sync beyond Chrome's built-in `chrome.storage.sync`

---

## Competitive Positioning

**Hatch is "Omni, but alive and extensible."**

| Gap in market | Hatch's answer |
|---|---|
| Omni is abandoned (2+ years stale) | Active development, open source |
| No extension has Cmd+Enter (new tab) | Shipped in Phase 1 |
| No command palette + snippets combo | Phase 6 |
| No user-extensible commands | Phase 7 aliases + quicklinks |
| No quick site search in any palette | Phase 4 (Arc's killer feature) |
| Chrome tab groups have zero keyboard support | Phase 5 |
| The Great Suspender died, 2M users homeless | Phase 7 tab suspend |
| No extension has match highlighting | Shipped in Phase 1 via quickfuzz |
| Cmd+K conflicts with Slack/Notion/GitHub | Configurable shortcut via Chrome commands API |

---

## Dev Notes

- **MV3 service workers have no persistent state between events.** Never store runtime state in the service worker — use `chrome.storage` or message passing.
- **Content script cannot access Chrome APIs** (tabs, bookmarks, history, sessions). Always go through background service worker.
- **Shadow DOM is closed mode.** Page JS cannot access our DOM. Our CSS cannot leak out. Page CSS cannot leak in.
- **Lazy init.** Palette DOM is only created on first `Cmd+K` press, not on page load. This keeps injection cost at zero until needed.
- **quickfuzz `search.search()` returns `{ item, score, matches[] }`.** The `matches` array contains character indices — use these for highlighting in the UI.
