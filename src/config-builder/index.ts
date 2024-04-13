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
  packageJson?: boolean;

  // kind of package
  eslintPlugin?: boolean;

  // languages
  vue3?: boolean | { withTs?: boolean };
  vue2?: boolean | { withTs?: boolean };
  svelte?: boolean | { withTs?: boolean };
  astro?: boolean | { withTs?: boolean };
  ts?: boolean;
  json?: boolean;
  yaml?: boolean;
  toml?: boolean;
  md?: boolean;

  // format
  prettier?: boolean;
};

/**
 * Build config
 */
export function buildConfig(options: BuildConfigOptions): Linter.FlatConfig[] {
  const configs: Linter.FlatConfig[] = [
    ...buildRecommended(),
    ...(options?.node ? buildNode() : []),
    ...(options?.packageJson ? buildPackageJson() : []),

    // Kind of package
    ...(options?.eslintPlugin ? buildESLintPlugin() : []),
  ];

  // Frameworks
  applyFw(options.vue3, buildVue3, buildVue3Ts);
  applyFw(options.vue2, buildVue2, buildVue2Ts);
  applyFw(options.svelte, buildSvelte, buildSvelteTs);
  applyFw(options.astro, buildAstro, buildAstroTs);

  configs.push(
    // Languages
    ...(options?.ts ? buildTs() : []),
    ...(options?.json ? buildJson() : []),
    ...(options?.yaml ? buildYaml() : []),
    ...(options?.toml ? buildToml() : []),
    ...(options?.md ? buildMd() : []),

    // Format
    ...(options?.prettier ? buildPrettier() : []),
  );

  return configs;

  function applyFw(
    option: undefined | boolean | { withTs?: boolean },
    builder: () => Linter.FlatConfig[],
    tsBuilder: () => Linter.FlatConfig[],
  ) {
    configs.push(...builder());
    const ts =
      (typeof option === "object" ? option.withTs : null) ?? options?.ts;
    if (ts) {
      configs.push(...tsBuilder());
    }
  }
}
