import type { Linter } from "eslint";
import { vueFiles } from "../config-helpers/+vue.js";
import { requireOf } from "../utils/module.js";
import { buildFallbackForLegacy } from "./fallback.js";
import * as base from "./ts/base-config.js";

export = requireOf(
  [
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-vue",
    "vue-eslint-parser",
  ],
  (): Linter.LegacyConfig => ({
    overrides: [
      {
        files: vueFiles,
        ...base,
        extends: [require.resolve("./+vue2"), ...base.extends],
        parser: require.resolve("vue-eslint-parser"),
        parserOptions: {
          ...base.parserOptions,
          parser: require.resolve("@typescript-eslint/parser"),
        },
      },
    ],
  }),
  (missingList) => ({
    overrides: [
      {
        files: vueFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
