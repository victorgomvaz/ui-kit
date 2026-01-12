import { Input } from '../src/components/Input';
import { useState } from 'react';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Input component for text entry. Supports labels, helper text, error states, and validation. Fully accessible with ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
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
      description: 'Helper text below input',
      table: {
        type: { summary: 'string' },
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
    placeholder: 'Enter text...',
  },
};

export const WithLabel = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const WithHelperText = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
    placeholder: 'Enter password',
  },
};

export const ErrorState = {
  args: {
    label: 'Email address',
    type: 'email',
    error: true,
    errorMessage: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const Required = {
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'John Doe',
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input size options: small, medium, and large.',
      },
    },
  },
};

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Input label="Default" placeholder="Default state" />
      <Input label="Disabled" placeholder="Disabled input" disabled />
      <Input label="Error" error errorMessage="This field has an error" defaultValue="Invalid value" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input states: default, disabled, and error.',
      },
    },
  },
};

export const Controlled = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '300px' }}>
        <Input
          label="Controlled input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Value: {value || '(empty)'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled input example with state management.',
      },
    },
  },
};
