import { Radio } from '../src/components/Radio';
import { useState } from 'react';

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'Radio component for single selection within a group. All radios with the same name attribute form a group where only one can be selected.',
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
      description: 'Disables the radio',
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
    name: {
      control: 'text',
      description: 'Radio group name (required for groups)',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Radio value',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export const Default = {
  args: {
    label: 'Option 1',
    name: 'example',
    value: '1',
  },
};

export const Group = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Radio name="size" value="small" label="Small" defaultChecked />
      <Radio name="size" value="medium" label="Medium" />
      <Radio name="size" value="large" label="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group - only one option can be selected at a time.',
      },
    },
  },
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Radio name="status" value="active" label="Active" />
      <Radio name="status" value="inactive" label="Inactive" disabled />
      <Radio name="status" value="pending" label="Pending" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio disabled states.',
      },
    },
  },
};

export const Controlled = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Radio
            name="controlled"
            value="option1"
            label="Option 1"
            checked={selected === 'option1'}
            onChange={() => setSelected('option1')}
          />
          <Radio
            name="controlled"
            value="option2"
            label="Option 2"
            checked={selected === 'option2'}
            onChange={() => setSelected('option2')}
          />
          <Radio
            name="controlled"
            value="option3"
            label="Option 3"
            checked={selected === 'option3'}
            onChange={() => setSelected('option3')}
          />
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Selected: {selected}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled radio group example with state management.',
      },
    },
  },
};
