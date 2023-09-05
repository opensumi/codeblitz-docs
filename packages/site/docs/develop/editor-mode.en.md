---
id: editor-mode
title: Editor 模式
slug: editor-mode
order: 4
---

## 一、介绍

> 为方便只需编辑器场景的业务接入，针对 editor 提供了单独的组件

**核心能力**

- 只提供 editor 单视图
- 加载体积更小、启动速度更快
- 通过 react 组件来控制文档打开，接入方便
- 针对代码托管平台提供离线索引支持

## 二、快速体验

**示例工程见**[**仓库**](https://github.com/opensumi/codeblitz-sample)**，参照 README.md 说明运行 PRIVATE_TOKEN= npm run editor**

## 三、组件接入说明

### 1）引入 JS 和 CSS

```json
import { IAppInstance, EditorRenderer, registerLanguage, registerGrammar } from '@codeblitzjs/ide-core/bundle/alex.editor';
import '@codeblitzjs/ide-core/bundle/alex.editor.css';
```

editor 提供单独的 js 和 css 文件，通过从 bundle 中引入打包好的 js 和 css，省去了集成项目配置 less 等源文件的处理

### 2) 引入语言

和完整模式一致，参考[链接](./api-docs)

### 3) 组件使用

```jsx
<EditorRenderer
  Langing={}
  appConfig={{...}}
  runtimeConfig={{...}}
  editorConfig={{...}}
  documentModel={{...}}
/>
```

props 说明

#### Landing

自定义工作空间加载样式，如不需要可省略

#### appConfig

> 对 IDE 应用进行配置

**workspaceDir**

和标准工作空间概念一样，建议不同项目使用不同的 workspace 路径

**defaultPreferences**

- general.theme {string} 主题，内置了一套 ide 的主题色，亮色 `'ide-light'`，暗色 `'ide-dark'`
- editor.scrollBeyondLastLine {boolean} 最后一行禁止继续滚动
- editor.forceReadOnly {boolean} 设置全局只读
- lsif.enable {boolean} 是否开启 lsif
- lsif.documentScheme {string} lsif 文档的 scheme，配置成 `'file'` 即可
- lsif.env {'test' | 'prod'} 接口环境配置，对于测试环境的仓库， 应该配置 lsif.env = 'test' 来请求测试的 lsif 接口。**因环境内部无法准确判断，因此切勿仅依赖内部来判断环境，接入方最好自行判断环境**

#### runtimeConfig

> **运行相关的特殊配置**

- scenario

场景标识，在 editor 模式下推荐传 `null`，此时不会持久化缓存工作空间数据

- startupEditor

启动时显示的编辑器，editor 下传 `'none'` 即可

- hideEditorTab

隐藏 editor tab

- unregisterKeybindings {string[]}

需要注销快捷键列表，可看 ide 上支持哪些快捷键

#### editorConfig

> 编辑器配置

- stretchHeight {boolean}

编辑器是否自适应内容区高度，此时会完全展开 editor，内部不再有滚动条，代码行数过多时可能会有性能问题

- disableEditorSearch {boolean}

禁用编辑器内搜索，此时会注销内部 ctrl/cmd + f 快捷键

#### documentModel

> **文档模型相关配置，用于定于文档打开的行为**

- type

支持 `'code' | 'fs'`，代表不同的文档类型，对于代码平台传入 `'code'`

- ref

分支、标签或 commit

- owner

仓库群组或用户

- name

仓库名

- filepath

仓库文件路径，如传入的话，此时组件为**受控模式**

- onFilepathChange

文件路径变更事件，对于定义跳转和光标前进或后退，当前文件会变更，通过此事件判断是否有文件路径变更，**注意：对于跨库索引，此时的 filepath 回调为空字符串，上层判空来决定文件变更行为**

- readFile

读取文件接口，需返回 Uint8Array 格式的数据

- encoding

文件编码，和标准工作空间支持编码类型一致，简单场景只传 utf8 或 gbk 即可

- lineNumber {number | [number, number]}

单行或多行高亮

- onLineNumberChange {number | [number, number]}

行号变更事件，在用户点击了行号以及文件跳转时会触发此事件，按住 shift 可多行连续选中

## 四、使用扩展

editor 下默认不引入扩展，这样可减少体积，如果有扩展的需求，则可以如下方式自行引入扩展

#### 更改引入方式

- 如果引用的是 bundle 文件，那么将 `@codeblitzjs/ide-core/bundle/alex.editor` 的引用改为 `@codeblitzjs/ide-core/bundle/alex.editor.all` 即可
- 如果引用的是 lib 下资源，那么除了引用 `@codeblitzjs/ide-core/lib/editor`，还需引入 extension 相关文件

```jsx
import { IAppInstance, EditorRenderer } from '@codeblitzjs/ide-core/lib/editor';
// 引入 extension
import '@codeblitzjs/ide-core/lib/editor.extension';
```
