import type { HatchCommand, ClosedTabInfo, CommandContext } from '../../types';
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
  return `${days}d ago`;
}

function getFaviconFromUrl(url: string): string {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
  } catch {
    return '';
  }
}

export async function getRecentlyClosedCommands(): Promise<HatchCommand[]> {
  const closed = await sendMessage<ClosedTabInfo[]>({ type: 'GET_RECENTLY_CLOSED', maxResults: 25 });
  if (!closed || !closed.length) return [];

  return closed.map((item) => ({
    id: `restore-${item.sessionId}`,
    name: item.title || 'Untitled',
    description: `Closed ${timeAgo(item.closedAt)}`,
    keywords: [item.title, item.url].filter(Boolean) as string[],
    icon: item.favIconUrl || getFaviconFromUrl(item.url),
    category: 'session' as const,
    action: (ctx: CommandContext) => {
      sendMessage({ type: 'RESTORE_SESSION', sessionId: item.sessionId });
      ctx.close();
    },
  }));
}
