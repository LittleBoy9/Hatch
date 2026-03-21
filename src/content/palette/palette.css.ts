export const paletteCSS = `
/* ─── Reset ───────────────────────────────────────────────── */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ─── CSS Variables ───────────────────────────────────────── */

:host {
  --hatch-bg: #1a1a2e;
  --hatch-bg-secondary: #16213e;
  --hatch-bg-hover: #1e2a4a;
  --hatch-bg-selected: #2541b2;
  --hatch-border: rgba(255, 255, 255, 0.08);
  --hatch-border-focus: rgba(99, 102, 241, 0.5);
  --hatch-text: #e2e8f0;
  --hatch-text-secondary: #94a3b8;
  --hatch-text-muted: #64748b;
  --hatch-accent: #6366f1;
  --hatch-accent-glow: rgba(99, 102, 241, 0.15);
  --hatch-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(255, 255, 255, 0.05),
                  0 0 80px -20px rgba(99, 102, 241, 0.15);
  --hatch-radius: 16px;
  --hatch-radius-sm: 8px;
  --hatch-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif;
  --hatch-transition: 150ms cubic-bezier(0.16, 1, 0.3, 1);

  font-family: var(--hatch-font);
  font-size: 14px;
  line-height: 1.5;
  color: var(--hatch-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── Light theme (auto via media query) ─────────────────── */

@media (prefers-color-scheme: light) {
  :host(:not([data-theme="dark"])) {
    --hatch-bg: #ffffff;
    --hatch-bg-secondary: #f8fafc;
    --hatch-bg-hover: #f1f5f9;
    --hatch-bg-selected: #6366f1;
    --hatch-border: rgba(0, 0, 0, 0.08);
    --hatch-border-focus: rgba(99, 102, 241, 0.5);
    --hatch-text: #0f172a;
    --hatch-text-secondary: #475569;
    --hatch-text-muted: #94a3b8;
    --hatch-accent: #6366f1;
    --hatch-accent-glow: rgba(99, 102, 241, 0.1);
    --hatch-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15),
                    0 0 0 1px rgba(0, 0, 0, 0.05),
                    0 0 80px -20px rgba(99, 102, 241, 0.1);
  }
}

/* ─── Forced light theme ─────────────────────────────────── */

:host([data-theme="light"]) {
  --hatch-bg: #ffffff;
  --hatch-bg-secondary: #f8fafc;
  --hatch-bg-hover: #f1f5f9;
  --hatch-bg-selected: #6366f1;
  --hatch-border: rgba(0, 0, 0, 0.08);
  --hatch-border-focus: rgba(99, 102, 241, 0.5);
  --hatch-text: #0f172a;
  --hatch-text-secondary: #475569;
  --hatch-text-muted: #94a3b8;
  --hatch-accent: #6366f1;
  --hatch-accent-glow: rgba(99, 102, 241, 0.1);
  --hatch-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 0 0 1px rgba(0, 0, 0, 0.05),
                  0 0 80px -20px rgba(99, 102, 241, 0.1);
}

/* ─── Backdrop ────────────────────────────────────────────── */

.hatch-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity var(--hatch-transition);
  pointer-events: none;
}

.hatch-backdrop.visible {
  opacity: 1;
  pointer-events: auto;
}

/* ─── Palette Container ──────────────────────────────────── */

.hatch-palette {
  position: fixed;
  top: 18vh;
  left: 50%;
  transform: translateX(-50%) scale(0.96);
  z-index: 2147483647;
  width: 640px;
  max-width: calc(100vw - 32px);
  max-height: 70vh;
  background: var(--hatch-bg);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius);
  box-shadow: var(--hatch-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transition: opacity var(--hatch-transition), transform var(--hatch-transition);
  pointer-events: none;
}

.hatch-palette.visible {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  pointer-events: auto;
}

/* ─── Input Area ─────────────────────────────────────────── */

.hatch-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--hatch-border);
}

.hatch-search-icon {
  flex-shrink: 0;
  color: var(--hatch-text-muted);
  display: flex;
  align-items: center;
}

.hatch-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--hatch-text);
  font-size: 16px;
  font-family: var(--hatch-font);
  font-weight: 400;
  caret-color: var(--hatch-accent);
  letter-spacing: -0.01em;
}

.hatch-input::placeholder {
  color: var(--hatch-text-muted);
  font-weight: 400;
}

.hatch-shortcut-hint {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--hatch-text-muted);
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 6px;
  padding: 2px 8px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* ─── Results List ───────────────────────────────────────── */

.hatch-results {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--hatch-border) transparent;
}

.hatch-results::-webkit-scrollbar {
  width: 6px;
}

.hatch-results::-webkit-scrollbar-track {
  background: transparent;
}

.hatch-results::-webkit-scrollbar-thumb {
  background: var(--hatch-border);
  border-radius: 3px;
}

/* ─── Section Header ─────────────────────────────────────── */

.hatch-section-header {
  font-size: 11px;
  font-weight: 600;
  color: var(--hatch-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 10px 12px 4px;
  user-select: none;
}

.hatch-section-header:first-child {
  padding-top: 4px;
}

/* ─── Result Item ────────────────────────────────────────── */

.hatch-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--hatch-radius-sm);
  cursor: pointer;
  transition: background var(--hatch-transition);
  user-select: none;
}

.hatch-result-item:hover {
  background: var(--hatch-bg-hover);
}

.hatch-result-item.selected {
  background: var(--hatch-accent);
  color: #ffffff;
}

.hatch-result-item.selected .hatch-result-desc,
.hatch-result-item.selected .hatch-result-badge {
  color: rgba(255, 255, 255, 0.7);
}

.hatch-result-item.selected .hatch-result-icon {
  color: rgba(255, 255, 255, 0.9);
}

/* ─── Result Icon ────────────────────────────────────────── */

.hatch-result-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius-sm);
  font-size: 16px;
  color: var(--hatch-text-secondary);
  overflow: hidden;
}

.hatch-result-item.selected .hatch-result-icon {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.hatch-result-icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 2px;
}

/* ─── Result Text ────────────────────────────────────────── */

.hatch-result-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.hatch-result-name {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.hatch-result-desc {
  font-size: 12px;
  color: var(--hatch-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── Category Badge ─────────────────────────────────────── */

.hatch-result-badge {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  color: var(--hatch-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 100px;
}

.hatch-result-item.selected .hatch-result-badge {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

/* ─── Empty State ────────────────────────────────────────── */

.hatch-empty {
  text-align: center;
  padding: 48px 20px 40px;
  color: var(--hatch-text-muted);
  font-size: 14px;
}

.hatch-empty-icon {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.4;
}

.hatch-empty-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--hatch-text-secondary);
  margin-bottom: 8px;
}

.hatch-empty-hints {
  font-size: 12px;
  color: var(--hatch-text-muted);
  line-height: 1.8;
}

.hatch-empty-hints kbd {
  font-family: var(--hatch-font);
  font-size: 11px;
  font-weight: 600;
  color: var(--hatch-text-secondary);
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 4px;
  padding: 1px 5px;
}

/* ─── Footer ─────────────────────────────────────────────── */

.hatch-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid var(--hatch-border);
  background: var(--hatch-bg-secondary);
}

.hatch-footer-hints {
  display: flex;
  gap: 16px;
}

.hatch-hint {
  font-size: 11px;
  color: var(--hatch-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.hatch-hint kbd {
  font-family: var(--hatch-font);
  font-size: 11px;
  font-weight: 600;
  color: var(--hatch-text-secondary);
  background: var(--hatch-bg);
  border: 1px solid var(--hatch-border);
  border-radius: 4px;
  padding: 1px 5px;
  min-width: 20px;
  text-align: center;
}

.hatch-footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hatch-result-count {
  font-size: 11px;
  color: var(--hatch-text-muted);
  font-variant-numeric: tabular-nums;
}

.hatch-brand {
  font-size: 11px;
  font-weight: 700;
  color: var(--hatch-accent);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ─── Match Highlighting ─────────────────────────────────── */

.hatch-highlight {
  background: var(--hatch-accent-glow);
  color: var(--hatch-accent);
  border-radius: 2px;
  padding: 0 1px;
  font-weight: 600;
}

.hatch-result-item.selected .hatch-highlight {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

/* ─── Multi-Select ──────────────────────────────────────── */

.hatch-check {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--hatch-accent);
  background: var(--hatch-accent-glow);
  border-radius: 4px;
  margin-right: 4px;
}

.hatch-result-item.multi-selected {
  background: rgba(99, 102, 241, 0.08);
  border-left: 2px solid var(--hatch-accent);
  padding-left: 14px;
}

.hatch-result-item.multi-selected.selected {
  background: var(--hatch-bg-selected);
}

/* ─── Batch Action Bar ──────────────────────────────────── */

.hatch-batch-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--hatch-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
}

.hatch-batch-count {
  font-weight: 600;
}

.hatch-batch-actions {
  display: flex;
  gap: 6px;
}

.hatch-batch-btn {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: background 0.1s;
}

.hatch-batch-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}

/* ─── Editor Sub-View ────────────────────────────────────── */

.hatch-editor {
  padding: 20px;
}

.hatch-editor-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.hatch-editor-icon {
  font-size: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hatch-accent-glow);
  border-radius: var(--hatch-radius-sm);
}

.hatch-editor-title {
  font-size: 16px;
  font-weight: 600;
  flex: 1;
}

.hatch-editor-back {
  background: transparent;
  color: var(--hatch-text-muted);
  border: 1px solid var(--hatch-border);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.hatch-editor-back:hover {
  color: var(--hatch-text);
  border-color: var(--hatch-text-muted);
}

.hatch-editor-field {
  margin-bottom: 14px;
}

.hatch-editor-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--hatch-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.hatch-editor-hint {
  font-size: 11px;
  font-weight: 400;
  color: var(--hatch-text-muted);
  text-transform: none;
  letter-spacing: 0;
}

.hatch-editor-input,
.hatch-editor-textarea {
  width: 100%;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius-sm);
  color: var(--hatch-text);
  padding: 10px 14px;
  font-size: 14px;
  font-family: var(--hatch-font);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.hatch-editor-input:focus,
.hatch-editor-textarea:focus {
  border-color: var(--hatch-accent);
  box-shadow: 0 0 0 3px var(--hatch-accent-glow);
}

.hatch-editor-textarea {
  resize: vertical;
  min-height: 80px;
  font-family: monospace, var(--hatch-font);
  line-height: 1.5;
}

.hatch-editor-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
  animation: hatch-shake 0.3s ease;
}

@keyframes hatch-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.hatch-editor-vars {
  font-size: 12px;
  color: var(--hatch-text-muted);
  margin-bottom: 16px;
  line-height: 1.8;
}

.hatch-editor-vars code {
  font-family: monospace;
  font-size: 11px;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--hatch-text-secondary);
}

.hatch-editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.hatch-editor-save {
  background: var(--hatch-accent);
  color: #ffffff;
  border: none;
  border-radius: var(--hatch-radius-sm);
  padding: 8px 24px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: background 0.15s;
}

.hatch-editor-save:hover {
  background: #818cf8;
}

.hatch-editor-cancel {
  background: transparent;
  color: var(--hatch-text-muted);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius-sm);
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.hatch-editor-cancel:hover {
  color: var(--hatch-text);
  border-color: var(--hatch-text-muted);
}
`;
