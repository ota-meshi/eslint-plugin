import type { Linter } from "eslint";
import { requireOf } from "../../../utils/module.js";
import {
  tsExtendRules,
  tsParserOptions,
} from "../../../config-helpers/plugins/ts/index.js";
import { buildFallback } from "../../fallback.js";
import { anyParser } from "../../../parsers/any-parser.js";

export function buildTS(files: string[]) {
  return requireOf(
    [
      "typescript",
      "typescript-eslint",
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
    ],
    (): Linter.FlatConfig[] => {
      const tseslint = require("typescript-eslint");
      return [
        ...tseslint.config({
          files,
          extends: [
            ...tseslint.configs.recommended,
            {
              languageOptions: {
                parserOptions: {
                  ...tsParserOptions,
                },
              },
            },
          ],
          rules: {
            ...tsExtendRules,
          },
        }),
      ];
    },
    (missingList) => [
      {
        files,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
