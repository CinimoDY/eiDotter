import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification } from './Notification';

const meta = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'gray', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    children: { control: 'text' },
    showIcon: { control: 'boolean' },
    progress: { control: { type: 'range', min: 0, max: 100 } },
    progressLabel: { control: 'text' },
    duration: { control: 'number' },
    onClose: { action: 'close clicked' },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    type: 'primary',
    title: "We've just released a new update!",
    children: 'Check out the all new dashboard view. Pages and exports now load faster.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'View changes', onClick: () => {} },
    ],
  },
};

export const WithCloseButton: Story = {
  args: {
    ...Default.args,
    onClose: () => {},
  },
};

export const ErrorType: Story = {
  args: {
    type: 'error',
    title: 'This project has been unpublished',
    children: 'Please contact the owner to restore access.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'Contact owner', onClick: () => {} },
    ],
    onClose: () => {},
  },
};

export const SuccessType: Story = {
  args: {
    type: 'success',
    title: 'Successfully updated profile',
    children: 'Your changes have been saved.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'View profile', onClick: () => {} },
    ],
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Notification type="primary" title="Primary" onClose={() => {}}>
        System update available.
      </Notification>
      <Notification type="gray" title="Gray" onClose={() => {}}>
        No new notifications.
      </Notification>
      <Notification type="success" title="Success" onClose={() => {}}>
        Configuration saved successfully.
      </Notification>
      <Notification type="warning" title="Warning" onClose={() => {}}>
        Disk space running low.
      </Notification>
      <Notification type="error" title="Error" onClose={() => {}}>
        Fatal error: Sector not found.
      </Notification>
    </div>
  ),
};

export const NoIcon: Story = {
  args: {
    showIcon: false,
    title: 'Updates have been made to your profile',
    children: 'Your recent changes are now live.',
    actions: [
      { label: 'Dismiss', onClick: () => {} },
      { label: 'View changes', onClick: () => {} },
    ],
    onClose: () => {},
  },
};

export const WithProgress: Story = {
  args: {
    type: 'primary',
    title: "Uploading 'website-FINAL06.fig'",
    children: 'Please wait while we upload your file.',
    progress: 60,
    progressLabel: '60% uploaded...',
    actions: [
      { label: 'Cancel', onClick: () => {} },
      { label: 'Upload another', onClick: () => {} },
    ],
    onClose: () => {},
  },
};

export const MobileLayout: Story = {
  name: 'Mobile Layout (narrow container)',
  render: () => (
    <div style={{ maxWidth: '343px' }}>
      <Notification
        type="warning"
        title="Just to let you know"
        actions={[
          { label: 'Dismiss', onClick: () => {} },
          { label: 'Learn more', onClick: () => {} },
        ]}
        onClose={() => {}}
      >
        Disk space running low on C:\. Consider cleaning up.
      </Notification>
    </div>
  ),
};
