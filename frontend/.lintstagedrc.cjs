const path = require("path");

const buildEslintCommand = (filenames) =>
  `npx eslint --fix --report-unused-disable-directives ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;

module.exports = {
  "*.{cjs,js,jsx,ts,tsx}": [buildEslintCommand],
};
