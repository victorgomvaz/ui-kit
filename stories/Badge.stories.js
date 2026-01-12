import { Badge } from '../src/components/Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Badge component for labels, tags, and status indicators. Supports multiple tones, sizes, and variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'neutral'],
      description: 'Color tone of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export const Default = {
  args: {
    children: 'Badge',
  },
};

export const Tones = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="secondary">Secondary</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="error">Error</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="neutral">Neutral</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge color tone options.',
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Badge variant="solid" tone="primary">Solid</Badge>
        <Badge variant="outline" tone="primary">Outline</Badge>
        <Badge variant="subtle" tone="primary">Subtle</Badge>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Badge variant="solid" tone="success">Solid</Badge>
        <Badge variant="outline" tone="success">Outline</Badge>
        <Badge variant="subtle" tone="success">Subtle</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge variant options: solid, outline, and subtle.',
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge size options: small, medium, and large.',
      },
    },
  },
};

export const Examples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Badge tone="success">Active</Badge>
        <Badge tone="error">Inactive</Badge>
        <Badge tone="warning">Pending</Badge>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Badge variant="outline" tone="primary">New</Badge>
        <Badge variant="subtle" tone="success">Verified</Badge>
        <Badge size="sm" tone="error">3</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common badge usage examples.',
      },
    },
  },
};
