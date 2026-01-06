import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../Button/components/Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
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
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    title: {
      control: 'text',
      description: 'Modal title (required for accessibility)',
    },
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive wrapper for stories
const ModalDemo = ({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalDemo title="Modal Title">
      <p>This is the modal body content. You can put any content here.</p>
    </ModalDemo>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalDemo
      title="Confirm Action"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>
      }
    >
      <p>Are you sure you want to proceed with this action?</p>
    </ModalDemo>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalDemo
      title="Terms and Conditions"
      footer={
        <>
          <Button variant="ghost">Decline</Button>
          <Button variant="primary">Accept</Button>
        </>
      }
    >
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </ModalDemo>
  ),
};

export const DeleteConfirmation: Story = {
  render: () => (
    <ModalDemo
      title="Delete Item"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </>
      }
    >
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </ModalDemo>
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalDemo
      title="Create New Project"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Create</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label style={{ color: 'var(--color-cga-lightGray)' }}>
          Project Name
          <input
            type="text"
            placeholder="Enter project name"
            style={{
              display: 'block',
              width: '100%',
              marginTop: '4px',
              padding: '8px',
              background: 'var(--color-cga-black)',
              border: '1px solid var(--color-cga-darkGray)',
              color: 'var(--color-cga-lightGray)',
              fontFamily: 'inherit',
            }}
          />
        </label>
        <label style={{ color: 'var(--color-cga-lightGray)' }}>
          Description
          <textarea
            placeholder="Enter description"
            rows={3}
            style={{
              display: 'block',
              width: '100%',
              marginTop: '4px',
              padding: '8px',
              background: 'var(--color-cga-black)',
              border: '1px solid var(--color-cga-darkGray)',
              color: 'var(--color-cga-lightGray)',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
        </label>
      </div>
    </ModalDemo>
  ),
};
