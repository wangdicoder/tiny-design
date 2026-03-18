import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ArrowsDemo from './demo/Arrows';
import ArrowsSource from './demo/Arrows.tsx?raw';
import FadeDemo from './demo/Fade';
import FadeSource from './demo/Fade.tsx?raw';
import MethodsDemo from './demo/Methods';
import MethodsSource from './demo/Methods.tsx?raw';

# Carousel

一个用于循环展示元素的走马灯组件，类似幻灯片。

## 引入方式

```jsx
import { Carousel } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

基本的走马灯。可以直接传入子元素，不需要 `Carousel.Item`。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 渐变效果

使用渐变过渡效果代替滚动。

<DemoBlock component={FadeDemo} source={FadeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 切换箭头

鼠标悬停时显示导航箭头。

<DemoBlock component={ArrowsDemo} source={ArrowsSource} />

    </Demo>
    <Demo>

### 编程控制

使用 `ref` 来访问 `goTo`、`next` 和 `prev` 方法进行编程控制。

<DemoBlock component={MethodsDemo} source={MethodsSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性            | 说明                                 | 类型                                                     | 默认值     |
| --------------- | ------------------------------------ | -------------------------------------------------------- | ---------- |
| arrows          | 显示前进/后退箭头按钮               | boolean                                                  | false      |
| autoplay        | 自动滚动幻灯片                       | boolean                                                  | false      |
| autoplaySpeed   | 自动滚动间隔时间（毫秒）             | number                                                   | 3000       |
| dotPlacement    | 指示点的位置                         | `top` &#124; `bottom` &#124; `left` &#124; `right`       | `bottom`   |
| dots            | 显示指示点                           | boolean &#124; \{ className?: string \}                   | true       |
| draggable       | 启用拖拽滚动                         | boolean                                                  | false      |
| effect          | 过渡效果                             | `scrollx` &#124; `fade`                                  | `scrollx`  |
| easing          | CSS 过渡时间函数                     | string                                                   | `ease`     |
| infinite        | 无限循环                             | boolean                                                  | true       |
| speed           | 动画持续时间（毫秒）                 | number                                                   | 500        |
| waitForAnimate  | 等待动画完成后再切换                 | boolean                                                  | false      |
| afterChange     | 幻灯片切换后的回调                   | (current: number) => void                                | -          |
| beforeChange    | 幻灯片切换前的回调                   | (current: number, next: number) => void                  | -          |
| style           | 容器样式对象                         | CSSProperties                                            | -          |
| className       | 容器的 className                     | string                                                   | -          |

### Methods

通过 ref 访问：

```jsx
const ref = useRef();
<Carousel ref={ref}>...</Carousel>

ref.current.next();     // next slide
ref.current.prev();     // previous slide
ref.current.goTo(2);    // go to slide 2
```

| 方法                      | 说明                                               |
| ------------------------- | -------------------------------------------------- |
| goTo(index, dontAnimate?) | 跳转到指定幻灯片。传入 `true` 可跳过动画。         |
| next()                    | 跳转到下一张幻灯片。                               |
| prev()                    | 跳转到上一张幻灯片。                               |