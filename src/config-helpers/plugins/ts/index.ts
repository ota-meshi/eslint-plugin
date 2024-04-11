import { tsExtendRules } from "./base-config.js";
import { resolveFromCwd } from "../../../utils/module.js";
export { tsExtendRules };
export const tsParserOptions = {
  project: getProject(),
  extraFileExtensions: [".vue", ".svelte", ".astro"],
};

export function getProject() {
  let project = undefined;
  try {
    project = resolveFromCwd("./tsconfig.json");
  } catch {
    // ignore
  }
  return project;
}
