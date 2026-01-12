/** @type {import('storybook').StorybookConfig} */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    // Find and modify the existing CSS rule to exclude CSS Modules
    const rules = config.module.rules;
    
    // Find the CSS rule (usually the one that handles .css files)
    const cssRuleIndex = rules.findIndex((rule) => {
      if (!rule.test) return false;
      const testStr = rule.test.toString();
      return testStr.includes('css') && !testStr.includes('module');
    });

    if (cssRuleIndex !== -1) {
      const cssRule = rules[cssRuleIndex];
      // Exclude CSS Modules from the default rule
      if (cssRule.exclude) {
        if (Array.isArray(cssRule.exclude)) {
          cssRule.exclude.push(/\.module\.css$/);
        } else {
          cssRule.exclude = [cssRule.exclude, /\.module\.css$/];
        }
      } else {
        cssRule.exclude = /\.module\.css$/;
      }
    }

    // Insert CSS Modules rule at the beginning (more specific rules first)
    rules.unshift({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
      ],
    });

    return config;
  },
};

export default config;
