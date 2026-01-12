import { Switch } from '../src/components/Switch';
import { useState } from 'react';

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Switch (Toggle) component for binary on/off states. Features smooth animations and full accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Uncontrolled default checked state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export const Default = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch" defaultChecked />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch size options: small, medium, and large.',
      },
    },
  },
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch label="Enabled switch" />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch disabled states.',
      },
    },
  },
};

export const Controlled = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <div>
        <Switch
          label="Controlled switch"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Enabled: {enabled ? 'Yes' : 'No'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled switch example with state management.',
      },
    },
  },
};
