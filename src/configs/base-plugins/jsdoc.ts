import type { Linter } from "eslint";
import { requireOf } from "../../utils/module.js";
import { buildFallbackForLegacy } from "../fallback.js";
import { jsdocRules } from "../../config-helpers/base-plugins/jsdoc.js";

export = requireOf(
  ["eslint-plugin-jsdoc"],
  (): Linter.Config => ({
    plugins: ["jsdoc"],
    rules: {
      ...jsdocRules,
    },
  }),
  buildFallbackForLegacy,
);
