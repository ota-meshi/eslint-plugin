"use strict";

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-markdown"],
  () => ({
    extends: ["plugin:markdown/recommended"],
    rules: {},
    overrides: [
      {
        files: ["**/*.md/*.js"],
        rules: {
          strict: "off",
        },
      },
    ],
  }),
  {
    files: ["*.md"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
    }),
  }
);
