/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Gallery App',
        short_name: 'Gallery',
        description: 'App Description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon512X512.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon512X512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [{
          urlPattern: ({ url }) => {
            return url.pathname.startsWith("/api");
          },
          handler: "CacheFirst" as const,
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          },
        }
      ]
      }
   }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
