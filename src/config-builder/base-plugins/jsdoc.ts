import type { Linter } from "eslint";
import { requireOf } from "../../utils/module.js";
import { buildFallback } from "../fallback.js";
import { jsdocRules } from "../../config-helpers/base-plugins/jsdoc.js";

export function buildJsdoc() {
  return requireOf(
    ["eslint-plugin-jsdoc"],
    (): Linter.FlatConfig[] => {
      const jsdoc = require("eslint-plugin-jsdoc");
      return [
        {
          plugins: { jsdoc },
          rules: {
            ...jsdocRules,
          },
        },
      ];
    },
    buildFallback,
  );
}
