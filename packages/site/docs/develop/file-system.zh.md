---
id: file-system.zh
title: 文件系统
slug: file-system.zh
order: 0
---

对于文件树需要进行目录即文件夹读取，在 web 上因没有操作系统，因此文件系统也有别于标准 IDE 下的文件系统

### 一、通过插件实现

插件提供了 registerFileSystemProvider 的能力，详见[文档](https://code.visualstudio.com/api/references/vscode-api#workspace)，通过 filesystem provider 可以自由定义文件系统的读取和写入，自定义 scheme，同时根据 kaitian 的 ide-components 中的 tree 来实现文件树，适合有比较强自定义的场景

### 二、通过 BrowserFS 实现

alex 内置了一套 BrowserFS，在开源库的基础上优化了些性能，并增加了一些更简单使用的文件系统，通过 BrowserFS，可配置工作空间的文件读取行为，这样只需要实现几个接口就能直接使用基于 file scheme 的文件系统了，因为一般场景推荐使用这个，详细示例代码参考[链接](https://code.alipay.com/alexgroup/alex-demo/blob/master/filesystem.tsx)

目前支持的文件系统类型如下：

- IndexedDB 文件数据缓存在 indexedDB 上
- InMemory 文件数据缓存在内存中，刷新浏览器时数据即被销毁
- FileIndexSystem 文件索引文件系统，可提供全量的文件树和文件数据
- DynamicRequest 动态请求文件系统，文件树和文件动态加载
- ZipFS 基于 zip 的文件系统
- FolderAdapter 减少文件嵌套，一般配合其它文件系统一起使用
- OverlayFS 读写分离，读写可用不同的文件系统

在组件的 props 上 的 runtimeConfig.workspace 来配置，下面一一来举例，只展示 workspace 的配置

#### 1、IndexedDB

```jsx
<AppRenderer
	runtimeConfig={{
    workspace: {
      filesystem: {
        fs: 'IndexedDB',
      	options: {
        	storeName: 'my_db'; // indexedDB store name，可选
        }
      }
    }
  }}
/>
```

#### 2、InMemory

```jsx
<AppRenderer
  runtimeConfig={{
    workspace: {
      filesystem: { fs: 'InMemory' },
    },
  }}
/>
```

#### 3、FileIndexSystem

```jsx
<AppRenderer
  runtimeConfig={{
    workspace: {
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
    },
  }}
/>
```

#### 4、DynamicRequest

```typescript
type FileEntry = [string, BrowserFSFileType, any?];
// 根据实际接口以 path 作为参数分步请求目录数据，下面为 mock 的数据
// 数组中第三项为自定义的数据，比如接口中会返回额外的数据信息，此时内部会将对应的数据和路径节点绑定
// 在 readDirectory 和 readFile 会把当前路径下的节点额外数据直接透出作为第二个参数，这样方便使用
const dirMap: Record<string, FileEntry[]> = {
  '/': [
    ['lib', BrowserFSFileType.DIRECTORY, { custom: null }],
    ['Readme.md', BrowserFSFileType.FILE, { custom: null }],
    ['LICENSE', BrowserFSFileType.FILE, { custom: null }],
    ['package.json', BrowserFSFileType.FILE, { custom: null }],
  ],
  '/lib': [
    ['application.js', BrowserFSFileType.FILE, { custom: null }],
    ['context.js', BrowserFSFileType.FILE, { custom: null }],
    ['request.js', BrowserFSFileType.FILE, { custom: null }],
    ['response.js', BrowserFSFileType.FILE, { custom: null }],
  ],
};
<AppRenderer
  runtimeConfig={{
    workspace: {
      filesystem: {
        fs: 'DynamicRequest',
        options: {
          // 第二个参数为额外传递的节点数据，在 readDirecotry 返回的数组中定义
          // 根节点为首次请求，因此第二个参数首次为 undefined，其它节点为上述自定义的数据
          readDirectory(p: string, data?) {
            return dirMap[p];
          },
          async readFile(p, data) {
            const res = await fetch(
              `http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/green-trail-test/a87fb80d-3028-4b19-93a9-2da6f871f369/koa${p}`,
            );
            return new Uint8Array(await res.arrayBuffer());
          },
        },
      },
    },
  }}
/>;
```

#### 5、ZipFS

zipData 为 zip 文件 Buffer

```jsx
<AppRenderer
  runtimeConfig={{
    workspace: {
      filesystem: {
        fs: 'ZipFS',
        options: {
          zipData,
        },
      },
    },
  }}
/>
```

#### 6、FolderAdapter

减少文件嵌套，如 zip 文件外层文件夹为 demo，实际 demo 无需展示，直接展示 demo 下的文件，可通过此方式将 demo 这层目录去除

```jsx
<AppRenderer
  runtimeConfig={{
    workspace: {
      filesystem: {
        fs: 'FolderAdapter',
        options: {
          folder: '/demo',
          wrapped: {
            fs: 'ZipFS',
            options: {
              zipData,
            },
          },
        },
      },
    },
  }}
/>
```

#### 7、OverlayFS

联合挂载，即在读系统上加一层写系统，读文件是优先从写系统上读取，如果没有再从读系统上读取，写文件时直接在写系统上写，这样对于只读系统可实现写操作，此种方式的好处是可将读写分离，分别实现，还可以结合 scm 做更多的控制

```jsx
<AppRenderer
  runtimeConfig={{
    workspace: {
      filesystem: {
        fs: 'OverlayFS',
        options: {
          writable: { fs: 'InMemory' },
          readable: {
            fs: 'DynamicRequest',
            options: {
              readDirectory(p: string) {
                return dirMap[p];
              },
              async readFile(p) {
                const res = await fetch(
                  `http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/green-trail-test/a87fb80d-3028-4b19-93a9-2da6f871f369/koa${p}`,
                );
                return Buffer.from(await res.arrayBuffer());
              },
            },
          },
        },
      },
    },
  }}
/>
```
