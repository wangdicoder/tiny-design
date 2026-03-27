import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';
import PresenceDemo from './demo/Presence';
import PresenceSource from './demo/Presence.tsx?raw';
import AutoFontDemo from './demo/AutoFont';
import AutoFontSource from './demo/AutoFont.tsx?raw';

# Avatar

Avatars can be used to represent people or objects. It supports `image`, `Icon`, or `letter`.

## Scenario

Display user's profile picture

## Usage

```jsx
import { Avatar } from 'tiny-design';

const { Group } = Avatar;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Different sizes setting by `size` and two shapes are available.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Type

Image, Icon and letter are supported, and the latter two kinds avatar can have custom colors and background colors.

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### Group

Include multiple avatar items inside an `AvatarGroup` container.

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Presence Indicator

Avatar also support presence indicators. Add `online`, `busy`, `away` or `offline` attribute for different status colors.

<DemoBlock component={PresenceDemo} source={PresenceSource} />

    </Demo>
    <Demo>

### Auto set font size

For letter type Avatar, when the letters are too long to display, the font size can be automatically adjusted according to the width of the Avatar.

<DemoBlock component={AutoFontDemo} source={AutoFontSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Avatar

| Property  | Description                               | Type                                                          | Default   |
| --------- | ----------------------------------------- | ------------------------------------------------------------- | --------- |
| size      | avatar size                               | number                                                        | 38        |
| presence  | status indicator                          | enum: `online` &#124; `busy` &#124; `away` &#124; `offline`   | undefined |
| shape     | avatar shape                              | enum: `circle` &#124; `square`                                | `circle`  |
| icon      | pass an icon component to display         | ReactNode                                                     | -         |
| src	    | image source                              | string                                                        | -         |
| alt	    | image alt name                            | string                                                        | -         |
| style	    | style object of container	object          | CSSProperties                                                 | -         |
| className	| className of container                    | string                                                        | -         |

### Avatar.Group

| Property  | Description                               | Type                                                          | Default   |
| --------- | ----------------------------------------- | ------------------------------------------------------------- | --------- |
| gap       | the distance between two avatars          | number &#124; string                                          | -15       |