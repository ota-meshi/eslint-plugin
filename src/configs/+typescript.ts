import type { Linter } from "eslint";
import {
  tsFiles,
  tsTestExtendRules,
  tsTestFiles,
} from "../config-helpers/+typescript.js";
import { requireOf } from "../utils/module.js";
import * as base from "./ts/base-config.js";
import { buildFallbackForLegacy } from "./fallback.js";
import { extInMdFiles } from "../config-helpers/+md.js";

export = requireOf(
  [
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
  ],
  (): Linter.LegacyConfig => ({
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
      {
        files: extInMdFiles,
        extends: ["plugin:@typescript-eslint/disable-type-checked"],
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
