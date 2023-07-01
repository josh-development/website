import { defineConfig } from 'astro/config';

import Icons from 'unplugin-icons/vite';

import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify/functions';

export default defineConfig({
  output: 'hybrid',
  integrations: [solid(), tailwind()],
  experimental: {
    assets: true,
    redirects: true,
  },
  adapter: netlify(),
  vite: {
    plugins: [
      Icons({
        compiler: 'solid'
      })
    ]
  },
  redirects: {
    '/docs/api': '/docs',
    '/docs/guides': '/docs',
  }
});
