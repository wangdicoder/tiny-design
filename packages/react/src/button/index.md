import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';
import MoreTypesDemo from './demo/MoreTypes';
import MoreTypesSource from './demo/MoreTypes.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import BlockDemo from './demo/Block';
import BlockSource from './demo/Block.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';

# Button

To trigger an operation.

## Scenario

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## Usage

```jsx
import { Button } from 'tiny-design';

const { Group } = Button;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Type

There are `default`, `primary`, `outline`, `ghost` and `link` button.

> The link type button only changes the style. It is still a `<button>` tag. Considering using a `<Link />` component to represent a hyperlink with the `href` property.

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### More Types

Different colors represent different meanings.

<DemoBlock component={MoreTypesDemo} source={MoreTypesSource} />

    </Demo>
    <Demo>

### Size

There are three different sizes, `lg`, `md`, `sm`. The default size is `md`.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Button Group

Buttons can be grouped by placing multiple `Button` components into a `Button.Group`.

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
    <Demo>

### Loading Button

Click the button to load data, then the button displays a loading state.

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Icon Button

Use icons to add more meaning to Button. You can use icon alone to save some space, or with text together.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
    <Demo>

### Disabled

Add the `disabled` property to disable the Button.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Block Button

block property will make the button fit to its parent width.

<DemoBlock component={BlockDemo} source={BlockSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property  | Description                               | Type                                  | Default   |
| --------- | ----------------------------------------- | ------------------------------------- | --------- |
| btnType   | button type                               | enum: `default` &#124; `primary` &#124; `outline` &#124; `ghost` &#124; `link` &#124; `info` &#124; `successs` &#124; `warning` &#124; `danger` | `default`    |
| loading   | set the loading status of button          | boolean                               | false     |
| block     | fit button width to its parent width      | boolean                               | false     |
| size      | button size                               | enum: `sm` &#124; `md` &#124; `lg`    | `md`      |
| disabled  | disabled state of button                  | boolean                               | false     |
| round     | rounded button                            | boolean                               | false     |
| icon      | render an icon on the left of the text    | React.ReactNode                       | -         |
| style	    | style object of container	object          | CSSProperties                         | -         |
| className	| className of container                    | string                                | -         |
