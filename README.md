# eiDotter 🖥️ - DOS Terminal Design System

[![npm version](https://img.shields.io/npm/v/eidotter.svg)](https://www.npmjs.com/package/eidotter)
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-blue.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub issues](https://img.shields.io/github/issues/CinimoDY/eiDotter.svg)](https://github.com/CinimoDY/eiDotter/issues)
[![GitHub stars](https://img.shields.io/github/stars/CinimoDY/eiDotter.svg)](https://github.com/CinimoDY/eiDotter/stargazers)
[![Build Status](https://img.shields.io/github/actions/workflow/status/CinimoDY/eiDotter/build.yml?branch=main)](https://github.com/CinimoDY/eiDotter/actions)
[![Storybook](https://img.shields.io/badge/storybook-view-FF4785?logo=storybook)](https://cinimody.github.io/eiDotter)

> **A Personal Timeline Stream meets DOS Terminal Design System**

Welcome to eiDotter! This is a DOS-themed React component library that brings retro terminal aesthetics to modern web applications. Built with TypeScript and documented with Storybook, eiDotter provides a collection of customizable UI components designed around the metaphor of a **Personal Timeline Stream** with command-line interaction patterns.

## 🧭 Core Vision: Terminal-First Design System

eiDotter embodies a unique interface philosophy combining:
- **Temporal Navigation**: Timeline-based interaction patterns
- **Command Interface**: DOS-inspired shell with AI assistance  
- **Modeless Design**: Consistent, predictable interactions
- **Habitual Use**: Components designed for muscle memory
- **Two-Way Sync**: Seamless Figma ↔ IDE workflow

## 📢 Important Notice

> The npm package is temporarily unavailable due to maintenance. Please use the GitHub installation method below until we republish to npm (expected within 24 hours).

## 🌟 Features

### 🎨 Design System Features
- **DOS-Authentic Color Palette**: CGA-based 16-color system with period accuracy
- **Terminal Typography**: Perfect DOS VGA 437 font with Consolas fallback
- **Component-Driven Architecture**: Modular, composable UI primitives
- **Design Token System**: Style Dictionary powered theming
- **Accessibility-First**: WCAG compliant with DOS aesthetics

### 🖥️ Terminal Interface Components  
- **CommandPrompt**: Interactive command-line interface
- **Terminal**: Full DOS terminal window with authentic chrome
- **FileExplorer**: DOS-style file browser and navigation
- **WindowFrame**: Classic DOS window management
- **StatusBar**: System information and context display

### 🔄 Development Workflow
- **Figma Integration**: Two-way sync between design and code
- **Storybook Documentation**: Interactive component playground
- **TypeScript Support**: Full type safety and IntelliSense
- **Automated Component Generation**: Figma → React → Storybook pipeline
- **Hot Reloading**: Real-time development experience

## 📦 Installation

### Current Recommended Method (GitHub):
Add this to your `package.json`:
```json
{
  "dependencies": {
    "eidotter": "CinimoDY/eiDotter#v0.2.0"
  }
}
```

Then run:
```bash
npm install
# or
yarn install
```

### npm/yarn (temporarily unavailable):
These methods will be available again soon:
```bash
npm install eidotter  # temporarily unavailable
yarn add eidotter     # temporarily unavailable
```

## 🚀 Quick Start Guide

### Basic Terminal Interface
```jsx
import { Terminal, CommandPrompt, StatusBar } from 'eidotter';

function DOSApp() {
  return (
    <Terminal title="EIDOTTER.EXE">
      <CommandPrompt 
        prompt="C:\>"
        onCommand={(cmd) => handleCommand(cmd)}
        history={commandHistory}
      />
      <StatusBar 
        items={[
          { key: 'time', value: new Date().toLocaleTimeString() },
          { key: 'mode', value: 'READY' }
        ]}
      />
    </Terminal>
  );
}
```

### Timeline Stream Interface
```jsx
import { Timeline, Filter, Search } from 'eidotter';

function TimelineApp() {
  return (
    <div>
      <Search placeholder="search timeline..." />
      <Filter 
        axes={['temporal', 'thematic', 'social']}
        onFilter={handleFilter}
      />
      <Timeline 
        items={timelineData}
        viewMode="stream"
      />
    </div>
  );
}
```

## 🏗️ Architecture & Design Principles

### Core Metaphor: Personal Timeline Stream
The interface centers around three intersecting axes:
- **Temporal** (when): Time-based navigation and organization
- **Thematic** (what): Content categorization and filtering  
- **Social** (who): User context and collaboration

### Design Principles
1. **Task-Focused**: Components help, never distract from the task
2. **Modeless & Monotonous**: Same gesture always yields same result
3. **Reliable**: Never lose user work or data
4. **Efficient**: Optimize for minimal interaction time
5. **Testing-Driven**: All components tested with real users
6. **Visually Appealing**: Clean design supports function

## 📚 Component Categories

### 🖥️ Terminal Components
- **Terminal**: DOS window with title bar and controls
- **CommandPrompt**: Interactive command line with history
- **OutputDisplay**: Formatted command output rendering
- **FileExplorer**: DOS-style file browser
- **ProcessViewer**: Running process display

### 📊 Timeline Components  
- **Timeline**: Main timeline stream visualization
- **TimelineItem**: Individual timeline entries
- **Filter**: Multi-axis filtering controls
- **Search**: Timeline search with AI suggestions
- **Navigator**: Time period navigation

### 🎛️ Form Controls
- **Button**: DOS-style buttons with authentic styling
- **Input**: Text input with DOS cursor
- **Checkbox**: Classic DOS checkbox styling
- **Radio**: DOS radio button groups
- **Select**: DOS dropdown menus

### 📝 Data Display
- **Table**: DOS-formatted data tables
- **Card**: Information cards with DOS chrome
- **Badge**: Status and counter indicators
- **Progress**: DOS-style progress bars
- **Alert**: System notifications and messages

### 🧭 Navigation  
- **Menu**: DOS menu bars and dropdowns
- **Tabs**: DOS-style tab navigation
- **Breadcrumb**: Path navigation
- **Pagination**: DOS-style page controls

### 🎪 Layout & Structure
- **Grid**: DOS-compatible grid system
- **Container**: DOS window containers
- **Stack**: Vertical and horizontal stacking
- **Divider**: DOS-style separators

## 🔄 Development Workflow: IDE ↔ Figma Sync

### Component Creation Process

1. **Create in Storybook First**
   ```bash
   npm run create-component MyComponent
   # Generates: Storybook page + component scaffold + documentation
   ```

2. **Design in Figma**
   ```bash
   npm run sync-to-figma
   # Creates Figma components from Storybook definitions
   ```

3. **Iterate & Sync**
   ```bash
   npm run sync-from-figma  # Pull Figma updates
   npm run sync-to-figma    # Push code updates
   ```

### Workflow Commands
```bash
# Component Development
npm run create-component <name>     # Create new component with Storybook
npm run generate-from-figma         # Generate components from Figma
npm run sync-to-figma              # Push components to Figma
npm run sync-from-figma            # Pull updates from Figma

# Development
npm run dev                        # Watch mode development
npm run storybook                  # Launch Storybook
npm run build-tokens              # Generate design tokens
npm run test-components           # Run component tests

# Documentation
npm run build-storybook           # Build static documentation
npm run deploy                    # Deploy to GitHub Pages
```

## 🎨 Design Token System

### Color System (CGA Authentic)
```css
/* Primary DOS Colors */
--dos-black: #000000;
--dos-blue: #0000AA;
--dos-green: #00AA00;
--dos-cyan: #00AAAA;
--dos-red: #AA0000;
--dos-magenta: #AA00AA;
--dos-brown: #AA5500;
--dos-light-gray: #AAAAAA;

/* Bright Variants */
--dos-dark-gray: #555555;
--dos-bright-blue: #5555FF;
--dos-bright-green: #55FF55;
--dos-bright-cyan: #55FFFF;
--dos-bright-red: #FF5555;
--dos-bright-magenta: #FF55FF;
--dos-yellow: #FFFF55;
--dos-white: #FFFFFF;
```

### Typography System
```css
/* DOS Typography */
--dos-font-primary: "Perfect DOS VGA 437", "Consolas", monospace;
--dos-font-size-base: 16px;
--dos-line-height-terminal: 1.2;
--dos-letter-spacing-wide: 0.8px;
```

### Component Tokens
```css
/* Window System */
--dos-window-border: 2px solid var(--dos-yellow);
--dos-window-title-height: 32px;
--dos-window-control-size: 24px;

/* Terminal Interface */  
--dos-cursor-blink: 1s;
--dos-prompt-color: var(--dos-yellow);
--dos-output-color: var(--dos-light-gray);
```

## 📋 Development Guidelines

### Component Standards
- **TypeScript First**: All components must have complete type definitions
- **Storybook Documentation**: Every component needs comprehensive stories
- **Token Compliance**: Must use design tokens, never hardcode values
- **Accessibility**: WCAG 2.1 AA compliance required
- **DOS Authenticity**: Period-accurate color and typography only

### File Structure Convention
```
src/components/
├── Terminal/
│   ├── components/
│   │   ├── Terminal.tsx
│   │   ├── Terminal.stories.tsx
│   │   ├── Terminal.css
│   │   └── index.ts
│   ├── types.ts
│   └── index.ts
```

### Command Interface Standards  
```typescript
interface Command {
  name: string;
  description: string;
  usage: string;
  handler: (args: string[]) => Promise<CommandResult>;
  completion?: (partial: string) => string[];
}

// Core Commands
> help           // Show available commands
> whoami         // Display current context  
> search <query> // Timeline search
> share <item>   // Content sharing
> fetch <source> // Content retrieval

// Mode Switching
> journal        // Notes/writing mode
> finance        // Financial tracking  
> blog           // Publishing mode
> voice          // Audio interface
```

## 🧪 Testing Strategy

### Component Testing
- **Unit Tests**: Jest + React Testing Library
- **Visual Tests**: Chromatic visual regression
- **Accessibility Tests**: axe-core integration
- **Performance Tests**: Bundle size monitoring

### User Experience Testing
- **Usability Testing**: Regular user feedback sessions
- **Accessibility Testing**: Screen reader compatibility
- **Performance Testing**: Core Web Vitals monitoring
- **Cross-browser Testing**: Modern browser support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/CinimoDY/eiDotter.git
cd eiDotter
npm install
cp .env.example .env  # Add your Figma tokens
npm run dev
```

### Component Contribution Workflow
1. **Create Issue**: Describe the component need
2. **Design in Figma**: Create component variants
3. **Generate Scaffold**: `npm run create-component YourComponent`
4. **Implement**: Build component following guidelines
5. **Document**: Add comprehensive Storybook stories
6. **Test**: Ensure all tests pass
7. **Submit PR**: Follow PR template

## 🐛 Bug Reports & Feature Requests

- [Bug Report Template](https://github.com/CinimoDY/eiDotter/issues/new?template=bug_report.md)
- [Feature Request Template](https://github.com/CinimoDY/eiDotter/issues/new?template=feature_request.md)
- [Component Request Template](https://github.com/CinimoDY/eiDotter/issues/new?template=component_request.md)

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License - see the [LICENSE](./LICENSE.md) file for details.

## 🙏 Acknowledgments

- Inspired by the classic DOS interface and terminal computing
- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Documented with [Storybook](https://storybook.js.org/)
- Design system powered by [Figma](https://www.figma.com/) and [Style Dictionary](https://amzn.github.io/style-dictionary/)
- Terminal interface principles from [The Design of Everyday Things](https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things)

## 🔒 Security & Development Notes

### Environment Setup
Never commit the `.env` file. Required environment variables:

```bash
# Figma Integration
FIGMA_ACCESS_TOKEN=your_figma_token_here
FIGMA_FILE_KEY=your_figma_file_key_here

# Storybook Chromatic
CHROMATIC_PROJECT_TOKEN=your_chromatic_token_here
```

### Figma Access Tokens
1. Create token at [Figma Access Tokens](https://www.figma.com/developers/api#access-tokens)
2. Add to your local `.env` file
3. Never expose tokens in code or commits

---

**Ready to build the future of terminal interfaces? Let's make computing personal again.** 🚀