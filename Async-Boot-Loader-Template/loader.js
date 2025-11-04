/*
 * js/loader.js
 * Promise-based asset loader.
 * Provides: loadCSS(href), loadScript(src, opts), loadAll({css, scripts}), loadScriptsInOrder(scripts)
 * Attaches to window.loader
 *
 * Usage:
 *   <script src="js/loader.js"></script>
 *   <script>
 *     loader.loadAll({
 *       css: ['styles.css'],
 *       scripts: ['js/library.js','js/app.js']
 *     }).then(()=>{
 *       // all loaded
 *     }).catch(console.error)
 *   </script>
 */
// Modern async/await, preload-aware loader
(function (window, document) {
  'use strict'

  // Minimal feature detection
  if (typeof Promise === 'undefined') {
    // Very old browser — don't block, provide a no-op loader that falls back to DOM insertion.
    window.loader = {
      loadCSS: function (href) {
        return new Promise(function (resolve) {
          const l = document.createElement('link')
          l.rel = 'stylesheet'
          l.href = href
          l.onload = function () { resolve(l) }
          document.head.appendChild(l)
        })
      },
      loadScript: function (src, opts) {
        return new Promise(function (resolve) {
          const s = document.createElement('script')
          s.src = src
          if (opts && opts.type) s.type = opts.type
          document.body.appendChild(s)
          s.onload = function () { resolve(s) }
        })
      },
      loadAll: function (options) {
        options = options || {}
        const promises = []
        ;(options.css || []).forEach(function (c) { promises.push(window.loader.loadCSS(c)) })
        ;(options.scripts || []).forEach(function (s) { promises.push(window.loader.loadScript(typeof s === 'string' ? s : s.src, s.opts)) })
        return Promise.all(promises)
      },
      loadScriptsInOrder: function (scripts) {
        scripts = scripts || []
        let chain = Promise.resolve()
        const res = []
        scripts.forEach(function (s) {
          chain = chain.then(function () {
            return window.loader.loadScript(typeof s === 'string' ? s : s.src, s.opts)
          }).then(function (el) { res.push(el) })
        })
        return chain.then(function () { return res })
      }
    }
    return
  }

  // Helper to find an existing link/script by href/src
  function _findLink(href) {
    return document.querySelector('link[href="' + href + '"]')
  }

  async function loadCSS(href, options) {
    if (!href) throw new Error('loadCSS: missing href')
    options = options || {}

  // If a link already exists (stylesheet or preload), wait for it
    const existing = _findLink(href)
    if (existing) {
      // If it's already a stylesheet and parsed, resolve immediately
      if (existing.rel === 'stylesheet' && existing.sheet) return existing

      // If the existing link is a preload (as=style), apply a stylesheet immediately.
      // Some browsers may fire the preload load event before our listeners are attached,
      // so proactively create/apply a stylesheet to avoid a flash of unstyled content.
      if (existing.rel === 'preload' && existing.getAttribute('as') === 'style') {
        try {
          // Try swapping rel to stylesheet (works in many browsers)
          existing.rel = 'stylesheet'
          return existing
        } catch (e) {
          // If swapping isn't allowed, fall through to create a new stylesheet link
        }

        // Create a new stylesheet link so styles apply even if preload already finished
        return new Promise(function (resolve, reject) {
          const link2 = document.createElement('link')
          link2.rel = 'stylesheet'
          link2.href = href
          link2.addEventListener('load', function () { resolve(link2) })
          link2.addEventListener('error', function () { reject(new Error('Failed to load CSS: ' + href)) })
          document.head.appendChild(link2)
        })
      }

      // Otherwise wait for the existing link to load/error (covers other cases)
      return new Promise(function (resolve, reject) {
        existing.addEventListener('load', function () { resolve(existing) })
        existing.addEventListener('error', function () { reject(new Error('Failed to load CSS: ' + href)) })
      })
    }

    // Use preload pattern to avoid render-blocking when desired
  const usePreload = options.preload !== false // default true
  const link = document.createElement('link')
    if (usePreload) {
      link.rel = 'preload'
      link.as = 'style'
      link.href = href
      // When preload finishes, switch to stylesheet so it applies
      link.addEventListener('load', function () {
        try { link.rel = 'stylesheet' } catch (e) { /* ignore */ }
      })
      link.addEventListener('error', function () { /* handled below */ })
      document.head.appendChild(link)
      return new Promise(function (resolve, reject) {
        link.addEventListener('load', function () { resolve(link) })
        link.addEventListener('error', function () { reject(new Error('Failed to preload CSS: ' + href)) })
      })
    }

    link.rel = 'stylesheet'
    link.href = href
    return new Promise(function (resolve, reject) {
      link.addEventListener('load', function () { resolve(link) })
      link.addEventListener('error', function () { reject(new Error('Failed to load CSS: ' + href)) })
      document.head.appendChild(link)
    })
  }

  async function loadScript(src, opts) {
    if (!src) throw new Error('loadScript: missing src')
    opts = opts || {}

  // If already present, attach to its load/error events
  const existing = document.querySelector('script[src="' + src + '"]')
    if (existing) {
      return new Promise(function (resolve, reject) {
        if (existing.readyState === 'complete' || existing.readyState === 'loaded') return resolve(existing)
        existing.addEventListener('load', function () { resolve(existing) })
        existing.addEventListener('error', function () { reject(new Error('Failed to load script: ' + src)) })
      })
    }

    return new Promise(function (resolve, reject) {
      const script = document.createElement('script')
      script.src = src
      if (opts.type) script.type = opts.type
      if (opts.async !== undefined) script.async = !!opts.async
      if (opts.defer !== undefined) script.defer = !!opts.defer
      if (opts.crossOrigin) script.crossOrigin = opts.crossOrigin

      script.addEventListener('load', function () { resolve(script) })
      script.addEventListener('error', function () { reject(new Error('Failed to load script: ' + src)) })

      // Append to body (if present) otherwise head
      (document.body || document.head).appendChild(script)
    })
  }

  async function loadAll(options) {
  options = options || {}
  const css = options.css || []
  const scripts = options.scripts || []

    // Map CSS entries to promises
    const cssPromises = css.map(function (c) {
      if (typeof c === 'string') return loadCSS(c)
      if (c && typeof c === 'object') return loadCSS(c.href || c.src, c)
      return Promise.reject(new Error('Invalid css entry: ' + c))
    })

    // Map script entries to promises (parallel)
    const scriptPromises = scripts.map(function (s) {
      if (typeof s === 'string') return loadScript(s)
      if (s && typeof s === 'object') return loadScript(s.src, s.opts)
      return Promise.reject(new Error('Invalid script entry: ' + s))
    })

    return Promise.all(cssPromises.concat(scriptPromises))
  }

  async function loadScriptsInOrder(scripts) {
    scripts = scripts || []
    const results = []
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i]
      let el = null
      if (typeof s === 'string') el = await loadScript(s)
      else if (s && typeof s === 'object') el = await loadScript(s.src, s.opts)
      else throw new Error('Invalid script entry: ' + s)
      results.push(el)
    }
    return results
  }

  /**
   * Fetch all scripts in parallel, then execute them sequentially in the provided order.
   * This provides fast network fetch (parallel) and deterministic execution (sequential).
   * Falls back to loadScriptsInOrder if blob/object-URL execution is blocked by CSP or fails.
   *
   * scripts: Array of string or {src, opts}
   */
  async function loadAndExecuteInOrder(scripts) {
    scripts = scripts || []

    // Normalize to array of { src }
    const entries = scripts.map(function (s) {
      if (typeof s === 'string') return { src: s }
      if (s && typeof s === 'object') return { src: s.src, opts: s.opts }
      throw new Error('Invalid script entry: ' + s)
    })

    // Start parallel fetches
    const fetchPromises = entries.map(function (e) {
      return fetch(e.src).then(function (res) {
        if (!res.ok) throw new Error('Failed to fetch ' + e.src + ' (' + res.status + ')')
        return res.text().then(function (text) { return { src: e.src, text: text } })
      })
    })

    let fetched
    try {
      fetched = await Promise.all(fetchPromises)
    } catch (err) {
      // If any fetch fails, fallback to sequential loader (which will try to load directly)
      console.warn('Parallel fetch failed, falling back to sequential loader:', err)
      return loadScriptsInOrder(scripts)
    }

    // Execute each script in order by creating blob URLs (so execution is sequential)
    const createdBlobURLs = []
    try {
      for (let i = 0; i < fetched.length; i++) {
        const item = fetched[i]
        // Append a sourceURL comment for better DevTools traceability
        const srcWithSourceURL = item.text + '\n//# sourceURL=' + item.src
        const blob = new Blob([srcWithSourceURL], { type: 'application/javascript' })
        const url = URL.createObjectURL(blob)
        createdBlobURLs.push(url)

        // Create script element that points to the blob URL
        await new Promise(function (resolve, reject) {
          const s = document.createElement('script')
          s.src = url
          // Ensure sequential execution by keeping async=false
          s.async = false
          s.onload = function () {
            // Revoke the blob URL after load to free memory
            try { URL.revokeObjectURL(url) } catch (e) {}
            resolve(s)
          }
          s.onerror = function (e) {
            reject(new Error('Execution failed for ' + item.src))
          }
          ;(document.body || document.head).appendChild(s)
        })
      }
    } catch (err) {
      // If execution via blob URLs fails (CSP or runtime), revoke created blobs and fallback
      createdBlobURLs.forEach(function (u) { try { URL.revokeObjectURL(u) } catch (e) {} })
      console.warn('Blob execution failed, falling back to sequential loader:', err)
      return loadScriptsInOrder(scripts)
    }

    return Promise.resolve()
  }

  // Expose a modern API
  window.loader = {
    loadCSS: loadCSS,
    loadScript: loadScript,
    loadAll: loadAll,
    loadScriptsInOrder: loadScriptsInOrder,
    loadAndExecuteInOrder: loadAndExecuteInOrder
  }

})(window, document)
