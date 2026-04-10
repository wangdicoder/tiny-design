# MCP Server

`@tiny-design/mcp` is a [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that gives AI assistants structured access to the Tiny Design component library, design tokens, and icon catalog.

With MCP, AI coding assistants like Claude Code, GitHub Copilot, and Cursor can look up component props, browse usage examples, query design tokens, and search icons — all without leaving your editor.

## What is MCP?

The Model Context Protocol (MCP) is an open standard that lets AI assistants connect to external data sources and tools. Instead of relying solely on training data, the AI can query live, accurate information about your design system on demand.

## Available Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all 80+ components. Filter by category: Foundation, Layout, Navigation, Data Display, Form, Feedback, Miscellany. |
| `get_component_props` | Get the full props interface for a component — types, required flags, descriptions. |
| `get_component_example` | Get usage examples (demo code) for a component. |
| `get_design_tokens` | Get v2 design tokens from the token registry — colors, typography, spacing, breakpoints, shadows. |
| `list_icons` | List all 240+ icon names. Filter by search term. |
| `get_icon` | Get details and usage example for a specific icon. |

## Setup

Install the MCP server by adding it to your AI assistant's configuration:

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

## Example Prompts

Once configured, try asking your AI assistant:

- "List all form components in Tiny Design"
- "What props does the Modal component accept?"
- "Show me an example of using the Select component"
- "What colors are available in Tiny Design's design tokens?"
- "Find icons related to arrows"

## How It Works

1. **Build time:** Extraction scripts parse component `types.ts` files (via `ts-morph`), SCSS token variables, and icon barrel exports to produce static JSON data.
2. **Bundle time:** `tsup` bundles the server code with inlined JSON data into a single self-contained executable.
3. **Runtime:** The MCP server loads the inlined data and serves it via 6 tools over stdio transport using `@modelcontextprotocol/sdk`.
