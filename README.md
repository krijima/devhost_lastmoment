# Shadow

A working hackathon prototype: a floating consumer assistant and an interactive cancellation playground. Local heuristic detection; no model service configured.

## Run the demo

Requires Node.js 20+. Run `npm install`, then `npm start`. Open http://localhost:3000 and choose **Try a live walkthrough**.

Follow Cancel subscription → retention offer → final review. Use Shadow to inspect findings, find the next step, and explicitly approve each click. View the Evidence tab to download JSON. No real account or payment is involved.

## Load the extension

Open `chrome://extensions` or `edge://extensions`, enable Developer mode, choose Load unpacked, and select `D:/shadow/extension`. Pin Shadow and click its toolbar icon on an ordinary HTTP(S) webpage. Click again to toggle it off. Browser internal pages and extension stores may block injection. Re-enable after a full navigation.

## Test

`npm test`

## Limits and privacy

Findings are rule-based observations and can be wrong. Every assisted click requires approval. A webpage controls the effect of its controls; review consequences yourself. Shadow does not verify cancellation success. It reads page text and control labels, not password or payment input values. It makes no network requests. Evidence stays in memory and disappears on close/reload unless exported. Redaction is best effort: inspect exports before sharing. This prototype does not capture screenshots or produce authenticated regulatory evidence.

The demo optionally loads fonts from Google Fonts. Its fictional service has no network account actions.

Browser implementation references: [Chrome active-tab injection](https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-activetab) and [permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions).
