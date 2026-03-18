import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SelectionDemo from './demo/Selection';
import SelectionSource from './demo/Selection.tsx?raw';
import SortingDemo from './demo/Sorting';
import SortingSource from './demo/Sorting.tsx?raw';
import CustomRenderDemo from './demo/CustomRender';
import CustomRenderSource from './demo/CustomRender.tsx?raw';
import SizesDemo from './demo/Sizes';
import SizesSource from './demo/Sizes.tsx?raw';
import PaginationDemo from './demo/Pagination';
import PaginationSource from './demo/Pagination.tsx?raw';
import VirtualDemo from './demo/Virtual';
import VirtualSource from './demo/Virtual.tsx?raw';

# Table 表格

展示表格数据，支持排序、选择和分页。

## 使用场景

用于展示结构化数据，支持排序、筛选、行选择和分页。

## 使用方式

```jsx
import { Table } from 'tiny-design';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基础用法

简单的表格，包含列、排序和行选择。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 行选择

使用复选框选择行。使用 `rowSelection.type` 切换为单选模式。

<DemoBlock component={SelectionDemo} source={SelectionSource} />

    </Demo>
    <Demo>

### 分页

带内置分页的表格，数据会自动按页分割。

<DemoBlock component={PaginationDemo} source={PaginationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 排序

点击列头可以循环切换升序、降序和未排序状态。

<DemoBlock component={SortingDemo} source={SortingSource} />

    </Demo>
    <Demo>

### 自定义渲染

使用列的 `render` 属性自定义单元格内容，支持标签、链接和操作。

<DemoBlock component={CustomRenderDemo} source={CustomRenderSource} />

    </Demo>
    <Demo>

### 表格尺寸

三种内置尺寸：`sm`、`md` 和 `lg`。

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
    <Demo>

### 虚拟滚动

使用虚拟滚动高效渲染大数据量表格，滚动时表头保持固定。

<DemoBlock component={VirtualDemo} source={VirtualSource} />

    </Demo>
  </Column>
</Layout>

## API

### Table

| 属性          | 说明                 | 类型                                            | 默认值  |
| ------------- | -------------------- | ----------------------------------------------- | ------- |
| columns       | 列配置               | ColumnType[]                                    |         |
| dataSource    | 数据数组             | any[]                                           | []      |
| rowKey        | 行 key 字段          | string | (record) => Key                       | key     |
| loading       | 加载状态             | boolean                                         | false   |
| bordered      | 显示边框             | boolean                                         | false   |
| size          | 表格尺寸             | 'sm' | 'md' | 'lg'                           | md      |
| virtual       | 启用虚拟滚动         | boolean                                         | false   |
| height        | 容器高度（虚拟滚动时必填） | number                                      |         |
| itemHeight    | 每行高度（虚拟滚动模式）  | number                                      |         |
| scroll        | 滚动区域             | { x?: number, y?: number }                      |         |
| rowSelection  | 行选择配置           | RowSelection                                    |         |
| pagination    | 分页配置             | false | TablePaginationConfig                  |         |
| onChange      | 排序/分页变化回调    | (pagination, sorter) => void                    |         |
| emptyText     | 空状态文本           | ReactNode                                       | 暂无数据 |
| showHeader    | 显示表头             | boolean                                         | true    |

### ColumnType

| 属性         | 说明           | 类型                                     | 默认值  |
| ------------ | -------------- | ---------------------------------------- | ------- |
| title        | 列标题         | ReactNode                                |         |
| dataIndex    | 数据字段名     | string                                   |         |
| key          | 唯一标识       | string                                   |         |
| width        | 列宽           | number | string                         |         |
| align        | 对齐方式       | 'left' | 'center' | 'right'           | left    |
| sorter       | 排序功能       | boolean | (a, b) => number              |         |
| render       | 自定义渲染     | (value, record, index) => ReactNode      |         |
| ellipsis     | 文本溢出省略   | boolean                                  | false   |

### RowSelection

| 属性             | 说明               | 类型                                     | 默认值   |
| ---------------- | ------------------ | ---------------------------------------- | -------- |
| selectedRowKeys  | 选中行 keys        | Key[]                                    |          |
| onChange         | 选中变化回调       | (keys, rows) => void                     |          |
| type             | 选择类型           | 'checkbox' | 'radio'                   | checkbox |