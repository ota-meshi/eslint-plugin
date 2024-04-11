import fs from "fs";
import path from "path";

/** Check has package json */
function hasPackageJson(dir: string) {
  const filePath = path.join(dir, "package.json");
  return fs.existsSync(filePath);
}

export function findRootDir(startPath: string) {
  const startDir = startPath;
  let dir = startDir;
  while (!hasPackageJson(dir)) {
    const nextDir = path.dirname(dir);
    if (!nextDir || nextDir === dir) {
      return null;
    }
    dir = nextDir;
  }
  return dir;
}
