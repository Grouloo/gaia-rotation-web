import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import netlify from "@astrojs/netlify";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: "standalone"
  })
});