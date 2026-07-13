import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mpa-router',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/community') {
            req.url = '/community/';
          } else if (req.url === '/explore') {
            req.url = '/explore/';
          } else if (req.url.startsWith('/courses') && !req.url.includes('.')) {
            req.url = '/courses/';
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 8080,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        community: './community/index.html',
        explore: './explore/index.html',
        courses: './courses/index.html'
      }
    }
  }
});
