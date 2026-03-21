import type { HatchCommand, BookmarkInfo, CommandContext } from '../../types';
import { sendMessage } from './tabs';

function truncateUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname === '/' ? '' : u.pathname;
    const full = u.hostname + path;
    return full.length > 55 ? full.slice(0, 52) + '...' : full;
  } catch {
    return url.slice(0, 55);
  }
}

function getFaviconFromUrl(url: string): string {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
  } catch {
    return '';
  }
}

export async function getBookmarkCommands(): Promise<HatchCommand[]> {
  const bookmarks = await sendMessage<BookmarkInfo[]>({ type: 'GET_ALL_BOOKMARKS' });
  if (!bookmarks || !bookmarks.length) return [];

  return bookmarks.map((bm) => {
    const desc = bm.folderPath
      ? `${bm.folderPath} · ${truncateUrl(bm.url)}`
      : truncateUrl(bm.url);

    return {
      id: `bookmark-${bm.id}`,
      name: bm.title || 'Untitled',
      description: desc,
      keywords: [bm.title, bm.url, bm.folderPath].filter(Boolean) as string[],
      icon: getFaviconFromUrl(bm.url),
      category: 'bookmark' as const,
      prefix: '#',
      action: (ctx: CommandContext) => {
        if (ctx.metaKey) {
          sendMessage({ type: 'CREATE_TAB', url: bm.url });
        } else {
          window.location.href = bm.url;
        }
        ctx.close();
      },
    };
  });
}
