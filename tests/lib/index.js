"use strict"

const path = require("path")
const assert = require("assert")
const { CLIEngine } = require("eslint")

const Module = require("module")

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const TEST_CWD = path.join(__dirname, "../fixtures/config-test")

describe("Integration with @ota-meshi/eslint-plugin", () => {
    const resolveFilename = Module._resolveFilename
    before(() => {
        Module._resolveFilename = function (id) {
            if (id === "@ota-meshi/eslint-plugin") {
                return require.resolve("../..")
            }
            return resolveFilename.apply(this, arguments)
        }
    })

    after(() => {
        Module._resolveFilename = resolveFilename
    })

    it("should lint without errors", () => {
        const engine = new CLIEngine({
            cwd: TEST_CWD,
            fix: true,
        })
        const result = engine.executeOnFiles([TEST_CWD])
        CLIEngine.outputFixes(result)
        try {
            assert.strictEqual(result.errorCount, 0)
        } catch (e) {
            console.log(result.results.flatMap((r) => r.messages))
            throw e
        }
    })
})
