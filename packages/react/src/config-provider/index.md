# ConfigProvider

This component provides a universal configuration for components, including theme customization with design token overrides.

## Usage

```jsx
import { ConfigProvider, zh_CN } from 'tiny-design';

// ...

return (
  <ConfigProvider componentSize="lg" locale={zh_CN} {...otherYourConfig}>
    <App />
  </ConfigProvider>
);
```

## Theme Customization

The `theme` prop accepts either a theme mode string or a `ThemeConfig` object for fine-grained token customization.

### Theme Mode

```jsx
<ConfigProvider theme="dark">
  <App />
</ConfigProvider>
```

### Token Overrides

Use `ThemeConfig` to customize global tokens and component-level tokens:

```jsx
import { ConfigProvider } from 'tiny-design';

<ConfigProvider
  theme={{
    mode: 'light',
    token: {
      colorPrimary: '#1890ff',
      borderRadius: '8px',
    },
    components: {
      Button: { borderRadius: '20px', heightMd: '40px' },
      Card: { headerFontSize: '20px', borderRadius: '12px' },
      Input: { borderRadius: '8px' },
    },
  }}
>
  <App />
</ConfigProvider>
```

### ThemeConfig

| Property   | Description                                      | Type                                          | Default |
| ---------- | ------------------------------------------------ | --------------------------------------------- | ------- |
| mode       | theme mode                                       | enum: `light` &#124; `dark` &#124; `system`   | -       |
| token      | global design token overrides (camelCase keys)   | `Record<string, string \| number>`            | -       |
| components | per-component token overrides (camelCase keys)   | `Record<string, Record<string, string \| number>>` | -  |

Token keys use camelCase and are automatically converted to CSS custom properties. For example, `colorPrimary` becomes `--ty-color-primary`, and `Button.borderRadius` becomes `--ty-btn-border-radius`.

### CSS Custom Property Overrides

You can also customize components directly via CSS without using `ThemeConfig`:

```css
/* Global — affects all components */
:root { --ty-border-radius: 8px; }

/* Component-specific — only affects Button */
:root { --ty-btn-border-radius: 20px; }

/* Scoped — only affects Buttons inside .my-section */
.my-section { --ty-btn-border-radius: 0; }
```

## Props

| Property          | Description                                                   | Type                                              | Default   |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------- | --------- |
| prefixCls         | set prefix class.                                             | string                                            | ty        |
| componentSize     | component size.                                               | enum: `lg` &#124; `md` &#124; `sm`                | `md`      |
| shimmer           | display shimmer effect for [Skeleton](#/components/skeleton). | boolean                                           | false     |
| space             | set Space size, ref [Space](#/components/space).              | enum: `sm` &#124; `md` &#124; `lg` or `number`.   | `sm`      |
| locale            | set locale for components (e.g. `en_US`, `zh_CN`).           | Locale                                            | -         |
| theme             | set theme mode or theme config with token overrides.          | `ThemeMode` &#124; `ThemeConfig`                  | -         |

> The `prefixCls` property is useful to solve the classname conflict with other libraries. Please note that this will lose default styles from `ty`. To solve that, also updating  the `prefix` variable in the `_variables.scss`. 
