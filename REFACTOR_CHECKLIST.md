# Refactor Checklist

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
