import type { Linter } from "eslint";

const nodeFiles = [`*.js`, `*.mjs`, `*.cjs`].flatMap((p) => [p, `**/${p}`]);
const nodeFilesWithTs = [
  `*.js`,
  `*.ts`,
  `*.mjs`,
  `*.mts`,
  `*.cjs`,
  `*.cts`,
].flatMap((p) => [p, `**/${p}`]);
export function getNodeFiles(withTs: boolean | undefined) {
  if (withTs) {
    return nodeFilesWithTs;
  }
  return nodeFiles;
}
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
