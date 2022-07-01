"use strict";

module.exports = require("../../utils/module").requireOf(
  ["eslint-plugin-eslint-comments@3.2.0"],
  () => ({
    extends: ["plugin:eslint-comments/recommended"],
    rules: {
      "eslint-comments/require-description": "error",
      "eslint-comments/no-unused-disable": "error",
    },
  })
);
