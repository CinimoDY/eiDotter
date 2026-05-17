import { config } from 'dotenv';
import * as Figma from 'figma-js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as glob from 'glob';
import { componentRegistry, projects } from '../src/components/registry';

// Load environment variables
config();

// Configuration
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
// Phase 3a.5(b): prefer FIGMA_WEB_DS_KEY for the Web DS file; fall back to FIGMA_FILE_KEY
// for backward compatibility with consumers still pointing at the legacy V.37 file key.
const FIGMA_FILE_KEY = process.env.FIGMA_WEB_DS_KEY || process.env.FIGMA_FILE_KEY;
const COMPONENTS_DIR = path.resolve(__dirname, '../src/components');

if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ Please set FIGMA_ACCESS_TOKEN and FIGMA_WEB_DS_KEY (or FIGMA_FILE_KEY) in your .env file');
  process.exit(1);
}

const client = Figma.Client({
  personalAccessToken: FIGMA_ACCESS_TOKEN
});

interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  variants: string[];
  states: string[];
  types: string[];
  props: ComponentProp[];
  storybookUrl?: string;
}

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

interface FigmaComponentPayload {
  name: string;
  description: string;
  componentSetId?: string;
  properties?: {
    [key: string]: {
      type: 'VARIANT' | 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP';
      defaultValue: string;
      variantOptions?: string[];
    };
  };
}

/**
 * Scans the components directory and extracts component metadata
 */
async function scanComponents(): Promise<ComponentMetadata[]> {
  console.log('🔍 Scanning components directory...');
  
  const components: ComponentMetadata[] = [];
  const componentDirs = await fs.readdir(COMPONENTS_DIR, { withFileTypes: true });
  
  for (const dir of componentDirs) {
    if (!dir.isDirectory()) continue;
    
    try {
      const componentPath = path.join(COMPONENTS_DIR, dir.name);
      const metadata = await extractComponentMetadata(componentPath, dir.name);
      if (metadata) {
        components.push(metadata);
        console.log(`✅ Found component: ${metadata.name}`);
      }
    } catch (error) {
      console.warn(`⚠️ Skipping ${dir.name}: ${error}`);
    }
  }
  
  return components;
}

/**
 * Extracts metadata from a single component directory
 */
async function extractComponentMetadata(componentPath: string, componentName: string): Promise<ComponentMetadata | null> {
  const componentsSubDir = path.join(componentPath, 'components');
  
  // Check if it's a valid component structure
  const tsxFile = path.join(componentsSubDir, `${componentName}.tsx`);
  const storiesFile = path.join(componentsSubDir, `${componentName}.stories.tsx`);
  
  try {
    await fs.access(tsxFile);
    await fs.access(storiesFile);
  } catch {
    return null; // Not a valid component structure
  }

  // Read component source code
  const componentSource = await fs.readFile(tsxFile, 'utf8');
  const storiesSource = await fs.readFile(storiesFile, 'utf8');

  // Extract metadata from source code
  const metadata: ComponentMetadata = {
    name: componentName,
    category: extractCategory(storiesSource),
    description: extractDescription(componentSource),
    variants: extractVariants(componentSource, storiesSource),
    states: extractStates(componentSource, storiesSource),
    types: extractTypes(componentSource, storiesSource), 
    props: extractProps(componentSource),
    storybookUrl: `https://cinimody.github.io/eiDotter/?path=/story/${extractCategory(storiesSource).toLowerCase()}-${componentName.toLowerCase()}--default`
  };

  return metadata;
}

function extractCategory(storiesSource: string): string {
  const match = storiesSource.match(/title:\s*['"`]([^/]+)\/[^'"`]+['"`]/);
  return match ? match[1] : 'Other';
}

function extractDescription(componentSource: string): string {
  const match = componentSource.match(/\/\*\*\s*\n\s*\*\s*([^*]+)\s*\n\s*\*/);
  return match ? match[1].trim() : '';
}

function extractVariants(componentSource: string, storiesSource: string): string[] {
  const variants = new Set<string>();
  
  // Extract from TypeScript type definition
  const typeMatch = componentSource.match(/variant\?\s*:\s*([^;]+);/);
  if (typeMatch) {
    const typeString = typeMatch[1];
    const variantMatches = typeString.match(/'([^']+)'/g);
    if (variantMatches) {
      variantMatches.forEach(match => variants.add(match.slice(1, -1)));
    }
  }
  
  // Extract from stories
  const storyMatches = storiesSource.match(/export const (\w+): Story/g);
  if (storyMatches) {
    storyMatches.forEach(match => {
      const storyName = match.replace('export const ', '').replace(': Story', '');
      if (!['Default', 'Interactive', 'AllVariants'].includes(storyName)) {
        variants.add(storyName.toLowerCase());
      }
    });
  }
  
  return Array.from(variants);
}

function extractStates(componentSource: string, storiesSource: string): string[] {
  const states = new Set<string>();
  
  // Extract from TypeScript type definition
  const typeMatch = componentSource.match(/state\?\s*:\s*([^;]+);/);
  if (typeMatch) {
    const typeString = typeMatch[1];
    const stateMatches = typeString.match(/'([^']+)'/g);
    if (stateMatches) {
      stateMatches.forEach(match => states.add(match.slice(1, -1)));
    }
  }
  
  return Array.from(states);
}

function extractTypes(componentSource: string, storiesSource: string): string[] {
  const types = new Set<string>();
  
  // Extract from TypeScript type definition
  const typeMatch = componentSource.match(/type\?\s*:\s*([^;]+);/);
  if (typeMatch) {
    const typeString = typeMatch[1];
    const typeMatches = typeString.match(/'([^']+)'/g);
    if (typeMatches) {
      typeMatches.forEach(match => types.add(match.slice(1, -1)));
    }
  }
  
  return Array.from(types);
}

function extractProps(componentSource: string): ComponentProp[] {
  const props: ComponentProp[] = [];
  
  // Extract interface definition
  const interfaceMatch = componentSource.match(/export interface \w+Props\s*{([^}]+)}/s);
  if (!interfaceMatch) return props;
  
  const interfaceContent = interfaceMatch[1];
  const propMatches = interfaceContent.match(/\/\*\*\s*\n\s*\*\s*([^*]+)\s*\n\s*\*\/\s*\n\s*(\w+)(\?)?:\s*([^;]+);/g);
  
  if (propMatches) {
    propMatches.forEach(match => {
      const propMatch = match.match(/\/\*\*\s*\n\s*\*\s*([^*]+)\s*\n\s*\*\/\s*\n\s*(\w+)(\?)?:\s*([^;]+);/s);
      if (propMatch) {
        props.push({
          name: propMatch[2],
          type: propMatch[4].trim(),
          required: !propMatch[3],
          description: propMatch[1].trim()
        });
      }
    });
  }
  
  return props;
}

/**
 * Gets the current Figma file structure
 */
async function getFigmaFile(): Promise<Figma.FileResponse> {
  console.log('🎨 Fetching Figma file...');

  if (!FIGMA_FILE_KEY) {
    // This check is redundant due to the top-level check, but it satisfies TypeScript's static analysis.
    throw new Error('FIGMA_FILE_KEY is not set. Please check your .env file.');
  }
  
  try {
    const file = await client.file(FIGMA_FILE_KEY);
    return file.data;
  } catch (error) {
    console.error('❌ Failed to fetch Figma file:', error);
    throw error;
  }
}

/**
 * Creates or updates components in Figma
 */
async function syncComponentsToFigma(components: ComponentMetadata[]): Promise<void> {
  console.log('🚀 Syncing components to Figma...');
  
  const figmaFile = await getFigmaFile();
  
  for (const component of components) {
    try {
      await syncSingleComponent(component, figmaFile);
      console.log(`✅ Synced ${component.name} to Figma`);
    } catch (error) {
      console.error(`❌ Failed to sync ${component.name}:`, error);
    }
  }
}

async function syncSingleComponent(component: ComponentMetadata, figmaFile: Figma.FileResponse): Promise<void> {
  // Create Figma component description with metadata
  const figmaDescription = JSON.stringify({
    description: component.description,
    variants: component.variants,
    states: component.states,
    types: component.types,
    props: component.props,
    category: component.category,
    storybookUrl: component.storybookUrl,
    syncedAt: new Date().toISOString(),
    source: 'eiDotter-IDE'
  }, null, 2);

  // Find existing component or create new one
  const existingComponent = findComponentInFigma(figmaFile, component.name);
  
  if (existingComponent) {
    // Update existing component
    console.log(`📝 Updating existing component: ${component.name}`);
    // Note: Figma API doesn't allow direct component updates
    // This would require creating a new version or notifying designers
    await notifyFigmaUpdate(component, existingComponent);
  } else {
    // Create component specification for designers
    console.log(`✨ Creating component specification: ${component.name}`);
    await createComponentSpecification(component, figmaDescription);
  }
}

function findComponentInFigma(figmaFile: Figma.FileResponse, componentName: string): any {
  // Recursively search for component in Figma file structure
  function searchNode(node: any): any {
    if (node.type === 'COMPONENT' && node.name === componentName) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const found = searchNode(child);
        if (found) return found;
      }
    }
    return null;
  }

  return searchNode(figmaFile.document);
}

async function notifyFigmaUpdate(component: ComponentMetadata, existingComponent: any): Promise<void> {
  // Since we can't directly update Figma components via API,
  // we'll create a notification system or documentation update
  console.log(`📋 Component ${component.name} exists in Figma`);
  console.log(`   • Variants: ${component.variants.join(', ')}`);
  console.log(`   • States: ${component.states.join(', ')}`);
  console.log(`   • Types: ${component.types.join(', ')}`);
  console.log(`   • Storybook: ${component.storybookUrl}`);
  
  // Could implement:
  // - Post to Figma comments
  // - Update component description
  // - Send Slack notification
  // - Create GitHub issue for designer review
}

async function createComponentSpecification(component: ComponentMetadata, description: string): Promise<void> {
  // Create a specification document that designers can use
  // Output to figma-specs/ at repo root, not docs/figma-specs/. The docs/ tree is
  // wiped on every Storybook build (`storybook build -o docs`), which would
  // silently delete every spec file written here.
  const specFile = path.join(__dirname, '../figma-specs', `${component.name}.md`);
  
  // Ensure directory exists
  await fs.mkdir(path.dirname(specFile), { recursive: true });
  
  const registryMeta = componentRegistry[component.name];
  const originInfo = registryMeta
    ? `\n## Origin\n${projects[registryMeta.origin].displayName}${registryMeta.originNote ? ` — ${registryMeta.originNote}` : ''}\n\n## Used By\n${registryMeta.consumers.map(id => `- ${projects[id].displayName}`).join('\n') || '- (none)'}\n`
    : '';

  const specification = `# ${component.name} Component Specification

## Overview
${component.description}
${originInfo}
## Category
${component.category}

## Variants
${component.variants.map(v => `- ${v}`).join('\n')}

## States  
${component.states.map(s => `- ${s}`).join('\n')}

## Types
${component.types.map(t => `- ${t}`).join('\n')}

## Props
${component.props.map(p => `- **${p.name}** (${p.type}${p.required ? ', required' : ', optional'}): ${p.description}`).join('\n')}

## Storybook
[View in Storybook](${component.storybookUrl})

## Design Tokens
This component should use the following design tokens:
- Colors: DOS CGA palette (--dos-yellow, --dos-black, etc.)
- Typography: --dos-font-primary (Perfect DOS VGA 437)  
- Spacing: --dos-spacing-* scale
- Borders: --dos-window-border

## Figma Metadata
\`\`\`json
${description}
\`\`\`

---
*Generated by eiDotter sync-to-figma script on ${new Date().toISOString()}*
`;

  await fs.writeFile(specFile, specification);
  console.log(`📄 Created specification: figma-specs/${component.name}.md`);
}

/**
 * Main sync function
 */
async function main(): Promise<void> {
  console.log('🔄 Starting IDE → Figma sync...\n');
  
  try {
    // Scan local components
    const components = await scanComponents();
    
    if (components.length === 0) {
      console.log('⚠️ No components found to sync');
      return;
    }
    
    console.log(`\n📊 Found ${components.length} components to sync:`);
    components.forEach(c => console.log(`   • ${c.category}/${c.name}`));
    
    // Sync to Figma
    await syncComponentsToFigma(components);
    
    console.log('\n🎉 Sync completed successfully!');
    console.log('\n📋 Next steps for designers:');
    console.log('1. Review component specifications in figma-specs/');
    console.log('2. Create/update corresponding Figma components');
    console.log('3. Use the provided design tokens and guidelines');
    console.log('4. Test components in Storybook using provided URLs');
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// Run the sync
if (require.main === module) {
  main().catch(console.error);
}