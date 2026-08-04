# smackey.local — Portfolio

Personal portfolio site built with Vite, Three.js, and Sass.

## Requirements

- Node.js 18+
- npm

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the dev server:

```bash
npm run dev
```

Preview at **http://localhost:4599**

> Note: Always use the dev server — opening `index.html` directly via `file://` will block WebGL textures due to browser cross-origin restrictions.

Check if the server is already running before starting:

```bash
lsof -i :4599
```

## Build

Compile for production:

```bash
npm run build
```

Output goes to `dist/`. CSS is minified and emitted as `styles.css`.

## Preview production build

```bash
npm run preview
```

Serves the `dist/` folder locally so you can verify the production build before deploying.

## Linting

```bash
npm run lint        # JS + SCSS together
npm run lint:js     # ESLint only
npm run lint:css    # Stylelint only
```

## Project structure

```
index.html              Entry point
src/
  js/
    grid.js             Main script
    projects.js         Project/case study data
  scss/
    grid.scss           Styles (compiled by Vite; partials prefixed with _)
public/
  assets/               Project card images (served at /assets/)
```
