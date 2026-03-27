import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import SeparatorDemo from './demo/Separator';
import SeparatorSource from './demo/Separator.tsx?raw';

# Breadcrumb

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

## Scenario

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.
- When the application has multi-layer architecture.

## Usage

```js
import { Breadcrumb } from 'tiny-design';

const { Item } = Breadcrumb;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic Usage

The simplest use

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Separator

Customise the separator symbol.

<DemoBlock component={SeparatorDemo} source={SeparatorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### With Icon

Using an icon replaces a text or combination.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                                               | Type              | Default       |
| ----------------- | --------------------------------------------------------- | ----------------- | ------------- |
| separator         | customised separator                                      | ReactNode         | '/'           |