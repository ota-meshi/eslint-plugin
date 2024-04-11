import type { Linter } from "eslint";
import { vueFiles } from "../config-helpers/+vue.js";
import { requireOf } from "../utils/module.js";
import { buildVue2 } from "./+vue2.js";
import { buildTS } from "./plugins/ts/index.js";
import { tsExtendRules } from "../config-helpers/plugins/ts/base-config.js";
import { anyParser } from "../parsers/any-parser.js";
import { buildFallback } from "./fallback.js";

export function buildVue2Ts() {
  return requireOf(
    ["eslint-plugin-vue", "vue-eslint-parser", "@typescript-eslint/parser"],
    (): Linter.FlatConfig[] => {
      return [
        ...buildTS(vueFiles),
        {
          files: vueFiles,
          languageOptions: {
            parserOptions: {
              parser: require("@typescript-eslint/parser"),
            },
          },
          rules: {
            ...tsExtendRules,
          },
        },
        ...buildVue2(),
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
