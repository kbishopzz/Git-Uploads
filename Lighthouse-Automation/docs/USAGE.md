# 🚦 Usage Guide - Lighthouse Automation

**Version:** 1.0.1  
**Last Updated:** November 14, 2025  
**License:** MIT

Learn how to run Lighthouse audits locally and in CI, and how to interpret the results.

## 🏃 Running Tests Locally

### Quick Manual Test

Test a single page with Lighthouse:

```bash
# Start your server first
npm start

# In another terminal, run Lighthouse
npm run lighthouse:manual

# View the report
open lighthouse-report.html
```

### Full Test Suite

Run the complete Lighthouse CI script:

```bash
# Run the full automation suite
npm run lighthouse

# Or directly
./scripts/lighthouse-ci.sh
```

This will:
1. Build your project
2. Start the development server
3. Run Lighthouse audits on all pages (desktop + mobile)
4. Run accessibility tests (axe-core + pa11y)
5. Analyze performance and bundle sizes
6. Generate comprehensive reports

### Individual Test Types

```bash
# Performance only
npm run performance

# Accessibility only
npm run accessibility

# Security audit only
npm run security
```

## 🤖 Running Tests in CI

### Automatic Triggers

Tests run automatically when you:

- **Push to main branch**: Full Lighthouse audit
- **Create a pull request**: Full Lighthouse audit
- **Scheduled** (if configured): Daily at 2 AM UTC

### Manual Triggers

#### Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Select "🚀 Lighthouse Performance Audit" workflow
4. Click **Run workflow** button
5. Choose the branch and click **Run workflow**

#### Using GitHub CLI

```bash
# Trigger workflow manually
gh workflow run lighthouse-ci.yml

# Trigger on a specific branch
gh workflow run lighthouse-ci.yml --ref develop

# List recent runs
gh run list --workflow="lighthouse-ci.yml"

# Watch a running workflow
gh run watch
```

## 📊 Viewing Test Results

### In GitHub Actions

#### Download Reports

1. Go to **Actions** tab in your repository
2. Click on the workflow run you want to view
3. Scroll to **Artifacts** section at the bottom
4. Download `lighthouse-reports.zip`
5. Extract and open HTML files in your browser

#### Using GitHub CLI

```bash
# Download artifacts from the latest run
gh run download

# Download from a specific run
gh run download <run-id>

# List available artifacts
gh run view <run-id>
```

### Local Report Locations

After running `./scripts/lighthouse-ci.sh`, reports are in:

```
reports/
├── lighthouse/
│   ├── landing-page.json
│   ├── features.json
│   ├── pricing.json
│   ├── testimonials.json
│   └── contact.json
├── accessibility/
│   ├── axe-landing-page.json
│   ├── axe-features.json
│   └── pa11y-report.txt
├── performance/
│   └── bundle-analysis.txt
└── lighthouse-ci-report-[timestamp].md
```

## 📈 Understanding Lighthouse Scores

### Score Categories

Lighthouse provides scores from 0-100 in four categories:

| Category | Score Range | Meaning | Target |
|----------|-------------|---------|--------|
| 🟢 90-100 | Excellent | Best performance | ✅ Aim for this |
| 🟡 50-89 | Needs improvement | Moderate issues | ⚠️ Can improve |
| 🔴 0-49 | Poor | Significant issues | ❌ Fix urgently |

### Performance Metrics

**Core Web Vitals** (most important):

- **First Contentful Paint (FCP)**: Time until first text/image appears
  - 🟢 Good: < 1.8s
  - 🟡 Needs improvement: 1.8s - 3.0s
  - 🔴 Poor: > 3.0s

- **Largest Contentful Paint (LCP)**: Time until largest content is visible
  - 🟢 Good: < 2.5s
  - 🟡 Needs improvement: 2.5s - 4.0s
  - 🔴 Poor: > 4.0s

- **Cumulative Layout Shift (CLS)**: Visual stability
  - 🟢 Good: < 0.1
  - 🟡 Needs improvement: 0.1 - 0.25
  - 🔴 Poor: > 0.25

- **Total Blocking Time (TBT)**: Time page is blocked from user interaction
  - 🟢 Good: < 200ms
  - 🟡 Needs improvement: 200ms - 600ms
  - 🔴 Poor: > 600ms

### Accessibility Metrics

Key accessibility checks:

- **Color Contrast**: Text must have sufficient contrast with background (WCAG AA: 4.5:1)
- **Alt Text**: All images must have descriptive alt attributes
- **Form Labels**: All form inputs must have associated labels
- **ARIA Attributes**: Proper use of ARIA roles and attributes
- **Keyboard Navigation**: All interactive elements must be keyboard accessible

### Best Practices

Common checks:

- Uses HTTPS
- No browser errors in console
- Images have correct aspect ratios
- Links are crawlable
- Uses HTTP/2
- Avoids deprecated APIs

### SEO

Important for search engines:

- Meta description
- Valid structured data
- Crawlable links
- Mobile-friendly
- Legible font sizes

## 🎯 Interpreting Results

### Reading the HTML Report

Open any `.html` report in your browser:

```bash
open lighthouse-reports/lighthouse-home-desktop.report.html
```

The report shows:

1. **Overall Scores** (top section)
   - Performance, Accessibility, Best Practices, SEO
   - Color-coded: Green (good), Yellow (ok), Red (poor)

2. **Metrics Timeline** (middle section)
   - Visual representation of page loading
   - Shows FCP, LCP, and other key moments

3. **Opportunities** (expandable sections)
   - Suggestions to improve performance
   - Estimated time savings for each fix

4. **Diagnostics** (expandable sections)
   - Technical details about page performance
   - Issues that don't have savings estimates

5. **Passed Audits** (bottom section)
   - Things you're doing well
   - Can be collapsed for cleaner view

### Reading JSON Reports

JSON reports are useful for programmatic analysis:

```bash
# View performance score
cat lighthouse-reports/lighthouse-home-desktop.report.json | jq '.categories.performance.score'

# View all metrics
cat lighthouse-reports/lighthouse-home-desktop.report.json | jq '.audits | keys'

# View specific metric
cat lighthouse-reports/lighthouse-home-desktop.report.json | jq '.audits["first-contentful-paint"]'
```

### Reading Accessibility Reports

**Axe Reports** (JSON format):

```bash
cat accessibility-reports/axe-home.json | jq '.violations | length'  # Number of issues
cat accessibility-reports/axe-home.json | jq '.violations[0]'        # First issue
```

**Pa11y Reports** (Text format):

```bash
cat accessibility-reports/pa11y-report.txt
```

Format:
```
Error: <selector> - <rule>
  Description of the issue
  How to fix it
```

## 🔧 Common Testing Scenarios

### Before Deploying to Production

```bash
# Full audit of all pages
./scripts/lighthouse-ci.sh

# Check the comprehensive report
cat reports/lighthouse-ci-report-*.md

# If all scores are green, safe to deploy
```

### After Making Performance Changes

```bash
# Quick performance check
npm run performance

# Compare with previous results
# (save reports before and after changes)
```

### Testing Accessibility Compliance

```bash
# Run accessibility tests
npm run accessibility

# Review axe-core violations
cat accessibility-reports/axe-*.json

# Fix issues and retest
```

### Testing Different Devices

Lighthouse tests both desktop and mobile automatically:

- **Desktop**: `lighthouse-{page}-desktop.report.html`
- **Mobile**: `lighthouse-{page}-mobile.report.html`

Compare scores between viewports to ensure responsive design works well.

## 📝 CI Workflow Status

### Workflow Status Badges

Add to your README.md:

```markdown
![Lighthouse CI](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/lighthouse-ci.yml/badge.svg)
```

### Monitoring Workflow Health

```bash
# List recent workflow runs
gh run list --workflow=lighthouse-ci.yml --limit=10

# View details of a specific run
gh run view <run-id>

# View logs from a specific run
gh run view <run-id> --log

# Download logs
gh run view <run-id> --log > lighthouse-ci.log
```

## 🎓 Best Practices

### Testing Frequency

- **During Development**: Test locally before committing
- **Before Merging PRs**: Review CI results
- **After Deployment**: Run manual audit to verify
- **Scheduled**: Weekly or monthly comprehensive audits

### Performance Goals

Set realistic targets:

1. **Initial Goal**: All scores > 70
2. **Intermediate Goal**: All scores > 85
3. **Advanced Goal**: All scores > 95

Don't aim for 100 immediately—focus on incremental improvements.

### Accessibility Goals

Zero tolerance for:
- Missing alt text on images
- Forms without labels
- Color contrast failures
- Keyboard navigation issues

These are WCAG 2.1 Level A requirements.

## 🚨 When Tests Fail

### In Pull Requests

1. Check the Actions tab for the failed workflow
2. Download the lighthouse-reports artifact
3. Review failing pages and metrics
4. Fix issues locally and test with `npm run lighthouse:manual`
5. Push fixes and verify CI passes

### In Production

1. Download the latest reports
2. Identify which pages/metrics are failing
3. Prioritize fixes based on impact:
   - Security issues: Fix immediately
   - Accessibility issues: Fix within 1 sprint
   - Performance issues: Fix within 2 sprints
   - SEO issues: Fix within 1 month

## 💡 Pro Tips

### Faster Local Testing

```bash
# Test only one page
lighthouse http://localhost:3000 --view

# Test with specific categories only
lighthouse http://localhost:3000 --only-categories=performance --view

# Test without opening report
lighthouse http://localhost:3000 --quiet
```

### Comparing Results

```bash
# Save baseline
npm run lighthouse:manual
mv lighthouse-report.html baseline-report.html

# Make changes, test again
npm run lighthouse:manual

# Compare both reports side by side
open baseline-report.html lighthouse-report.html
```

### Debugging Specific Issues

```bash
# Test with Chrome DevTools traces
lighthouse http://localhost:3000 --view --save-assets

# Test with specific device emulation
lighthouse http://localhost:3000 --emulated-form-factor=mobile --screenEmulation.mobile

# Test with throttling
lighthouse http://localhost:3000 --throttling.cpuSlowdownMultiplier=4
```

## 📚 Additional Resources

- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/overview/)
- [Core Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Performance Best Practices](https://web.dev/performance/)

---

**Next Steps**: 
- Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Review [CONFIGURATION.md](CONFIGURATION.md) to customize your setup
