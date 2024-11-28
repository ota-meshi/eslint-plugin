import type { Linter } from "eslint";
import semver from "semver";
import { findRootDir } from "./find-root-dir.js";
import { createRequire } from "module";
import path from "path";
import { spawnSync } from "child_process";

let requireFunction: NodeRequire | null = null;

export function requireFromCwd(modulePath: string) {
  if (!requireFunction) {
    requireFunction = createRequire(
      path.join(process.cwd(), "__placeholder__.js"),
    );
  }
  return requireFunction(modulePath);
}
export function importFromCwd(modulePath: string) {
  const moduleRootPath = path.dirname(
    resolveFromCwd(`${modulePath}/package.json`),
  );
  return import(moduleRootPath);
}
export function resolveFromCwd(modulePath: string) {
  if (!requireFunction) {
    requireFunction = createRequire(
      path.join(process.cwd(), "__placeholder__.js"),
    );
  }
  return requireFunction.resolve(modulePath);
}
export function parseModule(name: string) {
  const parts = name.split(/@/u);
  if (parts.length > 1 && parts.slice(0, -1).join("@")) {
    return {
      moduleName: parts.slice(0, -1).join("@"),
      version: parts[parts.length - 1],
    };
  }
  return { moduleName: name, version: null };
}

/**
 * Checks if exists module
 */
export function has(name: string): boolean {
  const { moduleName, version } = parseModule(name);

  let modulePath;
  try {
    modulePath = resolveFromCwd(moduleName);
  } catch {
    try {
      modulePath = path.dirname(resolveFromCwd(`${moduleName}/package.json`));
    } catch {
      return false;
    }
  }
  if (version) {
    const moduleRootPath = findRootDir(modulePath);
    try {
      const pkg = requireFromCwd(`${moduleRootPath}/package.json`);
      return semver.lte(version, pkg.version);
    } catch {
      return false;
    }
  }
  return true;
}

/**
 * Checks exists module and return config
 */
export function requireOf<C extends Linter.Config[] | Linter.LegacyConfig>(
  names: string[],
  getConfig: () => C,
  fallback: (missingList: string[]) => C,
): C {
  const missingList = names.filter((n) => !has(n));

  if (!missingList.length) {
    return getConfig();
  }
  return fallback(missingList);
}

const installedModules = new Set();
export function tryInstall(
  moduleName: string,
  targetFile: string = process.cwd(),
) {
  if (installedModules.has(moduleName)) return null;
  const cwd = findRootDir(targetFile);
  if (cwd) {
    installedModules.add(moduleName);
    const parsed = parseModule(moduleName);
    const result = spawnSync(
      "npm",
      [
        "install",
        "-D",
        parsed.moduleName + (parsed.version ? `@^${parsed.version}` : ""),
      ],
      {
        cwd,
        windowsHide: true,
        maxBuffer: Infinity,
      },
    );

    if (result.error) {
      throw result.error;
    }
    return `${result.output}`;
  }

  return null;
}
