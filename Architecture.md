# Architecture

Toolbar → service worker → active-tab injection → local detection engine → isolated floating UI → user approval → one DOM click.

`extension/manifest.json` requests activeTab and scripting only. `background.js` injects scripts on user activation. `engine.js` scans text and control metadata without reading input values. `content.js` owns an isolated shadow-root interface, debounce observer, goal, ephemeral evidence, pending action, and export. Page content never becomes an instruction or executable code; UI observations use textContent.

`index.html`, `style.css`, and `demo.js` form the demonstration. `server.cjs` serves only an explicit allowlist on loopback port 3000. Demo fonts optionally load from Google Fonts with system fallbacks; the extension makes no network requests.

Approval binds target reference, label, URL, and goal. DOM mutations or goal changes invalidate it. This reduces stale approvals but does not provide a security boundary against a malicious page changing click handlers or misleading labels. The page controls what its click does.

Evidence is bounded to 200 events in memory; no URL query strings or form values are stored. Email/long-number redaction is best effort. Reload/navigation loses the session; re-enable on the next page. JSON exports are observations, not independently authenticated legal evidence.

Future model integration: explicit opt-in to send a redacted snapshot through a backend; structured recommendations only; extension keeps the action/approval gate. Never embed provider secrets in the extension.
