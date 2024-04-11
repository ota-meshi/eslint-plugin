import { createRequire } from "module";
import path from "path";
import { tsExtendRules } from "./base-config.js";
export { tsExtendRules };
export const tsParserOptions = {
  project: getProject(),
  extraFileExtensions: [".vue", ".svelte", ".astro"],
};

export function getProject() {
  let project = undefined;
  try {
    project = createRequire(
      path.join(process.cwd(), "__placeholder__.js"),
    ).resolve("./tsconfig.json");
  } catch {
    // ignore
  }
  return project;
}
