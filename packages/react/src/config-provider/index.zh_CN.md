# ConfigProvider

为组件提供统一的全局配置，支持通过设计令牌进行主题定制。

## 使用方式

```jsx
import { ConfigProvider, zh_CN } from 'tiny-design';

// ...

return (
  <ConfigProvider componentSize="lg" locale={zh_CN} {...otherYourConfig}>
    <App />
  </ConfigProvider>
);
```

## 主题定制

`theme` 属性既可以接收主题模式字符串，也可以接收 `ThemeConfig` 对象来进行细粒度的令牌定制。

### 主题模式

```jsx
<ConfigProvider theme="dark">
  <App />
</ConfigProvider>
```

### 令牌覆盖

使用 `ThemeConfig` 自定义全局令牌和组件级令牌：

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

| 属性       | 说明                                             | 类型                                          | 默认值  |
| ---------- | ------------------------------------------------ | --------------------------------------------- | ------- |
| mode       | 主题模式                                         | enum: `light` &#124; `dark` &#124; `system`   | -       |
| token      | 全局设计令牌覆盖（camelCase 键名）               | `Record<string, string \| number>`            | -       |
| components | 组件级令牌覆盖（camelCase 键名）                 | `Record<string, Record<string, string \| number>>` | -  |

令牌键名使用 camelCase 格式，会自动转换为 CSS 自定义属性。例如 `colorPrimary` 会转换为 `--ty-color-primary`，`Button.borderRadius` 会转换为 `--ty-btn-border-radius`。

令牌覆盖以内联样式的方式应用到 `<html>` 元素上，因此所有组件（包括通过 Portal 渲染的弹窗、提示框、下拉菜单等）都会继承这些覆盖值。当 ConfigProvider 卸载或 `theme` 属性变更时，覆盖值会自动清理。

### CSS 自定义属性覆盖

也可以直接通过 CSS 自定义属性来定制组件，无需使用 `ThemeConfig`：

```css
/* 全局 — 影响所有组件 */
:root { --ty-border-radius: 8px; }

/* 组件级 — 仅影响 Button */
:root { --ty-btn-border-radius: 20px; }

/* 作用域 — 仅影响 .my-section 内的 Button */
.my-section { --ty-btn-border-radius: 0; }
```

## Props

| 属性              | 说明                                                          | 类型                                              | 默认值    |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------- | --------- |
| prefixCls         | 设置类名前缀                                                  | string                                            | ty        |
| componentSize     | 组件大小                                                      | enum: `lg` &#124; `md` &#124; `sm`                | `md`      |
| shimmer           | 为 [Skeleton](#/components/skeleton) 显示微光动画效果         | boolean                                           | false     |
| space             | 设置 Space 间距，参考 [Space](#/components/space)             | enum: `sm` &#124; `md` &#124; `lg` or `number`.   | `sm`      |
| locale            | 设置组件语言包（如 `en_US`、`zh_CN`）                         | Locale                                            | -         |
| theme             | 设置主题模式或包含令牌覆盖的主题配置                          | `ThemeMode` &#124; `ThemeConfig`                  | -         |

> `prefixCls` 属性适用于解决与其他库的类名冲突问题。请注意，这将丢失 `ty` 的默认样式。要解决此问题，还需要同时更新 `_variables.scss` 中的 `prefix` 变量。
