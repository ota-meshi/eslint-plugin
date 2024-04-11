import type { Linter } from "eslint";
import { buildRecommended } from "./recommended.js";
import { buildESLintPlugin } from "./+eslint-plugin.js";
import { buildNode } from "./+node.js";
import { buildJson } from "./+json.js";
import { buildMd } from "./+md.js";
import { buildPackageJson } from "./+package-json.js";
import { buildPrettier } from "./+prettier.js";
import { buildSvelte } from "./+svelte.js";
import { buildSvelteTs } from "./+svelte-with-ts.js";
import { buildToml } from "./+toml.js";
import { buildTs } from "./+typescript.js";
import { buildYaml } from "./+yaml.js";
import { buildVue3 } from "./+vue3.js";
import { buildVue3Ts } from "./+vue3-with-ts.js";
import { buildVue2 } from "./+vue2.js";
import { buildVue2Ts } from "./+vue2-with-ts.js";
import { buildAstro } from "./+astro.js";
import { buildAstroTs } from "./+astro-with-ts.js";

export type BuildConfigOptions = {
  node?: boolean;
  prettier?: boolean;
  packageJson?: boolean;

  // kind of package
  eslintPlugin?: boolean;

  // languages
  vue3?: boolean;
  vue2?: boolean;
  svelte?: boolean;
  astro?: boolean;
  ts?: boolean;
  json?: boolean;
  yaml?: boolean;
  toml?: boolean;
  md?: boolean;
};

/**
 * Build config
 */
export function buildConfig(options: BuildConfigOptions): Linter.FlatConfig[] {
  return [
    ...buildRecommended(),
    ...(options?.node ? buildNode() : []),
    ...(options?.prettier ? buildPrettier() : []),
    ...(options?.packageJson ? buildPackageJson() : []),

    ...(options?.eslintPlugin ? buildESLintPlugin() : []),

    ...(options?.vue3 ? buildVue3() : []),
    ...(options?.vue3 && options?.ts ? buildVue3Ts() : []),
    ...(options?.vue2 ? buildVue2() : []),
    ...(options?.vue2 && options?.ts ? buildVue2Ts() : []),
    ...(options?.svelte ? buildSvelte() : []),
    ...(options?.svelte && options?.ts ? buildSvelteTs() : []),
    ...(options?.astro ? buildAstro() : []),
    ...(options?.astro && options?.ts ? buildAstroTs() : []),

    ...(options?.ts ? buildTs() : []),
    ...(options?.json ? buildJson() : []),
    ...(options?.yaml ? buildYaml() : []),
    ...(options?.toml ? buildToml() : []),
    ...(options?.md ? buildMd() : []),
  ];
}
