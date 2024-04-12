import type { Linter } from "eslint";
import { tomlExtendRules, tomlFiles } from "../config-helpers/+toml.js";
import { requireOf } from "../utils/module.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  ["eslint-plugin-toml"],
  (): Linter.Config => ({
    extends: ["plugin:toml/standard"],
    overrides: [
      {
        files: tomlFiles,
        extends: [require.resolve("./json-schema/config")],
        rules: {
          ...tomlExtendRules,
        },
      },
    ],
  }),
  (missingList) => ({
    overrides: [
      {
        files: tomlFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
