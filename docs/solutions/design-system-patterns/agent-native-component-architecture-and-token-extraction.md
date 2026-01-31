# Agent-Native Component Architecture and Token Extraction

## Frontmatter

```yaml
title: Agent-Native Component Architecture and Token Extraction
category: design-system-patterns
tags:
  - agent-native
  - callbacks
  - state-machine
  - design-tokens
  - css-variables
  - react-patterns
  - observability
module: RetroEffects
symptom: Internal component state invisible to external systems; hardcoded CSS values bypassing token system
root_cause: Component designed for human use only, not agent observability; CSS values added without token pipeline
solution: Expose state machine via typed callbacks; extract hardcoded values to DTCG tokens
date_solved: 2026-01-31
prs: ["#75", "#76"]
```

---

## Problem Statement

The RetroEffects component had two related issues that limited its usefulness in an agent-native architecture:

1. **Hidden State Machine**: The power state (`on`, `powering-on`, `powering-off`, `off`) was managed internally with no way for external systems (including AI agents) to observe or react to state transitions.

2. **Hardcoded CSS Values**: The bloom effect used hardcoded `rgba(255, 176, 0, 0.05)` values directly in CSS, bypassing the design token system and making the component inconsistent with the token-first philosophy.

### Impact

- Agents couldn't programmatically know when power-on/off animations completed
- Parent components couldn't synchronize effects with the power state
- Hardcoded values meant theming couldn't affect bloom effects
- Violated the principle: "If a user can see it, an agent should be able to see it"

---

## Solution

### Part 1: Agent-Native Callbacks

Added three callback props to expose the power state machine:

```typescript
export type PowerState = 'on' | 'powering-on' | 'powering-off' | 'off';

export interface RetroEffectsProps {
  // ... existing props

  /** Called whenever power state changes */
  onPowerStateChange?: (state: PowerState) => void;

  /** Called when power-on animation completes */
  onPowerOn?: () => void;

  /** Called when power-off animation completes */
  onPowerOff?: () => void;
}
```

**Implementation pattern** - Track previous value with useRef to detect actual changes:

```typescript
const prevPoweredRef = useRef(powered);

useEffect(() => {
  const prevPowered = prevPoweredRef.current;
  prevPoweredRef.current = powered;

  if (prevPowered !== powered) {
    const newState: PowerState = powered ? 'powering-on' : 'powering-off';
    setPowerState(newState);
    onPowerStateChange?.(newState);
  }
}, [powered, onPowerStateChange]);
```

**Animation end handling** - Filter by animation name to avoid false triggers:

```typescript
const handleAnimationEnd = (e: React.AnimationEvent) => {
  const relevantAnimations = ['powerOn', 'powerOff', 'retro-power-on', 'retro-power-off'];
  if (!relevantAnimations.some(name => e.animationName.includes(name))) {
    return;
  }

  if (powerState === 'powering-on') {
    setPowerState('on');
    onPowerStateChange?.('on');
    onPowerOn?.();
  } else if (powerState === 'powering-off') {
    setPowerState('off');
    onPowerStateChange?.('off');
    onPowerOff?.();
  }
};
```

### Part 2: Token Extraction

Added two new tokens to `base.tokens.json`:

```json
"bloomOuter": {
  "$type": "color",
  "$value": "rgba(255, 176, 0, 0.05)",
  "$description": "Outer phosphor bloom layer (faint glow)"
},
"bloomCenter": {
  "$type": "color",
  "$value": "rgba(255, 176, 0, 0.03)",
  "$description": "Center phosphor bloom highlight"
}
```

Updated CSS to use token variables:

```css
.retro-effects__bloom {
  box-shadow:
    inset 0 0 40px var(--effects-phosphor-glow),
    inset 0 0 80px var(--effects-bloom-outer);
  background: radial-gradient(
    ellipse at center,
    var(--effects-bloom-center) 0%,
    transparent 60%
  );
}
```

### Part 3: GPU Optimization

Added `will-change` hints for smoother animations:

```css
.retro-effects__scanlines {
  will-change: transform;
}

.retro-effects__flicker {
  will-change: opacity;
}
```

---

## Testing

Added 9 new tests (44 total) covering all callback scenarios:

```typescript
describe('power callbacks', () => {
  it('calls onPowerStateChange with powering-off when transitioning from on to off');
  it('calls onPowerStateChange with powering-on when transitioning from off to on');
  it('calls onPowerStateChange with off after power-off animation ends');
  it('calls onPowerStateChange with on after power-on animation ends');
  it('calls onPowerOff when power-off animation ends');
  it('calls onPowerOn when power-on animation ends');
  it('does not call onPowerOn for unrelated animations');
  it('does not call onPowerOff for unrelated animations');
  it('does not call callbacks on initial render');
});
```

---

## Prevention Checklist

### When Adding Component State

- [ ] Is this state something an external system might need to observe?
- [ ] Can an agent programmatically determine this state?
- [ ] Are there lifecycle events (start, complete, error) worth exposing?
- [ ] Export the state type for TypeScript consumers

### When Adding CSS Values

- [ ] Does this value exist in the token system?
- [ ] If not, should it be added to `base.tokens.json`?
- [ ] Run `npm run build-tokens` after adding tokens
- [ ] Use `var(--token-name)` in CSS, never raw values

### Agent-Native Design Principles

1. **Observability**: Every visual state should be programmatically accessible
2. **Type Safety**: Export types for all public state
3. **Event Parity**: If something happens visually, emit an event
4. **Token First**: All design values flow through the token pipeline

---

## Related Files

- `src/components/RetroEffects/components/RetroEffects.tsx` - Main component
- `src/components/RetroEffects/components/RetroEffects.css` - Styles with tokens
- `src/tokens/base.tokens.json` - Token definitions
- `src/styles/tokens.css` - Generated CSS variables
- `src/index.ts` - PowerState type export

## Related PRs

- [PR #75](https://github.com/user/eidotter/pull/75) - Version fix, GPU hints, changelog updates
- [PR #76](https://github.com/user/eidotter/pull/76) - Bloom tokens + agent-native callbacks

---

## Key Insight

> "Components designed only for human consumption are half-built. Agent-native components expose their internal state machine through typed callbacks, making them observable by both humans and AI agents. This is the difference between a component and a platform."
