import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare()
});