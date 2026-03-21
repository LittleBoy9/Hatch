import { createFuzzySearch } from 'quickfuzz';
import type { HatchCommand } from '../../types';

export interface FuzzyResult {
  item: HatchCommand;
  score: number;
  matches: number[];
}

/**
 * Fuzzy search commands. limit=0 means return all results (no cap).
 */
export function fuzzySearch(commands: HatchCommand[], query: string, limit: number = 0): FuzzyResult[] {
  if (!query.trim()) {
    // No query — return all commands (scrollable browsing)
    const slice = limit > 0 ? commands.slice(0, limit) : commands;
    return slice.map((item) => ({ item, score: 1, matches: [] }));
  }

  // Build searchable strings: "name keywords description"
  const searchStrings = commands.map((cmd) => {
    const parts = [cmd.name];
    if (cmd.keywords) parts.push(...cmd.keywords);
    if (cmd.description) parts.push(cmd.description);
    return parts.join(' ');
  });

  const opts: { threshold: number; maxResults?: number } = { threshold: 4 };
  if (limit > 0) opts.maxResults = limit;

  const search = createFuzzySearch(searchStrings, opts);
  const results = search.search(query);

  return results.map((r: { item: string; score: number; matches: number[] }) => {
    const idx = searchStrings.indexOf(r.item);
    return {
      item: commands[idx],
      score: r.score,
      matches: r.matches,
    };
  });
}
