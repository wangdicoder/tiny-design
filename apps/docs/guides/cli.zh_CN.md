# CLI

`@tiny-design/cli` 是官方命令行工具，将 Tiny Design 组件知识带到你的终端。所有元数据随包附带——每个属性、演示、令牌和图标——毫秒级查询，完全离线。

## 特性

- **完全离线** — 所有元数据随包附带，无需网络请求、无延迟、无需 API 密钥。
- **AI 友好** — 所有命令支持 `--format json` 输出，结构化数据适配 AI 工具。
- **双语支持** — 所有组件名称和描述同时提供中英文，使用 `--lang zh` 切换。
- **智能匹配** — 输错 `Buttn`？CLI 会通过模糊匹配建议 `Button`。

## 安装

```bash
npm install -g @tiny-design/cli
```

## 快速开始

```bash
tiny-design list                        # 列出所有 80+ 个组件（按分类）
tiny-design info Button                 # 组件属性、类型、默认值
tiny-design doc Select                  # 完整的 Markdown 文档
tiny-design demo Button Type            # 可运行的演示源代码
tiny-design token colors                # 设计令牌值
tiny-design icon arrow                  # 按名称搜索图标
tiny-design doctor                      # 诊断项目问题
tiny-design usage ./src                 # 扫描项目中的导入统计
```

## 命令

### 知识查询

| 命令 | 描述 |
|------|------|
| `tiny-design list [category]` | 按分类列出所有组件。可筛选：基础、布局、导航、数据展示、表单、反馈、其他。 |
| `tiny-design info <component>` | 属性表，包含类型、是否必填、默认值和描述。 |
| `tiny-design doc <component>` | 组件的完整 Markdown 文档。 |
| `tiny-design demo <component> [name]` | 演示源代码（TSX）。未指定名称时列出可用演示。 |
| `tiny-design token [category]` | 设计令牌值。分类：colors、typography、spacing、breakpoints、shadows。 |
| `tiny-design icon [search]` | 列出所有 240+ 个图标或按名称搜索。 |

### 项目分析

| 命令 | 描述 |
|------|------|
| `tiny-design doctor` | 诊断检查：package.json、React 版本、对等依赖、TypeScript、重复 React 检测。 |
| `tiny-design usage [dir]` | 扫描源文件中的 `@tiny-design/react` 导入，显示组件使用次数和文件位置。 |

### 全局参数

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `--format json\|text\|markdown` | 输出格式 | `text` |
| `--lang en\|zh` | 输出语言 | `en` |
| `--detail` | 显示扩展信息 | `false` |

## 示例

### 按分类列出组件

```bash
$ tiny-design list Foundation --lang zh

  Foundation

   Component  | Description
  ------------+----------------------------------------------
   Button     | 用于触发一个操作。
   Image      | Image 组件用于显示图片。
   Link       | 显示超链接。
   Typography | 基本的文字排版，包括标题、正文、列表等。

  4 components total
```

### 获取组件属性（JSON 格式，适合 AI 工具）

```bash
$ tiny-design info Modal --format json
{
  "name": "Modal",
  "category": "Feedback",
  "description": "Modal dialogs.",
  "props": [
    {
      "name": "visible",
      "type": "boolean",
      "required": false,
      "description": "Whether the modal is visible"
    },
    ...
  ]
}
```

### 搜索图标

```bash
$ tiny-design icon arrow

  Icons matching "arrow" (16 found)

  • IconArrowRight
  • IconArrowUp
  • IconArrowLeft
  • IconArrowDown
  ...
```

### 查看演示

```bash
$ tiny-design demo Button Type

  Button / Type

import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function TypeDemo() {
  return (
    <Flex gap="sm">
      <Button>Default</Button>
      <Button btnType="primary">Primary</Button>
      <Button btnType="outline">Outline</Button>
    </Flex>
  );
}
```

### 诊断项目配置

```bash
$ tiny-design doctor

  Tiny Design Doctor

  ✓ package.json: Found
  ✓ @tiny-design/react: v1.6.1 installed
  ✓ React version: v18.3.1
  ✓ TypeScript: v5.4.5
  ✓ Peer dependencies: react-dom found
  ✓ Duplicate React: No duplicates found

  All checks passed!
```

## 与 AI 工具配合使用

CLI 专为 AI 编程助手设计。使用 `--format json` 获取结构化输出：

```bash
# 以 JSON 格式获取组件信息
tiny-design info DatePicker --format json

# 以 JSON 列出所有图标
tiny-design icon --format json

# 以 JSON 获取设计令牌
tiny-design token colors --format json
```

如需在编辑器内更丰富的 AI 集成体验，请查看 [MCP Server](/guide/mcp-server)，它通过 Model Context Protocol 提供相同的数据。
