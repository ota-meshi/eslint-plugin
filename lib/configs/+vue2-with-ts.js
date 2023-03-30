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
        files: ["*.vue"],
        extends: [require.resolve("./+vue2"), ...base.extends],
        ...base,
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
    }),
  }
);
