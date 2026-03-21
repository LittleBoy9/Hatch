// ─── Helpers ─────────────────────────────────────────────────

function $(id: string) { return document.getElementById(id)!; }

function toast(msg: string) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2000);
}

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Types ───────────────────────────────────────────────────

interface Snippet {
  id: string;
  trigger: string;
  name: string;
  body: string;
}

interface Alias {
  keyword: string;
  url: string;
}

interface SearchEngine {
  keyword: string;
  name: string;
  urlTemplate: string;
  icon: string;
  custom?: boolean;
}

interface Note {
  id: string;
  text: string;
  url: string;
  createdAt: number;
}

// ─── Storage Helpers ─────────────────────────────────────────

function loadStorage<T>(key: string, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => {
      resolve((data[key] as T) ?? fallback);
    });
  });
}

function saveStorage(key: string, value: unknown): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

// ─── Render Functions ────────────────────────────────────────

async function renderStats() {
  const snippets = await loadStorage<Snippet[]>('snippets', []);
  const aliases = await loadStorage<Alias[]>('aliases', []);
  const notes = await loadStorage<Note[]>('notes', []);
  const engines = await loadStorage<SearchEngine[]>('customSearchEngines', []);
  const frecency = await loadStorage<Record<string, unknown>>('frecency', {});

  $('stats').innerHTML = `
    <div class="stat-card"><div class="stat-value">${snippets.length}</div><div class="stat-label">Snippets</div></div>
    <div class="stat-card"><div class="stat-value">${aliases.length}</div><div class="stat-label">Aliases</div></div>
    <div class="stat-card"><div class="stat-value">${18 + engines.length}</div><div class="stat-label">Search Engines</div></div>
    <div class="stat-card"><div class="stat-value">${notes.length}</div><div class="stat-label">Notes</div></div>
    <div class="stat-card"><div class="stat-value">${Object.keys(frecency).length}</div><div class="stat-label">Tracked Commands</div></div>
  `;
}

async function renderSnippets() {
  const snippets = await loadStorage<Snippet[]>('snippets', []);
  $('snippet-count').textContent = `(${snippets.length})`;

  const tbody = $('snippet-list');
  if (snippets.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-row">No snippets yet. Add one below or use <code>;trigger | name | body</code> in the palette.</td></tr>';
    return;
  }

  tbody.innerHTML = snippets.map((s) => `
    <tr>
      <td><code>${esc(s.trigger)}</code></td>
      <td>${esc(s.name)}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(s.body)}</td>
      <td><button class="btn-sm btn-danger" data-delete-snippet="${s.id}">Delete</button></td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-delete-snippet]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = (btn as HTMLElement).dataset.deleteSnippet;
      const updated = snippets.filter((s) => s.id !== id);
      await saveStorage('snippets', updated);
      renderSnippets();
      renderStats();
      toast('Snippet deleted');
    });
  });
}

async function renderAliases() {
  const aliases = await loadStorage<Alias[]>('aliases', []);
  $('alias-count').textContent = `(${aliases.length})`;

  const tbody = $('alias-list');
  if (aliases.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" class="empty-row">No aliases yet. Add one below or use <code>/alias keyword url</code> in the palette.</td></tr>';
    return;
  }

  tbody.innerHTML = aliases.map((a, i) => `
    <tr>
      <td><code>${esc(a.keyword)}</code></td>
      <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.url)}</td>
      <td><button class="btn-sm btn-danger" data-delete-alias="${i}">Delete</button></td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-delete-alias]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idx = parseInt((btn as HTMLElement).dataset.deleteAlias!, 10);
      aliases.splice(idx, 1);
      await saveStorage('aliases', aliases);
      renderAliases();
      renderStats();
      toast('Alias deleted');
    });
  });
}

async function renderEngines() {
  const engines = await loadStorage<SearchEngine[]>('customSearchEngines', []);
  $('engine-count').textContent = `(18 built-in + ${engines.length} custom)`;

  const tbody = $('engine-list');
  if (engines.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-row">No custom engines. 18 built-in engines are always available.</td></tr>';
    return;
  }

  tbody.innerHTML = engines.map((e, i) => `
    <tr>
      <td><code>${esc(e.keyword)}</code></td>
      <td>${esc(e.name)}</td>
      <td style="max-width:250px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(e.urlTemplate)}</td>
      <td><button class="btn-sm btn-danger" data-delete-engine="${i}">Delete</button></td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-delete-engine]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idx = parseInt((btn as HTMLElement).dataset.deleteEngine!, 10);
      engines.splice(idx, 1);
      await saveStorage('customSearchEngines', engines);
      renderEngines();
      renderStats();
      toast('Search engine deleted');
    });
  });
}

async function renderNotes() {
  const notes = await loadStorage<Note[]>('notes', []);
  $('note-count').textContent = `(${notes.length})`;

  const tbody = $('note-list');
  if (notes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-row">No notes yet. Use <code>/note your text</code> in the palette.</td></tr>';
    return;
  }

  tbody.innerHTML = notes.slice(0, 50).map((n) => {
    const date = new Date(n.createdAt).toLocaleDateString();
    const domain = (() => { try { return new URL(n.url).hostname; } catch { return ''; } })();
    return `
      <tr>
        <td style="max-width:250px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(n.text)}</td>
        <td style="font-size:12px;color:var(--text-muted)">${esc(domain)}</td>
        <td style="font-size:12px;color:var(--text-muted);white-space:nowrap">${date}</td>
        <td><button class="btn-sm btn-danger" data-delete-note="${n.id}">Delete</button></td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-delete-note]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = (btn as HTMLElement).dataset.deleteNote;
      const updated = notes.filter((n) => n.id !== id);
      await saveStorage('notes', updated);
      renderNotes();
      renderStats();
      toast('Note deleted');
    });
  });
}

async function loadSettings() {
  const settings = await loadStorage<{ theme?: string }>('settings', {});
  (document.getElementById('theme-select') as HTMLSelectElement).value = settings.theme || 'auto';
}

function esc(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── Event Handlers ──────────────────────────────────────────

function bindEvents() {
  // Theme
  $('theme-select').addEventListener('change', async (e) => {
    const theme = (e.target as HTMLSelectElement).value;
    const settings = await loadStorage<Record<string, unknown>>('settings', {});
    await saveStorage('settings', { ...settings, theme });
    toast('Theme updated');
  });

  // Add snippet
  $('snippet-add').addEventListener('click', async () => {
    const trigger = ($('snippet-trigger') as HTMLInputElement).value.trim();
    const name = ($('snippet-name') as HTMLInputElement).value.trim();
    const body = ($('snippet-body') as HTMLInputElement).value.trim();
    if (!trigger || !name || !body) return toast('Fill all fields');

    const snippets = await loadStorage<Snippet[]>('snippets', []);
    snippets.push({ id: genId(), trigger, name, body });
    await saveStorage('snippets', snippets);

    ($('snippet-trigger') as HTMLInputElement).value = '';
    ($('snippet-name') as HTMLInputElement).value = '';
    ($('snippet-body') as HTMLInputElement).value = '';
    renderSnippets();
    renderStats();
    toast('Snippet added');
  });

  // Add alias
  $('alias-add').addEventListener('click', async () => {
    const keyword = ($('alias-keyword') as HTMLInputElement).value.trim();
    const url = ($('alias-url') as HTMLInputElement).value.trim();
    if (!keyword || !url) return toast('Fill all fields');

    const aliases = await loadStorage<Alias[]>('aliases', []);
    // Remove existing with same keyword
    const filtered = aliases.filter((a) => a.keyword !== keyword);
    filtered.push({ keyword, url });
    await saveStorage('aliases', filtered);

    ($('alias-keyword') as HTMLInputElement).value = '';
    ($('alias-url') as HTMLInputElement).value = '';
    renderAliases();
    renderStats();
    toast('Alias added');
  });

  // Add search engine
  $('engine-add').addEventListener('click', async () => {
    const keyword = ($('engine-keyword') as HTMLInputElement).value.trim();
    const name = ($('engine-name') as HTMLInputElement).value.trim();
    const urlTemplate = ($('engine-url') as HTMLInputElement).value.trim();
    if (!keyword || !name || !urlTemplate) return toast('Fill all fields');
    if (!urlTemplate.includes('%s')) return toast('URL must contain %s placeholder');

    const engines = await loadStorage<SearchEngine[]>('customSearchEngines', []);
    const filtered = engines.filter((e) => e.keyword !== keyword);
    filtered.push({ keyword, name, urlTemplate, icon: '🔎', custom: true });
    await saveStorage('customSearchEngines', filtered);

    ($('engine-keyword') as HTMLInputElement).value = '';
    ($('engine-name') as HTMLInputElement).value = '';
    ($('engine-url') as HTMLInputElement).value = '';
    renderEngines();
    renderStats();
    toast('Search engine added');
  });

  // Export
  $('export-btn').addEventListener('click', async () => {
    const snippets = await loadStorage('snippets', []);
    const aliases = await loadStorage('aliases', []);
    const engines = await loadStorage('customSearchEngines', []);
    const notes = await loadStorage('notes', []);

    const data = { snippets, aliases, customSearchEngines: engines, notes, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hatch-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Data exported');
  });

  // Import
  $('import-btn').addEventListener('click', () => {
    ($('import-file') as HTMLInputElement).click();
  });

  $('import-file').addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const text = await file.text();
    try {
      const data = JSON.parse(text);
      if (data.snippets) await saveStorage('snippets', data.snippets);
      if (data.aliases) await saveStorage('aliases', data.aliases);
      if (data.customSearchEngines) await saveStorage('customSearchEngines', data.customSearchEngines);
      if (data.notes) await saveStorage('notes', data.notes);

      renderAll();
      toast('Data imported successfully');
    } catch {
      toast('Invalid JSON file');
    }
  });

  // Clear frecency
  $('clear-frecency').addEventListener('click', async () => {
    await saveStorage('frecency', {});
    renderStats();
    toast('Frecency data cleared');
  });
}

// ─── Init ────────────────────────────────────────────────────

function renderAll() {
  renderStats();
  renderSnippets();
  renderAliases();
  renderEngines();
  renderNotes();
  loadSettings();
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  bindEvents();
});
