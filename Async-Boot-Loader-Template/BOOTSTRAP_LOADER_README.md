# 🔄 Bootstrap Loader — Quick Usage Guide

**Version:** 1.0.2  
**Last Updated:** November 14, 2025  
**License:** MIT

This repository includes two small files intended to be reusable across projects:

- `js/loader.js` — a Promise-based asset loader. API:
  - `loader.loadCSS(href, options)`
  - `loader.loadScript(src, opts)`
  - `loader.loadAll({css, scripts})`
  - `loader.loadScriptsInOrder(scripts)`
  - `loader.loadAndExecuteInOrder(scripts)` — parallel fetch + ordered execution (preferred)

- `js/bootstrap-loader.js` — small reusable bootstrap that calls the loader to:
  - convert `link rel=preload as=style` to `rel=stylesheet` (CSP-friendly)
  - start CSS fetches
  - fetch scripts in parallel and execute in order
  - call common initialization functions after scripts run

Quick copy-and-paste integration (recommended):

1. Add critical CSS inline in your HTML `<head>` (optional but recommended to avoid FOUC).
2. Add preload links for your main stylesheets:

   <link id="css-main-preload" rel="preload" href="/style.css" as="style">
   <link id="css-responsive-preload" rel="preload" href="/response.css" as="style">

3. Optionally configure bootstrap-loader by adding a small script before including it:

   <script>
     window.BOOTSTRAP_LOADER_CONFIG = {
       cssFiles: ['/style.css','/response.css'],
       preloadIds: { '/style.css': 'css-main-preload', '/response.css': 'css-responsive-preload' },
       scriptList: [ 'js/lib.js', 'js/data.js', 'js/ui.js' ],
       autoInit: true
     }
   </script>

4. Include the loader and bootstrap scripts in the `<head>` with `defer`:

   <script src="js/loader.js" defer></script>
   <script src="js/bootstrap-loader.js" defer></script>

Notes & caveats:
- `loader.loadAndExecuteInOrder` uses `fetch()` + blob URLs to fetch scripts in parallel and execute sequentially. If your site uses a strict CSP that disallows blob/data URLs, `bootstrap-loader` will fall back to sequential script insertion.
- Keep critical inline CSS minimal to preserve caching and maintainability.
- The bootstrap is intentionally small; if you need deeper customization, set `window.BOOTSTRAP_LOADER_CONFIG` before loading the script.

---

## 📄 License

MIT License - Free for in-repo use. Copy freely into your other projects.

## 📚 Additional Resources

- See [LOADER_SETUP.md](LOADER_SETUP.md) for detailed setup instructions
- See [CHANGELOG.md](CHANGELOG.md) for version history
- See [LICENSE](LICENSE) for full license text

---

**Repository:** https://github.com/kbishopzz/Git-Uploads  
**Maintained by:** Keith Bishop

```
