# 📦 Installation Guide - Lighthouse Automation

This guide will walk you through installing the Lighthouse Automation package into your existing web project.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js >= 20.0.0 (`node --version`)
- ✅ npm >= 8.0.0 (`npm --version`)
- ✅ Git repository with GitHub Actions enabled
- ✅ A web server that serves your application
- ✅ HTML pages you want to test

## 🚀 Installation Steps

### Step 1: Copy Files to Your Project

Copy the Lighthouse-Automation folder contents to your project root:

```bash
# If you have the Lighthouse-Automation folder
cp -r Lighthouse-Automation/.github /path/to/your/project/
cp -r Lighthouse-Automation/scripts /path/to/your/project/
cp Lighthouse-Automation/server.js /path/to/your/project/

# Or manually:
# 1. Copy .github/workflows/lighthouse-ci.yml to your .github/workflows/
# 2. Copy scripts/lighthouse-ci.sh to your scripts/
# 3. Copy server.js to your project root (or adapt your existing server)
```

### Step 2: Install Required Dependencies

Add the required dependencies to your `package.json`:

```json
{
  "dependencies": {
    "express": "^4.21.2"
  },
  "devDependencies": {
    "@axe-core/cli": "^4.10.2",
    "lighthouse": "^12.8.2",
    "pa11y-ci": "^4.0.1"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=8.0.0"
  }
}
```

Then install:

```bash
npm install
```

### Step 3: Add Required npm Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "lighthouse": "./scripts/lighthouse-ci.sh",
    "lighthouse:manual": "lighthouse http://localhost:3000 --output=html --output-path=lighthouse-report.html",
    "accessibility": "npm start & sleep 5 && npx axe http://localhost:3000",
    "performance": "npm start & sleep 5 && lighthouse http://localhost:3000 --only-categories=performance"
  }
}
```

### Step 4: Configure Your Web Server

#### Option A: Use the Provided Express Server

The included `server.js` provides a simple Express server with:
- Static file serving
- Health check endpoint (`/health`)
- Graceful shutdown handling

**Customize for your project:**

```javascript
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));
app.use("/dist", express.static(path.join(__dirname, "dist")));

// Add your page routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/your-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "your-page.html"));
});

// ⚠️ REQUIRED: Health check endpoint for CI
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Health check at http://localhost:${port}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🔄 Shutting down server gracefully...");
  process.exit(0);
});
```

#### Option B: Adapt Your Existing Server

If you already have a server, add these required features:

**1. Health Check Endpoint** (Required for CI):

```javascript
// Express example
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Pure Node.js example
if (req.url === "/health") {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "OK" }));
}
```

**2. Graceful Shutdown** (Recommended):

```javascript
process.on("SIGTERM", () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    process.exit(0);
  });
});
```

### Step 5: Configure Pages to Test

Edit `scripts/lighthouse-ci.sh` to specify your pages:

```bash
# Line 12-29 in lighthouse-ci.sh
PAGES=(
    ""                      # Homepage (empty = root)
    "/about.html"           # About page
    "/products.html"        # Products page
    "/contact.html"         # Contact page
)

PAGE_NAMES=(
    "Landing Page"          # Display name for homepage
    "About"                 # Display name for about
    "Products"              # Display name for products
    "Contact"               # Display name for contact
)
```

Edit `.github/workflows/lighthouse-ci.yml` to match:

```yaml
# Line 49-50 in lighthouse-ci.yml
- name: Run Lighthouse Audits
  run: |
    mkdir -p lighthouse-reports
    PAGES=("" "/about.html" "/products.html" "/contact.html")
    PAGE_NAMES=("home" "about" "products" "contact")
    # ... rest of script
```

### Step 6: Make Scripts Executable

```bash
chmod +x scripts/lighthouse-ci.sh
```

### Step 7: Test Locally

Before pushing to CI, test the setup locally:

```bash
# Start your server in one terminal
npm start

# In another terminal, run Lighthouse
npm run lighthouse:manual

# Or run the full test suite
./scripts/lighthouse-ci.sh
```

### Step 8: Commit and Push

```bash
git add .github/workflows/lighthouse-ci.yml
git add scripts/lighthouse-ci.sh
git add server.js
git add package.json
git commit -m "Add Lighthouse CI automation"
git push
```

### Step 9: Verify GitHub Actions

1. Go to your GitHub repository
2. Click the **Actions** tab
3. You should see "🚀 Lighthouse Performance Audit" running
4. Wait for it to complete (usually 5-10 minutes)
5. Download the `lighthouse-reports` artifact to view results

## 🎯 Verification Checklist

After installation, verify:

- [ ] Server starts successfully with `npm start`
- [ ] Health check endpoint responds at `http://localhost:3000/health`
- [ ] All pages load correctly in browser
- [ ] Local Lighthouse test runs without errors
- [ ] GitHub Actions workflow appears in Actions tab
- [ ] Workflow completes successfully on push
- [ ] Lighthouse reports are generated and downloadable

## 🔧 Optional: Create lighthouserc.json

For more advanced configuration, create `.lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "onlyCategories": [
          "performance",
          "accessibility",
          "best-practices",
          "seo"
        ]
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

## 🔧 Optional: Create .pa11yci

For accessibility testing configuration, create `.pa11yci`:

```json
{
  "defaults": {
    "timeout": 30000,
    "wait": 1000,
    "chromeLaunchConfig": {
      "args": ["--no-sandbox", "--disable-dev-shm-usage"]
    }
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/about.html",
    "http://localhost:3000/products.html",
    "http://localhost:3000/contact.html"
  ]
}
```

## 🆘 Troubleshooting

### "Permission denied" when running scripts

```bash
chmod +x scripts/lighthouse-ci.sh
```

### "Server not responding" during tests

Check that your server has a `/health` endpoint and responds quickly.

### GitHub Actions workflow not appearing

Ensure the workflow file is in `.github/workflows/` directory and properly formatted YAML.

### Node.js version issues

GitHub Actions uses Node.js 20.x by default. Ensure your local version matches:

```bash
nvm use 20
# or
nvm install 20
```

## 📚 Next Steps

- Read [CONFIGURATION.md](CONFIGURATION.md) to customize your setup
- Read [USAGE.md](USAGE.md) to learn how to run tests
- Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues

## 🤝 Need Help?

If you run into issues:

1. Check the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide
2. Review the GitHub Actions logs in your repository
3. Test locally first with `npm run lighthouse:manual`
4. Ensure all prerequisites are met

---

**Installation Complete!** 🎉

Your project now has automated Lighthouse testing. Every push to main will trigger performance and accessibility audits.
