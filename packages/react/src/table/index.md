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

# Table

A table component for displaying tabular data with sorting, selection, and pagination.

## Scenario

Used for displaying structured data with support for sorting, filtering, row selection, and pagination.

## Usage

```jsx
import { Table } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple table with columns, sorting, and row selection.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Row Selection

Select rows with checkboxes. Use `rowSelection.type` for radio mode.

<DemoBlock component={SelectionDemo} source={SelectionSource} />

    </Demo>
    <Demo>

### Pagination

Table with built-in pagination. Data is automatically sliced by page.

<DemoBlock component={PaginationDemo} source={PaginationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Sorting

Click column headers to cycle through ascending, descending, and unsorted states.

<DemoBlock component={SortingDemo} source={SortingSource} />

    </Demo>
    <Demo>

### Custom Render

Use the `render` property on columns to customize cell content with tags, links, and actions.

<DemoBlock component={CustomRenderDemo} source={CustomRenderSource} />

    </Demo>
    <Demo>

### Sizes

Three built-in sizes: `sm`, `md`, and `lg`.

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
    <Demo>

### Virtual Scroll

Render large tables efficiently with virtual scrolling. The header stays fixed while scrolling.

<DemoBlock component={VirtualDemo} source={VirtualSource} />

    </Demo>
  </Column>
</Layout>

## API

### Table

| Property      | Description                          | Type                                            | Default |
| ------------- | ------------------------------------ | ----------------------------------------------- | ------- |
| columns       | columns configuration                | ColumnType[]                                    |         |
| dataSource    | data array to render                 | any[]                                           | []      |
| rowKey        | row key field or getter              | string &#124; (record) => Key                       | key     |
| loading       | loading state                        | boolean                                         | false   |
| bordered      | show all borders                     | boolean                                         | false   |
| size          | table size                           | `sm` &#124; `md` &#124; `lg`                    | `md`      |
| virtual       | enable virtual scrolling             | boolean                                         | false   |
| height        | container height (required when virtual) | number                                      |         |
| itemHeight    | height of each row in px (virtual mode)  | number                                      |         |
| scroll        | scrollable area                      | `{ x?: number, y?: number }`                    |         |
| rowSelection  | row selection config                 | RowSelection                                    |         |
| pagination    | pagination config (false to disable) | false &#124; TablePaginationConfig                  |         |
| onChange      | sort/pagination change callback      | (pagination, sorter) => void                    |         |
| emptyText     | empty state text                     | ReactNode                                       | No Data |
| showHeader    | show table header                    | boolean                                         | true    |

### ColumnType

| Property     | Description                 | Type                                     | Default |
| ------------ | --------------------------- | ---------------------------------------- | ------- |
| title        | column header               | ReactNode                                |         |
| dataIndex    | field name in data          | string                                   |         |
| key          | unique key                  | string                                   |         |
| width        | column width                | number &#124; string                         |         |
| align        | text alignment              | `left` &#124; `center` &#124; `right`           | left    |
| sorter       | enable sorting              | boolean &#124; (a, b) => number              |         |
| render       | custom cell renderer        | (value, record, index) => ReactNode      |         |
| ellipsis     | truncate long content       | boolean                                  | false   |

### RowSelection

| Property         | Description                | Type                                     | Default  |
| ---------------- | -------------------------- | ---------------------------------------- | -------- |
| selectedRowKeys  | controlled selected keys   | Key[]                                    |          |
| onChange         | selection change callback  | (keys, rows) => void                     |          |
| type             | selection type             | `checkbox` &#124; `radio`                   | checkbox |