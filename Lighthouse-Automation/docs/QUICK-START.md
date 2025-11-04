# 🚀 Quick Start Example

This example shows how to integrate Lighthouse Automation into a simple HTML/CSS/JS website.

## Sample Project Structure

```
my-website/
├── .github/
│   └── workflows/
│       └── lighthouse-ci.yml       ← Copy from Lighthouse-Automation
├── scripts/
│   └── lighthouse-ci.sh            ← Copy from Lighthouse-Automation
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── index.html
├── about.html
├── contact.html
├── server.js                       ← Copy from Lighthouse-Automation
├── package.json                    ← Update with dependencies
└── package-lock.json
```

## Step-by-Step Example

### 1. Create package.json

```json
{
  "name": "my-website",
  "version": "1.0.0",
  "description": "My awesome website with Lighthouse CI",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "lighthouse": "./scripts/lighthouse-ci.sh",
    "lighthouse:manual": "lighthouse http://localhost:3000 --output=html --output-path=lighthouse-report.html --view",
    "test": "npm run lighthouse:manual"
  },
  "keywords": ["website", "lighthouse", "ci-cd"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.21.2"
  },
  "devDependencies": {
    "@axe-core/cli": "^4.10.2",
    "lighthouse": "^12.8.2",
    "pa11y-ci": "^4.0.1"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

### 2. Update server.js

```javascript
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

// Routes for your pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact.html", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Health check endpoint (REQUIRED for CI)
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Health check at http://localhost:${port}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});
```

### 3. Update scripts/lighthouse-ci.sh

Edit lines 12-29 to match your pages:

```bash
# Configuration
BASE_URL="http://localhost:3000"
PAGES=(
    ""                # Homepage
    "/about.html"     # About page
    "/contact.html"   # Contact page
)

PAGE_NAMES=(
    "Home"            # Report name for homepage
    "About"           # Report name for about
    "Contact"         # Report name for contact
)
```

### 4. Update .github/workflows/lighthouse-ci.yml

Edit the "Run Lighthouse Audits" step (around line 49):

```yaml
- name: Run Lighthouse Audits
  run: |
    mkdir -p lighthouse-reports
    PAGES=("" "/about.html" "/contact.html")
    PAGE_NAMES=("home" "about" "contact")
    for i in "${!PAGES[@]}"; do
      page="${PAGES[$i]}"
      name="${PAGE_NAMES[$i]}"
      url="http://localhost:3000${page}"
      echo "🔦 Auditing $name page (Desktop)..."
      lighthouse "$url" \
        --output=html,json \
        --output-path="lighthouse-reports/lighthouse-${name}-desktop" \
        --chrome-flags="--no-sandbox --headless --disable-gpu" \
        --preset=desktop \
        --quiet
      echo "📱 Auditing $name page (Mobile)..."
      lighthouse "$url" \
        --output=html,json \
        --output-path="lighthouse-reports/lighthouse-${name}-mobile" \
        --chrome-flags="--no-sandbox --headless --disable-gpu" \
        --screenEmulation.mobile \
        --quiet
    done
```

### 5. Install and Test

```bash
# Install dependencies
npm install

# Make script executable
chmod +x scripts/lighthouse-ci.sh

# Start server (Terminal 1)
npm start

# Test Lighthouse (Terminal 2)
npm run lighthouse:manual

# View report
open lighthouse-report.html
```

### 6. Commit and Push

```bash
git add .
git commit -m "Add Lighthouse CI automation"
git push origin main
```

### 7. Verify in GitHub

1. Go to **Actions** tab
2. See "🚀 Lighthouse Performance Audit" running
3. Wait for completion
4. Download `lighthouse-reports` artifact
5. Open reports in browser

## Expected Results

After successful run, you should see:

```
lighthouse-reports/
├── lighthouse-home-desktop.report.html
├── lighthouse-home-desktop.report.json
├── lighthouse-home-mobile.report.html
├── lighthouse-home-mobile.report.json
├── lighthouse-about-desktop.report.html
├── lighthouse-about-desktop.report.json
├── lighthouse-about-mobile.report.html
├── lighthouse-about-mobile.report.json
├── lighthouse-contact-desktop.report.html
├── lighthouse-contact-desktop.report.json
├── lighthouse-contact-mobile.report.html
└── lighthouse-contact-mobile.report.json
```

## Sample HTML Page

Here's an example HTML page that should score well:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="An accessible, performant website">
    <title>My Website - Home</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <header>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Welcome to My Website</h1>
        <p>This is an example page optimized for Lighthouse.</p>
        
        <img 
            src="/images/hero.jpg" 
            alt="A beautiful landscape" 
            width="800" 
            height="600"
            loading="lazy"
        >
        
        <section>
            <h2>Features</h2>
            <ul>
                <li>Fast loading</li>
                <li>Accessible</li>
                <li>SEO optimized</li>
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 My Website. All rights reserved.</p>
    </footer>

    <script src="/js/app.js" defer></script>
</body>
</html>
```

## Performance Tips

To achieve high Lighthouse scores:

### Performance (Target: 90+)

- ✅ Minimize CSS and JavaScript
- ✅ Optimize images (WebP, proper sizing)
- ✅ Use `loading="lazy"` on images
- ✅ Defer non-critical JavaScript
- ✅ Minimize render-blocking resources

### Accessibility (Target: 95+)

- ✅ Use semantic HTML (`<header>`, `<main>`, `<nav>`)
- ✅ Add alt text to all images
- ✅ Label all form inputs
- ✅ Ensure sufficient color contrast (4.5:1 for text)
- ✅ Make all interactive elements keyboard accessible

### Best Practices (Target: 90+)

- ✅ Use HTTPS (in production)
- ✅ Include `viewport` meta tag
- ✅ Avoid console errors
- ✅ Use correct image aspect ratios
- ✅ Avoid deprecated APIs

### SEO (Target: 90+)

- ✅ Include meta description
- ✅ Use descriptive page titles
- ✅ Create a sitemap
- ✅ Add robots.txt
- ✅ Ensure links are crawlable

## Next Steps

- Review [CONFIGURATION.md](../CONFIGURATION.md) for advanced customization
- Read [USAGE.md](../USAGE.md) to interpret results
- Check [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) if issues arise

---

**Congratulations!** 🎉 You now have automated Lighthouse testing on every push.
