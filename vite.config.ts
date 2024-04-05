import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },server: {
    proxy: {
      '/api': {
        target: 'http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com', 
        changeOrigin: true, 
        rewrite: path => path.replace(/^\/api/, ''), 
      },
    },
  }
})