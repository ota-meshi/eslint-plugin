import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import {
  eslintPluginExtendRules,
  eslintPluginFiles,
} from "../config-helpers/+eslint-plugin.js";
import { buildFallbackForLegacy } from "./fallback.js";
import semver from "semver";

export = requireOf(
  ["eslint-plugin-eslint-plugin"],
  (): Linter.LegacyConfig => {
    const version = requireFromCwd(
      "eslint-plugin-eslint-plugin/package.json",
    ).version;
    if (semver.satisfies(version, ">=7.0.0")) {
      // eslint-plugin-eslint-plugin v7+ does not support legacy config
      return {};
    }
    return {
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
    };
  },
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
