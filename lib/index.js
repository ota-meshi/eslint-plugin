"use strict"

module.exports = {
    configs: {
        recommended: require("./configs/recommended"),
        "+eslint-plugin": require("./configs/+eslint-plugin"),
        "+json": require("./configs/+json"),
        "+node": require("./configs/+node"),
        "+prettier": require("./configs/+prettier"),
        "+typescript": require("./configs/+typescript"),
        "+vue2": require("./configs/+vue2"),
        "+vue3": require("./configs/+vue3"),
        "+yaml": require("./configs/+yaml"),
    },
    rules: {
        "missing-module-for-config": require("./rules/missing-module-for-config"),
    },

    processors: {
        "missing-parser": {
            preprocess() {
                return ["/* missing parser */"]
            },
            postprocess(messages) {
                return [].concat(...messages)
            },

            supportsAutofix: false,
        },
    },
}
