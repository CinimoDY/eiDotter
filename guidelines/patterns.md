# Common Patterns

Composition patterns for building interfaces with eidotter components.

---

## Page Layout

### Terminal Window Wrapper

Wrap your application content in a Terminal for the full DOS window experience:

```tsx
import { Terminal } from 'eidotter';

function App() {
  return (
    <Terminal
      title="MY APPLICATION"
      closeable={false}
      minimizable={false}
    >
      {/* Your app content */}
    </Terminal>
  );
}
```

### Basic Page Structure

```tsx
import { Terminal, Breadcrumb, Card } from 'eidotter';

function Page() {
  return (
    <div className="min-h-screen bg-dos-bg-primary p-4">
      <Terminal title="File Manager">
        <Breadcrumb
          trail={[{ href: '/', label: 'Home' }]}
          currentLabel="Documents"
        />
        <main className="mt-4">
          <Card title="Files">
            {/* Content */}
          </Card>
        </main>
      </Terminal>
    </div>
  );
}
```

---

## Forms

### Login Form

```tsx
import { Card, Input, Button, Checkbox } from 'eidotter';

function LoginForm() {
  return (
    <Card title="Login">
      <form className="flex flex-col gap-4">
        <div>
          <label className="block text-dos-text-primary mb-1">
            Username
          </label>
          <Input
            name="username"
            placeholder="Enter username..."
          />
        </div>
        <div>
          <label className="block text-dos-text-primary mb-1">
            Password
          </label>
          <Input
            name="password"
            type="password"
            placeholder="Enter password..."
          />
        </div>
        <Checkbox label="Remember me" />
        <Button type="submit" variant="primary" fullWidth>
          Login
        </Button>
      </form>
    </Card>
  );
}
```

### Form with Validation

```tsx
import { Input, Button, Alert } from 'eidotter';

function FormWithValidation() {
  const [error, setError] = useState('');

  return (
    <form className="flex flex-col gap-4">
      {error && (
        <Alert type="error" title="Validation Error">
          {error}
        </Alert>
      )}
      <Input
        variant={error ? 'error' : 'default'}
        placeholder="Email address"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Settings Form with Sections

```tsx
import { Section, Switch, Button } from 'eidotter';

function SettingsForm() {
  return (
    <form>
      <Section title="Notifications" defaultExpanded>
        <div className="flex justify-between items-center py-2">
          <span>Email notifications</span>
          <Switch />
        </div>
        <div className="flex justify-between items-center py-2">
          <span>Push notifications</span>
          <Switch />
        </div>
      </Section>

      <Section title="Privacy">
        <div className="flex justify-between items-center py-2">
          <span>Show online status</span>
          <Switch />
        </div>
      </Section>

      <div className="mt-4">
        <Button variant="primary">Save Settings</Button>
      </div>
    </form>
  );
}
```

---

## Navigation

### Breadcrumb with Tabs

```tsx
import { Breadcrumb, Tabs, Card } from 'eidotter';

function NavigationPattern() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <Breadcrumb
        trail={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
        ]}
        currentLabel="My Project"
      />

      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'files', label: 'Files' },
          { id: 'settings', label: 'Settings' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mt-4"
      />

      <Card className="mt-4">
        {activeTab === 'overview' && <p>Overview content...</p>}
        {activeTab === 'files' && <p>Files content...</p>}
        {activeTab === 'settings' && <p>Settings content...</p>}
      </Card>
    </div>
  );
}
```

---

## Content Displays

### Card Grid

```tsx
import { Card, Badge } from 'eidotter';

function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <Card key={item.id} title={item.name}>
          <p className="text-dos-text-primary">{item.description}</p>
          <div className="mt-2">
            <Badge variant={item.status === 'active' ? 'success' : 'default'}>
              {item.status}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Dashboard Stats

```tsx
import { Stat, Card, Progress } from 'eidotter';

function Dashboard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat label="Files" value="1,234" trend="up" trendValue="+12" />
      <Stat label="Storage" value="4.2 GB" trend="neutral" />
      <Stat label="Users" value={42} trend="up" trendValue="+5" />
      <Stat label="Errors" value={3} trend="down" trendValue="-2" />

      <Card className="col-span-2" title="Storage Usage">
        <Progress value={68} showLabel />
      </Card>
    </div>
  );
}
```

### File List

```tsx
import { Card, Icon, Button } from 'eidotter';

function FileList({ files }) {
  return (
    <Card title="Files">
      <div className="divide-y divide-dos-border-default">
        {files.map(file => (
          <div
            key={file.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-2">
              <Icon name={file.type === 'folder' ? 'Folder' : 'File'} />
              <span className="text-dos-text-primary">{file.name}</span>
            </div>
            <Button variant="ghost" size="small">
              <Icon name="Chevron Right" size="S" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

---

## Dialogs

### Confirmation Dialog

```tsx
import { Modal, Button } from 'eidotter';

function ConfirmDelete({ isOpen, onClose, onConfirm, fileName }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Delete"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      }
    >
      <p>Are you sure you want to delete "{fileName}"?</p>
      <p className="text-cga-brown mt-2">This action cannot be undone.</p>
    </Modal>
  );
}
```

### Form Modal

```tsx
import { Modal, Input, Button, Alert } from 'eidotter';

function CreateFileModal({ isOpen, onClose }) {
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filename) {
      setError('Filename is required');
      return;
    }
    // Create file...
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New File"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert type="error" title="Error" className="mb-4">
            {error}
          </Alert>
        )}
        <Input
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="filename.txt"
          variant={error ? 'error' : 'default'}
        />
      </form>
    </Modal>
  );
}
```

---

## Status & Feedback

### Loading State

```tsx
import { Progress, Button } from 'eidotter';

function UploadProgress({ progress, onCancel }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-dos-text-primary">
        <span>Uploading file...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
      <Button variant="ghost" size="small" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}
```

### Status Messages

```tsx
import { Alert, Button } from 'eidotter';

function StatusMessages() {
  return (
    <div className="space-y-2">
      <Alert type="success" title="Success">
        File saved successfully.
      </Alert>

      <Alert
        type="warning"
        title="Warning"
        onClose={() => {}}
      >
        Your session will expire in 5 minutes.
      </Alert>

      <Alert
        type="error"
        title="Error"
        onClickHere={() => window.location.reload()}
      >
        Failed to load data.
      </Alert>
    </div>
  );
}
```

---

## Best Practices

### Spacing

Use consistent spacing from the token scale:

```tsx
// Good - use spacing tokens
<div className="p-4 gap-2">

// Avoid - arbitrary values
<div className="p-[13px] gap-[7px]">
```

### Color Usage

Always use semantic colors:

```tsx
// Good - semantic tokens
<div className="bg-dos-bg-primary text-dos-text-accent">

// Avoid - raw CGA colors for general use
<div className="bg-cga-black text-cga-yellow">

// Never - hardcoded colors
<div style={{ background: '#020003', color: '#e5b936' }}>
```

### Accessibility

Include proper ARIA labels:

```tsx
// Good
<Button aria-label="Close dialog">
  <Icon name="Close" />
</Button>

// Good
<Input aria-label="Search files" placeholder="Search..." />
```

### Consistent Variant Usage

Match variant to context:

```tsx
// Primary actions
<Button variant="primary">Save</Button>

// Secondary actions
<Button variant="secondary">Export</Button>

// Dismissive actions
<Button variant="ghost">Cancel</Button>
```
