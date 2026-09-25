import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/My_Portofolio/',
  plugins: [
    react(),
    {
      name: 'create-admin-entry',
      closeBundle() {
        const distDirectory = resolve(__dirname, 'dist');
        mkdirSync(resolve(distDirectory, 'secretAdminPage'), { recursive: true });
        copyFileSync(resolve(distDirectory, 'index.html'), resolve(distDirectory, 'secretAdminPage', 'index.html'));
      }
    }
  ],
  server: {
    host: '0.0.0.0'
  }
});
