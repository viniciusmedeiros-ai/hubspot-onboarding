import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind()],
  vite: {
    server: {
      fs: {
        allow: [
          '/Users/viniciussilva/Teste v01/ccos-ratos/clientes/hubspot/onboarding-videos',
        ],
      },
    },
  },
});
