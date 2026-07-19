# Vikas Mishra — Portfolio

Concise single-page portfolio built with Create React App, React 18, and SCSS. Deployed on Netlify.

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

Output is written to `build/`.

## Contact form environment variables

Copy `.env.example` to `.env` (or set the same keys in Netlify):

```bash
REACT_APP_EMAIL_SERVICE_ID=
REACT_APP_EMAIL_TEMPLATE_ID=
REACT_APP_EMAIL_PUBLIC_ID=
```

If these are missing, the form shows an error and offers a `mailto:` fallback. It does **not** fake a success response.

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

Dark mode is the default. The header toggle saves the choice to `localStorage` under `portfolio-theme`.

## Content edits

Most copy lives in `src/data/`:

- `site.js` — name, role, links, media, résumé
- `caseStudies.js` — selected work
- `experience.js` — roles
- `capabilities.js` — capability groups
- `about.js` — short about copy
