import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import {
  eslintPluginExtendRules,
  eslintPluginFiles,
} from "../config-helpers/+eslint-plugin";
import { buildFallbackForLegacy } from "./fallback";

export = requireOf(
  ["eslint-plugin-eslint-plugin"],
  (): Linter.Config => ({
    plugins: ["eslint-plugin"],
    overrides: [
      {
        files: eslintPluginFiles,
        extends: [
          require.resolve("./+node"),
          "plugin:eslint-plugin/recommended",
        ],
        rules: {
          ...eslintPluginExtendRules,
        },
      },
    ],
  }),
  (missingList) => {
    return {
      overrides: [
        {
          files: eslintPluginFiles,
          ...buildFallbackForLegacy(missingList),
        },
      ],
    };
  },
);
