import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from './postcss.config.js'
import path from 'path'
import macroPlugin from "vite-plugin-babel-macros"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    macroPlugin(),
  ],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
