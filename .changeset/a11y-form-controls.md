---
'@tiny-design/react': minor
---

Improve form-control accessibility. `Form.Item` now generates ids that wire `aria-labelledby`, `aria-describedby`, and `aria-invalid` on the wrapped control automatically, so a label always announces with its input and screen readers hear validation errors. `Cascader` forwards the consumer's ref to the wrapper and pipes `id` and `aria-*` props through to the combobox element. `InputNumber` omits `min`, `max`, `aria-valuemin`, and `aria-valuemax` when the bounds are not finite (previously emitted `Infinity` / `-Infinity` strings) and forwards remaining native input props. DatePicker's weekday header and dim/disabled cell text now use `--ty-color-text-secondary` (with the previous `--ty-*-color-muted` token as fallback) so the picker meets WCAG color-contrast on the popup.
