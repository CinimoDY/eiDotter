import { dirname, join } from "path";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-designs",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../src/assets'],
  viteFinal: async (config) => {
    // Custom domain storybook.eidotter.com serves at root
    // No base URL needed for custom domains

    // Configure static asset handling
    config.build = {
      ...config.build,
      assetsDir: 'assets',
      rollupOptions: {
        ...config.build?.rollupOptions,
        output: {
          ...config.build?.rollupOptions?.output,
          assetFileNames: 'assets/[name][extname]'
        }
      }
    };

    return config;
  },
};

export default config; 