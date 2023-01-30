import type { StorybookConfig } from '@storybook/angular';

const storyFiles = '*.stories.@(js|jsx|ts|tsx|mdx)';
const config: StorybookConfig = {
  stories: [`./**/${storyFiles}`, `../src/app/**/${storyFiles}`],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: { autodocs: true },
  core: { disableTelemetry: true },
  staticDirs: [{ from: '../global/assets', to: '/assets' }], //👈 Configures the static asset folder in Storybook
};

export default config;
// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
