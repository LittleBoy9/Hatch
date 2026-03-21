import type { HatchCommand, CommandContext, Note } from '../../types';
import { sendMessage } from './tabs';

// ─── Time Formatting ─────────────────────────────────────────

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

// ─── Dynamic Note Commands ───────────────────────────────────

export async function getNoteCommands(): Promise<HatchCommand[]> {
  const notes = await sendMessage<Note[]>({ type: 'GET_NOTES' });
  if (!notes || notes.length === 0) return [];

  return notes.slice(0, 20).map((note) => ({
    id: `note-${note.id}`,
    name: note.text.slice(0, 80),
    description: `${timeAgo(note.createdAt)} · ${note.title || note.url}`,
    keywords: ['note', ...note.text.split(' ').slice(0, 5)],
    icon: '📝',
    category: 'note' as const,
    action: async (ctx: CommandContext) => {
      // Copy note text to clipboard
      await navigator.clipboard.writeText(note.text);
      ctx.close();
    },
  }));
}

// ─── Note Detection ──────────────────────────────────────────

/**
 * Detects if query is a note command: "/note buy milk"
 * Returns a save-note command if matched.
 */
export function getNoteCommand(query: string): HatchCommand | null {
  const match = query.match(/^\/note\s+(.+)/i);
  if (!match) return null;

  const noteText = match[1].trim();
  if (!noteText) return null;

  return {
    id: 'save-note',
    name: `Save Note: "${noteText}"`,
    description: 'Press Enter to save',
    keywords: ['note', 'save'],
    icon: '📝',
    category: 'note',
    action: async (ctx: CommandContext) => {
      const note: Note = {
        id: `note-${Date.now()}`,
        text: noteText,
        url: window.location.href,
        title: document.title,
        createdAt: Date.now(),
      };
      await sendMessage({ type: 'SAVE_NOTE', note });
      ctx.close();
    },
  };
}

/**
 * Detects "/notes" query to list all notes.
 * Returns a marker command — actual note list comes from dynamic provider.
 */
export function isNotesQuery(query: string): boolean {
  return /^\/notes?\s*$/i.test(query);
}

// ─── Static Note Commands ────────────────────────────────────

export const staticNoteCommands: HatchCommand[] = [
  {
    id: 'clear-all-notes',
    name: 'Clear All Notes',
    description: 'Delete all saved notes',
    keywords: ['clear', 'delete', 'all', 'notes'],
    icon: '🗑',
    category: 'note',
    action: async (ctx: CommandContext) => {
      const notes = await sendMessage<Note[]>({ type: 'GET_NOTES' });
      if (notes) {
        for (const note of notes) {
          await sendMessage({ type: 'DELETE_NOTE', id: note.id });
        }
      }
      ctx.close();
    },
  },
];
