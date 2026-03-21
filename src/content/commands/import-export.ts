import type { HatchCommand, CommandContext, Snippet, Alias } from '../../types';
import { sendMessage } from './tabs';

export const importExportCommands: HatchCommand[] = [
  {
    id: 'export-data',
    name: 'Export Hatch Data',
    description: 'Copy aliases, snippets, and settings as JSON to clipboard',
    keywords: ['export', 'backup', 'save', 'json', 'data'],
    icon: '📤',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const [aliases, snippets, notes] = await Promise.all([
        sendMessage<Alias[]>({ type: 'GET_ALIASES' }),
        sendMessage<Snippet[]>({ type: 'GET_SNIPPETS' }),
        sendMessage<unknown[]>({ type: 'GET_NOTES' }),
      ]);

      const data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        aliases: aliases || [],
        snippets: snippets || [],
        notes: notes || [],
      };

      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      ctx.close();
    },
  },
  {
    id: 'import-data',
    name: 'Import Hatch Data',
    description: 'Import aliases and snippets from clipboard JSON',
    keywords: ['import', 'restore', 'load', 'json', 'data'],
    icon: '📥',
    category: 'command',
    action: async (ctx: CommandContext) => {
      try {
        const text = await navigator.clipboard.readText();
        const data = JSON.parse(text);

        if (data.version !== 1) {
          console.warn('[Hatch] Unknown import format version');
          ctx.close();
          return;
        }

        // Import aliases
        if (Array.isArray(data.aliases)) {
          for (const alias of data.aliases) {
            if (alias.id && alias.keyword && alias.url) {
              await sendMessage({ type: 'SAVE_ALIAS', alias });
            }
          }
        }

        // Import snippets
        if (Array.isArray(data.snippets)) {
          for (const snippet of data.snippets) {
            if (snippet.id && snippet.trigger && snippet.body) {
              await sendMessage({ type: 'SAVE_SNIPPET', snippet });
            }
          }
        }

        // Import notes
        if (Array.isArray(data.notes)) {
          for (const note of data.notes) {
            if (note.id && note.text) {
              await sendMessage({ type: 'SAVE_NOTE', note });
            }
          }
        }
      } catch (err) {
        console.error('[Hatch] Import failed:', err);
      }
      ctx.close();
    },
  },
];
