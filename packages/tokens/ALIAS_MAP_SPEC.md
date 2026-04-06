# Alias Map Spec

## Purpose
The alias map defines backward compatibility between legacy CSS variables and v2 primary tokens. It exists to let component SCSS migrate to clearer names without immediately breaking user themes or docs.

This map is compatibility metadata. It is not the source of truth for token values.

## Output Location
The build step should generate:

- `packages/tokens/dist/alias-map.json`

## Top-level Shape

```json
{
  "version": 1,
  "entries": []
}
```

## Entry Shape

```json
{
  "aliasCssVar": "--ty-btn-default-bg",
  "targetKey": "button.bg.default",
  "targetCssVar": "--ty-button-bg-default",
  "status": "active",
  "removeAfter": 3,
  "notes": "Temporary bridge from btn naming to button naming."
}
```

## Required Fields
- `aliasCssVar`
- `targetKey`
- `targetCssVar`
- `status`

## Field Definitions
- `aliasCssVar`
  Legacy CSS variable consumed by older SCSS or user themes.
- `targetKey`
  v2 primary token key from the registry.
- `targetCssVar`
  v2 primary CSS variable from the registry.
- `status`
  One of: `active`, `deprecated`, `removed`
- `removeAfter`
  Optional compatibility milestone or major version after which the alias may be removed.
- `notes`
  Short migration guidance.

## Rules
1. One alias maps to exactly one primary token.
2. Aliases must never form chains.
   Correct: `--ty-btn-default-bg` -> `--ty-button-bg-default`
   Incorrect: `--ty-old-btn-bg` -> `--ty-btn-default-bg` -> `--ty-button-bg-default`
3. New v2 tokens must not be introduced as aliases.
4. Alias entries must also be declared in the owning registry token's `aliases` field.
5. Theme Studio must not expose aliases as editable tokens.

## Runtime Expectations
v2 compatibility should be handled in the build layer. The recommended implementation is to emit both primary vars and alias vars:

```css
:root {
  --ty-button-bg-default: #fff;
  --ty-btn-default-bg: var(--ty-button-bg-default);
}
```

SCSS should reference only primary v2 names plus semantic fallbacks. SCSS should not reference alias vars directly, which avoids circular fallback chains and keeps authoring rules simple.

## Recommended Initial Alias Coverage
- `--ty-btn-*` -> `--ty-button-*`
- `--ty-card-border-radius` -> `--ty-card-radius`
- `--ty-shadow-card` -> `--ty-card-shadow`
- `--ty-input-border-radius` -> `--ty-input-radius`
- `--ty-input-focus-border` -> `--ty-input-border-focus`
- `--ty-input-focus-shadow` -> `--ty-input-shadow-focus`

## Example Entries

```json
[
  {
    "aliasCssVar": "--ty-btn-border-radius",
    "targetKey": "button.radius",
    "targetCssVar": "--ty-button-radius",
    "status": "active",
    "removeAfter": 3,
    "notes": "Legacy btn prefix."
  },
  {
    "aliasCssVar": "--ty-input-focus-shadow",
    "targetKey": "input.shadow.focus",
    "targetCssVar": "--ty-input-shadow-focus",
    "status": "active",
    "removeAfter": 3,
    "notes": "Normalized focus token naming."
  }
]
```

## Removal Policy
- A deprecated alias must remain resolvable for at least one full compatibility cycle.
- Removal requires:
  - registry status change
  - docs update
  - migration note in changelog
  - Theme Studio import migration if community themes may still reference it
