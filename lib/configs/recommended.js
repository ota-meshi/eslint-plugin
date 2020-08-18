module.exports = {
    extends: [
        "eslint:recommended",
        require.resolve("./base-plugins/eslint-comments"),
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
    },
    rules: {
        "require-jsdoc": "error",
        "no-warning-comments": "warn",
        "prefer-template": "error",
        "object-shorthand": "error",
    },
    overrides: [
        {
            files: [
                "test/**/*.js",
                "tests/**/*.js",
                "test/**/*.ts",
                "tests/**/*.ts",
            ],
            rules: {
                "require-jsdoc": "off",
                "no-console": "off",
            },
        },
    ],
}
