# MCP Server

`@tiny-design/mcp` 是一个 [Model Context Protocol](https://modelcontextprotocol.io/)（MCP）服务器，为 AI 助手提供对 Tiny Design 组件库、设计令牌和图标目录的结构化访问。

通过 MCP，Claude Code、GitHub Copilot 和 Cursor 等 AI 编程助手可以查询组件属性、浏览使用示例、查询设计令牌和搜索图标——无需离开编辑器。

## 什么是 MCP？

Model Context Protocol（MCP）是一个开放标准，允许 AI 助手连接外部数据源和工具。AI 可以按需查询设计系统的实时准确信息，而不仅仅依赖训练数据。

## 可用工具

| 工具 | 描述 |
|------|------|
| `list_components` | 列出所有 80+ 个组件。可按分类筛选：基础、布局、导航、数据展示、表单、反馈、其他。 |
| `get_component_props` | 获取组件的完整属性接口——类型、是否必填、描述。 |
| `get_component_example` | 获取组件的使用示例（演示代码）。 |
| `get_design_tokens` | 获取设计令牌（SCSS 变量）——颜色、排版、间距、断点、阴影。 |
| `list_icons` | 列出所有 240+ 个图标名称。支持搜索过滤。 |
| `get_icon` | 获取特定图标的详细信息和使用示例。 |

## 配置

将 MCP 服务器添加到你的 AI 助手配置中：

### Claude Code

```json
// .claude/settings.json
{
  "mcpServers": {
    "tiny-design": {
      "command": "npx",
      "args": ["@tiny-design/mcp"]
    }
  }
}
```

### VS Code (GitHub Copilot)

```json
// .vscode/mcp.json
{
  "mcpServers": {
    "tiny-design": {
      "command": "npx",
      "args": ["@tiny-design/mcp"]
    }
  }
}
```

### Cursor

```json
// .cursor/mcp.json
{
  "mcpServers": {
    "tiny-design": {
      "command": "npx",
      "args": ["@tiny-design/mcp"]
    }
  }
}
```

## 示例提示

配置完成后，可以尝试向 AI 助手提问：

- "列出 Tiny Design 的所有表单组件"
- "Modal 组件接受哪些属性？"
- "展示 Select 组件的使用示例"
- "Tiny Design 的设计令牌中有哪些颜色？"
- "查找与箭头相关的图标"

## 工作原理

1. **构建时：** 提取脚本通过 `ts-morph` 解析组件 `types.ts` 文件、SCSS 令牌变量和图标导出，生成静态 JSON 数据。
2. **打包时：** `tsup` 将服务器代码与内联 JSON 数据打包为一个独立的可执行文件。
3. **运行时：** MCP 服务器加载内联数据，通过 `@modelcontextprotocol/sdk` 以 stdio 传输方式提供 6 个工具。
