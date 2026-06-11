import { describe, it, expect } from 'vitest';
import { getCreateAliasCommand } from '../src/content/commands/aliases';
import { getCreateSnippetCommand } from '../src/content/commands/snippets';
import { getNoteCommand, isNotesQuery } from '../src/content/commands/notes';
import { getCreateEngineCommand } from '../src/content/commands/site-search';

describe('getCreateAliasCommand (/alias keyword url [name])', () => {
  it('parses keyword and url', () => {
    const cmd = getCreateAliasCommand('/alias mail mail.google.com');
    expect(cmd).not.toBeNull();
    expect(cmd!.name).toBe('Create Alias: "mail" → https://mail.google.com');
  });

  it('keeps explicit http(s) urls untouched', () => {
    const cmd = getCreateAliasCommand('/alias jira https://company.atlassian.net/browse/%s');
    expect(cmd!.name).toContain('https://company.atlassian.net/browse/%s');
  });

  it('returns null without the /alias prefix', () => {
    expect(getCreateAliasCommand('alias mail mail.google.com')).toBeNull();
  });

  it('returns null when the url is missing', () => {
    expect(getCreateAliasCommand('/alias mail')).toBeNull();
  });
});

describe('getCreateSnippetCommand (trigger | name | body)', () => {
  it('parses a full inline snippet', () => {
    const cmd = getCreateSnippetCommand(';sig | Email Signature | Best regards, Sounak');
    expect(cmd).not.toBeNull();
    expect(cmd!.name).toBe('Create Snippet: ;sig → Email Signature');
  });

  it('prepends ; to the trigger when missing', () => {
    const cmd = getCreateSnippetCommand('sig | Email Signature | Best regards');
    expect(cmd!.name).toContain(';sig');
  });

  it('supports multi-line bodies', () => {
    const cmd = getCreateSnippetCommand(';addr | Address | Line one\nLine two');
    expect(cmd).not.toBeNull();
  });

  it('returns null for plain queries', () => {
    expect(getCreateSnippetCommand('just a normal search')).toBeNull();
  });

  it('returns null with only one pipe', () => {
    expect(getCreateSnippetCommand(';sig | Email Signature')).toBeNull();
  });
});

describe('getNoteCommand (/note text)', () => {
  it('parses a note', () => {
    const cmd = getNoteCommand('/note buy milk');
    expect(cmd).not.toBeNull();
    expect(cmd!.name).toBe('Save Note: "buy milk"');
  });

  it('returns null without text', () => {
    expect(getNoteCommand('/note')).toBeNull();
    expect(getNoteCommand('/notes')).toBeNull();
  });

  it('returns null for unrelated queries', () => {
    expect(getNoteCommand('note to self')).toBeNull();
  });
});

describe('isNotesQuery (/notes)', () => {
  it('matches /notes and /note', () => {
    expect(isNotesQuery('/notes')).toBe(true);
    expect(isNotesQuery('/note')).toBe(true);
    expect(isNotesQuery('/notes  ')).toBe(true);
  });

  it('does not match /note with text or other queries', () => {
    expect(isNotesQuery('/note buy milk')).toBe(false);
    expect(isNotesQuery('notes')).toBe(false);
  });
});

describe('getCreateEngineCommand (/engine keyword name url)', () => {
  it('parses a custom engine', () => {
    const cmd = getCreateEngineCommand('/engine jira Jira https://jira.com/search?q=%s');
    expect(cmd).not.toBeNull();
    expect(cmd!.name).toBe('Add search engine: jira → Jira');
  });

  it('requires %s in the url template', () => {
    expect(getCreateEngineCommand('/engine jira Jira https://jira.com/search')).toBeNull();
  });

  it('returns null for incomplete input', () => {
    expect(getCreateEngineCommand('/engine jira')).toBeNull();
  });
});
