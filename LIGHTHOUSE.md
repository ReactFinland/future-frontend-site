# Lighthouse Setup Guide

This project is configured with Lighthouse CI for automated performance, accessibility, and SEO audits.

## GitHub CI Integration

Two GitHub Actions workflows are configured:

### 1. **Pull Request & Push Checks** (`lighthouse.yml`)
- Runs on every pull request and push to `main`
- Audits key pages of the site
- Provides automated feedback with performance scores
- Fails the build if thresholds are not met
- Comments on PRs with results

### 2. **Daily Monitoring** (`lighthouse-monitor.yml`)
- Runs daily at 2 AM UTC
- Performs 3 runs per page and averages results
- Tracks performance trends over time
- Can be manually triggered via GitHub Actions

## Configuration

The audit configuration is in [`lighthouserc.json`](./lighthouserc.json):

- **Pages audited**: Home, all major sections, blog
- **Performance threshold**: First Contentful Paint < 3s, LCP < 4s
- **CLS threshold**: < 0.1 (excellent stability)
- **Preset**: `lighthouse:recommended`

## Local Testing

### Prerequisites
```bash
# Install Node.js if not already installed
# macOS with Homebrew
brew install node
```

### Run Lighthouse Locally

```bash
# Build the site
deno task build
deno task optimize:build

# Serve the built site in the background
deno task serve &
SERVER_PID=$!

# Install Lighthouse CI globally
npm install -g @lhci/cli@^0.11.x

# Run Lighthouse audits
lhci autorun

# Stop the server
kill $SERVER_PID
```

### Or use a script

Create `scripts/run-lighthouse.sh`:

```bash
#!/bin/bash
set -e

echo "Building site..."
deno task build
deno task optimize:build

echo "Starting server..."
deno task serve &
SERVER_PID=$!

# Wait for server to start
sleep 5

echo "Running Lighthouse..."
npm install -g @lhci/cli@^0.11.x
lhci autorun

echo "Stopping server..."
kill $SERVER_PID

echo "Done! Check .lighthouseci/ for results"
```

## Interpreting Results

Lighthouse scores are color-coded:
- 🟢 **90-100**: Excellent
- 🟡 **50-89**: Needs improvement
- 🔴 **0-49**: Poor

Key metrics:
- **Performance**: Load speed and interactivity
- **Accessibility**: WCAG compliance and usability
- **Best Practices**: Security and modern standards
- **SEO**: Search engine optimization

## Viewing Results

### In GitHub Actions
1. Go to the workflow run
2. See the summary or download the `lighthouse-results` artifact
3. Open `.lighthouseci/results/*.json` files

### JSON Format
Each result includes:
- Overall scores (0-100)
- Detailed audits and diagnostics
- Opportunities for improvement
- Passed/failed assertions

## Improving Scores

Common improvements:
- Optimize images and serve modern formats (WebP)
- Minimize JavaScript and CSS
- Use lazy loading for off-screen content
- Add proper ARIA labels and semantic HTML
- Improve Core Web Vitals (CLS, LCP, FID)

## CI Workflow Details

The GitHub Actions workflow:
1. Checks out the code
2. Sets up Deno v2
3. Builds the site with `deno task build`
4. Optimizes with Jampack (`deno task optimize:build`)
5. Runs Lighthouse audits
6. Comments on PRs with results (if applicable)
7. Uploads artifacts for 30 days
8. Fails the build if thresholds not met

## Troubleshooting

**Results not appearing in PR comments?**
- Check that the workflow has write permissions (check permissions in workflow file)
- Verify `.lighthouseci/results/` directory is created

**Workflow fails to build?**
- Ensure `deno.json` tasks are correct
- Check that the build succeeds locally first

**Port 3000 already in use?**
- Change the port in `lighthouserc.json` URLs and `deno.json` serve task

## References

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
