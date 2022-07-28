import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  build: {
    target: 'ESNext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          console.log(id);
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  plugins: [solid()],
  server: {
    strictPort: true
  }
});
