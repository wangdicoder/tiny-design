---
"@tiny-design/tokens": major
"@tiny-design/react": major
---

Standardize component token naming so variant axes (sizes `sm/md/lg/xs/xl`, states `hover/active/focus/disabled/checked/selected`) are always trailing dot-separated segments, with the property preceding the state.

**Breaking changes**

- 330 component token keys renamed in `@tiny-design/tokens`. Examples:
  - `button.font-size-sm` → `button.font-size.sm`
  - `button.solid.primary.bg-hover` → `button.solid.primary.bg.hover`
  - `pagination.disabled-bg` → `pagination.bg.disabled`
  - `auto-complete.option-active-bg` → `auto-complete.option.bg.active`
  - `descriptions.lg-padding-hr` → `descriptions.padding-hr.lg`
  - `date-picker.cell-selected-hover-bg` → `date-picker.cell.bg.selected-hover`
- 82 public CSS variables renamed accordingly (e.g. `--ty-calendar-cell-selected-bg` → `--ty-calendar-cell-bg-selected`). Apps overriding these vars in stylesheets or theme documents must update to the new names.
- `tokens.components` keys in custom theme JSON documents must be migrated to the new names.

Compound states (`selected-hover`, `disabled-active`) remain dash-joined inside their trailing axis segment, matching the convention used by Polaris and Atlassian. The `focus-ring` token name is preserved as a domain compound.

The token build now enforces this naming rule and fails on regressions. See `packages/tokens/REGISTRY_SPEC.md` for the full convention.
