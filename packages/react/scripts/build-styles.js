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

// 1. Base CSS: copy the runtime theme bundle from @tiny-design/tokens.
//    Also copies the per-tier (foundation/semantic) and per-component slice files
//    plus the slice manifest so inject-style-imports.js can wire components to slices.
function copyBaseCss() {
  const baseSrc = require.resolve('@tiny-design/tokens/dist/css/base.css');
  const tokensCssDir = path.dirname(baseSrc);
  const foundationSrc = path.join(tokensCssDir, 'foundation.css');
  const semanticSrc = path.join(tokensCssDir, 'semantic.css');
  const componentsSrcDir = path.join(tokensCssDir, 'components');
  const manifestSrc = path.join(tokensCssDir, 'component-deps.json');

  for (const dir of [ES_DIR, LIB_DIR]) {
    const outDir = path.join(dir, 'style');
    const componentsOutDir = path.join(outDir, 'components');
    mkdirp(outDir);
    mkdirp(componentsOutDir);
    fs.copyFileSync(baseSrc, path.join(outDir, 'base.css'));
    fs.copyFileSync(foundationSrc, path.join(outDir, 'foundation.css'));
    fs.copyFileSync(semanticSrc, path.join(outDir, 'semantic.css'));
    fs.copyFileSync(manifestSrc, path.join(outDir, 'component-deps.json'));

    for (const file of fs.readdirSync(componentsSrcDir)) {
      if (!file.endsWith('.css')) continue;
      fs.copyFileSync(path.join(componentsSrcDir, file), path.join(componentsOutDir, file));
    }
  }
  const sliceCount = fs.readdirSync(componentsSrcDir).filter((f) => f.endsWith('.css')).length;
  console.log(
    `  es/style/{base,foundation,semantic}.css + lib/style/{base,foundation,semantic}.css copied`
  );
  console.log(`  es/style/components/*.css + lib/style/components/*.css (${sliceCount} slices)`);
}

// 2. Per-component CSS: compile each component's style/index.scss entry
async function buildComponentCss() {
  const entries = fs.readdirSync(COMPONENTS, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'style' || entry.name.startsWith('_')) continue;

    const styleDir = path.join(COMPONENTS, entry.name, 'style');
    const directPath = path.join(styleDir, 'index.scss');

    if (!fs.existsSync(directPath)) {
      continue;
    }

    const result = sass.compile(directPath, {
      loadPaths: [COMPONENTS, NODE_MODULES],
    });
    const css = await processWithPostcss(result.css);

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
