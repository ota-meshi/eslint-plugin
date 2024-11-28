import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { svelteFiles } from "../config-helpers/+svelte.js";
import { buildTS } from "./plugins/ts/index.js";
import { tsExtendRules } from "../config-helpers/plugins/ts/index.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";
import { buildSvelte } from "./+svelte.js";

export function buildSvelteTs() {
  return requireOf(
    [
      "eslint-plugin-svelte",
      "svelte-eslint-parser",
      "typescript-eslint",
      "@typescript-eslint/parser",
    ],
    (): Linter.Config[] => {
      return [
        ...buildTS(svelteFiles),
        {
          files: svelteFiles,
          languageOptions: {
            parserOptions: {
              parser: requireFromCwd("@typescript-eslint/parser"),
            },
          },
          rules: {
            ...tsExtendRules,
          },
        },
        ...buildSvelte(),
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
