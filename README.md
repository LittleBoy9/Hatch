<p align="center">
  <img src="public/icons/icon-128.png" alt="Hatch" width="80" />
</p>

<h1 align="center">Hatch</h1>

<p align="center">
  <strong>A universal <code>Cmd+K</code> command palette for the browser.</strong><br>
  Like Raycast, but living inside Chrome. 80+ commands. Zero servers. Blazing fast.
</p>

<p align="center">
  <a href="#installation">Install</a> &middot;
  <a href="#usage">Usage</a> &middot;
  <a href="#commands">Commands</a> &middot;
  <a href="#features">Features</a> &middot;
  <a href="#build">Build</a>
</p>

---

## Why Hatch?

Every productivity tool on your computer has a command palette &mdash; VS Code, Raycast, Figma, Slack. Your browser doesn't. Hatch fixes that.

- **Keyboard-first.** Mouse is never required.
- **Instant.** Opens in <50ms. Fuzzy search as you type.
- **Extensible.** Create your own aliases, snippets, search engines.
- **Local-only.** No accounts, no telemetry, no servers. Everything stays on your machine.
- **Lightweight.** ~29KB bundle. No React. No framework overhead.

---

## Installation

### From source (developer)

```bash
git clone https://github.com/your-username/hatch.git
cd hatch
npm install
npm run build
```

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked** and select the `dist/` folder
4. Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) on any page

---

## Usage

### Open the palette

| Shortcut | Action |
|---|---|
| `Cmd+K` / `Ctrl+K` | Open or close the palette |

### Navigate results

| Key | Action |
|---|---|
| `↑` / `↓` | Move through results |
| `Enter` | Execute the selected command |
| `Cmd+Enter` | Open in a new tab (tabs, bookmarks, URLs) |
| `Tab` | Autocomplete the selected result name |
| `Esc` | Close the palette |
| `Space` | Toggle multi-select (for batch tab operations) |
| `Backspace` (empty input) | Go back from sub-view |

### Prefix filters

Narrow results to a specific category by starting your query with a prefix:

| Prefix | Category | Example |
|---|---|---|
| `@` | Open tabs | `@gmail` &mdash; find your Gmail tab |
| `#` | Bookmarks | `#react` &mdash; search bookmarks |
| `/` | History | `/stackoverflow` &mdash; find in history |
| `>` | Commands | `>close` &mdash; find tab/page commands |
| `;` | Snippets | `;sig` &mdash; find and paste a snippet |

### Quick site search

Type a keyword followed by your query to search within a site:

```
gh react hooks       → Search GitHub for "react hooks"
yt lofi beats        → Search YouTube for "lofi beats"
npm express          → Search NPM for "express"
so async await       → Search Stack Overflow for "async await"
```

### Inline commands

| Command | What it does |
|---|---|
| `/note buy milk` | Save a quick note with timestamp and page URL |
| `/notes` | List all saved notes |
| `/alias mail https://mail.google.com` | Create a keyword alias |
| `/alias jira https://company.atlassian.net/browse/%s` | Create a parameterized quicklink |
| `/engine jira Jira https://company.atlassian.net/browse?q=%s` | Add a custom search engine |

### URL navigation

Type any URL directly (e.g., `github.com`) and Hatch offers to navigate there. If nothing matches, `Enter` searches Google.

---

## Commands

### Tab Management

| Command | Description |
|---|---|
| **Switch to Tab** | Type any tab's title or URL to switch to it. `Cmd+Enter` duplicates instead. |
| **New Tab** | Open a new blank tab |
| **Close Current Tab** | Close the active tab |
| **Duplicate Tab** | Clone the current tab |
| **Pin / Unpin Tab** | Toggle pin on the current tab |
| **Mute / Unmute Tab** | Toggle audio mute |
| **Move Tab to Start** | Move tab to the beginning of the tab bar |
| **Move Tab to End** | Move tab to the end of the tab bar |
| **Move Tab to New Window** | Detach tab into its own window |
| **Close Other Tabs** | Close all tabs except the current one (keeps pinned) |
| **Close Tabs to the Right** | Close all tabs after the current one |
| **Close Duplicate Tabs** | Deduplicate tabs with the same URL |
| **Suspend Other Tabs** | Discard inactive tabs to free memory |
| **Suspend All Background Tabs** | Discard all tabs except the active one |

### Tab Groups

| Command | Description |
|---|---|
| **Create Tab Group** | Group the current tab into a new named group |
| **Collapse / Expand Group** | Toggle group visibility (shown per-group) |
| **Add Tab to Group** | Move current tab into an existing group |
| **Ungroup** | Dissolve a tab group |
| **Remove Tab from Group** | Ungroup the current tab only |

### Multi-Select (Batch Operations)

Press `Space` on any tab result to select it. Select multiple tabs, then:

- **Close Selected** &mdash; close all selected tabs at once
- **Group Selected** &mdash; create a new group from selected tabs
- **Pin Selected** &mdash; pin all selected tabs
- **Suspend Selected** &mdash; discard all selected tabs

### Bookmarks & History

| Command | Description |
|---|---|
| **Search Bookmarks** | Use `#` prefix. Shows folder path and favicon. |
| **Search History** | Use `/` prefix. Shows relative timestamps ("2h ago", "Yesterday"). |
| **Recently Closed Tabs** | Searchable undo-close from `chrome.sessions`. |

### Navigation

| Command | Description |
|---|---|
| **Reload Page** | Refresh the current page |
| **Go Back** | Navigate back in history |
| **Go Forward** | Navigate forward in history |
| **Scroll to Top** | Smooth scroll to page top |
| **Scroll to Bottom** | Smooth scroll to page bottom |
| **Copy Current URL** | Copy the page URL to clipboard |
| **Go to URL** | Type any URL to navigate directly |
| **Search Google** | Fallback &mdash; any unmatched query searches Google |

### Quick Site Search (18 built-in engines)

| Keyword | Site | Example |
|---|---|---|
| `g` | Google | `g typescript generics` |
| `yt` | YouTube | `yt lofi hip hop` |
| `gh` | GitHub | `gh react` |
| `npm` | NPM | `npm express` |
| `mdn` | MDN Web Docs | `mdn fetch api` |
| `so` | Stack Overflow | `so python list comprehension` |
| `w` | Wikipedia | `w alan turing` |
| `r` | Reddit | `r mechanical keyboards` |
| `tw` | X (Twitter) | `tw javascript` |
| `amz` | Amazon | `amz usb c cable` |
| `maps` | Google Maps | `maps coffee near me` |
| `drive` | Google Drive | `drive project proposal` |
| `img` | Google Images | `img sunset wallpaper` |
| `news` | Google News | `news tech layoffs` |
| `arxiv` | arXiv | `arxiv transformer attention` |
| `pypi` | PyPI | `pypi requests` |
| `crates` | crates.io | `crates serde` |
| `imdb` | IMDb | `imdb interstellar` |

Add your own with `/engine keyword Name https://example.com/search?q=%s`.

### Snippets

Create reusable text snippets that expand with one keystroke.

| Command | Description |
|---|---|
| **Create Snippet** | Opens an inline editor to define trigger, name, and body |
| **Use Snippet** | Select a snippet to paste it into the focused input |

**Dynamic variables** &mdash; use these in snippet bodies:

| Variable | Expands to |
|---|---|
| `{{date}}` | Current date (locale format) |
| `{{time}}` | Current time |
| `{{datetime}}` | Full date + time |
| `{{iso}}` | ISO 8601 timestamp |
| `{{url}}` | Current page URL |
| `{{title}}` | Current page title |
| `{{domain}}` | Current hostname |
| `{{year}}` | 4-digit year |
| `{{month}}` | 2-digit month |
| `{{day}}` | 2-digit day |

**Example:** A snippet with trigger `;sig` and body:
```
Best regards,
Sounak Das
Sent on {{date}} from {{domain}}
```

### Notes

| Command | Description |
|---|---|
| `/note buy milk` | Save a quick note (stores timestamp + page URL) |
| `/notes` | List all saved notes |
| **Select a note** | Copies the note text to clipboard |
| **Clear All Notes** | Delete all saved notes |

### Aliases & Quicklinks

| Command | Description |
|---|---|
| **Create Alias** | Opens inline editor, or use `/alias keyword url` |
| **Manage Aliases** | Opens the settings page |
| `mail` | If you created `/alias mail https://mail.google.com`, just type `mail` |
| `jira PROJ-123` | Parameterized alias &mdash; `%s` is replaced with your query |

### Clipboard History

| Command | Description |
|---|---|
| **Clipboard items** | Last 50 copied items, auto-captured from `copy` events |
| **Select item** | Copies it back to clipboard |
| **Clear Clipboard History** | Delete all entries |

Items auto-expire after 7 days. Pinned items are preserved.

### Page Actions

| Command | Description |
|---|---|
| **Copy as Markdown Link** | Copies `[Page Title](URL)` |
| **Copy Page Title** | Copies just the title |
| **Copy All Tab URLs** | Copies URLs of every open tab |
| **Copy All Tabs as Markdown** | Copies all tabs as `- [Title](URL)` |
| **Copy Page Metadata** | Copies title, description, OG tags, Twitter cards |
| **Copy Selection as Markdown Quote** | Wraps selected text in `> blockquote` with source |
| **Find on Page** | Triggers browser's Ctrl+F |
| **Print Page** | Opens print dialog |
| **Toggle Fullscreen** | Enter/exit fullscreen |

### Developer Tools

| Command | Description |
|---|---|
| **View Page Source** | Opens `view-source:` in a new tab |
| **Copy Page URL as cURL** | Generates a `curl` command for the current page |
| **Copy Page Performance Timing** | DNS, TCP, TLS, TTFB, DOM timings |
| **Copy CSS Custom Properties** | Lists all CSS variables defined on `:root` |
| **List Page Scripts** | Copies all external script sources |
| **Count DOM Elements** | Total elements, max nesting depth, top tags |
| **Copy Page Links** | Copies all anchor hrefs on the page |
| **Copy Cookies Summary** | Lists cookie names and sizes |
| **Copy Local Storage Keys** | Lists all localStorage keys for the domain |

### Workflows (One-click automations)

| Command | What it does |
|---|---|
| **Clean Up Tabs** | Close duplicates, then suspend inactive tabs |
| **Focus Mode** | Pin current tab, close everything else |
| **Share Session** | Copy all tabs as a markdown list |
| **Research Mode** | Create a named tab group with 3 blank tabs |
| **Save All Tabs as Bookmarks** | Copy all tabs as text for backup |
| **Morning Routine** | Open Gmail, Calendar, and GitHub |

### Per-Site Commands

Context-aware commands that only appear on specific sites:

**GitHub** &mdash; My Pull Requests, My Issues, Notifications, New Repository
**YouTube** &mdash; Subscriptions, Watch Later, Watch History
**Google** &mdash; Open Gmail, Open Drive, Open Calendar
**Reddit** &mdash; Saved Posts

### Settings & Data

| Command | Description |
|---|---|
| **Open Hatch Settings** | Full settings page with editors for all data |
| **Theme: Dark / Light / System Auto** | Switch palette theme |
| **Export Hatch Data** | Copy all aliases, snippets, notes as JSON |
| **Import Hatch Data** | Restore from clipboard JSON |
| **Add Search Engine** | Opens the search engine editor |

---

## Features

### Fuzzy Search
Powered by [quickfuzz](https://www.npmjs.com/package/quickfuzz) &mdash; a zero-dependency fuzzy search library with built-in match highlighting. ~7x faster than Fuse.js.

### Frecency Ranking
Commands you use frequently and recently bubble to the top. Score = `frequency x recency_weight`. Your top 5 most-used commands appear in a "Recently Used" section.

### Shadow DOM Isolation
The palette UI is rendered inside a **closed Shadow DOM**. Page styles can't leak in. Hatch styles can't leak out. Works on every website.

### Conflict Handling
Hatch intercepts `Cmd+K` even on sites that use it natively (Slack, Notion, GitHub, Linear, Figma, Discord, YouTube, Twitter, Reddit, Gmail, Google Docs) using capture-phase event listeners with `stopImmediatePropagation`.

### Theming
Three modes: **Dark**, **Light**, and **System Auto**. Switch via the palette (`Theme: Dark`). Follows `prefers-color-scheme` by default.

---

## Build

```bash
npm install        # install dependencies
npm run build      # production build → dist/
npm run watch      # dev mode with file watching
npm run clean      # remove dist/
```

The build uses [esbuild](https://esbuild.github.io/) with 4 entry points:

| Entry | Output | Purpose |
|---|---|---|
| `src/content/index.ts` | `dist/content.js` | Injected into every page |
| `src/background/service-worker.ts` | `dist/service-worker.js` | Chrome background worker |
| `src/popup/popup.ts` | `dist/popup.js` | Extension popup |
| `src/options/options.ts` | `dist/options.js` | Settings page |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Extension APIs | Chrome Manifest V3 |
| UI | Vanilla TypeScript + CSS (no framework) |
| Fuzzy Search | [quickfuzz](https://www.npmjs.com/package/quickfuzz) |
| Storage | `chrome.storage.local` |
| Bundler | esbuild |
| Language | TypeScript |

---

## Permissions

Hatch requests only the permissions it needs:

| Permission | Why |
|---|---|
| `tabs` | Switch, close, pin, mute, move tabs |
| `tabGroups` | Create, collapse, manage tab groups |
| `bookmarks` | Search bookmarks |
| `history` | Search browsing history |
| `sessions` | Access recently closed tabs |
| `storage` | Store snippets, aliases, notes, settings locally |
| `activeTab` | Access current tab info |
| `clipboardRead/Write` | Clipboard history, copy/paste operations |

No data leaves your browser. Ever.

---

## License

MIT

---

<p align="center">
  Built by <a href="https://github.com/littleboy9">Sounak Das</a>
</p>
