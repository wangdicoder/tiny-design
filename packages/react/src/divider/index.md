import AlignTitleDemo from './demo/AlignTitle';
import AlignTitleSource from './demo/AlignTitle.tsx?raw';
import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';

# Divider

A divider line separates different content.

## Scenario

- Divide sections of article.
- Divide inline text and links such as the operation column of table.

## Usage

```jsx
import { Divider } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Horizontal

Divider default type is `horizontal`. Support inner text inside Divider.

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
    <Demo>

### Vertical

Use `type="vertical"` make it vertical.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Align Title

Set orientation of divider to left or right, default is `center`.

<DemoBlock component={AlignTitleDemo} source={AlignTitleSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property  | Description                      | Type                                           | Default      |
| --------- | -------------------------------- | ---------------------------------------------- | ------------ |
| type      | direction type of divider        | enum: `horizontal` &#124; `vertical`           | `horizontal` |
| dashed    | whether line is dashed           | boolean                                        | false        |
| align     | position of title inside divider | enum: `left` &#124; `right` &#124; `center`    | `center`     |
| style	    | style object of container	object | CSSProperties                                  | -            |
| className	| className of container           | string                                         | -            |