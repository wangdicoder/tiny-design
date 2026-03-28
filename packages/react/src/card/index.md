import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import NoBorderDemo from './demo/NoBorder';
import NoBorderSource from './demo/NoBorder.tsx?raw';
import SimpleDemo from './demo/Simple';
import SimpleSource from './demo/Simple.tsx?raw';
import HoverableDemo from './demo/Hoverable';
import HoverableSource from './demo/Hoverable.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import VariantDemo from './demo/Variant';
import VariantSource from './demo/Variant.tsx?raw';
import InnerCardDemo from './demo/InnerCard';
import InnerCardSource from './demo/InnerCard.tsx?raw';
import ImageDemo from './demo/Image';
import ImageSource from './demo/Image.tsx?raw';

# Card

Simple rectangular container.

## Scenario

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## Usage

```jsx
import { Card } from 'tiny-design';

const { Content } = Card;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic card

A basic card containing a title, content and an extra corner content.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Variants

Use `variant` to control the card surface style: `outlined` (default), `elevated`, or `filled`.

<DemoBlock component={VariantDemo} source={VariantSource} />

    </Demo>
    <Demo>

### No border

A borderless card on a gray background.

<DemoBlock component={NoBorderDemo} source={NoBorderSource} />

    </Demo>
    <Demo>

### Simple card

A simple card only containing a content area.

<DemoBlock component={SimpleDemo} source={SimpleSource} />

    </Demo>
    <Demo>

### Hoverable

Set `hoverable` to allow the card having a hover effect.

<DemoBlock component={HoverableDemo} source={HoverableSource} />

    </Demo>
    <Demo>

### Active

Set `active` to allow the card always in elevation.

<DemoBlock component={ActiveDemo} source={ActiveSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Inner card

It can be placed inside the ordinary card to display the information of the multilevel structure.

<DemoBlock component={InnerCardDemo} source={InnerCardSource} />

    </Demo>
    <Demo>

### Media

A card using an image to reinforce the content.

<DemoBlock component={ImageDemo} source={ImageSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property    | Description                                  | Type                                   | Default     |
| ----------- | -------------------------------------------- | -------------------------------------- | ----------- |
| variant     | card surface style                           | `outlined` \| `elevated` \| `filled`  | `outlined`  |
| title       | card title                                   | ReactNode                              | -           |
| extra       | content to render in the top-right corner    | ReactNode                              | -           |
| hoverable   | lift up when hovering card                   | boolean                                | false       |
| active      | display card with elevation shadow           | boolean                                | false       |
| bordered    | toggles rendering of the border (deprecated) | boolean                                | true        |
| actions     | the action list at the bottom of the card    | ReactNode[]              | -       |
| header      | custom header content                        | ReactNode                | -       |
| footer      | custom footer content                        | ReactNode                | -       |
| headerStyle | inline style of header container             | CSSProperties            | -       |
| bodyStyle   | inline style of body container               | CSSProperties            | -       |
| footerStyle | inline style of footer container             | CSSProperties            | -       |
| style       | style object of container                    | CSSProperties            | -       |
| className   | className of container                       | string                   | -       |