const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_STYLE_DIR = path.join(ROOT, 'src', 'style');
const ES_STYLE_DIR = path.join(ROOT, 'es', 'style');
const LIB_STYLE_DIR = path.join(ROOT, 'lib', 'style');

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function write(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function copy(fileName, targetDir) {
  const sourcePath = path.join(SRC_STYLE_DIR, fileName);
  const targetPath = path.join(targetDir, fileName);
  mkdirp(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function buildCssBundle() {
  const baseCssPath = require.resolve('@tiny-design/tokens/dist/css/base.css');
  const baseCss = read(baseCssPath).trim();
  const chartCss = read(path.join(SRC_STYLE_DIR, 'index.css')).trim();
  return `${baseCss}\n\n${chartCss}\n`;
}

function writeStyleEntries(targetDir, format) {
  const indexJs =
    format === 'esm'
      ? "import './index.css';\n"
      : "require('./index.css');\n";

  write(path.join(targetDir, 'index.js'), indexJs);
}

function main() {
  const bundledCss = buildCssBundle();

  for (const dir of [ES_STYLE_DIR, LIB_STYLE_DIR]) {
    mkdirp(dir);
    write(path.join(dir, 'index.css'), bundledCss);
    copy('index.scss', dir);
  }

  writeStyleEntries(ES_STYLE_DIR, 'esm');
  writeStyleEntries(LIB_STYLE_DIR, 'cjs');

  console.log('  styles written to es/style and lib/style');
}

main();
