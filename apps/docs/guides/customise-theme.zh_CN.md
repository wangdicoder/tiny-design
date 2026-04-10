# 自定义主题

Tiny UI 使用由 token 驱动的运行时主题模型：

1. **CSS 自定义属性**，用于直接做运行时覆盖。
2. **ThemeDocument**，用于可移植的主题 JSON。
3. **ConfigProvider `theme.tokens`**，用于 React 作用域主题。

## 主题编辑器

内置的[主题编辑器](/theme/theme-studio)让你可以实时可视化定制设计令牌。你可以：

- 从 **20+ 个预设主题**中选择（如 Catppuccin、摩卡慕斯、赛博朋克等），或从零开始。
- 调整主色、成功色、警告色、危险色和信息色，以及背景色、文本色和边框色。
- 调整排版（字号、行高、字重）和细节（圆角、间距、尺寸）。
- 在真实组件上实时预览更改效果。
- 导出自定义的令牌为 CSS 或 JSON，在你的项目中使用。

更改通过 CSS 自定义属性即时生效 — 无需重新构建。

主题编辑器导出的也是同一套运行时 token 模型，因此结果既可以作为 CSS 变量使用，也可以保存为 `ThemeDocument`，或者传给 `ConfigProvider`。

## 暗色模式

Tiny UI 内置亮色和暗色主题。默认为亮色模式。要启用暗色模式，请在 `<html>` 元素上设置 `data-tiny-theme`：

```html
<!-- 亮色（默认，无需设置） -->
<html>

<!-- 暗色 -->
<html data-tiny-theme="dark">

<!-- 跟随系统偏好 -->
<html data-tiny-theme="system">
```

也可以使用 `useTheme` hook 在运行时切换主题：

```tsx
import { useTheme } from '@tiny-design/react';

const App = () => {
  const { mode, resolvedTheme, setMode, toggle } = useTheme();
  return <button onClick={toggle}>当前：{resolvedTheme}</button>;
};
```

该 hook 返回：

| 属性 | 类型 | 说明 |
|---|---|---|
| `mode` | `'light' \| 'dark' \| 'system'` | 存储的用户偏好 |
| `resolvedTheme` | `'light' \| 'dark'` | 实际解析的主题（将 `'system'` 解析为操作系统偏好） |
| `setMode(mode)` | `(mode: ThemeMode) => void` | 设置指定模式 |
| `toggle()` | `() => void` | 在亮色和暗色之间切换 |

## 设计令牌（CSS 自定义属性）

所有语义令牌和组件令牌都会以 `--ty-*` CSS 自定义属性的形式暴露出来。这是最底层、最通用的运行时接口。

你可以直接在自己的样式表里覆盖：

```css
:root {
  --ty-color-primary: #007bff;
  --ty-color-primary-hover: #3d9bff;
  --ty-color-primary-active: #0062d6;
  --ty-button-radius: 999px;
  --ty-card-header-padding: 20px;
}
```

暗色模式下的覆盖，使用暗色主题选择器：

```css
html[data-tiny-theme='dark'] {
  --ty-color-primary: #3d9bff;
  --ty-color-primary-hover: #66b3ff;
  --ty-color-primary-active: #007bff;
  --ty-color-bg-container: #111827;
  --ty-color-text: rgba(249, 250, 251, 0.92);
}
```

### 命名规则

- semantic token 使用 kebab-case，例如 `color-primary`
- component token 使用点分路径，例如 `button.radius`、`card.header-padding`
- 运行时 CSS 变量就是把点替换成连字符，例如 `--ty-button-radius`、`--ty-card-header-padding`

### 常用令牌

| 令牌 | 亮色默认值 | 说明 |
|---|---|---|
| `--ty-color-primary` | `#6e41bf` | 主品牌色 |
| `--ty-color-primary-hover` | `#8b62d0` | 主色悬停状态 |
| `--ty-color-primary-active` | `#5a30a8` | 主色激活状态 |
| `--ty-color-bg` | `#fff` | 页面背景色 |
| `--ty-color-text` | `rgba(0,0,0,0.85)` | 主文本色 |
| `--ty-color-text-secondary` | `rgba(0,0,0,0.65)` | 次要文本色 |
| `--ty-color-border` | `#d9d9d9` | 默认边框色 |
| `--ty-border-radius` | `6px` | 全局圆角 |
| `--ty-font-size-base` | `14px` | 基础字号 |
| `--ty-height-sm` | `24px` | 小尺寸控件高度 |
| `--ty-height-md` | `35px` | 中尺寸控件高度 |
| `--ty-height-lg` | `44px` | 大尺寸控件高度 |

每个组件也有自己的令牌，用于细粒度控制。例如，Button 使用 `--ty-button-bg-default`、`--ty-button-text-default`、`--ty-button-radius`。完整的受支持令牌列表来自 token registry 和组件 source：
- [Token registry](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/dist/registry.json)
- [组件 token 源文件](https://github.com/wangdicoder/tiny-design/tree/master/packages/tokens/source/components)

## ThemeDocument

`ThemeDocument` 是主题导出、导入、保存和分发时使用的标准 JSON 格式。

```json
{
  "meta": {
    "id": "brand-ocean",
    "name": "Brand Ocean",
    "schemaVersion": 1
  },
  "mode": "light",
  "extends": "tiny-light",
  "tokens": {
    "semantic": {
      "color-primary": "#0ea5e9",
      "border-radius": "12px"
    },
    "components": {
      "button.radius": "999px",
      "card.header-padding": "20px"
    }
  }
}
```

适合用在这些场景：

- 主题文件持久化
- 工具之间导入导出
- 社区主题 / 预设主题
- 在 `tiny-light` 或 `tiny-dark` 之上做模式化覆盖

## React: ConfigProvider

在 React 应用里，推荐使用 `ConfigProvider theme={{ tokens: ... }}`。

```tsx
import { ConfigProvider } from '@tiny-design/react';

<ConfigProvider
  theme={{
    mode: 'light',
    extends: 'tiny-light',
    tokens: {
      semantic: {
        'color-primary': '#0ea5e9',
        'border-radius': '12px',
      },
      components: {
        'button.radius': '999px',
        'card.header-padding': '20px',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

适合用在这些场景：

- 只对 React 树中的一部分做作用域主题
- 需要嵌套主题覆盖
- 需要让弹层 / portal 内容继承同一个 token 作用域

`theme.tokens.semantic` 和 `theme.tokens.components` 是受支持的 React 主题结构。

## Sass 源码样式

Tiny UI 仍然发布 Sass 源文件，方便需要直接编译库样式的构建工具使用；但 Sass 变量不再是主题 API。请把 `@tiny-design/react/es/style/*.scss` 和组件 `style/*.scss` 当作实现源码，而不是受支持的主题定制契约。

颜色、排版、圆角、阴影、间距、尺寸和组件状态等视觉定制都应该通过 token 完成。如果某个值还没有对应 token，优先把它补进 token registry，而不是新增公开 Sass 变量。

完整 token 列表由 `packages/tokens/dist/registry.json` 生成。

## 推荐用法

- 想最快做运行时覆盖，用 CSS 变量
- 需要可移植的 JSON 主题格式，用 `ThemeDocument`
- 需要 React 局部主题，用 `ConfigProvider`
- 不要把 Sass 变量当作公开主题配置；缺失的定制点应该补成 token

如果现有的令牌列表无法满足你的需求，请提交 issue 反馈。
