# Privacy Policy — Hatch

**Effective date:** May 27, 2026

## Overview

Hatch is a browser extension that provides a keyboard-driven command palette for Chrome. This privacy policy explains what data Hatch accesses and how it is handled.

## Data We Access

Hatch accesses the following data **locally within your browser** to provide its core features:

- **Browser history** — accessed via the `history` permission to enable history search through the command palette (`/` prefix).
- **Open tabs** — accessed via the `tabs` permission to let you search and switch between tabs.
- **Tab groups** — accessed via the `tabGroups` permission to manage tab groups.
- **Bookmarks** — accessed via the `bookmarks` permission to enable bookmark search (`#` prefix).
- **Browser sessions** — accessed via the `sessions` permission to restore recently closed tabs.
- **Clipboard** — accessed via `clipboardRead` and `clipboardWrite` to enable snippet expansion and clipboard history. Clipboard data is stored locally for up to 7 days.
- **Page metadata** — accessed on the active tab only when you explicitly run a command (e.g., copy URL, copy title, extract metadata). This is temporary and user-initiated.

## Data We Store

All user data is stored **locally** on your device using `chrome.storage.local`. This includes:

- Aliases and quicklinks
- Text snippets
- Quick notes
- Clipboard history (last 50 items, 7-day expiry)
- User preferences (theme, settings)

No data is stored on external servers.

## Data We Do NOT Collect

Hatch does **not** collect, transmit, or share:

- Personally identifiable information (name, email, address)
- Financial or payment information
- Authentication credentials or passwords
- Location data
- Browsing behavior analytics or telemetry
- Any data with third-party services

## How Data Is Used

All data accessed by Hatch is used solely to populate the command palette and execute the specific command you select. Data is processed entirely within your browser and is never sent to any external server, API, or database.

## Data Retention & Deletion

You can clear all Hatch data at any time by:

1. Opening Hatch Settings from the command palette
2. Using the "Export & Reset" option, or
3. Removing the extension from Chrome, which deletes all associated local storage

Clipboard history items are automatically deleted after 7 days.

## Changes to This Policy

If this privacy policy changes, the updated version will be posted at this URL with a revised effective date.

## Contact

For questions about this privacy policy, open an issue on GitHub:  
https://github.com/LittleBoy9/hatch/issues
