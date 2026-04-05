---
"@tiny-design/react": minor
---

Upgrade the global configuration infrastructure around `ConfigProvider` and align popup, scroll, and static layer behavior across the component library.

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
