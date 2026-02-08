import { dirname, join } from "path";
import remarkGfm from "remark-gfm";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/*.mdx"
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-designs",
    "@storybook/addon-a11y",
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  staticDirs: ['../src/assets'],

  viteFinal: async (config) => {
    // SECURITY: Filter out sensitive env vars from being bundled
    // This prevents tokens/secrets from leaking into Storybook builds
    const sensitivePatterns = ['TOKEN', 'SECRET', 'KEY', 'PASSWORD', 'CREDENTIAL'];
    const safeEnvVars = {};
    for (const [key, value] of Object.entries(process.env)) {
      const isSensitive = sensitivePatterns.some(pattern => key.toUpperCase().includes(pattern));
      if (!isSensitive) {
        safeEnvVars[key] = value;
      }
    }
    config.define = {
      ...config.define,
      'process.env': JSON.stringify(safeEnvVars),
    };

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
  }
};

export default config; 