## Quick context for AI coding agents

This repository builds the balenaCloud documentation site. It's a static-site generator using `@balena/doxx` + Metalsmith-style templates. Key points an agent should know to be productive:

- Source markdown lives under `pages/` (see `config/index.coffee` -> `docsSourceDir`).
- Build output is written to `build/` (`docsDestDir`). The server will serve static files from `build/`.
- Server entrypoint: `server/index.coffee` — it wires `@balena/doxx` into an Express app and uses `config/pathPrefix` when serving content.
- Many documentation pages are generated from external sources; `tools/fetch-external.sh` pulls them in and `config/index.coffee` marks them as `EXTERNAL_DOCS`.

## Build / run / watch (concrete commands)

- Install dependencies: `npm install` (Node >= 22 required per `package.json`).
- Full build (fetch externals + build): `npm run build`.
- Fast local build (skips external downloads): `npm run build:fast`.
- Start local server: `npm start` -> serves on http://localhost:3000 by default.
- Watch pages and assets while editing:
  - `npm run watch-pages` (rebuilds when `pages`, `shared`, `templates` or `config` change)
  - `npm run watch-assets` (webpack dev watcher)
  - Or `npm run watch` to run both.

Docker targets in the `Makefile` build and run a container image (`resin/docs:latest`) that exposes port 3000 if you prefer containerized testing.

## Project-specific patterns and conventions

- Templates: `templates/` contains HTML templates used by Doxx. Partials live under `shared/` and are included with `{{ import "partialName" }}`.
- Variable & link interpolation: `config/` contains `links.coffee`, `names.coffee`, and `dictionaries/` — pages use `{{ $links.xxx }}` and `{{ $names.xxx }}`.
- External docs: Files listed in `EXTERNAL_DOCS` (see `config/index.coffee`) are overwritten by `tools/fetch-external.sh`. Avoid manual edits to those files unless you also update the fetch script and `config`.
- Static assets: `static/` files are served directly (CSS, images). Images should be placed under `static/img/` and are converted to webp during deployment (`tools/convert-images-to-webp.sh` / CI step).

## Common edit patterns (examples an agent can suggest)

- To add a new reference page: create `pages/reference/<area>/<page>.md`, follow existing headings (avoid excessive top-level h1s — they appear in the sidebar).
- To add a new partial: add `_default.md` under `shared/<partialName>/` and reference with `{{ import "<partialName>" }}`.
- To update an externally-sourced doc: edit `tools/fetch-external.sh` and add the filename to `config/index.coffee` EXTERNAL_DOCS and to `config/links.coffee` so the "Improve this doc" link works.

## CI / environment notes

- `GITHUB_TOKEN` can be provided to speed up fetches in scripts (`tools/fetch-external.sh`, `tools/versioning.js`). `package.json` build expects Node >= 22.
- `PATH_PREFIX` (env) is used by the server (`config/index.coffee` -> `pathPrefix`) — the server and templates honor it; when running locally leave it empty.

## Files to inspect for context when making changes

- `package.json` — scripts and engine/node requirement
- `config/index.coffee` — docs/source/dest and external docs rules
- `tools/fetch-external.sh` and `tools/build.sh` — external fetch & build orchestration
- `server/index.coffee` — express server and pathPrefix handling
- `templates/` and `shared/` — site structure and partials

If anything above is unclear or you want examples for a specific change (add page, add partial, change build pipeline), tell me which area and I'll expand the instructions or apply the change.
