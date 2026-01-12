import { defineConfig, type UserConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist/imports',
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: {
        'markdown-it': './src/proxy/prod/markdown-it.ts',
        'hljs': './src/proxy/prod/hljs.ts',
      },
      formats: ['es'],
      fileName: () => '[name].js',
    },
    cssCodeSplit: true,
  }
})
