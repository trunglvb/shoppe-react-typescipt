/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// cai dat jsdom de test api browser(local stotage....)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()] as any,
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom' // or 'node'
  }
})
