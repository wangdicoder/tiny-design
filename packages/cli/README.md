# @tiny-design/cli

CLI for the [Tiny Design](https://github.com/wangdicoder/tiny-design) component library. Query component metadata, docs, demos, design tokens, and icons from your terminal — fully offline.

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
| `tiny-design list [category]` | List all components grouped by category |
| `tiny-design info <component>` | Props table with types, required flags, default values |
| `tiny-design doc <component>` | Full markdown documentation |
| `tiny-design demo <component> [name]` | Demo source code (TSX) |
| `tiny-design token [category]` | Design token values (colors, typography, spacing, breakpoints, shadows) |
| `tiny-design icon [search]` | List all 240+ icons or search by name |

### Project Analysis

| Command | Description |
|---------|-------------|
| `tiny-design doctor` | Diagnose project setup (React version, peer deps, duplicates) |
| `tiny-design usage [dir]` | Scan for `@tiny-design/react` import statistics |

### Global Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--format json\|text\|markdown` | Output format | `text` |
| `--lang en\|zh` | Output language | `en` |
| `--detail` | Include extended information | `false` |

## Usage with AI Tools

Use `--format json` for structured output suitable for AI agents:

```bash
tiny-design info DatePicker --format json
tiny-design icon --format json
tiny-design token colors --format json
```

For editor-integrated AI access, see [@tiny-design/mcp](https://www.npmjs.com/package/@tiny-design/mcp).

## License

MIT
