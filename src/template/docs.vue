<script setup lang='ts'>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { ref, onMounted } from 'vue';


const htmlContent = ref<string>('')

const mdi = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) { }
    }
    return '';
  }
})
// @ts-ignore
const p = fetch(`/* placeholder:docs */`)
  .then(res => res.text())
  .then(md => mdi.render(md))

onMounted(() => {
  p.then((value) => {
    htmlContent.value = value
  })
})
</script>

<template>
  <div :class="['markdown-body']" class="p-6" v-html="htmlContent"></div>
</template>

<style scoped>
@import url('./imports/markdown-it.css');
@import url('./imports/hljs.css');
</style>
