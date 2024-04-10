import type { Linter } from "eslint";
import { requireOf } from "../../utils/module";
import { jsonSchemaExtendRules } from "../../config-helpers/plugins/json-schema";
import { jsonFiles } from "../../config-helpers/+json";
import { buildFallbackForLegacy } from "../fallback";

export = requireOf(
  ["eslint-plugin-json-schema-validator"],
  (): Linter.Config => ({
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
