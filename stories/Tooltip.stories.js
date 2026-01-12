import { Tooltip } from '../src/components/Tooltip';
import { Button } from '../src/components/Button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Tooltip component for displaying contextual information. Appears on hover or focus. Fully accessible with ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content',
      table: {
        type: { summary: 'string' },
      },
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tooltip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export const Default = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Positions = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', padding: '4rem' }}>
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Tooltip content="Left tooltip" position="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip position options: top, bottom, left, and right.',
      },
    },
  },
};

export const WithText = {
  render: () => (
    <Tooltip content="This is a longer tooltip message that provides more detailed information">
      <Button>Hover for details</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with longer text content.',
      },
    },
  },
};

export const Disabled = {
  render: () => (
    <Tooltip content="This tooltip is disabled" disabled>
      <Button>No tooltip</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled tooltip does not show on hover or focus.',
      },
    },
  },
};
