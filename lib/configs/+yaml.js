"use strict";

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-yml"],
  () => ({
    overrides: [
      {
        files: ["*.yaml", "*.yml"],
        extends: [
          "plugin:yml/standard",
          require.resolve("./json-schema/config"),
        ],
        rules: {
          "yml/require-string-key": "error",
        },
      },
    ],
  }),
  {
    files: ["*.yaml", "*.yml"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
      parser: require.resolve("espree"),
    }),
  }
);
