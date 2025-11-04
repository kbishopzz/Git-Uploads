# ✅ Deployment Checklist

Use this checklist when deploying Lighthouse Automation to a new client project.

## Pre-Deployment

### 1. Environment Assessment

- [ ] Node.js version ≥ 20.0.0 installed
- [ ] npm version ≥ 8.0.0 installed
- [ ] Git repository initialized
- [ ] GitHub repository exists with Actions enabled
- [ ] Project has HTML pages to test
- [ ] Project has a web server or can use the provided one

### 2. File Review

- [ ] Identify all HTML pages that need testing
- [ ] List all page URLs (e.g., `/`, `/about.html`, `/products.html`)
- [ ] Determine if custom server exists or if provided server.js will be used
- [ ] Check if project uses a build process (Webpack, Vite, etc.)

## Installation Phase

### 3. Copy Files

- [ ] Copy `.github/workflows/lighthouse-ci.yml` to client's `.github/workflows/`
- [ ] Copy `scripts/lighthouse-ci.sh` to client's `scripts/`
- [ ] Copy `server.js` (if client doesn't have a server)
- [ ] Create `docs/` folder in Lighthouse-Automation directory (optional)

### 4. Dependencies

- [ ] Add required dependencies to `package.json`:
  - [ ] `express` (if using provided server)
  - [ ] `@axe-core/cli` (devDependency)
  - [ ] `lighthouse` (devDependency)
  - [ ] `pa11y-ci` (devDependency)
- [ ] Run `npm install`
- [ ] Verify `package-lock.json` is created
- [ ] Add `node_modules/` to `.gitignore` if not present

### 5. npm Scripts

- [ ] Add `"start": "node server.js"` to package.json scripts
- [ ] Add `"lighthouse": "./scripts/lighthouse-ci.sh"` to scripts
- [ ] Add `"lighthouse:manual"` script for manual testing
- [ ] Verify scripts run without errors

## Configuration Phase

### 6. Server Setup

If using provided `server.js`:
- [ ] Update routes to match client's pages
- [ ] Verify static file paths
- [ ] Ensure health check endpoint exists at `/health`
- [ ] Test server starts: `npm start`
- [ ] Test health endpoint: `curl http://localhost:3000/health`

If using existing server:
- [ ] Add health check endpoint: `app.get('/health', ...)`
- [ ] Add graceful shutdown handler
- [ ] Verify server responds to health check
- [ ] Test all pages load correctly

### 7. Page Configuration

Update `scripts/lighthouse-ci.sh`:
- [ ] Update `PAGES` array (lines 12-20)
- [ ] Update `PAGE_NAMES` array (lines 22-29)
- [ ] Verify arrays have same number of elements
- [ ] Test each URL loads: `curl http://localhost:3000/[page]`

Update `.github/workflows/lighthouse-ci.yml`:
- [ ] Update `PAGES` array (line ~49)
- [ ] Update `PAGE_NAMES` array (line ~50)
- [ ] Ensure arrays match those in shell script
- [ ] Update Node.js version if needed (env.NODE_VERSION)

### 8. Script Permissions

- [ ] Make shell script executable: `chmod +x scripts/lighthouse-ci.sh`
- [ ] Verify: `ls -la scripts/lighthouse-ci.sh` shows `-rwxr-xr-x`

## Testing Phase

### 9. Local Testing

- [ ] Start server in one terminal: `npm start`
- [ ] Verify server output shows correct port
- [ ] Test health endpoint: `curl http://localhost:3000/health`
- [ ] Test single page manually: `npm run lighthouse:manual`
- [ ] View generated report: `open lighthouse-report.html`
- [ ] Run full test suite: `./scripts/lighthouse-ci.sh`
- [ ] Check all reports generated in `reports/` directory
- [ ] Review scores (should be reasonable, not necessarily perfect)

### 10. Fix Common Issues

If server won't start:
- [ ] Check port 3000 isn't already in use: `lsof -i :3000`
- [ ] Kill existing process if needed
- [ ] Try different port: `PORT=3001 npm start`

If Lighthouse times out:
- [ ] Verify page loads in browser
- [ ] Check for JavaScript errors in console
- [ ] Increase timeout in lighthouse command

If reports show low scores:
- [ ] Review opportunities in HTML report
- [ ] Fix critical issues (missing alt text, contrast, etc.)
- [ ] Re-test to verify improvements

### 11. Git Configuration

- [ ] Add to `.gitignore`:
  ```
  node_modules/
  lighthouse-reports/
  reports/
  lighthouse-report.html
  *.log
  ```
- [ ] Stage files: `git add .github/ scripts/ server.js package.json`
- [ ] Commit: `git commit -m "Add Lighthouse CI automation"`
- [ ] Push to main branch: `git push origin main`

## GitHub Actions Phase

### 12. Verify Workflow

- [ ] Go to repository on GitHub
- [ ] Click **Actions** tab
- [ ] Verify "🚀 Lighthouse Performance Audit" workflow appears
- [ ] Check workflow status (should be running or queued)
- [ ] Wait for workflow to complete (typically 5-10 minutes)

### 13. Review First Run

If workflow succeeds:
- [ ] Download `lighthouse-reports` artifact
- [ ] Extract and open HTML reports
- [ ] Review scores for each page
- [ ] Document baseline scores
- [ ] Share results with client

If workflow fails:
- [ ] Click on failed run
- [ ] Expand failed step
- [ ] Read error message
- [ ] Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- [ ] Fix issue locally and test
- [ ] Commit fix and push again

### 14. Configure Branch Protection (Optional)

- [ ] Go to Settings > Branches
- [ ] Add rule for `main` branch
- [ ] Enable "Require status checks to pass"
- [ ] Select "Lighthouse Performance Audit"
- [ ] Enable "Require branches to be up to date"
- [ ] Save changes

## Documentation Phase

### 15. Document for Client

- [ ] Add README section explaining Lighthouse CI
- [ ] Document how to view reports
- [ ] Explain what scores mean
- [ ] Provide troubleshooting contact info
- [ ] Add workflow status badge to README:
  ```markdown
  ![Lighthouse CI](https://github.com/USERNAME/REPO/actions/workflows/lighthouse-ci.yml/badge.svg)
  ```

### 16. Create Client Guide

Create a simple guide for client:

```markdown
# Lighthouse CI - Quick Guide

## What It Does
Automatically tests your website for:
- Performance (speed)
- Accessibility (usability for all)
- Best practices (security, standards)
- SEO (search engine optimization)

## When It Runs
- Every time you push code to main branch
- Every time you create a pull request

## Viewing Results
1. Go to "Actions" tab in GitHub
2. Click on latest workflow run
3. Scroll to "Artifacts" section
4. Download "lighthouse-reports.zip"
5. Extract and open HTML files in browser

## Understanding Scores
- 🟢 90-100: Excellent
- 🟡 50-89: Needs improvement
- 🔴 0-49: Poor (needs fixing)

## Contact
For issues, contact: [your email]
```

## Post-Deployment

### 17. Training

- [ ] Walk client through viewing reports
- [ ] Explain key metrics (FCP, LCP, CLS)
- [ ] Show how to run tests locally
- [ ] Demonstrate fixing common issues
- [ ] Provide documentation links

### 18. Monitoring Setup

- [ ] Set up notifications for failed workflows
- [ ] Schedule weekly review of reports
- [ ] Document baseline scores for comparison
- [ ] Create performance improvement roadmap

### 19. Optimization Planning

Based on initial results:
- [ ] List pages with scores < 85%
- [ ] Prioritize issues (accessibility > performance > SEO)
- [ ] Create tickets/tasks for improvements
- [ ] Set target scores and timeline
- [ ] Schedule follow-up review

## Maintenance

### 20. Ongoing Tasks

Weekly:
- [ ] Review latest Lighthouse reports
- [ ] Check for workflow failures
- [ ] Monitor score trends

Monthly:
- [ ] Update dependencies: `npm update`
- [ ] Review and adjust quality targets
- [ ] Update documentation if needed

Quarterly:
- [ ] Update Node.js version in workflow
- [ ] Review and optimize pages with low scores
- [ ] Update Lighthouse CLI: `npm install -g lighthouse@latest`

## Success Criteria

Deployment is successful when:

- ✅ Workflow runs automatically on push
- ✅ All pages are tested (desktop + mobile)
- ✅ Reports are generated and downloadable
- ✅ Scores meet minimum thresholds:
  - Performance ≥ 70%
  - Accessibility ≥ 85%
  - Best Practices ≥ 85%
  - SEO ≥ 80%
- ✅ Client can view and understand reports
- ✅ Documentation is complete
- ✅ Local testing works for client's team

## Handoff Checklist

Before considering deployment complete:

- [ ] All tests passing in CI
- [ ] Client can access and understand reports
- [ ] Documentation provided and reviewed
- [ ] Training completed
- [ ] Monitoring configured
- [ ] Improvement plan documented
- [ ] Contact information provided
- [ ] Future maintenance schedule agreed

---

## Common Gotchas

❗ **Don't forget to:**
- Make shell scripts executable (`chmod +x`)
- Update page arrays in BOTH workflow and script
- Test locally before pushing to CI
- Check health endpoint responds
- Verify package-lock.json is committed
- Ensure NODE_VERSION matches local environment

## Quick Reference Commands

```bash
# Test server
npm start
curl http://localhost:3000/health

# Test Lighthouse
npm run lighthouse:manual

# View reports
open lighthouse-report.html

# Check workflow
gh run list
gh run watch

# Debug
lighthouse http://localhost:3000 --verbose
```

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Client:** _______________  
**Repository:** _______________  
**Baseline Scores:** _______________
