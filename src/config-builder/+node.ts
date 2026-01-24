import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import {
  nodeExtendRules,
  getNodeFiles,
  nodeSettings,
} from "../config-helpers/+node.js";

export function buildNode(withTs: boolean | undefined) {
  const nodeFiles = getNodeFiles(withTs);
  return requireOf(
    ["eslint-plugin-n@17.2.0"],
    (): Linter.Config[] => {
      const nodePlugin = requireFromCwd("eslint-plugin-n");
      return [
        ...nodePlugin.configs["flat/mixed-esm-and-cjs"].map(
          (config: Linter.Config) => {
            // Adjust the config to only apply to our specified files
            return {
              ...config,
              files: config.files
                ? withTs
                  ? config.files.flat().flatMap((f) => {
                      if (f.endsWith("*.js")) {
                        return [f, f.replace("*.js", "*.ts")];
                      }
                      if (f.endsWith("*.cjs")) {
                        return [f, f.replace("*.cjs", "*.cts")];
                      }
                      if (f.endsWith("*.mjs")) {
                        return [f, f.replace("*.mjs", "*.mts")];
                      }
                      return f;
                    })
                  : config.files
                : nodeFiles,
            };
          },
        ),
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
