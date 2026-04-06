# @tiny-design/tokens

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
