import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../../utils/module.js";
import { jsonSchemaExtendRules } from "../../config-helpers/plugins/json-schema.js";
import { buildFallback } from "../fallback.js";
import { anyParser } from "../../parsers/any-parser.js";

export function buildJsonSchema(files: string[]) {
  return requireOf(
    ["eslint-plugin-json-schema-validator@5.0.0"],
    (): Linter.FlatConfig[] => {
      const eslintPluginJsonSchemaValidator = requireFromCwd(
        "eslint-plugin-json-schema-validator",
      );
      return [
        ...eslintPluginJsonSchemaValidator.configs["flat/recommended"].map(
          (config: Linter.FlatConfig) => {
            if (config.files == null) {
              return { ...config, files };
            }
            if (
              config.files
                .flat()
                .some((file) => files.some((suffix) => file.endsWith(suffix)))
            ) {
              return config;
            }
            return { files };
          },
        ),
        {
          files,
          rules: {
            ...jsonSchemaExtendRules,
          },
        },
      ];
    },
    (missingList) => [
      ...buildFallback(missingList, {
        files,
        languageOptions: {
          parser: anyParser,
        },
      }),
    ],
  );
}
