import type { Linter } from "eslint";

export const vueFiles = [`*.vue`].flatMap((p) => [p, `**/${p}`]);
export const vueExtendRules: Linter.RulesRecord = {};
