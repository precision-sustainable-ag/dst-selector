import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(() => ({
  build: {
    outDir: 'build',
  },
  plugins: [
    react(), eslint(),
  ],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@babel/runtime': require.resolve('@babel/runtime'),
    },
  },
}));
