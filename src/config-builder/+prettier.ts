"use strict";

import { Linter } from "eslint";
import { requireOf } from "../utils/module";
import { prettierOffFiles, prettierRules } from "../config-helpers/+prettier";
import { buildFallback } from "./fallback";

export function buildPrettier() {
  return requireOf(
    ["eslint-plugin-prettier", "eslint-config-prettier", "prettier"],
    (): Linter.FlatConfig[] => {
      const eslintConfigPrettier = require("eslint-config-prettier");
      return [
        ...eslintConfigPrettier,
        {
          rules: {
            ...prettierRules,
          },
        },
        {
          files: prettierOffFiles,
          rules: {
            "prettier/prettier": "off",
          },
        },
      ];
    },
    buildFallback,
  );
}
