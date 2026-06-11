import type { HatchCommand, CommandContext } from '../../types';
import { sendMessage } from './tabs';

export const pageActionCommands: HatchCommand[] = [
  // ─── Copy Actions ──────────────────────────────────────────
  {
    id: 'copy-markdown-link',
    name: 'Copy as Markdown Link',
    description: 'Copy [Title](URL) to clipboard',
    keywords: ['copy', 'markdown', 'link', 'md'],
    icon: '📝',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const title = document.title;
      const url = window.location.href;
      await navigator.clipboard.writeText(`[${title}](${url})`);
      ctx.close();
    },
  },
  {
    id: 'copy-title',
    name: 'Copy Page Title',
    description: 'Copy the page title to clipboard',
    keywords: ['copy', 'title', 'name'],
    icon: '📄',
    category: 'command',
    action: async (ctx: CommandContext) => {
      await navigator.clipboard.writeText(document.title);
      ctx.close();
    },
  },
  {
    id: 'copy-all-tab-urls',
    name: 'Copy All Tab URLs',
    description: 'Copy URLs of all open tabs as a list',
    keywords: ['copy', 'all', 'tabs', 'urls', 'links', 'list'],
    icon: '📑',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const tabs = await sendMessage<Array<{ url: string; title: string }>>({ type: 'GET_ALL_TABS' });
      if (tabs) {
        const text = tabs.map((t) => t.url).join('\n');
        await navigator.clipboard.writeText(text);
      }
      ctx.close();
    },
  },
  {
    id: 'copy-all-tabs-markdown',
    name: 'Copy All Tabs as Markdown',
    description: 'Copy all tabs as markdown links',
    keywords: ['copy', 'all', 'tabs', 'markdown', 'links'],
    icon: '📋',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const tabs = await sendMessage<Array<{ url: string; title: string }>>({ type: 'GET_ALL_TABS' });
      if (tabs) {
        const text = tabs.map((t) => `- [${t.title}](${t.url})`).join('\n');
        await navigator.clipboard.writeText(text);
      }
      ctx.close();
    },
  },

  // ─── Page Metadata ─────────────────────────────────────────
  {
    id: 'copy-page-metadata',
    name: 'Copy Page Metadata',
    description: 'Copy title, description, OG tags, canonical URL',
    keywords: ['metadata', 'meta', 'og', 'seo', 'tags', 'opengraph'],
    icon: '🏷',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const meta: Record<string, string> = {};
      meta['Title'] = document.title;
      meta['URL'] = window.location.href;

      const desc = document.querySelector('meta[name="description"]');
      if (desc) meta['Description'] = desc.getAttribute('content') || '';

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) meta['Canonical'] = canonical.getAttribute('href') || '';

      // OG tags
      document.querySelectorAll('meta[property^="og:"]').forEach((el) => {
        const prop = el.getAttribute('property') || '';
        meta[prop] = el.getAttribute('content') || '';
      });

      // Twitter cards
      document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => {
        const name = el.getAttribute('name') || '';
        meta[name] = el.getAttribute('content') || '';
      });

      const text = Object.entries(meta)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      await navigator.clipboard.writeText(text);
      ctx.close();
    },
  },

  // ─── Page Interaction ──────────────────────────────────────
  {
    id: 'print-page',
    name: 'Print Page',
    description: 'Open the print dialog',
    keywords: ['print', 'pdf', 'save'],
    icon: '🖨',
    category: 'command',
    action: (ctx: CommandContext) => {
      ctx.close();
      setTimeout(() => window.print(), 100);
    },
  },
  {
    id: 'toggle-fullscreen',
    name: 'Toggle Fullscreen',
    description: 'Enter or exit fullscreen mode',
    keywords: ['fullscreen', 'full', 'screen', 'maximize'],
    icon: '⛶',
    category: 'command',
    action: (ctx: CommandContext) => {
      ctx.close();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
  },

  // ─── Selection Actions ─────────────────────────────────────
  {
    id: 'copy-selection-as-markdown',
    name: 'Copy Selection as Markdown Quote',
    description: 'Copy selected text as a markdown blockquote',
    keywords: ['selection', 'quote', 'markdown', 'blockquote'],
    icon: '💬',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const selection = window.getSelection()?.toString() || '';
      if (selection) {
        const quoted = selection.split('\n').map((l) => `> ${l}`).join('\n');
        const source = `\n\n— [${document.title}](${window.location.href})`;
        await navigator.clipboard.writeText(quoted + source);
      }
      ctx.close();
    },
  },
];
