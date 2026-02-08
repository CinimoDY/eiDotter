import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import { TagGroup } from './TagGroup';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['Tag'],
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    selected: { control: 'boolean' },
    closeable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'tag',
  },
};

export const Variants: Story = {
  render: () => (
    <TagGroup>
      <Tag variant="default">default</Tag>
      <Tag variant="outlined">outlined</Tag>
      <Tag variant="filled">filled</Tag>
    </TagGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <TagGroup>
      <Tag size="small">small</Tag>
      <Tag size="medium">medium</Tag>
    </TagGroup>
  ),
};

export const Closeable: Story = {
  render: () => {
    const CloseTags = () => {
      const [tags, setTags] = useState(['react', 'typescript', 'dos', 'cga']);
      return (
        <TagGroup>
          {tags.map(tag => (
            <Tag
              key={tag}
              closeable
              onClose={() => setTags(prev => prev.filter(t => t !== tag))}
            >
              {tag}
            </Tag>
          ))}
          {tags.length === 0 && (
            <span style={{ color: '#5F340E', fontFamily: 'monospace', fontSize: '12px' }}>
              All tags removed
            </span>
          )}
        </TagGroup>
      );
    };
    return <CloseTags />;
  },
};

export const Selectable: Story = {
  render: () => {
    const SelectTags = () => {
      const [selected, setSelected] = useState<Set<string>>(new Set(['active']));
      const tags = ['active', 'archived', 'draft', 'published'];
      const toggle = (tag: string) => {
        setSelected(prev => {
          const next = new Set(prev);
          if (next.has(tag)) next.delete(tag);
          else next.add(tag);
          return next;
        });
      };
      return (
        <TagGroup>
          {tags.map(tag => (
            <Tag key={tag} selected={selected.has(tag)} onClick={() => toggle(tag)}>
              {tag}
            </Tag>
          ))}
        </TagGroup>
      );
    };
    return <SelectTags />;
  },
};

export const WithColors: Story = {
  name: 'Custom CGA Colors',
  render: () => {
    const paraColors: Record<string, string> = {
      project: '--color-cga-bright-cyan',
      area: '--color-cga-bright-green',
      resource: '--color-cga-yellow',
      archive: '--color-cga-brown',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ color: '#AAAAAA', fontFamily: 'monospace', fontSize: '12px' }}>
          PARA categories with CGA colors (outlined)
        </div>
        <TagGroup>
          {Object.entries(paraColors).map(([name, color]) => (
            <Tag key={name} variant="outlined" color={color}>
              {name}
            </Tag>
          ))}
        </TagGroup>
        <div style={{ color: '#AAAAAA', fontFamily: 'monospace', fontSize: '12px', marginTop: '8px' }}>
          PARA categories with CGA colors (filled)
        </div>
        <TagGroup>
          {Object.entries(paraColors).map(([name, color]) => (
            <Tag key={name} variant="filled" color={color}>
              {name}
            </Tag>
          ))}
        </TagGroup>
      </div>
    );
  },
};

export const TagGroupStory: Story = {
  name: 'TagGroup Gaps',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ color: '#AAAAAA', fontFamily: 'monospace', fontSize: '12px', marginBottom: '4px' }}>
          tight
        </div>
        <TagGroup gap="tight">
          <Tag>one</Tag><Tag>two</Tag><Tag>three</Tag>
        </TagGroup>
      </div>
      <div>
        <div style={{ color: '#AAAAAA', fontFamily: 'monospace', fontSize: '12px', marginBottom: '4px' }}>
          normal (default)
        </div>
        <TagGroup gap="normal">
          <Tag>one</Tag><Tag>two</Tag><Tag>three</Tag>
        </TagGroup>
      </div>
      <div>
        <div style={{ color: '#AAAAAA', fontFamily: 'monospace', fontSize: '12px', marginBottom: '4px' }}>
          loose
        </div>
        <TagGroup gap="loose">
          <Tag>one</Tag><Tag>two</Tag><Tag>three</Tag>
        </TagGroup>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const FilterTags = () => {
      const [active, setActive] = useState('all');
      const filters = ['all', 'photos', 'notes', 'bookmarks'];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TagGroup>
            {filters.map(f => (
              <Tag key={f} selected={active === f} onClick={() => setActive(f)}>
                {f}
              </Tag>
            ))}
          </TagGroup>
          <div style={{ color: '#AAAAAA', fontFamily: 'monospace', fontSize: '12px' }}>
            Showing: {active}
          </div>
        </div>
      );
    };
    return <FilterTags />;
  },
};

export const Disabled: Story = {
  render: () => (
    <TagGroup>
      <Tag disabled>disabled</Tag>
      <Tag disabled closeable>closeable disabled</Tag>
      <Tag disabled onClick={() => {}}>interactive disabled</Tag>
    </TagGroup>
  ),
};

export const TimelineEntry: Story = {
  name: 'Timeline Entry (Real-world)',
  render: () => {
    const TimelineDemo = () => {
      const [tags, setTags] = useState(['design', 'eidotter', 'milestone']);
      const remove = (tag: string) => setTags(prev => prev.filter(t => t !== tag));
      return (
        <div style={{
          border: '1px solid var(--color-semantic-border-default)',
          padding: '12px',
          fontFamily: 'monospace',
          maxWidth: '400px',
        }}>
          <div style={{ color: 'var(--color-semantic-text-primary)', fontSize: '14px', marginBottom: '8px' }}>
            Released eiDotter v0.6.0
          </div>
          <div style={{ color: '#AAAAAA', fontSize: '11px', marginBottom: '8px' }}>
            2026-02-08 22:00
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag
              variant="filled"
              size="small"
              color="--color-cga-bright-cyan"
              onClick={() => {}}
            >
              project
            </Tag>
            <TagGroup gap="tight">
              {tags.map(tag => (
                <Tag key={tag} size="small" closeable onClose={() => remove(tag)}>
                  {tag}
                </Tag>
              ))}
            </TagGroup>
          </div>
        </div>
      );
    };
    return <TimelineDemo />;
  },
};
