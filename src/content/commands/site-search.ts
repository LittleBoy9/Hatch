import type { HatchCommand, CommandContext } from '../../types';
import { sendMessage } from './tabs';

// ─── Built-in Search Engines ─────────────────────────────────

export interface SiteSearchEngine {
  keyword: string;
  name: string;
  urlTemplate: string;  // %s replaced with query
  icon: string;
  custom?: boolean;
}

const BUILT_IN_ENGINES: SiteSearchEngine[] = [
  { keyword: 'g',     name: 'Google',           urlTemplate: 'https://www.google.com/search?q=%s',                       icon: '🔍' },
  { keyword: 'yt',    name: 'YouTube',           urlTemplate: 'https://www.youtube.com/results?search_query=%s',          icon: '▶' },
  { keyword: 'gh',    name: 'GitHub',            urlTemplate: 'https://github.com/search?q=%s',                           icon: '🐙' },
  { keyword: 'npm',   name: 'NPM',              urlTemplate: 'https://www.npmjs.com/search?q=%s',                        icon: '📦' },
  { keyword: 'mdn',   name: 'MDN Web Docs',      urlTemplate: 'https://developer.mozilla.org/en-US/search?q=%s',          icon: '📘' },
  { keyword: 'so',    name: 'Stack Overflow',    urlTemplate: 'https://stackoverflow.com/search?q=%s',                   icon: '📚' },
  { keyword: 'w',     name: 'Wikipedia',         urlTemplate: 'https://en.wikipedia.org/w/index.php?search=%s',           icon: '🌐' },
  { keyword: 'r',     name: 'Reddit',            urlTemplate: 'https://www.reddit.com/search/?q=%s',                     icon: '💬' },
  { keyword: 'tw',    name: 'X (Twitter)',       urlTemplate: 'https://x.com/search?q=%s',                               icon: '𝕏' },
  { keyword: 'amz',   name: 'Amazon',            urlTemplate: 'https://www.amazon.com/s?k=%s',                            icon: '🛒' },
  { keyword: 'maps',  name: 'Google Maps',       urlTemplate: 'https://www.google.com/maps/search/%s',                   icon: '🗺' },
  { keyword: 'drive', name: 'Google Drive',      urlTemplate: 'https://drive.google.com/drive/search?q=%s',              icon: '💾' },
  { keyword: 'img',   name: 'Google Images',     urlTemplate: 'https://www.google.com/search?tbm=isch&q=%s',             icon: '🖼' },
  { keyword: 'news',  name: 'Google News',       urlTemplate: 'https://news.google.com/search?q=%s',                     icon: '📰' },
  { keyword: 'arxiv', name: 'arXiv',             urlTemplate: 'https://arxiv.org/search/?query=%s',                      icon: '📄' },
  { keyword: 'pypi',  name: 'PyPI',              urlTemplate: 'https://pypi.org/search/?q=%s',                            icon: '🐍' },
  { keyword: 'crates',name: 'crates.io',         urlTemplate: 'https://crates.io/search?q=%s',                           icon: '🦀' },
  { keyword: 'imdb',  name: 'IMDb',              urlTemplate: 'https://www.imdb.com/find/?q=%s',                          icon: '🎬' },
];

// ─── Custom Engine Storage ───────────────────────────────────

let cachedEngines: SiteSearchEngine[] | null = null;

async function getAllEngines(): Promise<SiteSearchEngine[]> {
  if (cachedEngines) return cachedEngines;

  return new Promise((resolve) => {
    chrome.storage.local.get('customSearchEngines', (data: Record<string, unknown>) => {
      const custom = (data?.customSearchEngines as SiteSearchEngine[]) || [];
      // Custom engines override built-in ones with the same keyword
      const customKeywords = new Set(custom.map((e) => e.keyword));
      const merged = [
        ...custom.map((e) => ({ ...e, custom: true })),
        ...BUILT_IN_ENGINES.filter((e) => !customKeywords.has(e.keyword)),
      ];
      cachedEngines = merged;
      // Invalidate cache after 5 seconds so new engines are picked up
      setTimeout(() => { cachedEngines = null; }, 5000);
      resolve(merged);
    });
  });
}

// ─── Create Custom Engine Command ────────────────────────────

/**
 * Detects `/engine keyword name url_template` and returns a command to save it.
 * Example: /engine jira Jira https://company.atlassian.net/browse?q=%s
 */
export function getCreateEngineCommand(query: string): HatchCommand | null {
  const match = query.match(/^\/engine\s+(\S+)\s+(\S+)\s+(\S+.*)$/i);
  if (!match) return null;

  const [, keyword, name, urlTemplate] = match;
  if (!urlTemplate.includes('%s')) return null;

  return {
    id: 'create-engine',
    name: `Add search engine: ${keyword} → ${name}`,
    description: `URL: ${urlTemplate}`,
    keywords: ['engine', 'search', 'add', 'custom'],
    icon: '🔧',
    category: 'command',
    action: (ctx: CommandContext) => {
      chrome.storage.local.get('customSearchEngines', (data: Record<string, unknown>) => {
        const engines = (data?.customSearchEngines as SiteSearchEngine[]) || [];
        // Remove existing with same keyword
        const filtered = engines.filter((e) => e.keyword !== keyword);
        filtered.push({ keyword, name, urlTemplate, icon: '🔎', custom: true });
        chrome.storage.local.set({ customSearchEngines: filtered });
        cachedEngines = null; // invalidate cache
      });
      ctx.close();
    },
  };
}

// ─── Site Search Detection ───────────────────────────────────

/**
 * Check if the query matches a site search pattern (e.g., "gh react").
 * Returns a command if matched, null otherwise.
 */
export async function getSiteSearchCommand(query: string): Promise<HatchCommand | null> {
  const spaceIdx = query.indexOf(' ');
  if (spaceIdx === -1) return null;

  const keyword = query.slice(0, spaceIdx).toLowerCase();
  const searchQuery = query.slice(spaceIdx + 1).trim();
  if (!searchQuery) return null;

  const engines = await getAllEngines();
  const engine = engines.find((e) => e.keyword === keyword);
  if (!engine) return null;

  const url = engine.urlTemplate.replace('%s', encodeURIComponent(searchQuery));

  return {
    id: `site-search-${engine.keyword}`,
    name: `Search ${engine.name} for "${searchQuery}"`,
    description: `${engine.keyword} → ${engine.name}`,
    keywords: [engine.keyword, engine.name, searchQuery],
    icon: engine.icon,
    category: 'search',
    action: (ctx: CommandContext) => {
      if (ctx.metaKey) {
        sendMessage({ type: 'CREATE_TAB', url });
      } else {
        window.location.href = url;
      }
      ctx.close();
    },
  };
}

/**
 * When user types just a keyword (no space yet), show hint commands.
 */
export async function getSiteSearchHints(query: string): Promise<HatchCommand[]> {
  if (!query || query.includes(' ')) return [];

  const q = query.toLowerCase();
  const engines = await getAllEngines();
  return engines
    .filter((e) => e.keyword.startsWith(q) || e.name.toLowerCase().startsWith(q))
    .slice(0, 3)
    .map((engine) => ({
      id: `site-hint-${engine.keyword}`,
      name: `${engine.keyword}: Search ${engine.name}`,
      description: `Type "${engine.keyword} <query>" to search${engine.custom ? ' (custom)' : ''}`,
      keywords: [engine.keyword, engine.name],
      icon: engine.icon,
      category: 'search' as const,
      action: (ctx: CommandContext) => {
        sendMessage({ type: 'CREATE_TAB', url: engine.urlTemplate.replace('%s', '') });
        ctx.close();
      },
    }));
}

// ─── Static Search Engine Commands ───────────────────────────

export const staticSearchEngineCommands: HatchCommand[] = [
  {
    id: 'add-search-engine',
    name: 'Add Search Engine',
    description: 'Open the search engine editor',
    keywords: ['add', 'create', 'search', 'engine', 'site'],
    icon: '➕',
    category: 'command',
    action: (ctx: CommandContext) => {
      ctx.showEditor('engine');
    },
  },
];
