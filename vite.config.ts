import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  base: './',
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    manifest: true,
    emptyOutDir: true,
  },
  css: {
    devSourcemap: true,
  }
})
