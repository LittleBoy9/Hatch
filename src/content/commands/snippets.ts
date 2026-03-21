import type { HatchCommand, CommandContext, Snippet } from '../../types';
import { sendMessage } from './tabs';

// ─── Dynamic Variables ───────────────────────────────────────

function expandVariables(body: string): string {
  const now = new Date();
  return body
    .replace(/\{\{date\}\}/g, now.toLocaleDateString())
    .replace(/\{\{time\}\}/g, now.toLocaleTimeString())
    .replace(/\{\{datetime\}\}/g, now.toLocaleString())
    .replace(/\{\{iso\}\}/g, now.toISOString())
    .replace(/\{\{url\}\}/g, window.location.href)
    .replace(/\{\{title\}\}/g, document.title)
    .replace(/\{\{domain\}\}/g, window.location.hostname)
    .replace(/\{\{year\}\}/g, String(now.getFullYear()))
    .replace(/\{\{month\}\}/g, String(now.getMonth() + 1).padStart(2, '0'))
    .replace(/\{\{day\}\}/g, String(now.getDate()).padStart(2, '0'));
}

/**
 * Paste text into the currently focused element on the page.
 */
function pasteText(text: string): void {
  const el = document.activeElement;
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0, start) + text + el.value.slice(end);
    el.selectionStart = el.selectionEnd = start + text.length;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  } else if (el instanceof HTMLElement && el.isContentEditable) {
    document.execCommand('insertText', false, text);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(text);
  }
}

// ─── Snippet Commands ────────────────────────────────────────

export async function getSnippetCommands(): Promise<HatchCommand[]> {
  const snippets = await sendMessage<Snippet[]>({ type: 'GET_SNIPPETS' });
  if (!snippets || snippets.length === 0) return [];

  return snippets.map((snippet) => ({
    id: `snippet-${snippet.id}`,
    name: snippet.name,
    description: `${snippet.trigger} → ${snippet.body.slice(0, 50)}${snippet.body.length > 50 ? '...' : ''}`,
    keywords: ['snippet', snippet.trigger, snippet.name],
    icon: '✂',
    category: 'snippet' as const,
    action: (ctx: CommandContext) => {
      const expanded = expandVariables(snippet.body);
      ctx.close();
      // Delay paste to let palette close and return focus to the page input
      setTimeout(() => pasteText(expanded), 150);
    },
  }));
}

// ─── Static Snippet Management Commands ──────────────────────

export const staticSnippetCommands: HatchCommand[] = [
  {
    id: 'create-snippet',
    name: 'Create Snippet',
    description: 'Save a text snippet with a trigger keyword',
    keywords: ['create', 'new', 'snippet', 'add'],
    icon: '➕',
    category: 'snippet',
    action: async (ctx: CommandContext) => {
      // Parse: "trigger | name | body" or just use query as body
      const parts = ctx.query
        .replace(/^[>;]\s*create\s*snippet\s*/i, '')
        .split('|')
        .map((s) => s.trim());

      if (parts.length >= 3) {
        const snippet: Snippet = {
          id: `snip-${Date.now()}`,
          trigger: parts[0].startsWith(';') ? parts[0] : `;${parts[0]}`,
          name: parts[1],
          body: parts[2],
        };
        await sendMessage({ type: 'SAVE_SNIPPET', snippet });
      }
      ctx.close();
    },
  },
];
