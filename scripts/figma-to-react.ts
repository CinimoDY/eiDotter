import { config } from 'dotenv';
import * as Figma from 'figma-js';
import * as fs from 'fs/promises';
import * as path from 'path';

// Load environment variables
config();

// Configuration
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const OUTPUT_DIR = path.resolve(__dirname, '../src/components');

if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_KEY) {
  console.error('Please set FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY in your .env file');
  process.exit(1);
}

const client = Figma.Client({
  personalAccessToken: FIGMA_ACCESS_TOKEN
});

interface ComponentInfo {
  name: string;
  variant?: string;
  state?: string;
  type?: string;
}

function parseComponentName(fullName: string): ComponentInfo {
  // Split the name by '/' and get the last part
  const parts = fullName.split('/').pop()!.split(/[-\s]/);
  
  // Initialize component info
  const info: ComponentInfo = {
    name: '',
    variant: undefined,
    state: undefined,
    type: undefined
  };
  
  // Common patterns
  const statePatterns = [
    'default', 'hover', 'active', 'disabled', 'selected', 'filled',
    'error', 'success', 'warning', 'info', 'loading',
    'open', 'closed', 'collapsed', 'expanded',
    'online', 'offline', 'busy', 'away',
    'valid', 'invalid', 'dirty', 'pristine',
    'focused', 'blurred', 'pressed', 'released'
  ];
  
  const variantPatterns = [
    'small', 'medium', 'large', 'xlarge',
    'primary', 'secondary', 'tertiary',
    'subtle', 'bold', 'light', 'dark',
    'outline', 'solid', 'ghost',
    'vertical', 'horizontal',
    'left', 'right', 'center',
    'top', 'bottom', 'middle'
  ];

  const typePatterns = {
    button: ['submit', 'reset', 'button'],
    input: ['text', 'number', 'email', 'password', 'search', 'tel', 'url'],
    heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    alert: ['info', 'success', 'warning', 'error'],
    icon: ['solid', 'outline', 'duo'],
    badge: ['status', 'counter', 'indicator'],
    avatar: ['user', 'group', 'project'],
    card: ['simple', 'detailed', 'interactive'],
    list: ['ordered', 'unordered', 'description'],
    menu: ['dropdown', 'context', 'navigation']
  };

  const componentPrefixes: Record<string, string> = {
    'btn': 'Button',
    'txt': 'Text',
    'img': 'Image',
    'ico': 'Icon',
    'nav': 'Navigation',
    'menu': 'Menu',
    'dlg': 'Dialog',
    'frm': 'Form',
    'tbl': 'Table',
    'lst': 'List',
    'chk': 'Checkbox',
    'rad': 'Radio',
    'sel': 'Select',
    'inp': 'Input',
    'lbl': 'Label',
    'msg': 'Message',
    'notif': 'Notification',
    'alert': 'Alert',
    'modal': 'Modal',
    'pop': 'Popover',
    'tip': 'Tooltip',
    'card': 'Card',
    'badge': 'Badge',
    'avatar': 'Avatar',
    'progress': 'Progress',
    'spinner': 'Spinner',
    'toggle': 'Toggle',
    'switch': 'Switch',
    'tab': 'Tab',
    'accordion': 'Accordion',
    'drawer': 'Drawer',
    'breadcrumb': 'Breadcrumb',
    'pagination': 'Pagination',
    'stepper': 'Stepper',
    'timeline': 'Timeline',
    'chart': 'Chart',
    'graph': 'Graph',
    'grid': 'Grid',
    'layout': 'Layout',
    'container': 'Container',
    'wrapper': 'Wrapper',
    'group': 'Group',
    'stack': 'Stack',
    'flex': 'Flex',
    'box': 'Box',
    'divider': 'Divider',
    'spacer': 'Spacer'
  };
  
  // Process parts to extract name, variant, state, and type
  const nameParts: string[] = [];
  let isProcessingName = true;
  
  parts.forEach(part => {
    const lowerPart = part.toLowerCase();
    
    // Check if this part is a state, variant, or type
    if (statePatterns.includes(lowerPart)) {
      info.state = lowerPart;
      isProcessingName = false;
    } else if (variantPatterns.includes(lowerPart)) {
      info.variant = lowerPart;
      isProcessingName = false;
    } else if (isProcessingName) {
      // Check for type patterns
      for (const [componentType, patterns] of Object.entries(typePatterns)) {
        if (patterns.includes(lowerPart)) {
          info.type = lowerPart;
          isProcessingName = false;
          break;
        }
      }
      
      if (isProcessingName) {
        // Check if this part matches any special prefix
        const prefix = Object.entries(componentPrefixes).find(([key]) => 
          lowerPart.startsWith(key)
        );
        
        if (prefix) {
          nameParts.push(prefix[1]);
        } else {
          nameParts.push(part);
        }
      }
    }
  });
  
  // Convert remaining parts to PascalCase and normalize
  info.name = nameParts
    .map(part => {
      // Remove any non-letter characters
      const cleaned = part.replace(/[^a-zA-Z]/g, '');
      // Convert to PascalCase
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    })
    .join('');
  
  return info;
}

function sanitizeComponentName(name: string): string {
  // Remove any special characters except letters and spaces
  return name.replace(/[^a-zA-Z\s]/g, '');
}

interface ComponentGroup {
  name: string;
  variants: Set<string>;
  states: Set<string>;
  types: Set<string>;
  baseComponent?: Figma.ComponentMetadata;
}

const componentGroups: Map<string, ComponentGroup> = new Map();

function normalizeComponentName(name: string): string {
  // Common component name patterns
  const patterns = {
    // Buttons
    '^btn|button': 'Button',
    // Navigation
    '^nav|menu|tab|link|breadcrumb': 'Navigation',
    // Forms
    '^form|input|select|checkbox|radio|toggle|switch': 'Form',
    // Layout
    '^layout|container|grid|flex|box|divider|spacer': 'Layout',
    // Feedback
    '^alert|notification|toast|snackbar|progress|spinner': 'Feedback',
    // Data Display
    '^table|list|card|badge|avatar|chart|graph': 'DataDisplay',
    // Overlay
    '^modal|dialog|drawer|popover|tooltip': 'Overlay',
    // Typography
    '^text|heading|title|label|paragraph': 'Typography',
    // Icons
    '^icon|ico': 'Icon',
    // Media
    '^image|video|audio': 'Media'
  };

  // Find matching pattern
  for (const [pattern, group] of Object.entries(patterns)) {
    if (new RegExp(pattern, 'i').test(name)) {
      return group;
    }
  }

  return 'Other';
}

interface FigmaMetadata {
  variants?: string[];
  states?: string[];
  types?: string[];
}

function getDefaultVariants(groupName: string): string[] {
  switch (groupName) {
    case 'Button':
      return ['small', 'medium', 'large', 'primary', 'secondary', 'subtle'];
    case 'Typography':
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption'];
    case 'Form':
      return ['small', 'medium', 'large', 'inline', 'stacked'];
    case 'DataDisplay':
      return ['compact', 'comfortable', 'spacious'];
    case 'Navigation':
      return ['horizontal', 'vertical', 'dropdown', 'breadcrumb'];
    case 'Feedback':
      return ['toast', 'alert', 'notification', 'progress'];
    case 'Layout':
      return ['fixed', 'fluid', 'grid', 'flex'];
    case 'Overlay':
      return ['modal', 'dialog', 'drawer', 'popover', 'tooltip'];
    default:
      return [];
  }
}

function getDefaultStates(groupName: string): string[] {
  const commonStates = ['default', 'hover', 'active', 'disabled', 'focused'];
  switch (groupName) {
    case 'Button':
    case 'Form':
      return [...commonStates, 'loading', 'pressed'];
    case 'Navigation':
      return [...commonStates, 'selected', 'expanded', 'collapsed'];
    case 'Feedback':
      return [...commonStates, 'success', 'error', 'warning', 'info'];
    case 'Overlay':
      return [...commonStates, 'open', 'closed', 'animating'];
    default:
      return commonStates;
  }
}

function getDefaultTypes(groupName: string): string[] {
  switch (groupName) {
    case 'Button':
      return ['submit', 'reset', 'button'];
    case 'Form':
      return ['text', 'number', 'email', 'password', 'search', 'tel', 'url'];
    case 'Typography':
      return ['heading', 'body', 'caption', 'label', 'code'];
    case 'DataDisplay':
      return ['table', 'list', 'card', 'grid'];
    case 'Navigation':
      return ['link', 'button', 'menu', 'tab'];
    case 'Feedback':
      return ['info', 'success', 'warning', 'error'];
    case 'Layout':
      return ['container', 'row', 'column', 'grid'];
    case 'Overlay':
      return ['modal', 'dialog', 'drawer', 'popover', 'tooltip'];
    default:
      return [];
  }
}

function groupComponents(components: Figma.ComponentMetadata[]): void {
  // First pass: collect all variants, states, and types
  const defaultGroups = new Map<string, ComponentGroup>();
  
  components.forEach(component => {
    const info = parseComponentName(component.name);
    if (!info.name) {
      console.warn(`Skipping component with invalid name: ${component.name}`);
      return;
    }

    const groupName = normalizeComponentName(info.name);
    let group = defaultGroups.get(groupName);

    if (!group) {
      group = {
        name: groupName,
        variants: new Set(getDefaultVariants(groupName)),
        states: new Set(getDefaultStates(groupName)),
        types: new Set(getDefaultTypes(groupName)),
        baseComponent: undefined
      };
      defaultGroups.set(groupName, group);
    }

    // If this is a base component (no variant/state/type), store it
    if (!info.variant && !info.state && !info.type) {
      group.baseComponent = component;
    }

    if (info.variant) group.variants.add(info.variant);
    if (info.state) group.states.add(info.state);
    if (info.type) group.types.add(info.type);
  });

  // Second pass: analyze Figma component properties
  components.forEach(component => {
    const info = parseComponentName(component.name);
    if (!info.name) return;

    const groupName = normalizeComponentName(info.name);
    const group = defaultGroups.get(groupName)!;

    // Extract properties from Figma component
    if (component.description) {
      try {
        const metadata = JSON.parse(component.description) as FigmaMetadata;
        if (metadata.variants) {
          metadata.variants.forEach(v => group.variants.add(v));
        }
        if (metadata.states) {
          metadata.states.forEach(s => group.states.add(s));
        }
        if (metadata.types) {
          metadata.types.forEach(t => group.types.add(t));
        }
      } catch (e) {
        // If description is not valid JSON, ignore it
      }
    }

    // Extract properties from component name
    const nameParts = component.name.toLowerCase().split(/[-\s/]/);
    nameParts.forEach(part => {
      // Check if part matches any default variants/states/types
      if (getDefaultVariants(groupName).includes(part)) {
        group.variants.add(part);
      }
      if (getDefaultStates(groupName).includes(part)) {
        group.states.add(part);
      }
      if (getDefaultTypes(groupName).includes(part)) {
        group.types.add(part);
      }
    });
  });

  // Update the global componentGroups map
  defaultGroups.forEach((group, name) => {
    componentGroups.set(name, group);
  });
}

async function generateComponentGroup(groupName: string, group: ComponentGroup): Promise<void> {
  const groupDir = path.join(OUTPUT_DIR, groupName);
  await fs.mkdir(groupDir, { recursive: true });

  // Create components directory
  const componentsDir = path.join(groupDir, 'components');
  await fs.mkdir(componentsDir, { recursive: true });

  // Generate base component
  await generateBaseComponent(componentsDir, groupName, group);

  // Generate index file for the group
  const indexContent = `export * from './components';\n`;
  await fs.writeFile(path.join(groupDir, 'index.ts'), indexContent);

  // Generate types file with proper types
  const typesContent = `export type ${groupName}Variant = ${
    Array.from(group.variants).map(v => `'${v}'`).join(' | ') || 'never'
  };
export type ${groupName}State = ${
    Array.from(group.states).map(s => `'${s}'`).join(' | ') || 'never'
  };
export type ${groupName}Type = ${
    Array.from(group.types).map(t => `'${t}'`).join(' | ') || 'never'
  };
`;
  await fs.writeFile(path.join(groupDir, 'types.ts'), typesContent);

  // Generate stories in the components directory
  await generateStories(componentsDir, groupName, group);
}

function generateStories(componentsDir: string, groupName: string, group: ComponentGroup): Promise<void> {
  const storiesContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${groupName} } from './${groupName}';

const meta = {
  title: 'Components/${groupName}',
  component: ${groupName},
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
    ${group.variants.size > 0 ? `variant: {
      control: 'select',
      options: [${Array.from(group.variants).map(v => `'${v}'`).join(', ')}],
      defaultValue: 'medium',
    },` : ''}
    ${group.states.size > 0 ? `state: {
      control: 'select',
      options: [${Array.from(group.states).map(s => `'${s}'`).join(', ')}],
      defaultValue: 'default',
    },` : ''}
    ${group.types.size > 0 ? `type: {
      control: 'select',
      options: [${Array.from(group.types).map(t => `'${t}'`).join(', ')}],
    },` : ''}
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ${groupName}>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: '${groupName} Content',
    variant: 'medium',
    state: 'default',
  },
};

${Array.from(group.variants).map(variant => `
// ${variant} variant
export const ${variant.charAt(0).toUpperCase() + variant.slice(1)}: Story = {
  args: {
    children: '${groupName} ${variant}',
    variant: '${variant}',
    state: 'default',
  },
};`).join('\n')}

${Array.from(group.states).map(state => `
// ${state} state
export const ${state.charAt(0).toUpperCase() + state.slice(1)}: Story = {
  args: {
    children: '${groupName} ${state}',
    variant: 'medium',
    state: '${state}',
  },
};`).join('\n')}

${Array.from(group.types).map(type => `
// ${type} type
export const ${type.charAt(0).toUpperCase() + type.slice(1)}: Story = {
  args: {
    children: '${groupName} ${type}',
    variant: 'medium',
    state: 'default',
    type: '${type}',
  },
};`).join('\n')}
`;

  return fs.writeFile(path.join(componentsDir, `${groupName}.stories.tsx`), storiesContent);
}

function generateBaseComponent(componentsDir: string, groupName: string, group: ComponentGroup): Promise<void> {
  const componentContent = `import React from 'react';
import { ${groupName}Variant, ${groupName}State, ${groupName}Type } from '../types';
import './${groupName}.css';

export interface ${groupName}Props {
  children?: React.ReactNode;
  className?: string;
  variant?: ${groupName}Variant;
  state?: ${groupName}State;
  type?: ${groupName}Type;
}

export const ${groupName}: React.FC<${groupName}Props> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    '${groupName.toLowerCase()}',
    className,
    variant,
    state,
    type && \`type-\${type}\`,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes}
      data-variant={variant}
      data-state={state}
      data-type={type}
    >
      {children}
    </div>
  );
};

export default ${groupName};
`;

  const cssContent = `/* Base styles */
.${groupName.toLowerCase()} {
  display: block;
  font-family: var(--dos-global-typography-fonts-dos), var(--dos-global-typography-fonts-fallback);
  color: var(--dos-global-colors-dos-yellow);
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

/* Variants */
${Array.from(group.variants).map(variant => {
  switch (variant) {
    case 'small':
      return `.${groupName.toLowerCase()}.small {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}`;
    case 'medium':
      return `.${groupName.toLowerCase()}.medium {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}`;
    case 'large':
      return `.${groupName.toLowerCase()}.large {
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
}`;
    case 'primary':
      return `.${groupName.toLowerCase()}.primary {
  background-color: var(--dos-global-colors-dos-yellow);
  color: var(--dos-global-colors-dos-black);
  border-color: var(--dos-global-colors-dos-yellow);
}`;
    case 'secondary':
      return `.${groupName.toLowerCase()}.secondary {
  background-color: transparent;
  color: var(--dos-global-colors-dos-yellow);
  border-color: var(--dos-global-colors-dos-yellow);
}`;
    case 'subtle':
      return `.${groupName.toLowerCase()}.subtle {
  background-color: transparent;
  color: var(--dos-global-colors-dos-yellow);
  border-color: transparent;
}`;
    default:
      return `.${groupName.toLowerCase()}.${variant} {
  /* Add variant styles */
}`;
  }
}).join('\n\n')}

/* States */
${Array.from(group.states).map(state => {
  switch (state) {
    case 'hover':
      return `.${groupName.toLowerCase()}.hover,
.${groupName.toLowerCase()}:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}`;
    case 'active':
      return `.${groupName.toLowerCase()}.active,
.${groupName.toLowerCase()}:active {
  opacity: 0.6;
  transform: translateY(1px);
}`;
    case 'disabled':
      return `.${groupName.toLowerCase()}.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}`;
    case 'selected':
      return `.${groupName.toLowerCase()}.selected {
  background-color: var(--dos-global-colors-dos-yellow);
  color: var(--dos-global-colors-dos-black);
}`;
    case 'focused':
      return `.${groupName.toLowerCase()}.focused,
.${groupName.toLowerCase()}:focus {
  outline: 2px solid var(--dos-global-colors-dos-yellow);
  outline-offset: 2px;
}`;
    default:
      return `.${groupName.toLowerCase()}.${state} {
  /* Add state styles */
}`;
  }
}).join('\n\n')}

/* Types */
${Array.from(group.types).map(type => `
.${groupName.toLowerCase()}.type-${type} {
  /* Add type styles */
}`).join('\n')}
`;

  return Promise.all([
    fs.writeFile(path.join(componentsDir, `${groupName}.tsx`), componentContent),
    fs.writeFile(path.join(componentsDir, `${groupName}.css`), cssContent),
    fs.writeFile(path.join(componentsDir, 'index.ts'), `export * from './${groupName}';\n`)
  ]).then(() => {});
}

async function main() {
  try {
    // Get file data from Figma
    const file = await client.file(FIGMA_FILE_KEY as string);
    
    // Find all components in the file
    const components = Object.values(file.data.components || {});
    
    console.log(`Found ${components.length} components`);
    
    // Group components
    groupComponents(components);
    
    // Create components directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Generate component groups
    await Promise.all(
      Array.from(componentGroups.entries()).map(([name, group]) => 
        generateComponentGroup(name, group)
      )
    );
    
    console.log('Successfully generated React components!');
  } catch (error) {
    console.error('Error generating components:', error);
    process.exit(1);
  }
}

main(); 