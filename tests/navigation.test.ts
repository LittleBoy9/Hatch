import { describe, it, expect } from 'vitest';
import { getUrlCommand, getSearchFallbackCommand } from '../src/content/commands/navigation';

describe('getUrlCommand', () => {
  it('detects bare domains and adds https', () => {
    const cmd = getUrlCommand('github.com');
    expect(cmd).not.toBeNull();
    expect(cmd!.description).toBe('https://github.com');
  });

  it('detects domains with paths', () => {
    const cmd = getUrlCommand('github.com/sounak/hatch');
    expect(cmd).not.toBeNull();
  });

  it('keeps full http(s) urls', () => {
    const cmd = getUrlCommand('https://example.com/a/b?c=1');
    expect(cmd!.description).toBe('https://example.com/a/b?c=1');
  });

  it('rejects queries with spaces', () => {
    expect(getUrlCommand('github com')).toBeNull();
  });

  it('rejects plain words', () => {
    expect(getUrlCommand('hello')).toBeNull();
  });
});

describe('getSearchFallbackCommand', () => {
  it('builds a Google search command from the query', () => {
    const cmd = getSearchFallbackCommand('how to exit vim');
    expect(cmd.name).toBe('Search Google for "how to exit vim"');
    expect(cmd.category).toBe('search');
  });
});
