const fs = require('fs');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'src');
const ES_DIR = path.join(ROOT, 'es');
const LIB_DIR = path.join(ROOT, 'lib');
const NODE_MODULES = path.join(ROOT, 'node_modules');

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function processWithPostcss(css) {
  const result = await postcss([autoprefixer]).process(css, { from: undefined });
  return result.css;
}

// 1. Base CSS: copy the v2 runtime theme bundle from @tiny-design/tokens
function copyBaseCss() {
  const src = require.resolve('@tiny-design/tokens/dist/css/base.css');
  for (const dir of [ES_DIR, LIB_DIR]) {
    const outDir = path.join(dir, 'style');
    mkdirp(outDir);
    fs.copyFileSync(src, path.join(outDir, 'base.css'));
  }
  console.log('  es/style/base.css + lib/style/base.css (copied from @tiny-design/tokens v2 base theme CSS)');
}

// 2. Per-component CSS: compile each component's _index.scss partial
async function buildComponentCss() {
  const entries = fs.readdirSync(COMPONENTS, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'style' || entry.name.startsWith('_')) continue;

    const styleDir = path.join(COMPONENTS, entry.name, 'style');
    const partialPath = path.join(styleDir, '_index.scss');
    const directPath = path.join(styleDir, 'index.scss');

    let css;
    if (fs.existsSync(partialPath)) {
      // Sass partial: compile via @use
      const result = sass.compileString("@use 'index';", {
        loadPaths: [styleDir, COMPONENTS, NODE_MODULES],
      });
      css = await processWithPostcss(result.css);
    } else if (fs.existsSync(directPath)) {
      // Direct scss file (e.g. tabs)
      const result = sass.compile(directPath, {
        loadPaths: [COMPONENTS, NODE_MODULES],
      });
      css = await processWithPostcss(result.css);
    } else {
      continue;
    }

    for (const dir of [ES_DIR, LIB_DIR]) {
      const outDir = path.join(dir, entry.name, 'style');
      mkdirp(outDir);
      fs.writeFileSync(path.join(outDir, 'index.css'), css);
    }
    count++;
  }
  console.log(`  ${count} component CSS files compiled`);
}

// 3. Copy SCSS sources to es/ and lib/
function copyScss() {
  // Copy components/style/** to es/style/ and lib/style/
  copyDirRecursive(path.join(COMPONENTS, 'style'), path.join(ES_DIR, 'style'));
  copyDirRecursive(path.join(COMPONENTS, 'style'), path.join(LIB_DIR, 'style'));

  // Copy per-component style/*.scss to es/ and lib/
  const entries = fs.readdirSync(COMPONENTS, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'style' || entry.name.startsWith('_')) continue;

    const styleDir = path.join(COMPONENTS, entry.name, 'style');
    if (!fs.existsSync(styleDir)) continue;

    const scssFiles = fs.readdirSync(styleDir).filter((f) => f.endsWith('.scss'));
    for (const file of scssFiles) {
      for (const dir of [ES_DIR, LIB_DIR]) {
        const outDir = path.join(dir, entry.name, 'style');
        mkdirp(outDir);
        fs.copyFileSync(path.join(styleDir, file), path.join(outDir, file));
      }
    }
  }
  console.log('  SCSS sources copied to es/ and lib/');
}

function copyDirRecursive(src, dest) {
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function main() {
  console.log('Building styles...\n');
  copyBaseCss();
  await buildComponentCss();
  copyScss();
  console.log('\nStyles done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
