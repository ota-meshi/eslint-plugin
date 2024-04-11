import type { Linter } from "eslint";
import { vueFiles } from "../config-helpers/+vue.js";
import { requireOf } from "../utils/module.js";
import { buildTS } from "./plugins/ts/index.js";
import { tsExtendRules } from "../config-helpers/plugins/ts/base-config.js";
import { anyParser } from "../parsers/any-parser.js";
import { buildFallback } from "./fallback.js";
import { buildVue3 } from "./+vue3.js";

export function buildVue3Ts() {
  return requireOf(
    ["eslint-plugin-vue", "vue-eslint-parser", "@typescript-eslint/parser"],
    (): Linter.FlatConfig[] => {
      return [
        ...buildTS(vueFiles),
        {
          files: vueFiles,
          languageOptions: {
            parserOptions: {
              parser: { ts: require("@typescript-eslint/parser") },
            },
          },
          rules: {
            ...tsExtendRules,
          },
        },
        ...buildVue3(),
      ];
    },
    (missingList) => [
      {
        files: vueFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
