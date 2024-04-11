import type { Linter } from "eslint";
import { yamlExtendRules, yamlFiles } from "../config-helpers/+yaml.js";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { buildJsonSchema } from "./plugins/json-schema.js";
import { anyParser } from "../parsers/any-parser.js";
import { buildFallback } from "./fallback.js";

export function buildYaml() {
  return requireOf(
    ["eslint-plugin-yml"],
    (): Linter.FlatConfig[] => {
      const eslintPluginYml = requireFromCwd("eslint-plugin-yml");
      return [
        ...eslintPluginYml.configs["flat/standard"],
        ...buildJsonSchema(yamlFiles),
        {
          files: yamlFiles,
          rules: {
            ...yamlExtendRules,
          },
        },
      ];
    },
    (missingList) => [
      {
        files: yamlFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
