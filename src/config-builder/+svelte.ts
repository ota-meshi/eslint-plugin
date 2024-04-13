import { svelteExtendRules, svelteFiles } from "../config-helpers/+svelte.js";
import { has, requireFromCwd, requireOf } from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";
import type { Linter } from "eslint";

export function buildSvelte() {
  return requireOf(
    ["eslint-plugin-svelte@2.9.0"],
    (): Linter.FlatConfig[] => {
      const eslintPluginSvelte = requireFromCwd("eslint-plugin-svelte");
      return [
        ...eslintPluginSvelte.configs["flat/recommended"],
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
