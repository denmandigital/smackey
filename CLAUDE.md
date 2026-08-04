# Portfolio Code Tests

## Dev Server

Always start the dev server before working on or previewing any HTML files. `file://` URLs block WebGL textures due to cross-origin restrictions.

```
npm run dev
```

Preview at: http://localhost:4599

Check if already running before starting: `lsof -i :4599`

## Linting

```
npm run lint        # JS + SCSS together
npm run lint:js     # ESLint only
npm run lint:css    # Stylelint only
```

## Files

- `index.html` — entry point
- `src/js/grid.js` — main script
- `src/js/projects.js` — all project/case study data
- `src/scss/grid.scss` — styles (compiled by Vite; split into partials with `_` prefix as needed)
- `public/assets/` — project card images, served at `/assets/`
