import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    projectMeta: componentRegistry['Alert'],
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'brand', 'gray', 'error', 'warning', 'success'],
    },
    size: {
      control: 'select',
      options: ['floating', 'full-width'],
    },
    title: { control: 'text' },
    children: { control: 'text' },
    onClose: { action: 'close clicked' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    color: 'default',
    title: 'Notification Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit amet diam neque bibendum.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'Learn more →', onClick: () => {} },
    ],
  },
};

export const WithCloseButton: Story = {
  args: {
    ...Default.args,
    onClose: () => {},
  },
};

export const ErrorColor: Story = {
  args: {
    color: 'error',
    title: 'There was a problem with that action',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'View logs →', onClick: () => {} },
    ],
  },
};

export const WarningColor: Story = {
  args: {
    color: 'warning',
    title: 'Just to let you know',
    children: 'Disk space running low on C:\\. Consider cleaning up temporary files.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'Clean up →', onClick: () => {} },
    ],
  },
};

export const SuccessColor: Story = {
  args: {
    color: 'success',
    title: 'Successfully updated profile',
    children: 'Your changes have been saved to disk.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'View changes →', onClick: () => {} },
    ],
  },
};

export const TitleOnly: Story = {
  args: {
    color: 'default',
    title: 'System initialized. All modules loaded.',
  },
};

export const ChildrenOnly: Story = {
  args: {
    color: 'warning',
    children: 'Disk space running low on C:\\',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
      <Alert color="default" title="Default" actions={[{ label: 'Dismiss', onClick: () => {} }]}>
        System initialized. All modules loaded.
      </Alert>
      <Alert color="brand" title="Brand" actions={[{ label: 'Dismiss', onClick: () => {} }]}>
        We've just released a new feature.
      </Alert>
      <Alert color="gray" title="Gray" actions={[{ label: 'Dismiss', onClick: () => {} }]}>
        No new notifications.
      </Alert>
      <Alert color="success" title="Success" actions={[{ label: 'Dismiss', onClick: () => {} }]}>
        Configuration saved successfully.
      </Alert>
      <Alert color="warning" title="Warning" actions={[{ label: 'Dismiss', onClick: () => {} }]}>
        Disk space running low on C:\
      </Alert>
      <Alert color="error" title="Error" actions={[{ label: 'Dismiss', onClick: () => {} }]}>
        Fatal error: Sector not found.
      </Alert>
    </div>
  ),
};

export const FullWidth: Story = {
  name: 'Full Width Banner',
  render: () => (
    <div style={{ maxWidth: '1440px' }}>
      <Alert color="default" size="full-width" title="System update available" onClose={() => {}}>
        A new version is ready to install. Restart to apply changes.
      </Alert>
    </div>
  ),
};

export const FullWidthAllColors: Story = {
  name: 'Full Width — All Colors',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '1440px' }}>
      <Alert color="default" size="full-width" title="Default banner" />
      <Alert color="brand" size="full-width" title="Brand banner" />
      <Alert color="success" size="full-width" title="Success banner" />
      <Alert color="warning" size="full-width" title="Warning banner" />
      <Alert color="error" size="full-width" title="Error banner" />
    </div>
  ),
};

export const MobileLayout: Story = {
  name: 'Mobile Layout (narrow container)',
  render: () => (
    <div style={{ maxWidth: '343px' }}>
      <Alert
        color="warning"
        title="Just to let you know"
        actions={[
          { label: 'Dismiss', onClick: () => {} },
          { label: 'Learn more →', onClick: () => {} },
        ]}
        onClose={() => {}}
      >
        Disk space running low on C:\. Consider cleaning up temporary files.
      </Alert>
    </div>
  ),
};

export const BackwardCompat: Story = {
  name: 'Backward Compatible (type prop)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
      <Alert type="info">System initialized. All modules loaded.</Alert>
      <Alert type="success">Configuration saved successfully.</Alert>
      <Alert type="warning">Disk space running low on C:\</Alert>
      <Alert type="error">Fatal error: Sector not found.</Alert>
    </div>
  ),
};
