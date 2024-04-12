import type { Rule } from "eslint";
import { getLinters } from "../utils/get-linters.js";
import { tryInstall } from "../utils/module.js";

let shouldFix = false;
patch();

export const meta = {
  type: "problem",
  docs: {
    description: "report missing modules",
    url: "https://github.com/ota-meshi/eslint-plugin",
  },
  fixable: "code", // or "code" or "whitespace"
  schema: [
    {
      type: "array",
      items: { type: "string" },
    },
  ],
};
export function create(context: Rule.RuleContext) {
  const modules = context.options[0];
  for (const moduleName of modules) {
    let consoleOutput = "";
    if (shouldFix) {
      const result = tryInstall(
        moduleName,
        context.filename || context.getFilename(),
      );
      consoleOutput = result ? `\n${result}` : "";
    }
    context.report({
      loc: { line: 1, column: 0 },
      message: `Missing module of ${moduleName}. run: \`npm i -D ${moduleName}\`${consoleOutput}`,
    });
  }
  return {};
}

/** Patch */
function patch() {
  for (const Linter of getLinters()) {
    const verify0 = Linter.prototype.verify;
    Object.defineProperty(Linter.prototype, "verify", {
      // eslint-disable-next-line no-loop-func -- ignore
      value(
        textOrSourceCode: unknown,
        config: unknown,
        options: undefined | { fix?: boolean },
        ...args: unknown[]
      ) {
        shouldFix = Boolean(
          options && typeof options.fix !== "undefined" && options.fix,
        );
        return verify0.call(this, textOrSourceCode, config, options, ...args);
      },
      configurable: true,
      writable: true,
    });
  }
}
