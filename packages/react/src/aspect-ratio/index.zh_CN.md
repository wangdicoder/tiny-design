import VideoDemo from './demo/Video';
import VideoSource from './demo/Video.tsx?raw';
import ImageDemo from './demo/Image';
import ImageSource from './demo/Image.tsx?raw';
import MapDemo from './demo/Map';
import MapSource from './demo/Map.tsx?raw';

# AspectRatio 宽高比

用于描述元素宽度与高度之间比例关系的组件。

## 使用场景

用于嵌入响应式图片、视频和地图等。它使用了一种常见的 [padding hack](https://css-tricks.com/aspect-ratio-boxes/) 技术来实现。

## 使用方式

```jsx
import { AspectRatio } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 嵌入视频

4:3 视频。

<DemoBlock component={VideoDemo} source={VideoSource} />

    </Demo>
    <Demo>

### 嵌入地图

16:9 地图。

<DemoBlock component={MapDemo} source={MapSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 嵌入图片

1:1 图片。

<DemoBlock component={ImageDemo} source={ImageSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性  | 说明                       | 类型                  | 默认值   |
| --------- | --------------------------------- | --------------------- | --------- |
| width     | 盒子宽度                     | number &#124; string  | -         |
| ratio     | 内容的宽高比   | number                | 1         |
| style	    | 容器的样式对象  | CSSProperties         | -         |
| className	| 容器的 className            | string                | -         |