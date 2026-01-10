# repl-test

一个在线代码 REPL 项目，主要用于个人快速预览和分析部分开源项目的实现细节。

## 功能简介

- 支持通过 URL 参数 `icfg` 注入初始化配置，实现远程文档、源码、测试文件的自动加载与预览
- 适合快速查看第三方项目的文档、源码和测试用例
- 代码高亮、Markdown 渲染、主题切换等功能

## 如何使用

### 1. 获取 `icfg` 参数

将你的配置对象（如下所示）进行 JSON 序列化并 base64 编码：

```js
const config = {
  docs: "https://raw.githubusercontent.com/toss/es-toolkit/main/docs/zh_hans/reference/array/at.md",
  test: "https://raw.githubusercontent.com/toss/es-toolkit/main/src/array/at.spec.ts",
  sources: [
    "https://raw.githubusercontent.com/toss/es-toolkit/main/src/array/at.ts"
  ]
}
const icfg = btoa(JSON.stringify(config))
```

### 2. 构造访问网址

将生成的 `icfg` 参数拼接到你的 REPL 地址后：

```
https://your-repl-url.com/?icfg=eyJkb2NzIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Rvc3MvZXMtdG9vbGtpdC9tYWluL2RvY3MvemhfaGFucy9yZWZlcmVuY2UvYXJyYXkvYXQubWQiLCJ0ZXN0IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Rvc3MvZXMtdG9vbGtpdC9tYWluL3NyYy9hcnJheS9hdC5zcGVjLnRzIiwic291cmNlcyI6WyJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vdG9zcy9lcy10b29sa2l0L21haW4vc3JjL2FycmF5L2F0LnRzIl19
```

### 3. 配置说明

- `docs`：Markdown 文档地址
- `test`：测试用例源码地址
- `sources`：源码文件地址数组

## 示例配置

```json
{
  "docs": "https://raw.githubusercontent.com/toss/es-toolkit/main/docs/zh_hans/reference/array/at.md",
  "test": "https://raw.githubusercontent.com/toss/es-toolkit/main/src/array/at.spec.ts",
  "sources": [
    "https://raw.githubusercontent.com/toss/es-toolkit/main/src/array/at.ts"
  ]
}
```

## 参考网址

```
https://your-repl-url.com/?icfg=eyJkb2NzIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Rvc3MvZXMtdG9vbGtpdC9tYWluL2RvY3MvemhfaGFucy9yZWZlcmVuY2UvYXJyYXkvYXQubWQiLCJ0ZXN0IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Rvc3MvZXMtdG9vbGtpdC9tYWluL3NyYy9hcnJheS9hdC5zcGVjLnRzIiwic291cmNlcyI6WyJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vdG9zcy9lcy10b29sa2l0L21haW4vc3JjL2FycmF5L2F0LnRzIl19
```

---

如有建议或问题，欢迎反馈！
