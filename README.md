# eiDotter 🖥️

[![npm version](https://img.shields.io/npm/v/eidotter.svg)](https://www.npmjs.com/package/eidotter)
[![License](https://img.shields.io/badge/license-CC--BY--NC--4.0-blue.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub issues](https://img.shields.io/github/issues/CinimoDY/eiDotter.svg)](https://github.com/CinimoDY/eiDotter/issues)
[![GitHub stars](https://img.shields.io/github/stars/CinimoDY/eiDotter.svg)](https://github.com/CinimoDY/eiDotter/stargazers)
[![Build Status](https://img.shields.io/github/actions/workflow/status/CinimoDY/eiDotter/build.yml?branch=main)](https://github.com/CinimoDY/eiDotter/actions)
[![Storybook](https://img.shields.io/badge/storybook-view-FF4785?logo=storybook)](https://cinimody.github.io/eiDotter)

A DOS-themed React component library that brings retro aesthetics to modern web applications. Built with TypeScript and Storybook, eiDotter provides a collection of customizable UI components that capture the nostalgic feel of DOS interfaces while maintaining modern development practices.

## 🌟 Features

- 🎨 DOS-inspired design system
- 📦 Ready-to-use React components
- 💪 Written in TypeScript with full type support
- 📚 Comprehensive Storybook documentation
- 🎯 Figma integration for design-to-code workflow
- 🔧 Highly customizable with variants, states, and types
- 🌙 Dark mode by default (it's DOS after all!)

## 📦 Installation

Using npm:
\`\`\`bash
npm install eidotter
\`\`\`

Using yarn:
\`\`\`bash
yarn add eidotter
\`\`\`

Using GitHub dependency:
\`\`\`json
{
  "dependencies": {
    "eidotter": "CinimoDY/eiDotter#v0.2.0"
  }
}
\`\`\`

## 🚀 Quick Start

```jsx
import { Button, Form, DataDisplay } from 'eidotter';

function App() {
  return (
    <div>
      <Form variant="inline" state="default">
        <DataDisplay variant="comfortable">
          Welcome to DOS!
        </DataDisplay>
        <Button variant="primary" state="default">
          OK
        </Button>
      </Form>
    </div>
  );
}
```

## 📚 Documentation

Visit our [Storybook documentation](https://cinimody.github.io/eiDotter) to explore all available components, their variants, states, and types.

## 🛠️ Components

- **DataDisplay**: Tables, lists, cards, and grids
- **Feedback**: Toasts, alerts, notifications, and progress indicators
- **Form**: Input fields, buttons, checkboxes, and form groups
- **Layout**: Containers, grids, and spacing utilities
- **Media**: Images, videos, and avatars
- **Navigation**: Menus, tabs, and breadcrumbs
- **Overlay**: Modals, dialogs, and tooltips
- **Typography**: Headings, text, and DOS-style fonts

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 🐛 Bug Reports & Feature Requests

If you encounter any bugs or have ideas for new features, please:

1. Check our [Issues](https://github.com/CinimoDY/eiDotter/issues) to see if it's already reported
2. Use our issue templates to submit a new:
   - [Bug Report](https://github.com/CinimoDY/eiDotter/issues/new?template=bug_report.md)
   - [Feature Request](https://github.com/CinimoDY/eiDotter/issues/new?template=feature_request.md)

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic DOS interface
- Built with [React](https://reactjs.org/)
- Documented with [Storybook](https://storybook.js.org/)
- Design system powered by [Figma](https://www.figma.com/)

## ⚠️ Security Note

If you're contributing to this project and need to work with Figma integration:

1. Never commit the `.env` file
2. Never expose your Figma access token
3. Create a new token at [Figma Access Tokens](https://www.figma.com/developers/api#access-tokens)
4. Add the token to your local `.env` file:
   ```
   FIGMA_ACCESS_TOKEN=your_token_here
   FIGMA_FILE_KEY=your_file_key_here
   ``` 