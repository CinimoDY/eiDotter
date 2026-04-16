---
name: figma-audit
description: Compare an eidotter React component against its V.37 Figma counterpart using Figma Console MCP
---

# Figma Component Audit

Compare a React component's implementation against its eiDotter DS V.37 Figma design.

## Arguments

`/figma-audit <ComponentName>`

## Prerequisites

- Figma Console MCP connected (`figma_get_status` with probe:true)
- eiDotter DS V.37 file open in Figma Desktop with plugin running

## V.37 Figma Page IDs

| Component | Page ID |
|-----------|---------|
| Buttons | 1:1183 |
| Badges | 12:539 |
| Inputs | 85:1269 |
| Checkboxes | 1097:63638 |
| Toggles (Switch) | 1102:4631 |
| Tabs | 43:0 |
| Tags | 3306:403749 |
| Modals | 172:4293 |
| Alerts & notifications | 176:4256 |
| Application navigation | 82:1862 |
| Breadcrumbs | 43:3087 |
| Dropdowns | 18:0 |
| Select | 11132:11643 |
| Tables | 214:0 |
| Progress indicators | 1154:89940 |

## Workflow

### Step 1: Get V.37 component metadata

```javascript
// Via figma_execute
const page = figma.root.children.find(p => p.id === '<PAGE_ID>');
await page.loadAsync();
const sets = page.findAll(n => n.type === 'COMPONENT_SET');
// Get variant properties for each set
```

Extract:
- Component set names
- Variant count
- Property definitions (Size, State, Type, etc.)
- Property values (options)

### Step 2: Read React component props

Read `src/components/<Name>/components/<Name>.tsx` and extract:
- Interface props
- Variant options
- Size options
- State handling (disabled, loading, etc.)

### Step 3: Generate comparison matrix

| Aspect | eidotter React | V.37 Figma | Gap |
|--------|---------------|------------|-----|
| Variants | ... | ... | ... |
| Sizes | ... | ... | ... |
| States | ... | ... | ... |
| Icons | ... | ... | ... |
| Breakpoints | ... | ... | ... |

### Step 4: Visual comparison (if screenshot budget allows)

Use Claude.ai Figma MCP for screenshots:
```
get_screenshot(fileKey: 'V4tIz3sAMRx7H9wMYeesA6', nodeId: '<PAGE_ID>')
```

Compare with Storybook render if dev server is running.

### Step 5: Output recommendation

For each gap found, recommend:
- **Adopt V.37**: Add the missing variant/size/state to React
- **Keep eidotter**: The React version has something V.37 doesn't (e.g., phosphor effects)
- **Merge**: Take best of both

### Step 6: Update audit doc

Append findings to `plans/2026-04-04-001-feat-component-audit-v37.md` in the component's row.
