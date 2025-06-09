// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({

  integrations: [
    sanity({
      projectId: 'uzpp961j',
      dataset: 'production',
      useCdn: true, // Use the Sanity CDN for faster loading in production
    }),
    react(), // Required if embedding Sanity Studio
  ],
  
});