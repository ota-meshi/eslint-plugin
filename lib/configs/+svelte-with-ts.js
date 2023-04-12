"use strict";

const base = require("./ts/base-config");
module.exports = require("../utils/module").requireOf(
  [
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
    "svelte-eslint-parser",
  ],
  () => ({
    overrides: [
      {
        files: ["*.svelte"],
        extends: [require.resolve("./+svelte"), ...base.extends],
        ...base,
        parser: require.resolve("svelte-eslint-parser"),
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
      parser: require.resolve("espree"),
    }),
  }
);
