import type { Linter } from "eslint";
import { vueExtendRules, vueFiles } from "../config-helpers/+vue.js";
import { requireOf } from "../utils/module.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  ["eslint-plugin-vue", "vue-eslint-parser"],
  (): Linter.LegacyConfig => ({
    extends: ["plugin:vue/vue3-recommended"],
    overrides: [
      {
        files: vueFiles,
        parser: require.resolve("vue-eslint-parser"),
        parserOptions: {
          parser: {
            ts: "@typescript-eslint/parser",
          },
        },
        rules: {
          ...vueExtendRules,
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
