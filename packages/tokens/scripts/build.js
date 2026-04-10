const fs = require('fs');
const path = require('path');
const { buildRuntimeTokens } = require('./build-runtime');

const ROOT = path.resolve(__dirname, '..');
const CSS_DIR = path.join(ROOT, 'css');
const V2_BASE_CSS_PATH = path.join(ROOT, 'dist', 'css', 'base.css');

async function buildBaseCss() {
  console.log('Building base CSS...\n');

  buildRuntimeTokens();

  fs.mkdirSync(CSS_DIR, { recursive: true });
  fs.copyFileSync(V2_BASE_CSS_PATH, path.join(CSS_DIR, 'base.css'));

  console.log('  css/base.css (copied from dist/css/base.css)');
  console.log('\nBase CSS done.');
}

async function build() {
  console.log('Building tokens package...\n');
  await buildBaseCss();
  console.log('\nTokens package done.');
}

module.exports = { buildBaseCss, build };

if (require.main === module) {
  build().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
