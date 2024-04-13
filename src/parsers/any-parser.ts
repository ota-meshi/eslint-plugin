import type { Linter } from "eslint";
const lineBreakPattern = /\r\n|[\n\r\u2028\u2029]/u;

export const meta = {
  name: __filename,
  version: require("../../package.json").version,
};
export function parseForESLint(
  text: string,
  _options?: any,
): Linter.ESLintParseResult {
  const lines = text.split(lineBreakPattern);
  return {
    ast: {
      type: "Program",
      sourceType: "module",
      body: [],
      tokens: [],
      comments: [],
      range: [0, text.length],
      loc: {
        start: {
          line: 1,
          column: 0,
        },
        end: {
          line: lines.length,
          column: lines[lines.length - 1].length,
        },
      },
    },
  };
}

export const anyParser = { parseForESLint, meta };
