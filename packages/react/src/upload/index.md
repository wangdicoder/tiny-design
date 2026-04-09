import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import UploadListDemo from './demo/UploadList';
import UploadListSource from './demo/UploadList.tsx?raw';
import DragDemo from './demo/Drag';
import DragSource from './demo/Drag.tsx?raw';

# Upload

Upload files by clicking or drag-and-drop

## Scenario

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## Usage

```jsx
import { Upload } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A classic mode. File selection dialog pops up when upload button is clicked.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Default Files

Use `defaultFileList` for uploaded files when initialising the page.

<DemoBlock component={UploadListDemo} source={UploadListSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Drag and Drop

You can drag files to a specific area, to upload. Alternatively, you can also upload by selecting.

<DemoBlock component={DragDemo} source={DragSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                                       | Type                          | Default   |
| ----------------- | ------------------------------------------------- | ----------------------------- | --------- |
| action            | request URL                                       | string                        | -         |
| accept            | accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)        | string    | -     |
| method            | http request method                               | string                        | `POST`    |
| name              | key name for uploaded file	                    | string                        | -         |
| disabled          | disabled state of button                          | boolean                       | false     |
| data              | additions options of request                      | object                        | -         |
| headers           | request headers                                   | object                        | -         |
| multiple          | whether uploading multiple files is permitted     | boolean                       | -         |
| drag              | whether to activate drag and drop mode            | boolean                       | -         |
| tip               | a tip content displaying under the trigger        | React.ReactNode               | -         |
| withCredentials   | whether cookies are sent                          | boolean                       | -         |
| fileList          | uploaded files                                    | object[]                      | -         |
| defaultFileList   | default uploaded files                            | object[]                      | -         |
| limit             | maximum number of uploads allowed	                | number                        | -         |
| beforeUpload      | hook before uploading. Return `false` to stop, return a `File` to replace the upload file, or return a Promise that resolves to either        | (file: File) => boolean &#124; File &#124; Promise&lt;boolean &#124; File&gt; | -   |
| onProgress        | hook function when some progress occurs           | (percent: number) => void     | -         |
| onSuccess         | hook function when uploaded successfully          | (file, fileList) => void      | -         |
| onError           | hook function when some errors occurs             | (file, fileList) => void      | -         |
| onChange          | hook function when file status change             | (file, fileList) => void      | -         |
| onRemove          | hook function when files are removed              | (file) => void                | -         |
| onExceed          | hook function when limit is exceeded              | (files, fileList) => void     | -         |
| httpRequest       | override default xhr behavior                     | (option: UploadRequestOption) => XMLHttpRequest &#124; void | ajax      |
| style	            | style object of container	object                  | CSSProperties                 | -         |
| className	        | className of container                            | string                        | -         |
