import path from 'path';
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
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    },
  },
  optimizeDeps: {
    include: [
      'mapbox-gl',
      '@mapbox/mapbox-gl-draw',
      '@mapbox/mapbox-gl-geocoder',
      'wellknown',
    ],
  },
}));
