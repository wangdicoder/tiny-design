import AlignTitleDemo from './demo/AlignTitle';
import AlignTitleSource from './demo/AlignTitle.tsx?raw';
import ContentSectionDemo from './demo/ContentSection';
import ContentSectionSource from './demo/ContentSection.tsx?raw';
import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import PlainAndGapDemo from './demo/PlainAndGap';
import PlainAndGapSource from './demo/PlainAndGap.tsx?raw';
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

Divider defaults to horizontal. Horizontal dividers support inner text, line variants, and plain text styling.

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
    <Demo>

### Vertical

Use `orientation="vertical"` to render a vertical divider.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Plain And Gap

Use `plain` to reduce emphasis and `titleGap` to control title spacing.

<DemoBlock component={PlainAndGapDemo} source={PlainAndGapSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Align Title

Set the title placement to `start`, `center`, or `end`. This only applies to horizontal dividers with inner text.

<DemoBlock component={AlignTitleDemo} source={AlignTitleSource} />

    </Demo>
    <Demo>

### In Content

Use dividers as lightweight section labels inside cards, settings panels, or summaries.

<DemoBlock component={ContentSectionDemo} source={ContentSectionSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property       | Description                                            | Type                                         | Default        |
| -------------- | ------------------------------------------------------ | -------------------------------------------- | -------------- |
| orientation    | orientation of divider                                 | enum: `horizontal` &#124; `vertical`         | `horizontal`   |
| variant        | line style variant                                     | enum: `solid` &#124; `dashed` &#124; `dotted` | `solid`        |
| titlePlacement | position of title inside horizontal divider with text  | enum: `start` &#124; `center` &#124; `end`   | `center`       |
| plain          | whether divider text uses plain emphasis               | boolean                                      | false          |
| titleGap       | horizontal gap between divider title and line          | string &#124; number                         | token value    |
| style          | style object of container                              | CSSProperties                                | -              |
| className      | className of container                                 | string                                       | -              |
