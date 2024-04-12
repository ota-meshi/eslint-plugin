import type { Linter } from "eslint";

export const tomlFiles = [`*.toml`].flatMap((p) => [p, `**/${p}`]);
export const tomlExtendRules: Linter.RulesRecord = {};
