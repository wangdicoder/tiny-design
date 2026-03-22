# Changelog

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

## [1.0.9](https://github.com/wangdicoder/tiny-ui/compare/v1.0.7...v1.0.8) (2026-03-12)

### Refactors

- move withSpin HOC from icons to react package ([64a835d](https://github.com/wangdicoder/tiny-ui/commit/64a835d))

## [1.0.6](https://github.com/wangdicoder/tiny-ui/compare/v1.0.5...v1.0.6) (2026-03-12)

### Bug Fixes

- replace deprecated `<Icon>` with named icon components in demos ([e51fca5](https://github.com/wangdicoder/tiny-ui/commit/e51fca5))

## [1.0.5](https://github.com/wangdicoder/tiny-ui/compare/v1.0.4...v1.0.5) (2026-03-12)

### Features

- add withSpin HOC for spinning icon variants ([0129863](https://github.com/wangdicoder/tiny-ui/commit/0129863))

## [1.0.4](https://github.com/wangdicoder/tiny-ui/compare/v1.0.3...v1.0.4) (2026-03-12)

### Features

- extract `@tiny-design/icons` package with tree-shakeable SVG icons ([2378f8d](https://github.com/wangdicoder/tiny-ui/commit/2378f8d))

### Refactors

- migrate to pnpm monorepo with turborepo ([52e6c47](https://github.com/wangdicoder/tiny-ui/commit/52e6c47))
- consume @tiny-design/tokens from react package ([a66e078](https://github.com/wangdicoder/tiny-ui/commit/a66e078))
- rename npm scope from @tiny-ui to @tiny-design ([1f7c1bc](https://github.com/wangdicoder/tiny-ui/commit/1f7c1bc))

## [1.0.3](https://github.com/wangdicoder/tiny-ui/compare/v1.0.2...v1.0.3) (2026-03-11)

### Bug Fixes

- make light mode the default and use data-tiny-theme attribute ([bdd69b4](https://github.com/wangdicoder/tiny-ui/commit/bdd69b4))
- unit tests ([4f78b3c](https://github.com/wangdicoder/tiny-ui/commit/4f78b3c))

## [1.0.2](https://github.com/wangdicoder/tiny-ui/compare/v1.0.1...v1.0.2) (2026-03-11)

### Bug Fixes

- CSSTransition issue ([5275a17](https://github.com/wangdicoder/tiny-ui/commit/5275a17))

### Refactors

- reuse Pagination component in Table and List ([444b9a0](https://github.com/wangdicoder/tiny-ui/commit/444b9a0))
- unify component file structure so index.tsx only re-exports ([60bed2d](https://github.com/wangdicoder/tiny-ui/commit/60bed2d))

## [1.0.1](https://github.com/wangdicoder/tiny-ui/compare/v1.0.0...v1.0.1) (2026-03-10)

### Bug Fixes

- `<Pagination />` - prevent custom props from leaking to DOM element ([#41](https://github.com/wangdicoder/tiny-ui/issues/41)) ([4b5103a](https://github.com/wangdicoder/tiny-ui/commit/4b5103a))
- `<Grid />` - accept single Col element in RowProps ([#36](https://github.com/wangdicoder/tiny-ui/issues/36)) ([6edf326](https://github.com/wangdicoder/tiny-ui/commit/6edf326))
- CSSTransition issue ([5275a17](https://github.com/wangdicoder/tiny-ui/commit/5275a17))

## [1.0.0](https://github.com/wangdicoder/tiny-ui/compare/v0.0.94...v1.0.0) (2026-03-10)

### Features

- `<Flex />` - add Flex component for lightweight flexbox layouts ([a5029cb](https://github.com/wangdicoder/tiny-ui/commit/a5029cb))
- `<Anchor />` - enhance with scroll container, link registration, and line type ([ad06647](https://github.com/wangdicoder/tiny-ui/commit/ad06647))
- `<AutoComplete />` - rewrite with filtering, keyboard nav, and Popup ([3f1f674](https://github.com/wangdicoder/tiny-ui/commit/3f1f674))
- `<SpeedDial />` - add new Speed Dial component
- `<Select />` - rewrite with shared useCombobox hook ([8e726d3](https://github.com/wangdicoder/tiny-ui/commit/8e726d3))
- `<Segmented />` - add demos and fix disabled cursor on items ([94affee](https://github.com/wangdicoder/tiny-ui/commit/94affee))
- `<ColorPicker />` - add demos and remove unused size prop ([6c974e6](https://github.com/wangdicoder/tiny-ui/commit/6c974e6))
- `<Cascader />` - fix caret rotation and add changeOnSelect demo ([97a3b4d](https://github.com/wangdicoder/tiny-ui/commit/97a3b4d))
- `<Statistic />` - add formatter and value style demos ([25a7652](https://github.com/wangdicoder/tiny-ui/commit/25a7652))
- Dark mode support ([e88fa43](https://github.com/wangdicoder/tiny-ui/commit/e88fa43))
- Locale (i18n) support with useLocale hook ([6f049cb](https://github.com/wangdicoder/tiny-ui/commit/6f049cb))

### Bug Fixes

- `<BackTop />` - reset native button styles and support custom children ([095da1e](https://github.com/wangdicoder/tiny-ui/commit/095da1e))
- `<Tabs />` - reduce editable-card add button size to match tab height ([492cd06](https://github.com/wangdicoder/tiny-ui/commit/492cd06))
- `<ColorPicker />` - show not-allowed cursor in disabled state ([17eba92](https://github.com/wangdicoder/tiny-ui/commit/17eba92))
- `<SpeedDial />` - replace deprecated darken() with color.adjust() ([98f470a](https://github.com/wangdicoder/tiny-ui/commit/98f470a))
- `<Grid />` - fix responsive breakpoints and gutter wrapping ([19ff93c](https://github.com/wangdicoder/tiny-ui/commit/19ff93c))
- `<Layout />` - fix sidebar trigger position and add collapsible demo ([4ef6ad3](https://github.com/wangdicoder/tiny-ui/commit/4ef6ad3))
- `<InputNumber />` - implement precision prop to fix floating point errors ([30be362](https://github.com/wangdicoder/tiny-ui/commit/30be362))
- `<Menu />` - only pass overlayClassName to SubMenu children ([383ccf5](https://github.com/wangdicoder/tiny-ui/commit/383ccf5))
- Fix CSSTransition findDOMNode deprecation warning ([d3d550c](https://github.com/wangdicoder/tiny-ui/commit/d3d550c))
- Render picker dropdowns via portal to prevent clipping ([3d67750](https://github.com/wangdicoder/tiny-ui/commit/3d67750))

### Refactors

- Unify picker dropdowns to use Popup instead of createPortal ([6909813](https://github.com/wangdicoder/tiny-ui/commit/6909813))
- Extract shared useCombobox hook for Select and AutoComplete ([8e726d3](https://github.com/wangdicoder/tiny-ui/commit/8e726d3))

### [0.0.94](https://github.com/wangdicoder/tiny-ui/compare/v0.0.93...v0.0.94) (2020-10-25)

### Bug Fixes

- `<Button />` danger type ([c280e07](https://github.com/wangdicoder/tiny-ui/commit/c280e0703614acd33670879af14b1b0817320093))
- `<Split />` - resizer `onMouseDown` event ([73d74eb](https://github.com/wangdicoder/tiny-ui/commit/73d74eb09bafc2e925144e266716d2a708bb0262))

### [0.0.93](https://github.com/wangdicoder/tiny-ui/compare/v0.0.92...v0.0.93) (2020-08-09)

### Bug Fixes

- `<Button />` - fix ButtonGroup style in focus state ([#9](https://github.com/wangdicoder/tiny-ui/issues/9)) ([29e88ac](https://github.com/wangdicoder/tiny-ui/commit/29e88ac4fff455ffdb4240f368e394bbcfc71bfb))

### [0.0.92](https://github.com/wangdicoder/tiny-ui/compare/v0.0.91...v0.0.92) (2020-07-25)

### Features

- `<Dropdown />` component ([2e34756](https://github.com/wangdicoder/tiny-ui/commit/2e34756ee1e6eab63ef6a1795f61d10262f2ba9f))

### [0.0.91](https://github.com/wangdicoder/tiny-ui/compare/v0.0.90...v0.0.91) (2020-06-13)

### Features

- `<Tree />` component ([9c7edd8](https://github.com/wangdicoder/tiny-ui/commit/9c7edd89adfdfbd0560df8de3f6f0b2568e50c04))
- `<StrengthIndicator />` component ([89290f9](https://github.com/wangdicoder/tiny-ui/commit/89290f9a0b24c0e80f3c16e6ee0413da65f729bc))

### Bug Fixes

- `<Checkbox />` - make indeterminate status is higher than checked status ([f917ef6](https://github.com/wangdicoder/tiny-ui/commit/f917ef69ee077ae28bd2bfd6c8c9c8cb4c9f963c))

### [0.0.90](https://github.com/wangdicoder/tiny-ui/compare/v0.0.89...v0.0.90) (2020-06-06)

### Features

- `<Descriptions />` component ([ba76e8a](https://github.com/wangdicoder/tiny-ui/commit/ba76e8a1e42f690b620b81aab08ea9ea2c5142ec))
- `<Form />` component ([4fa746c](https://github.com/wangdicoder/tiny-ui/commit/4fa746c9350f673f69dfefca08e5e24fbf5d42fa))

### Bug Fixes

- `<Button />` - disabled styles ([53a4c2f](https://github.com/wangdicoder/tiny-ui/commit/53a4c2fa6eb3ad212e276b803312ea679bcd4ed0))

### [0.0.89](https://github.com/wangdicoder/tiny-ui/compare/v0.0.88...v0.0.89) (2020-05-30)

### Features

- `<Icon />` component ([ac7abb8](https://github.com/wangdicoder/tiny-ui/commit/ac7abb8302167f2e0d35a217d23f9529941fd8df))
- `<Sticky />` component ([7a1fe40](https://github.com/wangdicoder/tiny-ui/commit/7a1fe40653d0821e4c10f9314905848d03bb451c))
- `<Transfer />` component ([488d8b5](https://github.com/wangdicoder/tiny-ui/commit/488d8b5e57c00ddc69f6ae6dc13c0ffac30e4dff))

### Bug Fixes

- `<Checkbox />` - disabled styles when unchecked status ([967e524](https://github.com/wangdicoder/tiny-ui/commit/967e524c4a040e7c2238d288c88c6612b54663a6))

### [0.0.88](https://github.com/wangdicoder/tiny-ui/compare/v0.0.87...v0.0.88) (2020-05-25)

### Features

- `<ConfigProvider />` - add `space` setting ([6e101ae](https://github.com/wangdicoder/tiny-ui/commit/6e101aecf75441c1377d48a4fd61b23eac606e39))
- `<Space />` component ([47e3239](https://github.com/wangdicoder/tiny-ui/commit/47e3239d1f6679277f957f73aa30743a7c0a5186))

### [0.0.87](https://github.com/wangdicoder/tiny-ui/compare/v0.0.86...v0.0.87) (2020-05-24)

### Features

- `<Steps />` component ([a3cf1da](https://github.com/wangdicoder/tiny-ui/commit/a3cf1daddf0e51b67d41b7f9514eaf23075adea9))

### Bug Fixes

- `<Switch />` onClick event ([b9bf106](https://github.com/wangdicoder/tiny-ui/commit/b9bf10623ed512ac5c42cb1a0e9e4646015fcadf))
- `<Timeline />` - centered timeline ([98ed541](https://github.com/wangdicoder/tiny-ui/commit/98ed5410945f5b543b54ac6d247455da7f1246a1))
- `<Transition />` props - union types issue ([bd5a809](https://github.com/wangdicoder/tiny-ui/commit/bd5a8095cd9c09f21181bdb506309d6349f7580b))

### [0.0.86](https://github.com/wangdicoder/tiny-ui/compare/v0.0.85...v0.0.86) (2020-05-21)

### Features

- `<Split />` component ([2eb08c6](https://github.com/wangdicoder/tiny-ui/commit/2eb08c663e5a8b5eb7d82224d85042ab66ac2ef9))

### [0.0.85](https://github.com/wangdicoder/tiny-ui/compare/v0.0.84...v0.0.85) (2020-05-18)

### Features

- `<Slider />` component ([a5d4f65](https://github.com/wangdicoder/tiny-ui/commit/a5d4f6544494e9bd89bc8ca0de728fbc471b8fca))
- `<Avatar.Group />` adds a gap prop ([1fa246a](https://github.com/wangdicoder/tiny-ui/commit/1fa246aa2129dc65de97feb8abaec523956c8973))
- provide a portal option to render the popup content ([3c73c28](https://github.com/wangdicoder/tiny-ui/commit/3c73c28142188008d4e8d87fa27a0b81b8f29845))

### Bug Fixes

- `<Slider />` issue in the vertical mode ([3e5341f](https://github.com/wangdicoder/tiny-ui/commit/3e5341f19655d00650a73f5ac0caf8273b3ee389))

### [0.0.84](https://github.com/wangdicoder/tiny-ui/compare/v0.0.83...v0.0.84) (2020-05-10)

### Features

- `<Typography />` component ([4963cbb](https://github.com/wangdicoder/tiny-ui/commit/4963cbbef5d72f46806ef283a1181b83327501b4))

### [0.0.83](https://github.com/wangdicoder/tiny-ui/compare/v0.0.82...v0.0.83) (2020-05-09)

### Features

- `<ConfigProvider />` component ([116d3bd](https://github.com/wangdicoder/tiny-ui/commit/116d3bdcdbdf58a6e3e30fc9b92f821a8a27307a))

### [0.0.82](https://github.com/wangdicoder/tiny-ui/compare/v0.0.81...v0.0.82) (2020-05-01)

### Bug Fixes

- `<Popover />` - click again to hide ([75d4e8e](https://github.com/wangdicoder/tiny-ui/commit/75d4e8eadd3eeaff3157282883412d11cbe2a9f2))

### [0.0.81](https://github.com/wangdicoder/tiny-ui/compare/v0.0.80...v0.0.81) (2020-04-25)

### Features

- `<Menu />` component ([f9fd68e](https://github.com/wangdicoder/tiny-ui/commit/f9fd68e738b20b8de953f4783c1cbe230c13052e))

### [0.0.80](https://github.com/wangdicoder/tiny-ui/compare/v0.0.79...v0.0.80) (2020-04-25)

### Features

- `<Link />` component ([01bebbb](https://github.com/wangdicoder/tiny-ui/commit/01bebbb68e518321c5112bc133469dcd5aa915c2))
- `<CopyToClipboard />` component ([442b3eb](https://github.com/wangdicoder/tiny-ui/commit/442b3eb0d3740ac92699b7c1e0f608bbdb932e5b))

### [0.0.79](https://github.com/wangdicoder/tiny-ui/compare/v0.0.78...v0.0.79) (2020-03-18)

### Features

- `<Card />` component ([e933d30](https://github.com/wangdicoder/tiny-ui/commit/e933d309aa34c7d276054adef4d5b50eea5fba7b))
- `<BackTop />` component ([63d9c1a](https://github.com/wangdicoder/tiny-ui/commit/63d9c1abdc01835d01c1935027e74b12877ae19d))

### Bug Fixes

- `<InputNumber />` value type ([3c07ea6](https://github.com/wangdicoder/tiny-ui/commit/3c07ea692302f9dc2f59d729f2e58d943517a0ef))
- no display name warning ([14e160b](https://github.com/wangdicoder/tiny-ui/commit/14e160bbb61a3b57f127a5f6c81ac61d36e1ebb5))

### [0.0.78](https://github.com/wangdicoder/tiny-ui/compare/v0.0.77...v0.0.78) (2020-01-09)

### Features

- `<AspectRatio />` component ([52e3183](https://github.com/wangdicoder/tiny-ui/commit/52e3183e27547c776146901bc252f9bd3002997b))
- `<Image />` component ([7d4e4a8](https://github.com/wangdicoder/tiny-ui/commit/7d4e4a85f5f0719a96b882335f705cada6591848))

### [0.0.77](https://github.com/wangdicoder/tiny-ui/compare/v0.0.76...v0.0.77) (2020-01-08)

### Features

- `<ScrollIndicator />` component ([f67ad75](https://github.com/wangdicoder/tiny-ui/commit/f67ad75a949f0f98f84e333c83330671681f2ce7))

### [0.0.76](https://github.com/wangdicoder/tiny-ui/compare/v0.0.75...v0.0.76) (2020-01-03)

### Features

- add wai-aria ([e5e6a08](https://github.com/wangdicoder/tiny-ui/commit/e5e6a08d14e919d232ea42cdc07471d79cf95b66))

### [0.0.75](https://github.com/wangdicoder/tiny-ui/compare/v0.0.71...v0.0.75) (2019-12-07)

### Features

- `<Drawer />` component ([11e2b97](https://github.com/wangdicoder/tiny-ui/commit/11e2b9721fdd429b367b70a74a7989abc6cf8b7b))
