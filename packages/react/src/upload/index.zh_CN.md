import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import UploadListDemo from './demo/UploadList';
import UploadListSource from './demo/UploadList.tsx?raw';
import DragDemo from './demo/Drag';
import DragSource from './demo/Drag.tsx?raw';

# Upload 上传

通过点击或拖拽上传文件。

## 使用场景

- 当需要上传一个或多个文件时。
- 当需要展示上传进度时。
- 当需要通过拖拽方式上传文件时。

## 使用方式

```jsx
import { Upload } from '@tiny-design/react';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

经典的文件上传按钮，点击弹出文件选择对话框。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 默认文件列表

使用 `defaultFileList` 设置页面初始化时已上传的文件列表。

<DemoBlock component={UploadListDemo} source={UploadListSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 拖拽上传

你可以将文件拖拽到指定区域进行上传，也可以通过点击选择文件进行上传。

<DemoBlock component={DragDemo} source={DragSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性              | 说明                                                      | 类型                          | 默认值    |
| ----------------- | ------------------------------------------------- | ----------------------------- | --------- |
| action            | 上传请求的 URL                                    | string                        | -         |
| accept            | 接受的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)        | string    | -     |
| method            | HTTP 请求方法                                     | string                        | `POST`    |
| name              | 上传文件的表单字段名                              | string                        | `file`    |
| disabled          | 按钮的禁用状态                                    | boolean                       | false     |
| data              | 请求的附加参数                                    | object                        | -         |
| headers           | 请求头                                            | object                        | -         |
| multiple          | 是否允许上传多个文件                              | boolean                       | -         |
| drag              | 是否启用拖拽上传模式                              | boolean                       | -         |
| tip               | 触发器下方显示的提示内容                          | React.ReactNode               | -         |
| withCredentials   | 是否发送 cookie                                   | boolean                       | -         |
| fileList          | 已上传的文件列表                                  | object[]                      | -         |
| defaultFileList   | 默认已上传的文件列表                              | object[]                      | -         |
| limit             | 允许上传的最大数量                                | number                        | -         |
| beforeUpload      | 上传前的钩子函数。返回 `false` 可中止上传，返回 `File` 可替换上传文件，也可返回 Promise 并解析为这两种结果之一 | (file: File) => boolean &#124; File &#124; Promise&lt;boolean &#124; File&gt; | -   |
| onProgress        | 上传进度回调钩子                                  | (percent: number, file, fileList) => void | - |
| onSuccess         | 上传成功时的钩子                                  | (event, file, fileList) => void | -      |
| onError           | 上传出错时的钩子                                  | (event, file, fileList) => void | -      |
| onChange          | 文件状态变化时的钩子                              | (file, fileList) => void      | -         |
| onRemove          | 文件被移除时的钩子                                | (file) => void                | -         |
| onExceed          | 超出数量限制时的钩子                              | (files, fileList) => void     | -         |
| httpRequest       | 覆盖默认的 xhr 行为                               | (option: UploadRequestOption) => XMLHttpRequest &#124; void | ajax      |
| style	            | 容器的样式对象                                    | CSSProperties                 | -         |
| className	        | 容器的类名                                        | string                        | -         |
