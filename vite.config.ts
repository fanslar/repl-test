import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'


// https://vite.dev/config/
export default defineConfig(
  {
    // 调试@fanslar/repl 时使用
    resolve: {
      dedupe: ['vue'],
    },
    base: './',
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        imports: ['vue'],
        dts: true,
      })
    ],
    optimizeDeps: {
      exclude: ['@fanslar/repl', '@vue/repl'],
    },
  }
)
