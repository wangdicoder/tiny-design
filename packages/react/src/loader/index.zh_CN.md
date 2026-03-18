import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BlurDemo from './demo/Blur';
import BlurSource from './demo/Blur.tsx?raw';
import ContainerDemo from './demo/Container';
import ContainerSource from './demo/Container.tsx?raw';
import IndicatorDemo from './demo/Indicator';
import IndicatorSource from './demo/Indicator.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import StateDemo from './demo/State';
import StateSource from './demo/State.tsx?raw';
import TipsDemo from './demo/Tips';
import TipsSource from './demo/Tips.tsx?raw';

# Loader

用于页面或区块的加载中状态的旋转指示器。

## 使用场景

当页面的某一部分正在等待异步数据或处于渲染过程中时，合适的加载动画能有效缓解用户的焦虑感。

## 引入方式

```jsx
import { Loader } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本

简单的加载状态。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 容器内

容器内的加载器。

<DemoBlock component={ContainerDemo} source={ContainerSource} />

    </Demo>
    <Demo>

### 自定义描述文字

自定义描述内容。

<DemoBlock component={TipsDemo} source={TipsSource} />

    </Demo>
    <Demo>

### 自定义指示符

使用自定义的加载指示符。

<DemoBlock component={IndicatorDemo} source={IndicatorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 尺寸

三种不同尺寸的加载器。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 加载状态

控制加载状态。

<DemoBlock component={StateDemo} source={StateSource} />

    </Demo>
    <Demo>

### 模糊容器

使用 `blurred` 属性控制容器遮罩层。

<DemoBlock component={BlurDemo} source={BlurSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性              | 说明                                          | 类型                                  | 默认值    |
| ----------------- | --------------------------------------------- | ------------------------------------- | --------- |
| indicator         | 自定义旋转指示器                              | ReactNode                             | -         |
| size              | 加载器大小                                    | enum: `sm` &#124; `md` &#124; `lg`    | `md`      |
| loading           | 加载状态                                      | boolean                               | true      |
| tip               | 当 Spin 有子元素时，自定义描述内容            | string                                | -         |
| vertical          | 是否垂直排列内容                              | boolean                               | false     |
| blurred           | 是否模糊加载背景                              | boolean                               | false     |
