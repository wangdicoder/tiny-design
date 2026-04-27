---
'@tiny-design/react': minor
---

feat(modal): add imperative/registered API on top of the existing context

- New exports: `Modal.Register`, `Modal.useModalActions`, `Modal.useModalSelf`, `Modal.store`, and a named `createModalStore` factory.
- `show(id, props)` returns a promise that resolves with the value passed to `hide(result)`, so dialogs can be `await`ed.
- `<Modal.Provider>` now backs an outlet that renders registered components; the legacy `Modal.useModal(id)` per-id hook continues to work unchanged.
- New "Choosing a store" docs section warning that two providers sharing the singleton cause duplicate overlays — recommends `createModalStore()` for app-level providers.

fix(transition): stop firing `onExited` from inside a `setState` updater so it no longer triggers "Cannot update X while rendering Y" warnings when the callback dispatches across components.

fix(collapse-transition): keep `onHidden` in a ref so the animation effect depends only on `visible`. Inline `onHidden={() => …}` callers no longer cause unrelated parent re-renders to interrupt the running open/close animation.

fix(collapse): always mount `<CollapseTransition>` and gate only the body content. The first time a panel is opened from a closed start now plays the open animation instead of snapping to its full height.
