"use strict";

const base = require("./ts/base-config");
module.exports = require("../utils/module").requireOf(
  [
    "eslint-plugin-svelte@2.9.0",
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
  ],
  () => ({
    overrides: [
      {
        files: ["*.svelte"],
        extends: [require.resolve("./+svelte"), ...base.extends],
        ...base,
        parserOptions: {
          ...base.parserOptions,
          parser: require.resolve("@typescript-eslint/parser"),
          extraFileExtensions: [".svelte"],
        },
      },
    ],
  }),
  {
    files: ["*.svelte"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
    }),
  }
);
