// Mark as a module so top-level names don't collide with other entry scripts
export {};

function $(id: string) { return document.getElementById(id)!; }

function loadStorage<T>(key: string, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => {
      resolve((data[key] as T) ?? fallback);
    });
  });
}

async function loadStats() {
  const snippets = await loadStorage<unknown[]>('snippets', []);
  const aliases = await loadStorage<unknown[]>('aliases', []);
  const notes = await loadStorage<unknown[]>('notes', []);
  const frecency = await loadStorage<Record<string, unknown>>('frecency', {});
  const customEngines = await loadStorage<unknown[]>('customSearchEngines', []);

  $('s-snippets').textContent = String(snippets.length);
  $('s-aliases').textContent = String(aliases.length);
  $('s-notes').textContent = String(notes.length);
  $('s-commands').textContent = String(Object.keys(frecency).length);

  // Calculate total available commands
  // Static commands: ~45 built-in + 18 search engines + custom engines
  // Dynamic: open tabs, bookmarks, history, snippets, aliases, notes, clipboard
  const staticCount = 45 + 18 + customEngines.length;
  const dynamicCount = snippets.length + aliases.length + notes.length;
  const total = staticCount + dynamicCount;
  const display = total >= 80 ? `${Math.floor(total / 10) * 10}+` : String(total);
  $('cmd-count').innerHTML = `<span>${display}</span> commands available`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadStats();

  $('settings-link').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  $('shortcuts-link').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  });
});
