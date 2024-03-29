"use strict";

const { getProject } = require("./ts");
module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-vue", "vue-eslint-parser"],
  () => ({
    extends: ["plugin:vue/vue3-recommended"],
    overrides: [
      {
        files: ["*.vue"],
        parser: require.resolve("vue-eslint-parser"),
        parserOptions: {
          parser: {
            ts: "@typescript-eslint/parser",
          },
          sourceType: "module",
          project: getProject(),
          extraFileExtensions: [".vue", ".svelte"],
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
  },
);
