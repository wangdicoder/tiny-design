# SCSS Authoring Spec

## Purpose

This spec defines how component styles consume runtime theme tokens in `@tiny-design/react`. The goal is to keep existing class names and SCSS ergonomics while making every visual decision themeable through CSS custom properties.

## Rules

1. SCSS defines structure, state, and selector relationships only.
2. Visual values must come from `var(--ty-*)` tokens.
3. New hard-coded colors, radii, shadows, font sizes, spacing, and motion values are not allowed.
4. Component tokens use dot notation with kebab-case segments in source registries, for example `button.solid.primary.bg-hover`.
5. CSS variables stay on the existing `--ty-*` prefix for v2 compatibility.

## Token Priority

Use this fallback chain consistently:

1. Component token
2. Semantic token
3. Native CSS fallback only when no semantic token exists

Preferred pattern:

```scss
.ty-card {
  border-radius: var(--ty-card-radius, var(--ty-border-radius));
  background: var(--ty-card-bg, var(--ty-color-bg-container));
  color: var(--ty-card-text, var(--ty-color-text));
}
```

Direct semantic usage is only correct when the property should never diverge by component:

```scss
.ty-typography {
  font-family: var(--ty-font-family);
}
```

## Naming Conventions

- Semantic CSS vars: `--ty-color-primary`, `--ty-border-radius`, `--ty-font-size-base`
- Component CSS vars: `--ty-button-solid-primary-bg`, `--ty-button-solid-primary-bg-hover`, `--ty-card-header-padding`
- Avoid aliases like `btn` or `picker` for new token names. Use full component names.

## Allowed Hard-coded Values

Only structural values may be hard-coded when tokenizing them would not improve theming:

- `display`, `position`, `flex`, `overflow`, `white-space`, `pointer-events`
- Layout-only percentages like `width: 100%`
- Browser-specific resets such as `outline: 0` or `appearance: none`
- Rare intrinsic calculations like `inset: -1px` when tied to border mechanics

If a value affects brand, density, readability, affordance, or perceived motion, it must be tokenized.

## Examples

Preferred:

```scss
.ty-button {
  height: var(--ty-button-height-md, var(--ty-height-md));
  padding-inline: var(--ty-button-padding-inline-md, var(--ty-spacing-4));
  border-radius: var(--ty-button-radius, var(--ty-border-radius));
  background: var(--ty-button-solid-primary-bg, var(--ty-color-primary));
  box-shadow: var(--ty-shadow-focus);
}
```

Avoid:

```scss
.ty-button {
  height: 40px;
  padding-inline: 16px;
  border-radius: 6px;
  background: #6e41bf;
}
```

## Migration Checklist

When editing an existing component style file:

1. Replace visual literals with `var(--ty-...)`.
2. Prefer component token plus semantic fallback for component-specific properties.
3. Keep selectors and class names stable unless a separate API change is intended.
4. Do not add new theme logic to SCSS maps; add tokens to the JSON source and registry instead.
5. Verify the component still renders correctly with default and dark themes.
