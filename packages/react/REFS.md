# Ref Conventions

This package treats `ref` as an explicit component capability, not an accidental side effect of inheriting DOM props.

## Rules

- Use `React.ComponentPropsWithoutRef<'tag'>` for DOM-derived prop interfaces by default.
- Only expose `ref` when the component intentionally supports DOM access through `React.forwardRef`.
- Do not rely on `React.ComponentProps<'tag'>` to leak `ref` into props interfaces.
- If a component is primarily compositional or layout-only, do not expose `ref` unless there is a concrete DOM integration need.

## Components That Should Expose `ref`

- Interactive controls and focus targets such as `Button`, `Input`, `NativeSelect`, `Link`, `Switch`, `Checkbox`, `Radio`.
- Components frequently used for measurement, scrolling, positioning, or animation integration such as `Tree`, `Slider`, `Grid`, `Space`, `Flex`, `Layout`, `Anchor`, `Waterfall`, `Transfer`, `Steps`, and typography primitives.

## Components That Usually Should Not Expose `ref`

- Grouping or compositional wrappers such as `Button.Group`, `Checkbox.Group`, `Radio.Group`, `Input.Group`, `Input.Addon`, `Form.Item`, `Descriptions`, `Descriptions.Item`.

## Practical Guidance

- If consumers need the outer wrapper and an inner native control, expose both intentionally, for example `Checkbox` plus `checkboxRef`, or `Radio` plus `radioRef`.
- If a component renders different DOM elements by state, make the forwarded ref type reflect that reality instead of pretending it always points to one tag.
- When adding a new forwarded ref, add a focused test that proves the ref resolves to the expected DOM node.
