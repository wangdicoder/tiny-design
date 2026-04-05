# 自定义主题

Tiny UI 提供三种方式来定制外观：

1. **主题编辑器** — 一个可视化的实时主题工具，无需编写代码（非常适合探索和快速定制）。
2. **设计令牌（Design tokens）** — 驱动亮色/暗色模式的 CSS 自定义属性，所有组件在运行时读取这些值。
3. **SCSS 常量** — 编译时结构常量（内边距、过渡动画、箭头尺寸等），可在构建自定义样式表时覆盖。

## 主题编辑器

内置的[主题编辑器](/theme/theme-editor)让你可以实时可视化定制设计令牌。你可以：

- 从 **20+ 个预设主题**中选择（如 Catppuccin、摩卡慕斯、赛博朋克等），或从零开始。
- 调整主色、成功色、警告色、危险色和信息色，以及背景色、文本色和边框色。
- 调整排版（字号、行高、字重）和细节（圆角、间距、尺寸）。
- 在真实组件上实时预览更改效果。
- 导出自定义的令牌为 CSS 或 JSON，在你的项目中使用。

更改通过 CSS 自定义属性即时生效 — 无需重新构建。

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

所有颜色、阴影和视觉状态都以 `--ty-*` CSS 自定义属性的形式暴露在 `:root` 上。这是定制 Tiny UI 的**主要方式**。你可以在自己的样式表中覆盖任意令牌：

```css
:root {
  --ty-color-primary: #007bff;
  --ty-color-primary-hover: #3d9bff;
  --ty-color-primary-active: #0062d6;
}
```

暗色模式下的覆盖，使用暗色主题选择器：

```css
html[data-tiny-theme='dark'] {
  --ty-color-primary: #3d9bff;
  --ty-color-primary-hover: #66b3ff;
  --ty-color-primary-active: #007bff;
}
```

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
| `--ty-border-radius` | `2px` | 全局圆角 |
| `--ty-font-size-base` | `1rem` | 基础字号 |
| `--ty-height-sm` | `24px` | 小尺寸控件高度 |
| `--ty-height-md` | `32px` | 中尺寸控件高度 |
| `--ty-height-lg` | `42px` | 大尺寸控件高度 |

每个组件也有自己的令牌，用于细粒度控制。例如，Button 使用 `--ty-btn-default-bg`、`--ty-btn-default-color` 等。完整的令牌列表请参考源码：
- [亮色主题令牌](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_light.scss)
- [暗色主题令牌](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_dark.scss)

## SCSS 常量

如果你引入的是 Tiny UI 的 SCSS 源文件而非预编译的 CSS，可以覆盖编译时结构常量，如内边距、过渡动画和箭头尺寸。这些是不需要在运行时变化的值。

每个常量都使用了 `!default` 标志，因此你的覆盖值会优先生效。

### 1. 安装 Sass

```bash
$ npm install sass --save-dev
```

### 2. 创建覆盖文件

创建一个文件，例如 `theme-overrides.scss`。你的覆盖值**必须写在** Tiny UI 引入语句之前：

```scss
// 覆盖结构常量
$btn-padding-md: 0 20px;
$card-body-padding: 20px;
$tooltip-arrow-size: 6px;

// 引入 Tiny UI 样式（通过 !default 应用你的覆盖值）
@use "@tiny-design/react/es/style/index" as *;
```

### 3. 在入口文件中引入

```js
import './theme-overrides.scss';
```

完整的 SCSS 常量列表请参考 [_constants.scss](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/_constants.scss)。

以下是一些常用的可覆盖常量：

```scss
// 按钮
$btn-padding-sm: 0 10px !default;
$btn-padding-md: 0 15px !default;
$btn-padding-lg: 0 28px !default;

// 卡片
$card-header-padding: 13px 16px !default;
$card-body-padding: 16px !default;

// 通知
$notification-width: 380px !default;
```

> **注意：** 颜色、字号、圆角、阴影等所有视觉令牌应通过 CSS 自定义属性定制（见上方），而非 SCSS 变量。SCSS 常量仅用于内边距、尺寸等结构性值。

如果现有的令牌或常量列表无法满足你的需求，请提交 issue 反馈。
