import { dirname, join } from "path";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/components/Alert/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/Icon/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/Accordion/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-designs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../public', '../src/assets'],
  viteFinal: async (config) => {
    // Add base URL for GitHub Pages
    if (process.env.NODE_ENV === 'production') {
      config.base = '/eiDotter/';
    }

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