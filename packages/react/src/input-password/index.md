import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import HideButtonDemo from './demo/HideButton';
import HideButtonSource from './demo/HideButton.tsx?raw';
import StrengthDemo from './demo/Strength';
import StrengthSource from './demo/Strength.tsx?raw';

# Input Password

Input component with a trigger to switch the visibility of the typed password.

## Scenario

A particle usage when the user types the password.

## Usage

```jsx
import { InputPassword } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Hide Button

The suffix button can be hidden.

<DemoBlock component={HideButtonDemo} source={HideButtonSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Integrate with `StrengthIndicator`

Work with `StrengthIndicator` component.

<DemoBlock component={StrengthDemo} source={StrengthSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property       | Description                               | Type       | Default |
| -------------- | ----------------------------------------- | ---------- | ------- |
| suffix         | whether display visible button            | boolean    | true    |
| visibleOnClick | callback when clicking the visible button | () => void | -       |
| style	         | style object of container object          |            | -       |
| className	     | className of container                    | string     | -       |