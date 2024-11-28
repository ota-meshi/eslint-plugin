import { svelteExtendRules, svelteFiles } from "../config-helpers/+svelte.js";
import {
  has,
  importFromCwd,
  requireFromCwd,
  requireOf,
} from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";
import type { Linter } from "eslint";
import { flattenConfig } from "./flatten.js";

export function buildSvelte() {
  return requireOf(
    ["eslint-plugin-svelte@2.9.0"],
    (): Linter.Config[] => {
      const svelteRecommended = importFromCwd("eslint-plugin-svelte").then(
        (eslintPluginSvelte) => eslintPluginSvelte.configs["flat/recommended"],
      );

      return [
        ...flattenConfig(svelteRecommended),
        {
          files: svelteFiles,
          rules: {
            ...svelteExtendRules,
          },
          ...(has("@typescript-eslint/parser")
            ? {
                languageOptions: {
                  parserOptions: {
                    parser: { ts: requireFromCwd("@typescript-eslint/parser") },
                  },
                },
              }
            : {}),
        },
      ];
    },
    (missingList) => [
      ...buildFallback(missingList, {
        files: svelteFiles,
        languageOptions: {
          parser: anyParser,
        },
      }),
    ],
  );
}
