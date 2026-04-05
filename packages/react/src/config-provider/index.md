import NestedThemeDemo from './demo/NestedTheme';
import NestedThemeSource from './demo/NestedTheme.tsx?raw';
import PortalThemeDemo from './demo/PortalTheme';
import PortalThemeSource from './demo/PortalTheme.tsx?raw';
import DynamicThemeDemo from './demo/DynamicTheme';
import DynamicThemeSource from './demo/DynamicTheme.tsx?raw';

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

## Examples

<Layout>
  <Column>
    <Demo>

### Nested Providers

The inner provider overrides the outer provider. This is the behavior that needs to be preserved when nested providers mount and unmount.

<DemoBlock component={NestedThemeDemo} source={NestedThemeSource} />

    </Demo>
    <Demo>

### Portal Inheritance

Token overrides are scoped by the provider itself, and popup-based components render into that provider's popup holder by default.

<DemoBlock component={PortalThemeDemo} source={PortalThemeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Dynamic Theme Updates

When the `theme` prop changes, old token values are removed before the new ones are applied.

<DemoBlock component={DynamicThemeDemo} source={DynamicThemeSource} />

    </Demo>
  </Column>
</Layout>

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

Token keys use camelCase and are automatically converted to CSS custom properties. For example, `colorPrimary` becomes `--ty-color-primary`, and `Button.borderRadius` becomes `--ty-btn-border-radius`. The provider applies them to its own scope node, not to the global `<html>` element. Nested providers therefore behave like nested scopes, and popup-based components inherit the same values through the provider popup holder.

When scoped theming is active, `ConfigProvider` renders an internal scope node with `display: contents` so local CSS variables and popup holders have a stable attachment point. This keeps layout impact low, but the node still exists in the DOM and may affect code that relies on direct parent-child DOM relationships.

### Examples

#### 1. Nested providers

The inner `ConfigProvider` overrides the outer one. When the inner provider unmounts, the outer values are restored.

```jsx
<ConfigProvider theme={{ mode: 'dark', token: { colorPrimary: '#1677ff' } }}>
  <AppShell>
    <ConfigProvider theme={{ token: { colorPrimary: '#f5222d' } }}>
      <DangerSection />
    </ConfigProvider>
  </AppShell>
</ConfigProvider>
```

In this example:

- outside `DangerSection`, `--ty-color-primary` is `#1677ff`
- inside `DangerSection`, `--ty-color-primary` becomes `#f5222d`
- if `DangerSection` unmounts, the value goes back to `#1677ff`

#### 2. Portal-rendered components

Because popup-based components render into the current provider holder, they inherit the same scoped token values.

```jsx
<ConfigProvider
  theme={{
    token: { colorPrimary: '#13c2c2' },
    components: {
      Select: { dropdownShadow: '0 0 0 2px rgba(19, 194, 194, 0.2)' },
      Tooltip: { contentPadding: '8px 12px' },
    },
  }}
>
  <Select />
  <Tooltip title="Portal content">
    <Button>Hover me</Button>
  </Tooltip>
</ConfigProvider>
```

Even though the Select dropdown and Tooltip popup are rendered through portals, they still inherit the same token values from the current provider scope.

#### 3. Updating theme config

When the `theme` prop changes, old overrides are removed and replaced by the new ones.

```jsx
const [danger, setDanger] = useState(false);

<ConfigProvider
  theme={
    danger
      ? { token: { colorPrimary: '#ff4d4f', borderRadius: '2px' } }
      : { token: { colorPrimary: '#1677ff' } }
  }
>
  <Button onClick={() => setDanger((prev) => !prev)}>Toggle theme</Button>
</ConfigProvider>
```

In this example, when `danger` switches back to `false`, `borderRadius: '2px'` is removed instead of leaking into the next theme state.

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

## Static Functions

Static feedback APIs such as `Message.*`, `Notification.*`, `LoadingBar.*`, and `Modal.open()` do not automatically read the nearest React tree provider. Use `ConfigProvider.config()` to provide a holder wrapper for them.

```jsx
ConfigProvider.config({
  holderRender: (children) => (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#1677ff' } }}
      prefixCls="ty"
    >
      {children}
    </ConfigProvider>
  ),
});
```

## useConfig

Read the merged parent config inside custom components or hooks.

```jsx
const { componentSize, getPopupContainer, locale } = ConfigProvider.useConfig();
```

## Props

| Property          | Description                                                   | Type                                              | Default   |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------- | --------- |
| prefixCls         | set prefix class.                                             | string                                            | ty        |
| componentSize     | component size.                                               | enum: `lg` &#124; `md` &#124; `sm`                | `md`      |
| shimmer           | display shimmer effect for [Skeleton](#/components/skeleton). | boolean                                           | false     |
| space             | set Space size, ref [Space](#/components/space).              | enum: `sm` &#124; `md` &#124; `lg` or `number`.   | `sm`      |
| locale            | set locale for components (e.g. `en_US`, `zh_CN`).           | Locale                                            | -         |
| getPopupContainer | set the container for popup-based components within this provider scope. | `(trigger?: HTMLElement \| null) => HTMLElement` | provider popup holder |
| getTargetContainer | set the default scroll target for components such as `Anchor`, `Sticky`, and `BackTop`, and the scroll-lock target for layers such as `Overlay` and `Tour`. | `() => HTMLElement \| Window`                    | `() => window` |
| theme             | set theme mode or theme config with token overrides.          | `ThemeMode` &#124; `ThemeConfig`                  | -         |

> The `prefixCls` property is useful to solve the classname conflict with other libraries. Please note that this will lose default styles from `ty`. To solve that, also updating  the `prefix` variable in the `_variables.scss`. 
