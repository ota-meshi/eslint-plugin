import type { Linter } from "eslint";
import { buildRecommended } from "./recommended";
import { buildESLintPlugin } from "./+eslint-plugin";
import { buildNode } from "./+node";
import { buildJson } from "./+json";

export type BuildConfigOptions = {
  eslintPlugin?: boolean;
  json?: boolean;
  node?: boolean;
};

/**
 * Build config
 */
export function buildConfig(options: BuildConfigOptions): Linter.FlatConfig[] {
  return [
    ...buildRecommended(),
    ...(options?.node ? buildNode() : []),
    ...(options?.eslintPlugin ? buildESLintPlugin() : []),
    ...(options?.json ? buildJson() : []),
  ];
}
