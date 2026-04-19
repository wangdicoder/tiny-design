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

# List

A simple list component for displaying a collection of items.

## Scenario

Used to display structured data in a vertical list, with support for avatars, titles, descriptions, and actions.

## Usage

```jsx
import { List } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple bordered list with header, footer, and meta layout.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Rich Items

List items with avatars, multiple actions, and a timestamp on the right.

<DemoBlock component={ActionsDemo} source={ActionsSource} />

    </Demo>
    <Demo>

### Grid

Render items in a responsive card grid — great for showcasing products, projects, or team members.

<DemoBlock component={GridDemo} source={GridSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Sizes

Toggle between `sm`, `md`, and `lg` to adjust item density.

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
    <Demo>

### Loading

Show a loading indicator while data is being fetched.

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### Pagination

Use `pagination` to add a pager to the list.

<DemoBlock component={PaginationDemo} source={PaginationSource} />

    </Demo>
    <Demo>

### Virtual Scroll

Render large lists efficiently with virtual scrolling. Only visible items are rendered to the DOM. Set `itemHeight` to match the actual rendered height of each item for smooth scrolling.

<DemoBlock component={VirtualDemo} source={VirtualSource} />

    </Demo>
  </Column>
</Layout>

## Props

### List

| Property   | Description                      | Type                                    | Default |
| ---------- | -------------------------------- | --------------------------------------- | ------- |
| dataSource | data array for the list          | any[]                                   | []      |
| renderItem | render function for each item    | (item, index) => ReactNode              |         |
| header     | list header                      | ReactNode                               |         |
| footer     | list footer                      | ReactNode                               |         |
| loading    | show loading indicator           | boolean                                 | false   |
| bordered   | show border                      | boolean                                 | false   |
| split      | show divider between items       | boolean                                 | true    |
| size       | list size                        | 'sm' \| 'md' \| 'lg'                   | md      |
| grid       | grid layout configuration        | \{ gutter?: number, column?: number \}    |         |
| virtual    | enable virtual scrolling         | boolean                                 | false   |
| height     | container height (required when virtual) | number                           |         |
| itemHeight | height of each item in px (virtual mode) | number                           |         |
| pagination | pagination config or false       | false \| ListPaginationProps            |         |

### List.Item

| Property | Description              | Type           | Default |
| -------- | ------------------------ | -------------- | ------- |
| extra    | extra content            | ReactNode      |         |
| actions  | list of action buttons   | ReactNode[]    |         |

### List.ItemMeta

| Property    | Description       | Type      | Default |
| ----------- | ----------------- | --------- | ------- |
| avatar      | avatar element    | ReactNode |         |
| title       | item title        | ReactNode |         |
| description | item description  | ReactNode |         |