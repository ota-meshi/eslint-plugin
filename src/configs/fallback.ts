import type { Linter } from "eslint";

/**
 * Fallback Legacy config builder
 */
export function buildFallbackForLegacy(missingList: string[]): Linter.Config {
  return {
    plugins: ["@ota-meshi"],
    rules: {
      "@ota-meshi/missing-module-for-config": ["error", missingList],
    },
  };
}
