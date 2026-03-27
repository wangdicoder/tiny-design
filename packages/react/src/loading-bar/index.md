import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';

# Loading Bar

To show current progress.

## Scenario

Display a loading bar on the top of a browser to show that the content is fetching and rendering.

## Usage

```jsx
import { LoadingBar } from 'tiny-design';

LoadingBar.start();
LoadingBar.succeed();
LoadingBar.fail();
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
  </Column>
</Layout>

## Props

LoadingBar is called through static methods:

| Method              | Description                | Type       |
| ------------------- | -------------------------- | ---------- |
| LoadingBar.start()  | start the loading bar      | () => void |
| LoadingBar.succeed() | complete with success     | () => void |
| LoadingBar.fail()   | complete with failure      | () => void |
