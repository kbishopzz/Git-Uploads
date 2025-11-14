# 📝 Configuration Templates

**Version:** 1.0.2  
**Last Updated:** November 14, 2025  
**License:** MIT

Ready-to-use configuration files for common scenarios.

## Table of Contents

1. [Basic lighthouserc.json](#basic-lighthouserc)
2. [Strict lighthouserc.json](#strict-lighthouserc)
3. [.pa11yci Configuration](#pa11yci-configuration)
4. [Performance Budget](#performance-budget)
5. [Custom Lighthouse Config](#custom-lighthouse-config)
6. [Multiple Environment Setup](#multiple-environment-setup)

---

## Basic lighthouserc.json

For most projects starting with Lighthouse CI:

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
        "categories:performance": ["warn", { "minScore": 0.70 }],
        "categories:accessibility": ["error", { "minScore": 0.85 }],
        "categories:best-practices": ["warn", { "minScore": 0.80 }],
        "categories:seo": ["warn", { "minScore": 0.80 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Use when:**
- Starting a new project
- Want lenient thresholds
- Accessibility is priority (error level)

---

## Strict lighthouserc.json

For production-grade applications:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 5,
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
        "categories:best-practices": ["error", { "minScore": 0.90 }],
        "categories:seo": ["error", { "minScore": 0.90 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }],
        "speed-index": ["error", { "maxNumericValue": 3000 }],
        "interactive": ["error", { "maxNumericValue": 3500 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Use when:**
- Production application
- High performance requirements
- All metrics must pass

---

## .pa11yci Configuration

### Basic Pa11y Config

```json
{
  "defaults": {
    "timeout": 30000,
    "wait": 1000,
    "chromeLaunchConfig": {
      "args": [
        "--no-sandbox",
        "--disable-dev-shm-usage"
      ]
    },
    "standard": "WCAG2AA"
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/about.html",
    "http://localhost:3000/products.html",
    "http://localhost:3000/contact.html"
  ]
}
```

### Advanced Pa11y Config

With custom rules and ignores:

```json
{
  "defaults": {
    "timeout": 45000,
    "wait": 2000,
    "chromeLaunchConfig": {
      "args": [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ]
    },
    "standard": "WCAG2AA",
    "includeNotices": true,
    "includeWarnings": true,
    "ignore": [
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail"
    ],
    "hideElements": ".ads, .cookie-banner",
    "screenCapture": "./reports/pa11y-screenshots",
    "actions": [
      "wait for element #main-content to be visible"
    ]
  },
  "urls": [
    {
      "url": "http://localhost:3000",
      "screenCapture": "./reports/screenshots/home.png"
    },
    {
      "url": "http://localhost:3000/about.html",
      "actions": [
        "click element #show-more",
        "wait for element #extra-content to be visible"
      ]
    },
    {
      "url": "http://localhost:3000/contact.html",
      "timeout": 60000
    }
  ]
}
```

---

## Performance Budget

Create `budget.json` for resource size limits:

### Basic Budget

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
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2500
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
      },
      {
        "resourceType": "total",
        "budget": 1000
      }
    ],
    "resourceCounts": [
      {
        "resourceType": "third-party",
        "budget": 10
      },
      {
        "resourceType": "total",
        "budget": 50
      }
    ]
  }
]
```

### Strict Budget

```json
[
  {
    "path": "/*",
    "timings": [
      {
        "metric": "interactive",
        "budget": 2500
      },
      {
        "metric": "first-contentful-paint",
        "budget": 1500
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2000
      },
      {
        "metric": "cumulative-layout-shift",
        "budget": 0.1
      },
      {
        "metric": "total-blocking-time",
        "budget": 200
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 200
      },
      {
        "resourceType": "stylesheet",
        "budget": 50
      },
      {
        "resourceType": "image",
        "budget": 300
      },
      {
        "resourceType": "font",
        "budget": 100
      },
      {
        "resourceType": "total",
        "budget": 800
      }
    ],
    "resourceCounts": [
      {
        "resourceType": "script",
        "budget": 10
      },
      {
        "resourceType": "stylesheet",
        "budget": 5
      },
      {
        "resourceType": "third-party",
        "budget": 5
      },
      {
        "resourceType": "total",
        "budget": 30
      }
    ]
  },
  {
    "path": "/products/*",
    "timings": [
      {
        "metric": "interactive",
        "budget": 3000
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "image",
        "budget": 800
      }
    ]
  }
]
```

---

## Custom Lighthouse Config

Create `lighthouse-config.js`:

### Basic Custom Config

```javascript
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility'],
    skipAudits: [
      'uses-http2',
      'redirects-http'
    ],
    throttling: {
      cpuSlowdownMultiplier: 2,
      downloadThroughputKbps: 1600,
      uploadThroughputKbps: 750,
      rttMs: 150
    }
  }
};
```

### Advanced Custom Config

```javascript
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    skipAudits: [
      'uses-http2',
      'canonical',
      'is-crawlable'
    ],
    throttling: {
      cpuSlowdownMultiplier: 4,
      downloadThroughputKbps: 1024,
      uploadThroughputKbps: 512,
      rttMs: 200
    },
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false
    },
    emulatedUserAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
  },
  audits: [
    { path: 'metrics/first-contentful-paint' },
    { path: 'metrics/largest-contentful-paint' },
    { path: 'metrics/cumulative-layout-shift' }
  ]
};
```

Use in Lighthouse command:

```bash
lighthouse http://localhost:3000 --config-path=./lighthouse-config.js
```

---

## Multiple Environment Setup

### GitHub Actions Matrix Strategy

```yaml
name: Lighthouse Multi-Environment

on:
  push:
    branches: [main, staging]

strategy:
  matrix:
    environment:
      - name: staging
        url: https://staging.example.com
        threshold: 0.70
      - name: production
        url: https://example.com
        threshold: 0.85

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Lighthouse
        run: |
          lighthouse ${{ matrix.environment.url }} \
            --output=html,json \
            --output-path=lighthouse-${{ matrix.environment.name }}
      
      - name: Check Score
        run: |
          SCORE=$(cat lighthouse-${{ matrix.environment.name }}.report.json | jq '.categories.performance.score')
          if (( $(echo "$SCORE < ${{ matrix.environment.threshold }}" | bc -l) )); then
            echo "Performance score $SCORE below threshold ${{ matrix.environment.threshold }}"
            exit 1
          fi
```

### Environment-Specific Configs

**staging.lighthouserc.json:**

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.70 }],
        "categories:accessibility": ["warn", { "minScore": 0.85 }]
      }
    }
  }
}
```

**production.lighthouserc.json:**

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

Use with:

```bash
# Staging
lhci autorun --config=staging.lighthouserc.json

# Production
lhci autorun --config=production.lighthouserc.json
```

---

## npm Scripts Examples

Add to `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "lighthouse": "./scripts/lighthouse-ci.sh",
    "lighthouse:manual": "lighthouse http://localhost:3000 --output=html --output-path=lighthouse-report.html --view",
    "lighthouse:ci": "lhci autorun",
    "lighthouse:desktop": "lighthouse http://localhost:3000 --preset=desktop --view",
    "lighthouse:mobile": "lighthouse http://localhost:3000 --screenEmulation.mobile --view",
    "lighthouse:perf": "lighthouse http://localhost:3000 --only-categories=performance --view",
    "lighthouse:a11y": "lighthouse http://localhost:3000 --only-categories=accessibility --view",
    "lighthouse:budget": "lighthouse http://localhost:3000 --budget-path=budget.json",
    "lighthouse:config": "lighthouse http://localhost:3000 --config-path=lighthouse-config.js",
    "pa11y": "pa11y-ci",
    "axe": "axe http://localhost:3000 --tags wcag2aa",
    "audit:all": "npm run lighthouse && npm run pa11y && npm run axe",
    "audit:quick": "npm run lighthouse:perf && npm run lighthouse:a11y"
  }
}
```

---

## Server Configuration Examples

### Basic Express Server

```javascript
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Production-Ready Server

```javascript
const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

// Security and compression
app.use(helmet());
app.use(compression());

// Static files with caching
app.use(express.static(__dirname, {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
```

---

## Copy & Paste Quick Start

Create all files at once:

```bash
# Create lighthouserc.json
cat > .lighthouserc.json << 'EOF'
{
  "ci": {
    "collect": { "numberOfRuns": 3 },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.70 }],
        "categories:accessibility": ["error", { "minScore": 0.85 }]
      }
    }
  }
}
EOF

# Create .pa11yci
cat > .pa11yci << 'EOF'
{
  "defaults": {
    "timeout": 30000,
    "standard": "WCAG2AA"
  },
  "urls": [
    "http://localhost:3000"
  ]
}
EOF

# Create budget.json
cat > budget.json << 'EOF'
[
  {
    "path": "/*",
    "resourceSizes": [
      { "resourceType": "script", "budget": 300 },
      { "resourceType": "stylesheet", "budget": 100 }
    ]
  }
]
EOF
```

---

**Next Steps:**
- Copy the template that matches your needs
- Customize thresholds for your project
- Test locally before committing
- Adjust based on results
