import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import RoundDemo from './demo/Round';
import RoundSource from './demo/Round.tsx?raw';
import LazyDemo from './demo/Lazy';
import LazySource from './demo/Lazy.tsx?raw';
import PlaceholderDemo from './demo/Placeholder';
import PlaceholderSource from './demo/Placeholder.tsx?raw';
import CustomFallbackDemo from './demo/CustomFallback';
import CustomFallbackSource from './demo/CustomFallback.tsx?raw';
import ImageStyleDemo from './demo/ImageStyle';
import ImageStyleSource from './demo/ImageStyle.tsx?raw';

# Image 图片

Image 组件用于显示图片。

## 使用场景

展示一张图片。

## 使用方式

```jsx
import { Image } from '@tiny-design/react';
```

`ref` 指向原生 `img` 元素。

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

展示一张图片。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 尺寸

可以通过 `width` 和 `height` 属性调整图片尺寸。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 圆角图片

展示圆角图片。

<DemoBlock component={RoundDemo} source={RoundSource} />

    </Demo>
    <Demo>

### 自定义占位内容

用 `placeholder` 渲染骨架屏或品牌化占位内容。

<DemoBlock component={PlaceholderDemo} source={PlaceholderSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 自定义失败内容

`fallback` 支持传入任意 ReactNode，而不只是兜底图片。

<DemoBlock component={CustomFallbackDemo} source={CustomFallbackSource} />

    </Demo>
    <Demo>

### 动态调整

通过 `Radio`、`Select` 和 `Switch` 动态调整 `objectFit`、焦点位置和圆形开关。

<DemoBlock component={ImageStyleDemo} source={ImageStyleSource} />

    </Demo>
    <Demo>

### 懒加载

设置 `lazy` 和 `placeholder` 属性实现懒加载。浏览器不支持 `IntersectionObserver` 时会自动降级为直接加载。

<DemoBlock component={LazyDemo} source={LazySource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| ------------- | ----------------------------------------- | --------------------- | --------- |
| src | 图片资源路径 | string | - |
| alt | 描述图片的替代文本 | string | `''` |
| placeholder | 加载中或懒加载等待进入视口时展示的占位内容 | ReactNode | - |
| width | 图片容器宽度 | string &#124; number | - |
| height | 图片容器高度 | string &#124; number | - |
| round | 是否显示为圆形图片 | boolean | false |
| lazy | 是否开启图片懒加载 | boolean | false |
| fallback | 图片加载失败时展示的兜底内容 | ReactNode | - |
| objectFit | 图片填充模式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `cover` |
| imageStyle | 原生 `img` 元素样式 | CSSProperties | - |
| imageClassName | 原生 `img` 元素 className | string | - |
| style | 容器的样式对象 | CSSProperties | - |
| className | 容器的 className | string | - |
