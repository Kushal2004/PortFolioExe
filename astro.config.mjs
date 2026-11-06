import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

const site = process.env.PUBLIC_SITE_URL;
export default defineConfig({
  site,
  integrations: [tailwind(), react(), ...(site ? [sitemap()] : [])],
});
