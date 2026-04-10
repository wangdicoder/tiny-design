# @tiny-design/mcp

MCP (Model Context Protocol) server that gives AI assistants structured access to the [Tiny Design](https://wangdicoder.github.io/tiny-design/) component library, design tokens, and icon catalog.

## Setup

Add to your MCP client config:

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

## Available Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all 80+ components. Filter by category: Foundation, Layout, Navigation, Data Display, Form, Feedback, Miscellany. |
| `get_component_props` | Get the full props interface for a component — types, required flags, descriptions. |
| `get_component_example` | Get usage examples (demo code) for a component. |
| `get_design_tokens` | Get v2 design tokens from the token registry — colors, typography, spacing, breakpoints, shadows. |
| `list_icons` | List all 240+ icon names. Filter by search term. |
| `get_icon` | Get details and usage example for a specific icon. |

## Examples

Ask your AI assistant:

- "List all form components in Tiny Design"
- "What props does the Modal component accept?"
- "Show me an example of using the Select component"
- "What colors are available in Tiny Design's design tokens?"
- "Find icons related to arrows"

## Development

```bash
# Install dependencies (from monorepo root)
pnpm install

# Run extraction + build
pnpm --filter @tiny-design/mcp build

# Run tests
pnpm --filter @tiny-design/mcp test
```

### How It Works

1. **Build time:** Extraction scripts parse component `types.ts` files (via `ts-morph`), SCSS token variables (via regex), and icon barrel exports to produce static JSON.
2. **Bundle time:** `tsup` bundles the server code with inlined JSON data into a single self-contained `dist/index.js`.
3. **Runtime:** The MCP server loads the inlined data and serves it via 6 tools over stdio transport using `@modelcontextprotocol/sdk`.

## License

MIT
