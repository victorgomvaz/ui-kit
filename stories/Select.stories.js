import { Select } from '../src/components/Select';
import { useState } from 'react';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Select component for dropdown selection. Supports labels, helper text, error states, and full accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Shows error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below select',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an option...' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks field as required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export const Default = {
  args: {
    options,
    placeholder: 'Select an option...',
  },
};

export const WithLabel = {
  args: {
    label: 'Choose an option',
    options,
  },
};

export const WithHelperText = {
  args: {
    label: 'Country',
    helperText: 'Select your country of residence',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
    ],
  },
};

export const ErrorState = {
  args: {
    label: 'Choose an option',
    error: true,
    errorMessage: 'Please select an option',
    options,
  },
};

export const Required = {
  args: {
    label: 'Category',
    required: true,
    options: [
      { value: 'tech', label: 'Technology' },
      { value: 'design', label: 'Design' },
      { value: 'business', label: 'Business' },
    ],
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select size="sm" options={options} placeholder="Small select" />
      <Select size="md" options={options} placeholder="Medium select" />
      <Select size="lg" options={options} placeholder="Large select" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select size options: small, medium, and large.',
      },
    },
  },
};

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Select label="Default" options={options} placeholder="Default state" />
      <Select label="Disabled" options={options} placeholder="Disabled select" disabled />
      <Select
        label="Error"
        error
        errorMessage="This field has an error"
        options={options}
        placeholder="Error state"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select states: default, disabled, and error.',
      },
    },
  },
};

export const Controlled = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '300px' }}>
        <Select
          label="Controlled select"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Select an option..."
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Selected: {value || '(none)'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled select example with state management.',
      },
    },
  },
};
