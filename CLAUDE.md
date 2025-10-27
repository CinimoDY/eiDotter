# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

eiDotter is a DOS-themed React component library built with TypeScript. It provides authentic DOS/CGA terminal aesthetics for modern web applications, designed around the concept of a "Personal Timeline Stream" with command-line interaction patterns.

## Build and Development Commands

### Essential Commands
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint with TypeScript support
- `npm run test` - Run Jest test suite
- `npm run storybook` - Launch Storybook development server (port 6006)
- `npm run build-storybook` - Build static Storybook documentation

### Component Development
- `npm run create-component` - Generate new component scaffold with TypeScript + Storybook
- `npm run sync-to-figma` - Push components to Figma design system
- `npm run sync-from-figma` - Pull updates from Figma

## Architecture Overview

### Component Structure
The codebase follows a component-driven architecture with strict TypeScript typing:

```
src/components/
├── ComponentName/
│   ├── components/
│   │   ├── ComponentName.tsx      # Main component
│   │   ├── ComponentName.stories.tsx # Storybook stories
│   │   ├── ComponentName.test.tsx    # Jest tests
│   │   ├── ComponentName.css         # Component styles
│   │   └── index.ts                  # Component exports
│   └── index.ts                      # Public API
```

### Design Token System
- **Color Palette**: Authentic CGA 16-color system (`--color-cga-*` variables)
- **Typography**: DOS VGA 437 font with Consolas fallback
- **Tokens**: Generated via Style Dictionary from JSON sources
- **CSS Variables**: All styling uses CSS custom properties for theming

### Key Files
- `src/styles/tokens.css` - Generated design tokens (auto-generated, don't edit)
- `src/tokens/` - Token source files (colors.json, base.json, semantic.json)
- `style-dictionary.config.js` - Token generation configuration
- `vite.config.ts` - Vite configuration with path aliases (@)

### Component Standards
All components must follow these patterns:
- **TypeScript-first**: Complete prop interfaces with JSDoc
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA
- **DOS Authenticity**: Period-accurate CGA colors and terminal styling
- **Storybook Documentation**: Comprehensive stories with controls
- **CSS Modules**: Component-scoped CSS with BEM naming

### Testing Strategy
- **Unit Tests**: Jest + React Testing Library
- **Visual Tests**: Storybook for component documentation
- **Type Safety**: Strict TypeScript compilation

## Development Guidelines

### Component Creation
1. Use `npm run create-component <ComponentName>` to generate scaffold
2. Follow the existing component structure in `src/components/`
3. Implement proper TypeScript interfaces with JSDoc
4. Use design tokens from `src/styles/tokens.css`
5. Add comprehensive Storybook stories
6. Include Jest tests for functionality

### Cursor Rules Integration
The project includes comprehensive Cursor rules covering:
- Component system standards
- Design system architecture
- Theming guidelines
- Documentation requirements
- Accessibility standards

### Figma Integration
The project includes bidirectional sync with Figma design system:
- Components can be generated from Figma designs
- Code changes can be pushed back to Figma
- Requires FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY environment variables

## License and Usage

Licensed under CC-BY-NC-4.0 (Creative Commons Attribution-NonCommercial 4.0 International).