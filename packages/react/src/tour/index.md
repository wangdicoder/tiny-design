import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import PrimaryDemo from './demo/Primary';
import PrimarySource from './demo/Primary.tsx?raw';
import NoTargetDemo from './demo/NoTarget';
import NoTargetSource from './demo/NoTarget.tsx?raw';
import CustomIndicatorDemo from './demo/CustomIndicator';
import CustomIndicatorSource from './demo/CustomIndicator.tsx?raw';
import CoverDemo from './demo/Cover';
import CoverSource from './demo/Cover.tsx?raw';
import NoMaskDemo from './demo/NoMask';
import NoMaskSource from './demo/NoMask.tsx?raw';
import CustomButtonDemo from './demo/CustomButton';
import CustomButtonSource from './demo/CustomButton.tsx?raw';
import GapDemo from './demo/Gap';
import GapSource from './demo/Gap.tsx?raw';

# Tour

A popup component for guiding users through a product.

## Scenario

Use **Tour** to guide users through a product's features step by step, highlighting elements on the page with a popover card and a spotlight mask.

## Usage

```jsx
import { Tour } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic usage of Tour. Click the button to start a guided tour.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Primary Type

Use `type="primary"` for a colored tour card.

<DemoBlock component={PrimaryDemo} source={PrimarySource} />

    </Demo>
    <Demo>

### Cover Image

Add a `cover` to display an image or video at the top of the step card.

<DemoBlock component={CoverDemo} source={CoverSource} />

    </Demo>
    <Demo>

### Custom Gap

Use `gap` to adjust the padding and border radius of the spotlight area around the target.

<DemoBlock component={GapDemo} source={GapSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Placement

Customize the placement of the tour card relative to the target element.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### Without Target

When a step has no `target`, the card appears centered on the screen.

<DemoBlock component={NoTargetDemo} source={NoTargetSource} />

    </Demo>
    <Demo>

### Without Mask

Set `mask={false}` to hide the overlay mask.

<DemoBlock component={NoMaskDemo} source={NoMaskSource} />

    </Demo>
    <Demo>

### Custom Indicator

Use `indicatorsRender` to customize the step indicator.

<DemoBlock component={CustomIndicatorDemo} source={CustomIndicatorSource} />

    </Demo>
    <Demo>

### Custom Button Text

Use `nextButtonProps` and `prevButtonProps` to customize the navigation button text.

<DemoBlock component={CustomButtonDemo} source={CustomButtonSource} />

    </Demo>
  </Column>
</Layout>

## Tour Props

| Property              | Description                                              | Type                                                  | Default  |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------- | -------- |
| open                  | whether the tour is open                                 | boolean                                               | false    |
| current               | current step index (controlled)                          | number                                                | -        |
| steps                 | tour steps config                                        | TourStepProps[]                                       | []       |
| placement             | default placement for all steps                          | Placement                                             | `bottom` |
| arrow                 | whether to show the arrow                                | boolean                                               | true     |
| mask                  | whether to show the mask overlay                         | boolean                                               | true     |
| disabledInteraction   | disable interaction on highlighted area                  | boolean                                               | false    |
| type                  | visual type                                              | `default` &#124; `primary`                            | `default`|
| gap                   | gap between spotlight and target                         | `{ offset?: number; radius?: number }`                | `{ offset: 6, radius: 2 }` |
| zIndex                | z-index of the tour layer                                | number                                                | 1001     |
| keyboard              | enable keyboard navigation                               | boolean                                               | true     |
| scrollIntoViewOptions | scroll into view options                                 | boolean &#124; ScrollIntoViewOptions                  | true     |
| indicatorsRender      | custom indicator renderer                                | (current: number, total: number) => ReactNode         | -        |
| onChange              | callback when step changes                               | (current: number) => void                             | -        |
| onClose               | callback when tour is closed                             | () => void                                            | -        |
| onFinish              | callback when tour finishes                              | () => void                                            | -        |

## TourStepProps

| Property              | Description                                              | Type                                                  | Default  |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------- | -------- |
| target                | element the step points to                               | HTMLElement &#124; (() => HTMLElement &#124; null)     | -        |
| title                 | step title                                               | ReactNode                                             | -        |
| description           | step description                                         | ReactNode                                             | -        |
| cover                 | cover image or video                                     | ReactNode                                             | -        |
| placement             | placement relative to target                             | Placement                                             | `bottom` |
| arrow                 | whether to show the arrow                                | boolean                                               | true     |
| mask                  | whether to show the mask                                 | boolean                                               | true     |
| disabledInteraction   | disable interaction on highlighted area                  | boolean                                               | false    |
| nextButtonProps       | props for the next button                                | `{ children?: ReactNode; onClick?: () => void }`      | -        |
| prevButtonProps       | props for the previous button                            | `{ children?: ReactNode; onClick?: () => void }`      | -        |
| scrollIntoViewOptions | custom scroll behavior                                   | boolean &#124; ScrollIntoViewOptions                  | true     |
| onClose               | callback when this step is closed                        | () => void                                            | -        |
