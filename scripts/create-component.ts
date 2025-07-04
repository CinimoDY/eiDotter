import { config } from 'dotenv';
import * as fs from 'fs/promises';
import * as path from 'path';
import { execSync } from 'child_process';

// Load environment variables
config();

interface ComponentConfig {
  name: string;
  category: string;
  description: string;
  variants: string[];
  states: string[];
  types: string[];
  props: ComponentProp[];
}

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

const CATEGORIES = {
  Terminal: {
    description: 'DOS terminal interface components',
    defaultVariants: ['small', 'medium', 'large'],
    defaultStates: ['default', 'active', 'disabled'],
    defaultTypes: ['window', 'dialog', 'popup']
  },
  Timeline: {
    description: 'Timeline stream visualization components',
    defaultVariants: ['compact', 'comfortable', 'spacious'],
    defaultStates: ['default', 'loading', 'error'],
    defaultTypes: ['item', 'group', 'filter']
  },
  Form: {
    description: 'DOS-style form controls',
    defaultVariants: ['small', 'medium', 'large'],
    defaultStates: ['default', 'hover', 'active', 'disabled', 'focused'],
    defaultTypes: ['text', 'number', 'password', 'search']
  },
  Navigation: {
    description: 'DOS navigation components',
    defaultVariants: ['horizontal', 'vertical', 'dropdown'],
    defaultStates: ['default', 'active', 'selected', 'disabled'],
    defaultTypes: ['menu', 'tab', 'breadcrumb', 'pagination']
  },
  DataDisplay: {
    description: 'Data presentation components',
    defaultVariants: ['compact', 'comfortable', 'spacious'],
    defaultStates: ['default', 'loading', 'empty', 'error'],
    defaultTypes: ['table', 'list', 'card', 'grid']
  },
  Feedback: {
    description: 'User feedback and notification components',
    defaultVariants: ['small', 'medium', 'large'],
    defaultStates: ['default', 'success', 'warning', 'error', 'info'],
    defaultTypes: ['alert', 'toast', 'modal', 'progress']
  },
  Layout: {
    description: 'Layout and structural components',
    defaultVariants: ['fixed', 'fluid', 'responsive'],
    defaultStates: ['default', 'collapsed', 'expanded'],
    defaultTypes: ['container', 'grid', 'flex', 'stack']
  }
};

function generateComponentTSX(config: ComponentConfig): string {
  const propsInterface = config.props.length > 0 ? 
    config.props.map(prop => 
      `  /**\n   * ${prop.description}\n   */\n  ${prop.name}${prop.required ? '' : '?'}: ${prop.type};`
    ).join('\n') : 
    '  /**\n   * Content to display\n   */\n  children?: React.ReactNode;';

  const defaultProps = config.props
    .filter(prop => prop.defaultValue)
    .map(prop => `  ${prop.name} = ${prop.defaultValue}`)
    .join(',\n');

  return `import React from 'react';
import './${config.name}.css';

export interface ${config.name}Props {
${propsInterface}
${config.variants.length > 0 ? `  /**\n   * The variant of the ${config.name.toLowerCase()}\n   */\n  variant?: ${config.variants.map(v => `'${v}'`).join(' | ')};` : ''}
${config.states.length > 0 ? `  /**\n   * The state of the ${config.name.toLowerCase()}\n   */\n  state?: ${config.states.map(s => `'${s}'`).join(' | ')};` : ''}
${config.types.length > 0 ? `  /**\n   * The type of the ${config.name.toLowerCase()}\n   */\n  type?: ${config.types.map(t => `'${t}'`).join(' | ')};` : ''}
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * ${config.description}
 * 
 * This component follows DOS terminal design principles:
 * - Consistent visual hierarchy
 * - High contrast colors for accessibility
 * - Monospace typography for authenticity
 * - Predictable interaction patterns
 */
export const ${config.name}: React.FC<${config.name}Props> = ({
${defaultProps ? defaultProps + ',' : ''}
  ${config.variants.length > 0 ? `variant = '${config.variants[0]}',` : ''}
  ${config.states.length > 0 ? `state = '${config.states[0]}',` : ''}
  ${config.types.length > 0 ? `type,` : ''}
  className = '',
  ${config.props.length > 0 ? '...props' : 'children'}
}) => {
  const classes = [
    '${config.name.toLowerCase()}',
    ${config.variants.length > 0 ? `variant && \`${config.name.toLowerCase()}--\${variant}\`,` : ''}
    ${config.states.length > 0 ? `state && \`${config.name.toLowerCase()}--\${state}\`,` : ''}
    ${config.types.length > 0 ? `type && \`${config.name.toLowerCase()}--\${type}\`,` : ''}
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes}
      ${config.props.some(p => p.name.startsWith('on')) ? '{...props}' : ''}
    >
      ${config.props.length > 0 ? '{/* Component implementation based on props */}' : '{children}'}
    </div>
  );
};

export default ${config.name};`;
}

function generateComponentCSS(config: ComponentConfig): string {
  return `/* ${config.name} Component Styles */
/* ${config.description} */

.${config.name.toLowerCase()} {
  /* Base DOS styling using design tokens */
  font-family: var(--dos-font-primary);
  background-color: var(--dos-black);
  color: var(--dos-yellow);
  border: 1px solid var(--dos-yellow);
}

${config.variants.map(variant => `
/* ${variant} variant */
.${config.name.toLowerCase()}--${variant} {
  /* Variant-specific styles */
}
`).join('')}

${config.states.map(state => `
/* ${state} state */
.${config.name.toLowerCase()}--${state} {
  /* State-specific styles */
}
`).join('')}

${config.types.map(type => `
/* ${type} type */
.${config.name.toLowerCase()}--${type} {
  /* Type-specific styles */
}
`).join('')}

/* Accessibility and responsive considerations */
@media (prefers-reduced-motion: reduce) {
  .${config.name.toLowerCase()} {
    animation: none;
    transition: none;
  }
}`;
}

function generateStoriesFile(config: ComponentConfig): string {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${config.name} } from './${config.name}';

const meta = {
  title: '${config.category}/${config.name}',
  component: ${config.name},
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    docs: {
      description: {
        component: \`
## ${config.name}

${config.description}

### Design Principles
- **DOS Authenticity**: Uses period-accurate CGA colors and DOS VGA font
- **Accessibility**: WCAG 2.1 AA compliant with high contrast
- **Consistency**: Predictable behavior across all states
- **Terminal Focus**: Designed for command-line interface patterns

### Usage Guidelines
- Always use design tokens instead of hardcoded values
- Test with keyboard navigation and screen readers
- Maintain DOS aesthetic while ensuring modern usability
        \`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
${config.variants.length > 0 ? `    variant: {
      control: 'select',
      options: [${config.variants.map(v => `'${v}'`).join(', ')}],
      description: 'Visual variant of the component',
    },` : ''}
${config.states.length > 0 ? `    state: {
      control: 'select', 
      options: [${config.states.map(s => `'${s}'`).join(', ')}],
      description: 'Interactive state of the component',
    },` : ''}
${config.types.length > 0 ? `    type: {
      control: 'select',
      options: [${config.types.map(t => `'${t}'`).join(', ')}],
      description: 'Semantic type of the component',
    },` : ''}
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ${config.name}>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: '${config.name} Component',
    ${config.variants.length > 0 ? `variant: '${config.variants[0]}',` : ''}
    ${config.states.length > 0 ? `state: '${config.states[0]}',` : ''}
  },
};

${config.variants.map(variant => `
// ${variant} variant
export const ${variant.charAt(0).toUpperCase() + variant.slice(1)}: Story = {
  args: {
    children: '${config.name} ${variant}',
    variant: '${variant}',
    ${config.states.length > 0 ? `state: '${config.states[0]}',` : ''}
  },
};`).join('\n')}

${config.states.map(state => `
// ${state} state  
export const ${state.charAt(0).toUpperCase() + state.slice(1)}: Story = {
  args: {
    children: '${config.name} ${state}',
    ${config.variants.length > 0 ? `variant: '${config.variants[0]}',` : ''}
    state: '${state}',
  },
};`).join('\n')}

// Interactive examples
export const Interactive: Story = {
  args: {
    children: 'Interactive ${config.name}',
    ${config.variants.length > 0 ? `variant: '${config.variants[0]}',` : ''}
    ${config.states.length > 0 ? `state: '${config.states[0]}',` : ''}
  },
  parameters: {
    docs: {
      description: {
        story: 'Try interacting with this component to see different states.'
      }
    }
  }
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      ${config.variants.map(variant => `
      <${config.name} variant="${variant}">
        ${variant} variant
      </${config.name}>`).join('')}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available variants displayed together.'
      }
    }
  }
};`;
}

function generateIndexFile(config: ComponentConfig): string {
  return `export { ${config.name} } from './${config.name}';
export type { ${config.name}Props } from './${config.name}';
export default ${config.name};`;
}

function generateTypesFile(config: ComponentConfig): string {
  return `export type ${config.name}Variant = ${
    config.variants.length > 0 ? config.variants.map(v => `'${v}'`).join(' | ') : 'never'
  };

export type ${config.name}State = ${
    config.states.length > 0 ? config.states.map(s => `'${s}'`).join(' | ') : 'never'  
  };

export type ${config.name}Type = ${
    config.types.length > 0 ? config.types.map(t => `'${t}'`).join(' | ') : 'never'
  };`;
}

async function createComponent(componentName: string): Promise<void> {
  console.log(`🚀 Creating component: ${componentName}`);

  // Interactive prompts for component configuration
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      readline.question(query, resolve);
    });
  };

  try {
    // Get component configuration
    console.log('\n📝 Component Configuration:');
    console.log('Available categories:', Object.keys(CATEGORIES).join(', '));
    
    const category = await question('Category: ');
    if (!CATEGORIES[category as keyof typeof CATEGORIES]) {
      throw new Error(`Invalid category. Choose from: ${Object.keys(CATEGORIES).join(', ')}`);
    }

    const description = await question('Description: ');
    
    console.log('\n🎨 Customization (press Enter for defaults):');
    const variantsInput = await question(`Variants (default: ${CATEGORIES[category as keyof typeof CATEGORIES].defaultVariants.join(', ')}): `);
    const statesInput = await question(`States (default: ${CATEGORIES[category as keyof typeof CATEGORIES].defaultStates.join(', ')}): `);
    const typesInput = await question(`Types (default: ${CATEGORIES[category as keyof typeof CATEGORIES].defaultTypes.join(', ')}): `);

    const config: ComponentConfig = {
      name: componentName,
      category,
      description: description || `A ${componentName} component for the DOS terminal interface`,
      variants: variantsInput ? variantsInput.split(',').map(s => s.trim()) : CATEGORIES[category as keyof typeof CATEGORIES].defaultVariants,
      states: statesInput ? statesInput.split(',').map(s => s.trim()) : CATEGORIES[category as keyof typeof CATEGORIES].defaultStates,
      types: typesInput ? typesInput.split(',').map(s => s.trim()) : CATEGORIES[category as keyof typeof CATEGORIES].defaultTypes,
      props: [] // Could be enhanced to collect custom props
    };

    // Create component directory structure
    const componentDir = path.resolve(__dirname, `../src/components/${componentName}`);
    const componentsSubDir = path.join(componentDir, 'components');
    
    await fs.mkdir(componentDir, { recursive: true });
    await fs.mkdir(componentsSubDir, { recursive: true });

    // Generate files
    console.log('\n📁 Generating files...');
    
    await fs.writeFile(
      path.join(componentsSubDir, `${componentName}.tsx`),
      generateComponentTSX(config)
    );
    console.log(`✅ Created ${componentName}.tsx`);

    await fs.writeFile(
      path.join(componentsSubDir, `${componentName}.css`),
      generateComponentCSS(config)
    );
    console.log(`✅ Created ${componentName}.css`);

    await fs.writeFile(
      path.join(componentsSubDir, `${componentName}.stories.tsx`),
      generateStoriesFile(config)
    );
    console.log(`✅ Created ${componentName}.stories.tsx`);

    await fs.writeFile(
      path.join(componentsSubDir, 'index.ts'),
      generateIndexFile(config)
    );
    console.log(`✅ Created component index.ts`);

    await fs.writeFile(
      path.join(componentDir, 'index.ts'),
      `export * from './components';\n`
    );
    console.log(`✅ Created main index.ts`);

    await fs.writeFile(
      path.join(componentDir, 'types.ts'),
      generateTypesFile(config)
    );
    console.log(`✅ Created types.ts`);

    console.log(`\n🎉 Component ${componentName} created successfully!`);
    console.log(`\n📖 Next steps:`);
    console.log(`1. Review and customize the generated files`);
    console.log(`2. Run: npm run storybook`);
    console.log(`3. Navigate to ${category}/${componentName} in Storybook`);
    console.log(`4. Implement your component logic`);
    console.log(`5. Run: npm run sync-to-figma (to push to Figma)`);

  } catch (error) {
    console.error('❌ Error creating component:', error);
    process.exit(1);
  } finally {
    readline.close();
  }
}

// Main execution
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: npm run create-component <ComponentName>');
  process.exit(1);
}

// Validate component name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Component name must be in PascalCase (e.g., MyComponent)');
  process.exit(1);
}

createComponent(componentName).catch(console.error);