"use strict";

import { Linter } from "eslint";
import { prettierOffFiles, prettierRules } from "../config-helpers/+prettier";
import { requireOf } from "../utils/module";
import { buildFallbackForLegacy } from "./fallback";

function getConfigArrayIfHasConfig(config:string) {
  try {
    const configPath = require.resolve(`eslint-config-${config}`);
    require(configPath);
  } catch (_e) {
    return [];
  }
  return [config];
}

export = requireOf(
  ["eslint-plugin-prettier", "eslint-config-prettier", "prettier"],
  (): Linter.Config => ({
    plugins: ["prettier"],
    extends: [
      "prettier",
      ...getConfigArrayIfHasConfig("prettier/@typescript-eslint"),
      ...getConfigArrayIfHasConfig("prettier/react"),
      ...getConfigArrayIfHasConfig("prettier/vue"),
    ],
    rules: {
      ...prettierRules,
    },
    overrides: [
      {
        files: prettierOffFiles,
        rules: {
          "prettier/prettier": "off",
        },
      },
    ],
  }),
  buildFallbackForLegacy,
);
