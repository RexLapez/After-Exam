import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
          }
          next();
        });
      }
    }
  ],
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
