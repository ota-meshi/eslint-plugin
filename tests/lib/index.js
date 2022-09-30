"use strict";

const path = require("path");
const assert = require("assert");
const { ESLint } = require("eslint");

const Module = require("module");

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const TEST_CWD = path.join(__dirname, "../fixtures/config-test");

describe("Integration with @ota-meshi/eslint-plugin", () => {
  const resolveFilename = Module._resolveFilename;
  before(() => {
    Module._resolveFilename = function (id) {
      if (id === "@ota-meshi/eslint-plugin") {
        return require.resolve("../..");
      }
      return resolveFilename.apply(this, arguments);
    };
  });

  after(() => {
    Module._resolveFilename = resolveFilename;
  });

  it("should lint without errors", async () => {
    const engine = new ESLint({
      cwd: TEST_CWD,
      fix: true,
    });
    const results = await engine.lintFiles([TEST_CWD]);
    await ESLint.outputFixes(results);
    try {
      assert.deepStrictEqual(
        results.flatMap((r) =>
          r.messages.map((m) => ({ ...m, filePath: r.filePath }))
        ),
        []
      );
    } catch (e) {
      console.log(results.flatMap((r) => r.messages));
      throw e;
    }
  });
});
