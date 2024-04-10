import type { Linter } from "eslint";
import semver from "semver";

/**
 * Checks if exists module
 */
export function has(name: string): boolean {
  const parts = name.split(/@/u);
  if (parts.length > 1 && parts[0]) {
    const v = parts[parts.length - 1];
    try {
      const pkg = require(`${parts.slice(0, -1).join("@")}/package.json`);
      return semver.lte(v, pkg.version);
    } catch (_e) {
      return false;
    }
  }
  try {
    require.resolve(`${name}/package.json`);
    return true;
  } catch (_e) {
    return false;
  }
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
