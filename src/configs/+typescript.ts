import type { Linter } from "eslint";
import {
  tsFiles,
  tsTestExtendRules,
  tsTestFiles,
} from "../config-helpers/+typescript.js";
import { requireOf } from "../utils/module.js";
import * as base from "./ts/base-config.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  [
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
  ],
  (): Linter.Config => ({
    overrides: [
      {
        files: tsFiles,
        parser: require.resolve("@typescript-eslint/parser"),
        ...base,
      },
      {
        files: tsTestFiles,
        rules: {
          ...tsTestExtendRules,
        },
      },
    ],
  }),
  (missingList) => ({
    overrides: [
      {
        files: tsFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
