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

# Pagination

It is used to separate long sets of data so that it is easier for a user to consume information.

## Scenario

- When it will take a long time to load/render all items.

- If you want to browse the data by navigating through pages.

## Usage

```js
import { Pagination } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic pagination.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Size

Two different sizes of pagination.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Alignment

Set different alignments of pagination.

<DemoBlock component={AlignDemo} source={AlignSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### More Pages

More pages.

<DemoBlock component={MoreDemo} source={MoreSource} />

    </Demo>
    <Demo>

### Disabled

Disabled style.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Controlled

Controlled page number.

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                               | Type                                                          | Default   |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------- | --------- |
| current           | current page number                       | number                                                        | -         |
| total             | total number of data items                | number                                                        | -         |
| defaultCurrent    | default initial page number               | number                                                        | 1         |
| disabled          | disable pagination                        | boolean                                                       | false     |
| pageSize          | number of data items per page             | number                                                        | 10        |
| size              | pagination size                           | enum: `sm` &#124; `md`                                        | -         |
| defaultPageSize   | default number of data items per page     | enum: `sm` &#124; `md`                                        | `md`      |
| align             | align the pagination                      | enum: `left` &#124; `center` &#124; `right`                   | `center`  |
| onChange          | trigger when the page number is changed   | (current: number, total: number, pageSize: number) => void    | -         |
