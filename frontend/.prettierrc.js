const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  singleQuote: true,
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'strict',
  jsxSingleQuote: true,
  semi: false,
};
