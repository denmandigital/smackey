import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 4599,
  },
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'styles.css'
          return 'assets/[name][extname]'
        },
      },
    },
  },
})
