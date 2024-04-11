import { astroExtendRules, astroFiles } from "../config-helpers/+astro.js";
import { requireOf } from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";
import type { Linter } from "eslint";

export function buildAstro() {
  return requireOf(
    ["eslint-plugin-astro"],
    (): Linter.FlatConfig[] => {
      const eslintPluginAstro = require("eslint-plugin-astro");
      return [
        ...eslintPluginAstro.configs["flat/recommended"],
        {
          files: astroFiles,
          rules: {
            ...astroExtendRules,
          },
        },
      ];
    },
    (missingList) => [
      {
        files: astroFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
