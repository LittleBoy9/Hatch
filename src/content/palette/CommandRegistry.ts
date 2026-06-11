import type { HatchCommand } from '../../types';
import { getTabCommands, staticTabCommands } from '../commands/tabs';
import { staticNavigationCommands, themeCommands, settingsCommands, getSearchFallbackCommand, getUrlCommand } from '../commands/navigation';
import { getBookmarkCommands } from '../commands/bookmarks';
import { getHistoryCommands } from '../commands/history';
import { getRecentlyClosedCommands } from '../commands/sessions';
import { getTabGroupCommands, staticTabGroupCommands } from '../commands/tab-groups';
import { getSiteSearchCommand, getSiteSearchHints, getCreateEngineCommand, staticSearchEngineCommands } from '../commands/site-search';
import { pageActionCommands } from '../commands/page-actions';
import { devToolCommands } from '../commands/dev-tools';
import { tabSuspendCommands } from '../commands/tab-suspend';
import { getSnippetCommands, getCreateSnippetCommand, staticSnippetCommands } from '../commands/snippets';
import { getNoteCommands, getNoteCommand, isNotesQuery, staticNoteCommands } from '../commands/notes';
import { getClipboardCommands, staticClipboardCommands } from '../commands/clipboard';
import { getAliasCommands, getAliasMatchCommand, getCreateAliasCommand, staticAliasCommands } from '../commands/aliases';
import { workflowCommands } from '../commands/workflows';
import { getPerSiteCommands } from '../commands/per-site';
import { getSiteDisableCommands } from '../commands/site-disable';
import { importExportCommands } from '../commands/import-export';
import { getFrecencyData, calculateFrecencyScore, trackCommandUsage } from '../../storage/frecency';
import { fuzzySearch, type FuzzyResult } from './fuzzy';

// ─── Prefix Map ──────────────────────────────────────────────

const PREFIX_MAP: Record<string, string> = {
  '>': 'command',
  '@': 'tab',
  '#': 'bookmark',
  '/': 'history',
  ';': 'snippet',
};

export class CommandRegistry {
  private staticCommands: HatchCommand[] = [];
  private dynamicProviders: Array<() => Promise<HatchCommand[]>> = [];

  constructor() {
    this.staticCommands = [
      ...staticTabCommands,
      ...staticTabGroupCommands,
      ...tabSuspendCommands,
      ...staticNavigationCommands,
      ...themeCommands,
      ...settingsCommands,
      ...staticSearchEngineCommands,
      ...pageActionCommands,
      ...devToolCommands,
      ...staticSnippetCommands,
      ...staticNoteCommands,
      ...staticClipboardCommands,
      ...staticAliasCommands,
      ...workflowCommands,
      ...importExportCommands,
    ];

    // Dynamic data sources
    this.dynamicProviders.push(getTabCommands);
    this.dynamicProviders.push(getTabGroupCommands);
    this.dynamicProviders.push(getBookmarkCommands);
    this.dynamicProviders.push(getHistoryCommands);
    this.dynamicProviders.push(getRecentlyClosedCommands);
    this.dynamicProviders.push(getSnippetCommands);
    this.dynamicProviders.push(getNoteCommands);
    this.dynamicProviders.push(getClipboardCommands);
    this.dynamicProviders.push(getAliasCommands);
    this.dynamicProviders.push(getSiteDisableCommands);
  }

  async search(rawQuery: string, maxResults: number = 0): Promise<FuzzyResult[]> {
    let query = rawQuery.trim();
    let categoryFilter: string | null = null;

    // ─── Special commands ──────────────────────────────
    // /note <text> → save a note
    const noteCmd = getNoteCommand(query);
    if (noteCmd) {
      return [{ item: noteCmd, score: 2, matches: [] }];
    }

    // /engine <keyword> <name> <url> → add custom search engine
    const engineCmd = getCreateEngineCommand(query);
    if (engineCmd) {
      return [{ item: engineCmd, score: 2, matches: [] }];
    }

    // /alias <keyword> <url> → create an alias
    const aliasCmd = getCreateAliasCommand(query);
    if (aliasCmd) {
      return [{ item: aliasCmd, score: 2, matches: [] }];
    }

    // trigger | name | body → create a snippet inline
    const snippetCmd = getCreateSnippetCommand(query);
    if (snippetCmd) {
      return [{ item: snippetCmd, score: 2, matches: [] }];
    }

    // /notes → list all notes
    if (isNotesQuery(query)) {
      const notes = await getNoteCommands();
      return notes.map((item) => ({ item, score: 1, matches: [] }));
    }

    // Check for prefix filter
    if (query.length > 0 && PREFIX_MAP[query[0]]) {
      categoryFilter = PREFIX_MAP[query[0]];
      query = query.slice(1).trim();
    }

    // ─── Snippet prefix (;) ───────────────────────────
    if (categoryFilter === 'snippet') {
      const snippets = await getSnippetCommands();
      if (!query) {
        return snippets.map((item) => ({ item, score: 1, matches: [] }));
      }
      return fuzzySearch(snippets, query, maxResults);
    }

    const cap = (arr: FuzzyResult[]) => maxResults > 0 ? arr.slice(0, maxResults) : arr;

    // ─── Site Search (e.g., "gh react") ────────────────
    if (!categoryFilter && query.length > 0) {
      const siteCmd = await getSiteSearchCommand(query);
      if (siteCmd) {
        const allCommands = await this.getAllCommands();
        let results = fuzzySearch(allCommands, query, maxResults > 0 ? maxResults - 1 : 0);
        results = await this.applyFrecencyBoost(results);
        return cap([{ item: siteCmd, score: 2, matches: [] }, ...results]);
      }

      // Check alias match (e.g., "mail" or "jira PROJ-123")
      const aliasMatch = await getAliasMatchCommand(query);
      if (aliasMatch) {
        const allCommands = await this.getAllCommands();
        let results = fuzzySearch(allCommands, query, maxResults > 0 ? maxResults - 1 : 0);
        results = await this.applyFrecencyBoost(results);
        return cap([{ item: aliasMatch, score: 2, matches: [] }, ...results]);
      }
    }

    // Gather all commands
    const allCommands = await this.getAllCommands();

    // Filter by category if prefix was used
    const candidates = categoryFilter
      ? allCommands.filter((c) => c.category === categoryFilter)
      : allCommands;

    // Fuzzy search (limit=0 returns everything when no query)
    let results = fuzzySearch(candidates, query, maxResults);

    // Apply frecency boost
    results = await this.applyFrecencyBoost(results);

    // When no query and no prefix, prepend "Recently Used" section
    if (!query && !categoryFilter) {
      results = await this.prependRecentlyUsed(results);
    }

    // If we have a query, add contextual commands
    if (query.length > 0 && !categoryFilter) {
      // Site search hints (e.g., typing "gh" shows "gh: Search GitHub")
      const hints = await getSiteSearchHints(query);
      if (hints.length > 0) {
        const hintResults: FuzzyResult[] = hints.map((h) => ({ item: h, score: 1.5, matches: [] }));
        results = cap([...hintResults, ...results]);
      }

      // URL command
      const urlCmd = getUrlCommand(query);
      if (urlCmd) {
        results = cap([{ item: urlCmd, score: 1, matches: [] }, ...results]);
      }

      // Google search fallback at the end
      const fallback: FuzzyResult = { item: getSearchFallbackCommand(rawQuery), score: 0, matches: [] };
      if (maxResults === 0 || results.length < maxResults) {
        results.push(fallback);
      } else {
        results[results.length - 1] = fallback;
      }
    }

    return results;
  }

  trackExecution(commandId: string): void {
    trackCommandUsage(commandId);
  }

  /**
   * Pulls commands with frecency data to the top as a "Recently Used" section.
   * Creates clones with category='recent' so the Palette renders a separate header.
   */
  private async prependRecentlyUsed(results: FuzzyResult[]): Promise<FuzzyResult[]> {
    try {
      const frecency = await getFrecencyData();
      if (!frecency || Object.keys(frecency).length === 0) return results;

      // Find results that have frecency data, sorted by score
      const recentEntries = results
        .filter((r) => frecency[r.item.id] && calculateFrecencyScore(frecency[r.item.id]) > 0)
        .sort((a, b) => {
          const aScore = calculateFrecencyScore(frecency[a.item.id]);
          const bScore = calculateFrecencyScore(frecency[b.item.id]);
          return bScore - aScore;
        })
        .slice(0, 5);

      if (recentEntries.length === 0) return results;

      // Create "recent" category clones at the top
      const recentIds = new Set(recentEntries.map((r) => r.item.id));
      const recentResults: FuzzyResult[] = recentEntries.map((r) => ({
        ...r,
        item: { ...r.item, category: 'recent' },
      }));

      // Keep originals in their normal category sections (skip dupes)
      const remaining = results.filter((r) => !recentIds.has(r.item.id));

      return [...recentResults, ...remaining];
    } catch {
      return results;
    }
  }

  private async applyFrecencyBoost(results: FuzzyResult[]): Promise<FuzzyResult[]> {
    try {
      const frecency = await getFrecencyData();
      if (!frecency || Object.keys(frecency).length === 0) return results;

      return [...results].sort((a, b) => {
        const aFrecency = frecency[a.item.id] ? calculateFrecencyScore(frecency[a.item.id]) : 0;
        const bFrecency = frecency[b.item.id] ? calculateFrecencyScore(frecency[b.item.id]) : 0;

        const aScore = a.score + aFrecency * 0.1;
        const bScore = b.score + bFrecency * 0.1;
        return bScore - aScore;
      });
    } catch {
      return results;
    }
  }

  private async getAllCommands(): Promise<HatchCommand[]> {
    const dynamicResults = await Promise.all(
      this.dynamicProviders.map((provider) =>
        provider().catch(() => [] as HatchCommand[])
      )
    );

    // Per-site commands (synchronous, based on current hostname)
    const siteCommands = getPerSiteCommands();

    return [...dynamicResults.flat(), ...siteCommands, ...this.staticCommands];
  }
}
