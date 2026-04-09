# Theme And Token Refactor Roadmap

## Goal

Build the next major version of Tiny Design theming with one rule:

- only the new token model is supported

This roadmap assumes a breaking release. We are not preserving legacy token names, legacy theme keys, or parallel token systems.

## Upgrade Policy

The next major version follows these constraints:

- `packages/tokens/source/**.json` is the only source of truth
- runtime, docs, Theme Studio, and React all consume the same theme contract
- old SCSS-era token names are removed, not translated
- old API aliases are removed, not dual-supported
- documentation only describes the new contract

## Current Progress

Completed:

- tokens runtime resolution is shared across `@tiny-design/tokens`, `@tiny-design/react`, and Theme Studio
- preset theme resolution with `extends`
- browser-safe ESM runtime for docs and Theme Studio
- `ConfigProvider` integrated with token resolution
- `Popup / Overlay / Portal` bottom-layer cleanup and tests

In progress:

- removing alias and migration logic that was temporarily added during the transition
- tightening execution checklists for the next component phases

## Target Architecture

### `@tiny-design/tokens`

Owns:

- semantic token source
- component token source
- theme documents
- schema
- registry generation
- preset generation
- theme validation
- theme resolution
- typed token exports

Does not own:

- legacy token aliases
- migration shims
- dual-format theme support

### `@tiny-design/react`

Owns:

- scoped CSS variable application
- `ConfigProvider` theme integration
- container / popup scoping behavior
- component token consumption discipline

Does not own:

- ad-hoc token flattening
- custom theme parsing separate from `@tiny-design/tokens`

### Theme Studio / Docs

Own:

- authoring UI
- preview and export flows
- token browsing and documentation

Must consume:

- the same validation and resolution contract as runtime

## Execution Phases

### Phase 1: Tokens Core

Objectives:

- keep JSON as the only editable token source
- keep presets and schema aligned
- validate theme documents against registry
- remove alias and migration support from runtime and build outputs

Acceptance:

- no runtime alias translation
- no generated alias metadata
- new token keys are the only supported authored keys

### Phase 2: React Theme Integration

Objectives:

- keep `ConfigProvider` on top of `resolveTheme`
- standardize theme mode resolution
- keep scoped CSS variable injection stable

Acceptance:

- React runtime does not implement its own theme parser
- local provider scoping remains stable

### Phase 3: Bottom-Layer Popup Infrastructure

Scope:

- `Popup`
- `Overlay`
- `Portal`

Objectives:

- stabilize visibility flow
- stabilize popup container usage
- clean up event listener lifecycle
- preserve existing good behavior

Acceptance:

- bottom-layer popup tests pass
- no listener leaks in current flows

### Phase 4: First-Layer Popup Consumers

Scope:

- `Dropdown`
- `Popover`
- `Tooltip`
- `Modal`

Objectives:

- reuse the cleaned popup stack
- remove duplicated open/close mechanics
- keep API changes deliberate and minimal

Acceptance:

- each component has controlled/uncontrolled coverage
- outside click / escape / focus behavior is defined and tested

### Phase 5: Form And Selection Core

Scope:

- `Form`
- `Select`
- `AutoComplete`
- `DatePicker`
- `TimePicker`

Objectives:

- align state models
- align popup usage
- align token consumption

Acceptance:

- no type/runtime contract mismatch
- no parallel internal state paths for the same behavior

### Phase 6: Token Coverage Expansion

Objectives:

- define missing component namespaces
- document namespace reuse explicitly
- replace remaining hardcoded visual values where tokens should own them

Priority targets:

- `dropdown`
- `overlay`
- `date-picker`
- `time-picker`
- `auto-complete`
- `modal`
- `tooltip`
- `popover`

Acceptance:

- each production component has explicit token ownership

### Phase 7: Quality Platform

Objectives:

- interaction tests for complex components
- a11y checks for core flows
- visual regression for key docs examples

Acceptance:

- complex components have behavior coverage, not just snapshots

## Working Rules

These rules apply to every phase:

- read implementation, types, tests, and docs before editing
- keep existing good behavior
- remove only the parts that are inconsistent, redundant, or unstable
- do not expand scope upward until the current layer is stable
- stop at a clear verification point before moving to the next component group

## Immediate Next Queue

1. Finish removing temporary alias/migration support from `packages/tokens`
2. Keep Theme Studio aligned with the strict new token contract
3. Start the first-layer popup consumers:
   - `Dropdown`
   - `Popover`
   - `Tooltip`
   - `Modal`
