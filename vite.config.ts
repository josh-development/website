import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  build: {
    target: 'ESNext'
  },
  plugins: [solid()],
  server: {
    strictPort: true
  }
});
