import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import { jsonExtendRules, jsonFiles } from "../config-helpers/+json";
import { buildJsonSchema } from "./plugins/json-schema";
import { buildFallback } from "./fallback";
import * as anyParser from "../parsers/any-parser";

export function buildJson() {
  return requireOf(
    ["eslint-plugin-jsonc"],
    (): Linter.FlatConfig[] => {
      const eslintPluginJsonc = require("eslint-plugin-jsonc");
      return [
        ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
        {
          files: jsonFiles,
          rules: {
            ...jsonExtendRules,
          },
        },
        ...buildJsonSchema(jsonFiles),
      ];
    },
    (missingList) => [
      {
        files: jsonFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
