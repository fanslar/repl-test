import { defineConfig, type UserConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
/**
 * Patch generated entries and import their corresponding CSS files.
 * Also normalize MonacoEditor.css
 */
const patchCssFiles: Plugin = {
  name: 'imports-patch-css',
  apply: 'build',
  writeBundle() {
    //  inject css imports to the files
    const outDir = path.resolve('dist', 'imports')
    ;['hljs', 'markdown-it'].forEach((file) => {
      const filePath = path.resolve(outDir, file + '.js')
      const content = fs.readFileSync(filePath, 'utf-8')
      fs.writeFileSync(filePath, `import './imports.css'\n${content}`)
    })
  },
}

export default defineConfig({
  plugins: [patchCssFiles],
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
    rollupOptions: {
      output: {
        assetFileNames(info) {
          return 'imports.css'
        }
      }
    }
  }
})
