module.exports = {
    extends: [
        require.resolve("./lib/configs/recommended"),
        require.resolve("./lib/configs/+node"),
        require.resolve("./lib/configs/+json"),
        require.resolve("./lib/configs/+prettier"),
    ],
    rules: {
        "node/no-extraneous-require": "off",
        "node/no-unpublished-require": "off",
    },
}
