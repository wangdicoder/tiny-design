# 自定义主题

Tiny UI 提供三种方式来定制外观：

1. **主题编辑器** — 一个可视化的实时主题工具，无需编写代码（非常适合探索和快速定制）。
2. **设计令牌（Design tokens）** — 驱动亮色/暗色模式的 CSS 自定义属性，所有组件在运行时读取这些值。
3. **SCSS 变量** — 编译时变量（尺寸、字体、圆角等），可在构建自定义样式表时覆盖。

## 主题编辑器

内置的[主题编辑器](/theme/theme-editor)让你可以实时可视化定制设计令牌。你可以：

- 从 **20+ 个预设主题**中选择（如 Catppuccin、摩卡慕斯、赛博朋克等），或从零开始。
- 调整主色、成功色、警告色、危险色和信息色，以及背景色、文本色和边框色。
- 调整排版（字号、行高、字重）和细节（圆角、间距、尺寸）。
- 在真实组件上实时预览更改效果。
- 导出自定义的令牌为 CSS 或 SCSS，在你的项目中使用。

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

所有颜色、阴影和视觉状态都以 `--ty-*` CSS 自定义属性的形式暴露在 `:root` 上。你可以在自己的样式表中覆盖任意令牌：

```css
:root {
  --ty-color-primary: #007bff;
  --ty-color-primary-hover: #3d9bff;
  --ty-color-primary-active: #0062d6;
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

完整的令牌列表请参考源码：
- [亮色主题令牌](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_light.scss)
- [暗色主题令牌](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_dark.scss)

## SCSS 变量

如果你引入的是 Tiny UI 的 SCSS 源文件而非预编译的 CSS，可以覆盖编译时变量，如尺寸、间距、字体和圆角等。每个变量都使用了 `!default` 标志，因此你的覆盖值会优先生效。

> **什么是 `!default`？** 带有 `!default` 的 Sass 变量仅在尚未定义时才会赋值。在引入 Tiny UI 样式*之前*声明你的值，你的值就会生效。

### 1. 安装 Sass

```bash
$ npm install sass --save-dev
```

### 2. 创建覆盖文件

创建一个文件，例如 `theme-variables.scss`。你的覆盖值**必须写在** Tiny UI 引入语句之前：

```scss
// 你的覆盖值
$primary-color: #007bff;
$border-radius: 4px;
$font-size-base: 14px;

// 引入 Tiny UI 样式（通过 !default 应用你的覆盖值）
@use "@tiny-design/react/es/style/index" as *;
```

### 3. 在入口文件中引入

```js
import './theme-variables.scss';
```

完整的 SCSS 变量列表请参考 [_variables.scss](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/_variables.scss)。

以下是一些常用的可覆盖变量：

```scss
// 颜色
$primary-color: #6e41bf !default;

// 字体
$font-size-base: 1rem !default;
$font-size-lg: $font-size-base * 1.25 !default;
$font-size-sm: $font-size-base * 0.875 !default;
$font-weight: 400 !default;

// 边框
$border-radius: 2px !default;
$border-width: 1px !default;
$border-color: $gray-300 !default;

// 组件尺寸
$height-sm: 24px !default;
$height-md: 32px !default;
$height-lg: 42px !default;
```

如果现有的变量列表无法满足你的需求，请提交 issue 反馈。
