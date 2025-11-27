## Monetization Setup

This site now supports multiple revenue streams: **newsletter subscriptions**, **ads (Google AdSense / Carbon Ads)**, and **affiliate links**.

### 1. Newsletter (ConvertKit)
Already set up. See `.convertkit.md` for details.

---

### 2. Google AdSense (Recommended for most sites)

**Setup:**
1. Sign up at [google.com/adsense](https://google.com/adsense)
2. Go to **Settings → App sites** and add your docs domain
3. Copy your **Client ID** (format: `ca-pub-xxxxxxxxxxxxxxxx`)
4. Add to GitHub Actions secrets:
   - Secret name: `GOOGLE_ADSENSE_CLIENT_ID`
   - Value: your client ID

**How it works:**
- Ads render in the sidebar via `_monetization.html`
- Revenue: ~$0.50–$3 per 1,000 views (depends on traffic source & topic)

---

### 3. Carbon Ads (Better for tech/developer docs)

**Setup:**
1. Sign up at [carbonads.com](https://www.carbonads.com)
2. Create a new ad placement for your site
3. Copy your **placement ID**
4. Add to GitHub Actions secrets:
   - Secret name: `CARBON_ADS_PLACEMENT`
   - Value: your placement ID (e.g., `carbonads-placement`)

**How it works:**
- Ads render in the sidebar (if Google AdSense is not configured)
- Revenue: typically $20–$100/day for tech docs with 1k+ daily visitors
- Better UX for developer audiences

---

### 4. Amazon Associates / Affiliate Links

**Setup:**
1. Sign up at [amazon.com/associates](https://amazon.com/associates)
2. Get your **affiliate tag** (format: `mysite-20`)
3. Add to GitHub Actions secrets:
   - Secret name: `AFFILIATE_AMAZON_TAG`
   - Value: your tag

**How to use in content:**
```markdown
<a href="javascript:void(0)" onclick="window.open(window.affiliate_link('https://amazon.com/dp/B000000000', 'amazon'))">
  Recommended Tool
</a>
```

Or use a helper template in your docs to create affiliate links:
```html
{% set link = affiliate_link('https://amazon.com/dp/B000000000', 'amazon') %}
<a href="{{ link }}">Recommended Tool</a>
```

**How it works:**
- Automatically appends your affiliate tag to Amazon links
- Tracks with UTM parameters
- Revenue: 2–10% commission on purchases

---

### 5. Sponsored Content (Manual)

Add sponsor logos/links to relevant docs pages for $500–$5k per post:
```html
<div style="padding:12px;background:#f0f0f0;border-left:4px solid #0066cc;">
  <p><strong>Sponsored by:</strong> <a href="{{ sponsor_link }}">{{ sponsor_name }}</a></p>
</div>
```

---

### GitHub Actions Secrets Setup

Go to **Settings → Secrets and variables → Actions** and add:

| Secret Name | Value | Required |
|-------------|-------|----------|
| `CONVERTKIT_API_ENDPOINT` | ConvertKit form URL | Yes (for newsletter) |
| `CONVERTKIT_API_KEY` | Your API key | Optional |
| `GOOGLE_ADSENSE_CLIENT_ID` | `ca-pub-...` | Optional (pick one ad service) |
| `CARBON_ADS_PLACEMENT` | Your placement ID | Optional (pick one ad service) |
| `AFFILIATE_AMAZON_TAG` | `site-20` | Optional |

---

### Revenue Estimate (10k monthly visitors)

- **Newsletter**: $100–$500/mo (depends on CTA clicks & offer)
- **Google AdSense**: $50–$150/mo
- **Carbon Ads**: $200–$1k/mo (for tech docs)
- **Affiliate Links**: $50–$300/mo (depends on CTR)
- **Sponsored Content**: $500–$5k per post

**Total potential: $900–$7,300/mo** at 10k monthly visitors.

---

### Testing Locally

Set env vars and rebuild:
```bash
export GOOGLE_ADSENSE_CLIENT_ID="ca-pub-test"
export CARBON_ADS_PLACEMENT="test-placement"
export AFFILIATE_AMAZON_TAG="test-20"
npm run build
```

Visit a page and check that ads and affiliate links render correctly.

