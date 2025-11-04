# 🚀 Lighthouse Automation - Reusable CI/CD Component

A production-ready, portable Google Lighthouse CI automation package that can be deployed to any web project for automated performance, accessibility, and best practices testing.

## 📦 What's Included

This package contains all the components needed for automated Lighthouse testing:

- **`.github/workflows/lighthouse-ci.yml`** - GitHub Actions workflow for automated testing
- **`scripts/lighthouse-ci.sh`** - Comprehensive local testing script
- **`package.json`** - Required dependencies and npm scripts
- **`server.js`** - Express server with health check endpoint
- **`tailwind.config.js`** - Example Tailwind CSS configuration
- **`docs/`** - Complete installation and configuration guides

## 🎯 Features

✅ **Automated Performance Testing** - Lighthouse audits on every push/PR
✅ **Multi-Page Support** - Test multiple pages in a single run (desktop + mobile)
✅ **Accessibility Audits** - WCAG 2.1 AA compliance testing
✅ **Health Checks** - Reliable server readiness detection
✅ **Report Generation** - HTML and JSON reports with 7-day retention
✅ **Local Testing** - Run audits locally before pushing to CI
✅ **Zero Configuration** - Works out of the box with sensible defaults

## 🚀 Quick Start

See the [INSTALLATION.md](docs/INSTALLATION.md) guide for detailed setup instructions.

### Basic Installation

```bash
# 1. Copy Lighthouse-Automation folder to your project root
cp -r Lighthouse-Automation/* /path/to/your/project/

# 2. Install dependencies
npm install

# 3. Update page URLs in scripts/lighthouse-ci.sh
# Edit PAGES and PAGE_NAMES arrays

# 4. Commit and push to trigger CI
git add .github/workflows/lighthouse-ci.yml
git commit -m "Add Lighthouse CI automation"
git push
```

## 📚 Documentation

### Getting Started
- **[INSTALLATION.md](docs/INSTALLATION.md)** - Step-by-step installation guide for new projects
- **[QUICK-START.md](docs/QUICK-START.md)** - Complete example with sample code
- **[DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)** - Comprehensive deployment checklist for client projects

### Configuration & Usage
- **[CONFIGURATION.md](docs/CONFIGURATION.md)** - Customization and configuration options
- **[CONFIG-TEMPLATES.md](docs/CONFIG-TEMPLATES.md)** - Ready-to-use configuration examples
- **[USAGE.md](docs/USAGE.md)** - Running tests locally and in CI, interpreting results

### Support
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🔧 Prerequisites

- Node.js >= 20.0.0
- npm >= 8.0.0
- GitHub repository with Actions enabled
- A web server (Express, Node.js, or any HTTP server)

## 📊 What Gets Tested

- **Performance Score** (Target: ≥ 85%)
- **Accessibility Score** (Target: ≥ 95%)
- **Best Practices Score** (Target: ≥ 90%)
- **SEO Score** (Target: ≥ 90%)
- **Core Web Vitals** (FCP, LCP, CLS, TBT)
- **Desktop + Mobile** viewports

## 🎓 Learn More

This automation package is based on production implementations and follows GitHub Actions best practices. For more educational content on CI/CD, see:

- [CI/CD Implementation Guide](docs/CICD-GUIDE.md) - Understanding the workflow architecture
- [Lighthouse Best Practices](docs/LIGHTHOUSE-BEST-PRACTICES.md) - Optimization tips

---

**Version:** 1.0.0  
**Last Updated:** November 4, 2025  
**Node.js:** >= 20.0.0  
**License:** MIT
