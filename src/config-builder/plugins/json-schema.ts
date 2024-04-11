import type { Linter } from "eslint";
import { requireOf } from "../../utils/module.js";
import { jsonSchemaExtendRules } from "../../config-helpers/plugins/json-schema.js";
import { buildFallback } from "../fallback.js";
import { anyParser } from "../../parsers/any-parser.js";

export function buildJsonSchema(files: string[]) {
  return requireOf(
    ["eslint-plugin-json-schema-validator@5.0.0"],
    (): Linter.FlatConfig[] => {
      const eslintPluginJsonSchemaValidator = require("eslint-plugin-json-schema-validator");
      return [
        {
          ...eslintPluginJsonSchemaValidator.configs["flat/recommended"].map(
            (config: Linter.FlatConfig) => ({ ...config, files }),
          ),
        },
        {
          files,
          rules: {
            ...jsonSchemaExtendRules,
          },
        },
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
