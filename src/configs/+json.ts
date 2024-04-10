import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import { jsonExtendRules, jsonFiles } from "../config-helpers/+json";
import { buildFallbackForLegacy } from "./fallback";

export = requireOf(
  ["eslint-plugin-jsonc"],
  (): Linter.Config => ({
    overrides: [
      {
        files: jsonFiles,
        extends: [
          "plugin:jsonc/recommended-with-jsonc",
          require.resolve("./json-schema/config"),
        ],
        rules: {
          ...jsonExtendRules,
        },
      },
    ],
  }),
  (missingList) => ({
    overrides: [
      {
        files: jsonFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
