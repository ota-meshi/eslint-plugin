"use strict"

const { spawnSync } = require("child_process")
const getLinters = require("../utils/get-linters")
const findRootDir = require("../utils/find-root-dir")

let shouldFix = false
patch()

module.exports = {
    meta: {
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
    },
    create(context) {
        const modules = context.options[0]
        for (const moduleName of modules) {
            let consoleOutput = ""
            if (shouldFix) {
                const cwd = findRootDir(context.getFilename())
                if (cwd) {
                    const result = spawnSync(
                        "npm",
                        ["install", "-D", moduleName],
                        {
                            cwd,
                            windowsHide: true,
                            maxBuffer: Infinity,
                        },
                    )

                    if (result.error) {
                        throw result.error
                    }
                    consoleOutput = `\n${result.output}`
                }
            }
            context.report({
                loc: { line: 1, column: 0 },
                message: `Missing module of ${moduleName}. run: \`npm i -D ${moduleName}\`${consoleOutput}`,
            })
        }
        return {}
    },
}

/** Patch */
function patch() {
    for (const Linter of getLinters()) {
        const verify0 = Linter.prototype.verify
        Object.defineProperty(Linter.prototype, "verify", {
            // eslint-disable-next-line no-loop-func -- ignore
            value(textOrSourceCode, config, options, ...args) {
                shouldFix =
                    options && typeof options.fix !== "undefined" && options.fix
                return verify0.call(
                    this,
                    textOrSourceCode,
                    config,
                    options,
                    ...args,
                )
            },
            configurable: true,
            writable: true,
        })
    }
}
