import { Checkbox } from '../src/components/Checkbox';
import { useState } from 'react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox component for binary selection. Supports controlled and uncontrolled modes, indeterminate state, and full accessibility.',
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
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (shows dash)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
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
  },
};

export const Default = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked = {
  args: {
    label: 'Subscribe to newsletter',
    defaultChecked: true,
  },
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Enabled checkbox" />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox disabled states.',
      },
    },
  },
};

export const Indeterminate = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state (typically used for "select all" scenarios).',
      },
    },
  },
};

export const Controlled = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Checked: {checked ? 'Yes' : 'No'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled checkbox example with state management.',
      },
    },
  },
};

export const Group = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Checkbox name="permissions" value="read" label="Read" defaultChecked />
      <Checkbox name="permissions" value="write" label="Write" />
      <Checkbox name="permissions" value="delete" label="Delete" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Group of checkboxes with the same name attribute.',
      },
    },
  },
};
