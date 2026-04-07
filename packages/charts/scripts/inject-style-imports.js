const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function inject(filePath, line) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes("./style/index.css") || content.includes("./style/index.js")) {
    return;
  }

  fs.writeFileSync(filePath, `${line}\n${content}`);
}

inject(path.join(ROOT, 'es', 'index.js'), "import './style/index.css';");
inject(path.join(ROOT, 'lib', 'index.js'), "require('./style/index.css');");

console.log('  style imports injected into package entry points');
