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
    // PUBLISHING BOUNDARY (DMNC-1652): the built Storybook is public. Whatever
    // `process.env` is defined as here is written into the bundle as text, so
    // it is an allowlist of named keys, never a filtered copy of the build
    // machine's environment (a blocklist let 138 runner variables, and before
    // that a local home path, into the published bundle).
    // Add a key only if browser code reads it and its value may be published.
    // `scripts/check-storybook-output.mjs` fails the build if the environment
    // gets into the output anyway.
    const publicEnv = {
      NODE_ENV: process.env.NODE_ENV ?? 'production',
    };
    config.define = {
      ...config.define,
      'process.env': JSON.stringify(publicEnv),
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