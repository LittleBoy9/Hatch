import type { HatchCommand, CommandContext, Alias } from '../../types';
import { sendMessage } from './tabs';

// ─── Dynamic Alias Commands ──────────────────────────────────

export async function getAliasCommands(): Promise<HatchCommand[]> {
  const aliases = await sendMessage<Alias[]>({ type: 'GET_ALIASES' });
  if (!aliases || aliases.length === 0) return [];

  // Aliases saved by older versions only have { keyword, url }
  return aliases.map((alias) => ({
    id: `alias-${alias.id || alias.keyword}`,
    name: alias.name || alias.keyword,
    description: `${alias.keyword} → ${alias.url}`,
    keywords: ['alias', alias.keyword, alias.name || alias.keyword],
    icon: '⚡',
    category: 'alias' as const,
    action: (ctx: CommandContext) => {
      let url = alias.url;
      // Check for parameterized quicklink: user types "jira PROJ-123"
      // and alias url has %s
      if (url.includes('%s')) {
        const parts = ctx.query.trim().split(/\s+/);
        const param = parts.slice(1).join(' ');
        if (param) {
          url = url.replace('%s', encodeURIComponent(param));
        } else {
          // No param — open base URL (strip %s)
          url = url.replace('%s', '');
        }
      }

      if (ctx.metaKey) {
        sendMessage({ type: 'CREATE_TAB', url });
      } else {
        window.location.href = url;
      }
      ctx.close();
    },
  }));
}

// ─── Alias Detection ─────────────────────────────────────────

/**
 * Check if query triggers an alias: "mail" → opens Gmail, "jira PROJ-123" → opens ticket
 */
export async function getAliasMatchCommand(query: string): Promise<HatchCommand | null> {
  const aliases = await sendMessage<Alias[]>({ type: 'GET_ALIASES' });
  if (!aliases || aliases.length === 0) return null;

  const parts = query.trim().split(/\s+/);
  const keyword = parts[0].toLowerCase();
  const param = parts.slice(1).join(' ');

  const alias = aliases.find((a) => a.keyword.toLowerCase() === keyword);
  if (!alias) return null;

  const aliasId = alias.id || alias.keyword;
  const aliasName = alias.name || alias.keyword;
  let url = alias.url;
  const isParameterized = url.includes('%s');

  if (isParameterized && param) {
    url = url.replace('%s', encodeURIComponent(param));
  } else if (isParameterized && !param) {
    // Show hint that parameter is needed
    return {
      id: `alias-hint-${aliasId}`,
      name: `${aliasName}: type a query`,
      description: `${alias.keyword} <query> → ${alias.url}`,
      keywords: [alias.keyword],
      icon: '⚡',
      category: 'alias',
      action: () => {}, // no-op hint
    };
  }

  return {
    id: `alias-exec-${aliasId}`,
    name: isParameterized ? `${aliasName}: ${param}` : aliasName,
    description: url,
    keywords: [alias.keyword],
    icon: '⚡',
    category: 'alias',
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

// ─── Create Alias Command ────────────────────────────────────

/**
 * Detects "/alias keyword url" pattern.
 */
export function getCreateAliasCommand(query: string): HatchCommand | null {
  const match = query.match(/^\/alias\s+(\S+)\s+(\S+)(?:\s+(.+))?$/i);
  if (!match) return null;

  const keyword = match[1];
  const url = match[2].startsWith('http') ? match[2] : `https://${match[2]}`;
  const name = match[3] || keyword;

  return {
    id: 'create-alias-inline',
    name: `Create Alias: "${keyword}" → ${url}`,
    description: 'Press Enter to save',
    keywords: ['alias', 'create'],
    icon: '⚡',
    category: 'alias',
    action: async (ctx: CommandContext) => {
      const alias: Alias = {
        id: `alias-${Date.now()}`,
        keyword,
        name,
        url,
      };
      await sendMessage({ type: 'SAVE_ALIAS', alias });
      ctx.close();
    },
  };
}

// ─── Static Alias Commands ───────────────────────────────────

export const staticAliasCommands: HatchCommand[] = [
  {
    id: 'create-alias',
    name: 'Create Alias',
    description: 'Open the alias editor',
    keywords: ['create', 'new', 'alias', 'add', 'quicklink'],
    icon: '➕',
    category: 'alias',
    action: (ctx: CommandContext) => {
      ctx.showEditor('alias');
    },
  },
  {
    id: 'list-aliases',
    name: 'Manage Aliases',
    description: 'Open settings to manage aliases',
    keywords: ['alias', 'aliases', 'manage', 'list', 'quicklinks'],
    icon: '⚡',
    category: 'alias',
    action: (ctx: CommandContext) => {
      chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS' });
      ctx.close();
    },
  },
];
