# RUSTBOUND

The official Rustbound frontend, built with React, Vite, TypeScript, Tailwind CSS and React Router. The existing in-game logo, industrial palette and sunset reservoir scene carry through the entire website. Images and fonts are served locally.

## Run locally

Requires Node.js 22.12+ (tested with Node 24) and npm.

```powershell
cd D:\RustServer\rustbound-website
npm install
npm run dev
```

Open http://127.0.0.1:5173. Production build and local preview:

```powershell
npm run build
npm run preview
```

The production site is generated in `dist/`. Preview defaults to http://127.0.0.1:4173.

## Pages and features

- `/` — cinematic home, server status, countdown, features, news dialogs and community.
- `/servers` — data-driven server cards and copy-connect controls.
- `/wipes` — the next wipe and an upcoming weekly timeline.
- `/rules` — numbered rules with section navigation.
- `/leaderboards` — sorted Kills, K/D, Playtime and Raids tabs, including keyboard navigation.
- `/store` — fair supporter packages; purchasing is intentionally unavailable.
- `/discord` — community channels and the configured invite.

All pages include responsive navigation, focus states, reduced-motion support and the shared Rustbound footer. Copy-connect has a manual-copy fallback when browser clipboard permission is unavailable.

## Project structure

```text
src/
  assets/           brand/, backgrounds/, icons/, textures/
  components/       Shared navigation, cards, countdown, timeline, dialogs and UI
  config/site.ts    Brand, server, URL, timezone and data-source configuration
  data/             Server definitions, news, rules and wipe schedule
  hooks/            Server polling and state
  lib/              Date, countdown and formatting helpers
  pages/            Seven routes and a 404 page
  services/         Server status and leaderboard adapters
  App.tsx           Router and shared layout
  main.tsx          App entry and local font imports
  styles.css        Tailwind entry, visual identity and responsive layouts
public/             Favicon and license notices
wrangler.jsonc      Cloudflare Workers static assets and SPA routing
tests/e2e/          Browser integration tests
scripts/            Asset export and visual inspection helpers
artifacts/          Desktop and mobile screenshots from verification
docs/               Asset provenance
```

## Configure before deployment

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `VITE_SERVER_IP` | Real server IP or hostname; default is the requested `SERVER_IP` placeholder. |
| `VITE_SERVER_PORT` | Game connection port; default 28015. |
| `VITE_DISCORD_URL` | Full HTTPS Discord invitation. Empty means the invite is coming soon. |
| `VITE_STORE_URL` | Optional HTTPS external store link. Package purchases remain disabled. |
| `VITE_NEXT_WIPE` | Next wipe as an ISO timestamp including its UTC offset. |
| `VITE_MAX_PLAYERS` | Server capacity; default 200. |
| `VITE_REGION` | Display region; default EU. |
| `VITE_DATA_MODE` | `mock` initially; switch to `api` when your backend exists. |
| `VITE_API_BASE_URL` | API prefix; default `/api`. |

Brand copy, Europe/Bucharest timezone and recurring schedule labels live in `src/config/site.ts`. Add servers in `src/data/servers.ts`, edit news in `src/data/news.ts`, and change the schedule model in `src/data/wipes.ts`.

The initial next wipe is **17 September 2026, 19:00 Romania time**. Change it before launch and advance it after each wipe. The countdown stops at zero and shows “WIPE TIME”; it does not pretend a server wipe happened. Additional timeline dates preserve local time across daylight-saving changes. The first Thursday of each month is marked as a force wipe, with its timing labeled for the Rust update; confirm special schedule changes when publishing.

Vite configuration is compiled into the frontend: rebuild after changing these values. All `VITE_` values are public. Server/RCON credentials belong in a future backend, never in this configuration.

The player count and leaderboard entries currently use labeled sample data. Review news dates and package descriptions before launch. No checkout, player authentication or live server backend is included.

## Connecting a live API

Components already consume async service functions and support loading/error states. Set `VITE_DATA_MODE=api` to use the following contracts. Host an API under the same origin or configure its CORS policy for the website origin.

`GET /api/servers/eu-2x-trio`

```json
{
  "online": true,
  "players": 127,
  "maxPlayers": 200,
  "region": "EU",
  "nextWipe": "2026-09-17T19:00:00+03:00"
}
```

Status is refreshed every 60 seconds. Failed API requests display an unavailable state rather than substitute mock values. The separate wipe-page countdown uses the configured schedule date.

`GET /api/leaderboards?metric=kills`

```json
[
  { "id": "player-1", "name": "WASTELAND", "value": 284 },
  { "id": "player-2", "name": "Ashborn", "value": 267 }
]
```

Allowed metrics: `kills`, `kd`, `playtime`, `raids`. Values are non-negative numbers; playtime uses decimal **hours**. Entries are sorted descending by value. Adapters in `src/services/` are the only integration boundary that needs changing for a different response format.

## Deploy

Cloudflare Workers is configured explicitly in `wrangler.jsonc`: it serves `dist/` and uses native `single-page-application` routing for direct visits to `/wipes`, `/rules`, etc. No Worker script or Cloudflare Vite plugin is required for this static frontend.

In Cloudflare Workers Builds, use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: the directory containing this project's `package.json` and `wrangler.jsonc` (repository root if you uploaded the website contents directly).

Commit/upload `wrangler.jsonc`, the updated `package.json` and `package-lock.json`, and the deletion of `public/_redirects` before retrying the deployment. The previous `/* /index.html 200` rule is rejected by Workers as an infinite loop; do not restore it or copy an old `dist/_redirects` file. Vite rebuilds `dist/` from the corrected source.

For a local configuration/build check without publishing, run `npm run deploy:check`. To publish manually from an authenticated Cloudflare environment, run `npm run deploy`. Set the public `VITE_` values as build environment variables in Cloudflare and rebuild after changing them.

The routing configuration follows [Cloudflare's SPA documentation](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/). For another static host, serve `dist/` over HTTPS and configure its SPA fallback. Nginx can use `try_files $uri $uri/ /index.html;`. Route a future `/api/` backend separately, before the SPA fallback.

## Verification

```powershell
npm test
npm run test:e2e
npm run build
```

The browser suite uses locally installed Google Chrome and starts Vite if needed. If Chrome is unavailable, install it or change Playwright's channel and install its Chromium browser. Run with the shipped mock configuration; countdown tests use the initial example date.

Verified: 5 unit tests and 11 browser tests, all seven routes at widths 320, 390, 768, 1024 and 1440px, navigation, clipboard/fallback, live countdown, keyboard tabs, news dialog, mobile menu, no horizontal overflow and no browser errors. Desktop and mobile captures are in `artifacts/`.

See `docs/ASSETS.md` for artwork provenance and `public/licenses/` for third-party notices.
