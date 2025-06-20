# eiDotter Design Principles

> **Core Philosophy**: A Personal Timeline Stream intersected by terminal computing patterns

## 🧭 Foundational Metaphors

### Personal Timeline Stream
The interface is built around three intersecting axes:

- **Temporal Axis (When)**: Time-based navigation and organization
- **Thematic Axis (What)**: Content categorization and filtering  
- **Social Axis (Who)**: User context and collaboration

### Terminal Computing Heritage
- DOS-authentic visual language with CGA color accuracy
- Command-line interaction patterns with AI assistance
- Monospace typography for technical authenticity
- Window management reflecting DOS conventions

## 🎯 Interface Design Principles

### 1. Task-Focused Design
- **Components help, never distract** from the user's primary task
- Design for habitual use and muscle memory development
- Understand gestures: Actions become automatic through repetition
- Every interface element should contribute to task completion

### 2. Modeless & Monotonous  
- Components must be **modeless** - same gesture always yields same result
- One clear, unambiguous way to accomplish each action
- Avoid state-dependent behavior that could surprise users
- Consistent interaction patterns across all components

### 3. Reliability Above All
- **Never lose user work or data** under any circumstances
- Implement comprehensive error handling and recovery
- Save state automatically where appropriate
- Graceful degradation when systems fail

### 4. Efficiency & Simplicity
- Optimize for **minimal interaction time** to complete tasks
- Remove unnecessary complexity and cognitive load
- Follow GOMS model principles for interaction design
- Every click/keystroke should advance the user's goal

### 5. Testing-Driven Design
- All components must be **tested with real users**
- Iterate based on quantitative user feedback
- Document known use cases and edge cases
- Measure and optimize interaction performance

### 6. Visual Appeal Supporting Function
- Clean, consistent design language
- Pleasant messaging and micro-interactions
- Visual design supports function, never overshadows it
- Authentic DOS aesthetics with modern usability

## 🖥️ Terminal Interface Standards

### Command Interface Design
```typescript
interface Command {
  name: string;          // Short, memorable command name
  description: string;   // Clear purpose description
  usage: string;         // Usage pattern with examples
  handler: (args: string[]) => Promise<CommandResult>;
  completion?: (partial: string) => string[]; // Tab completion
}
```

### Core Command Categories
- **Navigation**: `help`, `whoami`, `search`, `cd`, `ls`
- **Content**: `share`, `fetch`, `create`, `edit`, `delete`
- **Modes**: `journal`, `finance`, `blog`, `voice`
- **System**: `config`, `status`, `history`, `clear`

### Terminal Interaction Patterns
- **Predictable Prompts**: Always show current context and mode
- **Command History**: Up/down arrows for command recall
- **Tab Completion**: Smart completion for commands and paths
- **Error Recovery**: Clear error messages with suggested fixes

## 🎨 DOS Authentic Design Language

### Color System (CGA Period-Accurate)
```css
/* Primary CGA Colors */
--dos-black: #000000;     /* Background */
--dos-blue: #0000AA;      /* Primary actions */
--dos-green: #00AA00;     /* Success states */
--dos-cyan: #00AAAA;      /* Information */
--dos-red: #AA0000;       /* Errors */
--dos-magenta: #AA00AA;   /* Warnings */
--dos-brown: #AA5500;     /* Secondary */
--dos-light-gray: #AAAAAA; /* Text */

/* Bright Variants */
--dos-dark-gray: #555555;   /* Disabled */
--dos-bright-blue: #5555FF; /* Hover states */
--dos-bright-green: #55FF55; /* Active success */
--dos-bright-cyan: #55FFFF;  /* Active info */
--dos-bright-red: #FF5555;   /* Active errors */
--dos-bright-magenta: #FF55FF; /* Active warnings */
--dos-yellow: #FFFF55;       /* Primary text/focus */
--dos-white: #FFFFFF;        /* Highlights */
```

### Typography System
```css
/* DOS Typography Stack */
--dos-font-primary: "Perfect DOS VGA 437", "Consolas", "Monaco", "Liberation Mono", monospace;
--dos-font-size-base: 16px;
--dos-line-height-terminal: 1.2;
--dos-letter-spacing-wide: 0.8px;
```

### Component Dimensions
```css
/* DOS Window System */
--dos-window-border: 2px solid var(--dos-yellow);
--dos-window-title-height: 32px;
--dos-window-control-size: 24px;
--dos-touch-target-min: 44px; /* Accessibility */

/* Terminal Interface */
--dos-cursor-blink: 1s;
--dos-prompt-color: var(--dos-yellow);
--dos-output-color: var(--dos-light-gray);
```

## 📱 Responsive Design Patterns

### Layout Strategies
1. **Mostly Fluid**: Components adapt fluidly with minimal breakpoint changes
2. **Column Drop**: Stack components vertically on smaller screens
3. **Layout Shifter**: Content-first reorganization maintaining task focus

### Responsive Behaviors
- **Touch Targets**: Minimum 44x44px for accessibility
- **Navigation**: Consistent patterns across breakpoints
- **Content**: No information loss across screen sizes
- **Performance**: Optimal loading on all devices

### Breakpoint Strategy
```css
/* Mobile-first approach */
@media (min-width: 320px) { /* Mobile */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large desktop */ }
```

## 🔄 Component Architecture

### Component Categories
- **Terminal**: DOS window interface components
- **Timeline**: Stream visualization components  
- **Form**: DOS-style input controls
- **Navigation**: Menu and routing components
- **DataDisplay**: Information presentation
- **Feedback**: Notifications and alerts
- **Layout**: Structural components

### Component Requirements
1. **TypeScript First**: Complete type definitions required
2. **Storybook Documentation**: Comprehensive stories and docs
3. **Token Compliance**: Use design tokens, never hardcode values
4. **Accessibility**: WCAG 2.1 AA compliance minimum
5. **DOS Authenticity**: Period-accurate styling only

### Component Structure
```
ComponentName/
├── components/
│   ├── ComponentName.tsx      # Main component
│   ├── ComponentName.css      # Styles using tokens
│   ├── ComponentName.stories.tsx # Storybook documentation
│   └── index.ts              # Component exports
├── types.ts                  # TypeScript definitions
└── index.ts                  # Main export
```

## 🧪 Testing & Quality Standards

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

### Quality Gates
- [ ] TypeScript compilation without errors
- [ ] All tests passing
- [ ] Accessibility audit passed
- [ ] Performance budget maintained
- [ ] Design review approved
- [ ] Documentation completed

## 🔧 Development Workflow

### Component Creation Process
1. **Storybook First**: Create stories defining behavior
2. **Design Tokens**: Use existing tokens, request new ones if needed
3. **Implementation**: Build component following patterns
4. **Testing**: Comprehensive test coverage
5. **Documentation**: Complete Storybook documentation
6. **Review**: Code and design review process

### Figma Integration Workflow
1. **Create Component**: `npm run create-component MyComponent`
2. **Push to Figma**: `npm run sync-to-figma`
3. **Design in Figma**: Designer creates visual component
4. **Pull Updates**: `npm run sync-from-figma`
5. **Iterate**: Repeat until component is complete

## 🚀 Performance Standards

### Bundle Size Targets
- **Component Library**: < 100KB gzipped
- **Individual Components**: < 5KB average
- **Design Tokens**: < 10KB total
- **Critical Path**: < 50KB initial load

### Runtime Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Accessibility Standards
- **WCAG 2.1 AA**: Full compliance required
- **Keyboard Navigation**: All interactive elements
- **Screen Reader**: Proper ARIA labels and descriptions
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Management**: Visible focus indicators

## 📚 Documentation Requirements

### Component Documentation
- **Purpose**: What problem does this solve?
- **Usage**: How to use with examples
- **Props**: Complete API documentation
- **Variants**: All visual and behavioral variants
- **States**: Interactive states with examples
- **Accessibility**: Keyboard and screen reader notes
- **Performance**: Bundle size and rendering cost

### Design Documentation
- **Design Rationale**: Why this design approach?
- **User Research**: Testing results and insights
- **Iteration History**: How the design evolved
- **Related Components**: Connections to other components
- **Future Considerations**: Planned improvements

---

## 🎯 Implementation Checklist

When creating new components, ensure:

- [ ] Follows DOS authentic design language
- [ ] Uses design tokens exclusively
- [ ] Implements proper TypeScript types
- [ ] Includes comprehensive Storybook stories
- [ ] Passes accessibility audit
- [ ] Maintains performance budget
- [ ] Works across all breakpoints
- [ ] Follows terminal interaction patterns
- [ ] Includes proper error handling
- [ ] Has complete documentation

---

*These principles guide all design and development decisions in the eiDotter design system. They should be consulted for every component, feature, and interaction pattern.*