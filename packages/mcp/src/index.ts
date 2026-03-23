// Note: shebang is added by tsup via banner config — do NOT add #!/usr/bin/env node here
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { listComponents, getComponentProps, getComponentExample } from './tools/components.js';
import { getDesignTokens } from './tools/tokens.js';
import { listIcons, getIcon } from './tools/icons.js';

const server = new McpServer({
  name: '@tiny-design/mcp',
  version: '1.6.0',
});

// --- Component tools ---

server.tool(
  'list_components',
  'List all Tiny Design components. Optionally filter by category: Foundation, Layout, Navigation, Data Display, Form, Feedback, Miscellany.',
  { category: z.string().optional().describe('Filter by component category') },
  async ({ category }) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(listComponents(category), null, 2) }],
  })
);

server.tool(
  'get_component_props',
  'Get the full props interface for a Tiny Design component, including types, required flags, and descriptions.',
  { name: z.string().describe('Component name (e.g., "Button", "Modal", "Select")') },
  async ({ name }) => {
    const result = getComponentProps(name);
    if (!result) {
      return { content: [{ type: 'text' as const, text: `Component "${name}" not found.` }] };
    }
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  'get_component_example',
  'Get usage examples (demo code) for a Tiny Design component.',
  {
    name: z.string().describe('Component name (e.g., "Button")'),
    demo: z.string().optional().describe('Specific demo name (e.g., "Type", "Size"). Returns all demos if omitted.'),
  },
  async ({ name, demo }) => {
    const result = getComponentExample(name, demo);
    if (!result) {
      return { content: [{ type: 'text' as const, text: `Component "${name}" not found.` }] };
    }
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Token tools ---

server.tool(
  'get_design_tokens',
  'Get Tiny Design design tokens (SCSS variables). Categories: colors, typography, spacing, breakpoints, shadows.',
  { category: z.string().optional().describe('Token category to filter by') },
  async ({ category }) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(getDesignTokens(category), null, 2) }],
  })
);

// --- Icon tools ---

server.tool(
  'list_icons',
  'List all Tiny Design icon names. Optionally filter by search term.',
  { search: z.string().optional().describe('Search term to filter icons (e.g., "arrow", "close")') },
  async ({ search }) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(listIcons(search), null, 2) }],
  })
);

server.tool(
  'get_icon',
  'Get details for a specific Tiny Design icon, including props and usage example.',
  { name: z.string().describe('Icon name (e.g., "IconPlus", "IconClose")') },
  async ({ name }) => {
    const result = getIcon(name);
    if (!result) {
      return { content: [{ type: 'text' as const, text: `Icon "${name}" not found.` }] };
    }
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Start server ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
