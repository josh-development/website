import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
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
  plugins: [solid(), mdx({ jsxImportSource: 'solid-jsx', remarkPlugins: [remarkGfm] })],
  server: {
    strictPort: true
  }
});
