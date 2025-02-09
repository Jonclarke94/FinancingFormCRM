import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: 'https://jonclarke94.github.io/FinancingFormCRM/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});