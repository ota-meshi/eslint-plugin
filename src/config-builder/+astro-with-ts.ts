import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { astroFiles } from "../config-helpers/+astro.js";
import { buildTS } from "./plugins/ts/index.js";
import { tsExtendRules } from "../config-helpers/plugins/ts/index.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";
import { buildAstro } from "./+astro.js";

export function buildAstroTs() {
  return requireOf(
    [
      "eslint-plugin-astro",
      "astro-eslint-parser",
      "typescript-eslint",
      "@typescript-eslint/parser",
    ],
    (): Linter.FlatConfig[] => {
      return [
        ...buildTS(astroFiles),
        {
          files: astroFiles,
          languageOptions: {
            parserOptions: {
              parser: requireFromCwd("@typescript-eslint/parser"),
            },
          },
          rules: {
            ...tsExtendRules,
          },
        },
        ...buildAstro(),
      ];
    },
    (missingList) => [
      ...buildFallback(missingList, {
        files: astroFiles,
        languageOptions: {
          parser: anyParser,
        },
      }),
    ],
  );
}
