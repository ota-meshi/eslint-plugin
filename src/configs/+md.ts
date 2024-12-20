import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import semver from "semver";
import { jsInMdFiles, jsInMdRules, mdFiles } from "../config-helpers/+md.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  ["eslint-plugin-markdown"],
  (): Linter.LegacyConfig => {
    const version = requireFromCwd(
      "eslint-plugin-markdown/package.json",
    ).version;
    return {
      extends: [
        semver.satisfies(version, ">=4.0.0")
          ? "plugin:markdown/recommended-legacy"
          : "plugin:markdown/recommended",
      ],
      overrides: [
        {
          files: jsInMdFiles,
          rules: {
            ...jsInMdRules,
          },
        },
      ],
    };
  },
  (missingList) => ({
    overrides: [
      {
        files: mdFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
