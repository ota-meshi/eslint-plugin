import type { Linter } from "eslint";
import {
  nodeExtendRules,
  nodeFiles,
  nodeSettings,
} from "../config-helpers/+node.js";
import { requireOf } from "../utils/module.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  ["eslint-plugin-n"],
  (): Linter.Config => ({
    extends: ["plugin:n/recommended"],
    overrides: [
      {
        files: nodeFiles,
        rules: {
          ...nodeExtendRules,
        },
      },
    ],
    settings: {
      ...nodeSettings,
    },
  }),
  (missingList) => {
    return {
      overrides: [
        {
          files: nodeFiles,
          ...buildFallbackForLegacy(missingList),
        },
      ],
    };
  },
);
