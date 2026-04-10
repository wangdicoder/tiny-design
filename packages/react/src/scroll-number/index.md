import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import TitlePrefixSuffixDemo from './demo/TitlePrefixSuffix';
import TitlePrefixSuffixSource from './demo/TitlePrefixSuffix.tsx?raw';
import DurationDemo from './demo/Duration';
import DurationSource from './demo/Duration.tsx?raw';
import CustomStyleDemo from './demo/CustomStyle';
import CustomStyleSource from './demo/CustomStyle.tsx?raw';

# ScrollNumber

Animate number transitions with a vertical rolling effect. Each digit scrolls independently when the value changes, creating a mechanical counter effect.

## Scenario

Used in dashboards, stat counters, badges, and anywhere numbers change dynamically and the transition should be visually engaging.

## Usage

```jsx
import { ScrollNumber } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Click the buttons to change the value and see the scroll animation.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Animation Duration

Compare different animation speeds side by side.

<DemoBlock component={DurationDemo} source={DurationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Title, Prefix & Suffix

Display with title, prefix, suffix, and precision like a Statistic component.

<DemoBlock component={TitlePrefixSuffixDemo} source={TitlePrefixSuffixSource} />

    </Demo>
    <Demo>

### Custom Style

Customize font size, color, className, and separator via `valueStyle`, `valueClassName`, and `groupSeparator`.

<DemoBlock component={CustomStyleDemo} source={CustomStyleSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value | The number to display | `number \| string` | - |
| title | Title displayed above the value | `ReactNode` | - |
| duration | Animation duration in milliseconds | `number` | `300` |
| precision | Number of decimal places | `number` | - |
| groupSeparator | Thousands separator character | `string` | `','` |
| prefix | Content before the number | `ReactNode` | - |
| suffix | Content after the number | `ReactNode` | - |
| valueClassName | Custom class name for the value container | `string` | - |
| valueStyle | Custom style for the value container | `CSSProperties` | - |
