---
title: Skeleton loading animation — perceived-wait research → CRT raster pattern
date: 2026-06-11
category: best-practices
module: skeleton
problem_type: best_practice
component: animation
severity: medium
applies_when:
  - Designing any loading/placeholder animation in eidotter or a consumer
  - Choosing animation direction, speed, or technique for perceived performance
  - Deciding what prefers-reduced-motion should show for a loading state
  - Reviewing motion work where "feels slow" or "progress-bar-like" feedback comes up
tags: [skeleton, loading, animation, perceived-performance, crt, raster, phosphor, reduced-motion, compositor, research]
---

# Skeleton loading animation — perceived-wait research → CRT raster pattern

## Context

Skeleton (DMNC-1018) shipped in v0.27.0 with a left→right glow sweep (PR #373).
Design feedback: it read as "progress bar", not CRT — and asked what *actually*
happens on a CGA monitor, plus what research says makes waits feel shorter.
A web-research pass (PR #375) replaced the sweep with a **raster hum-bar roll**
and produced durable guidance for all future eidotter motion work.

## Guidance

### 1. Directed motion beats pulsing — never ship a pure-pulse skeleton

Pulsing skeletons (whole-field opacity in/out) tested **worse than spinners**
for perceived wait (Viget 2017, n=136, controlled durations). Directed motion
(a moving band) beats pulse (Chung 2018). A sweep implies "working"; a pulse
implies "waiting".

### 2. Direction is free — use it for brand authenticity

The ubiquitous left→right shimmer was only ever tested against *pulse*, never
against other directions. So direction carries no evidence burden — pick the
one that serves the system. For eidotter that's **top→bottom**: the raster
refresh is the single most recognizable CRT behavior. Implementation detail
that sells it: asymmetric gradient — bright leading edge at the bottom (where
the beam is), phosphor-decay tail fading upward.

```css
.eidotter-skeleton--animated::after {
  /* band, 45% of container height */
  background: linear-gradient(180deg,
    transparent 0%, var(--effects-phosphor-glow) 78%, transparent 100%);
  transform: translateY(-100%);
  animation: eidotter-skeleton-raster 1.6s linear infinite;
}
@keyframes eidotter-skeleton-raster { to { transform: translateY(330%); } }
```

### 3. Perceived wait is CONVEX in animation speed — target 1.4–2.0s

Stanford JCR 2025: both too-slow AND too-fast cycles make waits feel *longer*;
viewers use animation speed as a subconscious elapsed-time cue. The minimum
sits around 1.4–2.0s per cycle. Our first attempt (2.8s) would have made waits
feel longer; shipped at 1.6s linear. Avoid easing that visibly decelerates the
band — it mimics slow animation.

### 4. prefers-reduced-motion ≠ fully static

Carbon's accessible-skeleton pattern: replace directed movement with a very
gentle opacity breathing (we use 3s, 0.7→1.0 ease-in-out). Still communicates
"loading", no vestibular trigger, WCAG C39 compliant. `prefers-contrast: high`
is the level that disables all animation.

### 5. Compositor-only is non-negotiable and sufficient

One `transform` on a pseudo-element gradient band (or pure `opacity`) — the
same technique Material/Carbon/Polaris use. No layout, no paint, one
compositing layer per skeleton.

## Why This Matters

"Make the wait feel shorter with minimal resources" is the entire job of a
skeleton. Each lever above is evidence-backed, and two of them (speed
convexity, pulse-worse-than-spinner) are counterintuitive enough that
unguided redesigns will get them wrong again.

## When to Apply

Any loading state, placeholder, or ambient motion in eidotter and consumers.
Use `Progress` when completion is measurable; `Skeleton` for unknown-shape
pending content (also recorded in the Figma component description and
guidelines/components.md).

## Sources

- Viget, "A Bone to Pick with Skeleton Screens" (2017 controlled study) — https://www.viget.com/articles/a-bone-to-pick-with-skeleton-screens
- Bill Chung, "Everything you need to know about skeleton screens" (2018) — https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a
- NN/g, "Skeleton Screens 101" — https://www.nngroup.com/articles/skeleton-screens/
- Stanford GSB / Journal of Consumer Research, "Optimizing Animation Speed: Convex Effects on Perceived Waiting Time" (2025) — doi 10.1093/jcr/ucaf037
- Adrian Roselli, "More Accessible Skeletons" — https://adrianroselli.com/2020/11/more-accessible-skeletons.html
- W3C WCAG technique C39 (prefers-reduced-motion) — https://www.w3.org/WAI/WCAG22/Techniques/css/C39
- CRT phenomena: nyanpasu64 "Exploring the appearance of CRT televisions" (phosphor decay <1ms, raster geometry); hum-bar mechanics (AC ripple → vertical deflection)

## Related

- `src/components/Skeleton/` — the implementation (PRs #373, #375; v0.27.0)
- `solutions/best-practices/motion-contrast-spot-check-2026-05-05.md` — motion + contrast accommodations baseline
- CLAUDE.md "Animation Patterns" — the house rules this doc extends with perceived-performance evidence
