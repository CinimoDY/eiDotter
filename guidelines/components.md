# Component Guide

Detailed usage guide for each eidotter component.

---

## Button

User action trigger with multiple visual styles.

### When to Use

- **primary**: Main call-to-action (submit, save, confirm)
- **secondary**: Alternative actions alongside primary
- **ghost**: Low-emphasis actions (cancel, dismiss)
- **link**: Inline text actions that navigate

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'ghost' \| 'link'` | `'primary'` | Visual style |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| disabled | `boolean` | `false` | Disable interaction |
| loading | `boolean` | `false` | Show loading indicator |
| fullWidth | `boolean` | `false` | Stretch to container width |
| type | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

### Examples

```tsx
// Primary action
<Button variant="primary">Save Changes</Button>

// Form submission
<Button type="submit" loading={isSubmitting}>Submit</Button>

// Cancel action
<Button variant="ghost" onClick={onCancel}>Cancel</Button>

// Full-width button
<Button fullWidth variant="primary">Continue</Button>
```

---

## Alert

Dismissible notification messages with contextual styling.

### When to Use

- **info**: General information or tips
- **success**: Successful operations
- **warning**: Cautionary messages
- **error**: Error states requiring attention

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert style |
| size | `'small' \| 'large'` | `'large'` | Alert size |
| title | `string` | `'Notification Title'` | Header text |
| children | `ReactNode` | - | Message content |
| onClose | `() => void` | - | Show close button when provided |
| onClickHere | `() => void` | - | Show "Click here" link when provided |

### Examples

```tsx
// Success message
<Alert type="success" title="Saved">
  Your changes have been saved successfully.
</Alert>

// Dismissible warning
<Alert type="warning" title="Low Storage" onClose={() => setShow(false)}>
  You have less than 10% storage remaining.
</Alert>

// Error with action
<Alert type="error" title="Connection Lost" onClickHere={handleRetry}>
  Unable to connect to the server.
</Alert>
```

---

## Card

Content container with optional header and footer.

### When to Use

- Group related content visually
- Create distinct content sections
- Display item summaries in grids

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | Optional header title |
| children | `ReactNode` | - | Card body content |
| footer | `ReactNode` | - | Optional footer content |
| variant | `'default' \| 'elevated' \| 'bordered' \| 'glow'` | `'default'` | Visual style |

### Examples

```tsx
// Simple card
<Card title="User Profile">
  <p>Welcome back, Commander.</p>
</Card>

// Card with footer actions
<Card
  title="Settings"
  footer={
    <Button variant="primary">Save</Button>
  }
>
  <Input label="Username" />
</Card>

// Glow variant for emphasis
<Card variant="glow" title="Featured">
  Highlighted content here.
</Card>
```

---

## Input

Text entry field with validation state.

### When to Use

- Text input in forms
- Search fields
- Any single-line text entry

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'error'` | `'default'` | Visual state |
| disabled | `boolean` | `false` | Disable input |
| ...rest | `InputHTMLAttributes` | - | All standard input props |

### Examples

```tsx
// Basic input
<Input placeholder="Enter filename..." />

// With error state
<Input variant="error" value={email} placeholder="Email" />

// Disabled input
<Input disabled value="Read-only value" />
```

---

## Checkbox

Boolean toggle with optional label.

### When to Use

- Toggle settings on/off
- Multi-select options
- Agreement/consent checkboxes

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | - | Controlled checked state |
| defaultChecked | `boolean` | - | Initial state (uncontrolled) |
| onChange | `(checked: boolean) => void` | - | Change callback |
| label | `string` | - | Label text |
| disabled | `boolean` | `false` | Disable interaction |
| name | `string` | - | Form field name |

### Examples

```tsx
// With label
<Checkbox label="Remember me" onChange={setRemember} />

// Controlled
<Checkbox checked={agreed} onChange={setAgreed} label="I agree to terms" />

// In a list
{options.map(opt => (
  <Checkbox key={opt.id} label={opt.name} />
))}
```

---

## Switch

Toggle control for binary settings.

### When to Use

- Settings that apply immediately
- Feature toggles
- On/off states (prefer over Checkbox when toggle metaphor fits)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | - | Controlled state |
| defaultChecked | `boolean` | `false` | Initial state |
| onCheckedChange | `(checked: boolean) => void` | - | Change callback |
| disabled | `boolean` | `false` | Disable interaction |
| name | `string` | - | Form field name |

### Examples

```tsx
// Basic toggle
<Switch onCheckedChange={setEnabled} />

// Controlled
<Switch checked={darkMode} onCheckedChange={setDarkMode} />

// With external label
<label>
  Enable notifications
  <Switch checked={notify} onCheckedChange={setNotify} />
</label>
```

---

## Modal

Dialog overlay for focused interactions.

### When to Use

- Confirmations requiring user attention
- Forms that need focused context
- Detail views without navigation

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | `boolean` | - | **Required.** Show/hide modal |
| onClose | `() => void` | - | **Required.** Close callback |
| title | `string` | - | **Required.** Modal title |
| children | `ReactNode` | - | Modal body |
| footer | `ReactNode` | - | Footer actions |

### Examples

```tsx
// Confirmation dialog
<Modal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Delete File?"
  footer={
    <>
      <Button variant="ghost" onClick={() => setShowConfirm(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>This action cannot be undone.</p>
</Modal>

// Form modal
<Modal isOpen={showForm} onClose={closeForm} title="New File">
  <Input placeholder="Filename" />
</Modal>
```

---

## Tabs

Tab-based navigation for switching views.

### When to Use

- Content organized into distinct sections
- Settings with multiple categories
- Dashboard views

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tabs | `TabItem[]` | - | **Required.** Array of `{ id, label, disabled? }` |
| variant | `'underline' \| 'pills'` | `'underline'` | Tab style |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Tab size |
| activeTab | `string` | - | Controlled active tab ID |
| defaultActiveTab | `string` | - | Initial active tab |
| onTabChange | `(tabId: string) => void` | - | Tab change callback |

### Examples

```tsx
// Basic tabs
<Tabs
  tabs={[
    { id: 'files', label: 'Files' },
    { id: 'settings', label: 'Settings' },
  ]}
  onTabChange={setActiveTab}
/>

// Pills variant
<Tabs
  variant="pills"
  tabs={[
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived', disabled: true },
  ]}
/>
```

---

## Badge

Status indicators, labels, and tags.

### When to Use

- Status indicators (online, offline, pending)
- Labels for categorization
- Notification counts

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'accent'` | `'default'` | Color scheme |
| size | `'small' \| 'medium'` | `'medium'` | Badge size |
| dot | `boolean` | `false` | Show dot indicator |
| children | `ReactNode` | - | Badge content |

### Examples

```tsx
// Status badge
<Badge variant="success" dot>Online</Badge>

// Label
<Badge variant="info">New</Badge>

// Small notification count
<Badge size="small" variant="error">3</Badge>
```

---

## Progress

Visual indicator for completion or loading.

### When to Use

- File upload progress
- Task completion
- Loading states

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `number` | - | **Required.** Current value (0-100) |
| max | `number` | `100` | Maximum value |
| variant | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color scheme |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Bar height |
| showLabel | `boolean` | `false` | Show percentage text |

### Examples

```tsx
// Basic progress
<Progress value={65} />

// With label
<Progress value={80} showLabel />

// Success variant when complete
<Progress value={100} variant="success" showLabel />
```

---

## Breadcrumb

Navigation path showing location hierarchy.

### When to Use

- Multi-level navigation
- File system paths
- Showing current location in hierarchy

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trail | `BreadcrumbItem[]` | `[]` | Array of `{ href, label }` |
| currentLabel | `string` | - | **Required.** Current page label |
| showBackArrow | `boolean` | `true` | Show < on last trail item |
| separator | `string` | `'/'` | Custom separator |
| linkComponent | `Component` | - | Custom link (e.g., Next.js Link) |

### Examples

```tsx
// Basic breadcrumb
<Breadcrumb
  trail={[
    { href: '/', label: 'Home' },
    { href: '/files', label: 'Files' },
  ]}
  currentLabel="document.txt"
/>

// With Next.js Link
import Link from 'next/link';

<Breadcrumb
  linkComponent={Link}
  trail={[{ href: '/', label: 'Dashboard' }]}
  currentLabel="Settings"
/>
```

---

## Section / AccordionFill

Collapsible content sections.

### When to Use

- FAQ sections
- Settings groups
- Long content that can be collapsed

### Section Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | **Required.** Section header |
| children | `ReactNode` | - | **Required.** Collapsible content |
| defaultExpanded | `boolean` | `false` | Start expanded |
| onToggle | `(isExpanded: boolean) => void` | - | Toggle callback |

### AccordionFill Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sections | `{ title, content }[]` | - | **Required.** Section data |
| defaultExpandedIndex | `number` | `-1` | Initially expanded section |

### Examples

```tsx
// Single collapsible section
<Section title="Advanced Options">
  <Input placeholder="Custom setting" />
</Section>

// Accordion group (one open at a time)
<AccordionFill
  sections={[
    { title: 'General', content: 'General settings...' },
    { title: 'Security', content: 'Security options...' },
  ]}
/>
```

---

## Terminal

DOS-style window container with title bar.

### When to Use

- Wrap application content in DOS window aesthetic
- Command output display
- Standalone terminal window effects

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | `'MS-DOS Terminal'` | Window title |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Window size |
| state | `'active' \| 'inactive' \| 'minimized'` | `'active'` | Window state |
| minimizable | `boolean` | `true` | Show minimize button |
| maximizable | `boolean` | `true` | Show maximize button |
| closeable | `boolean` | `true` | Show close button |
| children | `ReactNode` | - | Window content |
| onMinimize | `() => void` | - | Minimize callback |
| onMaximize | `() => void` | - | Maximize callback |
| onClose | `() => void` | - | Close callback |

### Examples

```tsx
// Basic terminal
<Terminal title="C:\WINDOWS\system32">
  <p>Directory listing...</p>
</Terminal>

// Non-closeable terminal
<Terminal
  title="Output"
  closeable={false}
  minimizable={false}
>
  <pre>{output}</pre>
</Terminal>
```

---

## Stat

Metric display with optional trend indicator.

### When to Use

- Dashboard metrics
- KPI displays
- Numeric summaries

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | **Required.** Metric label |
| value | `string \| number` | - | **Required.** Metric value |
| trend | `'up' \| 'down' \| 'neutral'` | - | Trend direction |
| trendValue | `string` | - | Trend change (e.g., "+5%") |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Stat size |

### Examples

```tsx
// Basic stat
<Stat label="Files" value={42} />

// With trend
<Stat label="Downloads" value="1,234" trend="up" trendValue="+12%" />

// Down trend
<Stat label="Errors" value={3} trend="down" trendValue="-2" />
```

---

## Icon

89 DOS-styled icons.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | - | **Required.** Icon name |
| size | `'S' \| 'M' \| 'L' \| 'XL'` | `'M'` | Icon size |

### Common Icons

`Add`, `Cancel`, `Check`, `Chevron Down`, `Chevron Up`, `Close`, `Done`, `Error`, `Info`, `Warning`, `Calendar`, `Star`, `Search`, `Settings`, `User`, `File`, `Folder`, `App`, `Fullscreen`

### Examples

```tsx
<Icon name="Check" size="M" />
<Icon name="Warning" size="L" />
```
