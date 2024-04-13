import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { jsonExtendRules, jsonFiles } from "../config-helpers/+json.js";
import { buildJsonSchema } from "./plugins/json-schema.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";

export function buildJson() {
  return requireOf(
    ["eslint-plugin-jsonc"],
    (): Linter.FlatConfig[] => {
      const eslintPluginJsonc = requireFromCwd("eslint-plugin-jsonc");
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
      ...buildFallback(missingList, {
        files: jsonFiles,
        languageOptions: {
          parser: anyParser,
        },
      }),
    ],
  );
}
