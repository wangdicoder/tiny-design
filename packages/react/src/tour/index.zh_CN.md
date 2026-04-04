import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import PrimaryDemo from './demo/Primary';
import PrimarySource from './demo/Primary.tsx?raw';
import NoTargetDemo from './demo/NoTarget';
import NoTargetSource from './demo/NoTarget.tsx?raw';
import CustomIndicatorDemo from './demo/CustomIndicator';
import CustomIndicatorSource from './demo/CustomIndicator.tsx?raw';
import CoverDemo from './demo/Cover';
import CoverSource from './demo/Cover.tsx?raw';
import NoMaskDemo from './demo/NoMask';
import NoMaskSource from './demo/NoMask.tsx?raw';
import CustomButtonDemo from './demo/CustomButton';
import CustomButtonSource from './demo/CustomButton.tsx?raw';
import GapDemo from './demo/Gap';
import GapSource from './demo/Gap.tsx?raw';

# Tour 漫游式引导

用于分步引导用户了解产品功能的气泡组件。

## 使用场景

使用 **Tour** 组件可以分步引导用户了解产品功能，通过气泡卡片和聚光灯遮罩高亮页面上的元素。

## 引入

```jsx
import { Tour } from '@tiny-design/react';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基本用法

Tour 的基本用法。点击按钮开始引导。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 主题色类型

使用 `type="primary"` 展示主题色引导卡片。

<DemoBlock component={PrimaryDemo} source={PrimarySource} />

    </Demo>
    <Demo>

### 封面图片

通过 `cover` 在步骤卡片顶部展示图片或视频。

<DemoBlock component={CoverDemo} source={CoverSource} />

    </Demo>
    <Demo>

### 自定义间距

使用 `gap` 调整聚光灯区域与目标元素之间的间距和圆角。

<DemoBlock component={GapDemo} source={GapSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 位置

自定义引导卡片相对于目标元素的位置。

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### 无目标元素

当步骤没有 `target` 时，卡片将居中显示在屏幕上。

<DemoBlock component={NoTargetDemo} source={NoTargetSource} />

    </Demo>
    <Demo>

### 无遮罩

设置 `mask={false}` 隐藏遮罩层。

<DemoBlock component={NoMaskDemo} source={NoMaskSource} />

    </Demo>
    <Demo>

### 自定义指示器

使用 `indicatorsRender` 自定义步骤指示器。

<DemoBlock component={CustomIndicatorDemo} source={CustomIndicatorSource} />

    </Demo>
    <Demo>

### 自定义按钮文案

使用 `nextButtonProps` 和 `prevButtonProps` 自定义导航按钮文案。

<DemoBlock component={CustomButtonDemo} source={CustomButtonSource} />

    </Demo>
  </Column>
</Layout>

## Tour 属性

| 属性                  | 说明                                                     | 类型                                                  | 默认值   |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------- | -------- |
| open                  | 是否打开引导                                             | boolean                                               | false    |
| current               | 当前步骤索引（受控）                                     | number                                                | -        |
| steps                 | 引导步骤配置                                             | TourStepProps[]                                       | []       |
| placement             | 所有步骤的默认位置                                       | Placement                                             | `bottom` |
| arrow                 | 是否显示箭头                                             | boolean                                               | true     |
| mask                  | 是否显示遮罩层                                           | boolean                                               | true     |
| disabledInteraction   | 是否禁用高亮区域的交互                                   | boolean                                               | false    |
| type                  | 引导类型                                                 | `default` &#124; `primary`                            | `default`|
| gap                   | 聚光灯与目标元素之间的间距                               | `{ offset?: number; radius?: number }`                | `{ offset: 6, radius: 2 }` |
| zIndex                | Tour 层的 z-index                                        | number                                                | 1001     |
| keyboard              | 是否启用键盘导航                                         | boolean                                               | true     |
| scrollIntoViewOptions | 滚动到可视区域选项                                       | boolean &#124; ScrollIntoViewOptions                  | true     |
| indicatorsRender      | 自定义指示器渲染                                         | (current: number, total: number) => ReactNode         | -        |
| onChange              | 步骤变化时的回调                                         | (current: number) => void                             | -        |
| onClose               | 关闭引导时的回调                                         | () => void                                            | -        |
| onFinish              | 引导完成时的回调                                         | () => void                                            | -        |

## TourStepProps 属性

| 属性                  | 说明                                                     | 类型                                                  | 默认值   |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------- | -------- |
| target                | 步骤指向的元素                                           | HTMLElement &#124; (() => HTMLElement &#124; null)     | -        |
| title                 | 步骤标题                                                 | ReactNode                                             | -        |
| description           | 步骤描述                                                 | ReactNode                                             | -        |
| cover                 | 封面图片或视频                                           | ReactNode                                             | -        |
| placement             | 相对于目标的位置                                         | Placement                                             | `bottom` |
| arrow                 | 是否显示箭头                                             | boolean                                               | true     |
| mask                  | 是否显示遮罩                                             | boolean                                               | true     |
| disabledInteraction   | 是否禁用高亮区域的交互                                   | boolean                                               | false    |
| nextButtonProps       | 下一步按钮属性                                           | `{ children?: ReactNode; onClick?: () => void }`      | -        |
| prevButtonProps       | 上一步按钮属性                                           | `{ children?: ReactNode; onClick?: () => void }`      | -        |
| scrollIntoViewOptions | 自定义滚动行为                                           | boolean &#124; ScrollIntoViewOptions                  | true     |
| onClose               | 关闭此步骤时的回调                                       | () => void                                            | -        |
