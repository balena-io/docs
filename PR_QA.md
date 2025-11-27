## PR: Add newsletter & CTA workflow

This PR contains:
- `templates/_newsletter.html` — newsletter include (supports Mailchimp and ConvertKit)
- `templates/_cta.html` — article CTA include
- `templates/default.html` — includes for newsletter and CTA
- `config/index.coffee` — exposes `CONVERTKIT_API_ENDPOINT` and `CONVERTKIT_API_KEY` from env
- `.env.example` and `docs/.convertkit.md` — usage and testing docs
- `.github/workflows/docs-deploy.yml` — sample workflow that exposes ConvertKit secrets

QA Checklist (before merging):

1. Add repository secrets in GitHub (Settings → Secrets and variables → Actions):
   - `CONVERTKIT_API_ENDPOINT` (e.g. `https://api.convertkit.com/v3/forms/<FORM_ID>/subscribe`)
   - `CONVERTKIT_API_KEY` (optional)

2. Run a local build to ensure templates render:

```bash
npm ci
npm run build
```

3. Start a local static server (if you have one) to visually check pages that include the CTA and sidebar newsletter.

4. Test ConvertKit subscription flow with `curl` (replace with real endpoint):

```bash
curl -X POST "$CONVERTKIT_API_ENDPOINT" -H "Content-Type: application/json" -d '{"email":"you@example.com"}'
```

5. Visit a built article page and verify:
   - CTA appears under the article content.
   - Sidebar newsletter form appears.
   - Submitting the form triggers the ConvertKit endpoint (monitor network tab or use a test endpoint).

6. Verify analytics/cookie consent isn't blocking expected events when consent is granted.

7. Confirm no sensitive values are printed in build logs (do not `echo` secrets in workflows).

If everything checks out, create the PR from a feature branch and request review.
