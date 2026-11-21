---
module: tokens
tags: [accessibility, wcag, color-contrast, audit-baseline, dos-86]
problem_type: baseline
related_files:
  - src/styles/tokens.css
  - src/styles/theme.dos-86.css
  - src/styles/theme.pure-amber.css
  - scripts/check-contrast.mjs
  - solutions/best-practices/token-contrast-baseline-2026-11-21.json
supersedes: solutions/best-practices/token-contrast-baseline-2026-05-05.md
date: 2026-11-21
---

# Token contrast baseline, new default dos-86 (DMNC-1643 PR E)

Regenerated when the default theme changed from Pure Amber (`pure-amber`, formerly `amber-mono`) to `dos-86`. Raw data for all eight themes: `token-contrast-baseline-2026-11-21.json` (`node scripts/check-contrast.mjs --json`). Method as in the 2026-05-05 baseline: each theme file over `tokens.css`, every `--color-semantic-*` resolved to a hex, WCAG 2.1 ratios.

## Verdict for the default, dos-86

**Passes WCAG AA for every valid usage.** Text, borders and the brand fills are Pure Amber's, on the DOS-86 screen `#050300` (Pure Amber: `#020003`), so the ratios move by about 1% against the 2026-05-05 amber-mono numbers. The "failures" in the script's table are same-colour pairs (amber on the amber fill) or near-black on near-black, which no component draws, and `text-disabled` / `border-disabled` at 3.67:1, which WCAG exempts for disabled controls (unchanged from Pure Amber).

The script covers neutral roles only. The functional roles, which are what dos-86 changes, are below (computed with the same formula; also asserted in `src/styles/default-theme.test.ts` and `src/styles/health-honest-colours.test.tsx`). Text needs 4.5:1; borders and fills, graphical objects, need 3:1.


### dos-86

| Foreground | Hex | on background-primary | on background-secondary | on alert ground of its kind |
|---|---|---|---|---|
| text-error | #ff5555 | 6.55 | 6.64 | 5.30 (#430500) |
| status-error | #ff5555 | 6.55 | 6.64 | 5.30 (#430500) |
| text-success | #55ff55 | 15.52 | 15.71 | 12.76 (#122010) |
| status-success | #55ff55 | 15.52 | 15.71 | 12.76 (#122010) |
| text-warning | #ffff55 | 19.31 | 19.55 | 13.53 (#352800) |
| status-warning | #ffff55 | 19.31 | 19.55 | 13.53 (#352800) |
| text-info | #00aaaa | 7.19 | 7.28 | 6.24 (#0a1828) |
| status-info | #00aaaa | 7.19 | 7.28 | 6.24 (#0a1828) |
| border-error (3:1 needed) | #ff5555 | 6.55 | 6.64 | - |
| border-success (3:1 needed) | #55ff55 | 15.52 | 15.71 | - |
| background-error, fill (3:1 needed) | #d00000 | 3.61 | 3.66 | text-white on it: 5.70 |

### pure-amber

| Foreground | Hex | on background-primary | on background-secondary | on alert ground of its kind |
|---|---|---|---|---|
| text-error | #ffb000 | 11.42 | 11.38 | 5.49 (#65360c) |
| status-error | #ffb000 | 11.42 | 11.38 | 5.49 (#65360c) |
| text-success | #fdca9f | 14.07 | 14.03 | 9.92 (#411f06) |
| status-success | #fdca9f | 14.07 | 14.03 | 9.92 (#411f06) |
| text-warning | #ffb000 | 11.42 | 11.38 | 6.49 (#552d0a) |
| status-warning | #e5b936 | 11.28 | 11.25 | 6.41 (#552d0a) |
| text-info | #b87c1a | 5.91 | 5.90 | 4.97 (#2c1203) |
| status-info | #b87c1a | 5.91 | 5.90 | 4.97 (#2c1203) |
| border-error (3:1 needed) | #ffb000 | 11.42 | 11.38 | - |
| border-success (3:1 needed) | #fdca9f | 14.07 | 14.03 | - |
| background-error, fill (3:1 needed) | #9a5700 | 3.72 | 3.71 | text-white on it: 5.62 |

The critical fill `background-error` under dos-86 is `#D00000` from PR E (Dom's pick): 3.61:1 on the screen, 3.66:1 on the card, white text on it 5.70:1. CGA red `#AA0000` was 2.66:1 on the screen and 2.69:1 on the card; `#B90000` is the darkest pure red that reaches 3:1 on both (3.00:1, no margin).

## Script output, dos-86 (neutral roles)

```
FG → BG                             FG hex      BG hex      Ratio    AA body   AA large  AAA body
------------------------------------------------------------------------------------------------------------
text-primary → background-primary   #ffb000     #050300     11.24    PASS      PASS      PASS
text-primary → background-secondary #ffb000     #010103     11.38    PASS      PASS      PASS
text-primary → background-accent    #ffb000     #ffb000     1.00     FAIL      FAIL      FAIL
text-primary → background-brand     #ffb000     #ffb000     1.00     FAIL      FAIL      FAIL
text-secondary → background-primary #b87c1a     #050300     5.82     PASS      PASS      FAIL
text-secondary → background-secondary#b87c1a     #010103     5.90     PASS      PASS      FAIL
text-secondary → background-accent  #b87c1a     #ffb000     1.93     FAIL      FAIL      FAIL
text-secondary → background-brand   #b87c1a     #ffb000     1.93     FAIL      FAIL      FAIL
text-on-accent → background-primary #050300     #050300     1.00     FAIL      FAIL      FAIL
text-on-accent → background-secondary#050300     #010103     1.01     FAIL      FAIL      FAIL
text-on-accent → background-accent  #050300     #ffb000     11.24    PASS      PASS      PASS
text-on-accent → background-brand   #050300     #ffb000     11.24    PASS      PASS      PASS
text-on-brand → background-primary  #050300     #050300     1.00     FAIL      FAIL      FAIL
text-on-brand → background-secondary#050300     #010103     1.01     FAIL      FAIL      FAIL
text-on-brand → background-accent   #050300     #ffb000     11.24    PASS      PASS      PASS
text-on-brand → background-brand    #050300     #ffb000     11.24    PASS      PASS      PASS
text-on-light → background-primary  #050300     #050300     1.00     FAIL      FAIL      FAIL
text-on-light → background-secondary#050300     #010103     1.01     FAIL      FAIL      FAIL
text-on-light → background-accent   #050300     #ffb000     11.24    PASS      PASS      PASS
text-on-light → background-brand    #050300     #ffb000     11.24    PASS      PASS      PASS
text-accent → background-primary    #e5b936     #050300     11.11    PASS      PASS      PASS
text-accent → background-secondary  #e5b936     #010103     11.25    PASS      PASS      PASS
text-accent → background-accent     #e5b936     #ffb000     1.01     FAIL      FAIL      FAIL
text-accent → background-brand      #e5b936     #ffb000     1.01     FAIL      FAIL      FAIL
text-muted → background-primary     #b87c1a     #050300     5.82     PASS      PASS      FAIL
text-muted → background-secondary   #b87c1a     #010103     5.90     PASS      PASS      FAIL
text-muted → background-accent      #b87c1a     #ffb000     1.93     FAIL      FAIL      FAIL
text-muted → background-brand       #b87c1a     #ffb000     1.93     FAIL      FAIL      FAIL
text-disabled → background-primary  #9a5700     #050300     3.67     FAIL      PASS      FAIL
text-disabled → background-secondary#9a5700     #010103     3.71     FAIL      PASS      FAIL
text-disabled → background-accent   #9a5700     #ffb000     3.07     FAIL      PASS      FAIL
text-disabled → background-brand    #9a5700     #ffb000     3.07     FAIL      PASS      FAIL
text-ai-draft → background-primary  #ff1a8c     #050300     5.67     PASS      PASS      FAIL
text-ai-draft → background-secondary#ff1a8c     #010103     5.74     PASS      PASS      FAIL
text-ai-draft → background-accent   #ff1a8c     #ffb000     1.98     FAIL      FAIL      FAIL
text-ai-draft → background-brand    #ff1a8c     #ffb000     1.98     FAIL      FAIL      FAIL
border-default → background-primary #ffb000     #050300     11.24    PASS      PASS      PASS
border-default → background-secondary#ffb000     #010103     11.38    PASS      PASS      PASS
border-default → background-accent  #ffb000     #ffb000     1.00     FAIL      FAIL      FAIL
border-default → background-brand   #ffb000     #ffb000     1.00     FAIL      FAIL      FAIL
border-focus → background-primary   #ffb000     #050300     11.24    PASS      PASS      PASS
border-focus → background-secondary #ffb000     #010103     11.38    PASS      PASS      PASS
border-focus → background-accent    #ffb000     #ffb000     1.00     FAIL      FAIL      FAIL
border-focus → background-brand     #ffb000     #ffb000     1.00     FAIL      FAIL      FAIL
border-hover → background-primary   #e5b936     #050300     11.11    PASS      PASS      PASS
border-hover → background-secondary #e5b936     #010103     11.25    PASS      PASS      PASS
border-hover → background-accent    #e5b936     #ffb000     1.01     FAIL      FAIL      FAIL
border-hover → background-brand     #e5b936     #ffb000     1.01     FAIL      FAIL      FAIL
border-disabled → background-primary#9a5700     #050300     3.67     FAIL      PASS      FAIL
border-disabled → background-secondary#9a5700     #010103     3.71     FAIL      PASS      FAIL
border-disabled → background-accent #9a5700     #ffb000     3.07     FAIL      PASS      FAIL
border-disabled → background-brand  #9a5700     #ffb000     3.07     FAIL      PASS      FAIL
```
