import type { Linter } from "eslint";
import semver from "semver";
import { findRootDir } from "./find-root-dir.js";
import { createRequire } from "module";
import path from "path";

export const requireFromCwd = createRequire(
  path.join(process.cwd(), "__placeholder__.js"),
);
/**
 * Checks if exists module
 */
export function has(name: string): boolean {
  const parts = name.split(/@/u);
  let moduleName: string, version: string, modulePath: string;
  if (parts.length > 1 && parts.slice(0, -1).join("@")) {
    moduleName = parts.slice(0, -1).join("@");
    version = parts[parts.length - 1];
  } else {
    moduleName = name;
    version = "";
  }

  try {
    modulePath = requireFromCwd.resolve(moduleName);
  } catch (_e) {
    return false;
  }
  if (version) {
    const moduleRootPath = findRootDir(modulePath);
    try {
      const pkg = requireFromCwd(`${moduleRootPath}/package.json`);
      return semver.lte(version, pkg.version);
    } catch (_e) {
      return false;
    }
  }
  return true;
}

/**
 * Checks exists module and return config
 */
export function requireOf<C extends Linter.FlatConfig[] | Linter.Config>(
  names: string[],
  getConfig: () => C,
  fallback: (missingList: string[]) => C,
): C {
  const missingList = names.filter((n) => !has(n));

  if (missingList.length) {
    // getFallback, files
    return fallback(missingList);
  }

  return getConfig();
}
