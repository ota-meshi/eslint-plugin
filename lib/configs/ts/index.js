"use strict"

module.exports = {
    getProject() {
        let project = undefined
        try {
            project = require("module")
                .createRequire(
                    require("path").join(process.cwd(), "__placeholder__.js"),
                )
                .resolve("./tsconfig.json")
        } catch {
            // ignore
        }
        return project
    },
}
