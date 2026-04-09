# Refactor Checklist

## Progress Tracker

Overall status:

- estimated progress: `88%`
- estimated progress: `93%`
- current focus: a11y and interaction sweep for complex popup, picker, and dialog components
- current mode: breaking-major refactor, no legacy compatibility work

### Phases

| Phase | Scope | Status | Notes |
| --- | --- | --- | --- |
| 1 | tokens core | done | shared resolver, strict new contract, no alias/migration runtime |
| 2 | react theme integration | done | `ConfigProvider` uses shared token resolver |
| 3 | bottom-layer popup infrastructure | done | `Popup`, `Overlay`, `Portal` stabilized and test-covered |
| 4 | first-layer popup consumers | done | `Dropdown`, `Popover`, `Tooltip`, `Modal static`, `Menu.SubMenu`, `PopConfirm`, `SpeedDial` |
| 5 | selection and picker core | done at current checkpoint | `Select`, `AutoComplete`, `Cascader`, `DatePicker`, `TimePicker`, `ColorPicker` stabilized with focused keyboard / state fixes |
| 6 | token coverage expansion | mostly done at current checkpoint | first high-value namespaces landed and are wired into component styles |
| 7 | quality platform | in progress | focused regression tests and targeted a11y semantics improved, no full visual regression sweep yet |

### Component Groups

Completed or stable checkpoint:

- `Popup`
- `Overlay`
- `Portal`
- `Dropdown`
- `Popover`
- `Tooltip`
- `ConfigProvider`
- `DatePicker`
- `TimePicker`
- `Select`
- `AutoComplete`
- `Cascader`
- `ColorPicker`
- `Menu.SubMenu`
- `PopConfirm`
- `SpeedDial`
- `Calendar`
- `Upload`
- `Modal`
- `Drawer`
- `Table`
- `Tree`
- `Transfer`
- `Tour`
- `Form`
- `NativeSelect`

Token ownership completed or materially improved:

- `picker`
- `date-picker`
- `time-picker`
- `calendar`
- `dropdown`
- `overlay`
- `pop-confirm`
- `tour`
- `select`
- `auto-complete`
- `cascader`
- `color-picker`
- `speed-dial`
- `upload`

Queued next:

- full-library visual regression sweep
- broader docs/demo smoke check
- remaining component token gaps with lower business value

Known unfinished areas:

- `Modal / Drawer / Tour` focus, keyboard, and close semantics are substantially improved, but not fully systematized into shared hooks
- `Form` is stabilized at a synchronous-validation checkpoint, but not redesigned
- `Select / Cascader / AutoComplete / DatePicker / TimePicker / ColorPicker` have focused a11y improvements, but not a full WAI-ARIA parity pass
- full-library visual regression has not started
- docs/demo smoke coverage is still partial

## Phase Checklist

Use this before starting any new phase.

- phase scope is explicit
- entry files are identified
- verification commands are identified
- stop condition is identified
- upstream dependencies are already stable

## Component Checklist

Use this for every component refactor.

- read implementation
- read public types
- read existing tests
- read docs/examples if they exist
- list behavior worth preserving
- list behavior that is inconsistent or fragile
- confirm controlled and uncontrolled state model
- confirm event names and firing points
- confirm container / portal / popup behavior where relevant
- confirm cleanup behavior for timers, listeners, and instances
- add or update focused tests
- run the smallest useful regression set
- stop when the component reaches a stable checkpoint

## Theme And Token Checklist

- JSON sources remain the only editable token source
- theme runtime uses shared resolver logic
- Theme Studio uses the same validation and resolution contract
- preset resolution still works
- browser ESM runtime still works
- registry output still builds
- no alias or migration logic is introduced
- docs only describe canonical token keys

## Popup Stack Checklist

Apply to:

- `Popup`
- `Overlay`
- `Portal`
- `Dropdown`
- `Popover`
- `Tooltip`
- `Modal`

- visibility source is unambiguous
- outside click behavior is defined
- escape behavior is defined if applicable
- popup container behavior is defined
- portal rendering is test-covered
- listeners are removed on cleanup
- timers are removed on cleanup
- popper / instance objects are destroyed on cleanup

## Before Moving Up A Layer

- current layer tests pass
- no known runtime regression remains in the current layer
- docs / Theme Studio still render
- there is a clear summary of what changed
- next component group is identified
