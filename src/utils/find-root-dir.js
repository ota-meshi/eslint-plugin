"use strict";

const fs = require("fs");
const path = require("path");

/** Check has package json */
function hasPackageJson(dir) {
  const filePath = path.join(dir, "package.json");
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
  return dir;
};
