# Token Registry Spec

## Purpose
The token registry is the canonical machine-readable index of all supported v2 tokens. It is generated from JSON token sources and consumed by:

- Theme Studio
- theme validation
- docs generation
- developer tooling

The registry is metadata, not a theme document. It describes what tokens exist, how they map to CSS variables, and what fallback behavior they expect.

## Output Location
The build step should generate:

- `packages/tokens/dist/registry.json`
- `packages/tokens/dist/registry.d.ts`

## Top-level Shape

```json
{
  "version": 1,
  "generatedAt": "2026-04-06T10:00:00.000Z",
  "tokens": []
}
```

## Token Entry Shape

```json
{
  "key": "button.bg.primary",
  "cssVar": "--ty-button-bg-primary",
  "category": "component",
  "component": "button",
  "type": "color",
  "group": "Button",
  "description": "Primary button background color.",
  "source": "source/components/button.json",
  "defaultValue": "{color-primary}",
  "fallback": "--ty-color-primary",
  "status": "active"
}
```

## Required Fields
- `key`
- `cssVar`
- `category`
- `type`
- `source`
- `status`

## Field Definitions
- `key`
  Stable token id in dot notation with kebab-case segments.
  Examples: `color-primary`, `button.bg.primary`, `card.header-padding`
- `cssVar`
  Public runtime CSS variable name.
- `category`
  One of: `primitive`, `semantic`, `component`
- `component`
  Required when `category` is `component`; omitted otherwise.
- `type`
  One of: `color`, `dimension`, `number`, `font-family`, `font-weight`, `line-height`, `shadow`, `duration`, `easing`, `transition`, `string`
- `group`
  Human-facing display group for docs and Theme Studio.
- `description`
  Short explanation of what the token controls.
- `source`
  Relative path to the token source file.
- `defaultValue`
  Unresolved default value from the source token document.
- `fallback`
  Recommended component style fallback target. This field is guidance metadata for component authors and docs tooling; it does not mean the build step will emit an automatic fallback chain in generated CSS.
- `status`
  One of: `active`, `deprecated`, `internal`
## Naming Rules
- `key` must match the theme schema token key pattern.
- `cssVar` must always use kebab-case.
- `component` names must use full nouns such as `button`, `input`, `card`.
- New entries must use the primary v2 names directly. Short prefixes like `btn`, `picker`, or `kbd` are not allowed.

## Fallback Rules
- Primitive tokens should not appear in authored component source styles.
- Semantic tokens usually have no registry fallback.
- Component tokens should include the semantic fallback they are expected to use in authored component source styles.

Examples:
- `button.bg.primary` -> fallback `--ty-color-primary`
- `button.radius` -> fallback `--ty-border-radius`
- `card.bg` -> fallback `--ty-color-bg-container`

## Status Rules
- `active`
  Visible in Theme Studio and allowed in theme documents.
- `deprecated`
  Still resolved, but hidden by default in editing UIs and marked as not preferred for new themes.
- `internal`
  Not allowed in user-authored themes.

## Example Entries

```json
[
  {
    "key": "color-primary",
    "cssVar": "--ty-color-primary",
    "category": "semantic",
    "type": "color",
    "group": "Colors",
    "description": "Primary brand color.",
    "source": "source/semantic/colors.json",
    "defaultValue": "{color.brand.500}",
    "status": "active"
  },
  {
    "key": "button.radius",
    "cssVar": "--ty-button-radius",
    "category": "component",
    "component": "button",
    "type": "dimension",
    "group": "Button",
    "description": "Button border radius.",
    "source": "source/components/button.json",
    "defaultValue": "{border-radius}",
    "fallback": "--ty-border-radius",
    "status": "active"
  }
]
```

## Validation Rules
Build should fail when:

1. Two entries share the same `key`
2. Two entries share the same `cssVar`
3. A `component` token is missing its `component`
4. A `fallback` points to a CSS var not present in the registry or approved semantic baseline
