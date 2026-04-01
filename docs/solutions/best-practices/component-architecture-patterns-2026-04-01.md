---
title: Component Architecture Patterns — Chat Interface & v0.14.0 Learnings
module: eidotter
date: 2026-04-01
problem_type: best_practice
component: Chat, Terminal, CommandPrompt
severity: medium
applies_when:
  - Building multi-component features in a design system
  - Creating list/item component pairs
  - Implementing textarea auto-sizing
  - Designing component API defaults
  - Sharing CSS animations across components
  - Building chat/messaging UI as a library (not an app)
tags:
  - component-architecture
  - co-location
  - type-naming
  - chat-ui
  - css-organization
  - react-hooks
  - api-design
related_issues:
  - DMNC-555
  - DMNC-571
  - DMNC-570
  - DMNC-547
---

# Component Architecture Patterns — Chat Interface & v0.14.0 Learnings

## Context

eidotter v0.14.0 shipped 4 new chat components (ChatMessage, ChatHistory, ChatInput, ChatContainer), fixed CommandPrompt cursor positioning, changed Terminal control defaults, and extracted shared CSS animations. The session surfaced 7 reusable architecture patterns for design system component development.

## Guidance

### 1. Co-locate related components under one directory

When components form a cohesive feature (3+ related components), place them under a shared directory instead of separate top-level dirs.

```
src/components/Chat/          # One directory for the feature
├── components/
│   ├── ChatMessage.tsx       # Atom
│   ├── ChatHistory.tsx       # List
│   ├── ChatInput.tsx         # Input
│   ├── ChatContainer.tsx     # Composer
│   └── index.ts              # Barrel
└── index.ts                  # Public API
```

**Precedent:** Tag and TagGroup live together under `src/components/Tag/`.

**When NOT to co-locate:** Truly standalone components (Button, Alert, Card) stay at the top level.

### 2. Name data types with Entry/Item suffix, define in the list component

Follow the convention: `TimelineListEntry`, `FilterBarItem`, `BreadcrumbItem`, `ChatMessageEntry`.

- Define the type in the **list component** (ChatHistory), not the item component (ChatMessage)
- Use `Entry` or `Item` suffix, never `Data`
- The list owns the data contract; the item adapts to it

### 3. Use useLayoutEffect for textarea auto-grow

`useEffect` causes visible flicker because height changes happen after paint. `useLayoutEffect` runs before paint.

```tsx
useLayoutEffect(() => {
  const textarea = textareaRef.current;
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}, [value]);
```

CSS requirements:
- Always `overflow-y: auto` with a `max-height` cap
- Never use the `rows` attribute (conflicts with dynamic height)
- Use `resize: none`

### 4. Default values are API design decisions

Changing defaults is often more impactful than adding new props. Terminal's `minimizable`/`maximizable`/`closeable` were flipped from `true` to `false` — better than adding a `showControls` prop because:

- It matched actual usage (all consumers used Terminal as display-only)
- It reduces configuration burden (opt-in > opt-out)
- It signals intent: Terminal is a display frame by default

**Pattern:** Start with the most restrictive defaults. Let consumers opt in to features they actually need.

### 5. Extract shared CSS animations early

When `@keyframes` is duplicated in 2+ component CSS files, extract to `src/styles/keyframes.css`.

The `blink` keyframe was in CommandPrompt.css, Terminal.css, and Button.css. Button had a different variant (50/50 duty cycle vs step-end), so it was renamed to `blink-loading`. Components import the shared file:

```tsx
import '../../../styles/keyframes.css';
```

**Convention:** Follows existing `phosphor-warmup` and `phosphor-energize` in `keyframes.css`.

### 6. Keep design system components dependency-free

Chat components accept `messages[]` and `onSend` callback — no AI SDK, no fetch calls, no state management. Consumers wire up `useChat` or any chat state in their app:

```tsx
// Consumer app (not eidotter)
const { messages, sendMessage, isLoading } = useChat();

<Terminal title="ADOS Chat">
  <ChatContainer messages={messages} onSend={sendMessage} isStreaming={isLoading} />
</Terminal>
```

**Why:** eidotter has zero runtime dependencies (only peerDeps: React, ReactDOM). Chat is a presentation pattern, not a framework.

### 7. Disambiguate overlapping prop names

When multiple components in a feature use "prompt"-like props with different semantics:

- ChatMessage: `userPrefix` / `assistantPrefix` (message line prefixes)
- ChatInput: `prompt` (input prompt character)
- ChatContainer: `inputPrompt`, `userPrefix`, `assistantPrefix` (passes through separately)

A single `prompt` prop meaning different things at different component levels causes bugs.

## Why This Matters

- **Co-location** makes feature boundaries visible and reduces "where does this live?" questions
- **Type naming** makes data flow direction explicit — future developers reading `ChatMessageEntry` immediately know it belongs to `ChatHistory`
- **useLayoutEffect** eliminates a class of visual glitches that are hard to debug and easy to introduce
- **Restrictive defaults** reveal actual usage patterns and reduce API surface
- **Shared animations** prevent CSS drift between components that should look consistent
- **Dependency-free UI** ensures the design system works with any AI provider, state library, or framework
- **Explicit prop names** prevent off-by-one misunderstandings in component composition

## When to Apply

| Pattern | Apply when... |
|---------|---------------|
| Co-location | Building 3+ related components that form a feature |
| Type naming | Any list/item component pair |
| useLayoutEffect | Textarea or element height responding to content |
| Restrictive defaults | Designing a new component's boolean props |
| Shared animations | An animation is used in 2+ component CSS files |
| Dependency-free | Building presentation components in a shared library |
| Prop disambiguation | A component family has multiple "prompt/label/title"-like props |

## Related

- Tag/TagGroup co-location: `src/components/Tag/`
- TimelineList data-driven list pattern: `src/components/TimelineList/`
- Shared keyframes: `src/styles/keyframes.css`
- Keyframe naming convention: `todos/028-complete-p3-node-enter-keyframe-naming.md`
- Shared utility extraction: `todos/022-complete-p2-extract-prefersReducedMotion.md`
- PRs: #177 (chat components), #178 (cursor fix), #179 (terminal controls), #180 (release)
