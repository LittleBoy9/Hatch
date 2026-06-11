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

  // Commands with identical search strings (e.g. two tabs with the same
  // title + URL) must map back to distinct items, so keep a queue of
  // indices per string instead of using indexOf.
  const indexQueues = new Map<string, number[]>();
  searchStrings.forEach((s, i) => {
    const queue = indexQueues.get(s);
    if (queue) queue.push(i);
    else indexQueues.set(s, [i]);
  });

  const opts: { threshold: number; maxResults?: number } = { threshold: 4 };
  if (limit > 0) opts.maxResults = limit;

  const search = createFuzzySearch(searchStrings, opts);
  const results = search.search(query);

  return results.map((r: { item: string; score: number; matches: number[] }) => {
    const queue = indexQueues.get(r.item)!;
    const idx = queue.length > 1 ? queue.shift()! : queue[0];
    return {
      item: commands[idx],
      score: r.score,
      matches: r.matches,
    };
  });
}
