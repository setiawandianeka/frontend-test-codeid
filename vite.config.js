import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from './postcss.config.js'
import path from 'path'
import macroPlugin from "vite-plugin-babel-macros"
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    macroPlugin(),
    svgr(),
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
