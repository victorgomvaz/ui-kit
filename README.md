# UI Kit - React Component Library

A consistent, accessible, and scalable React UI component library built with CSS Modules and design tokens.

## Features

- 🎨 **Design System**: Built on CSS Variables for easy theming
- ♿ **Accessible**: WCAG 2.1 compliant components
- 📦 **Tree-shakeable**: Optimized bundle size
- 🧩 **Composable**: Flexible component composition
- 📚 **Documented**: Storybook stories for all components
- ✅ **Tested**: Comprehensive test coverage with accessibility checks

## Installation

```bash
yarn add @ui-kit/components
```

## Usage

```jsx
import { Button } from '@ui-kit/components';

function App() {
  return <Button variant="primary" size="medium">Click me</Button>;
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
