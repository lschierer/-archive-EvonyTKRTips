import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  integrations: [
  // Enable Preact to support Preact JSX components.
  preact(),
  // Enable React for the Algolia search component.
  react(), tailwind(), markdoc()],
  site: `https://astro.build`
});