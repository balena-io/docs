# balenaCloud Documentation

balenaCloud documentation is a Node.js-based static site generator using Metalsmith.io and Doxx for dynamic content generation. The site fetches content from multiple external GitHub repositories and the balenaCloud API to create comprehensive documentation.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- Bootstrap and build the repository:
  - `sudo apt update && sudo apt install -y webp` -- installs required cwebp tool for image conversion
  - `npm install` -- takes ~40 seconds. NEVER CANCEL. Node.js 22+ preferred but 20+ works with warnings.
  - CRITICAL: Create required dictionary files if missing (build will fail without them):
    ```bash
    # Create minimal device.json if missing
    echo '{"raspberrypi4-64":{"name":"Raspberry Pi 4 64-bit","slug":"raspberrypi4-64","cpu":"ARMv8"}}' > config/dictionaries/device.json
    # Create minimal version dictionaries if missing  
    echo '[{"name":"v18.1.1","slug":"v18.1.1","released_at":"2024-01-01"}]' > config/dictionaries/balenacli.json
    echo '[{"name":"v20.8.3","slug":"v20.8.3","released_at":"2024-01-01"}]' > config/dictionaries/nodesdk.json
    echo '[{"name":"v18.1.1","slug":"v18.1.1","released_at":"2024-01-01"}]' > config/dictionaries/pythonsdk.json
    ```

- Build the documentation:
  - FULL BUILD: `npm run build` -- takes 8-15 minutes. NEVER CANCEL. Set timeout to 20+ minutes. Fetches external content and builds everything.
  - FAST BUILD: `npm run build:fast` -- takes 4-8 minutes. NEVER CANCEL. Set timeout to 15+ minutes. Skips external content fetching.
  - WARNING: Build requires internet access to balena APIs and GitHub. In sandboxed environments, expect network failures but partial builds may still work.

- Test and validate:
  - `npm run test:spelling` -- takes ~3 seconds. Tests spelling across all documentation files.
  - `npm start` -- starts development server on http://localhost:3000. Requires successful build first or minimal nav.json file.

## Critical Build Information

- **TIMEOUT REQUIREMENTS**: 
  - npm install: 60+ seconds timeout
  - npm run build: 20+ minutes timeout - NEVER CANCEL 
  - npm run build:fast: 15+ minutes timeout - NEVER CANCEL
  - npm run test: 5+ minutes timeout - NEVER CANCEL

- **Network Dependencies**: Build fetches from:
  - balena-cloud.com API (device types, contracts)
  - Multiple GitHub repositories (balena-cli, balena-sdk, balena-os, etc.)
  - In restricted environments, create placeholder files as shown above

- **Required System Dependencies**:
  - Node.js 20+ (22+ preferred)
  - webp package (`sudo apt install webp`)
  - jq (usually pre-installed)

## Validation Scenarios

- **ALWAYS** run complete build and test cycle after making changes:
  1. `npm run build:fast` -- to verify content generation works
  2. `npm run test:spelling` -- to check for spelling errors
  3. `npm start` -- to verify development server starts
  4. Visit http://localhost:3000 and navigate through several pages to ensure content renders correctly

- **Manual Testing**: After starting the server, test:
  - Homepage loads and redirects properly
  - Navigation works between documentation sections
  - Dynamic content (device types, CLI docs) displays correctly
  - Search functionality works if available

## Build Failures and Troubleshooting

- **"Unknown key $device" or similar errors**: Missing dictionary files in config/dictionaries/. Create placeholder files as shown above.
- **"Could not be found" partial errors**: Missing shared content files. May need to run `npm run build` (full) instead of build:fast to fetch external content.
- **"ENOTFOUND api.balena-cloud.com"**: Network restrictions. Expected in sandboxed environments. Build may partially succeed but some dynamic content will be missing.
- **"cwebp is not installed"**: Run `sudo apt install webp` first. Build continues with warning but images won't be converted to WebP.
- **"SyntaxError: Unexpected end of JSON input" for nav.json**: Missing or corrupt server/nav.json. Create minimal file: `echo '{}' > server/nav.json`
- **Node version warnings**: Node 22+ preferred but 20+ works. Warnings about EBADENGINE are expected and can be ignored.
- **NPM audit vulnerabilities**: Expected due to legacy dependencies. Not blocking for development.

## Common Tasks and File Structure

### Key Directories
- `/pages` -- Main documentation content (markdown files)
- `/shared` -- Reusable content partials and templates
- `/config` -- Build configuration and data dictionaries
- `/tools` -- Build scripts and utilities
- `/templates` -- HTML templates for site generation

### Build Scripts
- `tools/build.sh` -- Main build orchestrator
- `tools/fetch-external.sh` -- Fetches content from external repositories  
- `tools/versioning.js` -- Generates versioned documentation from GitHub releases
- `tools/generate-docs-contracts.js` -- Creates device type contracts

### Development Workflow
- Edit markdown files in `/pages` or `/shared`
- Run `npm run build:fast` to rebuild (4-8 minutes) OR use `npm run watch-pages` for auto-rebuilding during development
- Test with `npm start` and visit http://localhost:3000
- Always run spelling check before committing: `npm run test:spelling`
- Use `npm run watch-assets` for CSS/JS asset rebuilding during development

## External Dependencies

The build pulls content from these repositories:
- balena-cli (CLI documentation)
- balena-sdk (Node.js SDK docs) 
- balena-sdk-python (Python SDK docs)
- balena-supervisor (Supervisor API docs)
- meta-balena (OS configuration docs)
- Various masterclass repositories

In restricted environments, builds will show "Blocked by" or "ENOTFOUND" errors but may still partially succeed.

## Important Notes

- DO NOT modify CHANGELOG.md manually - it's auto-generated
- Use semantic commit prefixes: `patch:`, `minor:`, `major:`
- Development server requires either successful build or minimal `server/nav.json`
- Image conversion to WebP format requires cwebp system package
- Build warnings about Node versions and deprecated packages are expected
- In sandboxed environments, focus on testing with offline/cached content