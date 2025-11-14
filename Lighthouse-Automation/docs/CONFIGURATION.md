# ⚙️ Configuration Guide

**Version:** 1.0.2  
**Last Updated:** November 14, 2025  
**License:** MIT - Lighthouse Automation

This guide explains how to customize the Lighthouse Automation package for your specific needs.

## 📋 Configuration Files Overview

| File | Purpose | Required |
|------|---------|----------|
| `.github/workflows/lighthouse-ci.yml` | GitHub Actions workflow | ✅ Yes |
| `scripts/lighthouse-ci.sh` | Local testing script | ✅ Yes |
| `server.js` | Web server with health check | ✅ Yes |
| `.lighthouserc.json` | Lighthouse CI configuration | ⚠️ Optional |
| `.pa11yci` | Pa11y accessibility config | ⚠️ Optional |
| `package.json` | Dependencies and scripts | ✅ Yes |

## 🎯 Configuring Pages to Test

### In GitHub Actions Workflow

Edit `.github/workflows/lighthouse-ci.yml`:

```yaml
- name: Run Lighthouse Audits
  run: |
    mkdir -p lighthouse-reports
    # Update these arrays with your pages
    PAGES=("" "/about.html" "/products.html" "/services.html" "/contact.html")
    PAGE_NAMES=("home" "about" "products" "services" "contact")
    
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

### In Local Testing Script

Edit `scripts/lighthouse-ci.sh` (lines 12-29):

```bash
# Configuration
BASE_URL="http://localhost:3000"
PAGES=(
    ""                    # Homepage (root path)
    "/about.html"         # About page
    "/products.html"      # Products page
    "/services.html"      # Services page
    "/contact.html"       # Contact page
)

PAGE_NAMES=(
    "Landing Page"        # Display name for reports
    "About"
    "Products"
    "Services"
    "Contact"
)
```

**Important**: Ensure the arrays have the same number of elements and match between both files.

## 🚀 Workflow Triggers

### Current Configuration

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

### Additional Trigger Options

#### Run on Multiple Branches

```yaml
on:
  push:
    branches: [main, develop, staging]
  pull_request:
    branches: [main, develop]
```

#### Schedule Daily Audits

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Run at 2 AM UTC daily
  workflow_dispatch:      # Allow manual triggering
```

#### Run Only on Specific Paths

```yaml
on:
  push:
    branches: [main]
    paths:
      - '**.html'
      - '**.css'
      - 'src/**'
      - '.github/workflows/lighthouse-ci.yml'
```

## 🎨 Customizing Quality Targets

### Option 1: Using lighthouserc.json

Create `.lighthouserc.json` in your project root:

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
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Option 2: Using Command-Line Flags

Edit the Lighthouse command in your workflow:

```yaml
lighthouse "$url" \
  --output=html,json \
  --output-path="lighthouse-reports/lighthouse-${name}-desktop" \
  --chrome-flags="--no-sandbox --headless --disable-gpu" \
  --preset=desktop \
  --budget-path=./budget.json \          # Performance budgets
  --throttling.cpuSlowdownMultiplier=2 \ # Slower CPU simulation
  --screenEmulation.mobile=false \        # Desktop viewport
  --quiet
```

### Performance Budget Example

Create `budget.json`:

```json
[
  {
    "path": "/*",
    "timings": [
      {
        "metric": "interactive",
        "budget": 3000
      },
      {
        "metric": "first-contentful-paint",
        "budget": 2000
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 300
      },
      {
        "resourceType": "stylesheet",
        "budget": 100
      },
      {
        "resourceType": "image",
        "budget": 500
      }
    ],
    "resourceCounts": [
      {
        "resourceType": "third-party",
        "budget": 10
      }
    ]
  }
]
```

## ♿ Accessibility Configuration

### Pa11y Configuration

Create `.pa11yci` in your project root:

```json
{
  "defaults": {
    "timeout": 30000,
    "wait": 1000,
    "chromeLaunchConfig": {
      "args": [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ]
    },
    "standard": "WCAG2AA",
    "includeNotices": true,
    "includeWarnings": true
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/about.html",
    "http://localhost:3000/products.html",
    "http://localhost:3000/contact.html"
  ]
}
```

### Axe-Core Configuration

Edit the axe command in `scripts/lighthouse-ci.sh`:

```bash
# Test with specific WCAG levels
axe "$url" --tags wcag2a,wcag2aa,wcag21a,wcag21aa --save "accessibility-reports/axe-${name}.json"

# Test with specific rules
axe "$url" --rules color-contrast,image-alt,label --save "accessibility-reports/axe-${name}.json"

# Exclude specific rules
axe "$url" --disable color-contrast --save "accessibility-reports/axe-${name}.json"
```

## 🖥️ Server Configuration

### Port Configuration

```javascript
// Use environment variable for flexibility
const port = process.env.PORT || 3000;

// Or use different ports for different environments
const port = process.env.NODE_ENV === 'production' ? 8080 : 3000;
```

### Custom Routes

```javascript
// Dynamic routing
app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog', `${req.params.slug}.html`));
});

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Static File Serving

```javascript
// Serve from multiple directories
app.use(express.static(__dirname));
app.use('/css', express.static(path.join(__dirname, 'styles')));
app.use('/js', express.static(path.join(__dirname, 'scripts')));
app.use('/images', express.static(path.join(__dirname, 'assets', 'images')));

// With caching headers
app.use('/dist', express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true
}));
```

## 🔧 Environment Variables

### In GitHub Actions

Add secrets and environment variables:

```yaml
env:
  NODE_VERSION: "20.x"
  BASE_URL: "http://localhost:3000"
  LIGHTHOUSE_TIMEOUT: 60000

jobs:
  lighthouse_performance_audit:
    env:
      CI: true
    steps:
      - name: Run Lighthouse
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### In Local Scripts

```bash
# In lighthouse-ci.sh
BASE_URL="${BASE_URL:-http://localhost:3000}"
TIMEOUT="${LIGHTHOUSE_TIMEOUT:-60}"
```

## 📊 Report Configuration

### Report Retention

```yaml
- name: Upload Lighthouse reports
  uses: actions/upload-artifact@v4
  with:
    name: lighthouse-reports
    path: lighthouse-reports/
    retention-days: 7  # Change to 1, 7, 30, or 90
```

### Report Formats

```bash
# HTML only (for viewing in browser)
lighthouse "$url" --output=html --output-path="report.html"

# JSON only (for programmatic analysis)
lighthouse "$url" --output=json --output-path="report.json"

# Multiple formats
lighthouse "$url" --output=html,json,csv --output-path="report"
```

## ⏱️ Timeout Configuration

### Server Startup Timeout

```yaml
- name: Wait for server
  run: |
    timeout 120 bash -c 'until curl -f http://localhost:3000/health; do sleep 2; done'
```

### Lighthouse Timeout

```bash
lighthouse "$url" \
  --max-wait-for-load=60000 \          # Wait up to 60s for page load
  --max-wait-for-fcp=30000 \           # Wait up to 30s for first paint
  --timeout=90000                       # Overall timeout
```

## 🔐 Security Hardening

### Chrome Flags for CI

```yaml
--chrome-flags="--no-sandbox --headless --disable-gpu --disable-dev-shm-usage --disable-setuid-sandbox"
```

### NPM Audit Integration

Add to workflow:

```yaml
- name: Security audit
  run: |
    npm audit --audit-level=moderate
    if [ $? -ne 0 ]; then
      echo "⚠️ Security vulnerabilities found"
      npm audit --json > security-audit.json
    fi

- name: Upload security report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: security-audit
    path: security-audit.json
```

## 🎛️ Advanced Customization

### Custom Lighthouse Categories

```javascript
// Create custom-config.js
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility'],
    skipAudits: ['uses-http2']
  }
};
```

Use in workflow:

```bash
lighthouse "$url" --config-path=./custom-config.js
```

### Multiple Environments

```yaml
strategy:
  matrix:
    environment: [staging, production]
    include:
      - environment: staging
        url: https://staging.example.com
      - environment: production
        url: https://example.com

- name: Run Lighthouse
  run: lighthouse ${{ matrix.url }}
```

## 📝 Summary of Key Configuration Points

1. **Pages**: Update PAGES and PAGE_NAMES arrays in both workflow and script
2. **Triggers**: Customize when the workflow runs (push, PR, schedule)
3. **Quality Targets**: Set thresholds in .lighthouserc.json or command flags
4. **Server**: Ensure health check endpoint exists and responds
5. **Timeouts**: Adjust based on your application's load time
6. **Reports**: Choose formats and retention periods
7. **Environments**: Use environment variables for flexibility

## 🔄 Testing Configuration Changes

Always test locally before pushing:

```bash
# 1. Start server
npm start

# 2. Test Lighthouse manually
npm run lighthouse:manual

# 3. Run full script
./scripts/lighthouse-ci.sh

# 4. Check output
ls -la lighthouse-reports/
```

---

**Next Steps**: Read [USAGE.md](USAGE.md) to learn how to run tests and interpret results.
