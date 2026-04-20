'use strict';

const runtime = require('./theme-runtime.cjs');

module.exports = {
  resolveTheme: runtime.resolveTheme,
  tokenKeyToCssVar: runtime.tokenKeyToCssVar,
  getThemeStylesheet: runtime.getThemeStylesheet,
};
