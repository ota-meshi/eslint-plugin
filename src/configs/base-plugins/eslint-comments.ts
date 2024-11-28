import type { Linter } from "eslint";
import { requireOf } from "../../utils/module.js";
import { eslintCommentsExtendRules } from "../../config-helpers/base-plugins/eslint-comments.js";
import { buildFallbackForLegacy } from "../fallback.js";

export = requireOf(
  ["@eslint-community/eslint-plugin-eslint-comments"],
  (): Linter.LegacyConfig => ({
    extends: ["plugin:@eslint-community/eslint-comments/recommended"],
    rules: {
      ...eslintCommentsExtendRules,
    },
  }),
  buildFallbackForLegacy,
);
