import type { Linter } from "eslint";
import { nodeExtendRules, nodeFiles } from "../config-helpers/+node";
import { requireOf } from "../utils/module";
import { buildFallbackForLegacy } from "./fallback";

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
