# 🔧 Troubleshooting Guide

**Version:** 1.0.1  
**Last Updated:** November 14, 2025  
**License:** MIT - Lighthouse Automation

Common issues and their solutions when using the Lighthouse Automation package.

## 🚨 Installation Issues

### Issue: "Permission denied" when running scripts

**Symptoms:**
```bash
-bash: ./scripts/lighthouse-ci.sh: Permission denied
```

**Solution:**
```bash
chmod +x scripts/lighthouse-ci.sh
```

### Issue: npm install fails with dependency errors

**Symptoms:**
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

1. Clear npm cache:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

2. Use legacy peer deps:
```bash
npm install --legacy-peer-deps
```

3. Update npm:
```bash
npm install -g npm@latest
```

### Issue: Node.js version mismatch

**Symptoms:**
```bash
error: Unsupported engine
```

**Solution:**

Check required version:
```bash
# Check current version
node --version

# Install correct version with nvm
nvm install 18
nvm use 18

# Or use n
n 18
```

## 🖥️ Server Issues

### Issue: "EADDRINUSE: address already in use"

**Symptoms:**
```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

1. Kill existing process on port 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or
pkill -f "node server.js"

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

2. Use a different port:
```bash
PORT=3001 npm start
```

3. Update server.js to handle graceful shutdown:
```javascript
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
```

### Issue: Server starts but health check fails

**Symptoms:**
```bash
curl: (7) Failed to connect to localhost port 3000
# or
curl: (52) Empty reply from server
```

**Solutions:**

1. Verify server is actually running:
```bash
ps aux | grep node
lsof -i :3000
```

2. Test health endpoint manually:
```bash
curl -v http://localhost:3000/health
```

3. Check server logs for errors:
```bash
npm start | tee server.log
```

4. Add more robust health check:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Issue: Server starts but pages return 404

**Symptoms:**
```bash
Cannot GET /about.html
```

**Solution:**

1. Verify files exist:
```bash
ls -la *.html
```

2. Check server routes:
```javascript
// Add explicit routes for each page
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Or use express.static
app.use(express.static(__dirname));
```

3. Check file paths are correct:
```javascript
console.log('__dirname:', __dirname);
console.log('Serving files from:', path.join(__dirname, 'about.html'));
```

## 🔦 Lighthouse Issues

### Issue: "Lighthouse timeout"

**Symptoms:**
```bash
LighthouseError: PROTOCOL_TIMEOUT
# or
Navigation timeout of 30000 ms exceeded
```

**Solutions:**

1. Increase timeout:
```bash
lighthouse http://localhost:3000 \
  --max-wait-for-load=60000 \
  --timeout=90000
```

2. Check page actually loads:
```bash
curl -I http://localhost:3000
```

3. Reduce page complexity (temporarily) to isolate issue

4. Check Chrome flags:
```bash
lighthouse http://localhost:3000 \
  --chrome-flags="--no-sandbox --headless --disable-gpu"
```

### Issue: "Chrome crashed" or "Chrome not found"

**Symptoms:**
```bash
Error: Chrome didn't collect any screenshots during the page load
# or
Error: The installed version of Chrome is too old
```

**Solutions:**

1. Install/update Chrome:
```bash
# macOS
brew install --cask google-chrome

# Linux
sudo apt-get update
sudo apt-get install google-chrome-stable

# Or download from https://www.google.com/chrome/
```

2. Use Chromium instead:
```bash
npm install -g puppeteer
lighthouse http://localhost:3000 --chrome-flags="--no-sandbox"
```

3. In CI, ensure browser-actions is used:
```yaml
- name: Install Google Chrome
  uses: browser-actions/setup-chrome@v1
  with:
    chrome-version: stable
```

### Issue: Lighthouse scores inconsistent

**Symptoms:**
- Scores vary significantly between runs
- Sometimes passes, sometimes fails

**Solutions:**

1. Run multiple times and average:
```bash
# Using lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 5
    }
  }
}
```

2. Disable variability sources:
```bash
lighthouse http://localhost:3000 \
  --throttling.cpuSlowdownMultiplier=1 \
  --disable-storage-reset
```

3. Test on stable network connection

4. Close other applications during testing

## ♿ Accessibility Testing Issues

### Issue: axe-core not found

**Symptoms:**
```bash
command not found: axe
```

**Solution:**
```bash
npm install -g @axe-core/cli
# or locally
npm install --save-dev @axe-core/cli
npx axe http://localhost:3000
```

### Issue: pa11y-ci fails with timeout

**Symptoms:**
```bash
Error: Navigation Timeout Exceeded: 30000ms exceeded
```

**Solutions:**

1. Increase timeout in .pa11yci:
```json
{
  "defaults": {
    "timeout": 60000,
    "wait": 2000
  }
}
```

2. Check page loads properly:
```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000
```

### Issue: False positive accessibility violations

**Symptoms:**
- Violations reported for valid ARIA usage
- Color contrast failures on correct contrasts

**Solutions:**

1. Exclude specific rules:
```bash
axe http://localhost:3000 --disable color-contrast
```

2. Configure in .pa11yci:
```json
{
  "defaults": {
    "ignore": [
      "color-contrast",
      "specific-rule-id"
    ]
  }
}
```

3. Review WCAG guidelines to confirm it's actually valid

## 🤖 GitHub Actions Issues

### Issue: Workflow doesn't appear in Actions tab

**Symptoms:**
- No workflow visible after pushing
- Can't trigger workflow manually

**Solutions:**

1. Verify file location:
```bash
ls -la .github/workflows/lighthouse-ci.yml
```

2. Check YAML syntax:
```bash
# Use a YAML validator
npx yaml-validator .github/workflows/lighthouse-ci.yml

# Or use yamllint
yamllint .github/workflows/lighthouse-ci.yml
```

3. Verify branch name matches trigger:
```yaml
on:
  push:
    branches: [main]  # Check this matches your branch
```

4. Check Actions are enabled:
- Go to Settings > Actions > General
- Ensure "Allow all actions" is selected

### Issue: Workflow fails at "Download build artifacts"

**Symptoms:**
```bash
Error: Unable to find any artifacts for the associated workflow
```

**Solutions:**

1. Verify `needs:` dependency is correct:
```yaml
lighthouse_performance_audit:
  needs: build_and_verify  # Must match job name exactly
```

2. Check artifact was uploaded in previous job:
```yaml
- name: Upload build artifacts
  uses: actions/upload-artifact@v4
  with:
    name: build-dist  # Must match download name
```

3. Ensure build job completed successfully

### Issue: Workflow fails at npm ci

**Symptoms:**
```bash
npm ERR! code EUSAGE
npm ERR! `npm ci` can only install packages when your package.json and package-lock.json are in sync
```

**Solutions:**

1. Regenerate package-lock.json locally:
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
```

2. Ensure package-lock.json is not in .gitignore

### Issue: Workflow timeout

**Symptoms:**
```bash
Error: The operation was canceled
```

**Solutions:**

1. Increase job timeout:
```yaml
jobs:
  lighthouse_performance_audit:
    timeout-minutes: 20  # Increase from default 15
```

2. Reduce number of pages tested

3. Test fewer categories:
```bash
lighthouse "$url" --only-categories=performance
```

## 📦 Artifact Issues

### Issue: Cannot download artifacts

**Symptoms:**
- Artifact section shows no artifacts
- Download button is grayed out

**Solutions:**

1. Check retention period hasn't expired:
```yaml
- name: Upload Lighthouse reports
  uses: actions/upload-artifact@v4
  with:
    retention-days: 7  # Increase if needed
```

2. Verify upload step ran:
- Check workflow logs for upload step
- Look for "Uploading artifact" message

3. Ensure artifact name is unique:
```yaml
- name: Upload Lighthouse reports
  uses: actions/upload-artifact@v4
  with:
    name: lighthouse-reports-${{ github.run_id }}  # Add unique identifier
```

### Issue: Artifacts are empty

**Symptoms:**
- Download works but zip file is empty or missing reports

**Solutions:**

1. Verify reports were generated:
```yaml
- name: Check reports before upload
  run: |
    ls -la lighthouse-reports/
    find lighthouse-reports/ -type f
```

2. Check path in upload step:
```yaml
- name: Upload Lighthouse reports
  uses: actions/upload-artifact@v4
  with:
    path: lighthouse-reports/  # Must match report output directory
```

## 🐛 Script Execution Issues

### Issue: "command not found" in CI

**Symptoms:**
```bash
/bin/bash: lighthouse: command not found
```

**Solutions:**

1. Install globally before use:
```yaml
- name: Install Lighthouse
  run: npm install -g lighthouse

- name: Verify installation
  run: which lighthouse
```

2. Use npx:
```bash
npx lighthouse http://localhost:3000
```

3. Use local installation:
```bash
./node_modules/.bin/lighthouse http://localhost:3000
```

### Issue: Script exits with code 1

**Symptoms:**
```bash
Error: Process completed with exit code 1
```

**Solutions:**

1. Add error handling:
```bash
set -e  # Exit on error (at top of script)

# Or for specific commands:
lighthouse "$url" || echo "Lighthouse failed but continuing..."
```

2. Check script permissions:
```bash
chmod +x scripts/lighthouse-ci.sh
```

3. Run locally to debug:
```bash
bash -x scripts/lighthouse-ci.sh  # Verbose mode
```

## 🔍 Debugging Strategies

### Enable Verbose Logging

**In Lighthouse:**
```bash
lighthouse http://localhost:3000 --verbose --view
```

**In GitHub Actions:**
```yaml
- name: Run Lighthouse with debug
  run: lighthouse http://localhost:3000 --verbose
  env:
    ACTIONS_STEP_DEBUG: true
```

### Check Logs Systematically

1. **Server logs**: Ensure server started
2. **Installation logs**: Check all packages installed
3. **Test execution logs**: See exact command that failed
4. **Artifact logs**: Verify uploads succeeded

### Test Locally First

Before pushing to CI:

```bash
# 1. Fresh install
rm -rf node_modules package-lock.json
npm install

# 2. Start server
npm start

# 3. Test Lighthouse (in another terminal)
npm run lighthouse:manual

# 4. Run full script
./scripts/lighthouse-ci.sh

# 5. Check generated reports
ls -la lighthouse-reports/
```

### Isolate the Problem

Test each component separately:

```bash
# Test server only
npm start
curl http://localhost:3000/health

# Test Lighthouse only (with server running)
lighthouse http://localhost:3000 --view

# Test accessibility only
npx axe http://localhost:3000

# Test specific page
lighthouse http://localhost:3000/about.html --view
```

## 📞 Getting Help

### Where to Look

1. **GitHub Actions logs**: Most detailed information
2. **Local test output**: Reproduce issue locally
3. **Browser console**: Check for JavaScript errors
4. **Network tab**: Check for failed requests

### What to Include When Asking for Help

- Node.js version: `node --version`
- npm version: `npm --version`
- Operating system
- Lighthouse version: `lighthouse --version`
- Full error message and stack trace
- Link to workflow run (if applicable)
- Minimal reproduction steps

### Useful Commands for Diagnostics

```bash
# System info
node --version
npm --version
lighthouse --version
which lighthouse
which chrome

# Check running processes
ps aux | grep node
lsof -i :3000

# Test connectivity
curl -v http://localhost:3000/health
curl -I http://localhost:3000

# Check file permissions
ls -la scripts/lighthouse-ci.sh
ls -la .github/workflows/

# View logs
cat lighthouse-reports/*.json | jq .
tail -f server.log
```

## ✅ Prevention Checklist

Before pushing to CI:

- [ ] Test locally with `npm start` and `npm run lighthouse:manual`
- [ ] Verify all pages load in browser
- [ ] Check health endpoint returns 200: `curl http://localhost:3000/health`
- [ ] Run full script: `./scripts/lighthouse-ci.sh`
- [ ] Verify YAML syntax: `npx yaml-validator .github/workflows/lighthouse-ci.yml`
- [ ] Commit package-lock.json
- [ ] Check Node.js version matches CI (20.x)

---

**Still having issues?** Review the other documentation files or open an issue in the repository with the diagnostic information above.
