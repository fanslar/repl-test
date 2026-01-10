import { defineConfig, type UserConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist/imports',
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: {
        'markdown-it': './src/proxy/prod/markdown-it.ts',
        'hljs': './src/proxy/prod/hljs.ts',
      },
      formats: ['es'],
      fileName: () => '[name].js',
    },
  }
})
