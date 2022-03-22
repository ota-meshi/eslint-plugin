"use strict"

const fs = require("fs")
const path = require("path")
module.exports = require("../utils/module").requireOf(
    ["eslint-plugin-eslint-plugin"],
    () => ({
        plugins: ["eslint-plugin"],
        overrides: [
            {
                files: ["**/rules/**", "**/internal-rules/**"],
                extends: [
                    require.resolve("./+node"),
                    "plugin:eslint-plugin/recommended",
                ],
                rules: {
                    "eslint-plugin/consistent-output": "error",
                    "eslint-plugin/meta-property-ordering": [
                        "error",
                        [
                            "deprecated",
                            "docs",
                            "fixable",
                            "messages",
                            "replacedBy",
                            "schema",
                            "type",
                        ],
                    ],
                    "eslint-plugin/no-deprecated-context-methods": "error",
                    "eslint-plugin/prefer-output-null": "error",
                    "eslint-plugin/prefer-placeholders": "error",
                    "eslint-plugin/prefer-replace-text": "error",
                    "eslint-plugin/report-message-format": [
                        "error",
                        "[^a-z'\"{].*\\.$",
                    ],
                    "eslint-plugin/require-meta-docs-description": "error",
                    "eslint-plugin/require-meta-docs-url": [
                        "error",
                        { pattern: rulesDocumentUrl() },
                    ],
                    "eslint-plugin/require-meta-fixable": "error",
                    "eslint-plugin/require-meta-schema": "error",
                    "eslint-plugin/require-meta-type": "error",
                    "eslint-plugin/test-case-property-ordering": [
                        "error",
                        [
                            "filename",
                            "code",
                            "output",
                            "options",
                            "parser",
                            "parserOptions",
                            "globals",
                            "env",
                            "errors",
                        ],
                    ],
                    "eslint-plugin/test-case-shorthand-strings": "error",
                },
            },
        ],
    }),
)

/**
 * The URL of rule's documentation for the `+eslint-plugin` config.
 * @type {string}
 */
function rulesDocumentUrl() {
    try {
        const { version, repository } = JSON.parse(
            fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
        )
        const baseUrl = getBaseUrl(repository)
        if (baseUrl) {
            return `${baseUrl}/blob/v${version}/docs/rules/{{name}}.md`
        }
    } catch (_error) {
        // ignore
    }
    return undefined
}

/**
 * Get the base URL from a given repository information.
 * @param {string|{type:string,url:string}} repository The repository information.
 * @returns {string|null} The base URL.
 */
function getBaseUrl(repository) {
    if (typeof repository === "string") {
        return `https://github.com/${repository}`
    }
    if (
        repository &&
        typeof repository.url === "string" &&
        /^git\+.+\.git$/u.test(repository.url)
    ) {
        return repository.url.slice(4, -4)
    }

    return null
}
