import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';
import MoreTypesDemo from './demo/MoreTypes';
import MoreTypesSource from './demo/MoreTypes.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import IconPositionDemo from './demo/IconPosition';
import IconPositionSource from './demo/IconPosition.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import LoadingIconDemo from './demo/LoadingIcon';
import LoadingIconSource from './demo/LoadingIcon.tsx?raw';
import BlockDemo from './demo/Block';
import BlockSource from './demo/Block.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';
import ShapeDemo from './demo/Shape';
import ShapeSource from './demo/Shape.tsx?raw';
import GroupInheritanceDemo from './demo/GroupInheritance';
import GroupInheritanceSource from './demo/GroupInheritance.tsx?raw';

# Button

To trigger an operation.

## Scenario

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## Usage

```jsx
import { Button } from '@tiny-design/react';

const { Group } = Button;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Variant

Use `variant` and `color` together to describe button appearance.

> `variant="link"` only changes the style. It is still a `<button>` tag. Use `<Link />` to represent real hyperlinks with `href`.

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### Semantic Colors

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

### Group Inheritance

`Button.Group` fills child props by default. Use `inheritMode="override"` to force group props onto every child.

<DemoBlock component={GroupInheritanceDemo} source={GroupInheritanceSource} />

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

### Icon Position

Use `iconPosition="end"` to render the icon after the button text.

<DemoBlock component={IconPositionDemo} source={IconPositionSource} />

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
    <Demo>

### Shape

Use `shape` to switch between `default`, `round`, and `circle`.

<DemoBlock component={ShapeDemo} source={ShapeSource} />

    </Demo>
    <Demo>

### Custom Loading Icon

Use `loadingIcon` to replace the default loading indicator.

<DemoBlock component={LoadingIconDemo} source={LoadingIconSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property     | Description                            | Type                                                                                             | Default   |
| ------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------ | --------- |
| variant      | visual variant                         | enum: `solid` &#124; `outline` &#124; `ghost` &#124; `link`                                      | `solid`   |
| color        | semantic color                         | enum: `default` &#124; `primary` &#124; `info` &#124; `success` &#124; `warning` &#124; `danger` | `default` |
| loading      | set the loading status of button       | boolean                                                                                          | false     |
| loadingIcon  | custom loading icon                    | React.ReactNode                                                                                  | -         |
| block        | fit button width to its parent width   | boolean                                                                                          | false     |
| size         | button size                            | enum: `sm` &#124; `md` &#124; `lg`                                                               | `md`      |
| disabled     | disabled state of button               | boolean                                                                                          | false     |
| shape        | button shape                           | enum: `default` &#124; `round` &#124; `circle`                                                   | `default` |
| round        | rounded button, kept for compatibility | boolean                                                                                          | false     |
| icon         | render an icon in the button           | React.ReactNode                                                                                  | -         |
| iconPosition | icon position                          | enum: `start` &#124; `end`                                                                       | `start`   |
| style        | style object of container object       | CSSProperties                                                                                    | -         |
| className    | className of container                 | string                                                                                           | -         |

For icon-only buttons, provide `aria-label`, `aria-labelledby`, or `title` for accessibility.

## Button.Group Props

| Property    | Description                           | Type                                                                                             | Default   |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------ | --------- |
| variant     | group button variant                  | enum: `solid` &#124; `outline` &#124; `ghost` &#124; `link`                                      | `solid`   |
| color       | group button color                    | enum: `default` &#124; `primary` &#124; `info` &#124; `success` &#124; `warning` &#124; `danger` | `default` |
| size        | group button size                     | enum: `sm` &#124; `md` &#124; `lg`                                                               | `md`      |
| shape       | group button shape                    | enum: `default` &#124; `round` &#124; `circle`                                                   | `default` |
| round       | rounded group, kept for compatibility | boolean                                                                                          | false     |
| disabled    | disabled state applied to children    | boolean                                                                                          | false     |
| inheritMode | child prop inheritance strategy       | enum: `fill` &#124; `override` &#124; `none`                                                     | `fill`    |
