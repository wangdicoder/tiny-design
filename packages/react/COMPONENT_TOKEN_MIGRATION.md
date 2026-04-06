# Component Token Migration Draft

This draft defines the first v2 token inventories for `Button`, `Input`, and `Card`, plus the SCSS migration patterns that move existing styles to token-first authoring.

## Scope
These three components are the first migration targets because they define the baseline for:

- typography and density
- interactive states
- semantic fallback rules
- slot naming for container components

## Naming Rules
- Source token keys use dot notation with kebab-case segments.
- Runtime CSS vars stay on the `--ty-*` prefix for v2 compatibility.
- New component names use full nouns: `button`, `input`, `card`.
- Existing legacy vars such as `--ty-btn-*` remain supported through an alias layer during migration.

## Button

### Proposed token inventory
- `button.radius`
- `button.line-height`
- `button.min-width`
- `button.group-gap`
- `button.group-divider-color`
- `button.round-radius`
- `button.loading-bg`
- `button.loading-opacity`
- `button.font-size-sm`
- `button.font-size-md`
- `button.font-size-lg`
- `button.height.sm`
- `button.height.md`
- `button.height.lg`
- `button.padding-inline-sm`
- `button.padding-inline-md`
- `button.padding-inline-lg`
- `button.bg.default`
- `button.bg.default-hover`
- `button.bg.default-active`
- `button.border.default`
- `button.border.default-hover`
- `button.border.default-active`
- `button.text.default`
- `button.text.default-hover`
- `button.text.default-active`
- `button.bg.primary`
- `button.bg.primary-hover`
- `button.bg.primary-active`
- `button.text.primary`
- `button.bg.outline-hover`
- `button.bg.outline-active`
- `button.bg.ghost-hover`
- `button.bg.ghost-active`
- `button.text.link-disabled`
- `button.bg.disabled`
- `button.border.disabled`
- `button.text.disabled`

### Final v2 token surface
The list above is the migration inventory found in the current SCSS. The recommended v2 public surface should be smaller:

- `button.radius`
- `button.line-height`
- `button.min-width`
- `button.group-gap`
- `button.group-divider-color`
- `button.round-radius`
- `button.loading-bg`
- `button.loading-opacity`
- `button.font-size-sm`
- `button.font-size-md`
- `button.font-size-lg`
- `button.height.sm`
- `button.height.md`
- `button.height.lg`
- `button.padding-inline-sm`
- `button.padding-inline-md`
- `button.padding-inline-lg`
- `button.bg.default`
- `button.bg.default-hover`
- `button.bg.default-active`
- `button.border.default`
- `button.border.default-hover`
- `button.border.default-active`
- `button.text.default`
- `button.text.default-hover`
- `button.text.default-active`
- `button.bg.primary`
- `button.bg.primary-hover`
- `button.bg.primary-active`
- `button.text.primary`
- `button.text.link-disabled`
- `button.bg.disabled`
- `button.border.disabled`
- `button.text.disabled`

### Excluded from v2 component tokens
These stay semantic for now and should not get dedicated component tokens unless a real customization need appears:

- `outline` hover and active colors
- `ghost` hover and active colors
- `info` / `success` / `warning` / `danger` variant colors
- solid variant text colors that are always `#fff`

This keeps the public `Button` token surface near 30-33 tokens instead of expanding toward per-variant state explosion.

### Scope note
The v2 component surface for `Button` should stay intentionally narrow. Semantic tokens should continue to drive `info`, `success`, `warning`, and `danger` variants:

```scss
.ty-btn_success {
  background: var(--ty-color-success);

  &:hover {
    background: var(--ty-color-success-hover);
  }

  &:active {
    background: var(--ty-color-success-active);
  }
}
```

Only variants with distinct structural or non-semantic behavior should get dedicated component tokens:
- `default`
- `primary`
- `link`

`outline` and `ghost` should continue to compose semantic tokens unless a later product requirement proves they need independent theming.

### Recommended fallback examples

```scss
.ty-btn {
  min-width: var(--ty-button-min-width, auto);
  border-radius: var(--ty-button-radius, var(--ty-border-radius));
  line-height: var(--ty-button-line-height, var(--ty-line-height-base));
}

.ty-btn_primary {
  color: var(--ty-button-text-primary, #fff);
  background: var(--ty-button-bg-primary, var(--ty-color-primary));
  border-color: var(--ty-button-border-primary, var(--ty-color-primary));
}

.ty-btn_outline {
  color: var(--ty-color-primary);
  background: var(--ty-button-bg-default, var(--ty-color-bg-container));
  border-color: var(--ty-color-primary);

  &:hover {
    background: var(--ty-color-primary-bg);
    border-color: var(--ty-color-primary-hover);
  }

  &:active {
    background: var(--ty-color-primary-bg-hover);
  }
}
```

### Legacy to v2 alias examples
- `--ty-btn-border-radius` -> `--ty-button-radius`
- `--ty-btn-height-md` -> `--ty-button-height-md`
- `--ty-btn-default-bg` -> `--ty-button-bg-default`
- `--ty-btn-default-hover-bg` -> `--ty-button-bg-default-hover`

## Input

### Proposed token inventory
- `input.radius`
- `input.color`
- `input.bg`
- `input.bg.disabled`
- `input.border`
- `input.border.hover`
- `input.border.focus`
- `input.shadow.focus`
- `input.placeholder`
- `input.addon-bg`
- `input.addon-padding`
- `input.affix-margin`
- `input.clear-size`
- `input.clear-color`
- `input.font-size-sm`
- `input.font-size-md`
- `input.font-size-lg`
- `input.height.sm`
- `input.height.md`
- `input.height.lg`
- `input.padding-inline-sm`
- `input.padding-inline-md`
- `input.padding-inline-lg`
- `input.text.disabled`

### Recommended fallback examples

```scss
.ty-input__input {
  color: var(--ty-input-color, var(--ty-color-text));
  background: var(--ty-input-bg, var(--ty-color-bg-container));
  border: 1px solid var(--ty-input-border, var(--ty-color-border));
  border-radius: var(--ty-input-radius, var(--ty-border-radius));
}

.ty-input__input:focus {
  border-color: var(--ty-input-border-focus, var(--ty-color-primary));
  box-shadow: var(--ty-input-shadow-focus, var(--ty-shadow-focus));
}
```

### Legacy to v2 alias examples
- `--ty-input-border-radius` -> `--ty-input-radius`
- `--ty-input-focus-border` -> `--ty-input-border-focus`
- `--ty-input-focus-shadow` -> `--ty-input-shadow-focus`
- `--ty-input-disabled-color` -> `--ty-input-text-disabled`

## Card

### Proposed token inventory
- `card.radius`
- `card.bg`
- `card.bg.filled`
- `card.border`
- `card.shadow`
- `card.shadow.hover`
- `card.header-padding`
- `card.body-padding`
- `card.footer-padding`
- `card.header-color`
- `card.header-font-size`
- `card.header-font-weight`

### Recommended fallback examples

```scss
.ty-card {
  border-radius: var(--ty-card-radius, var(--ty-border-radius));
  background: var(--ty-card-bg, var(--ty-color-bg-container));
}

.ty-card__header {
  padding: var(--ty-card-header-padding, var(--ty-spacing-5));
  color: var(--ty-card-header-color, var(--ty-color-text-heading));
  border-bottom: 1px solid var(--ty-card-border, var(--ty-color-border-secondary));
}
```

### Legacy to v2 alias examples
- `--ty-card-border-radius` -> `--ty-card-radius`
- `--ty-shadow-card` -> `--ty-card-shadow`

## SCSS Migration Patterns

### 1. Replace legacy component aliases gradually
Do not rename class selectors in v2. Migrate variables first.

```scss
.ty-btn {
  border-radius: var(--ty-button-radius, var(--ty-border-radius));
}
```

This allows:
- new token source to emit `--ty-button-*`
- old themes to keep working through build-emitted alias vars
- SCSS to move once without breaking user overrides

### 2. Prefer component token + semantic fallback

```scss
.ty-card {
  background: var(--ty-card-bg, var(--ty-color-bg-container));
}
```

Avoid direct semantic usage when the property could become component-specific later.

### 3. Keep structural literals only when they are not part of the design language

Allowed:

```scss
.ty-input {
  width: 100%;
  position: relative;
}
```

Not allowed:

```scss
.ty-input__input {
  padding: 0 12px;
  border-radius: 6px;
  background: #fff;
}
```

### 4. Tokenize state, not selector mechanics
The state shape stays in SCSS; the state values move to tokens.

```scss
.ty-btn_primary:hover {
  background: var(--ty-button-bg-primary-hover, var(--ty-color-primary-hover));
}
```

### 5. Slot names should stay flat
Prefer:
- `card.header-padding`
- `card.body-padding`
- `input.addon-bg`

Avoid:
- `card.header.surface.padding`
- `input.affix.prefix.margin`

## Initial Migration Order
1. Add registry entries and alias map for `button`, `input`, `card`
2. Update SCSS to prefer `--ty-button-*`, `--ty-input-*`, `--ty-card-*`
3. Keep legacy `--ty-btn-*` fallbacks for one compatibility cycle
4. Update Theme Studio to edit only v2 names
5. Mark legacy names as deprecated in docs and generated registry metadata
