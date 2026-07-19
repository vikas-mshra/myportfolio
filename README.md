# Vikas Mishra — Portfolio

Concise single-page portfolio built with Create React App, React 18, and SCSS. Deployed on Netlify.

The production build prerenders the homepage into static HTML (`scripts/prerender.mjs` using `react-dom/server` + esbuild) so search engines and link previews can read the portfolio content without running JavaScript. The client then hydrates for theme toggle, video controls, navigation, and the contact form.

## Local development

```bash
cd frontend_react
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

This runs `react-scripts build`, then `node scripts/prerender.mjs` (postbuild) to inject the rendered page into `build/index.html`. Output is written to `build/`.

Verify crawler-visible content:

```bash
grep -o "Vikas Mishra" build/index.html | head
grep -E "Stacksync|LinkedIn|application/ld\\+json" build/index.html | head
```

Prerender does not need a headless browser — it runs in Node during `postbuild`, so Netlify and local builds stay reliable.

## Canonical URL and crawl files

- Site: [https://vikasmshra.com/](https://vikasmshra.com/)
- Robots: [https://vikasmshra.com/robots.txt](https://vikasmshra.com/robots.txt)
- Sitemap: [https://vikasmshra.com/sitemap.xml](https://vikasmshra.com/sitemap.xml)
- Social preview image: `/og-image.png`

## Contact form environment variables

Copy `.env.example` to `.env` (or set the same keys in Netlify):

```bash
REACT_APP_EMAIL_SERVICE_ID=
REACT_APP_EMAIL_TEMPLATE_ID=
REACT_APP_EMAIL_PUBLIC_ID=
```

If these are missing, the form shows an error and offers a `mailto:` fallback. It does **not** fake a success response.

### “Gmail_API: Invalid grant” / reconnect Gmail

Your EmailJS service uses Gmail OAuth. When Google revokes or expires that grant, submissions fail until you reconnect:

1. Open [EmailJS Email Services](https://dashboard.emailjs.com/admin)
2. Open your Gmail service
3. Click **Reconnect** / re-authorize Gmail
4. Send a test from the EmailJS dashboard, then retry the site form

No frontend code or env-var changes are required for that fix.

## Replacing the hero video and poster

1. Replace files in **`public/resources/`** (not `build/resources/` — that folder is overwritten on each build).
2. Current filenames:
   - Video: `public/resources/intro-video.mp4`
   - Poster: `public/resources/intro-poster.png`
3. Paths are configured in `src/data/site.js` under `SITE.media` if you rename files.
4. Hard-refresh the browser (Cmd+Shift+R) so cached media is cleared.

Keep the video small (a few MB). The player uses `preload="metadata"` and never autoplays.

## Résumé download

Place the PDF at `public/resources/VikasMishraResume.pdf`. Label and download filename are set in `src/data/site.js` under `SITE.resume`.

## Theme

Dark mode is the default. An inline boot script in `public/index.html` applies the saved preference before paint. The header toggle saves the choice to `localStorage` under `portfolio-theme`.

## Content edits

Most copy lives in `src/data/`:

- `site.js` — name, role, links, media, résumé
- `caseStudies.js` — selected work
- `experience.js` — roles
- `capabilities.js` — capability groups
- `about.js` — short about copy

SEO title, description, Open Graph/Twitter tags, and JSON-LD live in `public/index.html`.
