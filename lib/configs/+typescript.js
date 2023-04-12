"use strict";

const base = require("./ts/base-config");
module.exports = require("../utils/module").requireOf(
  [
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
  ],
  () => ({
    overrides: [
      {
        files: ["*.ts", "*.mts", "*.cts"],
        parser: require.resolve("@typescript-eslint/parser"),
        ...base,
      },
      {
        files: [
          "test/**/*.ts",
          "tests/**/*.ts",
          "test/**/*.mts",
          "tests/**/*.mts",
          "test/**/*.cts",
          "tests/**/*.cts",
        ],
        rules: {
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
    ],
  }),
  {
    files: ["*.ts", "*.mts", "*.cts"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
      parser: require.resolve("espree"),
    }),
  }
);
