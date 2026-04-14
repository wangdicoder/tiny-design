---
'@tiny-design/react': major
'@tiny-design/tokens': major
---

Refactor button styling to use `variant` and `color` instead of `btnType`.

This is a breaking change for `Button`, `Button.Group`, and `SplitButton`.
Button theme tokens were renamed to variant/color-based keys such as
`button.solid.primary.bg` and `button.outline.danger.border`.
