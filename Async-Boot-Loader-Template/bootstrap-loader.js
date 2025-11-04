/*
 * js/bootstrap-loader.js
 * External bootstrap that uses window.loader (from js/loader.js) to start CSS fetches,
 * swap preload->stylesheet safely (CSP-friendly), and load scripts in parallel while
 * guaranteeing ordered execution. Also invokes common initializers after load.
 */
(function (window, document) {
  'use strict'

  /**
   * Configuration
   * To reuse this bootstrap in other projects, set window.BOOTSTRAP_LOADER_CONFIG before this script loads.
   * Example (place before the script tag that loads bootstrap-loader.js):
   * <script>
   *   window.BOOTSTRAP_LOADER_CONFIG = {
   *     cssFiles: ['/style.css','/response.css'],
   *     preloadIds: { '/style.css': 'css-main-preload', '/response.css': 'css-responsive-preload' },
   *     scriptList: ['js/library.js','js/reviews.js','js/menu-data.js','js/menu.js','js/app.js'],
   *     autoInit: true
   *   }
   * </script>
   */
  const DEFAULT_CONFIG = {
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

  const config = Object.assign({}, DEFAULT_CONFIG, (window.BOOTSTRAP_LOADER_CONFIG || {}))

  function swapPreloadToStylesheet(idOrHref) {
    try {
      // Prefer id-based lookup for deterministic behavior
      var link = null
      if (idOrHref && idOrHref.charAt && idOrHref.charAt(0) === '#') {
        link = document.getElementById(idOrHref.slice(1))
      }
      // If id not found, try treating the value as an href
      if (!link && idOrHref) {
        link = document.querySelector('link[rel="preload"][href="' + idOrHref + '"]')
      }
      if (!link) return

      // If the preload already finished, try to swap rel immediately
      try {
        if (link.rel === 'preload' && link.getAttribute('as') === 'style') {
          link.addEventListener('load', function () {
            try { link.rel = 'stylesheet' } catch (e) { /* ignore */ }
          })
          // If the preload has already fired, swapping rel may be necessary now
          try { link.rel = 'stylesheet' } catch (e) { /* ignore */ }
        }
      } catch (e) {
        // ignore
      }

      // Mark as handled so we don't attach duplicate listeners
      if (!link.getAttribute('data-swapped')) {
        link.setAttribute('data-swapped', '1')
      }
    } catch (e) {
      /* noop */
    }
  }

  // Bootstrap sequence
  function bootstrap() {
    var cssFiles = config.cssFiles
    var scriptList = config.scriptList

    // Attach preload->stylesheet swap for each known preload link (no inline onload needed)
    // Prefer id-based swap when available via config.preloadIds
    cssFiles.forEach(function (href) {
      var id = (config.preloadIds && config.preloadIds[href]) || null
      if (id) swapPreloadToStylesheet('#' + id)
      else swapPreloadToStylesheet(href)
    })

    // Kick off CSS fetches via loader (if present). This normalizes preload and existing links.
    if (window.loader && typeof window.loader.loadCSS === 'function') {
      cssFiles.forEach(function (c) { window.loader.loadCSS(c).catch(function () {}) })
    }

    // Load scripts using the performant loader if available
    if (window.loader && typeof window.loader.loadAndExecuteInOrder === 'function') {
      window.loader.loadAndExecuteInOrder(scriptList).then(function () {
        // Call common initializers in case scripts registered DOMContentLoaded after the event
        try { if (typeof initializeCarousel === 'function') initializeCarousel() } catch (e) { console.warn(e) }
        try { if (typeof initializeSpecialsCarousel === 'function') initializeSpecialsCarousel() } catch (e) { console.warn(e) }
        try { if (typeof initializeMobileMenu === 'function') initializeMobileMenu() } catch (e) { console.warn(e) }
        try { if (typeof initializeAboutCollapsibles === 'function') initializeAboutCollapsibles() } catch (e) { console.warn(e) }
        try { if (typeof setupScrollAnimations === 'function') setupScrollAnimations() } catch (e) { console.warn(e) }
      }).catch(function (err) {
        console.error('bootstrap-loader: parallel execute failed, falling back', err)
        if (window.loader && typeof window.loader.loadScriptsInOrder === 'function') {
          window.loader.loadScriptsInOrder(scriptList).catch(function (err) { console.error('bootstrap-loader fallback failed', err) })
        }
      })
      return
    }

    // Final fallback: sequential append
    (function fallback() {
      function appendSequential(list, i) {
        if (i >= list.length) return
        var s = list[i]
        var scr = document.createElement('script')
        scr.src = s.src
        scr.async = false
        scr.onload = function () { appendSequential(list, i + 1) }
        scr.onerror = function () { appendSequential(list, i + 1) }
        document.body.appendChild(scr)
      }
      appendSequential(scriptList, 0)
    })()
  }

  // Run bootstrap after parser but as early as possible
  if (document.readyState === 'loading') {
    // Defer to DOMContentLoaded to ensure DOM nodes exist (preload links)
    document.addEventListener('DOMContentLoaded', bootstrap)
  } else {
    // Already parsed
    bootstrap()
  }

})(window, document)
