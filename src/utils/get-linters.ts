import path from "path";

const needle = `${path.sep}node_modules${path.sep}eslint${path.sep}`;

export function getLinters() {
  const eslintPaths = new Set<string>(
    Object.keys(require.cache)
      .filter((id) => id.includes(needle))
      .map((id) => id.slice(0, id.indexOf(needle) + needle.length)),
  );
  const linters = [];

  for (const eslintPath of eslintPaths) {
    try {
      const linter = require(eslintPath).Linter;

      if (linter) {
        linters.push(linter);
      }
    } catch (error: any) {
      if (error.code !== "MODULE_NOT_FOUND") {
        throw error;
      }
    }
  }

  return linters;
}
