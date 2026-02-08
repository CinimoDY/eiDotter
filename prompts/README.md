# ClaudeSquad Prompts for eiDotter

Self-contained prompts for ClaudeSquad agents to execute against the eidotter repo.
Each prompt file is a standalone task that an agent can pick up and run independently.

## Execution Waves

### Wave 1 (safe to run simultaneously)
| # | File | Issue | Branch |
|---|------|-------|--------|
| 1 | `01-fix-icon-undefined-tokens.md` | DMNC-365 | `fix/icon-undefined-tokens` |
| 2 | `02-fix-storybook-theme-drift.md` | DMNC-368 | `fix/storybook-theme-drift` |
| 3 | `03-token-validation-script.md` | DMNC-253 | `feat/token-validation` |
| 4 | `04-mdx-batch-1.md` | DMNC-380 | `docs/mdx-batch-1` |

### Wave 2 (after Wave 1 merges)
| # | File | Issue | Branch |
|---|------|-------|--------|
| 5 | `05-mdx-batch-2.md` | DMNC-380 | `docs/mdx-batch-2` |
| 6 | `06-mdx-batch-3.md` | DMNC-380 | `docs/mdx-batch-3` |
| 7 | `07-mdx-batch-4.md` | DMNC-380 | `docs/mdx-batch-4` |
| 8 | `08-retroeffects-crt-alignment.md` | DMNC-369 | `fix/retroeffects-crt-alignment` |

### Wave 3 (independent features)
| # | File | Issue | Branch |
|---|------|-------|--------|
| 9 | `09-modal-close-animation.md` | DMNC-366 | `feat/modal-close-animation` |
| 10 | `10-filterbar-component.md` | DMNC-382 | `feat/filterbar` |
| 11 | `11-oklch-research.md` | DMNC-371 | N/A (research) |
| 12 | `12-project-origin-metatag.md` | DMNC-383 | N/A (plan) |

## Verification After Each Wave

```bash
npx jest --silent          # 393+ tests passing
npx storybook dev -p 6006  # all pages load
git log --oneline -5       # clean commit history
```

## Notes

- Always `pkill -f storybook` before starting Storybook (zombie processes)
- MDX files must be named `ComponentDocs.mdx` (not `Component.mdx`)
- Token reference: `src/styles/tokens.css`
- Component template: `src/components/Button/` (structure + docs)
