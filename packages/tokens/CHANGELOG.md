# @tiny-design/tokens

## 1.13.0

### Patch Changes

- Redesign the Split component with a product-grade pane model, refreshed separator styling, updated tokens, and rewritten docs/demos. - [`d6adb83`](https://github.com/wangdicoder/tiny-design/commit/d6adb83a06da178a2f561a55a33c0fc10bbcff74)

## 1.12.0

### Minor Changes

- Redesign the Collapse component API, styles, and docs, align the related tokens, and keep - [#109](https://github.com/wangdicoder/tiny-design/pull/109) [`58c2ea2`](https://github.com/wangdicoder/tiny-design/commit/58c2ea2b024f97a6c769cc0549780fec7d1fccfb)
  the fixed-version package group in sync for release.

## 1.11.4

### Patch Changes

- Refactor button styling to use `variant` and `color` instead of `btnType`. - [#107](https://github.com/wangdicoder/tiny-design/pull/107) [`cce1cdf`](https://github.com/wangdicoder/tiny-design/commit/cce1cdf893a7ee2a58a9503aa5158b14dce322a7)

  This is a breaking change for `Button`, `Button.Group`, and `SplitButton`.
  Button theme tokens were renamed to variant/color-based keys such as
  `button.solid.primary.bg` and `button.outline.danger.border`.

## 1.11.3

## 1.11.2

### Patch Changes

- Migrate component SCSS imports from @tiny-design/tokens to local style/variables and fix Popup positioning sync - [#101](https://github.com/wangdicoder/tiny-design/pull/101) [`ed760d5`](https://github.com/wangdicoder/tiny-design/commit/ed760d51720bd222a3d7e66c0028e82b8e9446ad)

## 1.11.1

## 1.11.0

## 1.10.0

### Minor Changes

- Add design token governance with JSON source registry, migrate all component SCSS to token variables, introduce CSS Grid layout system, and rebuild Theme Studio - [#93](https://github.com/wangdicoder/tiny-design/pull/93) [`d515c39`](https://github.com/wangdicoder/tiny-design/commit/d515c391250007d5fa3dd7e9a6d95ca9483d02a1)

## 1.9.0

### Minor Changes

- Migrate component styles from SCSS variables to CSS custom properties (`--ty-*`) for better runtime theming support. - [#90](https://github.com/wangdicoder/tiny-design/pull/90) [`49b4bfc`](https://github.com/wangdicoder/tiny-design/commit/49b4bfcba6c9536a966ba5b5a64e53b56a25da76)
  - Migrate ~80 structural SCSS constants (padding, sizing, transitions) to runtime-customizable CSS custom properties
  - Tokenize hardcoded values in Button, Input, Card, Select, and Notification components
  - Introduce component-scoped v2 CSS variables such as `--ty-button-radius` and `--ty-card-header-padding`
  - Add `ThemeConfig` support in `ConfigProvider` for semantic and component token overrides
  - Support global token overrides, component token overrides, and scoped instance overrides via CSS variables

## 1.8.0

## 1.7.0

## 1.6.2

### Patch Changes

- Add chart color tokens (chart-1 through chart-5) for light and dark themes - [#81](https://github.com/wangdicoder/tiny-design/pull/81) [`7e17617`](https://github.com/wangdicoder/tiny-design/commit/7e176176335fe696f637a15215b467c5c2612945)

## 1.6.1

## 1.6.0

## 1.5.1

## 1.5.0

## 1.4.0

### Minor Changes

- Add hover/focus/active state styles for button status types (success, info, warning, danger), add status color presets to Tag component, fix SpeedDial to use theme-aware CSS custom properties, and improve TimePicker with pending selection state committed on OK - [#68](https://github.com/wangdicoder/tiny-design/pull/68) [`006b12a`](https://github.com/wangdicoder/tiny-design/commit/006b12a59d57947b4c287e7de22bf6f830e22ca4)

## 1.3.0

## 1.2.0

## 1.1.2

## 1.1.1

## 1.1.0

## 1.0.11

## 1.0.10
