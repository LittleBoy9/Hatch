import type { HatchCommand, TabGroupInfo, TabInfo, CommandContext } from '../../types';
import { sendMessage } from './tabs';

// ─── Color → Emoji Map ──────────────────────────────────────

const COLOR_DOT: Record<string, string> = {
  grey: '⚪',
  blue: '🔵',
  red: '🔴',
  yellow: '🟡',
  green: '🟢',
  pink: '🟣',
  purple: '🟣',
  cyan: '🔵',
  orange: '🟠',
};

const TAB_GROUP_COLORS = ['grey', 'blue', 'red', 'yellow', 'green', 'pink', 'purple', 'cyan', 'orange'];

// ─── Dynamic Tab Group Commands ──────────────────────────────

export async function getTabGroupCommands(): Promise<HatchCommand[]> {
  const groups = await sendMessage<TabGroupInfo[]>({ type: 'GET_TAB_GROUPS' });
  if (!groups || !groups.length) return [];

  const commands: HatchCommand[] = [];

  for (const group of groups) {
    const dot = COLOR_DOT[group.color] || '⚪';
    const label = group.title || 'Unnamed Group';

    // Toggle collapse/expand
    commands.push({
      id: `group-toggle-${group.id}`,
      name: `${group.collapsed ? 'Expand' : 'Collapse'} Group: ${label}`,
      description: `${dot} ${group.color} group`,
      keywords: ['group', 'tab', 'collapse', 'expand', label, group.color],
      icon: dot,
      category: 'tab',
      action: (ctx: CommandContext) => {
        sendMessage({
          type: 'TOGGLE_GROUP_COLLAPSE',
          groupId: group.id,
          collapsed: !group.collapsed,
        });
        ctx.close();
      },
    });

    // Add current tab to this group
    commands.push({
      id: `group-add-${group.id}`,
      name: `Add Tab to Group: ${label}`,
      description: `${dot} Move current tab into this group`,
      keywords: ['add', 'tab', 'group', label],
      icon: '➕',
      category: 'tab',
      action: async (ctx: CommandContext) => {
        const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
        if (tab?.id && tab.id !== -1) {
          sendMessage({ type: 'ADD_TAB_TO_GROUP', tabId: tab.id, groupId: group.id });
        }
        ctx.close();
      },
    });

    // Ungroup all tabs in this group
    commands.push({
      id: `group-ungroup-${group.id}`,
      name: `Ungroup: ${label}`,
      description: `${dot} Dissolve this tab group`,
      keywords: ['ungroup', 'dissolve', 'remove', 'group', label],
      icon: '🔓',
      category: 'tab',
      action: (ctx: CommandContext) => {
        sendMessage({ type: 'UNGROUP', groupId: group.id });
        ctx.close();
      },
    });
  }

  return commands;
}

// ─── Static Tab Group Commands ───────────────────────────────

export const staticTabGroupCommands: HatchCommand[] = [
  {
    id: 'create-tab-group',
    name: 'Create Tab Group',
    description: 'Group the current tab into a new group',
    keywords: ['create', 'new', 'tab', 'group'],
    icon: '📁',
    category: 'tab',
    action: (ctx: CommandContext) => {
      // Use the query as the group name, or default
      const title = ctx.query.replace(/^>\s*create\s*tab\s*group\s*/i, '').trim() || 'New Group';
      const color = TAB_GROUP_COLORS[Math.floor(Math.random() * TAB_GROUP_COLORS.length)];
      sendMessage({ type: 'CREATE_TAB_GROUP', title, color });
      ctx.close();
    },
  },
  {
    id: 'remove-tab-from-group',
    name: 'Remove Tab from Group',
    description: 'Ungroup the current tab',
    keywords: ['remove', 'ungroup', 'tab', 'detach'],
    icon: '↩',
    category: 'tab',
    action: async (ctx: CommandContext) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        sendMessage({ type: 'REMOVE_TAB_FROM_GROUP', tabId: tab.id });
      }
      ctx.close();
    },
  },
];
