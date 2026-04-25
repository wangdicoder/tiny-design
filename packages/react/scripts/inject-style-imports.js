/**
 * Post-build script: injects CSS imports into each component's index.js
 * so that importing a component automatically loads its styles.
 *
 * For ES modules (es/):  import './style/index.css';
 * For CommonJS (lib/):   require('./style/index.css');
 *
 * Also parses each component's style/index.js to discover style dependencies
 * (e.g., Modal depends on Overlay + Button CSS) and injects those too.
 */
const fs = require('fs');
const path = require('path');

const ES_DIR = path.resolve(__dirname, '../es');
const LIB_DIR = path.resolve(__dirname, '../lib');

/**
 * Parse a component's style/index.js to extract CSS import paths.
 * Returns paths relative to the style/ directory.
 *
 * Example style/index.js content (tsdown rewrites .scss → .css):
 *   import './index.css';
 *   import '../../overlay/style/index.css';
 *
 * Returns: ['./index.css', '../../overlay/style/index.css']
 */
function parseCssDeps(cssJsPath) {
  if (!fs.existsSync(cssJsPath)) return [];

  const content = fs.readFileSync(cssJsPath, 'utf-8');
  const deps = [];

  // Match both ES import and CJS require patterns
  const importRegex = /(?:import\s+['"](.+?\.css)['"]|require\(['"](.+?\.css)['"]\))/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    deps.push(match[1] || match[2]);
  }

  return deps;
}

/**
 * Transform a CSS path from style/index.js perspective to component/index.js perspective.
 *
 * style/index.js is at:  es/modal/style/index.js
 * index.js is at:        es/modal/index.js
 *
 * So paths need to go one directory level less deep:
 *   ./index.css           -> ./style/index.css
 *   ../../overlay/style/  -> ../overlay/style/
 */
function transformPath(cssPath) {
  // Normalize _index.css -> index.css (some components reference the partial name)
  cssPath = cssPath.replace(/_index\.css/, 'index.css');

  if (cssPath.startsWith('./')) {
    // ./index.css -> ./style/index.css
    return './style/' + cssPath.slice(2);
  }
  if (cssPath.startsWith('../../')) {
    // ../../overlay/style/index.css -> ../overlay/style/index.css
    return cssPath.slice(3);
  }
  if (cssPath.startsWith('../')) {
    // ../style/index.css -> ./style/index.css (same component, different path form)
    return './' + cssPath.slice(3);
  }
  return cssPath;
}

function loadSliceManifest(baseDir) {
  const manifestPath = path.join(baseDir, 'style', 'component-deps.json');
  if (!fs.existsSync(manifestPath)) return {};
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
}

function formatImport(p, format) {
  return format === 'esm' ? `import '${p}';` : `require('${p}');`;
}

/**
 * Build the CSS import lines to prepend to a component's index.js.
 *
 * Component CSS now resolves tokens through three layers:
 *   1. foundation.css — primitive token tier (always loaded)
 *   2. semantic.css   — semantic token tier (always loaded)
 *   3. components/<slice>.css — only the component-tier slices this component needs
 *      (own + transitive style/var() deps), per the slice manifest
 * After tokens come the component's own selectors and any composed selector deps.
 */
function buildImportLines(componentDir, format, manifest) {
  const componentName = path.basename(componentDir);
  const styleJsPath = path.join(componentDir, 'style', 'index.js');
  const ownCssPath = path.join(componentDir, 'style', 'index.css');
  const deps = parseCssDeps(styleJsPath);

  const imports = [];

  imports.push(formatImport('../style/foundation.css', format));
  imports.push(formatImport('../style/semantic.css', format));

  const sliceNames = manifest[componentName] || [];
  for (const sliceName of sliceNames) {
    imports.push(formatImport(`../style/components/${sliceName}.css`, format));
  }

  if (deps.length > 0) {
    for (const dep of deps) {
      imports.push(formatImport(transformPath(dep), format));
    }
  } else if (fs.existsSync(ownCssPath)) {
    imports.push(formatImport('./style/index.css', format));
  }

  return imports;
}

/**
 * Inject CSS imports into a component's index.js file.
 */
function injectComponent(componentDir, format, manifest) {
  const indexPath = path.join(componentDir, 'index.js');
  if (!fs.existsSync(indexPath)) return false;

  const imports = buildImportLines(componentDir, format, manifest);
  if (imports.length <= 2) return false; // Only foundation + semantic, no component CSS

  const content = fs.readFileSync(indexPath, 'utf-8');

  // Don't inject twice
  if (content.includes('style/foundation.css') || content.includes('style/index.css')) {
    return false;
  }

  const injected = imports.join('\n') + '\n' + content;
  fs.writeFileSync(indexPath, injected);
  return true;
}

/**
 * Inject foundation + semantic token imports into the barrel index.js.
 * Per-component slices are NOT injected here — each component entry pulls its own slices.
 */
function injectBarrel(dir, format) {
  const indexPath = path.join(dir, 'index.js');
  if (!fs.existsSync(indexPath)) return;

  const content = fs.readFileSync(indexPath, 'utf-8');
  if (content.includes('style/foundation.css')) return;

  const lines = [
    formatImport('./style/foundation.css', format),
    formatImport('./style/semantic.css', format),
  ].join('\n') + '\n';

  fs.writeFileSync(indexPath, lines + content);
  console.log(
    `  injected foundation + semantic CSS into ${path.relative(path.resolve(__dirname, '..'), indexPath)}`
  );
}

function processDir(baseDir, format) {
  const manifest = loadSliceManifest(baseDir);
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    // Skip internal dirs
    if (entry.name.startsWith('_') || entry.name === 'style' || entry.name === 'locale') continue;

    const componentDir = path.join(baseDir, entry.name);
    if (injectComponent(componentDir, format, manifest)) {
      count++;
    }
  }

  return count;
}

// Main
console.log('Injecting CSS imports into component entry files...\n');

const esCount = processDir(ES_DIR, 'esm');
injectBarrel(ES_DIR, 'esm');
console.log(`  ES modules: ${esCount} components injected`);

const libCount = processDir(LIB_DIR, 'cjs');
injectBarrel(LIB_DIR, 'cjs');
console.log(`  CommonJS:   ${libCount} components injected`);

console.log('\nDone.');
