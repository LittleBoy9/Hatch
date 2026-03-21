import type { HatchCommand, CommandContext } from '../../types';
import { sendMessage } from './tabs';

// ─── Built-in Search Engines ─────────────────────────────────

export interface SiteSearchEngine {
  keyword: string;
  name: string;
  urlTemplate: string;  // %s replaced with query
  icon: string;
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

// ─── Site Search Detection ───────────────────────────────────

/**
 * Check if the query matches a site search pattern (e.g., "gh react").
 * Returns a command if matched, null otherwise.
 */
export function getSiteSearchCommand(query: string): HatchCommand | null {
  const spaceIdx = query.indexOf(' ');
  if (spaceIdx === -1) return null;

  const keyword = query.slice(0, spaceIdx).toLowerCase();
  const searchQuery = query.slice(spaceIdx + 1).trim();
  if (!searchQuery) return null;

  const engine = BUILT_IN_ENGINES.find((e) => e.keyword === keyword);
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
 * When user types just a keyword (no space yet), show hint commands
 * for available site search engines.
 */
export function getSiteSearchHints(query: string): HatchCommand[] {
  if (!query || query.includes(' ')) return [];

  const q = query.toLowerCase();
  return BUILT_IN_ENGINES
    .filter((e) => e.keyword.startsWith(q) || e.name.toLowerCase().startsWith(q))
    .slice(0, 3)
    .map((engine) => ({
      id: `site-hint-${engine.keyword}`,
      name: `${engine.keyword}: Search ${engine.name}`,
      description: `Type "${engine.keyword} <query>" to search`,
      keywords: [engine.keyword, engine.name],
      icon: engine.icon,
      category: 'search' as const,
      action: (ctx: CommandContext) => {
        // Don't execute — this is just a hint. But if they press enter,
        // put the keyword + space into the input for them.
        // We can't modify input from here, so just open the site
        sendMessage({ type: 'CREATE_TAB', url: engine.urlTemplate.replace('%s', '') });
        ctx.close();
      },
    }));
}
