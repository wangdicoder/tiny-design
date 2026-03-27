import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import LabelDemo from './demo/Label';
import LabelSource from './demo/Label.tsx?raw';
import PasswordDemo from './demo/Password';
import PasswordSource from './demo/Password.tsx?raw';

# Strength Indicator

A component to measure the effectiveness of a password.

## Scenario

When use a password form.

## Usage

```jsx
import { StrengthIndicator } from 'tiny-design';
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

### Label

Display labels.

<DemoBlock component={LabelDemo} source={LabelSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Integrate with `InputPassword`

Work with `InputPassword` component.

<DemoBlock component={PasswordDemo} source={PasswordSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property  | Description                               | Type                           | Default             |
| --------- | ----------------------------------------- | ------------------------------ | ------------------- |
| blocks    | the number of indicator blocks            | number                         | 3                   |
| current   | current active value (0-based)            | number                         | -                   |
| colors    | custom colors for each block              | string[]                       | -                   |
| labels    | hint labels below blocks                  | boolean &#124; ReactNode[]     | -                   |
| style     | style object of container                 | CSSProperties                  | -                   |
| className | className of container                    | string                         | -                   |