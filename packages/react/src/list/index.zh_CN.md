import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ActionsDemo from './demo/Actions';
import ActionsSource from './demo/Actions.tsx?raw';
import GridDemo from './demo/Grid';
import GridSource from './demo/Grid.tsx?raw';
import SizesDemo from './demo/Sizes';
import SizesSource from './demo/Sizes.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import PaginationDemo from './demo/Pagination';
import PaginationSource from './demo/Pagination.tsx?raw';
import VirtualDemo from './demo/Virtual';
import VirtualSource from './demo/Virtual.tsx?raw';

# List 列表

简单的列表组件，用于展示数据集合。

## 使用场景

用于以垂直列表形式展示结构化数据，支持头像、标题、描述和操作。

## 使用方式

```jsx
import { List } from 'tiny-design';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基础列表

简单的带边框列表，包含头部、底部和元数据布局。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 丰富列表项

包含头像、多个操作和右侧时间戳的列表项。

<DemoBlock component={ActionsDemo} source={ActionsSource} />

    </Demo>
    <Demo>

### 网格布局

以响应式卡片网格渲染列表项，非常适合展示产品、项目或团队成员。

<DemoBlock component={GridDemo} source={GridSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 尺寸

在 `sm`、`md` 和 `lg` 之间切换以调整列表项密度。

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
    <Demo>

### 加载中

在数据获取时显示加载指示器。

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### 分页

使用 `pagination` 属性为列表添加分页器。

<DemoBlock component={PaginationDemo} source={PaginationSource} />

    </Demo>
    <Demo>

### 虚拟滚动

使用虚拟滚动高效渲染大型列表。只渲染可见的项目到 DOM 中。设置 `itemHeight` 以匹配每个项目的实际渲染高度，以实现平滑滚动。

<DemoBlock component={VirtualDemo} source={VirtualSource} />

    </Demo>
  </Column>
</Layout>

## Props

### List

| 属性       | 说明               | 类型                                    | 默认值  |
| ---------- | ------------------ | --------------------------------------- | ------- |
| dataSource | 列表数据           | any[]                                   | []      |
| renderItem | 每项渲染函数       | (item, index) => ReactNode              |         |
| header     | 列表头部           | ReactNode                               |         |
| footer     | 列表底部           | ReactNode                               |         |
| loading    | 加载状态           | boolean                                 | false   |
| bordered   | 显示边框           | boolean                                 | false   |
| split      | 显示分割线         | boolean                                 | true    |
| size       | 列表尺寸           | 'sm' \| 'md' \| 'lg'                   | md      |
| grid       | 网格布局配置       | \{ gutter?: number, column?: number \}    |         |
| pagination | 分页配置           | false \| ListPaginationProps            |         |
| virtual    | 启用虚拟滚动       | boolean                                 | false   |
| height     | 容器高度（虚拟滚动时必需） | number                           |         |
| itemHeight | 每个列表项的高度（虚拟滚动模式） | number                           |         |

### List.Item

| 属性     | 说明         | 类型           | 默认值  |
| -------- | ------------ | -------------- | ------- |
| extra    | 额外内容     | ReactNode      |         |
| actions  | 操作按钮列表 | ReactNode[]    |         |

### List.ItemMeta

| 属性        | 说明     | 类型      | 默认值  |
| ----------- | -------- | --------- | ------- |
| avatar      | 头像     | ReactNode |         |
| title       | 标题     | ReactNode |         |
| description | 描述     | ReactNode |         |