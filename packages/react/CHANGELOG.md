# Changelog

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
