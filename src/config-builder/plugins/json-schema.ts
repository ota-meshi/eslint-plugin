import type { Linter } from "eslint";
import { requireOf } from "../../utils/module";
import { jsonSchemaExtendRules } from "../../config-helpers/plugins/json-schema";
import { jsonFiles } from "../../config-helpers/+json";
import { buildFallback } from "../fallback";

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
        files: jsonFiles,
        languageOptions: {
          parser: require("../../parsers/any-parser"),
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
