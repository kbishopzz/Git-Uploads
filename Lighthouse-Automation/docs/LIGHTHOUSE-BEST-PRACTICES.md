# 🏆 Lighthouse Best Practices

**Version:** 1.0.1  
**Last Updated:** November 14, 2025  
**License:** MIT

A comprehensive guide to optimizing your website based on Lighthouse recommendations.

## 📚 Table of Contents

- [Performance Optimization](#performance-optimization)
- [Accessibility Guidelines](#accessibility-guidelines)
- [SEO Best Practices](#seo-best-practices)
- [Progressive Web App (PWA)](#progressive-web-app-pwa)
- [Core Web Vitals](#core-web-vitals)
- [Common Issues & Solutions](#common-issues--solutions)

---

## Performance Optimization

### 1. Optimize Images

#### Problem: Large image files slow down page load

**Solutions:**

```html
<!-- Use modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description">
</picture>

<!-- Lazy load images -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Responsive images -->
<img 
  srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
  src="medium.jpg" 
  alt="Description">
```

**Tools:**
- [ImageOptim](https://imageoptim.com/) - Lossless compression
- [Squoosh](https://squoosh.app/) - Web-based image optimizer
- [Sharp](https://sharp.pixelplumbing.com/) - Node.js image processing

**Targets:**
- Use WebP format (70% smaller than JPEG)
- Compress images to < 100KB
- Lazy load below-the-fold images
- Use appropriate dimensions

---

### 2. Minimize JavaScript

#### Problem: Large JavaScript bundles block page rendering

**Solutions:**

```html
<!-- Defer non-critical JavaScript -->
<script src="analytics.js" defer></script>

<!-- Async for independent scripts -->
<script src="tracking.js" async></script>

<!-- Module/nomodule pattern -->
<script type="module" src="modern.js"></script>
<script nomodule src="legacy.js"></script>
```

**Code Splitting:**

```javascript
// Lazy load heavy components
const HeavyComponent = () => import('./HeavyComponent.js');

// Dynamic imports
button.addEventListener('click', async () => {
  const module = await import('./feature.js');
  module.init();
});
```

**Targets:**
- Total JavaScript < 300KB (gzipped)
- Use tree-shaking to remove unused code
- Defer non-critical JavaScript
- Remove console.logs in production

---

### 3. Optimize CSS

#### Problem: CSS blocks rendering

**Solutions:**

```html
<!-- Critical CSS inline in <head> -->
<style>
  /* Critical above-the-fold styles */
  body { margin: 0; font-family: sans-serif; }
  .hero { min-height: 400px; }
</style>

<!-- Preload non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Remove unused CSS -->
<!-- Use tools like PurgeCSS or UnCSS -->
```

**CSS Optimization:**

```css
/* Use CSS containment for performance */
.card {
  contain: layout style paint;
}

/* Avoid expensive properties */
/* Bad */
.element {
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
  filter: blur(10px);
}

/* Better */
.element {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**Targets:**
- Total CSS < 100KB (gzipped)
- Critical CSS < 14KB (inline)
- Remove unused styles
- Avoid @import in CSS

---

### 4. Use Content Delivery Network (CDN)

#### Problem: Server distance increases latency

**Solutions:**

```html
<!-- Use CDN for libraries -->
<script src="https://cdn.jsdelivr.net/npm/library@version/dist/library.min.js"></script>

<!-- Use CDN for images -->
<img src="https://cdn.example.com/images/photo.jpg" alt="Photo">

<!-- Add resource hints -->
<link rel="dns-prefetch" href="https://cdn.example.com">
<link rel="preconnect" href="https://cdn.example.com">
```

**Popular CDNs:**
- Cloudflare
- AWS CloudFront
- Fastly
- Google Cloud CDN

**Benefits:**
- Reduced latency
- Better caching
- Geographic distribution
- DDoS protection

---

### 5. Enable Compression

#### Problem: Large file transfers

**Solutions:**

**Server Configuration (Express):**

```javascript
const compression = require('compression');
app.use(compression());
```

**Nginx Configuration:**

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript 
           application/x-javascript application/xml+rss 
           application/json application/javascript;
```

**Apache Configuration:**

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/json
</IfModule>
```

**Targets:**
- Enable gzip/brotli compression
- Compress all text-based resources
- Aim for 70-80% size reduction

---

### 6. Implement Caching

#### Problem: Repeated downloads of unchanged resources

**Solutions:**

```html
<!-- Cache static assets -->
<link rel="stylesheet" href="styles.css?v=1.2.3">
<script src="app.js?v=1.2.3"></script>

<!-- Service Worker for advanced caching -->
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>
```

**Cache Headers:**

```javascript
// Express example
app.use(express.static('public', {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Set specific headers
app.use('/images', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  next();
});
```

**Caching Strategy:**
- Static assets: 1 year (`max-age=31536000`)
- HTML: No cache or short cache
- API responses: Appropriate cache based on data
- Use cache busting (versioning/hashing)

---

## Accessibility Guidelines

### 1. Semantic HTML

```html
<!-- Good: Semantic structure -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2025 Company</p>
</footer>

<!-- Bad: Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>
```

---

### 2. Alternative Text

```html
<!-- Good: Descriptive alt text -->
<img src="dog.jpg" alt="Golden retriever playing fetch in a park">

<!-- Decorative images -->
<img src="decorative.jpg" alt="" role="presentation">

<!-- Complex images need long descriptions -->
<img src="chart.jpg" alt="Sales chart" aria-describedby="chart-description">
<div id="chart-description">
  <p>Sales increased by 25% in Q3, with peak performance in September...</p>
</div>
```

**Best Practices:**
- Describe the content and function
- Keep it concise (< 125 characters)
- Don't use "image of" or "picture of"
- Empty alt for decorative images

---

### 3. Color Contrast

**WCAG 2.1 Requirements:**

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

**Good Contrast Examples:**

```css
/* Good: High contrast */
.text {
  color: #000000; /* Black text */
  background: #FFFFFF; /* White background */
  /* Contrast ratio: 21:1 */
}

/* Good: Dark mode */
.dark-text {
  color: #FFFFFF;
  background: #121212;
  /* Contrast ratio: 15.8:1 */
}

/* Bad: Low contrast */
.bad-text {
  color: #777777;
  background: #999999;
  /* Contrast ratio: 2.3:1 - FAIL */
}
```

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Accessibility Panel
- [Colorable](https://colorable.jxnblk.com/)

---

### 4. Form Labels

```html
<!-- Good: Explicit labels -->
<label for="email">Email Address:</label>
<input type="email" id="email" name="email" required>

<!-- Good: Wrapped labels -->
<label>
  Email Address:
  <input type="email" name="email" required>
</label>

<!-- Good: ARIA labels for complex forms -->
<input 
  type="search" 
  aria-label="Search products"
  placeholder="Search...">

<!-- Good: Fieldset for groups -->
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street:</label>
  <input type="text" id="street" name="street">
</fieldset>
```

---

### 5. Keyboard Navigation

```html
<!-- Ensure tab order is logical -->
<a href="/home" tabindex="0">Home</a>
<button tabindex="0">Submit</button>

<!-- Skip to main content link -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">
  <!-- Content -->
</main>

<!-- Focus styles -->
<style>
:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

/* Don't remove focus outline without alternative */
button:focus {
  outline: none; /* Bad */
  box-shadow: 0 0 0 3px rgba(0,102,204,0.5); /* Good alternative */
}
</style>
```

**Keyboard Testing:**
- Tab through entire page
- All interactive elements focusable
- Focus order logical
- Visible focus indicators
- No keyboard traps

---

### 6. ARIA Attributes

```html
<!-- Button with loading state -->
<button aria-busy="true" aria-live="polite">
  Loading...
</button>

<!-- Expandable section -->
<button 
  aria-expanded="false" 
  aria-controls="menu"
  onclick="this.setAttribute('aria-expanded', 'true')">
  Menu
</button>
<div id="menu" hidden>
  <!-- Menu items -->
</div>

<!-- Alert message -->
<div role="alert" aria-live="assertive">
  Error: Please correct the form
</div>

<!-- Progress indicator -->
<div role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  60% complete
</div>
```

**ARIA Best Practices:**
- Use semantic HTML first
- Don't override native semantics
- Test with screen readers
- Keep ARIA labels updated

---

## SEO Best Practices

### 1. Meta Tags

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Title: 50-60 characters -->
  <title>Product Name | Brand - Description</title>
  
  <!-- Description: 150-160 characters -->
  <meta name="description" content="Compelling description that includes keywords and encourages clicks from search results.">
  
  <!-- Open Graph (social media) -->
  <meta property="og:title" content="Product Name | Brand">
  <meta property="og:description" content="Description for social sharing">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Product Name">
  <meta name="twitter:description" content="Description">
  <meta name="twitter:image" content="https://example.com/image.jpg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://example.com/page">
</head>
```

---

### 2. Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://example.com/product.jpg",
  "description": "Product description",
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product",
    "priceCurrency": "USD",
    "price": "99.99",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

**Validate at:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

### 3. URL Structure

```
✅ Good URLs
https://example.com/products/laptop
https://example.com/blog/seo-best-practices
https://example.com/about/team

❌ Bad URLs
https://example.com/page.php?id=123&cat=5
https://example.com/p/a/g/e/index.html
https://example.com/PRODUCTS/LAPTOP
```

**Best Practices:**
- Use lowercase letters
- Use hyphens (not underscores)
- Keep URLs short and descriptive
- Include relevant keywords
- Use HTTPS

---

### 4. Heading Hierarchy

```html
<!-- Good: Logical hierarchy -->
<h1>Main Page Title</h1>
  <h2>Section 1</h2>
    <h3>Subsection 1.1</h3>
    <h3>Subsection 1.2</h3>
  <h2>Section 2</h2>
    <h3>Subsection 2.1</h3>

<!-- Bad: Skipping levels -->
<h1>Main Title</h1>
  <h4>Section</h4> <!-- Skipped h2 and h3 -->
```

---

### 5. Mobile-Friendly

```html
<!-- Viewport meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Responsive images -->
<img srcset="small.jpg 300w, large.jpg 1200w" sizes="100vw" src="large.jpg">

<!-- Responsive typography -->
<style>
body {
  font-size: 16px;
}

@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}
</style>

<!-- Touch-friendly targets -->
<style>
button, a {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}
</style>
```

---

## Core Web Vitals

### 1. Largest Contentful Paint (LCP)

**Target: < 2.5 seconds**

**Optimize:**

```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="hero.jpg">

<!-- Optimize images -->
<img src="hero.jpg" alt="Hero" fetchpriority="high">

<!-- Reduce server response time -->
<!-- Use CDN for static assets -->
```

**Common Issues:**
- Large images not optimized
- Slow server response time
- Render-blocking JavaScript/CSS
- Client-side rendering

---

### 2. First Input Delay (FID)

**Target: < 100 milliseconds**

**Optimize:**

```javascript
// Break up long tasks
function heavyOperation() {
  const data = getData();
  
  // Split work into chunks
  requestIdleCallback(() => {
    processData(data);
  });
}

// Use web workers for heavy computation
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};
```

---

### 3. Cumulative Layout Shift (CLS)

**Target: < 0.1**

**Prevent:**

```html
<!-- Always include dimensions on images -->
<img src="photo.jpg" alt="Photo" width="800" height="600">

<!-- Reserve space for ads -->
<div class="ad-container" style="min-height: 250px;">
  <!-- Ad loads here -->
</div>

<!-- Avoid inserting content above existing content -->
<style>
/* Reserve space for dynamic content */
.notification-area {
  min-height: 50px;
}
</style>
```

**CSS to Prevent Shifts:**

```css
/* Aspect ratio boxes */
.video-container {
  aspect-ratio: 16 / 9;
}

/* Placeholder for images */
.image-placeholder {
  background: #f0f0f0;
  min-height: 400px;
}
```

---

## Common Issues & Solutions

### Issue: "Eliminate render-blocking resources"

**Solution:**

```html
<!-- Inline critical CSS -->
<style>
  /* Critical styles here */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">

<!-- Defer JavaScript -->
<script src="app.js" defer></script>
```

---

### Issue: "Serve images in next-gen formats"

**Solution:**

```html
<picture>
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="Description">
</picture>
```

**Tools:**
- [Squoosh](https://squoosh.app/)
- [ImageMagick](https://imagemagick.org/)
- [Sharp](https://sharp.pixelplumbing.com/)

---

### Issue: "Minimize main-thread work"

**Solution:**

```javascript
// Use requestIdleCallback for non-critical work
requestIdleCallback(() => {
  analytics.track('page_view');
});

// Defer third-party scripts
<script src="analytics.js" defer></script>

// Use web workers for heavy computation
const worker = new Worker('heavy-task.js');
```

---

### Issue: "Reduce unused JavaScript"

**Solution:**

```javascript
// Code splitting with dynamic imports
const module = await import('./module.js');

// Tree shaking (use ES6 imports)
import { specificFunction } from 'library';

// Remove console.logs in production
// Use build tools to strip in production
```

---

## Performance Monitoring

### Tools

1. **Chrome DevTools**
   - Lighthouse panel
   - Performance panel
   - Network panel
   - Coverage panel

2. **Online Tools**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [WebPageTest](https://www.webpagetest.org/)
   - [GTmetrix](https://gtmetrix.com/)

3. **Real User Monitoring (RUM)**
   - Google Analytics (Core Web Vitals)
   - Cloudflare Analytics
   - New Relic

---

## Quick Wins Checklist

- [ ] Enable gzip/brotli compression
- [ ] Optimize and compress images
- [ ] Minify CSS and JavaScript
- [ ] Enable browser caching
- [ ] Use CDN for static assets
- [ ] Add alt text to all images
- [ ] Ensure proper color contrast
- [ ] Add proper meta tags
- [ ] Implement structured data
- [ ] Make site mobile-responsive
- [ ] Add loading="lazy" to images
- [ ] Defer non-critical JavaScript
- [ ] Inline critical CSS
- [ ] Set image dimensions
- [ ] Use semantic HTML

---

## Resources

### Official Documentation
- [Web.dev Learn](https://web.dev/learn/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)

### Performance
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)

### SEO
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)

---

**Version:** 1.0.0  
**Last Updated:** November 4, 2025  
**License:** MIT
