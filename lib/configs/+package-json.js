"use strict";

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-node-dependencies@0.10.0"],
  () => ({
    overrides: [
      {
        files: ["package.json"],
        extends: [
          "plugin:node-dependencies/recommended",
          require.resolve("./+json"),
        ],
        rules: {
          "node-dependencies/no-restricted-deps": [
            "error",
            {
              package: "eslint-utils",
              message: "Use '@eslint-community/eslint-utils' instead.",
            },
            {
              package: "regexpp",
              message: "Use '@eslint-community/regexpp' instead.",
            },
          ],
        },
      },
    ],
  }),
  {
    files: ["package.json"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
    }),
  }
);
