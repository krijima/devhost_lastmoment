# Project memory

## Active project location
The user's follow-up moved active development to D:/shadow/devhost_lastmoment. Version 0.2.0 there replaces dashboard interaction with a consent-based floating mascot/chat and guidance-only actions. This root prototype is retained unchanged. See devhost_lastmoment/Memory.md for current verification and limits.

## 2026-11-12
User named the product Shadow and requested immediate implementation plus Prd.md, Architecture.md, Rules.md, Phases.md, Design.md, and Memory.md maintained throughout development.

Workspace initially contained a separate nested `devhost_lastmoment` repository. It was left untouched. Implementation lives at D:/shadow.

Decision: ship a dependency-free browser runtime and fictional cancellation demo first. Detection is local and heuristic; there is no LLM connection or API key requirement. Approval is deliberately required for every assisted click. Evidence is ephemeral until explicitly exported.

Known limits: no screenshot capture, persistence across navigation, comprehensive detection, regulator authentication, or verified merchant outcomes. Page-controlled event handlers can still misrepresent the effect of a click. No benchmark results exist yet.

Verification: automated tests cover detection, excluded text, untrusted instructions, changed targets, approval, and decline. See package scripts and README for commands.

All five automated tests passed. npm audit reported zero vulnerabilities at installation. The demo server started on http://localhost:3000. Browser visual verification was attempted through the browser skill but unavailable because no Codex IAB backend was discovered. Native unpacked-extension loading has not been tested. Toggling off disconnects the observer and removes change listeners.
