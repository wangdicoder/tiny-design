// Note: shebang is added by tsup via banner config — do NOT add #!/usr/bin/env node here
import { Command } from 'commander';
import type { ComponentDataWithDocs, TokenData, IconData } from '@tiny-design/extract';
import { listCommand } from './commands/list.js';
import { infoCommand } from './commands/info.js';
import { docCommand } from './commands/doc.js';
import { demoCommand } from './commands/demo.js';
import { tokenCommand } from './commands/token.js';
import { iconCommand } from './commands/icon.js';
import { doctorCommand } from './commands/doctor.js';
import { usageCommand } from './commands/usage.js';
import type { OutputFormat } from './utils/format.js';
import componentsData from './data/components.json';
import tokensData from './data/tokens.json';
import iconsData from './data/icons.json';
import pkg from '../package.json';

const components = componentsData as ComponentDataWithDocs[];
const tokens = tokensData as TokenData;
const icons = iconsData as IconData;

const program = new Command();

program
  .name('tiny-design')
  .version(pkg.version)
  .description('CLI for the Tiny Design component library')
  .option('--format <type>', 'output format: json, text, markdown', 'text')
  .option('--lang <lang>', 'language: en, zh', 'en')
  .option('--detail', 'show extended information', false);

function getOpts() {
  const opts = program.opts();
  return {
    format: opts.format as OutputFormat,
    lang: opts.lang as string,
    detail: opts.detail as boolean,
  };
}

program
  .command('list')
  .description('List all components, optionally filtered by category')
  .argument('[category]', 'filter by category')
  .action((category?: string) => {
    const opts = getOpts();
    listCommand(components, { ...opts, category });
  });

program
  .command('info')
  .description('Show component props and API details')
  .argument('<component>', 'component name')
  .action((component: string) => {
    infoCommand(component, components, getOpts());
  });

program
  .command('doc')
  .description('Show full markdown documentation for a component')
  .argument('<component>', 'component name')
  .action((component: string) => {
    docCommand(component, components, getOpts());
  });

program
  .command('demo')
  .description('Show demo source code for a component')
  .argument('<component>', 'component name')
  .argument('[name]', 'specific demo name')
  .action((component: string, name?: string) => {
    demoCommand(component, name, components, getOpts());
  });

program
  .command('token')
  .description('Show design token values by category')
  .argument('[category]', 'token category: colors, typography, spacing, breakpoints, shadows')
  .action((category?: string) => {
    tokenCommand(category, tokens, getOpts());
  });

program
  .command('icon')
  .description('List or search icons')
  .argument('[search]', 'search term to filter icons')
  .action((search?: string) => {
    iconCommand(search, icons, getOpts());
  });

program
  .command('doctor')
  .description('Diagnose project setup issues')
  .action(() => {
    doctorCommand(getOpts());
  });

program
  .command('usage')
  .description('Scan project for @tiny-design/react import statistics')
  .argument('[dir]', 'directory to scan', '.')
  .action((dir: string) => {
    usageCommand(dir, getOpts());
  });

program.parse();
