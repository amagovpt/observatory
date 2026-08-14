import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/observatory',
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
