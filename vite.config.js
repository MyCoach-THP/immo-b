import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Boilerplate',
        short_name: 'Boiler',
        theme_color: '#90caf9',
        background_color: '#90caf9',
        icons: [
          {
            src: '/twotter-icon-256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/twotter-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/twotter-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/twotter-icon-152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/twotter-icon-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/twotter-icon-128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/twotter-icon-16.png',
            sizes: '16x16',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
