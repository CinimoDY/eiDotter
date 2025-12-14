# fix: Add missing build-tokens script

## Problem

CI/CD workflow calls `npm run build-tokens` but the script doesn't exist in package.json, causing deployment failures.

## Solution

Add one script to package.json:

```json
{
  "scripts": {
    "build-tokens": "style-dictionary build"
  }
}
```

## Security Check (Verify Before Acting)

Check if the Figma token is actually exposed in git history:

```bash
git log -p --all | grep -i "figd_"
```

**If token found:**
1. Revoke token in Figma account settings
2. Generate new token
3. Add `FIGMA_ACCESS_TOKEN` to GitHub repository secrets
4. Update `.gitignore` to include `.env`

**If not found:**
- No action needed (the `.env` file may already be gitignored)

## Optional: Populate .env.example

If the file is empty and you want to help contributors:

```bash
# FIGMA_ACCESS_TOKEN= (optional, for sync-to-figma script)
# FIGMA_FILE_KEY=qlEyN6zHPX4XOohJefJ4bZ
```

## Acceptance Criteria

- [ ] `npm run build-tokens` runs successfully
- [ ] `npm run build-storybook` completes without errors
- [ ] CI/CD workflows pass

## Out of Scope

Per reviewer feedback, these are explicitly NOT part of this fix:

- `.storybook/main.js` → TypeScript migration (works fine as-is)
- Complete CI/CD workflow rewrites (current workflows already work)
- Chromatic integration (unused)
- Vite 5 / Storybook 9 upgrade (separate effort)
- Figma Code Connect setup (future enhancement)

## References

- `package.json` - missing script
- `style-dictionary.config.js` - token build configuration
- `.github/workflows/deploy-storybook.yml:45` - calls build-tokens

---

*Simplified based on DHH, Kieran, and Simplicity reviewer feedback: "The fix is 3 lines. Everything else is scope creep."*
