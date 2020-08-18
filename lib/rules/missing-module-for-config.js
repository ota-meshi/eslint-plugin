"use strict"

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "report missing modules",
            url: "https://github.com/ota-meshi/eslint-plugin",
        },
        fixable: null, // or "code" or "whitespace"
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
            context.report({
                loc: { line: 1, column: 0 },
                message: `Missing module of ${moduleName}. run: \`npm i -D ${moduleName}\``,
            })
        }
        return {}
    },
}
