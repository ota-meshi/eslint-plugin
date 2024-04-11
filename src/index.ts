import type { BuildConfigOptions } from "./config-builder/index.js";
import { buildConfig } from "./config-builder/index.js";

export function config(options?: BuildConfigOptions) {
  return buildConfig(options || {});
}
export const configs = {
  recommended: require("./configs/recommended"),
  "+eslint-plugin": require("./configs/+eslint-plugin"),
  "+json": require("./configs/+json"),
  "+node": require("./configs/+node"),
  "+prettier": require("./configs/+prettier"),
  "+typescript": require("./configs/+typescript"),
  "+vue2": require("./configs/+vue2"),
  "+vue2-with-ts": require("./configs/+vue2-with-ts"),
  "+vue3": require("./configs/+vue3"),
  "+vue3-with-ts": require("./configs/+vue3-with-ts"),
  "+svelte": require("./configs/+svelte"),
  "+svelte-with-ts": require("./configs/+svelte-with-ts"),
  "+yaml": require("./configs/+yaml"),
  "+toml": require("./configs/+toml"),
  "+md": require("./configs/+md"),
  "+package-json": require("./configs/+package-json"),
};
export const rules = {
  "missing-module-for-config": require("./rules/missing-module-for-config"),
};

export default {
  configs,
  rules,
};
