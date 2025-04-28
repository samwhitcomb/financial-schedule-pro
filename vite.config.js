import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: ['wouter'],
    },
  },
  server: {
    port: 3000,
  },
  root: 'client',
  publicDir: 'client/public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
}); 