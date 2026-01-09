---
title: Figma Personal Access Tokens Leaked via Storybook Addon Bundling
slug: figma-token-leak-storybook-addon-designs
date: 2026-01-09
category: security-issues
tags: [storybook, figma, secrets-management, addon-designs, github-pages, environment-variables, git-filter-repo]
severity: high
component: "@storybook/addon-designs, Storybook build output"
symptoms:
  - "GitHub secret scanning alerts (GH013) for exposed Figma Personal Access Tokens"
  - "figd_* tokens found in docs/sb-addons/designs-11/register-panel-bundle.js"
  - "Figma tokens visible in committed Storybook build artifacts"
root_cause: "The @storybook/addon-designs addon bundled environment variables (including FIGMA_ACCESS_TOKEN) directly into JavaScript output at build time. The docs/ folder containing the Storybook build was committed to the repository for GitHub Pages deployment, exposing the embedded tokens in version control."
resolution_time: "~45 minutes"
---

# Figma Personal Access Tokens Leaked via Storybook Addon Bundling

## Problem

GitHub secret scanning detected two Figma Personal Access Tokens exposed in the repository:

```
docs/sb-addons/designs-11/register-panel-bundle.js (line 2):
var g={...,FIGMA_ACCESS_TOKEN:"figd_XXXX...",...}
```

The tokens were bundled into the Storybook addon JavaScript during `npm run build-storybook`.

## Root Cause

1. `.env` contained `FIGMA_ACCESS_TOKEN` for the `sync-to-figma` script
2. `@storybook/addon-designs` bundled ALL `process.env` variables into its client bundle
3. `storybook build -o docs` output to `docs/` folder
4. `docs/` was committed for GitHub Pages hosting
5. `.gitignore` only had `storybook-static`, not `docs/sb-addons/`

## Solution

### 1. Revoke Compromised Tokens

Immediately revoke exposed tokens in Figma settings. Do this FIRST before any other remediation.

### 2. Filter Sensitive Environment Variables in Storybook

Modify `.storybook/main.js` to prevent sensitive variables from being bundled:

```javascript
// .storybook/main.js
viteFinal: async (config) => {
  // SECURITY: Filter out sensitive env vars from being bundled
  const sensitivePatterns = ['TOKEN', 'SECRET', 'KEY', 'PASSWORD', 'CREDENTIAL'];
  const safeEnvVars = {};

  for (const [key, value] of Object.entries(process.env)) {
    const isSensitive = sensitivePatterns.some(pattern =>
      key.toUpperCase().includes(pattern)
    );
    if (!isSensitive) {
      safeEnvVars[key] = value;
    }
  }

  config.define = {
    ...config.define,
    'process.env': JSON.stringify(safeEnvVars),
  };

  return config;
},
```

### 3. Add Addon Output to .gitignore

```gitignore
# Storybook addon bundles (may contain bundled env vars)
docs/sb-addons/
```

### 4. Purge Tokens from Git History

Use `git-filter-repo` to remove the exposed tokens from all commits:

```bash
# Install git-filter-repo
pip install git-filter-repo

# Create replacement file
cat > /tmp/replacements.txt << 'EOF'
figd_YOUR_FIRST_TOKEN==>REDACTED_TOKEN
figd_YOUR_SECOND_TOKEN==>REDACTED_TOKEN
EOF

# Run filter (requires fresh clone or --force)
git filter-repo --replace-text /tmp/replacements.txt --force

# Re-add origin (filter-repo removes remotes)
git remote add origin git@github.com:USER/REPO.git

# Force push cleaned history
git push origin --force --all
```

**Note:** Force pushing rewrites history. May require temporarily disabling branch protection.

### 5. Fresh Clone + Rebuild

If you encounter WSL permission issues after filter-repo:

```bash
# Delete from Windows side (PowerShell)
Remove-Item -Recurse -Force D:\coding\project

# Re-clone
git clone git@github.com:USER/REPO.git project
cd project
npm install
npm run build-storybook
git add docs/
git commit -m "chore: rebuild Storybook docs"
git push
```

### 6. Close GitHub Security Alerts

```bash
# List alerts
gh api repos/OWNER/REPO/secret-scanning/alerts

# Close each alert as revoked
gh api -X PATCH repos/OWNER/REPO/secret-scanning/alerts/1 \
  -f state=resolved -f resolution=revoked
```

## Prevention

### Defense in Depth

```
Layer 1: Source Control
├── .gitignore excludes .env files
├── .gitignore excludes docs/sb-addons/
└── Pre-commit hooks scan for secrets

Layer 2: Build Configuration
├── Secrets filtered in viteFinal config
├── Secrets use non-STORYBOOK_ prefixes
└── Separate .env files for different purposes

Layer 3: Monitoring
├── GitHub secret scanning enabled
├── Audit build output before committing
└── Regular token rotation
```

### Pre-Commit Check

Add to your workflow:

```bash
# Search for potential leaks in build output
grep -r "TOKEN\|SECRET\|figd_\|ghp_\|sk-" ./docs/
```

### Environment Variable Prefix Rules

| Build Tool | Bundled Variables | Safe Variables |
|------------|-------------------|----------------|
| Vite | `VITE_*` | Everything else |
| Storybook | `STORYBOOK_*` + addon capture | Filter in viteFinal |
| Next.js | `NEXT_PUBLIC_*` | Server-only vars |

## Files Modified

| File | Change |
|------|--------|
| `.storybook/main.js` | Added env var filtering in viteFinal |
| `.gitignore` | Added `docs/sb-addons/` |
| `.env.example` | Added security documentation |

## Related

- [GitHub: Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [git-filter-repo documentation](https://github.com/newren/git-filter-repo)
