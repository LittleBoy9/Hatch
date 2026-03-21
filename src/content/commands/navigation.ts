import type { HatchCommand, CommandContext } from '../../types';
import { sendMessage } from './tabs';

/**
 * Creates a Google search command from the current query.
 * This acts as a fallback when nothing else matches.
 */
export function getSearchFallbackCommand(query: string): HatchCommand {
  return {
    id: 'search-google',
    name: `Search Google for "${query}"`,
    description: 'Press Enter to search',
    icon: '🔍',
    category: 'search',
    action: (ctx: CommandContext) => {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      if (ctx.metaKey) {
        sendMessage({ type: 'CREATE_TAB', url: searchUrl });
      } else {
        window.location.href = searchUrl;
      }
      ctx.close();
    },
  };
}

/** Creates a "Go to URL" command when input looks like a URL */
export function getUrlCommand(query: string): HatchCommand | null {
  let url = query;
  if (/^[\w-]+(\.[\w-]+)+/.test(query) && !query.includes(' ')) {
    url = query.startsWith('http') ? query : `https://${query}`;
  } else if (query.startsWith('http://') || query.startsWith('https://')) {
    url = query;
  } else {
    return null;
  }

  try {
    new URL(url); // validate
  } catch {
    return null;
  }

  return {
    id: 'go-to-url',
    name: `Go to ${query}`,
    description: url,
    icon: '🌐',
    category: 'navigation',
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

export const staticNavigationCommands: HatchCommand[] = [
  {
    id: 'reload-page',
    name: 'Reload Page',
    description: 'Reload the current page',
    keywords: ['reload', 'refresh', 'page'],
    icon: '↻',
    category: 'navigation',
    action: (ctx) => {
      location.reload();
      ctx.close();
    },
  },
  {
    id: 'go-back',
    name: 'Go Back',
    description: 'Navigate back in history',
    keywords: ['back', 'previous', 'history'],
    icon: '←',
    category: 'navigation',
    action: (ctx) => {
      history.back();
      ctx.close();
    },
  },
  {
    id: 'go-forward',
    name: 'Go Forward',
    description: 'Navigate forward in history',
    keywords: ['forward', 'next', 'history'],
    icon: '→',
    category: 'navigation',
    action: (ctx) => {
      history.forward();
      ctx.close();
    },
  },
  {
    id: 'scroll-top',
    name: 'Scroll to Top',
    description: 'Jump to the top of the page',
    keywords: ['scroll', 'top', 'up', 'beginning'],
    icon: '⬆',
    category: 'navigation',
    action: (ctx) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      ctx.close();
    },
  },
  {
    id: 'scroll-bottom',
    name: 'Scroll to Bottom',
    description: 'Jump to the bottom of the page',
    keywords: ['scroll', 'bottom', 'down', 'end'],
    icon: '⬇',
    category: 'navigation',
    action: (ctx) => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      ctx.close();
    },
  },
  {
    id: 'copy-url',
    name: 'Copy Current URL',
    description: 'Copy the page URL to clipboard',
    keywords: ['copy', 'url', 'link', 'clipboard'],
    icon: '📋',
    category: 'navigation',
    action: async (ctx) => {
      await navigator.clipboard.writeText(window.location.href);
      ctx.close();
    },
  },
];
