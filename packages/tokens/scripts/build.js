const fs = require('fs');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const { buildRuntimeTokens } = require('../build/build-v2');

const ROOT = path.resolve(__dirname, '..');
const SCSS_DIR = path.join(ROOT, 'scss');
const CSS_DIR = path.join(ROOT, 'css');

async function buildBaseCss() {
  console.log('Building base CSS...\n');

  // Compile scss/base.scss → css/base.css
  const result = sass.compile(path.join(SCSS_DIR, 'base.scss'), {
    loadPaths: [SCSS_DIR],
  });

  const processed = await postcss([autoprefixer]).process(result.css, { from: undefined });

  fs.mkdirSync(CSS_DIR, { recursive: true });
  fs.writeFileSync(path.join(CSS_DIR, 'base.css'), processed.css);

  console.log('  css/base.css');
  console.log('\nBase CSS done.');
}

async function build() {
  console.log('Building tokens package...\n');
  await buildBaseCss();
  buildRuntimeTokens();
  console.log('\nTokens package done.');
}

module.exports = { buildBaseCss, build };

if (require.main === module) {
  build().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
