---
id: api-docs
title: API 文档
slug: api-docs
order: 0
---

## 一、快速开始

示例工程见[**仓库**](https://github.com/opensumi/codeblitz-sample)

## 二、详细说明

#### 1、安装 IDE 组件

```
yarn add @codeblitzjs/ide-core
```

#### 2、组件使用

> 从 bundle 中引入已打包的文件

```typescript
import { AppRenderer } from '@codeblitzjs/ide-core/bundle';
import '@codeblitzjs/ide-core/bundle/codeblitz.css';

const App: React.FC = () => (
  <AppRenderer
    appConfig={{
      workspaceDir: 'playground',
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('main'));
```

#### 3、引入语言

> 可按需引入，或者全部引入

```typescript
// 全部引入
import '@codeblitzjs/ide-core/languages';

// 或者按以下部分按需引入
// 内置语言包会不断升级增加支持的语言
// 可查看最新包中的文件 https://www.npmjs.com/package/@codeblitzjs/ide-core?activeTab=code
import '@codeblitzjs/ide-core/languages/acss';
import '@codeblitzjs/ide-core/languages/bat';
import '@codeblitzjs/ide-core/languages/clojure';
import '@codeblitzjs/ide-core/languages/coffeescript';
import '@codeblitzjs/ide-core/languages/cpp';
import '@codeblitzjs/ide-core/languages/csharp';
import '@codeblitzjs/ide-core/languages/css';
import '@codeblitzjs/ide-core/languages/docker';
import '@codeblitzjs/ide-core/languages/fsharp';
import '@codeblitzjs/ide-core/languages/go';
import '@codeblitzjs/ide-core/languages/groovy';
import '@codeblitzjs/ide-core/languages/handlebars';
import '@codeblitzjs/ide-core/languages/hlsl';
import '@codeblitzjs/ide-core/languages/html';
import '@codeblitzjs/ide-core/languages/ini';
import '@codeblitzjs/ide-core/languages/java';
import '@codeblitzjs/ide-core/languages/javascript';
import '@codeblitzjs/ide-core/languages/json';
import '@codeblitzjs/ide-core/languages/Kotlin';
import '@codeblitzjs/ide-core/languages/less';
import '@codeblitzjs/ide-core/languages/log';
import '@codeblitzjs/ide-core/languages/lua';
import '@codeblitzjs/ide-core/languages/make';
import '@codeblitzjs/ide-core/languages/markdown';
import '@codeblitzjs/ide-core/languages/objective-c';
import '@codeblitzjs/ide-core/languages/perl';
import '@codeblitzjs/ide-core/languages/php';
import '@codeblitzjs/ide-core/languages/powershell';
import '@codeblitzjs/ide-core/languages/pug';
import '@codeblitzjs/ide-core/languages/python';
import '@codeblitzjs/ide-core/languages/razor';
import '@codeblitzjs/ide-core/languages/ruby';
import '@codeblitzjs/ide-core/languages/rust';
import '@codeblitzjs/ide-core/languages/scss';
import '@codeblitzjs/ide-core/languages/shaderlab';
import '@codeblitzjs/ide-core/languages/shellscript';
import '@codeblitzjs/ide-core/languages/sql';
import '@codeblitzjs/ide-core/languages/swift';
import '@codeblitzjs/ide-core/languages/typescript';
import '@codeblitzjs/ide-core/languages/vb';
import '@codeblitzjs/ide-core/languages/velocity';
import '@codeblitzjs/ide-core/languages/vscode-proto3';
import '@codeblitzjs/ide-core/languages/vue';
import '@codeblitzjs/ide-core/languages/xml';
import '@codeblitzjs/ide-core/languages/yaml';
```

#### 4、按需引入语言功能

> **语言使用 worker 插件提供 LSP 服务，具备智能提示、定义跳转等和 node LSP 等同的能力**

**1）引入扩展**

```typescript
import html from '@codeblitzjs/ide-core/extensions/codeblitz.html-language-features-worker';
import css from '@codeblitzjs/ide-core/extensions/codeblitz.css-language-features-worker';
import typescript from '@codeblitzjs/ide-core/extensions/codeblitz.typescript-language-features-worker';
import json from '@codeblitzjs/ide-core/extensions/codeblitz.json-language-features-worker';
```

配置中引入

```typescript
<AppRender
  appConfig={{
    extensionMetadata: [html, css, typescript, json],
  }}
/>
```

#### 5、自定义布局组件

> 大多情况下无需更改布局，也因此无需设置 layoutComponent 和 layoutConfig 相关的属性

通常可直接使用 IDE 提供的布局，如果需要更改布局，可自定义布局组件

```jsx
import {
  AppRenderer,
  SlotRenderer,
  SplitPanel,
  BoxPanel,
} from '@codeblitzjs/ide-core/bundle';

// 界面布局组件，可根据需要调整
// BoxPanel 定义了 flex 布局
// SplitPanel 定义可自由拖拽改变宽高的布局
// SlotRenderer 定义具体的视图，slot 为视图的 id，会关联 layoutConfig 的模块
const LayoutComponent = () => (
  <BoxPanel direction="top-to-bottom">
    <SplitPanel overflow="hidden" id="main-horizontal" flex={1}>
      <SlotRenderer slot="left" minResize={220} minSize={49} />
      <SplitPanel
        id="main-vertical"
        minResize={300}
        flexGrow={1}
        direction="top-to-bottom"
      >
        <SlotRenderer flex={2} flexGrow={1} minResize={200} slot="main" />
        {/* <SlotRenderer flex={1} minResize={160} slot="bottom" /> */}
      </SplitPanel>
    </SplitPanel>
    <SlotRenderer slot="statusBar" />
  </BoxPanel>
);

// 组件使用
<AppRender
  appConfig={{
    layoutComponent: LayoutComponent,
  }}
/>;
```

#### 6、更改布局模块配置

```jsx
import { AppRenderer, SlotLocation } from '@codeblitzjs/ide-core/bundle';

const layoutConfig = {
  [SlotLocation.left]: {
    // 左侧 tabbar，默认包含资源管理器和搜索，这里将 modules 设置为 ['@opensumi/ide-explorer']
    // 则只会展示资源管理器，id 为内部的定义的 id
    modules: ['@opensumi/ide-explorer'],
  },
  [SlotLocation.main]: {
    modules: ['@opensumi/ide-editor'],
  },
};

// 组件使用
<AppRender
  appConfig={{
    layoutConfig,
  }}
/>;
```

**_更复杂的用法需要了解 _**[**_OpenSumi_**](https://opensumi.com/zh/docs/integrate/universal-integrate-case/custom-view)**_ 的用法，可自行查阅相关文档_**

## 三、类型说明

codeblitz 组件支持很多配置，详细 TS 类型及说明如下

```typescript
interface IAppRendererProps extends IConfig {
  // 加载完成的回调
  onLoad?(app: IAppInstance): void;
  // 自定义 loading 组件
  Landing?: React.ComponentType<LandingProps>;
}

export interface IConfig {
  /**
   * 应用相关配置
   */
  appConfig: IAppConfig;
  /**
   * 运行相关配置
   */
  runtimeConfig: RuntimeConfig;
}

// IAppOpts 大部分为 kaitian 的配置，一般无需了解
export type IAppConfig = Partial<IAppOpts> & {
  /**
   * 工作空间目录，最好确保不同项目名称不同，如 group/repository 的形式，工作空间目录会挂载到 /workspace 根目录下
   */
  workspaceDir: string;
} & {
  /**
   * 插件配置
   */
  plugins?: IPluginConfig;
};

/**
 * 运行时相关配置
 */
export interface RuntimeConfig {
  /**
   * 场景标识，目前用于 indexedDB store name 标识，暂不强制
   * 不填表示为默认场景，此时同一域名会共享 indexedDB
   * 如果指定为 null，表示不作为一个场景，此时不使用 indexedDB，也即不缓存工作空间及全局偏好设置等数据
   */
  scenario?: string | null;
  /** 工作空间配置 */
  workspace?: {
    /**
     * 文件系统配置
     */
    filesystem: FileSystemConfiguration;
    /**
     * 文档保存事件
     * @param data.filepath 文档相对工作空间路径
     * @param data.content 文档内容
     */
    onDidSaveTextDocument?: (data: {
      filepath: string;
      content: string;
    }) => void;
    /**
     * 文档更改事件
     * @param data.filepath 文档相对工作空间路径
     * @param data.content 文档内容
     */
    onDidChangeTextDocument?: (data: {
      filepath: string;
      content: string;
    }) => void;
    /**
     * 文件创建事件
     * @param files 相对工作空间文件路径
     */
    onDidCreateFiles?: (files: string[]) => void;
    /**
     * 文件删除事件
     * @param files 相对工作空间文件路径
     */
    onDidDeleteFiles?: (files: string[]) => void;
    /**
     * 文件变更事件
     * @param data.filepath 相对工作空间文件路径
     * @param data.content 文件内容
     */
    onDidChangeFiles?: (data: { filepath: string; content: string }[]) => void;
  };
  /** 默认打开的文件，多个文件时，会展示最右边的文件 */
  defaultOpenFile?: string | string[];
  /** 禁止文件树更改，此时无法新增、删除、重命名文件 */
  disableModifyFileTree?: boolean;
  /** 禁止文件树，删除、重命名文件 待文件系统完善后加入删除重命名功能 */
  scmFileTree?: boolean;
  /** 注销左下角 bar */
  unregisterActivityBarExtra?: boolean;
  /** 隐藏左侧 tabbar */
  hideLeftTabBar?: boolean;
  /**
   * 启动时打开的 editor
   * none 不打开任何 editor
   * welcomePage 打开欢迎页
   * 后续考虑支持 'newUntitledFile', 'welcomePageInEmptyWorkbench', 'gettingStarted'
   * @default welcomePage
   */
  startupEditor?: 'none' | 'welcomePage' | 'readme';
  /**
   * 隐藏编辑器区 tab
   */
  hideEditorTab?: boolean;
  /**
   * 取消左侧选中行高亮
   */
  disableHighlightLine?: boolean;
  /**
   * 隐藏编辑器的面包屑导航
   */
  hideBreadcrumb?: boolean;
  /**
   * reporter 服务，可获取内部上报的埋点相关数据
   */
  reporter?: IReporter;
  /**
   * 配置需注销的快捷键
   */
  unregisterKeybindings?: string[];
  /**
   * 文本搜索相关的配置，用于开启了左侧搜索面板的配置选项
   */
  textSearch?: {
    /**
     * 搜索组件配置，默认均开启支持
     * true 代码支持，false 代表不支持，不支持时界面相关 UI 会被隐藏
     * 对于支持 local 的选项，代码支持本地过滤，开启此项配置代表本地会对返回的结果做进一步过滤
     */
    config?: {
      /**
       * 正则匹配
       */
      regexp?: Boolean;
      /**
       * 大小写匹配
       */
      caseSensitive?: SearchMode;
      /**
       * 单词匹配
       */
      wordMatch?: SearchMode;
      /**
       * 是否支持替换，对于只读系统该选项会自动设置为 false
       */
      replace?: Boolean;
      /**
       * 文件包含
       */
      include?: SearchMode;
      /**
       * 文件排除
       */
      exclude?: SearchMode;
    };

    /**
     * 提供给定文本模式匹配的结果
     * @param query 查询参数
     * @param options 搜索选项
     * @param progress 所有结果都必须调用的进度回调
     */
    provideResults(
      query: TextSearchQuery,
      options: TextSearchOptions,
      progress: Progress<TextSearchResult>,
    ): ProviderResult<void>;
  };

  fileSearch?: {
    /**
     * 搜索模式配置
     */
    config?: {
      /**
       * 文件包含
       */
      include?: SearchMode;
      /**
       * 文件排除
       */
      exclude?: SearchMode;
    };
    /**
     * 提供匹配特定文件路径模式的一组文件
     * @param query 查询参数
     * @param options 搜索选项
     */
    provideResults(
      query: { pattern: string },
      options: FileSearchOptions,
    ): ProviderResult<string[]>;
  };
  /**
   * 欢迎页自定义内容
   */
  WelcomePage?: React.FC;
  /**
   * 空白页自定义内容
   */
  EditorEmpty?: React.FC;
  /**
   * 当文件后缀名判断格式 不满足条件时，可通过此配置项进行自定义
   * 优先会从语法服务中获取类型
   * https://aone.alipay.com/v2/project/1158176/bug/100102353
   */
  resolveFileType?: (path: string) => 'image' | 'text' | 'video' | undefined;
}
```

## 四、一些配置说明

#### defaultPreferences

<br />常用设置

- `general.theme` {string} 主题色

内置了一套 ide 的主题色，亮色 `'opensumi-light'`，暗色 `'opensumi-dark'`

- `general.language`{'zh-CN' | 'en-US'}，国际化语言设置
- `editor.scrollBeyondLastLine` {boolean} 最后一行禁止继续滚动
- `editor.forceReadOnly` {boolean} 设置全局只读
- `files.associations` {Record<string, string>} 设置文件关联，方便给自定义的后缀文件高亮，如

```json
{
  "files.associations": {
    "*.htm": "html",
    "*.html": "html",
    "*.acss": "css",
    ".prettierrc": "yaml"
  }
}
```

- `editor.readonlyFiles` {string[]} 只读的文件列表
- `editor.previewMode` {boolean} 是否开启预览模式
- `editor.autoSave`{'off' | 'afterDelay' | 'editorFocusChange' | ''windowLostFocus} 自动保存的模式
- `editor.autoSaveDelay`{number} 当自动保存是 afterDelay 时，保存的延时时长

####

#### unregisterKeybindings

IDE 上内置了很多的快捷键，如果不需要可以配置，因为平台差异，所以同时设置 mac 和 windows，举例如下

- `ctrlcmd+s`保存文件
- `ctrlcmd+w` **Electron**: 关闭当前 tab
- `alt+shift+w` **Web**: 关闭当前 tab
- `alt+cmd+left` **Electron**: 前一个 tab
- `ctrlcmd+pageup` **Electron**: 前一个 tab
- `ctrl+shift+tab` **Electron**: 前一个 tab
- `ctrlcmd+shift+[` **Electron** **Mac**: 前一个 tab
- `ctrlcmd+ctrl+left` **Web**: 前一个 tab
- `alt+pageup` **Web**: 前一个 tab
- `alt+cmd+right` **Electron**: 后一个 tab
- `ctrlcmd+pagedown` **Electron**: 后一个 tab
- `ctrl+tab` **Electron**: 后一个 tab
- `ctrlcmd+shift+]` **Electron** **Mac**: 后一个 tab
- `ctrlcmd+ctrl+right` **Web**: 后一个 tab
- `alt+pagedown` **Web**: 后一个 tab
- `alt+right` **Windows** : 下一个光标位置
- `ctrl+shift+-` **Mac** : 下一个光标位置
- `alt+left` **Windows** : 上一个光标位置
- `ctrl+-` **Mac** : 上一个光标位置
- `ctrlcmd+k m`: 修改当前打开的文件的语言
- `ctrlcmd+\`: 向右拆分
- `ctrlcmd+k ctrlcmd+right`: 下一个编辑器组
- `ctrlcmd+k ctrlcmd+left`: 上一个编辑器组
- `alt+ctrlcmd+s`：保存全部文件
- `ctrlcmd+k w`: 关闭全部
- `ctrlcmd+k enter`: 让当前 tab 退出 preview 状态
- `ctrlcmd+k p`: 复制当前 tab 路径
- `ctrlcmd+shift+t` **Electron**: 重新打开已关闭的文件
- `alt+shift+t` **Web**: 重新打开已关闭的文件
- `ctrlcmd+n` **Electron**: 创建一个新文件 tab
- `alt+n` **Web**: 创建一个新文件 tab
- `ctrlcmd+t` **Electron**: 搜索 workspace symbol
- `ctrlcmd+o` **Web**: 搜索 workspace symbol
- `ctrlcmd+1` : 去到第 1 个编辑器组
- `ctrlcmd+2` : 去到第 2 个编辑器组
- `ctrlcmd+3` : 去到第 3 个编辑器组
- `ctrlcmd+4` : 去到第 4 个编辑器组
- `ctrlcmd+5` : 去到第 5 个编辑器组
- `ctrlcmd+6` : 去到第 6 个编辑器组
- `ctrlcmd+7` : 去到第 7 个编辑器组
- `ctrlcmd+8` : 去到第 8 个编辑器组
- `ctrlcmd+9` : 去到第 9 个编辑器组
- `ctrlcmd+k up`: 将当前 tab 移动到上方编辑器组
- `ctrlcmd+k left`: 将当前 tab 移动到左方编辑器组
- `ctrlcmd+k right`: 将当前 tab 移动到右方编辑器组
- `ctrlcmd+k down`: 将当前 tab 移动到下方编辑器组

## 五、完整示例参考

{% raw %}

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

// codeblitz
import {
  AppRenderer,
  SlotLocation,
  SlotRenderer,
  SplitPanel,
  BoxPanel,
} from '@codeblitzjs/ide-core/bundle';
import '@codeblitzjs/ide-core/bundle/alex.css';
// codeblitz

// 语法高亮
import '@codeblitzjs/ide-core/languages/html';
import '@codeblitzjs/ide-core/languages/handlebars';
import '@codeblitzjs/ide-core/languages/css';
import '@codeblitzjs/ide-core/languages/scss';
import '@codeblitzjs/ide-core/languages/less';
import '@codeblitzjs/ide-core/languages/javascript';
import '@codeblitzjs/ide-core/languages/typescript';
import '@codeblitzjs/ide-core/languages/json';
// end

// 语言功能
import html from '@codeblitzjs/ide-core/extensions/codeblitz.html-language-features-worker';
import css from '@codeblitzjs/ide-core/extensions/codeblitz.css-language-features-worker';
import typescript from '@codeblitzjs/ide-core/extensions/codeblitz.typescript-language-features-worker';
import json from '@codeblitzjs/ide-core/extensions/codeblitz.json-language-features-worker';

// 布局配置，可根据需要增删模块
export const layoutConfig = {
  [SlotLocation.action]: {
    modules: [''],
  },
  [SlotLocation.left]: {
    modules: ['@opensumi/ide-explorer'],
  },
  [SlotLocation.main]: {
    modules: ['@opensumi/ide-editor'],
  },
  // [SlotLocation.bottom]: {
  //   modules: ['@opensumi/ide-output', '@opensumi/ide-markers'],
  // },
  [SlotLocation.statusBar]: {
    modules: ['@opensumi/ide-status-bar'],
  },
};

// 界面布局组件，可根据需要调整
const LayoutComponent = () => (
  <BoxPanel direction="top-to-bottom">
    <SplitPanel overflow="hidden" id="main-horizontal" flex={1}>
      <SlotRenderer slot="left" minResize={220} minSize={49} />
      <SplitPanel
        id="main-vertical"
        minResize={300}
        flexGrow={1}
        direction="top-to-bottom"
      >
        <SlotRenderer flex={2} flexGrow={1} minResize={200} slot="main" />
        {/* <SlotRenderer flex={1} minResize={160} slot="bottom" /> */}
      </SplitPanel>
    </SplitPanel>
    <SlotRenderer slot="statusBar" />
  </BoxPanel>
);

const App: React.FC = () => {
  const [key, setKey] = React.useState(0);

  return (
    <div style={{ width: '100%', height: '100%', padding: 8 }}>
      <div style={{ height: 40 }}>
        <Button onClick={() => setKey((k) => k + 1)}>重置</Button>
      </div>
      <div style={{ height: 'calc(100% - 40px)', width: '50%' }}>
        {key === 0 && (
          <AppRenderer
            key={key}
            appConfig={{
              // 工作空间目录，最好确保不同项目名称不同，如 group/repository 的形式，工作空间目录会挂载到 /workspace 根目录下
              workspaceDir: 'playground',
              layoutConfig,
              layoutComponent: LayoutComponent,
              // 默认偏好设置
              defaultPreferences: {
                'general.theme': 'opensumi-light',
              },
              // 左侧面板默认宽度
              panelSizes: {
                [SlotLocation.left]: 220,
              },
              // 扩展
              extensionMetadata: [html, css, typescript, json],
            }}
            runtimeConfig={{
              // 禁止就改文件树，此时无法新增、删除、重命名文件
              disableModifyFileTree: true,
              // 默认打开文件
              defaultOpenFile: 'main.js',
              workspace: {
                // 文件系统配置
                filesystem: {
                  fs: 'FileIndexSystem',
                  options: {
                    // 初始全量文件索引
                    requestFileIndex() {
                      return Promise.resolve({
                        'main.html': '<div id="root"></div>',
                        'main.css': 'body {}',
                        'main.js': 'console.log("main")',
                        'package.json': '{\n  "name": "Riddle"\n}',
                      });
                    },
                  },
                },
                // 文件保存事件
                onDidSaveTextDocument(e) {
                  console.log(e);
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));
```

{% endraw %}
