import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'advanced-react-role-guard': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    port: 5174,
  },
});
