import type { HatchCommand, CommandContext, ClipboardEntry } from '../../types';
import { sendMessage } from './tabs';

// ─── Clipboard Listener (called from content index.ts) ───────

let lastClipboardText = '';

export function initClipboardListener(): void {
  document.addEventListener('copy', async () => {
    try {
      // Small delay to let the clipboard populate
      await new Promise((r) => setTimeout(r, 50));
      const text = await navigator.clipboard.readText();
      if (text && text !== lastClipboardText && text.trim().length > 0) {
        lastClipboardText = text;
        const item: ClipboardEntry = {
          id: `clip-${Date.now()}`,
          text,
          timestamp: Date.now(),
          source: window.location.hostname,
        };
        sendMessage({ type: 'SAVE_CLIPBOARD_ITEM', item });
      }
    } catch {
      // Clipboard read may fail without focus/permissions
    }
  });
}

// ─── Dynamic Clipboard Commands ──────────────────────────────

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export async function getClipboardCommands(): Promise<HatchCommand[]> {
  const history = await sendMessage<ClipboardEntry[]>({ type: 'GET_CLIPBOARD_HISTORY' });
  if (!history || history.length === 0) return [];

  return history.slice(0, 30).map((entry) => ({
    id: `clip-${entry.id}`,
    name: entry.text.slice(0, 80).replace(/\n/g, ' '),
    description: `${entry.pinned ? '📌 ' : ''}${timeAgo(entry.timestamp)} · ${entry.source}`,
    keywords: ['clipboard', 'paste', 'history', ...entry.text.split(' ').slice(0, 3)],
    icon: entry.pinned ? '📌' : '📋',
    category: 'clipboard' as const,
    action: async (ctx: CommandContext) => {
      await navigator.clipboard.writeText(entry.text);
      ctx.close();
    },
  }));
}

// ─── Static Clipboard Commands ───────────────────────────────

export const staticClipboardCommands: HatchCommand[] = [
  {
    id: 'clear-clipboard-history',
    name: 'Clear Clipboard History',
    description: 'Delete all clipboard history entries',
    keywords: ['clear', 'clipboard', 'history', 'delete'],
    icon: '🗑',
    category: 'clipboard',
    action: async (ctx: CommandContext) => {
      await sendMessage({ type: 'CLEAR_CLIPBOARD_HISTORY' });
      ctx.close();
    },
  },
];
