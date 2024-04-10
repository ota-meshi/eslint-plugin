import type { Linter } from "eslint";

/**
 * Fallback Legacy config builder
 */
export function buildFallback(
  missingList: string[],
  files?: string[],
): Linter.FlatConfig[] {
  return [
    {
      plugins: {
        get "@ota-meshi"() {
          return require("@ota-meshi/eslint-plugin");
        },
      },
      rules: {
        "@ota-meshi/missing-module-for-config": ["error", missingList],
      },
      ...(files ? { files } : {}),
    },
  ];
}
