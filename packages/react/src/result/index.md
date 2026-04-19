import SuccessDemo from './demo/Success';
import SuccessSource from './demo/Success.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import ErrorDemo from './demo/Error';
import ErrorSource from './demo/Error.tsx?raw';
import WarningDemo from './demo/Warning';
import WarningSource from './demo/Warning.tsx?raw';
import InfoDemo from './demo/Info';
import InfoSource from './demo/Info.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';

# Result

Used to feed back the results of a series of operational tasks.

## Scenario

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## Usage

```jsx
import { Result } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Success

Show successful results.

<DemoBlock component={SuccessDemo} source={SuccessSource} />

    </Demo>
    <Demo>

### Loading

The result is in a loading status.

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### Error

A complicated error feedback.

<DemoBlock component={ErrorDemo} source={ErrorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Warning

The result of the warning.

<DemoBlock component={WarningDemo} source={WarningSource} />

    </Demo>
    <Demo>

### Info

Show processing results.

<DemoBlock component={InfoDemo} source={InfoSource} />

    </Demo>
    <Demo>

### Customised icon.

Pass `icon` attribute to set the icon.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property  | Description                                           | Type                                                                              | Default   |
| --------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- | --------- |
| title     | title field                                           | ReactNode                                                                         | -         |
| subtitle  | subtitle field                                        | ReactNode                                                                         | -         |
| status    | display different icon to indicate the result status  | enum: `success` &#124; `error` &#124; `info` &#124; `warning` &#124; `loading`    | -         |
| icon      | customised icon                                       | ReactNode                                                                         | -         |
| extra     | operating area                                        | ReactNode                                                                         | -         |
| style	    | style object of container	object                      | CSSProperties                                                                     | -         |
| className	| className of container                                | string                                                                            | -         |