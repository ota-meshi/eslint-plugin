import type { Linter } from "eslint";
import { requireOf } from "../../utils/module.js";
import { regexpExtendRules } from "../../config-helpers/base-plugins/regexp.js";
import { buildFallbackForLegacy } from "../fallback.js";

export = requireOf(
  ["eslint-plugin-regexp@1.0.0"],
  (): Linter.LegacyConfig => ({
    extends: ["plugin:regexp/recommended"],
    rules: {
      ...regexpExtendRules,
    },
  }),
  buildFallbackForLegacy,
);
