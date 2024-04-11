import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { tomlExtendRules, tomlFiles } from "../config-helpers/+toml.js";
import { buildJsonSchema } from "./plugins/json-schema.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";

export function buildToml() {
  return requireOf(
    ["eslint-plugin-toml"],
    (): Linter.FlatConfig[] => {
      const eslintPluginToml = requireFromCwd("eslint-plugin-toml");
      return [
        ...eslintPluginToml.configs["flat/standard"],
        ...buildJsonSchema(tomlFiles),
        {
          files: tomlFiles,
          rules: {
            ...tomlExtendRules,
          },
        },
      ];
    },
    (missingList) => [
      {
        files: tomlFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
