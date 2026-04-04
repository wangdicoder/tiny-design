import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import RangeSelectionDemo from './demo/RangeSelection';
import RangeSelectionSource from './demo/RangeSelection.tsx?raw';
import MultipleSelectionDemo from './demo/MultipleSelection';
import MultipleSelectionSource from './demo/MultipleSelection.tsx?raw';
import WeekNumberDemo from './demo/WeekNumber';
import WeekNumberSource from './demo/WeekNumber.tsx?raw';
import ValidRangeDemo from './demo/ValidRange';
import ValidRangeSource from './demo/ValidRange.tsx?raw';
import DotIndicatorDemo from './demo/DotIndicator';
import DotIndicatorSource from './demo/DotIndicator.tsx?raw';
import CardModeDemo from './demo/CardMode';
import CardModeSource from './demo/CardMode.tsx?raw';

# Calendar

A calendar component for displaying and selecting dates, with support for range selection, multiple selection, week numbers, keyboard navigation, and more.

## Scenario

Display a full calendar view with date selection. Useful for scheduling, event management, and date-related features.

## Usage

```jsx
import { Calendar } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A full-size calendar with date selection.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
</Layout>

<Layout>
  <Column>
    <Demo>

### Range Selection

Select a start and end date to form a range. Click a date to start, then click another to complete the range.

<DemoBlock component={RangeSelectionDemo} source={RangeSelectionSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Multiple Selection

Click dates to toggle individual selection. Great for marking availability.

<DemoBlock component={MultipleSelectionDemo} source={MultipleSelectionSource} />

    </Demo>
  </Column>
</Layout>

<Layout>
  <Column>
    <Demo>

### Week Numbers

Show ISO week numbers with `showWeekNumber` and use `weekStartsOn={1}` for Monday start. Use `weekNumberRender` to customise the week number display.

<DemoBlock component={WeekNumberDemo} source={WeekNumberSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Valid Range & Today

Restrict the calendar to a 3-month window with `validRange`. The "Today" button is shown via `showToday`.

<DemoBlock component={ValidRangeDemo} source={ValidRangeSource} />

    </Demo>
  </Column>
</Layout>

<Layout>
  <Column>
    <Demo>

### Dot Indicators

Use `dotRender` to display small colored dots on dates with events. Return `true` for the primary color or a color string.

<DemoBlock component={DotIndicatorDemo} source={DotIndicatorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Card Mode & Keyboard

Compact card calendar with keyboard navigation. Use arrow keys, Enter, and Escape. Uses `cellClassName` for weekend highlighting.

<DemoBlock component={CardModeDemo} source={CardModeSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value | Selected date (controlled) | Date | |
| defaultValue | Default selected date | Date | today |
| mode | Display mode | 'month' \| 'year' \| 'decade' | month |
| fullscreen | Full-size or card mode | boolean | true |
| selectionMode | Selection behavior | 'single' \| 'range' \| 'multiple' | single |
| rangeValue | Controlled range (range mode) | [Date, Date] \| null | |
| defaultRangeValue | Default range value | [Date, Date] \| null | |
| onRangeChange | Range change callback | (range: [Date, Date] \| null) => void | |
| multipleValue | Controlled multi-select dates | Date[] | |
| defaultMultipleValue | Default multi-select dates | Date[] | |
| onMultipleChange | Multi-select change callback | (dates: Date[]) => void | |
| weekStartsOn | First day of week (0=Sun) | 0\|1\|2\|3\|4\|5\|6 | 0 |
| showWeekNumber | Show ISO week number column | boolean | false |
| weekNumberRender | Custom render for week number | (weekNumber: number) => ReactNode | |
| showToday | Show "Today" button in footer | boolean | false |
| validRange | Restrict navigable date range | [Date, Date] | |
| disabledDate | Disable specific dates | (date: Date) => boolean | |
| cellClassName | Per-cell custom class name | (date: Date) => string | |
| cellStyle | Per-cell custom inline style | (date: Date) => CSSProperties | |
| dotRender | Dot indicator renderer | (date: Date) => boolean \| string | |
| onChange | Callback when date is selected | (date: Date) => void | |
| onSelect | Callback when a cell is clicked | (date: Date) => void | |
| onPanelChange | Callback when panel changes | (date: Date, mode: string) => void | |
| onMonthChange | Callback on month navigation | (date: Date) => void | |
| onYearChange | Callback on year navigation | (date: Date) => void | |
| dateCellRender | Custom render for date cell | (date: Date) => ReactNode | |
| monthCellRender | Custom render for month cell | (date: Date) => ReactNode | |
| headerRender | Custom header render | (config) => ReactNode | |

## Keyboard Navigation

| Key | Action |
| --- | --- |
| ← | Move focus to previous day |
| → | Move focus to next day |
| ↑ | Move focus to previous week |
| ↓ | Move focus to next week |
| Enter | Select the focused date |
| Escape | Reset focus |