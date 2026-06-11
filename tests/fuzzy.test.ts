import { describe, it, expect } from 'vitest';
import { fuzzySearch } from '../src/content/palette/fuzzy';
import type { HatchCommand } from '../src/types';

function cmd(id: string, name: string, description?: string, keywords?: string[]): HatchCommand {
  return { id, name, description, keywords, category: 'command', action: () => {} };
}

describe('fuzzySearch', () => {
  const commands = [
    cmd('new-tab', 'New Tab', 'Open a new blank tab', ['new', 'tab', 'create']),
    cmd('close-tab', 'Close Current Tab', 'Close the active tab', ['close', 'tab']),
    cmd('reload', 'Reload Page', 'Reload the current page', ['reload', 'refresh']),
  ];

  it('returns all commands for an empty query', () => {
    const results = fuzzySearch(commands, '');
    expect(results).toHaveLength(3);
    expect(results.every((r) => r.score === 1)).toBe(true);
    expect(results.every((r) => r.matches.length === 0)).toBe(true);
  });

  it('respects the limit for an empty query', () => {
    const results = fuzzySearch(commands, '', 2);
    expect(results).toHaveLength(2);
    expect(results[0].item.id).toBe('new-tab');
  });

  it('returns all commands when limit is 0 (no cap)', () => {
    const results = fuzzySearch(commands, '', 0);
    expect(results).toHaveLength(3);
  });

  it('finds a command by name match', () => {
    const results = fuzzySearch(commands, 'reload');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.id).toBe('reload');
  });

  it('matches via keywords', () => {
    const results = fuzzySearch(commands, 'refresh');
    expect(results.some((r) => r.item.id === 'reload')).toBe(true);
  });

  it('returns no results for garbage queries', () => {
    const results = fuzzySearch(commands, 'zzzzqqqqxxxx');
    expect(results).toHaveLength(0);
  });

  it('maps commands with identical search strings to distinct items', () => {
    // Two tabs with the same title + URL — the indexOf regression
    const dupes = [
      cmd('switch-tab-1', 'GitHub', 'github.com', ['GitHub', 'https://github.com']),
      cmd('switch-tab-2', 'GitHub', 'github.com', ['GitHub', 'https://github.com']),
      cmd('switch-tab-3', 'Google', 'google.com', ['Google', 'https://google.com']),
    ];
    const results = fuzzySearch(dupes, 'github');
    const ids = results.map((r) => r.item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
