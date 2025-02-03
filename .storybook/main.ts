import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
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
  env: (config) => ({
    ...config,
    STORYBOOK_FIGMA_ACCESS_TOKEN: '',
    FIGMA_ACCESS_TOKEN: '',
  }),
};

export default config;
