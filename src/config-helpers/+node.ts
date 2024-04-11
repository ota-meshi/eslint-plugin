import type { Linter } from "eslint";

export const nodeFiles = [`*.js`, `*.mjs`, `*.cjs`].flatMap((p) => [
  p,
  `**/${p}`,
]);
export const nodeEcmaFeatures = { globalReturn: true };
export const nodeExtendRules: Linter.RulesRecord = {
  "n/exports-style": ["error", "module.exports"],
  "n/file-extension-in-import": [
    "error",
    "always",
    { ".js": "always", ".ts": "never", ".tsx": "never" },
  ],
  "n/prefer-global/buffer": "error",
  "n/prefer-global/console": "error",
  "n/prefer-global/process": "error",
  "n/no-missing-require": ["error"],
};

export const nodeSettings = {
  node: {
    tryExtensions: [".js", ".cjs", ".mjs", ".json", ".ts", ".cts", ".mts"],
  },
};
