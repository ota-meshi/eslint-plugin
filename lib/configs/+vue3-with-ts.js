"use strict";

const base = require("./ts/base-config");
module.exports = require("../utils/module").requireOf(
  [
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
    "vue-eslint-parser",
  ],
  () => ({
    overrides: [
      {
        files: ["*.vue"],
        extends: [require.resolve("./+vue3"), ...base.extends],
        ...base,
        parser: require.resolve("vue-eslint-parser"),
        parserOptions: {
          ...base.parserOptions,
          parser: require.resolve("@typescript-eslint/parser"),
          extraFileExtensions: [".vue"],
        },
      },
    ],
  }),
  {
    files: ["*.vue"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
      parser: require.resolve("espree"),
    }),
  }
);
