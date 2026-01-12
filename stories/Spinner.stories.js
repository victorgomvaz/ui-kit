import { Spinner } from '../src/components/Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Spinner component for indicating loading states. Accessible with ARIA labels and supports multiple sizes and color tones.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'success', 'error', 'warning'],
      description: 'Color tone of the spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
  },
};

export const Default = {
  args: {
    size: 'md',
    tone: 'primary',
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="sm" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="md" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="lg" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner size options: small, medium, and large.',
      },
    },
  },
};

export const Tones = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner tone="primary" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Primary</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner tone="secondary" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Secondary</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner tone="success" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Success</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner tone="error" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Error</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner tone="warning" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Warning</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner tone="neutral" />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Neutral</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner color tone options.',
      },
    },
  },
};

export const WithLabel = {
  args: {
    label: 'Loading user data...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner with custom accessible label for screen readers.',
      },
    },
  },
};
