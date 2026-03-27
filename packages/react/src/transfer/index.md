import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomDemo from './demo/Custom';
import CustomSource from './demo/Custom.tsx?raw';
import SearchDemo from './demo/Search';
import SearchSource from './demo/Search.tsx?raw';

# Transfer

Double column transfer choice box.

## When To Use

- It is a select control essentially which can be use for selecting multiple items.
- Transfer can display more information for items and take up more space.

## Usage

```jsx
import { Transfer } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The most basic usage of `Transfer` involves providing the source data and target keys arrays, plus the rendering and some callback functions.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Search

Transfer with a search box.

<DemoBlock component={SearchDemo} source={SearchSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Custom Rendering

Use `renderItem` to customize each item's display.

<DemoBlock component={CustomDemo} source={CustomSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property      | Description                                                               | Type                                                                  | Default       |
| ------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------- |
| dataSource    | used for setting the source data                                          | TransferItem[]                                                        | -             |
| value	        | a set of keys of elements that are listed on the right column             | string[]                                                              | -             |
| defaultValue	| a default set of keys of elements that are listed on the right column     | string[]                                                              | []            |
| disabled	    | whether disabled transfer                                                 | boolean                                                               | false         |
| showSearch	| whether `Transfer` is filterable                                          | boolean                                                               | false         |
| titles	    | titles for left and right panel                                           | [string, string]                                                      | -             |
| placeholder	| placeholder for both panels                                               | string                                                                | 'search'      |
| placeholders	| placeholders for left and right panel                                     | [string, string]                                                      | -             |
| buttonTexts	| custom button texts                                                       | [string, string]                                                      | -             |
| onChange	    | triggers when data items change in the right list                         | (targetKeys: string[], direction: string, moveKeys: string[]) => void | -             |
| renderItem	| custom render function for data items                                     | (item: TransferItem) => ReactNode                                     | -             |
| filterOption  | a function to determine whether an item should show in search result list | (input: string, item: TransferItem) => boolean                        | -             |

### TransferItem

```jsx
type TransferItem = {
  key: string;
  label: string;
  disabled: boolean;
};
```