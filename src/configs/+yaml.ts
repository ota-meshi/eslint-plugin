import type { Linter } from "eslint";
import { yamlExtendRules, yamlFiles } from "../config-helpers/+yaml.js";
import { requireOf } from "../utils/module.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  ["eslint-plugin-yml"],
  (): Linter.LegacyConfig => ({
    overrides: [
      {
        files: yamlFiles,
        extends: [
          "plugin:yml/standard",
          require.resolve("./json-schema/config"),
        ],
        rules: {
          ...yamlExtendRules,
        },
      },
    ],
  }),
  (missingList) => ({
    overrides: [
      {
        files: yamlFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
