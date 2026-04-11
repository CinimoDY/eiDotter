import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'eidotter',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Defense-in-depth: externalize @untitledui-pro/* entirely. UTI Pro is
      // no longer a dependency (see CLAUDE.md "External Dependencies: Untitled
      // UI"), but this guardrail prevents a rogue future import from silently
      // bundling licensed assets into dist. Such imports would now fail at
      // build time (UTI is not installed) — and at consumer runtime if
      // somehow bundled — instead of quietly shipping non-redistributable code.
      external: (id) =>
        id === 'react' ||
        id === 'react-dom' ||
        id === 'react/jsx-runtime' ||
        id === 'react/jsx-dev-runtime' ||
        id.startsWith('@untitledui-pro/'),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react/jsx-dev-runtime': 'jsxDevRuntime',
        },
      },
    },
  },
}); 