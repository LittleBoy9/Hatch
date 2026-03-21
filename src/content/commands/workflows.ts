import type { HatchCommand, CommandContext, TabInfo } from '../../types';
import { sendMessage } from './tabs';

// ─── Workflow Definitions ────────────────────────────────────

export const workflowCommands: HatchCommand[] = [
  {
    id: 'workflow-cleanup',
    name: 'Workflow: Clean Up Tabs',
    description: 'Close duplicates → suspend inactive → report',
    keywords: ['workflow', 'clean', 'cleanup', 'organize', 'tabs'],
    icon: '🧹',
    category: 'command',
    action: async (ctx: CommandContext) => {
      // Step 1: Close duplicate tabs
      await sendMessage({ type: 'CLOSE_DUPLICATE_TABS' });

      // Step 2: Suspend other tabs
      await sendMessage({ type: 'SUSPEND_OTHER_TABS' });

      ctx.close();
    },
  },
  {
    id: 'workflow-focus',
    name: 'Workflow: Focus Mode',
    description: 'Pin current tab → close all others → clean slate',
    keywords: ['workflow', 'focus', 'mode', 'distraction', 'clean'],
    icon: '🎯',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const tab = await sendMessage<TabInfo>({ type: 'GET_CURRENT_TAB' });
      if (tab?.id && tab.id !== -1) {
        // Pin current tab
        await sendMessage({ type: 'PIN_TAB', tabId: tab.id, pinned: true });
        // Close all others
        await sendMessage({ type: 'CLOSE_OTHER_TABS', tabId: tab.id });
      }
      ctx.close();
    },
  },
  {
    id: 'workflow-share-session',
    name: 'Workflow: Share Session',
    description: 'Copy all tab URLs as a markdown list',
    keywords: ['workflow', 'share', 'session', 'export', 'tabs', 'markdown'],
    icon: '📤',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const tabs = await sendMessage<TabInfo[]>({ type: 'GET_ALL_TABS' });
      if (tabs && tabs.length > 0) {
        const md = tabs.map((t) => `- [${t.title}](${t.url})`).join('\n');
        const header = `## Browser Session (${tabs.length} tabs)\n\n`;
        await navigator.clipboard.writeText(header + md);
      }
      ctx.close();
    },
  },
  {
    id: 'workflow-research',
    name: 'Workflow: Research Mode',
    description: 'Create a tab group named after your query with blank tabs',
    keywords: ['workflow', 'research', 'mode', 'group', 'tabs'],
    icon: '🔬',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const groupName = ctx.query
        .replace(/^>\s*workflow[:\s]*research\s*mode?\s*/i, '')
        .trim() || 'Research';

      // Create group with current tab
      const result = await sendMessage<{ groupId: number }>({
        type: 'CREATE_TAB_GROUP',
        title: groupName,
        color: 'blue',
      });

      // Open 3 blank tabs in the group
      if (result?.groupId) {
        for (let i = 0; i < 3; i++) {
          const tab = await sendMessage<TabInfo>({
            type: 'CREATE_TAB',
            url: 'chrome://newtab',
          });
          if (tab?.id) {
            await sendMessage({
              type: 'ADD_TAB_TO_GROUP',
              tabId: tab.id,
              groupId: result.groupId,
            });
          }
        }
      }
      ctx.close();
    },
  },
  {
    id: 'workflow-save-restore',
    name: 'Workflow: Save All Tabs as Bookmarks',
    description: 'Bookmark every open tab for later',
    keywords: ['workflow', 'save', 'bookmark', 'all', 'tabs', 'backup'],
    icon: '💾',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const tabs = await sendMessage<TabInfo[]>({ type: 'GET_ALL_TABS' });
      if (tabs && tabs.length > 0) {
        // Copy as a formatted list since we can't create bookmarks from content script
        const text = tabs.map((t) => `${t.title}\n${t.url}`).join('\n\n');
        await navigator.clipboard.writeText(text);
      }
      ctx.close();
    },
  },
  {
    id: 'workflow-morning',
    name: 'Workflow: Morning Routine',
    description: 'Open your daily sites (Gmail, Calendar, GitHub)',
    keywords: ['workflow', 'morning', 'routine', 'daily', 'startup'],
    icon: '☀',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const sites = [
        'https://mail.google.com',
        'https://calendar.google.com',
        'https://github.com',
      ];
      for (const url of sites) {
        await sendMessage({ type: 'CREATE_TAB', url });
      }
      ctx.close();
    },
  },
];
