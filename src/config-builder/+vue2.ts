import type { Linter } from "eslint";
import { vueExtendRules, vueFiles } from "../config-helpers/+vue.js";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";

export function buildVue2() {
  return requireOf(
    ["eslint-plugin-vue", "vue-eslint-parser"],
    (): Linter.FlatConfig[] => {
      const eslintPluginVue = requireFromCwd("eslint-plugin-vue");
      return [
        ...eslintPluginVue.configs["flat/vue2-recommended"],
        {
          files: vueFiles,
          rules: {
            ...vueExtendRules,
          },
        },
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
