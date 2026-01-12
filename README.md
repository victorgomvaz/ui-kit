# UI Kit - React Component Library

A consistent, accessible, and scalable React UI component library built with CSS Modules and design tokens.

## Features

- 🎨 **Design System**: Built on CSS Variables for easy theming
- ♿ **Accessible**: WCAG 2.1 compliant components
- 📦 **Tree-shakeable**: Optimized bundle size
- 🧩 **Composable**: Flexible component composition
- 📚 **Documented**: Storybook stories for all components
- ✅ **Tested**: Comprehensive test coverage with accessibility checks

## 📖 Documentation

View the full component documentation and interactive examples on [GitHub Pages](https://victorgomvaz.github.io/ui-kit/).

## Installation

```bash
yarn add @langifi.developer/ui-kit
```

## Usage

```jsx
import { Button } from '@langifi.developer/ui-kit';
import '@langifi.developer/ui-kit/dist/index.css';

function App() {
  return <Button variant="primary" size="md">Click me</Button>;
}
```

## Development

```bash
# Install dependencies
yarn install

# Start Storybook
yarn storybook

# Build library
yarn build

# Run tests
yarn test
```

## Components

- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Card
- Modal
- Tooltip
- Badge
- Avatar
- Spinner

## Deployment

This project is automatically deployed to GitHub Pages on every push to the main branch. The Storybook documentation is available at:

`https://[your-username].github.io/[repo-name]/`
