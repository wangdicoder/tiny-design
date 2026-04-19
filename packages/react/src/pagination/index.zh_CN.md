import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import MoreDemo from './demo/More';
import MoreSource from './demo/More.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import AlignDemo from './demo/Align';
import AlignSource from './demo/Align.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';

# Pagination 分页

用于分隔长数据集，使用户更容易获取信息。

## 使用场景

- 当加载/渲染所有数据项需要较长时间时。

- 当需要通过翻页来浏览数据时。

## 使用方式

```js
import { Pagination } from '@tiny-design/react';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### Basic

基本分页。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Size

两种不同大小的分页。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Alignment

设置分页的对齐方式。

<DemoBlock component={AlignDemo} source={AlignSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### More Pages

更多分页。

<DemoBlock component={MoreDemo} source={MoreSource} />

    </Demo>
    <Demo>

### Disabled

禁用状态。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Controlled

受控的页码。

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性          | 说明                               | 类型                                                          | 默认值   |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------- | --------- |
| current           | 当前页码                       | number                                                        | -         |
| total             | 数据总条数                | number                                                        | -         |
| defaultCurrent    | 默认的当前页码               | number                                                        | 1         |
| disabled          | 是否禁用分页                        | boolean                                                       | false     |
| pageSize          | 每页数据条数             | number                                                        | 10        |
| size              | 分页器尺寸                           | enum: `sm` &#124; `md`                                        | -         |
| defaultPageSize   | 默认的每页数据条数     | enum: `sm` &#124; `md`                                        | `md`      |
| align             | 分页器对齐方式                      | enum: `left` &#124; `center` &#124; `right`                   | `center`  |
| onChange          | 页码变化时的回调   | (current: number, total: number, pageSize: number) => void    | -         |
