import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DurationDemo from './demo/Duration';
import DurationSource from './demo/Duration.tsx?raw';
import ExtraDemo from './demo/Extra';
import ExtraSource from './demo/Extra.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';

# Message

Display global messages as feedback in response to user operations.

## Scenario

- To provide feedback such as success, warning, error etc.

- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## Usage

```jsx
import { Message } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Normal prompt

Normal message for information.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Customize duration

Customize message display duration from default `3s` to `10s`.

<DemoBlock component={DurationDemo} source={DurationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Different types of message

Messages of `info`, `success`, `warning`, `error` and `loading` types.

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### Extra action

Add an extra content to allow more action.

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
  </Column>
</Layout>

## Props

Message is called through static methods:

| Method                | Description              |
| --------------------- | ------------------------ |
| Message.success(config) | display a success message |
| Message.error(config)   | display an error message  |
| Message.warning(config) | display a warning message |
| Message.info(config)    | display an info message   |
| Message.loading(config) | display a loading message |

### Config

| Property | Description                             | Type      | Default |
| -------- | --------------------------------------- | --------- | ------- |
| content  | content of the message                  | string    | -       |
| duration | time before auto-dismiss in seconds     | number    | 3       |
| icon     | customised icon                         | ReactNode | -       |
| extra    | extra content after the message         | ReactNode | -       |