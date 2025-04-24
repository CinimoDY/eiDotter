import * as fs from 'fs/promises';
import * as path from 'path';

const COMPONENTS_DIR = path.resolve(__dirname, '../src/components');

async function getComponentTypes(componentDir: string): Promise<{
  variants: string[];
  states: string[];
  types: string[];
}> {
  const typesPath = path.join(componentDir, 'types.ts');
  const content = await fs.readFile(typesPath, 'utf-8');
  
  const variantMatch = content.match(/export type \w+Variant = ([^;]+);/);
  const stateMatch = content.match(/export type \w+State = ([^;]+);/);
  const typeMatch = content.match(/export type \w+Type = ([^;]+);/);
  
  const parseTypes = (match: RegExpMatchArray | null): string[] => {
    if (!match) return [];
    return match[1]
      .split('|')
      .map(t => t.trim().replace(/['"]/g, ''))
      .filter(t => t !== 'never');
  };
  
  return {
    variants: parseTypes(variantMatch),
    states: parseTypes(stateMatch),
    types: parseTypes(typeMatch),
  };
}

async function fixStoryFile(componentName: string, storyPath: string, types: {
  variants: string[];
  states: string[];
  types: string[];
}): Promise<void> {
  const defaultVariant = types.variants[0] || 'default';
  const content = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta = {
  title: 'Components/${componentName}',
  component: ${componentName},
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
    variant: {
      control: 'select',
      options: ${JSON.stringify(types.variants)},
      defaultValue: '${defaultVariant}',
    },
    state: {
      control: 'select',
      options: ${JSON.stringify(types.states)},
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ${JSON.stringify(types.types)},
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: '${componentName} Content',
    variant: '${defaultVariant}',
    state: 'default',
  },
};

// Variants
${types.variants.map(variant => `
export const ${variant.charAt(0).toUpperCase() + variant.slice(1)}: Story = {
  args: {
    children: '${componentName} ${variant}',
    variant: '${variant}',
    state: 'default',
  },
};`).join('\n')}

// States
${types.states.map(state => `
export const State${state.charAt(0).toUpperCase() + state.slice(1)}: Story = {
  args: {
    children: '${state} State',
    variant: '${defaultVariant}',
    state: '${state}',
  },
};`).join('\n')}

// Types
${types.types.map(type => `
export const ${type.charAt(0).toUpperCase() + type.slice(1)}Type: Story = {
  args: {
    children: '${type} Type',
    variant: '${defaultVariant}',
    state: 'default',
    type: '${type}',
  },
};`).join('\n')}
`;

  await fs.writeFile(storyPath, content);
}

async function main() {
  const componentDirs = await fs.readdir(COMPONENTS_DIR);
  
  for (const dir of componentDirs) {
    const componentDir = path.join(COMPONENTS_DIR, dir);
    const stat = await fs.stat(componentDir);
    
    if (stat.isDirectory()) {
      console.log(`Processing ${dir}...`);
      
      try {
        const types = await getComponentTypes(componentDir);
        const storyPath = path.join(componentDir, 'components', `${dir}.stories.tsx`);
        await fixStoryFile(dir, storyPath, types);
        console.log(`✓ Fixed ${dir} stories`);
      } catch (error) {
        console.error(`Error processing ${dir}:`, error);
      }
    }
  }
}

main(); 