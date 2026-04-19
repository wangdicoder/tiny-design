import NestedThemeDemo from './demo/NestedTheme';
import NestedThemeSource from './demo/NestedTheme.tsx?raw';
import PortalThemeDemo from './demo/PortalTheme';
import PortalThemeSource from './demo/PortalTheme.tsx?raw';
import DynamicThemeDemo from './demo/DynamicTheme';
import DynamicThemeSource from './demo/DynamicTheme.tsx?raw';

# ConfigProvider

为组件提供统一的全局配置，支持通过设计令牌进行主题定制。

## 使用方式

```jsx
import { ConfigProvider, zh_CN } from '@tiny-design/react';

// ...

return (
  <ConfigProvider componentSize="lg" locale={zh_CN} {...otherYourConfig}>
    <App />
  </ConfigProvider>
);
```

## 示例

<Layout>
  <Column>
    <Demo>

### 嵌套 Provider

内层 provider 会覆盖外层 provider，这也是嵌套挂载和卸载时最需要保证正确的行为。

<DemoBlock component={NestedThemeDemo} source={NestedThemeSource} />

    </Demo>
    <Demo>

### Portal 继承

令牌会作用在当前 provider 的作用域节点上，弹层类组件默认也会渲染到这个 provider 对应的 popup holder 中。

<DemoBlock component={PortalThemeDemo} source={PortalThemeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 动态更新 Theme

当 `theme` 属性更新时，旧 token 会先被清理，再应用新的值。

<DemoBlock component={DynamicThemeDemo} source={DynamicThemeSource} />

    </Demo>
  </Column>
</Layout>

## 主题定制

`theme` 属性既可以接收主题模式字符串，也可以接收 `ThemeConfig` 对象来进行细粒度的令牌定制。

### 主题模式

```jsx
<ConfigProvider theme="dark">
  <App />
</ConfigProvider>
```

### 令牌覆盖

使用 `ThemeConfig` 自定义语义令牌和组件级令牌：

```jsx
import { ConfigProvider } from '@tiny-design/react';

<ConfigProvider
  theme={{
    mode: 'light',
    tokens: {
      semantic: {
        'color-primary': '#1890ff',
        'border-radius': '8px',
      },
      components: {
        'button.radius': '20px',
        'button.height.md': '40px',
        'card.header-font-size': '20px',
        'card.radius': '12px',
        'input.radius': '8px',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### ThemeConfig

| 属性       | 说明                                             | 类型                                          | 默认值  |
| ---------- | ------------------------------------------------ | --------------------------------------------- | ------- |
| mode       | 主题模式                                         | enum: `light` &#124; `dark` &#124; `system`   | -       |
| extends    | 要继承的基础主题 id                              | `string`                                      | 根据 `mode` 自动选择 |
| meta       | 可选的主题元信息                                 | `ThemeDocumentMeta`                           | -       |
| tokens     | 语义令牌和组件级令牌覆盖                         | `{ semantic?: Record<string, string \| number>; components?: Record<string, string \| number> }` | - |

语义令牌键名使用 kebab-case，组件令牌键名使用点分路径。例如 `color-primary` 会转换为 `--ty-color-primary`，`button.radius` 会转换为 `--ty-button-radius`。ConfigProvider 会把这些值应用到自己的作用域节点上，而不是直接写到全局 `<html>`。因此嵌套 provider 会形成真正的嵌套作用域，弹层类组件也会通过 provider 的 popup holder 继承相同的值。

当启用局部主题时，`ConfigProvider` 会渲染一个带 `display: contents` 的内部作用域节点，用来承载局部 CSS 变量和 popup holder。它对布局影响很小，但这个节点仍然存在于 DOM 中，依赖直接父子关系的 DOM 逻辑需要注意这一点。

### 示例

#### 1. 嵌套 ConfigProvider

内层 `ConfigProvider` 会覆盖外层配置；当内层卸载时，外层值会自动恢复。

```jsx
<ConfigProvider theme={{ mode: 'dark', tokens: { semantic: { 'color-primary': '#1677ff' } } }}>
  <AppShell>
    <ConfigProvider theme={{ tokens: { semantic: { 'color-primary': '#f5222d' } } }}>
      <DangerSection />
    </ConfigProvider>
  </AppShell>
</ConfigProvider>
```

这个例子里：

- `DangerSection` 外部的 `--ty-color-primary` 是 `#1677ff`
- `DangerSection` 内部的 `--ty-color-primary` 会变成 `#f5222d`
- 当 `DangerSection` 卸载后，值会恢复成 `#1677ff`

#### 2. Portal 组件也会继承

因为弹层类组件默认会渲染到当前 provider 的 holder 中，所以通过 Portal 渲染出来的内容也会继承这些值。

```jsx
<ConfigProvider
  theme={{
    tokens: {
      semantic: { 'color-primary': '#13c2c2' },
      components: {
        'select.dropdown-shadow': '0 0 0 2px rgba(19, 194, 194, 0.2)',
        'tooltip.content-padding': '8px 12px',
      },
    },
  }}
>
  <Select />
  <Tooltip title="Portal content">
    <Button>Hover me</Button>
  </Tooltip>
</ConfigProvider>
```

即使 Select 下拉框和 Tooltip 弹层是通过 Portal 渲染的，它们仍然会继承当前 provider 作用域下的 token 值。

#### 3. theme 更新时会回收旧值

当 `theme` 属性变化时，旧覆盖值会被清掉，再应用新的值。

```jsx
const [danger, setDanger] = useState(false);

<ConfigProvider
  theme={
    danger
      ? { tokens: { semantic: { 'color-primary': '#ff4d4f', 'border-radius': '2px' } } }
      : { tokens: { semantic: { 'color-primary': '#1677ff' } } }
  }
>
  <Button onClick={() => setDanger((prev) => !prev)}>Toggle theme</Button>
</ConfigProvider>
```

这个例子里，当 `danger` 切回 `false` 时，`borderRadius: '2px'` 会被移除，而不是残留到下一次主题状态中。

### CSS 自定义属性覆盖

也可以直接通过 CSS 自定义属性来定制组件，无需使用 `ThemeConfig`：

```css
/* 全局 — 影响所有组件 */
:root { --ty-border-radius: 8px; }

/* 组件级 — 仅影响 Button */
:root { --ty-button-radius: 20px; }

/* 作用域 — 仅影响 .my-section 内的 Button */
.my-section { --ty-button-radius: 0; }
```

## 静态方法

像 `Message.*`、`Notification.*`、`LoadingBar.*`、`Modal.open()` 这类静态反馈 API 不会自动读取最近的 React 树 provider。可以通过 `ConfigProvider.config()` 提供一个统一的 holder 包裹器。

```jsx
ConfigProvider.config({
  holderRender: (children) => (
    <ConfigProvider
      theme={{ tokens: { semantic: { 'color-primary': '#1677ff' } } }}
      prefixCls="ty"
    >
      {children}
    </ConfigProvider>
  ),
});
```

## useConfig

在自定义组件或 hooks 中读取合并后的上层配置。

```jsx
const { componentSize, getPopupContainer, locale } = ConfigProvider.useConfig();
```

## Props

| 属性              | 说明                                                          | 类型                                              | 默认值    |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------- | --------- |
| prefixCls         | 设置类名前缀                                                  | string                                            | ty        |
| componentSize     | 组件大小                                                      | enum: `lg` &#124; `md` &#124; `sm`                | `md`      |
| shimmer           | 为 [Skeleton](#/components/skeleton) 显示微光动画效果         | boolean                                           | false     |
| space             | 设置 Space 间距，参考 [Space](#/components/space)             | enum: `sm` &#124; `md` &#124; `lg` or `number`.   | `sm`      |
| locale            | 设置组件语言包（如 `en_US`、`zh_CN`）                         | Locale                                            | -         |
| getPopupContainer | 为当前 provider 作用域内的弹层组件指定挂载容器               | `(trigger?: HTMLElement \| null) => HTMLElement`  | provider popup holder |
| getTargetContainer | 为 `Anchor`、`Sticky`、`BackTop` 等组件设置默认滚动容器，同时为 `Overlay`、`Tour` 这类层级组件设置滚动锁目标 | `() => HTMLElement \| Window`                     | `() => window` |
| theme             | 设置主题模式或包含令牌覆盖的主题配置                          | `ThemeMode` &#124; `ThemeConfig`                  | -         |

> `prefixCls` 属性适用于解决与其他库的类名冲突问题。请注意，这将丢失 `ty` 的默认样式。要解决此问题，还需要同时更新 `_variables.scss` 中的 `prefix` 变量。
