import type { HatchCommand, HistoryItem, CommandContext } from '../../types';
import { sendMessage } from './tabs';

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

function truncateUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname === '/' ? '' : u.pathname;
    const full = u.hostname + path;
    return full.length > 50 ? full.slice(0, 47) + '...' : full;
  } catch {
    return url.slice(0, 50);
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

export async function getHistoryCommands(): Promise<HatchCommand[]> {
  // Get recent history (empty query = recent items)
  const items = await sendMessage<HistoryItem[]>({ type: 'SEARCH_HISTORY', query: '', maxResults: 50 });
  if (!items || !items.length) return [];

  return items.map((item) => {
    const time = timeAgo(item.lastVisitTime);
    const visits = item.visitCount > 1 ? ` · ${item.visitCount} visits` : '';

    return {
      id: `history-${item.id}`,
      name: item.title || 'Untitled',
      description: `${time}${visits} · ${truncateUrl(item.url)}`,
      keywords: [item.title, item.url].filter(Boolean) as string[],
      icon: getFaviconFromUrl(item.url),
      category: 'history' as const,
      prefix: '/',
      action: (ctx: CommandContext) => {
        if (ctx.metaKey) {
          sendMessage({ type: 'CREATE_TAB', url: item.url });
        } else {
          window.location.href = item.url;
        }
        ctx.close();
      },
    };
  });
}
