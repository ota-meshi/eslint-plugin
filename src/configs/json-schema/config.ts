import type { Linter } from "eslint";
import { requireOf } from "../../utils/module.js";
import { jsonSchemaExtendRules } from "../../config-helpers/plugins/json-schema.js";
import { jsonFiles } from "../../config-helpers/+json.js";
import { buildFallbackForLegacy } from "../fallback.js";

export = requireOf(
  ["eslint-plugin-json-schema-validator"],
  (): Linter.LegacyConfig => ({
    extends: ["plugin:json-schema-validator/recommended"],
    rules: {
      ...jsonSchemaExtendRules,
    },
  }),
  (missingList) => ({
    overrides: [
      {
        files: jsonFiles,
        parser: require.resolve("../../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
