"use strict";

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-jsonc"],
  () => ({
    overrides: [
      {
        files: ["*.json", "*.json5"],
        extends: [
          "plugin:jsonc/recommended-with-jsonc",
          require.resolve("./json-schema/config"),
        ],
        rules: {
          "jsonc/auto": "error",
        },
      },
    ],
  }),
  {
    files: ["*.json", "*.json5"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
      parser: "espree",
    }),
  }
);
