import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ClosableDemo from './demo/Closable';
import ClosableSource from './demo/Closable.tsx?raw';
import CloseBtnDemo from './demo/CloseBtn';
import CloseBtnSource from './demo/CloseBtn.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import TitleDemo from './demo/Title';
import TitleSource from './demo/Title.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';
import LoopBannerDemo from './demo/LoopBanner';
import LoopBannerSource from './demo/LoopBanner.tsx?raw';

# Alert

Alert component for feedback.

## Scenario

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

## Usage

```jsx
import { Alert } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The simplest usage for short messages.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Closable

Display a close button to allow to close the alert. Also, it is a smooth unmount when the alert is closed.

<DemoBlock component={ClosableDemo} source={ClosableSource} />

    </Demo>
    <Demo>

### With icon

A relevant icon will make information clearer and more friendly. Use `iconSize` to set default icon size. You can also customise an icon by passing an element.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### More types

There are 4 types of Alert: `success`, `info`, `warning`, `error`. The default type is **`info`**.

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### Title

Additional title for alert message.

<DemoBlock component={TitleDemo} source={TitleSource} />

    </Demo>
    <Demo>

### Customized Close Text

Replace the default icon with customized text.

<DemoBlock component={CloseBtnDemo} source={CloseBtnSource} />

    </Demo>
    <Demo>

### Loop Banner

Combine with `Marquee` component to create a scrolling banner alert. The text pauses on hover.

<DemoBlock component={LoopBannerDemo} source={LoopBannerSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property   | Description                                    | Type                                                                     | Default |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| title      | alert title                                    | string &#124; ReactNode                                                  | -       |
| type       | alert type                                     | enum: `success` &#124; `info` &#124; `warning` &#124; `error`           | `info`  |
| icon       | display icon or customise an icon              | boolean &#124; ReactNode                                                 | -       |
| iconSize   | icon size                                      | number                                                                   | -       |
| closable   | whether the alert can be closed                | boolean                                                                  | false   |
| closeText  | close text to show                             | ReactNode                                                                | -       |
| afterClose | callback when close animation is finished     | () => void                                                               | -       |
| onClose    | close button callback                          | (e: MouseEvent) => void                                                  | -       |
| style      | style object of container                      | CSSProperties                                                            | -       |
| className  | className of container                         | string                                                                   | -       |