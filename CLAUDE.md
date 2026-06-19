# Portfolio Code Tests

## Dev Server

Always start the dev server before working on or previewing any HTML files. `file://` URLs block WebGL textures due to cross-origin restrictions.

```
cd "/Users/smackey/Library/CloudStorage/Dropbox/Steve Mackey/20-portfolio code tests"
python3 -m http.server 4599
```

Preview at: http://localhost:4599

Check if already running before starting: `lsof -i :4599`

## Files

- `index.html` — WebGL Three.js endless portfolio grid (main project)
- `images/` — 30 real project `.jpg` files used as card backgrounds
