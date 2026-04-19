# Changelog

## 1.13.2

### Patch Changes

- Fix TypeScript compatibility with React 19. Component prop interfaces used the pattern `React.PropsWithRef<JSX.IntrinsicElements['x']>`, which relied on a globally-augmented `JSX` namespace that `@types/react@19` no longer provides. The resolved prop types collapsed to `any`, silently dropping every intrinsic HTML attribute (`onClick`, `type`, `disabled`, `aria-*`, `children`, etc.) for consumers on React 19. Replaced the pattern with `React.ComponentProps<'x'>` / `React.ComponentPropsWithoutRef<'x'>` across ~60 component type files. Works on React 18 and 19. - [#121](https://github.com/wangdicoder/tiny-design/pull/121) [`e928d14`](https://github.com/wangdicoder/tiny-design/commit/e928d14f27b73a2ee9d18454a87122cc22ebd5b3)

## 1.13.1

### Patch Changes

- Redesign the Statistic component with a product-grade metric API, richer states, improved docs guidance, and updated dashboard demos. - [#118](https://github.com/wangdicoder/tiny-design/pull/118) [`83a8994`](https://github.com/wangdicoder/tiny-design/commit/83a8994a8f6e168db64380fc871d6adeee8873a1)

- Redesign the Descriptions component with a new data-driven API, responsive columns, semantic rendering modes, richer docs demos, and updated layout behavior. - [#117](https://github.com/wangdicoder/tiny-design/pull/117) [`ff862e1`](https://github.com/wangdicoder/tiny-design/commit/ff862e162b88b08369ce2fc85521b864151f9687)

## 1.13.0

### Patch Changes

- Fix image loading, fallback handling, and demo behavior. - [#115](https://github.com/wangdicoder/tiny-design/pull/115) [`b853a9e`](https://github.com/wangdicoder/tiny-design/commit/b853a9edb13a0cf81b955c9ef6705251a41d568f)

- Redesign the Split component with a product-grade pane model, refreshed separator styling, updated tokens, and rewritten docs/demos. - [`d6adb83`](https://github.com/wangdicoder/tiny-design/commit/d6adb83a06da178a2f561a55a33c0fc10bbcff74)

## 1.12.0

### Minor Changes

- Redesign the Collapse component API, styles, and docs, align the related tokens, and keep - [#109](https://github.com/wangdicoder/tiny-design/pull/109) [`58c2ea2`](https://github.com/wangdicoder/tiny-design/commit/58c2ea2b024f97a6c769cc0549780fec7d1fccfb)
  the fixed-version package group in sync for release.

## 1.11.4

### Patch Changes

- Revamp `Divider` with a new API: replace `type`, `align`, and `dashed` with `orientation`, `titlePlacement`, `variant`, `plain`, and `titleGap`. - [#105](https://github.com/wangdicoder/tiny-design/pull/105) [`b6e03be`](https://github.com/wangdicoder/tiny-design/commit/b6e03bea891fad18bff1e354e47f6398f4ee093a)

- Refactor button styling to use `variant` and `color` instead of `btnType`. - [#107](https://github.com/wangdicoder/tiny-design/pull/107) [`cce1cdf`](https://github.com/wangdicoder/tiny-design/commit/cce1cdf893a7ee2a58a9503aa5158b14dce322a7)

  This is a breaking change for `Button`, `Button.Group`, and `SplitButton`.
  Button theme tokens were renamed to variant/color-based keys such as
  `button.solid.primary.bg` and `button.outline.danger.border`.

## 1.11.3

### Patch Changes

- Normalize Dropdown overlay menus to hover-only feedback and align grouped popup item styling with the rest of the dropdown menu. - [#103](https://github.com/wangdicoder/tiny-design/pull/103) [`3928009`](https://github.com/wangdicoder/tiny-design/commit/3928009290bdaf506d5a0a6ce435d2a7ef328626)

## 1.11.2

### Patch Changes

- Migrate component SCSS imports from @tiny-design/tokens to local style/variables and fix Popup positioning sync - [#101](https://github.com/wangdicoder/tiny-design/pull/101) [`ed760d5`](https://github.com/wangdicoder/tiny-design/commit/ed760d51720bd222a3d7e66c0028e82b8e9446ad)

## 1.11.1

### Patch Changes

- Fix React component behavior and update demos to follow theme tokens. - [#99](https://github.com/wangdicoder/tiny-design/pull/99) [`c7abb00`](https://github.com/wangdicoder/tiny-design/commit/c7abb00cc45fbfdcf1107457c55374496a81c339)

## 1.11.0

### Minor Changes

- Add `scrollToSelected` prop to Select component that automatically scrolls the dropdown to the first selected option when opened - [#96](https://github.com/wangdicoder/tiny-design/pull/96) [`4fdb8a0`](https://github.com/wangdicoder/tiny-design/commit/4fdb8a006537b648282e15d4f5126ed044974361)

### Patch Changes

- Fix popup positioning and interaction regressions across overlay-based React components, and align related input, table, tree, tour, and upload behaviors - [#98](https://github.com/wangdicoder/tiny-design/pull/98) [`12b5f5d`](https://github.com/wangdicoder/tiny-design/commit/12b5f5d5decfdebcffde3a721006dee478b31938)

## 1.10.0

### Minor Changes

- Add design token governance with JSON source registry, migrate all component SCSS to token variables, introduce CSS Grid layout system, and rebuild Theme Studio - [#93](https://github.com/wangdicoder/tiny-design/pull/93) [`d515c39`](https://github.com/wangdicoder/tiny-design/commit/d515c391250007d5fa3dd7e9a6d95ca9483d02a1)

## 1.9.0

### Minor Changes

- Upgrade the global configuration infrastructure around `ConfigProvider` and align popup, scroll, and static layer behavior across the component library. - [#90](https://github.com/wangdicoder/tiny-design/pull/90) [`49b4bfc`](https://github.com/wangdicoder/tiny-design/commit/49b4bfcba6c9536a966ba5b5a64e53b56a25da76)

  Highlights:
  - Reworked `ConfigProvider` to use provider-scoped theme containers instead of mutating global HTML styles.
  - Added `ConfigProvider.useConfig()` and `ConfigProvider.config({ holderRender })` support for a wider set of static APIs.
  - Added static `Modal.open()` and `Modal.confirm()` APIs that participate in the shared static host pipeline.
  - Unified popup container resolution across `Portal`, `Popup`, and `Cascader`.
  - Unified target container resolution across `Anchor`, `Sticky`, `BackTop`, `Overlay`, and `Tour`.
  - Improved `Sticky` container observation with `ResizeObserver`.
  - Improved `useTheme()` to sync with DOM state, localStorage, system preference changes, and cross-tab storage events.
  - Added `onCopy` to `CopyToClipboard` so copy results can be observed by consumers.

  Notes for consumers:
  - `Anchor` and `BackTop` now accept and resolve `Window` as a first-class target container shape.
  - `BackTop` now defaults to `ConfigProvider.getTargetContainer()` when present.
  - `ConfigProvider` only renders an internal scope node when scoped theme behavior is required.
  - Static APIs such as `Message.*`, `Notification.*`, `LoadingBar.*`, and `Modal.open()` can now be wrapped consistently through `ConfigProvider.config({ holderRender })`.

- Migrate component styles from SCSS variables to CSS custom properties (`--ty-*`) for better runtime theming support. - [#90](https://github.com/wangdicoder/tiny-design/pull/90) [`49b4bfc`](https://github.com/wangdicoder/tiny-design/commit/49b4bfcba6c9536a966ba5b5a64e53b56a25da76)
  - Migrate ~80 structural SCSS constants (padding, sizing, transitions) to runtime-customizable CSS custom properties
  - Tokenize hardcoded values in Button, Input, Card, Select, and Notification components
  - Introduce component-scoped v2 CSS variables such as `--ty-button-radius` and `--ty-card-header-padding`
  - Add `ThemeConfig` support in `ConfigProvider` for semantic and component token overrides
  - Support global token overrides, component token overrides, and scoped instance overrides via CSS variables

## 1.8.0

### Minor Changes

- Add Tour component for step-by-step product guides with spotlight mask, Popper.js positioning, keyboard navigation, and customizable step indicators - [#88](https://github.com/wangdicoder/tiny-design/pull/88) [`57c2f38`](https://github.com/wangdicoder/tiny-design/commit/57c2f3813c74410cfc8208ed3591bb46c7804899)

- Calendar: add range selection, multiple selection, keyboard navigation, week numbers, valid range, dot indicators, decade panel, and card mode. DatePicker: add range mode with date range selection and preview highlighting. - [#87](https://github.com/wangdicoder/tiny-design/pull/87) [`a0b3e45`](https://github.com/wangdicoder/tiny-design/commit/a0b3e45046afa5626e616ca632ec015aafbc0322)

## 1.7.0

### Minor Changes

- Add `variant` prop to Card component (`outlined`, `elevated`, `filled`). Fix NativeSelect children type to accept arrays. Make Table ColumnType `dataIndex` optional for action columns. - [#85](https://github.com/wangdicoder/tiny-design/pull/85) [`6ab92fd`](https://github.com/wangdicoder/tiny-design/commit/6ab92fdf5b081e399d0e756909690ac267607a9e)

- feat(tag): add `variant` prop with `filled`, `soft`, `solid`, and `outlined` styles - [#83](https://github.com/wangdicoder/tiny-design/pull/83) [`2a2dc57`](https://github.com/wangdicoder/tiny-design/commit/2a2dc57a998b789aef4d998151c63fa0271685ea)

- - Table: use Checkbox/Radio components, fix selection bugs with pagination and sorting, improve type definitions - [#86](https://github.com/wangdicoder/tiny-design/pull/86) [`6ff73db`](https://github.com/wangdicoder/tiny-design/commit/6ff73db28ecff56b2c89813a432ef66abead834c)
  - List: use semantic `<ul>`/`<li>` elements, add forwardRef to ListItemMeta, fix paginated renderItem index, add ARIA attributes
  - Loader: redesign spinner with CSS-only border animation, remove dot elements
  - Button: fix icon container shrinking in flex layout
  - useVirtualScroll: add `enabled` option

## 1.6.2

## 1.6.1

### Patch Changes

- Improve color-picker, slider, split, popup, and input-otp components; add @tiny-design/mcp server package with component, token, and icon tools - [#76](https://github.com/wangdicoder/tiny-design/pull/76) [`5b4641d`](https://github.com/wangdicoder/tiny-design/commit/5b4641d1a6a359093dc82ee258ab234a1200f59e)

## 1.6.0

### Minor Changes

- Add ScrollNumber component with animated digit transitions and shortest-path scrolling; integrate into Badge for smooth count animations. Add TextLoop component for cycling through children with vertical slide transitions. - [#74](https://github.com/wangdicoder/tiny-design/pull/74) [`2f215ca`](https://github.com/wangdicoder/tiny-design/commit/2f215cacd199ab2d7433b9f7de2241bf8fc46c51)

## 1.5.1

### Patch Changes

- Fix React warnings (missing keys, nested buttons, DOM attribute leaks, setState during render, infinite loop) and Alert title margin - [#72](https://github.com/wangdicoder/tiny-design/pull/72) [`08f4b2a`](https://github.com/wangdicoder/tiny-design/commit/08f4b2ac4b564c5d498ce96834a8f112cbd93534)

## 1.5.0

### Minor Changes

- Add Marquee component for infinite horizontal scrolling with configurable direction, speed, pause-on-hover, edge fade, and infinite/once play modes - [#70](https://github.com/wangdicoder/tiny-design/pull/70) [`36cad31`](https://github.com/wangdicoder/tiny-design/commit/36cad31a235bd2bd0e9f71e8ec92a4e33517d6cd)

## 1.4.0

### Minor Changes

- Add hover/focus/active state styles for button status types (success, info, warning, danger), add status color presets to Tag component, fix SpeedDial to use theme-aware CSS custom properties, and improve TimePicker with pending selection state committed on OK - [#68](https://github.com/wangdicoder/tiny-design/pull/68) [`006b12a`](https://github.com/wangdicoder/tiny-design/commit/006b12a59d57947b4c287e7de22bf6f830e22ca4)

## 1.3.0

### Minor Changes

- Replace react-transition-group with a custom useTransition hook for CSS-driven animations. This removes the unmaintained dependency and prepares the library for React 19 compatibility. - [#66](https://github.com/wangdicoder/tiny-design/pull/66) [`2d3e756`](https://github.com/wangdicoder/tiny-design/commit/2d3e756674c47058180981b304af84f181f63027)

## 1.2.0

### Minor Changes

- Add Waterfall (masonry) layout component with responsive columns, gutter spacing, dynamic add/remove with animations, and image gallery support - [#64](https://github.com/wangdicoder/tiny-design/pull/64) [`788f763`](https://github.com/wangdicoder/tiny-design/commit/788f76327ea104f33b4602ffe36dca341818ac3d)

## 1.1.2

### Patch Changes

- fix: preserve FormInstance across re-renders in useForm hook - [#62](https://github.com/wangdicoder/tiny-design/pull/62) [`ee696d0`](https://github.com/wangdicoder/tiny-design/commit/ee696d06cab1e4cb510200b11a0118a770f81cc5)

## 1.1.1

### Patch Changes

- - Fix the AutoComplete component export issue - [#60](https://github.com/wangdicoder/tiny-design/pull/60) [`a2ea544`](https://github.com/wangdicoder/tiny-design/commit/a2ea544f2c9bf516218a14f831010c84131bff26)
  - Some components' font family issue

## 1.1.0

### Minor Changes

- Improve `InputOTP` behaviour: - [#54](https://github.com/wangdicoder/tiny-design/pull/54) [`b81d406`](https://github.com/wangdicoder/tiny-design/commit/b81d40600573110565837dbde712bc778a3238d9)
  - Fire `onChange` on every value update instead of only when all cells are filled.
  - Fix masked cell rendering logic.
  - Adjust caret colour to follow current text colour.
  - Update docs and tests for the new behaviour and add Chinese docs entry.

## 1.0.11

### Patch Changes

- Fixed Input.Addon passing `size` prop to non-input children (e.g. icons), which caused icons to render oversized. - [#52](https://github.com/wangdicoder/tiny-design/pull/52) [`927034e`](https://github.com/wangdicoder/tiny-design/commit/927034edfc4e5f99decb3ba04e99e7ac07365c5e)

## 1.0.10

### Patch Changes

- Fix conditional hook call in Heading component - [#50](https://github.com/wangdicoder/tiny-design/pull/50) [`582bc46`](https://github.com/wangdicoder/tiny-design/commit/582bc46828a5a8032ee9fe4d98ead5f0d547f61e)
