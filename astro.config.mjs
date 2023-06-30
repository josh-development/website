import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [solid(), tailwind()],
  experimental: {
    assets: true
  },
  adapter: netlify()
});