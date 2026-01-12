import { Card } from '../src/components/Card';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Card component for displaying content in a contained format. Supports composition with Header, Body, and Footer sub-components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Card visual variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export const Default = {
  render: () => (
    <Card>
      <Card.Body>This is a simple card with just body content.</Card.Body>
    </Card>
  ),
};

export const WithHeaderAndFooter = {
  render: () => (
    <Card>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        This is the main content of the card. It can contain any content you want.
      </Card.Body>
      <Card.Footer>Card footer content</Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with header, body, and footer sections.',
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <Card variant="default">
        <Card.Header>Default Card</Card.Header>
        <Card.Body>This card has a border and shadow.</Card.Body>
      </Card>
      <Card variant="outlined">
        <Card.Header>Outlined Card</Card.Header>
        <Card.Body>This card has only a border, no shadow.</Card.Body>
      </Card>
      <Card variant="elevated">
        <Card.Header>Elevated Card</Card.Header>
        <Card.Body>This card has a stronger shadow for more elevation.</Card.Body>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card variant options: default, outlined, and elevated.',
      },
    },
  },
};

export const ComplexExample = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '400px' }}>
      <Card.Header>User Profile</Card.Header>
      <Card.Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <strong>John Doe</strong>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Software Engineer
            </p>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Building accessible and scalable UI components for modern web applications.
          </p>
        </div>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
          <span>📍 San Francisco</span>
          <span>•</span>
          <span>📧 john@example.com</span>
        </div>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex card example with structured content.',
      },
    },
  },
};
