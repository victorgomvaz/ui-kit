import { Avatar } from '../src/components/Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Avatar component for user profile pictures. Supports images, initials fallback, loading states, and custom fallbacks.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Name for fallback initials',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export const Default = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    name: 'John Doe',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with image. Falls back to initials if image fails to load.',
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="Small" size="sm" />
      <Avatar name="Medium" size="md" />
      <Avatar name="Large" size="lg" />
      <Avatar name="Extra Large" size="xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar size options: small, medium, large, and extra large.',
      },
    },
  },
};

export const Initials = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Bob" />
      <Avatar name="Alice Johnson" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with name initials fallback.',
      },
    },
  },
};

export const Loading = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar loading size="sm" />
      <Avatar loading size="md" />
      <Avatar loading size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar loading states.',
      },
    },
  },
};

export const CustomFallback = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar fallback="?" />
      <Avatar fallback={<span style={{ fontSize: '1.5rem' }}>👤</span>} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with custom fallback content.',
      },
    },
  },
};
