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
  // // setup for Kubernetes
  // server: {
  //   open: true,
  //   watch: {
  //     usePolling: true,
  //   },
  //   host: true, // needed for the Docker Container port mapping to work
  //   strictPort: true,
  // },
}));
