import type { Linter } from "eslint";

export const astroFiles = [`*.astro`].flatMap((p) => [p, `**/${p}`]);
export const astroExtendRules: Linter.RulesRecord = {};
