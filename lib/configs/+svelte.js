"use strict";

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-svelte@2.9.0"],
  () => ({
    overrides: [
      {
        files: ["*.svelte"],
        extends: ["plugin:svelte/recommended"],
        parserOptions: {
          parser: {
            ts: require.resolve("@typescript-eslint/parser"),
          },
        },
        rules: {
          "svelte/no-store-async": "error",
          "svelte/no-reactive-functions": "error",
          "svelte/no-reactive-literals": "error",
          "svelte/no-useless-mustaches": "error",
          "svelte/require-optimized-style-attribute": "error",
          "svelte/require-stores-init": "error",
          "svelte/derived-has-same-inputs-outputs": "error",
          "svelte/prefer-class-directive": "warn",
          "svelte/prefer-style-directive": "warn",
          "svelte/spaced-html-comment": "warn",
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
