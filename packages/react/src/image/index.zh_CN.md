import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import RoundDemo from './demo/Round';
import RoundSource from './demo/Round.tsx?raw';
import LazyDemo from './demo/Lazy';
import LazySource from './demo/Lazy.tsx?raw';
import FallbackDemo from './demo/Fallback';
import FallbackSource from './demo/Fallback.tsx?raw';

# Image

Image 组件用于显示图片。

## 使用场景

展示一张图片。

## 引入方式

```jsx
import { Image } from 'tiny-design';
```

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
  </Column>
  <Column>
    <Demo>

### 圆角图片

展示圆角图片。

<DemoBlock component={RoundDemo} source={RoundSource} />

    </Demo>
    <Demo>

### 懒加载

设置 `lazy` 和 `placeholder` 属性实现懒加载。

<DemoBlock component={LazyDemo} source={LazySource} />

    </Demo>
    <Demo>

### 加载失败

图片加载失败时显示占位图。

<DemoBlock component={FallbackDemo} source={FallbackSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性      | 说明                               | 类型                  | 默认值   |
| ------------- | ----------------------------------------- | --------------------- | --------- |
| src           | 图片资源路径              | string                | -         |
| alt           | 描述图片的替代文本     | string                | -         |
| placeholder   | 懒加载时使用的占位图                    | string                | -         |
| width         | 图片宽度                               | string &#124; number  | -         |
| height        | 图片高度                              | string &#124; number  | -         |
| round         | 圆形图片                             | boolean               | false     |
| lazy          | 是否开启图片懒加载            | boolean               | false     |
| fallback      | 加载失败时的占位图片   | string                | -         |
| objectFit     | 图片填充模式                            |                       | -         |
| style	        | 容器的样式对象          |                       | -         |
| className	    | 容器的 className                    | string                | -         |