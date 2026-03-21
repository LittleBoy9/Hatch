import type { CommandContext, EditorType } from '../../types';
import type { FuzzyResult } from './fuzzy';
import { CommandRegistry } from './CommandRegistry';
import { paletteCSS } from './palette.css';
import { sendMessage } from '../commands/tabs';

export class Palette {
  private host: HTMLDivElement;
  private shadow: ShadowRoot;
  private container!: HTMLDivElement;
  private input!: HTMLInputElement;
  private resultsList!: HTMLDivElement;
  private backdrop!: HTMLDivElement;

  private registry: CommandRegistry;
  private results: FuzzyResult[] = [];
  private selectedIndex: number = 0;
  private isOpen: boolean = false;
  private searchDebounceTimer: number | null = null;
  private selectedItems: Set<string> = new Set(); // multi-select by command ID
  private batchBar: HTMLDivElement | null = null;
  private resultCount!: HTMLSpanElement;
  private editorMode: EditorType | null = null;
  private inputWrapper!: HTMLDivElement;
  private footer!: HTMLDivElement;

  constructor() {
    this.registry = new CommandRegistry();

    // Create host element
    this.host = document.createElement('div');
    this.host.id = 'hatch-host';
    this.shadow = this.host.attachShadow({ mode: 'closed' });

    this.buildDOM();
    this.attachStyles();
    this.bindEvents();

    document.body.appendChild(this.host);
  }

  // ─── DOM Construction ────────────────────────────────────

  private buildDOM(): void {
    // Backdrop
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'hatch-backdrop';
    this.backdrop.addEventListener('click', () => this.close());

    // Main container
    this.container = document.createElement('div');
    this.container.className = 'hatch-palette';
    this.container.setAttribute('role', 'dialog');
    this.container.setAttribute('aria-label', 'Hatch Command Palette');

    // Input wrapper
    this.inputWrapper = document.createElement('div');
    const inputWrapper = this.inputWrapper;
    inputWrapper.className = 'hatch-input-wrapper';

    const searchIcon = document.createElement('span');
    searchIcon.className = 'hatch-search-icon';
    searchIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;

    this.input = document.createElement('input');
    this.input.className = 'hatch-input';
    this.input.type = 'text';
    this.input.placeholder = 'Search tabs, commands, or type a URL...';
    this.input.setAttribute('autocomplete', 'off');
    this.input.setAttribute('autocorrect', 'off');
    this.input.setAttribute('autocapitalize', 'off');
    this.input.setAttribute('spellcheck', 'false');

    const shortcutHint = document.createElement('span');
    shortcutHint.className = 'hatch-shortcut-hint';
    shortcutHint.textContent = 'esc';

    inputWrapper.appendChild(searchIcon);
    inputWrapper.appendChild(this.input);
    inputWrapper.appendChild(shortcutHint);

    // Results
    this.resultsList = document.createElement('div');
    this.resultsList.className = 'hatch-results';
    this.resultsList.setAttribute('role', 'listbox');

    // Footer
    this.footer = document.createElement('div');
    const footer = this.footer;
    footer.className = 'hatch-footer';

    const footerHints = document.createElement('div');
    footerHints.className = 'hatch-footer-hints';
    footerHints.innerHTML = `
      <span class="hatch-hint"><kbd>↑↓</kbd> navigate</span>
      <span class="hatch-hint"><kbd>↵</kbd> open</span>
      <span class="hatch-hint"><kbd>⌘↵</kbd> new tab</span>
      <span class="hatch-hint"><kbd>esc</kbd> close</span>
    `;

    const footerRight = document.createElement('div');
    footerRight.className = 'hatch-footer-right';

    this.resultCount = document.createElement('span');
    this.resultCount.className = 'hatch-result-count';

    const brand = document.createElement('span');
    brand.className = 'hatch-brand';
    brand.textContent = 'Hatch';

    footerRight.appendChild(this.resultCount);
    footerRight.appendChild(brand);

    footer.appendChild(footerHints);
    footer.appendChild(footerRight);

    // Batch action bar (hidden by default)
    this.batchBar = document.createElement('div');
    this.batchBar.className = 'hatch-batch-bar';
    this.batchBar.style.display = 'none';

    this.container.appendChild(inputWrapper);
    this.container.appendChild(this.resultsList);
    this.container.appendChild(this.batchBar);
    this.container.appendChild(footer);

    this.shadow.appendChild(this.backdrop);
    this.shadow.appendChild(this.container);
  }

  private attachStyles(): void {
    const style = document.createElement('style');
    style.textContent = paletteCSS;
    this.shadow.appendChild(style);
  }

  // ─── Event Binding ───────────────────────────────────────

  private bindEvents(): void {
    // Input events
    this.input.addEventListener('input', () => this.onInput());
    this.input.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  // ─── Open / Close ────────────────────────────────────────

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  async open(): Promise<void> {
    if (this.isOpen) return;
    this.isOpen = true;

    // Apply theme setting
    this.applyTheme();

    this.host.style.display = 'block';
    this.input.value = '';
    this.selectedIndex = 0;
    this.selectedItems.clear();
    if (this.batchBar) this.batchBar.style.display = 'none';

    // Force reflow before adding animation class
    void this.container.offsetHeight;
    this.backdrop.classList.add('visible');
    this.container.classList.add('visible');

    // Focus after animation starts
    requestAnimationFrame(() => {
      this.input.focus();
    });

    // Load initial results (all tabs)
    await this.updateResults();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;

    this.backdrop.classList.remove('visible');
    this.container.classList.remove('visible');

    // Hide after animation
    setTimeout(() => {
      if (!this.isOpen) {
        this.host.style.display = 'none';
      }
    }, 150);
  }

  // ─── Search & Results ────────────────────────────────────

  private applyTheme(): void {
    chrome.storage.local.get('settings', (data: Record<string, unknown>) => {
      const settings = data?.settings as { theme?: string } | undefined;
      const theme = settings?.theme || 'auto';
      if (theme === 'auto') {
        this.host.removeAttribute('data-theme');
      } else {
        this.host.setAttribute('data-theme', theme);
      }
    });
  }

  private onInput(): void {
    if (this.searchDebounceTimer !== null) {
      clearTimeout(this.searchDebounceTimer);
    }
    this.searchDebounceTimer = window.setTimeout(() => {
      this.updateResults();
    }, 16);
  }

  private async updateResults(): Promise<void> {
    const query = this.input.value;
    // No limit when browsing (empty query) — show all commands, scrollable like Raycast
    // When searching, cap at 15 for focused results
    const limit = query.trim() ? 15 : 0;
    this.results = await this.registry.search(query, limit);
    this.selectedIndex = 0;
    this.renderResults();
  }

  private renderResults(): void {
    this.resultsList.innerHTML = '';

    // Update result count in footer
    this.resultCount.textContent = this.results.length > 0
      ? `${this.results.length} result${this.results.length !== 1 ? 's' : ''}`
      : '';

    if (this.results.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'hatch-empty';
      empty.innerHTML = `
        <div class="hatch-empty-icon">⌘</div>
        <div class="hatch-empty-title">No results found</div>
        <div class="hatch-empty-hints">
          Try <kbd>@</kbd> tabs · <kbd>#</kbd> bookmarks · <kbd>/</kbd> history · <kbd>;</kbd> snippets · <kbd>></kbd> commands
        </div>
      `;
      this.resultsList.appendChild(empty);
      return;
    }

    let lastCategory = '';
    this.results.forEach((result, index) => {
      const cmd = result.item;

      // Section header when category changes
      if (cmd.category !== lastCategory) {
        lastCategory = cmd.category;
        const header = document.createElement('div');
        header.className = 'hatch-section-header';
        header.textContent = this.getCategoryLabel(cmd.category);
        this.resultsList.appendChild(header);
      }
      const isMultiSelected = this.selectedItems.has(cmd.id);
      const item = document.createElement('div');
      item.className = `hatch-result-item${index === this.selectedIndex ? ' selected' : ''}${isMultiSelected ? ' multi-selected' : ''}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', index === this.selectedIndex ? 'true' : 'false');

      // Icon
      const icon = document.createElement('span');
      icon.className = 'hatch-result-icon';
      if (cmd.icon && (cmd.icon.startsWith('http') || cmd.icon.startsWith('data:'))) {
        const img = document.createElement('img');
        img.src = cmd.icon;
        img.width = 20;
        img.height = 20;
        img.loading = 'lazy';
        img.onerror = () => {
          img.style.display = 'none';
          icon.textContent = this.getCategoryIcon(cmd.category);
        };
        icon.appendChild(img);
      } else {
        icon.textContent = cmd.icon || this.getCategoryIcon(cmd.category);
      }

      // Text
      const text = document.createElement('div');
      text.className = 'hatch-result-text';

      const name = document.createElement('span');
      name.className = 'hatch-result-name';

      // Highlight matched characters in name using quickfuzz match indices
      if (result.matches.length > 0 && this.input.value.trim()) {
        this.renderHighlightedName(name, cmd.name, result.matches);
      } else {
        name.textContent = cmd.name;
      }

      text.appendChild(name);

      if (cmd.description) {
        const desc = document.createElement('span');
        desc.className = 'hatch-result-desc';
        desc.textContent = cmd.description;
        text.appendChild(desc);
      }

      // Category badge
      const badge = document.createElement('span');
      badge.className = 'hatch-result-badge';
      badge.textContent = cmd.category;

      if (isMultiSelected) {
        const check = document.createElement('span');
        check.className = 'hatch-check';
        check.textContent = '✓';
        item.appendChild(check);
      }
      item.appendChild(icon);
      item.appendChild(text);
      item.appendChild(badge);

      // Mouse events
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = index;
        this.highlightSelected();
      });
      item.addEventListener('click', (e) => {
        this.selectedIndex = index;
        this.executeSelected(e.metaKey || e.ctrlKey);
      });

      this.resultsList.appendChild(item);
    });
  }

  /** Renders name with matched characters highlighted */
  private renderHighlightedName(container: HTMLSpanElement, name: string, matches: number[]): void {
    const matchSet = new Set(matches);
    for (let i = 0; i < name.length; i++) {
      if (matchSet.has(i)) {
        const mark = document.createElement('mark');
        mark.className = 'hatch-highlight';
        mark.textContent = name[i];
        container.appendChild(mark);
      } else {
        container.appendChild(document.createTextNode(name[i]));
      }
    }
  }

  private getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      recent: 'Recently Used',
      tab: 'Tabs',
      navigation: 'Navigation',
      bookmark: 'Bookmarks',
      history: 'History',
      session: 'Recently Closed',
      snippet: 'Snippets',
      command: 'Commands',
      search: 'Search',
      note: 'Notes',
      alias: 'Aliases',
      clipboard: 'Clipboard',
    };
    return labels[category] || category;
  }

  private getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      tab: '⊞',
      navigation: '◎',
      bookmark: '★',
      history: '◷',
      session: '↩',
      snippet: '✂',
      command: '⚡',
      search: '🔍',
    };
    return icons[category] || '•';
  }

  private highlightSelected(): void {
    const items = this.resultsList.querySelectorAll('.hatch-result-item');
    items.forEach((item, i) => {
      const el = item as HTMLDivElement;
      if (i === this.selectedIndex) {
        el.classList.add('selected');
        el.setAttribute('aria-selected', 'true');
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        el.classList.remove('selected');
        el.setAttribute('aria-selected', 'false');
      }
    });
  }

  // ─── Keyboard Navigation ────────────────────────────────

  private onKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        this.highlightSelected();
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.highlightSelected();
        break;

      case 'Enter':
        e.preventDefault();
        this.executeSelected(e.metaKey || e.ctrlKey);
        break;

      case 'Escape':
        e.preventDefault();
        if (this.editorMode) {
          this.exitEditor();
        } else {
          this.close();
        }
        break;

      case 'Tab':
        e.preventDefault();
        if (this.results[this.selectedIndex]) {
          this.input.value = this.results[this.selectedIndex].item.name;
          this.updateResults();
        }
        break;

      case ' ':
        // Space toggles multi-select on tab items (only when input is empty or starts with @)
        if (this.input.value === '' || this.input.value.startsWith('@')) {
          const current = this.results[this.selectedIndex];
          if (current && current.item.category === 'tab') {
            e.preventDefault();
            this.toggleSelect(current.item.id);
          }
        }
        break;
    }
  }

  // ─── Multi-Select ───────────────────────────────────────

  private toggleSelect(commandId: string): void {
    if (this.selectedItems.has(commandId)) {
      this.selectedItems.delete(commandId);
    } else {
      this.selectedItems.add(commandId);
    }
    this.renderResults();
    this.updateBatchBar();
  }

  private updateBatchBar(): void {
    if (!this.batchBar) return;
    const count = this.selectedItems.size;

    if (count === 0) {
      this.batchBar.style.display = 'none';
      return;
    }

    this.batchBar.style.display = 'flex';
    this.batchBar.innerHTML = `
      <span class="hatch-batch-count">${count} tab${count > 1 ? 's' : ''} selected</span>
      <div class="hatch-batch-actions">
        <button class="hatch-batch-btn" data-action="close">Close</button>
        <button class="hatch-batch-btn" data-action="group">Group</button>
        <button class="hatch-batch-btn" data-action="pin">Pin</button>
        <button class="hatch-batch-btn" data-action="suspend">Suspend</button>
      </div>
    `;

    this.batchBar.querySelectorAll('.hatch-batch-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = (btn as HTMLButtonElement).dataset.action;
        this.executeBatchAction(action || '');
      });
    });
  }

  private async executeBatchAction(action: string): Promise<void> {
    // Extract tab IDs from selected command IDs (format: "switch-tab-123")
    const tabIds: number[] = [];
    for (const cmdId of this.selectedItems) {
      const match = cmdId.match(/^switch-tab-(\d+)$/);
      if (match) tabIds.push(parseInt(match[1], 10));
    }
    if (tabIds.length === 0) return;

    const { sendMessage } = await import('../commands/tabs');

    switch (action) {
      case 'close':
        for (const id of tabIds) {
          sendMessage({ type: 'CLOSE_TAB', tabId: id });
        }
        break;
      case 'group': {
        const title = `Group (${tabIds.length})`;
        // Create group with first tab, then add the rest
        const result = await sendMessage<{ groupId: number }>({
          type: 'CREATE_TAB_GROUP',
          title,
          color: 'blue',
        });
        if (result?.groupId) {
          for (const id of tabIds) {
            sendMessage({ type: 'ADD_TAB_TO_GROUP', tabId: id, groupId: result.groupId });
          }
        }
        break;
      }
      case 'pin':
        for (const id of tabIds) {
          sendMessage({ type: 'PIN_TAB', tabId: id, pinned: true });
        }
        break;
      case 'suspend':
        for (const id of tabIds) {
          sendMessage({ type: 'SUSPEND_TAB', tabId: id });
        }
        break;
    }

    this.selectedItems.clear();
    this.updateBatchBar();
    this.close();
  }

  // ─── Editor Sub-View ────────────────────────────────────

  private showEditor(type: EditorType): void {
    this.editorMode = type;

    // Hide search UI
    this.inputWrapper.style.display = 'none';
    this.resultsList.innerHTML = '';
    this.resultCount.textContent = '';
    if (this.batchBar) this.batchBar.style.display = 'none';

    // Build editor form
    const editor = document.createElement('div');
    editor.className = 'hatch-editor';

    const config = this.getEditorConfig(type);

    // Header
    const header = document.createElement('div');
    header.className = 'hatch-editor-header';
    header.innerHTML = `
      <span class="hatch-editor-icon">${config.icon}</span>
      <span class="hatch-editor-title">${config.title}</span>
    `;

    const backBtn = document.createElement('button');
    backBtn.className = 'hatch-editor-back';
    backBtn.textContent = '← Back';
    backBtn.addEventListener('click', () => this.exitEditor());
    header.appendChild(backBtn);

    editor.appendChild(header);

    // Fields
    const fields: Record<string, HTMLInputElement | HTMLTextAreaElement> = {};

    for (const field of config.fields) {
      const group = document.createElement('div');
      group.className = 'hatch-editor-field';

      const label = document.createElement('label');
      label.className = 'hatch-editor-label';
      label.textContent = field.label;
      group.appendChild(label);

      if (field.hint) {
        const hint = document.createElement('span');
        hint.className = 'hatch-editor-hint';
        hint.textContent = field.hint;
        label.appendChild(hint);
      }

      if (field.multiline) {
        const textarea = document.createElement('textarea');
        textarea.className = 'hatch-editor-textarea';
        textarea.placeholder = field.placeholder;
        textarea.rows = 4;
        group.appendChild(textarea);
        fields[field.key] = textarea;
      } else {
        const input = document.createElement('input');
        input.className = 'hatch-editor-input';
        input.type = 'text';
        input.placeholder = field.placeholder;
        group.appendChild(input);
        fields[field.key] = input;
      }

      editor.appendChild(group);
    }

    // Variable hints for snippets
    if (type === 'snippet') {
      const varHint = document.createElement('div');
      varHint.className = 'hatch-editor-vars';
      varHint.innerHTML = 'Variables: <code>{{date}}</code> <code>{{time}}</code> <code>{{url}}</code> <code>{{title}}</code> <code>{{domain}}</code> <code>{{year}}</code> <code>{{iso}}</code>';
      editor.appendChild(varHint);
    }

    // Buttons
    const actions = document.createElement('div');
    actions.className = 'hatch-editor-actions';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'hatch-editor-save';
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
      this.saveEditorData(type, fields);
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'hatch-editor-cancel';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => this.exitEditor());

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);
    editor.appendChild(actions);

    this.resultsList.appendChild(editor);

    // Focus first field
    const firstField = config.fields[0];
    if (firstField) {
      requestAnimationFrame(() => fields[firstField.key]?.focus());
    }

    // Update footer
    this.footer.querySelector('.hatch-footer-hints')!.innerHTML = `
      <span class="hatch-hint"><kbd>Esc</kbd> cancel</span>
      <span class="hatch-hint"><kbd>Tab</kbd> next field</span>
    `;
  }

  private exitEditor(): void {
    this.editorMode = null;

    // Restore search UI
    this.inputWrapper.style.display = 'flex';
    this.input.value = '';

    // Restore footer hints
    this.footer.querySelector('.hatch-footer-hints')!.innerHTML = `
      <span class="hatch-hint"><kbd>↑↓</kbd> navigate</span>
      <span class="hatch-hint"><kbd>↵</kbd> open</span>
      <span class="hatch-hint"><kbd>⌘↵</kbd> new tab</span>
      <span class="hatch-hint"><kbd>esc</kbd> close</span>
    `;

    requestAnimationFrame(() => this.input.focus());
    this.updateResults();
  }

  private getEditorConfig(type: EditorType): {
    title: string;
    icon: string;
    fields: Array<{ key: string; label: string; placeholder: string; hint?: string; multiline?: boolean }>;
  } {
    switch (type) {
      case 'snippet':
        return {
          title: 'Create Snippet',
          icon: '✂',
          fields: [
            { key: 'trigger', label: 'Trigger', placeholder: ';sig', hint: 'Start with ; recommended' },
            { key: 'name', label: 'Name', placeholder: 'Email Signature' },
            { key: 'body', label: 'Body', placeholder: 'Best regards,\nSounak Das', multiline: true },
          ],
        };
      case 'alias':
        return {
          title: 'Create Alias',
          icon: '🔗',
          fields: [
            { key: 'keyword', label: 'Keyword', placeholder: 'mail' },
            { key: 'url', label: 'URL', placeholder: 'https://mail.google.com', hint: 'Use %s for parameters' },
          ],
        };
      case 'engine':
        return {
          title: 'Add Search Engine',
          icon: '🔎',
          fields: [
            { key: 'keyword', label: 'Keyword', placeholder: 'jira' },
            { key: 'name', label: 'Name', placeholder: 'Jira' },
            { key: 'urlTemplate', label: 'URL Template', placeholder: 'https://jira.com/search?q=%s', hint: '%s = search query' },
          ],
        };
    }
  }

  private async saveEditorData(type: EditorType, fields: Record<string, HTMLInputElement | HTMLTextAreaElement>): Promise<void> {
    const vals: Record<string, string> = {};
    for (const [key, el] of Object.entries(fields)) {
      vals[key] = el.value.trim();
      if (!vals[key]) {
        el.focus();
        el.classList.add('hatch-editor-error');
        setTimeout(() => el.classList.remove('hatch-editor-error'), 1000);
        return;
      }
    }

    switch (type) {
      case 'snippet': {
        const snippet = {
          id: `snip-${Date.now()}`,
          trigger: vals.trigger.startsWith(';') ? vals.trigger : `;${vals.trigger}`,
          name: vals.name,
          body: vals.body,
        };
        await sendMessage({ type: 'SAVE_SNIPPET', snippet });
        break;
      }
      case 'alias': {
        // Load existing, add new
        const aliases = await new Promise<Array<{ keyword: string; url: string }>>((resolve) => {
          chrome.storage.local.get('aliases', (data) => {
            resolve((data.aliases || []) as Array<{ keyword: string; url: string }>);
          });
        });
        const filtered = aliases.filter((a) => a.keyword !== vals.keyword);
        filtered.push({ keyword: vals.keyword, url: vals.url });
        await new Promise<void>((resolve) => {
          chrome.storage.local.set({ aliases: filtered }, resolve);
        });
        break;
      }
      case 'engine': {
        if (!vals.urlTemplate.includes('%s')) {
          const el = fields.urlTemplate;
          el.focus();
          el.classList.add('hatch-editor-error');
          setTimeout(() => el.classList.remove('hatch-editor-error'), 1000);
          return;
        }
        const engines = await new Promise<Array<Record<string, unknown>>>((resolve) => {
          chrome.storage.local.get('customSearchEngines', (data) => {
            resolve((data.customSearchEngines || []) as Array<Record<string, unknown>>);
          });
        });
        const filtered = engines.filter((e) => e.keyword !== vals.keyword);
        filtered.push({ keyword: vals.keyword, name: vals.name, urlTemplate: vals.urlTemplate, icon: '🔎', custom: true });
        await new Promise<void>((resolve) => {
          chrome.storage.local.set({ customSearchEngines: filtered }, resolve);
        });
        break;
      }
    }

    this.exitEditor();
  }

  // ─── Execute ───────────────────────────────────────────

  private executeSelected(metaKey: boolean = false): void {
    const result = this.results[this.selectedIndex];
    if (!result) return;

    const ctx: CommandContext = {
      query: this.input.value,
      metaKey,
      close: () => this.close(),
      showEditor: (type: EditorType) => this.showEditor(type),
    };

    try {
      // Track usage for frecency
      this.registry.trackExecution(result.item.id);
      result.item.action(ctx);
    } catch (err) {
      console.error('[Hatch] Command execution error:', err);
    }
  }
}
