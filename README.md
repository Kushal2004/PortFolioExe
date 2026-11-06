# Kushal's portfolio

Astro renders the portfolio to static HTML, with React islands for theme controls,
animations, contributions, and the WebGL globe.

## Run locally

```sh
npm ci
npm run dev
```

Open the Local URL printed by Astro (normally http://localhost:4321).

```sh
npm run build
npm run preview
npx tsc --noEmit
```

The project npm configuration uses the public npm registry and disables inherited
proxy settings. This fixes installs when the machine's corporate proxy is unavailable.
Legacy peer dependency resolution is retained for the existing React/Three.js stack;
Tailwind and Vite are declared explicitly instead of relying on auto-installed peers.

Set PUBLIC_SITE_URL to the deployed site's absolute URL when building to generate
its sitemap. No template author's domain is used by default.

The contact form posts to FormSubmit. The recipient may need to activate the service
through its confirmation email. Email delivery is not verified by local build checks.

## Rearrangeable panels

Drag a card's background or its grip to move it. On touchscreens, use the grip so
swiping the content still scrolls. Drag any edge or corner to resize. A dashed
preview shows the snapped landing position; neighboring panels move around it.
All panels share a 16px gap. Card title bars are omitted and controls appear only
when hovering near a corner or focusing them with the keyboard. Content reflows
within each panel; measured minimum heights keep it visible without internal
scrollbars. Height limits are refreshed after a gesture settles to prevent jitter.

Focus a panel's grip and use the arrow keys to move it, or Shift + arrows to
resize. Escape cancels an active pointer interaction. Losing window focus also
cancels it. Reset layout restores the defaults for the current screen size.
Layouts are saved locally and separately for phone, tablet, and desktop widths.
The canvas stays within the page width and scrolls vertically to fit the panels.

With the dev server running, run `npm run test:panels` for browser regression checks.
The checks use installed Edge on Windows, or Playwright Chromium elsewhere
(`npx playwright install chromium`). Set TEST_BASE_URL if using a different port.

The dinosaur runs in its own movable/resizable panel. Intro, timeline, and contact decorations are attached to the panel surface so they cover the full height at every size. Existing saved ten-panel layouts are migrated automatically.


## Command palette

Press `/` or `Ctrl+K` (`Cmd+K` on macOS), or use Search & commands in the toolbar.
Search projects, cards, contact, theme, or reset. Arrow keys select a result, Enter
runs it, and Escape closes the palette. Typing `/` in form fields keeps typing
normally. Card navigation focuses and highlights the destination; contact opens
with the name field focused.

Project search uses the local index in `src/data/projects.json`, sourced from
Kushal2004's public, non-fork, non-archived GitHub repositories. Update that file
to add or remove searchable projects; the palette makes no runtime API requests.
External destinations open separately with no opener access.

With the dev server running, `npm run test:commands` checks the shortcuts, focus,
search, external project links, theme/reset actions, and mobile layout.
