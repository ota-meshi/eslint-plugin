import { svelteExtendRules, svelteFiles } from "../config-helpers/+svelte.js";
import { requireOf } from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";
import type { Linter } from "eslint";

export function buildSvelte() {
  return requireOf(
    ["eslint-plugin-svelte@2.9.0"],
    (): Linter.FlatConfig[] => {
      const eslintPluginSvelte = require("eslint-plugin-svelte");
      return [
        ...eslintPluginSvelte.configs["flat/recommended"],
        {
          files: svelteFiles,
          rules: {
            ...svelteExtendRules,
          },
        },
      ];
    },
    (missingList) => [
      {
        files: svelteFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
