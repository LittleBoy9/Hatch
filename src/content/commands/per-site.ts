import type { HatchCommand, CommandContext } from '../../types';
import { sendMessage } from './tabs';

// ─── Per-Site Command Definitions ────────────────────────────

interface SiteCommandDef {
  pattern: RegExp;
  commands: HatchCommand[];
}

const SITE_COMMANDS: SiteCommandDef[] = [
  // GitHub
  {
    pattern: /github\.com/,
    commands: [
      {
        id: 'gh-my-prs',
        name: 'GitHub: My Pull Requests',
        description: 'Open your PRs on GitHub',
        keywords: ['github', 'pull', 'requests', 'pr', 'my'],
        icon: '🐙',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://github.com/pulls';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
      {
        id: 'gh-my-issues',
        name: 'GitHub: My Issues',
        description: 'Open your issues on GitHub',
        keywords: ['github', 'issues', 'my'],
        icon: '🐙',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://github.com/issues';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
      {
        id: 'gh-notifications',
        name: 'GitHub: Notifications',
        description: 'Open GitHub notifications',
        keywords: ['github', 'notifications', 'inbox'],
        icon: '🔔',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://github.com/notifications';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
      {
        id: 'gh-new-repo',
        name: 'GitHub: New Repository',
        description: 'Create a new repository',
        keywords: ['github', 'new', 'repository', 'create', 'repo'],
        icon: '➕',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://github.com/new';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
    ],
  },

  // YouTube
  {
    pattern: /youtube\.com/,
    commands: [
      {
        id: 'yt-subscriptions',
        name: 'YouTube: Subscriptions',
        description: 'Go to your subscriptions feed',
        keywords: ['youtube', 'subscriptions', 'feed'],
        icon: '▶',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://www.youtube.com/feed/subscriptions';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
      {
        id: 'yt-watch-later',
        name: 'YouTube: Watch Later',
        description: 'Go to Watch Later playlist',
        keywords: ['youtube', 'watch', 'later', 'playlist'],
        icon: '⏰',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://www.youtube.com/playlist?list=WL';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
      {
        id: 'yt-history',
        name: 'YouTube: Watch History',
        description: 'Go to your watch history',
        keywords: ['youtube', 'history', 'watched'],
        icon: '📺',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://www.youtube.com/feed/history';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
    ],
  },

  // Google
  {
    pattern: /google\.com/,
    commands: [
      {
        id: 'g-gmail',
        name: 'Google: Open Gmail',
        description: 'Go to Gmail inbox',
        keywords: ['google', 'gmail', 'email', 'mail', 'inbox'],
        icon: '📧',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://mail.google.com';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
      {
        id: 'g-drive',
        name: 'Google: Open Drive',
        description: 'Go to Google Drive',
        keywords: ['google', 'drive', 'files', 'documents'],
        icon: '💾',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://drive.google.com';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
      {
        id: 'g-calendar',
        name: 'Google: Open Calendar',
        description: 'Go to Google Calendar',
        keywords: ['google', 'calendar', 'schedule', 'events'],
        icon: '📅',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://calendar.google.com';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
    ],
  },

  // Reddit
  {
    pattern: /reddit\.com/,
    commands: [
      {
        id: 'reddit-saved',
        name: 'Reddit: Saved Posts',
        description: 'Go to your saved posts',
        keywords: ['reddit', 'saved', 'posts', 'bookmarks'],
        icon: '💬',
        category: 'command',
        action: (ctx: CommandContext) => {
          const url = 'https://www.reddit.com/saved';
          ctx.metaKey ? sendMessage({ type: 'CREATE_TAB', url }) : (window.location.href = url);
          ctx.close();
        },
      },
    ],
  },
];

// ─── Get Commands for Current Site ───────────────────────────

export function getPerSiteCommands(): HatchCommand[] {
  const hostname = window.location.hostname;
  const commands: HatchCommand[] = [];

  for (const def of SITE_COMMANDS) {
    if (def.pattern.test(hostname)) {
      commands.push(...def.commands);
    }
  }

  return commands;
}
