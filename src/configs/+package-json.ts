import type { Linter } from "eslint";
import { requireOf } from "../utils/module.js";
import { packageJsonFiles } from "../config-helpers/+package-json.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  ["eslint-plugin-node-dependencies"],
  (): Linter.Config => ({
    overrides: [
      {
        files: packageJsonFiles,
        extends: [
          "plugin:node-dependencies/recommended",
          require.resolve("./+json"),
        ],
      },
    ],
  }),
  (missingList) => ({
    overrides: [
      {
        files: packageJsonFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
