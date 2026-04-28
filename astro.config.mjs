import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://hagens-hubspot.vercel.app',
  integrations: [tailwind()],
  vite: {
    server: {
      fs: {
        // Permite servir arquivos de fora do root do projeto (necessário para os symlinks dos vídeos)
        allow: [
          '/Users/viniciussilva/Teste v01/ccos-ratos/clientes/hubspot/onboarding-videos',
        ],
      },
    },
  },
});
