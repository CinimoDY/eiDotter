import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-designs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: 'Documentation',
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: [
    { from: '../src/assets', to: '/assets' }
  ],
  async viteFinal(config) {
    return {
      ...config,
      base: './',
      build: {
        ...config.build,
        sourcemap: true,
      },
    };
  },
};

export default config;
