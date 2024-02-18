const path = require("path");

const buildEslintCommand = (filenames) =>
  `npx lint --fix --report-unused-disable-directives --max-warnings ${filenames.join(" ")}`;

module.exports = {
  "*.{cjs,js,jsx,ts,tsx}": [buildEslintCommand],
};
