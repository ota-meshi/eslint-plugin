import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import { packageJsonFiles } from "../config-helpers/+package-json";
import { buildFallbackForLegacy } from "./fallback";

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
