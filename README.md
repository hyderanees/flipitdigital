# FlipIt Digital — Marketing & Marketplace Website

The trusted escrow marketplace for digital assets. A complete, production-ready
multi-page static website for **flipitdigital.com** built from the ground up
with no build step required.

This is the **public marketing site + marketplace storefront**. The actual
backend (auth, escrow ledger, payments, dispute engine, KYC integration, etc.)
lives in a separate codebase.

## Pages included (14)

| Page | URL | Purpose |
|---|---|---|
| Home | `/` `index.html` | Hero, escrow flow, categories, features, social proof |
| Browse | `/browse.html` | Marketplace with sidebar filters, search, sort |
| Product detail | `/product.html` | Single listing with escrow purchase flow |
| Categories | `/categories.html` | All categories grouped by pillar |
| How escrow works | `/how-it-works.html` | Deep dive into 5-step escrow + dispute flow |
| Sell | `/sell.html` | Become-a-seller landing with earnings calculator |
| Trust & Safety | `/trust-safety.html` | Five-layer protection model + acceptable-use |
| Pricing | `/pricing.html` | Tiered seller commissions + add-ons |
| FAQ | `/faq.html` | Buying, selling, trust, account |
| About | `/about.html` | Mission, timeline, values |
| Contact | `/contact.html` | Multi-channel + form |
| Login / Signup | `/login.html`, `/signup.html` | Auth UI with OAuth + role select |
| Dashboard | `/dashboard.html` | Seller dashboard mockup with KPIs, chart, orders |
| Terms / Privacy | `/terms.html`, `/privacy.html` | Legal |
| 404 | `/404.html` | Custom not-found page |

Plus: `sitemap.xml`, `robots.txt`, `_headers`, `_redirects`, `netlify.toml`.

## Stack

- **Pure HTML5** — no framework, no build tooling
- **Vanilla CSS** — custom design system in `assets/css/styles.css` (~30 KB)
- **Vanilla JS** — `assets/js/main.js` for filters, mobile menu, reveal-on-scroll, FAQ accordion
- **Google Fonts** — Inter (UI) + Sora (display)
- **Inline SVG icons** — no icon library, no extra requests

## Brand identity

- **Name**: FlipIt Digital
- **Tagline**: "The trusted marketplace for digital assets."
- **Logo**: shield with checkmark — symbolises escrow protection
- **Palette** (defined in CSS variables):
  - Backgrounds: `#05060B → #1A2040` (deep midnight)
  - Primary (Violet): `#6C5CE7`
  - Cyan (Trust): `#00E5FF`
  - Emerald (Secure / Money): `#10F2A0`
  - Amber & Rose for accents
- **Typography**: Sora 700/800 for headlines, Inter 400–700 for everything else
- **Visual style**: Glassmorphism cards on a dark gradient background with
  subtle dot-grid overlay, neon glows, and floating product previews

## Run locally

No build needed. Just serve the folder:

```bash
# any static file server works
python3 -m http.server 8080
# or
npx serve .
# or
npx http-server .
```

Open <http://localhost:8080> in your browser.

## Deploy

### Cloudflare Pages / Netlify (recommended)

1. Push this folder to a Git repo
2. Connect the repo on Cloudflare Pages or Netlify
3. **Build command**: leave blank
4. **Output directory**: `.` (the root)
5. Add custom domain `flipitdigital.com`

### Vercel

1. `vercel deploy` from this folder — choose "Other" framework

### Any static host

Upload all files preserving the directory structure:

```
flipitdigital-site/
├── index.html (and other .html pages)
├── assets/css/styles.css
├── assets/js/main.js
├── sitemap.xml, robots.txt, _headers, _redirects, 404.html
```

## Customise

### Colours
Edit the CSS variables at the top of `assets/css/styles.css`. Everything is
themed off `--primary`, `--cyan`, `--emerald`, etc.

### Copy
All copy is inline in the HTML files. Search for the section heading and edit
in place.

### Add a new product card
Open `browse.html`, copy any `.product-card` block, edit the gradient,
title, price, and `data-cat` / `data-price` / `data-rating` attributes.

### Add a new page
Copy `faq.html` (it's the simplest), update the `<title>`, `<h1>`, and content.
The shared header/footer are inlined — keep them in sync if you change them.

## Performance

- **Total CSS**: ~30 KB uncompressed (~7 KB gzipped)
- **Total JS**: ~3 KB uncompressed
- **No external requests** beyond Google Fonts (preconnected)
- **Lighthouse target**: 95+ on all four scores

## License & ownership

All code & content © FlipIt Digital, 2026. The visual design, brand identity,
copy, and structure are bespoke for flipitdigital.com.

---

Built with care for trust. Powered by escrow.
