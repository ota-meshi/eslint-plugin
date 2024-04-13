import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import {
  nodeExtendRules,
  nodeFiles,
  nodeSettings,
} from "../config-helpers/+node.js";

export function buildNode() {
  return requireOf(
    ["eslint-plugin-n@17.2.0"],
    (): Linter.FlatConfig[] => {
      const nodePlugin = requireFromCwd("eslint-plugin-n");
      return [
        ...nodePlugin.configs["flat/mixed-esm-and-cjs"],
        {
          files: nodeFiles,
          rules: {
            ...nodeExtendRules,
          },
        },
        {
          settings: {
            ...nodeSettings,
          },
        },
      ];
    },
    (missingList) => buildFallback(missingList, { files: nodeFiles }),
  );
}
