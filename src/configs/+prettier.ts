import type { Linter } from "eslint";
import {
  prettierExtendRules,
  prettierOffFiles,
} from "../config-helpers/+prettier.js";
import { requireOf } from "../utils/module.js";
import { buildFallbackForLegacy } from "./fallback.js";

function getConfigArrayIfHasConfig(config: string) {
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
      ...prettierExtendRules,
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
