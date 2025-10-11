
# Copilot / AI agent instructions for the balena docs repo

Follow these focused notes when making code or content changes. This file highlights the project's structure, important scripts, conventions, and environment points that make an AI agent immediately productive.

Key facts
- Node engine: package.json requires Node >= 22.0.0.
- The site is a static docs generator using Doxx + Metalsmith-like templates; build output is in `build/` and frontend bundles in `static/dist`.
- Many build/deploy scripts assume a POSIX shell (bash) and Linux tooling (e.g., `cwebp`), so on Windows prefer WSL/Git Bash for running scripts.

Where to look (quick links)
- Content pages: `pages/` (edit markdown here).
- Shared partials: `shared/` (use `{{ import "partialName" }}`).
- Site config and conventions: `config/index.coffee` and `config/doxx.coffee` (pathPrefix, external docs regex, edit links).
- Server entry (local preview): `server/index.coffee` (CoffeeScript, uses `doxx.configureExpress`).
- Build orchestration: `tools/build.sh`, `tools/*` scripts, `webpack.config.js` (frontend bundling).
- NPM scripts: `package.json` (start, build, build:fast, watch, test:spelling).

Important scripts & developer flows
- Install & quick smoke (recommended in WSL/Git Bash on Windows):
	- `npm install`
	- `npm run build:fast`  # faster local build (skips external downloads)
	- `npm start`           # starts local server (uses NODE require of CoffeeScript)
- Full build: `npm run build` (runs `tools/fetch-external.sh` then `build:fast`).
- Watchers:
	- `npm run watch-pages` watches `pages`, `shared`, `templates` and reruns the build script.
	- `npm run watch-assets` runs webpack in watch mode and rebuilds `static/dist`.
	- `npm run watch` runs both (note: uses `&` in scripts; Windows shell behavior differs).
- Spelling check: `npm run test:spelling` (uses `cspell` configured by `cspell.json`).
- Deploy prep: `tools/deploy-static-page.sh` copies `static/*` to `build/`, enforces Cloudflare `_redirects` format, and runs sitemap generation.

Runtime & env conventions
- `PORT` - server listen port (defaults to 3000). See `server/index.coffee`.
- `PATH_PREFIX` - set in `config/index.coffee` and used across templates and server `pathPrefix` handling for hosting under subpaths.
- `DOMAIN`, `DEPLOYMENT_URL`, `DASHBOARD_SITE`, `GOOGLE_VERIFICATION` - documented in `config/index.coffee` and used in layouts and meta generation.
- `editPageLink` in `config/index.coffee` points to GitHub edit URLs used in page footers.

Codebase patterns agents should follow
- Templates & partials: pages include partials with `{{ import "partialName" }}`; prefer updating partials in `shared/` rather than patching many pages.
- External docs: `config/index.coffee` defines `EXTERNAL_DOCS` (a regex). Files matched are generated/linked externally — avoid editing their source text in this repo.
- Doxx usage: `config/doxx.coffee` sets `metaExtra`, `layoutLocals`, `serializeNav` (server/nav.json). Changes to navigation or doc metadata usually involve `doxx` config and `server/nav.json` generation.
- Frontend bundling: `static/scripts/main.js` is the webpack entry; `webpack.config.js` injects globals (`$`, `jQuery`) and uses a languages list for highlight.js context.

Cross-cutting notes & gotchas
- Many `tools/*.sh` assume POSIX concurrency (`&`, `wait`) and GNU utils. On Windows use WSL/Git Bash or run the Node parts directly.
- Image conversion: `tools/convert-images-to-webp.sh` calls `cwebp` and will no-op (exit 0) if `cwebp` missing; CI/deploy expects webp images generated for Cloudflare Pages.
- `deploy-docs` script assumes apt and Linux (`sudo apt install webp`) — don't run on bare Windows shell.
- `build:fast` calls `./tools/build.sh` then `webpack --mode production` then `./tools/deploy-static-page.sh`. Those steps are the canonical local build path before `npm start` preview.

Search tips for agents
- To find where a template variable comes from, search for `pathPrefix`, `editPageLink`, `externalDocs`, `serializeNav` in `config/` and `server/`.
- To see how pages are served, inspect `server/index.coffee` and generated `server/nav.json` (produced by doxx).

When editing content
- Edit markdown files under `pages/` and run `npm run build:fast` to verify rendering locally.
- For design/JS changes, edit `static/scripts/*` and run `npm run watch-assets` (webpack watch) then refresh the local preview.

Example actionable tasks for an AI agent
- Update a device guide: modify `pages/learn/...` markdown, run `npm run build:fast`, and confirm `build/<path>/index.html` changes.
- Add a shared partial: add `shared/my_partial/_default.md`, reference with `{{ import "my_partial" }}`, and run `npm run build:fast`.

If anything here is unclear or you want more examples (CI, Flowzone, or Cloudflare-specific patches), tell me which area to expand and I will iterate.
