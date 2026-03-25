import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import type { OutputFormat } from '../utils/format.js';

interface CheckResult {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
}

function checkPackageJson(cwd: string): CheckResult {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return { name: 'package.json', status: 'fail', message: 'No package.json found' };
  }
  return { name: 'package.json', status: 'pass', message: 'Found' };
}

function checkTinyDesignInstalled(cwd: string): CheckResult {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return {
      name: '@tiny-design/react',
      status: 'fail',
      message: 'Cannot check — no package.json',
    };
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (!deps['@tiny-design/react']) {
    return {
      name: '@tiny-design/react',
      status: 'fail',
      message: 'Not listed in dependencies',
    };
  }

  // Check actual installed version
  const modulePkgPath = path.join(cwd, 'node_modules/@tiny-design/react/package.json');
  if (fs.existsSync(modulePkgPath)) {
    const modulePkg = JSON.parse(fs.readFileSync(modulePkgPath, 'utf-8'));
    return {
      name: '@tiny-design/react',
      status: 'pass',
      message: `v${modulePkg.version} installed`,
    };
  }

  return {
    name: '@tiny-design/react',
    status: 'warn',
    message: `Listed (${deps['@tiny-design/react']}) but not installed — run your package manager`,
  };
}

function checkReactVersion(cwd: string): CheckResult {
  const modulePkgPath = path.join(cwd, 'node_modules/react/package.json');
  if (!fs.existsSync(modulePkgPath)) {
    return { name: 'React version', status: 'warn', message: 'React not found in node_modules' };
  }

  const pkg = JSON.parse(fs.readFileSync(modulePkgPath, 'utf-8'));
  const major = parseInt(pkg.version.split('.')[0], 10);
  if (major < 18) {
    return {
      name: 'React version',
      status: 'fail',
      message: `v${pkg.version} — Tiny Design requires React >=18.0.0`,
    };
  }
  return { name: 'React version', status: 'pass', message: `v${pkg.version}` };
}

function checkTypeScript(cwd: string): CheckResult {
  const tsconfigPath = path.join(cwd, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    return { name: 'TypeScript', status: 'warn', message: 'No tsconfig.json (optional)' };
  }

  const modulePkgPath = path.join(cwd, 'node_modules/typescript/package.json');
  if (fs.existsSync(modulePkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(modulePkgPath, 'utf-8'));
    return { name: 'TypeScript', status: 'pass', message: `v${pkg.version}` };
  }

  return { name: 'TypeScript', status: 'warn', message: 'tsconfig.json exists but TypeScript not installed' };
}

function checkPeerDeps(cwd: string): CheckResult {
  const reactDomPath = path.join(cwd, 'node_modules/react-dom/package.json');
  if (!fs.existsSync(reactDomPath)) {
    return {
      name: 'Peer dependencies',
      status: 'warn',
      message: 'react-dom not found — required by @tiny-design/react',
    };
  }
  return { name: 'Peer dependencies', status: 'pass', message: 'react-dom found' };
}

function checkDuplicateReact(cwd: string): CheckResult {
  // Check for nested react installations that could cause issues
  const nestedReact = path.join(
    cwd,
    'node_modules/@tiny-design/react/node_modules/react/package.json',
  );
  if (fs.existsSync(nestedReact)) {
    return {
      name: 'Duplicate React',
      status: 'fail',
      message: 'Found nested React installation — this will cause hooks errors',
    };
  }
  return { name: 'Duplicate React', status: 'pass', message: 'No duplicates found' };
}

export function doctorCommand(options: { format: OutputFormat }) {
  const cwd = process.cwd();

  const checks: CheckResult[] = [
    checkPackageJson(cwd),
    checkTinyDesignInstalled(cwd),
    checkReactVersion(cwd),
    checkTypeScript(cwd),
    checkPeerDeps(cwd),
    checkDuplicateReact(cwd),
  ];

  if (options.format === 'json') {
    console.log(JSON.stringify(checks, null, 2));
    return;
  }

  const icons = { pass: chalk.green('✓'), warn: chalk.yellow('⚠'), fail: chalk.red('✗') };

  console.log(`\n  ${chalk.bold.cyan('Tiny Design Doctor')}\n`);
  for (const check of checks) {
    console.log(`  ${icons[check.status]} ${chalk.bold(check.name)}: ${check.message}`);
  }

  const fails = checks.filter((c) => c.status === 'fail').length;
  const warns = checks.filter((c) => c.status === 'warn').length;
  console.log();
  if (fails > 0) {
    console.log(`  ${chalk.red(`${fails} issue(s) found.`)}`);
  } else if (warns > 0) {
    console.log(`  ${chalk.yellow(`${warns} warning(s), no critical issues.`)}`);
  } else {
    console.log(`  ${chalk.green('All checks passed!')}`);
  }
  console.log();
}
