import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  build: {
    outDir: 'build',
  },
  plugins: [react()],
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
    include: ['mapbox-gl', '@mapbox/mapbox-gl-draw', '@mapbox/mapbox-gl-geocoder', 'wellknown'],
    exclude: ['@auth0/auth0-react'],
  },
}));
