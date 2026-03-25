# CLI

`@tiny-design/cli` is an official command-line tool that brings Tiny Design component knowledge to your terminal. It ships all metadata locally — every prop, demo, token, and icon — queryable in milliseconds, fully offline.

## Highlights

- **Fully offline** — All metadata ships with the package. No network calls, no latency, no API keys.
- **Agent-optimized** — `--format json` on every command. Structured output ready for AI tools.
- **Bilingual** — Every component name and description has both English and Chinese. Switch with `--lang zh`.
- **Smart matching** — Typo `Buttn`? The CLI suggests `Button` using fuzzy matching.

## Install

```bash
npm install -g @tiny-design/cli
```

## Quick Start

```bash
tiny-design list                        # List all 80+ components by category
tiny-design info Button                 # Component props, types, defaults
tiny-design doc Select                  # Full markdown documentation
tiny-design demo Button Type            # Runnable demo source code
tiny-design token colors                # Design token values
tiny-design icon arrow                  # Search icons by name
tiny-design doctor                      # Diagnose project issues
tiny-design usage ./src                 # Scan project for import stats
```

## Commands

### Knowledge Query

| Command | Description |
|---------|-------------|
| `tiny-design list [category]` | List all components grouped by category. Filter by: Foundation, Layout, Navigation, Data Display, Form, Feedback, Miscellany. |
| `tiny-design info <component>` | Props table with types, required flags, default values, and descriptions. |
| `tiny-design doc <component>` | Full markdown documentation for a component. |
| `tiny-design demo <component> [name]` | Demo source code (TSX). Lists available demos if no name is given. |
| `tiny-design token [category]` | Design token values. Categories: colors, typography, spacing, breakpoints, shadows. |
| `tiny-design icon [search]` | List all 240+ icons or search by name. |

### Project Analysis

| Command | Description |
|---------|-------------|
| `tiny-design doctor` | Diagnostic checks: package.json, React version, peer deps, TypeScript, duplicate React detection. |
| `tiny-design usage [dir]` | Scan source files for `@tiny-design/react` imports. Shows component usage counts and file locations. |

### Global Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--format json\|text\|markdown` | Output format | `text` |
| `--lang en\|zh` | Output language | `en` |
| `--detail` | Include extended information | `false` |

## Examples

### List components in a category

```bash
$ tiny-design list Foundation

  Foundation

   Component  | Description
  ------------+----------------------------------------------
   Button     | To trigger an operation.
   Image      | The Image component is used to display images.
   Link       | Displays a hyperlink.
   Typography | Basic text writing, including headings, ...

  4 components total
```

### Get component props (JSON for AI tools)

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

### Search icons

```bash
$ tiny-design icon arrow

  Icons matching "arrow" (16 found)

  • IconArrowRight
  • IconArrowUp
  • IconArrowLeft
  • IconArrowDown
  ...
```

### View a demo

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

### Diagnose project setup

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

## Usage with AI Tools

The CLI is designed to work seamlessly with AI coding assistants. Use `--format json` for structured output:

```bash
# Get component info as JSON for an AI agent
tiny-design info DatePicker --format json

# List all icons as JSON
tiny-design icon --format json

# Get design tokens as JSON
tiny-design token colors --format json
```

For a richer AI integration that works inside your editor, check out the [MCP Server](/guide/mcp-server) which provides the same data through the Model Context Protocol.
