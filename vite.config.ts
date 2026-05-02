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
      // Externalize React + the use-sync-external-store shim chain.
      //
      // Why use-sync-external-store: react-aria / react-stately depend on
      // `use-sync-external-store/shim/with-selector` for their stores. The
      // shim is a CJS package; if Rollup bundles it into the ESM dist, the
      // CJS-wrapper code lands inside our ESM bundle and breaks consumer
      // builds (Vite/Rollup at the consumer side flag the duplicated React
      // export and refuse to evaluate the module). React 18+ exports
      // `useSyncExternalStore` natively, and react-aria's transitive
      // resolution gives the consumer the right version. Marking it
      // external keeps the CJS shim out of our bundle entirely.
      //
      // Defense-in-depth: also externalize @untitledui-pro/*. UTI Pro is no
      // longer a dependency (see CLAUDE.md "External Dependencies: Untitled
      // UI"), but this guardrail prevents a rogue future import from
      // silently bundling licensed assets into dist. Such imports would now
      // fail at build time (UTI is not installed) — and at consumer runtime
      // if somehow bundled — instead of quietly shipping non-redistributable
      // code.
      external: (id) =>
        id === 'react' ||
        id === 'react-dom' ||
        id === 'react/jsx-runtime' ||
        id === 'react/jsx-dev-runtime' ||
        // Match bare package imports AND Rolldown-resolved paths
        // (e.g. node_modules/use-sync-external-store/cjs/…). The package
        // name is unique enough that substring matching is safe.
        id.includes('use-sync-external-store') ||
        id.startsWith('@untitledui-pro/'),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react/jsx-dev-runtime': 'jsxDevRuntime',
          // UMD builds: pull the shim from React's global runtime.
          // React 18+ exposes useSyncExternalStore on React itself.
          'use-sync-external-store': 'React',
          'use-sync-external-store/shim': 'React',
          'use-sync-external-store/shim/with-selector': 'React',
          'use-sync-external-store/with-selector': 'React',
        },
      },
    },
  },
}); 