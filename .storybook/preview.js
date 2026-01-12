import '../src/tokens/index.css';

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Import Inter font from Google Fonts
      if (typeof document !== 'undefined') {
        const existingLink = document.head.querySelector('link[href*="Inter"]');
        if (!existingLink) {
          const link = document.createElement('link');
          link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        }
      }
      return Story();
    },
  ],
};

export default preview;
