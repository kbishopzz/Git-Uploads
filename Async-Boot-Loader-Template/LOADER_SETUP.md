# 📘 Bootstrap Loader System — Setup & Reuse Guide

**Version:** 1.0.2  
**Last Updated:** November 14, 2025  
**License:** MIT

---

## 📚 Table of Contents

- [Overview](#overview)
- [Current Project Setup](#current-project-setup)
- [How It Works](#how-it-works)
- [Reuse in Other Projects](#reuse-in-other-projects)
- [API Reference](#api-reference)
- [Performance & Optimization](#performance--optimization)
- [Compatibility](#compatibility)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project uses a high-performance, reusable asset-loading system built on two small, external JavaScript files:
- `js/loader.js` — Promise-based asset loader (async/await, preload-aware)
- `js/bootstrap-loader.js` — Configuration-driven bootstrap that orchestrates CSS and script loading

**Key benefits:**
- Parallel fetch of scripts with guaranteed execution order
- No large inline JavaScript blocks (external, cacheable code)
- SEO-optimized (fast FCP/LCP, preload pattern)
- Works without JavaScript (via `<noscript>` stylesheet fallback)
- Reusable across projects via simple configuration

---

## Current Project Setup

### In `index.html`

```html
<!-- Preload links (with inline onload for simplicity) -->
<link rel="preload" href="/style.css" as="style" onload="this.rel='stylesheet'">
<link rel="preload" href="/response.css" as="style" onload="this.rel='stylesheet'">

<!-- Fallback for no-JS -->
<noscript>
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/response.css">
</noscript>

<!-- Deferred loader and bootstrap -->
<script src="js/loader.js" defer></script>
<script src="js/bootstrap-loader.js" defer></script>
```

### How It Works

1. **Preload links** fetch CSS early without blocking HTML parsing.
2. **onload handlers** swap preloads to real stylesheets when ready (no render blocking).
3. **Loader & bootstrap scripts** defer so they don't block page parsing.
4. **bootstrap-loader** wakes up, detects existing preloads, and starts:
   - CSS fetches via `loader.loadCSS()`
   - Script fetches in parallel + execution in order via `loader.loadAndExecuteInOrder()`
   - Common initializers (carousel, specials, menu, etc.)
5. **Fallback chain**: If fetch/blob execution fails, falls back to sequential script insertion.

---

## Reuse in Other Projects

### Option 1: Quick Copy-Paste (Simplest)

1. Copy `js/loader.js` and `js/bootstrap-loader.js` into your project.

2. In your HTML `<head>`:

```html
<!-- Preload CSS (with inline onload) -->
<link rel="preload" href="/style.css" as="style" onload="this.rel='stylesheet'">
<link rel="preload" href="/custom.css" as="style" onload="this.rel='stylesheet'">

<noscript>
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/custom.css">
</noscript>

<!-- Load the system -->
<script src="js/loader.js" defer></script>
<script src="js/bootstrap-loader.js" defer></script>
```

3. **Default behavior:** `bootstrap-loader` will:
   - Detect your preload links and apply them.
   - Load scripts: `js/library.js`, `js/reviews.js`, `js/menu-data.js`, `js/menu.js`, `js/app.js`.
   - Call common initializers (`initializeCarousel`, `initializeMobileMenu`, etc.) if they exist.

**If your project has different scripts**, customize via config (see Option 2).

### Option 2: Custom Configuration

1. Copy `js/loader.js` and `js/bootstrap-loader.js`.

2. In your HTML `<head>`, **before** the bootstrap script, set config:

```html
<script>
  window.BOOTSTRAP_LOADER_CONFIG = {
    cssFiles: ['/styles/main.css', '/styles/responsive.css'],
    preloadIds: {
      '/styles/main.css': 'css-main-preload',
      '/styles/responsive.css': 'css-responsive-preload'
    },
    scriptList: [
      'js/vendor/jquery.js',
      'js/data.js',
      'js/ui.js',
      'js/init.js'
    ],
    autoInit: true
  };
</script>

<!-- Use id-based preload links -->
<link id="css-main-preload" rel="preload" href="/styles/main.css" as="style">
<link id="css-responsive-preload" rel="preload" href="/styles/responsive.css" as="style">

<noscript>
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="stylesheet" href="/styles/responsive.css">
</noscript>

<!-- Load system -->
<script src="js/loader.js" defer></script>
<script src="js/bootstrap-loader.js" defer></script>
```

3. The loader will use your config and load scripts in order while fetching in parallel.

---

## API Reference

### `window.loader` API

All methods return promises. Call them directly or let `bootstrap-loader` orchestrate.

- **`loader.loadCSS(href, options)`**
  - Loads a single stylesheet.
  - `options.preload` (default: true) — Use preload pattern if link doesn't exist.
  - Returns: Promise resolving to the link element.

- **`loader.loadScript(src, opts)`**
  - Loads a single script.
  - `opts.async`, `opts.defer`, `opts.type`, `opts.crossOrigin` — Script attributes.
  - Returns: Promise resolving to the script element.

- **`loader.loadAll({css, scripts})`**
  - Loads arrays of CSS and scripts in parallel.
  - Returns: Promise resolving when all load.

- **`loader.loadScriptsInOrder(scripts)`**
  - Loads scripts sequentially (execution order guaranteed).
  - `scripts` — Array of strings or `{src, opts}` objects.
  - Returns: Promise resolving to array of loaded script elements.

- **`loader.loadAndExecuteInOrder(scripts)`** ⭐ **Recommended**
  - Fetches all scripts in parallel, executes them sequentially.
  - Uses blob URLs for execution (CSP-safe fallback to sequential if blocked).
  - `scripts` — Array of strings or `{src, opts}` objects.
  - Returns: Promise.

### `window.BOOTSTRAP_LOADER_CONFIG` (Optional)

Set before loading `bootstrap-loader.js`:

```javascript
{
  cssFiles: [],           // Array of CSS hrefs
  preloadIds: {},         // Map href → preload link id
  scriptList: [],         // Array of script srcs or {src, opts}
  autoInit: true          // Reserved for future use
}
```

If not set, defaults are:
```javascript
{
  cssFiles: ['/style.css', '/response.css'],
  preloadIds: { '/style.css': 'css-main-preload', '/response.css': 'css-responsive-preload' },
  scriptList: [
    { src: 'js/library.js', opts: { async: false } },
    { src: 'js/reviews.js', opts: { async: false } },
    { src: 'js/menu-data.js', opts: { async: false } },
    { src: 'js/menu.js', opts: { async: false } },
    { src: 'js/app.js', opts: { async: false } }
  ],
  autoInit: true
}
```

---

## Performance & Optimization

### FCP (First Contentful Paint)
- Preload links start fetching CSS early (no render blocking if `onload` swaps rel).
- Deferred scripts don't block parsing.

### LCP (Largest Contentful Paint)
- CSS is available before scripts run (stylesheets apply via preload `onload`).
- Scripts load in parallel (faster availability vs sequential).

### Total Load Time
- Parallel script fetch reduces time-to-ready.
- Ordered execution ensures dependencies work.
- Fallback to sequential insertion if CSP is strict.

---

## Compatibility

| Feature | Modern Browsers | IE 11 / Old Browsers | No JavaScript |
|---------|---|---|---|
| Preload links | ✓ | ✓ (ignored gracefully) | ✓ |
| `fetch()` + blob URLs | ✓ | ✗ (falls back) | N/A |
| Sequential script loading | ✓ | ✓ | N/A |
| `<noscript>` fallback | N/A | N/A | ✓ |

---

## Migration Notes

If migrating from a different asset-loading approach:

1. Remove inline `<script>` tags from the bottom of the page.
2. Add preload links and deferred loader/bootstrap scripts in the head.
3. Optionally set `window.BOOTSTRAP_LOADER_CONFIG` to customize.
4. Test:
   - DevTools Network tab: verify parallel fetches and correct execution order.
   - DevTools Console: check for loader messages and no errors.
   - Verify UI initializes (carousels, menus, etc. render correctly).

---

## Troubleshooting

### Styles not applying on first load
- Check that preload links exist and CSS hrefs are correct.
- Verify `onload="this.rel='stylesheet'"` is present or ensure `bootstrap-loader` is running.
- Check DevTools Network tab for CSS requests and response status.

### Scripts not executing in order
- Ensure `scriptList` in config (or default list) includes your scripts in the correct order.
- Check DevTools Console for loader warnings or script execution messages.
- If using CSP, verify it allows blob/data URLs or accept fallback to sequential loading.

### Initializers not called
- Ensure initializer functions (`initializeCarousel`, `initializeMobileMenu`, etc.) are defined before or during script load.
- Check DevTools Console for errors or warnings.

---

## 📄 License

MIT License - Free for in-repo use. Copy and reuse in your other projects as needed.

---

## 📚 Additional Resources

- See [BOOTSTRAP_LOADER_README.md](BOOTSTRAP_LOADER_README.md) for quick usage
- See [CHANGELOG.md](CHANGELOG.md) for version history
- See [LICENSE](LICENSE) for full license text
- See [index-template.html](index-template.html) for generic example

---

**Version:** 1.0.0  
**Last Updated:** November 4, 2025  
**Repository:** https://github.com/kbishopzz/Git-Uploads  
**Maintained by:** Keith Bishop

````
