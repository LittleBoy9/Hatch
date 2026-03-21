import type { HatchCommand, CommandContext } from '../../types';
import { sendMessage } from './tabs';

// ─── Message types for dev tools ─────────────────────────────

export const devToolCommands: HatchCommand[] = [
  {
    id: 'view-source',
    name: 'View Page Source',
    description: 'Open the page source in a new tab',
    keywords: ['view', 'source', 'html', 'code', 'developer'],
    icon: '🧑‍💻',
    category: 'command',
    action: (ctx: CommandContext) => {
      sendMessage({ type: 'CREATE_TAB', url: `view-source:${window.location.href}` });
      ctx.close();
    },
  },
  {
    id: 'copy-as-curl',
    name: 'Copy Page URL as cURL',
    description: 'Copy a cURL command for this page',
    keywords: ['curl', 'copy', 'request', 'http', 'api', 'developer'],
    icon: '⌘',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const url = window.location.href;
      const curl = `curl -X GET '${url}' \\\n  -H 'User-Agent: Mozilla/5.0'`;
      await navigator.clipboard.writeText(curl);
      ctx.close();
    },
  },
  {
    id: 'copy-page-performance',
    name: 'Copy Page Performance Timing',
    description: 'Copy load time breakdown to clipboard',
    keywords: ['performance', 'timing', 'speed', 'load', 'developer'],
    icon: '⏱',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (entries.length === 0) {
        await navigator.clipboard.writeText('Performance data not available');
        ctx.close();
        return;
      }
      const nav = entries[0];
      const lines = [
        `Page Performance: ${window.location.href}`,
        `─────────────────────────────────`,
        `DNS Lookup:      ${(nav.domainLookupEnd - nav.domainLookupStart).toFixed(0)}ms`,
        `TCP Connect:     ${(nav.connectEnd - nav.connectStart).toFixed(0)}ms`,
        `TLS Handshake:   ${(nav.secureConnectionStart ? nav.connectEnd - nav.secureConnectionStart : 0).toFixed(0)}ms`,
        `Request:         ${(nav.responseStart - nav.requestStart).toFixed(0)}ms`,
        `Response:        ${(nav.responseEnd - nav.responseStart).toFixed(0)}ms`,
        `DOM Processing:  ${(nav.domComplete - nav.responseEnd).toFixed(0)}ms`,
        `DOM Interactive: ${(nav.domInteractive - nav.fetchStart).toFixed(0)}ms`,
        `DOM Complete:    ${(nav.domComplete - nav.fetchStart).toFixed(0)}ms`,
        `Load Event:      ${(nav.loadEventEnd - nav.fetchStart).toFixed(0)}ms`,
        `Transfer Size:   ${(nav.transferSize / 1024).toFixed(1)}KB`,
      ];
      await navigator.clipboard.writeText(lines.join('\n'));
      ctx.close();
    },
  },
  {
    id: 'copy-css-custom-properties',
    name: 'Copy CSS Custom Properties',
    description: 'Copy all CSS variables defined on :root',
    keywords: ['css', 'variables', 'custom', 'properties', 'design', 'tokens'],
    icon: '🎨',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const styles = getComputedStyle(document.documentElement);
      const vars: string[] = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            const text = rule.cssText;
            const matches = text.matchAll(/--([\w-]+)\s*:/g);
            for (const m of matches) {
              const name = `--${m[1]}`;
              const value = styles.getPropertyValue(name).trim();
              if (value) vars.push(`${name}: ${value};`);
            }
          }
        } catch {
          // Cross-origin stylesheets can't be read
        }
      }
      const unique = [...new Set(vars)];
      await navigator.clipboard.writeText(unique.length ? unique.join('\n') : 'No CSS custom properties found');
      ctx.close();
    },
  },
  {
    id: 'toggle-javascript',
    name: 'List Page Scripts',
    description: 'Copy all script sources on this page',
    keywords: ['javascript', 'scripts', 'js', 'developer'],
    icon: '📜',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const srcs = scripts.map((s) => s.getAttribute('src')).filter(Boolean);
      const text = srcs.length
        ? `Scripts on ${window.location.host}:\n${srcs.join('\n')}`
        : 'No external scripts found';
      await navigator.clipboard.writeText(text);
      ctx.close();
    },
  },
  {
    id: 'count-dom-elements',
    name: 'Count DOM Elements',
    description: 'Show total elements, depth, and heaviest nodes',
    keywords: ['dom', 'elements', 'count', 'nodes', 'developer', 'performance'],
    icon: '🌳',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const all = document.querySelectorAll('*');
      const total = all.length;

      // Find deepest nesting
      let maxDepth = 0;
      const getDepth = (el: Element, depth: number): number => {
        if (depth > maxDepth) maxDepth = depth;
        let max = depth;
        for (const child of el.children) {
          const d = getDepth(child, depth + 1);
          if (d > max) max = d;
        }
        return max;
      };
      getDepth(document.documentElement, 0);

      // Top tags by count
      const tagCounts: Record<string, number> = {};
      all.forEach((el) => {
        const tag = el.tagName.toLowerCase();
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
      const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag, count]) => `  ${tag}: ${count}`)
        .join('\n');

      const text = [
        `DOM Analysis: ${window.location.href}`,
        `─────────────────────────────────`,
        `Total Elements: ${total}`,
        `Max Nesting:    ${maxDepth} levels`,
        ``,
        `Top Tags:`,
        topTags,
      ].join('\n');
      await navigator.clipboard.writeText(text);
      ctx.close();
    },
  },
  {
    id: 'list-event-listeners',
    name: 'Copy Page Links',
    description: 'Copy all links (anchors) on this page',
    keywords: ['links', 'anchors', 'hrefs', 'urls', 'developer'],
    icon: '🔗',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const hrefs = [...new Set(links.map((a) => a.getAttribute('href')).filter(Boolean))];
      const text = hrefs.length
        ? `Links on ${window.location.host} (${hrefs.length}):\n${hrefs.join('\n')}`
        : 'No links found';
      await navigator.clipboard.writeText(text);
      ctx.close();
    },
  },
  {
    id: 'copy-cookies-summary',
    name: 'Copy Cookies Summary',
    description: 'Copy cookie names and sizes for this domain',
    keywords: ['cookies', 'cookie', 'storage', 'developer'],
    icon: '🍪',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const cookies = document.cookie.split(';').filter((c) => c.trim());
      if (cookies.length === 0) {
        await navigator.clipboard.writeText('No cookies set for this domain');
        ctx.close();
        return;
      }
      const lines = cookies.map((c) => {
        const [name] = c.trim().split('=');
        return `${name.trim()} (${c.trim().length} chars)`;
      });
      const text = `Cookies for ${window.location.host} (${cookies.length}):\n${lines.join('\n')}`;
      await navigator.clipboard.writeText(text);
      ctx.close();
    },
  },
  {
    id: 'copy-local-storage-keys',
    name: 'Copy Local Storage Keys',
    description: 'Copy all localStorage keys for this domain',
    keywords: ['localstorage', 'storage', 'keys', 'developer'],
    icon: '💾',
    category: 'command',
    action: async (ctx: CommandContext) => {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) keys.push(key);
      }
      const text = keys.length
        ? `localStorage keys for ${window.location.host} (${keys.length}):\n${keys.join('\n')}`
        : 'No localStorage data for this domain';
      await navigator.clipboard.writeText(text);
      ctx.close();
    },
  },
];
