# Contributing to eiDotter

First off, thank you for considering contributing to eiDotter! It's people like you that make eiDotter such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful
* List some other libraries or applications where this enhancement exists

### Pull Requests

* Fork the repo and create your branch from `main`
* If you've added code that should be tested, add tests
* If you've changed APIs, update the documentation
* Ensure the test suite passes
* Make sure your code lints
* Issue that pull request!

## Development Process

1. Clone the repository
\`\`\`bash
git clone https://github.com/CinimoDY/eiDotter.git
cd eidotter
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create a branch
\`\`\`bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-fix
\`\`\`

4. Make your changes and test them
\`\`\`bash
npm run build
npm run test
npm run storybook # to test in Storybook
\`\`\`

5. Commit your changes using conventional commits
\`\`\`bash
git commit -m "feat: add new component"
# or
git commit -m "fix: resolve component bug"
\`\`\`

6. Push to your fork and submit a pull request

## Style Guide

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐛 `:bug:` when fixing a bug
    * ✨ `:sparkles:` when adding a new feature
    * 📝 `:memo:` when writing docs
    * 🔧 `:wrench:` when updating configuration files

### JavaScript/TypeScript Style Guide

* Use TypeScript for all new code
* Follow the existing code style
* Use functional components with hooks
* Write meaningful component and prop names
* Document your code with JSDoc comments
* Create stories for all components

### Component Guidelines

* Each component should:
  * Be fully typed with TypeScript
  * Have proper prop validation
  * Include a Storybook story
  * Follow the DOS aesthetic
  * Support dark mode by default
  * Be accessible
  * Be responsive
  * Have meaningful defaults

## License

By contributing, you agree that your contributions will be licensed under the CC BY-NC 4.0 License. 