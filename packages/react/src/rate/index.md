import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CharacterDemo from './demo/Character';
import CharacterSource from './demo/Character.tsx?raw';
import ClearableDemo from './demo/Clearable';
import ClearableSource from './demo/Clearable.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import HalfDemo from './demo/Half';
import HalfSource from './demo/Half.tsx?raw';

# Rate

Evaluate stuff component.

## Scenario

- Show evaluation.

- A quick rating operation on something.

## Usage

```jsx
import { Rate } from '@tiny-design/react';
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

### Half star

Support select half star.

<DemoBlock component={HalfDemo} source={HalfSource} />

    </Demo>
    <Demo>

### Clear star

Support set allow to clear star when click again.

<DemoBlock component={ClearableDemo} source={ClearableSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Read only

Read only, can't be interactive.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Other Character

Replace the default star to other character like alphabet, digit, iconfont or even other language word.

<DemoBlock component={CharacterDemo} source={CharacterSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property     | Description                            | Type                    | Default |
| ------------ | -------------------------------------- | ----------------------- | ------- |
| count        | total number of stars                  | number                  | 5       |
| defaultValue | initial value                          | number                  | 0       |
| value        | controlled current value               | number                  | -       |
| half         | allow half star selection              | boolean                 | false   |
| clearable    | allow clearing by clicking again       | boolean                 | false   |
| disabled     | whether read-only                      | boolean                 | false   |
| color        | custom star color                      | string                  | -       |
| character    | custom rate character                  | ReactNode               | -       |
| onChange     | callback when value changes            | (value: number) => void | -       |
| style        | style object of container              | CSSProperties           | -       |
| className    | className of container                 | string                  | -       |
