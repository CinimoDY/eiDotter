# feat: Fix Eidotter Exports and Add Critical Components

## Overview

Eidotter v0.2.1 has a credibility gap: README documents 30+ components, only 5 exist. This plan fixes that gap with a **minimal 3-session approach** focused on unblocking real projects (Rizomorf, Pomodoke Calendar).

## Problem Statement

**Documentation vs. Reality:**

| Component | Status | Evidence of Need |
|-----------|--------|------------------|
| Alert | ✅ Exists, exported | Complete |
| Accordion | ✅ Exists, exported | Complete |
| Icon | ✅ Exists, exported | Complete |
| Button | ⚠️ Exists, **NOT exported** | Complete, needs export |
| Terminal | ⚠️ Exists, **NOT exported** | Complete, needs export |
| Input | ❌ Missing | Rizomorf forms, Pomodoke Calendar |
| CommandPrompt | ❌ Missing | Rizomorf terminal interface |
| 25+ others | ❌ Missing | **No current use case** |

**Key Issues:**
1. README lies about what exists (creates false expectations)
2. Button and Terminal exist but consumers can't import them
3. No Input component blocks any form-based UI
4. No CommandPrompt blocks Rizomorf's core concept

## Proposed Solution

**3 sessions, ~8 hours total:**

| Session | Deliverable | Effort |
|---------|-------------|--------|
| 1 | Fix exports + rewrite README | 2h |
| 2 | Input component (minimal) | 3h |
| 3 | CommandPrompt component (minimal) | 3h |

**What we're NOT building (yet):**
- Select, Checkbox, Radio - add when a real form needs them
- StatusBar - add when Rizomorf is blocked without it
- Complex validation - add when forms require it
- Tab completion, command history - add in v2 if needed

## Technical Approach

### Session 1: Fix Foundation

**Files to modify:**

```typescript
// src/index.ts - Add missing exports
export { Terminal, type TerminalProps } from './components/Terminal';
// Button already exported, verify it works
```

**README.md - Rewrite to match reality:**

```markdown
## Available Components (v0.2.1)

| Component | Description |
|-----------|-------------|
| Alert | System notifications (info, success, warning, error) |
| Accordion | Collapsible content sections |
| Button | DOS-style buttons with variants |
| Icon | SVG icon system |
| Terminal | DOS window container with controls |

## Planned Components

See [ROADMAP.md](./ROADMAP.md) for future components.
```

**Create ROADMAP.md** - Move all "planned" components here with no timeline promises.

**Verification:**
```bash
npm run build        # Must succeed
npm run storybook    # All 5 components render
npm run lint         # Zero warnings
```

### Session 2: Input Component

**Minimal props (extend HTML input):**

```typescript
// src/components/Input/components/Input.tsx

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual variant for validation states
   */
  variant?: 'default' | 'error';
  /**
   * Optional class name
   */
  className?: string;
}
```

**Why this is enough:**
- Inherits all standard HTML input props (value, onChange, type, placeholder, disabled, etc.)
- Single custom prop for error styling
- Consumers can pass any native input attribute
- Add custom props ONLY when real usage is blocked

**DOS Styling:**

```css
.input {
  background: var(--color-cga-black);
  color: var(--color-cga-brightCyan);
  border: 2px solid var(--color-cga-lightGray);
  font-family: "Perfect DOS VGA 437", Consolas, monospace;
  padding: 8px;
  outline: none;
}

.input:focus {
  border-color: var(--color-cga-yellow);
  box-shadow: 0 0 8px rgba(255, 255, 85, 0.3);
}

.input--error {
  border-color: var(--color-cga-brightRed);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Storybook stories (3 minimum):**
1. Default - basic text input
2. Error - validation error state
3. Disabled - disabled state

**File structure:**
```
src/components/Input/
├── components/
│   ├── Input.tsx          # ~50 lines
│   ├── Input.css          # ~40 lines
│   ├── Input.stories.tsx  # 3 stories
│   └── index.ts
└── index.ts
```

### Session 3: CommandPrompt Component

**Minimal props:**

```typescript
// src/components/CommandPrompt/components/CommandPrompt.tsx

interface CommandPromptProps {
  /**
   * The prompt string displayed before cursor
   * @default "C:\>"
   */
  prompt?: string;
  /**
   * Called when user presses Enter with command text
   */
  onCommand: (command: string) => void;
  /**
   * Auto-focus the input on mount
   */
  autoFocus?: boolean;
  /**
   * Optional class name
   */
  className?: string;
}
```

**What this delivers:**
- Prompt displays (e.g., "C:\>")
- User types command
- Press Enter → onCommand fires with text
- Blinking cursor (█) for DOS feel

**What we're NOT building yet:**
- Command history (up/down arrows) - add in v2 if Rizomorf needs it
- Tab completion - add in v2 if Rizomorf needs it
- Suggestions dropdown - add in v2 if Rizomorf needs it

**Implementation (~80 lines):**

```typescript
export const CommandPrompt: React.FC<CommandPromptProps> = ({
  prompt = 'C:\\>',
  onCommand,
  autoFocus = false,
  className = '',
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onCommand(value.trim());
      setValue('');
    }
  };

  return (
    <div className={`command-prompt ${className}`.trim()}>
      <span className="command-prompt__prompt">{prompt}</span>
      <input
        ref={inputRef}
        className="command-prompt__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        spellCheck={false}
      />
      <span className="command-prompt__cursor">█</span>
    </div>
  );
};
```

**DOS Styling:**

```css
.command-prompt {
  display: flex;
  align-items: center;
  font-family: "Perfect DOS VGA 437", Consolas, monospace;
  background: var(--color-cga-black);
  color: var(--color-cga-yellow);
}

.command-prompt__prompt {
  color: var(--color-cga-lightGray);
  margin-right: 8px;
}

.command-prompt__input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-cga-brightCyan);
  font-family: inherit;
  font-size: inherit;
  outline: none;
}

.command-prompt__cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

**Storybook stories (3 minimum):**
1. Default - basic prompt
2. Custom prompt - different prompt string
3. Interactive - shows command handling

**File structure:**
```
src/components/CommandPrompt/
├── components/
│   ├── CommandPrompt.tsx       # ~80 lines
│   ├── CommandPrompt.css       # ~50 lines
│   ├── CommandPrompt.stories.tsx
│   └── index.ts
└── index.ts
```

## Acceptance Criteria

### Functional
- [ ] All 7 components exported from `src/index.ts`
- [ ] `npm run build` succeeds
- [ ] All components render in Storybook without errors
- [ ] Input handles text entry with DOS styling
- [ ] CommandPrompt fires onCommand when Enter pressed
- [ ] README accurately lists only existing components

### Quality
- [ ] TypeScript strict mode passes (`tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Each new component has 3+ Storybook stories
- [ ] Components use design tokens (no hardcoded colors)
- [ ] DOS aesthetic maintained (sharp corners, CGA colors, monospace)

### Accessibility
- [ ] Input has proper focus states
- [ ] CommandPrompt is keyboard accessible
- [ ] Color contrast meets WCAG AA (yellow on black = 19.56:1 ✓)

## Success Metrics

| Metric | Before | After |
|--------|--------|-------|
| Exported components | 4 | 7 |
| README accuracy | ~15% | 100% |
| Rizomorf blockers | 2 | 0 |
| Form component availability | No | Yes |

## What We're Explicitly NOT Doing

Per reviewer feedback, these are **deferred until proven needed**:

| Component/Feature | Reason to Defer |
|-------------------|-----------------|
| Select | No form currently needs it |
| Checkbox/Radio | No form currently needs it |
| StatusBar | No project blocked without it |
| Input size variants | One size is enough until proven otherwise |
| Input validation props | Add when forms need validation |
| Command history | Add when Rizomorf needs up-arrow |
| Tab completion | Add when Rizomorf needs it |

**The rule:** Build when a real project is blocked, not before.

## Dependencies

- Node.js 18+
- Existing npm packages (no new deps needed)

**No external blockers.**

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Storybook config issues | Low | Test incrementally |
| Token gaps | Low | Add missing tokens as needed |

## Implementation Order

### Session 1: Fix Foundation (~2h)
```
1. Edit src/index.ts - add Terminal export
2. Verify Button export works
3. npm run build - fix any errors
4. npm run storybook - verify all 5 render
5. Rewrite README.md - only list real components
6. Create ROADMAP.md - move planned components there
7. Update PROJECT_PLAN.md status
8. Commit: "fix: export Terminal, update README to match reality"
```

### Session 2: Input Component (~3h)
```
1. mkdir -p src/components/Input/components
2. Create Input.tsx with minimal props
3. Create Input.css with DOS styling
4. Create Input.stories.tsx (3 stories)
5. Create index.ts exports
6. Add to src/index.ts
7. npm run build && npm run storybook
8. Commit: "feat: add Input component"
```

### Session 3: CommandPrompt Component (~3h)
```
1. mkdir -p src/components/CommandPrompt/components
2. Create CommandPrompt.tsx with minimal props
3. Create CommandPrompt.css with DOS styling + cursor blink
4. Create CommandPrompt.stories.tsx (3 stories)
5. Create index.ts exports
6. Add to src/index.ts
7. npm run build && npm run storybook
8. Commit: "feat: add CommandPrompt component"
```

## References

### Internal
- Existing Button: `src/components/Button/components/Button.tsx`
- Existing Terminal: `src/components/Terminal/components/Terminal.tsx`
- Token colors: `src/tokens/colors.json`
- Export file: `src/index.ts`

### External
- CGA Palette: https://en.wikipedia.org/wiki/Color_Graphics_Adapter#Color_palette

---

**Plan Revised**: 2025-12-08
**Scope**: 3 sessions, ~8 hours
**Reviewers**: DHH (pragmatism), Kieran (quality), Simplicity (YAGNI)
