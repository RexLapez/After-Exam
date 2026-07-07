import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        community: './community/index.html',
        explore: './explore/index.html'
      }
    }
  }
});
