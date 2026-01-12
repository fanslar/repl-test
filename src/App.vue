<script setup lang='ts'>
import { type OutputModes, useStore, Repl, useVueImportMap, mergeImportMap } from '@vue/repl';
import MonacoEditor from '@vue/repl/monaco-editor';
import DocsSFCCode from './template/docs.vue?raw';
import TestSFCCode from './template/test.vue?raw';
import { decode, getDevProxyModule, getFilenameFromPath, getProdProxyModule, getTextFromPath } from './utils';

const window = globalThis.window as any
window.process = { env: {} }
const query = new URLSearchParams(location.search)
const { importMap: builtinImportMap, vueVersion } = useVueImportMap({
  runtimeDev: getDevProxyModule('vue'),
  serverRenderer: getDevProxyModule('vue-server-renderer'),
})

const loading = ref(true)

const store = (window.store = useStore(
  toRefs(
    reactive({
      // activeFile: 'src/Docs.vue',
      // files: {
      //   'src/Docs.vue': new File('src/Docs.vue', DocsSFCCode, true),
      // },
      builtinImportMap: mergeImportMap(
        unref(builtinImportMap), {
        imports: {
          'markdown-it': getProdProxyModule('markdown-it'),
          'highlight.js': getProdProxyModule('hljs'),
          // not support in browser
          'vitest': 'https://unpkg.com/vitest@4.0.16/dist/index.js'
        }
      })
      ,
      vueVersion,
      showOutput: (query.has('so')),
      outputMode: ((query.get('om') as OutputModes) || 'preview'),
    })
  ),
  location.hash,
))


watchEffect(() => history.replaceState({}, '', store.serialize()))

const KEY_INIT_CONFIG = 'icfg'
if (query.has(KEY_INIT_CONFIG)) {
  const { docs, test, sources } = decode<{ docs: string; test: string; sources: string[] }>(query.get(KEY_INIT_CONFIG)!)

  // 移除参数，避免重复初始化
  query.delete(KEY_INIT_CONFIG)
  history.replaceState({}, '', location.pathname + (query.toString() ? `?${query.toString()}` : ''))

  const files: Record<string, string> = {
    'src/Docs.vue': DocsSFCCode.replace('/* placeholder:docs */', docs),
  }
  // store.setFiles(files, 'src/Docs.vue')

  function updateFiles(filename: string, text: string) {
    files[`src/${filename}`] = text
  }

  function getStoreFilenameFromPath(path: string) {
    return `src/${getFilenameFromPath(path)}`
  }

  Promise.all(
    [
      [...sources].map((path: string) =>
        getTextFromPath(path).then((text) => {
          const filename = getFilenameFromPath(path)
          updateFiles(filename, text)
        })
      ),
      getTextFromPath(test).then((text) => {
        const filename = getFilenameFromPath(test)
        updateFiles(filename, text)
        updateFiles('Test.vue', TestSFCCode.replace('<!-- placeholder:test -->', filename))
      }),
    ]
  ).finally(async () => {
    await store.setFiles(files, 'src/Docs.vue')
    if (sources[0]) {
      store.setActive(getStoreFilenameFromPath(sources[0]))
      store.files['src/Docs.vue']!.hidden = true
      store.files['src/Test.vue']!.hidden = true
    }
    loading.value = false
  })
} else {
  if (store.files['src/Docs.vue'])
    store.files['src/Docs.vue'].hidden = true
  if (store.files['src/Test.vue'])
    store.files['src/Test.vue'].hidden = true
  loading.value = false
}

// store.vueVersion = '3.4.1'
const theme = ref<'light' | 'dark'>('dark')
window.theme = theme
const previewTheme = ref(false)
window.previewTheme = previewTheme

const isProduction = import.meta.env.PROD
</script>

<template>
  <Repl v-if="!loading" :store="store" :theme="theme" preview-theme :clear-console="isProduction" :editor="MonacoEditor"
    show-open-source-map layout-reverse />
</template>
