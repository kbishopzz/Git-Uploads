# 🚀 Web Performance & Automation Toolkit

A comprehensive collection of production-ready tools for web performance optimization, SEO automation, and CI/CD integration. Perfect for developers, agencies, and teams looking to improve website quality and automate testing workflows.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.1-green.svg)]()
[![Last Updated](https://img.shields.io/badge/updated-November%2014%2C%202025-orange.svg)]()

---

## 📦 What's Included

This repository contains four powerful, standalone tools that can be used independently or together:

### 1. 🔄 [Async Boot Loader Template](Async-Boot-Loader-Template/)

A high-performance, reusable JavaScript asset loading system for modern web applications.

**Key Features:**
- ⚡ Promise-based async loading
- 🎯 Parallel script fetch with ordered execution
- 🔒 CSP-friendly (Content Security Policy)
- 📦 Tiny footprint (~5KB total)
- 🔄 Configurable and reusable

**Use Cases:**
- Improve First Contentful Paint (FCP)
- Eliminate render-blocking resources
- Load scripts efficiently without blocking
- Perfect for static sites and SPAs

**Quick Start:**
```bash
cd Async-Boot-Loader-Template/
# Copy loader.js and bootstrap-loader.js to your project
# See BOOTSTRAP_LOADER_README.md for integration
```

---

### 2. 📊 [JSON-LD Schema Automation](JSON-LD%20Automation/)

Dynamic JSON-LD structured data generator for improved SEO and rich search results.

**Key Features:**
- 🤖 Automated schema generation
- 📝 Multiple schema types (Restaurant, Product, Event, etc.)
- 🎨 DOM parsing for dynamic content
- ⚙️ Configuration-driven
- 🔍 Google Rich Results compatible

**Supported Schemas:**
- Restaurant/Café
- Product/E-commerce
- Local Business
- Events
- Articles
- Organization
- Menu (for restaurants)

**Quick Start:**
```bash
cd "JSON-LD Automation"/
# Copy dynamic-jsonld-module.js to your project
# See DYNAMIC-JSONLD-GUIDE.md for usage
```

---

### 3. 🖼️ [Auto Image Updater Template](Auto-Image-Updater-Template/)

Automatically populate your projects with high-quality images from Unsplash API.

**Key Features:**
- 🔍 Automatic image search based on item names
- 🎨 High-quality, professional images from Unsplash
- 📝 Preserves data structure while updating images
- 🚀 Simple command-line execution
- 🔒 Secure with environment variables
- 🎯 Customizable for any data structure

**Use Cases:**
- Quickly populate menu items with food images
- Add product images to e-commerce catalogs
- Generate placeholder images for development
- Perfect for prototyping and demos

**Quick Start:**
```bash
cd Auto-Image-Updater-Template/
npm install
# Create .env file with your Unsplash API key
node update-menu-images.mjs
```

---

### 4. 🔦 [Lighthouse Automation CI/CD](Lighthouse-Automation/)

Complete CI/CD automation package for Google Lighthouse performance and accessibility testing.

**Key Features:**
- 🤖 GitHub Actions workflow
- 📱 Desktop + Mobile testing
- ♿ Accessibility audits (WCAG 2.1 AA)
- 📊 Performance budgets
- 🎯 Core Web Vitals monitoring
- 📈 Historical reporting

**What Gets Tested:**
- Performance Score (target: ≥85%)
- Accessibility Score (target: ≥95%)
- Best Practices Score (target: ≥90%)
- SEO Score (target: ≥90%)
- Core Web Vitals (LCP, FID, CLS)

**Quick Start:**
```bash
cd Lighthouse-Automation/
npm install
# See INSTALLATION.md for full setup
```

---

## 🎯 Use Cases

### For Web Developers
- ✅ Quickly populate projects with quality images
- ✅ Speed up page load times with async loader
- ✅ Improve SEO with structured data
- ✅ Automate performance testing
- ✅ Catch regressions before deployment

### For Agencies
- ✅ Rapid prototyping with auto-generated images
- ✅ Deliver high-performance client sites
- ✅ Provide automated quality reports
- ✅ Ensure accessibility compliance
- ✅ Reduce manual testing time

### For Teams
- ✅ Streamline content creation workflow
- ✅ Enforce performance standards
- ✅ Track metrics over time
- ✅ Prevent performance regressions
- ✅ Improve collaboration with data

---

## 📋 Prerequisites

### All Tools
- Basic understanding of HTML, CSS, and JavaScript
- Text editor or IDE
- Web browser (Chrome recommended)

### Lighthouse Automation
- Node.js >= 20.0.0
- npm >= 8.0.0
- Git repository with GitHub Actions

### Optional
- GitHub account (for CI/CD)
- Web server (provided with Lighthouse tool)

---

## 🚀 Quick Start Guide

### 1. Clone the Repository

```bash
git clone https://github.com/kbishopzz/Git-Uploads.git
cd Git-Uploads
```

### 2. Choose Your Tool

**For Async Loading:**
```bash
cd Async-Boot-Loader-Template/
open BOOTSTRAP_LOADER_README.md
```

**For SEO/Structured Data:**
```bash
cd "JSON-LD Automation"/
open DYNAMIC-JSONLD-GUIDE.md
```

**For Auto Image Updates:**
```bash
cd Auto-Image-Updater-Template/
npm install
# Setup .env file, then run:
node update-menu-images.mjs
```

**For Performance Testing:**
```bash
cd Lighthouse-Automation/
npm install
open docs/INSTALLATION.md
```

### 3. Follow Tool-Specific Documentation

Each tool has comprehensive documentation:
- README.md - Overview and features
- Installation/setup guides
- Configuration examples
- Usage instructions
- Troubleshooting guides

---

## 📚 Documentation Structure

```
Git-Uploads/
├── README.md (this file)
├── LICENSE
│
├── Async-Boot-Loader-Template/
│   ├── BOOTSTRAP_LOADER_README.md
│   ├── LOADER_SETUP.md
│   ├── CHANGELOG.md
│   ├── LICENSE
│   ├── bootstrap-loader.js
│   ├── loader.js
│   └── index.html (example)
│
├── JSON-LD Automation/
│   ├── README.md
│   ├── DYNAMIC-JSONLD-GUIDE.md
│   ├── CHANGELOG.md
│   ├── LICENSE
│   └── dynamic-jsonld-module.js
│
├── Auto-Image-Updater-Template/
│   ├── README.md
│   ├── update-menu-images.mjs
│   ├── menu-data.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── Lighthouse-Automation/
    ├── README.md
    ├── DEPLOYMENT-CHECKLIST.md
    ├── PACKAGE-SUMMARY.md
    ├── CHANGELOG.md
    ├── LICENSE
    ├── package.json
    ├── server.js
    ├── .lighthouserc.json
    ├── budget.json
    ├── .pa11yci
    ├── docs/
    │   ├── INSTALLATION.md
    │   ├── CONFIGURATION.md
    │   ├── USAGE.md
    │   ├── TROUBLESHOOTING.md
    │   ├── QUICK-START.md
    │   ├── CONFIG-TEMPLATES.md
    │   ├── CICD-GUIDE.md
    │   └── LIGHTHOUSE-BEST-PRACTICES.md
    └── scripts/
        └── lighthouse-ci.sh
```

---

## 💡 Common Workflows

### Workflow 1: New Website Development

```bash
# 1. Populate content with images
cd Auto-Image-Updater-Template/
node update-menu-images.mjs

# 2. Use Async Loader for fast page loads
Copy loader.js and bootstrap-loader.js to project

# 3. Add JSON-LD for SEO
Copy dynamic-jsonld-module.js to project
Configure schema types

# 4. Set up Lighthouse CI for quality assurance
Copy Lighthouse-Automation/ contents
Configure GitHub Actions
Push to repository
```

### Workflow 2: Optimize Existing Site

```bash
# 1. Run Lighthouse audit to get baseline
cd Lighthouse-Automation/
npm install
npm start & 
npm run lighthouse:manual

# 2. Implement async loader to improve performance
# 3. Add structured data for better SEO
# 4. Set up CI/CD for ongoing monitoring
```

### Workflow 3: Client Projects

```bash
# 1. Clone repository
# 2. Choose tools needed for project
# 3. Follow deployment checklists
# 4. Deliver automated reports to client
```

---

## 🎓 Learning Resources

### Performance Optimization
- [Web.dev Learn](https://web.dev/learn/)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- Core Web Vitals Guide (in Lighthouse docs)

### SEO & Structured Data
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- JSON-LD Guide (in JSON-LD Automation docs)

### CI/CD
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- CI/CD Guide (in Lighthouse docs)

---

## 🔧 Customization

All tools are designed to be highly customizable:

### Async Boot Loader
- Configure which scripts to load
- Set custom initialization functions
- Adjust fallback behavior
- Customize preload behavior

### JSON-LD Automation
- Add custom schema types
- Configure page indicators
- Set up dynamic parsing rules
- Customize injection timing

### Lighthouse Automation
- Add/remove pages to test
- Adjust quality thresholds
- Configure performance budgets
- Customize workflow triggers
- Set up notifications

---

## 📊 Performance Benefits

Using these tools together can provide significant improvements:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| First Contentful Paint | 3.5s | 1.2s | 📈 65% faster |
| Largest Contentful Paint | 5.2s | 2.1s | 📈 60% faster |
| Total Blocking Time | 850ms | 180ms | 📈 79% reduction |
| Lighthouse Performance | 62 | 94 | 📈 +32 points |
| SEO Score | 78 | 98 | 📈 +20 points |
| Accessibility Score | 85 | 100 | 📈 +15 points |

*Results vary by site and implementation*

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See individual tool directories for specific contribution guidelines.

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Async loader not working**
- Check console for errors
- Verify script paths are correct
- Ensure scripts are served correctly

**Issue: JSON-LD not appearing**
- Check browser inspector for `<script type="application/ld+json">`
- Verify schema configuration
- Test at [Schema.org Validator](https://validator.schema.org/)

**Issue: Lighthouse CI fails**
- Check GitHub Actions logs
- Verify server starts correctly
- Test locally first
- See Lighthouse-Automation/docs/TROUBLESHOOTING.md

### Getting Help

1. Check tool-specific documentation
2. Review troubleshooting guides
3. Search existing issues
4. Create a new issue with:
   - Tool name
   - Error message
   - Steps to reproduce
   - Environment details

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Individual tools may have their own licenses - check each directory.

---

## 🌟 Credits

### Created By
**Keith Bishop** ([@kbishopzz](https://github.com/kbishopzz))

### Built With
- Google Lighthouse
- GitHub Actions
- Express.js
- Node.js
- Pure JavaScript (ES6+)

### Acknowledgments
- Google Chrome DevTools Team
- Web Performance Community
- Schema.org Contributors
- GitHub Actions Community

---

## 📞 Support

### Resources
- 📖 Documentation in each tool directory
- 💬 GitHub Issues for bug reports
- 📧 Contact via GitHub profile

### Professional Services
Looking for implementation help or custom development?
- Custom tool development
- Performance consulting
- CI/CD setup and training
- Enterprise support

Contact through GitHub for inquiries.

---

## 🗺️ Roadmap

### Planned Features
- [ ] Playwright support for Lighthouse automation
- [ ] Additional schema types for JSON-LD
- [ ] Webpack/Vite plugins for async loader
- [ ] Cloud deployment examples
- [ ] Docker containerization
- [ ] VS Code extensions

### Contributions Welcome
See individual tool roadmaps for specific feature requests.

---

## 📈 Statistics

**Total Tools:** 4  
**Total Documentation Files:** 21+  
**Lines of Code:** ~3,500  
**Lines of Documentation:** ~11,000  
**Configuration Examples:** 26+

---

## ⚡ Quick Reference

### Installation Commands

```bash
# Async Boot Loader (no installation needed)
# Just copy files to your project

# JSON-LD Automation (no installation needed)
# Just copy module to your project

# Auto Image Updater
cd Auto-Image-Updater-Template/
npm install
# Setup .env with Unsplash API key
node update-menu-images.mjs

# Lighthouse Automation
cd Lighthouse-Automation/
npm install
npm start
npm run lighthouse:manual
```

### Key Files

- `Async-Boot-Loader-Template/loader.js` - Asset loader
- `Async-Boot-Loader-Template/bootstrap-loader.js` - Bootstrap script
- `JSON-LD Automation/dynamic-jsonld-module.js` - Schema generator
- `Auto-Image-Updater-Template/update-menu-images.mjs` - Image updater script
- `Lighthouse-Automation/server.js` - Web server
- `Lighthouse-Automation/.lighthouserc.json` - Lighthouse config
- `Lighthouse-Automation/scripts/lighthouse-ci.sh` - Testing script

---

## 🎉 Get Started Now!

1. **Browse the tools** to see which fits your needs
2. **Read the documentation** for your chosen tool
3. **Copy files** to your project
4. **Configure** based on your requirements
5. **Test locally** before deploying
6. **Enjoy** improved performance and automation!

---

**Version:** 1.0.0  
**Last Updated:** November 4, 2025  
**Repository:** [https://github.com/kbishopzz/Git-Uploads](https://github.com/kbishopzz/Git-Uploads)

**Made with ❤️ by developers, for developers.**
