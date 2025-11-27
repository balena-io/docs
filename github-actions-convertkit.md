## GitHub Actions: wiring ConvertKit secrets

Add the following repository secrets in GitHub (Settings → Secrets and variables → Actions):

- `CONVERTKIT_API_ENDPOINT` — e.g. `https://api.convertkit.com/v3/forms/<FORM_ID>/subscribe`
- `CONVERTKIT_API_KEY` — optional API key if your endpoint requires it

Example workflow snippet that exposes the secrets as environment variables to your build job:

```yaml
name: Build and deploy docs

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      CONVERTKIT_API_ENDPOINT: ${{ secrets.CONVERTKIT_API_ENDPOINT }}
      CONVERTKIT_API_KEY: ${{ secrets.CONVERTKIT_API_KEY }}
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        run: ./tools/deploy-static-page.sh
```

Notes:
- The site already reads `CONVERTKIT_API_ENDPOINT` and `CONVERTKIT_API_KEY` from environment variables (see `docs/config/index.coffee`).
- After adding the secrets in GitHub, any build job which runs in Actions will have those variables available to the templates at build time.
- If you prefer not to expose the API key to the build logs, avoid echoing `$CONVERTKIT_API_KEY` anywhere in workflow steps.

If you want I can prepare a PR that:
- Adds a sample workflow under `.github/workflows/` using this snippet, and
- Adds a brief QA checklist for testing subscriptions.
