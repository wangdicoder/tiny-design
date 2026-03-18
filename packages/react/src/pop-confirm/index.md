import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import LocaleDemo from './demo/Locale';
import LocaleSource from './demo/Locale.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';

# PopConfirm

A simple and compact confirmation dialog of an action.

## Scenario

A simple and compact dialog used for asking for user confirmation.

The difference with the confirm modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

## Usage

```jsx
import { PopConfirm } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The simplest usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Placement

There are 12 placement options available.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Locale text

Set `confirmText` and `cancelText` props to customise button's labels.

<DemoBlock component={LocaleDemo} source={LocaleSource} />

    </Demo>
    <Demo>

### Customised Icon

Set `icon` props to customize the icon.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## API

Inherits all [Popover](#/components/popover) props, plus:

| Property    | Description                  | Type                     | Default   |
| ----------- | ---------------------------- | ------------------------ | --------- |
| confirmText | text of the confirm button   | string                   | `OK`      |
| cancelText  | text of the cancel button    | string                   | `Cancel`  |
| onConfirm   | confirm callback             | (e: MouseEvent) => void  | -         |
| onCancel    | cancel callback              | (e: MouseEvent) => void  | -         |
| icon        | custom icon                  | ReactNode                | -         |