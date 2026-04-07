import ExplicitColumnsDemo from './demo/ExplicitColumns';
import ExplicitColumnsSource from './demo/ExplicitColumns.tsx?raw';
import AutoFitDemo from './demo/AutoFit';
import AutoFitSource from './demo/AutoFit.tsx?raw';
import AlignmentGridDemo from './demo/AlignmentGrid';
import AlignmentGridSource from './demo/AlignmentGrid.tsx?raw';
import ResponsiveLayoutDemo from './demo/ResponsiveLayout';
import ResponsiveLayoutSource from './demo/ResponsiveLayout.tsx?raw';
import NamedAreasDemo from './demo/NamedAreas';
import NamedAreasSource from './demo/NamedAreas.tsx?raw';
import OffsetAutoDemo from './demo/OffsetAuto';
import OffsetAutoSource from './demo/OffsetAuto.tsx?raw';
import DashboardShellDemo from './demo/DashboardShell';
import DashboardShellSource from './demo/DashboardShell.tsx?raw';

# Grid

Build modern two-dimensional layouts with CSS Grid semantics.

## Usage

```jsx
import { Grid } from 'tiny-design';
```

## When To Use

Grid is a two-dimensional layout component built on CSS Grid. It excels when you need control over both rows **and** columns simultaneously.

- **Dashboard shells** — define named `areas` like `"sidebar header" "sidebar main"` for application-level page structure.
- **Card walls / galleries** — use `minColumnWidth` with `autoFit` to create responsive card grids that reflow without manual breakpoints.
- **Data-dense UIs** — use explicit `columns` and `rows` to build spreadsheet-like or calendar-like layouts where items span multiple rows or columns.
- **Asymmetric layouts** — use `Grid.Item colSpan` and `rowSpan` to create hero sections or featured cards that span across tracks.
- **Responsive rearrangement** — pass responsive objects to `columns`, `gap`, and `areas` to radically change the layout across breakpoints (e.g. stacking sidebar below content on mobile).

### Grid vs Grid System (Row / Col)

| | Grid | Grid System (Row / Col) |
|---|---|---|
| CSS technology | CSS Grid | Flexbox + 24-column math |
| Dimensions | Two-dimensional (rows + columns) | One-dimensional (columns only) |
| Best for | Dashboards, card walls, named areas, row spanning | Classic page columns, form layouts, marketing pages |
| Responsive | Responsive props on any value | Breakpoint props (`xs`–`xxl`) on Col |

- If you are migrating from **MUI Grid**, start with `spacing`, `rowSpacing`, `columnSpacing`, `size`, and `offset`, then adopt `areas` or `rowSpan` when you need layouts that flex grids cannot express.

## Examples

<Demo>

### Explicit Columns

Define tracks directly with `columns`.

<DemoBlock component={ExplicitColumnsDemo} source={ExplicitColumnsSource} />

</Demo>
<Demo>

### Auto Fit

Use `minColumnWidth` to create responsive cards without manual breakpoints.

<DemoBlock component={AutoFitDemo} source={AutoFitSource} />

</Demo>
<Demo>

### Item Alignment

Use `justify` and `align` to control placement inside each cell.

<DemoBlock component={AlignmentGridDemo} source={AlignmentGridSource} />

</Demo>
<Demo>

### Responsive Layout

Use responsive `columns`, `gap`, and `Grid.Item size` values, similar to MUI's breakpoint-driven grid.

<DemoBlock component={ResponsiveLayoutDemo} source={ResponsiveLayoutSource} />

</Demo>
<Demo>

### Named Areas

Use `areas` and `Grid.Item area` for dashboard-style shells that MUI's flex grid cannot express directly.

<DemoBlock component={NamedAreasDemo} source={NamedAreasSource} />

</Demo>
<Demo>

### Offset Auto

Use `offset="auto"` to push an item to the far right, similar to MUI Grid.

<DemoBlock component={OffsetAutoDemo} source={OffsetAutoSource} />

</Demo>
<Demo>

### Dashboard Shell

Use `areas` plus nested `Grid` blocks to build an application shell instead of a simple stacked demo.

<DemoBlock component={DashboardShellDemo} source={DashboardShellSource} />

</Demo>

## Props

| Property       | Description                                          | Type                                                     | Default |
| -------------- | ---------------------------------------------------- | -------------------------------------------------------- | ------- |
| columns        | grid template columns or equal columns count         | responsive `number \| CSSProperties['gridTemplateColumns']` | -    |
| rows           | grid template rows                                   | responsive `CSSProperties['gridTemplateRows']`           | -       |
| spacing        | MUI-style alias for `gap`                            | responsive ``sm` \| `md` \| `lg` \| CSSProperties['gap']`` | -    |
| gap            | gap between rows and columns                         | responsive ``sm` \| `md` \| `lg` \| CSSProperties['gap']`` | -    |
| columnSpacing  | MUI-style alias for `columnGap`                      | responsive ``sm` \| `md` \| `lg` \| CSSProperties['columnGap']`` | - |
| columnGap      | column gap                                           | responsive ``sm` \| `md` \| `lg` \| CSSProperties['columnGap']`` | - |
| rowSpacing     | MUI-style alias for `rowGap`                         | responsive ``sm` \| `md` \| `lg` \| CSSProperties['rowGap']`` | -   |
| rowGap         | row gap                                              | responsive ``sm` \| `md` \| `lg` \| CSSProperties['rowGap']`` | -   |
| minColumnWidth | min width used with auto-fit/auto-fill columns       | responsive `number \| string`                            | -       |
| autoFlow       | CSS grid auto-flow                                   | responsive `CSSProperties['gridAutoFlow']`               | -       |
| autoFit        | use `auto-fit` instead of `auto-fill` when auto grid | boolean                                                  | true    |
| justify        | justify items inside each grid cell                  | responsive `CSSProperties['justifyItems']`               | -       |
| align          | align items inside each grid cell                    | responsive `CSSProperties['alignItems']`                 | -       |
| justifyContent | distribute the whole grid inside its container       | responsive `CSSProperties['justifyContent']`             | -       |
| alignContent   | align grid tracks along the block axis               | responsive `CSSProperties['alignContent']`               | -       |
| placeItems     | shorthand for `alignItems` and `justifyItems`        | responsive `CSSProperties['placeItems']`                 | -       |
| placeContent   | shorthand for `alignContent` and `justifyContent`    | responsive `CSSProperties['placeContent']`               | -       |
| areas          | named grid-template-areas                            | responsive `string \| string[]`                          | -       |
| component      | rendered root element                                | React.ElementType                                        | `div`   |
| style          | style object of container                            | CSSProperties                                            | -       |
| className      | className of container                               | string                                                   | -       |

## Grid.Item Props

| Property    | Description                                  | Type                                            | Default |
| ----------- | -------------------------------------------- | ----------------------------------------------- | ------- |
| size        | item column span                             | responsive `number \| 'auto' \| 'grow' \| 'full'` | -    |
| offset      | push item to the right                       | responsive `number \| 'auto'`                   | -       |
| column      | raw `grid-column` value                      | responsive `CSSProperties['gridColumn']`        | -       |
| row         | raw `grid-row` value                         | responsive `CSSProperties['gridRow']`           | -       |
| colSpan     | explicit column span                         | responsive `number \| 'full'`                   | -       |
| rowSpan     | explicit row span                            | responsive `number \| 'full'`                   | -       |
| area        | named grid area                              | responsive `CSSProperties['gridArea']`          | -       |
| justifySelf | justify the item inside its own grid cell    | responsive `CSSProperties['justifySelf']`       | -       |
| alignSelf   | align the item inside its own grid cell      | responsive `CSSProperties['alignSelf']`         | -       |
| component   | rendered element for the grid item           | React.ElementType                               | `div`   |
