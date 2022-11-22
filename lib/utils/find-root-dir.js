"use strict";

const fs = require("fs");
const path = require("path");

/** Check has package.json */
function hasPackageJson(dir) {
  const filePath = path.join(dir, "package.json");
  return fs.existsSync(filePath);
}

/** Check has node_modules */
function hasNodeModules(dir) {
  const filePath = path.join(dir, "node_modules");
  return fs.existsSync(filePath);
}

module.exports = function findRootDir(startPath) {
  const startDir = path.dirname(path.resolve(startPath));
  let dir = startDir;
  while (!hasPackageJson(dir)) {
    const nextDir = path.dirname(dir);
    if (!nextDir || nextDir === dir) {
      return null;
    }
    dir = nextDir;
  }
  if (hasNodeModules(dir)) {
    return dir;
  }
  // maybe npm monorepo
  const candidate = dir;

  for (;;) {
    const nextDir = path.dirname(dir);
    if (!nextDir || nextDir === dir) {
      break;
    }
    dir = nextDir;
    // maybe monorepo root
    if (hasPackageJson(dir) && hasNodeModules(dir)) {
      return dir;
    }
  }

  // It's single repo
  return candidate;
};
