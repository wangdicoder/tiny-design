# @tiny-design/mcp — MCP Server Design Spec

**Date:** 2026-03-24
**Status:** Draft
**Package:** `@tiny-design/mcp`
**Location:** `packages/mcp/`

## Overview

An MCP (Model Context Protocol) server that gives AI assistants structured access to the Tiny Design component library, design tokens, and icon catalog. Distributed as an npm package, run via `npx @tiny-design/mcp`. Targets both internal team use and external adopters of `@tiny-design/react`.

## Architecture

### Data Flow

```
Build time:                          Runtime:
┌─────────────┐                      ┌──────────────────┐
│ packages/   │   extract.ts         │  MCP Server       │
│   react/    │──(ts-morph)──┐       │  (stdio transport) │
│   tokens/   │──(regex)─────┤──→ JSON data ──→ tools    │
│   icons/    │──(fs read)───┘       │                    │
└─────────────┘                      └──────────────────┘
```

- **Build time:** `ts-morph` parses component `types.ts` files; regex parses SCSS tokens; fs reads icon names and demo files. All output written to `src/data/*.json`.
- **Runtime:** MCP server reads the pre-built JSON and exposes it via tools over stdio using `@modelcontextprotocol/sdk`.

### Package Structure

```
packages/mcp/
├── package.json              # @tiny-design/mcp
├── tsconfig.json
├── src/
│   ├── index.ts              # MCP server entry (stdio transport)
│   ├── tools/
│   │   ├── components.ts     # list_components, get_component_props, get_component_example
│   │   ├── tokens.ts         # get_design_tokens
│   │   └── icons.ts          # list_icons, get_icon
│   └── data/                 # generated at build time, gitignored
│       ├── components.json
│       ├── tokens.json
│       └── icons.json
├── scripts/
│   └── extract.ts            # build-time extraction using ts-morph
└── dist/                     # compiled output
    └── index.js              # CLI entry with #!/usr/bin/env node
```

## Data Extraction (`scripts/extract.ts`)

Three extractors run sequentially at build time:

### Component Extractor

Uses `ts-morph` to parse each component's `types.ts` in `packages/react/src/`.

**Output shape per component:**
```json
{
  "name": "Button",
  "category": "Foundation",
  "description": "To trigger an operation",
  "props": [
    {
      "name": "btnType",
      "type": "'default' | 'primary' | 'outline' | 'ghost' | 'link' | 'info' | 'danger' | 'warning' | 'success'",
      "required": false,
      "description": "The visual style of the button"
    }
  ],
  "demos": [
    {
      "name": "Type",
      "code": "import React from 'react';\nimport { Button, Flex } from '@tiny-design/react';\n..."
    }
  ]
}
```

**Extraction details:**
- Resolves `extends BaseProps` and `Omit<React.PropsWithRef<...>, ...>` to produce the final effective prop list
- Reads demo files from each component's `demo/` directory as raw strings
- Pulls component description from the first paragraph of `index.md`
- Category assignment is hardcoded from the groupings in `apps/docs/src/routers.tsx`

### Token Extractor

Parses `packages/tokens/scss/_variables.scss` with regex to extract SCSS variable names and values.

**Output shape:**
```json
{
  "colors": {
    "primary": { "variable": "$token-color-primary", "cssVar": "--ty-color-primary" },
    "primary-hover": { "variable": "$token-color-primary-hover", "cssVar": "--ty-color-primary-hover" }
  },
  "typography": { ... },
  "spacing": { ... },
  "breakpoints": { ... },
  "shadows": { ... }
}
```

Groups tokens into categories: colors, typography, spacing, breakpoints, shadows.

### Icon Extractor

Reads `packages/icons/src/` to collect icon component names.

**Output shape:**
```json
{
  "props": {
    "size": { "type": "string | number", "default": "\"1em\"" },
    "color": { "type": "string", "default": "\"currentColor\"" }
  },
  "icons": ["IconMedium", "IconPlus", "IconClose", "..."]
}
```

All icons share the same `IconProps` interface, so only the name list varies.

## MCP Tools

Six tools exposed via `@modelcontextprotocol/sdk`:

| Tool | Input | Returns |
|------|-------|---------|
| `list_components` | `{ category?: string }` | Array of `{ name, category, description }` for discovery |
| `get_component_props` | `{ name: string }` | Full props array with types, required flags, descriptions |
| `get_component_example` | `{ name: string, demo?: string }` | Demo code snippets; all demos if `demo` not specified |
| `list_icons` | `{ search?: string }` | Icon names, optionally filtered by search term |
| `get_icon` | `{ name: string }` | Icon props and usage example |
| `get_design_tokens` | `{ category?: string }` | Tokens grouped by category; single category if specified |

### Tool Registration

Tools are registered with JSON Schema input validation. Each tool handler reads from the pre-built JSON data and returns structured results.

## Build Integration

### Turborepo Pipeline

The MCP package depends on `react`, `tokens`, and `icons`:

```
tokens → react  ─┐
         icons  ─┤→ mcp
```

### Build Steps

1. **Extract** — `tsx scripts/extract.ts` reads source from sibling packages, writes JSON to `src/data/`
2. **Build** — `tsup src/index.ts --format cjs --out-dir dist` compiles to a single JS bundle

### package.json

```json
{
  "name": "@tiny-design/mcp",
  "version": "1.6.0",
  "bin": {
    "tiny-design-mcp": "./dist/index.js"
  },
  "files": ["dist", "src/data"],
  "scripts": {
    "extract": "tsx scripts/extract.ts",
    "build": "pnpm extract && tsup src/index.ts --format cjs --out-dir dist"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "latest"
  },
  "devDependencies": {
    "ts-morph": "latest",
    "tsx": "latest",
    "tsup": "latest"
  }
}
```

**Key decisions:**
- CJS output only (stdio CLI, no need for ESM)
- `ts-morph` is devDependency only — not shipped in the published package
- `src/data/*.json` is gitignored but included in npm publish via `files` field
- Joins fixed versioning scheme via changesets

## User Setup

```json
{
  "mcpServers": {
    "tiny-design": {
      "command": "npx",
      "args": ["@tiny-design/mcp"]
    }
  }
}
```

Works with Claude Code, Cursor, VS Code Copilot, and any MCP-compatible client.

## Scope Boundaries

**In scope for v1:**
- 6 tools (components, tokens, icons)
- Static JSON data from build-time extraction
- stdio transport only

**Out of scope for v1:**
- MCP resources (browsable URIs)
- Migration tools (v1 → v2 guidance)
- Theme customization tools
- HTTP/SSE transport
- Pro/gated features
