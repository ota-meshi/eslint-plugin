import type { Linter } from "eslint";

/**
 * Fallback Legacy config builder
 */
export function buildFallback(
  missingList: string[],
  options?: {
    files?: string[];
    languageOptions?: Linter.FlatConfig["languageOptions"];
  },
): Linter.FlatConfig[] {
  return [
    {
      plugins: {
        get "@ota-meshi"() {
          return require("../index.js");
        },
      },
      rules: {
        "@ota-meshi/missing-module-for-config": ["error", missingList],
      },
      ...(options ?? {}),
    },
  ];
}
