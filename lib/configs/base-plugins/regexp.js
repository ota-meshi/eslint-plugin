"use strict";

module.exports = require("../../utils/module").requireOf(
  ["eslint-plugin-regexp@1.0.0"],
  () => ({
    extends: ["plugin:regexp/recommended"],
    rules: {
      "regexp/letter-case": ["error"],
      "regexp/prefer-quantifier": "error",
      "regexp/prefer-regexp-exec": "error",
      "regexp/prefer-regexp-test": "error",
      "regexp/sort-character-class-elements": ["error"],
    },
  }),
);
