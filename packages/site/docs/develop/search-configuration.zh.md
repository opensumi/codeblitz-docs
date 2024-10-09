---
id: search-configuration
title: 搜索配置
slug: search-configuration
order: 3
---

## 1、文件搜索

文件搜素通过快捷键 **Command**+**P** (macOS)、**Ctrl**+**P** (Windows) 打开，默认会展示最新打开的文件，同时支持远程搜索，如需配置远程接口搜索，按如下配置<br />通过组件 runtimeConfig.fileSearch 配置文件搜索的能力

```typescript
interface RuntimeConfig {
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
}

type SearchMode = Boolean | 'local';

type GlobString = string;

type ProviderResult<T> = T | undefined | null | Thenable<T | undefined | null>;

interface SearchOptions {
  /**
   * 与 `includes` glob 模式匹配的文件应包含在搜索中
   */
  includes: GlobString[];
  /**
   * 与 `excludes` glob 模式匹配的文件应排除在搜索中
   */
  excludes: GlobString[];
}

interface FileSearchOptions extends SearchOptions {
  /**
   * 要返回的最大结果数
   */
  maxResults?: number;
}
```

**`SearchMode`** 表示搜索模式，当值为 true 时表示远程搜索，这也是默认的选项，当值为 false 代表不支持，如果界面有相关 UI，会被隐藏，配置为 **`local`** 时表示本地搜索，此时在本地会对返回的结果进行进一步过滤

通过实现 provideResults 返回匹配的文件路径，默认会传入配置选项 includes 和 excludes，服务端可以处理该选项，如果服务端无法处理，可交给本地来处理

示例：

```typescript
<AppRenderer
  runtimeConfig={{
    fileSearch: {
      config: {
        include: 'local',
        exclude: 'local',
      },
      provideResults: (query, options) => {
        return searchFile(query.pattern, { limit: options.maxResults });
      },
    },
  }}
/>;

interface SearchFile {
  /** 返回结果示例
   * [
   *   'src/util',
   *   'util',
   * ]
   */
  (searchString: string, options: { limit?: number }): Promise<string[]>;
}
```

## 2、文本搜索

文本搜索模块位于左侧面板，默认已配置开启，如发现没有，可以手动添加

```typescript
const layoutConfig = {
  [SlotLocation.left]: {
    modules: ['@opensumi/ide-explorer', '@opensumi/ide-search'],
  },
};
```

通过组件 runtimeConfig.textSearch 配置文本搜索的能力

```typescript
interface RuntimeConfig {
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
       * 是否支持替换，对于只读系统一般需设置为 false
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
}

interface TextSearchQuery {
  /**
   * 搜索的文案
   */
  pattern: string;

  /**
   * `pattern` 是否应该被解释为正则表达式.
   */
  isRegExp?: boolean;

  /**
   * 搜索是否应该区分大小写
   */
  isCaseSensitive?: boolean;

  /**
   * 是否只搜索全词匹配。
   */
  isWordMatch?: boolean;
}

interface SearchOptions {
  /**
   * 与 `includes` glob 模式匹配的文件应包含在搜索中
   */
  includes: GlobString[];
  /**
   * 与 `excludes` glob 模式匹配的文件应排除在搜索中
   */
  excludes: GlobString[];
}

interface TextSearchOptions extends SearchOptions {
  /**
   * 要返回的最大结果数。
   */
  maxResults: number;
}

export interface Progress<T> {
  /**
   * 报告进度更新
   */
  report(value: T): void;
}

export type TextSearchResult = TextSearchMatch;

export interface TextSearchMatch {
  /**
   * 文件路径
   */
  path: string;

  /**
   * 行号，从 1 开始
   */
  lineNumber: number;

  /**
   * 文本匹配的预览
   */
  preview: {
    /**
     * 匹配的文本行，或包含匹配项的匹配行的一部分。
     */
    text: string;

    /**
     * `text` 内与匹配文本对应的字符范围，索引从 0 开始
     */
    matches: [number, number][];
  };
}

export type ProviderResult<T> =
  | T
  | undefined
  | null
  | Thenable<T | undefined | null>;
```

SearchMode 同文件搜索，因此对于远程搜索不支持的选项，可开启本地搜索过滤<br />不同于文件搜索，文本搜索支持的配置更多，可根据后面的示例及上面的类型注释来理解配置，同时因为文本搜索 <strong>不支持分页</strong> 如果需要返回更多的结果，需要由业务方自行查询更多数据，考虑到性能问题，搜索结果默认限制为 2000 条，同时支持 progress.report 来分步返回结果，这样每查询出一部分即可返回给前台显示

示例如下：

```typescript
<AppRenderer
  runtimeConfig={{
    textSearch: {
      config: {
        regexp: false,
        replace: false,
        caseSensitive: 'local',
        wordMatch: 'local',
        include: 'local',
        exclude: 'local',
      },
      provideResults: async (query, options, progress) => {
        const requestResults = await searchContent(query.pattern, {
          limit: options.maxResults,
        });
        if (!requestResults.length) return;
        const searchString = query.pattern.toLowerCase();
        const searchStringLen = searchString.length;
        requestResults.forEach(({ path, line, content }) => {
          const text = content.toLowerCase();

          // 如果接口已返回 column 的数据可直接用，如果没返回可手动提取
          let lastMatchIndex = -searchStringLen;
          const matches: [number, number][] = [];
          while (
            (lastMatchIndex = text.indexOf(
              searchString,
              lastMatchIndex + searchStringLen,
            )) !== -1
          ) {
            matches.push([lastMatchIndex, lastMatchIndex + searchStringLen]);
          }
          if (matches.length) {
            // 每得到一个结果，则调用 report 来上报
            progress.report({
              path,
              lineNumber: line,
              preview: {
                text: content,
                matches,
              },
            });
          }
        });
      },
    },
  }}
/>;

interface SearchContent {
  /**
   * 搜索 console 时
   * 返回结果示例
   * [
   *   { path: 'util.js': line: 1, content: '  console.log(123)' },
   *   { path: 'src/app.js': line: 10, content: 'const expression = "console.log";' }
   * ]
   */
  (searchString: string, options: { limit?: number }): Promise<
    { path: string; line: number; content: string }[]
  >;
}
```
